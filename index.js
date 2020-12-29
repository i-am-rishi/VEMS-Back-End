const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createPool({ host: "localhost", user: "root", password: "", database: "databasetest" });

app.get("/", (req, res) => {
    res.send("Server is Working....");
    res.end();
})

app.get("/api/employee_details", (req, res) => {
    const sqlInsert = `SELECT * FROM VEMS;`
    db.query(sqlInsert, (err, result) => {
        if (err) res.send("Error :", err)
        else res.send(result);
    })
})

app.post("/api/insert", (req, res) => {

    const uid = uid_generator();
    const name = "" + req.body.name;
    const address = "" + req.body.address;
    const number = parseInt(req.body.number);
    const email = "" + req.body.email;

    const sqlInsert = `INSERT INTO vems (uid,name,address,mnumber,email) VALUES (${uid},?,?,?,?);`
    db.query(sqlInsert, [name, address, number, email], (err, result) => {
        if (err) res.send("Error :", err)
        else res.send(result);
    })
});

app.delete("/api/delete/:uid", (req, res) => {
    const uid = req.params.uid;
    const sqlDelete = `DELETE FROM vems WHERE uid=?;`
    db.query(sqlDelete, uid, (err, result) => {
        if (err) res.send(err);
        else res.send("It's Working");
    })
});

function uid_generator() {
    let x = new Date();
    let y = "" + x.getDate() + "" + x.getMonth() + "" + x.getDay() + "" + x.getHours() + "" + x.getSeconds();
    return y;
}

app.listen(3001, () => { console.log("Running on Port 3001....") });