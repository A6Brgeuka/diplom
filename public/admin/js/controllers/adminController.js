(function() {
    angular
        .module('AdminApp')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['SignOutUser'];

    function AdminController(SignOutUser){
        var vm = this;

        vm.logout = logout;

        function logout(){
            SignOutUser.query({}, function(){
                alert("Bye Admin");
                document.location.href = '/';
            })
        }
    }
})();