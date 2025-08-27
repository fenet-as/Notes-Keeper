export function saveNotes(notes) {
  localStorage.setItem("smart-notes", JSON.stringify(notes));
}

export function loadNotes() {
  return JSON.parse(localStorage.getItem("smart-notes") || "[]");
}
