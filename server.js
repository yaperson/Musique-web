const path = require('path');
const fs = require('fs');
const bodyParser = require("body-parser");
var cors = require('cors')
const express = require('express')
const host = '127.0.0.1';
const port = 3900;

const musicDirectoryPath = path.join(__dirname, './src/music');
const coverDirectoryPath = path.join(__dirname, './src/cover');

let app = express()

app.use(cors())
app.use(express.static(path.resolve(__dirname, "src")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// SERVER
// app.listen( process.env.PORT,
//             process.env.IP,() => {
//             console.log(`Server is runing on http://${process.env.IP}:${process.env.PORT}`);
// })

// LOCAL
app.listen(port, host, () => {
    console.log(`Server is runing on http://${host}:${port}`)
})

app.get('/music/musicRepertory', function (req, res) {
    // passsing directoryPath and callback function
    fs.readdir(musicDirectoryPath, function (err, files) {
        // handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        let musics = {
            musicList: [
                files
            ]
        }

        // listing all files using forEach
        // files.forEach(function (file) {
            // Do whatever you want to do with the file

            // musics = {
            //     musicName : file 
            // }
            // console.log(musics)
        // });
        console.log(musics)

        res.send(musics);
    });
});