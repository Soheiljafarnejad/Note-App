class NoteView {
  constructor(root, handler) {
    this.root = root;
    const { onAddNote, onSaveNote, onSelectColor, onNoteSelect, onNoteDelete } =
      handler;
    this.onAddNote = onAddNote;
    this.onSaveNote = onSaveNote;
    this.onSelectColor = onSelectColor;
    this.onNoteSelect = onNoteSelect;
    this.onNoteDelete = onNoteDelete;

    root.innerHTML = `
    <header class="container">
      <section class="header">
        <h1 class="header__title">Note App</h1>
        <div class="header__profile">
          <div class="icons--toggler">
            <svg class="icon light toggler">
              <use xlink:href="img/sprite-icon.svg#dark-mode"></use>
            </svg>
            <svg class="icon dark toggler">
              <use xlink:href="img/sprite-icon.svg#light-mode"></use>
            </svg>
          </div>
          <div class="icons--avatar">
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/Soheiljafarnejad">
          <img class="avatar dark" src="img/avatar-dark.png" alt="avatar" />
          <img class="avatar light" src="img/avatar-light.png" alt="avatar" />
          </a>
          </div>
        </div>
      </section>
    </header>

    <main class="cart--items container"></main>

    <section class="backdrop">
      <form class="backdrop__form container">
        <h2>What should I keep?</h2>
        <input class="form title" type="text" placeholder="Title..." />
        <textarea class="form text" placeholder="Text..."></textarea>
        <div class="form__footer">
          <button type="button" class="btn btn--cancel">Cancel</button>
          <button type="button" class="btn btn--save">Save</button>
        </div>
      </form>
      <div class="backdrop__color">
        <div class="colors container">
          <div class="color color--orange" data-color="orange"></div>
          <div class="color color--blue" data-color="blue"></div>
          <div class="color color--green" data-color="green"></div>
          <div class="color color--pink" data-color="pink"></div>
        </div>
      </div>
    </section>

    <footer class="footer container">
      <div class="icons--add">
        <svg class="icon--large light add--note">
          <use xlink:href="img/sprite-icon.svg#add"></use>
        </svg>
        <svg class="icon--large dark add--note">
          <use xlink:href="img/sprite-icon.svg#add-dark"></use>
        </svg>
      </div>

      <article class="footer__menu">
        <div class="icons--pin">
          <svg class="icon light">
            <use xlink:href="img/sprite-icon.svg#pin"></use>
          </svg>
          <svg class="icon dark">
            <use xlink:href="img/sprite-icon.svg#pin-dark"></use>
          </svg>
        </div>

        <div class="bar"></div>
        <div class="icons--search">
          <svg class="icon light">
            <use xlink:href="img/sprite-icon.svg#search"></use>
          </svg>
          <svg class="icon dark">
            <use xlink:href="img/sprite-icon.svg#search-dark"></use>
          </svg>
        </div>
      </article>
    </footer>
    `;

    const darkMode = this.root.querySelectorAll(".toggler");
    const backdrop = this.root.querySelector(".backdrop");
    const addBtnNote = this.root.querySelectorAll(".add--note");

    // darkMode
    darkMode.forEach((item) => {
      item.addEventListener("click", () => {
        this.root.classList.toggle("dark--mode");
      });
    });

    backdrop.addEventListener("click", (e) => {
      const classItem = e.target.classList;

      // edit and save Note
       if (classItem.contains("btn--save")) {
        const inputTitle = this.root.querySelector(".title").value;
        const inputText = this.root.querySelector(".text").value;
        this.onSaveNote(inputTitle, inputText);
      }

      // close backdrop
      else if (classItem.contains("btn--cancel")) {
        backdrop.style.display = "none";
      }
      // select color
      else if (classItem.contains("color")) {
        this.onSelectColor(e.target.dataset.color);
      }
    });

        // add new Note
    addBtnNote.forEach((item) => {
      item.addEventListener("click", () => {
        this.onAddNote();
      });
    });
  }

  _crateHtmlNode(title, text, date, color, id) {
    const dateIsoString = new Date(date)
      .toLocaleString("en", {
        dateStyle: "medium",
        timeStyle: "short",
      })
      .split(",");
    const temp = dateIsoString;
    temp.splice(1, 1);
    const _Date = temp.join(",");

    return `
      <article class="cart__item color--${color}" data-id="${id}">
      <header class="cart__header">
        <h2 class="cart__title">${title}</h2>
      </header>
      <div class="cart__body">
        <p class="cart__text">${text}</p>
      </div>
      <footer class="cart__footer">
        <p class="cart__description">${_Date}</p>
        <div class="icons--remove" data-id="${id}">
          <svg class="icon light">
            <use xlink:href="img/sprite-icon.svg#trash"></use>
          </svg>
          <svg class="icon dark">
            <use xlink:href="img/sprite-icon.svg#trash-dark"></use>
          </svg>
        </div>
      </footer>
    </article>
      `;
  }

  updateNoteList(notes) {
    const noteContainer = this.root.querySelector(".cart--items");
    noteContainer.innerHTML = "";
    let result = ``;
    notes.forEach((item) => {
      const { title, text, date, color, id } = item;
      result += this._crateHtmlNode(title, text, date, color, id);
    });
    noteContainer.innerHTML = result;

    this.root.querySelectorAll(".cart__item").forEach((item) => {
      item.addEventListener("click", () => {
        this.onNoteSelect(item.dataset.id);
      });
    });

    this.root.querySelectorAll(".icons--remove").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        this.onNoteDelete(item.dataset.id);
      });
    });
  }

  updateSelectNote(note) {
    this.root.querySelector(".title").value = note.title;
    this.root.querySelector(".text").value = note.text;
    this.root.querySelector(".backdrop").style.display = "flex";
  }
}

export default NoteView;
