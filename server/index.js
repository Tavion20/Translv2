const express = require('express');
const cors = require('cors')
const formidable = require('express-formidable');
const app = express();


app.use(cors());
app.use(express.json());
// app.use(formidable());

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



const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});