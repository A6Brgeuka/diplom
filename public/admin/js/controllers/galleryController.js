(function() {
    angular
        .module('AdminApp')
        .controller('GalleryController', GalleryController)
        .controller('DetailsGalleryController', DetailsGalleryController)
        .controller('CreateGalleryController', ['$scope', 'FileUploader', function($scope, FileUploader) {

            var vm = this;
            vm.change = change;

            var uploader = $scope.uploader = new FileUploader({
                url: '/adm/gallery/upload',
                formData: [{
                    "nameGallery": vm.nameGallery
                }]
            });

            uploader.filters.push({
                name: 'customFilter',
                fn: function(item, options) {
                    return this.queue.length < 10;
                }
            });

            function change(){
                uploader.formData = $scope.uploader.formData = [{"nameGallery": vm.nameGallery}];

            }
        }]);

        GalleryController.$inject = ['GetGalleries'];
        DetailsGalleryController.$inject = ['$routeParams'/*, 'DetailsGallery', 'EditGallery'*/];

        function GalleryController(GetGalleries){
            vm = this;

            vm.galleries = [];
            //vm.showPosts = showPosts;
            vm.lengthPost = 0;

            showGalleries();

            function showGalleries(){
                GetGalleries.query({}, function(answer){
                    if(!answer[0]){
                        alert(answer[1]);
                    } else {
                        vm.galleries = answer[1];
                    }
                });
            }
        }

        function DetailsGalleryController($routeParams/*, DetailsGallery, EditGallery*/){

            var vm = this;

            vm.gallery = [];
            //vm.saveGallery = saveGallery;

            vm.name = '';
            vm.brief = '';
            vm.extended = '';
            vm.Author = '';

            /*DetailsGallery.query({id: $routeParams.id}, function(answer){

                vm.postId = answer[0]._id;
                vm.title = answer[0].title;
                vm.brief = answer[0].content.brief;
                vm.extended = answer[0].content.extended;
                vm.Author = answer[0].Author;

            });

            function saveGallery(){

                EditGallery.query({ id: vm.postId, title: vm.title, brief: vm.brief, extended: vm.extended, Author: vm.Author}, function(answer){
                    if(!answer[0]){
                        alert(answer[1]);
                    } else {
                        //console.log(answer);
                        alert(answer[1]);
                    }
                    //console.log(answer);
                });
            }*/
        }



})();