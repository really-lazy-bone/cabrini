// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'pascalprecht.translate', 'ng-mfb', 'starter.controllers', 'starter.services'])

.run(function($rootScope, $http) {
  $rootScope.user = (sessionStorage.getItem('user') || null);

  if ($rootScope.user) {
    $rootScope.user = JSON.parse($rootScope.user);
    $http.defaults.headers.common.Authorization = 'Basic ' +
      $rootScope.user.email + ':' + $rootScope.user.password;
  }
})

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
    'country': 'Country of Origin',
    'intent': 'Intent',
    'intent-student': 'Student',
    'intent-work': 'Work',
    'intent-greencard': 'Green Card',
    'intent-citizenship': 'Citizenship',
    'signup': 'Sign Up',
    'email': 'Email',
    'password': 'Password',
    'login': 'Log In',
    'logout': 'Log Out',
    'update-user-profile': 'Update Profile',
    'profile-label': 'Profile',
    'chat-label': 'Chat',
    'info-label': 'Info',
    'language-label': 'I also speak',
    'english': 'English',
    'chinese': 'Chinese',
    'spanish': 'Spanish',
    'organization-sign-up-label': 'Organization Sign Up Here',
    'organization-intent-label': 'What intent you can help with?',
    'organization-country': 'Country',
    'organization-language-label': 'Supported Languages',
    'address': 'Address',
    'phone': 'Phone Number',
    'name': 'Name'
  });

  $translateProvider.translations('ch', {
    'landing-title': '來自Cabrini的歡迎',
    'landing-help': '你周圍的代理人',
    'country': '來自哪個國家',
    'intent': '目的',
    'intent-student': '學生',
    'intent-work': '工作',
    'intent-greencard': '綠卡',
    'intent-citizenship': '永久居住權',
    'signup': '申請帳號',
    'email': '電子郵件',
    'password': '密碼',
    'login': '登入',
    'logout': '登出',
    'update-user-profile': '更新用戶資料',
    'profile-label': '使用者資料',
    'chat-label': '聊天室',
    'info-label': '資源',
    'language-label': '我也說這些語言',
    'english': '英文',
    'chinese': '中文',
    'spanish': '西班牙語',
    'organization-sign-up-label': '協會從此加入',
    'organization-intent-label': '領域專精',
    'organization-country': '國家',
    'organization-language-label': '支持語言',
    'address': '地址',
    'phone': '電話號碼',
    'name': '名字'
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

  .state('organization-signup', {
    url: '/organization-signup',
    templateUrl: 'templates/organization-signup.html',
    controller: 'OrganizationSignupCtrl as signup'
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html",
    controller: function(Language) {

    }
  })

  // Each tab has its own nav history stack:

  .state('tab.info', {
    url: '/info',
    views: {
      'tab-info': {
        templateUrl: 'templates/tab-info.html'
      }
    }
  })

  .state('tab.chats', {
    url: '/chats',
    views: {
      'tab-chats': {
        templateUrl: 'templates/tab-chats.html'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'ProfileCtrl as profile'
      }
    }
  })

  .state('organizationTab', {
    url: "/organization/tab",
    abstract: true,
    templateUrl: "templates/organization-tabs.html",
    controller: function(Language) {

    }
  })

  // Each tab has its own nav history stack:

  .state('organizationTab.info', {
    url: '/info',
    views: {
      'tab-info': {
        templateUrl: 'templates/organization-tab-info.html',
        controller: 'OrganizationInfoCtrl as info'
      }
    }
  })

  .state('organizationTab.createTask', {
    url: '/create-task',
    views: {
      'tab-info': {
        templateUrl: 'templates/organization-tab-createTask.html',
        controller: 'OrganizationInfoCtrl as info'
      }
    }
  })

  .state('organizationTab.createGeneralInfo', {
    url: '/create-general-info',
    views: {
      'tab-info': {
        templateUrl: 'templates/organization-tab-createGeneralInfo.html',
        controller: 'OrganizationInfoCtrl as info'
      }
    }
  })

  .state('organizationTab.chats', {
    url: '/chats',
    views: {
      'tab-chats': {
        templateUrl: 'templates/organization-tab-chats.html'
      }
    }
  })

  .state('organizationTab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/organization-tab-account.html',
        controller: 'ProfileCtrl as profile'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
