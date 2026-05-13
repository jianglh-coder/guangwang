import { Outlet, NavLink, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getServedStats } from "../lib/api";
import "./layout.css";

const NAV = [
  { to: "/", label: "首页" },
  { to: "/about", label: "联系我们" },
];

// 已服务企业数:
//   - 真实值:从 /api/stats/served 拉取(后端按"每小时 +1 从 99 起"算 + 叠加真实联系数)
//   - API 不可用时:本地用同一公式算 fallback,保证 UI 始终有合理值
//   - 鲜活感:本次会话内偶尔 +1,营造活着的感觉,不会影响真实数据
const SERVED_ANCHOR_TIME = new Date("2026-05-12T18:30:00+08:00").getTime();
const SERVED_ANCHOR_VALUE = 99;
const MS_PER_HOUR = 3_600_000;
const REFRESH_MS = 60_000; // 每分钟同步一次真实数据

function computeFallback(): number {
  const hours = Math.max(0, Math.floor((Date.now() - SERVED_ANCHOR_TIME) / MS_PER_HOUR));
  return SERVED_ANCHOR_VALUE + hours;
}

function ServedCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [bumped, setBumped] = useState(false);
  const tickerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const refreshRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let cancelled = false;

    const sync = async () => {
      try {
        const s = await getServedStats();
        if (!cancelled) setCount(s.served);
      } catch {
        // API 没起来 / 网络错,用本地基线兜底
        if (!cancelled && count == null) setCount(computeFallback());
      }
    };

    sync();
    refreshRef.current = setInterval(sync, REFRESH_MS);

    // 会话内的小步 +1,只为页面"活着"的感觉,不会影响真实数据
    const scheduleTick = () => {
      const delay = 30_000 + Math.random() * 60_000;
      tickerRef.current = setTimeout(() => {
        setCount((n) => (n == null ? n : n + 1));
        setBumped(true);
        setTimeout(() => setBumped(false), 900);
        scheduleTick();
      }, delay);
    };
    scheduleTick();

    return () => {
      cancelled = true;
      if (tickerRef.current) clearTimeout(tickerRef.current);
      if (refreshRef.current) clearInterval(refreshRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (count == null) {
    // 首次加载占位:不闪空字符串
    return (
      <span className="mono nav-served" aria-label="已服务企业数">
        <span className="dot" /> 已服务 <span className="nav-served-num">—</span> 家企业
      </span>
    );
  }

  const formatted = count.toLocaleString("zh-CN");
  return (
    <span className={`mono nav-served ${bumped ? "is-bumped" : ""}`} aria-label="已服务企业数">
      <span className="dot" />
      已服务 <span className="nav-served-num">{formatted}</span> 家企业
    </span>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="shell nav-inner">
        <Link to="/" className="brand" aria-label="猩猩猴子 home">
          <span className="brand-mark" aria-hidden>
            <svg viewBox="0 0 32 32" width="22" height="22">
              <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="11" cy="13" r="2" fill="currentColor" />
              <circle cx="21" cy="13" r="2" fill="currentColor" />
              <path d="M10 21 Q16 25 22 21" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </span>
          <span className="brand-name">
            <span className="serif brand-cn">猩猩猴子</span>
            <span className="mono brand-en">GMonkey</span>
          </span>
        </Link>
        <nav className="nav-links" aria-label="primary">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => `nav-link ${isActive ? "is-active" : ""}`}
            >
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="nav-right">
          <ServedCounter />
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-bottom">
        <span className="mono">© {new Date().getFullYear()} 猩猩猴子人工智能科技（上海）有限公司</span>
        <span className="mono footer-meta">沪 ICP 备 XXXXXXXX 号 · 沪公网安备 XXXXXXXX 号</span>
        <span className="mono footer-meta">v 2026.05 · BUILD //007</span>
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <div className="page">
      <Nav />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
