import { useMemo, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  type Layer,
  loadAnswers,
  clearAnswers,
  computeScores,
  recommendLayer,
  matchScenarios,
  detectRisks,
  buildRoadmap,
  buildHeadline,
  getQuestionSet,
  INDUSTRY_OPTIONS,
  SIZE_OPTIONS,
  TIMELINE_OPTIONS,
} from "../data/diagnose";
import { postDiagnosis, buildDiagnosisPayload } from "../lib/api";
import "./diagnose.css";

const LAYER_NAMES: Record<Layer, { name: string; en: string; tagline: string }> = {
  L1: { name: "协作层", en: "COLLABORATION", tagline: "让员工先用起来" },
  L2: { name: "经营层", en: "BUSINESS", tagline: "让数据流动起来" },
  L3: { name: "能力层", en: "CAPABILITY", tagline: "让企业自己会进化" },
};

export default function DiagnoseResult() {
  const navigate = useNavigate();
  const answers = useMemo(() => loadAnswers(), []);

  // 如果没有答案,回到表单页
  useEffect(() => {
    if (!answers || !answers.industry) {
      navigate("/diagnose", { replace: true });
    }
  }, [answers, navigate]);

  if (!answers || !answers.industry) return null;

  const scores = computeScores(answers);
  const layer = recommendLayer(answers, scores);
  const scenarios = matchScenarios(answers, layer);
  const risks = detectRisks(answers, scores, layer);
  const roadmap = buildRoadmap(layer, answers);
  const headline = buildHeadline(layer, scores);

  // 入库:本次会话只提交一次(用 ref 守门,避免 React.StrictMode 双调用 / 重渲染重复提交)
  const submittedRef = useRef(false);
  useEffect(() => {
    if (submittedRef.current) return;
    if (!answers || !answers.industry) return;
    submittedRef.current = true;
    const payload = buildDiagnosisPayload(
      answers,
      scores,
      layer,
      scenarios.map((x) => x.code),
    );
    postDiagnosis(payload).catch((err) => {
      // 写库失败不影响用户看报告,只在 console 留痕
      console.warn("[diagnose] submit failed (showing report anyway):", err);
      submittedRef.current = false; // 允许下次重试
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 按所选行业拿到对应痛点池,这样报告里显示的也是行业专属的痛点名
  const qs = getQuestionSet(answers.industry);
  const industry = INDUSTRY_OPTIONS.find((x) => x.value === answers.industry)?.label || "—";
  const size = SIZE_OPTIONS.find((x) => x.value === answers.size)?.label || "—";
  const timeline = TIMELINE_OPTIONS.find((x) => x.value === answers.timeline)?.label || "—";
  const painLabels = answers.pains
    .map((p) => qs.painOptions.find((x) => x.value === p)?.label)
    .filter(Boolean) as string[];

  const handleRetake = () => {
    clearAnswers();
    navigate("/diagnose");
  };

  return (
    <div className="diag-result-page">
      {/* HERO — 一句话结论 */}
      <section className="dres-hero">
        <div className="shell">
          <span className="diag-eyebrow mono">企业初步诊断报告 · {new Date().toLocaleDateString("zh-CN")}</span>
          <h1 className="dres-headline serif">
            {headline.split(/(协作层|经营层|能力层)/).map((part, i) =>
              part === "协作层" || part === "经营层" || part === "能力层" ? (
                <em key={i}>{part}</em>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </h1>
          <div className="dres-summary mono">
            <span>{industry}</span>
            <span className="dres-dot" />
            <span>{size}</span>
            <span className="dres-dot" />
            <span>计划周期 {timeline}</span>
          </div>
        </div>
      </section>

      {/* 三维评分 */}
      <section className="dres-section">
        <div className="shell">
          <header className="dres-section-head">
            <div className="mono dres-section-code">01 / READINESS</div>
            <h2 className="dres-section-title serif">三维就绪度评估</h2>
            <p className="dres-section-sub">基于你的回答,我们从数据、IT、AI 三个维度评估当前基础。</p>
          </header>

          <div className="dres-scores">
            <ScoreBar label="数据基础" en="DATA" value={scores.data} />
            <ScoreBar label="IT 能力" en="INFRA" value={scores.it} />
            <ScoreBar label="AI 成熟度" en="AI" value={scores.ai} />
          </div>

          <div className="dres-readiness">
            <div className="dres-readiness-num serif">{scores.readiness}<span className="dres-readiness-unit">%</span></div>
            <div className="dres-readiness-meta">
              <div className="dres-readiness-label mono">综合就绪度</div>
              <p className="dres-readiness-body">
                {scores.readiness < 35 && "底子较薄,建议从轻量场景切入,边做边补。"}
                {scores.readiness >= 35 && scores.readiness < 65 && "基础尚可,可以直接进入经营层场景。"}
                {scores.readiness >= 65 && "基础扎实,具备启动能力层建设的条件。"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 推荐层级 */}
      <section className="dres-section dres-section-alt">
        <div className="shell">
          <header className="dres-section-head">
            <div className="mono dres-section-code">02 / LAYER</div>
            <h2 className="dres-section-title serif">建议切入层级</h2>
            <p className="dres-section-sub">三层能力可独立切入,也可组合推进。基于你的现状,我们推荐:</p>
          </header>

          <div className="dres-layers">
            {(["L1", "L2", "L3"] as Layer[]).map((l) => {
              const meta = LAYER_NAMES[l];
              const active = l === layer;
              return (
                <div key={l} className={`dres-layer ${active ? "is-on" : ""}`}>
                  <div className="dres-layer-head">
                    <span className="mono dres-layer-code">{l}</span>
                    {active && <span className="dres-layer-badge mono">RECOMMENDED</span>}
                  </div>
                  <h3 className="dres-layer-name serif">{meta.name}</h3>
                  <p className="dres-layer-tagline serif">{meta.tagline}</p>
                  <span className="dres-layer-en mono">{meta.en}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 推荐场景 */}
      <section className="dres-section">
        <div className="shell">
          <header className="dres-section-head">
            <div className="mono dres-section-code">03 / SCENARIOS</div>
            <h2 className="dres-section-title serif">推荐切入场景</h2>
            <p className="dres-section-sub">
              基于行业(<strong>{industry}</strong>)和痛点
              {painLabels.length > 0 && (
                <>
                  (
                  {painLabels.map((p, i) => (
                    <span key={p}>
                      <strong>{p}</strong>
                      {i < painLabels.length - 1 ? "、" : ""}
                    </span>
                  ))}
                  )
                </>
              )}
              ,推荐以下场景:
            </p>
          </header>

          <div className="dres-scenarios">
            {scenarios.map((s, i) => (
              <article key={s.code} className="dres-scenario">
                <div className="dres-scenario-head">
                  <span className="mono dres-scenario-num">0{i + 1}</span>
                  <span className="mono dres-scenario-code">{s.code}</span>
                </div>
                <h3 className="dres-scenario-title serif">{s.title}</h3>
                <p className="dres-scenario-body">{s.body}</p>
                <div className="dres-scenario-foot mono">
                  <span>周期 {s.duration}</span>
                  <span className="dres-scenario-layer">{s.layer}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 路线图 */}
      <section className="dres-section dres-section-alt">
        <div className="shell">
          <header className="dres-section-head">
            <div className="mono dres-section-code">04 / ROADMAP</div>
            <h2 className="dres-section-title serif">推荐推进节奏</h2>
          </header>

          <ol className="dres-roadmap">
            {roadmap.map((phase, i) => (
              <li key={phase.name} className="dres-phase">
                <div className="dres-phase-num serif">{`0${i + 1}`}</div>
                <div className="dres-phase-body">
                  <h3 className="dres-phase-name serif">{phase.name}</h3>
                  <span className="dres-phase-duration mono">{phase.duration}</span>
                  <p className="dres-phase-desc">{phase.body}</p>
                </div>
                {i < roadmap.length - 1 && <div className="dres-phase-arrow mono">→</div>}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 风险提示 */}
      <section className="dres-section">
        <div className="shell">
          <header className="dres-section-head">
            <div className="mono dres-section-code">05 / RISKS</div>
            <h2 className="dres-section-title serif">风险提示</h2>
            <p className="dres-section-sub">这些是我们基于经验,针对你当前情况的提醒。</p>
          </header>

          <ul className="dres-risks">
            {risks.map((r, i) => (
              <li key={i} className="dres-risk">
                <span className="dres-risk-mark mono">!</span>
                <div className="dres-risk-body">
                  <h3 className="dres-risk-title">{r.title}</h3>
                  <p className="dres-risk-text">{r.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="dres-cta-section">
        <div className="shell">
          <div className="dres-cta-card">
            <div className="dres-cta-text">
              <h2 className="dres-cta-title serif">
                想把这份报告<em>变成可执行的方案</em>?
              </h2>
              <p className="dres-cta-sub">
                免费的 1 对 1 深度诊断,40 分钟,我们帮你对齐节奏、识别盲区、明确下一步。
              </p>
            </div>
            <div className="dres-cta-actions">
              <Link to="/about" className="btn btn-solid btn-large">
                预约深度诊断 <span aria-hidden>→</span>
              </Link>
              <button type="button" className="btn" onClick={handleRetake}>
                <span aria-hidden>↻</span> 重新填写
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ScoreBar({ label, en, value }: { label: string; en: string; value: number }) {
  return (
    <div className="dres-score">
      <div className="dres-score-head">
        <span className="dres-score-label">{label}</span>
        <span className="dres-score-en mono">{en}</span>
        <span className="dres-score-val mono">{value}%</span>
      </div>
      <div className="dres-score-bar">
        <div className="dres-score-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
