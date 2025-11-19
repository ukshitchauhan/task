class Note {
    constructor(Text, Id) {
        this.Text = Text;
        this.Id = Id;
    }
}

class Notebook {
    constructor() {
        this.notes = [];
        this.notesContainer = document.querySelector("#notesContainer");
    }

    add(text) {
        text = text.trim();
        if (!text) return;

        const id = Date.now();
        const newNote = new Note(text, id);

        this.notes.push(newNote);
        this.render();
    }

    delete(id) {
        this.notes = this.notes.filter(note => note.Id !== id);
        this.render();
    }

    render() {
        this.notesContainer.innerHTML = "";

        this.notes.forEach(note => {
            let noteCard = document.createElement("div");
            noteCard.classList.add("note-card");

            let delBtn = document.createElement("button");
            delBtn.classList.add("note-delete");
            delBtn.textContent = "Delete";

            let p = document.createElement("p");
            p.textContent = note.Text;

            delBtn.addEventListener("click", () => this.delete(note.Id));

            noteCard.appendChild(delBtn);
            noteCard.appendChild(p);
            this.notesContainer.appendChild(noteCard);
        });
    }
}

let noteInp = document.querySelector("#noteInput");
let addBtn = document.querySelector("#addBtn");

let notebook = new Notebook();

addBtn.addEventListener("click", () => {
    notebook.add(noteInp.value);
    noteInp.value = "";
});
