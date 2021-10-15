import React, { useEffect }  from "react";
import { useParams } from "react-router";
import {Form, Button } from 'react-bootstrap';



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
const [reservation, setReservation] = React.useState(false);
//console.log(params)
//console.log(params.id)
const mealId = parseInt(params.id)
//console.log(mealId)

const handelSubmit=(e)=>{
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
        setReservation(true)
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
    })
},[])


    return (
       
        <div>
        <img
           src={`../../../../src/client/assets/images/${meal.title}.jpg`}
           width="300"
           height="300"
           className="d-inline-block align-top"
           alt=""
         />
       
   <Form>
   <Form.Group className="mb-3">
    <h2>Reservation for {meal.title}</h2>
     <Form.Label>Number of guest</Form.Label>
     <Form.Control type="text" placeholder="Number of guest" onChange={(e)=> setGuests(e.target.value)}/>    
    </Form.Group>

   <Form.Group className="mb-3">
     <Form.Label>Contact Phonenumber </Form.Label>
     <Form.Control type="number" placeholder="contact phonenumber" onChange={(e)=> setPhoneNumber(e.target.value)}/>
   </Form.Group>

   <Form.Group className="mb-3">
     <Form.Label>Contact Name</Form.Label>
     <Form.Control type="text" placeholder="contact name" onChange={(e)=> setContactName(e.target.value)}/>      
   </Form.Group>
   <Form.Group className="mb-3">
     <Form.Label>Email </Form.Label>
     <Form.Control type="email" placeholder="email" onChange={(e)=> setEmail(e.target.value)}/>      
   </Form.Group>
   <Button variant="primary" type="submit" onClick={(e)=> handelSubmit(e)}>
     Submit
   </Button>
 </Form>
 </div>
)
        

}

export default AddMealReservation