(function() {
    angular
        .module('FrontApp')
        .controller('ProfileController', ProfileController)
        .controller('EditProfileController', EditProfileController)
        .controller('ChangePasswordController', ChangePasswordController);

    ProfileController.$inject = ['getUser'];
    EditProfileController.$inject = ['getUser', 'EditProfile'];
    ChangePasswordController.$inject = ['ChangePassword'];

    function ProfileController(getUser){
        var vm = this;

        vm.user = [];
        Init();

        function Init(){
            getUser.query({}, function(answer){
                if(!answer[0]){
                    alert(answer[1]);
                } else {
                    vm.user = answer[1];
                    //console.log(answer[1]);
                }
            });
        }
    }

    function EditProfileController(getUser, EditProfile){
        var vm = this;

        vm.saveUser = saveUser;

        getUser.query({}, function(answer){
            if(!answer[0]){
                alert(answer[1]);
            } else {
                vm.user = answer[1];
                console.log(answer[1]);
            }
        });

        function saveUser(){

            EditProfile.query({ id: vm.user[0]._id, login: vm.user[0].login, firstname: vm.user[0].name.firstname, lastname: vm.user[0].name.lastname, phone: vm.user[0].phone}, function(answer){
                if(!answer[0]){
                    alert(answer[1]);
                } else {
                    //console.log(answer);
                    alert("Profile Update");
                    document.location.href = '#/profile';
                }
            });
        }
    }

    function ChangePasswordController(ChangePassword){
        var vm = this;

        vm.changePassword = changePassword;
        vm.oldPassword = '';
        vm.newPassword = '';
        vm.confNewPassword = '';

        function changePassword(){
            if(!(vm.newPassword == vm.confNewPassword)){
                alert("Пароль не совпадают");
                return;
            }
            ChangePassword.query({ old: vm.oldPassword, new: vm.newPassword, confnew: vm.confNewPassword}, function(answer){
                if(!answer[0]){
                    alert(answer[1]);
                } else {
                    //console.log(answer);
                    alert("Password changed");
                    //console.log(answer[0]);
                }
                //console.log(answer);
            });
        }
    }
})();
