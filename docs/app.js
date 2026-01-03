// ==========================================
// Song Data for PianoFun
// ==========================================

const SONGS = {
    twinkle: {
        name: 'Twinkle, Twinkle, Little Star',
        difficulty: 'Easy',
        notes: [
            { note: 'C4', duration: 0.5 },
            { note: 'C4', duration: 0.5 },
            { note: 'G4', duration: 0.5 },
            { note: 'A4', duration: 0.5 },
            { note: 'A4', duration: 0.5 },
            { note: 'A4', duration: 0.5 },
            { note: 'G4', duration: 0.5 },
            { note: 'F4', duration: 0.5 },
            { note: 'E4', duration: 0.5 },
            { note: 'D4', duration: 0.5 },
            { note: 'D4', duration: 0.5 },
            { note: 'D4', duration: 0.5 },
            { note: 'C4', duration: 1 },
        ]
    },
    mary: {
        name: 'Mary Had a Little Lamb',
        difficulty: 'Easy',
        notes: [
            { note: 'E4', duration: 0.5 },
            { note: 'D4', duration: 0.5 },
            { note: 'C4', duration: 0.5 },
            { note: 'D4', duration: 0.5 },
            { note: 'E4', duration: 0.5 },
            { note: 'E4', duration: 0.5 },
            { note: 'E4', duration: 0.5 },
            { note: 'D4', duration: 0.5 },
            { note: 'D4', duration: 0.5 },
            { note: 'D4', duration: 0.5 },
            { note: 'E4', duration: 0.5 },
            { note: 'G4', duration: 1 },
        ]
    },
    children: {
        name: 'Children (Robert Miles) - Easy',
        difficulty: 'Medium',
        notes: [
            { note: 'E4', duration: 0.5 },
            { note: 'E4', duration: 0.5 },
            { note: 'E4', duration: 0.5 },
            { note: 'E4', duration: 0.5 },
            { note: 'F4', duration: 0.5 },
            { note: 'G4', duration: 0.5 },
            { note: 'E4', duration: 0.5 },
            { note: 'D4', duration: 0.5 },
            { note: 'C4', duration: 0.5 },
            { note: 'D4', duration: 0.5 },
            { note: 'E4', duration: 0.5 },
            { note: 'E4', duration: 0.5 },
            { note: 'E4', duration: 0.5 },
            { note: 'E4', duration: 0.5 },
            { note: 'F4', duration: 0.5 },
            { note: 'G4', duration: 1 },
        ]
    },
    happy: {
        name: 'Happy Birthday',
        difficulty: 'Easy',
        notes: [
            { note: 'C4', duration: 0.5 },
            { note: 'C4', duration: 0.5 },
            { note: 'D4', duration: 0.5 },
            { note: 'C4', duration: 0.5 },
            { note: 'F4', duration: 0.5 },
            { note: 'E4', duration: 1 },
            { note: 'C4', duration: 0.5 },
            { note: 'C4', duration: 0.5 },
            { note: 'D4', duration: 0.5 },
            { note: 'C4', duration: 0.5 },
            { note: 'G4', duration: 0.5 },
            { note: 'F4', duration: 1 },
        ]
    }
};

// ==========================================
// Note Frequency Mapping
// ==========================================

const NOTE_FREQUENCIES = {
    'C4': 261.63,
    'D4': 293.66,
    'E4': 329.63,
    'F4': 349.23,
    'G4': 392.00,
    'A4': 440.00,
    'B4': 493.88,
    'C5': 523.25,
    'D5': 587.33,
    'E5': 659.25,
    'F5': 698.46,
    'G5': 783.99,
    'A5': 880.00,
    'B5': 987.77,
    'C6': 1046.50,
    'D6': 1174.66,
    'E6': 1318.51,
    'F6': 1396.91,
    'G6': 1567.98,
    'A6': 1760.00
};

// ==========================================
// Main Piano App
// ==========================================

class PianoApp {
    constructor() {
        this.audioEngine = new AudioEngine();
        this.currentMode = 'freeplay';
        this.currentSong = null;
        this.currentNoteIndex = 0;
        this.isLearning = false;
        this.nextNoteTimeout = null;
        
        this.initializeElements();
        this.attachEventListeners();
    }

    /**
     * Initialize DOM element references
     */
    initializeElements() {
        this.modeButtons = document.querySelectorAll('.mode-btn');
        this.songSelector = document.querySelector('.song-selector');
        this.learnInfo = document.querySelector('.learn-info');
        this.songSelect = document.getElementById('song-select');
        this.startButton = document.getElementById('start-lesson');
        this.resetButton = document.getElementById('reset-lesson');
        this.lessonTitle = document.getElementById('lesson-title');
        this.lessonProgress = document.getElementById('lesson-progress');
        this.progressFill = document.getElementById('progress-fill');
        this.whiteKeys = document.querySelectorAll('.white-key');
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Mode switching
        this.modeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchMode(e.target.dataset.mode));
        });

        // Key interactions
        this.whiteKeys.forEach(key => {
            key.addEventListener('click', () => this.playKey(key));
            key.addEventListener('mousedown', () => this.playKey(key));
            key.addEventListener('mouseup', () => this.stopKey(key));
            key.addEventListener('mouseleave', () => this.stopKey(key));
        });

        // Lesson controls
        this.startButton.addEventListener('click', () => this.startLesson());
        this.resetButton.addEventListener('click', () => this.resetLesson());

        // Keyboard support
        document.addEventListener('keydown', (e) => this.handleKeyboardInput(e));
    }

    /**
     * Switch between Free Play and Learn Mode
     * @param {string} mode - 'freeplay' or 'learn'
     */
    switchMode(mode) {
        this.currentMode = mode;
        
        // Update button states
        this.modeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });

        // Show/hide relevant sections
        if (mode === 'learn') {
            this.songSelector.classList.remove('hidden');
            this.learnInfo.classList.add('hidden');
            this.resetLesson(); // Reset any ongoing lesson
        } else {
            this.songSelector.classList.add('hidden');
            this.learnInfo.classList.add('hidden');
            this.resetLesson();
        }

        this.audioEngine.playClick();
    }

    /**
     * Play a key
     * @param {Element} keyElement - The key DOM element
     */
    playKey(keyElement) {
        const note = keyElement.dataset.note;
        const frequency = parseFloat(keyElement.dataset.frequency);
        
        // Visual feedback
        keyElement.classList.add('pressed');
        
        // Play sound
        this.audioEngine.playNote(frequency, note);

        // Check if in learn mode and this is the correct note
        if (this.isLearning) {
            this.checkLearningProgress(note);
        }
    }

    /**
     * Stop playing a key
     * @param {Element} keyElement - The key DOM element
     */
    stopKey(keyElement) {
        const note = keyElement.dataset.note;
        keyElement.classList.remove('pressed');
        this.audioEngine.stopNote(note);
    }

    /**
     * Start a lesson
     */
    startLesson() {
        const songKey = this.songSelect.value;
        this.currentSong = SONGS[songKey];
        this.currentNoteIndex = 0;
        this.isLearning = true;

        // Update UI
        this.songSelector.classList.add('hidden');
        this.learnInfo.classList.remove('hidden');
        this.startButton.classList.add('hidden');
        this.resetButton.classList.remove('hidden');

        this.lessonTitle.textContent = `Lesson: ${this.currentSong.name}`;
        this.updateLessonProgress();
        
        // Highlight first note
        this.highlightNextNote();
    }

    /**
     * Reset the current lesson
     */
    resetLesson() {
        this.isLearning = false;
        this.currentNoteIndex = 0;
        this.currentSong = null;
        
        // Clear all highlights
        this.whiteKeys.forEach(key => {
            key.classList.remove('active-learn', 'pressed');
        });

        // Update UI
        this.songSelector.classList.remove('hidden');
        this.learnInfo.classList.add('hidden');
        this.startButton.classList.remove('hidden');
        this.resetButton.classList.add('hidden');

        if (this.nextNoteTimeout) {
            clearTimeout(this.nextNoteTimeout);
        }

        this.audioEngine.playClick();
    }

    /**
     * Highlight the next note to play
     */
    highlightNextNote() {
        // Clear previous highlight
        this.whiteKeys.forEach(key => {
            key.classList.remove('active-learn');
        });

        if (this.currentNoteIndex < this.currentSong.notes.length) {
            const nextNote = this.currentSong.notes[this.currentNoteIndex];
            const keyElement = document.querySelector(`[data-note="${nextNote.note}"]`);
            
            if (keyElement) {
                keyElement.classList.add('active-learn');
                this.lessonProgress.textContent = `Press the ${nextNote.note} key...`;
            }
        }
    }

    /**
     * Check if the player pressed the correct note
     * @param {string} pressedNote - The note that was pressed
     */
    checkLearningProgress(pressedNote) {
        if (!this.isLearning || this.currentNoteIndex >= this.currentSong.notes.length) {
            return;
        }

        const expectedNote = this.currentSong.notes[this.currentNoteIndex].note;

        if (pressedNote === expectedNote) {
            // Correct note!
            this.audioEngine.playClick();
            this.currentNoteIndex++;
            this.updateLessonProgress();

            // Move to next note or finish lesson
            if (this.currentNoteIndex >= this.currentSong.notes.length) {
                this.finishLesson();
            } else {
                // Wait a bit before highlighting the next note
                this.nextNoteTimeout = setTimeout(() => {
                    this.highlightNextNote();
                }, 300);
            }
        } else {
            // Wrong note - play error sound but don't advance
            this.playErrorSound();
        }
    }

    /**
     * Play an error sound
     */
    playErrorSound() {
        const now = this.audioEngine.audioContext.currentTime;
        const oscillator = this.audioEngine.audioContext.createOscillator();
        const gainNode = this.audioEngine.audioContext.createGain();
        
        oscillator.frequency.setValueAtTime(200, now);
        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioEngine.audioContext.destination);
        
        oscillator.start(now);
        oscillator.stop(now + 0.2);
    }

    /**
     * Update the lesson progress display
     */
    updateLessonProgress() {
        const progress = (this.currentNoteIndex / this.currentSong.notes.length) * 100;
        this.progressFill.style.width = progress + '%';
    }

    /**
     * Finish the lesson
     */
    finishLesson() {
        this.isLearning = false;
        this.lessonProgress.textContent = '🎉 Congratulations! You completed the lesson!';
        this.lessonProgress.style.color = '#4CAF50';
        
        // Play success melody
        this.playSuccessMelody();

        // Clear highlights
        this.whiteKeys.forEach(key => {
            key.classList.remove('active-learn');
        });

        // Reset button after 2 seconds
        setTimeout(() => {
            this.resetLesson();
        }, 3000);
    }

    /**
     * Play a success melody
     */
    playSuccessMelody() {
        const successNotes = [
            { frequency: 523.25, duration: 0.3 },  // C5
            { frequency: 659.25, duration: 0.3 },  // E5
            { frequency: 783.99, duration: 0.6 }   // G5
        ];

        let delay = 0;
        successNotes.forEach((note, index) => {
            setTimeout(() => {
                this.audioEngine.playNote(note.frequency, `success-${index}`, note.duration);
            }, delay * 1000);
            delay += note.duration;
        });
    }

    /**
     * Handle keyboard input (optional feature)
     * @param {KeyboardEvent} event - The keyboard event
     */
    handleKeyboardInput(event) {
        // Map keyboard keys to piano notes
        const keyMap = {
            'c': 'C4',
            'd': 'D4',
            'e': 'E4',
            'f': 'F4',
            'g': 'G4',
            'a': 'A4',
            'b': 'B4',
            'q': 'C5',
            'w': 'D5',
            'r': 'E5',
            't': 'F5',
            'y': 'G5',
            'u': 'A5',
            'i': 'B5',
        };

        const key = event.key.toLowerCase();
        if (keyMap[key]) {
            const noteElement = document.querySelector(`[data-note="${keyMap[key]}"]`);
            if (noteElement && this.currentMode === 'freeplay') {
                this.playKey(noteElement);
            }
        }
    }
}

// ==========================================
// Initialize App on Page Load
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    window.pianoApp = new PianoApp();
});
