import "./components/css/posts.css"
import React, {useState} from "react";
import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import AuthorizationPage from "./components/pages/AuthorizationPage";
import RegistrationPage from "./components/pages/RegistrationPage";
import FeedPage from "./components/pages/FeedPage";
import {useSelector} from "react-redux";
import ProfilePage from "./components/pages/ProfilePage";
import SearchUsersPage from "./components/users/SearchUsersPage";
import Navigation from "./components/nav/Navigation";
import CreatePostPage from "./components/pages/CreatePostPage";

export const getUserInfo = () => {
    return {
        username: localStorage.getItem('username'),
        imgUrl: localStorage.getItem('imgUrl'),
        description: localStorage.getItem('description'),
        postsCount: localStorage.getItem('postsCount'),
        followersCount: localStorage.getItem('followersCount'),
    }
}

export const createUserInfo = (res) => {
    localStorage.setItem('username', res.data.username);
    localStorage.setItem('imgUrl', "http://localhost:8080" + res.data.img_url);
    localStorage.setItem('description', res.data.description);
    localStorage.setItem('postsCount', res.data.post_count);
    localStorage.setItem('followersCount', res.data.following_count);
}

function App() {
    let [users, setUsers] = useState([]);
    let [userQuery, setUserQuery] = useState("");
    let [hasNextUsers, setHasNextUsers] = useState(false);
    let [renderUsers, setRenderUsers] = useState(false);

    let navigationProps = {
        userQuery,
        setUserQuery,
        renderUsers,
        setRenderUsers
    }

    let searchUsersPageProps = {
        userQuery,
        setUserQuery,
        setUsers,
        setHasNextUsers,
        users,
        hasNextUsers,
        renderUsers
    }

    const isLoggedIn = useSelector(
        (state) => !!state.auth.authData.accessToken
    ) || localStorage.getItem('token');

    return (
<BrowserRouter>
    <Routes>
        <Route path="/" element={<AuthorizationPage/>}></Route>
        <Route path="/reg" element={<RegistrationPage/>}></Route>
        <Route path="/feed"
               element={isLoggedIn ? <Navigation {...navigationProps}><FeedPage/></Navigation> :
                   <Navigate to="/"/>}></Route>
        <Route path="/profile"
               element={isLoggedIn ? <Navigation {...navigationProps}><ProfilePage/></Navigation> :
                   <Navigate to="/"/>}></Route>
        <Route path="/users"
               element={isLoggedIn ? <Navigation {...navigationProps}><SearchUsersPage {...searchUsersPageProps}/></Navigation> :
                   <Navigate to="/"/>}></Route>
        <Route path="/create-post"
               element={isLoggedIn ? <Navigation {...navigationProps}><CreatePostPage {...searchUsersPageProps}/></Navigation> :
                   <Navigate to="/"/>}></Route>
    </Routes>
</BrowserRouter>
    );
}

export default App;
