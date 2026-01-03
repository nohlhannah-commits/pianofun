// ==========================================
// Audio Engine for PianoFun
// ==========================================

class AudioEngine {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.oscillators = {};
        this.gainNodes = {};
    }

    /**
     * Play a note with a given frequency
     * @param {number} frequency - Frequency in Hz
     * @param {string} noteId - Unique identifier for the note
     * @param {number} duration - Duration in seconds (default: 1.5 seconds)
     */
    playNote(frequency, noteId, duration = 1.5) {
        const now = this.audioContext.currentTime;
        
        // Create oscillator and gain nodes if they don't exist
        if (!this.oscillators[noteId]) {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.value = frequency;
            
            // Create smooth attack envelope
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.3, now + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.start(now);
            oscillator.stop(now + duration);
            
            this.oscillators[noteId] = oscillator;
            this.gainNodes[noteId] = gainNode;
            
            // Clean up references after note ends
            setTimeout(() => {
                delete this.oscillators[noteId];
                delete this.gainNodes[noteId];
            }, duration * 1000 + 100);
        }
    }

    /**
     * Stop a note immediately
     * @param {string} noteId - Unique identifier for the note
     */
    stopNote(noteId) {
        const now = this.audioContext.currentTime;
        
        if (this.gainNodes[noteId]) {
            // Quick fade out
            this.gainNodes[noteId].gain.linearRampToValueAtTime(0, now + 0.05);
            
            setTimeout(() => {
                if (this.oscillators[noteId]) {
                    try {
                        this.oscillators[noteId].stop();
                    } catch (e) {
                        // Oscillator already stopped
                    }
                }
            }, 100);
        }
    }

    /**
     * Play a sequence of notes (melody)
     * @param {Array} notes - Array of {frequency, duration} objects
     * @param {number} delay - Initial delay before starting
     */
    playSequence(notes, delay = 0) {
        let currentTime = delay;
        
        notes.forEach((note, index) => {
            setTimeout(() => {
                this.playNote(note.frequency, `seq-${index}`, note.duration || 0.5);
            }, currentTime * 1000);
            
            currentTime += note.duration || 0.5;
        });
        
        return currentTime;
    }

    /**
     * Play a clicking sound (for UI feedback)
     */
    playClick() {
        const now = this.audioContext.currentTime;
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.frequency.setValueAtTime(800, now);
        oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.05);
        
        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.start(now);
        oscillator.stop(now + 0.05);
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AudioEngine;
}
