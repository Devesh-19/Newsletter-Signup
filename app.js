const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) =>
{
    res.sendFile(`${__dirname}/signup.html`);
})

app.listen(3000, () =>
{
    console.log("Server is running at port 3000");
});