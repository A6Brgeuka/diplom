(function(){
    angular
        .module('AdminApp')
        .factory('SignOutUser', SignOutUser);

    SignOutUser.$inject = ['$resource'];

    function SignOutUser($resource){
        return $resource('signout', {}, {
            //console.log("asasdasd");
            query: {method:'POST', params:{}, isArray:true}
        });
    }
})();