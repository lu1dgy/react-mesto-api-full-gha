import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // здесь нужно будет добавить логин
    if (!formValue.email || !formValue.password) {
      return;
    }
    onLogin(formValue.email, formValue.password);
  };
  return (
    <form className="auth" name="login" onSubmit={handleSubmit}>
      <h2 className="auth__title">Вход</h2>
      <input
        value={formValue.email}
        onChange={handleChange}
        autoComplete="off"
        type="email"
        className="auth__input"
        placeholder="Email"
        name="email"
      />
      <input
        value={formValue.password}
        onChange={handleChange}
        autoComplete="off"
        type="password"
        className="auth__input"
        placeholder="Пароль"
        name="password"
      />
      <button className="auth__submit" type="submit">
        Войти
      </button>
    </form>
  );
};

export default Login;
