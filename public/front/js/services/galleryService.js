(function(){
    angular
        .module('FrontApp')
        .factory('GetGalleries', GetGalleries);

    GetGalleries.$inject = ['$resource'];

    function GetGalleries($resource){
        return $resource('/front/gallery/getgalleries', {}, {
            //console.log("asasdasd");
            query: {method:'GET', params:{}, isArray:true}
        });
    }
})();