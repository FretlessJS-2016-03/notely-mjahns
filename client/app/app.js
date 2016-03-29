( function () {
    // set up the angular module
    var app = angular.module( 'notely', [
        'ui.router',
        'notely.notes'
    ]);

    function notelyConfig ( $urlRouterProvider ) {
        // specify a default location
        $urlRouterProvider.otherwise('/notes');
    }
	
    // manually inject a couple things so that we can minify
    notelyConfig.$inject = [ '$urlRouterProvider' ];

    app.config( notelyConfig );
} )();
