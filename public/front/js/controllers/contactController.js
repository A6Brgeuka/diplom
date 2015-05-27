(function() {
    angular
        .module('FrontApp')
        .controller('ContactController', ContactController);

    ContactController.$inject = [];

    function ContactController(){
        var vm = this;
    }
})();