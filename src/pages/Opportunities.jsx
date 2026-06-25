import { useState } from "react";

const OPPS = [
  { type: "sch", title: "HEC Need-Based Scholarship", org: "Higher Education Commission", deadline: "Aug 15, 2026", amount: "PKR 80,000/year" },
  { type: "sch", title: "MUET Merit Award", org: "MUET Scholarship Office", deadline: "Jul 30, 2026", amount: "PKR 50,000" },
  { type: "sch", title: "OGDCL Technical Scholarship", org: "OGDCL Foundation", deadline: "Sep 1, 2026", amount: "PKR 120,000/year" },
  { type: "int", title: "Software Engineering Intern", org: "Systems Ltd", deadline: "Jul 10, 2026", amount: "PKR 25,000/mo" },
  { type: "int", title: "Data Analyst Intern", org: "Telenor Pakistan", deadline: "Jul 20, 2026", amount: "PKR 30,000/mo" },
  { type: "int", title: "Civil Engineering Intern", org: "NESPAK", deadline: "Aug 5, 2026", amount: "PKR 20,000/mo" },
  { type: "res", title: "Climate Resilience Research Grant", org: "PERN / HEC", deadline: "Sep 15, 2026", amount: "PKR 500,000" },
  { type: "res", title: "AI & Robotics Mini-Grant", org: "MUET ORIC", deadline: "Aug 20, 2026", amount: "PKR 200,000" },
  { type: "res", title: "Renewable Energy Seed Fund", org: "AEDB", deadline: "Oct 1, 2026", amount: "PKR 750,000" },
];

const TYPE_LABEL = { sch: "Scholarship", int: "Internship", res: "Research grant" };
const TYPE_COLOR = {
  sch: { bg: "#E6F1FB", color: "#0C447C" },
  int: { bg: "#E1F5EE", color: "#085041" },
  res: { bg: "#FAEEDA", color: "#633806" },
};

export default function Opportunities() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? OPPS : OPPS.filter((o) => o.type === filter);

  const stats = [
    { label: "Scholarships", count: OPPS.filter((o) => o.type === "sch").length },
    { label: "Internships", count: OPPS.filter((o) => o.type === "int").length },
    { label: "Research grants", count: OPPS.filter((o) => o.type === "res").length },
  ];

  const filters = [
    { key: "all", label: "All" },
    { key: "sch", label: "Scholarships" },
    { key: "int", label: "Internships" },
    { key: "res", label: "Research grants" },
  ];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ background: "#fff", borderRadius: 10, border: "0.5px solid #e5e7eb", padding: "14px 16px" }}>
            <div style={{ fontSize: 24, fontWeight: 500, color: "#0d5fa0" }}>{s.count}</div>
            <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {filters.map((f) => (
          <button
            key={f.key}
            style={{
              padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
              background: filter === f.key ? "#0d5fa0" : "#fff",
              color: filter === f.key ? "#fff" : "#555",
              border: filter === f.key ? "0.5px solid #0d5fa0" : "0.5px solid #d0d0d0",
            }}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
        {filtered.map((opp, i) => (
          <div key={i} style={{ background: "#fff", border: "0.5px solid #e5e7eb", borderRadius: 10, padding: 16 }}>
            <span style={{ display: "inline-block", fontSize: 10, fontWeight: 500, padding: "3px 8px", borderRadius: 6, marginBottom: 8, background: TYPE_COLOR[opp.type].bg, color: TYPE_COLOR[opp.type].color }}>
              {TYPE_LABEL[opp.type]}
            </span>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#1a1a1a", marginBottom: 4 }}>{opp.title}</div>
            <div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>{opp.org}</div>
            <div style={{ fontSize: 12, color: "#0d5fa0", fontWeight: 500, marginBottom: 6 }}>{opp.amount}</div>
            <div style={{ fontSize: 11, color: "#aaa" }}>
              <i className="ti ti-calendar" style={{ fontSize: 12, verticalAlign: -1, marginRight: 3 }} />
              Deadline: {opp.deadline}
            </div>
            <button style={{ marginTop: 12, width: "100%", padding: "8px 0", fontSize: 12, borderRadius: 7, background: "#0d5fa0", color: "#fff", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
              Apply now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}