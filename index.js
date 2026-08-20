const express = require('express');
const { connectToMongoDB } = require('./connect.js');
const urlRoute = require('./routes/url-router.js');
const URL = require('./models/url-model.js')
const app = express();
const PORT = 8001;

app.use(express.json());

connectToMongoDB("mongodb://localhost:27017/short-url").then(
    () => console.log("mongodb connected")
);

app.use("/url",urlRoute)

app.get("/:shortId",async (req,res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{$push : {
        visitHistory :{
            timeStamp : Date.now()
        }
    }});
    res.redirect(entry.redirectURL)
});

app.listen(PORT, () => {
    console.log(`Server started at Port:${PORT}`)
})
