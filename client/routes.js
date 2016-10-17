var app = angular.module('app', ['ngRoute'])

.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'partials/welcome.html'
    })
    .when('/game', {
        templateUrl: 'partials/game.html'
    })
    // .when('/topic/:id', {
    //     templateUrl: 'partials/topicPartial.html'
    // })
    // .when('/orders', {
    //     templateUrl: 'partials/ordersPartial.html'
    // })
    // .when('/login', {
    //     templateUrl: 'partials/loginPartial.html'
    // })
    .otherwise({
        redirectTo:'/'
    })
})
