

import Database from "better-sqlite3";
import fs from "fs"

const db = new Database("./db/gaali.db");
db.pragma('journal_mode = WAL');



/*const insert = db.prepare(`CREATE TABLE IF NOT EXISTS bangla (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
   	text TEXT NOT NULL
);`);*/

const insert = db.prepare(`INSERT INTO bangla (text) VALUES (@gali)`)
//const insert = db.prepare(`SELECT text FROM bangla ORDER BY RANDOM() LIMIT 1;`)
/*
fs.readFileSync('pp.txt', 'UTF-8').split(/\r?\n/).forEach(function(line){
    if(line.length >= 1){
        insert.run({gali: line})
        console.log("Inserted: gali")
    }
    console.log("blank line")
})
*/

//console.log(insert.get())