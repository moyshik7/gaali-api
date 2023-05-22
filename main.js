import express from "express";
import Database from "better-sqlite3";

const db = new Database("./db/gaali.db");
db.pragma('journal_mode = WAL');
const ip = new Database("./db/ip.db");
ip.pragma('journal_mode = WAL');

const app = express()

app.get('/', (req, res) => {
    res.send("hello world")
    SaveIP(req)
})

app.get("/bn/", (req, res) => {
    const q = db.prepare(`SELECT text FROM bangla ORDER BY RANDOM() LIMIT 1;`).get();
    const r = {
        code: 200,
        lang: "bn/bd",
        gali: q.text
    }
    res.send(r)
    SaveIP(req)
})
app.get("/en/", (req, res) => {
    const q = db.prepare(`SELECT text FROM english ORDER BY RANDOM() LIMIT 1;`).get();
    const r = {
        code: 200,
        lang: "en/us",
        gali: q.text
    }
    res.send(r)
    SaveIP(req)
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Example app listening on port ${process.env.PORT || 3000}`)
})

const SaveIP = (req) => {
    const q = ip.prepare(`INSERT INTO ip (time, ip) VALUES (@time, @ip)`)
    q.run({
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress ,
        time: Date.now()
    })
    console.log(ip.prepare(`SELECT * FROM IP`).get())
}
