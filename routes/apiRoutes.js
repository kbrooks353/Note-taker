const router = require("express").Router();
const fs = require("fs");

router.get("/notes", function(req, res){
    fs.readFile("db/db.json", "utf8", (err, string)=> {
        if (err){
            console.log(err);
            return;
        }else{
            res.json(JSON.parse(string));
        }
    });
});

router.post("/notes", ({body} , res) => {
    console.log(body);
    const oldNotesParsed = JSON.parse(fs.readFileSync("db/db.json"));
    const oldNotesAdded = oldNotesParsed.concat(body);
    const newString = JSON.stringify(oldNotesAdded);

    fs.writeFile("db/db.json", newString, function(err) {
        if (err){
            console.log(err);
        }else{
            res.json(newString);
        }
    });
});

router.delete("/notes/:title", function(req, res){
    const oldNotesParsed = JSON.parse(fs.readFileSync("db/db.json"));
    const newNotes = oldNotesParsed.filter(note => {
        return note.title !== req.params.title;
    });
    const stringifiedNotes = JSON.stringify(newNotes);

    fs.writeFile("db/db.json",  stringifiedNotes, function(err) {
        if(err){
            console.log(err);
        }else{
            res.json(newNotes)
        }
    })
})

module.exports = router;