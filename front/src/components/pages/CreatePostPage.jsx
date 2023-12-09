import React, {useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import {createUserInfo} from "../../App";
import {useNavigate} from "react-router-dom";

export default function CreatePostPage() {

    let [header, setHeader] = useState("");
    let [text, setText] = useState("");
    let [postPic, setPostPic] = useState(null);
    let navigate = useNavigate();

    async function updateProfile(e) {
        e.preventDefault()
        try {
            await axios.postForm(`http://localhost:8080/api/posts`, {
                header,
                text,
                image: postPic
            },{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            });
            let postsCount = parseInt(localStorage.getItem('postsCount')) + 1;
            localStorage.setItem('postsCount', postsCount);
            navigate("/profile")
        } catch(e) {
            if (e.response.status === 401) {
                localStorage.setItem('token', '');
                navigate("/");
            }
        }
    }

    const handleFileChange = (e) => {
        if (e.target.files) {
            setPostPic(e.target.files[0]);
        }
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col className="col-md-6 m-auto  border border-light shadow rounded p-3">
                    <form onSubmit={updateProfile}>
                        <div className="mb-3">
                            <label htmlFor="createPostHeader" className="form-label">Заголовок поста</label>
                            <input onChange={(e) => setHeader(e.target.value)} value={header} name="image" type="text"
                                   className="form-control" id="createPostHeader"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="updateProfileDescription" className="form-label">Текст поста</label>
                            <textarea value={text} name="description" className="form-control"
                                      id="updateProfileDescription" rows="3"
                                      onChange={(e) => setText(e.target.value)}></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="createPostPic" className="form-label">Добавить изображение к посту</label>
                            <input onChange={handleFileChange} name="image" type="file"
                                   accept="image/png, image/jpeg" className="form-control" id="createPostPic"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Создать</button>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}
