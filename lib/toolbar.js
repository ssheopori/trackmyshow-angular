(function () {
    
    angular
        .module('trackMyShow')
        .controller('toolbarCtrl', toolbarController)
        .directive('toolbar', toolbarDirective);

    function toolbarController (userService){
        
        var vm = this;
        vm.user = userService.user;
        
        vm.login = function(){
            vm.user = userService.login();
        };

        vm.logout = function(){            
            userService.logout();        
        };        
        
    }

    function toolbarDirective (){
        return{        
            templateUrl: './directives/toolbar.html',
            controller: 'toolbarCtrl',
            controllerAs: 'toolbar'
        };        
    }


})();

