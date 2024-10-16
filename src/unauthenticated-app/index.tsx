import React from "react";
import LoginPage from "./login";
import RegisterPage from "./register";

export default function UnauthenticatedApp() {
  const [isRegister, setIsRegister] = React.useState(false);
  return (
    <div>
      {isRegister ? <RegisterPage /> : <LoginPage />}
      <button onClick={() => setIsRegister(!isRegister)}>
        切换到{isRegister ? "登录" : "注册"}
      </button>
    </div>
  );
}
