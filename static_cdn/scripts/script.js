var myApp = angular.module('mymodule', ['ngRoute'])
                    .config(function($routeProvider){

                      $routeProvider
                      .when("/home", {
                        templateUrl: "temprr/home.html",
                        controller: "homeController"
                      })
                      .otherwise({
                        redirectTo: "/home"
                      })
                    })

                    .controller('homeController', function($scope, $http){
                          $http.get("http://104.197.128.152:8000/v1/tracks").then(function(response){
                              $scope.tracks = response.data;
                              $log.info(reponse);
                          })
                    });
