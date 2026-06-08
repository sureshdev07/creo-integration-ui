import { useState, useRef, useEffect } from "react";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from "recharts";

// ─── IDC LOGO ─────────────────────────────────────────────────────────────────

// ─── LEFT SIDEBAR NAV ─────────────────────────────────────────────────────────
const NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    id: "workflow",
    label: "Product Draw",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
  },
];

// ─── HAMBURGER ICON ───────────────────────────────────────────────────────────
const HamburgerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6"  x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const Sidebar = ({ activeNav, onNav, dark, collapsed, onToggleCollapse }) => (
  <aside className={`flex-shrink-0 flex flex-col border-r transition-all duration-300 min-h-screen
    ${collapsed ? "w-16" : "w-56"}
    ${dark ? "bg-neutral-950 border-neutral-800" : "bg-white border-neutral-200"}`}>

    {/* Logo + hamburger row */}
    <div className={`h-16 flex items-center border-b flex-shrink-0
      ${collapsed ? "justify-center px-0" : "px-4 justify-between"}
      ${dark ? "border-neutral-800" : "border-neutral-200"}`}>

      {/* App name — hidden when collapsed */}
      {!collapsed && (
        <div className="overflow-hidden transition-all duration-300">
          <div className={`text-sm font-extrabold tracking-tight leading-tight ${dark ? "text-white" : "text-neutral-900"}`}>
            Product Draw
          </div>
          <div className={`text-[9px] font-bold uppercase tracking-[0.18em] mt-0.5 ${dark ? "text-neutral-500" : "text-neutral-400"}`}>
            Automation
          </div>
        </div>
      )}

      {/* Hamburger toggle */}
      <button
        onClick={onToggleCollapse}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-150 cursor-pointer flex-shrink-0
          ${dark
            ? "text-neutral-500 hover:bg-neutral-800 hover:text-white"
            : "text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900"}`}
      >
        <HamburgerIcon />
      </button>
    </div>

    {/* MENU label — hidden when collapsed */}
    {!collapsed && (
      <div className={`px-4 pt-4 pb-1 text-[10px] font-extrabold uppercase tracking-[0.15em]
        ${dark ? "text-neutral-600" : "text-neutral-400"}`}>
        Menu
      </div>
    )}

    {/* Nav items */}
    <nav className={`flex flex-col gap-0.5 flex-1 mt-1 ${collapsed ? "px-2" : "px-2"}`}>
      {NAV_ITEMS.map(item => {
        const active = activeNav === item.id;
        return (
          <div key={item.id} className="relative group/tooltip">
            <button
              onClick={() => onNav(item.id)}
              className={`w-full flex items-center rounded-lg font-semibold
                          transition-all duration-150 cursor-pointer text-left
                          ${collapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2.5"}
                ${active
                  ? "bg-red-700 text-white shadow-sm"
                  : dark
                    ? "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                    : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"}`}
            >
              {/* Icon */}
              <span className={`flex-shrink-0 transition-colors
                ${active ? "text-white" : dark ? "text-neutral-500 group-hover:text-white" : "text-neutral-400"}`}>
                {item.icon}
              </span>

              {/* Label — hidden when collapsed */}
              {!collapsed && (
                <span className="text-sm flex-1 whitespace-nowrap overflow-hidden">{item.label}</span>
              )}

              {/* Active dot — only when expanded */}
              {!collapsed && active && (
                <div className="w-1.5 h-1.5 rounded-full bg-white opacity-70 flex-shrink-0" />
              )}
            </button>

            {/* Tooltip — only when collapsed */}
            {collapsed && (
              <div className={`absolute left-full top-1/2 -translate-y-1/2 ml-2.5 px-2.5 py-1.5
                              rounded-md text-xs font-bold whitespace-nowrap pointer-events-none
                              opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-150 z-50
                ${dark ? "bg-neutral-800 text-white border border-neutral-700" : "bg-neutral-900 text-white"}`}>
                {item.label}
                {/* Arrow */}
                <div className={`absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent
                  ${dark ? "border-r-neutral-800" : "border-r-neutral-900"}`} />
              </div>
            )}
          </div>
        );
      })}
    </nav>

    {/* Bottom: version — hidden when collapsed */}
    <div className={`border-t transition-all duration-300
      ${dark ? "border-neutral-800" : "border-neutral-200"}
      ${collapsed ? "p-3 flex justify-center" : "p-4"}`}>
      {collapsed ? (
        /* Mini IDC dot when collapsed */
        <div className="w-2 h-2 rounded-full bg-red-700" />
      ) : (
        <>
          <div className={`text-[10px] font-bold uppercase tracking-widest ${dark ? "text-neutral-700" : "text-neutral-300"}`}>
            Integration Package
          </div>
          <div className={`text-[11px] font-mono mt-0.5 ${dark ? "text-neutral-600" : "text-neutral-400"}`}>
            v10.0.7.3
          </div>
        </>
      )}
    </div>
  </aside>
);

// ─── DASHBOARD PAGE ───────────────────────────────────────────────────────────
// ── Weekly data (last 12 weeks) ──
const jobTrendDataWeekly = [
  { week:"Wk 1",  jobs:6,  completed:5  }, { week:"Wk 2",  jobs:8,  completed:7  },
  { week:"Wk 3",  jobs:5,  completed:5  }, { week:"Wk 4",  jobs:9,  completed:8  },
  { week:"Wk 5",  jobs:11, completed:10 }, { week:"Wk 6",  jobs:7,  completed:6  },
  { week:"Wk 7",  jobs:13, completed:12 }, { week:"Wk 8",  jobs:10, completed:10 },
  { week:"Wk 9",  jobs:14, completed:13 }, { week:"Wk 10", jobs:12, completed:11 },
  { week:"Wk 11", jobs:16, completed:15 }, { week:"Wk 12", jobs:9,  completed:9  },
];

// ── Monthly data (last 12 months) ──
const jobTrendDataMonthly = [
  { week:"Jan", jobs:12, completed:10 }, { week:"Feb", jobs:18, completed:16 },
  { week:"Mar", jobs:22, completed:20 }, { week:"Apr", jobs:15, completed:13 },
  { week:"May", jobs:28, completed:25 }, { week:"Jun", jobs:32, completed:30 },
  { week:"Jul", jobs:24, completed:22 }, { week:"Aug", jobs:35, completed:33 },
  { week:"Sep", jobs:40, completed:38 }, { week:"Oct", jobs:38, completed:36 },
  { week:"Nov", jobs:42, completed:40 }, { week:"Dec", jobs:29, completed:27 },
];

// ── Quarterly data ──
const jobTrendDataQuarterly = [
  { week:"Q1 2025", jobs:52, completed:46 }, { week:"Q2 2025", jobs:75, completed:68 },
  { week:"Q3 2025", jobs:99, completed:93 }, { week:"Q4 2025", jobs:109, completed:103 },
  { week:"Q1 2026", jobs:120, completed:115 }, { week:"Q2 2026", jobs:134, completed:129 },
];

// ── Weekly run time ──
const aiRunTimeDataWeekly = [
  { week:"Wk 1",  avg:3.4 }, { week:"Wk 2",  avg:3.1 }, { week:"Wk 3",  avg:2.9 },
  { week:"Wk 4",  avg:2.7 }, { week:"Wk 5",  avg:3.0 }, { week:"Wk 6",  avg:2.5 },
  { week:"Wk 7",  avg:2.3 }, { week:"Wk 8",  avg:2.6 }, { week:"Wk 9",  avg:2.1 },
  { week:"Wk 10", avg:2.4 }, { week:"Wk 11", avg:1.9 }, { week:"Wk 12", avg:2.2 },
];

// ── Monthly run time ──
const aiRunTimeDataMonthly = [
  { week:"Jan", avg:3.2 }, { week:"Feb", avg:2.8 }, { week:"Mar", avg:2.5 },
  { week:"Apr", avg:3.1 }, { week:"May", avg:2.3 }, { week:"Jun", avg:2.1 },
  { week:"Jul", avg:2.6 }, { week:"Aug", avg:1.9 }, { week:"Sep", avg:2.2 },
  { week:"Oct", avg:1.8 }, { week:"Nov", avg:2.0 }, { week:"Dec", avg:2.4 },
];

// ── Quarterly run time ──
const aiRunTimeDataQuarterly = [
  { week:"Q1 2025", avg:3.1 }, { week:"Q2 2025", avg:2.7 },
  { week:"Q3 2025", avg:2.4 }, { week:"Q4 2025", avg:2.1 },
  { week:"Q1 2026", avg:2.3 }, { week:"Q2 2026", avg:1.9 },
];

const CustomTooltip = ({ active, payload, label, dark }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={`rounded-lg px-3 py-2 border text-xs shadow-lg
      ${dark ? "bg-neutral-800 border-neutral-700 text-white" : "bg-white border-neutral-200 text-neutral-800"}`}>
      <div className="font-bold mb-1">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="capitalize">{p.name}: <b>{p.value}</b></span>
        </div>
      ))}
    </div>
  );
};

const DashboardPage = ({ dark, modelName }) => {
  const [period,          setPeriod]          = useState("Weekly");
  const [filterOpen,      setFilterOpen]      = useState(false);
  const [filterCustomer,  setFilterCustomer]  = useState("All");
  const [filterAIModel,   setFilterAIModel]   = useState("All");
  const [filterProject,   setFilterProject]   = useState("All");

  // Unique filter options derived from data
  const ALL_CUSTOMERS = ["All","Customer 1","Customer 2","Customer 3","Customer 4","Customer 5","Customer 6"];
  const ALL_AI_MODELS = ["All","Annotator-V4","Drafting-Core-v2","DimGen-V3","AutoNote-V1"];
  const ALL_PROJECTS  = ["All","Q3-FRAME-2026","Q2-BRACKET-2026","Q1-PLATE-2026","Q4-SHAFT-2025","Q3-HOUSING-2026"];

  const activeFilterCount = [filterCustomer,filterAIModel,filterProject].filter(f=>f!=="All").length;

  const clearFilters = () => {
    setFilterCustomer("All");
    setFilterAIModel("All");
    setFilterProject("All");
  };

  // Pick correct dataset based on selected period
  const trendData = period === "Weekly"
    ? jobTrendDataWeekly
    : period === "Monthly"
      ? jobTrendDataMonthly
      : jobTrendDataQuarterly;

  const runTimeData = period === "Weekly"
    ? aiRunTimeDataWeekly
    : period === "Monthly"
      ? aiRunTimeDataMonthly
      : aiRunTimeDataQuarterly;

  const stats = [
    {
      label: "Total Jobs",
      value: "142",
      sub: "+12% from last month",
      up: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
      ),
      accent: "text-red-600", bg: dark ? "bg-red-950/50" : "bg-red-50",
    },
    {
      label: "Completed Today",
      value: "8",
      sub: "Last run: 14 min ago",
      up: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      ),
      accent: "text-green-600", bg: dark ? "bg-green-950/50" : "bg-green-50",
    },
    {
      label: "Avg. AI Run Time",
      value: "2m 34s",
      sub: "-8% faster vs last month",
      up: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      accent: "text-amber-500", bg: dark ? "bg-amber-950/50" : "bg-amber-50",
    },
    {
      label: "Success Rate",
      value: "96.5%",
      sub: "+1.2% from last month",
      up: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
      accent: "text-blue-500", bg: dark ? "bg-blue-950/50" : "bg-blue-50",
    },
  ];

  const ALL_RECENT = [
    { id:"JOB-A3F2K1", part:"551-4781", model:"FRAME",   project:"Q3-FRAME-2026",   customer:"Customer 1",   ai:"Annotator-V4",     time:"14 min ago", status:"Complete", statusColor:"text-green-600", statusBg: dark?"bg-green-950/60 border-green-800":"bg-green-50 border-green-200" },
    { id:"JOB-B8X9Q2", part:"442-1190", model:"BRACKET",  project:"Q2-BRACKET-2026", customer:"Customer 2",      ai:"Drafting-Core-v2", time:"1 hr ago",   status:"Complete", statusColor:"text-green-600", statusBg: dark?"bg-green-950/60 border-green-800":"bg-green-50 border-green-200" },
    { id:"JOB-C2M4P3", part:"330-8871", model:"PLATE",    project:"Q1-PLATE-2026",   customer:"Customer 3",       ai:"DimGen-V3",        time:"2 hrs ago",  status:"Failed",   statusColor:"text-red-500",   statusBg: dark?"bg-red-950/60 border-red-800":"bg-red-50 border-red-200" },
    { id:"JOB-D7N1R4", part:"210-5543", model:"SHAFT",    project:"Q4-SHAFT-2025",   customer:"Customer 1",   ai:"Annotator-V4",     time:"Yesterday",  status:"Complete", statusColor:"text-green-600", statusBg: dark?"bg-green-950/60 border-green-800":"bg-green-50 border-green-200" },
    { id:"JOB-E5T3W5", part:"661-2290", model:"HOUSING",  project:"Q3-HOUSING-2026", customer:"Customer 4", ai:"AutoNote-V1",      time:"Yesterday",  status:"Complete", statusColor:"text-green-600", statusBg: dark?"bg-green-950/60 border-green-800":"bg-green-50 border-green-200" },
    { id:"JOB-F1K8N9", part:"774-3310", model:"COVER",    project:"Q3-FRAME-2026",   customer:"Customer 1",   ai:"DimGen-V3",        time:"2 days ago", status:"Complete", statusColor:"text-green-600", statusBg: dark?"bg-green-950/60 border-green-800":"bg-green-50 border-green-200" },
    { id:"JOB-G9R2T4", part:"882-0021", model:"SEAL",     project:"Q2-BRACKET-2026", customer:"Customer 2",      ai:"Annotator-V4",     time:"2 days ago", status:"Failed",   statusColor:"text-red-500",   statusBg: dark?"bg-red-950/60 border-red-800":"bg-red-50 border-red-200" },
    { id:"JOB-H4W5X1", part:"993-4452", model:"GEAR",     project:"Q3-HOUSING-2026", customer:"Customer 4", ai:"Drafting-Core-v2", time:"3 days ago", status:"Complete", statusColor:"text-green-600", statusBg: dark?"bg-green-950/60 border-green-800":"bg-green-50 border-green-200" },
  ];

  const recent = ALL_RECENT.filter(r =>
    (filterCustomer === "All" || r.customer === filterCustomer) &&
    (filterAIModel  === "All" || r.ai       === filterAIModel)  &&
    (filterProject  === "All" || r.project  === filterProject)
  );

  const ring = 96.5;

  return (
    <div className={`p-6 pb-20 min-h-full transition-colors duration-300 ${dark ? "bg-neutral-950" : "bg-neutral-100"}`}>

      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className={`text-xl font-extrabold ${dark?"text-white":"text-neutral-900"}`}
            style={{ fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:"0.02em" }}>
            Dashboard
          </h1>
          <p className={`text-xs mt-0.5 ${dark?"text-neutral-500":"text-neutral-400"}`}>
            Model active: <span className="text-red-600 font-mono font-semibold">{modelName}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          {["Weekly","Monthly","Quarterly"].map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-150 cursor-pointer
                ${period === p
                  ? "bg-red-700 text-white"
                  : dark ? "bg-neutral-800 text-neutral-400 hover:text-white" : "bg-white text-neutral-500 hover:text-neutral-900 border border-neutral-200"}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* ── Row 1: Stat cards + Target ring ── */}
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr_280px] gap-4 mb-5">
        {stats.map((s, i) => (
          <div key={i} className={`rounded-xl p-5 border transition-colors duration-300
            ${dark ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200 shadow-sm"}`}>
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.bg} ${s.accent}`}>
                {s.icon}
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full
                ${s.up ? dark?"bg-green-950/60 text-green-500":"bg-green-50 text-green-600"
                       : dark?"bg-red-950/60 text-red-500":"bg-red-50 text-red-600"}`}>
                {s.up ? "↑" : "↓"}
              </span>
            </div>
            <div className={`text-2xl font-black ${dark?"text-white":"text-neutral-900"}`}
              style={{ fontFamily:"'Barlow Condensed',sans-serif" }}>{s.value}</div>
            <div className={`text-xs font-semibold mt-0.5 ${dark?"text-neutral-300":"text-neutral-700"}`}>{s.label}</div>
            <div className={`text-[11px] mt-0.5 ${dark?"text-neutral-600":"text-neutral-400"}`}>{s.sub}</div>
          </div>
        ))}

        {/* Target / Success ring */}
        <div className={`rounded-xl p-5 border flex flex-col items-center justify-between transition-colors duration-300
          ${dark ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200 shadow-sm"}`}>
          <div className={`text-xs font-extrabold uppercase tracking-widest self-start ${dark?"text-white":"text-neutral-800"}`}>
            Monthly Target
          </div>
          <svg width="130" height="80" viewBox="0 0 130 80">
            <path d="M 15 75 A 50 50 0 0 1 115 75" fill="none" stroke={dark?"#262626":"#f5f5f4"} strokeWidth="10" strokeLinecap="round"/>
            <path d="M 15 75 A 50 50 0 0 1 115 75" fill="none" stroke="#CC0000" strokeWidth="10" strokeLinecap="round"
              strokeDasharray={`${(ring/100)*157} 157`}/>
            <text x="65" y="68" textAnchor="middle" fill={dark?"#fff":"#111"} fontSize="18" fontWeight="900"
              style={{ fontFamily:"'Barlow Condensed',sans-serif" }}>96.5%</text>
          </svg>
          <div className={`grid grid-cols-3 w-full gap-1 text-center border-t pt-3 ${dark?"border-neutral-800":"border-neutral-100"}`}>
            {[["Target","142"],["Done","137"],["Failed","5"]].map(([l,v],i)=>(
              <div key={i}>
                <div className={`text-xs font-black ${dark?"text-white":"text-neutral-800"}`}>{v}</div>
                <div className={`text-[10px] ${dark?"text-neutral-600":"text-neutral-400"}`}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 2: Area chart + Bar chart ── */}
      <div className="grid grid-cols-[1fr_340px] gap-4 mb-5">

        {/* Job trend area chart */}
        <div className={`rounded-xl p-5 border transition-colors duration-300
          ${dark ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200 shadow-sm"}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-0.5 h-4 bg-red-700 rounded-full"/>
                <span className={`text-sm font-extrabold uppercase tracking-wider ${dark?"text-white":"text-neutral-800"}`}>
                  Job Statistics
                </span>
              </div>
              <p className={`text-[11px] mt-0.5 ml-2.5 ${dark?"text-neutral-500":"text-neutral-400"}`}>
                Submitted vs Completed — {period}
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={trendData} margin={{ top:5, right:10, left:-20, bottom:0 }}>
              <defs>
                <linearGradient id="gJobs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#CC0000" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#CC0000" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="gDone" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#22C55E" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={dark?"#262626":"#f0f0f0"} vertical={false}/>
              <XAxis dataKey="week" tick={{ fill: dark?"#666":"#999", fontSize:11 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill: dark?"#666":"#999", fontSize:11 }} axisLine={false} tickLine={false}/>
              <Tooltip content={<CustomTooltip dark={dark}/>}/>
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize:11, paddingTop:8 }}/>
              <Area type="monotone" dataKey="jobs"      name="Submitted" stroke="#CC0000" strokeWidth={2} fill="url(#gJobs)"/>
              <Area type="monotone" dataKey="completed" name="Completed" stroke="#22C55E" strokeWidth={2} fill="url(#gDone)"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Avg run time bar chart */}
        <div className={`rounded-xl p-5 border transition-colors duration-300
          ${dark ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200 shadow-sm"}`}>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-0.5 h-4 bg-red-700 rounded-full"/>
            <span className={`text-sm font-extrabold uppercase tracking-wider ${dark?"text-white":"text-neutral-800"}`}>
              Avg. Run Time
            </span>
          </div>
          <p className={`text-[11px] mb-4 ml-2.5 ${dark?"text-neutral-500":"text-neutral-400"}`}>Minutes per AI job</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={runTimeData} margin={{ top:5, right:5, left:-25, bottom:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={dark?"#262626":"#f0f0f0"} vertical={false}/>
              <XAxis dataKey="week" tick={{ fill: dark?"#666":"#999", fontSize:10 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill: dark?"#666":"#999", fontSize:10 }} axisLine={false} tickLine={false}/>
              <Tooltip content={<CustomTooltip dark={dark}/>}/>
              <Bar dataKey="avg" name="Avg (min)" fill="#CC0000" radius={[4,4,0,0]} maxBarSize={24}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Row 3: Recent jobs table ── */}
      <div className={`rounded-xl border transition-colors duration-300
        ${dark ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200 shadow-sm"}`}>

        {/* Table header row */}
        <div className={`px-6 py-4 border-b flex items-center justify-between flex-wrap gap-3
          ${dark?"border-neutral-800":"border-neutral-100"}`}>
          <div className="flex items-center gap-3">
            <div className="w-0.5 h-4 bg-red-700 rounded-full"/>
            <span className={`text-sm font-extrabold uppercase tracking-wider ${dark?"text-white":"text-neutral-800"}`}>
              Recent Jobs
            </span>
            {/* Result count badge */}
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full
              ${dark?"bg-neutral-800 text-neutral-400":"bg-neutral-100 text-neutral-500"}`}>
              {recent.length} of {ALL_RECENT.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Active filter pills */}
            {filterCustomer !== "All" && (
              <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md bg-red-950/60 border border-red-800 text-red-400">
                {filterCustomer}
                <button onClick={() => setFilterCustomer("All")} className="ml-0.5 hover:text-white cursor-pointer">×</button>
              </span>
            )}
            {filterAIModel !== "All" && (
              <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md bg-red-950/60 border border-red-800 text-red-400">
                {filterAIModel}
                <button onClick={() => setFilterAIModel("All")} className="ml-0.5 hover:text-white cursor-pointer">×</button>
              </span>
            )}
            {filterProject !== "All" && (
              <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md bg-red-950/60 border border-red-800 text-red-400">
                {filterProject}
                <button onClick={() => setFilterProject("All")} className="ml-0.5 hover:text-white cursor-pointer">×</button>
              </span>
            )}
            {activeFilterCount > 0 && (
              <button onClick={clearFilters}
                className={`text-[10px] font-bold px-2 py-1 rounded-md cursor-pointer transition-colors
                  ${dark?"text-neutral-500 hover:text-white":"text-neutral-400 hover:text-neutral-700"}`}>
                Clear all
              </button>
            )}

            {/* Filter toggle button */}
            <button onClick={() => setFilterOpen(f => !f)}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-md border transition-all cursor-pointer
                ${filterOpen
                  ? "bg-red-700 border-red-700 text-white"
                  : dark
                    ? "text-neutral-400 border-neutral-700 hover:text-white hover:border-neutral-500"
                    : "text-neutral-500 border-neutral-200 hover:text-neutral-900"}`}>
              {/* Filter icon */}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
              </svg>
              Filter
              {activeFilterCount > 0 && (
                <span className={`w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center
                  ${filterOpen ? "bg-white text-red-700" : "bg-red-700 text-white"}`}>
                  {activeFilterCount}
                </span>
              )}
            </button>

            <button className={`text-xs font-bold px-3 py-1.5 rounded-md border transition-colors cursor-pointer
              ${dark?"text-neutral-400 border-neutral-700 hover:text-white hover:border-neutral-500":"text-neutral-500 border-neutral-200 hover:text-neutral-900"}`}>
              See all →
            </button>
          </div>
        </div>

        {/* Filter dropdown panel */}
        {filterOpen && (
          <div className={`px-6 py-4 border-b transition-all duration-200
            ${dark?"border-neutral-800 bg-neutral-950/60":"border-neutral-100 bg-neutral-50/80"}`}>
            <div className="grid grid-cols-3 gap-4">

              {/* Customer filter */}
              <div>
                <label className={`block text-[10px] font-extrabold uppercase tracking-widest mb-2
                  ${dark?"text-neutral-500":"text-neutral-400"}`}>
                  Customer
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_CUSTOMERS.map(c => (
                    <button key={c} onClick={() => setFilterCustomer(c)}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border transition-all cursor-pointer
                        ${filterCustomer === c
                          ? "bg-red-700 border-red-700 text-white"
                          : dark
                            ? "bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-white"
                            : "bg-white border-neutral-200 text-neutral-500 hover:border-neutral-400 hover:text-neutral-800"}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Model filter */}
              <div>
                <label className={`block text-[10px] font-extrabold uppercase tracking-widest mb-2
                  ${dark?"text-neutral-500":"text-neutral-400"}`}>
                  AI Model
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_AI_MODELS.map(m => (
                    <button key={m} onClick={() => setFilterAIModel(m)}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border transition-all cursor-pointer
                        ${filterAIModel === m
                          ? "bg-red-700 border-red-700 text-white"
                          : dark
                            ? "bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-white"
                            : "bg-white border-neutral-200 text-neutral-500 hover:border-neutral-400 hover:text-neutral-800"}`}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Project filter */}
              <div>
                <label className={`block text-[10px] font-extrabold uppercase tracking-widest mb-2
                  ${dark?"text-neutral-500":"text-neutral-400"}`}>
                  Project
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_PROJECTS.map(p => (
                    <button key={p} onClick={() => setFilterProject(p)}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border transition-all cursor-pointer
                        ${filterProject === p
                          ? "bg-red-700 border-red-700 text-white"
                          : dark
                            ? "bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-white"
                            : "bg-white border-neutral-200 text-neutral-500 hover:border-neutral-400 hover:text-neutral-800"}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className={dark?"bg-neutral-950":"bg-neutral-50"}>
                {["Job ID","Part No.","Model","Project","Customer","AI Engine","Status","Time"].map((h,i) => (
                  <th key={i} className={`px-5 py-3 text-left text-[10px] font-extrabold uppercase tracking-widest border-b
                    ${dark?"text-neutral-600 border-neutral-800":"text-neutral-400 border-neutral-100"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 ? (
                <tr>
                  <td colSpan={8} className={`px-5 py-10 text-center text-sm
                    ${dark?"text-neutral-600":"text-neutral-400"}`}>
                    No jobs match the selected filters.&nbsp;
                    <button onClick={clearFilters} className="text-red-600 font-semibold hover:underline cursor-pointer">
                      Clear filters
                    </button>
                  </td>
                </tr>
              ) : (
                recent.map((r,i) => (
                  <tr key={i} className={`transition-colors ${dark?"hover:bg-neutral-800":"hover:bg-neutral-50"}
                    ${i<recent.length-1 ? dark?"border-b border-neutral-800":"border-b border-neutral-100":""}`}>
                    <td className={`px-5 py-3.5 font-mono text-xs font-semibold ${dark?"text-neutral-300":"text-neutral-700"}`}>{r.id}</td>
                    <td className={`px-5 py-3.5 font-mono text-xs ${dark?"text-neutral-400":"text-neutral-500"}`}>{r.part}</td>
                    <td className={`px-5 py-3.5 text-xs font-semibold ${dark?"text-neutral-300":"text-neutral-700"}`}>{r.model}</td>
                    <td className={`px-5 py-3.5 text-xs font-mono ${dark?"text-neutral-400":"text-neutral-500"}`}>{r.project}</td>
                    <td className={`px-5 py-3.5 text-xs ${dark?"text-neutral-400":"text-neutral-500"}`}>{r.customer}</td>
                    <td className={`px-5 py-3.5 text-xs ${dark?"text-neutral-400":"text-neutral-500"}`}>{r.ai}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border ${r.statusColor} ${r.statusBg}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className={`px-5 py-3.5 text-xs ${dark?"text-neutral-600":"text-neutral-400"}`}>{r.time}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ── Moved outside SettingsPage to fix react-hooks/static-components error ──
const SettingsRow = ({ label, sub, children, dark }) => (
  <div className={`flex items-center justify-between py-4 border-b ${dark ? "border-neutral-800" : "border-neutral-100"}`}>
    <div>
      <div className={`text-sm font-semibold ${dark ? "text-white" : "text-neutral-800"}`}>{label}</div>
      {sub && <div className={`text-[11px] mt-0.5 ${dark ? "text-neutral-500" : "text-neutral-400"}`}>{sub}</div>}
    </div>
    <div className="ml-6 flex-shrink-0">{children}</div>
  </div>
);

const SettingsToggle = ({ on, onToggle, dark }) => (
  <button onClick={onToggle}
    className={`relative w-10 h-5 rounded-full transition-colors duration-200 cursor-pointer border-0
      ${on ? "bg-red-700" : dark ? "bg-neutral-700" : "bg-neutral-300"}`}>
    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200
      ${on ? "left-5" : "left-0.5"}`} />
  </button>
);

const SettingsPage = ({ dark, onToggleDark, customers, setCustomers }) => {
  const [apiUrl,       setApiUrl]       = useState("http://localhost:8000/api");
  const [pollMs,       setPollMs]       = useState("3000");
  const [templateDir,  setTemplateDir]  = useState("");
  const [modelDir,     setModelDir]     = useState("");
  const [models,       setModels]       = useState([
    { id: 1, name: "Annotator-V4",        file: "annotator_v4.pkl",       size: "124 MB", status: "active"   },
    { id: 2, name: "Drafting-Core-v2",    file: "drafting_core_v2.pkl",   size: "98 MB",  status: "active"   },
    { id: 3, name: "DimGen-V3",           file: "dimgen_v3.pkl",          size: "76 MB",  status: "active"   },
    { id: 4, name: "AutoNote-V1",         file: "autonote_v1.pkl",        size: "54 MB",  status: "inactive" },
  ]);
  const [saved, setSaved] = useState(false);

  // ── Customer management ──
  const [newCustName, setNewCustName] = useState("");
  const [newCustCode, setNewCustCode] = useState("");

  const addCustomer = () => {
    if (!newCustName.trim()) return;
    setCustomers(prev => [...prev, {
      id: Date.now(),
      name: newCustName.trim(),
      code: newCustCode.trim().toUpperCase() || newCustName.slice(0,3).toUpperCase(),
      active: true
    }]);
    setNewCustName(""); setNewCustCode("");
  };

  const toggleCustomer  = (id) => setCustomers(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
  const removeCustomer  = (id) => setCustomers(prev => prev.filter(c => c.id !== id));
  const editCustomer    = (id, field, val) => setCustomers(prev => prev.map(c => c.id === id ? { ...c, [field]: val } : c));

  // ── Folder / file pickers — Tauri native dialog ──────────────────────────
  // When running in browser (dev), falls back to window.prompt automatically.
  const _tauriOpen = async (opts) => {
    try {
      if (window.__TAURI__?.dialog) {
        return await window.__TAURI__.dialog.open(opts);
      }
    } catch { /* not running in Tauri — fall through to browser fallback */ }
    // Browser fallback (dev / demo only)
    const label = opts.directory ? "folder path" : "file path";
    const def   = opts.defaultPath || "";
    return window.prompt(`Enter ${label}:`, def) || null;
  };

  const browseFolder = async () => {
    const dir = await _tauriOpen({
      directory:   true,
      multiple:    false,
      title:       "Select Title Block Templates Folder",
      defaultPath: templateDir || "C:\\IDC\\Templates\\TitleBlocks",
    });
    if (dir) setTemplateDir(dir);
  };

  const browseModelDir = async () => {
    const dir = await _tauriOpen({
      directory:   true,
      multiple:    false,
      title:       "Select AI Models Directory",
      defaultPath: modelDir || "C:\\IDC\\Models",
    });
    if (dir) setModelDir(dir);
  };

  const browseModelFile = async (id) => {
    const model = models.find(m => m.id === id);
    const filePath = await _tauriOpen({
      directory:   false,
      multiple:    false,
      title:       `Select model file for "${model.name}"`,
      defaultPath: modelDir || "C:\\IDC\\Models",
      filters: [{ name: "AI Model Files", extensions: ["pkl","pt","onnx","bin"] }],
    });
    if (filePath) {
      const fileName = String(filePath).split("\\").pop().split("/").pop();
      setModels(prev => prev.map(m => m.id === id ? { ...m, file: fileName } : m));
    }
  };

  const toggleModelStatus = (id) => {
    setModels(prev => prev.map(m => m.id === id
      ? { ...m, status: m.status === "active" ? "inactive" : "active" }
      : m
    ));
  };

  const removeModel = (id) => setModels(prev => prev.filter(m => m.id !== id));

  // ── Add model — inline form instead of prompt ──────────────────────────────
  const [addModelOpen,    setAddModelOpen]    = useState(false);
  const [newModelName,    setNewModelName]    = useState("");
  const [newModelFile,    setNewModelFile]    = useState("");

  const browseNewModelFile = async () => {
    const filePath = await _tauriOpen({
      directory: false,
      multiple:  false,
      title:     "Select AI Model File",
      defaultPath: modelDir || "C:\\IDC\\Models",
      filters: [{ name: "AI Model Files", extensions: ["pkl","pt","onnx","bin"] }],
    });
    if (filePath) {
      const fileName = String(filePath).split("\\").pop().split("/").pop();
      setNewModelFile(fileName);
      if (!newModelName) {
        setNewModelName(fileName.replace(/\.(pkl|pt|onnx|bin)$/i,"").replace(/_/g,"-"));
      }
    }
  };

  const confirmAddModel = () => {
    if (!newModelName.trim() || !newModelFile.trim()) return;
    setModels(prev => [...prev, {
      id: Date.now(), name: newModelName.trim(),
      file: newModelFile.trim(), size: "—", status: "inactive"
    }]);
    setNewModelName(""); setNewModelFile(""); setAddModelOpen(false);
  };

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="p-7 pb-20 max-w-3xl mx-auto">
      <div className="mb-7">
        <h1 className={`text-2xl font-extrabold ${dark ? "text-white" : "text-neutral-900"}`}
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          Settings
        </h1>
        <p className={`text-sm mt-1 ${dark ? "text-neutral-500" : "text-neutral-400"}`}>
          Configure application preferences, API connection and file paths
        </p>
      </div>

      {/* ── Appearance — Dark Mode only ── */}
      <div className={`rounded-xl border mb-5 transition-colors duration-300
        ${dark ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200 shadow-sm"}`}>
        <div className={`px-6 py-4 border-b flex items-center gap-2 ${dark ? "border-neutral-800" : "border-neutral-100"}`}>
          <div className="w-0.5 h-4 bg-red-700 rounded-full" />
          <h2 className={`text-xs font-extrabold uppercase tracking-widest ${dark ? "text-white" : "text-neutral-800"}`}>
            Appearance
          </h2>
        </div>
        <div className="px-6">
          <SettingsRow label="Dark Mode" sub="Switch between dark and light interface" dark={dark}>
            <SettingsToggle on={dark} onToggle={onToggleDark} dark={dark} />
          </SettingsRow>
        </div>
      </div>

      {/* ── Title Block Templates ── */}
      <div className={`rounded-xl border mb-5 transition-colors duration-300
        ${dark ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200 shadow-sm"}`}>
        <div className={`px-6 py-4 border-b flex items-center gap-2 ${dark ? "border-neutral-800" : "border-neutral-100"}`}>
          <div className="w-0.5 h-4 bg-red-700 rounded-full" />
          <h2 className={`text-xs font-extrabold uppercase tracking-widest ${dark ? "text-white" : "text-neutral-800"}`}>
            Title Block Templates
          </h2>
        </div>
        <div className="px-6 py-2">
          <SettingsRow
            label="Template Folder"
            sub="Directory where title block template files (.drw / .xml) are stored"
            dark={dark}
          >
            {/* empty — full-width layout below */}
            <span />
          </SettingsRow>

          {/* Full-width path input + browse button */}
          <div className="pb-5 -mt-3">
            <div className="flex items-stretch gap-2">
              {/* Path input */}
              <div className={`flex-1 flex items-center gap-2 h-9 px-3 rounded-md border text-xs font-mono
                ${templateDir
                  ? dark ? "border-neutral-700 bg-neutral-800 text-white" : "border-neutral-300 bg-white text-neutral-900"
                  : dark ? "border-neutral-700 bg-neutral-800 text-neutral-500" : "border-neutral-200 bg-neutral-50 text-neutral-400"}`}>
                {/* Folder icon */}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke={templateDir ? "#CC0000" : (dark ? "#555" : "#aaa")}
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                </svg>
                <input
                  value={templateDir}
                  onChange={e => setTemplateDir(e.target.value)}
                  placeholder="No folder selected — click Browse to choose"
                  className={`flex-1 bg-transparent outline-none text-xs font-mono min-w-0
                    ${templateDir
                      ? dark ? "text-white" : "text-neutral-800"
                      : dark ? "text-neutral-500 placeholder-neutral-600" : "text-neutral-400 placeholder-neutral-400"}`}
                />
                {/* Clear button */}
                {templateDir && (
                  <button onClick={() => setTemplateDir("")}
                    className={`flex-shrink-0 transition-colors cursor-pointer text-sm leading-none
                      ${dark ? "text-neutral-600 hover:text-orange-500" : "text-neutral-300 hover:text-orange-500"}`}>
                    ×
                  </button>
                )}
              </div>

              {/* Browse button */}
              <button onClick={browseFolder}
                className={`flex items-center gap-1.5 h-9 px-4 rounded-md border font-bold text-xs
                            flex-shrink-0 cursor-pointer transition-all duration-150
                  ${dark
                    ? "bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700 hover:text-white hover:border-neutral-500"
                    : "bg-white border-neutral-300 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 hover:border-neutral-400"}`}>
                {/* Browse folder icon */}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                Browse
              </button>
            </div>

            {/* Status row */}
            <div className="flex items-center justify-between mt-2.5">
              {templateDir ? (
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className={`text-[11px] font-medium ${dark ? "text-green-500" : "text-green-600"}`}>
                    Folder selected
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className={`text-[11px] ${dark ? "text-amber-400" : "text-amber-500"}`}>
                    No folder selected — title block templates will not load
                  </span>
                </div>
              )}
              <span className={`text-[10px] ${dark ? "text-neutral-600" : "text-neutral-400"}`}>
                Supported: .drw · .xml · .tpl
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Customers ── */}
      <div className={`rounded-xl border mb-5 transition-colors duration-300
        ${dark ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200 shadow-sm"}`}>

        {/* Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between
          ${dark ? "border-neutral-800" : "border-neutral-100"}`}>
          <div className="flex items-center gap-2">
            <div className="w-0.5 h-4 bg-red-700 rounded-full" />
            <h2 className={`text-xs font-extrabold uppercase tracking-widest ${dark ? "text-white" : "text-neutral-800"}`}>
              Customers
            </h2>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ml-1
              ${dark ? "bg-neutral-800 text-neutral-400" : "bg-neutral-100 text-neutral-500"}`}>
              {customers.filter(c => c.active).length} active
            </span>
          </div>
          <p className={`text-[11px] ${dark ? "text-neutral-500" : "text-neutral-400"}`}>
            Active customers appear in the Product Draw dropdown
          </p>
        </div>

        {/* Existing customers list */}
        <div className={`mx-6 mt-4 border rounded-lg overflow-hidden ${dark ? "border-neutral-800" : "border-neutral-200"}`}>
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className={dark ? "bg-neutral-950" : "bg-neutral-50"}>
                {["Customer Name", "Code", "Status", ""].map((h, i) => (
                  <th key={i} className={`px-4 py-2.5 text-left text-[10px] font-extrabold uppercase tracking-widest border-b
                    ${dark ? "text-neutral-600 border-neutral-800" : "text-neutral-400 border-neutral-200"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.map((c, i) => (
                <tr key={c.id}
                  className={`transition-colors group
                    ${i < customers.length - 1 ? dark ? "border-b border-neutral-800" : "border-b border-neutral-100" : ""}
                    ${dark ? "hover:bg-neutral-800" : "hover:bg-neutral-50"}`}>

                  {/* Editable name */}
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0
                        ${c.active ? "bg-green-500" : dark ? "bg-neutral-600" : "bg-neutral-300"}`} />
                      <input
                        value={c.name}
                        onChange={e => editCustomer(c.id, "name", e.target.value)}
                        className={`bg-transparent outline-none text-xs font-semibold w-full
                          border-b border-transparent focus:border-red-600 transition-colors pb-0.5
                          ${dark ? "text-white placeholder-neutral-600" : "text-neutral-800 placeholder-neutral-400"}`}
                      />
                    </div>
                  </td>

                  {/* Editable code */}
                  <td className="px-4 py-2.5">
                    <input
                      value={c.code}
                      onChange={e => editCustomer(c.id, "code", e.target.value.toUpperCase().slice(0, 5))}
                      className={`bg-transparent outline-none text-[11px] font-mono font-bold w-16
                        border-b border-transparent focus:border-red-600 transition-colors pb-0.5
                        ${dark ? "text-neutral-400" : "text-neutral-500"}`}
                      maxLength={5}
                    />
                  </td>

                  {/* Active toggle */}
                  <td className="px-4 py-2.5">
                    <button
                      onClick={() => toggleCustomer(c.id)}
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1
                                  rounded-full border cursor-pointer transition-all duration-150
                        ${c.active
                          ? dark
                            ? "bg-green-950/60 border-green-800 text-green-500 hover:bg-red-950/60 hover:border-red-800 hover:text-red-500"
                            : "bg-green-50 border-green-200 text-green-600 hover:bg-red-50 hover:border-red-200 hover:text-red-500"
                          : dark
                            ? "bg-neutral-800 border-neutral-700 text-neutral-500 hover:bg-green-950/60 hover:border-green-800 hover:text-green-500"
                            : "bg-neutral-100 border-neutral-200 text-neutral-400 hover:bg-green-50 hover:border-green-200 hover:text-green-600"}`}>
                      {c.active ? "Active" : "Inactive"}
                    </button>
                  </td>

                  {/* Remove */}
                  <td className="px-4 py-2.5">
                    <button
                      onClick={() => removeCustomer(c.id)}
                      className={`text-base leading-none px-1 cursor-pointer transition-colors opacity-0 group-hover:opacity-100
                        ${dark ? "text-neutral-600 hover:text-orange-500" : "text-neutral-300 hover:text-orange-500"}`}>
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add new customer row */}
        <div className="px-6 py-4">
          <div className={`text-[10px] font-extrabold uppercase tracking-widest mb-2
            ${dark ? "text-neutral-500" : "text-neutral-400"}`}>
            Add New Customer
          </div>
          <div className="flex items-stretch gap-2">
            <input
              value={newCustName}
              onChange={e => setNewCustName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addCustomer()}
              placeholder="Customer name  e.g. Siemens AG"
              className={`flex-1 h-9 px-3 rounded-md border text-xs focus:outline-none focus:border-red-600
                ${dark
                  ? "bg-neutral-800 border-neutral-700 text-white placeholder-neutral-600"
                  : "bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400"}`}
            />
            <input
              value={newCustCode}
              onChange={e => setNewCustCode(e.target.value.toUpperCase().slice(0,5))}
              onKeyDown={e => e.key === "Enter" && addCustomer()}
              placeholder="Code"
              maxLength={5}
              className={`w-20 h-9 px-3 rounded-md border text-xs font-mono focus:outline-none focus:border-red-600
                ${dark
                  ? "bg-neutral-800 border-neutral-700 text-white placeholder-neutral-600"
                  : "bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400"}`}
            />
            <button
              onClick={addCustomer}
              disabled={!newCustName.trim()}
              className={`flex items-center gap-1.5 h-9 px-4 rounded-md font-bold text-xs flex-shrink-0
                          cursor-pointer transition-all duration-150 border
                ${newCustName.trim()
                  ? "bg-red-700 border-red-700 text-white hover:bg-red-600"
                  : dark
                    ? "bg-neutral-800 border-neutral-700 text-neutral-600 cursor-not-allowed"
                    : "bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed"}`}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add
            </button>
          </div>
          <p className={`text-[11px] mt-2 ${dark ? "text-neutral-600" : "text-neutral-400"}`}>
            Press Enter or click Add · Code is optional (auto-generated from name)
          </p>
        </div>
      </div>

      {/* ── AI Models ── */}
      <div className={`rounded-xl border mb-5 transition-colors duration-300
        ${dark ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200 shadow-sm"}`}>

        {/* Section header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${dark ? "border-neutral-800" : "border-neutral-100"}`}>
          <div className="flex items-center gap-2">
            <div className="w-0.5 h-4 bg-red-700 rounded-full" />
            <h2 className={`text-xs font-extrabold uppercase tracking-widest ${dark ? "text-white" : "text-neutral-800"}`}>
              AI Models
            </h2>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ml-1
              ${dark ? "bg-neutral-800 text-neutral-400" : "bg-neutral-100 text-neutral-500"}`}>
              {models.filter(m => m.status === "active").length} active
            </span>
          </div>
          <button onClick={() => setAddModelOpen(o => !o)}
            className={`flex items-center gap-1.5 h-7 px-3 rounded-md border text-[11px] font-bold
                        cursor-pointer transition-all duration-150
              ${addModelOpen
                ? "bg-red-700 border-red-700 text-white"
                : dark
                  ? "bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700 hover:text-white"
                  : "bg-white border-neutral-300 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"}`}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Model
          </button>
        </div>

        {/* Model directory row */}
        <div className="px-6 pt-4 pb-2">
          <div className={`text-[10px] font-extrabold uppercase tracking-widest mb-2
            ${dark ? "text-neutral-500" : "text-neutral-400"}`}>
            Models Directory
          </div>
          <div className="flex items-stretch gap-2 mb-1">
            <div className={`flex-1 flex items-center gap-2 h-9 px-3 rounded-md border text-xs font-mono
              ${modelDir
                ? dark ? "border-neutral-700 bg-neutral-800 text-white" : "border-neutral-300 bg-white text-neutral-900"
                : dark ? "border-neutral-700 bg-neutral-800 text-neutral-500" : "border-neutral-200 bg-neutral-50 text-neutral-400"}`}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke={modelDir ? "#CC0000" : (dark ? "#555" : "#aaa")}
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
              </svg>
              <input value={modelDir} onChange={e => setModelDir(e.target.value)}
                placeholder="No directory set — click Browse"
                className={`flex-1 bg-transparent outline-none text-xs font-mono min-w-0
                  ${modelDir ? dark ? "text-white" : "text-neutral-800" : dark ? "text-neutral-500 placeholder-neutral-600" : "text-neutral-400 placeholder-neutral-400"}`} />
              {modelDir && (
                <button onClick={() => setModelDir("")}
                  className={`flex-shrink-0 text-sm leading-none cursor-pointer transition-colors
                    ${dark ? "text-neutral-600 hover:text-orange-500" : "text-neutral-300 hover:text-orange-500"}`}>×</button>
              )}
            </div>
            <button onClick={browseModelDir}
              className={`flex items-center gap-1.5 h-9 px-4 rounded-md border font-bold text-xs
                          flex-shrink-0 cursor-pointer transition-all duration-150
                ${dark
                  ? "bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700 hover:text-white"
                  : "bg-white border-neutral-300 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"}`}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              Browse
            </button>
          </div>
          <p className={`text-[11px] mb-4 ${dark ? "text-neutral-600" : "text-neutral-400"}`}>
            Supported formats: <span className="font-mono">.pkl · .pt · .onnx · .bin</span>
          </p>
        </div>

        {/* ── Inline Add Model form ── */}
        {addModelOpen && (
          <div className={`mx-6 mb-4 p-4 rounded-lg border transition-colors duration-200
            ${dark ? "bg-neutral-950 border-neutral-700" : "bg-neutral-50 border-neutral-300"}`}>
            <div className={`text-[10px] font-extrabold uppercase tracking-widest mb-3
              ${dark ? "text-neutral-500" : "text-neutral-400"}`}>New AI Model</div>
            <div className="flex flex-col gap-2">
              {/* Model name */}
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-widest mb-1
                  ${dark ? "text-neutral-500" : "text-neutral-400"}`}>Model Name</label>
                <input value={newModelName} onChange={e => setNewModelName(e.target.value)}
                  placeholder="e.g. Annotator-V5"
                  className={`w-full h-9 px-3 rounded-md border text-xs focus:outline-none focus:border-red-600
                    ${dark ? "bg-neutral-800 border-neutral-700 text-white placeholder-neutral-600"
                           : "bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400"}`} />
              </div>
              {/* File picker */}
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-widest mb-1
                  ${dark ? "text-neutral-500" : "text-neutral-400"}`}>Model File</label>
                <div className="flex items-stretch gap-2">
                  <div className={`flex-1 flex items-center gap-2 h-9 px-3 rounded-md border text-xs font-mono
                    ${newModelFile
                      ? dark ? "border-neutral-700 bg-neutral-800 text-white" : "border-neutral-300 bg-white text-neutral-900"
                      : dark ? "border-neutral-700 bg-neutral-800 text-neutral-500" : "border-neutral-200 bg-neutral-50 text-neutral-400"}`}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                      stroke={newModelFile ? "#CC0000" : (dark ? "#555" : "#aaa")}
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                      <polyline points="13 2 13 9 20 9"/>
                    </svg>
                    <input value={newModelFile} onChange={e => setNewModelFile(e.target.value)}
                      placeholder="No file selected — click Browse"
                      className={`flex-1 bg-transparent outline-none text-xs font-mono min-w-0
                        ${newModelFile ? dark ? "text-white" : "text-neutral-800"
                                       : dark ? "text-neutral-500 placeholder-neutral-600" : "text-neutral-400 placeholder-neutral-400"}`} />
                    {newModelFile && (
                      <button onClick={() => setNewModelFile("")}
                        className={`flex-shrink-0 text-sm leading-none cursor-pointer transition-colors
                          ${dark ? "text-neutral-600 hover:text-orange-500" : "text-neutral-300 hover:text-orange-500"}`}>×</button>
                    )}
                  </div>
                  <button onClick={browseNewModelFile}
                    className={`flex items-center gap-1.5 h-9 px-3 rounded-md border font-bold text-xs
                                flex-shrink-0 cursor-pointer transition-all duration-150
                      ${dark ? "bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700 hover:text-white"
                             : "bg-white border-neutral-300 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    Browse
                  </button>
                </div>
                <p className={`text-[10px] mt-1 ${dark ? "text-neutral-600" : "text-neutral-400"}`}>
                  Supported: .pkl · .pt · .onnx · .bin
                </p>
              </div>
              {/* Action buttons */}
              <div className="flex items-center gap-2 mt-1">
                <button onClick={confirmAddModel}
                  disabled={!newModelName.trim() || !newModelFile.trim()}
                  className={`flex items-center gap-1.5 h-8 px-4 rounded-md font-bold text-xs cursor-pointer transition-all border
                    ${newModelName.trim() && newModelFile.trim()
                      ? "bg-red-700 border-red-700 text-white hover:bg-red-600"
                      : dark ? "bg-neutral-800 border-neutral-700 text-neutral-600 cursor-not-allowed"
                             : "bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed"}`}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Add
                </button>
                <button onClick={() => { setAddModelOpen(false); setNewModelName(""); setNewModelFile(""); }}
                  className={`h-8 px-4 rounded-md font-semibold text-xs cursor-pointer transition-all border
                    ${dark ? "bg-transparent border-neutral-700 text-neutral-500 hover:text-white hover:border-neutral-500"
                           : "bg-transparent border-neutral-200 text-neutral-400 hover:text-neutral-700 hover:border-neutral-400"}`}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Models table */}
        <div className={`mx-6 mb-5 border rounded-lg overflow-hidden ${dark ? "border-neutral-800" : "border-neutral-200"}`}>
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className={dark ? "bg-neutral-950" : "bg-neutral-50"}>
                {["Model Name", "File", "Size", "Status", ""].map((h, i) => (
                  <th key={i} className={`px-4 py-2.5 text-left text-[10px] font-extrabold uppercase tracking-widest border-b
                    ${dark ? "text-neutral-600 border-neutral-800" : "text-neutral-400 border-neutral-200"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {models.map((m, i) => (
                <tr key={m.id}
                  className={`transition-colors
                    ${i < models.length - 1 ? dark ? "border-b border-neutral-800" : "border-b border-neutral-100" : ""}
                    ${dark ? "hover:bg-neutral-800" : "hover:bg-neutral-50"}`}>

                  {/* Model name */}
                  <td className={`px-4 py-3 font-semibold ${dark ? "text-white" : "text-neutral-800"}`}>
                    <div className="flex items-center gap-2">
                      {/* Active dot */}
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0
                        ${m.status === "active" ? "bg-green-500" : dark ? "bg-neutral-600" : "bg-neutral-300"}`} />
                      {m.name}
                    </div>
                  </td>

                  {/* File path — clickable to browse */}
                  <td className="px-4 py-3">
                    <button onClick={() => browseModelFile(m.id)}
                      className={`flex items-center gap-1.5 font-mono text-[11px] cursor-pointer
                                  transition-colors group
                        ${dark ? "text-neutral-400 hover:text-orange-500" : "text-neutral-500 hover:text-orange-500"}`}>
                      {/* File icon */}
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 opacity-60">
                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                        <polyline points="13 2 13 9 20 9"/>
                      </svg>
                      <span className="truncate max-w-[160px]">{m.file}</span>
                      {/* Browse pencil icon on hover */}
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        className="opacity-0 group-hover:opacity-100 flex-shrink-0 transition-opacity">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                  </td>

                  {/* Size */}
                  <td className={`px-4 py-3 font-mono ${dark ? "text-neutral-500" : "text-neutral-400"}`}>{m.size}</td>

                  {/* Status toggle */}
                  <td className="px-4 py-3">
                    <button onClick={() => toggleModelStatus(m.id)}
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1
                                  rounded-full border cursor-pointer transition-all duration-150
                        ${m.status === "active"
                          ? dark
                            ? "bg-green-950/60 border-green-800 text-green-500 hover:bg-red-950/60 hover:border-red-800 hover:text-red-500"
                            : "bg-green-50 border-green-200 text-green-600 hover:bg-red-50 hover:border-red-200 hover:text-red-500"
                          : dark
                            ? "bg-neutral-800 border-neutral-700 text-neutral-500 hover:bg-green-950/60 hover:border-green-800 hover:text-green-500"
                            : "bg-neutral-100 border-neutral-200 text-neutral-400 hover:bg-green-50 hover:border-green-200 hover:text-green-600"}`}>
                      {m.status === "active" ? "Active" : "Inactive"}
                    </button>
                  </td>

                  {/* Remove */}
                  <td className="px-4 py-3">
                    <button onClick={() => removeModel(m.id)}
                      className={`text-base leading-none px-1 cursor-pointer transition-colors
                        ${dark ? "text-neutral-600 hover:text-orange-500" : "text-neutral-300 hover:text-orange-500"}`}>×</button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── API Configuration ── */}
      <div className={`rounded-xl border mb-5 transition-colors duration-300
        ${dark ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200 shadow-sm"}`}>
        <div className={`px-6 py-4 border-b flex items-center gap-2 ${dark ? "border-neutral-800" : "border-neutral-100"}`}>
          <div className="w-0.5 h-4 bg-red-700 rounded-full" />
          <h2 className={`text-xs font-extrabold uppercase tracking-widest ${dark ? "text-white" : "text-neutral-800"}`}>
            API Configuration
          </h2>
        </div>
        <div className="px-6">
          <SettingsRow label="API Base URL" sub="REST endpoint for job submission and status" dark={dark}>
            <input value={apiUrl} onChange={e => setApiUrl(e.target.value)}
              className={`w-64 h-8 px-3 rounded-md border text-xs font-mono focus:outline-none focus:border-red-600
                ${dark ? "bg-neutral-800 border-neutral-700 text-white" : "bg-neutral-50 border-neutral-300 text-neutral-900"}`} />
          </SettingsRow>
          <SettingsRow label="Polling Interval" sub="How often the UI checks job status (ms)" dark={dark}>
            <input value={pollMs} onChange={e => setPollMs(e.target.value)}
              className={`w-28 h-8 px-3 rounded-md border text-xs font-mono focus:outline-none focus:border-red-600
                ${dark ? "bg-neutral-800 border-neutral-700 text-white" : "bg-neutral-50 border-neutral-300 text-neutral-900"}`} />
          </SettingsRow>
        </div>
      </div>

      {/* ── Creo Connection ── */}
      <div className={`rounded-xl border mb-7 transition-colors duration-300
        ${dark ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200 shadow-sm"}`}>
        <div className={`px-6 py-4 border-b flex items-center gap-2 ${dark ? "border-neutral-800" : "border-neutral-100"}`}>
          <div className="w-0.5 h-4 bg-red-700 rounded-full" />
          <h2 className={`text-xs font-extrabold uppercase tracking-widest ${dark ? "text-white" : "text-neutral-800"}`}>
            Creo Connection
          </h2>
        </div>
        <div className="px-6">
          <SettingsRow label="Status" sub="Connection from Creo via URL parameter" dark={dark}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold text-green-600">Connected</span>
            </div>
          </SettingsRow>
          <SettingsRow label="Model Source" sub="How the part name reaches the UI" dark={dark}>
            <span className={`text-xs font-mono font-semibold ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
              ?model= URL param
            </span>
          </SettingsRow>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={save}
          className="px-6 py-2.5 bg-red-700 hover:bg-red-600 text-white rounded-md font-bold text-sm cursor-pointer transition-colors">
          Save Settings
        </button>
        {saved && <span className="text-sm font-semibold text-green-600">✓ Saved</span>}
      </div>
    </div>
  );
};

// ─── THEME TOGGLE ─────────────────────────────────────────────────────────────
const ThemeToggle = ({ dark, onToggle }) => (
  <button onClick={onToggle}
    className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-bold tracking-wider
                transition-all duration-200 cursor-pointer
      ${dark
        ? "bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700 hover:text-white"
        : "bg-white border-neutral-300 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"}`}>
    <span>{dark ? "☀" : "☾"}</span>
    {dark ? "Light" : "Dark"}
  </button>
);

// ─── TOP BAR ──────────────────────────────────────────────────────────────────
const TopBar = ({ modelName, dark, onToggle }) => (
  <div className={`border-b px-7 h-16 flex items-center justify-between sticky top-0 z-50 transition-colors duration-300
    ${dark ? "bg-neutral-950 border-neutral-800" : "bg-white border-neutral-200 shadow-sm"}`}>
    <div className={`text-sm font-semibold ${dark ? "text-white" : "text-neutral-700"}`}>
      Product Draw Automation
      <span className={`ml-2 text-[10px] font-normal ${dark ? "text-neutral-600" : "text-neutral-400"}`}>
        Integration Package 10.0.7.3
      </span>
    </div>
    {modelName && (
      <div className={`flex items-center gap-2 rounded-md px-3 py-1.5 border
        ${dark ? "bg-red-950 border-red-900/50" : "bg-red-50 border-red-200"}`}>
        <span className={`text-[10px] font-bold uppercase tracking-widest ${dark ? "text-neutral-500" : "text-red-400"}`}>Model</span>
        <span className="text-xs font-semibold text-red-600 font-mono">{modelName}</span>
      </div>
    )}
    <div className="flex items-center gap-3">
      <ThemeToggle dark={dark} onToggle={onToggle} />
      <div className={`w-px h-5 ${dark ? "bg-neutral-800" : "bg-neutral-200"}`} />
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className={`text-xs ${dark ? "text-neutral-500" : "text-neutral-400"}`}>Creo connected</span>
      </div>
    </div>
  </div>
);

// ─── SHARED FORM PRIMITIVES ───────────────────────────────────────────────────
const Label = ({ children, required, dark }) => (
  <label className={`block text-[10px] font-bold uppercase tracking-widest mb-1.5
    ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
    {children}{required && <span className="text-red-600 ml-0.5">*</span>}
  </label>
);

const Input = ({ value, onChange, placeholder, readOnly, mono, dark }) => (
  <input value={value ?? ""} onChange={onChange} placeholder={placeholder} readOnly={readOnly}
    className={[
      "w-full h-9 px-3 rounded-md border text-sm transition-all duration-150",
      "focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200",
      mono ? "font-mono" : "",
      dark
        ? "bg-neutral-900 border-neutral-700 text-white placeholder-neutral-600 " + (readOnly ? "text-neutral-500 bg-neutral-950 border-neutral-800 cursor-default" : "")
        : "bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400 "  + (readOnly ? "text-neutral-400 bg-neutral-100 border-neutral-200 cursor-default" : ""),
    ].join(" ")} />
);

const Select = ({ value, onChange, options, dark }) => (
  <select value={value ?? ""} onChange={onChange}
    className={`w-full h-9 px-3 rounded-md border text-sm cursor-pointer appearance-none
      focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200 transition-all duration-150
      ${dark ? "bg-neutral-900 border-neutral-700 text-white" : "bg-white border-neutral-300 text-neutral-900"}`}
    style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='${dark?"%23666":"%23999"}' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat:"no-repeat", backgroundPosition:"right 11px center" }}>
    <option value="">— Select —</option>
    {options.map(o => <option key={o} value={o}>{o}</option>)}
  </select>
);

const Checkbox = ({ checked, onChange, label, dark }) => (
  <label className={`flex items-center gap-2 cursor-pointer text-sm ${dark ? "text-neutral-300" : "text-neutral-700"}`}>
    <input type="checkbox" checked={checked} onChange={onChange} className="w-4 h-4 accent-red-700 cursor-pointer" />
    {label}
  </label>
);

const Card = ({ children, className = "", dark }) => (
  <div className={`rounded-xl p-6 border transition-colors duration-300
    ${dark ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200 shadow-sm"} ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ children, sub, dark }) => (
  <div className="mb-5">
    <div className="flex items-center gap-2">
      <div className="w-0.5 h-3.5 bg-red-700 rounded-full flex-shrink-0" />
      <h3 className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-red-600">{children}</h3>
    </div>
    {sub && <p className={`text-[11px] mt-1 ml-2.5 ${dark ? "text-neutral-500" : "text-neutral-400"}`}>{sub}</p>}
  </div>
);

const Divider = ({ dark }) => <div className={`h-px my-5 ${dark ? "bg-neutral-800" : "bg-neutral-200"}`} />;

const Badge = ({ children, dark }) => (
  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider
    ${dark ? "bg-neutral-800 text-neutral-400" : "bg-neutral-100 text-neutral-500"}`}>{children}</span>
);

const Field = ({ label, required, children, dark }) => (
  <div><Label required={required} dark={dark}>{label}</Label>{children}</div>
);

const BtnPrimary = ({ onClick, disabled, children, className = "" }) => (
  <button onClick={onClick} disabled={disabled}
    className={`px-6 py-2.5 rounded-md font-bold text-sm tracking-wider transition-all duration-150
      ${disabled ? "bg-neutral-300 text-neutral-400 cursor-not-allowed" : "bg-red-700 hover:bg-red-600 text-white cursor-pointer"} ${className}`}>
    {children}
  </button>
);

const BtnGhost = ({ onClick, children, dark }) => (
  <button onClick={onClick}
    className={`px-5 py-2.5 rounded-md font-semibold text-sm transition-all duration-150 cursor-pointer border
      ${dark ? "text-neutral-400 border-neutral-700 hover:border-neutral-400 hover:text-white"
             : "text-neutral-500 border-neutral-300 hover:border-neutral-500 hover:text-neutral-900"}`}>
    {children}
  </button>
);

const NavRow = ({ onBack, onNext, nextLabel, nextDisabled, dark }) => (
  <div className="flex justify-between mt-6">
    <BtnGhost onClick={onBack} dark={dark}>← Back</BtnGhost>
    <BtnPrimary onClick={onNext} disabled={nextDisabled}>{nextLabel || "Next →"}</BtnPrimary>
  </div>
);

// ─── STEPPER ─────────────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: "Job Config"   }, { id: 2, label: "Product Draw" },
  { id: 3, label: "Drawing Specs"     }, { id: 4, label: "Review"       },
  { id: 5, label: "AI Run"       },
];

const Stepper = ({ current, dark }) => (
  <div className="flex items-center justify-center py-4 px-6">
    {STEPS.map((s, i) => {
      const done = s.id < current, active = s.id === current;
      return (
        <div key={s.id} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs transition-all duration-300
              ${done ? "bg-red-700 text-white" : active ? "bg-red-700 text-white ring-4 ring-red-200" : dark ? "bg-neutral-800 text-neutral-500" : "bg-neutral-200 text-neutral-400"}`}>
              {done ? "✓" : s.id}
            </div>
            <span className={`text-[9px] font-bold uppercase tracking-widest whitespace-nowrap
              ${active ? "text-red-600" : done ? dark ? "text-neutral-500" : "text-neutral-400" : dark ? "text-neutral-700" : "text-neutral-300"}`}>
              {s.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-14 h-0.5 mb-5 flex-shrink-0 transition-all duration-500
              ${done ? "bg-red-700" : dark ? "bg-neutral-800" : "bg-neutral-200"}`} />
          )}
        </div>
      );
    })}
  </div>
);

// ─── DEFAULT SPECS ────────────────────────────────────────────────────────────
const DEFAULT_SPECS = [
  { id:1,  spec:"1E5167A", desc:"INT-PROP",        note:"",  type:"General" },
  { id:2,  spec:"1E4436",  desc:"SURF. APPEARANCE", note:"D", type:"General" },
  { id:3,  spec:"1E2966A", desc:"IDENT",            note:"",  type:"General" },
  { id:4,  spec:"1E2722A", desc:"DRAWING",          note:"",  type:"General" },
  { id:5,  spec:"1E2391",  desc:"DIM. CONT",        note:"",  type:"General" },
  { id:6,  spec:"1E0507E", desc:"IDENT",            note:"",  type:"General" },
  { id:7,  spec:"1E0198W", desc:"BRAND MARKINGS",   note:"",  type:"General" },
  { id:8,  spec:"1E0099S", desc:"WELDING",          note:"",  type:"General" },
  { id:9,  spec:"1E0013Y", desc:"CONFIDENTIALITY",  note:"",  type:"General" },
  { id:10, spec:"1E0012A", desc:"INTERPRETATION",   note:"",  type:"General" },
];

// ─── WORKFLOW PAGES (1-5) ─────────────────────────────────────────────────────
const Page1 = ({ data, onChange, modelName, onNext, dark, customers = [] }) => {
  const activeCustomers = customers.filter(c => c.active).map(c => c.name);
  return (
    <div className="p-7 pb-20 max-w-5xl mx-auto">
      <Card dark={dark}>
        <SectionTitle dark={dark} sub="Set up the job before entering the automation pipeline">Job Configuration</SectionTitle>
        <div className="grid grid-cols-2 gap-x-5 gap-y-4">
          <Field label="Model / Part Name" dark={dark}>
            <Input value={modelName} readOnly mono dark={dark} />
            <p className={`text-[11px] mt-1 ${dark?"text-neutral-600":"text-neutral-400"}`}>Auto-populated from Creo</p>
          </Field>
          <Field label="Project Name" dark={dark}>
            <Input value={data.projectName} onChange={e=>onChange("projectName",e.target.value)} placeholder="e.g. Q3-FRAME-2026" dark={dark} />
          </Field>
          <Field label="Customer Name" dark={dark}>
            <Select value={data.customerName} onChange={e=>onChange("customerName",e.target.value)} dark={dark}
              options={activeCustomers} />
          </Field>
          <Field label="AI Model" dark={dark}>
            <Select value={data.aiModel} onChange={e=>onChange("aiModel",e.target.value)} dark={dark}
              options={["Annotator-V4 (Geometry Focus)","Drafting-Core-v2 (Standard)","DimGen-V3 (Dimensioning)","AutoNote-V1 (Annotations)"]} />
          </Field>
        </div>
      </Card>
      <div className="flex justify-end mt-5">
        <BtnPrimary onClick={onNext}>Next: Product Draw →</BtnPrimary>
      </div>
    </div>
  );
};

const Page2 = ({ data, onChange, onNext, onBack, dark }) => {
  const autoName = [data.noun,data.partType,data.modifier].filter(Boolean).join(" — ")||"—";
  return (
    <div className="p-7 pb-20 max-w-5xl mx-auto">
      <Card dark={dark}>
        <SectionTitle dark={dark} sub="Product Draw — Data Tab · Integration Package fields">Product Draw Details</SectionTitle>
        <div className="grid grid-cols-3 gap-x-5 gap-y-4">
          <Field label="Part Number" dark={dark}><Input value={data.partNumber} onChange={e=>onChange("partNumber",e.target.value)} placeholder="e.g. 551-4781" mono dark={dark}/></Field>
          <Field label="Design Control" dark={dark}><Select value={data.designControl} onChange={e=>onChange("designControl",e.target.value)} options={["HE210","HE100","HE300","HE400","HE500"]} dark={dark}/></Field>
          <Field label="Part Type" dark={dark}><Select value={data.partType} onChange={e=>onChange("partType",e.target.value)} options={["AS","MF","DW","PF","ST","CM"]} dark={dark}/></Field>
        </div>
        <Divider dark={dark}/>
        <div className="grid grid-cols-3 gap-x-5 gap-y-4">
          <Field label="Noun" dark={dark}><Select value={data.noun} onChange={e=>onChange("noun",e.target.value)} options={["FRAME","BRACKET","PLATE","SHAFT","HOUSING","COVER","SEAL","BEARING","BUSHING","GEAR"]} dark={dark}/></Field>
          <Field label="Modifier" dark={dark}><Select value={data.modifier} onChange={e=>onChange("modifier",e.target.value)} options={["","SKIRT","FRONT","REAR","UPPER","LOWER","INNER","OUTER","LEFT","RIGHT"]} dark={dark}/></Field>
          <Field label="Drawing Name Line 2" dark={dark}><Input value={data.drawingNameLine2} onChange={e=>onChange("drawingNameLine2",e.target.value)} placeholder="e.g. (RH)" dark={dark}/></Field>
        </div>
        <div className={`flex items-center gap-3 rounded-lg px-4 py-2.5 my-4 border ${dark?"bg-red-950/50 border-red-900/30":"bg-red-50 border-red-200"}`}>
          <span className={`text-[10px] font-bold uppercase tracking-widest whitespace-nowrap ${dark?"text-neutral-500":"text-neutral-400"}`}>Drawing Name Line 1</span>
          <div className={`w-px h-4 ${dark?"bg-neutral-700":"bg-neutral-300"}`}/>
          <span className="text-sm font-bold text-red-600 font-mono">{autoName}</span>
        </div>
        <div className="grid grid-cols-3 gap-x-5 gap-y-4">
          <Field label="Change Level" dark={dark}><Input value={data.changeLvl} onChange={e=>onChange("changeLvl",e.target.value)} placeholder="e.g. 06" dark={dark}/></Field>
          <Field label="Version" dark={dark}><Select value={data.version} onChange={e=>onChange("version",e.target.value)} options={["HE","SE","PE","CE","DE"]} dark={dark}/></Field>
          <Field label="Drawing Class" dark={dark}><Select value={data.drawingClass} onChange={e=>onChange("drawingClass",e.target.value)} options={["PRODUCTION","PROTOTYPE","REFERENCE","OBSOLETE"]} dark={dark}/></Field>
        </div>
        <Divider dark={dark}/>
        <div className="grid grid-cols-3 gap-x-5 gap-y-4">
          <Field label="Unit of Measure" dark={dark}><Select value={data.unitMeas} onChange={e=>onChange("unitMeas",e.target.value)} options={["Piece","Meter","Kilogram","Liter","Set","Pair"]} dark={dark}/></Field>
          <Field label="Weight Type" dark={dark}><Select value={data.weightType} onChange={e=>onChange("weightType",e.target.value)} options={["ESTIMATE","CALCULATED","MEASURED","THEORETICAL"]} dark={dark}/></Field>
          <Field label="Weight" dark={dark}><Input value={data.weight} onChange={e=>onChange("weight",e.target.value)} placeholder="e.g. 190.6" dark={dark}/></Field>
        </div>
        <div className="mt-4"><Checkbox checked={data.overrideWeight} onChange={e=>onChange("overrideWeight",e.target.checked)} label="Override Weight" dark={dark}/></div>
        <Divider dark={dark}/>
        <div className="grid grid-cols-2 gap-x-5 gap-y-4">
          <Field label="Ref Part No." dark={dark}><Input value={data.refPartNo} onChange={e=>onChange("refPartNo",e.target.value)} placeholder="Reference part number" mono dark={dark}/></Field>
          <Field label="Ref. Version" dark={dark}><Select value={data.refVersion} onChange={e=>onChange("refVersion",e.target.value)} options={["HE","SE","PE","CE","DE"]} dark={dark}/></Field>
        </div>
        <Divider dark={dark}/>
        <SectionTitle dark={dark}>Version Type</SectionTitle>
        <div className="grid grid-cols-2 gap-x-5 gap-y-4">
          <Field label="Drawing Version" dark={dark}><Select value={data.drawingVersion} onChange={e=>onChange("drawingVersion",e.target.value)} options={["PRIMARY","SECONDARY","REFERENCE"]} dark={dark}/></Field>
          <Field label="Sec Change Type" dark={dark}><Select value={data.secChangeType} onChange={e=>onChange("secChangeType",e.target.value)} options={["","ECN","DCN","MCN","PCN"]} dark={dark}/></Field>
          <Field label="R.P. Drawing Version" dark={dark}><Input value={data.rpDrawingVersion} onChange={e=>onChange("rpDrawingVersion",e.target.value)} placeholder="R.P. Drawing Version" dark={dark}/></Field>
          <Field label="R.P. Change Number" dark={dark}><Input value={data.rpChangeNumber} onChange={e=>onChange("rpChangeNumber",e.target.value)} placeholder="R.P. Change Number" dark={dark}/></Field>
        </div>
      </Card>
      <NavRow onBack={onBack} onNext={onNext} nextLabel="Next: Drawing Specs →" dark={dark}/>
    </div>
  );
};

const Page3 = ({ data, onChange, onNext, onBack, dark }) => {
  const specs    = data.specs    || DEFAULT_SPECS;
  const reqSpecs = data.reqSpecs || { drawing:"1E2722A",branding:"1E0198W",confidentiality:"1E0013Y",supplierType:"Customer 1",highPriority:false };
  const optSpecs = data.optSpecs || { ident:"1E0507E",apqp:"1E2966A" };
  const [newSpec, setNewSpec] = useState("");
  const [sel, setSel] = useState(null);
  const upd = v  => onChange("specs", v);
  const del = id => upd(specs.filter(s=>s.id!==id));
  const add = () => { if(!newSpec.trim())return; upd([...specs,{id:Date.now(),spec:newSpec.trim(),desc:"",note:"",type:"General"}]); setNewSpec(""); };
  const setReq = (k,v) => onChange("reqSpecs",{...reqSpecs,[k]:v});
  const setOpt = (k,v) => onChange("optSpecs",{...optSpecs,[k]:v});

  return (
    <div className="p-7 pb-20 max-w-5xl mx-auto">
      <div className="grid grid-cols-[1fr_268px] gap-5">
        <Card dark={dark}>
          <SectionTitle dark={dark} sub="Drawing Specs — specification codes">Drawing Specs</SectionTitle>
          <div className={`border rounded-lg overflow-hidden ${dark?"border-neutral-800":"border-neutral-200"}`}>
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className={dark?"bg-neutral-950":"bg-neutral-50"}>
                  {["#","Spec ↕","Description","Note","Type",""].map((h,i)=>(
                    <th key={i} className={`px-3 py-2.5 text-left text-[10px] font-extrabold uppercase tracking-widest border-b ${dark?"text-neutral-600 border-neutral-800":"text-neutral-400 border-neutral-200"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specs.map((s,i)=>(
                  <tr key={s.id} onClick={()=>setSel(s.id)}
                    className={`cursor-pointer transition-colors duration-100
                      ${sel===s.id ? dark?"bg-red-950/60":"bg-red-50"
                        : i%2===0 ? dark?"bg-neutral-900":"bg-white"
                        : dark?"bg-neutral-900/50":"bg-neutral-50/50"}
                      ${dark?"hover:bg-red-950/30":"hover:bg-red-50/70"}`}>
                    <td className={`px-3 py-2 font-bold ${dark?"text-neutral-600":"text-neutral-400"}`}>{i+1}</td>
                    <td className="px-3 py-2 font-mono font-semibold text-red-600 text-[11px]">{s.spec}</td>
                    <td className={`px-3 py-2 ${dark?"text-neutral-300":"text-neutral-700"}`}>{s.desc}</td>
                    <td className={`px-3 py-2 ${dark?"text-neutral-500":"text-neutral-400"}`}>{s.note}</td>
                    <td className="px-3 py-2"><Badge dark={dark}>{s.type}</Badge></td>
                    <td className="px-3 py-2">
                      <button onClick={e=>{e.stopPropagation();del(s.id);}}
                        className={`text-base leading-none px-1 transition-colors hover:text-orange-500 ${dark?"text-neutral-600":"text-neutral-300"}`}>×</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-2 mt-4">
            <input value={newSpec} onChange={e=>setNewSpec(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()}
              placeholder="Enter Spec code and press Enter…"
              className={`flex-1 h-9 px-3 rounded-md border text-xs font-mono focus:outline-none focus:border-red-600
                ${dark?"bg-neutral-900 border-neutral-700 text-white placeholder-neutral-600":"bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400"}`}/>
            <BtnPrimary onClick={add} className="!px-4 !text-xs !py-0 h-9">+ Add</BtnPrimary>
          </div>
        </Card>
        <div className="flex flex-col gap-4">
          <Card dark={dark} className="!p-4">
            <SectionTitle dark={dark}>Required Specs</SectionTitle>
            <div className="flex flex-col gap-3">
              {[["Drawing","drawing",["1E2722A","1E2300A","1E2100A"]],["Branding","branding",["1E0198W","1E0199W","1E0200W"]],["Confidentiality","confidentiality",["1E0013Y","1E0014Y","1E0015Y"]],["Supplier Type","supplierType",["Customer 1","EXTERNAL","INTERNAL","OEM"]]].map(([lbl,key,opts])=>(
                <Field key={key} label={lbl} dark={dark}><Select value={reqSpecs[key]} onChange={e=>setReq(key,e.target.value)} options={opts} dark={dark}/></Field>
              ))}
              <Field label="High Priority To Brand" dark={dark}>
                <div className="flex gap-1.5">
                  {["Yes","No"].map(v=>{const active=reqSpecs.highPriority===(v==="Yes");return(
                    <button key={v} onClick={()=>setReq("highPriority",v==="Yes")}
                      className={`flex-1 h-8 rounded-md text-xs font-bold transition-all duration-150 cursor-pointer border
                        ${active?"bg-red-50 border-red-600 text-red-700":dark?"bg-transparent border-neutral-700 text-neutral-500 hover:border-neutral-500":"bg-transparent border-neutral-300 text-neutral-400 hover:border-neutral-400"}`}>{v}</button>
                  );})}
                </div>
              </Field>
            </div>
          </Card>
          <Card dark={dark} className="!p-4">
            <SectionTitle dark={dark}>Optional Specs</SectionTitle>
            <div className="flex flex-col gap-3">
              {[["Ident","ident",["1E0507E","1E0508E","1E0509E"]],["APQP?","apqp",["1E2966A","1E2967A","1E2968A"]]].map(([lbl,key,opts])=>(
                <Field key={key} label={lbl} dark={dark}><Select value={optSpecs[key]} onChange={e=>setOpt(key,e.target.value)} options={opts} dark={dark}/></Field>
              ))}
            </div>
          </Card>
          <div className={`rounded-xl p-4 text-center border ${dark?"bg-red-950/40 border-red-900/30":"bg-red-50 border-red-200"}`}>
            <div className="text-4xl font-black text-red-600" style={{fontFamily:"'Barlow Condensed', sans-serif"}}>{specs.length}</div>
            <div className={`text-[10px] font-extrabold uppercase tracking-widest mt-1 ${dark?"text-neutral-500":"text-neutral-400"}`}>Specs on model</div>
          </div>
        </div>
      </div>
      <NavRow onBack={onBack} onNext={onNext} nextLabel="Next: Review →" dark={dark}/>
    </div>
  );
};

const RRow = ({ label, value, mono, dark }) => (
  <div className={`flex justify-between items-center py-1.5 border-b last:border-0 ${dark?"border-neutral-800":"border-neutral-100"}`}>
    <span className={`text-[10px] font-bold uppercase tracking-widest ${dark?"text-neutral-600":"text-neutral-400"}`}>{label}</span>
    <span className={`text-xs font-medium text-right max-w-[58%] ${mono?"font-mono":""} ${dark?"text-neutral-300":"text-neutral-700"}`}>{value||"—"}</span>
  </div>
);

const Page4 = ({ job, modelName, onBack, onSubmit, submitting, dark }) => {
  const {p1,p2,p3}=job;
  const payload=JSON.stringify({modelName,...p1,productDraw:p2,specs:{required:p3.reqSpecs,optional:p3.optSpecs,specCount:(p3.specs||DEFAULT_SPECS).length}},null,2);
  return (
    <div className="p-7 pb-20 max-w-5xl mx-auto">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Card dark={dark}><SectionTitle dark={dark}>Job Configuration</SectionTitle><RRow label="Model Name" value={modelName} mono dark={dark}/><RRow label="Project" value={p1.projectName} dark={dark}/><RRow label="Customer" value={p1.customerName} dark={dark}/><RRow label="AI Model" value={p1.aiModel} dark={dark}/></Card>
        <Card dark={dark}><SectionTitle dark={dark}>Part Details</SectionTitle><RRow label="Part No." value={p2.partNumber} mono dark={dark}/><RRow label="Noun" value={p2.noun} dark={dark}/><RRow label="Modifier" value={p2.modifier} dark={dark}/><RRow label="Design Ctrl" value={p2.designControl} dark={dark}/><RRow label="Part Type" value={p2.partType} dark={dark}/><RRow label="Drawing Class" value={p2.drawingClass} dark={dark}/><RRow label="Weight" value={p2.weight?`${p2.weight} (${p2.weightType})`:""} dark={dark}/></Card>
        <Card dark={dark}><SectionTitle dark={dark}>Required Specs</SectionTitle><RRow label="Drawing" value={(p3.reqSpecs||{}).drawing} mono dark={dark}/><RRow label="Branding" value={(p3.reqSpecs||{}).branding} mono dark={dark}/><RRow label="Confidentiality" value={(p3.reqSpecs||{}).confidentiality} mono dark={dark}/><RRow label="Supplier Type" value={(p3.reqSpecs||{}).supplierType} dark={dark}/><RRow label="High Priority" value={(p3.reqSpecs||{}).highPriority?"Yes":"No"} dark={dark}/></Card>
        <Card dark={dark}><SectionTitle dark={dark}>Drawing Specs ({(p3.specs||DEFAULT_SPECS).length} total)</SectionTitle>{(p3.specs||DEFAULT_SPECS).slice(0,6).map(s=><RRow key={s.id} label={s.spec} value={s.desc} mono dark={dark}/>)}{(p3.specs||DEFAULT_SPECS).length>6&&<p className={`text-[11px] mt-2 text-center ${dark?"text-neutral-600":"text-neutral-400"}`}>+{(p3.specs||DEFAULT_SPECS).length-6} more…</p>}</Card>
      </div>
      <Card dark={dark}>
        <SectionTitle dark={dark} sub="Exact JSON that will POST to /api/jobs on submit">API Payload Preview</SectionTitle>
        <pre className={`rounded-lg p-4 text-[11px] font-mono overflow-auto max-h-52 border leading-relaxed ${dark?"bg-neutral-950 text-amber-400 border-neutral-800":"bg-neutral-50 text-red-700 border-neutral-200"}`}>{payload}</pre>
      </Card>
      <div className="flex justify-between items-center mt-6">
        <BtnGhost onClick={onBack} dark={dark}>← Back</BtnGhost>
        <BtnPrimary onClick={onSubmit} disabled={submitting} className="!px-9 !py-3 !text-sm">
          {submitting?"Submitting…":"Submit & Run AI Model →"}
        </BtnPrimary>
      </div>
    </div>
  );
};

const AI_PIPELINE = [
  {label:"Job received",       sub:"API confirmed payload"},
  {label:"Creo handshake",     sub:"Connecting to Creo DLL"},
  {label:"Geometry extraction",sub:"Parsing 3D model data"},
  {label:"Uploading payload",  sub:"Sending 3D.json to middleware"},
  {label:"AI inference",       sub:"Running annotation engine"},
  {label:"Drawing generation", sub:"Applying 2D annotations & dims"},
  {label:"Export & packaging", sub:"Generating final PDF output"},
];
const AI_LOGS = [
  "API: Job payload validated ✓",
  "Creo DLL: Connection established on port 8765",
  "Creo DLL: Extracting geometry — 1,247 faces parsed",
  "Middleware: Received 3D.json payload (2.4 MB)",
  "AI Engine: Annotator-V4 inference started",
  "AI Engine: 47 annotations + 23 dimensions generated",
  "Export: FRAME-AS-SKIRT-2026.pdf created (1.8 MB)",
];

const Page5 = ({ jobId, onReset, dark }) => {
  const [currentStep,setCurrentStep]=useState(0);
  const [done,setDone]=useState(false);
  const [log,setLog]=useState([{t:new Date().toLocaleTimeString(),msg:`Job ${jobId} queued. Pipeline starting…`,type:"info"}]);
  const logRef=useRef(null);
  const addLog=(msg,type="info")=>setLog(p=>[...p,{t:new Date().toLocaleTimeString(),msg,type}]);
  useEffect(()=>{let step=0;const iv=setInterval(()=>{if(step<AI_PIPELINE.length){setCurrentStep(step+1);addLog(AI_LOGS[step],step===AI_PIPELINE.length-1?"success":"info");step++;}else{clearInterval(iv);setDone(true);addLog("✓ PROCESS COMPLETE — Drawing ready for review","success");}},1700);return()=>clearInterval(iv);},[]);
  useEffect(()=>{if(logRef.current)logRef.current.scrollTop=logRef.current.scrollHeight;},[log]);
  const progress=done?100:Math.round((currentStep/AI_PIPELINE.length)*100);

  return (
    <div className="p-7 pb-20 max-w-5xl mx-auto">
      <div className={`rounded-xl px-5 py-3 flex items-center justify-between mb-5 border ${dark?"bg-neutral-950 border-neutral-800":"bg-white border-neutral-200 shadow-sm"}`}>
        <div className="flex items-center gap-4">
          <div className={`w-px h-6 ${dark?"bg-neutral-800":"bg-neutral-200"}`}/>
          <div>
            <div className={`text-sm font-bold ${done?"text-green-600":dark?"text-white":"text-neutral-900"}`}>{done?"AI Run Complete":"AI Model Running…"}</div>
            <div className={`text-[10px] ${dark?"text-neutral-500":"text-neutral-400"}`}>Job ID: <span className="text-red-600 font-mono">{jobId}</span></div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-3xl font-black ${done?"text-green-600":"text-red-600"}`} style={{fontFamily:"'Barlow Condensed',sans-serif"}}>{progress}%</span>
          {!done&&<div className="w-5 h-5 border-2 border-red-200 border-t-red-600 rounded-full animate-spin"/>}
        </div>
      </div>
      <div className="grid grid-cols-[1fr_280px] gap-5">
        <Card dark={dark}>
          <div className={`h-2.5 rounded-full overflow-hidden border mb-6 ${dark?"bg-neutral-800 border-neutral-800":"bg-neutral-200 border-neutral-200"}`}>
            <div className={`h-full rounded-full transition-all duration-1000 ${done?"bg-green-500":"bg-red-700"}`} style={{width:`${progress}%`}}/>
          </div>
          <div className="flex flex-col gap-2">
            {AI_PIPELINE.map((s,i)=>{
              const isDone=i+1<=currentStep,isActive=i+1===currentStep+(done?0:1)&&!done;
              return(
                <div key={i} className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-lg border transition-all duration-300
                  ${isDone?dark?"bg-red-950/40 border-red-900/40":"bg-red-50 border-red-200":isActive?dark?"bg-neutral-800/60 border-neutral-700":"bg-neutral-100 border-neutral-300":dark?"bg-neutral-900/40 border-neutral-800":"bg-neutral-50 border-neutral-200"}`}>
                  <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300
                    ${isDone?"bg-red-700":isActive?dark?"bg-red-950 border-2 border-red-600":"bg-red-100 border-2 border-red-500":dark?"bg-neutral-800":"bg-neutral-200"}`}>
                    {isDone?<span className="text-white text-[11px] font-extrabold">✓</span>:isActive?<div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"/>:<span className={`text-[11px] font-bold ${dark?"text-neutral-600":"text-neutral-400"}`}>{i+1}</span>}
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-semibold transition-colors duration-300 ${isDone?"text-red-600":isActive?dark?"text-white":"text-neutral-900":dark?"text-neutral-600":"text-neutral-300"}`}>{s.label}</div>
                    <div className={`text-[11px] ${dark?"text-neutral-600":"text-neutral-400"}`}>{s.sub}</div>
                  </div>
                  {isDone&&<span className="text-[10px] text-red-600 font-bold uppercase tracking-wider">Done</span>}
                  {isActive&&<span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider">Running…</span>}
                </div>
              );
            })}
          </div>
          {done&&(
            <div className="mt-5 p-4 bg-green-50 border border-green-200 rounded-xl flex justify-between items-center">
              <div>
                <div className="font-extrabold text-green-700 text-sm">Drawing Generated Successfully</div>
                <div className="text-xs text-green-500 mt-0.5">FRAME-AS-SKIRT-2026.pdf · 1.8 MB · Ready</div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-500 text-white text-xs font-bold transition-colors cursor-pointer">↓ Download PDF</button>
                <BtnGhost onClick={onReset} dark={dark}>New Job</BtnGhost>
              </div>
            </div>
          )}
        </Card>
        <Card dark={dark} className="!p-0 overflow-hidden flex flex-col">
          <div className={`px-4 py-3 border-b flex items-center gap-2 ${dark?"border-neutral-800":"border-neutral-200"}`}>
            <div className={`w-2 h-2 rounded-full ${done?"bg-green-500":"bg-red-600 animate-pulse"}`}/>
            <span className={`text-[11px] font-extrabold uppercase tracking-widest ${dark?"text-neutral-500":"text-neutral-400"}`}>Live Log</span>
            <span className={`ml-auto text-[10px] ${dark?"text-neutral-700":"text-neutral-300"}`}>{log.length} entries</span>
          </div>
          <div ref={logRef} className="p-3.5 flex-1 overflow-y-auto max-h-[480px] flex flex-col gap-1">
            {log.map((l,i)=>(
              <div key={i} className="text-[11px] font-mono leading-relaxed">
                <span className={dark?"text-neutral-700":"text-neutral-400"}>[{l.t}] </span>
                <span className={l.type==="success"?"text-green-600":l.type==="error"?"text-red-600":dark?"text-neutral-400":"text-neutral-600"}>{l.msg}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const modelName = urlParams.get("model") || "FRAME_551-4781_HE";

  const [dark,       setDark]       = useState(false);
  const [collapsed,  setCollapsed]  = useState(false);
  const [activeNav,  setActiveNav]  = useState("workflow");

  // ── Shared customer list — used by Settings (manage) and Page 1 (dropdown) ──
  const [customers, setCustomers] = useState([
    { id:1, name:"Customer 1", code:"C1", active:true  },
    { id:2, name:"Customer 2", code:"C2", active:true  },
    { id:3, name:"Customer 3", code:"C3", active:true  },
    { id:4, name:"Customer 4", code:"C4", active:true  },
    { id:5, name:"Customer 5", code:"C5", active:true  },
    { id:6, name:"Customer 6", code:"C6", active:false },
  ]);
  const [step,       setStep]       = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [jobId,      setJobId]      = useState(null);

  const [p1,setP1]=useState({customerName:"Customer 1",aiModel:"Annotator-V4 (Geometry Focus)",projectName:"Q3-FRAME-2026"});
  const [p2,setP2]=useState({partNumber:"551-4781",noun:"FRAME",modifier:"SKIRT",drawingNameLine2:"(RH)",changeLvl:"06",designControl:"HE210",partType:"AS",version:"HE",drawingClass:"PRODUCTION",unitMeas:"Piece",weightType:"ESTIMATE",weight:"190.6",overrideWeight:false,refPartNo:"",refVersion:"",drawingVersion:"PRIMARY",secChangeType:"",rpDrawingVersion:"",rpChangeNumber:""});
  const [p3,setP3]=useState({specs:DEFAULT_SPECS,reqSpecs:{drawing:"1E2722A",branding:"1E0198W",confidentiality:"1E0013Y",supplierType:"Customer 1",highPriority:false},optSpecs:{ident:"1E0507E",apqp:"1E2966A"}});

  const ch1=(k,v)=>setP1(p=>({...p,[k]:v}));
  const ch2=(k,v)=>setP2(p=>({...p,[k]:v}));
  const ch3=(k,v)=>setP3(p=>({...p,[k]:v}));

  const handleSubmit=async()=>{
    setSubmitting(true);
    await new Promise(r=>setTimeout(r,1300));
    const id="JOB-"+Math.random().toString(36).slice(2,8).toUpperCase();
    setJobId(id);setSubmitting(false);setStep(5);
  };

  const handleReset=()=>{
    setStep(1);setJobId(null);
    setP1({customerName:"Customer 1",aiModel:"Annotator-V4 (Geometry Focus)",projectName:"Q3-FRAME-2026"});
    setP2({partNumber:"551-4781",noun:"FRAME",modifier:"SKIRT",drawingNameLine2:"(RH)",changeLvl:"06",designControl:"HE210",partType:"AS",version:"HE",drawingClass:"PRODUCTION",unitMeas:"Piece",weightType:"ESTIMATE",weight:"190.6",overrideWeight:false,refPartNo:"",refVersion:"",drawingVersion:"PRIMARY",secChangeType:"",rpDrawingVersion:"",rpChangeNumber:""});
    setP3({specs:DEFAULT_SPECS,reqSpecs:{drawing:"1E2722A",branding:"1E0198W",confidentiality:"1E0013Y",supplierType:"Customer 1",highPriority:false},optSpecs:{ident:"1E0507E",apqp:"1E2966A"}});
  };

  const pp={dark};

  // When clicking Product Draw nav, always start from step 1 of workflow
  const handleNav=(id)=>{
    setActiveNav(id);
    if(id==="workflow"){setStep(1);handleReset();}
  };

  const renderContent=()=>{
    if(activeNav==="dashboard") return <DashboardPage dark={dark} modelName={modelName}/>;
    if(activeNav==="settings")  return <SettingsPage  dark={dark} onToggleDark={()=>setDark(d=>!d)} customers={customers} setCustomers={setCustomers}/>;
    // workflow
    return (
      <>
        {step<5&&(
          <div className={`border-b transition-colors duration-300 ${dark?"bg-neutral-950 border-neutral-800":"bg-white border-neutral-200"}`}>
            <Stepper current={step} dark={dark}/>
          </div>
        )}
        {step===1&&<Page1 data={p1} onChange={ch1} modelName={modelName} onNext={()=>setStep(2)} customers={customers} {...pp}/>}
        {step===2&&<Page2 data={p2} onChange={ch2} onNext={()=>setStep(3)} onBack={()=>setStep(1)} {...pp}/>}
        {step===3&&<Page3 data={p3} onChange={ch3} onNext={()=>setStep(4)} onBack={()=>setStep(2)} {...pp}/>}
        {step===4&&<Page4 job={{p1,p2,p3}} modelName={modelName} onBack={()=>setStep(3)} onSubmit={handleSubmit} submitting={submitting} {...pp}/>}
        {step===5&&<Page5 jobId={jobId} onReset={handleReset} {...pp}/>}
      </>
    );
  };

  return (
    <div className={`flex h-screen overflow-hidden transition-colors duration-300 ${dark?"bg-neutral-950":"bg-neutral-100"}`}>
      {/* Left Sidebar */}
      <Sidebar activeNav={activeNav} onNav={handleNav} dark={dark} collapsed={collapsed} onToggleCollapse={() => setCollapsed(c => !c)} />

      {/* Main area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top bar */}
        <TopBar modelName={modelName} dark={dark} onToggle={()=>setDark(d=>!d)}/>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}