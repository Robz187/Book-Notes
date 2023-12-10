import pg from "pg";
import express from "express";
import bodyParser from "body-parser";

// Datenbankverbindung
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "World",
    password: "robert001",
    port: 5432,
});

db.connect();

// Globale Variablen
let admin = false;
let reviews = [];

// Middleware
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Funktion zur Überprüfung und Aktualisierung der Liste von Bewertungen
async function checkReviews() {
    reviews = [];
    const result = await db.query("SELECT * FROM review");
    result.rows.forEach((rows) => {
        reviews.push(rows);
    });
}

// GET "/"-Route
app.get("/", async (req, res) => {
    await checkReviews();
    const data = {
        reviews: reviews,
        admin: admin,
    };
    res.render("index.ejs", data);
});

// GET "/login"-Route
app.get("/login", async (req, res) => {
    res.render("login.ejs");
});

// POST "/"-Route für Login
app.post("/", async (req, res) => {
    const test = await db.query('SELECT * FROM login WHERE username = $1; ', [req.body.username])
    const user = [];
    test.rows.forEach(row => {
        user.push(row);
    });
    if (req.body.password === user[0].password) {
        await checkReviews();
        const data = {
            reviews: reviews,
            admin: user[0].admin,
        };
        res.render("index.ejs", data)
    } else {
        res.render("login.ejs", { error: "Password incorrect try again" });
    }
});

// POST "/edit"-Route
app.post("/edit", async (req, res) => {
    res.render("edit.ejs");
});

// GET "/edit"-Route
app.get("/edit", async (req, res) => {
    const request = req.query;
    const datum = request.jahr + "-" + request.monat + "-" + request.tag;
    try {
        const insert = await db.query("INSERT INTO review (name,review,datum,isbn,rating) VALUES ($1,$2,$3,$4,$5); ",
            [request.name, request.review, datum, request.isbn, request.rating]);
        await checkReviews();
        const data = {
            reviews: reviews,
            admin: true,
        }
        res.render("index.ejs", data);
    } catch (error) {
        console.error(error.message)
    }
});

// POST "/delete"-Route
app.post("/delete", async (req, res) => {
    const item = req.body.isbn;
    try {
        const drop = await db.query("DELETE FROM review WHERE ISBN = $1", [item]);
        await checkReviews();
        const data = {
            reviews: reviews,
            admin: true
        }
        res.render("index.ejs", data)

    } catch (error) {
        console.error(error.message);
        prompt("Could not delete the Item check console for Info")
    }
});

// POST "/update"-Route
app.post("/update", async (req, res) => {
    const item = req.body.isbn;
    let data = {};
    reviews = [];
    try {
        const result = await db.query("SELECT * FROM review WHERE ISBN = $1 ", [item]);
        result.rows.forEach((rows) => {
            reviews.push(rows)
        });
        data = {
            reviews: reviews,
            admin: true,
        }
        console.log(data);
        res.render("update.ejs", data);
    } catch (error) {
        console.error(error.message);
        await checkReviews();
        data = {
            reviews: reviews,
            admin: true,
            error: "Could not edit post check console for Info "
        }
        res.render("index.ejs", data)
    }
});

// GET "/update"-Route
app.get("/update", async (req, res) => {
    const request = req.query;
    const datum = request.jahr + "-" + request.monat + "-" + request.tag;
    try {
        const result = await db.query("UPDATE review SET name = $1 , review = $2 , datum = $3 , isbn= $4, rating = $5 WHERE isbn = $6  ",
            [request.name, request.review, datum, request.isbn, request.rating, request.isbn])
        await checkReviews();
        admin = true;
        const data = {
            reviews: reviews,
            admin: admin,
        }
        res.render("index.ejs", data)
    } catch (error) {
        console.error(error.message);
        res.render("update.ejs", { error: "Could not Update TABLE please try again" })
    }
});

// Umleitung von "/login" auf "/"
app.get("/login", (req, res) => {
    res.redirect("/");
});

// Start des Servers auf dem angegebenen Port
app.listen(port, () => {
    console.log("Server is running...")
});
