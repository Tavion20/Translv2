const express = require('express');
const cors = require('cors')
const formidable = require('express-formidable');
const app = express();
const pdfParse = require("pdf-parse");
const multer = require('multer');
const fs = require('fs');
const WordExtractor = require('word-extractor');
const tesseract = require("tesseract.js")
require('dotenv').config()
const fetch = require('node-fetch');
const DeepSpeech = require('deepspeech');

app.use(cors());
app.use(express.json());
// app.use(formidable());

// const storage = multer.memoryStorage();
const upload = multer();


app.get("/", (req, res) => {
    res.status(201).json({message: "Connected to Backend!"});
});

app.post( '/translate' , (req,res) => {

    const { source, target, data } = req.body;
    console.log(data);
    res.status(200).send({
        result: `Translated ${data} from ${source} to ${target}`
    })
}
);

app.post('/filetranslate', upload.single('file'), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).send('No file uploaded.');
      }
      console.log(file);
    if (file.mimetype == 'application/pdf') {
        let dataBuffer = file.buffer
        pdfParse(dataBuffer).then(result => {
            console.log(result.text)
        })
    }
    else
    {
        const extractor = new WordExtractor()
        const extracted = extractor.extract(file.buffer)
        extracted.then(doc => {
            console.log(doc.getBody())
        })
    }
    
    res.status(200).send({
        // result: `Translated data from ${source} to ${target}`
    })    
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
      }
}
);

app.post( '/fileimg' , upload.single('img'), async (req, res) => {
    try {
    const image = req.file;

    if (!image) {
        return res.status(400).json({ error: 'Image data not provided' });
    }
    console.log(image);


    // const img = fs.readFileSync("../python/test/ocr3.jpeg")
    // console.log(img)
    tesseract
    .recognize(image.buffer, "eng" )
    .then((text) => {
        console.log("Result:", text.data.text)
    })
    .catch((error) => {
        console.log(error.message)
    })

    res.status(200).send({
        // result: `Translated data from ${source} to ${target}`
    })
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}
);

app.post( '/fileaudio' , upload.single('audio'), async (req,res) => {

    try{
        const audio = req.file
        if (!audio) {
            return res.status(400).json({ error: 'audio data not provided' });
        }
        console.log(audio);
        
        // const MODEL_PATH = 'path/to/deepspeech-0.9.3-models.pbmm';
        // const SCORER_PATH = 'path/to/deepspeech-0.9.3-models.scorer';

        // // Initialize DeepSpeech model
        // const model = new DeepSpeech.Model(MODEL_PATH);
        // model.enableExternalScorer(SCORER_PATH);

        // const transcription = model.stt(audio.buffer);
        // console.log('Transcription:', transcription);

        res.status(200).send({
            // result: `Translated data from ${source} to ${target}`
        })
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}
);



const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});