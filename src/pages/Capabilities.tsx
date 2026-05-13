import { Link } from "react-router-dom";
import { useState } from "react";
import {
  LAYERS,
  COLLAB_SCENARIOS,
  BUSINESS_SCENARIOS,
  CAPABILITY_SCENARIOS,
} from "../data/content";
import "./capabilities.css";

const LAYER_DATA = [
  { ...LAYERS[0], scenarios: COLLAB_SCENARIOS, scKey: "collab" },
  { ...LAYERS[1], scenarios: BUSINESS_SCENARIOS, scKey: "biz" },
  { ...LAYERS[2], scenarios: CAPABILITY_SCENARIOS as any, scKey: "cap" },
];

export default function Capabilities() {
  const [active, setActive] = useState("collab");
  const activeLayer = LAYER_DATA.find((l) => l.scKey === active)!;
  const activeIdx = LAYER_DATA.findIndex((l) => l.scKey === active);

  return (
    <div className="cap-page">
      {/* HERO */}
      <section className="cap-hero">
        <div className="shell">
          <div className="cap-hero-grid rise">
            <div className="cap-hero-headline">
              <span className="cap-kicker">能力体系 · CAPABILITIES</span>
              <h1 className="cap-title serif">三层能力</h1>
              <p className="cap-subline serif">
                <em>独立切入</em>，<em>组合推进</em>。
              </p>
            </div>
            <aside className="cap-hero-side">
              <p className="cap-lede">
                <span>从协作层切入，2-4 周见到第一个实效。</span>
                <span>由浅入深，不必一次性大投入。</span>
                <span>三层既可独立落地，也能形成完整 AI 路径。</span>
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* LAYER DETAIL */}
      <section className="cap-detail">
        <div className="shell">
          {/* Sticky compact switcher — visible while scrolling through scenarios */}
          <nav className="cap-sticky-tabs" aria-label="切换能力层">
            {LAYER_DATA.map((l, i) => (
              <button
                key={l.scKey}
                className={`cap-sticky-tab ${active === l.scKey ? "is-on" : ""}`}
                onClick={() => setActive(l.scKey)}
              >
                <span className="cap-sticky-tab-l">L{i + 1}</span>
                <span className="cap-sticky-tab-n">{l.name}</span>
                <span className="cap-sticky-tab-d">{l.duration}</span>
              </button>
            ))}
          </nav>

          <div className="cap-detail-head">
            <div className="cap-detail-num serif">0{activeIdx + 1}</div>
            <div className="cap-detail-titles">
              <h2 className="cap-detail-title serif">{activeLayer.tagline}。</h2>
              <p className="cap-detail-desc">{activeLayer.desc}</p>
            </div>
          </div>

          <ul className="cap-services">
            {activeLayer.services.map((s) => (
              <li key={s} className="cap-service">
                {s}
              </li>
            ))}
          </ul>

          {/* SCENARIOS — soft white cards */}
          <div className="cap-scenarios" key={active}>
            {activeLayer.scenarios.map((sc: any) => (
              <article key={sc.code} className="scenario-card">
                <header className="scenario-card-head">
                  <span className="scenario-card-code">{sc.code}</span>
                  <h3 className="scenario-card-title serif">{sc.title}</h3>
                </header>

                <div className="scenario-card-body">
                  <div className="scenario-block">
                    <div className="scenario-block-h">痛点</div>
                    <ul className="scenario-list">
                      {sc.pains.map((p: string, i: number) => (
                        <li key={i}>
                          <span className="scenario-list-num">0{i + 1}</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="scenario-block scenario-block-sol">
                    <div className="scenario-block-h">方案</div>
                    <ul className="scenario-list">
                      {(sc.solutions || []).map((s: string, i: number) => (
                        <li key={i}>
                          <span className="scenario-list-num">0{i + 1}</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>

                    {sc.queries && (
                      <div className="scenario-queries">
                        <div className="scenario-block-h">示例对话</div>
                        {sc.queries.map((q: string) => (
                          <div key={q} className="scenario-query">
                            <span className="scenario-q-mark">›</span>
                            <span>{q}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {sc.tracks && (
                      <div className="scenario-tracks">
                        {sc.tracks.map((t: any) => (
                          <div key={t.name} className="track">
                            <div className="track-head">
                              <span className="track-name serif">{t.name}</span>
                              <span className="track-duration">{t.duration}</span>
                            </div>
                            <p className="track-body">{t.body}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {sc.metrics && sc.metrics.length > 0 && (
                  <div className="scenario-metrics">
                    {sc.metrics.map((m: any) => (
                      <div key={m.label} className="scenario-metric">
                        <span className="scenario-mval serif">{m.value}</span>
                        <span className="scenario-mlabel">{m.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cap-cta-section">
        <div className="shell cap-cta-inner">
          <h2 className="cap-cta-title serif">
            想知道<em>哪一层</em>最适合你？
          </h2>
          <Link to="/about" className="btn btn-solid btn-large">
            预约 2 周免费诊断 <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
