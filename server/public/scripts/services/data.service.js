myApp.service('DataService', function ($http, $location) {
    var self = this;
    self.transactionList = {data: []};
    self.selectedTransaction = {data: {}};
});