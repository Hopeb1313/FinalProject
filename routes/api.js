const express = require('express' ); 
const router = express(); 
const path = require("path"); 
const statesController = require("../controller/statesController");

//sets up the different routes the user can go to 

router.route("/states").get(statesController.GetAllStates);

router.route("/states/:code").get(statesController.GetState);

router.route("/states/:code/funfact").get(statesController.GetFunFact); 

router.route("/states/:code/capital").get(statesController.GetCapital); 
router.route("/states/:code/nickname").get(statesController.GetNickname); 
router.route("/states/:code/population").get(statesController.GetPopulation); 
router.route("/states/:code/admission").get(statesController.GetAdmission); 
router.route("/states/:code/funfact").post(statesController.PostFunFacts); 
router.route("/states/:code/funfact").patch(statesController.UpdateState); 
router.route("/states/:code/funfact").delete(statesController.DeleteFunFact); 

module.exports = router;
