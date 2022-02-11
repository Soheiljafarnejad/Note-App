class NoteApi {
  static getNoteLocal() {
    const note = JSON.parse(localStorage.getItem("Note")) || [];
    return note.sort((a, b) => {
      return new Date(a.date) > new Date(b.date) ? -1 : 1;
    });
  }

  static saveNote(noteToSave) {
    const note = NoteApi.getNoteLocal();
    const existNote = note.find((item) => {
      return item.id == noteToSave.id;
    });

    // edited Notes
    if (existNote) {
      existNote.title = noteToSave.title;
      existNote.text = noteToSave.text;
      existNote.color = noteToSave.color;
      existNote.date = new Date().toISOString();
    }

    // new Notes
    else {
      noteToSave.id = new Date().getTime();
      noteToSave.date = new Date().toISOString();
      note.push(noteToSave);
    }
    // save Note To Local
    localStorage.setItem("Note", JSON.stringify(note));
  }

  static deleteNote(id) {
    const note = NoteApi.getNoteLocal();
    const deletedNote = note.filter((item) => item.id != id);
    localStorage.setItem("Note", JSON.stringify(deletedNote));
  }
}

export default NoteApi;
