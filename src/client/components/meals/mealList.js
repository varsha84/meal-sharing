import React from "react";
import MealReservationForm from "../reservations/mealReservation";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Button, Container, Row, Col} from 'react-bootstrap'

 
function MealList(props){

  const [mealAvailable, setMealAvailable] = React.useState(false);

  function getStarRating(reviews, mealId){
    console.log(reviews)
    let totalRating = 0
    let count = 0
    reviews.forEach(review => {
      if (review.meal_id === mealId){
        totalRating = totalRating + review.stars
        count = count + 1
      }
      
    })
    if (count === 0){
      return "No reviews"
    }
    return totalRating/count;
  }

  console.log(props.availableReservations)
  
  return(
    <Row> 
      { props.meals.map( (meal)=> 
        <Card style={{ width: '18rem', margin: '10px' }} key={meal.id}>
          <Card.Img variant="top" width="350" height="250" src={`../../../../src/client/assets/images/${meal.title}.jpg`}/>
          <Card.Body>
            <Card.Title>{meal.title}</Card.Title>
            <Card.Text>
              {meal.description}
            </Card.Text>
            
            <span> Rating : {getStarRating(props.reviews, meal.id)}</span>
            <div className="button-row">
            {(props.availableReservations.filter((data) => data.id === meal.id).length > 0)? 
              <Button variant="success"  size="sm" href={`/meals/${meal.id}`}> Reserve </Button> : 
              <Button variant="danger"  size="sm" href="#">SoldOut</Button>
            }
            
            <Button  size="sm" href={`/meals/${meal.id}/review`}> Review </Button>
            </div>
          </Card.Body>
        </Card>
      )}
    </Row>
  )
}
export default MealList;