import NoteApi from "./NoteApi.js";
import NoteView from "./NoteView.js";

const root = document.getElementById("root");
const view = new NoteView(root, {
  onAddNote() {
    console.log("add Note");
  },
  onSaveNote(title, text) {
    console.log(title, text);
  },
  onSelectColor(color) {
    console.log(color);
  },
  onNoteSelect(dataId){
    console.log(dataId);
  }
});

view.updateNoteList(NoteApi.getNoteLocal());
