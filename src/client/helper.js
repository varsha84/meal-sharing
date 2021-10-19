function fetchMeals(){
    return fetch("http://localhost:5000/api/meals")
    .then((response=>response.json()))

}


function fetchAvailableReservation(){
    return fetch("http://localhost:5000/api/meals?availableReservations=true")
    .then((response=>response.json()))

}

function fetchReview(){
    return fetch("http://localhost:5000/api/reviews")
    .then((response=>response.json()))
    

}
function fetchRating(mealId){
    return fetch(`http://localhost:5000/api/reviews/meal/${mealId}`)
    .then((response=>response.json()))
        
}

export {fetchMeals, fetchAvailableReservation, fetchReview, fetchRating}