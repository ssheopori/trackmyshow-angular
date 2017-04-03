(function(){

    angular
        .module('userService',['auth0','angular-jwt', 'toastr','angular-storage'])
        .factory('userService', userService);

    function userService(auth, store, toastr,$http){

        var user = {
            displayName : 'noname',
            email       : 'noemail',
            userID      : '',
            avatar      : "https://cdn.auth0.com/avatars/si.png",
            fav         : store.get('shows') || [],
            watchList   : []
        };



        function login(){

            auth.signin({}, function(profile, token){
                
                store.set('profile', profile);
                store.set('token', token);           

                user.userID = profile.user_id;
                user.email = profile.email;            
                
                toastr.success("Welcome " + user.email);

            },
            function(err){
                console.log("Error: ", err);
            });            

        };
        function logout(){

            store.remove('profile');
            store.remove('token');
            auth.signout();
            toastr.success("Logout Complete");            

        };
        function addFav(tvShow){

            var urlSearch = 'http://ec2-54-164-197-203.compute-1.amazonaws.com:3131/public/getSeriesDetails/' + tvShow.id;                    

            $http.get(urlSearch).then(
                function(successResponse){

                    tvShow.poster           = "_cache/posters/" + tvShow.id + "-1.jpg";            
                    tvShow.pgrating         = successResponse.data.data.rating;
                    tvShow.rating           = successResponse.data.data.siteRating;
                    tvShow.airsTime         = successResponse.data.data.airsTime;
                    tvShow.airsDayOfWeek    = successResponse.data.data.airsDayOfWeek;

                    user.fav.push(tvShow);
                    store.set('shows', user.fav);

                    toastr.success(tvShow.seriesName +  ' Added to your collection!');                     

                },
                function(errorResponse){
                    toastr.error("There was an error: ", errorResponse);
                }
            );
            



        };
        function removeFav(tvShow){

            user.fav = _.without(user.fav, tvShow);
            store.set('shows', user.fav);
            
            toastr.success(tvShow.seriesName +  " has been removed from your collection!");
            
            return user.fav;

        };



        var service = {
            user: user,
            login: login,
            logout: logout,
            addFav: addFav,
            removeFav: removeFav
        };

        return service;




    }
        
    
        


}());