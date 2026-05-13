import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Capabilities from "./pages/Capabilities";
import Cases from "./pages/Cases";
import Government from "./pages/Government";
import About from "./pages/About";
import Diagnose from "./pages/Diagnose";
import DiagnoseResult from "./pages/DiagnoseResult";

const SITE = "猩猩猴子";
const TITLES: Record<string, string> = {
  "/": "首页",
  "/capabilities": "能力体系",
  "/cases": "行业案例",
  "/government": "政企协同",
  "/about": "联系我们",
  "/diagnose": "企业转型初步诊断",
  "/diagnose/result": "诊断报告",
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function PageTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    const name = TITLES[pathname];
    document.title = name ? `${name} · ${SITE}` : `${SITE} — 企业 AI 咨询与落地`;
  }, [pathname]);
  return null;
}

/* Global reveal-on-scroll: any element with .reveal or .reveal-stagger
   gets .is-in added when it scrolls into view (once). */
function RevealOnScroll() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document
        .querySelectorAll<HTMLElement>(".reveal, .reveal-stagger")
        .forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
    );

    const observeAll = () => {
      document
        .querySelectorAll<HTMLElement>(".reveal:not(.is-in), .reveal-stagger:not(.is-in)")
        .forEach((el) => io.observe(el));
    };

    observeAll();

    // Safety pass: in case content arrives a frame late, observe again next frame.
    const raf = requestAnimationFrame(observeAll);

    // Catch dynamically inserted elements (e.g. tab switches that remount content).
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      io.disconnect();
    };
  }, [pathname]);
  return null;
}


export default function App() {
  return (
    <>
      <ScrollToTop />
      <PageTitle />
      <RevealOnScroll />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/capabilities" element={<Capabilities />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/government" element={<Government />} />
          <Route path="/about" element={<About />} />
          <Route path="/diagnose" element={<Diagnose />} />
          <Route path="/diagnose/result" element={<DiagnoseResult />} />
        </Route>
      </Routes>
    </>
  );
}
