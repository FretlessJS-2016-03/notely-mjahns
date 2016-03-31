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
      // we need to create $scope.note, so just set it equal to an empty object for now
      $scope.note = {};

      // tell the notes service to fetch notes, then save what it got for us
      NotesService.fetch().then( function () { $scope.notes = NotesService.getNotes() } );
    
      $scope.save = function () {
          NotesService.create( $scope.note );
      };

      $state.go( "notes.form" );

      $scope.clearForm = function () {
          $scope.note = {};
      }
  }
  
})();
