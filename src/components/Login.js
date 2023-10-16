import React, { useState } from "react";
import * as auth from "../utils/auth";
import { useNavigate } from "react-router-dom";


export default function Login({
    handleUserData,
    handleLogin,
    setIsSuccses,
    openToolTip,

}) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormValue({ ...formValue, [name]: value });
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        if (!formValue.email && !formValue.password) {
            return
        }

        auth.authorize(formValue.email, formValue.password)
            .then((data) => {
                if (data.jwt) {
                    setFormValue({
                        email: '',
                        password: '',
                    })
                }

                handleUserData(formValue.email);
                navigate('/', { replace: true });
                handleLogin(true);
            })
            .catch((err) => {
                console.error(err);
                setIsSuccses(false);
                openToolTip();
            });
    }



    return (
        <div className="sign">
            <div className="sign__container">
                <h2 className="sign__title">Вход</h2>
                <form className="sign__form"
                    onSubmit={handleSubmit}
                    method="post"
                    name="form__login"
                >
                    <fieldset className="sign__form-fieldset">
                        <input className="sign__input" type="email"
                            placeholder="E-mail"
                            name="email"
                            value={formValue.email}
                            onChange={handleChange}
                            required />
                        <span className="sign__error name-error" />
                    </fieldset>

                    <fieldset className="sign__form-fieldset">
                        <input className="sign__input" type="password"
                            placeholder="Пароль"
                            name="password"
                            value={formValue.password}
                            onChange={handleChange}
                            maxLength="20"
                            minLength="2" />
                        <span className="sign__error about-error" />
                    </fieldset>

                    <button className="sign__save-btn"
                        type="submit"
                        aria-label="Войти"
                    >Войти</button>
                </form>
            </div>

        </div>
    )
}