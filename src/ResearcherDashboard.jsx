import { useState } from "react";

// ─── Theme tokens ─────────────────────────────────────────────────────────────
const C = {
  headerBg:   "#1a5fa8",
  headerText: "#ffffff",
  pageBg:     "#f0f4f8",
  cardBg:     "#ffffff",
  border:     "#e2e8f0",
  shadowSm:   "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)",
  shadowMd:   "0 4px 12px rgba(0,0,0,0.08)",
  primary:    "#1a5fa8",
  primaryDk:  "#134a87",
  primaryLt:  "#e8f0fb",
  green:      "#18c87a",
  greenDk:    "#13a864",
  greenLt:    "#e6faf3",
  teal:       "#0891b2",
  tealLt:     "#e0f7fa",
  amber:      "#d97706",
  amberLt:    "#fef3c7",
  red:        "#dc2626",
  redLt:      "#fee2e2",
  purple:     "#7c3aed",
  purpleLt:   "#ede9fe",
  text:       "#1e293b",
  textMd:     "#475569",
  textSm:     "#94a3b8",
};

// ─── Reusable components ──────────────────────────────────────────────────────
const Badge = ({ children, color = "blue", style = {} }) => {
  const map = {
    blue:   { bg: C.primaryLt, color: C.primary },
    green:  { bg: C.greenLt,   color: "#166534" },
    teal:   { bg: C.tealLt,    color: C.teal },
    amber:  { bg: C.amberLt,   color: C.amber },
    red:    { bg: C.redLt,     color: C.red },
    purple: { bg: C.purpleLt,  color: C.purple },
    gray:   { bg: "#f1f5f9",   color: C.textMd },
  };
  const s = map[color] || map.blue;
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 20,
      background: s.bg, color: s.color, letterSpacing: ".02em", ...style,
    }}>{children}</span>
  );
};

const Btn = ({ children, variant = "outline", onClick, style = {} }) => {
  const [hov, setHov] = useState(false);
  const variants = {
    primary: { background: hov ? C.primaryDk : C.primary, color: "#fff", border: "none", padding: "9px 18px", fontSize: 13.5, fontWeight: 600 },
    green:   { background: hov ? C.greenDk   : C.green,   color: "#fff", border: "none", padding: "9px 18px", fontSize: 13.5, fontWeight: 600 },
    outline: { background: hov ? C.primaryLt : "#fff",     color: C.primary, border: `1.5px solid ${C.primary}`, padding: "7px 14px", fontSize: 12.5, fontWeight: 600 },
    ghost:   { background: hov ? "#f1f5f9"   : "transparent", color: C.textMd, border: `1px solid ${C.border}`, padding: "7px 14px", fontSize: 12.5, fontWeight: 500 },
    sm:      { background: hov ? C.primaryDk : C.primary,  color: "#fff", border: "none", padding: "6px 13px", fontSize: 12, fontWeight: 600 },
  };
  const v = variants[variant] || variants.outline;
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "inline-flex", alignItems: "center", gap: 6, borderRadius: 8,
        cursor: "pointer", transition: "all .15s", ...v, ...style }}>
      {children}
    </button>
  );
};

const Card = ({ children, style = {}, onClick }) => (
  <div onClick={onClick} style={{
    background: C.cardBg, border: `1px solid ${C.border}`,
    borderRadius: 14, boxShadow: C.shadowSm, ...style,
    cursor: onClick ? "pointer" : undefined,
  }}>{children}</div>
);

const SectionHeader = ({ title, sub, action }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
    <div>
      <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>{title}</div>
      {sub && <div style={{ fontSize: 12, color: C.textSm, marginTop: 2 }}>{sub}</div>}
    </div>
    {action}
  </div>
);

// ─── Header ───────────────────────────────────────────────────────────────────
const Header = ({ onLogout }) => (
  <div style={{
    background: C.headerBg, color: C.headerText,
    padding: "0 28px", height: 64, display: "flex",
    alignItems: "center", justifyContent: "space-between",
    boxShadow: "0 2px 8px rgba(26,95,168,0.3)", flexShrink: 0, zIndex: 10,
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{
        width: 42, height: 42, borderRadius: 10, background: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontSize: 10, fontWeight: 800, color: C.primary, lineHeight: 1.2, textAlign: "center" }}>
          ORIC<br/>MUET
        </span>
      </div>
      <div>
        <div style={{ fontSize: 17, fontWeight: 700 }}>MUET ORIC Portal</div>
        <div style={{ fontSize: 12, opacity: .8 }}>Researcher Dashboard</div>
      </div>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      {/* Notification bell */}
      <div style={{ position: "relative", cursor: "pointer" }}>
        <span style={{ fontSize: 20 }}>🔔</span>
        <span style={{
          position: "absolute", top: -4, right: -4, width: 16, height: 16,
          background: C.red, borderRadius: "50%", fontSize: 9, fontWeight: 700,
          color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
          border: `2px solid ${C.headerBg}`,
        }}>3</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 38, height: 38, borderRadius: "50%",
          background: C.green, color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 700,
        }}>DR</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Dr. Raza Hussain</div>
          <div style={{ fontSize: 11, opacity: .8 }}>raza.hussain@faculty.muet.edu.pk</div>
        </div>
      </div>
      <button onClick={onLogout} style={{
        padding: "7px 18px", borderRadius: 8, border: "1.5px solid rgba(255,255,255,0.5)",
        background: "transparent", color: "#fff", fontSize: 13, fontWeight: 600,
        cursor: "pointer", transition: "background .15s",
      }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
      >Logout</button>
    </div>
  </div>
);

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "overview",     label: "Overview",             icon: "⊞",  section: "Dashboard" },
  { id: "proposals",    label: "Proposals & Grants",   icon: "📄", section: "Dashboard", badge: "2", badgeColor: "amber" },
  { id: "publications", label: "Publications",          icon: "📚", section: "Dashboard" },
  { id: "patents",      label: "Patents & IP",          icon: "🏅", section: "Dashboard" },
  { id: "startup",      label: "Startup Application",  icon: "🚀", section: "Dashboard" },
  { id: "funding",      label: "Funding Calls",        icon: "📢", section: "Discover",  badge: "2", badgeColor: "red" },
  { id: "events",       label: "Events",               icon: "📅", section: "Discover" },
  { id: "policies",     label: "Policies",             icon: "📋", section: "Discover" },
  { id: "feedback",     label: "Feedback",             icon: "💬", section: "Support" },
  { id: "help",         label: "Help & FAQs",          icon: "❓", section: "Support" },
];

const Sidebar = ({ active, setActive }) => {
  const sections = [...new Set(NAV_ITEMS.map(i => i.section))];
  return (
    <div style={{
      width: 220, flexShrink: 0, background: C.cardBg,
      borderRight: `1px solid ${C.border}`, padding: "20px 12px",
      overflowY: "auto",
    }}>
      {sections.map(sec => (
        <div key={sec} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: C.textSm,
            textTransform: "uppercase", letterSpacing: ".08em", padding: "0 8px 6px" }}>
            {sec}
          </div>
          {NAV_ITEMS.filter(i => i.section === sec).map(item => {
            const isActive = active === item.id;
            return (
              <button key={item.id} onClick={() => setActive(item.id)} style={{
                display: "flex", alignItems: "center", gap: 10, width: "100%",
                padding: "8px 10px", borderRadius: 9, border: "none",
                cursor: "pointer", marginBottom: 2, fontSize: 13,
                fontWeight: isActive ? 600 : 400, textAlign: "left",
                background: isActive ? C.primaryLt : "transparent",
                color: isActive ? C.primary : C.textMd,
                transition: "all .15s",
              }}
                onMouseEnter={e => !isActive && (e.currentTarget.style.background = "#f8fafc")}
                onMouseLeave={e => !isActive && (e.currentTarget.style.background = "transparent")}
              >
                <span style={{ fontSize: 16, width: 20 }}>{item.icon}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && <Badge color={item.badgeColor} style={{ fontSize: 10, padding: "1px 7px" }}>{item.badge}</Badge>}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ icon, label, value, sub, color, onClick }) => (
  <Card onClick={onClick} style={{ padding: "20px 22px", cursor: "pointer", transition: "box-shadow .2s, transform .2s" }}
    onMouseEnter={e => { e.currentTarget.style.boxShadow = C.shadowMd; e.currentTarget.style.transform = "translateY(-2px)"; }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow = C.shadowSm; e.currentTarget.style.transform = "none"; }}
  >
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
      <div style={{
        width: 44, height: 44, borderRadius: 11,
        background: color + "22", display: "flex",
        alignItems: "center", justifyContent: "center", fontSize: 20,
      }}>{icon}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color: color }}>{value}</div>
    </div>
    <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{label}</div>
    <div style={{ fontSize: 12, color: C.textSm, marginTop: 3 }}>{sub}</div>
  </Card>
);

// ─── Proposal step trail ──────────────────────────────────────────────────────
const StepTrail = ({ currentStep }) => {
  const steps = ["Draft", "Submitted", "In Review", "Decision", "Active"];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {steps.map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : 0 }}>
            <div style={{
              width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 700,
              background: i < currentStep ? C.green : i === currentStep ? C.primary : "#e2e8f0",
              color: i <= currentStep ? "#fff" : C.textSm,
            }}>
              {i < currentStep ? "✓" : i + 1}
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 2, margin: "0 4px",
                background: i < currentStep ? C.green : "#e2e8f0" }} />
            )}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
        {steps.map((s, i) => (
          <span key={s} style={{
            fontSize: 9.5, fontWeight: i === currentStep ? 700 : 400,
            color: i < currentStep ? C.green : i === currentStep ? C.primary : C.textSm,
          }}>{s}</span>
        ))}
      </div>
    </div>
  );
};

// ─── Progress bar ─────────────────────────────────────────────────────────────
const ProgressBar = ({ pct, color = C.green }) => (
  <div>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textSm, marginBottom: 4 }}>
      <span>Progress</span><span style={{ fontWeight: 600, color }}>{pct}%</span>
    </div>
    <div style={{ height: 6, background: "#e2e8f0", borderRadius: 10, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 10,
        transition: "width 1s ease" }} />
    </div>
  </div>
);

// ─── Overview page ────────────────────────────────────────────────────────────
const OverviewPage = ({ setActive }) => {
  const proposals = [
    { id: "P-2025-09", icon: "📄", iconBg: C.primaryLt,
      title: "Genomic Biomarker Study – Phase II",
      meta: "Research Proposal · Submitted Jun 12, 2025",
      status: "Under Review", statusColor: "blue", step: 2 },
    { id: "G-2024-03", icon: "💰", iconBg: C.greenLt,
      title: "HEC NRPU Grant – Bioinformatics",
      meta: "Grant · Approved Mar 2024 · Ends Dec 2025",
      status: "Active", statusColor: "green", step: 4, progress: 68 },
    { id: "P-2025-05", icon: "📄", iconBg: C.amberLt,
      title: "Sustainable Drug Delivery Systems",
      meta: "Research Proposal · Submitted May 2, 2025",
      status: "Pending", statusColor: "amber", step: 1 },
  ];

  const patents = [
    { num: "P-2047", title: "Nano-encapsulation Drug Delivery", filed: "Jan 2025", status: "In Review", color: "blue" },
    { num: "P-1893", title: "CRISPR Biomarker Detection Kit",   filed: "Aug 2023", status: "Granted",   color: "green" },
    { num: "P-1745", title: "Microfluidic Analysis Platform",   filed: "Mar 2022", status: "Granted",   color: "green" },
  ];

  const publications = [
    { year: "2025", title: "CRISPR-based early detection of antibiotic-resistant pathogens", journal: "Nature Biotechnology", tier: "Q1", tColor: "purple" },
    { year: "2024", title: "Proteomics profiling of drug-resistant tuberculosis strains",     journal: "PLOS ONE",             tier: "Q2", tColor: "blue" },
    { year: "2024", title: "Microfluidic lab-on-chip for point-of-care diagnostics",          journal: "Lab on a Chip, RSC",   tier: "Q2", tColor: "blue" },
  ];

  const events = [
    { icon: "💰", iconBg: C.amberLt,   tag: "Funding Call", tagColor: "amber",  title: "HEC National Research Programme",            dead: "Deadline: Jul 8, 2025" },
    { icon: "📅", iconBg: C.primaryLt, tag: "Event",        tagColor: "blue",   title: "Innovation Expo 2025 – Abstract Submission", dead: "Deadline: Jun 30, 2025" },
    { icon: "🏅", iconBg: C.tealLt,    tag: "Workshop",     tagColor: "teal",   title: "IP & Patent Workshop",                       dead: "Aug 3, 2025 · On-campus" },
  ];

  const activity = [
    { dot: C.primary, text: "Your proposal Genomic Biomarker Study moved to In Review", time: "9 min ago" },
    { dot: C.green,   text: "NRPU Grant milestone payment of PKR 420,000 received",      time: "2 hrs ago" },
    { dot: C.amber,   text: "Patent P-2047 status updated — awaiting examiner report",   time: "Yesterday" },
    { dot: C.purple,  text: "New funding call: HEC NRPU 2025 batch published",           time: "2 days ago" },
  ];

  return (
    <div style={{ padding: "28px 32px", overflowY: "auto", flex: 1 }}>
      {/* Page title */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: 0 }}>My Research Dashboard</h1>
          <p style={{ fontSize: 13, color: C.textSm, margin: "4px 0 0" }}>Welcome back, Dr. Raza · FY 2024–25</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn variant="ghost" onClick={() => setActive("funding")}>📢 Funding calls</Btn>
          <Btn variant="primary">+ New Submission</Btn>
        </div>
      </div>

      {/* KPI stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
        <StatCard icon="📄" label="Proposals submitted" value="7"        sub="2 under review"  color={C.primary} onClick={() => setActive("proposals")} />
        <StatCard icon="📚" label="Publications"        value="14"       sub="3 this year"      color={C.green}   onClick={() => setActive("publications")} />
        <StatCard icon="🏅" label="Patents"             value="3"        sub="1 in progress"    color={C.amber}   onClick={() => setActive("patents")} />
        <StatCard icon="💰" label="Grants received"     value="PKR 4.2M" sub="1 active grant"  color={C.purple}  onClick={() => setActive("proposals")} />
      </div>

      {/* Row 1 */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Proposals */}
        <Card style={{ padding: "20px 22px" }}>
          <SectionHeader title="Proposals & Grants" sub="Track submissions and active grants"
            action={<Btn variant="sm">+ Submit new</Btn>} />

          {/* Step trail */}
          <div style={{ background: C.pageBg, borderRadius: 10, padding: "14px 16px", marginBottom: 16, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.textMd, marginBottom: 10 }}>
              Genomic Biomarker Study – Phase II
            </div>
            <StepTrail currentStep={2} />
          </div>

          {proposals.map(p => (
            <div key={p.id} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "11px 14px", borderRadius: 10,
              border: `1px solid ${C.border}`, marginBottom: 8,
              background: "#fafbfc", transition: "box-shadow .15s",
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = C.shadowMd}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
            >
              <div style={{
                width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                background: p.iconBg, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 16,
              }}>{p.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text,
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</div>
                <div style={{ fontSize: 11, color: C.textSm, marginTop: 2 }}>{p.meta}</div>
                {p.progress && <div style={{ marginTop: 7 }}><ProgressBar pct={p.progress} /></div>}
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
                <Badge color={p.statusColor}>{p.status}</Badge>
                <Btn variant="ghost" style={{ fontSize: 11, padding: "3px 10px" }}>View →</Btn>
              </div>
            </div>
          ))}
        </Card>

        {/* Right col */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Patents */}
          <Card style={{ padding: "20px 22px" }}>
            <SectionHeader title="Patents & IP" action={<Btn variant="sm">+ File patent</Btn>} />
            {patents.map((p, i) => (
              <div key={p.num} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "9px 0",
                borderBottom: i < patents.length - 1 ? `1px solid ${C.border}` : "none",
              }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                  background: C.amberLt, display: "flex",
                  alignItems: "center", justifyContent: "center", fontSize: 14,
                }}>🏅</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: C.text,
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: C.textSm }}>{p.num} · Filed {p.filed}</div>
                </div>
                <Badge color={p.color}>{p.status}</Badge>
              </div>
            ))}
          </Card>

          {/* Startup */}
          <Card style={{ padding: "20px 22px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 11,
                background: C.tealLt, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 22 }}>🚀</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Startup Incubation</div>
                <Badge color="red" style={{ marginTop: 3 }}>Deadline: Jul 31</Badge>
              </div>
            </div>
            <p style={{ fontSize: 12.5, color: C.textMd, lineHeight: 1.7, margin: "0 0 14px" }}>
              Applications for the 2025 MUET incubation cohort are open. Turn your research into a funded venture.
            </p>
            <Btn variant="primary" style={{ width: "100%", justifyContent: "center" }}>🚀 Apply now</Btn>
          </Card>
        </div>
      </div>

      {/* Row 2 */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Publications */}
        <Card style={{ padding: "20px 22px" }}>
          <SectionHeader title="My Publications" sub="14 total · 3 this year"
            action={<Btn variant="sm">+ Add publication</Btn>} />
          {publications.map((p, i) => (
            <div key={i} style={{
              display: "flex", gap: 14, padding: "11px 0",
              borderBottom: i < publications.length - 1 ? `1px solid ${C.border}` : "none",
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 9, flexShrink: 0,
                background: C.primaryLt, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 12, fontWeight: 800, color: C.primary,
              }}>{p.year}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text, lineHeight: 1.4 }}>{p.title}</div>
                <div style={{ fontSize: 11.5, color: C.textSm, marginTop: 3 }}>{p.journal}</div>
                <div style={{ display: "flex", gap: 6, marginTop: 7, alignItems: "center" }}>
                  <Badge color={p.tColor}>{p.tier} Journal</Badge>
                  <button style={{ fontSize: 11, padding: "2px 8px", borderRadius: 6,
                    border: `1px solid ${C.border}`, background: "transparent",
                    color: C.textMd, cursor: "pointer" }}>↗ View</button>
                  <button style={{ fontSize: 11, padding: "2px 8px", borderRadius: 6,
                    border: `1px solid ${C.border}`, background: "transparent",
                    color: C.textMd, cursor: "pointer" }}>✎ Edit</button>
                </div>
              </div>
            </div>
          ))}
          <div style={{ textAlign: "center", marginTop: 14 }}>
            <Btn variant="ghost" onClick={() => setActive("publications")}>View all 14 publications →</Btn>
          </div>
        </Card>

        {/* Right col */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Funding & events */}
          <Card style={{ padding: "20px 22px" }}>
            <SectionHeader title="Funding Calls & Events"
              action={<Badge color="red">2 deadlines soon</Badge>} />
            {events.map((e, i) => (
              <div key={i} style={{
                display: "flex", gap: 12, padding: "9px 0",
                borderBottom: i < events.length - 1 ? `1px solid ${C.border}` : "none",
              }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                  background: e.iconBg, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 16 }}>{e.icon}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{e.title}</div>
                  <div style={{ fontSize: 11, color: C.textSm, margin: "2px 0 5px" }}>{e.dead}</div>
                  <Badge color={e.tagColor}>{e.tag}</Badge>
                </div>
              </div>
            ))}
          </Card>

          {/* Activity */}
          <Card style={{ padding: "20px 22px" }}>
            <SectionHeader title="Recent Activity" />
            {activity.map((a, i) => (
              <div key={i} style={{
                display: "flex", gap: 10, padding: "8px 0",
                borderBottom: i < activity.length - 1 ? `1px solid ${C.border}` : "none",
                alignItems: "flex-start",
              }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%",
                  background: a.dot, marginTop: 5, flexShrink: 0 }} />
                <div style={{ flex: 1, fontSize: 12.5, color: C.textMd, lineHeight: 1.5 }}>{a.text}</div>
                <div style={{ fontSize: 11, color: C.textSm, flexShrink: 0, whiteSpace: "nowrap" }}>{a.time}</div>
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* Feedback */}
      <Card style={{ padding: "22px 26px" }}>
        <SectionHeader title="Submit Feedback" sub="Help ORIC improve research support services" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: C.text, marginBottom: 10 }}>
              How satisfied are you with ORIC support?
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {[1,2,3,4,5].map(s => (
                <button key={s} style={{
                  width: 40, height: 40, borderRadius: 10, border: `1.5px solid ${C.border}`,
                  background: "#f8fafc", cursor: "pointer", fontSize: 18, display: "flex",
                  alignItems: "center", justifyContent: "center", transition: "all .15s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = C.amberLt; e.currentTarget.style.borderColor = C.amber; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.borderColor = C.border; }}
                  aria-label={`${s} star`}
                >⭐</button>
              ))}
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 8 }}>Category</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Proposal Process", "Grant Support", "Patent Guidance", "Events", "General"].map(c => (
                <button key={c} style={{
                  padding: "5px 12px", borderRadius: 20, border: `1px solid ${C.border}`,
                  background: "#f8fafc", fontSize: 12, color: C.textMd, cursor: "pointer",
                  transition: "all .15s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = C.primaryLt; e.currentTarget.style.color = C.primary; e.currentTarget.style.borderColor = C.primary; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.color = C.textMd; e.currentTarget.style.borderColor = C.border; }}
                >{c}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: C.text, marginBottom: 8 }}>
              Comments or suggestions
            </div>
            <textarea rows={4} placeholder="Share your experience with ORIC services..."
              style={{
                width: "100%", padding: "10px 13px", borderRadius: 10, fontSize: 13,
                border: `1.5px solid ${C.border}`, color: C.text, resize: "none",
                fontFamily: "inherit", outline: "none", background: "#fafbfc",
                transition: "border .15s", boxSizing: "border-box", marginBottom: 12,
              }}
              onFocus={e => e.target.style.borderColor = C.primary}
              onBlur={e => e.target.style.borderColor = C.border}
            />
            <Btn variant="primary" style={{ width: "100%", justifyContent: "center" }}>
              📤 Submit Feedback
            </Btn>
          </div>
        </div>
      </Card>
    </div>
  );
};

// ─── Placeholder pages ────────────────────────────────────────────────────────
const PAGE_META = {
  proposals:    { icon: "📄", title: "Proposals & Grants",      desc: "Submit new research proposals, track approval status, and manage your active grants." },
  publications: { icon: "📚", title: "My Publications",          desc: "Log your published papers, conference proceedings, and book chapters for ORIC records." },
  patents:      { icon: "🏅", title: "Patents & IP",             desc: "Track your patent filings, IP ownership workflows, and commercialization status." },
  startup:      { icon: "🚀", title: "Startup Application",      desc: "Apply to join the MUET startup incubation cohort. Deadline: July 31, 2025.", cta: "Apply Now" },
  funding:      { icon: "📢", title: "Funding Calls",            desc: "Browse all active HEC and international funding calls. 2 deadlines this month." },
  events:       { icon: "📅", title: "Events & Workshops",       desc: "Register for upcoming ORIC-organized events, workshops, and seminars." },
  policies:     { icon: "📋", title: "Policies & Guidelines",    desc: "Read MUET ORIC's official research policies, IP guidelines, and grant compliance docs." },
  feedback:     { icon: "💬", title: "Submit Feedback",          desc: "Share your experience with ORIC services to help improve researcher support." },
  help:         { icon: "❓", title: "Help & FAQs",              desc: "Browse answers to common questions about proposals, patents, and the portal." },
};

const PlaceholderPage = ({ id }) => {
  const m = PAGE_META[id] || { icon: "📄", title: id, desc: "Coming soon." };
  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 40 }}>
      <div style={{ width: 80, height: 80, borderRadius: 20, background: C.primaryLt,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>{m.icon}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: C.text }}>{m.title}</div>
      <div style={{ fontSize: 14, color: C.textMd, textAlign: "center", maxWidth: 400, lineHeight: 1.7 }}>{m.desc}</div>
      {m.cta && <Btn variant="primary">{m.cta}</Btn>}
    </div>
  );
};

// ─── Login page ───────────────────────────────────────────────────────────────
const LoginPage = ({ onLogin }) => {
  const [tab, setTab] = useState("existing");
  const [focus, setFocus] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inp = (field) => ({
    width: "100%", padding: "12px 15px", borderRadius: 10, fontSize: 14,
    border: `1.5px solid ${focus === field ? C.primary : C.border}`,
    outline: "none", color: C.text, background: "#fafbfc",
    fontFamily: "inherit", transition: "border .15s", boxSizing: "border-box",
  });

  return (
    <div style={{ minHeight: "100vh", background: C.headerBg,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 24,
        padding: "40px 44px", width: 460,
        border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(16px)" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 66, height: 66, borderRadius: 16, background: "#fff",
            display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: C.primary, lineHeight: 1.2, textAlign: "center" }}>
              ORIC<br/>MUET
            </span>
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>MUET ORIC Portal</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginTop: 5 }}>
            Office of Research, Innovation & Commercialization
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr",
          background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: 4, marginBottom: 26 }}>
          {[["existing","Existing User"],["new","New User"]].map(([t, lbl]) => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "10px", borderRadius: 9, border: "none", cursor: "pointer",
              fontSize: 14, fontWeight: 700, transition: "all .2s",
              background: tab === t ? C.green : "transparent",
              color: tab === t ? "#fff" : "rgba(255,255,255,0.7)",
            }}>{lbl}</button>
          ))}
        </div>

        <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", textAlign: "center", marginBottom: 20 }}>
          {tab === "existing" ? "Login" : "Register"}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {tab === "new" && (
            <>
              <input placeholder="Full Name" style={inp("name")}
                onFocus={() => setFocus("name")} onBlur={() => setFocus(null)} />
              <input placeholder="Department / Faculty" style={inp("dept")}
                onFocus={() => setFocus("dept")} onBlur={() => setFocus(null)} />
            </>
          )}
          <input placeholder="University Email" value={email}
            onChange={e => setEmail(e.target.value)} style={inp("email")}
            onFocus={() => setFocus("email")} onBlur={() => setFocus(null)} />
          <input type="password" placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)} style={inp("pass")}
            onFocus={() => setFocus("pass")} onBlur={() => setFocus(null)} />

          <button onClick={onLogin} style={{
            width: "100%", padding: "13px", borderRadius: 11,
            background: C.green, color: "#fff", fontSize: 15, fontWeight: 700,
            border: "none", cursor: "pointer", marginTop: 6, transition: "background .2s",
          }}
            onMouseEnter={e => e.target.style.background = C.greenDk}
            onMouseLeave={e => e.target.style.background = C.green}
          >
            {tab === "existing" ? "Login" : "Create Account"}
          </button>

          <div style={{ textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.65)",
            cursor: "pointer", marginTop: 4 }}>
            {tab === "existing" ? "Forgot password?" : "Already have an account? Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Root app ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("login");
  const [active, setActive] = useState("overview");

  if (screen === "login") {
    return (
      <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
        <LoginPage onLogin={() => setScreen("dashboard")} />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh",
      background: C.pageBg, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Header onLogout={() => setScreen("login")} />
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar active={active} setActive={setActive} />
        {active === "overview"
          ? <OverviewPage setActive={setActive} />
          : <PlaceholderPage id={active} />
        }
      </div>
    </div>
  );
}
