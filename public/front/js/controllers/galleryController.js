(function() {
    angular
        .module('angularApp')
        .controller('GalleryController', GalleryController);

    GalleryController.$inject = [];

    function GalleryController(){
        var vm = this;
    }

})();