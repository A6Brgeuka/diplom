(function(){
    'use strict';

    angular
        .module('AdminApp')
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider.
                    when('/', {
                        templateUrl:  'admin/partials/adminpage.ejs',
                        controller: 'AdminController',
                        controllerAs: 'vm'
                    }).
                    when('/posts', {
                        templateUrl:  'admin/partials/posts.ejs',
                        controller: 'PostController',
                        controllerAs: 'vm'
                    }).
                    /*when('/signin', {
                        templateUrl:  'admin/partials/auth/signin.ejs',
                        controller: 'SignInController',
                        controllerAs: 'vm'
                    }).
                    when('/signup', {
                        templateUrl:  'admin/partials/auth/signup.ejs',
                        controller: 'SignUpController',
                        controllerAs: 'vm'
                    }).
                    when('/post', {
                        templateUrl:  'admin/partials/post/post.ejs',
                        controller: 'PostController',
                        controllerAs: 'vm'
                    }).
                    when('/createpost', {
                        templateUrl:  'admin/partials/post/createPost.ejs',
                        controller: 'CreatePostController',
                        controllerAs: 'vm'
                    }).
                    when('/gallery', {
                        templateUrl:  'admin/partials/gallery.ejs',
                        controller: 'GalleryController',
                        controllerAs: 'vm'
                    }).*/
                    /*when('/contact', {
                        templateUrl:  'admin/partials/contact.ejs',
                        controller: 'ContactController',
                        controllerAs: 'vm'
                    }).*/
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