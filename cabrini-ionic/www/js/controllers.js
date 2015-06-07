angular.module('starter.controllers', [])

.controller('LandingCtrl', function($state, Language, UserService) {
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
  self.toOrganizationSignup = toOrganizationSignup;

  function signup () {
    var languages = [];
    if (self.english) {
      languages.push('English');
    }
    if (self.chinese) {
      languages.push('Chinese');
    }
    if (self.spanish) {
      languages.push('Spanish');
    }
    self.user.languages = languages;

    UserService.signup(self.user)
      .then(function(response) {
        sessionStorage.setItem('user', JSON.stringify(response.data));
        $state.go('tab.info');
      });
  }

  function login () {
    UserService.login(self.user)
      .then(function(response) {
        sessionStorage.setItem('user', JSON.stringify(response.data));
        $state.go('tab.info');
      });
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

  function toOrganizationSignup () {
    $state.go('organization-signup');
  }
})

.controller('ProfileCtrl', function($state) {
  var self = this;

  self.logout = logout;

  function logout () {
    $state.go('landing');
  }
})

.controller('OrganizationSignupCtrl', function($state, Language) {
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
  self.toOrganizationSignup = toOrganizationSignup;
  self.goback = goback;

  function signup () {
    var languages = [];
    if (self.english) {
      languages.push('English');
    }
    if (self.chinese) {
      languages.push('Chinese');
    }
    if (self.spanish) {
      languages.push('Spanish');
    }
    self.user.languages = languages;

    UserService.signup(self.user)
      .then(function(response) {
        sessionStorage.setItem('user', JSON.stringify(response.data));
        $state.go('tab.info');
      });
  }

  function login () {
    UserService.login(self.user)
      .then(function(response) {
        sessionStorage.setItem('user', JSON.stringify(response.data));
        $state.go('tab.info');
      });
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

  function toOrganizationSignup () {
    $state.go('organization-signup');
  }

  function goback () {
    $state.go('landing');
  }
});
