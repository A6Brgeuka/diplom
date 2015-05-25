(function() {
    angular
        .module('angularApp')
        .controller('ContactController', ContactController);

    ContactController.$inject = [];

    function ContactController(){
        var vm = this;
    }
})();