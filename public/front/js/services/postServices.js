(function(){
    angular
        .module('angularApp')
        .factory('CreatePost', CreatePost)
        .factory('GetPosts', GetPosts);

    CreatePost.$inject = ['$resource'];
    GetPosts.$inject = ['$resource'];


    function CreatePost($resource, $title, $brief, $extended){
        return $resource('createpost', {}, {
            //console.log("asasdasd");
            query: {method:'POST', params:{title: $title, brief: $brief, extended: $extended}, isArray:true}
        });
    }

    function GetPosts($resource){
        return $resource('/showpost', {}, {
            //console.log("asasdasd");
            query: {method:'GET', params:{}, isArray:true}
        });
    }
})();