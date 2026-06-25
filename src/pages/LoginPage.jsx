import { useState } from "react";
import { isValidMuetEmail } from "./utils";
import PasswordGenField from "./Passwordgenfield";

export default function LoginPage({ db, onRegister, onLogin }) {
  const [tab, setTab] = useState("login"); // "login" | "register" | "forgot"

  // Login state
  const [lEmail, setLEmail] = useState("");
  const [lPwd, setLPwd] = useState("");
  const [lMsg, setLMsg] = useState(null);

  // Register state
  const [rName, setRName] = useState("");
  const [rEmail, setREmail] = useState("");
  const [rPwd, setRPwd] = useState("");
  const [rMsg, setRMsg] = useState(null);

  // Forgot state
  const [fEmail, setFEmail] = useState("");
  const [fPwd, setFPwd] = useState("");
  const [fMsg, setFMsg] = useState(null);

  function doLogin(e) {
    e.preventDefault();
    setLMsg(null);
    if (!isValidMuetEmail(lEmail)) {
      setLMsg({ type: "err", text: "Only official MUET emails allowed (@students / @faculty / @admin .muet.edu.pk)." });
      return;
    }
    const result = onLogin(lEmail, lPwd);
    if (result === "no_account") setLMsg({ type: "err", text: "No account found. Please register first." });
    else if (result === "wrong_pwd") setLMsg({ type: "err", text: "Incorrect password. Please try again." });
  }

  function doRegister(e) {
    e.preventDefault();
    setRMsg(null);
    if (!rName.trim()) { setRMsg({ type: "err", text: "Please enter your full name." }); return; }
    if (!isValidMuetEmail(rEmail)) { setRMsg({ type: "err", text: "Only official MUET emails allowed (@students / @faculty / @admin .muet.edu.pk)." }); return; }
    if (db[rEmail]) { setRMsg({ type: "err", text: "Email already registered. Please login." }); return; }
    if (!rPwd) { setRMsg({ type: "err", text: "Please click the password field to generate a password." }); return; }
    onRegister(rName.trim(), rEmail, rPwd);
    setRMsg({ type: "suc", text: "Account created! You can now login." });
    setRName(""); setREmail(""); setRPwd("");
  }

  function doForgot(e) {
    e.preventDefault();
    setFMsg(null);
    if (!isValidMuetEmail(fEmail)) { setFMsg({ type: "err", text: "Only official MUET emails allowed." }); return; }
    if (!db[fEmail]) { setFMsg({ type: "err", text: "No account found with this email." }); return; }
    if (!fPwd) { setFMsg({ type: "err", text: "Please click the password field to generate a new password." }); return; }
    onRegister(db[fEmail].name, fEmail, fPwd);
    setFMsg({ type: "suc", text: "Password reset! You can now login with your new password." });
    setFEmail(""); setFPwd("");
  }

  const s = styles;

  return (
    <div style={s.bg}>
      <div style={s.card}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={s.logoBox}>
            <i className="ti ti-atom" style={{ fontSize: 22, color: "#0d5fa0" }} />
            <span style={{ fontSize: 10, fontWeight: 500, color: "#0d5fa0", lineHeight: 1 }}>
              ORIC MUET
            </span>
          </div>
        </div>

        <p style={s.title}>MUET ORIC Portal</p>
        <p style={s.subtitle}>Office of Research, Innovation &amp; Commercialization</p>

        {/* Tabs — hide on forgot */}
        {tab !== "forgot" && (
          <div style={s.tabs}>
            <button
              style={{ ...s.tab, ...(tab === "login" ? s.tabOn : s.tabOff) }}
              onClick={() => { setTab("login"); setLMsg(null); }}
            >
              Existing User
            </button>
            <button
              style={{ ...s.tab, ...(tab === "register" ? s.tabOn : s.tabOff) }}
              onClick={() => { setTab("register"); setRMsg(null); }}
            >
              New User
            </button>
          </div>
        )}

        {/* LOGIN FORM */}
        {tab === "login" && (
          <form onSubmit={doLogin}>
            <p style={s.sectionLabel}>Login</p>
            {lMsg && (
              <div style={lMsg.type === "err" ? s.err : s.suc}>{lMsg.text}</div>
            )}
            <input
              style={s.field}
              type="email"
              placeholder="University Email"
              value={lEmail}
              onChange={e => setLEmail(e.target.value)}
            />
            <div style={{ marginBottom: 10 }}>
              <PasswordGenField
                value={lPwd}
                onChange={setLPwd}
                placeholder="Password"
                variant="dark"
              />
            </div>
            <button type="submit" style={s.btn}>Login</button>
            <div style={s.flink}>
              <span
                onClick={() => { setTab("forgot"); setFMsg(null); }}
                style={s.flinkA}
              >
                Forgot password?
              </span>
            </div>
          </form>
        )}

        {/* REGISTER FORM */}
        {tab === "register" && (
          <form onSubmit={doRegister}>
            <p style={s.sectionLabel}>Register</p>
            {/* ✅ FIXED: rMsg.type instead of s.type */}
            {rMsg && (
              <div style={rMsg.type === "err" ? s.err : s.suc}>{rMsg.text}</div>
            )}
            <input
              style={s.field}
              type="text"
              placeholder="Full Name"
              value={rName}
              onChange={e => setRName(e.target.value)}
            />
            <input
              style={s.field}
              type="email"
              placeholder="University Email"
              value={rEmail}
              onChange={e => setREmail(e.target.value)}
            />
            <div style={{ marginBottom: 10 }}>
              <PasswordGenField
                value={rPwd}
                onChange={setRPwd}
                placeholder="Click to auto-generate password"
                variant="dark"
              />
            </div>
            <button type="submit" style={s.btn}>Register</button>
          </form>
        )}

        {/* FORGOT PASSWORD FORM */}
        {tab === "forgot" && (
          <form onSubmit={doForgot}>
            <p style={s.sectionLabel}>Reset password</p>
            {fMsg && (
              <div style={fMsg.type === "err" ? s.err : s.suc}>{fMsg.text}</div>
            )}
            <input
              style={s.field}
              type="email"
              placeholder="University Email"
              value={fEmail}
              onChange={e => setFEmail(e.target.value)}
            />
            <div style={{ marginBottom: 10 }}>
              <PasswordGenField
                value={fPwd}
                onChange={setFPwd}
                placeholder="Click to generate new password"
                variant="dark"
              />
            </div>
            <button type="submit" style={s.btn}>Reset password</button>
            <div style={s.flink}>
              <span onClick={() => setTab("login")} style={s.flinkA}>
                Back to login
              </span>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}

const styles = {
  bg: {
    background: "#0d5fa0",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1.5rem",
    fontFamily: "system-ui, sans-serif",
  },
  card: {
    background: "rgba(255,255,255,0.13)",
    border: "0.5px solid rgba(255,255,255,0.28)",
    borderRadius: 16,
    padding: "1.75rem 1.75rem 2rem",
    width: "100%",
    maxWidth: 420,
  },
  logoBox: {
    width: 60,
    height: 60,
    background: "#fff",
    borderRadius: 10,
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  title: {
    fontSize: 19,
    fontWeight: 500,
    color: "#fff",
    textAlign: "center",
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 11,
    color: "rgba(255,255,255,0.68)",
    textAlign: "center",
    marginBottom: 20,
  },
  tabs: {
    display: "flex",
    gap: 8,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    padding: 9,
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    border: "0.5px solid rgba(255,255,255,0.3)",
    fontFamily: "inherit",
  },
  tabOn: {
    background: "#00c9a7",
    color: "#fff",
    borderColor: "#00c9a7",
  },
  tabOff: {
    background: "rgba(255,255,255,0.1)",
    color: "rgba(255,255,255,0.8)",
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: 500,
    color: "#fff",
    textAlign: "center",
    marginBottom: 14,
  },
  field: {
    background: "rgba(255,255,255,0.15)",
    border: "0.5px solid rgba(255,255,255,0.3)",
    borderRadius: 8,
    padding: "11px 13px",
    width: "100%",
    marginBottom: 10,
    fontSize: 13,
    color: "#fff",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
  btn: {
    width: "100%",
    padding: 12,
    background: "#00c9a7",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "inherit",
  },
  err: {
    background: "rgba(226,75,74,0.25)",
    border: "0.5px solid rgba(226,75,74,0.6)",
    borderRadius: 8,
    padding: "9px 12px",
    fontSize: 12,
    color: "#ffa5a5",
    marginBottom: 10,
  },
  suc: {
    background: "rgba(29,158,117,0.25)",
    border: "0.5px solid rgba(29,158,117,0.6)",
    borderRadius: 8,
    padding: "9px 12px",
    fontSize: 12,
    color: "#7fe8c9",
    marginBottom: 10,
  },
  flink: {
    textAlign: "center",
    marginTop: 10,
  },
  flinkA: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    cursor: "pointer",
  },
};