import express from "express";
import cors from "cors";

const app = express(); // create express app

app.use(express.json()); // use express json middleware (parses the json body of the request)
app.use(cors()); // use cors middleware (allows cross origin requests)

app.get("/api/motes", async (req, res) => {
    res.json({ message: "success!" });
});

app.listen(5001, () => {
    console.log("yay, server running on localhost:5001");
});