(function(){
    angular
        .module('AdminApp')
        .factory('CreateCategory', CreateCategory)
        .factory('GetCategories', GetCategories)
        .factory('DetailsCategory', DetailsCategory)
        .factory('EditCategory', EditCategory)
        .factory('DeleteCategory', DeleteCategory);

    CreateCategory.$inject = ['$resource'];
    GetCategories.$inject = ['$resource'];
    DetailsCategory.$inject = ['$resource'];
    EditCategory.$inject = ['$resource'];
    DeleteCategory.$inject = ['$resource'];



    function CreateCategory($resource, $name){
        console.log("asasdasd");
        return $resource('/adm/category/create', {}, {

            query: {method:'POST', params:{name: $name}, isArray:true}
        });
    }

    function GetCategories($resource){
        return $resource('/adm/category/getcategories', {}, {
            //console.log("asasdasd");
            query: {method:'GET', params:{}, isArray:true}
        });
    }

    function DetailsCategory($resource, $id){
        return $resource('/adm/category/details', {}, {
            //console.log("asasdasd");
            query: {method:'GET', params:{id: $id}, isArray:true}
        });
    }

    function EditCategory($resource, $id, $name){
        return $resource('/adm/category/update', {}, {
            //console.log("asasdasd");
            query: {method:'POST', params:{id: $id, name: $name}, isArray:true}
        });
    }

    function DeleteCategory($resource, $id){
        return $resource('/adm/category/remove', {}, {
            //console.log("asasdasd");
            query: {method:'POST', params:{id: $id}, isArray:true}
        });
    }
})();