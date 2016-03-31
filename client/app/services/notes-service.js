(function() {
      // set up the module
      angular.module( "notely" )
        .service( "NotesService", NotesService );
    
      // manually inject $http
      NotesService.$inject = [ "$http" ];
     
      // the service 
      function NotesService($http) {
        // get that
        var that = this;

        // create notes as an array so that, when the server has no notes to give, the client still
        // sees NotesService.notes as an empty array and not undefined
        that.notes = [];
        
        // fetch notes from the server
        that.fetch = function() {
          // on GET responses save note data
          return $http.get( "http://localhost:3030/notes" )
             .then(
                // success
                function ( response ) {
                    console.log( "success" );
                    that.notes = response.data;
                },

                // failure
                function ( response ) {
                   alert( "failure: " + response );
                }
            ); 
        };

        // creates a note on the server
        that.create = function ( note ) {
            return $http.post( "http://localhost:3030/notes", {
                note: note
            }).then( function ( response ) {
                that.notes.unshift( response.data.note );
            });
        }
        
        // finds a note using the given id
        that.findById = function ( noteId ) {
            for ( var i = 0; i < that.notes.length; ++i ) {
                // check the current id against the desired id
                if ( that.notes[i]._id === noteId ) {
                    // we found the note
                    return that.notes[i];
                }
            }

            // if we didn't find the note, return an empty note - we could also return
            // null/undefined if we wanted to build in some error handling in case not
            // finding a note should be considered more serious
            return {};
        } 

        // updates an existing note
        that.update = function( note ) {
            return $http.put( "http://localhost:3030/notes/" + note._id, { 
                title: note.title, 
                body_html: note.body_html 
            })
            .then( function ( response ) {
                that.findById( note._id ).title = note.title;
                that.findById( note._id ).body_html = note.body_html;
            });
        }

        // returns the saved note data
        that.getNotes = function () {
            return that.notes;
        };

        
      }
}());
