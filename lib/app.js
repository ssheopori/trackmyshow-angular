angular.module('MyApp', [])

.directive("searchResult", function(){

    return{        
        templateUrl: './templates/searchResult.html'
    }

})


.controller("mainCtrl", function($scope, $http){

    $scope.searchResults = {};    
        
    $scope.search = function(searchString){        

        var urlSearch = 'http://<<todo>>/search/' + searchString;              
        
        $http.get(urlSearch).then(function(res){                    
            $scope.searchResults = res.data;            
        }); 
    };
});

