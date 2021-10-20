import React, { useEffect }  from "react";
import { useParams } from "react-router";
import {Form, Button, Modal} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import {getImageName} from "../../helper"

/*  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'React POST Request Example' })
};
fetch('https://reqres.in/api/posts', requestOptions)
    .then(response => response.json())
    .then(data => this.setState({ postId: data.id })); */
    

function AddMealReservation(props){
    const params = useParams();
    const [meal, setMeal] = React.useState("");
    const [guests, setGuests] = React.useState(0);
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [contactName, setContactName] = React.useState("")
    const [email, setEmail] = React.useState("");
    const [imageName, setImageName] = React.useState("");
//const [reservation, setReservation] = React.useState(false);

//form validation
    const [validated, setValidated] = React.useState(false);
//back to home page after submit

    let history = useHistory();
    const mealId = parseInt(params.id);

const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(e)
    
    const newReservation = {
        number_of_guests: guests,
        meal_id: mealId,
        created_date: new Date().toISOString().slice(0, 10),
        contact_phonenumber: phoneNumber,
        contact_name: contactName,
        contact_email: email,
    };
    console.log(newReservation);


    fetch("/api/reservations", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReservation)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        //setReservation(true)
        alert("reservation done")
        history.push("/")
    })
    .catch(e => console.log(e));
    console.log("i am done"); 
}


React.useEffect(()=>{
    //const findMeal = props.meals.filter((meal)=>meal.id === mealId)
    fetch(`http://localhost:5000/api/meals/${mealId}`)
    .then(response=>response.json())
    .then(data => {
        console.log(data)
        setMeal(data[0])
        setImageName(getImageName(data[0].title))
    })},[])
    
    return(
        <Form className="all-form" noValidte validated={validated} onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3">
         <h2>Reservation</h2>
         <img
                   src={imageName}
                   width="500"
                   height="300"
                   className="d-inline-block align-top"
                   alt=""
                 />
          <Form.Label>Number of guest</Form.Label>
          <Form.Control type="text" placeholder="Number of guest" onChange={(e)=> setGuests(e.target.value)} required/>    
         </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Contact Phonenumber </Form.Label>
          <Form.Control type="number" placeholder="contact phonenumber" onChange={(e)=> setPhoneNumber(e.target.value)} required/>
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Contact Name</Form.Label>
          <Form.Control type="text" placeholder="contact name" onChange={(e)=> setContactName(e.target.value)} required/>      
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email </Form.Label>
          <Form.Control type="email" placeholder="email" onChange={(e)=> setEmail(e.target.value)} required/>      
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        </Form>
    
        )

}





export default AddMealReservation