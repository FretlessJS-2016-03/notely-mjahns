( function () {
    // set up the module
    angular.module( "notely.notes", [ "ui.router" ] )
        .config( notesConfig );

    // manually inject so that we can minify
    notesConfig.$inject = [ "$stateProvider" ];

    
    function notesConfig ( $stateProvider ) {
       // set up the state
       $stateProvider
           .state( "notes", {        
                url : "/notes", 
                templateUrl : "/notes/notes.html", 
                controller : NotesController    
            })

            .state( "notes.form", {
                url : "/:noteId",
                templateUrl : "/notes/notes-form.html"
            });

    }

    NotesController.$inject = [ "$scope" ];
    function NotesController ( $scope ) {
        $scope.message = "Hello!";
    }

} )();
