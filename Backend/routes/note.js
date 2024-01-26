const express = require('express');

const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
//Route 1:Get all notes using: GET "/api/note/fetchallnotes",Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const note = await Note.find({ user: req.user.id })
        res.json(note);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})
//Route 2:Add a new note using: POST "/api/note/addnote",Login required
router.post('/addnote', fetchuser, [body('title', 'Title must be at least 3 characters').isLength({ min: 3 }),
body('description', 'Description must be in at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description,newsUrl,tag } = req.body;
        //If there are errors, return Bad request and the errors
        console.log(newsUrl);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //creating new notes
        const note = new Note({
            title, description, newsUrl,tag, user: req.user.id
        })
        const saveNote = await note.save();
        res.json(saveNote);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
//Route 3:Update an existing Note using: POST "/api/note/updatenote",Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, newsUrl,tag } = req.body;
    try {
        //Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (newsUrl) { newNote.newsUrl = newsUrl };
        if (tag) { newNote.tag = tag };
        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };

        //User id matches with owner of note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
//Route 4:Delete an existing Note using: Delete "/api/note/deletenote",Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };

        //User id matches with owner of note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;