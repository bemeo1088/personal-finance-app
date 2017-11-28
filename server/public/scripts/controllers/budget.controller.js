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
            vm.viewCategory();
        }).catch( function (error) {
            console.log('failure', error);    
        });    
    }


    // ADD categories
    vm.addCategory = function (categoryToAdd) {
        console.log('categoryToAdd', categoryToAdd);
        $http.post('/budget', categoryToAdd).then(function(response){
            vm.categoryList.push(categoryToAdd); // <--push new budget to categoryList to calculate remaining balance
            console.log('success');
            vm.viewCategory();
        }).catch(function(error){
            console.log('failure', error);    
        });
    }

    vm.userInfo = {};
    vm.remainingBalance = 0;
    // VIEW categories
    vm.viewCategory = function () {

        $http.get('/budget').then(function (response){
            console.log('success', response);  
            vm.categoryList = response.data;  
            console.log('categoryList', vm.categoryList);    
            getUser();
        }).catch(function (error){
            console.log('failureeeeee', error);   
        });
    }

    function getUser() {
        $http.get('/user').then(function (response) {
            console.log('success User', response);
            vm.userInfo = response.data;
            //console.log('categoryList', categoryList);    
            recalculateSum();
        }).catch(function (error) {
            console.log('failureeeeee', error);
        });
    }

    function recalculateSum() {
        sum = 0;
        console.log('categoryList.length', vm.categoryList.length);
        for (var i = 0; i < vm.categoryList.length; i++) {
            sum += parseInt(vm.categoryList[i].amount);
            console.log('vm.categoryList[i].amount', vm.categoryList[i].amount);
        }
        vm.remainingBalance = parseInt(vm.userInfo.income) - sum;
        console.log('remainingBalance', vm.remainingBalance);
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

    

    // Budgets Chart
    vm.budgetChart = [];

    vm.myBudgetChart = document.getElementById('myBudgetChart').getContext('2d');

    // Chart: Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 9;
    Chart.defaults.global.defaultFontColor = '#777';

    // GET CHART
    vm.requestBudgetChart = function () {
        budgetLabel = [];
        budgetAmount = [];
        // transactionList = [];  // Transaction Names
        // transactionAmount = [];
        $http.get('/budget').then(function (response) {
            vm.budgetChart = response.data;
            console.log('chartData', vm.budgetChart);
            for (var i = 0; i < vm.budgetChart.length; i++) {
                budgetAmount.push(vm.budgetChart[i].amount);
                budgetLabel.push(vm.budgetChart[i].category_name);
                //console.log ("budgetLabel", budgetLabel);
            }
            // $http.get('/transaction').then(function (response) {
            //     console.log('success importing transactions');
            //     transactionList = response.data;
            //     console.log("transactionList", transactionList);
            //     for (i = 0; i < budgetLabel.length; i++) {
            //         sum = 0;
            //         for (var j = 0; j < transactionList.length; j++) {
            //             if (budgetLabel[i] == transactionList[j].category_name) {
            //                 sum += parseInt(transactionList[j].amount);
            //             }
            //         }
            //         transactionAmount.push(sum);
            //     }
            vm.budgetChart = new Chart(myBudgetChart, {
                    type: 'pie', // bar,pie, line, horizontalBar
                    data: {
                        labels: budgetLabel,
                        datasets: [{
                            label: 'Budgets',
                            fill: false,
                            lineTension: 0.7,
                            data: budgetAmount,                    
                            backgroundColor: 'green',
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(153, 102, 255, 0.6)',
                                'rgba(255, 159, 64, 0.6)',
                                'rgba(255, 99, 132, 0.6)'],
                            borderWidth: 1,
                            borderColor: '#777',
                            hoverBorderWidth: 3,
                            hoverBorderColor: '#000'
                        }]
                    },
                    //     {
                    //         label: 'Category Amount',
                    //         fill: true,
                    //         lineTension: 0.1,
                    //         data: transactionAmount,
                    //         // backgroundColor: 'green',
                    //         backgroundColor: [
                    //             'rgba(255, 99, 132, 0.6)',
                    //             'rgba(54, 162, 235, 0.6)',
                    //             'rgba(255, 206, 86, 0.6)',
                    //             // 'rgba(153, 102, 255, 0.6)',
                    //             // 'rgba(255, 159, 64, 0.6)',
                    //             // 'rgba(255, 99, 132, 0.6)',
                    //             'rgba(75, 192, 192, 0.6)',
                    //         ],
                    //         borderWidth: 1,
                    //         borderColor: '#777',
                    //         hoverBorderWidth: 3,
                    //         hoverBorderColor: '#000'
                    //     }
                    //     ]

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
                    
        }).catch(function (error) {
            console.log('failure', error);
        });
        //console.log("Display: ", vm.budgetAmount);
    }

});
