angular.module('basicMEAN')
.controller('View2Ctrl', function (Settings) {
    var self = this;

    self.message = 'This is some more text relevant to view 2, but is stored in the View2Ctrl.';

    self.$onInit = function () {
        Settings.init.then(function () {
            self.message = Settings.data.view2Msg;
        })
    };

    self.$onInit();
});