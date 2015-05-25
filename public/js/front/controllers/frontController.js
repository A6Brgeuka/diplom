(function() {
    angular
        .module('angularApp')
        .controller('FrontController', FrontController);

    FrontController.$inject = ['SignOutUser'];

    function FrontController(SignOutUser){
        var vm = this;
        vm.logout = logout;

        function logout(){
            SignOutUser.query({}, function(){
                alert("Bye");
            })
        }
    }
})();