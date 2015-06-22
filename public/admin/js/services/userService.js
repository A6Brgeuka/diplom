(function(){
    angular
        .module('AdminApp')
        .factory('GetUsers', GetUsers)
        .factory('DetailsUser', DetailsUser)
        .factory('EditUser', EditUser)
        .factory('CreateUser', CreateUser)
        .factory('DeleteUser', DeleteUser);


    GetUsers.$inject = ['$resource'];
    DetailsUser.$inject = ['$resource'];
    EditUser.$inject = ['$resource'];
    CreateUser.$inject = ['$resource'];
    DeleteUser.$inject = ['$resource'];

    function GetUsers($resource){
        return $resource('/adm/user/getusers', {}, {
            //console.log("asasdasd");
            query: {method:'GET', params:{}, isArray:true}
        });
    }

    function DetailsUser($resource, $id){
        return $resource('/adm/user/details', {}, {
            query: {method:'GET', params:{id: $id}, isArray:true}
        });
    }

    function EditUser($resource, $id, $login, $firstname, $lastname, $phone, $isAdmin){
        return $resource('/adm/user/update', {}, {
            //console.log("asasdasd");
            query: {method:'POST', params:{id: $id, login: $login, firstname: $firstname, lastname: $lastname, phone: $phone, isAdmin: $isAdmin}, isArray:true}
        });
    }

    function CreateUser($resource, $login, $password, $firstname, $lastname, $phone, $isAdmin){
        return $resource('/adm/user/create', {}, {
            //console.log("asasdasd");
            query: {method:'POST', params:{login: $login, password: $password, firstname: $firstname, lastname: $lastname, phone: $phone, isAdmin: $isAdmin}, isArray:true}
        });
    }

    function DeleteUser($resource, $id){
        return $resource('/adm/user/remove', {}, {
            //console.log("asasdasd");
            query: {method:'POST', params:{id: $id}, isArray:true}
        });
    }


    /*function CreatePost($resource, $title, $brief, $extended){
        return $resource('/adm/post/create', {}, {
            //console.log("asasdasd");
            query: {method:'POST', params:{title: $title, brief: $brief, extended: $extended}, isArray:true}
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
    }*/
})();