const express = require("express");
const bodyParser = require("body-parser");
const sql = require("./models/db.js");

const app = express();
const port = process.env.PORT || 3000

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    sql.query("SELECT * FROM companies WHERE MATCH (CompanyName)\n" +
        "    AGAINST ('+receipt bank' IN BOOLEAN MODE)", (err, result) => {
        if (err) {
            console.log("error: ", err);
        }

        console.log("pesho: ", result);
        res.json({ message: result });
    });


});

app.listen(3000, () => {
    console.log("Server is running on port " + port + "." );
});