import React from "react";
import { useParams } from "react-router";
import {Form, Button, Row, Col, Container, Modal } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import {getImageName} from "../../helper"

function AddMealReview(props){
    console.log("review here")
    const params = useParams();
    const mealId = params.id;

    const [meal, setMeal] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [stars, setStars] = React.useState(0);
    const [title, setTitle] = React.useState("");
    const [imageName, setImageName] = React.useState("");

    //back to meal page after submit
    let history = useHistory();

    // Alert successful
    //const [show, setShow] = React.useState(true);
    //form validation
    const [validated, setValidated] = React.useState(false);

    React.useEffect(()=>{
        fetch(`http://localhost:5000/api/meals/${mealId}`)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data[0])
            setMeal(data[0])
            setImageName(getImageName(data[0].title))
        })
        .catch((e)=>console.log(e))

    },[])
    
    function handleSubmit(e){
        console.log("submit review handle");
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
        }
    
        setValidated(true);

        // new Review
        
        const newReview={
            title: title,
            description: description,
            meal_id : mealId,
            stars : stars,
            created_date: new Date().toISOString().slice(0, 10),

        }
        console.log("review::"+ newReview);
        console.log("review::"+ newReview.stars);

        fetch("/api/reviews/", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newReview)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            alert("Review Successfully submitted")
            history.push("/")
        })
        .catch(e => console.log(e));
        
        
        console.log("i am done");
    }
    return (
            
      <Form className="all-form" noValidte validated={validated} onSubmit={(e) => handleSubmit(e)}>
        <div className="form-title">{meal.title}</div>
        <img
            src={imageName}
            width="500"
            height="300"
            className="d-inline-block align-top"
            alt=""
          />
        <Form.Group  className="mb-3">
          <Form.Label>Experience</Form.Label>
          <Form.Control type="text" placeholder="Meal Experience" onChange={(e)=> setTitle(e.target.value)} required/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Meal Description </Form.Label>
          <Form.Control type="text" placeholder="description" onChange={(e)=> setDescription(e.target.value)} required/>
        </Form.Group>

        <Form.Group className="mb-3">            
          <Form.Label>Rating</Form.Label>
          <Form.Control type="number" placeholder="rating" onChange={(e)=> setStars(e.target.value)} required/>      
        </Form.Group>
    <Button variant="primary" type="submit" >Submit</Button>
    </Form>
 )
}
export default AddMealReview