(function() {
    angular
        .module('FrontApp')
        .controller('GalleryController', GalleryController);

    GalleryController.$inject = ['GetGalleries'];

    function GalleryController(GetGalleries){
        var vm = this;

        vm.galleries = [];
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

})();