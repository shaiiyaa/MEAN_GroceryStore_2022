const express = require("express");
const router = express.Router();
const category_dal = require("../data-access-layer/category-dal");
const fs = require('fs');

// Get all
router.get('', async (request, response) => {
   try {
    const categpories = await category_dal();
       response.json(categpories);
   } catch (error) {
    response.status(500).send(error.message);
   }
});


module.exports = router;