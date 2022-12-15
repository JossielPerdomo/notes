const { Router } = require('express');
const router = Router();
const { renderNoteForm, createNewNote, renderNotes, renderUpdateForm, updateNotes, deleteNote } = require('../controllers/notesController');

const { isAuthenticated } = require('../helpers/auth');

//New note
router.get('/notes/add', isAuthenticated, renderNoteForm);
router.post('/notes/new-note', isAuthenticated, createNewNote);

//Get all notes
router.get('/notes', isAuthenticated, renderNotes);

//Update notes
router.get('/notes/edit/:id', isAuthenticated, renderUpdateForm);
router.put('/notes/edit/:id', isAuthenticated, updateNotes);

//Delete notes
router.delete('/notes/delete/:id', isAuthenticated, deleteNote);

module.exports = router;