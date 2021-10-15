import React from "react";
import { useParams } from "react-router";
import {Form, Button, Row, Col, Container } from 'react-bootstrap';


function AddMealReview(props){
    console.log("review here")
    const params = useParams();
    const mealId = params.id;

    const [meal, setMeal] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [stars, setStars] = React.useState(0);
    const [title, setTitle] = React.useState("");

    React.useEffect(()=>{
        fetch(`http://localhost:5000/api/meals/${mealId}`)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data[0])
            setMeal(data[0])
        })
        .catch((e)=>console.log(e))

    },[])
    
    const handelSubmit=(e)=>{
        console.log("submit handle");
        e.preventDefault();
        // new Review
        const newReview={
            title: title,
            description: description,
            meal_id : mealId,
            stars : stars,
            created_date: new Date().toISOString().slice(0, 10),

        }
        console.log("review::"+ newReview);

        fetch("/api/reviews/", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newReview)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            //setReservation(true)
        })
        .catch(e => console.log(e));
        
        
        console.log("i am done");
    }
    return (
        <Container fluid>
        <div>
             <img
                src={`../../../../src/client/assets/images/${meal.title}.jpg`}
                width="500"
                height="300"
                className="d-inline-block align-top"
                alt=""
              />
            
        <Form>
            <h3>Review for {meal.title}</h3>
        <Form.Group  className="mb-3">
          <Form.Label column sm="2">Experience</Form.Label>
          <Col sm="4">
          <Form.Control type="text" placeholder="Meal Experience" onChange={(e)=> setTitle(e.target.value)}/>
          </Col>    
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Meal Description </Form.Label>
          <Col sm="4">
          <Form.Control type="text" placeholder="description" onChange={(e)=> setDescription(e.target.value)}/>
          </Col>    
        </Form.Group>

        <Form.Group className="mb-3">            
          <Form.Label>Rating</Form.Label>
          <Col sm="4">
          <Form.Control type="number" placeholder="rating" onChange={(e)=> setStars(e.target.value)}/>      
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={(e)=> handelSubmit(e)}>
          Submit
        </Button>
      </Form>
      </div>
      </Container>

    )

}
export default AddMealReview    