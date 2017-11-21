myApp.controller('BudgetController', function (UserService, $http) {
    console.log('BudgetController created');
    var vm = this;
    vm.userService = UserService;

    // ADD after-tax income for the month
    // vm.addIncome = function (incomeToAdd) {
    //     console.log('incomeToAdd', incomeToAdd);
    //     $http.post('/budget', incomeToAdd).then( function (response){
    //         console.log('success');
    //         //vm.viewBudgets();
    //     }).catch( function (error) {
    //         console.log('failure', error);    
    //     });    
    // }


    // ADD categories
    vm.addCategory = function (categoryToAdd) {
        console.log('categoryToAdd', categoryToAdd);
        $http.post('/budget', categoryToAdd).then(function(response){
            console.log('success');
            vm.viewCategory();
        }).catch(function(error){
            console.log('failure', error);    
        });
    }

    // VIEW categories
    vm.viewCategory = function () {
        $http.get('/budget').then(function (response){
            console.log('success');    
        }).catch(function (error){
            console.log('failure', error);   
        });
    }

    // DELETE categories
    vm.deleteCategory = function (categoryId) {
        $http.delete('/budget' + categoryId).then(function(response){
            console.log('success');
            vm.viewCategory();
        }).catch(function(error){
            console.log('failure');
        });
    }
    
    //viewCategory();
});