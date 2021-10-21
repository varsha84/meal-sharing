const { request } = require("express");
const express = require("express");
const { response } = require("../app");
const router = express.Router();
const knex = require("../database");
//Returns all meals with GET api/meals/

router.get("/", async (request, response) => {
      try {
        // knex syntax for selecting things. Look up the documentation for knex for further info
        const parameters = request.query
        console.log(parameters);
        if (Object.keys(parameters).length > 0) {
          console.log("get meal by using diffrent types of parameter");

          //get meal by using diffrent types of parameter  
          if (request.query.maxPrice && !isNaN(parseInt(request.query.maxPrice)) && request.query.limit && !isNaN(parseInt(request.query.limit))) {
            await knex('meal').where('price', '<', parseInt(request.query.maxPrice))
            .limit(parseInt(request.query.limit))
            .then(data => response.json(data));
          }
          if (request.query.maxPrice && !isNaN(parseInt(request.query.maxPrice))) {
            await knex('meal').where('price', '<', parseInt(request.query.maxPrice))
              .then(data => response.json(data))
          }
          //Get meals that still has available reservations
          
            else if(request.query.availableReservations && request.query.availableReservations === 'true')
            console.log("availableReservations");
            const availableReservations = request.query.availableReservations;
           //console.log(availableReservations);
            if (availableReservations) {
            const coalesceres = knex.raw(
              "coalesce(sum(reservation.number_of_guests), 0) as total_reservation"
            );
          const totalReserveMeals = await knex("meal")
          .select("meal.id", "max_reservations", coalesceres)
          .leftJoin("reservation", "reservation.meal_id", "meal.id")
          .groupBy("meal.id");
          for (i = 0; i < totalReserveMeals.length; i++) {
          totalReserveMeals[i].total_reservation = parseInt(
          totalReserveMeals[i].total_reservation,
          10
      );
    }
    const availableMeals = totalReserveMeals.filter(
      (x) => x.max_reservations > x.total_reservation
    );
    return response.send(availableMeals);



          }//Get meals that partially match a title.
          else if (request.query.title) {
            await knex("meal").where('title', 'like', `%${request.query.title}%`)
              .then(rows => response.json(rows));
          }
          //Get meals that has been created after the date
          else if (request.query.createdAfter && !isNaN(parseInt(request.query.createdAfter))){
            await knex("meal").where('created_date', '>', request.query.createdAfter)
              .then(rows => response.json(rows));
          }
          // Only specific number of meals
          else if (request.query.limit){
            console.log("date")
            await knex("meal").select().limit(parseInt(request.query.limit))
              .then(rows => response.json(rows));
          }
          else{
            response.status(406).json({error:"wrong parameter"})
          }
        }

    else{
      const meals = await knex("meal").select();
      response.json(meals);
    }
  } catch (error) {
    throw error;
  }
});

//Adds a new meal	with api/meals/
router.post("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const addMeal = request.body;
    console.log("added new record :"+ addMeal);
     await knex("meal").insert(addMeal).then(
       data => response.json(data)
     );
  } catch (error) {
    throw error;
  }
});

//Returns meal by id with api/meals/2
router.get("/:id", async(request,response)=>{
  try{
    console.log("get meal by id:")
    await knex("meal")
    .where({id:request.params.id})
    .then(data =>response.json(data));
  }catch(error){
    throw error;
  }
});
//	Updates the meal by id with api/meals/2
  router.put("/:id", async(request,response)=>{
    try{
      console.log("update meal by id:")
      await knex("meal")
      .where({id:request.params.id})
      .update(request.body)
      .then(updateMeal => updateMeal? response.json("meal has updated") : response.json("Something went wrong"))
    }catch(error){
      throw error;
    }
  });
//	Deletes the meal by id with api/meals/2
router.delete("/:id", async(request,response)=>{
  try{
    console.log("delete meal by id:")
    await knex("meal")
    .where({id:request.params.id})
    .delete()
    .then(deleteMeal => deleteMeal? response.json("meal has deleted") : response.json("Something went wrong"))
  }catch(error){
    throw error;
  }
});



  module.exports = router;