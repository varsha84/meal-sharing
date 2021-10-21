const { request } = require("express");
const express = require("express");
const { response } = require("../app");
const router = express.Router();
const knex = require("../database");

//Returns all reservations
router.get("/",async(request, response) =>{
    try {
        const reservations = await knex("reservation").select();
        response.json(reservations);
      }
      catch (error) {
      throw error;
    }
});
//Adds a new reservation with api/reservations/
router.post("/", async (request, response) => {
    try {
      // knex syntax for selecting things. Look up the documentation for knex for further info
      const addReservation = request.body;
      console.log("added new record :"+ addReservation);
       await knex("reservation").insert(addReservation).then(data => response.json(data));
    } catch (error) {
      throw error;
    }
  });
  //Returns reservation by id with api/reservations/2
  router.get("/:id", async(request,response)=>{
    try{
      console.log("get reservation by id:")
      await knex("reservation")
      .where({id:request.params.id})
      .then(data =>response.json(data));
    }catch(error){
      throw error;
    }
  });
  //Updates the reservation by id with api/reservations/2
    router.put("/:id", async(request,response)=>{
      try{
        console.log("update reservation by id:")
        await knex("reservation")
        .where({id:request.params.id})
        .update(request.body)
        .then(updateReser=> updateReser? response.json("reservation has updated") : response.json("Something went wrong"))
      }catch(error){
        throw error;
      }
    });
  //	Deletes the meal by id with api/reservations/2
  router.delete("/:id", async(request,response)=>{
    try{
      console.log("delete reservation by id:")
      await knex("reservation")
      .where({id:request.params.id})
      .delete()
      .then(deleteReser => deleteReser? response.json("reservation has deleted") : response.json("Something went wrong"))
    }catch(error){
      throw error;
    }
  });
  


 module.exports = router;