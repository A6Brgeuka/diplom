(function(){
    angular
        .module('AdminApp')
        .factory('GetGalleries', GetGalleries);

    GetGalleries.$inject = ['$resource'];

    function GetGalleries($resource){
        return $resource('/adm/gallery/getgalleries', {}, {
            //console.log("asasdasd");
            query: {method:'GET', params:{}, isArray:true}
        });
    }


})();