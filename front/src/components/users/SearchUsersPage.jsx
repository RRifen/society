import {Card, CardBody, CardImg, Col, Container, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import UserCard from "./UserCard";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function SearchUsersPage({users, setUsers, hasNextUsers, setHasNextUsers, userQuery, renderUsers}) {
    let [page, setPage] = useState(0);
    let navigate = useNavigate();
const requestUsers = async () => {
    try {
        let newUsers = await axios.get(`http://localhost:8080/api/users?q=${userQuery}&pn=${page}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        });
        setUsers(newUsers.data.users);
        setHasNextUsers(newUsers.data.has_next);
    } catch (e) {
        console.log(e.response);
        if (e.response.status === 401) {
            localStorage.setItem('token', '');
            navigate("/");
        }
    }
}

    useEffect(() => {
        requestUsers();
    }, [page, renderUsers]);

    return (
        <>
            <Container className="mt-3">
                {users.map((user) => {
                    if (user.username !== localStorage.getItem('username')) {
                        return <UserCard key={user.id} {...user}></UserCard>
                    }
                })}
            </Container>
            <Row className="justify-content-center mt-3">
                <Col className="col-lg-6">
                    <ul className="pagination d-flex justify-content-center">
                        <li className="page-item"><a className="page-link" href="#" onClick={(e) => {
                            if (page !== 0) {
                                setPage(page - 1);
                            }
                        }}>&lt;</a></li>
                        <li className="page-item"><a className="page-link active">{page + 1}</a></li>
                        <li className="page-item"><a className="page-link" href="#" onClick={(e) => {
                            if (hasNextUsers) {
                                setPage(page + 1);
                            }
                        }}>&gt;</a></li>
                    </ul>
                </Col>
            </Row>
        </>
    )
}