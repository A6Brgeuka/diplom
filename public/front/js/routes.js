(function(){
    'use strict';

    angular
        .module('angularApp')
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider.
                    when('/', {
                        templateUrl:  'front/partials/frontpage.ejs',
                        controller: 'FrontController',
                        controllerAs: 'vm'
                    }).
                    when('/signin', {
                        templateUrl:  'front/partials/auth/signin.ejs',
                        controller: 'SignInController',
                        controllerAs: 'vm'
                    }).
                    when('/signup', {
                        templateUrl:  'front/partials/auth/signup.ejs',
                        controller: 'SignUpController',
                        controllerAs: 'vm'
                    }).
                    when('/post', {
                        templateUrl:  'front/partials/post/posts.ejs',
                        controller: 'PostController',
                        controllerAs: 'vm'
                    }).
                    when('/createpost', {
                        templateUrl:  'front/partials/post/createPost.ejs',
                        controller: 'CreatePostController',
                        controllerAs: 'vm'
                    }).
                    when('/gallery', {
                        templateUrl:  'front/partials/gallery.ejs',
                        controller: 'GalleryController',
                        controllerAs: 'vm'
                    }).
                    when('/contact', {
                        templateUrl:  'front/partials/contact.ejs',
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