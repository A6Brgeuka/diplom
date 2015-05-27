(function() {
    angular
        .module('FrontApp')
        .controller('BaseController', BaseController)
        .controller('PostController', PostController)
        .controller('SecondController', SecondController)
        .controller('DetailsUserCtrl', DetailsUserCtrl)
        .controller('SignInController', SignInController);
    //.controller('SignUpController', SignUpController);

    BaseController.$inject = [];
    FirstController.$inject = ['ShowUser'];
    SecondController.$inject = [];
    DetailsUserCtrl.$inject = ['$routeParams', 'DetailUser', 'EditUser'];
    SignInController.$inject = ['$routeParams', 'SignInUser'];
    //SignUpController.$inject = ['$routeParams'];

    function BaseController(){
        var vm = this;
    }

    function PostController(ShowUser){
        var vm = this;
        vm.hello = "hello";
        vm.users = [];
        vm.getUsers = getUsers;


        function Init(){
            ShowUser.query({}, function(answer){
                //vm.users = answer[0];
                vm.users = answer;
                console.log(answer);
            });
        }

        function getUsers(){
            Init();
        }
    }

    function SecondController(){
        var vm = this;
    }

    function DetailsUserCtrl($routeParams, DetailUser, EditUser){
        var vm = this;
        vm.login = '';
        vm.fName = '';
        vm.lName = '';
        vm.saveUser = saveUser;
        vm.editUserId = 0;

        DetailUser.query({id: $routeParams.userId}, function(answer){
            //console.log(answer[0]);
            vm.login = answer[0].login;
            vm.fName = answer[0].firstname;
            vm.lName = answer[0].lastname;
            vm.editUserId = answer[0]._id;
        });

        function saveUser(){

            EditUser.query({ id: vm.editUserId, login: vm.login, firstname: vm.fName, lastname: vm.lName}, function(answer){
                if(!answer[0]){
                    alert(answer[1]);
                } else {
                    //console.log(answer);
                    alert(answer[1]);
                }
                //console.log(answer);
            });
        }
    }

    function SignInController($routeParams, SignInUser){
        var vm = this;
        vm.login = 'login@login.com';
        vm.password = 'asd';

        function loginUser(){

            SignInUser.query({login: vm.login, password: vm.password}, function(answer){
                if(!answer[0]){
                    alert(answer[1]);
                } else {
                    alert("OK");
                }
                //console.log(answer);
            });
        }
    }








})();