const express = require('express');
const cors = require('cors')
const formidable = require('express-formidable');
const app = express();
const pdfParse = require("pdf-parse");
const multer = require('multer');
const fs = require('fs');
const wordExtract = require('word-extractor');
const WordExtractor = require('word-extractor');

app.use(cors());
app.use(express.json());
// app.use(formidable());

const storage = multer.memoryStorage();
const upload = multer({ storage });

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

app.post( '/filetranslate' , (req,res) => {
    const { source, target, data } = req.body;
    console.log(req.body);

    if (data.mimeType == 'application/pdf') {
        let dataBuffer = fs.readFileSync('./uploads/Lex.pdf'); // Get the actual file somehow later
        pdfParse(dataBuffer).then(result => {
            console.log(result.text)
        })
    }
    else
    {
        const extractor = new WordExtractor()
        const extracted = extractor.extract('./uploads/exp5.docx')
        extracted.then(doc => {
            console.log(doc.getBody())
        })
    }
    
    res.status(200).send({
        result: `Translated data from ${source} to ${target}`
    })
}
);

app.post( '/fileimg' , (req,res) => {

    const { source, target, data } = req.body;
    console.log(req.body);
    res.status(200).send({
        result: `Translated data from ${source} to ${target}`
    })
}
);

app.post( '/fileaudio' , (req,res) => {

    const { source, target, data } = req.body;
    console.log(req.body);
    res.status(200).send({
        result: `Translated data from ${source} to ${target}`
    })
}
);



const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});