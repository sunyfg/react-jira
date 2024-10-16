import { FormEvent } from "react";
import { useAuth } from "../context/auth-context";

export default function Register() {
  const { register, user } = useAuth();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = e.currentTarget.username.value;
    const password = e.currentTarget.password.value;
    console.log(username, password);
    register({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      {user && (
        <div>
          <p>注册成功，用户名：{user.name}</p>
          <p>token: {user.token}</p>
        </div>
      )}
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">注册</button>
    </form>
  );
}
