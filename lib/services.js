angular.module('trackMyShow.services', [])


.factory('userProfile', function(){

  user = {};

  user.displayName  = '';
  user.email        = 'login...';
  user.userID       = '';    
  user.avatar       = 'https://cdn.auth0.com/avatars/si.png';  
  user.fav          = [],
  user.watchList    = []
  
  return user;  


});