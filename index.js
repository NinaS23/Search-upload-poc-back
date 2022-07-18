import { db } from "./src/db.js";
import express , { json } from "express";
import multer from "multer";
import cors from "cors";
import chalk from "chalk";


const server = express()
server.use(json())
server.use(cors())


const upload = multer({ dest: 'uploads/' })
/* const upload = multer({
  dest: "./upload/",
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./upload");
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname;
      cb(null, fileName);
    },
  }),
}); */


  server.post("/upload", upload.single("file"), async (req, res) => {
    const { filename , size } = req.file;
    console.log(req.file)
    const salvarArquivo = {
      filename,
      size,
      url: `http://localhost:5001/files/${filename}`,
      createAt: Date.now,
    };
  
    await db.collection("upload").insertOne(salvarArquivo);
  
    res.send({
      upload: true,
    });
  });




const PORT = 5004 || 5005
server.listen(PORT , () =>{
    console.log(chalk.yellow(`entrei na ${PORT}`))
})