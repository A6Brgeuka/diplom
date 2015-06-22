(function() {
    angular
        .module('AdminApp')
        .controller('CategoryController', CategoryController)
        .controller('CreateCategoryController', CreateCategoryController)
        .controller('CreateCategoryController', DetailsCategoryController);

    CategoryController.$inject = ['GetCategories'];
    CreateCategoryController.$inject = ['CreateCategory'];
    DetailsCategoryController.$inject = ['$routeParams', 'DetailsCategory', 'EditCategory', 'DeleteCategory'];

    function CategoryController(GetCategories){
        var vm = this;

        vm.categories = [];

        showCategories();

        function showCategories(){
            GetCategories.query({}, function(answer){
                if(!answer[0]){
                    alert(answer[1]);
                } else {
                    vm.categories = answer[1];
                }
            });
        }
    }

    function CreateCategoryController(CreateCategory){
        var vm = this;

        vm.name = '';
        vm.create = Init;

        function Init(){
            CreateCategory.query({name: vm.name}, function(answer){
                if(!answer[0]){
                    alert(answer[1]);
                } else {
                    document.location.href = '/adm#/categories';
                }
            });
        }
    }

    function DetailsCategoryController($routeParams, DetailsCategory, EditCategory, DeleteCategory){

        var vm = this;

        vm.category = [];
        vm.saveCategory = saveCategory;
        vm.removeCategory = removeCategory;

        vm.name = '';

        vm.flag = false;

        DetailsCategory.query({id: $routeParams.id}, function(answer){

            if(!(answer)){
                vm.flag = true
            }
            vm.categoryId = answer[0]._id;
            vm.name = answer[0].name;
        });

        function saveCategory(){

            EditCategory.query({ id: vm.categoryId, name: vm.name}, function(answer){
                if(!answer[0]){
                    alert(answer[1]);
                } else {
                    //console.log(answer);
                    alert(answer[1]);
                }
                //console.log(answer);
            });
        }

        function removeCategory(){
            DeleteCategory.query({ id: vm.categoryId }, function(answer){
                if(!answer[0]){
                    alert(answer[1]);
                } else {
                    //console.log(answer);
                    alert("Category remove");
                    document.location.href = '#/categories';
                }
                //console.log(answer);
            });
        }
    }

})();