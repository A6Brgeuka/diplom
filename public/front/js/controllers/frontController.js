(function() {
    angular
        .module('FrontApp')
        .controller('FrontController', FrontController);

    FrontController.$inject = ['SignOutUser'];

    function FrontController(SignOutUser){
        var vm = this;
        vm.logout = logout;

        function logout(){
            SignOutUser.query({}, function(){
                alert("Bye");
                document.location.href = '/';
            })
        }
    }
})();