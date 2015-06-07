angular.module('starter.controllers', [])

.controller('LandingCtrl', function($state, Language) {
  var self = this;

  self.changingLanguage = false;
  self.isLogin = false;
  self.language = Language.get();
  self.languageCode = Language.getCode();

  self.signup = signup;
  self.login = login;
  self.changeLanguage = changeLanguage;
  self.setLanguage = setLanguage;
  self.toLogin = toLogin;
  self.toSignup = toSignup;

  function signup () {
    $state.go('tab.info');
  }

  function login () {
    $state.go('tab.info');
  }

  function changeLanguage () {
    self.changingLanguage = true;
  }

  function setLanguage (language) {
    Language.set(language);
    self.language = Language.get();
    self.languageCode = Language.getCode();
    self.changingLanguage = false;
  }

  function toLogin () {
    self.isLogin = true;
  }

  function toSignup () {
    self.isLogin = false;
  }
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
