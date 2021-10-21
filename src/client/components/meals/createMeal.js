import React from 'react';
import {Form, Button, Modal} from 'react-bootstrap';
import {Alert} from 'react-bootstrap';
import { useHistory } from "react-router-dom";



function CreateMeal(){
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [when, setWhen] = React.useState("");
    const [maxReservations, setMaxReservations] = React.useState("");
    const [price, setPrice] = React.useState(0);
    // Alert successful
    const [show, setShow] = React.useState(true);
    //form validation
    const [validated, setValidated] = React.useState(false);

    //back to home page after submit
    let history = useHistory();
        
   
    //handle submit onSubmit

    const handleSubmit=(e)=>{
      e.preventDefault();
      
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
  
      setValidated(true);
  
    // create new meal object 

      const createNewMeal={
          title: title,
          description: description,
          location:location,
          when: when.replace("T", " ") + ":00",
          max_reservations : maxReservations,
          price : price,
          created_date: new Date().toISOString().slice(0, 10),

      }
      console.log("createNewMeal::"+ JSON.stringify(createNewMeal));

      //post or add a new meal object by fetching this api from backend
      fetch("/api/meals/", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(createNewMeal)
      })
      .then(response => response.json())
      .then(data => {
          console.log(data);
            alert("meal created successfully")
          history.push("/home")
      })
      .catch(e => console.log(e));  
    }


return(
    
     <Form className="all-form" noValidte validated={validated} onSubmit={(e) => handleSubmit(e)}>
        <h1>Create Meal</h1>
        <Form.Group className="mb-3">
            <Form.Label>Meal Title</Form.Label>
            <Form.Control type="text" placeholder="Meal Title" onChange={(e)=> setTitle(e.target.value)} required="true"/>    
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Description" onChange={(e)=> setDescription(e.target.value)} required="true"/>    
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" placeholder="Location" onChange={(e)=> setLocation(e.target.value)} required="true"/>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>When</Form.Label>
            <Form.Control type="datetime-local" placeholder="When" onChange={(e)=> setWhen(e.target.value)} required="true"/>
        </Form.Group>
        
        <Form.Group className="mb-3">
            <Form.Label>Maximum Reservation</Form.Label>
            <Form.Control type="number" placeholder="Maximum Reservation" onChange={(e)=> setMaxReservations(e.target.value)} required="true"/>      
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Price </Form.Label>
            <Form.Control type="number" placeholder="Price" onChange={(e)=> setPrice(e.target.value)} required="true"/>      
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
    </Form>
    )
}

export default CreateMeal