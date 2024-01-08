import React, {useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function CreatePostPage() {

    let [header, setHeader] = useState("");
    let [text, setText] = useState("");
    let [postPic, setPostPic] = useState(null);
    let [files, setFiles] = useState([]);
    let navigate = useNavigate();

    async function createPost(e) {
        e.preventDefault()
        try {
            await axios.postForm(`http://localhost:8080/api/posts`, {
                header,
                text,
                image: postPic,
                files: files
            },{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            });
            let postsCount = parseInt(localStorage.getItem('postsCount')) + 1;
            localStorage.setItem('postsCount', postsCount);
            navigate("/profile")
        } catch(e) {
            console.log(e);
            if (e.response.status === 401) {
                localStorage.setItem('token', '');
                navigate("/auth");
            }
        }
    }

    const handleImageChange = (e) => {
        if (e.target.files) {
            if (e.target.files[0].size > 104857600) {
                alert("File is too big!")
                e.target.value = ""
            }
            else {
                setPostPic(e.target.files[0]);
            }
        }
    }

    const handleFilesChange = (e) => {
        if (e.target.files) {
            let commonSize = Array.from(e.target.files).reduce((a, b) => a + b.size, 0)
            if (commonSize > 104857600) {
                alert("Files is too big!")
                e.target.value = ""
            }
            else {
                setFiles([...e.target.files]);
            }
        }
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col className="col-md-6 m-auto  border border-light shadow rounded p-3">
                    <form onSubmit={createPost}>
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
                            <input onChange={handleImageChange} name="image" type="file"
                                   accept="image/png, image/jpeg" className="form-control" id="createPostPic"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="createPostFiles" className="form-label">Можете добавить файлы</label>
                            <input onChange={handleFilesChange} name="files" type="file" multiple
                                   accept=".pdf,.docx,.doc" className="form-control" id="createPostFiles"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Создать</button>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}
