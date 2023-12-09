import {Card, CardBody, Col, Row} from "react-bootstrap";
import {CiHeart} from "react-icons/ci";
import React, {useState} from "react";
import {FaHeart} from "react-icons/fa";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Post(props) {
    let [colorLike, setColorLike] = useState(props.liked ? "red" : "darkGrey");
    let navigate = useNavigate();

    function format_time(s) {
        const dtFormat = new Intl.DateTimeFormat('en-GB', {
            dateStyle: 'medium',
            timeStyle: 'medium',
            timeZone: 'Europe/Moscow'
        })
        return dtFormat.format(new Date(s))
    }

    async function like() {
        try {
            await axios.post(`http://localhost:8080/api/posts/${props.id}/like`, {},{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            });
            setColorLike("red");
        } catch(e) {
            if (e.response.status === 401) {
                localStorage.setItem('token', '');
                navigate("/");
            }
        }
    }

    async function dislike() {
        try {
            await axios.post(`http://localhost:8080/api/posts/${props.id}/dislike`, {}, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            });
            setColorLike("darkGrey");
        } catch(e) {
            if (e.response.status === 401) {
                localStorage.setItem('token', '');
                navigate("/");
            }
        }
    }

    return (
        <Row className="justify-content-center">
            <Col className="col-lg-6">
                <Card className="mb-4">
                    <CardBody>
                        <div className="media mb-3">
                            <img src={'http://localhost:8080' + props.json_pic}
                                 className="d-block rounded-circle object-fit-cover" alt="Изображение профиля"
                                 style={{height: "40px", width: "40px"}}/>
                            <div className="media-body ml-3">
                                {props.username}
                                <div className="text-muted small">{format_time(props.creationTimestamp)}</div>
                            </div>
                        </div>

                        <h1>{props.header}</h1>
                        <p>
                            {props.text}
                        </p>
                        <a href="javascript:void(0)" className="ui-rect ui-bg-cover"
                           style={{backgroundImage: `url('${"http://localhost:8080" + props.image_url}')`}}></a>
                    </CardBody>
                    <div className="card-footer">
                        <div className='d-inline-block'>
                            <FaHeart className="ci-heart" size={30} color={colorLike} onClick={(e) => {
                                if (colorLike === "red") {
                                    setColorLike("darkGrey");
                                    dislike();
                                }
                                else {
                                    setColorLike("red");
                                    like();
                                }
                            }}/>
                        </div>
                    </div>
                </Card>
            </Col>
        </Row>
    )
}