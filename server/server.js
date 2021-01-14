const Company = require("./models/company.model");

const express = require("express");
const bodyParser = require("body-parser");
const sql = require("./models/db.js");

const app = express();
const port = process.env.PORT || 3030;



app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, PUT, OPTIONS"
    );
    next();
});

app.post("/search", (req, res) => {
    const text = req.body.text;
    const limitStart = req.body.limitStart;
    const limitEnd = req.body.limitEnd;

    sql.query("SELECT SQL_CALC_FOUND_ROWS CompanyName, " +
                    "CompanyNumber," +
                    "PostCode," +
                    "AddressLine1," +
                    "AddressLine2," +
                    "PostTown," +
                    "County," +
                    "Country" +
        " FROM companies WHERE MATCH (CompanyName)\n" +
        " AGAINST ('+" + text + "' IN BOOLEAN MODE)" +
        "LIMIT " + limitStart + ", " + limitEnd , (err, result) => {
            if (err) {
                console.log("error: ", err);
            }

            sql.query('SELECT FOUND_ROWS() ;' , (error, count) => {

                if (err) {
                    console.log("error: ", error);
                }

                const companies = result.map((cmp) => {
                    for (const property in cmp) {
                        cmp[property] = cmp[property].replace(/["]+/g, '');
                    }

                    const company = new Company(cmp.CompanyName,
                                                cmp.CompanyNumber,
                                                cmp.PostCode,
                                                cmp.AddressLine1,
                                                cmp.AddressLine2,
                                                cmp.PostTown,
                                                cmp.County,
                                                cmp.Country);

                    return company;
                });

                res.json({ data: {companies, count} });
            });
    });
});

app.listen(port, () => {
    console.log("Server is running on port " + port + "." );
});