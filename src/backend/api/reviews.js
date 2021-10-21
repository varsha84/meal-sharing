const { request } = require("express");
const express = require("express");
const { response } = require("../app");
const router = express.Router();
const knex = require("../database");

//Returns all review
router.get("/",async(request, response) =>{
    try {
        const reviews = await knex("review").select();
        response.json(reviews);
      }
      catch (error) {
      throw error;
    }
});
//Adds a new review with api/reviews/
router.post("/", async (request, response) => {
    try {
      // knex syntax for selecting things. Look up the documentation for knex for further info
      const addreview = request.body;
      console.log("added new record :"+ addreview);
       await knex("review").insert(addreview).then(
         data => response.json(data)
       );
    } catch (error) {
      throw error;
    }
  });
//Returns meal by id with api/reviews/meal/2
router.get("/meal/:id", async(request,response)=>{
  try{
    console.log("get all review by meal id:")
    await knex("review")
    .where({meal_id: request.params.id})
    .avg("stars")
    .then(data =>response.json(data));


  }catch(error){
    throw error;
  }
});


  //Returns review by id with api/reviews/2
  router.get("/:id", async(request,response)=>{
    try{
      console.log("get review by id:")
      await knex("review")
      .where({id:request.params.id})
      .then(data =>response.json(data));
    }catch(error){
      throw error;
    }
  });
  //Updates the review by id with api/reviews/2
    router.put("/:id", async(request,response)=>{
      try{
        console.log("update review by id:")
        await knex("review")
        .where({id:request.params.id})
        .update(request.body)
        .then(updateReser=> updateReser? response.json("review has updated") : response.json("Something went wrong"))
      }catch(error){
        throw error;
      }
    });
  //Deletes the review by id with api/reviews/2
  router.delete("/:id", async(request,response)=>{
    try{
      console.log("delete review by id:")
      await knex("review")
      .where({id:request.params.id})
      .delete()
      .then(deleteReview => deleteReview? response.json("review has deleted") : response.json("Something went wrong"))
    }catch(error){
      throw error;
    }
  });
  













 module.exports = router;