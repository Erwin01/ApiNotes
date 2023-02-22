// VARIABLES GLOBALS
const saveButton = document.querySelector('#btnSave')
const titleInput = document.querySelector('#title')
const descriptionInput = document.querySelector('#description')
const notes_container = document.querySelector('#notes_container')
const deleteButton = document.querySelector('#btnDelete')



// CLEAR FORM AND HIDDEN BUTTON DELETE
function clearForm() {
    titleInput.value = '';
    descriptionInput.value = '';
    deleteButton.classList.add('hidden');
}


// DISPLAY NOTE INFORMATION / HIDDEN REMOVE BUTTON AND DELETE BUTTON NOTE ID
function displayNoteInform(note) {
    titleInput.value = note.title;
    descriptionInput.value = note.description;
    deleteButton.classList.remove('hidden');
    deleteButton.setAttribute('data-id', note.id);
    saveButton.setAttribute('data-id', note.id);
}



// GET NOTE BY ID
function getNoteById(id){
    fetch(`https://localhost:44384/api/notes/${id}`)
    .then(data => data.json())
    .then(response => displayNoteInform(response));
}



// POPULATE FORM NOTE BY ID
function populateForm(id) {
    getNoteById(id);
}



// ADD NEW NOTE
function addNote(title, description) {
    
    const body = {
        title: title,
        description: description,
        isVisible: true
    };

    fetch('https://localhost:44384/api/notes', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    })
    .then(data => data.json())
    .then(response => {
        clearForm();
        getAllNotes();
    });
}



// UPDATE NOTE
function updateNote(id, title, description) {
    
    const body = {
        title: title,
        description: description,
        isVisible: true
    };

    fetch(`https://localhost:44384/api/notes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    })
    .then(data => data.json())
    .then(response => {
        clearForm();
        getAllNotes();
    });
}



// DISPLAY NOTES
function displayNotes(notes) {

    let allNotes = '';

    notes.forEach(note => {
    const noteElement = 
        `
            <div class="note" data-id="${note.id}">
                <h3>${note.title}</h3>
                <p>${note.description}</p>
            </div>
        `
        allNotes += noteElement;
    });

    notes_container.innerHTML = allNotes;

    // add event listeners
    document.querySelectorAll('.note').forEach(note => {
        note.addEventListener('click', function() {
            populateForm(note.dataset.id);
        });
    });
}



// GET ALL NOTES
function getAllNotes() {
    fetch('https://localhost:44384/api/notes')
    .then(data => data.json())
    .then(response => displayNotes(response));
}



getAllNotes();


// DELETE NOTE
function deleteNote(id) {
    fetch(`https://localhost:44384/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json"
        }
    })
    .then(response => {
        clearForm();
        getAllNotes();
    });
}




// EVENTS LISTENERS SAVE/UPDATE AND DELETE
saveButton.addEventListener('click', function() {

    const id = saveButton.dataset.id;

    if (id) {
        updateNote(id, titleInput.value, descriptionInput.value);
    } else {
        addNote(titleInput.value, descriptionInput.value);
    }
});


deleteButton.addEventListener('click', function() {
    const id = deleteButton.dataset.id;
    deleteNote(id);
});