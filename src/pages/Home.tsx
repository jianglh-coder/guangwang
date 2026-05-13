import { Link } from "react-router-dom";
import { LAYERS, STEPS, CASES } from "../data/content";
import "./home.css";
import "./home-light.css";

// Industries — radial concentric rings around an "企业 AI" core
type IndustryTag = {
  name: string;
  size: number;
  tier: "primary" | "accent" | "ember" | "muted" | "dim";
  italic?: boolean;
  angle: number;   // deg, 0 = right, 90 = down (CSS convention)
  radius: number;  // px from center
};

const INDUSTRIES: IndustryTag[] = [
  // R1 内环（半径 ~88）— 6 个一级重点行业，60° 等分
  { name: "制造", size: 22, tier: "primary",                angle:  30, radius:  88 },
  { name: "农业", size: 20, tier: "accent",  italic: true,  angle:  90, radius:  88 },
  { name: "电商", size: 20, tier: "primary",                angle: 150, radius:  88 },
  { name: "文旅", size: 20, tier: "accent",  italic: true,  angle: 210, radius:  88 },
  { name: "政企", size: 20, tier: "ember",   italic: true,  angle: 270, radius:  88 },
  { name: "能源", size: 20, tier: "primary",                angle: 330, radius:  88 },

  // R2 中环（半径 ~150）— 10 个次重点，36° 等分（错开 R1 的角度）
  { name: "金融",     size: 16, tier: "primary",               angle:   0, radius: 150 },
  { name: "医疗",     size: 16, tier: "accent",  italic: true, angle:  36, radius: 150 },
  { name: "教育",     size: 15, tier: "primary",               angle:  72, radius: 150 },
  { name: "汽车",     size: 15, tier: "primary",               angle: 108, radius: 150 },
  { name: "零售",     size: 15, tier: "accent",  italic: true, angle: 144, radius: 150 },
  { name: "物流",     size: 15, tier: "primary",               angle: 180, radius: 150 },
  { name: "新能源",   size: 15, tier: "ember",   italic: true, angle: 216, radius: 150 },
  { name: "智能制造", size: 14, tier: "accent",                angle: 252, radius: 150 },
  { name: "餐饮",     size: 14, tier: "muted",                 angle: 288, radius: 150 },
  { name: "快消",     size: 14, tier: "muted",                 angle: 324, radius: 150 },

  // R3 外环（半径 ~210）— 14 个二级延伸，约 25.7° 等分
  { name: "化工",     size: 12, tier: "muted", angle:  12, radius: 210 },
  { name: "建筑",     size: 12, tier: "muted", angle:  38, radius: 210 },
  { name: "服装",     size: 11, tier: "muted", angle:  64, radius: 210 },
  { name: "家居",     size: 11, tier: "muted", angle:  90, radius: 210 },
  { name: "智慧文旅", size: 11, tier: "dim",   angle: 115, radius: 210 },
  { name: "数字农业", size: 11, tier: "dim",   angle: 141, radius: 210 },
  { name: "县域产业", size: 11, tier: "dim",   angle: 167, radius: 210 },
  { name: "工业互联", size: 11, tier: "dim",   angle: 193, radius: 210 },
  { name: "智慧城市", size: 11, tier: "dim",   angle: 218, radius: 210 },
  { name: "金融科技", size: 11, tier: "dim",   angle: 244, radius: 210 },
  { name: "生物医药", size: 11, tier: "dim",   angle: 270, radius: 210 },
  { name: "高端装备", size: 11, tier: "dim",   angle: 296, radius: 210 },
  { name: "环保科技", size: 11, tier: "dim",   angle: 322, radius: 210 },
  { name: "跨境电商", size: 11, tier: "dim",   angle: 348, radius: 210 },
];

export default function Home() {
  return (
    <div className="home">
      {/* HERO — number-hook editorial */}
      <section className="hero">
        <div className="shell">
          <div className="hero-inner rise">
            <h1 className="hero-headline">
              <span className="hero-num serif">3</span>
              <span className="hero-unit serif">分钟</span>
            </h1>
            <p className="hero-sub serif">
              迈出<em>企业AI转型</em>的第一步
            </p>
            <p className="hero-lede-sub">
              回答几个关于企业规模、AI基础、转型目标的问题
              我们会给你一份<strong>企业AI转型初诊报告</strong>
            </p>
            <div className="hero-ticker mono" aria-hidden>
              <span>不收费</span>
              <span className="hero-ticker-dot" />
              <span>无需注册</span>
            </div>
            <div className="hero-ctas">
              <Link to="/diagnose" className="btn btn-solid btn-large">
                开始诊断 <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 01 — CAPABILITIES PREVIEW */}
      <section className="section module module-cap reveal">
        <div className="shell">
          <header className="module-head">
            <div className="module-meta mono">
              <Link to="/capabilities" className="module-meta-link">能力体系 →</Link>
            </div>
            <div className="module-head-grid">
              <h2 className="module-title serif">
                让<em>团队</em>跑起来，<br />
                让<em>数据</em>流动起来，<br />
                最后让<em>企业</em>自动进化。
              </h2>
              <p className="module-sub">
                三层能力。可独立切入，也可组合推进。
                所有方案均基于私有化 / 可控部署。
              </p>
            </div>
          </header>

          <div className="layers reveal-stagger">
            {LAYERS.map((layer, idx) => (
              <Link
                to="/capabilities"
                key={layer.key}
                className="layer"
                style={{ ["--accent" as string]: layer.color }}
              >
                <div className="layer-num mono">{layer.code}</div>
                <div className="layer-body">
                  <div className="layer-head">
                    <h3 className="layer-name serif">{layer.name}</h3>
                    <span className="mono layer-en">{layer.en}</span>
                  </div>
                  <p className="layer-tagline serif">{layer.tagline}</p>
                  <p className="layer-desc">{layer.desc}</p>
                  <ul className="layer-services">
                    {layer.services.map((s) => (
                      <li key={s}>
                        <span className="mono">+</span> {s}
                      </li>
                    ))}
                  </ul>
                  <div className="layer-foot mono">
                    <span>周期 {layer.duration}</span>
                    <span>STEP 0{idx + 1}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* MODULE 02 — CASES PREVIEW */}
      <section className="section module module-cases reveal">
        <div className="shell">
          <header className="module-head">
            <div className="module-meta mono">
              <Link to="/cases" className="module-meta-link">行业案例 →</Link>
            </div>
            <div className="module-head-grid module-head-grid-cases">
              <h2 className="module-title serif">
                <span className="module-title-line">把<em>行业经验</em>用AI</span>
                <span className="module-title-line">发挥出更大的<em>效果</em>。</span>
              </h2>
              <div className="industry-radial" aria-label="服务过的行业">
                <div className="industry-radial-rings" aria-hidden>
                  <span className="ring r1" />
                  <span className="ring r2" />
                  <span className="ring r3" />
                </div>
                <div className="industry-radial-core" aria-hidden>
                  <span className="serif core-label">企业 AI</span>
                  <span className="mono core-sub">EVERY · INDUSTRY</span>
                  <span className="core-pulse" />
                </div>
                {INDUSTRIES.map((it) => {
                  const rad = (it.angle * Math.PI) / 180;
                  const x = Math.cos(rad) * it.radius;
                  const y = Math.sin(rad) * it.radius;
                  return (
                    <span
                      key={it.name}
                      className={[
                        "industry-tag",
                        `t-${it.tier}`,
                        it.italic ? "is-italic serif" : "",
                      ].filter(Boolean).join(" ")}
                      style={{
                        fontSize: `${it.size}px`,
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                      }}
                    >
                      {it.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </header>

          <div className="cases-row reveal-stagger">
            {CASES.map((c) => (
              <Link key={c.code} to="/cases" className="case-card" state={{ focus: c.code }}>
                <div className="case-card-head">
                  <span className="mono case-card-code">{c.code} / {c.industryEn}</span>
                  <span className="case-card-tag mono">{c.industry}</span>
                </div>
                <h3 className="case-card-title serif">{c.title}</h3>
                <p className="case-card-sub">{c.sub}</p>
                <div className="case-card-metrics">
                  {c.metrics.slice(0, 1).map((m) => (
                    <div key={m.label} className="case-card-metric">
                      <span className="mono case-card-val">{m.value}</span>
                      <span className="case-card-mlabel">{m.label}</span>
                    </div>
                  ))}
                </div>
                <div className="case-card-foot mono">
                  阅读详情 <span aria-hidden>→</span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* HOW TO START */}
      <section className="section steps-section steps-module reveal">
        <div className="shell">
          <header className="steps-head">
            <h2 className="steps-head-title serif">
              即刻开启<em>企业 AI 转型</em>之路
            </h2>
            <div className="steps-head-rule" aria-hidden />
            <Link to="/about" className="btn btn-solid btn-large steps-head-cta">
              联系我们 <span aria-hidden>→</span>
            </Link>
          </header>

          <ol className="steps reveal-stagger">
            {STEPS.map((step, i) => (
              <li key={step.code} className="step">
                <div className="step-num serif">{step.code}</div>
                <div className="step-body">
                  <div className="step-titles">
                    <h3 className="step-name serif">{step.name}</h3>
                    <span className="mono step-en">{step.en}</span>
                  </div>
                  <p className="step-body-text">{step.body}</p>
                  <div className="step-tags mono">
                    <span>{step.duration}</span>
                    <span className="step-dot" />
                    <span>{step.cost}</span>
                  </div>
                </div>
                {i < STEPS.length - 1 && <div className="step-arrow mono">→</div>}
              </li>
            ))}
          </ol>
        </div>
      </section>

    </div>
  );
}
