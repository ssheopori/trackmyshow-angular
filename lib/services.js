angular.module('trackMyShow.services', [])


.factory('userProfile', function(){

  user = {};

  user.displayName  = '';
  user.email        = 'you@me.com';
  user.userID       = '';    
  user.avatar       = 'https://placekitten.com/150/150';  
  user.fav          = [],
  user.watchList    = []
  
  return user;  


});