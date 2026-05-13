export const COMPANY = {
  cn: "猩猩猴子人工智能科技（上海）有限公司",
  short: "猩猩猴子",
  en: "GMonkey  /  Enterprise AI Consulting & Delivery",
  tagline: "企业 AI 转型咨询与落地服务商",
  lede: "让中小企业在 2-4 周内，真正用上 AI、见到实效。",
  edge: "大厂专属云资源",
  ecosystem: "云大厂战略生态企业",
};

export const STEPS = [
  {
    code: "01",
    name: "诊断",
    en: "DIAGNOSE",
    duration: "2 周",
    cost: "免费 / 低费",
    body: "AI 就绪度评估：明确企业能从哪里切入 AI，出具诊断报告与路线图。",
  },
  {
    code: "02",
    name: "试点",
    en: "PILOT",
    duration: "1 个月",
    cost: "小投入",
    body: "从协作层或经营层选几个核心业务场景快速落地，见到实效。",
  },
  {
    code: "03",
    name: "扩展",
    en: "SCALE",
    duration: "3-6 个月",
    cost: "系统推进",
    body: "经营层 + 能力层全面铺开，完成企业 AI 化升级。",
  },
];

export const LAYERS = [
  {
    code: "L1",
    key: "collab",
    name: "协作层",
    en: "COLLABORATION",
    tagline: "让员工先用起来",
    desc: "效率立刻提升，门槛低、见效快。",
    duration: "1-4 周",
    color: "var(--bone)",
    services: ["销售工具", "内部 AI 工作台", "文档与会议提效"],
  },
  {
    code: "L2",
    key: "business",
    name: "经营层",
    en: "BUSINESS",
    tagline: "让数据流动起来",
    desc: "让企业经营更聪明，决策从经验走向数据。",
    duration: "1-3 个月",
    color: "var(--phosphor)",
    services: ["AI 知识库", "智能经营驾驶舱", "定制 AI 应用"],
  },
  {
    code: "L3",
    key: "capability",
    name: "能力层",
    en: "CAPABILITY",
    tagline: "授人以渔",
    desc: "让企业自己会进化，持续迭代。",
    duration: "3-6 个月",
    color: "var(--ember)",
    services: ["IT 架构升级", "AI 技能培训", "数据中台改造", "私有化部署"],
  },
];

export type Metric = { value: string; label: string; trend?: "up" | "down" };

export const COLLAB_SCENARIOS = [
  {
    code: "C-01",
    title: "销售与客户跟进智能化",
    en: "Sales Enablement",
    pains: [
      "销冠经验复制不了，新人三个月不出单",
      "客户跟进记录散落各处，难追踪",
      "老客户维护靠感觉，续约错失时机",
    ],
    solutions: [
      "AI 话术助手：输入客户类型，自动生成跟进话术",
      "客户画像自动聚合：聊天、订单、拜访记录归档",
      "智能提醒：哪些客户超 7 天未跟进？",
    ],
    metrics: [
      { value: "3 周", label: "新人首单周期（原 3 个月）" },
      { value: "-20%", label: "客户流失率", trend: "down" as const },
    ],
  },
  {
    code: "C-02",
    title: "内部统一 AI 工作台",
    en: "Unified AI Workspace",
    pains: [
      "员工自己注册 ChatGPT，数据安全没保障",
      "各部门工具不统一，IT 四处救火",
      "买了 AI 工具，实际使用率不到 10%",
    ],
    solutions: [
      "企业级统一 AI 入口：文档、纪要、邮件、数据",
      "权限分级 + 用量可视",
      "私有化部署，核心数据不出企业",
    ],
    metrics: [
      { value: "75%", label: "AI 工具使用率（原 10%）", trend: "up" as const },
      { value: "-40%", label: "IT 部门工单量", trend: "down" as const },
    ],
  },
  {
    code: "C-03",
    title: "文档与会议提效",
    en: "Document & Meeting",
    pains: [
      "写一份汇报 PPT 耗一天",
      "会议纪要整理 2 小时",
      "找三个月前的文件翻遍文件夹",
    ],
    solutions: [
      "智能文档生成：输入关键词，AI 自动出 PPT 大纲",
      "会议智能纪要：10 分钟出结构化纪要",
      "自然语言搜索：秒级定位文件",
    ],
    metrics: [
      { value: "-50%", label: "人均文书工作时间", trend: "down" as const },
      { value: "10 min", label: "会议纪要生成" },
    ],
  },
];

export const BUSINESS_SCENARIOS = [
  {
    code: "B-01",
    title: "企业 AI 知识库",
    en: "Enterprise Knowledge",
    pains: [
      "技术骨干离职，经验跟着人走",
      "产品资料、制度文件分散在 10 个地方",
      "客服 / 销售每天重复回答相同问题",
    ],
    solutions: [
      "私有知识库：文档、聊天记录、视频自动建立关联",
      "自然语言问答，新文件上传后自动学习",
    ],
    metrics: [
      { value: "10×", label: "知识检索效率", trend: "up" as const },
      { value: "80%", label: "新人自助解决率" },
    ],
  },
  {
    code: "B-02",
    title: "智能经营驾驶舱",
    en: "Intelligent Dashboard",
    pains: ["管理层看报表靠财务月末汇总，想实时了解数据只能打电话问各部门"],
    solutions: [
      "对话式数据分析：自然语言提问，AI 自动生成图表、分析原因、给出预警",
    ],
    metrics: [
      { value: "分钟级", label: "决策响应（原天级）", trend: "up" as const },
    ],
    queries: [
      "Q3 南疆片区毛利率为什么下降？",
      "跟去年同期比，哪些渠道在增长？",
      "下月哪些 SKU 可能断货？",
    ],
  },
  {
    code: "B-03",
    title: "定制 AI 应用搭建",
    en: "Custom AI Apps",
    pains: [
      "通用 SaaS 不满足行业特性",
      "自研团队成本高、周期长",
      "企业有独特业务流程，找不到现成产品",
    ],
    solutions: [
      "基于云大厂算力底座，低代码 + AI 快速搭建",
      "4-6 周完成传统开发 3 个月的工作",
      "迭代周期从天级到小时级",
    ],
    metrics: [
      { value: "1/5", label: "定制成本（vs 传统开发）", trend: "down" as const },
      { value: "4 周", label: "上线周期" },
    ],
  },
];

export const CAPABILITY_SCENARIOS = [
  {
    code: "K-01",
    title: "IT 架构升级",
    en: "IT Foundation",
    pains: [
      "现有系统老旧，数据分散在 Excel、ERP、微信群",
      "AI 无米下锅，数据孤岛严重",
    ],
    solutions: [
      "数据中台轻量化改造",
      "AI Ready 架构咨询",
      "私有化部署 + 等保合规",
    ],
    metrics: [],
  },
  {
    code: "K-02",
    title: "AI 技能培训体系",
    en: "Training Program",
    pains: [
      "员工不会用 AI，买了工具没人会用",
      "管理层看不懂投入产出，不敢决策",
      "IT 团队懂技术不懂业务，落地难",
    ],
    tracks: [
      { name: "高管 AI 战略工作坊", duration: "半天", body: "看懂 AI 趋势 · 算清投入产出账 · 选对落地路径" },
      { name: "AI 实操训练营", duration: "2 天", body: "从 Prompt 写作到工作流搭建 · 真实业务场景演练" },
      { name: "AI 应用开发实训", duration: "3 天", body: "掌握企业级 AI 工具部署 · 模型调优与集成" },
    ],
    metrics: [],
  },
];

export const CASES = [
  {
    code: "01",
    industry: "农业",
    industryEn: "Agriculture",
    title: "农技经验终于留住了",
    sub: "某棉花种植服务企业 · 服务 5000 亩棉田",
    scene: "依赖老农技员做病虫害判断",
    pains: [
      "老农技员即将退休，年轻人判断准确率不足",
      "病虫害图片分散在手机相册，无法系统复用",
      "棉农微信群重复提问，农技员疲于应对",
    ],
    solutions: [
      "农业 AI 知识库：录入病虫害图谱 + 防治方案 + 施肥记录",
      "棉农拍照上传，AI 识别病虫害并推荐方案",
      "县域服务器本地化部署，适应农村网络环境",
    ],
    metrics: [
      { value: "92%", label: "病虫害识别准确率（原 70%）", trend: "up" as const },
      { value: "-60%", label: "农技员日均答疑量", trend: "down" as const },
    ],
    quote: "农技专家经验沉淀为 AI 知识库，从「人找人问」到「拍照即得答案」。",
  },
  {
    code: "02",
    industry: "电商",
    industryEn: "E-Commerce",
    title: "从经验到数据",
    sub: "某新疆干果电商企业 · 年销 3000 万 · SKU 超 200",
    scene: "旺季备货凭感觉，平台数据分散",
    pains: [
      "旺季备货凭感觉，红枣备多核桃备少",
      "各平台数据分散，看不清全貌",
      "客服反复回答产地、物流问题",
    ],
    solutions: [
      "AI 经营驾驶舱：自然语言问数据",
      "AI 库存预警：历史 + 节日 + 天气预测",
      "客服知识库：接入产地、物流政策",
    ],
    metrics: [
      { value: "-22%", label: "库存积压", trend: "down" as const },
      { value: "+35%", label: "客服人均接待量", trend: "up" as const },
    ],
    quote: "从老板拍脑袋进货，到 AI 预测 + 数据驱动决策。",
  },
  {
    code: "03",
    industry: "文旅",
    industryEn: "Tourism",
    title: "让每位游客感到被了解",
    sub: "某文旅运营公司 · 3 个景区 + 2 条线路",
    scene: "游客咨询量爆炸，舆情发现滞后",
    pains: [
      "游客咨询量爆炸，客服重复回答",
      "评价分散多平台，负面舆情发现滞后",
      "淡旺季人员排班靠经验",
    ],
    solutions: [
      "AI 客服 + 行程助手：7×24 小时按偏好推荐",
      "舆情聚合分析：多平台评价自动抓取",
      "客流预测：指导人员排班与资源配置",
    ],
    metrics: [
      { value: "即时", label: "客服响应（原 15 分钟）", trend: "up" as const },
      { value: "-15%", label: "旺季人力成本", trend: "down" as const },
    ],
    quote: "从「人海战术应对旺季」到「AI 全天候精准服务」。",
  },
  {
    code: "04",
    industry: "政企",
    industryEn: "Government",
    title: "辖区企业一张大屏看清",
    sub: "某区县政府 · 服务 12,840 家辖区企业",
    scene: "底数不清、好政策找不到好企业",
    pains: [
      "辖区企业数字化程度参差不齐，底数不清",
      "好政策找不到好企业，补贴落地难",
      "缺乏产业数据抓手，决策靠经验",
    ],
    solutions: [
      "企业 AI 就绪度诊断：辖区企业一张大屏看清",
      "政策 AI 匹配引擎：企业输入即知可申请的补贴、技改资金",
      "区域产业知识库：本地政策、办事流程 AI 化",
    ],
    metrics: [
      { value: "12,840", label: "辖区在档企业（已诊断 7,210）", trend: "up" as const },
      { value: "¥ 2.1B", label: "本季度政策匹配总额", trend: "up" as const },
    ],
    quote: "从「审批监管」走向「主动赋能」——政策落地、产业升级有了数据抓手。",
  },
];

export const GOV_SOLUTIONS = [
  {
    code: "G-01",
    title: "企业 AI 就绪度诊断",
    body: "辖区企业填写信息，AI 自动评估数字化水平。一张大屏看清辖区企业全景。",
  },
  {
    code: "G-02",
    title: "政策 AI 匹配引擎",
    body: "企业输入行业、规模、现状，AI 匹配可申请的补贴、技改资金。",
  },
  {
    code: "G-03",
    title: "区域产业知识库",
    body: "本地产业政策、办事流程 AI 化。对内提升效率，对外服务企业投资。",
  },
];

export const AUDIENCES = [
  {
    code: "A",
    who: "企业负责人",
    start: "从「免费 AI 诊断」开始",
    detail: "2 周明确切入点 · 生成 AI 就绪度报告与落地路线图",
  },
  {
    code: "B",
    who: "政府管理者",
    start: "从「区域企业 AI 成熟度调研」开始",
    detail: "掌握产业底数 · 为政策制定提供数据支撑",
  },
  {
    code: "C",
    who: "已试点但效果不佳",
    start: "从「落地复盘」开始",
    detail: "找到真问题 · 重新诊断，精准施策",
  },
];
