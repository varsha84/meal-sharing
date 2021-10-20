import React from "react";
import {Image, Container, Row} from 'react-bootstrap'

function Main(){
    return(
        <Row className="hero-image"> 
                <Image  className="hero" src="/public/images/main4.jpeg" alt="home image"/>
        <h1 id="text">Amazing and Delicious food</h1>
        <p id="text1">Enjoy everday</p>
        </Row>

    )
}
export default Main