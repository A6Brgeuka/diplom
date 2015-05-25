(function() {
    angular
        .module('angularApp')
        .controller('PostController', PostController)
        .controller('CreatePostController', CreatePostController);

    PostController.$inject = ['GetPosts'];
    CreatePostController.$inject = ['CreatePost'];


    function PostController(GetPosts){
        var vm = this;

        vm.posts = [];
        vm.showPosts = showPosts;

        function showPosts(){
            GetPosts.query({}, function(answer){
                if(!answer[0]){
                    alert(answer[1]);
                } else {
                    vm.posts = answer[1];
                }
            });
        }
    }

    function CreatePostController(CreatePost){
        var vm = this;

        vm.title = '';
        vm.brief = '';
        vm.extended = '';
        vm.create = create;

        function create(){
            CreatePost.query({title: vm.title, brief: vm.brief, extended: vm.extended}, function(answer){
                if(!answer[0]){
                    alert(answer[1]);
                } else {
                    alert("Post created");
                    //$location.href('/');

                }
            });
        }
    }
})();