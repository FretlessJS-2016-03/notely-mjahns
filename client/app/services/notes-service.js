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
        this.fetch = function( callback ) {
          // on GET responses save note data
          $http.get( "http://localhost:3030" )
            .success( function( notesData ) {
                // save the data
                that.notes = notesData;
                
                // invoke the callback
                callback(); 
            });
        };

        // returns the saved note data
        that.getNotes = function () {
            return that.notes;
        };
      }
    }());
