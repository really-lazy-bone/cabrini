angular.module('starter.services', [])

.factory('Setting', function() {
  return {
    serverUrl: 'http://localhost:1337'
  };
})

.factory('Language', function($translate) {
  var self = this;
  self.language = (localStorage.getItem('language') || 'English');
  $translate.use(getCodeHelper(self.language));

  function getCodeHelper (language) {
    switch (language) {
      case 'English':
        return 'en';
      case 'Chinese':
        return 'ch';
      case 'Spanish':
        return 'es';
    }
  }

  return {
    getCode: function() {
      return getCodeHelper(self.language).toUpperCase();
    },
    get: function() {
      return self.language;
    },
    set: function(language) {
      self.language = language;
      localStorage.setItem('language', self.language);
      $translate.use(getCodeHelper(self.language));
    }
  };
})

.service('UserService', function($http, Setting) {
  return {
    signup: signup,
    login: login
  };

  function signup (user) {
    return $http.post(Setting.serverUrl + '/users/signup', user);
  }

  function login (user) {
    return $http.post(Setting.serverUrl + '/users/signin', user);
  }
});
