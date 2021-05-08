console.log("hello world");

showNotes();
let addBtn = document.getElementById('addBtn');

addBtn.addEventListener("click", function () {

    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem("notes");

    if (notes == null) {

        notesObj = [];

    } else {

        notesObj = JSON.parse(notes);

    }

    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }

    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    console.log(notesObj);
    showNotes();

});

function showNotes() {

    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let noteCard = document.getElementById('notes')

    let html = "";

    notesObj.forEach(function (element, index) {

        html += `
      <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
              <div class="card-body">
                  <h5 class="card-title"> ${element.title}</h5>
                  <p class="card-text"> ${element.text}</p>
                  <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
              </div>
          </div>`;

    });

    if (notesObj.length == 0) {
        noteCard.innerHTML = `<h3>NoThing to Show ! Add your NoTes</h3>`;
    }
    else {
        noteCard.innerHTML = html;
    }


}

function deleteNote(index) {

    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();

}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let val = search.value;
    console.log("input event fired", val);
    let noteCard = document.getElementsByClassName('noteCard');

    Array.from(noteCard).forEach(function (element) {

        let txt = element.getElementsByTagName('p')[0].innerText;
        if (txt.includes(val)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }

    });

});