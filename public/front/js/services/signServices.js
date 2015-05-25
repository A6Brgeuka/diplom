(function(){
    angular
        .module('angularApp')
        .factory('SignInUser', SignInUser)
        .factory('SignUpUser', SignUpUser)
        .factory('SignOutUser', SignOutUser);

    SignInUser.$inject = ['$resource'];
    SignUpUser.$inject = ['$resource'];
    SignOutUser.$inject = ['$resource'];

    function SignInUser($resource, $login, $password){
        return $resource('signin', {}, {
            //console.log("asasdasd");
            query: {method:'POST', params:{login: $login, password: $password}, isArray:true}
        });
    }

    function SignUpUser($resource, $login, $password){
        return $resource('signup', {}, {
            //console.log("asasdasd");
            query: {method:'POST', params:{login: $login, password: $password}, isArray:true}
        });
    }

    function SignOutUser($resource){
        return $resource('signout', {}, {
            //console.log("asasdasd");
            query: {method:'POST', params:{}, isArray:true}
        });
    }
})();