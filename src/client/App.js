import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import MealList from "./components/meals/mealList";
import Header from "./components/header/header";
import Footer  from "./components/footer/footer";
import {fetchMeals} from "./helper.js"
import AddMealReservation from "./components/reservations/mealReservation";
import AddMealReview from "./components/Review/mealReview";
//import mealReservationForm from "./components/reservations/mealReservation";
/* const meals = [{id:1,title: "chicken vindaloo", description: "indian spicy chicken curry", location: "valby", when: "2021-08-08 04:49:05", max_reservations: 5, price: 120.23, created_date: "2017-08-08 19:40:23"},
  {id: 2,title: "paneer curry", description: "indian spicy paneer curry", location:, when:, max_reservations:, price:, created_date:},
  {id:3,title:"", description;, location:, when:, max_reservations:, price:, created_date:},
  {id:4,title:, description;, location:, when:, max_reservations:, price:, created_date:}


]
 */
function App() {

  const [meals, setMeals] = React.useState([])
    
  React.useEffect(()=>{
        fetchMeals().then((data)=>{
            console.log(data);
            setMeals(data);
        })
        .catch((e)=>console.log(e))
    }, [])

  return (
    <Router>
      <div>
        <Header/>
        <nav>
          <ul>
            <li>
              <Link to="/">Meals</Link>
            </li>
          </ul>
        </nav>
      
      </div>
    {<Switch>
        <Route exact path="/">
          <MealList meals={meals}/>
        </Route> 
        <Route exact path={`/meals/:id`}>
          <AddMealReservation meals={meals}/>
        </Route> 
        <Route exact path={`/meals/:id/review`}>
          <AddMealReview meals={meals}/>
        </Route>
        
    </Switch>}
    <Footer/>
    </Router>
    
  );
}

export default App;
