const express = require("express");
var cors = require("cors");
const ImageDataURI = require("image-data-uri");

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

app.post("/save", (req, res) => {
  const fileName = `${Date.now()}.png`;
  ImageDataURI.outputFile(req.body.image, fileName);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
