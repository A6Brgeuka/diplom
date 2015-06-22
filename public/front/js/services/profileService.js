(function(){
    angular
        .module('FrontApp')
        .factory('getUser', getUser)
        .factory('EditProfile', EditProfile)
        .factory('ChangePassword', ChangePassword);

    getUser.$inject = ['$resource'];
    EditProfile.$inject = ['$resource'];
    ChangePassword.$inject = ['$resource'];

    function getUser($resource){
        return $resource('/front/profile', {}, {
            query: {method:'GET', params:{}, isArray:true}
        });
    }

    function EditProfile($resource, $id, $login, $firstname, $lastname, $phone){
        return $resource('/front/profile/update', {}, {
            //console.log("asasdasd");
            query: {method:'POST', params:{id: $id, login: $login, firstname: $firstname, lastname: $lastname, phone: $phone}, isArray:true}
        });
    }

    function ChangePassword($resource, $old, $new, $confnew){
        return $resource('/front/profile/changePassword', {}, {
            query: {method:'POST', params:{old: $old, new: $new, confnew: $confnew}, isArray:true}
        });
    }

})();