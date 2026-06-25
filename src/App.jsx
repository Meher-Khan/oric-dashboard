import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

const DB_INITIAL = {};

export default function App() {
  const [db, setDb] = useState(DB_INITIAL);
  const [currentUser, setCurrentUser] = useState(null);

  function register(name, email, pwd) {
    setDb((prev) => ({
      ...prev,
      [email]: {
        name,
        pwd,
        role: email.includes("@students")
          ? "Student"
          : email.includes("@faculty")
          ? "Faculty"
          : "Admin",
      },
    }));
  }

  function updatePassword(email, newPwd) {
    setDb((prev) => ({
      ...prev,
      [email]: { ...prev[email], pwd: newPwd },
    }));
  }

  function login(email, pwd) {
    const user = db[email];
    if (!user) return "no_account";
    if (user.pwd !== pwd) return "wrong_pwd";
    setCurrentUser(email);
    return "ok";
  }

  function logout() {
    setCurrentUser(null);
  }

  // ── Admin-only: delete a user account ──────────────────────────────────────
  function deleteUser(email) {
    setDb((prev) => {
      const updated = { ...prev };
      delete updated[email];
      return updated;
    });
  }

  // ── Admin-only: change a user's role ───────────────────────────────────────
  function changeRole(email, newRole) {
    setDb((prev) => ({
      ...prev,
      [email]: { ...prev[email], role: newRole },
    }));
  }

  if (currentUser) {
    return (
      <Dashboard
        user={db[currentUser]}
        email={currentUser}
        onLogout={logout}
        onChangePassword={(newPwd) => updatePassword(currentUser, newPwd)}
        currentPwd={db[currentUser]?.pwd}
        // ── New props for Manage Users (Admin only) ──
        db={db}
        onDeleteUser={deleteUser}
        onChangeRole={changeRole}
      />
    );
  }

  return <LoginPage db={db} onRegister={register} onLogin={login} />;
}
