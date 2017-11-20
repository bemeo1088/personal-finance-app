myApp.controller('TransactionController', function (UserService, $http) {
    console.log('TransactionController created');
    var vm = this;
    vm.userService = UserService;
   // vm.categories = ['Rent/Mortgage', 'Utilities', 'Groceries', 'Travel', 'Emergency'];
    vm.selectedCategory;
    vm.transaction = {
            date: '',
            description: '',
            category: '',
            amount: 0
            };
    vm.transactionList = [];

    // ADD transactions
    vm.addTransaction = function (transactionToAdd) {
        console.log(transactionToAdd);
        $http.post('/transaction', transactionToAdd).then(function (response) {
            console.log('success');
            //vm.viewTransaction();
        }).catch(function (error) {
            console.log('failure', error);      
        });
    }

    // // Selected text from Categories dropdown list
    // vm.getSelectedText = function () {
    //     if (vm.selectedCategory !== undefined) {
    //         return "Category", vm.selectedCategory;
    //     } else {
    //         return "Please select a category"
    //     }
    // };
    
    // VIEW transactions
    vm.viewTransaction = function () {
        $http.get('/transaction').then(function (response) {
            console.log('success');
            vm.transactionList = response.data;
        }).catch(function (error) {
            console.log('failure', error);
            
        });
    }
    vm.viewTransaction();
});
