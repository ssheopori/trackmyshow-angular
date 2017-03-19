angular.module('trackMyShow.controllers', [])


.controller("homeController", function($http, auth, store, userProfile, toastr){

    var vm = this;
    vm.auth = auth;
    vm.user = userProfile;

    //check if there are profiles in the store
    vm.user.fav = store.get('shows') || [];

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

            var urlSearch = 'http://ec2-54-164-197-203.compute-1.amazonaws.com:3131/public/getSeriesDetails/' + tvShow.id;                    
            //var urlSearch = 'http://sid-win10:3131/public/getSeriesDetails/' + tvShow.id;
            $http.get(urlSearch).then(function(res){                                
                
                tvShow.poster   = "_cache/posters/" + tvShow.id + "-1.jpg";            
                tvShow.pgrating = res.data.data.rating;
                tvShow.rating   = res.data.data.siteRating;
                tvShow.airsTime = res.data.data.airsTime;
                tvShow.airsDayOfWeek = res.data.data.airsDayOfWeek;

                vm.user.fav.push(tvShow);

                store.set('shows', vm.user.fav);

                toastr.success(tvShow.seriesName +  ' Added to your collection!');                 

            });
            
        }

        


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
.controller('profileController', function(userProfile, store, toastr){
    
    var vm = this;
    vm.profile = userProfile;
    vm.profile.fav = store.get('shows');

    vm.showDetails = vm.profile.fav[0];    
    console.log("profile user: ", vm.showDetails);


    vm.viewShowDetails = function(show){
        vm.showDetails = show;
        console.log("profile user: ", vm.showDetails);
    };

    vm.removeFromCollection = function(show){
        
        vm.profile.fav = _.without(vm.profile.fav, show);
        store.set('shows', vm.profile.fav);
        
        toastr.success(show.seriesName +  " has been removed from your collection!");
        
        vm.showDetails = vm.profile.fav[0];
        

    };


})
.controller('coverController', function(){
    var vm = this;
    vm.message = "welcome to welcome!";
})


;