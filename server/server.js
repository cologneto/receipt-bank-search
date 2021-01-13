const express = require("express");
const bodyParser = require("body-parser");
const sql = require("./models/db.js");

const app = express();
const port = process.env.PORT || 3030;



app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/search", (req, res) => {
    const text = req.body.text;
    const start = req.body.limitStart;
    const end = req.body.limitEnd;

    sql.query("SELECT CompanyName, " +
                    "CompanyNumber," +
                    "POBox," +
                    "AddressLine1," +
                    "AddressLine2," +
                    "PostTown," +
                    "County," +
                    "Country" +
        " FROM companies WHERE MATCH (CompanyName)\n" +
        " AGAINST ('+" + text + "' IN BOOLEAN MODE)" +
        "LIMIT " + start + ", " + end , (err, result) => {
        
        result.map((company) => {
            for (const property in company) {
                company[property] = company[property].replace(/["]+/g, '');
            }

            return company;
        });
        
        if (err) {
            console.log("error: ", err);
        }

        res.json({ data: result });
    });


});

app.listen(port, () => {
    console.log("Server is running on port " + port + "." );
});