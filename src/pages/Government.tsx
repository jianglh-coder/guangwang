import { Link } from "react-router-dom";
import { GOV_SOLUTIONS } from "../data/content";
import "./government.css";

const PAINS = [
  "企业数字化程度参差不齐，底数不清",
  "好政策找不到好企业，补贴落地难",
  "缺乏产业数据抓手，决策靠经验",
];

const GOV_MODES = [
  {
    code: "M-01",
    name: "区域企业 AI 调研",
    duration: "4-8 周",
    scope: "1 个区 / 县",
    body: "辖区企业数字化与 AI 就绪度普查。出具《辖区产业 AI 化白皮书》，为政策制定提供数据底座。",
  },
  {
    code: "M-02",
    name: "联合举办「AI 进万企」",
    duration: "持续",
    scope: "企业培训",
    body: "面向辖区企业的 AI 战略与实操培训，政府背书、我们交付。降低中小企业接触 AI 的门槛。",
  },
  {
    code: "M-03",
    name: "共建区域 AI 服务平台",
    duration: "6-12 个月",
    scope: "平台共建",
    body: "搭建并运营辖区企业 AI 服务平台，承担「企业一键申请 AI 诊断 + 政策匹配」入口。",
  },
];

export default function Government() {
  return (
    <div className="gov-page">
      {/* HERO */}
      <section className="gov-hero">
        <div className="shell">
          <div className="gov-hero-grid">
            <div className="gov-hero-left rise">
              <span className="gov-kicker">政企协同 · GOVERNMENT × ENTERPRISE</span>
              <h1 className="gov-title serif">
                从<em>审批监管</em>，<br />
                走向<em>主动赋能</em>。
              </h1>
              <p className="gov-lede">
                区域企业 AI 就绪度服务平台——掌握辖区企业数字化真实底数，让政策落地、产业升级有数据抓手。
              </p>
            </div>

            <aside className="gov-hero-card reveal">
              <div className="gov-hero-card-head">
                <span className="gov-hero-card-id">区域产业大屏 · 实时</span>
                <span className="gov-hero-pulse" aria-hidden />
              </div>
              <dl className="gov-hero-metrics">
                <div>
                  <dt>辖区在档企业</dt>
                  <dd><span className="serif">12,840</span></dd>
                </div>
                <div>
                  <dt>已完成 AI 诊断</dt>
                  <dd><span className="serif">7,210</span></dd>
                </div>
                <div>
                  <dt>高就绪企业</dt>
                  <dd><span className="serif">1,964</span></dd>
                </div>
                <div className="is-highlight">
                  <dt>本季度政策匹配</dt>
                  <dd><span className="serif">¥ 2.1B</span></dd>
                </div>
              </dl>
              <div className="gov-hero-card-foot">
                <span className="gov-hero-dot" /> 数据采集 · 在线
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="gov-pain">
        <div className="shell">
          <header className="gov-pain-head">
            <h2 className="gov-h2 serif">
              以前<em>看不清</em>，<br />
              所以政策<em>难落地</em>。
            </h2>
            <p className="gov-pain-sub">
              区县政府在产业治理、政策匹配上的三个真问题——
            </p>
          </header>
          <ol className="gov-pain-list reveal-stagger">
            {PAINS.map((p, i) => (
              <li key={i} className="gov-pain-item">
                <span className="gov-pain-num serif">0{i + 1}</span>
                <p className="gov-pain-text">{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="gov-solutions-section">
        <div className="shell">
          <header className="gov-section-head">
            <h2 className="gov-h2 serif">
              一张<em>大屏</em>，<br />
              看清辖区<em>全景</em>。
            </h2>
            <p className="gov-section-sub">
              三个相互衔接的能力：从底数 → 政策匹配 → 产业服务。可独立部署，也可一体推进。
            </p>
          </header>

          <div className="gov-solutions reveal-stagger">
            {GOV_SOLUTIONS.map((sol, i) => (
              <article key={sol.code} className="gov-solution">
                <header className="gov-solution-head">
                  <span className="gov-solution-step">STEP 0{i + 1}</span>
                  <span className="gov-solution-code">{sol.code}</span>
                </header>
                <h3 className="gov-solution-title serif">{sol.title}</h3>
                <p className="gov-solution-body">{sol.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARD MOCK */}
      <section className="gov-dashboard">
        <div className="shell">
          <header className="gov-section-head">
            <h2 className="gov-h2 serif">
              <em>区域 AI 就绪度大屏</em>·示意
            </h2>
            <p className="gov-section-sub">
              示意一下我们能给辖区交付的实时大屏——不是 PPT 截图。
            </p>
          </header>

          <div className="gov-board reveal">
            <div className="gov-board-head">
              <span className="gov-board-title">区域 · AI · 就绪度监测</span>
              <div className="gov-board-tabs">
                <span className="is-on">实时</span>
                <span>本周</span>
                <span>本月</span>
                <span>季度</span>
              </div>
            </div>

            <div className="gov-board-grid">
              <div className="gov-board-card gov-board-big">
                <div className="gov-board-h">辖区企业 AI 就绪度</div>
                <div className="gov-bar-list">
                  {[
                    ["制造", 78],
                    ["农业", 64],
                    ["零售 / 电商", 71],
                    ["文旅", 56],
                    ["能源", 48],
                    ["其他", 33],
                  ].map(([name, val]) => (
                    <div key={name as string} className="gov-bar-row">
                      <span className="gov-bar-name">{name}</span>
                      <div className="gov-bar-track">
                        <div className="gov-bar-fill" style={{ width: `${val}%` }} />
                      </div>
                      <span className="gov-bar-val">{val}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="gov-board-card">
                <div className="gov-board-h">政策匹配</div>
                <div className="gov-board-num serif">¥ 2.1<span className="gov-board-unit">B</span></div>
                <p className="gov-board-cap">本季度可申请补贴 / 技改资金</p>
                <ul className="gov-board-list">
                  <li><span className="gov-board-list-i">·</span> 数字化转型专项 · ¥ 800M</li>
                  <li><span className="gov-board-list-i">·</span> 产业 AI 试点 · ¥ 540M</li>
                  <li><span className="gov-board-list-i">·</span> 县域产业带 · ¥ 760M</li>
                </ul>
              </div>

              <div className="gov-board-card">
                <div className="gov-board-h">企业画像 · 高潜</div>
                <ul className="gov-tags">
                  {[
                    ["规模成长", 4],
                    ["数据基础", 3],
                    ["管理意愿", 5],
                    ["IT 投入", 2],
                  ].map(([n, s]) => (
                    <li key={n as string}>
                      <span className="gov-tag-name">{n}</span>
                      <span className="gov-tag-stars">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={i < (s as number) ? "on" : ""}>●</span>
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="gov-board-card gov-board-status">
                <div className="gov-board-h">状态指标</div>
                <div className="gov-foot-grid">
                  <div><span className="gov-status-dot ok" />数据采集 · 在线</div>
                  <div><span className="gov-status-dot ok" />模型推理 · 正常</div>
                  <div><span className="gov-status-dot warn" />数据回流 · 延迟 12s</div>
                  <div><span className="gov-status-dot ok" />API 网关 · 正常</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COOPERATION MODES */}
      <section className="gov-coop">
        <div className="shell">
          <header className="gov-section-head">
            <h2 className="gov-h2 serif">
              政企合作的<em>三种姿态</em>
            </h2>
            <p className="gov-section-sub">
              从单次调研到长期共建，可独立切入，也可逐步深化。
            </p>
          </header>
          <ol className="gov-coop-list reveal-stagger">
            {GOV_MODES.map((s) => (
              <li key={s.code} className="gov-coop-row">
                <div className="gov-coop-num serif">{s.code}</div>
                <div className="gov-coop-body">
                  <div className="gov-coop-head">
                    <h3 className="gov-coop-name serif">{s.name}</h3>
                    <div className="gov-coop-meta">
                      <span>{s.duration}</span>
                      <span>·</span>
                      <span>{s.scope}</span>
                    </div>
                  </div>
                  <p className="gov-coop-text">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="gov-cta">
        <div className="shell gov-cta-inner">
          <h2 className="gov-cta-title serif">
            想为<em>辖区企业</em>做点真事？
          </h2>
          <Link to="/about" className="btn btn-solid btn-large">
            预约政企方案沟通 <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
