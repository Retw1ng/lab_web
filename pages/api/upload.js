import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false
  }
};

const post = async (req, res) => {
  const form = new formidable.IncomingForm(); //получаем объект формы
  form.parse(req, async function (err, fields, files) {
    try{
      await saveFile(files.file);
    }
    catch(e){
      console.log('Ошибка: ',e);
    }
    return res.status(201).send("Nothing");
  });
};

const saveFile = async (file) => {
  const data = fs.readFileSync(file.filepath); //чтение содержимого файла
  fs.writeFileSync(`./public/${file.originalFilename}`, data); //сохранени файла
  await fs.unlinkSync(file.filepath); //Удаление временного файла
  return;
};

export default (req, res) => {
  if (req.method === "POST") post(req,res);
  else res.status(200).send("Invalid method, use POST")
};
 
