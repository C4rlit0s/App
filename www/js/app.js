// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput', 'ngCordova', 'chart.js', 'angles', 'pdf', 'ngStorage','ngRoute'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })




    .state('app.profile.activity', {
        url: '^/app/activity/:data',
        views: {
            'menuContent@app': {
                templateUrl: 'templates/activity.html',
                controller: 'ActivityCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })

    .state('app.profile.cliente-activity', {
        url: '^/app/cliente-activity/:data',
        views: {
            'menuContent@app': {
                templateUrl: 'templates/cliente-activity.html',
                controller: 'ActivityCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })

    .state('app.profile.form', {
        url: '^/app/form/:data',
        views: {
            'menuContent@app': {
                templateUrl: 'templates/form.html',
                controller: 'FormCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })

    .state('app.profile.form-report', {
        url: '^/app/form-report/:data',
        views: {
            'menuContent@app': {
                templateUrl: 'templates/form-report.html',
                controller: 'FormCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })

    .state('app.form-report-edit', {
        url: '/form-report-edit/:id',
        views: {
            'menuContent': {
                templateUrl: 'templates/form-report-edit.html',
                controller: 'FormCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })

    .state('app.vista-cliente', {
        url: '/vista-cliente/:clienteID',
        views: {
            'menuContent': {
                templateUrl: 'templates/vista-cliente.html',
                controller: 'Vista-ClienteCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })

    .state('app.vista-actividad', {
        url: '/vista-actividad/:clienteID',
        views: {
            'menuContent': {
                templateUrl: 'templates/vista-actividad.html',
                controller: 'Vista-ActividadCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })


        .state('app.profile.formactividad', {
        url: '^/app/formactividad/:data',
        views: {
            'menuContent@app': {
                templateUrl: 'templates/formactividad.html',
                controller: 'Form-ActividadCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })


         .state('app.reportePdf.anadirequipo', {
        url: '^/app/anadirequipo/:clienteID',
        views: {
            'menuContent@app': {
                templateUrl: 'templates/anadirequipo.html',
                controller: 'AnadirEquipoCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })
           .state('app.reportePdf.anadirequipo-aire', {
        url: '^/app/anadirequipo-aire/:clienteID',
        views: {
            'menuContent@app': {
                templateUrl: 'templates/anadirequipo-aire.html',
                controller: 'AnadirEquipoCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })
             .state('app.reportePdf.anadirequipo-iluminacion', {
        url: '^/app/anadirequipo-iluminacion/:clienteID',
        views: {
            'menuContent@app': {
                templateUrl: 'templates/anadirequipo-iluminacion.html',
                controller: 'AnadirEquipoCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })
               .state('app.reportePdf.anadirequipo-standby', {
        url: '^/app/anadirequipo-standby/:clienteID',
        views: {
            'menuContent@app': {
                templateUrl: 'templates/anadirequipo-standby.html',
                controller: 'AnadirEquipoCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })
                 .state('app.reportePdf.anadirequipo-otros', {
        url: '^/app/anadirequipo-otros/:clienteID',
        views: {
            'menuContent@app': {
                templateUrl: 'templates/anadirequipo-otros.html',
                controller: 'AnadirEquipoCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })

         .state('app.form-equipo-edit', {
        url: '/form-equipo-edit/:clienteID',
        views: {
            'menuContent': {
                templateUrl: 'templates/form-equipo-edit.html',
                controller: 'AnadirEquipoCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })

    

    .state('app.profile.gallery', {
        url: '^/app/gallery/:data',
        views: {
            'menuContent@app': {
                templateUrl: 'templates/gallery.html',
                controller: 'GalleryCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-gallery').classList.toggle('on');
                    }, 600);
                }
            }
        }
    })

    .state('app.profile.imagen', {
        url: '^/app/imagen/:data',
        views: {
            'menuContent@app': {
                templateUrl: 'templates/imagen.html',
                controller: 'imagen'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-gallery').classList.toggle('on');
                    }, 600);
                }
            }
        }
    })

    .state('app.reportePdf', {
        url: '/reportePdf/:clienteID',
        views: {
            'menuContent': {
                templateUrl: 'templates/reportePdf.html',
                controller: ''
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-pdf').classList.toggle('on');
                    }, 600);
                }
            }
        }
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })


    .state('app.profile', {
        url: '/profile/:data',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
            },

            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })

    .state('app.profile.friends', {
        url: '^/app/friends/:data',
        views: {
            'menuContent@app': {
                templateUrl: 'templates/friends.html',
                controller: 'FriendsCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-friends').classList.toggle('on');
                    }, 900);*/
                }
            }
        }
    })

    .state('app.chart', {
        url: '/chart/:clienteID',
        views: {
            'menuContent': {
                templateUrl: 'templates/chart.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })

    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');



 
});
