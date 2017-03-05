angular.module('trackMyShow.directives', [])

.directive("searchResult", function(){
    return{        
        templateUrl: './directives/searchResult.html'
    }
})

.directive("navbarDirective", function(){
    return{        
        templateUrl: './directives/navbar.html',
        controller: 'toolbarController',
        controllerAs: 'toolbar'
    }
})


;