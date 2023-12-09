import {
    Button,
    Col,
    Container,
    Row
} from "react-bootstrap";
import React, {useContext} from "react";
import UpdateProfile from "./UpdateProfileModal";
import {getUserInfo} from "../../App";

export default function Profile() {
    let userInfo = getUserInfo()
    return (
        <Container className="profile-container bg-light mt-3 rounded">
            <UpdateProfile/>
            <Row className="d-flex justify-content-center">
                <Col className="col-auto">
                    <img src={userInfo.imgUrl} onError={(e) => {
                        e.target.src = 'http://localhost:8080/users/defaultProfilePic.png'
                        e.onerror = null;
                    }} className="rounded-circle object-fit-cover img-fluid"
                         style={{height: "100px", width: "100px"}}
                         alt="Изображение профиля"/>

                </Col>
                <Col className="col-3">
                    <strong>{userInfo.username}</strong>
                    <p className="text-muted">{userInfo.description || "Вы можете добавить описание к профилю"}</p>
                </Col>
                <Col className="bg-light col-auto">
                    <Row>
                        <Col><strong>{userInfo.postsCount}</strong></Col>
                        <Col><strong>{userInfo.followersCount}</strong></Col>
                    </Row>
                    <Row>
                        <Col>Число постов</Col>
                        <Col>Число фолловеров</Col>
                    </Row>
                    <Row className="h-100 mt-2">
                        <Button className="btn-info text-white" style={{height: "40px"}} data-bs-toggle="modal" data-bs-target="#updateProfileModal">Изменить профиль</Button>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}