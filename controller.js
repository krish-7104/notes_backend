import { pool } from "./database.js";

export async function getNotes(res) {
    try {
        const [notes] = await pool.query("SELECT * FROM NOTES");
        res.status(200).json({ notes });

    } catch (error) {
        console.error("Error: Getting Notes, ", error.sqlMessage);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export async function getNote(id, res) {
    try {
        const [note] = await pool.query("SELECT * FROM notes WHERE id=?", [id]);
        if (note.length === 0) {
            res.status(404).json({ message: "Note Not Found" });
        } else {
            res.status(200).json({ note });
        }
    } catch (error) {
        console.error("Error: Getting Note, ", error.sqlMessage);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export async function addNote(title, content, res) {
    try {
        const [resp] = await pool.query("INSERT INTO notes (title, content) VALUES (?, ?)", [title, content]);
        const insertedId = resp.insertId;
        const [note] = await pool.query("SELECT * FROM notes WHERE id=?", [insertedId]);
        res.status(201).json({ note: note[0], message: "Note Added Successfully" });
    } catch (error) {
        console.error("Error: Adding Note, ", error.sqlMessage);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export async function deleteNote(id, res) {
    try {
        const [resp] = await pool.query("delete from notes where id=?", [id])
        if (resp.affectedRows === 1) {
            res.status(200).json({
                message: "Note Deleted"
            })
        } else {
            res.status(400).json({
                message: "Note Not Found"
            })
        }
    } catch (error) {
        console.error("Error: Deleting Note, ", error.sqlMessage)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export async function updateNote(id, title, content, res) {
    try {
        const [resp] = await pool.query("UPDATE notes SET title = IFNULL(?, title), content = IFNULL(?, content) WHERE id = ?",
            [title, content, id])
        if (resp.affectedRows === 1) {
            res.status(200).json({
                message: "Note Updated"
            })
        } else {
            res.status(400).json({
                message: "Note Not Found"
            })
        }
    } catch (error) {
        console.error("Error: Updating Note, ", error.sqlMessage)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
} 