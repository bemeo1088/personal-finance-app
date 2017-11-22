myApp.controller('BudgetController', function (UserService, $http) {
    console.log('BudgetController created');
    var vm = this;
    vm.userService = UserService;
    
    vm.category = {
        category_name: '',
        amount: ''
    };

    vm.categoryList = [];

    // UPDATE after-tax income for the month
    vm.updateIncome = function (userIncome) {
        console.log('userIncome', userIncome);
        var id = UserService.userObject.id;   // Set id equals to id property within userObject in UserService
        $http.put('/budget/' + id, {income: userIncome}).then( function (response){
            console.log('success', response);
            //vm.viewBudgets();
        }).catch( function (error) {
            console.log('failure', error);    
        });    
    }


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
            console.log('success', response);  
            vm.categoryList = response.data;  
            console.log('categoryList', categoryList);    
        }).catch(function (error){
            console.log('failure', error);   
        });
    }

    // DELETE categories
    vm.deleteCategory = function (categoryId) {
        $http.delete('/budget/' + categoryId).then(function(response){
            console.log('success');
            vm.viewCategory();
        }).catch(function(error){
            console.log('failure');
        });
    }
    
    vm.viewCategory();
});