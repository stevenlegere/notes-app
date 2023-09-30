import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express(); // create express app
const prisma = new PrismaClient(); // create prisma client

app.use(express.json()); // use express json middleware (parses the json body of the request)
app.use(cors()); // use cors middleware (allows cross origin requests)

app.get("/notes", async (req, res) => {
    const notes = await prisma.note.findMany(); // get all notes from database
    res.json(notes); // send notes as json response;
});

app.listen(5001, () => {
    console.log("yay, server running on localhost:5001");
});
