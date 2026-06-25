import { useState } from "react";
import { generatePassword } from "./utils";

export default function PasswordGenField({
  value,
  onChange,
  placeholder = "Click to auto-generate password",
  variant = "dark", // "dark" for login page, "light" for dashboard
}) {
  const [showGen, setShowGen] = useState(false);
  const [genPwd, setGenPwd] = useState("");
  const [visible, setVisible] = useState(false);

  function handleClick() {
    if (!showGen) {
      const p = generatePassword();
      setGenPwd(p);
      setShowGen(true);
    }
  }

  function regen() {
    setGenPwd(generatePassword());
  }

  function useThis() {
    onChange(genPwd);
    setVisible(true);
    setShowGen(false);
  }

  const isDark = variant === "dark";

  const fieldStyle = {
    background: isDark ? "rgba(255,255,255,0.15)" : "#fff",
    border: isDark
      ? "0.5px solid rgba(255,255,255,0.3)"
      : "0.5px solid #d0d0d0",
    borderRadius: 8,
    padding: "11px 42px 11px 13px",
    width: "100%",
    fontSize: 13,
    color: isDark ? "#fff" : "#1a1a1a",
    outline: "none",
    cursor: "pointer",
    fontFamily: "inherit",
  };

  const eyeStyle = {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: isDark ? "rgba(255,255,255,0.6)" : "#888",
    fontSize: 15,
    display: "flex",
    alignItems: "center",
  };

  const genBoxStyle = isDark
    ? {
        background: "rgba(0,201,167,0.15)",
        border: "0.5px solid rgba(0,201,167,0.5)",
        borderRadius: 10,
        padding: 14,
        marginTop: 8,
      }
    : {
        background: "#EAF3DE",
        border: "0.5px solid #97C459",
        borderRadius: 10,
        padding: 14,
        marginTop: 8,
      };

  const genLabelStyle = {
    fontSize: 11,
    color: isDark ? "rgba(255,255,255,0.7)" : "#3B6D11",
    marginBottom: 6,
  };

  const genValStyle = {
    fontSize: 17,
    fontWeight: 500,
    color: isDark ? "#fff" : "#27500A",
    letterSpacing: 2,
    fontFamily: "monospace",
    marginBottom: 10,
    wordBreak: "break-all",
  };

  const regenBtnStyle = {
    flex: 1,
    padding: "7px 0",
    borderRadius: 7,
    fontSize: 12,
    fontWeight: 500,
    cursor: "pointer",
    border: isDark ? "0.5px solid rgba(255,255,255,0.3)" : "0.5px solid #97C459",
    background: isDark ? "rgba(255,255,255,0.15)" : "#fff",
    color: isDark ? "#fff" : "#3B6D11",
  };

  const useBtnStyle = {
    flex: 1,
    padding: "7px 0",
    borderRadius: 7,
    fontSize: 12,
    fontWeight: 500,
    cursor: "pointer",
    border: "none",
    background: isDark ? "#00c9a7" : "#639922",
    color: "#fff",
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onClick={handleClick}
          placeholder={placeholder}
          style={fieldStyle}
          readOnly={!value && !showGen}
          onFocus={(e) => {
            e.target.style.borderColor = isDark ? "#00c9a7" : "#0d5fa0";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = isDark
              ? "rgba(255,255,255,0.3)"
              : "#d0d0d0";
          }}
        />
        <button
          type="button"
          style={eyeStyle}
          onClick={() => setVisible((v) => !v)}
          aria-label="Toggle password visibility"
        >
          <i className={visible ? "ti ti-eye-off" : "ti ti-eye"} />
        </button>
      </div>

      {showGen && (
        <div style={genBoxStyle}>
          <div style={genLabelStyle}>
            ✦ Auto-generated password — save this!
          </div>
          <div style={genValStyle}>{genPwd}</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" style={regenBtnStyle} onClick={regen}>
              ↺ Regenerate
            </button>
            <button type="button" style={useBtnStyle} onClick={useThis}>
              ✓ Use this
            </button>
          </div>
        </div>
      )}
    </div>
  );
}