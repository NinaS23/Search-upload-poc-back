import { db } from "./src/db.js";
import express , { json } from "express";
import multer from "multer";
import cors from "cors";
import chalk from "chalk";


const server = express()
server.use(json())
server.use(cors())


const upload = multer({ dest: 'uploads/' })

  server.post("/upload", upload.single("file"), async (req, res) => {
    const { filename, tamanho } = req.file;
    console.log(req.file)
    const salvarArquivo = {
      filename,
      tamanho,
      url: `http://localhost:5001/files/${filename}`,
      createAt: Date.now,
    };
  
    await db.collection("upload").insertOne(salvarArquivo);
  
    res.send({
      upload: true,
      files: req.files,
    });
  });




const PORT = 5001 || 5005
server.listen(PORT , () =>{
    console.log(chalk.yellow(`entrei na ${PORT}`))
})