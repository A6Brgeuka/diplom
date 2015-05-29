(function() {
    angular
        .module('AdminApp')
        .controller('GalleryController', GalleryController)
        .controller('CreateGalleryController', ['$scope', 'FileUploader', function($scope, FileUploader) {
            var vm = this;
            var uploader = $scope.uploader = new FileUploader({
                url: '/adm/gallery/upload'
            });

            // FILTERS

            uploader.filters.push({
                name: 'customFilter',
                fn: function(item, options) {
                    return this.queue.length < 10;
                }
            });
        }]);

    GalleryController.$inject = [];

        function GalleryController(){
            vm = this;
        }



})();