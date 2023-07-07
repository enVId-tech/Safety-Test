// Libraries
import express from 'express';
import google from 'googleapis';
import fs from 'fs';

// Express Init
const app = express();

// Server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));
console.log('Server Started');

//Limiting the size of json data (1mb) and parsing JSON data
app.use(express.json({ limit: '5mb' }));

// Globals
let settings;
const folderSplit = '\n';
let folderGet = "";

// Settings POST Request
app.post('/settings', async(req, res) => {
    try {
        settings = req.body;
        console.log('Settings Received');
        res.send('Settings Received');
    } catch (err) {
        console.log(err);
        res.send('Error');
    }
});

