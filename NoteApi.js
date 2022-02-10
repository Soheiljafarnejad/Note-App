const test = [
  {
    title: "title",
    text: "text-body",
    color: "green",
    date: "2021-01-10T13:04:23.484Z",
    id: 0,
  },
  {
    title: "title",
    text: "text-body",
    color: "green",
    date: "2019-08-10T13:04:23.484Z",
    id: 1,
  },
  {
    title: "title",
    text: "text-body",
    color: "green",
    date: "2020-07-10T13:04:23.484Z",
    id: 2,
  },
  {
    title: "title",
    text: "text-body",
    color: "green",
    date: "2022-01-10T13:04:23.484Z",
    id: 3,
  },
];

class NoteApi {
  static getNoteLocal() {
    const note = JSON.parse(localStorage.getItem("Note")) || test;
    return note.sort((a, b) => {
      return new Date(a.date) > new Date(b.date) ? -1 : 1;
    });
  }

  static saveNoteLocal(noteToSave) {
    const note = NoteApi.getNoteLocal();
    const existNote = note.find((item) => {
      return item.id == noteToSave.id;
    });

    // edited Notes
    if (existNote) {
      existNote.title = noteToSave.title;
      existNote.text = noteToSave.text;
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
