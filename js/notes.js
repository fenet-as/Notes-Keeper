import { saveNotes, loadNotes } from "./storage.js";

export function createNoteElement(id, content, onDelete, onUpdate) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("note-wrapper");
  wrapper.dataset.id = id;

  const textarea = document.createElement("textarea");
  textarea.classList.add("note");
  textarea.placeholder = "Your note here...";
  textarea.value = content;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = "🗑️";
  deleteBtn.title = "Delete note";

  deleteBtn.addEventListener("click", () => {
    if (confirm("Delete this note?")) {
      onDelete(id, wrapper);
    }
  });

  textarea.addEventListener("input", () => {
    onUpdate(id, textarea.value);
  });

  wrapper.appendChild(deleteBtn);
  wrapper.appendChild(textarea);

  return wrapper;
}

export function addNote(appContainer, addBtn) {
  const notes = loadNotes();
  const newNote = {
    id: Date.now(),
    content: ""
  };

  const noteElement = createNoteElement(
    newNote.id,
    newNote.content,
    deleteNote,
    updateNote
  );

  appContainer.insertBefore(noteElement, addBtn);
  notes.push(newNote);
  saveNotes(notes);
}

export function deleteNote(id, element) {
  const notes = loadNotes().filter(note => note.id !== id);
  saveNotes(notes);
  element.remove();
}

export function updateNote(id, content) {
  const notes = loadNotes();
  const note = notes.find(n => n.id === id);
  if (note) {
    note.content = content;
    saveNotes(notes);
  }
}
