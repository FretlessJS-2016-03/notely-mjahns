var express = require( "express" );
var app = express();

app.get( "/", function ( req, res ) {
    res.json( [
        {
            title: "hardcoded note",
            body_html: "foo" 
        },
        {
            title: "another hardcoded note",
            body_html: "bar" 
        }
    ]);
});

app.listen( 3737, function () {
    console.log( "Listening on http://localhost:3737" );
});
