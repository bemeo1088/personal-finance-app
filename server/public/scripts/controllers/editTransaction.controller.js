myApp.controller('EditTransactionController', function ($scope, $http, $mdDialog, DataService, UserService) {
    console.log('EditTransactionController created');
    var vm = this;
    vm.dataService = DataService;

    vm.userService = UserService;

    vm.editing = false; // decide whether we want to go to Post route (adding) or Put route (editing)
    vm.editingId = 0; 

    //vm.dataService.selectedTransaction.data = dataService.selectedTransaction.data;
    // {
    //     date: '',
    //     description: '',
    //     category_name: [],
    //     // user_id: '',
    //     category_id: '',
    //     amount: 0,
    //     //id: ''
    // };

    //vm.transaction = dataService.selectedTransaction;

    //vm.transactionList = dataService.transactionList;

    // VIEW transactions
    vm.viewTransaction = function () {
        $http.get('/transaction').then(function (response) {
            console.log('success');
            console.log(response.data);

            DataService.transactionList.data = response.data;
            //$scope.message = "Timeout called!";

        }).catch(function (error) {
            console.log('failure', error);
        });
    }

    vm.categoryList = [];

    // VIEW Categories
    vm.viewCategory = function () {
        $http.get('/budget').then(function (response) {
            //console.log('success', response);
            vm.categoryList = response.data;
            //console.log('categoryList', vm.categoryList);    
        }).catch(function (error) {
            console.log('failureeeeee', error);
        });
    }
    vm.viewCategory()

    // EDIT Transactions
    vm.editTransaction = function (transactionToAdd, name, id) {
        console.log("aaaa:", name, id);
        transactionToAdd.category_name = name;
        transactionToAdd.category_id = id;
        $http.put('/transaction/' + transactionToAdd.id, transactionToAdd).then(function (response) {
            console.log('success adding transaction');
            $mdDialog.hide();
            vm.viewTransaction();

        }).catch(function (error) {
            console.log('failure', error);
            $mdDialog.hide();
        });
    }

});