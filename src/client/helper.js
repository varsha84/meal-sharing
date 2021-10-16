function fetchMeals(){
    return fetch("http://localhost:5000/api/meals")
    .then((response=>response.json()))

}


function fetchAvailableReservation(){
    return fetch("http://localhost:5000/api/meals?availableReservations=true")
    .then((response=>response.json()))

}

function fetchSearchMeal(){
    return fetch("http://localhost:5000/api/meals")
    .then((response=>response.json()))
}

export {fetchMeals, fetchAvailableReservation, fetchSearchMeal}