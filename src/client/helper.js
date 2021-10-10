function fetchMeals(){
    return fetch("http://localhost:5000/api/meals")
    .then((response=>response.json()))

}

export {fetchMeals}