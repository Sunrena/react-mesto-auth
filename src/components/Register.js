import React from "react";
import { NavLink } from "react-router-dom";

export default function Register({ 
    valueRegister, 
    setValueRegister, 
    onHandleRegister,
 }) {
    
    function handleChange(evt) {
        const { name, value } = evt.target;
        setValueRegister({ ...valueRegister, [name]: value });
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onHandleRegister();
    }

    return (
        <div className="sign">
            <div className="sign__container">
                <h2 className="sign__title">Регистрация</h2>
                <form className="sign__form"
                    onSubmit={handleSubmit}
                    method="post"
                    name="form__login"
                >
                    <fieldset className="sign__form-fieldset">
                        <input className="sign__input" type="email"
                            placeholder="E-mail"
                            name="email"
                            value={valueRegister.email}
                            onChange={handleChange}
                            required />
                        <span className="sign__error name-error" />
                    </fieldset>

                    <fieldset className="sign__form-fieldset">
                        <input className="sign__input" type="password"
                            placeholder="Пароль"
                            name="password"
                            value={valueRegister.password}
                            onChange={handleChange}
                            maxLength="20"
                            minLength="2" />
                        <span className="sign__error about-error" />
                    </fieldset>

                    <button className="sign__save-btn"
                        type="submit"
                        aria-label="Войти"
                    >Зарегистрироваться</button>
                </form>

                <p className="sign__question">Уже зарегистрированы?{' '}
                    <NavLink to="/sign-in" className="sign__question-link">
                        Войти
                    </NavLink>
                </p>
            </div>

        </div>
    )
 }