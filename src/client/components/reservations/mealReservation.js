import React  from "react";
function handelSubmit(){
 //const newReservation = MealReservationForm(props);
 let newReserve = props.meal.concat(newReservation);
 setMeals(newReserve);

/*  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'React POST Request Example' })
};
fetch('https://reqres.in/api/posts', requestOptions)
    .then(response => response.json())
    .then(data => this.setState({ postId: data.id })); */
    
}

function MealReservationForm(props){

    return (
        
       
        <form action="" method="POST">
            <label for="meal_id">meal id</label>
            <input type="text" name="meal_id"/>

            <label for="number_of_guests">Number of guest</label>
            <input type="number" name="number_of_guests"/>

            <label for="cteated_date">created date</label>
            <input type="date" name="cteated_date"/>

            <label for="contact_phonenumber">phone number</label>
            <input type="number" name="contact_phonenumber"></input>

            <label for="contact_name">contact name</label>
            <input type="" name="contact_name"></input>

            <label for="contact_email">email </label>
            <input type="email" name=""></input>

            <input type="submit" value="Submit" />
        </form> 
        )


}

export default MealReservationForm