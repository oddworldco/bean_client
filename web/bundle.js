define(['react', 'react-dom', 'react-router', './routes'], function (_react, _reactDom, _reactRouter, _routes) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _routes2 = _interopRequireDefault(_routes);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	_reactDom2.default.render(_react2.default.createElement(_reactRouter.Router, { history: _reactRouter.browserHistory, routes: _routes2.default }), document.getElementById('app'));

	// routes component
});
define(['exports', 'ble-bean', 'ble-bean-stream'], function (exports, _bleBean, _bleBeanStream) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _bleBean2 = _interopRequireDefault(_bleBean);

    var _bleBeanStream2 = _interopRequireDefault(_bleBeanStream);

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

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var BleBean = function () {
        function BleBean() {
            _classCallCheck(this, BleBean);
        }

        _createClass(BleBean, [{
            key: 'streamData',
            value: function streamData() {
                this.discoverBean();
            }
        }, {
            key: 'discoverBean',
            value: function discoverBean() {
                // Ask ble-bean to discover a Bean
                _bleBean2.default.discover(function (bean) {
                    return bean;

                    console.log(bean);
                });
            }
        }]);

        return BleBean;
    }();

    exports.default = BleBean;
});
define(['exports', 'react'], function (exports, _react) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

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

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var About = function (_React$Component) {
        _inherits(About, _React$Component);

        function About() {
            _classCallCheck(this, About);

            return _possibleConstructorReturn(this, (About.__proto__ || Object.getPrototypeOf(About)).call(this));
        }

        _createClass(About, [{
            key: 'render',
            value: function render() {
                return _react2.default.createElement('div', null);
            }
        }]);

        return About;
    }(_react2.default.Component);

    exports.default = About;
});
define(['exports', 'react'], function (exports, _react) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

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

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Container = function (_React$Component) {
        _inherits(Container, _React$Component);

        function Container() {
            _classCallCheck(this, Container);

            return _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this));
        }

        _createClass(Container, [{
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    'div',
                    null,
                    this.props.children
                );
            }
        }]);

        return Container;
    }(_react2.default.Component);

    exports.default = Container;
});
define(['exports', 'react', 'ble-bean', 'ble-bean-stream', 'stream'], function (exports, _react, _bleBean, _bleBeanStream, _stream) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _bleBean2 = _interopRequireDefault(_bleBean);

    var _bleBeanStream2 = _interopRequireDefault(_bleBeanStream);

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

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Main = function (_React$Component) {
        _inherits(Main, _React$Component);

        function Main() {
            _classCallCheck(this, Main);

            var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this));

            // This binding is necessary to make `this` work in the callback
            _this.onclick_dicoverBean = _this.onclick_dicoverBean.bind(_this);
            return _this;
        }

        _createClass(Main, [{
            key: 'onclick_dicoverBean',
            value: function onclick_dicoverBean() {
                var json = new _stream.Transform({ objectMode: true });

                json._transform = function (chunk, encoding, callback) {
                    // let streamData = JSON.stringify(chunk);

                    // console.log(streamData);

                    // return streamData;
                    json.push(JSON.stringify(chunk) + '\r\n');

                    console.log('data: ', JSON.stringify(chunk));
                    callback();
                };

                _bleBean2.default.discover(function (bean) {
                    console.log('bean: ', bean);

                    var beanReadable = _bleBeanStream2.default.createReadStream(bean, {
                        poll: 5000,
                        pollTemp: true

                        // beforePush: (data) => {
                        //   data.timestamp = new Date();
                        //   return data;
                        // }
                    });

                    beanReadable.pipe(json);

                    console.log('json:', json);
                });
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'h1',
                        null,
                        'Hello World!!!'
                    ),
                    _react2.default.createElement(
                        'button',
                        { onClick: this.onclick_dicoverBean },
                        'Discover Bean'
                    )
                );
            }
        }]);

        return Main;
    }(_react2.default.Component);

    exports.default = Main;
});
define(['exports', 'react', 'react-router', './pages/container', './pages/main', './pages/about'], function (exports, _react, _reactRouter, _container, _main, _about) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _container2 = _interopRequireDefault(_container);

    var _main2 = _interopRequireDefault(_main);

    var _about2 = _interopRequireDefault(_about);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = _react2.default.createElement(
        _reactRouter.Router,
        { history: _reactRouter.browserHistory },
        _react2.default.createElement(
            _reactRouter.Route,
            { path: '/', component: _container2.default },
            _react2.default.createElement(_reactRouter.IndexRoute, { component: _main2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: 'about', component: _about2.default })
        )
    );
});
