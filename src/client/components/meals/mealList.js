import React from "react";
import MealReservationForm from "../reservations/mealReservation";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Card, Button, Container, Row, Col} from 'react-bootstrap';
import { fetchRating, getImageName } from "../../helper";

import ChickenBiryani from '../../assets/images/ChickenBiryani.png'
import ChickenBurger from '../../assets/images/ChickenBurger.png'
import ChickenNuggets from '../../assets/images/ChickenNuggets.png'
import ChickenSandwich from '../../assets/images/ChickenSandwich.png'
import GrillChickenSticks from '../../assets/images/GrillChickenSticks.png'
import NaanBread from '../../assets/images/NaanBread.png'
import Paneertikkawraps from '../../assets/images/Paneertikkawraps.png'
import SaltedBakedFish from '../../assets/images/SaltedBakedFish.png'
import VegPizza from '../../assets/images/VegPizza.png'

 
function MealList(props){

  const [mealAvailable, setMealAvailable] = React.useState(false);

  function getStarRating(reviews, mealId){
    
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
    return parseFloat(totalRating/count).toFixed(1);
  }

  // review rating handling on backedn -> not displaying on card 
  function getRating(mealId){
    
    fetchRating(mealId)
    .then((data) => {
      let rating = Object.values(data[0])[0];
      if (rating !== null){
          rating =  parseFloat(rating).toFixed(1)
      }
      else{ return "No Reviews"}
      console.log(rating);
      return rating
    });
  }
  
  return(
    <Row className="meallist"> 
      { props.meals.map( (meal)=> 
        <Card className= "card-background" style={{ width: '18rem', margin: '10px' }} key={meal.id}>
          <Card.Img className="photo" variant="top" width="350" height="200" src={getImageName(meal.title)}/>
          <Card.Body>
            <Card.Title className="meal-title">{meal.title}</Card.Title>
            <Card.Text className="meal-description">
              {meal.description}
            </Card.Text>
            <div className="rating"> Price : {meal.price } </div>
            <div className="rating"> Location : {meal.location } </div>
            <span className="rating"> Rating : { getStarRating (props.reviews, meal.id) } </span>
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