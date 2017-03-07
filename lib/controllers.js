angular.module('trackMyShow.controllers', [])


.controller("homeController", function($http, auth, store, userProfile, toastr){

    var vm = this;
    vm.auth = auth;
    vm.user = userProfile;
    vm.avatar = "https://placeimg.com/100/100/people";
    vm.searchResults = {};    
    
        
    vm.search = function(searchString){        
        var urlSearch = 'http://ec2-54-164-197-203.compute-1.amazonaws.com:3131/public/search/' + searchString;                      
        //var urlSearch = 'http://sid-win10:3131/public/search/' + searchString;                      
        $http.get(urlSearch).then(function(res){                    
            vm.searchResults = res.data;
        }); 
    };



    vm.addFav = function(tvShow){                

        var urlSearch = 'http://ec2-54-164-197-203.compute-1.amazonaws.com:3131/public/getSeriesDetails/' + + tvShow.id;                    
        //var urlSearch = 'http://sid-win10:3131/public/getSeriesDetails/' + tvShow.id;
        $http.get(urlSearch).then(function(res){                                
            
            tvShow.poster   = "_cache/posters/" + tvShow.id + "-1.jpg";            
            tvShow.pgrating = res.data.data.rating;
            tvShow.rating   = res.data.data.siteRating;
            tvShow.airsTime = res.data.data.airsTime;
            tvShow.airsDayOfWeek = res.data.data.airsDayOfWeek;

            vm.user.fav.push(tvShow);
            toastr.success('Show Added!');                 

        });
    };


})
.controller("docsController", function(userProfile){
    var vm = this;
    vm.user = userProfile;

})
.controller("toolbarController", function(auth, store, userProfile){
    var vm = this;
    vm.auth = auth;
    vm.user = userProfile;


    vm.login = function(){
        auth.signin({}, 
        function(profile, token){
            store.set('profile', profile);
            store.set('token', token);           

            vm.user.userID = profile.user_id;
            vm.user.email = profile.email;            
            
            console.log("logged in...");            

            console.log("User: ", vm.user);

        },
        function(err){
            console.log("Error: ", err);
        });
    };

    vm.logout = function(){
        store.remove('profile');
        store.remove('token');
        auth.signout();
        console.log("signed out");
    };



})
.controller('profileController', function(userProfile){
    var vm = this;
    vm.profile = userProfile;
    console.log("profile user: ", vm.profile);
})
.controller('coverController', function(){
    var vm = this;
    vm.message = "welcome to welcome!";
})


;