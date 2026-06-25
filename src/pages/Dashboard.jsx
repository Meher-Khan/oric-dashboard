import { useState } from "react";

// ─── Theme ────────────────────────────────────────────────────────────────────
const C = {
  headerBg:  "#1a5fa8",
  pageBg:    "#f0f4f8",
  cardBg:    "#ffffff",
  border:    "#e2e8f0",
  shadowSm:  "0 1px 3px rgba(0,0,0,0.08)",
  shadowMd:  "0 4px 16px rgba(0,0,0,0.10)",
  primary:   "#1a5fa8",
  primaryDk: "#134a87",
  primaryLt: "#e8f0fb",
  green:     "#18c87a",
  greenDk:   "#13a864",
  greenLt:   "#e6faf3",
  teal:      "#0891b2",
  tealLt:    "#e0f7fa",
  amber:     "#d97706",
  amberLt:   "#fef3c7",
  red:       "#dc2626",
  redLt:     "#fee2e2",
  purple:    "#7c3aed",
  purpleLt:  "#ede9fe",
  text:      "#1e293b",
  textMd:    "#475569",
  textSm:    "#94a3b8",
};

// ─── Micro-components ─────────────────────────────────────────────────────────
const Badge = ({ children, color = "blue", style: s = {} }) => {
  const map = {
    blue:   [C.primaryLt, C.primary],
    green:  [C.greenLt,   "#166534"],
    teal:   [C.tealLt,    C.teal],
    amber:  [C.amberLt,   C.amber],
    red:    [C.redLt,     C.red],
    purple: [C.purpleLt,  C.purple],
    gray:   ["#f1f5f9",   C.textMd],
  };
  const [bg, clr] = map[color] || map.blue;
  return (
    <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px",
      borderRadius: 20, background: bg, color: clr, ...s }}>{children}</span>
  );
};

const Btn = ({ children, variant = "outline", onClick, full, style: s = {} }) => {
  const [hov, setHov] = useState(false);
  const v = {
    primary: { bg: hov ? C.primaryDk : C.primary,    color: "#fff",     border: "none",                       pad: "9px 18px",  fw: 700, fs: 13.5 },
    green:   { bg: hov ? C.greenDk   : C.green,      color: "#fff",     border: "none",                       pad: "9px 18px",  fw: 700, fs: 13.5 },
    outline: { bg: hov ? C.primaryLt : "#fff",        color: C.primary,  border: `1.5px solid ${C.primary}`,  pad: "7px 14px",  fw: 600, fs: 12.5 },
    ghost:   { bg: hov ? "#f1f5f9"   : "transparent", color: C.textMd,   border: `1px solid ${C.border}`,     pad: "7px 14px",  fw: 500, fs: 12.5 },
    sm:      { bg: hov ? C.primaryDk : C.primary,    color: "#fff",     border: "none",                       pad: "6px 13px",  fw: 600, fs: 12   },
    danger:  { bg: hov ? "#b91c1c"   : C.red,        color: "#fff",     border: "none",                       pad: "7px 14px",  fw: 600, fs: 12   },
    dangerSm:{ bg: hov ? "#b91c1c"   : C.redLt,      color: C.red,      border: `1px solid ${C.red}`,         pad: "5px 11px",  fw: 600, fs: 11.5 },
  }[variant] || {};
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "inline-flex", alignItems: "center", gap: 6, borderRadius: 9,
        cursor: "pointer", transition: "all .15s", fontFamily: "inherit",
        background: v.bg, color: v.color, border: v.border || "none",
        padding: v.pad, fontWeight: v.fw, fontSize: v.fs,
        width: full ? "100%" : undefined,
        justifyContent: full ? "center" : undefined, ...s }}
    >{children}</button>
  );
};

const Card = ({ children, style: s = {} }) => (
  <div style={{ background: C.cardBg, border: `1px solid ${C.border}`,
    borderRadius: 14, boxShadow: C.shadowSm, ...s }}>{children}</div>
);

const Input = ({ label, type = "text", placeholder, value, onChange }) => {
  const [foc, setFoc] = useState(false);
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <div style={{ fontSize: 12.5, fontWeight: 600, color: C.textMd, marginBottom: 5 }}>{label}</div>}
      <input type={type} placeholder={placeholder} value={value} onChange={onChange}
        onFocus={() => setFoc(true)} onBlur={() => setFoc(false)}
        style={{ width: "100%", padding: "10px 13px", borderRadius: 9, fontSize: 13,
          border: `1.5px solid ${foc ? C.primary : C.border}`, outline: "none",
          color: C.text, background: "#fafbfc", fontFamily: "inherit",
          transition: "border .15s", boxSizing: "border-box" }}
      />
    </div>
  );
};

const ProgressBar = ({ pct, color = C.green }) => (
  <div>
    <div style={{ display: "flex", justifyContent: "space-between",
      fontSize: 11, color: C.textSm, marginBottom: 4 }}>
      <span>Progress</span><span style={{ fontWeight: 700, color }}>{pct}%</span>
    </div>
    <div style={{ height: 6, background: "#e2e8f0", borderRadius: 10, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 10 }} />
    </div>
  </div>
);

const StepTrail = ({ current }) => {
  const steps = ["Draft", "Submitted", "In Review", "Decision", "Active"];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {steps.map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : 0 }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 700,
              background: i < current ? C.green : i === current ? C.primary : "#e2e8f0",
              color: i <= current ? "#fff" : C.textSm,
            }}>{i < current ? "✓" : i + 1}</div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 2, margin: "0 4px",
                background: i < current ? C.green : "#e2e8f0" }} />
            )}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
        {steps.map((s, i) => (
          <span key={s} style={{ fontSize: 9.5, fontWeight: i === current ? 700 : 400,
            color: i < current ? C.green : i === current ? C.primary : C.textSm }}>{s}</span>
        ))}
      </div>
    </div>
  );
};

// ─── Nav config (admin gets extra section) ────────────────────────────────────
const getNav = (role) => {
  const base = [
    { section: "Dashboard", items: [
      { id: "overview",     icon: "⊞",  label: "Overview" },
      { id: "proposals",    icon: "📄", label: "Proposals & Grants", badge: "2", bc: "amber" },
      { id: "publications", icon: "📚", label: "Publications" },
      { id: "patents",      icon: "🏅", label: "Patents & IP" },
      { id: "startup",      icon: "🚀", label: "Startup Application" },
    ]},
    { section: "Discover", items: [
      { id: "funding",  icon: "📢", label: "Funding Calls", badge: "2", bc: "red" },
      { id: "events",   icon: "📅", label: "Events" },
      { id: "policies", icon: "📋", label: "Policies" },
    ]},
    { section: "Account", items: [
      { id: "feedback", icon: "💬", label: "Submit Feedback" },
      { id: "settings", icon: "⚙️",  label: "Settings" },
    ]},
  ];

  if (role === "Admin") {
    base.splice(1, 0, {
      section: "Administration",
      items: [
        { id: "users", icon: "👥", label: "Manage Users & Roles", badge: "Admin", bc: "purple" },
      ],
    });
  }
  return base;
};

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const Sidebar = ({ active, setActive, user, email }) => {
  const initials = user?.name?.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase() || "??";
  const roleColor = { Student: C.teal, Faculty: C.green, Admin: C.purple }[user?.role] || C.primary;
  const nav = getNav(user?.role);

  return (
    <div style={{ width: 228, flexShrink: 0, background: C.cardBg,
      borderRight: `1px solid ${C.border}`, display: "flex",
      flexDirection: "column", minHeight: 0, overflowY: "auto" }}>

      {/* User card */}
      <div style={{ padding: "18px 16px 14px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: roleColor,
            color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 700, flexShrink: 0 }}>{initials}</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text,
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user?.name || "User"}
            </div>
            <div style={{ marginTop: 3 }}>
              <Badge color={user?.role === "Student" ? "teal" : user?.role === "Admin" ? "purple" : "green"}>
                {user?.role}
              </Badge>
            </div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: C.textSm, marginTop: 8,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{email}</div>
      </div>

      {/* Nav groups */}
      <div style={{ flex: 1, padding: "12px 10px" }}>
        {nav.map(group => (
          <div key={group.section} style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: C.textSm,
              textTransform: "uppercase", letterSpacing: ".08em", padding: "0 8px 6px" }}>
              {group.section}
            </div>
            {group.items.map(item => {
              const isActive = active === item.id;
              const isAdminItem = item.id === "users";
              return (
                <button key={item.id} onClick={() => setActive(item.id)} style={{
                  display: "flex", alignItems: "center", gap: 9, width: "100%",
                  padding: "8px 10px", borderRadius: 9, border: "none", cursor: "pointer",
                  marginBottom: 2, fontSize: 13, fontWeight: isActive ? 700 : 400,
                  background: isActive
                    ? (isAdminItem ? C.purpleLt : C.primaryLt)
                    : "transparent",
                  color: isActive
                    ? (isAdminItem ? C.purple : C.primary)
                    : C.textMd,
                  textAlign: "left", transition: "all .15s", fontFamily: "inherit",
                }}
                  onMouseEnter={e => !isActive && (e.currentTarget.style.background = "#f8fafc")}
                  onMouseLeave={e => !isActive && (e.currentTarget.style.background = "transparent")}
                >
                  <span style={{ fontSize: 16, width: 20 }}>{item.icon}</span>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.badge && (
                    <Badge color={item.bc} style={{ fontSize: 10, padding: "1px 7px" }}>
                      {item.badge}
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Header ───────────────────────────────────────────────────────────────────
const Header = ({ user, onLogout }) => {
  const initials = user?.name?.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase() || "??";
  return (
    <div style={{ background: C.headerBg, color: "#fff", padding: "0 28px",
      height: 64, display: "flex", alignItems: "center",
      justifyContent: "space-between", boxShadow: "0 2px 8px rgba(26,95,168,0.3)",
      flexShrink: 0, zIndex: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 42, height: 42, borderRadius: 10, background: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 10.5, fontWeight: 800, color: C.primary,
            lineHeight: 1.2, textAlign: "center" }}>ORIC<br/>MUET</span>
        </div>
        <div>
          <div style={{ fontSize: 17, fontWeight: 800 }}>MUET ORIC Portal</div>
          <div style={{ fontSize: 12, opacity: .8 }}>
            {user?.role === "Admin" ? "Admin Dashboard" :
             user?.role === "Student" ? "Student Dashboard" : "Researcher Dashboard"}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ position: "relative", cursor: "pointer" }}>
          <span style={{ fontSize: 20 }}>🔔</span>
          <span style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16,
            background: C.red, borderRadius: "50%", fontSize: 9, fontWeight: 700,
            color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
            border: "2px solid #1a5fa8" }}>3</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: C.green,
            color: "#fff", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 14, fontWeight: 700 }}>{initials}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{user?.name}</div>
            <div style={{ fontSize: 11, opacity: .8 }}>{user?.role}</div>
          </div>
        </div>
        <button onClick={onLogout} style={{ padding: "7px 18px", borderRadius: 8,
          border: "1.5px solid rgba(255,255,255,0.5)", background: "transparent",
          color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer",
          fontFamily: "inherit", transition: "background .15s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >Logout</button>
      </div>
    </div>
  );
};

// ─── Manage Users Page (Admin only) ──────────────────────────────────────────
const ROLE_COLORS = { Admin: "purple", Faculty: "green", Student: "teal" };

const ManageUsersPage = ({ db, currentEmail, onDeleteUser, onChangeRole }) => {
  const [search,     setSearch]     = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [confirmDel, setConfirmDel] = useState(null); // email to delete
  const [toast,      setToast]      = useState(null); // { msg, type }

  const showToast = (msg, type = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const allUsers = Object.entries(db).map(([email, data]) => ({ email, ...data }));
  const filtered = allUsers.filter(u => {
    const matchSearch = u.name?.toLowerCase().includes(search.toLowerCase()) ||
                        u.email?.toLowerCase().includes(search.toLowerCase());
    const matchRole   = filterRole === "All" || u.role === filterRole;
    return matchSearch && matchRole;
  });

  const roleCounts = { All: allUsers.length };
  allUsers.forEach(u => { roleCounts[u.role] = (roleCounts[u.role] || 0) + 1; });

  function handleDelete(email) {
    onDeleteUser(email);
    setConfirmDel(null);
    showToast(`User "${db[email]?.name}" has been removed.`, "ok");
  }

  function handleRoleChange(email, newRole) {
    onChangeRole(email, newRole);
    showToast(`Role updated to "${newRole}" for ${db[email]?.name}.`, "ok");
  }

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "26px 30px", position: "relative" }}>

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", top: 24, right: 28, zIndex: 999,
          background: toast.type === "ok" ? "#166534" : C.red,
          color: "#fff", padding: "12px 20px", borderRadius: 11,
          fontSize: 13.5, fontWeight: 600, boxShadow: C.shadowMd,
          display: "flex", alignItems: "center", gap: 8 }}>
          {toast.type === "ok" ? "✅" : "⚠️"} {toast.msg}
        </div>
      )}

      {/* Delete confirm modal */}
      {confirmDel && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
          zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: C.cardBg, borderRadius: 16, padding: "32px 36px",
            maxWidth: 420, width: "90%", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.redLt,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 26, margin: "0 auto 16px" }}>🗑️</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: C.text,
              textAlign: "center", marginBottom: 8 }}>Delete this account?</div>
            <div style={{ fontSize: 13.5, color: C.textMd, textAlign: "center",
              lineHeight: 1.7, marginBottom: 6 }}>
              You are about to permanently delete the account of
            </div>
            <div style={{ textAlign: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: C.text }}>
                {db[confirmDel]?.name}
              </span>
            </div>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <span style={{ fontSize: 13, color: C.textSm }}>{confirmDel}</span>
            </div>
            <div style={{ background: C.redLt, border: `1px solid #fecaca`,
              borderRadius: 9, padding: "10px 14px", marginBottom: 22,
              fontSize: 12.5, color: C.red, lineHeight: 1.6 }}>
              ⚠️ This action cannot be undone. The user will lose all access to the ORIC portal.
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Btn variant="ghost" full onClick={() => setConfirmDel(null)}>Cancel</Btn>
              <Btn variant="danger" full onClick={() => handleDelete(confirmDel)}>
                🗑️ Yes, delete account
              </Btn>
            </div>
          </div>
        </div>
      )}

      {/* Page header */}
      <div style={{ display: "flex", alignItems: "flex-start",
        justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: C.text }}>
            Manage Users & Roles
          </h1>
          <p style={{ margin: 0, fontSize: 13, color: C.textSm }}>
            View, manage roles, and remove user accounts · Admin access only
          </p>
        </div>
        {/* Summary pills */}
        <div style={{ display: "flex", gap: 8 }}>
          {["All","Admin","Faculty","Student"].map(r => (
            <div key={r} style={{ textAlign: "center", padding: "8px 16px",
              borderRadius: 10, background: filterRole === r ? C.primaryLt : "#f1f5f9",
              border: `1.5px solid ${filterRole === r ? C.primary : C.border}`,
              cursor: "pointer", transition: "all .15s" }}
              onClick={() => setFilterRole(r)}>
              <div style={{ fontSize: 18, fontWeight: 800,
                color: filterRole === r ? C.primary : C.text }}>
                {roleCounts[r] || 0}
              </div>
              <div style={{ fontSize: 10.5, fontWeight: 600,
                color: filterRole === r ? C.primary : C.textSm }}>{r}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Search + filter bar */}
      <div style={{ display: "flex", gap: 12, marginBottom: 18, alignItems: "center" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <span style={{ position: "absolute", left: 13, top: "50%",
            transform: "translateY(-50%)", fontSize: 16, color: C.textSm }}>🔍</span>
          <input
            placeholder="Search by name or email..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: "100%", padding: "10px 13px 10px 38px", borderRadius: 10,
              border: `1.5px solid ${C.border}`, fontSize: 13, color: C.text,
              background: C.cardBg, outline: "none", fontFamily: "inherit",
              boxSizing: "border-box", transition: "border .15s" }}
            onFocus={e => e.target.style.borderColor = C.primary}
            onBlur={e => e.target.style.borderColor = C.border}
          />
        </div>
        <div style={{ fontSize: 13, color: C.textSm, fontWeight: 500, whiteSpace: "nowrap" }}>
          Showing <strong style={{ color: C.text }}>{filtered.length}</strong> of {allUsers.length} users
        </div>
      </div>

      {/* Users table */}
      <Card style={{ overflow: "hidden" }}>
        {/* Table header */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 2.2fr 1.1fr 1fr 1.2fr",
          padding: "12px 20px", background: "#f8fafc",
          borderBottom: `1px solid ${C.border}` }}>
          {["Name", "Email", "Role", "Status", "Actions"].map(h => (
            <div key={h} style={{ fontSize: 11.5, fontWeight: 700, color: C.textSm,
              textTransform: "uppercase", letterSpacing: ".06em" }}>{h}</div>
          ))}
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", color: C.textSm, fontSize: 14 }}>
            😕 No users found matching your search.
          </div>
        ) : (
          filtered.map((u, i) => {
            const isSelf    = u.email === currentEmail;
            const initials  = u.name?.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase() || "??";
            const avColor   = { Admin: C.purple, Faculty: C.green, Student: C.teal }[u.role] || C.primary;
            return (
              <div key={u.email}
                style={{ display: "grid", gridTemplateColumns: "2fr 2.2fr 1.1fr 1fr 1.2fr",
                  padding: "14px 20px", alignItems: "center",
                  borderBottom: i < filtered.length - 1 ? `1px solid ${C.border}` : "none",
                  background: isSelf ? "#fafbff" : "transparent",
                  transition: "background .15s" }}
                onMouseEnter={e => !isSelf && (e.currentTarget.style.background = "#f8fafc")}
                onMouseLeave={e => !isSelf && (e.currentTarget.style.background = "transparent")}
              >
                {/* Name */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%",
                    background: avColor, color: "#fff", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{initials}</div>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: C.text }}>
                      {u.name}
                      {isSelf && <span style={{ fontSize: 10.5, fontWeight: 600,
                        color: C.primary, marginLeft: 7,
                        background: C.primaryLt, padding: "1px 7px",
                        borderRadius: 20 }}>You</span>}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div style={{ fontSize: 13, color: C.textMd,
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  paddingRight: 12 }}>{u.email}</div>

                {/* Role dropdown */}
                <div>
                  <select
                    value={u.role}
                    disabled={isSelf}
                    onChange={e => handleRoleChange(u.email, e.target.value)}
                    style={{ padding: "5px 10px", borderRadius: 8, fontSize: 12.5,
                      fontWeight: 600, border: `1.5px solid ${C.border}`,
                      background: isSelf ? "#f1f5f9" : C.cardBg,
                      color: avColor, cursor: isSelf ? "not-allowed" : "pointer",
                      fontFamily: "inherit", outline: "none" }}
                  >
                    <option value="Student">Student</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <Badge color="green">Active</Badge>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                  {isSelf ? (
                    <span style={{ fontSize: 11.5, color: C.textSm,
                      fontStyle: "italic" }}>Your account</span>
                  ) : (
                    <>
                      <button
                        title="View profile"
                        style={{ width: 32, height: 32, borderRadius: 8,
                          border: `1px solid ${C.border}`, background: "#f8fafc",
                          cursor: "pointer", fontSize: 15, display: "flex",
                          alignItems: "center", justifyContent: "center",
                          transition: "all .15s" }}
                        onMouseEnter={e => { e.currentTarget.style.background = C.primaryLt; e.currentTarget.style.borderColor = C.primary; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.borderColor = C.border; }}
                      >👁️</button>
                      <button
                        title="Delete account"
                        onClick={() => setConfirmDel(u.email)}
                        style={{ width: 32, height: 32, borderRadius: 8,
                          border: `1px solid ${C.border}`, background: "#f8fafc",
                          cursor: "pointer", fontSize: 15, display: "flex",
                          alignItems: "center", justifyContent: "center",
                          transition: "all .15s" }}
                        onMouseEnter={e => { e.currentTarget.style.background = C.redLt; e.currentTarget.style.borderColor = C.red; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.borderColor = C.border; }}
                      >🗑️</button>
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </Card>

      {/* Footer note */}
      <div style={{ marginTop: 14, fontSize: 12, color: C.textSm,
        display: "flex", alignItems: "center", gap: 6 }}>
        🔒 Role changes and deletions take effect immediately. Your own account cannot be deleted or downgraded here.
      </div>
    </div>
  );
};

// ─── Overview page ────────────────────────────────────────────────────────────
const OverviewPage = ({ user, setActive }) => {
  const isStudent = user?.role === "Student";
  const isAdmin   = user?.role === "Admin";

  const proposals = [
    { icon: "📄", iconBg: C.primaryLt, title: "Genomic Biomarker Study – Phase II",
      meta: "Research Proposal · Submitted Jun 12, 2025", status: "Under Review", sc: "blue", step: 2 },
    { icon: "💰", iconBg: C.greenLt,   title: "HEC NRPU Grant – Bioinformatics",
      meta: "Grant · Approved Mar 2024 · Ends Dec 2025",   status: "Active",       sc: "green", step: 4, progress: 68 },
    { icon: "📄", iconBg: C.amberLt,   title: "Sustainable Drug Delivery Systems",
      meta: "Research Proposal · Submitted May 2, 2025",   status: "Pending",      sc: "amber", step: 1 },
  ];

  const patents = [
    { num: "P-2047", title: "Nano-encapsulation Drug Delivery", filed: "Jan 2025", status: "In Review", sc: "blue" },
    { num: "P-1893", title: "CRISPR Biomarker Detection Kit",   filed: "Aug 2023", status: "Granted",   sc: "green" },
    { num: "P-1745", title: "Microfluidic Analysis Platform",   filed: "Mar 2022", status: "Granted",   sc: "green" },
  ];

  const publications = [
    { year: "2025", title: "CRISPR-based early detection of antibiotic-resistant pathogens", journal: "Nature Biotechnology", tier: "Q1", tc: "purple" },
    { year: "2024", title: "Proteomics profiling of drug-resistant tuberculosis strains",     journal: "PLOS ONE",             tier: "Q2", tc: "blue"   },
    { year: "2024", title: "Microfluidic lab-on-chip for point-of-care diagnostics",          journal: "Lab on a Chip, RSC",   tier: "Q2", tc: "blue"   },
  ];

  const events = [
    { icon: "💰", iconBg: C.amberLt,   title: "HEC National Research Programme",            dead: "Deadline: Jul 8, 2025",   tag: "Funding Call", tc: "amber" },
    { icon: "📅", iconBg: C.primaryLt, title: "Innovation Expo 2025 – Abstract Submission", dead: "Deadline: Jun 30, 2025",  tag: "Event",        tc: "blue"  },
    { icon: "🏅", iconBg: C.tealLt,    title: "IP & Patent Workshop",                       dead: "Aug 3, 2025 · On-campus", tag: "Workshop",     tc: "teal"  },
  ];

  const activity = [
    { dot: C.primary, text: "Proposal 'Genomic Biomarker Study' moved to In Review", time: "9 min ago" },
    { dot: C.green,   text: "NRPU Grant milestone payment of PKR 420,000 received",  time: "2 hrs ago" },
    { dot: C.amber,   text: "Patent P-2047 awaiting examiner report",                time: "Yesterday" },
    { dot: C.purple,  text: "New funding call: HEC NRPU 2025 batch published",       time: "2 days ago" },
  ];

  const adminStats   = [
    { icon: "📄", label: "Total Proposals",  value: "142",      sub: "18 pending review", color: C.primary },
    { icon: "💰", label: "Grants Approved",  value: "58",       sub: "PKR 24.6M total",   color: C.green   },
    { icon: "🏅", label: "Patents Filed",    value: "34",       sub: "6 this year",       color: C.amber   },
    { icon: "🚀", label: "Active Startups",  value: "21",       sub: "3 new cohort",      color: C.purple  },
  ];
  const researcherStats = [
    { icon: "📄", label: "Proposals submitted", value: "7",        sub: "2 under review", color: C.primary },
    { icon: "📚", label: "Publications",         value: "14",       sub: "3 this year",    color: C.green   },
    { icon: "🏅", label: "Patents",              value: "3",        sub: "1 in progress",  color: C.amber   },
    { icon: "💰", label: "Grants received",      value: "PKR 4.2M", sub: "1 active grant", color: C.purple  },
  ];
  const studentStats = [
    { icon: "📄", label: "Proposals submitted", value: "2", sub: "1 approved",   color: C.primary },
    { icon: "📚", label: "Publications",         value: "3", sub: "1 this year",  color: C.green   },
    { icon: "📢", label: "Events attended",      value: "7", sub: "2 upcoming",   color: C.amber   },
    { icon: "🎓", label: "Scholarships applied", value: "1", sub: "Under review", color: C.purple  },
  ];
  const stats = isAdmin ? adminStats : isStudent ? studentStats : researcherStats;

  return (
    <div style={{ padding: "26px 30px", overflowY: "auto", flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center",
        justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: C.text }}>
            {isAdmin ? "Admin Overview" : isStudent ? "My Student Dashboard" : "My Research Dashboard"}
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: C.textSm }}>
            Welcome back, {user?.name} · FY 2024–25
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn variant="ghost" onClick={() => setActive("funding")}>📢 Funding calls</Btn>
          {isAdmin && (
            <Btn variant="ghost" onClick={() => setActive("users")}
              style={{ borderColor: C.purple, color: C.purple }}>
              👥 Manage Users
            </Btn>
          )}
          <Btn variant="primary">+ New Submission</Btn>
        </div>
      </div>

      {/* KPI cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
        {stats.map((s, i) => (
          <div key={i}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = C.shadowMd; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = C.shadowSm; e.currentTarget.style.transform = "none"; }}
            style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: 14,
              boxShadow: C.shadowSm, padding: "20px 22px", cursor: "pointer", transition: "all .2s" }}>
            <div style={{ display: "flex", justifyContent: "space-between",
              alignItems: "flex-start", marginBottom: 10 }}>
              <div style={{ width: 44, height: 44, borderRadius: 11,
                background: s.color + "22", display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 20 }}>{s.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{s.label}</div>
            <div style={{ fontSize: 12, color: C.textSm, marginTop: 3 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Row 1 */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16, marginBottom: 16 }}>
        <Card style={{ padding: "20px 22px" }}>
          <div style={{ display: "flex", alignItems: "center",
            justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Proposals & Grants</div>
              <div style={{ fontSize: 12, color: C.textSm, marginTop: 2 }}>Track submissions & active grants</div>
            </div>
            <Btn variant="sm">+ Submit new</Btn>
          </div>
          <div style={{ background: C.pageBg, borderRadius: 10, padding: "13px 16px",
            marginBottom: 16, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.textMd, marginBottom: 10 }}>
              Genomic Biomarker Study – Phase II
            </div>
            <StepTrail current={2} />
          </div>
          {proposals.map((p, i) => (
            <div key={i}
              onMouseEnter={e => e.currentTarget.style.boxShadow = C.shadowMd}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              style={{ display: "flex", alignItems: "center", gap: 12,
                padding: "11px 13px", borderRadius: 10, border: `1px solid ${C.border}`,
                marginBottom: 8, background: "#fafbfc", transition: "box-shadow .15s" }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                background: p.iconBg, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 16 }}>{p.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text,
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</div>
                <div style={{ fontSize: 11, color: C.textSm, marginTop: 2 }}>{p.meta}</div>
                {p.progress && <div style={{ marginTop: 7 }}><ProgressBar pct={p.progress} /></div>}
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
                <Badge color={p.sc}>{p.status}</Badge>
                <button style={{ fontSize: 11, padding: "2px 9px", borderRadius: 6,
                  border: `1px solid ${C.border}`, background: "transparent",
                  color: C.textMd, cursor: "pointer" }}>View →</button>
              </div>
            </div>
          ))}
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Card style={{ padding: "20px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Patents & IP</div>
              <Btn variant="sm">+ File</Btn>
            </div>
            {patents.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0",
                borderBottom: i < patents.length - 1 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                  background: C.amberLt, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 14 }}>🏅</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: C.text,
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: C.textSm }}>{p.num} · Filed {p.filed}</div>
                </div>
                <Badge color={p.sc}>{p.status}</Badge>
              </div>
            ))}
          </Card>

          <Card style={{ padding: "20px 22px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 11, background: C.tealLt,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🚀</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Startup Incubation</div>
                <Badge color="red" style={{ marginTop: 3 }}>Deadline: Jul 31</Badge>
              </div>
            </div>
            <p style={{ fontSize: 12.5, color: C.textMd, lineHeight: 1.7, margin: "0 0 14px" }}>
              Applications for the 2025 MUET cohort are open. Turn your research into a funded venture.
            </p>
            <Btn variant="primary" full>🚀 Apply Now</Btn>
          </Card>
        </div>
      </div>

      {/* Row 2 */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16, marginBottom: 16 }}>
        <Card style={{ padding: "20px 22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between",
            alignItems: "center", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>My Publications</div>
              <div style={{ fontSize: 12, color: C.textSm, marginTop: 2 }}>14 total · 3 this year</div>
            </div>
            <Btn variant="sm">+ Add</Btn>
          </div>
          {publications.map((p, i) => (
            <div key={i} style={{ display: "flex", gap: 13, padding: "11px 0",
              borderBottom: i < publications.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <div style={{ width: 40, height: 40, borderRadius: 9, flexShrink: 0,
                background: C.primaryLt, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 11.5, fontWeight: 800, color: C.primary }}>
                {p.year}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text, lineHeight: 1.4 }}>{p.title}</div>
                <div style={{ fontSize: 11.5, color: C.textSm, marginTop: 2 }}>{p.journal}</div>
                <div style={{ display: "flex", gap: 6, marginTop: 6, alignItems: "center" }}>
                  <Badge color={p.tc}>{p.tier} Journal</Badge>
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
            <Btn variant="ghost" onClick={() => setActive("publications")}>View all 14 →</Btn>
          </div>
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Card style={{ padding: "20px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Funding & Events</div>
              <Badge color="red">2 soon</Badge>
            </div>
            {events.map((e, i) => (
              <div key={i} style={{ display: "flex", gap: 11, padding: "9px 0",
                borderBottom: i < events.length - 1 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                  background: e.iconBg, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 16 }}>{e.icon}</div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: C.text }}>{e.title}</div>
                  <div style={{ fontSize: 11, color: C.textSm, margin: "2px 0 5px" }}>{e.dead}</div>
                  <Badge color={e.tc}>{e.tag}</Badge>
                </div>
              </div>
            ))}
          </Card>

          <Card style={{ padding: "20px 22px" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 14 }}>Recent Activity</div>
            {activity.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0",
                borderBottom: i < activity.length - 1 ? `1px solid ${C.border}` : "none",
                alignItems: "flex-start" }}>
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
        <div style={{ display: "flex", justifyContent: "space-between",
          alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Submit Feedback</div>
            <div style={{ fontSize: 12, color: C.textSm, marginTop: 2 }}>Help ORIC improve research support services</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: C.text, marginBottom: 10 }}>
              How satisfied are you with ORIC support?
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {[1,2,3,4,5].map(n => (
                <button key={n} aria-label={`${n} star`}
                  onMouseEnter={e => { e.currentTarget.style.background = C.amberLt; e.currentTarget.style.borderColor = C.amber; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.borderColor = C.border; }}
                  style={{ width: 40, height: 40, borderRadius: 10,
                    border: `1.5px solid ${C.border}`, background: "#f8fafc",
                    cursor: "pointer", fontSize: 18, display: "flex",
                    alignItems: "center", justifyContent: "center", transition: "all .15s" }}>⭐</button>
              ))}
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 8 }}>Category</div>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
              {["Proposal Process","Grant Support","Patent Guidance","Events","General"].map(cat => (
                <button key={cat}
                  onMouseEnter={e => { e.currentTarget.style.background = C.primaryLt; e.currentTarget.style.color = C.primary; e.currentTarget.style.borderColor = C.primary; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.color = C.textMd; e.currentTarget.style.borderColor = C.border; }}
                  style={{ padding: "5px 13px", borderRadius: 20, border: `1px solid ${C.border}`,
                    background: "#f8fafc", fontSize: 12, color: C.textMd,
                    cursor: "pointer", transition: "all .15s", fontFamily: "inherit" }}>{cat}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: C.text, marginBottom: 8 }}>
              Comments or suggestions
            </div>
            <textarea rows={4} placeholder="Share your experience with ORIC services..."
              onFocus={e => e.target.style.borderColor = C.primary}
              onBlur={e => e.target.style.borderColor = C.border}
              style={{ width: "100%", padding: "10px 13px", borderRadius: 10, fontSize: 13,
                border: `1.5px solid ${C.border}`, color: C.text, resize: "none",
                fontFamily: "inherit", outline: "none", background: "#fafbfc",
                transition: "border .15s", boxSizing: "border-box", marginBottom: 12 }}
            />
            <Btn variant="primary" full>📤 Submit Feedback</Btn>
          </div>
        </div>
      </Card>
    </div>
  );
};

// ─── Settings page ─────────────────────────────────────────────────────────────
const SettingsPage = ({ user, email, onChangePassword, currentPwd }) => {
  const [cur, setCur]   = useState("");
  const [next, setNext] = useState("");
  const [conf, setConf] = useState("");
  const [msg, setMsg]   = useState(null);

  function handleSave() {
    if (cur !== currentPwd)  return setMsg({ type: "err", text: "Current password is incorrect." });
    if (next.length < 6)     return setMsg({ type: "err", text: "New password must be at least 6 characters." });
    if (next !== conf)       return setMsg({ type: "err", text: "New passwords do not match." });
    onChangePassword(next);
    setCur(""); setNext(""); setConf("");
    setMsg({ type: "ok", text: "Password changed successfully!" });
  }

  return (
    <div style={{ padding: "26px 30px", flex: 1, overflowY: "auto" }}>
      <h1 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800, color: C.text }}>Settings</h1>
      <p style={{ margin: "0 0 24px", fontSize: 13, color: C.textSm }}>Manage your account preferences</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 860 }}>
        <Card style={{ padding: "24px 26px" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 18 }}>Profile Information</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.green,
              color: "#fff", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 20, fontWeight: 800 }}>
              {user?.name?.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>{user?.name}</div>
              <div style={{ marginTop: 4 }}>
                <Badge color={user?.role === "Student" ? "teal" : user?.role === "Admin" ? "purple" : "green"}>
                  {user?.role}
                </Badge>
              </div>
            </div>
          </div>
          <div style={{ background: C.pageBg, borderRadius: 10, padding: "13px 15px", marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: C.textSm, marginBottom: 2 }}>Email</div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: C.text }}>{email}</div>
          </div>
          <div style={{ background: C.pageBg, borderRadius: 10, padding: "13px 15px" }}>
            <div style={{ fontSize: 11, color: C.textSm, marginBottom: 2 }}>Role</div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: C.text }}>{user?.role}</div>
          </div>
        </Card>
        <Card style={{ padding: "24px 26px" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 18 }}>Change Password</div>
          {msg && (
            <div style={{ padding: "10px 14px", borderRadius: 9, marginBottom: 16, fontSize: 13,
              background: msg.type === "ok" ? C.greenLt : C.redLt,
              color: msg.type === "ok" ? "#166534" : C.red,
              border: `1px solid ${msg.type === "ok" ? "#bbf7d0" : "#fecaca"}` }}>
              {msg.type === "ok" ? "✅" : "⚠️"} {msg.text}
            </div>
          )}
          <Input label="Current password" type="password" placeholder="Enter current password"
            value={cur} onChange={e => { setCur(e.target.value); setMsg(null); }} />
          <Input label="New password" type="password" placeholder="At least 6 characters"
            value={next} onChange={e => { setNext(e.target.value); setMsg(null); }} />
          <Input label="Confirm new password" type="password" placeholder="Re-enter new password"
            value={conf} onChange={e => { setConf(e.target.value); setMsg(null); }} />
          <Btn variant="primary" full onClick={handleSave}>🔒 Save new password</Btn>
        </Card>
      </div>
    </div>
  );
};

// ─── Placeholder pages ────────────────────────────────────────────────────────
const PAGES = {
  proposals:    { icon: "📄", title: "Proposals & Grants",   desc: "Submit new research proposals, track approval status, and manage your active grants." },
  publications: { icon: "📚", title: "My Publications",       desc: "Log your published papers, conference proceedings, and book chapters." },
  patents:      { icon: "🏅", title: "Patents & IP",          desc: "Track your patent filings, IP workflows, and commercialization status." },
  startup:      { icon: "🚀", title: "Startup Application",   desc: "Apply to join the MUET startup incubation cohort. Deadline: July 31, 2025.", cta: "Apply Now" },
  funding:      { icon: "📢", title: "Funding Calls",         desc: "Browse all active HEC and international funding calls. 2 deadlines this month." },
  events:       { icon: "📅", title: "Events & Workshops",    desc: "Register for upcoming ORIC events, workshops, and seminars." },
  policies:     { icon: "📋", title: "Policies & Guidelines", desc: "Read MUET ORIC's official research policies and grant compliance documents." },
  feedback:     { icon: "💬", title: "Submit Feedback",       desc: "Share your experience with ORIC services." },
};

const PlaceholderPage = ({ id }) => {
  const m = PAGES[id] || { icon: "📄", title: id, desc: "Coming soon." };
  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column", gap: 16, padding: 40 }}>
      <div style={{ width: 80, height: 80, borderRadius: 20, background: C.primaryLt,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>{m.icon}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: C.text }}>{m.title}</div>
      <div style={{ fontSize: 14, color: C.textMd, textAlign: "center", maxWidth: 400, lineHeight: 1.7 }}>{m.desc}</div>
      {m.cta && <Btn variant="primary">{m.cta}</Btn>}
    </div>
  );
};

// ─── Root export ──────────────────────────────────────────────────────────────
// Props from App.jsx:
//   user             → { name, pwd, role }
//   email            → string  (logged-in user's email)
//   onLogout         → fn()
//   onChangePassword → fn(newPwd)
//   currentPwd       → string
//   db               → full users object  { email: {name,pwd,role}, ... }
//   onDeleteUser     → fn(email)
//   onChangeRole     → fn(email, newRole)

export default function Dashboard({ user, email, onLogout, onChangePassword, currentPwd, db = {}, onDeleteUser, onChangeRole }) {
  const [active, setActive] = useState("overview");
  const isAdmin = user?.role === "Admin";

  // Guard: if a non-admin somehow lands on "users", redirect to overview
  const safePage = (active === "users" && !isAdmin) ? "overview" : active;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh",
      background: C.pageBg, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      <Header user={user} onLogout={onLogout} />

      <div style={{ display: "flex", flex: 1, overflow: "hidden", minHeight: 0 }}>
        <Sidebar active={safePage} setActive={setActive} user={user} email={email} />

        {safePage === "overview" && <OverviewPage user={user} setActive={setActive} />}

        {safePage === "users" && isAdmin && (
          <ManageUsersPage
            db={db}
            currentEmail={email}
            onDeleteUser={onDeleteUser}
            onChangeRole={onChangeRole}
          />
        )}

        {safePage === "settings" && (
          <SettingsPage user={user} email={email}
            onChangePassword={onChangePassword} currentPwd={currentPwd} />
        )}

        {!["overview","users","settings"].includes(safePage) && (
          <PlaceholderPage id={safePage} />
        )}
      </div>
    </div>
  );
}
