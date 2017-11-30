myApp.controller('EditTransactionController', function ($scope, $http, $mdDialog, DataService) {
    console.log('EditTransactionController created');
    var vm = this;
    vm.dataService = DataService;

    vm.editing = false; // decide whether we want to go to Post route (adding) or Put route (editing)
    vm.editingId = 0; 

    DataService.selectedTransaction.data = {
        date: '',
        description: '',
        category_name: [],
        // user_id: '',
        category_id: '',
        amount: 0,
        //id: ''
    };

    vm.transaction = DataService.selectedTransaction;

    vm.transactionList = DataService.transactionList;

    vm.editClicked = function (transaction) {
        vm.editing = true;
        DataService.selectedTransaction.data = {
            date: new Date(transaction.date),
            description: transaction.description,
            category_id: transaction.category_id,
            amount: transaction.amount,
            id: transaction.id
        };

    }

    // Open dialog window
    vm.openWindow = function () {
        $mdDialog.show({
            templateUrl: '../views/templates/editTransaction.html',
            controller: 'EditTransactionController as ec',
            clickOutsideToClose: true

        })
    }

})