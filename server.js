const path = require('path');
const fs = require('fs');
const directoryPath = path.join(__dirname, './music');
const bodyParser = require("body-parser");
const express = require('express')
const host = '127.0.0.1';
const port = 3900;

let app = express()

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
    fs.readdir(directoryPath, function (err, files) {
        // handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        // listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            console.log(file);
            
        });
        res.send({music : files});
    });
});