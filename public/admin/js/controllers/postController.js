(function() {
    angular
        .module('AdminApp')
        .controller('PostController', PostController)
        .controller('CreatePostController', CreatePostController)
        .controller('DetailsPostController', DetailsPostController);

    PostController.$inject = ['GetPosts'];
    CreatePostController.$inject = ['CreatePost'];
    DetailsPostController.$inject = ['$routeParams', 'DetailsPost', 'EditPost'];

    function PostController(GetPosts){
        var vm = this;

        vm.posts = [];
        //vm.showPosts = showPosts;
        vm.lengthPost = 0;

        showPosts();

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
        vm.create = Init;

        function Init(){
            CreatePost.query({title: vm.title, brief: vm.brief, extended: vm.extended}, function(answer){
                if(!answer[0]){
                    alert(answer[1]);
                } else {
                    alert("Post created");
                    //document.location.href = 'adm/post';
                    //$location.href('/');

                }
            });
        }
    }

    function DetailsPostController($routeParams, DetailsPost, EditPost){
        var vm = this;

        vm.post = [];
        vm.savePost = savePost;

        vm.title = '';
        vm.brief = '';
        vm.extended = '';
        vm.Author = '';

        DetailsPost.query({id: $routeParams.id}, function(answer){
            //console.log(answer);
            console.log(answer[0]);
            vm.postId = answer[0]._id;
            vm.title = answer[0].title;
            //console.log(answer[0].title);
            vm.brief = answer[0].content.brief;
            vm.extended = answer[0].content.extended;
            vm.Author = answer[0].Author;

        });

        function savePost(){

            EditPost.query({ id: vm.postId, title: vm.title, brief: vm.brief, extended: vm.extended, Author: vm.Author}, function(answer){
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

})();