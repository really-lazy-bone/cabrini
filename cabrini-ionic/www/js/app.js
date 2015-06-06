// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'pascalprecht.translate', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.translations('en', {
    'landing-title': 'Hello from Cabrini',
    'landing-help': 'Local agents around you.',
    'landing-country': 'Country of Origin',
    'landing-intent': 'Intent',
    'landing-intent-student': 'Student',
    'landing-intent-work': 'Work',
    'landing-intent-greencard': 'Green Card',
    'landing-intent-citizenship': 'Citizenship',
    'landing-connect': 'Connect!'
  });

  $translateProvider.translations('ch', {
    'landing-title': '來自Cabrini的歡迎',
    'landing-help': '你周圍的代理人',
    'landing-country': '來自哪個國家',
    'landing-intent': '目的',
    'landing-intent-student': '學生',
    'landing-intent-work': '工作',
    'landing-intent-greencard': '綠卡',
    'landing-intent-citizenship': '永久居住權',
    'landing-connect': '開始！'
  });

  $translateProvider.translations('es', {
    'landing-title': 'Hallo de Cabrini',
    'landing-help': 'Los agentes locales que te rodean',
    'landing-country': 'País de origen',
    'landing-intent': 'Intención',
    'landing-intent-student': 'Estudiante',
    'landing-intent-work': 'Trabajo',
    'landing-intent-greencard': 'Tarjeta Verde',
    'landing-intent-citizenship': 'Ciudadanía',
    'landing-connect': 'Conectar'
  });

  $translateProvider.preferredLanguage('en');
}])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('landing', {
    url: '/',
    templateUrl: 'templates/landing.html',
    controller: 'LandingCtrl as landing'
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
