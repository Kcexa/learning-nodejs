import http from "http";
import fs from "fs";
import url from "url";

const port = process.env.PORT || 5000;

http.createServer(function (req, res) {
    let name = url.parse(req.url, true).query.name;
    if (name === undefined) name = 'world';
    if (name === 'burningbird') {
        const file = 'public/img/phoenix5a.png';
        fs.stat(file, function (err, stat) {
            if (err) {
                console.error(err);
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end("Sorry, Burningbird isn't around right now \n");
            } else {
                const img = fs.readFileSync(file);
                res.contentType = 'image/png';
                res.contentLength = stat.size;
                res.end(img, 'binary');
            }
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello ' + name + '\n');
        res.end(req.headers);
        res.end(req.rawHeaders);
    }
}).listen(port);

console.log(`Listening on port ${port}`);
