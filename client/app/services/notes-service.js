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

        // create the fetch method
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

        that.create = function ( note ) {
            return $http.post( "http://localhost:3030/notes", {
                note: note
            }).then( function ( response ) {
                that.notes.push( response.data.note );
            });
        }
        
            

        // returns the saved note data
        that.getNotes = function () {
            return that.notes;
        };
      }
}());
