(function() {
    angular
        .module('AdminApp')
        .controller('PostController', PostController);

    PostController.$inject = [];

    function PostController(){
        var vm = this;


        /*vm.logout = logout;

        function logout(){
            SignOutUser.query({}, function(){
                alert("Bye Admin");
                document.location.href = '/';
            })
        }*/
    }
})();