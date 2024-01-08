import {Button, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {createUserInfo} from "../../App";

export default function UpdateProfile() {
    let navigate = useNavigate();

    let [description, setDescription] = useState(localStorage.getItem('description'));
    let [picture, setPicture] = useState(null);

    async function updateProfile(e) {
        e.preventDefault()
        try {
            await axios.putForm(`http://localhost:8080/api/users`, {
                image: picture,
                description: description
            },{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            });
            let res = await axios.get('http://localhost:8080/api/users/profile', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            });
            createUserInfo(res);
            window.location.reload();
        } catch(e) {
            if (e.response.status === 401) {
                localStorage.setItem('token', '');
                navigate("/auth");
            }
        }
    }

    const handleFileChange = (e) => {
        if (e.target.files) {
            if (e.target.files[0].size > 104857600) {
                alert("File is too big!")
                e.target.value = ""
            }
            else {
                setPicture(e.target.files[0]);
            }
        }
    }

    return (
        <div className="modal fade" id="updateProfileModal" tabIndex="-1" aria-labelledby="updateProfileModalLabel"
             aria-hidden="true">
            <ModalDialog className="modal-dialog">
                <div className="modal-content">
                    <ModalHeader>
                        <ModalTitle className="fs-5" id="updateProfileModalLabel">Обновить профиль</ModalTitle>
                        <Button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></Button>
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={updateProfile}>
                            <div className="mb-3">
                                <label htmlFor="updateProfilePic" className="form-label">Изображение профиля</label>
                                <input onChange={handleFileChange} name="image" type="file"
                                       accept="image/png, image/jpeg" className="form-control" id="updateProfilePic"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="updateProfileDescription" className="form-label">Описание
                                    профиля</label>
                                <textarea value={description} name="description" className="form-control"
                                          id="updateProfileDescription" rows="3"
                                          onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>
                            <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">Обновить</button>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                    </ModalFooter>
                </div>
            </ModalDialog>
        </div>
    )
}