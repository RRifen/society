import {Container, FormControl, FormGroup} from "react-bootstrap";
import {useContext, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../store/auth/actionCreators";
import {useNavigate} from "react-router-dom";
import {createUserInfo} from "../../App";
import axios from "axios";

export default function AuthorizationPage() {
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(loginUser({username, password}));
            let res = await axios.get('http://localhost:8080/api/users/profile', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            createUserInfo(res)
            navigate("/feed");
        } catch(e) {
            console.log(e);
            alert(e);
        }
    }

    return (
        <div className="ma position-relative" style={{maxWidth: "500px", height: "100vh", margin: "auto"}}>
            <Container className="position-absolute bottom-50 bg-light p-0">
                <form className="border border-dark h-100 rounded p-2" onSubmit={handleSubmit}>
                    <h1 className="text-center mb-4">Войти в аккаунт</h1>
                    <FormGroup className="my-4">
                        <FormControl name="username" value={username} type="text" id="registrationLogin"
                                     aria-describedby="emailHelp" placeholder="Введите логин"
                                     onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="my-4">
                        <FormControl name="password" value={password} type="password" id="registrationPassword"
                                     placeholder="Введите пароль"
                                     onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>
                    <div className="d-flex">
                        <button type="submit" className="btn btn-primary ms-auto">Войти</button>
                    </div>
                </form>
                <div className="bg-white">
                    <a href="/reg">Зарегистрироваться</a>
                </div>
            </Container>
        </div>
    )
}