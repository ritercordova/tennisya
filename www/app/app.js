/**
 * Created by Riter on 24/08/15.
 */
 var api = 'http://localhost/tennisya/tennisya_admin/web/app_dev.php/api/';
// var api = 'http://localhost/tennisya_admin/web/app_dev.php/api/';
//var api = 'http://tennisya.apploadapps.com/web/api/';

var appTennisya = angular.module('tennisyaApp', ['ionic','ngCordova']);

appTennisya.run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
                cordova.plugins.Keyboard.disableScroll(false);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }

        });
    });

appTennisya.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-back');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-ios-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');

        $stateProvider
            .state('signin', {
                url: "/sign-in",
                templateUrl: "templates/inicio/sign-in.html",
                controller: 'SignInCtrl'
            })
            .state('signup', {
                url: "/sign-up",
                templateUrl: "templates/inicio/sign-up.html",
                controller: 'SignUpCtrl'
            })
            .state('tabs', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html",
                controller: 'TabsCtrl'
            })
            .state('tabs.player', {
                url: "/players",
                views: {
                    'player-tab': {
                        templateUrl: "templates/jugadores/players.html",
                        controller: 'ListJugadoresCtrl'
                    },
                    'navable-modal@': {
                        templateUrl: 'templates/grupo/create-group.html',
                        controller: 'JugadoresSearchCtrl'
                    }
                }
            })
            .state('tabs.player-info', {
                url: "/players-info",
                views: {
                    'player-tab': {
                        templateUrl: "templates/jugadores/info.html",
                        // controller: 'ListJugadoresCtrl'
                    }
                }
            })
            .state('tabs.groups', {
                url: '/groups',
                views:{
                    'player-tab':{
                       templateUrl: "templates/jugadores/groups.html"
                    }
                }
            })
            .state('tabs.partidos', {
                url: "/partidos",
                views: {
                    'partidos-tab': {
                        templateUrl: "templates/partidos/_listPartidos.html",
                        controller: 'ListPartidosCtrl'
                    }
                }
            })
            // ajustes
            .state('tabs.setting', {
                url: "/setting",
                views: {
                    'setting-tab': {
                        templateUrl: "templates/ajustes/setting.html",
                        controller: 'AjustesCtrl'
                    }
                }
            })
            /* start disponibilidad*/
            .state('tabs.disponibilidad', {
                url: "/disponibilidad/:id",
                views: {
                    'setting-tab': {
                        templateUrl: "templates/ajustes/disponibilidad.html",
                        controller: 'DisponibilidadCtrl'
                    }
                }
            })
            .state('tabs.newdisponibilidad', {
                url: "/newdisponibilidad",
                views: {
                    'setting-tab': {
                        templateUrl: "templates/ajustes/new_disponibilidad.html",
                        controller: 'DisponibilidadCtrl'
                    }
                }
            })
            /* end disponibilidad*/

            .state('tabs.profile', {
                url: "/profile",
                views: {
                    'setting-tab': {
                        templateUrl: "templates/ajustes/profile.html",
                        controller: 'ProfileCtrl'
                    }
                }
            })
            .state('tabs.share', {
                url: "/share",
                views: {
                    'setting-tab': {
                        templateUrl: "templates/ajustes/share.html",
                        controller: 'ShareCtrl'
                    }
                }
            })
            .state('tabs.info', {
                url: "/info",
                views: {
                    'setting-tab': {
                        templateUrl: "templates/ajustes/info.html"
                    }
                }
            })
            //create grupos
            .state('tabs.player.add_jugador', {
                url: '/players/modal/item',
                views: {
                    'navable-modal@': {
                        templateUrl: 'templates/grupo/add-jugador.html',
                        controller: 'JugadoresSearchCtrl'
                    }
                }
            })
        ;

        if(window.localStorage['user']){
            $urlRouterProvider.otherwise("tab/players");
        }else{
            $urlRouterProvider.otherwise("/sign-in");
        }

    });
