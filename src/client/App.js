import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import MealList from "./components/meals/mealList";
import CreateMeal from "./components/meals/createMeal";
import Footer  from "./components/footer/footer";
import {fetchMeals, fetchAvailableReservation, fetchReview} from "./helper.js"
import AddMealReservation from "./components/reservations/mealReservation";
import AddMealReview from "./components/review/mealReview";
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./components/main/main";
import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap";
import logo from './assets/images/logo2.png'
function App() {

  const [meals, setMeals] = React.useState([])
  const [availableReservations, setAvailableReservations] = React.useState([])
  const [search, setSearch] = React.useState("");
  const [reviews, setReviews] = React.useState([]);
    
  React.useEffect(()=>{
    if(search ===""){
      fetchMeals().then((data)=>{
            console.log(data);
            setMeals(data);
        })
        .catch((e)=>console.log(e))
    }
    else{    
      const searchMeal = meals.filter((meal)=> meal.title.toLowerCase().includes(search.toLowerCase()))
      setMeals(searchMeal);
    }
  }, [search])

  React.useEffect(()=>{
    fetchAvailableReservation()
    .then((data)=>{
      console.log(data);
      setAvailableReservations(data);
    })
    .catch((e)=>console.log(e))
  }, [])
  
  React.useEffect(()=>{
    fetchReview()
    .then((data)=> {
      console.log(data)
      setReviews(data)
    })
  }, [])

  return (
    <Router>
      <div fluid className="main-container">
        <Navbar bg="dark" variant="dark" sticky="top">
          <Container fluid>
            <Navbar.Brand href="#home">
              <img
                src={logo}
                width="40"
                height="40"
                className="d-inline-block align-top"
                alt=""
              />
            </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/meals">Meals</Nav.Link>
                <Nav.Link href="/createMeal">Create Meals</Nav.Link>
              </Nav>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e)=>setSearch(e.target.value)}/>
                
              </Form>
            </Navbar.Collapse>
          </Container>
    
        </Navbar>
      
        {<Switch>
        <Route exact path="/">
          <Main/>
        </Route> 
        <Route exact path="/meals">
          <MealList meals={meals} availableReservations = {availableReservations} reviews={reviews}/>
        </Route> 
        <Route exact path="/createMeal">
          <CreateMeal/>
        </Route> 
        <Route exact path={`/meals/:id`}>
          <AddMealReservation meals={meals}/>
        </Route> 
        <Route exact path={`/meals/:id/review`}>
          <AddMealReview meals={meals}/>
        </Route>
      </Switch>}
      <Footer/>
      </div>
    </Router>
    
  );
}

export default App;
