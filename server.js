// ==========================================
// PianoFun - Express Server
// ==========================================

const express = require('express');
const path = require('path');
const app = express();

// Configuration
const PORT = process.env.PORT || 3000;
const DOCS_DIR = path.join(__dirname, 'docs');

// Middleware
app.use(express.static(DOCS_DIR));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(DOCS_DIR, 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'PianoFun Server is running!' });
});

// Start server
app.listen(PORT, () => {
    console.log('\n');
    console.log('╔════════════════════════════════════════╗');
    console.log('║        🎹 PianoFun Server Started 🎹  ║');
    console.log('╚════════════════════════════════════════╝');
    console.log(`\nServer is running at: http://localhost:${PORT}`);
    console.log(`Serving files from: ${DOCS_DIR}\n`);
    console.log('Press Ctrl+C to stop the server.\n');
});
