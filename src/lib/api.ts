// 前端 API 客户端 - 调用 /api/*
// dev 时 vite proxy 把 /api 转发到 :8787; production 由部署侧决定.

import type { DiagnoseAnswers, DiagnoseScores, Layer } from "../data/diagnose";

const BASE = "/api";

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(BASE + path, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${path} failed: ${res.status} ${text}`);
  }
  return res.json() as Promise<T>;
}

// ----- diagnoses -----
export interface DiagnosisPayload {
  industry: string;
  size?: string;
  role?: string;
  data?: string;
  it?: string;
  ai?: string;
  goal?: string;
  pains: string[];
  timeline?: string;
  readiness: number;
  score_data: number;
  score_it: number;
  score_ai: number;
  recommended_layer: Layer;
  scenario_codes: string[];
  session_id?: string;
}

export function postDiagnosis(p: DiagnosisPayload) {
  return http<{ ok: true; id: number }>("/diagnoses", {
    method: "POST",
    body: JSON.stringify(p),
  });
}

// 把答案 + 算出来的结论打包成入库 payload
export function buildDiagnosisPayload(
  a: DiagnoseAnswers,
  s: DiagnoseScores,
  layer: Layer,
  scenarioCodes: string[],
): DiagnosisPayload {
  return {
    industry: a.industry || "other",
    size: a.size,
    role: a.role,
    data: a.data,
    it: a.it,
    ai: a.ai,
    goal: a.goal,
    pains: a.pains,
    timeline: a.timeline,
    readiness: s.readiness,
    score_data: s.data,
    score_it: s.it,
    score_ai: s.ai,
    recommended_layer: layer,
    scenario_codes: scenarioCodes,
    session_id: getSessionId(),
  };
}

// ----- contacts -----
export interface ContactPayload {
  type?: string;
  company: string;
  name: string;
  role?: string;
  contact: string;
  note?: string;
  /** 不需要前端显式传,postContact 会自动注入当前 session id,
   *  这样后端能把"做过诊断"和"提交联系表单"的同一访客关联起来. */
  session_id?: string;
}

export function postContact(p: ContactPayload) {
  return http<{ ok: true; id: number }>("/contacts", {
    method: "POST",
    body: JSON.stringify({
      ...p,
      session_id: p.session_id ?? getSessionId(),
    }),
  });
}

// ----- stats -----
export interface ServedStats {
  served: number;
  contacts: number;
  diagnoses: number;
}

export function getServedStats() {
  return http<ServedStats>("/stats/served");
}

// ----- session helper -----
// 简单 session id,用于一次会话内的去重统计.不识别身份.
function getSessionId(): string {
  try {
    let id = sessionStorage.getItem("gmonkey:sid");
    if (!id) {
      id =
        Date.now().toString(36) +
        Math.random().toString(36).slice(2, 10);
      sessionStorage.setItem("gmonkey:sid", id);
    }
    return id;
  } catch {
    return "";
  }
}
