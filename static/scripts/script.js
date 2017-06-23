var myApp = angular.module('mymodule', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
                    .config(function($routeProvider, $locationProvider){

                      $routeProvider
                      .when("/home", {
                        templateUrl: "/static/pages/home.html",
                        controller: "homeController"
                      }).when("/track/:id", {
                          templateUrl: "/static/pages/trackdetails.html",
                          controller: "trackdetailscontroller"
                      }).when("/addtrack",{
                          templateUrl: "/static/pages/addTrack.html",
                          controller: "addTrackController"
                      }).when("/genres", {
                        templateUrl: "/static/pages/genres.html",
                        controller: "genreController"
                      }).when("/genre/:id", {
                          templateUrl: "/static/pages/genredetails.html",
                          controller: "genredetailsController"
                      }).when("/addgenre", {
                          templateUrl: "/static/pages/addgenre.html",
                          controller: "addgenreController"
                      })
                      .otherwise({
                        redirectTo: "/home"
                      })
                      $locationProvider.html5Mode(true);
                    })
                    .controller('trackdetailscontroller', function($scope, $http, $routeParams, $log, $route){
                        $http({
                            url: "http://104.197.128.152:8000/v1/tracks/" + $routeParams.id,
                            method: 'get'
                        }).then(function(response){
                          $scope.track = response.data;
                          $scope.posterTitle = response.data.title;
                          $scope.posterId = response.data.id;
                          $scope.posterRating = parseInt(response.data.rating);
                          $scope.addedGenre = 1;
                          posterGenres = []
                          for(var i=0; i<response.data.genres.length; i++){
                            posterGenres.push(response.data.genres[i].id);
                          }
                          $scope.addGenre = function(){
                            if($scope.addedGenre!=null)
                              posterGenres.push($scope.addedGenre);
                            $http({
                              method: 'POST',
                              url: "http://104.197.128.152:8000/v1/tracks/" + $routeParams.id,
                              data: {
                                'id': $scope.posterID,
                                'title': $scope.posterTitle,
                                'rating': $scope.posterRating,
                                'genres': posterGenres
                              }
                            }).then(function(response){
                              $log.info(response);
                              $route.reload();
                            }, function(error){
                              $log.info(error);
                            })
                          }
                          $scope.updateData = function(){
                            $http({
                              method: 'POST',
                              url: "http://104.197.128.152:8000/v1/tracks/" + $routeParams.id,
                              data: {
                                'id': $scope.posterID,
                                'title': $scope.posterTitle,
                                'rating': $scope.posterRating,
                                'genres': [
                                  1
                                ]
                              }
                            }).then(function(response){
                              $log.info(response);
                              $route.reload();

                            }, function(error){
                              $log.info(error);
                            })
                          }
                          $log.info(response);
                        })
                    }).controller('addTrackController', function($scope, $http, $log, $location){
                            $scope.trackname = '';
                            $scope.rating = 1;
                            $scope.genre = 1;
                            $scope.addit = function(){
                              finalgenre = 1;
                              if($scope.genre!=null && $scope.genre!='')
                                  finalgenre = $scope.genre;
                              $http({
                                method: 'POST',
                                url: "http://104.197.128.152:8000/v1/tracks",
                                data: {
                                  'title': $scope.trackname,
                                  'rating': $scope.rating,
                                  'genres': [
                                    finalgenre
                                  ]
                                }
                              }).then(function(response){
                                $log.info(response);
                                redurl = '/track/' + response.data.id;
                                $location.path(redurl);
                              }, function(error){
                                $log.info(error);
                              })
                            }
                    }).controller('genreController', function($scope, $http, $log){
                      $http.get("http://104.197.128.152:8000/v1/genres")
                      .then(function(response){
                        $log.info(response);
                        $scope.genres = response.data.results;
                        $scope.showprev = false;
                        $scope.shownext = false;
                        $scope.nexturl = "";
                        $scope.prevurl = "";
                        if(response.data.previous!=null && response.data.previous!=''){
                          $scope.showprev = true;
                          $scope.prevurl = response.data.previous;
                        }
                        if(response.data.next!=null && response.data.next!=''){
                          $scope.shownext = true;
                          $scope.nexturl = response.data.next;
                        }
                        $log.info(response);
                        $scope.gotoprev = function(){
                          $http.get($scope.prevurl).then(function(response){
                            $scope.genres = response.data.results;
                            $scope.showprev = false;
                            $scope.shownext = false;
                            $scope.nexturl = "";
                            $scope.prevurl = "";
                            if(response.data.previous!=null && response.data.previous!=''){
                              $scope.showprev = true;
                              $scope.prevurl = response.data.previous;
                            }
                            if(response.data.next!=null && response.data.next!=''){
                              $scope.shownext = true;
                              $scope.nexturl = response.data.next;
                            }
                            $log.info(response);
                          })
                        }
                        $scope.gotonext = function(){
                          $http.get($scope.nexturl).then(function(response){
                            $scope.genres = response.data.results;
                            $scope.showprev = false;
                            $scope.shownext = false;
                            $scope.nexturl = "";
                            $scope.prevurl = "";
                            if(response.data.previous!=null && response.data.previous!=''){
                              $scope.showprev = true;
                              $scope.prevurl = response.data.previous;
                            }
                            if(response.data.next!=null && response.data.next!=''){
                              $scope.shownext = true;
                              $scope.nexturl = response.data.next;
                            }
                            $log.info(response);
                          })
                        }
                      }, function(error){
                          $log.info(error);
                      })
                    }).controller('genredetailsController', function($scope, $http, $log, $routeParams, $route){
                      $http.get("http://104.197.128.152:8000/v1/genres/" + $routeParams.id)
                      .then(function(response){
                        $scope.id = response.data.id;
                        $scope.name = response.data.name;
                        $log.info(response);
                        $scope.updateGenre = function(){
                          $http({
                            method: 'POST',
                            url: "http://104.197.128.152:8000/v1/genres/" + $routeParams.id,
                            data: {
                              "id": $scope.id,
                              "name": $scope.name,
                            }
                          }).then(function(response){
                            $log.info(response);
                            $route.reload();
                          }, function(error){
                            $log.info(error);
                          })
                        }
                      }, function(error){
                        $log.info(error);
                      })
                    }).controller('addgenreController', function($scope, $http, $log, $location){
                      $scope.name = '';
                      $scope.addNewGenre = function(){
                        $http({
                          method: "POST",
                          url: "http://104.197.128.152:8000/v1/genres",
                          data: {
                            "name": $scope.name
                          }
                        }).then(function(response){
                          $log.info(response);
                          redurl = '/genre/' + response.data.id;
                          $location.path(redurl);
                        }, function(error){
                          $log.info(error);
                        })
                      }
                    })
                    .controller('homeController', function($scope, $http, $log, $location){
                          $http.get("http://104.197.128.152:8000/v1/tracks")
                          .then(function(response){
                              $scope.tracks = response.data.results;
                              $scope.max = 9;
                              $scope.isReadonly = true;
                              $scope.showprev = false;
                              $scope.shownext = false;
                              $scope.nexturl = "";
                              $scope.prevurl = "";
                              $scope.name="";
                              $scope.searchTrack = function(){
                                if($scope.name)
                                  $location.url("/trackSearch/" + $scope.name);
                                else
                                  $location.url("/trackSearch/" + $scope.name);
                              }
                              if(response.data.previous!=null && response.data.previous!=''){
                                $scope.showprev = true;
                                $scope.prevurl = response.data.previous;
                              }
                              if(response.data.next!=null && response.data.next!=''){
                                $scope.shownext = true;
                                $scope.nexturl = response.data.next;
                              }
                              $log.info(response);
                              $scope.gotoprev = function(){
                                $http.get($scope.prevurl).then(function(response){
                                  $scope.tracks = response.data.results;
                                  $scope.showprev = false;
                                  $scope.shownext = false;
                                  $scope.nexturl = "";
                                  $scope.prevurl = "";
                                  $scope.name="";
                                  if(response.data.previous!=null && response.data.previous!=''){
                                    $scope.showprev = true;
                                    $scope.prevurl = response.data.previous;
                                  }
                                  if(response.data.next!=null && response.data.next!=''){
                                    $scope.shownext = true;
                                    $scope.nexturl = response.data.next;
                                  }
                                  $log.info(response);
                                })
                              }
                              $scope.gotonext = function(){
                                $http.get($scope.nexturl).then(function(response){
                                  $scope.tracks = response.data.results;
                                  $scope.showprev = false;
                                  $scope.shownext = false;
                                  $scope.nexturl = "";
                                  $scope.prevurl = "";
                                  if(response.data.previous!=null && response.data.previous!=''){
                                    $scope.showprev = true;
                                    $scope.prevurl = response.data.previous;
                                  }
                                  if(response.data.next!=null && response.data.next!=''){
                                    $scope.shownext = true;
                                    $scope.nexturl = response.data.next;
                                  }
                                  $log.info(response);
                                })
                              }
                          }, function(error){
                            $log.info(error);

                          })
                    });
