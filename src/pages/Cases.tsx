import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CASES } from "../data/content";
import "./cases.css";

export default function Cases() {
  const location = useLocation();
  const focused = (location.state as any)?.focus as string | undefined;
  const [active, setActive] = useState(focused || CASES[0].code);

  useEffect(() => {
    if (focused) setActive(focused);
  }, [focused]);

  const current = CASES.find((c) => c.code === active) || CASES[0];

  return (
    <div className="cases-page">
      {/* HERO */}
      <section className="cases-hero">
        <div className="shell">
          <span className="cases-kicker">行业案例 · FIELD STUDIES</span>
          <h1 className="cases-title serif">
            把<em>行业经验</em>用 AI 沉淀，<br />
            成<em>千上百倍</em>放大效果。
          </h1>
          <p className="cases-lede">
            四个真实场景，覆盖<strong>农业</strong>、<strong>电商</strong>、<strong>文旅</strong>、<strong>政企</strong>。
            均基于私有化或县域 / 边缘部署，数据不出域。
          </p>
        </div>
      </section>

      {/* INDEX — pill switcher */}
      <section className="cases-switch">
        <div className="shell">
          <div className="case-pills">
            {CASES.map((c) => (
              <button
                key={c.code}
                className={`case-pill ${active === c.code ? "is-on" : ""}`}
                onClick={() => setActive(c.code)}
              >
                <span className="case-pill-num">{c.code}</span>
                <span className="case-pill-name">{c.industry}</span>
                <span className="case-pill-en">{c.industryEn}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* DETAIL */}
      <section className="case-detail" key={current.code}>
        <div className="shell">
          <article className="case-detail-card reveal">
            <div className="case-detail-grid">
              <div className="case-detail-left">
                <div className="case-detail-tag">
                  CASE · {current.code} · {current.industry}
                </div>
                <h2 className="case-detail-title serif">{current.title}</h2>
                <p className="case-detail-sub">{current.sub}</p>

                <blockquote className="case-quote serif">
                  <span className="case-quote-mark" aria-hidden>"</span>
                  {current.quote}
                </blockquote>
              </div>

              <aside className="case-detail-right">
                <div className="case-metric-stack">
                  {current.metrics.map((m, i) => (
                    <div key={m.label} className="case-metric" data-i={i}>
                      <span className="case-metric-val serif">{m.value}</span>
                      <span className="case-metric-label">{m.label}</span>
                    </div>
                  ))}
                </div>
                <dl className="case-meta">
                  <div><dt>典型场景</dt><dd>{current.scene}</dd></div>
                  <div><dt>部署方式</dt><dd>私有化 / 县域 / 边缘</dd></div>
                  <div><dt>技术底座</dt><dd>云大厂战略生态</dd></div>
                </dl>
              </aside>
            </div>

            {/* Pain / Solution side-by-side */}
            <div className="case-blocks">
              <article className="case-block">
                <h3 className="case-block-h">遇到的问题</h3>
                <ol className="case-block-list">
                  {current.pains.map((p, i) => (
                    <li key={i}>
                      <span className="case-block-i">{String(i + 1).padStart(2, "0")}</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ol>
              </article>
              <article className="case-block case-block-sol">
                <h3 className="case-block-h">我们做了什么</h3>
                <ol className="case-block-list">
                  {current.solutions.map((s, i) => (
                    <li key={i}>
                      <span className="case-block-i">{String(i + 1).padStart(2, "0")}</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              </article>
            </div>
          </article>
        </div>
      </section>

      {/* OTHER CASES */}
      <section className="cases-other">
        <div className="shell">
          <header className="cases-other-head">
            <h3 className="cases-other-h serif">其他行业实践</h3>
          </header>
          <div className="cases-other-grid">
            {CASES.filter((c) => c.code !== current.code).map((c) => (
              <button
                key={c.code}
                onClick={() => {
                  setActive(c.code);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="case-other-card"
              >
                <div className="case-other-head-row">
                  <span className="case-other-num">{c.code}</span>
                  <span className="case-other-tag">{c.industry}</span>
                </div>
                <h4 className="case-other-title serif">{c.title}</h4>
                <p className="case-other-sub">{c.sub}</p>
                <span className="case-other-go">查看详情 →</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cases-cta">
        <div className="shell cases-cta-inner">
          <h2 className="cases-cta-title serif">
            想看看<em>你的行业</em>能怎么做？
          </h2>
          <Link to="/about" className="btn btn-solid btn-large">
            预约行业诊断 <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
