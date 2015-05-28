(function() {
    angular
        .module('FrontApp')
        .controller('SignInController', SignInController)
        .controller('SignUpController', SignUpController);
        //.controller('SignOutController', SignOutController);

    SignInController.$inject = ['SignInUser'];
    SignUpController.$inject = ['SignUpUser'];
    //SignOutController.$inject = ['SignOutUser'];

    function SignInController(SignInUser){
        var vm = this;
        vm.login = '';
        vm.password = '';

        vm.loginUser = loginUser;

        function loginUser(){

            SignInUser.query({login: vm.login, password: vm.password}, function(answer){
                if(!answer[0]){
                    alert(answer[1]);
                } else {
                    /*alert("Wellcome");*/
                    //location.reload();
                    document.location.href = '/';
                }
                //console.log(answer);
            });
        }
    }

    function SignUpController(SignUpUser){
        var vm = this;
        vm.login = '';
        vm.password = '';
        vm.confpassword = '';
        vm.regUser = regUser;

        function regUser(){

            if(!(vm.password === vm.confpassword)){
                alert("Input passwords must be the same");
                return;
            }

            SignUpUser.query({login: vm.login, password: vm.password}, function(answer){
                if(!answer[0]){
                    alert(answer[1]);
                } else {
                    /*alert("Wellcome");*/
                    /*location.reload();*/

                    document.location.href = '/';

                }
            });
        }
    }
})();