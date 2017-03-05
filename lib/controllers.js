angular.module('trackMyShow.controllers', [])


.controller("homeController", function($http, auth, store, userProfile, toastr){

    var vm = this;
    vm.auth = auth;
    vm.user = userProfile;
    vm.avatar = "https://placeimg.com/100/100/people";
    vm.searchResults = {};    
    
        
    vm.search = function(searchString){        
        var urlSearch = 'http://ec2-54-164-197-203.compute-1.amazonaws.com:3131/search/' + searchString;                      
        $http.get(urlSearch).then(function(res){                    
            vm.searchResults = res.data;            
        }); 
    };


    vm.addFav = function(tvShow){
        vm.user.fav.push(tvShow);
        toastr.success('Show Added!');
        console.log("user: ", vm.user);


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