// Libraries
import express from 'express';
import google from 'googleapis';
import cors from 'cors';
import fs from 'fs';

// Express Init
const app = express();

// CORS
app.use(cors());

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
let selection = [];
let User;

// Send Valid Folder Responses
app.get('/home/get/folders', async (req, res) => {
    const folderPath = 'node/Tests';

    try {
        const files = await fs.promises.readdir(folderPath);

        let fileNames = [];

        for (let i = 0; i < files.length; i++) {
            if (!files[i].includes('#')) {
                fileNames.push(files[i]);
            }
        }

        res.json(fileNames);
    } catch (err) {
        console.error(err);
    }
});

app.post('/home/post/folders/dir', async (req, res) => {
    folderGet = req.body.SelectedValue;
    User = req.body.User;
    res.json({ folderGet, User });
});

app.post('/test/post/selection', async (req, res) => {
    selection = req.body.selection;
});

app.post('/test/post/contents', async (req, res) => {

});

app.get('/test/get/settings', async (req, res) => {

});

app.post('/test/post/submit', async (req, res) => {

});