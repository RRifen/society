import {Container, FormControl, FormGroup} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function RegistrationPage() {
    let [username, setUsername] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post("http://localhost:8080/registration",
                {
                    username,
                    email,
                    password,
                    confirm_password: confirmPassword
                },
                {
                    validateStatus: (status) => {
                        return status === 200 || status === 201
                    }
                });
            alert("Вы успешно зарегистрировались");
            navigate('/auth');
        } catch (e) {
            alert(e.response?.data?.message || "Error");
        }
    }

    return (
        <div className="ma position-relative" style={{maxWidth: "500px", height: "100vh", margin: "auto"}}>
            <Container className="position-absolute bottom-50 bg-light p-0">
                <form className="border border-dark rounded p-2" onSubmit={handleSubmit}>
                    <h1 className="text-center mb-4">Создать аккаунт</h1>
                    <FormGroup className="mt-2">
                        <FormControl name="username" value={username} type="text" id="registrationLogin"
                                     aria-describedby="emailHelp" placeholder="Введите логин"
                                     onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="mt-2">
                        <FormControl name="email" value={email} type="email" id="registrationEmail"
                                     aria-describedby="emailHelp" placeholder="Введите email"
                                     onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="mt-2">
                        <FormControl name="password" value={password} type="password" id="registrationPassword"
                                     placeholder="Введите пароль"
                                     onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="mt-2">
                        <FormControl name="confirm_password" value={confirmPassword} type="password"
                                     id="registrationConfirmPassword"
                                     placeholder="Подтвердите пароль"
                                     onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </FormGroup>
                    <div className="d-flex">
                        <button type="submit" className="btn btn-primary mt-2 ms-auto">Создать</button>
                    </div>
                </form>
                <div className="bg-white">
                    <a href="/auth">Войти в аккаунт</a>
                </div>
            </Container>
        </div>
    )
}