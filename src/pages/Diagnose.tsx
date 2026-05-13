import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  type DiagnoseAnswers,
  type PainPoint,
  INDUSTRY_OPTIONS,
  SIZE_OPTIONS,
  ROLE_OPTIONS,
  TIMELINE_OPTIONS,
  getQuestionSet,
  saveAnswers,
  loadAnswers,
} from "../data/diagnose";
import "./diagnose.css";

const EMPTY: DiagnoseAnswers = { pains: [] };

const STEPS = [
  { code: "01", title: "企业概况", hint: "你是谁,公司多大" },
  { code: "02", title: "数据与 IT 现状", hint: "现在的底子如何" },
  { code: "03", title: "目标与痛点", hint: "想解决什么问题" },
];

export default function Diagnose() {
  const navigate = useNavigate();
  const [step, setStep] = useState(() => {
    // 支持 ?step=1 / ?step=2 深链(主要给开发/调试用)
    if (typeof window !== "undefined") {
      const s = new URLSearchParams(window.location.search).get("step");
      const n = s ? parseInt(s, 10) : 0;
      if (!isNaN(n) && n >= 0 && n <= 2) return n;
    }
    return 0;
  });
  const [answers, setAnswers] = useState<DiagnoseAnswers>(() => loadAnswers() || EMPTY);

  // 按当前行业拿到对应的题组(提问 + 选项)
  const qs = useMemo(() => getQuestionSet(answers.industry), [answers.industry]);

  // 自动保存
  useEffect(() => {
    saveAnswers(answers);
  }, [answers]);

  const set = <K extends keyof DiagnoseAnswers>(key: K, value: DiagnoseAnswers[K]) => {
    setAnswers((a) => ({ ...a, [key]: value }));
  };

  // 切换行业:如果已选的痛点不在新行业的痛点池里,就丢掉.
  // 这样避免用户先选制造的"排产不准",切到电商后界面不显示但状态里还留着.
  const setIndustry = (industry: DiagnoseAnswers["industry"]) => {
    setAnswers((a) => {
      if (a.industry === industry) return a;
      const nextSet = getQuestionSet(industry);
      const validPains = new Set(nextSet.painOptions.map((o) => o.value));
      return {
        ...a,
        industry,
        pains: a.pains.filter((p) => validPains.has(p)),
      };
    });
  };

  const togglePain = (p: PainPoint) => {
    setAnswers((a) => {
      const has = a.pains.includes(p);
      if (has) return { ...a, pains: a.pains.filter((x) => x !== p) };
      if (a.pains.length >= 4) return a; // 最多 4 个
      return { ...a, pains: [...a.pains, p] };
    });
  };

  const step1Done = !!(answers.industry && answers.size && answers.role);
  const step2Done = !!(answers.data && answers.it && answers.ai);
  const step3Done = !!(answers.goal && answers.pains.length > 0 && answers.timeline);

  const canNext = useMemo(() => {
    if (step === 0) return step1Done;
    if (step === 1) return step2Done;
    return step3Done;
  }, [step, step1Done, step2Done, step3Done]);

  // 切换步骤时滚到进度条位置(而不是页面顶部),且无动画 ——
  // 避免"飞回顶部"的失焦感,但让新步骤的第一题立刻可见.
  const scrollToFormTop = () => {
    const el = document.querySelector(".diag-progress");
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 24;
      window.scrollTo({ top: Math.max(0, y), behavior: "auto" });
    }
  };

  const handleNext = () => {
    if (step < 2) {
      setStep((s) => s + 1);
      scrollToFormTop();
    } else {
      navigate("/diagnose/result");
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((s) => s - 1);
      scrollToFormTop();
    }
  };

  const progress = step === 0 ? 33 : step === 1 ? 66 : 100;

  return (
    <div className="diag-page">
      <section className="diag-hero">
        <div className="shell">
          <div className="diag-hero-grid">
            <div>
              <h1 className="diag-title serif">
                10 个问题,<em>3分钟</em>,<br />
                迈出企业AI转型的第一步
              </h1>
              <p className="diag-lede">
                回答几个关于企业规模、数据基础、目标的问题,我们给你一份
                <strong>企业AI转型初诊报告</strong>
              </p>
            </div>
            <aside className="diag-side">
              <div className="diag-side-eyebrow mono">为什么问这些</div>
              <p className="diag-side-quote serif">
                AI 转型最大的浪费,<br />
                不是钱,是<em>方向错了</em>。
              </p>
              <ul className="diag-side-list">
                <li>
                  <span className="diag-side-q mono">Q1–3</span>
                  <div className="diag-side-d">
                    <strong>了解企业现状</strong>
                    行业、规模、决策位置不同,合适的切入路径完全不同。同样是 50 人的公司,制造业和电商的第一步差很远。
                  </div>
                </li>
                <li>
                  <span className="diag-side-q mono">Q4–6</span>
                  <div className="diag-side-d">
                    <strong>看清企业底子</strong>
                    数据、IT、AI 现状决定了你能从哪一层切入。底子薄就从协作层试水,底子厚才适合直接打经营层。
                  </div>
                </li>
                <li>
                  <span className="diag-side-q mono">Q7–10</span>
                  <div className="diag-side-d">
                    <strong>对齐落地方向</strong>
                    痛点 + 目标 + 节奏决定推荐场景与节奏。我们见过太多企业一上来想「全面 AI 化」,最后什么都没落地。
                  </div>
                </li>
              </ul>
              <p className="diag-side-foot mono">
                这是我们做过百余家企业诊断后,提炼出的「最少够用」的问题集。
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="diag-form-section">
        <div className="shell">
          {/* Progress */}
          <div className="diag-progress">
            <div className="diag-progress-bar">
              <div className="diag-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="diag-progress-steps">
              {STEPS.map((s, i) => (
                <div key={s.code} className={`diag-progress-step ${i === step ? "is-on" : ""} ${i < step ? "is-done" : ""}`}>
                  <span className="diag-progress-step-code mono">{s.code}</span>
                  <span className="diag-progress-step-title">{s.title}</span>
                  <span className="diag-progress-step-hint">{s.hint}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 1 */}
          {step === 0 && (
            <div className="diag-step" key="step-0">
              <Question label="你所在的行业?" required>
                <PillGrid
                  options={INDUSTRY_OPTIONS}
                  value={answers.industry}
                  onChange={(v) => setIndustry(v)}
                />
              </Question>

              <Question label="企业人员规模?" required>
                <PillGrid
                  options={SIZE_OPTIONS}
                  value={answers.size}
                  onChange={(v) => set("size", v)}
                />
              </Question>

              <Question label="你在企业里的角色?" required>
                <PillGrid
                  options={ROLE_OPTIONS}
                  value={answers.role}
                  onChange={(v) => set("role", v)}
                />
              </Question>
            </div>
          )}

          {/* Step 2 — 根据行业动态变化提问与选项 */}
          {step === 1 && (
            <div className="diag-step" key={`step-1-${answers.industry}`}>
              <Question label={qs.dataQuestion} required>
                <PillGrid
                  options={qs.dataOptions}
                  value={answers.data}
                  onChange={(v) => set("data", v)}
                />
              </Question>

              <Question label={qs.itQuestion} required>
                <PillGrid
                  options={qs.itOptions}
                  value={answers.it}
                  onChange={(v) => set("it", v)}
                />
              </Question>

              <Question label={qs.aiQuestion} required>
                <PillGrid
                  options={qs.aiOptions}
                  value={answers.ai}
                  onChange={(v) => set("ai", v)}
                />
              </Question>
            </div>
          )}

          {/* Step 3 — 根据行业动态变化目标与痛点 */}
          {step === 2 && (
            <div className="diag-step" key={`step-2-${answers.industry}`}>
              <Question label={qs.goalQuestion} required>
                <PillGrid
                  options={qs.goalOptions}
                  value={answers.goal}
                  onChange={(v) => set("goal", v)}
                />
              </Question>

              <Question label={qs.painQuestion} required>
                <div className="diag-pill-grid">
                  {qs.painOptions.map((opt) => {
                    const active = answers.pains.includes(opt.value);
                    const disabled = !active && answers.pains.length >= 4;
                    return (
                      <button
                        type="button"
                        key={opt.value}
                        className={`diag-pill ${active ? "is-on" : ""} ${disabled ? "is-disabled" : ""}`}
                        onClick={() => togglePain(opt.value)}
                        disabled={disabled}
                      >
                        <span className="diag-pill-label">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="diag-helper mono">已选 {answers.pains.length} / 4</p>
              </Question>

              <Question label="期望的推进节奏?" required>
                <PillGrid
                  options={TIMELINE_OPTIONS}
                  value={answers.timeline}
                  onChange={(v) => set("timeline", v)}
                />
              </Question>
            </div>
          )}

          {/* Nav */}
          <div className="diag-nav">
            <button type="button" className="btn" onClick={handleBack} disabled={step === 0}>
              <span aria-hidden>←</span> 上一步
            </button>
            <div className="diag-nav-meta mono">
              {step + 1} / {STEPS.length}
            </div>
            <button
              type="button"
              className="btn btn-solid btn-large"
              onClick={handleNext}
              disabled={!canNext}
            >
              {step < 2 ? "下一步" : "生成诊断报告"} <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ---------- 子组件 ----------

function Question({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="diag-question">
      <h2 className="diag-q-label">
        {label}
        {required && <span className="diag-q-required">*</span>}
      </h2>
      {children}
    </div>
  );
}

function PillGrid<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string; hint?: string }[];
  value: T | undefined;
  onChange: (v: T) => void;
}) {
  return (
    <div className="diag-pill-grid">
      {options.map((opt) => (
        <button
          type="button"
          key={opt.value}
          className={`diag-pill ${value === opt.value ? "is-on" : ""} ${opt.hint ? "has-hint" : ""}`}
          onClick={() => onChange(opt.value)}
        >
          <span className="diag-pill-label">{opt.label}</span>
          {opt.hint && <span className="diag-pill-hint">{opt.hint}</span>}
        </button>
      ))}
    </div>
  );
}
