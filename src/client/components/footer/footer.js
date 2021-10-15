import React from "react";
import {Form, Card, Container, Col, Row, Navbar } from 'react-bootstrap';
export default function Footer(){
    return(
        
        <Container fluid className="footer" sticky="bottom">
        <Row>
            <Col className="footer-content">
            Contact Detail : 
            <br></br>
            Home Food Restaurent
            <br></br>
            Askevænget 10 st.tv
            <br></br>
            2830 Virum
            <br></br>
            <br></br>
            <small>Copyrights : @ Varsha Verma</small>
            </Col>
            <Col className="footer-content social-icons">
                
                    <a href="/"><i className="fab fa-facebook-f fa-2x"></i></a>
                
                
                    <a href="/"><i className="fab fa-twitter fa-2x"></i></a>
                
                
                    <a href="/"><i className="fab fa-instagram fa-2x"></i></a>
                
            </Col>
            <Col className="footer-content">
                <div class="ft-main-item">
                    <h2 class="ft-title">Stay Updated</h2>
                    <p>Subscribe to our newsletter to get our latest news.</p>
                    <form>
                        <input type="email" name="email" placeholder="Enter email address"/>
                        <input type="submit" value="Subscribe"/>
                    </form>
                </div>
            </Col>
            
           
        </Row >
    
        
        
    </Container >

       
    
            
    )

}