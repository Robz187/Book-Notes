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
    reviews = [];
    const result = await db.query("SELECT * FROM review") 
    result.rows.forEach((rows)=>{
        reviews.push(rows)
    });
}


//Server req res 
app.get("/",async(req,res)=>{
     await checkReviews();
     const data = {
        reviews:reviews,
        admin:admin,
     }
    console.log(data);
    res.render("index.ejs",data);

});
app.get("/login",async (req,res)=>{
    res.render("login.ejs");

});
app.post("/",async (req,res)=>{
const test = await db.query('SELECT * FROM login WHERE username = $1; ',[req.body.username])
const user =[];
test.rows.forEach(row=>{
    user.push(row);
});
console.log(req.body.password);
console.log(user[0].password);
if (req.body.password === user[0].password)
{
await checkReviews();    
const data = {
    reviews:reviews,
    admin:user[0].admin,
};  
console.log(data);   
res.render("index.ejs", data)
}else{
    res.render("login.ejs",{error:"Password incorrect try again"});
}
});

//Server port set 
app.listen(port, () =>{
console.log("Server is running...")
});