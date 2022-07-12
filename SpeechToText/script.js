try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
}
catch (e) {
    console.error(e);
    $('.no-browser-support').show();
    $('.app').hide();
}



var noteTextarea = $('#note-textarea');
var instructions = $('#recording-instructions');
var notesList = $('ul#notes');


var noteContent = '';

// Get all notes from previous sessions and display them.
var notes = getAllNotes();
renderNotes(notes);


//the recording will stop after a few seconds of silence (false).
recognition.continuous = false;

// Every time the Speech APi captures a line. 
recognition.onresult = function (event) {

    // SpeechRecognitionEvent object.
    var current = event.resultIndex;

    // Get what was said.
    var transcript = event.results[current][0].transcript;



    // Add the current transcript to the contents of our Note.
    var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

    if (!mobileRepeatBug) {
        noteContent += transcript;
        noteTextarea.val(noteContent);
    }
};



// Button for start speech


$('#start-talk').on('click', function (e) {
    if (noteContent.length) {
        noteContent += ' ';
    }
    recognition.start();
});



// Note Writing 


function renderNotes(notes) {
    var html = '';
    if (notes.length) {
        notes.forEach(function (note) {
            html += `<li class="note">
          <p class="content">${note.content}</p>
        </li>`;
        });
    }
    notesList.html(html);
}

function getAllNotes() {
    var notes = [];
    var key;
    for (var i = 0; i < localStorage.length; i++) {
        key = localStorage.key(i);
        console.log(i)
        console.log(key)

        if (key.substring(0, 5) == 'note-') {
            notes.push({
                date: key.replace('note-', ''),
                content: localStorage.getItem(localStorage.key(i))
            });
        }
    }
    console.log(notes)
    return notes;
}

