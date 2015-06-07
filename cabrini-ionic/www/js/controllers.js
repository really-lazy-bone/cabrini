angular.module('starter.controllers', [])

.controller('LandingCtrl', function($state, Language, UserService, $rootScope) {
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
        $rootScope.user = response.data;
        $state.go('tab.info');
      });
  }

  function login () {
    UserService.login(self.user)
      .then(function(response) {
        sessionStorage.setItem('user', JSON.stringify(response.data));
        $rootScope.user = response.data;
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

.controller('InfoCtrl', function($state, TaskService) {
  var self = this;

  TaskService.getImmigrantTaskList()
    .then(function(response) {
      self.tasks = response.data;
    });

  self.updateTodo = updateTodo;

  function updateTodo (task, step, todo) {
    TaskService.updateTodo(task._id, step._id, todo._id, todo.completed);
  }
})

.controller('ChatCtrl', function($rootScope, $scope, $firebaseArray, UserService, Setting) {
  var self = this;

  UserService.matchToOrganization()
    .then(function(response) {
      self.organization = response.data;

      var ref = new Firebase(Setting.firebaseUrl + '/' +
        self.organization._id + '-' + $rootScope.user._id);

      $scope.messages = $firebaseArray(ref);
    });

  self.addMessage = addMessage;

  function addMessage () {
    $scope.messages.$add({
      user: $rootScope.user._id,
      message: self.newMessage,
      action: 'chat'
    });

    self.newMessage = '';
  }
})

.controller('OrganizationChatCtrl', function($rootScope, $scope, $firebaseArray, OrganizationService, Setting) {
  var self = this;

  OrganizationService.getMatchUsers()
    .then(function(response) {
      self.users = response.data;

      self.activeUser = self.users[0];

      var ref = new Firebase(Setting.firebaseUrl + '/' +
        $rootScope.user._id + '-' + self.activeUser._id);

      $scope.messages = $firebaseArray(ref);
    });

  self.addMessage = addMessage;
  self.updateUser = updateUser;

  function addMessage () {
    $scope.messages.$add({
      user: $rootScope.user._id,
      message: self.newMessage,
      action: 'chat'
    });

    self.newMessage = '';
  }

  function updateUser () {
    OrganizationService.getMatchUsers()
      .then(function(response) {
        var ref = new Firebase(Setting.firebaseUrl + '/' +
          $rootScope.user._id + '-' + self.activeUser._id);

        $scope.messages = $firebaseArray(ref);
      });
  }
})

.controller('OrganizationSignupCtrl', function($state, Language, OrganizationService, $rootScope) {
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
  self.goback = goback;

  function signup () {
    var languages = [];
    var interests = [];
    if (self.english) {
      languages.push('English');
    }
    if (self.chinese) {
      languages.push('Chinese');
    }
    if (self.spanish) {
      languages.push('Spanish');
    }
    if (self.student) {
      interests.push('Student');
    }
    if (self.work) {
      interests.push('Work');
    }
    if (self.greencard) {
      interests.push('Green Card');
    }
    if (self.citizenship) {
      interests.push('Citizenship');
    }

    self.user.languages = languages;
    self.user.immigration_interests = interests;

    OrganizationService.signup(self.user)
      .then(function(response) {
        sessionStorage.setItem('user', JSON.stringify(response.data));
        $rootScope.user = response.data;
        $state.go('organizationTab.info');
      });
  }

  function login () {
    OrganizationService.login(self.user)
      .then(function(response) {
        sessionStorage.setItem('user', JSON.stringify(response.data));
        $rootScope.user = response.data;
        $state.go('organizationTab.info');
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

  function goback () {
    $state.go('landing');
  }
})

.controller('OrganizationInfoCtrl', function($rootScope, $state, TaskService, $stateParams, OrganizationService) {
  var self = this;

  // dummy task when creating one
  self.task = {
    org_id: $rootScope.user._id,
    category: '',
    steps: [
    ]
  };
  self.dummyStep = {
    name: '',
    comment: '',
    to_do_items: [
    ]
  };
  self.taskId = $stateParams.taskId;

  if (self.taskId) {
    OrganizationService.getMatchUsers()
      .then(function(response) {
        self.users = response.data;
      });
  }

  TaskService.getOrganizationTaskList()
    .then(function(response) {
      self.tasks = response.data;
    });

  self.createTask = createTask;
  self.createGeneralInfo = createGeneralInfo;

  self.addStep = addStep;
  self.addTodo = addTodo;
  self.deleteTodo = deleteTodo;

  self.assignTaskToUser = assignTaskToUser;

  self.toCreateTask = toCreateTask;
  self.toCreateGeneralInfo = toCreateGeneralInfo;
  self.toAssignTask = toAssignTask;

  self.addStep();

  function createTask () {
    TaskService.createTask(self.task)
      .then(function(response) {
        $state.go('organizationTab.info');
        TaskService.getOrganizationTaskList()
          .then(function(response) {
            self.tasks = response.data;
          });
      });
  }

  function createGeneralInfo () {
    // body...
  }

  function addStep () {
    self.task.steps.push(angular.copy(self.dummyStep));
  }

  function addTodo (step) {
    step.to_do_items.push(step.newTodo);
    step.newTodo = {
      name: ''
    };
  }

  function deleteTodo (step, index) {
    step.to_do_items.splice(index, 1);
  }

  function assignTaskToUser () {
    TaskService.assignTask(self.taskId, self.assignedUserId)
      .then(function() {
        $state.go('organizationTab.info');
      });
  }

  function toCreateTask () {
    $state.go('organizationTab.createTask');
  }

  function toCreateGeneralInfo () {
    $state.go('organizationTab.createGeneralInfo');
  }

  function toAssignTask (task) {
    $state.go('organizationTab.assignTask', {taskId: task._id});
  }
});
