myApp.service('UserService', function($http, $location){
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};

  self.getuser = function(){
    console.log('UserService -- getuser');
    $http.get('/user').then(function(response) {
        if(response.data.username) {
            // user has a curret session on the server
            self.userObject.id = response.data.id;
            self.userObject.userName = response.data.username;
            self.userObject.income = response.data.income;
            
            console.log(response.data);
            console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
        } else {
            console.log('UserService -- getuser -- failure');
            // user has no session, bounce them back to the login page
            $location.path("/home");
        }
    },function(response){
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    });
  },

  self.logout = function() {
    console.log('UserService -- logout');
      swal({
        title: "Are you sure to log out?",
        icon: "warning",
        buttons: ['No!', 'Yes!'],
        dangerMode: true     
    }).then(function (willLogout) {
      if(willLogout) {
        swal("Bye Bye", {icon: "success"});
        $http.get('/user/logout').then(function (response) {
          console.log('UserService -- logout -- logged out');
          $location.path("/home");
        }).catch(function(error){
          console.log('nuts');  
        });
      } else {
        // $location.path("/user");
        swal("Feel free to stay");
        // self.getuser();
      }
    });
  };
});

