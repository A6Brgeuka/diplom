(function() {
    angular
        .module('AdminApp')
        .controller('UserController', UserController)
        .controller('DetailsUserController', DetailsUserController)
        .controller('CreateUserController', CreateUserController);

    UserController.$inject = ['GetUsers'];
    DetailsUserController.$inject = ['$routeParams', 'DetailsUser', 'EditUser'];
    CreateUserController.$inject = ['CreateUser'];

    function UserController(GetUsers){
        var vm = this;

        vm.users = [];

        showUsers();

        function showUsers(){
            GetUsers.query({}, function(answer){
                if(!answer[0]){
                    alert(answer[1]);
                } else {
                    vm.users = answer[1];
                }
            });
        }

    }

    function DetailsUserController($routeParams, DetailsUser, EditUser){
        var vm = this;

        vm.user = [];
        vm.saveUser = saveUser;

        vm.login = '';
        vm.fName = '';
        vm.lName = '';
        vm.phone = 0;
        vm.isAdmin = false;

        DetailsUser.query({id: $routeParams.id}, function(answer){

            //console.log(answer);

            vm.userId = answer[0]._id;
            vm.login = answer[0].login;
            vm.fName = answer[0].name.firstname;
            vm.lName = answer[0].name.lastname;
            vm.phone = answer[0].phone;
            vm.isAdmin = answer[0].isAdmin

        });

        function saveUser(){

            EditUser.query({ id: vm.userId, login: vm.login, firstname: vm.fName, lastname: vm.lName, phone: vm.phone, isAdmin: vm.isAdmin}, function(answer){
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

    function CreateUserController(CreateUser){
        var vm = this;

        vm.login = '';
        vm.fName = '';
        vm.lName = '';
        vm.isAdmin = false;
        vm.phone = 0;
        vm.password = '';
        vm.confpassword = '';

        vm.saveUser = Init;

        function Init(){
            if(!(vm.confpassword===vm.password)){
                return alert("пароли не совпадают");
            }

            CreateUser.query({login: vm.login, password: vm.password, firstname: vm.fName, lastname: vm.lName, phone: vm.phone, isAdmin: vm.isAdmin}, function(answer){
                if(!answer[0]){
                    alert(answer[1]);
                } else {
                    alert("User created");
                    //$location.href('/');

                }
            });
        }
    }
})();