import React from "react";
import MealReservationForm from "../reservations/mealReservation";

 function addMeal(){
  console.log("add meal called")

}

function addResevation(id){
 
 }
 
function MealList(props){

    return(
      <div>
          <ul>
              {props.meals.map((meal)=> 
                <li key={meal.id}>
                  <div>
                    <div>{meal.id}- {meal.title}</div>
                      <a href={`meals/${meal.id}`}>
                      <button onClick={() =>MealReservationForm(meal)}>Reservation</button></a>           
                  </div>
                </li>)}
          </ul>
          <button onClick={addMeal}>Add Meal</button>
      </div>
  )
}
export default MealList;