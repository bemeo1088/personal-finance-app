myApp.controller('InfoController', function(UserService, $http) {
  console.log('InfoController created');
  var vm = this;
  vm.userService = UserService;

  // Chart
  vm.chartData = [];

  vm.myChart = document.getElementById('myChart').getContext('2d');

  // Chart: Global Options
  Chart.defaults.global.defaultFontFamily = 'Lato';
  Chart.defaults.global.defaultFontSize = 15;
  Chart.defaults.global.defaultFontColor = '#777';

  // GET CHART
  vm.requestChart = function () {
    budgetLabel = [];
    budgetAmount = [];
    transactionList = [];  // Transaction Names
    transactionAmount = [];
    $http.get('/budget').then(function (response) {
      vm.chartData = response.data;
      console.log('chartData', vm.chartData);
        for (var i = 0; i < vm.chartData.length; i++) {
          budgetAmount.push(vm.chartData[i].amount);
          budgetLabel.push(vm.chartData[i].category_name);
          //console.log ("budgetLabel", budgetLabel);
      }
      $http.get('/transaction').then(function (response) {
        console.log('success importing transactions');
        transactionList = response.data;
        console.log("transactionList", transactionList);
          for (i = 0; i < budgetLabel.length; i++) {
            sum = 0;
            for (var j = 0; j < transactionList.length; j++) {
              if (budgetLabel[i] == transactionList[j].category_name) {
                sum += parseInt(transactionList[j].amount);
              }
            }
            transactionAmount.push(sum);
          }
        vm.budgetChart = new Chart(myChart, {
          type: 'line', // bar,pie, line, horizontalBar
          data: {
            labels: budgetLabel,
            datasets: [{
              label: 'Budgets',
              fill: false,
              lineTension: 0.7,
              data: budgetAmount,
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
            },
            {
              label: 'Transaction Amounts',
              fill: true,
              lineTension: 0.1,
              data: transactionAmount,
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
            }
            ]
          },
          options: {
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Dollar Amount'
                },
                ticks: {
                  beginAtZero: true
                }
              }],
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Categories'
                }
              }]
            },
            title: {
              display: true,
              text: 'Budgets vs. Transactions of the month',
              fontSize: 30
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
            tooltips: {
              enabled: true
            }
          }
        })
      }).catch(function (error) {
        console.log('failure', error);
      });
    }).catch(function (error) {
      console.log('failure', error);
    });
    //console.log("Display: ", vm.budgetAmount);
  }
});
