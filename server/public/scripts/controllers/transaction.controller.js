myApp.controller('TransactionController', function (UserService, $http) {
    console.log('TransactionController created');
    var vm = this;
    vm.userService = UserService;
    vm.transaction = {};

    vm.addTransaction = function (transactionToAdd) {
        console.log(transactionToAdd);
        $http.post('/transaction', transactionToAdd).then(function (response) {
            console.log('success');
        }).catch(function (error) {
            console.log('failure');      
        });
    }
});

    vm.viewTransaction = function () {
        $http.get('/transaction').then(function (response) {
            console.log('success');
            vm.transaction = response.data;
        }).catch(function (error) {
            console.log('failure', error);
            
        });
    }
    vm.viewTransaction();