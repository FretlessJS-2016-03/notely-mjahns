(function() {
  angular.module('notely.notes', [
    'ui.router'
  ])
  .config(notesConfig);

  notesConfig.$inject = ['$stateProvider'];
  function notesConfig($stateProvider) {
    $stateProvider

      .state('notes', {
        url: '/notes',
        templateUrl: '/notes/notes.html',
        controller: NotesController
      })

      .state('notes.form', {
        url: '/:noteId',
        templateUrl: '/notes/notes-form.html'
      });
  }

  NotesController.$inject = [ "$scope", "$state", "NotesService" ];
  function NotesController( $scope, $state, NotesService ) {
      // tell the notes service to fetch notes, then save what it got for us
      NotesService.fetch().then( function () { $scope.notes = NotesService.getNotes() } );
    
      // TESTING
      $scope.note = {
          title: "static note",
          body_html: "foo bar"
      };
       
      $scope.save = function () {
          // send the note to the server
          console.log( $scope.note.title );
      };

      $state.go( "notes.form" );
  }
  
})();
