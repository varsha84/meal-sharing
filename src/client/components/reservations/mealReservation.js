import React, { useEffect }  from "react";
import { useParams } from "react-router";


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

    /* const postFormData = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReservation)
    } */

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
       
        <form action="" method="POST">
            <h1>{meal.title}</h1>
            <label for="number_of_guests">Number of guest</label>
            <input type="number" name="number_of_guests" onChange={(e) => setGuests(e.target.value) }/>


            <label for="contact_phonenumber">phone number</label>
            <input type="number" name="contact_phonenumber" onChange={(e) => setPhoneNumber(e.target.value) }></input>

            <label for="contact_name">contact name</label>
            <input type="" name="contact_name" onChange={(e) => setContactName(e.target.value) }></input>

            <label for="contact_email">email </label>
            <input type="email" name=" " onChange={(e) => setEmail(e.target.value) }></input>

            <input type="submit" value="Submit" onClick={(e)=>handelSubmit(e)}/>
        </form> 
        )


}

export default AddMealReservation