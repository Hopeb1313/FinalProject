const { get } = require("mongoose");
const State = require("../models/States");
const data = {
    states: require("../models/states.json"),
    setStates(data) {
        this.states = data;

    },
}; 
//updates the local server to match the db 

async function getData() {
    for (let obj in data.states) {
      if (data.states[obj].funfacts == null) {
        data.states[obj].funfacts = [];
      }
      //MongoDB funfact
      try {
        const dbObj = await State.findOne({ stateCode: data.states[obj].code })
        if (dbObj != null) {
          for (const o of dbObj.funFacts) {
            if(!data.states[obj].funfacts.includes(o)){
                data.states[obj].funfacts.push(o);
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  async function syncData() {
    for (let obj in data.states) {
      if (data.states[obj].code == null) {
        
      }
      //MongoDB funfact
      try {
        const dbObj = await State.findOne({ stateCode: data.states[obj].code })
        if (dbObj != null) {
            dbObj.funFacts =data.states[obj].funfacts;
            const result = await dbObj.save();
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  
  getData();
  syncData();



//Get all states 
const GetAllStates = (req, res) => {
    const contig = req.query.contig;
    let states = data.states;
    if (contig === 'true') {
        states = states.filter(item => item.code != 'HI');
        states = states.filter(item => item.code != 'AK');
    }
    else if (contig === 'false') {
        states = states.filter(item => item.code == 'HI' || item.code == 'AK');
    }
    res.json(states);
};
//Get State 
const GetState = async (req, res) => {
    const stateCode = req.params.code;
    const state = filteredState(stateCode);

    if (!state) {
        return res
            .status(400)
            .json({ message: `No state matches Id ${state}` });
    }
    res.json(state);
};
 // gets random fact 

const GetFunFact = async (req, res) => {
    const code = req.params.code;
    const state = filteredState(code);

    const funfact = state.funfacts;
   if(funfact == null) {
     res.json()
   }
   else{
   let random = Math.floor(Math.random() * funfact.length);
     res.json(funfact[random]); 
   }
}
 // gets capital for the state code 

const GetCapital = async (req, res) => {
    const stateCode = req.params.code;
    const state = filteredState(stateCode);  // get the capital that matches that code 
    res.json("{ 'state': " + state.state + ", 'capital': " + state.capital_city + " }");
} 

const GetNickname = async (req, res) => {
    const stateCode = req.params.code;
    const state = filteredState(stateCode); // get the nickname that matches that code 
    res.json("{ 'state': " + state.state + ", 'nickname': " + state.nickname + " }");
}
 
const GetPopulation = async (req, res) => {
    const stateCode = req.params.code;
    const state = filteredState(stateCode); // gets the population that matches that code 
    res.json("{ 'state': " + state.state + ", 'population': " + state.population + " }");
}
const GetAdmission = async (req, res) => {
    const stateCode = req.params.code;
    const state = filteredState(stateCode); // gets the date that matches that code 
    res.json("{ 'state': " + state.state + ", 'Admission Date': " + state.admission_date + " }");
}
function filteredState(stateCode) { // function to filter by state code 
    return data.states.find((sta) => sta.code === stateCode);

}
const PostFunFacts = async (req, res) => { // create fun fact 
    if (!req.body.stateCode || !req.body.funFacts) {
      return res
        .status(400)
        .json({ message: "State Code & Fun Facts are required" });
    }
    try {
      const result = await State.create({
        stateCode: req.body.stateCode,
        funFacts: req.body.funFacts,
      });
      res.status(201).json(result);
      getData(); 
    } catch (err) {
      console.log(err);
    }
  }; 

  //Update 
const UpdateState = async (req, res) => {
    if (!req.body.stateCode || !req.body.funFacts) {
      return res.status(400).json({ message: "Id parameter is required. " });
    }
    const state = await State.findOne({ stateCode: req.body.stateCode }).exec();
  
    if (!state) {
      return res
        .status(204)
        .json({ message: `No state matches code ${req.body.stateCode}` });
    }
    if (req.body.stateCode) state.stateCode = req.body.stateCode;
    if (req.body.funFacts) state.funFacts = req.body.funFacts;
  
    const result = await state.save();
    res.json(result);
  };

  const DeleteFunFact = async (req, res) => { // deletes fun fact of the index 
    if (!req?.body.stateCode || !req.body.index) { 

      return res.status(400).json({ message: "stateCode & index is required. " });
    }
  
    const state = await State.findOne({ stateCode: req.body.stateCode }).exec();
  
    if (!state) {
      return res
        .status(204)
        .json({ message: `No state code matches code ${req.body.stateCode}` });
    }
    const index = parseInt(req.body.index)- 1 ; 
    
    let currFunFacts = state.funFacts; 
    if(currFunFacts.length >= index ){
        data.states.find((sta) => sta.code === req.body.stateCode).funfacts.splice(index, 1); 
        currFunFacts.splice(index, 1); 
        state.funFacts = currFunFacts; 
        const result = await state.save(); 
        getData(); 
        res.json(result);
    } 

   
  };


module.exports = {
    GetAllStates,
    GetState,
    GetFunFact,
    GetCapital,
    GetNickname,
    GetPopulation,
    GetAdmission,
    PostFunFacts, 
    UpdateState, 
    DeleteFunFact, 

}; 