require('dotenv').config(); 
const connectDB = require("./config/DBconfig"); 
const express = require("express" ); 
const mongoose = require("mongoose");
const app = express(); 
const PORT = process.env.PORT || 3000; 
const path = require("path"); 

connectDB(); 

app.use(express.urlencoded({extended: false})) 
app.use(express.static(path.join(__dirname, "/public")))

app.use(express.json()); 
// Routes
app.use("/", require("./routes/root"));
// API Route
app.use("/", require("./routes/api"));

//catch all 

app.get("/*", (req, res) => {
    res.sendFile("./views/404page.html", { root: __dirname} )
}
) 


// connecting to db and local host 

mongoose.connection.once("open", () =>  {
console.log("Connected to DB")
} )
app.listen(PORT, () => {
    console.log(`Server is listening`)
})