# 📁 PianoFun - Project Structure

## 🎯 Quick Overview

```
pianofun/                           ← Root directory
│
├── 📂 docs/                        ← WEB BUNDLE (served by Express)
│   ├── index.html                 (150 lines) HTML structure
│   ├── styles.css                 (400+ lines) Roblox-style theme
│   ├── app.js                     (500 lines) Main application logic
│   └── audio.js                   (150 lines) Web Audio API engine
│
├── server.js                       (50 lines) Express.js server
├── package.json                    Node.js config & dependencies
│
└── 📄 Documentation Files
    ├── QUICKSTART.md              ⭐ Start here! (3 min read)
    ├── FINAL_SUMMARY.md           Complete overview
    ├── PIANOFUN_README.md         Full documentation
    ├── PROJECT_SUMMARY.md         Technical details
    ├── INDEX.md                   Complete guide
    ├── STATUS.md                  Project status
    ├── FEATURES_CHECKLIST.md      All features listed
    └── THIS_FILE                  Structure reference
```

---

## 🎹 What Each File Does

### Frontend Files (in `/docs/`)

#### `index.html`
- Main HTML structure
- Piano keyboard with 20 keys
- Mode selector (Free Play / Learn Mode)
- Song selection dropdown
- Lesson progress display
- Instructions section
- Links to CSS and JavaScript files

#### `styles.css`
- Complete Roblox-style theme
- Vibrant color gradients
- Animations and transitions
- Responsive design
- Mobile breakpoints
- 3D button effects
- Key highlighting animations

#### `app.js`
- PianoApp class - main application logic
- Song data with 4 built-in songs
- Mode switching logic
- Key press handling
- Learn mode progression
- Progress tracking
- Success/error handling
- Keyboard shortcut support

#### `audio.js`
- AudioEngine class
- Web Audio API synthesis
- Note frequency mapping
- Attack/release envelope
- Sound feedback generation
- Sequence playback

### Backend Files

#### `server.js`
- Express.js server setup
- Static file serving (from `/docs/`)
- Port 3000 configuration
- Startup message
- Health check endpoint

#### `package.json`
- Project metadata
- Express.js dependency
- npm scripts (start)

---

## 📊 File Statistics

| File | Lines | Purpose |
|------|-------|---------|
| index.html | 150 | HTML structure |
| styles.css | 400+ | Complete styling |
| app.js | 500 | Main logic |
| audio.js | 150 | Audio engine |
| server.js | 50 | Express server |
| **Total Code** | **~1,200** | **Production code** |

---

## 🔄 How Files Work Together

```
User Browser
    ↓
http://localhost:3000
    ↓
Express Server (server.js)
    ↓
Serves /docs/ files
    ↓
index.html (loads page)
    ↓
styles.css (applies theme)
    ↓
app.js (handles interaction) ← Uses → audio.js (generates sound)
    ↓
User plays piano! 🎵
```

---

## 📥 File Dependencies

```
index.html
  ├── Links to: styles.css
  ├── Links to: audio.js
  └── Links to: app.js

app.js
  ├── Depends on: audio.js (AudioEngine class)
  ├── Reads: DOM elements from index.html
  └── Uses: styles.css (CSS classes)

audio.js
  └── Standalone (uses Web Audio API)

styles.css
  └── Independent (CSS only)

server.js
  ├── Requires: express (npm package)
  └── Serves: all files from /docs/
```

---

## 🚀 Execution Flow

### 1. Server Startup
```bash
npm start
  ↓
node server.js
  ↓
Express starts on port 3000
  ↓
Ready to serve files
```

### 2. Page Load
```
Browser requests: http://localhost:3000
  ↓
Express serves: docs/index.html
  ↓
Browser loads: index.html
  ↓
HTML loads: styles.css & app.js
  ↓
app.js loads: audio.js
  ↓
Ready to play!
```

### 3. User Interaction
```
User clicks key
  ↓
app.js detects click
  ↓
Calls: audio.js playNote()
  ↓
AudioEngine creates sound
  ↓
User hears note
```

---

## 💾 Memory in `/docs/`

```
Total Web Bundle Size: ~50 KB

- index.html: ~4 KB
- styles.css: ~12 KB  
- app.js: ~15 KB
- audio.js: ~5 KB
- Images: None (pure CSS)
- Audio files: None (generated)

Total: Super lightweight! ✨
```

---

## 🔗 File Relationships

### index.html
- **References**: styles.css, audio.js, app.js
- **Contains**: HTML structure, form elements, piano keys
- **Used by**: Browser, Express server

### styles.css
- **Used by**: index.html
- **Contains**: All visual styling
- **Modifiable**: Colors, sizes, animations

### app.js
- **Uses**: audio.js, DOM elements from HTML, CSS classes
- **Contains**: Game logic, state management
- **Modifiable**: Songs, modes, behavior

### audio.js
- **Used by**: app.js
- **Contains**: Sound synthesis
- **Standalone**: No other dependencies

---

## 📝 Code Organization

### index.html Structure
```
<html>
  <head>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <header>...</header>
    <div class="content">
      <mode-selector>...</mode-selector>
      <song-selector>...</song-selector>
      <piano-keyboard>...</piano-keyboard>
      <instructions>...</instructions>
    </div>
    <script src="audio.js"></script>
    <script src="app.js"></script>
  </body>
</html>
```

### styles.css Structure
```
* Reset styles
* Body styles
* Header styling
* Content styling
* Mode selector styling
* Song selector styling
* Piano styling
* Key styling
* Instructions styling
* Utility classes
* Responsive breakpoints
* Animations (@keyframes)
```

### app.js Structure
```
SONGS (data)
NOTE_FREQUENCIES (data)
AudioEngine instantiation
PianoApp class
  - constructor()
  - initializeElements()
  - attachEventListeners()
  - switchMode()
  - playKey()
  - stopKey()
  - startLesson()
  - resetLesson()
  - highlightNextNote()
  - checkLearningProgress()
  - updateLessonProgress()
  - finishLesson()
Document ready event → App initialization
```

### audio.js Structure
```
AudioEngine class
  - constructor()
  - playNote()
  - stopNote()
  - playSequence()
  - playClick()
  - playErrorSound()
```

---

## 🔄 Data Flow

### Free Play Mode
```
User clicks key
  ↓
app.js: playKey()
  ↓
audio.js: playNote(frequency, noteId)
  ↓
Web Audio API generates sine wave
  ↓
User hears note
```

### Learn Mode
```
Start lesson
  ↓
app.js: startLesson()
  ↓
Highlight first note (CSS: active-learn)
  ↓
User clicks key
  ↓
app.js: checkLearningProgress()
  ↓
If correct:
  ✓ Highlight next note
  ✓ Update progress bar
  ✓ Continue...
Else:
  ✗ Play error sound
  ✗ Stay on current note
  ✗ Wait for retry...
```

---

## 🎯 Key File Interactions

### When User Clicks a Key
1. HTML: Key element has click listener
2. app.js: playKey() function triggered
3. Calls audio.js: playNote() method
4. AudioEngine: Creates oscillator & gainNode
5. Web Audio API: Generates sound
6. User hears note

### When Lesson Starts
1. HTML: Form elements capture selection
2. app.js: startLesson() function called
3. Reads: SONGS data
4. CSS class: active-learn added to key
5. Displays: Yellow highlight on key
6. Waits: For user input

### When User Completes Lesson
1. app.js: finishLesson() triggered
2. Calls audio.js: playSuccessMelody()
3. Updates HTML: Completion message
4. Auto-resets: After 3 seconds

---

## 🔧 Customization: Which File to Edit?

| Change | File |
|--------|------|
| Add new song | app.js |
| Change colors | styles.css |
| Change layout | index.html |
| Adjust piano range | index.html + audio.js |
| Change animation speed | styles.css |
| Add keyboard shortcut | app.js |
| Change port | server.js |
| Add new feature | app.js (main logic) |

---

## 📦 File Import Order

```
Browser loads index.html
  ↓
Parses HTML elements
  ↓
Loads styles.css
  ↓ CSS applied immediately
Loads audio.js
  ↓ AudioEngine class defined
Loads app.js
  ↓ PianoApp class defined
  ↓ DOMContentLoaded event fires
  ↓ PianoApp instantiated
  ↓ Event listeners attached
  ↓ Ready for interaction!
```

---

## ✨ Summary

**4 Core Files**:
- `index.html` - Structure
- `styles.css` - Appearance
- `app.js` - Logic & interactivity
- `audio.js` - Sound generation

**1 Server File**:
- `server.js` - Web server

**Combined**: A complete piano learning application!

---

**All files are in the `/docs/` directory, which is served by Express at `http://localhost:3000`** 🎹
