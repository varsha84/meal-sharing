import React from "react";
import MealReservationForm from "../reservations/mealReservation";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";


 
function MealList(props){

  return(
    <div>
        <ul>
          {props.meals.map((meal)=> 
            <li key={meal.id}>
                {meal.title} 
                <Link to={`/meals/${meal.id}`}> Reserve </Link>
                <Link to={`/meals/${meal.id}/review`}> Review </Link>
                       
            </li>
          )}
        </ul>
    </div>
  )
}
export default MealList;