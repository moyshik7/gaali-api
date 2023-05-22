import express from "express";
import Database from "better-sqlite3";

const db = new Database("./db/gaali.db");
db.pragma('journal_mode = WAL');

const app = express()

app.get('/', (req, res) => {
    res.send("hello world")
})

app.get("/bn/", (req, res) => {
    const q = db.prepare(`SELECT text FROM bangla ORDER BY RANDOM() LIMIT 1;`).get();
    const r = {
        code: 200,
        gali: q.text,
        hash: parseInt(Math.floor(Date.now() / 1000).toString() + Math.floor(Math.random() * 100000).toString())
    }
    res.send(r)
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Example app listening on port ${process.env.PORT || 3000}`)
})
