import {Container} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Post from "./Post";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function PostsProfileContainer() {
    let navigate = useNavigate();
    let [posts, setPosts] = useState([]);
    const requestPosts = async () => {
        try {
            let newPosts = await axios.get("http://localhost:8080/api/posts/private", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            });
            setPosts(newPosts.data);
        } catch(e) {
            console.log(e.response);
            if (e.response.status === 401) {
                localStorage.setItem('token', '');
                navigate("/");
            }
        }

    }

    useEffect(() => {
        requestPosts()
    }, []);
    return (
        <Container className="posts-content">
            {posts.map((post) => {
                return <Post key={post.id} {...post}/>
            })}
        </Container>
    )
}