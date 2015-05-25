(function(){
    'use strict';

    angular
        .module('angularApp')
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider.
                    when('/', {
                        templateUrl:  'partials/front/frontpage.ejs',
                        controller: 'FrontController',
                        controllerAs: 'vm'
                    }).
                    when('/signin', {
                        templateUrl:  'partials/front/auth/signin.ejs',
                        controller: 'SignInController',
                        controllerAs: 'vm'
                    }).
                    when('/signup', {
                        templateUrl:  'partials/front/auth/signup.ejs',
                        controller: 'SignUpController',
                        controllerAs: 'vm'
                    }).
                    when('/post', {
                        templateUrl:  'partials/front/post.ejs',
                        controller: 'PostController',
                        controllerAs: 'vm'
                    }).
                    when('/gallery', {
                        templateUrl:  'partials/front/gallery.ejs',
                        controller: 'GalleryController',
                        controllerAs: 'vm'
                    }).
                    when('/contact', {
                        templateUrl:  'partials/front/contact.ejs',
                        controller: 'ContactController',
                        controllerAs: 'vm'
                    }).
                    /*when('/users/:userId', {
                        templateUrl:  '../partials/detailsUser.ejs',
                        controller: 'DetailsUserCtrl',
                        controllerAs: 'vm'
                    }).*/
                    otherwise({
                        redirectTo: '/'
                    });
            }]);
})();