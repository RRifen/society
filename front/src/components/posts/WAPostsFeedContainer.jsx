import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";
import Post from "./Post";
import WAPost from "./WAPost";

export default function WAPostsFeedContainer() {
    let navigate = useNavigate();
    let [posts, setPosts] = useState([]);
    let [page, setPage] = useState(0);
    let [hasNext, setHasNext] = useState(false);
    let [postRadio, setPostRadio] = useState(1);
    console.log()
    const requestPosts = async () => {
        let endpoint = `http://localhost:8080/api-wa/posts?pn=${page}`;
        try {
            let newPosts = await axios.get(endpoint, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            });
            setPosts(newPosts.data.posts);
            console.log(newPosts.data.posts);
            setHasNext(newPosts.data.has_next);
        } catch (e) {
            console.log(e.response);
            if (e.response.status === 401) {
                localStorage.setItem('token', '');
                navigate("/auth");
            }
        }

    }

    useEffect(() => {
        requestPosts()
    }, [page, postRadio]);

    return (
        <Container className="posts-content">
            <Row className="justify-content-center mb-2">
                <Col className="col-lg-6">
                    <div className="d-flex justify-content-center">
                        <input type="radio" className="btn-check mx-1" value={1} name="options-base" id="all-posts"
                               autoComplete="off"
                               checked={postRadio === 1} onChange={(e) => {
                            setPage(0)
                            setPostRadio(parseInt(e.target.value));
                        }}/>
                        <label className="btn mx-1" htmlFor="all-posts">Новые</label>
                        <input checked={postRadio === 2} value={2} type="radio" className="btn-check"
                               name="options-base" id="following-posts"
                               autoComplete="off" onChange={(e) => {
                            setPage(0)
                            setPostRadio(parseInt(e.target.value));
                        }}/>
                        <label className="btn" for="following-posts">Подписки</label>
                    </div>
                </Col>
            </Row>
            {posts.map((post) => {
                return <WAPost key={post.id} {...post}/>
            })}
            <Row className="justify-content-center">
                <Col className="col-lg-6">
                    <ul className="pagination d-flex justify-content-center">
                        <li className="page-item"><a className="page-link" href="#" onClick={(e) => {
                            if (page !== 0) {
                                setPage(page - 1);
                            }
                        }}>&lt;</a></li>
                        <li className="page-item"><a className="page-link active">{page + 1}</a></li>
                        <li className="page-item"><a className="page-link" href="#" onClick={(e) => {
                            if (hasNext) {
                                setPage(page + 1);
                            }
                        }}>&gt;</a></li>
                    </ul>
                </Col>
            </Row>
        </Container>
    )
}