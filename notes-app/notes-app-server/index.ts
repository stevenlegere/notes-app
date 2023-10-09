import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express(); // create express app
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
}); // create prisma client

app.use(express.json()); // use express json middleware (parses the json body of the request)
app.use(cors(
    {
        origin: ["http://localhost:3000", "https://steves-notes-app.netlify.app/"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }
)); // use cors middleware (allows cross origin requests)

app.get("/api/notes", async (req, res) => {
    const notes = await prisma.note.findMany(); // get all notes from database
    res.json(notes); // send notes as json response;
});

app.listen(5001, () => {
    console.log("yay, server running on localhost:5001");
});

// Create a POST endpoint for creating a new note
app.post("/api/notes", async (req, res) => {
    const { title, content } = req.body; // get title and content from request body

    if (!title || !content) {
        return res.status(400).send("title and content fields required");
    }

    try {
        const note = await prisma.note.create({
            data: { title, content },
        });
        res.json(note);
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
});

// Create a PUT endpoint for updating a note
app.put("/api/notes/:id", async (req, res) => {
    const { title, content } = req.body; // get title and content from request body
    const id = parseInt(req.params.id); // get id from request params

    if (!title || !content) {
        return res.status(400).send("title and content fields required");
    }

    if (!id || isNaN(id)) {
        return res.status(400).send("Id must be a valid number");
    }

    try {
        const updatedNote = await prisma.note.update({
            where: { id },
            data: { title, content },
        });
        res.json(updatedNote);
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
});

// Create a DELETE endpoint for deleting a note
app.delete("/api/notes/:id", async (req, res) => {
    const id = parseInt(req.params.id); // get id from request params

    if (!id || isNaN(id)) {
        return res.status(400).send("Id must be a valid number");
    }

    try {
        await prisma.note.delete({
            where: { id },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).send("Something went wrong")
    }
});
