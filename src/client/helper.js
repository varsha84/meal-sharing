import ChickenBiryani from './assets/images/ChickenBiryani.png'
import ChickenBurger from './assets/images/ChickenBurger.png'
import ChickenNuggets from './assets/images/ChickenNuggets.png'
import ChickenSandwich from './assets/images/ChickenSandwich.png'
import GrillChickenSticks from './assets/images/GrillChickenSticks.png'
import NaanBread from './assets/images/NaanBread.png'
import Paneertikkawraps from './assets/images/Paneertikkawraps.png'
import SaltedBakedFish from './assets/images/SaltedBakedFish.png'
import VegPizza from './assets/images/VegPizza.png'


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

function getImageName(title){
    const imageName = title.replaceAll(" ", "")
    if (imageName==="ChickenBiryani"){
        return ChickenBiryani
    }
    if (imageName==="ChickenBurger"){
        return ChickenBurger
    }
    if (imageName==="ChickenNuggets"){
        return ChickenNuggets
    }
    if (imageName==="ChickenSandwich"){
        return ChickenSandwich
    }
    if (imageName==="GrillChickenSticks"){
        return GrillChickenSticks
    }
    if (imageName==="NaanBread"){
        return NaanBread
    }
    if (imageName==="Paneertikkawraps"){
        return Paneertikkawraps
    }
    if (imageName==="SaltedBakedFish"){
        return SaltedBakedFish
    }
    if (imageName==="VegPizza"){
        return VegPizza
    }
    return ChickenBiryani
        
  }

export {fetchMeals, fetchAvailableReservation, fetchReview, fetchRating,  getImageName}