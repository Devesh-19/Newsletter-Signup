const express = require("express");
const bodyParser = require("body-parser");

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
    console.log(firstName, lastName, email);
    res.send("Thank you");
})

app.listen(3000, () =>
{
    console.log("Server is running at port 3000");
});