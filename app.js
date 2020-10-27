const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { json } = require("body-parser");
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static("public"));

app.get("/", (req, res) =>
{
    res.sendFile(`${__dirname}/signup.html`);
})

app.post("/", (req,res) =>
{
    const firstName = req.body.fname
    const lastName = req.body.lname
    const email = req.body.email
    
    const data = {
        members: [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const listID = process.env.LIST_ID;
    const apiKey = process.env.API_KEY;

    const url = `https://us2.api.mailchimp.com/3.0/lists/${listID}`;

    const options = {
        method : "POST",
        auth : `devesh1:${apiKey}`
    }
    
    const request = https.request(url, options, response =>
        {
            if (response.statusCode === 200)
            {
                res.sendFile(`${__dirname}/success.html`);
            }
            else
            {
                res.sendFile(`${__dirname}/failure.html`);
            }

            response.on("data", d =>
            {
                console.log(JSON.parse(d));
            })
        })
    request.write(jsonData);
    request.end();

    console.log(res);

})

app.post("/failure", (req, res) =>
{
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, () =>
{
    console.log("Server is running at port 3000");
});