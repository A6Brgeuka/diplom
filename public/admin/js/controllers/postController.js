(function() {
    angular
        .module('AdminApp')
        .controller('PostController', PostController)
        .controller('CreatePostController', CreatePostController)
        .controller('DetailsPostController', DetailsPostController);

    PostController.$inject = ['GetPosts'];
    CreatePostController.$inject = ['CreatePost'];
    DetailsPostController.$inject = ['$routeParams', 'DetailsPost', 'EditPost', 'DeletePost'];

    function PostController(GetPosts){
        var vm = this;

        vm.posts = [];

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
                    document.location.href = '/adm#/posts';
                }
            });
        }
    }

    function DetailsPostController($routeParams, DetailsPost, EditPost, DeletePost){

        var vm = this;

        vm.post = [];
        vm.savePost = savePost;
        vm.removePost = removePost;

        vm.title = '';
        vm.brief = '';
        vm.extended = '';
        vm.Author = '';
        vm.flag = false;

        DetailsPost.query({id: $routeParams.id}, function(answer){

            if(!(answer)){
                vm.flag = true
            }
            vm.postId = answer[0]._id;
            vm.title = answer[0].title;
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

        function removePost(){
            DeletePost.query({ id: vm.postId }, function(answer){
                if(!answer[0]){
                    alert(answer[1]);
                } else {
                    //console.log(answer);
                    alert("Post remove");
                    document.location.href = '#/posts';
                }
                //console.log(answer);
            });
        }
    }

})();