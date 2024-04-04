// const clinics = [];
//
// export default function handler(req, res) {
//     if (req.method === 'POST') {
//         const { name, location } = req.body;
//         const newClinic = { id: clinics.length + 1, name, location };
//         clinics.push(newClinic);
//         res.status(201).json(newClinic);
//     } else if (req.method === 'GET') {
//         res.status(200).json(clinics);
//     } else {
//         res.setHeader('Allow', ['GET', 'POST']);
//         res.status(405).end(`Метод ${req.method} не поддерживается`);
//     }
// }

// let clinics = [];
//
// export default function handler(req, res) {
//     if (req.method === 'POST') {
//         const { name, lat, lng, address } = req.body;
//         const newClinic = { name, lat, lng, address };
//         clinics.push(newClinic);
//         res.status(200).json({ success: true });
//     } else {
//         res.status(405).json({ message: 'Метод не поддерживается' });
//     }
// }

import fs from "fs";

export const config = {
    api: {
        bodyParser: true
    }
};

const post = async (req, res) => {
    await saveFile(req.body)
    res.statusCode = 200
    res.end(JSON.stringify(req.body))
    return res
};

const saveFile = async (body) => {
    if (fs.existsSync("./public/pets.json")) {
        fs.readFile("./public/pets.json", {encoding: 'utf-8'}, function (err, data) {
            let d = JSON.parse(data)
            d.push(body)
            fs.writeFile("./public/pets.json", JSON.stringify(d), {flag: 'w'}, function (err) {
                if (err) throw err;
                console.log("It's saved!");
            });
        });
    } else {
        fs.writeFile("./public/pets.json", JSON.stringify([body]), {flag: 'w'}, function (err) {
            if (err) throw err;
            console.log("It's saved!");
        });
    }
};

export default (req, res) => {
    if (req.method === "POST") post(req, res)
    else res.status(200).send("Invalid method, use POST")
};