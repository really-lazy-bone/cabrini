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

.controller('OrganizationSignupCtrl', function($state, Language, OrganizationService) {
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
        $state.go('organizationTab.info');
      });
  }

  function login () {
    OrganizationService.login(self.user)
      .then(function(response) {
        sessionStorage.setItem('user', JSON.stringify(response.data));
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

.controller('OrganizationInfoCtrl', function($state, TaskService) {
  var self = this;

  // dummy task when creating one
  self.task = {
    category: '',
    steps: [
    ]
  };
  self.dummyStep = {
    name: '',
    comment: '',
    todos: [
    ]
  };

  self.createTask = createTask;
  self.createGeneralInfo = createGeneralInfo;

  self.addStep = addStep;
  self.addTodo = addTodo;
  self.deleteTodo = deleteTodo;

  self.toCreateTask = toCreateTask;
  self.toCreateGeneralInfo = toCreateGeneralInfo;

  self.addStep();

  function createTask () {
    TaskService.createTask()
      .then(function(response) {
        $state.go('organizationTab.info');
      });
  }

  function createGeneralInfo () {
    // body...
  }

  function addStep () {
    self.task.steps.push(angular.copy(self.dummyStep));
  }

  function addTodo (step) {
    step.todos.push(step.newTodo);
    step.newTodo = {
      description: ''
    };
  }

  function deleteTodo (step, index) {
    step.todos.splice(index, 1);
  }

  function toCreateTask () {
    $state.go('organizationTab.createTask');
  }

  function toCreateGeneralInfo () {
    $state.go('organizationTab.createGeneralInfo');
  }
});
