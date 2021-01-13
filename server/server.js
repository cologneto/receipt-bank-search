const express = require("express");
const bodyParser = require("body-parser");
const sql = require("./models/db.js");

const app = express();
const port = process.env.PORT || 3030;



app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/search", (req, res) => {
    const text = req.body.text;
    const limit = req.body.limit;

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
        "LIMIT " + limit.start + ", " + limit.end , (err, result) => {
        
        result.map((company) => {
            for (const property in company) {
                company[property] = company[property].replace(/["]+/g, '');
            }

            return company;
        });
        
        if (err) {
            console.log("error: ", err);
        }

        console.log("pesho: ", result);
        res.json({ data: result });
    });


});

app.listen(port, () => {
    console.log("Server is running on port " + port + "." );
});