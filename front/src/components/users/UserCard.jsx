import {Card, CardBody, Col, Row} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function UserCard(props) {
    let [isFollowed, setIsFollowed] = useState(props.is_followed);
    let navigate = useNavigate();

    async function follow() {
        try {
            await axios.post(`http://localhost:8080/api/users/${props.id}/follow`, {},{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            });
            setIsFollowed(true);
        } catch(e) {
            if (e.response.status === 401) {
                localStorage.setItem('token', '');
                navigate("/auth");
            }
        }
    }

    async function unfollow() {
        try {
            await axios.post(`http://localhost:8080/api/users/${props.id}/unfollow`, {}, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            });
            setIsFollowed(false);
        } catch(e) {
            if (e.response.status === 401) {
                localStorage.setItem('token', '');
                navigate("/auth");
            }
        }
    }

    return (
        <Row className="mt-3">
            <Col className="col-md-6 m-auto">
                <Card>
                    <CardBody>
                        <div className="media mb-3">
                            <img src={"http://localhost:8080" + props.img_url}
                                 className="d-block rounded-circle object-fit-cover" alt="Изображение профиля"
                                 style={{height: "40px", width: "40px"}}
                                 onError={(e) => {
                                     e.target.src = 'http://localhost:8080/users/defaultProfilePic.png'
                                     e.onerror = null;
                                 }}/>
                        </div>
                        <h5 className="card-title">{props.username}</h5>
                        <p className="card-text">{props.description}</p>
                        {isFollowed ?
                            <a href="#" onClick={unfollow} className="btn btn-secondary">Отписаться</a> :
                            <a href="#" onClick={follow} className="btn btn-primary">Подписаться</a>
                        }
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}