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
        controller: NotesController,
        resolve: { 
            notesLoaded: function( NotesService ) {
               return NotesService.fetch(); 
            }
        }
      })

      .state('notes.form', {
        url: '/:noteId',
        templateUrl: '/notes/notes-form.html',
        controller: NotesFormController
      });
  }

  NotesController.$inject = [ "$scope", "$state", "NotesService" ];
  function NotesController( $scope, $state, NotesService ) {
      // get the notes from the server
      $scope.notes = NotesService.getNotes();
      $state.go( "notes.form" );
  }

  NotesFormController.$inject = [ "$scope", "$state", "NotesService" ];
  function NotesFormController( $scope, $state, NotesService ) {
      // find the note we want
      $scope.note = NotesService.findById( $state.params.noteId );

      // saves the note
      $scope.save = function () {
          // check for a note id
          if ( $scope.note._id ) {
              NotesService.update( $scope.note );
          }
          else {
              // create a new note
              NotesService.create( $scope.note );
          }
      }
  }
  
})();
