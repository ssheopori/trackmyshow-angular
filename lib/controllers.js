angular.module('trackMyShow.controllers', [])


.controller("homeController", function($http, auth, store, userService, toastr){

    var vm = this;        
    vm.user = userService.user;

    vm.avatar = "https://placeimg.com/100/100/people";
    vm.searchResults = {};    
    
        
    vm.search = function(searchString){        
        var urlSearch = 'http://ec2-54-164-197-203.compute-1.amazonaws.com:3131/public/search/' + searchString;                      
        //var urlSearch = 'http://sid-win10:3131/public/search/' + searchString;                      
        $http.get(urlSearch).then(function(res){                    

            console.log("received data... ", res.data);

            vm.searchResults = res.data;

            if(res.data == null){
                toastr.error("Could not find " + searchString + " in TVDB!", "Not Found!");
            }

        },function(err){
            toastr.error("Could not find " + searchString + " in TVDB!", "Not Found!");
            console.log(err);
        });

    };

    vm.addFav = function(tvShow){
        //check to see if show is already Added
        var val = _.find(vm.user.fav, function(v){
            return v.id == tvShow.id;            
        });        

        if(val){
            toastr.info("You already have " + tvShow.seriesName +" in your collection!");
        }else{
            //call the user service to add fav
            userService.addFav(tvShow);            
        }
    };


})
.controller("docsController", function(userProfile){
    var vm = this;
    vm.user = userProfile;

})
.controller('profileController', function(userService, store, toastr){
    
    var vm = this;
    vm.profile = userService.user;    
    vm.showDetails = vm.profile.fav[0];


    vm.viewShowDetails = function(show){
        vm.showDetails = show;
        console.log("profile user: ", vm.showDetails);
    };

    vm.removeFromCollection = function(show){        
        vm.profile.fav = userService.removeFav(show);
        vm.showDetails = vm.profile.fav[0];
    };


})
.controller('coverController', function(){
    var vm = this;
    vm.message = "welcome to welcome!";
})


;