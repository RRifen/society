import api from "../../api";
import {loginFailure, loginStart, loginSuccess, loadUserInfo } from "./authReducer";
import axios from "axios";

export const loginUser =
    (data) =>
        async (dispatch) => {
            try {
                dispatch(loginStart())

                let res = await api.auth.login(data)
                let token = res.data.token;
                localStorage.setItem('token', token);
                dispatch(loginSuccess(res.data.token))
            } catch (e) {
                dispatch(loginFailure(e.response.data.message))
                throw e;
            }
        }