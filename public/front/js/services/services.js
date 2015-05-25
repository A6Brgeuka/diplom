(function(){
    angular
        .module('angularApp')
        .factory('ShowUser', ShowUser)
        .factory('DetailUser', DetailUser)
        .factory('EditUser', EditUser)
        .factory('SignInUser', SignInUser);



    ShowUser.$inject = ['$resource'];
    DetailUser.$inject = ['$resource'];
    EditUser.$inject = ['$resource'];
    SignInUser.$inject = ['$resource'];


    function ShowUser($resource){
        return $resource('show', {}, {
            query: {method:'GET', params:{}, isArray:true}
        });
    }

    function DetailUser($resource, $id){
        return $resource('details', {}, {
            query: {method:'GET', params:{id: $id}, isArray:true}
        });
    }

    function EditUser($resource, $id, $login, $fistname, $lastname){
        return $resource('edit', {}, {
            query: {method:'POST', params:{id: $id,  login: $login, fistname: $fistname, lastname: $lastname}, isArray:true}
        });
    }

    function SignInUser($resource, $login, $password){
        return $resource('signin', {}, {
            //console.log("asasdasd");
            query: {method:'POST', params:{login: $login, password: $password}, isArray:true}
        });
    }









})();