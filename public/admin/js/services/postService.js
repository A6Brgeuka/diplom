(function(){
    angular
        .module('AdminApp')
        .factory('CreatePost', CreatePost)
        .factory('GetPosts', GetPosts)
        .factory('DetailsPost', DetailsPost)
        .factory('EditPost', EditPost)
        .factory('DeletePost', DeletePost);

    CreatePost.$inject = ['$resource'];
    GetPosts.$inject = ['$resource'];
    DetailsPost.$inject = ['$resource'];
    EditPost.$inject = ['$resource'];
    DeletePost.$inject = ['$resource'];



    function CreatePost($resource, $title, $brief, $extended){
        return $resource('/adm/post/create', {}, {
            //console.log("asasdasd");
            query: {method:'POST', params:{title: $title, brief: $brief, extended: $extended}, isArray:true}
        });
    }

    function GetPosts($resource){
        return $resource('/adm/post/getposts', {}, {
            //console.log("asasdasd");
            query: {method:'GET', params:{}, isArray:true}
        });
    }

    function DetailsPost($resource, $id){
        return $resource('/adm/post/details', {}, {
            //console.log("asasdasd");
            query: {method:'GET', params:{id: $id}, isArray:true}
        });
    }

    function EditPost($resource, $id, $title, $brief, $extended, $Author){
        return $resource('/adm/post/update', {}, {
            //console.log("asasdasd");
            query: {method:'POST', params:{id: $id, title: $title, brief: $brief, extended:$extended, Author: $Author}, isArray:true}
        });
    }

    function DeletePost($resource, $id){
        return $resource('/adm/post/remove', {}, {
            //console.log("asasdasd");
            query: {method:'POST', params:{id: $id}, isArray:true}
        });
    }
})();