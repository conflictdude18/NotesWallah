// Keeps all notes in localStorage for demo purpose
const notesForm = document.getElementById('notesForm');
const notesList = document.getElementById('notesList');
const themeToggleBtn = document.getElementById('themeToggle');

function setTheme(dark) {
    if (dark) {
        document.body.classList.add('dark');
        themeToggleBtn.textContent = 'Switch to Light Mode';
    } else {
        document.body.classList.remove('dark');
        themeToggleBtn.textContent = 'Switch to Dark Mode';
    }
    localStorage.setItem('darkMode', dark);
}

// Load preference
const savedTheme = localStorage.getItem('darkMode') === 'true';
setTheme(savedTheme);

themeToggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark');
    setTheme(!isDark);
});

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notesWallahNotes') || '[]');
    notesList.innerHTML = '';  // Clears the notes inside, but keeps the container div itself.

    notes.forEach((note, index) => {
        const noteCard = document.createElement('div');
        noteCard.className = 'note-card';

        const title = document.createElement('h3');
        title.textContent = `${note.subject} - ${note.topic}`;

        const content = document.createElement('p');
        content.textContent = note.content;

        // Download button
        const downloadLink = document.createElement('a');
        downloadLink.className = 'download-btn';
        downloadLink.textContent = 'Download';
        downloadLink.href = URL.createObjectURL(new Blob([note.content], { type: 'text/plain' }));
        downloadLink.download = `${note.subject}_${note.topic}.txt`;

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.marginLeft = '0.5rem';
        deleteBtn.style.background = '#c0392b';
        deleteBtn.style.color = '#fff';
        deleteBtn.style.border = 'none';
        deleteBtn.style.borderRadius = '3px';
        deleteBtn.style.padding = '0.4rem 0.8rem';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.onclick = function () {
            notes.splice(index, 1); // Remove from array
            localStorage.setItem('notesWallahNotes', JSON.stringify(notes)); // Update storage
            loadNotes(); // Refresh the display
        };

        // Add elements to card
        noteCard.appendChild(title);
        noteCard.appendChild(content);
        noteCard.appendChild(downloadLink);
        noteCard.appendChild(deleteBtn);

        notesList.appendChild(noteCard);
    });
}

notesForm.addEventListener('submit', e => {
    e.preventDefault();
    const subject = document.getElementById('subject').value.trim();
    const topic = document.getElementById('topic').value.trim();
    const content = document.getElementById('notesContent').value.trim();

    if (!subject || !topic || !content) return;

    const notes = JSON.parse(localStorage.getItem('notesWallahNotes') || '[]');
    notes.push({ subject, topic, content });
    localStorage.setItem('notesWallahNotes', JSON.stringify(notes));

    notesForm.reset();
    loadNotes();
});

// Load notes on page load
loadNotes();
