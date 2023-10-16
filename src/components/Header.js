import React from 'react';
import logo from '../images/logo.svg';
import { Link, Route, Routes } from 'react-router-dom';

export default function Header({ userEmail, signOut }) {
    return (
        <header className="header container">
          <div>
            <img className="header__logo" src={logo} alt="Логотип Место" />
          </div>
          <Routes>
            <Route path='/sign-up' element={
              <Link to='/sign-in' className="header__link">Войти</Link>
            }/>

            <Route path='/sign-in' element={
              <Link to='/sign-up' className="header__link">Регистрация</Link>}
              />

            <Route path='/' element={
              <div>
                <span className="header__email">{userEmail.email}</span>
                <button className="header__ext-btn" onClick={signOut}>Выйти</button>
              </div>}/>
          </Routes>
        </header>
    );
}