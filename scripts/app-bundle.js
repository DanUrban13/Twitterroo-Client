define('app',['exports', 'aurelia-framework', 'aurelia-event-aggregator', './services/messages', './services/twitterservice'], function (exports, _aureliaFramework, _aureliaEventAggregator, _messages, _twitterservice) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  var _twitterservice2 = _interopRequireDefault(_twitterservice);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_twitterservice2.default, _aureliaFramework.Aurelia, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function App(ts, au, ea) {
      var _this = this;

      _classCallCheck(this, App);

      this.au = au;
      this.ts = ts;
      ea.subscribe(_messages.LoginStatus, function (msg) {
        if (msg.status.success === true) {
          au.setRoot('home').then(function () {
            _this.router.navigateToRoute('dashboard');
          });
        } else {
          au.setRoot('app').then(function () {
            _this.router.navigateToRoute('login');
          });
        }
      });
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: ['', 'login'], name: 'login', moduleId: 'viewmodels/login/login', nav: true, title: 'Login' }, { route: 'signup', name: 'signup', moduleId: 'viewmodels/signup/signup', nav: true, title: 'Signup' }]);
      this.router = router;
    };

    return App;
  }()) || _class);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('home',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.Aurelia), _dec(_class = function () {
    function Home(au) {
      _classCallCheck(this, Home);

      this.aurelia = au;
    }

    Home.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: ['', 'home'], name: 'dashboard', moduleId: 'viewmodels/dashboard/dashboard', nav: true, title: 'Dashboard' }, { route: 'tweet', name: 'tweet', moduleId: 'viewmodels/tweet/tweet', nav: true, title: 'Tweet' }, { route: 'friendsTimeline', name: 'friendsTimeline', moduleId: 'viewmodels/friendsTimeline/friendsTimeline', nav: true, title: 'Friends Timeline' }, { route: 'globalTimeline', name: 'globalTimeline', moduleId: 'viewmodels/globalTimeline/globalTimeline', nav: true, title: 'Global Timeline' }, { route: 'userlist', name: 'userlist', moduleId: 'viewmodels/userlist/userlist', nav: true, title: 'Userlist' }, { route: 'settings', name: 'settings', moduleId: 'viewmodels/settings/settings', nav: true, title: 'Settings' }, { route: 'logout', name: 'logout', moduleId: 'viewmodels/logout/logout', nav: true, title: 'Logout' }]);
      this.router = router;

      config.mapUnknownRoutes(function (instruction) {
        return 'home';
      });
    };

    return Home;
  }()) || _class);
  exports.default = Home;
});
define('main',['exports', './environment', 'aurelia-pal'], function (exports, _environment, _aureliaPal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources').plugin(_aureliaPal.PLATFORM.moduleName('aurelia-dialog'));

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('services/async-http-client',['exports', 'aurelia-framework', 'aurelia-http-client', './fixtures', 'aurelia-event-aggregator', './messages', './twitterservice'], function (exports, _aureliaFramework, _aureliaHttpClient, _fixtures, _aureliaEventAggregator, _messages, _twitterservice) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _fixtures2 = _interopRequireDefault(_fixtures);

  var _twitterservice2 = _interopRequireDefault(_twitterservice);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var AsyncHttpClient = (_dec = (0, _aureliaFramework.inject)(_aureliaHttpClient.HttpClient, _fixtures2.default, _aureliaEventAggregator.EventAggregator, _twitterservice2.default), _dec(_class = function () {
    function AsyncHttpClient(httpClient, fixtures, ea, ts) {
      _classCallCheck(this, AsyncHttpClient);

      this.http = httpClient;
      this.http.configure(function (http) {
        http.withBaseUrl(fixtures.baseUrl);
      });
      this.ea = ea;
      this.ts = ts;
    }

    AsyncHttpClient.prototype.get = function get(url) {
      return this.http.get(url);
    };

    AsyncHttpClient.prototype.post = function post(url, obj) {
      return this.http.post(url, obj);
    };

    AsyncHttpClient.prototype.put = function put(url, obj) {
      return this.http.put(url, obj);
    };

    AsyncHttpClient.prototype.delete = function _delete(url) {
      return this.http.delete(url);
    };

    AsyncHttpClient.prototype.authenticate = function authenticate(url, user) {
      var _this = this;

      this.http.post(url, user).then(function (response) {
        var status = response.content;
        if (status.success) {
          localStorage.donation = JSON.stringify(response.content);
          _this.http.configure(function (configuration) {
            configuration.withHeader('Authorization', 'bearer ' + response.content.token);
          });
        }
        _this.ea.publish(new _messages.LoginStatus(status));
      }).catch(function (error) {
        var status = {
          success: false,
          message: 'service not avilable'
        };
        _this.ea.publish(new _messages.LoginStatus(status));
      });
    };

    AsyncHttpClient.prototype.clearAuthentication = function clearAuthentication() {
      localStorage.donation = null;
      this.http.configure(function (configuration) {
        configuration.withHeader('Authorization', '');
      });
    };

    return AsyncHttpClient;
  }()) || _class);
  exports.default = AsyncHttpClient;
});
define('services/fixtures',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Fixtures = function Fixtures() {
    _classCallCheck(this, Fixtures);

    this.baseUrl = 'https://twitterroo.herokuapp.com/';
  };

  exports.default = Fixtures;
});
define('services/messages',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var TotalUpdate = exports.TotalUpdate = function TotalUpdate(total) {
    _classCallCheck(this, TotalUpdate);

    this.total = total;
  };

  var LoginStatus = exports.LoginStatus = function LoginStatus(status) {
    _classCallCheck(this, LoginStatus);

    this.status = status;
  };
});
define('services/twitterservice',['exports', 'aurelia-framework', './fixtures', './messages', 'aurelia-event-aggregator', './async-http-client'], function (exports, _aureliaFramework, _fixtures, _messages, _aureliaEventAggregator, _asyncHttpClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _fixtures2 = _interopRequireDefault(_fixtures);

  var _asyncHttpClient2 = _interopRequireDefault(_asyncHttpClient);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var TwitterService = (_dec = (0, _aureliaFramework.inject)(_fixtures2.default, _aureliaEventAggregator.EventAggregator, _asyncHttpClient2.default), _dec(_class = function () {
    function TwitterService(data, ea, ac) {
      _classCallCheck(this, TwitterService);

      this.tweets = [];
      this.users = [];
      this.currentUser = {
        id: '',
        email: 'marge@simpson.com'
      };

      this.ea = ea;
      this.ac = ac;
      this.getTweets();
      this.getUsers();
    }

    TwitterService.prototype.getTweets = function getTweets() {
      var _this = this;

      this.ac.get('/api/tweets').then(function (res) {
        _this.tweets = res.content;
      });
    };

    TwitterService.prototype.getUsers = function getUsers() {
      var _this2 = this;

      this.ac.get('/api/users').then(function (res) {
        _this2.users = res.content;
      });
    };

    TwitterService.prototype.tweet = function tweet(text) {
      var _this3 = this;

      var tweet = {
        text: text
      };
      this.ac.post('/api/tweet/create', tweet).then(function (res) {
        var returnedTweet = res.content;
        _this3.tweets.push(returnedTweet);
      });
    };

    TwitterService.prototype.getUserData = function getUserData() {
      for (var i = 0; i < this.users.length; i++) {
        if (this.users[i].email === this.currentUser.email) {
          return this.users[i];
        }
      }
    };

    TwitterService.prototype.getMyTweets = function getMyTweets() {
      var tweets = [];
      for (var i = 0; i < this.tweets.length; i++) {
        for (var s = 0; s < this.users.length; s++) {
          if (this.currentUser.email === this.users[s].email) {
            this.currentUser.id = this.users[s]._id;
          }
        }

        if (this.currentUser.id === this.tweets[i].creator._id) {
          tweets.push(this.tweets[i]);
        }
      }
      return tweets;
    };

    TwitterService.prototype.getFriendsTweets = function getFriendsTweets() {
      var tweets = [];
      var user = void 0;
      for (var s = 0; s < this.users.length; s++) {
        if (this.currentUser.email === this.users[s].email) {
          user = this.users[s];
        }
      }
      for (var j = 0; j < user.following.length; j++) {
        for (var i = 0; i < this.tweets.length; i++) {
          if (user.following[j]._id === this.tweets[i].creator._id) {
            tweets.push(this.tweets[i]);
          }
        }
      }
      return tweets;
    };

    TwitterService.prototype.settings = function settings(firstName, lastName, email, password) {
      var _this4 = this;

      var newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      };
      this.ac.put('/api/users', newUser).then(function (res) {
        _this4.getUsers();
      });
    };

    TwitterService.prototype.register = function register(firstName, lastName, email, password) {
      var _this5 = this;

      var newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      };
      this.ac.post('/api/users', newUser).then(function (res) {
        _this5.getUsers();
      });
    };

    TwitterService.prototype.login = function login(email, password) {
      var user = {
        email: email,
        password: password
      };
      this.ac.authenticate('/api/users/authenticate', user);
      this.currentUser = user;
    };

    TwitterService.prototype.logout = function logout() {
      var status = {
        success: false,
        message: ''
      };
      this.ac.clearAuthentication();
      this.ea.publish(new _messages.LoginStatus(status));
    };

    return TwitterService;
  }()) || _class);
  exports.default = TwitterService;
});
define('viewmodels/dashboard/dashboard',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Dashboard = exports.Dashboard = function Dashboard() {
    _classCallCheck(this, Dashboard);
  };
});
define('viewmodels/friendsTimeline/friendsTimeline',['exports', 'aurelia-framework', '../../services/twitterservice'], function (exports, _aureliaFramework, _twitterservice) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.FriendsTweetlist = undefined;

  var _twitterservice2 = _interopRequireDefault(_twitterservice);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var FriendsTweetlist = exports.FriendsTweetlist = (_dec = (0, _aureliaFramework.inject)(_twitterservice2.default), _dec(_class = function FriendsTweetlist(ts) {
    _classCallCheck(this, FriendsTweetlist);

    this.tweets = [];

    this.twitterService = ts;
    this.tweets = this.twitterService.getFriendsTweets();
  }) || _class);
});
define('viewmodels/globalTimeline/globalTimeline',['exports', 'aurelia-framework', '../../services/twitterservice'], function (exports, _aureliaFramework, _twitterservice) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.GlobalTimeline = undefined;

  var _twitterservice2 = _interopRequireDefault(_twitterservice);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var GlobalTimeline = exports.GlobalTimeline = (_dec = (0, _aureliaFramework.inject)(_twitterservice2.default), _dec(_class = function GlobalTimeline(ts) {
    _classCallCheck(this, GlobalTimeline);

    this.tweets = [];

    this.twitterService = ts;
    this.tweets = this.twitterService.tweets;
  }) || _class);
});
define('viewmodels/login/login',['exports', 'aurelia-framework', '../../services/twitterservice'], function (exports, _aureliaFramework, _twitterservice) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Login = undefined;

  var _twitterservice2 = _interopRequireDefault(_twitterservice);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Login = exports.Login = (_dec = (0, _aureliaFramework.inject)(_twitterservice2.default), _dec(_class = function () {
    function Login(ts) {
      _classCallCheck(this, Login);

      this.email = 'marge@simpson.com';
      this.password = 'secret';

      this.twitterService = ts;
      this.prompt = '';
    }

    Login.prototype.login = function login(e) {
      console.log('Trying to log in ' + this.email);
      this.twitterService.login(this.email, this.password);
    };

    return Login;
  }()) || _class);
});
define('viewmodels/logout/logout',['exports', '../../services/twitterservice', 'aurelia-framework'], function (exports, _twitterservice, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Logout = undefined;

  var _twitterservice2 = _interopRequireDefault(_twitterservice);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Logout = exports.Logout = (_dec = (0, _aureliaFramework.inject)(_twitterservice2.default), _dec(_class = function () {
    function Logout(ts) {
      _classCallCheck(this, Logout);

      this.twitterService = ts;
    }

    Logout.prototype.logout = function logout() {
      console.log('logging out');
      this.twitterService.logout();
    };

    return Logout;
  }()) || _class);
});
define('viewmodels/personalTweetlist/personalTweetlist',['exports', 'aurelia-framework', '../../services/twitterservice'], function (exports, _aureliaFramework, _twitterservice) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PersonalTweetlist = undefined;

  var _twitterservice2 = _interopRequireDefault(_twitterservice);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var PersonalTweetlist = exports.PersonalTweetlist = (_dec = (0, _aureliaFramework.inject)(_twitterservice2.default), _dec(_class = function PersonalTweetlist(ts) {
    _classCallCheck(this, PersonalTweetlist);

    this.tweets = [];

    this.twitterService = ts;
    this.tweets = this.twitterService.getMyTweets();
  }) || _class);
});
define('viewmodels/settings/settings',['exports', 'aurelia-framework', '../../services/twitterservice'], function (exports, _aureliaFramework, _twitterservice) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Settings = undefined;

  var _twitterservice2 = _interopRequireDefault(_twitterservice);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Settings = exports.Settings = (_dec = (0, _aureliaFramework.inject)(_twitterservice2.default), _dec(_class = function () {
    function Settings(ts) {
      _classCallCheck(this, Settings);

      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.password = '';

      this.twitterService = ts;
      var currentUser = this.twitterService.getUserData();
      this.firstName = currentUser.firstName;
      this.lastName = currentUser.lastName;
      this.email = currentUser.email;
      this.password = currentUser.password;
    }

    Settings.prototype.edit = function edit(e) {
      this.twitterService.settings(this.firstName, this.lastName, this.email, this.password);
    };

    return Settings;
  }()) || _class);
});
define('viewmodels/signup/signup',['exports', 'aurelia-framework', '../../services/twitterservice'], function (exports, _aureliaFramework, _twitterservice) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Signup = undefined;

  var _twitterservice2 = _interopRequireDefault(_twitterservice);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Signup = exports.Signup = (_dec = (0, _aureliaFramework.inject)(_twitterservice2.default), _dec(_class = function () {
    function Signup(ts) {
      _classCallCheck(this, Signup);

      this.firstName = 'Marge';
      this.lastName = 'Simpson';
      this.email = 'marge@simpson.com';
      this.password = 'secret';

      this.twitterService = ts;
    }

    Signup.prototype.register = function register(e) {
      this.showSignup = false;
      this.twitterService.register(this.firstName, this.lastName, this.email, this.password);
      this.twitterService.login(this.email, this.password);
    };

    return Signup;
  }()) || _class);
});
define('viewmodels/tweet/tweet',['exports', 'aurelia-framework', '../../services/twitterservice'], function (exports, _aureliaFramework, _twitterservice) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Tweet = undefined;

  var _twitterservice2 = _interopRequireDefault(_twitterservice);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Tweet = exports.Tweet = (_dec = (0, _aureliaFramework.inject)(_twitterservice2.default), _dec(_class = function () {
    function Tweet(ts) {
      _classCallCheck(this, Tweet);

      this.text = '';

      this.twitterService = ts;
    }

    Tweet.prototype.tweet = function tweet(e) {
      this.twitterService.tweet(this.text);
    };

    return Tweet;
  }()) || _class);
});
define('viewmodels/userlist/userlist',['exports', 'aurelia-framework', '../../services/twitterservice', '../../home'], function (exports, _aureliaFramework, _twitterservice, _home) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Userlist = undefined;

  var _twitterservice2 = _interopRequireDefault(_twitterservice);

  var _home2 = _interopRequireDefault(_home);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Userlist = exports.Userlist = (_dec = (0, _aureliaFramework.inject)(_twitterservice2.default, _home2.default), _dec(_class = function () {
    function Userlist(ts, h) {
      _classCallCheck(this, Userlist);

      this.users1 = [];
      this.users2 = [];

      this.twitterService = ts;
      this.h = h;
      var userCount = ts.users.length;
      console.log('usercount ' + userCount);
      this.users1 = ts.users.slice(0, userCount / 2);
      this.users2 = ts.users.slice(userCount / 2);
    }

    Userlist.prototype.test = function test(e) {
      console.log('test called' + e);
      this.h.router.navigateToRoute('dashboard');
    };

    return Userlist;
  }()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"nav-bar.html\"></require><div class=\"ui container page-host\"><nav-bar router.bind=\"router\"></nav-bar><router-view></router-view></div></template>"; });
define('text!home.html', ['module'], function(module) { module.exports = "<template><require from=\"nav-bar.html\"></require><div class=\"ui container page-host\"><nav-bar router.bind=\"router\"></nav-bar><router-view></router-view></div></template>"; });
define('text!nav-bar.html', ['module'], function(module) { module.exports = "<template bindable=\"router\"><nav class=\"ui inverted menu\"><header class=\"header item\"><a href=\"/\">Twitterroo</a></header><div class=\"right menu\"><div repeat.for=\"row of router.navigation\"><a class=\"${row.isActive ? 'active' : ''} item\" href.bind=\"row.href\">${row.title}</a></div></div></nav></template>"; });
define('text!viewmodels/dashboard/dashboard.html', ['module'], function(module) { module.exports = "<template><section class=\"ui grid segment\"><div class=\"twelve wide column\"><compose class=\"six wide column\" view-model=\"../personalTweetlist/personalTweetlist\"></compose></div><div class=\"four wide column\"><article class=\"ui column\"><h3 class=\"ui dividing header\">Statistics</h3></article><a route-href=\"route: settings\">test</a></div></section></template>"; });
define('text!viewmodels/friendsTimeline/friendsTimeline.html', ['module'], function(module) { module.exports = "<template><section class=\"ui grid segment\"><div class=\"ui threaded comments\"><h3 class=\"ui dividing header\">Friends History</h3><div id=\"userHistory\"><div repeat.for=\"tweet of tweets\" class=\"comment\"><a class=\"avatar\"><img src=\"${tweet.creator.image}\"></a><div class=\"content\"><a class=\"author\"> ${tweet.creator.firstName} ${tweet.creator.lastName} </a><div class=\"metadata\"><span class=\"date\"> ${tweet.dateString} </span></div><div class=\"text\"> ${tweet.text} </div></div></div></div></div></section></template>"; });
define('text!viewmodels/globalTimeline/globalTimeline.html', ['module'], function(module) { module.exports = "<template><section class=\"ui grid segment\"><div class=\"ui threaded comments\"><h3 class=\"ui dividing header\">Global History</h3><div id=\"userHistory\"><div repeat.for=\"tweet of tweets\" class=\"comment\"><a class=\"avatar\"><img src=\"${tweet.creator.image}\"></a><div class=\"content\"><a class=\"author\"> ${tweet.creator.firstName} ${tweet.creator.lastName} </a><div class=\"metadata\"><span class=\"date\"> ${tweet.dateString} </span></div><div class=\"text\"> ${tweet.text} </div></div></div></div></div></section></template>"; });
define('text!viewmodels/login/login.html', ['module'], function(module) { module.exports = "<template><form submit.delegate=\"login($event)\" class=\"ui stacked segment form\"><h3 class=\"ui header\">Log-in</h3><div class=\"field\"><label>Email</label><input placeholder=\"Email\" value.bind=\"email\"></div><div class=\"field\"><label>Password</label><input type=\"password\" value.bind=\"password\"></div><button class=\"ui blue submit button\">Login</button><h3>${prompt}</h3></form></template>"; });
define('text!viewmodels/logout/logout.html', ['module'], function(module) { module.exports = "<template><form submit.delegate=\"logout($event)\" class=\"ui stacked segment form\"><h3 class=\"ui header\">Are you sure you want to log out?</h3><button class=\"ui blue submit button\">Logout</button></form></template>"; });
define('text!viewmodels/personalTweetlist/personalTweetlist.html', ['module'], function(module) { module.exports = "<template><div class=\"ui threaded comments\"><h3 class=\"ui dividing header\">Your recent History</h3><div id=\"userHistory\"><div repeat.for=\"tweet of tweets\" class=\"comment\"><a class=\"avatar\"><img src=\"${tweet.creator.image}\"></a><div class=\"content\"><a class=\"author\"> ${tweet.creator.firstName} ${tweet.creator.lastName} </a><div class=\"metadata\"><span class=\"date\"> ${tweet.dateString} </span></div><div class=\"text\"> ${tweet.text} </div><div class=\"ui checkbox\"><input class=\"right floated\" type=\"checkbox\" name=\"tweet\" value=\"${tweet._id}\"><label></label></div></div></div></div></div></template>"; });
define('text!viewmodels/settings/settings.html', ['module'], function(module) { module.exports = "<template><form submit.delegate=\"edit($event)\" class=\"ui stacked segment form\"><h3 class=\"ui header\">Register</h3><div class=\"two fields\"><div class=\"field\"><label>First Name</label><input placeholder=\"First Name\" type=\"text\" value.bind=\"firstName\"></div><div class=\"field\"><label>Last Name</label><input placeholder=\"Last Name\" type=\"text\" value.bind=\"lastName\"></div></div><div class=\"field\"><label>Email</label><input placeholder=\"Email\" type=\"text\" value.bind=\"email\"></div><div class=\"field\"><label>Password</label><input type=\"password\" value.bind=\"password\"></div><button class=\"ui blue submit button\">Submit</button></form></template>"; });
define('text!viewmodels/signup/signup.html', ['module'], function(module) { module.exports = "<template><form submit.delegate=\"register($event)\" class=\"ui stacked segment form\"><h3 class=\"ui header\">Register</h3><div class=\"two fields\"><div class=\"field\"><label>First Name</label><input placeholder=\"First Name\" type=\"text\" value.bind=\"firstName\"></div><div class=\"field\"><label>Last Name</label><input placeholder=\"Last Name\" type=\"text\" value.bind=\"lastName\"></div></div><div class=\"field\"><label>Email</label><input placeholder=\"Email\" type=\"text\" value.bind=\"email\"></div><div class=\"field\"><label>Password</label><input type=\"password\" value.bind=\"password\"></div><button class=\"ui blue submit button\">Submit</button></form></template>"; });
define('text!viewmodels/tweet/tweet.html', ['module'], function(module) { module.exports = "<template><section class=\"ui grid segment\"><form class=\"ui reply form\" submit.delegate=\"tweet($event)\"><div class=\"field\"><textarea value.bind=\"text\" name=\"text\"></textarea></div><div class=\"two fields\"><div class=\"field\"><label>add a picture</label><input type=\"file\" name=\"file\"></div></div><button class=\"ui blue labeled submit icon button\"><i class=\"icon edit\"></i> Tweet</button></form></section></template>"; });
define('text!viewmodels/userlist/userlist.html', ['module'], function(module) { module.exports = "<template><section class=\"ui raised segment\"><div class=\"ui horizontal segments\"><div class=\"ui segment\"><div class=\"ui card\" repeat.for=\"user of users1\"><div class=\"image\"><img src=\"${user.image}\"></div><div class=\"content\"><a class=\"header\">${user.firstName} ${user.lastName}</a></div><div class=\"ui grid extra content\"><div class=\"four wide column\"><a><i class=\"user icon\"></i> ${user.following.length} Following</a></div><div class=\"four wide column\"><a class=\"item\" href=\"/home/${user._id}\" value=\"${user._id}\" click.delegate=\"test($event.target)\">Timeline</a></div><div class=\"four wide column\"><a class=\"item\" href=\"/follow/${user._id}\">Follow</a></div></div></div></div><div class=\"ui segment\"><div class=\"ui card\" repeat.for=\"user of users2\"><div class=\"image\"><img src=\"${user.image}\"></div><div class=\"content\"><a class=\"header\">${user.firstName} ${user.lastName}</a></div><div class=\"ui grid extra content\"><div class=\"four wide column\"><a><i class=\"user icon\"></i> ${user.following.length} Following</a></div><div class=\"four wide column\"><a class=\"item\" href=\"/home/${user._id}\">Timeline</a></div><div class=\"four wide column\"><a class=\"item\" href=\"/follow/${user._id}\">Follow</a></div></div></div></div></div></section></template>"; });
//# sourceMappingURL=app-bundle.js.map