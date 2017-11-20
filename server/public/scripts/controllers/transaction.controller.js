myApp.controller('TransactionController', function (UserService, $http) {
    console.log('TransactionController created');
    var vm = this;
    vm.userService = UserService;
   // vm.categories = ['Rent/Mortgage', 'Utilities', 'Groceries', 'Travel', 'Emergency'];
    // vm.selectedCategory;
    // vm.transaction = {
    //         date: '',
    //         description: '',
    //         category: '',
    //         amount: 0
    //         };
    // vm.transactionList = [];

    

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
    

    // DELETE Transactions
    vm.deleteTransaction = function (transactionId) {
        $http.delete('/transaction/' + transactionId).then (function (response) {
            console.log('success');
            vm.viewTransaction();
        }).catch( function (error) {
            console.log('failure');   
        });
    }

    // EDIT Transactions
    vm.editTransaction = function (transactionId) {
        console.log(transactionId);
        $http.put('/transaction/' + transactionId).then (function (response) { 
            console.log('success');
            vm.viewTransaction();
        }).catch(function (error) {
            console.log('failure');    
        });
    }

    // vm.editClicked = function () {

    // }

    vm.viewTransaction();
});
