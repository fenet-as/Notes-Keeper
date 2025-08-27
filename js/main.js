import { loadNotes } from "./storage.js";
import { createNoteElement, addNote, deleteNote, updateNote } from "./notes.js";

const addBtn = document.getElementById("add-note-btn");
const appContainer = document.getElementById("app");


loadNotes().forEach(note => {
  const noteEl = createNoteElement(note.id, note.content, deleteNote, updateNote);
  appContainer.insertBefore(noteEl, addBtn);
});


addBtn.addEventListener("click", () => {
  addNote(appContainer, addBtn);
});
