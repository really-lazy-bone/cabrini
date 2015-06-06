angular.module('starter.controllers', [])

.controller('LandingCtrl', function($scope, Language) {
  var self = this;

  self.changingLanguage = false;
  self.language = Language.get();
  self.languageCode = Language.getCode();

  self.connect = connect;
  self.changeLanguage = changeLanguage;
  self.setLanguage = setLanguage;

  function connect () {
    console.log(self.language);
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
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
