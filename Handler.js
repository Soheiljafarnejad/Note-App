import NoteApi from "./NoteApi.js";
import NoteView from "./NoteView.js";

class Handler {
  constructor(root) {
    this.note = [];
    this.view = new NoteView(root, this._Application());
    this._refreshNote();
    this.darkMode(root)
  }

  _refreshNote() {
    const allNote = NoteApi.getNoteLocal();
    this.note = allNote;
    this.activeNote = this.note[0];
    this.view.updateNoteList(allNote);
  }

  _Application() {
    return {
      onAddNote: () => {
        const newNote = {
          title: "Title...",
          text: "Text...",
          color: "blue",
        };
        NoteApi.saveNote(newNote);
        this._refreshNote();
      },
      onSaveNote: (title, text) => {
        NoteApi.saveNote({
          title: title,
          text: text,
          color: this.activeNote.color,
          id: this.activeNote.id,
        });
        this._refreshNote();
      },
      onSelectColor: (color) => {
        this.activeNote.color = color;
      },
      onNoteSelect: (noteId) => {
        const selectedNote = this.note.find((item) => item.id == noteId);
        this.activeNote = selectedNote;
        this.view.updateSelectNote(selectedNote);
      },
      onNoteDelete: (id) => {
        NoteApi.deleteNote(id);
        this._refreshNote();
      },
    };
  }

  darkMode(root) {
    if (localStorage.getItem("darkMode") == "true") {
      root.classList.add("dark--mode");
    } else {
      root.classList.remove("dark--mode");
    }
  }
}

export default Handler;
