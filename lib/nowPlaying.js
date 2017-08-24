(function(){

    angular
    .module('trackMyShow')
    .controller('nowPlayingCtrl', nowPlayingController)
    .directive('nowPlaying', nowPlayingDirective);

    function nowPlayingController (userService){
        
        var vm = this;    
        
    }

    function nowPlayingDirective (){
        return{        
            templateUrl: './directives/nowPlaying.html',
            controller: 'nowPlayingCtrl'            
    };        

}

}());