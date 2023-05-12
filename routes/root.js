const express = require('express' ); 
const router = express(); 
const path = require("path"); 
const statesController = require("../controller/statesController");


// sends user to the index html file 
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "index.html"));
  });

  



module.exports = router; 

