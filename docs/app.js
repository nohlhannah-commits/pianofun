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
// Note Frequency Mapping (White and Black keys, C4 to C8)
// ==========================================
const NOTE_FREQUENCIES = {
    // Octave 4
    'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63,
    'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
    // Octave 5
    'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25,
    'F5': 698.46, 'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'A5': 880.00, 'A#5': 932.33, 'B5': 987.77,
    // Octave 6
    'C6': 1046.50, 'C#6': 1108.73, 'D6': 1174.66, 'D#6': 1244.51, 'E6': 1318.51,
    'F6': 1396.91, 'F#6': 1479.98, 'G6': 1567.98, 'G#6': 1661.22, 'A6': 1760.00, 'A#6': 1864.66, 'B6': 1975.53,
    // Octave 7
    'C7': 2093.00, 'C#7': 2217.46, 'D7': 2349.32, 'D#7': 2489.02, 'E7': 2637.02,
    'F7': 2793.83, 'F#7': 2959.96, 'G7': 3135.96, 'G#7': 3322.44, 'A7': 3520.00, 'A#7': 3729.31, 'B7': 3951.07,
    // Octave 8
    'C8': 4186.01
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
        this.blackKeys = document.querySelectorAll('.black-key');
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Mode switching
        this.modeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchMode(e.target.dataset.mode));
        });

        // Key interactions (white and black)
        [...this.whiteKeys, ...this.blackKeys].forEach(key => {
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
        [...this.whiteKeys, ...this.blackKeys].forEach(key => {
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
        [...this.whiteKeys, ...this.blackKeys].forEach(key => {
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
        [...this.whiteKeys, ...this.blackKeys].forEach(key => {
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
        // Map keyboard keys to piano notes (Roblox style MIDI mapping)
        // Number row: 1-7 and shift+1-7 for C2-B2 and C#2-A#2
        // Number row: 8-0 and shift+8-0 for C3-E3 and C#3-A#3
        // QWER row and shift for F3-B3 and F#3-A#3
        // TYUI row and shift for C4-A4 and C#4-A#4
        // etc.
        const keyMap = {
            // C2 to B2
            '1': 'C2',
            '!': 'C#2',
            '2': 'D2',
            '@': 'D#2',
            '3': 'E2',
            '4': 'F2',
            '$': 'F#2',
            '5': 'G2',
            '%': 'G#2',
            '6': 'A2',
            '^': 'A#2',
            '7': 'B2',
            
            // C3 to B3
            '8': 'C3',
            '&': 'C#3',
            '9': 'D3',
            '*': 'D#3',
            '0': 'E3',
            'q': 'F3',
            'Q': 'F#3',
            'w': 'G3',
            'W': 'G#3',
            'e': 'A3',
            'E': 'A#3',
            'r': 'B3',
            
            // C4 to B4
            't': 'C4',
            'T': 'C#4',
            'y': 'D4',
            'Y': 'D#4',
            'u': 'E4',
            'i': 'F4',
            'I': 'F#4',
            'o': 'G4',
            'O': 'G#4',
            'p': 'A4',
            'P': 'A#4',
            'a': 'B4',
            
            // C5 to B5
            's': 'C5',
            'S': 'C#5',
            'd': 'D5',
            'D': 'D#5',
            'f': 'E5',
            'g': 'F5',
            'G': 'F#5',
            'h': 'G5',
            'H': 'G#5',
            'j': 'A5',
            'J': 'A#5',
            'k': 'B5',
            
            // C6 to B6
            'l': 'C6',
            'L': 'C#6',
            'z': 'D6',
            'Z': 'D#6',
            'x': 'E6',
            'c': 'F6',
            'C': 'F#6',
            'v': 'G6',
            'V': 'G#6',
            'b': 'A6',
            'B': 'A#6',
            'n': 'B6',
            
            // C7
            'm': 'C7',
        };

        const key = event.key;
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
