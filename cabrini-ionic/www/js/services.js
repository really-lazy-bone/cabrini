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

.service('UserService', function($http, Setting, $rootScope) {
  return {
    signup: signup,
    login: login,
    matchToOrganization: matchToOrganization
  };

  function signup (user) {
    return $http.post(Setting.serverUrl + '/users/signup', user);
  }

  function login (user) {
    return $http.post(Setting.serverUrl + '/users/signin', user);
  }

  function matchToOrganization () {
    return $http.post(Setting.serverUrl + '/users/match/' + $rootScope.user_id, user);
  }
})

.service('OrganizationService', function($rootScope, $http, Setting) {
  return {
    signup: signup,
    login: login,
    getMatchUsers: getMatchUsers
  };

  function signup (agent) {
    return $http.post(Setting.serverUrl + '/organizations/signup', agent);
  }

  function login (agent) {
    return $http.post(Setting.serverUrl + '/organizations/signin', agent);
  }

  function getMatchUsers () {
    return $http.get(Setting.serverUrl + '/organizations/users/' + $rootScope.user._id);
  }
})

.service('TaskService', function($http, $rootScope, Setting) {
  return {
    createTask: createTask,
    assignTask: assignTask,
    getOrganizationTaskList: getOrganizationTaskList,
    getImmigrantTaskList: getImmigrantTaskList,
    updateTodo: updateTodo
  };

  function createTask (task) {
    return $http.post(Setting.serverUrl + '/tasks/create', task);
  }

  function assignTask (taskId, userId) {
    return $http.post(Setting.serverUrl + '/tasks/' + taskId + '/' + userId);
  }

  function getOrganizationTaskList () {
    return $http.get(Setting.serverUrl + '/tasks/organization/list/' + $rootScope.user._id);
  }

  function getImmigrantTaskList () {
    return $http.get(Setting.serverUrl + '/tasks/user/list/' + $rootScope.user._id);
  }

  function updateTodo (taskId, todoId, done) {
    return $http.post(
      Setting.serverUrl + '/tasks/' + taskId + '/todo/' + todoId
    );
  }
});
