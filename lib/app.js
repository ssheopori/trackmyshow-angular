angular.module('trackMyShow', ['trackMyShow.controllers', 'trackMyShow.directives','trackMyShow.services', 'ui.router','auth0','angular-storage', 'angular-jwt', 'toastr', 'userService'])


.config(function($stateProvider, $urlRouterProvider, $provide, authProvider, jwtInterceptorProvider){

    
    authProvider.init({
        domain: 'sidsheopori.auth0.com',
        clientID: '6TWo51xhwdB6YewVGOZJTxO2yA27dsEc'
    });

    $urlRouterProvider.otherwise('/home');        

    $stateProvider
        .state('cover',{
            url: '/cover',
            templateUrl: '/pages/cover.html',
            controller: 'coverController as coverCtrl'
        })
        .state('home',{
            url: '/home',
            templateUrl: '/pages/home.html',
            controller: 'homeController as home'
        })
        .state('profile',{
            url: '/profile',
            templateUrl: '/pages/profile.html',
            controller: 'profileController as profile'
        })
        .state('docs',{
            url: '/docs',
            templateUrl: '/pages/docs.html',
            controller: 'docsController as docs'
        })
        ;



})



;

