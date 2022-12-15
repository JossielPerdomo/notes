const Note = require('../models/note');

const renderNoteForm = (req, res) => {
    res.render('notes/new-note');
}

const createNewNote = async(req, res) => {
    const { title, description } = req.body;

    if(title.length < 1) {
        req.flash('error_msg', 'Title is required');
        return res.redirect('/notes/add');
    }

    if(description < 1) {
        req.flash('error_msg', 'Description is required');
        return res.redirect('/notes/add');
    }

    const note = new Note({title, description});
    note.user = req.user.id;
    await note.save();
    req.flash('success_msg', 'Note added successfully');
    res.redirect('/notes');
}

const renderNotes = async(req, res) => {
    const notes = await Note.find({ user: req.user.id }).lean();
    res.render('notes/all-notes', { notes });
}

const renderUpdateForm = async(req, res) => {
    const note = await Note.findById(req.params.id).lean();
    if(note.user !== req.user.id){
        req.flash('error_msg','Not authorized');
        return res.redirect('/notes');
    }
    res.render('notes/edit-note', { note });
}

const updateNotes = async(req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });

    req.flash('success_msg', 'Note updated successfully');
    res.redirect('/notes');
}

const deleteNote = async(req, res) => {
    await Note.findOneAndDelete(req.params.id);
    req.flash('success_msg', 'Note deleted successfully');
    res.redirect('/notes');
}

module.exports = {
    renderNoteForm,
    createNewNote,
    renderNotes,
    renderUpdateForm,
    updateNotes,
    deleteNote
}