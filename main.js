import express from "express";
import Database from "better-sqlite3";

const db = new Database("./db/gaali.db", { verbose: console.log });
db.pragma('journal_mode = WAL');

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Example app listening on port ${process.env.PORT || 3000}`)
})


/*const insert = db.prepare(`CREATE TABLE IF NOT EXISTS bangla (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
   	text TEXT NOT NULL
);`);*/

//const insert = db.prepare(`INSERT INTO bangla (text) VALUES (@gali)`)
const insert = db.prepare(`SELECT text FROM bangla ORDER BY RANDOM() LIMIT 1;`)

//insert.run({gali: "খানকির পোলা"})

console.log(insert.get())