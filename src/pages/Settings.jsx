import { useState } from "react";
import PasswordGenField from "./Passwordgenfield";

function Settings({ currentPwd, onChangePassword }) {
  const [curPw, setCurPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confPw, setConfPw] = useState("");
  const [msg, setMsg] = useState(null);
  const [showCur, setShowCur] = useState(false);
  const [showConf, setShowConf] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setMsg(null);
    if (curPw !== currentPwd) { setMsg({ type: "err", text: "Current password is incorrect." }); return; }
    if (newPw.length < 8) { setMsg({ type: "err", text: "New password must be at least 8 characters." }); return; }
    if (newPw !== confPw) { setMsg({ type: "err", text: "Passwords do not match." }); return; }
    onChangePassword(newPw);
    setCurPw(""); setNewPw(""); setConfPw("");
    setMsg({ type: "suc", text: "Password updated successfully!" });
  }

  return (
    <div style={{ maxWidth: 400 }}>
      <div style={s.card}>
        <p style={s.cardTitle}>
          <i className="ti ti-lock" style={{ fontSize: 15, verticalAlign: -2, marginRight: 6 }} />
          Change password
        </p>
        {msg && <div style={msg.type === "err" ? s.err : s.suc}>{msg.text}</div>}
        <form onSubmit={handleSubmit}>
          <label style={s.label}>Current password</label>
          <div style={s.fieldWrap}>
            <input type={showCur ? "text" : "password"} value={curPw} onChange={(e) => setCurPw(e.target.value)} placeholder="Enter current password" style={s.input} />
            <button type="button" style={s.eye} onClick={() => setShowCur((v) => !v)}><i className={showCur ? "ti ti-eye-off" : "ti ti-eye"} /></button>
          </div>
          <label style={s.label}>New password</label>
          <PasswordGenField value={newPw} onChange={setNewPw} placeholder="Click to auto-generate or type" variant="light" />
          <label style={{ ...s.label, marginTop: 10 }}>Confirm new password</label>
          <div style={s.fieldWrap}>
            <input type={showConf ? "text" : "password"} value={confPw} onChange={(e) => setConfPw(e.target.value)} placeholder="Re-enter new password" style={s.input} />
            <button type="button" style={s.eye} onClick={() => setShowConf((v) => !v)}><i className={showConf ? "ti ti-eye-off" : "ti ti-eye"} /></button>
          </div>
          <button type="submit" style={s.btn}>Update password</button>
        </form>
      </div>
    </div>
  );
}

export default Settings;

const s = {
  card: { background: "#fff", border: "0.5px solid #e5e7eb", borderRadius: 12, padding: 20 },
  cardTitle: { fontSize: 14, fontWeight: 500, color: "#1a1a1a", marginBottom: 16 },
  label: { display: "block", fontSize: 12, color: "#888", marginBottom: 5 },
  fieldWrap: { position: "relative", marginBottom: 12 },
  input: { width: "100%", padding: "9px 38px 9px 11px", border: "0.5px solid #d0d0d0", borderRadius: 7, fontSize: 13, color: "#1a1a1a", outline: "none", boxSizing: "border-box", fontFamily: "inherit" },
  eye: { position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#888", fontSize: 15, display: "flex", alignItems: "center" },
  btn: { marginTop: 4, padding: "10px 20px", background: "#0d5fa0", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" },
  err: { background: "#FEF2F2", border: "0.5px solid #FECACA", borderRadius: 8, padding: "9px 12px", fontSize: 12, color: "#991B1B", marginBottom: 12 },
  suc: { background: "#F0FDF4", border: "0.5px solid #86EFAC", borderRadius: 8, padding: "9px 12px", fontSize: 12, color: "#166534", marginBottom: 12 },
};