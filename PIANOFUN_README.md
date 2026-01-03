# 🎹 PianoFun - Learn to Play Piano

A fun, interactive web application for learning to play the piano with a Roblox-style interface. Perfect for beginners who want to learn music in an engaging and simple way.

## Features

✨ **Roblox-Style Interface**
- Vibrant colors and modern UI design
- Smooth animations and interactive elements
- Fully responsive for desktop and mobile

🎹 **Piano Keyboard**
- 20 white keys (C4 to A6)
- Simple, clean key layout
- Click to play or use keyboard shortcuts

🎵 **Two Game Modes**
- **Free Play**: Click any key and enjoy playing
- **Learn Mode**: Follow along with lessons and learn songs step-by-step

📚 **Built-in Songs**
- Twinkle, Twinkle, Little Star
- Mary Had a Little Lamb
- Children (Robert Miles) - Easy Version
- Happy Birthday

👶 **Perfect for Starters**
- Clear visual feedback on which key to press
- Progress tracking for each lesson
- Instant feedback for correct and incorrect notes
- Celebration when lessons are completed

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js with Express.js
- **Audio**: Web Audio API for sound generation
- **Styling**: Custom CSS with Roblox-inspired theme

## Project Structure

```
pianofun/
├── docs/                    # Static files served by Express
│   ├── index.html          # Main application HTML
│   ├── styles.css          # Roblox-style CSS
│   ├── app.js              # Main application logic
│   └── audio.js            # Audio engine
├── server.js               # Express server
├── package.json            # Dependencies
└── README.md               # This file
```

## Installation & Setup

### Prerequisites
- Node.js (v12 or higher)
- npm (comes with Node.js)

### Steps

1. **Clone or download the project**
   ```bash
   cd pianofun
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000` in your web browser

## Usage

### Free Play Mode
1. Click the "Free Play" button
2. Click any piano key to hear the note
3. You can also use keyboard shortcuts (C, D, E, F, G, A, B, Q, W, R, T, Y, U, I)

### Learn Mode
1. Click the "Learn Mode" button
2. Select a song from the dropdown
3. Click "Start Lesson"
4. The app will highlight a key in yellow - press it!
5. When you press the correct key, it highlights the next one
6. Complete all notes to finish the lesson
7. Celebrate your success! 🎉

## How It Works

### Audio Generation
The application uses the **Web Audio API** to generate pure sine wave tones for each note. Each note has:
- Specific frequency (Hz) for accurate pitch
- Smooth attack and release envelope for natural sound
- No external audio files needed

### Learn Mode Algorithm
1. Song is defined as a sequence of notes
2. First note is highlighted
3. Player must press the exact note shown
4. If correct, progress advances and next note highlights
5. If wrong, error sound plays but progress doesn't advance
6. All 20 notes completed = lesson finished!

## Keyboard Shortcuts

| Key | Note | Key | Note |
|-----|------|-----|------|
| C   | C4   | Q   | C5   |
| D   | D4   | W   | D5   |
| E   | E4   | R   | E5   |
| F   | F4   | T   | F5   |
| G   | G4   | Y   | G5   |
| A   | A4   | U   | A5   |
| B   | B4   | I   | B5   |

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Opera

The app requires Web Audio API support, which is available in all modern browsers.

## Customization

### Adding New Songs
Edit `app.js` and add a new entry to the `SONGS` object:

```javascript
yourSong: {
    name: 'Your Song Name',
    difficulty: 'Easy',
    notes: [
        { note: 'C4', duration: 0.5 },
        { note: 'D4', duration: 0.5 },
        // ... more notes
    ]
}
```

Then add an option to the select dropdown in `index.html`.

### Changing the Color Scheme
Edit `styles.css` and modify the gradient colors. The main colors are defined in:
- `body` background
- `.container` box-shadow
- `.mode-btn` gradients
- `.white-key` colors

### Adjusting Piano Range
Modify the white keys in `index.html` by changing:
- Number of keys
- Key labels
- Data attributes (note and frequency)

## API Endpoints

- `GET /` - Serves the main application
- `GET /health` - Returns server health status

## Performance Notes

- Audio synthesis happens in real-time on the client
- No audio files are downloaded
- Application works offline (except Express server startup)
- Smooth 60 FPS animations

## License

This project is provided as-is for learning purposes. See LICENSE file for details.

## Author

Hannah

## Credits

Built with ❤️ for piano learners everywhere.

Inspired by the vibrant aesthetic of Roblox and designed for absolute beginners who want to learn music in a fun, interactive way.

---

**Happy Learning! 🎵**
