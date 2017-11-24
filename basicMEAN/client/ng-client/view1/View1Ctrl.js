angular.module('basicMEAN')
.controller('View1Ctrl', ['Settings', function (Settings) {
    let self = this;

    self.message = 'This is some more text relevant to view 1, but is stored in the View1Ctrl.';

    self.$onInit = function () {
        Settings.init.then(function () {
            self.message = Settings.data.view1Msg;
        })
    };

    self.$onInit();
}]);