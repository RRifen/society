import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Card, CardBody, Col, Row} from "react-bootstrap";
import Files from "./Files";
import {FaHeart} from "react-icons/fa";

export default function WAPost(props) {
    let navigate = useNavigate();

    function format_time(s) {
        const dtFormat = new Intl.DateTimeFormat('en-GB', {
            dateStyle: 'medium',
            timeStyle: 'medium',
            timeZone: 'Europe/Moscow'
        })
        return dtFormat.format(new Date(s))
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
                        {props.image_url ? <a href="#" className="ui-rect ui-bg-cover"
                                              style={{backgroundImage: `url('${"http://localhost:8080" + props.image_url}')`}}></a> : <></>}
                        {props.files.length > 0 && <Files files={props.files}/>}
                    </CardBody>
                    <div className="card-footer">
                        <div className='d-inline-block'>
                            <FaHeart className="ci-heart" size={30} color="darkGrey" />
                        </div>
                    </div>
                </Card>
            </Col>
        </Row>
    )
}
