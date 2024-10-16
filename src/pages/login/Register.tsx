import { FormEvent } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Register() {
  const register = (param: { username: string; password: string }) => {
    fetch(`${apiUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    }).then(async (response) => {
      if (response.ok) {
      }
    });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = e.currentTarget.username.value;
    const password = e.currentTarget.password.value;
    console.log(username, password);
    register({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
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
