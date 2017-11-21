myApp.controller('UserController', function(UserService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;

  // ADD after-tax income for the month
  vm.addIncome = function (incomeToAdd) {
    console.log('incomeToAdd', incomeToAdd);
    $http.post('/budget', incomeToAdd).then(function (response) {
      console.log('success');
      //vm.viewBudgets();
    }).catch(function (error) {
      console.log('failure', error);
    });
  }

});
