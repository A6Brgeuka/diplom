(function() {
    angular
        .module('FrontApp')
        .controller('PostController', PostController)
        .controller('DetailsPostController', DetailsPostController);

    PostController.$inject = ['GetPosts'];
    DetailsPostController.$inject = ['$routeParams', 'DetailsPost'];


    function PostController(GetPosts){
        var vm = this;

        vm.posts = [];
        //vm.showPosts = showPosts;

        Init();

        function Init(){
            GetPosts.query({}, function(answer){
                if(!answer[0]){
                    alert(answer[1]);
                } else {
                    vm.posts = answer[1];
                }
            });
        }
    }

    function DetailsPostController($routeParams, DetailsPost){
        var vm = this;

        vm.title = '';
        vm.brief = '';
        vm.extended = '';
        vm.Author = '';

        DetailsPost.query({id: $routeParams.id}, function(answer){

            vm.title = answer[0].title;
            //console.log(answer[0].title);
            vm.brief = answer[0].content.brief;
            vm.extended = answer[0].content.extended;
            vm.Author = answer[0].Author;

        });
    }

})();