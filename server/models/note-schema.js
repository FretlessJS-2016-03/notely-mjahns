// mongo stuff
var db = require ( "../config/db" );
 
// schemas
var NoteSchema = db.Schema( 
    { 
        title: String, 
        body_html: String, 
        updated_at: { type: Date, default: Date.now }
    } 
);

// define how mongo should act before saving a note
NoteSchema.pre( "save", function ( next ) {
    // we want to change the last date at which the note was updated
    this.updated_at = Date.now();

    // now go on to saving the note
    next();
});

// export our schemas
module.exports = NoteSchema;
