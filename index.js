import pg from "pg";
import  express  from "express";
import bodyParser from "body-parser";

//database install

const db = new pg.Client({
   user:"postgres",
   host:"localhost",
   database:"World",
   password:"robert001",
   port:5432,
});

db.connect();

//Global Variables
let admin= false;
let reviews=[];

//Middleware
const app = express();
const port=3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

// Functions
async function checkReviews(){
    const result = await db.query("SELECT * FROM review") 
    result.rows.forEach((rows)=>{
        reviews.push(rows)
    });
}


//Server req res 
app.get("/",async(req,res)=>{
    await checkReviews();
    console.log(reviews);
    res.render("index.ejs");

});
app.get("/login",async (req,res)=>{
    res.render("login.ejs");

});

//Server port set 
app.listen(port, () =>{
console.log("Server is running...")
});