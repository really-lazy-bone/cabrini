angular.module('starter.services', [])

.factory('Setting', function() {
  return {
    serverUrl: 'http://localhost:1337',
    firebaseUrl: ''
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
})

.service('OrganizationService', function($http, Setting) {
  return {
    signup: signup,
    login: login
  };

  function signup (agent) {
    return $http.post(Setting.serverUrl + '/organizations/signup', agent);
  }

  function login (agent) {
    return $http.post(Setting.serverUrl + '/organizations/signin', agent);
  }
})

.service('TaskService', function($http, Setting) {
  return {
    createTask: createTask,
    list: list,
    updateTodo: updateTodo
  };

  function createTask (task) {
    return $http.post(Setting.serverUrl + '/tasks/create', task);
  }

  function list () {
    return $http.get(Setting.serverUrl + '/tasks/list');
  }

  function updateTodo (taskId, todoId, done) {
    return $http.post(
      Setting.serverUrl + '/tasks/' + taskId + '/todo/' + todoId
    );
  }
});
