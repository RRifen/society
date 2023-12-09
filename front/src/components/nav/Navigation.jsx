import {Navbar, NavbarBrand, NavItem, NavLink} from "react-bootstrap";
import {useSelector, useStore} from "react-redux";
import {useContext, useState} from "react";
import {getUserInfo, UserData} from "../../App";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Navigation({children, userQuery, setUserQuery, setRenderUsers, renderUsers}) {
    let userInfo = getUserInfo();
    let navigate = useNavigate();

    return (
        <>
            <div className="navbar sticky-top navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <NavbarBrand href="#">Society</NavbarBrand>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <Navbar className="navbar-nav me-auto mb-2 mb-lg-0">
                            <NavItem>
                                <NavLink aria-current="page" href="/feed">Посты</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/users">Пользователи</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/create-post">Создать пост</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#" onClick={(e) => {
                                    e.preventDefault();
                                    localStorage.setItem('token', '');
                                    navigate("/");
                                }}>Выйти из аккаунта</NavLink>
                            </NavItem>
                        </Navbar>
                        <form className="d-flex me-3" role="search">
                            <input className="form-control me-2" type="search" value={userQuery} placeholder="Поиск"
                                   aria-label="Search"
                                   onChange={(e) => setUserQuery(e.target.value)}/>
                            <button className="btn btn-outline-success" type="submit" onClick={(e) => {
                                e.preventDefault();
                                if (window.location.href.indexOf("users") > -1) {
                                    setRenderUsers(!renderUsers);
                                }
                                navigate("/users");
                            }}>Найти
                            </button>
                        </form>
                        <a href="/profile">
                            <img src={userInfo.imgUrl} onError={(e) => {
                                e.target.src = 'http://localhost:8080/users/defaultProfilePic.png'
                                e.onerror = null;
                            }} className="rounded-circle object-fit-cover img-fluid"
                                 style={{height: "60px", width: "60px"}}
                                 alt="Изображение профиля"/>
                        </a>
                    </div>
                </div>
            </div>
            {children}
        </>
    )
}
