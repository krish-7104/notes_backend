import express from "express"
import { addNote, deleteNote, getNote, getNotes, updateNote } from "./controller.js";

const app = express();
app.use(express.json())

/* 
Routes to create
1. Get All Notes
2. Get A Note
3. Add Note
4. Update Note
5. Delete Note
*/

app.get("/notes/:id", async (req, res) => {
    const id = req.params.id
    await getNote(id, res)
})

app.get("/notes", async (req, res) => {
    await getNotes(res)
})

app.post("/addnote", async (req, res) => {
    const { title, content } = req.body
    await addNote(title, content, res)
})

app.delete("/deletenote/:id", async (req, res) => {
    const id = req.params.id
    await deleteNote(id, res)
})

app.patch("/updatenote/:id", async (req, res) => {
    const id = req.params.id
    const { title, content } = req.body
    await updateNote(id, title, content, res)
})

app.listen(8080, () => {
    console.log(`Server listening on ${8080}`)
})