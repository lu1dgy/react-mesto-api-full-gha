import React from "react";
import { Link } from "react-router-dom";

const Register = ({ handleRegister }) => {
  const [formValue, setFormValue] = React.useState({
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
    handleRegister(formValue.email, formValue.password);
  };
  return (
    <form className="auth" name="register" onSubmit={handleSubmit}>
      <h2 className="auth__title">Регистрация</h2>
      <input
        autoComplete="off"
        type="email"
        className="auth__input"
        placeholder="Email"
        name="email"
        value={formValue.email}
        onChange={handleChange}
      />
      <input
        autoComplete="off"
        type="password"
        className="auth__input"
        placeholder="Пароль"
        name="password"
        value={formValue.password}
        onChange={handleChange}
      />
      <button className="auth__submit" type="submit">
        Зарегистрироваться
      </button>
      <p className="auth__question">
        Уже зарегистрированы?{" "}
        <Link className="auth__link" to="/sign-in">
          Войти
        </Link>
      </p>
    </form>
  );
};

export default Register;
