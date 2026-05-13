import { useEffect, useState } from "react";
import { COMPANY } from "../data/content";
import { loadAnswers, INDUSTRY_OPTIONS } from "../data/diagnose";
import { postContact } from "../lib/api";
import "./about.css";


const FIELDS = [
  { id: "type",    label: "您的需求类型",      kind: "select", required: false, options: ["企业转型诊断", "试点AI项目", "定制开发", "AI 培训", "政企合作"] },
  { id: "company", label: "公司 / 单位名称",   kind: "input", required: true,  placeholder: "例：某某科技有限公司" },
  { id: "name",    label: "您的姓名",          kind: "input", required: true,  placeholder: "例：张总" },
  { id: "role",    label: "职位 / 角色",       kind: "input", required: false, placeholder: "例：CEO / CTO / 业务负责人" },
  { id: "contact", label: "联系方式（手机或邮箱）", kind: "input", required: true, placeholder: "138 0000 0000 / name@company.com" },
] as const;

export default function About() {
  const [form, setForm] = useState({
    type: "免费 AI 诊断",
    company: "",
    name: "",
    role: "",
    contact: "",
    note: "",
  });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 检测同一 session 内是否已做过诊断.做过的话给个提示,让用户知道
  // "我们能把你这次联系跟那份诊断关联起来",销售跟进时就能直接看到需求.
  const [linkedDiagnosis, setLinkedDiagnosis] = useState<{ industryLabel: string } | null>(null);
  useEffect(() => {
    const a = loadAnswers();
    if (a && a.industry) {
      const label = INDUSTRY_OPTIONS.find((x) => x.value === a.industry)?.label || a.industry;
      setLinkedDiagnosis({ industryLabel: label });
      // 默认把需求类型设为"企业转型诊断",节省用户选择成本
      setForm((f) => ({ ...f, type: "企业转型诊断" }));
    }
  }, []);

  const handle = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [k]: e.target.value });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || sent) return;
    setError(null);
    setSubmitting(true);
    try {
      await postContact({
        type: form.type,
        company: form.company.trim(),
        name: form.name.trim(),
        role: form.role.trim(),
        contact: form.contact.trim(),
        note: form.note.trim(),
      });
      setSent(true);
    } catch (err) {
      console.error(err);
      setError("提交失败,请稍后重试,或直接通过电话 / 邮箱联系。");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <div className="shell">
          <span className="about-kicker mono">联系我们 · CONTACT</span>
          <div className="about-hero-grid">
            <div className="about-hero-left rise">
              <h1 className="about-title serif">
                我们只做<br />
                <em>深度服务</em>
              </h1>
              <p className="about-lede">
                {COMPANY.cn}——企业 AI 咨询与落地服务商。{COMPANY.edge}，
                以快速诊断、贴身落地、按需定制、持续迭代为闭环，让中小企业在 2-4 周内见到 AI 的真实效果。
              </p>
            </div>

            <aside className="about-hero-quote reveal">
              <span className="about-hero-quote-mark serif">&ldquo;</span>
              <p className="about-hero-quote-body serif">
                不只是卖软件，<br />
                是深度陪跑到<em>真实落地</em>。
              </p>
              <span className="about-hero-quote-attr mono">— GMonkey 服务原则</span>
            </aside>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="about-contact">
        <div className="shell">
          <header className="about-section-head">
            <h2 className="about-h2 serif">
              今天<em>就可以</em>开始
            </h2>
            <p className="about-section-sub">
              填写下方表单，我们会在 1 个工作日内联系您。也可以直接通过电话 / 邮箱联系我们。
            </p>
          </header>

          {linkedDiagnosis && (
            <div className="about-linked" role="status">
              <span className="about-linked-dot" aria-hidden />
              <span className="about-linked-text">
                已识别到你刚才完成的<strong>{linkedDiagnosis.industryLabel}行业诊断</strong>，
                提交后我们会把这次联系与诊断报告一起处理，无需重复说明。
              </span>
            </div>
          )}

          <div className="about-contact-grid">
            <form className="about-form" onSubmit={submit}>
              <div className="about-form-grid">
                {FIELDS.map((f, i) => (
                  <label
                    key={f.id}
                    className="about-form-label"
                    data-span={f.id === "type" || f.id === "contact" ? "full" : undefined}
                  >
                    <span className="about-form-label-row">
                      <span className="about-form-label-n">{String(i + 1).padStart(2, "0")}</span>
                      <span className="about-form-label-t">
                        {f.label} {f.required && <em className="about-form-req">*</em>}
                      </span>
                    </span>
                    {f.kind === "select" ? (
                      <select
                        value={form[f.id as keyof typeof form]}
                        onChange={handle(f.id as keyof typeof form)}
                      >
                        {f.options!.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input
                        value={form[f.id as keyof typeof form]}
                        onChange={handle(f.id as keyof typeof form)}
                        placeholder={"placeholder" in f ? f.placeholder : ""}
                        required={f.required}
                      />
                    )}
                  </label>
                ))}
                <label className="about-form-label" data-span="full">
                  <span className="about-form-label-row">
                    <span className="about-form-label-n">06</span>
                    <span className="about-form-label-t">项目背景 / 想解决的问题（可选）</span>
                  </span>
                  <textarea
                    value={form.note}
                    onChange={handle("note")}
                    placeholder="简单介绍下当前业务、痛点或想了解的内容…"
                    rows={4}
                  />
                </label>
              </div>

              <div className="about-form-foot">
                {sent ? (
                  <span className="about-form-sent">
                    <span className="about-form-sent-dot" />
                    收到，我们将在 1 个工作日内联系你。
                  </span>
                ) : (
                  <>
                    {error && <span className="about-form-error">{error}</span>}
                    <button
                      type="submit"
                      className="btn btn-solid btn-large about-submit"
                      disabled={submitting}
                    >
                      {submitting ? "提交中…" : "发送"} <span aria-hidden>→</span>
                    </button>
                  </>
                )}
              </div>
            </form>

            <aside className="about-contact-side">
              <div className="about-side-card">
                <h3 className="about-side-h">直接联系</h3>
                <ul className="about-side-list">
                  <li>
                    <span className="about-side-k">邮箱</span>
                    <a href="mailto:contact@gmonkey.ai">aoyin@gorilla-bits.com</a>
                  </li>
                  <li>
                    <span className="about-side-k">电话</span>
                    <span>199-0581-8072</span>
                  </li>

                </ul>
              </div>

              <div className="about-side-card">
                <h3 className="about-side-h">工作时间</h3>
                <p className="about-side-big serif">周一至周五 · 10:00 — 19:00</p>
                <p className="about-side-body">
                  紧急情况可通过微信沟通，团队 24h 内回复。
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
