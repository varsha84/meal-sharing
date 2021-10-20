import React from "react";
import {Image, Container, Row} from 'react-bootstrap'
import main from "../../assets/images/main4.png"

function Main(){
    return(
        <Container fluid>
        <Row className="hero-image"> 
            <Image src={main} alt="home image"/>
            <div class="hero-text">    
                <h1 className="title-text" >Amazing and Delicious food</h1>
                <p id="text">Enjoy everday</p>
            </div>
        </Row>
        </Container>
    )
}
export default Main