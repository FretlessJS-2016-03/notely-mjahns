// mongo stuff
var db = require ( "../config/db" );

// schemas
var NoteSchema = db.Schema( { title: String, body_html: String } );

// export our schemas
module.exports = NoteSchema;
