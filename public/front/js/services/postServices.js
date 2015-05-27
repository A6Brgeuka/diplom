(function(){
    angular
        .module('FrontApp')
        //.factory('CreatePost', CreatePost)
        .factory('GetPosts', GetPosts)
        .factory('DetailsPost', DetailsPost);

    //CreatePost.$inject = ['$resource'];
    GetPosts.$inject = ['$resource'];
    DetailsPost.$inject = ['$resource'];

    function DetailsPost($resource, $id){
        return $resource('/details', {}, {
            //console.log("asasdasd");
            query: {method:'GET', params:{id: $id}, isArray:true}
        });
    }

    function GetPosts($resource){
        return $resource('/showpost', {}, {
            //console.log("asasdasd");
            query: {method:'GET', params:{}, isArray:true}
        });
    }
})();