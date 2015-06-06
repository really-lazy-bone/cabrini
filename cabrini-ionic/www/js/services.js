angular.module('starter.services', [])

.factory('Language', function($translate) {
  var self = this;
  self.language = (localStorage.getItem('language') || 'English');

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
      $translate.use(getCodeHelper(self.language));
      return self.language;
    },
    set: function(language) {
      self.language = language;
      localStorage.setItem('language', self.language);
      $translate.use(getCodeHelper(self.language));
    }
  };
});
