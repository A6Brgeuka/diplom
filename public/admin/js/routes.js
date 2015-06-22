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
                        templateUrl:  'admin/partials/post/posts.ejs',
                        controller: 'PostController',
                        controllerAs: 'vm'
                    }).
                    when('/post/:id', {
                        templateUrl:  'admin/partials/post/detailsPost.ejs',
                        controller: 'DetailsPostController',
                        controllerAs: 'vm'
                    }).
                    when('/createpost', {
                        templateUrl:  'admin/partials/post/createPost.ejs',
                        controller: 'CreatePostController',
                        controllerAs: 'vm'
                    }).
                    when('/users', {
                        templateUrl:  'admin/partials/user/users.ejs',
                        controller: 'UserController',
                        controllerAs: 'vm'
                    }).
                    when('/user/:id', {
                        templateUrl:  'admin/partials/user/detailsUser.ejs',
                        controller: 'DetailsUserController',
                        controllerAs: 'vm'
                    }).
                    when('/createuser', {
                        templateUrl:  'admin/partials/user/createUser.ejs',
                        controller: 'CreateUserController',
                        controllerAs: 'vm'
                    }).
                    when('/galleries', {
                        templateUrl:  'admin/partials/gallery/galleries.ejs',
                        controller: 'GalleryController',
                        controllerAs: 'vm'
                    }).
                    when('/creategallery', {
                        templateUrl:  'admin/partials/gallery/createGallery.ejs',
                        controller: 'CreateGalleryController',
                        controllerAs: 'vm'
                    }).
                    when('/gallery/:id', {
                        templateUrl:  'admin/partials/gallery/detailsGallery.ejs',
                        controller: 'DetailsGalleryController',
                        controllerAs: 'vm'
                    }).
                    when('/categories', {
                        templateUrl:  'admin/partials/category/categories.ejs',
                        controller: 'CategoryController',
                        controllerAs: 'vm'
                    }).
                    when('/category/:id', {
                        templateUrl:  'admin/partials/Category/detailsCategory.ejs',
                        controller: 'DetailsCategoryController',
                        controllerAs: 'vm'
                    }).
                    when('/createcategory', {
                        templateUrl:  'admin/partials/Category/createCategory.ejs',
                        controller: 'CreateCategoryController',
                        controllerAs: 'vm'
                    }).
                    otherwise({
                        redirectTo: '/'
                    });
            }]);
})();