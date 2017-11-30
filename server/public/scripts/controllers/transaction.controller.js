myApp.controller('TransactionController', function ($scope, UserService, $http, $mdDialog) {
    console.log('TransactionController created');
    var vm = this;
    vm.userService = UserService;

    vm.editing = false; // decide whether we want to go to Post route (adding) or Put route (editing)
    vm.editingId = 0; 

    // Moment.js
    // vm.moment(date).format('YYYY-MM-DD');

   // vm.categories = ['Rent/Mortgage', 'Utilities', 'Groceries', 'Travel', 'Emergency'];
    //vm.selectedCategory;
    vm.transaction = {
            date: '',
            description: '',
            category_name: [],
            // user_id: '',
            category_id: '',
            amount: 0,
            //id: ''
            };

    vm.transactionList = [];
 
    // Column sorting
    vm.sortColumn = "date";
    vm.reverseSort = false;

    vm.sortData = function (column) {
        vm.reverseSort = (vm.sortColumn == column) ? !vm.reverseSort : false;
        vm.sortColumn = column;
    }

    vm.getSortClass = function (column) {
        if (vm.sortColumn == column) {
            return vm.reverseSort ? 'arrow-down' : 'arrow-up';
        }
            return '';
    }

    // VIEW transactions
    vm.viewTransaction = function () {
        $http.get('/transaction').then(function (response) {
            console.log('success');
            console.log(response.data);
        
            vm.transactionList = response.data;
            vm.editing = false;            // To set Edit mode to False
                //$scope.message = "Timeout called!";
        }).catch(function (error) {
            console.log('failure', error);
        });
    }

    // ADD transactions
    vm.addTransaction = function (transactionToAdd, name, id) {
        console.log("aaaa:", name, id);
        transactionToAdd.category_name = name;
        transactionToAdd.category_id = id;
        $http.post('/transaction', transactionToAdd).then(function (response) {
            console.log('success adding transaction');
            $mdDialog.hide();
            vm.viewTransaction();
            
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

    // DELETE Transactions
    vm.deleteTransaction = function (transactionId) {
        console.log('deleted', transactionId);
        swal({
            title: "Are you sure?",
            text: "You won't be able to revert this.",
            icon: "warning",
            buttons: ['No!', 'Yes, delete it!'],
            dangerMode: true
        }).then(function (willDelete) {
            if (willDelete) {
                swal('Deleted', "Your transaction has been deleted", {icon: "success"});
                $http.delete('/transaction/' + transactionId).then(function (response) {
                    console.log('success');
                    vm.viewTransaction();
                }).catch(function (error) {
                    console.log('failure');
                });
            }            
        });        
    }


    // EDIT Transactions
    vm.editTransaction = function () {
        console.log(vm.transaction);
        $http.put('/transaction/' + transaction.id, vm.transaction).then (function (response) { 
            console.log('success');
            vm.viewTransaction();
            $mdDialog.cancel();
        }).catch(function (error) {
            console.log('failure');    
        });
    }

     vm.editClicked = function (transaction) {
         vm.editing = true;
         vm.transaction = {
             date : new Date(transaction.date),
             description : transaction.description,
             category_id: transaction.category_id,
             amount: transaction.amount,
             id: transaction.id
         };

    }

    // Open dialog window
    vm.openWindow = function () {
        $mdDialog.show({
            templateUrl: '../views/templates/addTransaction.html',
            controller: 'TransactionController as tc',
            clickOutsideToClose: true

        })
    }

    vm.viewTransaction();
});
