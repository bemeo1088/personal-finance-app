myApp.controller('BudgetController', function (UserService, $http) {
    console.log('BudgetController created');
    var vm = this;
    vm.userService = UserService;
    
    vm.category = {
        category_name: '',
        amount: ''
    };

    vm.categoryList = [];

    // Month Picker
    // vm.example = {
    //     value = new Date (2017, 9, 1)
    // };


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

    vm.myChart = document.getElementById('myChart').getContext('2d');

    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#777';



    vm.budgetChart = new Chart(myChart, {
        type: 'pie', // bar,pie, line, horizontalBar
        data: {
            labels: ['Travel', 'Utilities', 'Rent/Mortgage', 'Groceries'],
            datasets: [{
                label: 'Budgets',
                data: [500, 600, 2000, 500],
                // backgroundColor: 'green',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    // 'rgba(153, 102, 255, 0.6)',
                    // 'rgba(255, 159, 64, 0.6)',
                    // 'rgba(255, 99, 132, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                ],
                borderWidth: 1,
                borderColor: '#777',
                hoverBorderWidth: 3,
                hoverBorderColor: '#000'
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Budgets of the month',
                fontSize: 25
            },
            legend: {
                position: 'right',
                labels: {
                    fontColor: '#000'
                }
            },
            layout: {
                padding: {
                    left: 50,
                    right: 0,
                    bottom: 0,
                    top: 0
                }
            },
            tooltops: {
                enabled: true
            }
        }
    })
});