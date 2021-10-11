import React from "react";
import { useParams } from "react-router";

function AddMealReview(props){
    console.log("review here")
    const params = useParams();
    const mealId = params.id;

    const [meal, setMeal] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [stars, setStars] = React.useState(0);
    const [title, setTitle] = React.useState("");

    React.useEffect(()=>{
        fetch(`http://localhost:5000/api/meals/${mealId}`)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data[0])
            setMeal(data[0])
        })
        .catch((e)=>console.log(e))

    },[])
    
    const handelSubmit=(e)=>{
        console.log("submit handle");
        e.preventDefault();
        // new Review
        const newReview={
            title: title,
            description: description,
            meal_id : mealId,
            stars : stars,
            created_date: new Date().toISOString().slice(0, 10),

        }
        console.log("review::"+ newReview);

        fetch("/api/reviews/", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newReview)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            //setReservation(true)
        })
        .catch(e => console.log(e));
        
        
        console.log("i am done");
    }
    return (
        <form action="" method="POST">
           <h1>{meal.title}</h1>
           <label for="title">experience </label>
            <input type="text" name="title" onChange={(e)=> setTitle(e.target.value)}/>

            <label for="description">description </label>
            <input type="text" name="description" onChange={(e)=> setDescription(e.target.value)}/>

            <label for="stars">Rating</label>
            <input type="number" name="stars" onChange={(e)=> setStars(e.target.value)}></input>

            <input type="submit" value="Submit" onClick={(e)=> handelSubmit(e)}/>
        </form> 
    )

}
export default AddMealReview    