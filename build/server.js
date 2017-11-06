require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 239);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(180);

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = __webpack_require__(181);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

var prefix = 's';
var inserted = {};

// Base64 encoding and decoding - The "Unicode Problem"
// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

/**
 * Remove style/link elements for specified node IDs
 * if they are no longer referenced by UI components.
 */
function removeCss(ids) {
  ids.forEach(function (id) {
    if (--inserted[id] <= 0) {
      var elem = document.getElementById(prefix + id);
      if (elem) {
        elem.parentNode.removeChild(elem);
      }
    }
  });
}

/**
 * Example:
 *   // Insert CSS styles object generated by `css-loader` into DOM
 *   var removeCss = insertCss([[1, 'body { color: red; }']]);
 *
 *   // Remove it from the DOM
 *   removeCss();
 */
function insertCss(styles) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$replace = _ref.replace,
      replace = _ref$replace === undefined ? false : _ref$replace,
      _ref$prepend = _ref.prepend,
      prepend = _ref$prepend === undefined ? false : _ref$prepend;

  var ids = [];
  for (var i = 0; i < styles.length; i++) {
    var _styles$i = (0, _slicedToArray3.default)(styles[i], 4),
        moduleId = _styles$i[0],
        css = _styles$i[1],
        media = _styles$i[2],
        sourceMap = _styles$i[3];

    var id = moduleId + '-' + i;

    ids.push(id);

    if (inserted[id]) {
      if (!replace) {
        inserted[id]++;
        continue;
      }
    }

    inserted[id] = 1;

    var elem = document.getElementById(prefix + id);
    var create = false;

    if (!elem) {
      create = true;

      elem = document.createElement('style');
      elem.setAttribute('type', 'text/css');
      elem.id = prefix + id;

      if (media) {
        elem.setAttribute('media', media);
      }
    }

    var cssText = css;
    if (sourceMap && typeof btoa === 'function') {
      // skip IE9 and below, see http://caniuse.com/atob-btoa
      cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
      cssText += '\n/*# sourceURL=' + sourceMap.file + '?' + id + '*/';
    }

    if ('textContent' in elem) {
      elem.textContent = cssText;
    } else {
      elem.styleSheet.cssText = cssText;
    }

    if (create) {
      if (prepend) {
        document.head.insertBefore(elem, document.head.childNodes[0]);
      } else {
        document.head.appendChild(elem);
      }
    }
  }

  return removeCss.bind(null, ids);
}

module.exports = insertCss;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_normalize_css__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_normalize_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_normalize_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Layout_css__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Layout_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Layout_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Sidebar__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Header__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Feedback__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Footer__ = __webpack_require__(85);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/components/Layout/Layout.js';
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





// external-global styles must be imported in your JS.







class Layout extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      sideBarOpen: false
    }, this.toggleSidebar = () => {
      this.setState({
        sideBarOpen: !this.state.sideBarOpen
      });
    }, this.closeSidebar = () => {
      this.setState({
        sideBarOpen: false
      });
    }, _temp;
  }

  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 45
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__Header__["a" /* default */], { onToggleChange: this.toggleSidebar, onToggleChange: this.toggleSidebar, __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        },
        __self: this
      }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__Sidebar__["a" /* default */], { open: this.state.sideBarOpen, onClose: this.closeSidebar, __source: {
          fileName: _jsxFileName,
          lineNumber: 47
        },
        __self: this
      }),
      this.props.children,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__Footer__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 49
        },
        __self: this
      }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__Feedback__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 50
        },
        __self: this
      })
    );
  }
}

Layout.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node.isRequired
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3_normalize_css___default.a, __WEBPACK_IMPORTED_MODULE_4__Layout_css___default.a)(Layout));

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("react-apollo");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable max-len */

const config = __webpack_require__(24);
module.exports = config;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_crypto__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_crypto___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_crypto__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__libs_dollar__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__libs_util__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__libs_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__libs_util__);






const authTypes = ['facebook', 'google'];
const EVENTS = __webpack_require__(175);

var schema = {
    _id: {
        type: String,
        default: __WEBPACK_IMPORTED_MODULE_2__libs_util___default.a.genUuid
    },
    name: String,
    email: {
        type: String,
        lowercase: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    status: {
        type: String,
        default: 'off',
        enum: ['online', 'off']
    },
    password: String,
    provider: String,
    salt: String,
    verified: {
        type: Boolean,
        default: false
    },
    facebook: {},
    google: {}
};

var UserSchema = new __WEBPACK_IMPORTED_MODULE_1__libs_dollar__["a" /* default */]['mg'].Schema(schema, {
    toObject: {
        virtuals: true,
        transform: function (doc, ret, options) {
            delete ret.password; //always remove sensitive info
        }
    },
    toJSON: {
        virtuals: true,
        transform: function (doc, ret, options) {
            delete ret.password;
        }
    }
});

UserSchema.static('findByEmail', function (email) {
    return this.findOneAsync({
        email: email
    });
});

UserSchema.static('setVerification', function (id) {
    return this.findByIdAndUpdateAsync(id, {
        $set: {
            verified: true
        }
    });
});

/**
 * Virtuals
 */

// Public profile information
UserSchema.virtual('profile').get(function () {
    return {
        'name': this.name,
        'role': this.role
    };
});

// Non-sensitive info we'll be putting in the token
UserSchema.virtual('token').get(function () {
    return {
        '_id': this._id,
        'role': this.role
    };
});

//TODO, one user per client, change later
UserSchema.virtual('_client').get(function () {
    return this._id;
});

/**
 * Validations
 */

// Validate empty email
UserSchema.path('email').validate(function (email) {
    if (authTypes.indexOf(this.provider) !== -1) {
        return true;
    }
    return email.length;
}, 'Email cannot be blank');

// Validate empty password
UserSchema.path('password').validate(function (password) {
    if (authTypes.indexOf(this.provider) !== -1) {
        return true;
    }
    return password.length;
}, 'Password cannot be blank');

// Validate email is not taken
UserSchema.path('email').validate(function (value, respond) {
    var self = this;
    return this.constructor.findOneAsync({
        email: value
    }).then(function (user) {
        if (user) {
            if (self.id === user.id) {
                return respond(true);
            }
            return respond(false);
        }
        return respond(true);
    }).catch(function (err) {
        throw err;
    });
}, 'The specified email address is already in use.');

var validatePresenceOf = function (value) {
    return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema.pre('save', function (next) {
    //preserve isNew for post
    this.wasNew = this.isNew;
    // Handle new/update passwords
    if (this.isModified('password')) {
        if (!validatePresenceOf(this.password) && authTypes.indexOf(this.provider) === -1) {
            next(new Error('Invalid password'));
        }

        // Make salt with a callback
        var _this = this;
        this.makeSalt(function (saltErr, salt) {
            if (saltErr) {
                next(saltErr);
            }
            _this.salt = salt;
            _this.encryptPassword(_this.password, function (encryptErr, hashedPassword) {
                if (encryptErr) {
                    next(encryptErr);
                }
                _this.password = hashedPassword;
                next();
            });
        });
    } else {
        next();
    }
});

/**
 * Post-save hook to send verify email
 */
UserSchema.post('save', function (doc, next) {
    if (this.wasNew) {
        //send welcome email and verify email
        //cep.pub(EVENTS.WELCOME, doc);
    }
    next();
});

/**
 * Methods
 */
UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} password
     * @param {Function} callback
     * @return {Boolean}
     * @api public
     */
    authenticate: function (password, callback) {
        if (!callback) {
            return this.password === this.encryptPassword(password);
        }

        var _this = this;
        this.encryptPassword(password, function (err, pwdGen) {
            if (err) {
                callback(err);
            }

            if (_this.password === pwdGen) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        });
    },

    /**
     * Make salt
     *
     * @param {Number} byteSize Optional salt byte size, default to 16
     * @param {Function} callback
     * @return {String}
     * @api public
     */
    makeSalt: function (byteSize, callback) {
        var defaultByteSize = 16;

        if (typeof arguments[0] === 'function') {
            callback = arguments[0];
            byteSize = defaultByteSize;
        } else if (typeof arguments[1] === 'function') {
            callback = arguments[1];
        }

        if (!byteSize) {
            byteSize = defaultByteSize;
        }

        if (!callback) {
            return __WEBPACK_IMPORTED_MODULE_0_crypto___default.a.randomBytes(byteSize).toString('base64');
        }

        return __WEBPACK_IMPORTED_MODULE_0_crypto___default.a.randomBytes(byteSize, function (err, salt) {
            if (err) {
                callback(err);
            }
            return callback(null, salt.toString('base64'));
        });
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @param {Function} callback
     * @return {String}
     * @api public
     */
    encryptPassword: function (password, callback) {
        if (!password || !this.salt) {
            return null;
        }

        var defaultIterations = 10000;
        var defaultKeyLength = 64;
        var salt = new Buffer(this.salt, 'base64');

        if (!callback) {
            return __WEBPACK_IMPORTED_MODULE_0_crypto___default.a.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength).toString('base64');
        }

        return __WEBPACK_IMPORTED_MODULE_0_crypto___default.a.pbkdf2(password, salt, defaultIterations, defaultKeyLength, function (err, key) {
            if (err) {
                callback(err);
            }
            return callback(null, key.toString('base64'));
        });
    }
};

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_1__libs_dollar__["a" /* default */]['mg'].model('User', UserSchema));

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable max-len */

const config = __webpack_require__(24);
module.exports = config;

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logger__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bluebird__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_bluebird__);
/**
 *
 * Global object for singleton pattern
 *
 **/




const mongoose = __WEBPACK_IMPORTED_MODULE_1_bluebird___default.a.promisifyAll(__webpack_require__(46));

let instance = null;

class Dollar {
  constructor() {
    if (!instance) {
      instance = this;
    }
    this.config = __webpack_require__(7);
    this.mg = mongoose;
    this.log = __WEBPACK_IMPORTED_MODULE_0__logger__["a" /* default */];
    return instance;
  }
}

const dollar = new Dollar();

/* harmony default export */ __webpack_exports__["a"] = (dollar);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sequelize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__config__);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




const sequelize = new __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a(__WEBPACK_IMPORTED_MODULE_1__config___default.a.databaseUrl, {
  define: {
    freezeTableName: true
  }
});

/* harmony default export */ __webpack_exports__["a"] = (sequelize);

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_passport__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_passport___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_passport__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_environment__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_environment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__config_environment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jsonwebtoken__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_express_jwt__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_express_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_express_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_composable_middleware__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_composable_middleware___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_composable_middleware__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api_user_user_model__ = __webpack_require__(10);








var validateJwt = __WEBPACK_IMPORTED_MODULE_3_express_jwt___default()({
  secret: __WEBPACK_IMPORTED_MODULE_1__config_environment___default.a.secrets.session
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return __WEBPACK_IMPORTED_MODULE_4_composable_middleware___default()()
  // Validate jwt
  .use(function (req, res, next) {
    // allow access_token to be passed through query parameter as well
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = 'Bearer ' + req.query.access_token;
    }
    validateJwt(req, res, next);
  })
  // Attach user to request
  .use(function (req, res, next) {
    __WEBPACK_IMPORTED_MODULE_5__api_user_user_model__["default"].findByIdAsync(req.user._id).then(function (user) {
      if (!user) {
        return res.status(401).end();
      }
      req.user = user;
      //set owner in middleware
      if (req.body && user._id) {
        req.body._owner = user._id;
      }
      next();
    }).catch(function (err) {
      return next(err);
    });
  });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  return __WEBPACK_IMPORTED_MODULE_4_composable_middleware___default()().use(isAuthenticated()).use(function meetsRequirements(req, res, next) {
    if (__WEBPACK_IMPORTED_MODULE_1__config_environment___default.a.userRoles.indexOf(req.user.role) >= __WEBPACK_IMPORTED_MODULE_1__config_environment___default.a.userRoles.indexOf(roleRequired)) {
      next();
    } else {
      res.status(403).send('Forbidden');
    }
  });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id, role) {
  return __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken___default.a.sign({ _id: id, role: role }, __WEBPACK_IMPORTED_MODULE_1__config_environment___default.a.secrets.session, {
    expiresIn: __WEBPACK_IMPORTED_MODULE_1__config_environment___default.a.loginTokenExpireIn
  });
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setTokenCookie(req, res) {
  if (!req.user) {
    return res.status(404).send('Something went wrong, please try again.');
  }
  var token = signToken(req.user._id, req.user.role);
  res.cookie('token', token);
  res.redirect('/');
}

/* harmony default export */ __webpack_exports__["a"] = ({ isAuthenticated, hasRole, signToken, setTokenCookie });

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* eslint-disable import/prefer-default-export */

const SET_RUNTIME_VARIABLE = 'SET_RUNTIME_VARIABLE';
/* harmony export (immutable) */ __webpack_exports__["b"] = SET_RUNTIME_VARIABLE;


const ACTION_TYPES = {
  LOGIN_USER_REQUEST: 'LOGIN_USER_REQUEST',
  LOGIN_USER_FAILURE: 'LOGIN_USER_FAILURE',
  LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS',
  LOGOUT_USER: 'LOGOUT_USER',
  FETCH_PROTECTED_DATA_REQUEST: 'FETCH_PROTECTED_DATA_REQUEST',
  RECEIVE_PROTECTED_DATA: 'RECEIVE_PROTECTED_DATA'
};
/* harmony export (immutable) */ __webpack_exports__["a"] = ACTION_TYPES;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("material-ui/styles/MuiThemeProvider");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("react-router-redux");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * The Util is for thin, globally reusable, utility functions
 */
var uuid = __webpack_require__(215);

var genUuid = function () {
  return uuid.v1();
};

/**
 * Check object B is part of object A by properties
 * @param  {object}  objA
 * @param  {object}  objB
 * @return {Boolean}
 */
var isPartOf = function (objA, objB) {
  return _.keys(objB).map(function (key) {
    return objB[key] === objA[key];
  }).reduce(function (prev, curr) {
    return prev && curr;
  });
};

module.exports = {
  genUuid: genUuid
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable max-len */

let config = {};
if (false) {
  // for client side code, only load shared config
  config = require('./enviroment/shared');
} else {
  const envConfig = __webpack_require__(76);
  // Using RC to read settings in /etc/appnamerc
  config = __webpack_require__(218)(process.env.npm_package_name || 'convospot-console', envConfig);
}

module.exports = config;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("material-ui/styles/colors");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("react-page-layout");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose_timestamp__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose_timestamp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose_timestamp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__libs_hashids__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__libs_dollar__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__libs_util__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__libs_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__libs_util__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__libs_validator__ = __webpack_require__(71);






var schema = {
    _id: {
        type: String,
        default: __WEBPACK_IMPORTED_MODULE_3__libs_util___default.a.genUuid
    },
    name: {
        type: String,
        min: 4,
        max: 30,
        required: true
    },
    protocol: {
        type: String,
        enum: ['http', 'https'],
        required: true
    },
    hostname: {
        type: String,
        // validate: {
        //     validator: validator.isURL,
        //     message: '{VALUE} is not a valid hostname'
        // },
        required: true
    },
    category: Number,
    personality: Object,
    settings: Object,
    active: {
        type: Boolean,
        default: true
    },
    _client: String,
    _owner: String
};

var AppSchema = new __WEBPACK_IMPORTED_MODULE_2__libs_dollar__["a" /* default */]['mg'].Schema(schema, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

AppSchema.plugin(__WEBPACK_IMPORTED_MODULE_0_mongoose_timestamp___default.a);

AppSchema.virtual('token').get(function () {
    return __WEBPACK_IMPORTED_MODULE_1__libs_hashids__["a" /* default */].encode(parseInt(this.sid));
});

AppSchema.static('findByShortIdAsync', function (sid) {
    return this.findOneAsync({
        sid: sid
    });
});

AppSchema.static('findByTokenAsync', function (token) {
    var sid = parseInt(__WEBPACK_IMPORTED_MODULE_1__libs_hashids__["a" /* default */].decode(token));
    return this.findOneAsync({
        sid: sid
    });
});

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_2__libs_dollar__["a" /* default */]['mg'].model('App', AppSchema));

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose_timestamp__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose_timestamp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose_timestamp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__libs_verification_generator__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__libs_dollar__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__libs_util__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__libs_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__libs_util__);





var User = __webpack_require__(10);

var schema = {
	id: {
		type: String,
		default: __WEBPACK_IMPORTED_MODULE_3__libs_util___default.a.genUuid
	},
	token: {
		type: String,
		index: true,
		default: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__libs_verification_generator__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_2__libs_dollar__["a" /* default */]['config'].verificationTokenSize)
	},
	type: {
		type: String,
		index: true
	},
	email: {
		type: String
	},
	expirationDate: {
		type: Date,
		expires: __WEBPACK_IMPORTED_MODULE_2__libs_dollar__["a" /* default */]['config'].verificationExpire
	},
	uid: String,
	used: {
		type: Boolean,
		default: false,
		index: true
	}
};

var Schema = new __WEBPACK_IMPORTED_MODULE_2__libs_dollar__["a" /* default */]['mg'].Schema(schema);
Schema.plugin(__WEBPACK_IMPORTED_MODULE_0_mongoose_timestamp___default.a);
var Model = __WEBPACK_IMPORTED_MODULE_2__libs_dollar__["a" /* default */]['mg'].model('verification', Schema);

Schema.statics.verifyUser = function (token, cb) {
	this.findOne({
		token: token
	}, function (err, doc) {
		if (!err) User.setVerification(doc.uid, cb);else cb(err, null);
	});
};

//send different notifications by verification type
Schema.post('save', function (doc) {
	var options = {};
	if (doc && doc.type) {
		if (doc.type === 'email') {
			//send email
		}
	}
});

/* harmony default export */ __webpack_exports__["a"] = (Model);

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_environment__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_environment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__config_environment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_winston__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_winston___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_winston__);



//Use customer logger later
var Logger = new __WEBPACK_IMPORTED_MODULE_1_winston___default.a.Logger({
	level: __WEBPACK_IMPORTED_MODULE_0__config_environment___default.a.logLvl,
	transports: [new __WEBPACK_IMPORTED_MODULE_1_winston___default.a.transports.Console({
		colorize: true,
		timestamp: true
	})]
});

/* harmony default export */ __webpack_exports__["a"] = (Logger);

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__libs_dollar__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_user_user_model__ = __webpack_require__(10);
/**
 * Overall socketio logic
 */






function handleEntityNotFound(socket, log = 'entity does not exist') {
    return function (entity) {
        if (!entity) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__libs_dollar__["a" /* default */])('log').info(log);
            socket.disconnect();
            return;
        }
        return entity;
    };
}

function saveUpdates(updates) {
    return function (entity) {
        if (entity) {
            var updated = __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.merge(entity, updates);
            return updated.saveAsync().spread(function (updated) {
                return updated;
            });
        }
    };
}
/**
 * Connect logic
 */
exports.connect = function (socket) {
    var query = socket.handshake.query;
    if (query.token && query.type === "console") {
        var userId = socket.decoded_token['_id'];
        __WEBPACK_IMPORTED_MODULE_2__api_user_user_model__["default"].findByIdAsync(userId).then(handleEntityNotFound(socket)).then(saveUpdates({
            status: 'online'
        }));
    }
};
/**
 * Disconnect logic
 */
exports.disconnect = function (socket) {
    var query = socket.handshake.query;
    if (query.token && query.type === "console") {
        var userId = socket.decoded_token['_id'];
        __WEBPACK_IMPORTED_MODULE_2__api_user_user_model__["default"].findByIdAsync(userId).then(handleEntityNotFound(socket)).then(saveUpdates({
            status: 'off'
        }));
    }
};

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__history__ = __webpack_require__(106);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/components/Link/Link.js';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Link extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.handleClick = event => {
      if (this.props.onClick) {
        this.props.onClick(event);
      }

      if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
        return;
      }

      if (event.defaultPrevented === true) {
        return;
      }

      event.preventDefault();
      __WEBPACK_IMPORTED_MODULE_2__history__["a" /* default */].push(this.props.to);
    }, _temp;
  }

  render() {
    const _props = this.props,
          { to, children } = _props,
          props = _objectWithoutProperties(_props, ['to', 'children']);
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'a',
      _extends({ href: to }, props, { onClick: this.handleClick, __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        },
        __self: this
      }),
      children
    );
  }
}

Link.propTypes = {
  to: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node.isRequired,
  onClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};
Link.defaultProps = {
  onClick: null
};
/* harmony default export */ __webpack_exports__["a"] = (Link);

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Page_css__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Page_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Page_css__);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/components/Page/Page.js';
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */






class Page extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  render() {
    const { title, html } = this.props;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_3__Page_css___default.a.root, __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_3__Page_css___default.a.container, __source: {
            fileName: _jsxFileName,
            lineNumber: 25
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h1',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 26
            },
            __self: this
          },
          title
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', {
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML: { __html: html },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 27
          },
          __self: this
        })
      )
    );
  }
}

Page.propTypes = {
  title: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  html: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Page_css___default.a)(Page));

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sequelize__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__User__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__UserLogin__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__UserClaim__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__UserProfile__ = __webpack_require__(100);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__User__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__UserLogin__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__UserClaim__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__UserProfile__["a"]; });
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */







__WEBPACK_IMPORTED_MODULE_1__User__["a" /* default */].hasMany(__WEBPACK_IMPORTED_MODULE_2__UserLogin__["a" /* default */], {
  foreignKey: 'userId',
  as: 'logins',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

__WEBPACK_IMPORTED_MODULE_1__User__["a" /* default */].hasMany(__WEBPACK_IMPORTED_MODULE_3__UserClaim__["a" /* default */], {
  foreignKey: 'userId',
  as: 'claims',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

__WEBPACK_IMPORTED_MODULE_1__User__["a" /* default */].hasOne(__WEBPACK_IMPORTED_MODULE_4__UserProfile__["a" /* default */], {
  foreignKey: 'userId',
  as: 'profile',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

function sync(...args) {
  return __WEBPACK_IMPORTED_MODULE_0__sequelize__["a" /* default */].sync(...args);
}

/* harmony default export */ __webpack_exports__["a"] = ({ sync });


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_auth_wrapper__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_auth_wrapper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_redux_auth_wrapper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_router_redux__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_router_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_router_redux__);






const requireAuthentication = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_redux_auth_wrapper__["UserAuthWrapper"])({
  authSelector: state => state.auth,
  predicate: auth => auth.isAuthenticated,
  redirectAction: __WEBPACK_IMPORTED_MODULE_4_react_router_redux__["push"],
  wrapperDisplayName: 'UserIsJWTAuthenticated'
});
/* unused harmony export requireAuthentication */


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(149);
    var insertCss = __webpack_require__(3);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./ErrorPage.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./ErrorPage.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("express-jwt");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("jwt-decode");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("mongoose-timestamp");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("pretty-error");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("react-styled-flexboxgrid");

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_http__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_http__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_https__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_https___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_https__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_bluebird__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_express__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_cookie_parser__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_cookie_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_cookie_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_body_parser__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_express_jwt__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_express_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_express_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_express_graphql__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_express_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_express_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_jsonwebtoken__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_jsonwebtoken___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_jsonwebtoken__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_react_dom_server__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_react_apollo__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_react_apollo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_react_apollo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_pretty_error__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_pretty_error___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_pretty_error__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__config__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__backend__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__frontend__ = __webpack_require__(107);
/**
 * Convospot console 
 *
 * Copyright © 2014-present Reflen Inc. All rights reserved.
 *
 */



 //use https in producation















const app = __WEBPACK_IMPORTED_MODULE_4_express___default()();
const server = __WEBPACK_IMPORTED_MODULE_1_http___default.a.createServer(app);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(__WEBPACK_IMPORTED_MODULE_4_express___default.a.static(__WEBPACK_IMPORTED_MODULE_0_path___default.a.join(__dirname, 'public')));
app.use(__WEBPACK_IMPORTED_MODULE_5_cookie_parser___default()());
app.use(__WEBPACK_IMPORTED_MODULE_6_body_parser___default.a.urlencoded({ extended: true }));
app.use(__WEBPACK_IMPORTED_MODULE_6_body_parser___default.a.json());

if (true) {
  app.enable('trust proxy');
}

//
// Register API middleware
// -----------------------------------------------------------------------------
const graphqlMiddleware = __WEBPACK_IMPORTED_MODULE_8_express_graphql___default()(req => ({
  schema,
  graphiql: true,
  rootValue: { request: req },
  pretty: true
}));

app.use('/graphql', graphqlMiddleware);

// socketio server
const socketio = __webpack_require__(234)(server, {
  serveClient: __WEBPACK_IMPORTED_MODULE_14__config___default.a.env !== 'production',
  path: '/socket.io-client'
});

// Load backend (api, auth, socketio, graphQL)
// -----------------------------------------------------------------------------
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_15__backend__["a" /* default */])(app, socketio);

// Load frontend (react)
// -----------------------------------------------------------------------------
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_16__frontend__["a" /* default */])(app);

//
// Launch the server
// -----------------------------------------------------------------------------
server.listen(__WEBPACK_IMPORTED_MODULE_14__config___default.a.port, __WEBPACK_IMPORTED_MODULE_14__config___default.a.ip, () => {
  console.info(`The server is running at http://localhost:${__WEBPACK_IMPORTED_MODULE_14__config___default.a.port}/`);
});

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * GET     /api/apps              ->  index
 * POST    /api/apps              ->  create
 * GET     /api/apps/:id          ->  show
 * PUT     /api/apps/:id          ->  update
 * DELETE  /api/apps/:id          ->  destroy
 */



var _ = __webpack_require__(26);
var App = __webpack_require__(31);

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function (entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync().spread(function (updated) {
      return updated;
    });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.removeAsync().then(function () {
        res.status(204).end();
      });
    }
  };
}

// Gets a list of Apps
const index = function (req, res) {
  //only show user's client
  var owner = req.user._id;
  // TODO, for admin
  App.findAsync({ _owner: owner }).then(responseWithResult(res)).catch(handleError(res));
};

// Gets a single App from the DB
// Using short id (always hide _id to client)
const show = function (req, res) {
  App.findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(responseWithResult(res)).catch(handleError(res));
};

// Creates a new App in the DB
const create = function (req, res) {
  var newUser = req.body;
  App.createAsync(newUser).then(responseWithResult(res, 201)).catch(handleError(res));
};

// Updates an existing App in the DB
const update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  App.findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(responseWithResult(res)).catch(handleError(res));
};

// Deletes a App from the DB
const destroy = function (req, res) {
  App.findByIdAsync(req.params.id).then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
};

/* harmony default export */ __webpack_exports__["a"] = ({ index, show, create, update, destroy });

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth_auth_service__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_controller__ = __webpack_require__(53);





// var knowledgeController = require('../knowledge/knowledge.controller');
// var conversationController = require('../conversation/conversation.controller');


let router = __WEBPACK_IMPORTED_MODULE_1_express___default.a.Router();

router.get('/', __WEBPACK_IMPORTED_MODULE_0__auth_auth_service__["a" /* default */].isAuthenticated(), __WEBPACK_IMPORTED_MODULE_2__app_controller__["a" /* default */].index);
router.get('/:id', __WEBPACK_IMPORTED_MODULE_0__auth_auth_service__["a" /* default */].isAuthenticated(), __WEBPACK_IMPORTED_MODULE_2__app_controller__["a" /* default */].show);
router.post('/', __WEBPACK_IMPORTED_MODULE_0__auth_auth_service__["a" /* default */].isAuthenticated(), __WEBPACK_IMPORTED_MODULE_2__app_controller__["a" /* default */].create);
router.put('/:id', __WEBPACK_IMPORTED_MODULE_0__auth_auth_service__["a" /* default */].isAuthenticated(), __WEBPACK_IMPORTED_MODULE_2__app_controller__["a" /* default */].update);
router.patch('/:id', __WEBPACK_IMPORTED_MODULE_0__auth_auth_service__["a" /* default */].isAuthenticated(), __WEBPACK_IMPORTED_MODULE_2__app_controller__["a" /* default */].update);
router.delete('/:id', __WEBPACK_IMPORTED_MODULE_0__auth_auth_service__["a" /* default */].isAuthenticated(), __WEBPACK_IMPORTED_MODULE_2__app_controller__["a" /* default */].destroy);

//forward to other controllers
// router.get('/:id/knowledges', knowledgeController.filterByApp);
// router.get('/:id/conversations', conversationController.filterByApp);

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__knowledge_controller__ = __webpack_require__(56);





var router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();

// only for demo
router.get('/', __WEBPACK_IMPORTED_MODULE_1__knowledge_controller__["a" /* default */].get);
router.put('/', __WEBPACK_IMPORTED_MODULE_1__knowledge_controller__["a" /* default */].update);

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


var redis = __webpack_require__(228);
var client = redis.createClient();

const get = function (req, res, next) {
    client.hget("demo", "knowledge", function (err, val) {
        res.json({ text: val });
    });
};

const update = function (req, res, next) {
    var val = req.body.text;
    console.log("TEST" + req.body.text);
    client.hset("demo", "knowledge", val);
    res.send('ok');
};

/* harmony default export */ __webpack_exports__["a"] = ({ get, update });

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_controller__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__ = __webpack_require__(18);






var router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();

router.get('/', __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* default */].hasRole('admin'), __WEBPACK_IMPORTED_MODULE_1__user_controller__["a" /* default */].index);
router.delete('/:id', __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* default */].hasRole('admin'), __WEBPACK_IMPORTED_MODULE_1__user_controller__["a" /* default */].destroy);
router.get('/me', __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* default */].isAuthenticated(), __WEBPACK_IMPORTED_MODULE_1__user_controller__["a" /* default */].me);
router.put('/:id/password', __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* default */].isAuthenticated(), __WEBPACK_IMPORTED_MODULE_1__user_controller__["a" /* default */].changePassword);
router.get('/:id', __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__["a" /* default */].isAuthenticated(), __WEBPACK_IMPORTED_MODULE_1__user_controller__["a" /* default */].show);
router.post('/', __WEBPACK_IMPORTED_MODULE_1__user_controller__["a" /* default */].create);

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user_model__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_passport__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_passport___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_passport__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_environment__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_environment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__config_environment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jsonwebtoken__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jsonwebtoken___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jsonwebtoken__);







function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function (err) {
    res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

function respondWith(res, statusCode) {
  statusCode = statusCode || 200;
  return function () {
    res.status(statusCode).end();
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
const index = function (req, res) {
  __WEBPACK_IMPORTED_MODULE_0__user_model__["default"].findAsync({}, '-salt -password').then(function (users) {
    res.status(200).json(users);
  }).catch(handleError(res));
};

/**
 * Creates a new user
 */
const create = function (req, res, next) {
  var newUser = new __WEBPACK_IMPORTED_MODULE_0__user_model__["default"](req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.saveAsync().spread(function (user) {
    var token = __WEBPACK_IMPORTED_MODULE_3_jsonwebtoken___default.a.sign({ _id: user._id }, __WEBPACK_IMPORTED_MODULE_2__config_environment___default.a.secrets.session, {
      expiresInMinutes: 60 * 5
    });
    res.json({ token: token });
  }).catch(validationError(res));
};

/**
 * Get a single user
 */
const show = function (req, res, next) {
  var userId = req.params.id;

  __WEBPACK_IMPORTED_MODULE_0__user_model__["default"].findByIdAsync(userId).then(function (user) {
    if (!user) {
      return res.status(404).end();
    }
    res.json(user.profile);
  }).catch(function (err) {
    return next(err);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
const destroy = function (req, res) {
  __WEBPACK_IMPORTED_MODULE_0__user_model__["default"].findByIdAndRemoveAsync(req.params.id).then(function () {
    res.status(204).end();
  }).catch(handleError(res));
};

/**
 * Change a users password
 */
const changePassword = function (req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  __WEBPACK_IMPORTED_MODULE_0__user_model__["default"].findByIdAsync(userId).then(function (user) {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      return user.saveAsync().then(function () {
        res.status(204).end();
      }).catch(validationError(res));
    } else {
      return res.status(403).end();
    }
  });
};

/**
 * Get my info
 */
const me = function (req, res, next) {
  var userId = req.user._id;

  // don't ever give out the password or salt
  __WEBPACK_IMPORTED_MODULE_0__user_model__["default"].findOneAsync({ _id: userId }, '-salt -password').then(function (user) {
    if (!user) {
      return res.status(401).end();
    }
    res.json(user);
  }).catch(function (err) {
    return next(err);
  });
};

/* harmony default export */ __webpack_exports__["a"] = ({ index, create, show, destroy, changePassword, me });

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__verification_controller__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_service__ = __webpack_require__(18);






var router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();

router.get('/', __WEBPACK_IMPORTED_MODULE_1__verification_controller__["a" /* default */].verify);

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__verification_model__ = __webpack_require__(32);




const verify = function (req, res, next) {
  var token = req.query.token;
  var condition = {
    token: token,
    used: false
  };

  __WEBPACK_IMPORTED_MODULE_0__verification_model__["a" /* default */].findOneAsync(condition).then(function (ver) {
    if (!ver) {
      return res.status(401).send('error');
    }
    res.json(ver);
  }).catch(function (err) {
    return next(err);
  });
};

/* harmony default export */ __webpack_exports__["a"] = ({ verify });

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_passport__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_passport___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_passport__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_environment__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_environment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__config_environment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_user_user_model__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__local_passport__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__local__ = __webpack_require__(62);









// Passport Configuration
__WEBPACK_IMPORTED_MODULE_4__local_passport__["a" /* setup */](__WEBPACK_IMPORTED_MODULE_3__api_user_user_model__["default"], __WEBPACK_IMPORTED_MODULE_2__config_environment___default.a);

var router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();

router.use('/local', __WEBPACK_IMPORTED_MODULE_5__local__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_passport__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_passport___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_passport__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(18);






var router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();

router.post('/', function (req, res, next) {
  __WEBPACK_IMPORTED_MODULE_1_passport___default.a.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) {
      return res.status(401).json(error);
    }
    if (!user) {
      return res.status(404).json({ message: 'Something went wrong, please try again.' });
    }

    var token = __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* default */].signToken(user._id, user.role);
    res.json({ token: token });
  })(req, res, next);
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return setup; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_passport__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_passport___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_passport__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_passport_local__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_passport_local___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_passport_local__);



function localAuthenticate(User, email, password, done) {
  User.findOneAsync({
    email: email.toLowerCase()
  }).then(function (user) {
    if (!user) {
      return done(null, false, {
        errors: {
          email: {
            message: 'This email is not registered.'
          }
        }
      });
    }
    user.authenticate(password, function (authError, authenticated) {
      if (authError) {
        return done(authError);
      }
      if (!authenticated) {
        return done(null, false, {
          errors: {
            password: {
              message: 'This password is not correct.'
            }
          }
        });
      } else {
        return done(null, user);
      }
    });
  }).catch(function (err) {
    return done(err);
  });
}

const setup = function (User, config) {
  __WEBPACK_IMPORTED_MODULE_0_passport___default.a.use(new __WEBPACK_IMPORTED_MODULE_1_passport_local__["Strategy"]({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  }, function (email, password, done) {
    return localAuthenticate(User, email, password, done);
  }));
};



/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return init; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_serve_favicon__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_serve_favicon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_serve_favicon__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_morgan__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_morgan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_morgan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_compression__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_compression___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_compression__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_body_parser__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_method_override__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_method_override___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_method_override__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_cookie_parser__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_cookie_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_cookie_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_errorhandler__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_errorhandler___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_errorhandler__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_path__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lusca__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lusca___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_lusca__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__environment__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__environment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__environment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_passport__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_passport___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_passport__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_express_session__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_express_session___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_express_session__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_connect_mongo__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_connect_mongo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_connect_mongo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_mongoose__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_cors__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_cors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_cors__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__proxy__ = __webpack_require__(65);
/**
 * Express configuration
 */





















const mongoStore = __WEBPACK_IMPORTED_MODULE_13_connect_mongo___default()(__WEBPACK_IMPORTED_MODULE_12_express_session___default.a);

const init = app => {
    var env = app.get('env');

    app.set('views', __WEBPACK_IMPORTED_MODULE_10__environment___default.a.root + '/server/views');
    app.engine('html', __webpack_require__(187).renderFile);
    app.set('view engine', 'html');
    app.use(__WEBPACK_IMPORTED_MODULE_3_compression___default()());
    app.use(__WEBPACK_IMPORTED_MODULE_4_body_parser___default.a.urlencoded({
        extended: false
    }));
    app.use(__WEBPACK_IMPORTED_MODULE_4_body_parser___default.a.json());
    app.use(__WEBPACK_IMPORTED_MODULE_5_method_override___default()());
    app.use(__WEBPACK_IMPORTED_MODULE_6_cookie_parser___default()());
    app.use(__WEBPACK_IMPORTED_MODULE_11_passport___default.a.initialize());

    // Persist sessions with mongoStore / sequelizeStore
    // We need to enable sessions for passport-twitter because it's an
    // oauth 1.0 strategy, and Lusca depends on sessions
    app.use(__WEBPACK_IMPORTED_MODULE_12_express_session___default()({
        secret: __WEBPACK_IMPORTED_MODULE_10__environment___default.a.secrets.session,
        saveUninitialized: true,
        resave: false,
        store: new mongoStore({
            mongooseConnection: __WEBPACK_IMPORTED_MODULE_14_mongoose___default.a.connection,
            db: 'app'
        })
    }));

    /**
     * Proxy to restful api
     */
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_16__proxy__["a" /* init */])(app);

    /**
     * express server security
     * https://github.com/krakenjs/lusca
     */
    if ('test' !== env) {
        // TODO: Enable later
        // app.use(lusca({
        //     csrf: {
        //         angular: true
        //     },
        //     xframe: 'SAMEORIGIN',
        //     hsts: {
        //         maxAge: 31536000, //1 year, in seconds
        //         includeSubDomains: true,
        //         preload: true
        //     },
        //     xssProtection: true
        // }));
    }

    app.set('appPath', __WEBPACK_IMPORTED_MODULE_8_path___default.a.join(__WEBPACK_IMPORTED_MODULE_10__environment___default.a.root, 'client'));

    if ('production' === env) {

        // allow cors in api (this have to put before multer)
        var whitelist = __WEBPACK_IMPORTED_MODULE_10__environment___default.a.corsWhitelist;
        var corsOptionsDelegate = function (req, callback) {
            var corsOptions;
            if (whitelist.indexOf(req.header('Origin')) !== -1) {
                corsOptions = {
                    origin: true
                }; // reflect (enable) the requested origin in the CORS response
            } else {
                corsOptions = {
                    origin: false
                }; // disable CORS for this request
            }
            callback(null, corsOptions); // callback expects two parameters: error and options
        };

        //TODO: change for security later
        //app.use(cors(corsOptionsDelegate)); 
        app.use(__WEBPACK_IMPORTED_MODULE_15_cors___default()());

        app.use(__WEBPACK_IMPORTED_MODULE_1_serve_favicon___default()(__WEBPACK_IMPORTED_MODULE_8_path___default.a.join(__WEBPACK_IMPORTED_MODULE_10__environment___default.a.root, 'client', 'favicon.ico')));
        app.use(__WEBPACK_IMPORTED_MODULE_0_express___default.a.static(app.get('appPath')));
        app.use(__WEBPACK_IMPORTED_MODULE_2_morgan___default()('dev'));
    }

    if ('development' === env) {
        app.use(__WEBPACK_IMPORTED_MODULE_15_cors___default()());
    }

    if ('development' === env || 'test' === env) {
        app.use(__WEBPACK_IMPORTED_MODULE_2_morgan___default()('dev'));
        app.use(__WEBPACK_IMPORTED_MODULE_7_errorhandler___default()()); // Error handler - has to be last
    }
};



/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return init; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environment__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__environment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express_http_proxy__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express_http_proxy___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express_http_proxy__);



/**
 * forward to resftul api
 */
const init = app => {
  app.use(`/${__WEBPACK_IMPORTED_MODULE_0__environment___default.a.apiPath}`, __WEBPACK_IMPORTED_MODULE_1_express_http_proxy___default()(`${__WEBPACK_IMPORTED_MODULE_0__environment___default.a.apiHost}:${__WEBPACK_IMPORTED_MODULE_0__environment___default.a.apiPort}`));
};



/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_app_app_model__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_user_user_model__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_verification_verification_model__ = __webpack_require__(32);
/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */




// import Message from '../api/message/message.model';
// import Conversation from '../api/conversation/conversation.model';
// import Knowledge from '../api/knowledge/knowledge.model';
// import Qna from '../api/qna/qna.model';



// Message.find({}).removeAsync();

// Qna.find({}).removeAsync();

// Verification.find({}).removeAsync();

__WEBPACK_IMPORTED_MODULE_1__api_user_user_model__["default"].find({}).removeAsync().then(function () {
    __WEBPACK_IMPORTED_MODULE_1__api_user_user_model__["default"].createAsync({
        provider: 'local',
        name: 'Test User',
        email: 'test@foo.com',
        password: 'test'
    }, {
        _id: 'f34b03c0-422d-11e6-8585-d7351c23bc39',
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'lujooo@gmail.com',
        password: 'admin'
    }).then(function () {
        console.log('finished populating users');
    });
});

__WEBPACK_IMPORTED_MODULE_0__api_app_app_model__["default"].find({}).removeAsync().then(function () {
    __WEBPACK_IMPORTED_MODULE_0__api_app_app_model__["default"].createAsync({
        name: 'demo_app',
        protocol: 'http',
        hostname: 'www.convospot.io',
        sid: '906384612820742',
        category: 99,
        personality: {
            responsive: 3,
            prudential: 3
        },
        settings: {
            summaryEmail: true
        },
        _id: 'dc45ebba-373b-11e6-ac61-9e71128cae77',
        _owner: 'f34b03c0-422d-11e6-8585-d7351c23bc39'
    }, {
        name: 'homer_app',
        protocol: 'http',
        hostname: 'www.convospot.io',
        sid: '906384612820743',
        category: 99,
        personality: {
            responsive: 3,
            prudential: 3
        },
        settings: {
            summaryEmail: true
        },
        _id: 'dc45ebba-373b-11e6-ac61-9e71128cae78',
        _owner: 'f34b03c0-422d-11e6-8585-d7351c23bc39'
    }).then(function () {
        console.log('finished populating apps');
    });
});

// Conversation.find({}).removeAsync()

// Knowledge.find({}).removeAsync()
//     .then(function() {
//         Knowledge.createAsync({
//             raw: `
// ## What are appointments like?

// You will be welcomed warmly by the practice and your care team each time you visit. Your appointments may vary depending on what your needs are. For a first appointment, we ask that you allow for 1 hour to establish care and get to know your care team.
//       `,
//             app: 'dc45ebba-373b-11e6-ac61-9e71128cae77',
//             _owner: 'f34b03c0-422d-11e6-8585-d7351c23bc39'
//         })
//             .then(function() {
//                 console.log('finished populating apps');
//             });
//     });

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return init; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environment__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__environment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__libs_logger__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jsonwebtoken__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_socketio_jwt__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_socketio_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_socketio_jwt__);
/**
 * Socket.io configuration
 */








// When the user disconnects.. perform this
const onDisconnect = socket => {
    __webpack_require__(34).disconnect(socket);
};

// When the user connects.. perform this
const onConnect = socket => {
    // Insert sockets below
    __webpack_require__(34).connect(socket);
};

const init = socketio => {
    // socket.io (v1.x.x) is powered by debug.
    // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
    //
    // ex: DEBUG: "http*,socket.io:socket"

    socketio.on('connection', __WEBPACK_IMPORTED_MODULE_3_socketio_jwt___default.a.authorize({
        secret: __WEBPACK_IMPORTED_MODULE_0__environment___default.a.secrets.session,
        timeout: 60000 // 60 seconds to send the authentication message
    })).on('authenticated', function (socket) {
        var room = socket.decoded_token['_id']; //Each user has its own room
        socket.address = socket.request.connection.remoteAddress + ':' + socket.request.connection.remotePort;
        socket.connectedAt = new Date();
        socket.join(room);
        socket.log = function (...data) {
            __WEBPACK_IMPORTED_MODULE_1__libs_logger__["a" /* default */].info(`SocketIO ${socket.nsp.name} [${socket.address}]`, ...data);
        };
        // Call onDisconnect.
        socket.on('disconnect', function () {
            socket.leave(room);
            onDisconnect(socket);
            socket.log('DISCONNECTED');
        });
        // Call onConnect.
        onConnect(socket);
        socket.log('CONNECTED');
    });
};



/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_environment__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_environment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__config_environment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cors__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_cors__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__libs_dollar__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_socketio__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config_express__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__routes__ = __webpack_require__(73);
/**
 * Bacnkend
 *
 * Copyright © 2014-present Reflen Inc. All rights reserved.
 *
 */









// register app with backend
const backend = (app, socketio) => {

	// Connect to MongoDB
	__WEBPACK_IMPORTED_MODULE_3__libs_dollar__["a" /* default */]['mg'].connect(__WEBPACK_IMPORTED_MODULE_1__config_environment___default.a.mongo.uri, __WEBPACK_IMPORTED_MODULE_1__config_environment___default.a.mongo.options);
	__WEBPACK_IMPORTED_MODULE_3__libs_dollar__["a" /* default */]['mg'].connection.on('error', function (err) {
		console.error('MongoDB connection error: ' + err);
		process.exit(-1);
	});

	// Populate databases with sample data
	if (__WEBPACK_IMPORTED_MODULE_1__config_environment___default.a.seedDB) {
		__webpack_require__(66);
	}

	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__config_socketio__["a" /* init */])(socketio.of(__WEBPACK_IMPORTED_MODULE_1__config_environment___default.a.socketNamespace));
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__config_express__["a" /* init */])(app);
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__routes__["a" /* load */])(app);
};

/* harmony default export */ __webpack_exports__["a"] = (backend);

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_environment__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_environment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__config_environment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_hashids__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_hashids___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_hashids__);



//Use customer logger later
let hashids = new __WEBPACK_IMPORTED_MODULE_1_hashids___default.a(__WEBPACK_IMPORTED_MODULE_0__config_environment___default.a.hashSalt);

/* harmony default export */ __webpack_exports__["a"] = (hashids);

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__var_errors_json__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__var_errors_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__var_errors_json__);


const httpError = reason => {
  return (req, res) => {
    var viewFilePath = reason || 'GENERAL';
    var statusCode = __WEBPACK_IMPORTED_MODULE_0__var_errors_json___default.a[reason].code;
    var result = __WEBPACK_IMPORTED_MODULE_0__var_errors_json___default.a[reason] || __WEBPACK_IMPORTED_MODULE_0__var_errors_json___default.a.GENERAL;

    res.status(result.status);
    res.render(viewFilePath, {}, function (err, html) {
      if (err) {
        return res.json(result, result.status);
      }
      res.send(html);
    });
  };
};

/* harmony default export */ __webpack_exports__["a"] = (httpError);

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express_validator__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express_validator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express_validator__);
/**
 * Validator for req
 */


const customValidators = {
	isArray: function (value) {
		return Array.isArray(value);
	}
};

const validator = __WEBPACK_IMPORTED_MODULE_0_express_validator___default()({
	customValidators: customValidators
});

/* unused harmony default export */ var _unused_webpack_default_export = (validator);

/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_base64url__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_base64url___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_base64url__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_crypto__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_crypto___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_crypto__);



/* harmony default export */ __webpack_exports__["a"] = (size => {
	return __WEBPACK_IMPORTED_MODULE_0_base64url___default()(__WEBPACK_IMPORTED_MODULE_1_crypto___default.a.randomBytes(size));
});

/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return load; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__libs_httpError__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_app__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_user__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_knowledge__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api_verification__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__auth__ = __webpack_require__(61);
/**
 * Main application routes
 */








const load = app => {

  // Insert routes below
  app.use('/api/apps', __WEBPACK_IMPORTED_MODULE_2__api_app__["a" /* default */]);
  app.use('/api/users', __WEBPACK_IMPORTED_MODULE_3__api_user__["a" /* default */]);
  app.use('/rest-api/knowledge', __WEBPACK_IMPORTED_MODULE_4__api_knowledge__["a" /* default */]);
  app.use('/api/verification', __WEBPACK_IMPORTED_MODULE_5__api_verification__["a" /* default */]);
  app.route('/api/*').get(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__libs_httpError__["a" /* default */])('NOT_FOUND'));
  app.use('/auth', __WEBPACK_IMPORTED_MODULE_6__auth__["a" /* default */]);

  // TODO: Move following to middleware (with content check)
  // All undefined asset or api routes should return a 404
  // app.route('/:url(api|auth|components|app|bower_components|assets)/*')
  //  response 404

  // All other routes should redirect to the react (in app.js)
};



/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// shared configurations for all env
const path = __webpack_require__(16);

module.exports = {

  env: "development",

  // Root path of server
  root: path.normalize(`${__dirname}/../../..`),

  // Server port
  port: process.env.PORT || 3000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    // API URL to be used in the server-side code
    serverUrl: process.env.API_SERVER_URL || `http://localhost:${process.env.PORT || 3000}`
  },

  // Database
  databaseUrl: process.env.DATABASE_URL || 'sqlite:database.sqlite',

  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID // UA-XXXXX-X
  },

  // Authentication
  auth: {
    jwt: { secret: process.env.JWT_SECRET || 'React Starter Kit' },

    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID || '186244551745631',
      secret: process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc'
    },

    // https://cloud.google.com/console/project
    google: {
      id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd'
    },

    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
      secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ'
    }
  },

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: process.env.JWT_SECRETS || '08f1af67cddd127b6f2122ce7a05cf5ef171c199a350687d3c8d8ed62b03642c'
  },

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  verificationExpire: '24h',
  verificationTokenSize: 64,

  facebook: {
    clientID: process.env.FACEBOOK_ID || 'id',
    clientSecret: process.env.FACEBOOK_SECRET || 'secret',
    callbackURL: `${process.env.DOMAIN || ''}/auth/facebook/callback`
  },

  google: {
    clientID: process.env.GOOGLE_ID || 'id',
    clientSecret: process.env.GOOGLE_SECRET || 'secret',
    callbackURL: `${process.env.DOMAIN || ''}/auth/google/callback`
  },

  // set open access endpoints (no need token, but limit rates)
  publicEndpoints: {
    GET: ['^/suggestion$', '^/file/'],
    POST: [{
      path: '^/user/status$',
      query: {
        action: 'login'
      }
    }, {
      path: '^/user/status$',
      query: {
        action: 'refresh'
      }
    }, {
      path: '^/user/status$',
      query: {
        action: 'reset_password'
      }
    }, {
      path: '^/user/status$',
      query: {
        action: 'check_vtoken'
      }
    }, {
      path: '^/user/status$',
      query: {
        action: 'update_password'
      }
    }, '^/user$', '^/test$'],
    PATCH: [],
    PUT: [],
    DELETE: []
  },

  loginTokenExpireIn: '24h'
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Development specific configuration
// ==================================

module.exports = {

	// Seed database on startup
	seedDB: true,

	mongo: {
		uri: 'mongodb://localhost/convospot-console-api'
	},

	apiHost: 'localhost',

	apiPort: '8001',

	logLvl: 'debug',

	hashSalt: 'ilikeconvospot',

	amqpConn: 'amqp://guest:guest@localhost:5672/seneca'

};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(26);

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

const config = _.merge(__webpack_require__(74), __webpack_require__(77), __webpack_require__(75) || {});

module.exports = config;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//shared setting for FE and BE

module.exports = {
	userRoles: ['guest', 'user', 'admin'],
	socketServer: '',
	apiPath: 'api',
	gapiPath: 'gapi',
	apiPrefix: 'v1',
	socketNamespace: '/convospot-console'
};

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = setRuntimeVariable;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(19);
/* eslint-disable import/prefer-default-export */



function setRuntimeVariable({ name, value }) {
  return {
    type: __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* SET_RUNTIME_VARIABLE */],
    payload: {
      name,
      value
    }
  };
}

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["loginUserSuccess"] = loginUserSuccess;
/* harmony export (immutable) */ __webpack_exports__["loginUserFailure"] = loginUserFailure;
/* harmony export (immutable) */ __webpack_exports__["loginUserRequest"] = loginUserRequest;
/* harmony export (immutable) */ __webpack_exports__["logout"] = logout;
/* harmony export (immutable) */ __webpack_exports__["logoutAndRedirect"] = logoutAndRedirect;
/* harmony export (immutable) */ __webpack_exports__["loginUser"] = loginUser;
/* harmony export (immutable) */ __webpack_exports__["receiveProtectedData"] = receiveProtectedData;
/* harmony export (immutable) */ __webpack_exports__["fetchProtectedDataRequest"] = fetchProtectedDataRequest;
/* harmony export (immutable) */ __webpack_exports__["fetchProtectedData"] = fetchProtectedData;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_redux__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_router_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jwt_decode__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_isomorphic_fetch__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_isomorphic_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_isomorphic_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api_Session__ = __webpack_require__(81);







function loginUserSuccess(token) {
  sessionStorage.setItem('token', token);
  return {
    type: __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* ACTION_TYPES */].LOGIN_USER_SUCCESS,
    payload: {
      token
    }
  };
}

function loginUserFailure(error) {
  sessionStorage.removeItem('token');
  return {
    type: __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* ACTION_TYPES */].LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

function loginUserRequest() {
  return {
    type: __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* ACTION_TYPES */].LOGIN_USER_REQUEST
  };
}

function logout() {
  sessionStorage.removeItem('token');
  return {
    type: __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* ACTION_TYPES */].LOGOUT_USER
  };
}

function logoutAndRedirect() {
  return (dispatch, state) => {
    dispatch(logout());
    dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_router_redux__["push"])('/login'));
  };
}

function loginUser(credentials, redirect = '/') {
  return function (dispatch) {
    dispatch(loginUserRequest());
    return __WEBPACK_IMPORTED_MODULE_5__api_Session__["a" /* default */].login(credentials).then(response => {
      try {
        const decoded = __WEBPACK_IMPORTED_MODULE_3_jwt_decode___default()(response.token);
        dispatch(loginUserSuccess(response.token));
        dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_router_redux__["push"])(redirect));
      } catch (e) {
        dispatch(loginUserFailure({
          response: {
            status: 403,
            statusText: 'Invalid token'
          }
        }));
      }
    }).catch(error => {
      dispatch(loginUserFailure(error));
    });
  };
}

function receiveProtectedData(data) {
  return {
    type: __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* ACTION_TYPES */].RECEIVE_PROTECTED_DATA,
    payload: {
      data
    }
  };
}

function fetchProtectedDataRequest() {
  return {
    type: __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* ACTION_TYPES */].FETCH_PROTECTED_DATA_REQUEST
  };
}

function fetchProtectedData(token) {
  return (dispatch, state) => {
    // fetch me
  };
}

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__config__);



class Knowledge {
  static get() {
    const request = new Request('/rest-api/knowledge', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });

    return __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch___default()(request).then(response => {
      return response.json();
    });
  }

  static set(text) {
    const request = new Request('/rest-api/knowledge', {
      method: 'put',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ text: text })
    });

    return __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch___default()(request).then(response => {
      return response.json();
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Knowledge);

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__config__);



class Session {
  static login(credentials) {
    const request = new Request('/auth/local', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(credentials)
    });

    return __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch___default()(request).then(response => {
      return response.json();
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Session);

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_tap_event_plugin__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_tap_event_plugin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_tap_event_plugin__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */






// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
__WEBPACK_IMPORTED_MODULE_3_react_tap_event_plugin___default()();

const ContextType = _extends({
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  // Universal HTTP client
  fetch: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
}, __WEBPACK_IMPORTED_MODULE_2_react_redux__["Provider"].childContextTypes, {
  // Apollo Client
  client: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
});

/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * Usage example:
 *
 *   const context = {
 *     history: createBrowserHistory(),
 *     store: createStore(),
 *   };
 *
 *   ReactDOM.render(
 *     <App context={context}>
 *       <Layout>
 *         <LandingPage />
 *       </Layout>
 *     </App>,
 *     container,
 *   );
 */
class App extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent {

  getChildContext() {
    return this.props.context;
  }

  render() {
    // NOTE: If you need to add or modify header, footer etc. of the app,
    // please do that inside the Layout component.
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.only(this.props.children);
  }

}

App.propTypes = {
  context: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape(ContextType).isRequired,
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element.isRequired
};
App.childContextTypes = ContextType;
/* harmony default export */ __webpack_exports__["a"] = (App);

/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_apollo__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_apollo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_apollo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/components/Dashboard/Dashboard.js';
/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of convospot-console. The codes can not be copied and/or distributed without permission
 *
 * @Author: homer
 * @Email: homer@convospot.io
 * @Date:   2017-11-05 17:00:20
 * @Last Modified by:   homer
 * @Last Modified time: 2017-11-05 19:41:01
 */




class Dashboard extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'a',
      { href: '/conversations', __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: '/mocks/dashboard.png', __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        },
        __self: this
      })
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_apollo__["compose"])()(Dashboard));

/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Feedback_css__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Feedback_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Feedback_css__);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/components/Feedback/Feedback.js';
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





class Feedback extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_2__Feedback_css___default.a.root, __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_2__Feedback_css___default.a.container, __source: {
            fileName: _jsxFileName,
            lineNumber: 18
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'a',
          {
            className: __WEBPACK_IMPORTED_MODULE_2__Feedback_css___default.a.link,
            href: 'https://gitter.im/kriasoft/react-starter-kit',
            __source: {
              fileName: _jsxFileName,
              lineNumber: 19
            },
            __self: this
          },
          'Ask a question'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: __WEBPACK_IMPORTED_MODULE_2__Feedback_css___default.a.spacer, __source: {
              fileName: _jsxFileName,
              lineNumber: 23
            },
            __self: this
          },
          '|'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'a',
          {
            className: __WEBPACK_IMPORTED_MODULE_2__Feedback_css___default.a.link,
            href: 'https://github.com/kriasoft/react-starter-kit/issues/new',
            __source: {
              fileName: _jsxFileName,
              lineNumber: 24
            },
            __self: this
          },
          'Report an issue'
        )
      )
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_2__Feedback_css___default.a)(Feedback));

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Footer_css__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Footer_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Footer_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Link__ = __webpack_require__(35);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/components/Footer/Footer.js';
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */






class Footer extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.root, __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.container, __source: {
            fileName: _jsxFileName,
            lineNumber: 19
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: __WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.text, __source: {
              fileName: _jsxFileName,
              lineNumber: 20
            },
            __self: this
          },
          '\xA9 Reflen Inc'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: __WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.spacer, __source: {
              fileName: _jsxFileName,
              lineNumber: 21
            },
            __self: this
          },
          '\xB7'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_3__Link__["a" /* default */],
          { className: __WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a.link, to: '/', __source: {
              fileName: _jsxFileName,
              lineNumber: 22
            },
            __self: this
          },
          '2017'
        )
      )
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_2__Footer_css___default.a)(Footer));

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Header_css__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Header_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Header_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Link__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_material_ui_AppBar__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_material_ui_AppBar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_material_ui_AppBar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_material_ui_MenuItem__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_material_ui_MenuItem___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_material_ui_MenuItem__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_material_ui_styles_MuiThemeProvider__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_material_ui_styles_MuiThemeProvider___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_material_ui_styles_MuiThemeProvider__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_material_ui_styles_colors__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_material_ui_styles_colors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_material_ui_styles_colors__);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/components/Header/Header.js';
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */










const styles = {
  header: {
    backgroundColor: __WEBPACK_IMPORTED_MODULE_7_material_ui_styles_colors__["deepPurple500"]
  }
};

class Header extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.handleToggleButtonTouchTap = event => {
      this.props.onToggleChange();
    }, _temp;
  }

  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_6_material_ui_styles_MuiThemeProvider___default.a,
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_4_material_ui_AppBar___default.a,
        { title: 'Sample App', style: styles.header, onLeftIconButtonTouchTap: this.handleToggleButtonTouchTap.bind(this), __source: {
            fileName: _jsxFileName,
            lineNumber: 34
          },
          __self: this
        },
        '  '
      )
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_2__Header_css___default.a)(Header));

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_serialize_javascript__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_serialize_javascript___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_serialize_javascript__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__config__);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/components/Html.js';
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */






/* eslint-disable react/no-danger */

class Html extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  render() {
    const { title, description, styles, scripts, app, children } = this.props;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'html',
      { className: 'no-js', lang: 'en', __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'head',
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 39
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('meta', { charSet: 'utf-8', __source: {
            fileName: _jsxFileName,
            lineNumber: 40
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('meta', { httpEquiv: 'x-ua-compatible', content: 'ie=edge', __source: {
            fileName: _jsxFileName,
            lineNumber: 41
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'title',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 42
            },
            __self: this
          },
          title
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('meta', { name: 'description', content: description, __source: {
            fileName: _jsxFileName,
            lineNumber: 43
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1', __source: {
            fileName: _jsxFileName,
            lineNumber: 44
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('link', { rel: 'apple-touch-icon', href: 'apple-touch-icon.png', __source: {
            fileName: _jsxFileName,
            lineNumber: 45
          },
          __self: this
        }),
        styles.map(style => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('style', {
          key: style.id,
          id: style.id,
          dangerouslySetInnerHTML: { __html: style.cssText },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 47
          },
          __self: this
        }))
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'body',
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 54
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { id: 'app', dangerouslySetInnerHTML: { __html: children }, __source: {
            fileName: _jsxFileName,
            lineNumber: 56
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('script', { dangerouslySetInnerHTML: { __html: `window.App=${__WEBPACK_IMPORTED_MODULE_2_serialize_javascript___default()(app)}` }, __source: {
            fileName: _jsxFileName,
            lineNumber: 57
          },
          __self: this
        }),
        scripts.map(script => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('script', { key: script, src: script, __source: {
            fileName: _jsxFileName,
            lineNumber: 58
          },
          __self: this
        })),
        __WEBPACK_IMPORTED_MODULE_3__config___default.a.analytics.googleTrackingId && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('script', {
          dangerouslySetInnerHTML: { __html: 'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' + `ga('create','${__WEBPACK_IMPORTED_MODULE_3__config___default.a.analytics.googleTrackingId}','auto');ga('send','pageview')` },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 60
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_3__config___default.a.analytics.googleTrackingId && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('script', { src: 'https://www.google-analytics.com/analytics.js', async: true, defer: true, __source: {
            fileName: _jsxFileName,
            lineNumber: 67
          },
          __self: this
        })
      )
    );
  }
}

Html.propTypes = {
  title: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  description: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  styles: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
    cssText: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
  }).isRequired),
  scripts: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired),
  app: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object, // eslint-disable-line
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
};
Html.defaultProps = {
  styles: [],
  scripts: []
};
/* harmony default export */ __webpack_exports__["a"] = (Html);

/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_apollo__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_apollo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_apollo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_styled_flexboxgrid__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_styled_flexboxgrid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_styled_flexboxgrid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_page_layout__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_page_layout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_page_layout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__GridOneOne_css__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__GridOneOne_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__GridOneOne_css__);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/components/Layout/GridOneOne.js';
/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of convospot-console. The codes can not be copied and/or distributed without permission
 *
 * @Author: homer
 * @Email: homer@convospot.io
 * @Date:   2017-11-04 19:48:49
 * @Last Modified by:   homer
 * @Last Modified time: 2017-11-05 12:25:56
 */








class GridOneOne extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_3_react_styled_flexboxgrid__["Grid"],
      { fluid: true, __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_3_react_styled_flexboxgrid__["Row"],
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 24
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_3_react_styled_flexboxgrid__["Col"],
          { xs: 12, md: 12, __source: {
              fileName: _jsxFileName,
              lineNumber: 25
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_page_layout__["Slot"], { name: 'top', __source: {
              fileName: _jsxFileName,
              lineNumber: 26
            },
            __self: this
          })
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_3_react_styled_flexboxgrid__["Row"],
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 29
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_3_react_styled_flexboxgrid__["Col"],
          { xs: 12, md: 12, __source: {
              fileName: _jsxFileName,
              lineNumber: 30
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_page_layout__["Slot"], { name: 'main', __source: {
              fileName: _jsxFileName,
              lineNumber: 31
            },
            __self: this
          })
        )
      )
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_apollo__["compose"])(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_5__GridOneOne_css___default.a))(GridOneOne));

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_apollo__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_apollo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_apollo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_styled_flexboxgrid__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_styled_flexboxgrid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_styled_flexboxgrid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_page_layout__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_page_layout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_page_layout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__GridOneTwo_css__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__GridOneTwo_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__GridOneTwo_css__);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/components/Layout/GridOneTwo.js';
/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of convospot-console. The codes can not be copied and/or distributed without permission
 *
 * @Author: homer
 * @Email: homer@convospot.io
 * @Date:   2017-11-04 19:48:49
 * @Last Modified by:   homer
 * @Last Modified time: 2017-11-05 13:47:50
 */








class GridOneTwo extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_3_react_styled_flexboxgrid__["Grid"],
      { fluid: true, __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_3_react_styled_flexboxgrid__["Row"],
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 24
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_3_react_styled_flexboxgrid__["Col"],
          { xs: 12, md: 12, __source: {
              fileName: _jsxFileName,
              lineNumber: 25
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_page_layout__["Slot"], { name: 'top', __source: {
              fileName: _jsxFileName,
              lineNumber: 26
            },
            __self: this
          })
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_3_react_styled_flexboxgrid__["Row"],
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 29
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_3_react_styled_flexboxgrid__["Col"],
          { xs: 12, md: 8, __source: {
              fileName: _jsxFileName,
              lineNumber: 30
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_page_layout__["Slot"], { name: 'main', __source: {
              fileName: _jsxFileName,
              lineNumber: 31
            },
            __self: this
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_3_react_styled_flexboxgrid__["Col"],
          { xs: 12, md: 4, __source: {
              fileName: _jsxFileName,
              lineNumber: 33
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_page_layout__["Slot"], { name: 'right', __source: {
              fileName: _jsxFileName,
              lineNumber: 34
            },
            __self: this
          })
        )
      )
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_apollo__["compose"])(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_5__GridOneTwo_css___default.a))(GridOneTwo));

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Layout_GridOneOne__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Layout_GridOneTwo__ = __webpack_require__(89);
/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of convospot-console. The codes can not be copied and/or distributed without permission
 *
 * @Author: homer
 * @Email: homer@convospot.io
 * @Date:   2017-11-05 13:49:02
 * @Last Modified by:   homer
 * @Last Modified time: 2017-11-05 14:01:45
 */




const grids = {
  'grid-one-one': __WEBPACK_IMPORTED_MODULE_0__components_Layout_GridOneOne__["a" /* default */],
  'grid-one-two': __WEBPACK_IMPORTED_MODULE_1__components_Layout_GridOneTwo__["a" /* default */]
};

/* harmony default export */ __webpack_exports__["a"] = (grids);

/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Sidebar_css__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Sidebar_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Sidebar_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_material_ui_Drawer__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_material_ui_Drawer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_material_ui_Drawer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_material_ui_List__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_material_ui_List___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_material_ui_List__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_material_ui_Divider__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_material_ui_Divider___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_material_ui_Divider__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_material_ui_svg_icons_action_info__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_material_ui_svg_icons_action_info___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_material_ui_svg_icons_action_info__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_material_ui_styles_MuiThemeProvider__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_material_ui_styles_MuiThemeProvider___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_material_ui_styles_MuiThemeProvider__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_material_ui_styles_getMuiTheme__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_material_ui_styles_getMuiTheme___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_material_ui_styles_getMuiTheme__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__theme__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__theme___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__theme__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_material_ui_styles__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_material_ui_styles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_material_ui_styles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__logo_png__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__logo_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__logo_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__logo_min_png__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__logo_min_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__logo_min_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_material_ui_styles_colors__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_material_ui_styles_colors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_material_ui_styles_colors__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_material_ui_IconButton__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_material_ui_IconButton___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_material_ui_IconButton__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_react_material_icons_icons_action_help_outline__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_react_material_icons_icons_action_help_outline___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_react_material_icons_icons_action_help_outline__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_react_material_icons_icons_action_account_circle__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_react_material_icons_icons_action_account_circle___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_react_material_icons_icons_action_account_circle__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_react_material_icons_icons_content_add__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_react_material_icons_icons_content_add___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_react_material_icons_icons_content_add__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_react_material_icons_icons_navigation_chevron_left__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_react_material_icons_icons_navigation_chevron_left___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19_react_material_icons_icons_navigation_chevron_left__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_react_material_icons_icons_action_list__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_react_material_icons_icons_action_list___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20_react_material_icons_icons_action_list__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_react_material_icons_icons_action_event_seat__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_react_material_icons_icons_action_event_seat___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21_react_material_icons_icons_action_event_seat__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_react_router_dom_Link__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_react_router_dom_Link___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_22_react_router_dom_Link__);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/components/Sidebar/Sidebar.js';
/**
 * Sidebar component
 *
 * Copyright © 2016-present Refle Inc. All rights reserved.
 *
 */

























const styles = {
  logo: {
    cursor: 'pointer',
    paddingLeft: __WEBPACK_IMPORTED_MODULE_11_material_ui_styles__["spacing"].desktopGutter,
    marginTop: 24,
    marginBottom: 8
  },
  fixedMenu: {
    backgroundColor: __WEBPACK_IMPORTED_MODULE_14_material_ui_styles_colors__["deepPurple500"]
  },
  drawer: {
    width: 320
  },
  version: {
    paddingLeft: __WEBPACK_IMPORTED_MODULE_11_material_ui_styles__["spacing"].desktopGutterLess,
    fontSize: 16
  },
  large: {
    width: 60,
    height: 60,
    padding: 0
  },
  largeIcon: {
    width: 48,
    height: 48
  }
};

class Sidebar extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  constructor(props) {
    super(props);

    this.handleCloseButtonTouchTap = () => {
      this.props.onClose(false);
    };
  }

  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_8_material_ui_styles_MuiThemeProvider___default.a,
      { muiTheme: __WEBPACK_IMPORTED_MODULE_9_material_ui_styles_getMuiTheme___default()(__WEBPACK_IMPORTED_MODULE_10__theme___default.a), __source: {
          fileName: _jsxFileName,
          lineNumber: 72
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_4_material_ui_Drawer___default.a,
        { docked: false, open: this.props.open, width: styles.drawer.width, onRequestChange: this.handleCloseButtonTouchTap, __source: {
            fileName: _jsxFileName,
            lineNumber: 73
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: __WEBPACK_IMPORTED_MODULE_3__Sidebar_css___default.a.leftMenu, style: styles.fixedMenu, __source: {
              fileName: _jsxFileName,
              lineNumber: 74
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_3__Sidebar_css___default.a.logo, __source: {
                fileName: _jsxFileName,
                lineNumber: 75
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_15_material_ui_IconButton___default.a,
              { iconStyle: styles.largeIcon, style: styles.large, onTouchTap: this.handleCloseButtonTouchTap, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 76
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: __WEBPACK_IMPORTED_MODULE_13__logo_min_png___default.a, alt: 'logo', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 77
                },
                __self: this
              })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_3__Sidebar_css___default.a.fixedButton, __source: {
                fileName: _jsxFileName,
                lineNumber: 80
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_15_material_ui_IconButton___default.a,
              { tooltip: 'All apps', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 81
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_20_react_material_icons_icons_action_list___default.a, {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 82
                },
                __self: this
              })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_3__Sidebar_css___default.a.fixedButton, __source: {
                fileName: _jsxFileName,
                lineNumber: 85
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_15_material_ui_IconButton___default.a,
              { tooltip: 'Add a app', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 86
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_18_react_material_icons_icons_content_add___default.a, {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 87
                },
                __self: this
              })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_3__Sidebar_css___default.a.bottomSection, __source: {
                fileName: _jsxFileName,
                lineNumber: 90
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: __WEBPACK_IMPORTED_MODULE_3__Sidebar_css___default.a.fixedButton, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 91
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_15_material_ui_IconButton___default.a,
                { tooltip: 'Help', tooltipPosition: 'top-center', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 92
                  },
                  __self: this
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_16_react_material_icons_icons_action_help_outline___default.a, {
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 93
                  },
                  __self: this
                })
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: __WEBPACK_IMPORTED_MODULE_3__Sidebar_css___default.a.fixedButton, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 96
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_15_material_ui_IconButton___default.a,
                { tooltip: 'Profile', tooltipPosition: 'top-center', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 97
                  },
                  __self: this
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_17_react_material_icons_icons_action_account_circle___default.a, {
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 98
                  },
                  __self: this
                })
              )
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: __WEBPACK_IMPORTED_MODULE_3__Sidebar_css___default.a.rightMenu, __source: {
              fileName: _jsxFileName,
              lineNumber: 103
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { style: styles.logo, onTouchTap: this.handleCloseButtonTouchTap, __source: {
                fileName: _jsxFileName,
                lineNumber: 104
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: __WEBPACK_IMPORTED_MODULE_12__logo_png___default.a, alt: 'convospot', __source: {
                fileName: _jsxFileName,
                lineNumber: 105
              },
              __self: this
            })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_5_material_ui_List__["List"],
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 107
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_material_ui_List__["ListItem"], { primaryText: 'Overview', leftIcon: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_21_react_material_icons_icons_action_event_seat___default.a, {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 108
                },
                __self: this
              }), __source: {
                fileName: _jsxFileName,
                lineNumber: 108
              },
              __self: this
            })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_material_ui_Divider___default.a, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 110
            },
            __self: this
          }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_5_material_ui_List__["List"],
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 111
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_5_material_ui_List__["ListItem"],
              { leftIcon: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_16_react_material_icons_icons_action_help_outline___default.a, {
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 112
                  },
                  __self: this
                }), button: true, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 112
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'a',
                { href: '/conversations', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 112
                  },
                  __self: this
                },
                'Conversations'
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_5_material_ui_List__["ListItem"],
              { leftIcon: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_16_react_material_icons_icons_action_help_outline___default.a, {
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 113
                  },
                  __self: this
                }), button: true, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 113
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'a',
                { href: '/knowldge', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 113
                  },
                  __self: this
                },
                'Knowledge'
              )
            )
          )
        )
      )
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Sidebar_css___default.a)(Sidebar));

/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_apollo__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_apollo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_apollo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/components/Timeline/Timeline.js';
/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of convospot-console. The codes can not be copied and/or distributed without permission
 *
 * @Author: homer
 * @Email: homer@convospot.io
 * @Date:   2017-11-05 17:00:20
 * @Last Modified by:   homer
 * @Last Modified time: 2017-11-05 17:55:06
 */




class Timeline extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: '/mocks/timeline.png', __source: {
        fileName: _jsxFileName,
        lineNumber: 20
      },
      __self: this
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_apollo__["compose"])()(Timeline));

/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_apollo__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_apollo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_apollo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/components/Title/Title.js';




class Title extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: '/mocks/title.png', __source: {
        fileName: _jsxFileName,
        lineNumber: 9
      },
      __self: this
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_apollo__["compose"])()(Title));

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colors = __webpack_require__(27);

var _colorManipulator = __webpack_require__(212);

var _spacing = __webpack_require__(210);

var _spacing2 = _interopRequireDefault(_spacing);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
  spacing: _spacing2.default,
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: _colors.deepPurple500,
    primary2Color: _colors.deepPurple700,
    primary3Color: _colors.grey600,
    accent1Color: _colors.pinkA200,
    accent2Color: _colors.pinkA400,
    accent3Color: _colors.pinkA100,
    textColor: _colors.fullWhite,
    secondaryTextColor: (0, _colorManipulator.fade)(_colors.fullWhite, 0.7),
    alternateTextColor: '#303030',
    canvasColor: '#303030',
    borderColor: (0, _colorManipulator.fade)(_colors.fullWhite, 0.3),
    disabledColor: (0, _colorManipulator.fade)(_colors.fullWhite, 0.3),
    pickerHeaderColor: (0, _colorManipulator.fade)(_colors.fullWhite, 0.12),
    clockCircleColor: (0, _colorManipulator.fade)(_colors.fullWhite, 0.12)
  }
};

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createApolloClient;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_apollo_client__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_apollo_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_apollo_client__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }





// Execute all GraphQL requests directly without
class ServerInterface {
  constructor(optionsData) {
    this.schema = optionsData.schema;
    this.optionsData = optionsData;
  }

  query({ query, variables, operationName }) {
    var _this = this;

    return _asyncToGenerator(function* () {
      try {
        let validationRules = __WEBPACK_IMPORTED_MODULE_0_graphql__["specifiedRules"];
        const customValidationRules = _this.optionsData.validationRules;
        if (customValidationRules) {
          validationRules = validationRules.concat(customValidationRules);
        }

        const validationErrors = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_graphql__["validate"])(_this.schema, query, validationRules);
        if (validationErrors.length > 0) {
          return { errors: validationErrors };
        }

        const result = yield __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_graphql__["execute"])(_this.schema, query, _this.optionsData.rootValue, _this.optionsData.context, variables, operationName);

        return result;
      } catch (contextError) {
        return { errors: [contextError] };
      }
    })();
  }
}

function createApolloClient(options) {
  return new __WEBPACK_IMPORTED_MODULE_1_apollo_client___default.a({
    reduxRootSelector: state => state.apollo,
    networkInterface: new ServerInterface(options),
    queryDeduplication: true
  });
}

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



/**
 * Creates a wrapper function around the HTML5 Fetch API that provides
 * default arguments to fetch(...) and is intended to reduce the amount
 * of boilerplate code in the application.
 * https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
 */
function createFetch({ baseUrl, cookie }) {
  // NOTE: Tweak the default options to suite your application needs
  const defaults = {
    method: 'POST', // handy with GraphQL backends
    mode: baseUrl ? 'cors' : 'same-origin',
    credentials: baseUrl ? 'include' : 'same-origin',
    headers: _extends({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }, cookie ? { Cookie: cookie } : null)
  };

  return (url, options) => url.startsWith('/graphql') || url.startsWith('/api') ? __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch___default()(`${baseUrl}${url}`, _extends({}, defaults, options, {
    headers: _extends({}, defaults.headers, options && options.headers)
  })) : __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch___default()(url, options);
}

/* harmony default export */ __webpack_exports__["a"] = (createFetch);

/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sequelize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sequelize__ = __webpack_require__(13);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




const User = __WEBPACK_IMPORTED_MODULE_1__sequelize__["a" /* default */].define('User', {

  id: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.UUID,
    defaultValue: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.UUIDV1,
    primaryKey: true
  },

  email: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(255),
    validate: { isEmail: true }
  },

  emailConfirmed: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.BOOLEAN,
    defaultValue: false
  }

}, {

  indexes: [{ fields: ['email'] }]

});

/* harmony default export */ __webpack_exports__["a"] = (User);

/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sequelize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sequelize__ = __webpack_require__(13);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




const UserClaim = __WEBPACK_IMPORTED_MODULE_1__sequelize__["a" /* default */].define('UserClaim', {

  type: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING
  },

  value: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING
  }

});

/* harmony default export */ __webpack_exports__["a"] = (UserClaim);

/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sequelize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sequelize__ = __webpack_require__(13);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




const UserLogin = __WEBPACK_IMPORTED_MODULE_1__sequelize__["a" /* default */].define('UserLogin', {

  name: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(50),
    primaryKey: true
  },

  key: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(100),
    primaryKey: true
  }

});

/* harmony default export */ __webpack_exports__["a"] = (UserLogin);

/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sequelize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sequelize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sequelize__ = __webpack_require__(13);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




const UserProfile = __WEBPACK_IMPORTED_MODULE_1__sequelize__["a" /* default */].define('UserProfile', {

  userId: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.UUID,
    primaryKey: true
  },

  displayName: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(100)
  },

  picture: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(255)
  },

  gender: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(50)
  },

  location: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(100)
  },

  website: {
    type: __WEBPACK_IMPORTED_MODULE_0_sequelize___default.a.STRING(255)
  }

});

/* harmony default export */ __webpack_exports__["a"] = (UserProfile);

/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__types_UserType__ = __webpack_require__(105);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



const me = {
  type: __WEBPACK_IMPORTED_MODULE_0__types_UserType__["a" /* default */],
  resolve({ request }) {
    return request.user && {
      id: request.user.id,
      email: request.user.email
    };
  }
};

/* harmony default export */ __webpack_exports__["a"] = (me);

/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__types_NewsItemType__ = __webpack_require__(104);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





// React.js News Feed (RSS)
const url = 'https://api.rss2json.com/v1/api.json' + '?rss_url=https%3A%2F%2Freactjsnews.com%2Ffeed.xml';

let items = [];
let lastFetchTask;
let lastFetchTime = new Date(1970, 0, 1);

const news = {
  type: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLList"](__WEBPACK_IMPORTED_MODULE_2__types_NewsItemType__["a" /* default */]),
  resolve() {
    if (lastFetchTask) {
      return lastFetchTask;
    }

    if (new Date() - lastFetchTime > 1000 * 60 * 10 /* 10 mins */) {
        lastFetchTime = new Date();
        lastFetchTask = __WEBPACK_IMPORTED_MODULE_1_isomorphic_fetch___default()(url).then(response => response.json()).then(data => {
          if (data.status === 'ok') {
            items = data.items;
          }

          lastFetchTask = null;
          return items;
        }).catch(err => {
          lastFetchTask = null;
          throw err;
        });

        if (items.length) {
          return items;
        }

        return lastFetchTask;
      }

    return items;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (news);

/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__queries_me__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__queries_news__ = __webpack_require__(102);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */






const schema = new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLSchema"]({
  query: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLObjectType"]({
    name: 'Query',
    fields: {
      me: __WEBPACK_IMPORTED_MODULE_1__queries_me__["a" /* default */],
      news: __WEBPACK_IMPORTED_MODULE_2__queries_news__["a" /* default */]
    }
  })
});

/* harmony default export */ __webpack_exports__["a"] = (schema);

/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql__);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



const NewsItemType = new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLObjectType"]({
  name: 'NewsItem',
  fields: {
    title: { type: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLNonNull"](__WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"]) },
    link: { type: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLNonNull"](__WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"]) },
    author: { type: __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"] },
    pubDate: { type: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLNonNull"](__WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"]) },
    content: { type: __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"] }
  }
});

/* harmony default export */ __webpack_exports__["a"] = (NewsItemType);

/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql__);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



const UserType = new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLObjectType"]({
  name: 'User',
  fields: {
    id: { type: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLNonNull"](__WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLID"]) },
    email: { type: __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"] }
  }
});

/* harmony default export */ __webpack_exports__["a"] = (UserType);

/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history_createBrowserHistory__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_history_createBrowserHistory___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_history_createBrowserHistory__);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



// Navigation manager, e.g. history.push('/home')
// https://github.com/mjackson/history
/* harmony default export */ __webpack_exports__["a"] = (false && __WEBPACK_IMPORTED_MODULE_0_history_createBrowserHistory___default()());

/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bluebird__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_dom_server__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_apollo__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_apollo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_apollo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_pretty_error__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_pretty_error___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_pretty_error__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_createApolloClient__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_App__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_Html__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__routes_error_ErrorPage__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__routes_error_ErrorPage_css__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__routes_error_ErrorPage_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__routes_error_ErrorPage_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__createFetch__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__passport__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__router__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__data_models__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__data_schema__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__assets_json__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__assets_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16__assets_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__store_configureStore__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__actions_runtime__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__config__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19__config__);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/index.js',
    _this = this;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new __WEBPACK_IMPORTED_MODULE_1_bluebird___default.a(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return __WEBPACK_IMPORTED_MODULE_1_bluebird___default.a.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Convospot console
 *
 * Copyright © 2014-present Reflen Inc. All rights reserved.
 *
 */

















 // eslint-disable-line import/no-unresolved




//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

__WEBPACK_IMPORTED_MODULE_14__data_models__["a" /* default */].sync().catch(err => console.error(err.stack));

const frontend = app => {
  //
  // Register server-side rendering middleware
  // -----------------------------------------------------------------------------
  app.get('*', (() => {
    var _ref = _asyncToGenerator(function* (req, res, next) {
      try {
        const css = new Set();

        const apolloClient = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__core_createApolloClient__["a" /* default */])({
          schema: __WEBPACK_IMPORTED_MODULE_15__data_schema__["a" /* default */],
          rootValue: { request: req }
        });

        const fetch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__createFetch__["a" /* default */])({
          baseUrl: __WEBPACK_IMPORTED_MODULE_19__config___default.a.api.serverUrl,
          cookie: req.headers.cookie,
          apolloClient
        });

        const initialState = {
          user: req.user || null
        };

        const store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_17__store_configureStore__["a" /* default */])(initialState, {
          cookie: req.headers.cookie,
          apolloClient,
          fetch,
          // I should not use `history` on server.. but how I do redirection? follow universal-router
          history: null
        });

        store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_18__actions_runtime__["a" /* setRuntimeVariable */])({
          name: 'initialNow',
          value: Date.now()
        }));

        // Global (context) variables that can be easily accessed from any React component
        // https://facebook.github.io/react/docs/context.html
        const context = {
          // Enables critical path CSS rendering
          // https://github.com/kriasoft/isomorphic-style-loader
          insertCss: function (...styles) {
            // eslint-disable-next-line no-underscore-dangle
            styles.forEach(function (style) {
              return css.add(style._getCss());
            });
          },
          fetch,
          // You can access redux through react-redux connect
          store,
          storeSubscription: null,
          // Apollo Client for use with react-apollo
          client: apolloClient
        };

        const route = yield __WEBPACK_IMPORTED_MODULE_13__router__["a" /* default */].resolve(_extends({}, context, {
          path: req.path,
          query: req.query
        }));

        if (route.redirect) {
          res.redirect(route.status || 302, route.redirect);
          return;
        }

        const data = _extends({}, route);

        const rootComponent = __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_7__components_App__["a" /* default */],
          { context: context, store: store, __source: {
              fileName: _jsxFileName,
              lineNumber: 106
            },
            __self: _this
          },
          route.component
        );
        yield __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_react_apollo__["getDataFromTree"])(rootComponent);
        // this is here because of Apollo redux APOLLO_QUERY_STOP action
        yield __WEBPACK_IMPORTED_MODULE_1_bluebird___default.a.delay(0);
        data.children = yield __WEBPACK_IMPORTED_MODULE_3_react_dom_server___default.a.renderToString(rootComponent);
        data.styles = [{ id: 'css', cssText: [...css].join('') }];
        data.scripts = [__WEBPACK_IMPORTED_MODULE_16__assets_json___default.a.vendor.js, __WEBPACK_IMPORTED_MODULE_16__assets_json___default.a.client.js];

        if (__WEBPACK_IMPORTED_MODULE_16__assets_json___default.a[route.chunk]) {
          data.scripts.push(__WEBPACK_IMPORTED_MODULE_16__assets_json___default.a[route.chunk].js);
        }

        // Furthermore invoked actions will be ignored, client will not receive them!
        if (true) {
          // eslint-disable-next-line no-console
          console.log('Serializing store...');
        }
        data.app = {
          apiUrl: __WEBPACK_IMPORTED_MODULE_19__config___default.a.api.clientUrl,
          state: context.store.getState()
        };

        const html = __WEBPACK_IMPORTED_MODULE_3_react_dom_server___default.a.renderToStaticMarkup(__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__components_Html__["a" /* default */], _extends({}, data, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 136
          },
          __self: _this
        })));
        res.status(route.status || 200);
        res.send(`<!doctype html>${html}`);
      } catch (err) {
        next(err);
      }
    });

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  })());

  //
  // Error handling
  // -----------------------------------------------------------------------------
  const pe = new __WEBPACK_IMPORTED_MODULE_5_pretty_error___default.a();
  pe.skipNodeFiles();
  pe.skipPackage('express');

  app.use((err, req, res, next) => {
    // eslint-disable-line no-unused-vars
    console.error(pe.render(err));
    const html = __WEBPACK_IMPORTED_MODULE_3_react_dom_server___default.a.renderToStaticMarkup(__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_8__components_Html__["a" /* default */],
      {
        title: 'Internal Server Error',
        description: err.message,
        styles: [{ id: 'css', cssText: __WEBPACK_IMPORTED_MODULE_10__routes_error_ErrorPage_css___default.a._getCss() }],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 154
        },
        __self: _this
      },
      __WEBPACK_IMPORTED_MODULE_3_react_dom_server___default.a.renderToString(__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__routes_error_ErrorPage__["a" /* ErrorPageWithoutStyle */], { error: err, __source: {
          fileName: _jsxFileName,
          lineNumber: 159
        },
        __self: _this
      }))
    ));
    res.status(err.status || 500);
    res.send(`<!doctype html>${html}`);
  });
};

/* harmony default export */ __webpack_exports__["a"] = (frontend);

/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_passport__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_passport___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_passport__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_passport_facebook__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_passport_facebook___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_passport_facebook__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_models__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__config__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Passport.js reference implementation.
 * The database schema used in this sample is available at
 * https://github.com/membership/membership.db/tree/master/postgres
 */






/**
 * Sign in with Facebook.
 */
__WEBPACK_IMPORTED_MODULE_0_passport___default.a.use(new __WEBPACK_IMPORTED_MODULE_1_passport_facebook__["Strategy"]({
  clientID: __WEBPACK_IMPORTED_MODULE_3__config___default.a.auth.facebook.id,
  clientSecret: __WEBPACK_IMPORTED_MODULE_3__config___default.a.auth.facebook.secret,
  callbackURL: '/login/facebook/return',
  profileFields: ['displayName', 'name', 'email', 'link', 'locale', 'timezone'],
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  /* eslint-disable no-underscore-dangle */
  const loginName = 'facebook';
  const claimType = 'urn:facebook:access_token';
  const fooBar = (() => {
    var _ref = _asyncToGenerator(function* () {
      if (req.user) {
        const userLogin = yield __WEBPACK_IMPORTED_MODULE_2__data_models__["b" /* UserLogin */].findOne({
          attributes: ['name', 'key'],
          where: { name: loginName, key: profile.id }
        });
        if (userLogin) {
          // There is already a Facebook account that belongs to you.
          // Sign in with that account or delete it, then link it with your current account.
          done();
        } else {
          const user = yield __WEBPACK_IMPORTED_MODULE_2__data_models__["c" /* User */].create({
            id: req.user.id,
            email: profile._json.email,
            logins: [{ name: loginName, key: profile.id }],
            claims: [{ type: claimType, value: profile.id }],
            profile: {
              displayName: profile.displayName,
              gender: profile._json.gender,
              picture: `https://graph.facebook.com/${profile.id}/picture?type=large`
            }
          }, {
            include: [{ model: __WEBPACK_IMPORTED_MODULE_2__data_models__["b" /* UserLogin */], as: 'logins' }, { model: __WEBPACK_IMPORTED_MODULE_2__data_models__["d" /* UserClaim */], as: 'claims' }, { model: __WEBPACK_IMPORTED_MODULE_2__data_models__["e" /* UserProfile */], as: 'profile' }]
          });
          done(null, {
            id: user.id,
            email: user.email
          });
        }
      } else {
        const users = yield __WEBPACK_IMPORTED_MODULE_2__data_models__["c" /* User */].findAll({
          attributes: ['id', 'email'],
          where: { '$logins.name$': loginName, '$logins.key$': profile.id },
          include: [{
            attributes: ['name', 'key'],
            model: __WEBPACK_IMPORTED_MODULE_2__data_models__["b" /* UserLogin */],
            as: 'logins',
            required: true
          }]
        });
        if (users.length) {
          const user = users[0].get({ plain: true });
          done(null, user);
        } else {
          let user = yield __WEBPACK_IMPORTED_MODULE_2__data_models__["c" /* User */].findOne({ where: { email: profile._json.email } });
          if (user) {
            // There is already an account using this email address. Sign in to
            // that account and link it with Facebook manually from Account Settings.
            done(null);
          } else {
            user = yield __WEBPACK_IMPORTED_MODULE_2__data_models__["c" /* User */].create({
              email: profile._json.email,
              emailConfirmed: true,
              logins: [{ name: loginName, key: profile.id }],
              claims: [{ type: claimType, value: accessToken }],
              profile: {
                displayName: profile.displayName,
                gender: profile._json.gender,
                picture: `https://graph.facebook.com/${profile.id}/picture?type=large`
              }
            }, {
              include: [{ model: __WEBPACK_IMPORTED_MODULE_2__data_models__["b" /* UserLogin */], as: 'logins' }, { model: __WEBPACK_IMPORTED_MODULE_2__data_models__["d" /* UserClaim */], as: 'claims' }, { model: __WEBPACK_IMPORTED_MODULE_2__data_models__["e" /* UserProfile */], as: 'profile' }]
            });
            done(null, {
              id: user.id,
              email: user.email
            });
          }
        }
      }
    });

    return function fooBar() {
      return _ref.apply(this, arguments);
    };
  })();

  fooBar().catch(done);
}));

/* unused harmony default export */ var _unused_webpack_default_export = (__WEBPACK_IMPORTED_MODULE_0_passport___default.a);

/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createRootReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_redux__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__session__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__runtime__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_redux_form__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_redux_form___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_redux_form__);







function createRootReducer({ apolloClient }) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
    apollo: apolloClient.reducer(),
    runtime: __WEBPACK_IMPORTED_MODULE_4__runtime__["a" /* default */],
    user: __WEBPACK_IMPORTED_MODULE_2__user__["a" /* default */],
    session: __WEBPACK_IMPORTED_MODULE_3__session__["a" /* default */],
    routing: __WEBPACK_IMPORTED_MODULE_1_react_router_redux__["routerReducer"],
    form: __WEBPACK_IMPORTED_MODULE_5_redux_form__["reducer"]
  });
}

/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = runtime;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(19);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function runtime(state = {}, action) {
  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* SET_RUNTIME_VARIABLE */]:
      return _extends({}, state, {
        [action.payload.name]: action.payload.value
      });
    default:
      return state;
  }
}

/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = session;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_redux__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_router_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jwt_decode__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jwt_decode__);





const initialState = {
    token: null,
    userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};

function session(state = initialState, action) {
    switch (action.type) {
        case __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* ACTION_TYPES */].LOGIN_USER_REQUEST:
            return Object.assign({}, state, {
                'isAuthenticating': true,
                'statusText': null
            });
        case __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* ACTION_TYPES */].LOGIN_USER_SUCCESS:
            return Object.assign({}, state, {
                'isAuthenticating': false,
                'isAuthenticated': true,
                'statusText': null
            });
        case __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* ACTION_TYPES */].LOGIN_USER_FAILURE:
            return Object.assign({}, state, {
                'isAuthenticating': false,
                'isAuthenticated': false,
                'token': null,
                'userName': null,
                'statusText': `Authentication Error: ${action.payload.status} ${action.payload.statusText}`
            });
        case __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* ACTION_TYPES */].LOGOUT_USER:
            return Object.assign({}, state, {
                'isAuthenticated': false,
                'token': null,
                'userName': null,
                'statusText': 'You have been successfully logged out.'
            });
        default:
            return state;
    }
}

/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = user;
function user(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_universal_router__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_universal_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_universal_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__routes__ = __webpack_require__(126);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_0_universal_router___default.a(__WEBPACK_IMPORTED_MODULE_1__routes__["a" /* default */]));

/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Layout__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Page__ = __webpack_require__(36);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/routes/about/index.js';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





/* harmony default export */ __webpack_exports__["default"] = ({

  path: '/about',

  action() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const data = yield new Promise(function(resolve) { resolve(); }).then((function (require) {
        return __webpack_require__(176);
      }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);

      return {
        title: data.title,
        chunk: 'about',
        component: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_1__components_Layout__["a" /* default */],
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 24
            },
            __self: _this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_Page__["a" /* default */], _extends({}, data, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 24
            },
            __self: _this
          }))
        )
      };
    })();
  }

});

/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Admin_css__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Admin_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Admin_css__);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/routes/admin/Admin.js';
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */






class Admin extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_3__Admin_css___default.a.root, __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_3__Admin_css___default.a.container, __source: {
            fileName: _jsxFileName,
            lineNumber: 23
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h1',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 24
            },
            __self: this
          },
          this.props.title
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 25
            },
            __self: this
          },
          '...'
        )
      )
    );
  }
}

Admin.propTypes = {
  title: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Admin_css___default.a)(Admin));

/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Layout__ = __webpack_require__(5);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/routes/admin/index.js';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




const title = 'Admin Page';
const isAdmin = false;

/* harmony default export */ __webpack_exports__["default"] = ({

  path: '/admin',

  action() {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (!isAdmin) {
        return { redirect: '/login' };
      }

      const Admin = yield new Promise(function(resolve) { resolve(); }).then((function (require) {
        return __webpack_require__(115).default;
      }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);

      return {
        title,
        chunk: 'admin',
        component: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_1__components_Layout__["a" /* default */],
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 30
            },
            __self: _this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Admin, { title: title, __source: {
              fileName: _jsxFileName,
              lineNumber: 30
            },
            __self: _this
          })
        )
      };
    })();
  }

});

/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Contact_css__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Contact_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Contact_css__);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/routes/contact/Contact.js';
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */






class Contact extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_3__Contact_css___default.a.root, __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_3__Contact_css___default.a.container, __source: {
            fileName: _jsxFileName,
            lineNumber: 23
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h1',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 24
            },
            __self: this
          },
          this.props.title
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 25
            },
            __self: this
          },
          '...'
        )
      )
    );
  }
}

Contact.propTypes = {
  title: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Contact_css___default.a)(Contact));

/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Layout__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Contact__ = __webpack_require__(117);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/routes/contact/index.js';
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





const title = 'Contact Us';

/* harmony default export */ __webpack_exports__["default"] = ({

  path: '/contact',

  action() {
    return {
      title,
      component: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1__components_Layout__["a" /* default */],
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 23
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Contact__["a" /* default */], { title: title, __source: {
            fileName: _jsxFileName,
            lineNumber: 23
          },
          __self: this
        })
      )
    };
  }

});

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_apollo__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_apollo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_apollo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/routes/conversation/Conversation.js';
/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of convospot-console. The codes can not be copied and/or distributed without permission
 *
 * @Author: homer
 * @Email: homer@convospot.io
 * @Date:   2017-11-05 19:34:16
 * @Last Modified by:   homer
 * @Last Modified time: 2017-11-05 19:36:11
 */





class Conversation extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: '/mocks/conversation.png', __source: {
        fileName: _jsxFileName,
        lineNumber: 20
      },
      __self: this
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_apollo__["compose"])()(Conversation));

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Conversation__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Layout__ = __webpack_require__(5);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/routes/conversation/index.js';
/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of convospot-console. The codes can not be copied and/or distributed without permission
 *
 * @Author: homer
 * @Email: homer@convospot.io
 * @Date:   2017-11-05 19:36:24
 * @Last Modified by:   homer
 * @Last Modified time: 2017-11-05 19:39:09
 */




/* harmony default export */ __webpack_exports__["default"] = ({

  path: '/conversation',

  action() {
    return {
      title: 'conversation',
      component: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2__components_Layout__["a" /* default */],
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 23
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__Conversation__["a" /* default */], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 23
          },
          __self: this
        })
      )
    };
  }

});

/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_apollo__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_apollo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_apollo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/routes/conversations/Conversations.js';





class Conversations extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'a',
      { href: '/conversation', __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: '/mocks/conversations.png', __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        },
        __self: this
      })
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_apollo__["compose"])()(Conversations));

/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Conversations__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Layout__ = __webpack_require__(5);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/routes/conversations/index.js';




/* harmony default export */ __webpack_exports__["default"] = ({

  path: '/conversations',

  action() {
    return {
      title: 'Live conversations',
      component: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2__components_Layout__["a" /* default */],
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 12
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__Conversations__["a" /* default */], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 12
          },
          __self: this
        })
      )
    };
  }

});

/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ErrorPage_css__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ErrorPage_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__ErrorPage_css__);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/routes/error/ErrorPage.js';
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */






class ErrorPage extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  render() {
    if (true) {
      const { error } = this.props;
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 28
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h1',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 29
            },
            __self: this
          },
          error.name
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 30
            },
            __self: this
          },
          error.message
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'pre',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 31
            },
            __self: this
          },
          error.stack
        )
      );
    }

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 37
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'h1',
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 38
          },
          __self: this
        },
        'Error'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'p',
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 39
          },
          __self: this
        },
        'Sorry, a critical error occurred on this page.'
      )
    );
  }
}

ErrorPage.propTypes = {
  error: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    name: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
    message: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
    stack: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
  }).isRequired
};

/* unused harmony default export */ var _unused_webpack_default_export = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__ErrorPage_css___default.a)(ErrorPage));

/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_apollo__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_apollo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_apollo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_page_layout__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_page_layout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_page_layout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Home_css__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Home_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__Home_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_Layout_grids__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_Title_Title__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_Dashboard_Dashboard__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_Timeline_Timeline__ = __webpack_require__(92);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/routes/home/Home.js';
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */












class Home extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_4_react_page_layout__["LayoutProvider"],
      { layouts: __WEBPACK_IMPORTED_MODULE_6__components_Layout_grids__["a" /* default */], __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_4_react_page_layout__["Page"],
        { layout: 'grid-one-two', __source: {
            fileName: _jsxFileName,
            lineNumber: 25
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_4_react_page_layout__["Section"],
          { slot: 'top', __source: {
              fileName: _jsxFileName,
              lineNumber: 26
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__components_Title_Title__["a" /* default */], {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 27
            },
            __self: this
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_4_react_page_layout__["Section"],
          { slot: 'main', __source: {
              fileName: _jsxFileName,
              lineNumber: 29
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__components_Dashboard_Dashboard__["a" /* default */], {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 30
            },
            __self: this
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_4_react_page_layout__["Section"],
          { slot: 'right', __source: {
              fileName: _jsxFileName,
              lineNumber: 32
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__components_Timeline_Timeline__["a" /* default */], {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 33
            },
            __self: this
          })
        )
      )
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_apollo__["compose"])(__WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_5__Home_css___default.a))(Home));

/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Home__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Layout__ = __webpack_require__(5);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/routes/home/index.js';
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





/* harmony default export */ __webpack_exports__["default"] = ({

  path: '/',

  action() {
    return {
      title: 'convospot dashboard',
      component: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2__components_Layout__["a" /* default */],
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 21
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__Home__["a" /* default */], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 21
          },
          __self: this
        })
      )
    };
  }

});

/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* eslint-disable global-require */

// The top-level (parent) route
/* harmony default export */ __webpack_exports__["a"] = ({

  path: '/',

  action({ next }) {
    return _asyncToGenerator(function* () {
      console.log('middleware: start');
      const child = yield next();
      console.log('middleware: end');
      return child;
    })();
  },

  // Keep in mind, routes are evaluated in order
  children: [__webpack_require__(125).default, __webpack_require__(122).default, __webpack_require__(120).default, __webpack_require__(128).default, __webpack_require__(118).default, __webpack_require__(129).default, __webpack_require__(134).default, __webpack_require__(114).default, __webpack_require__(132).default, __webpack_require__(116).default,

  // Wildcard routes, e.g. { path: '*', ... } (must go last)
  __webpack_require__(131).default],

  action({ next }) {
    return _asyncToGenerator(function* () {
      // Execute each child route until one of them return the result
      const route = yield next();

      // Provide default values for title, description etc.
      route.title = `${route.title || 'Untitled Page'}`;
      route.description = route.description || '';

      return route;
    })();
  }

});

/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_apollo__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_apollo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_apollo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_material_ui_styles_MuiThemeProvider__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_material_ui_styles_MuiThemeProvider___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_material_ui_styles_MuiThemeProvider__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_material_ui_FlatButton__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_material_ui_FlatButton___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_material_ui_FlatButton__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Knowledge_css__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Knowledge_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__Knowledge_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__api_Knowledge__ = __webpack_require__(80);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/routes/knowledge/Knowledge.js';
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */










class Knowledge extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  constructor(props) {
    super(props);
    this.state = { knowledge: '' };
    __WEBPACK_IMPORTED_MODULE_7__api_Knowledge__["a" /* default */].get().then(resp => {
      this.setState({ knowledge: resp.text });
      document.getElementById("demoKB").value = resp.text;
    });
    this.onSave = this.onSave.bind(this);
    this.onChange = this.onSave.bind(this);
  }

  onChange(event) {
    const text = event.target.value;
    return this.setState({ knowledge: text });
  }

  onSave(event) {
    event.preventDefault();
    __WEBPACK_IMPORTED_MODULE_7__api_Knowledge__["a" /* default */].set(document.getElementById("demoKB").value);
  }

  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_3_material_ui_styles_MuiThemeProvider___default.a,
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 47
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('textarea', { id: 'demoKB', 'class': 'knowledge', defaultValue: this.state.knowledge, __source: {
            fileName: _jsxFileName,
            lineNumber: 48
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_material_ui_FlatButton___default.a, { label: 'Change', fullWidth: true, onClick: this.onSave, __source: {
            fileName: _jsxFileName,
            lineNumber: 49
          },
          __self: this
        })
      )
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_apollo__["compose"])(__WEBPACK_IMPORTED_MODULE_5_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_6__Knowledge_css___default.a))(Knowledge));

/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Knowledge__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Layout__ = __webpack_require__(5);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/routes/knowledge/index.js';
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





/* harmony default export */ __webpack_exports__["default"] = ({

  path: '/knowledge',

  action() {
    return {
      title: 'Knowledge',
      component: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2__components_Layout__["a" /* default */],
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 22
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__Knowledge__["a" /* default */], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 22
          },
          __self: this
        })
      )
    };
  }

});

/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Layout__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_login_Login__ = __webpack_require__(138);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/routes/login/index.js';
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





const title = 'Log In';

/* harmony default export */ __webpack_exports__["default"] = ({

  path: '/login',

  action() {
    return {
      title,
      component: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1__components_Layout__["a" /* default */],
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 24
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__views_login_Login__["a" /* default */], { title: title, __source: {
            fileName: _jsxFileName,
            lineNumber: 24
          },
          __self: this
        })
      )
    };
  }

});

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__NotFound_css__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__NotFound_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__NotFound_css__);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/routes/notFound/NotFound.js';
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */






class NotFound extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_3__NotFound_css___default.a.root, __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_3__NotFound_css___default.a.container, __source: {
            fileName: _jsxFileName,
            lineNumber: 23
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h1',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 24
            },
            __self: this
          },
          this.props.title
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 25
            },
            __self: this
          },
          'Sorry, the page you were trying to view does not exist.'
        )
      )
    );
  }
}

NotFound.propTypes = {
  title: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__NotFound_css___default.a)(NotFound));

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Layout__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__NotFound__ = __webpack_require__(130);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/routes/notFound/index.js';
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





const title = 'Page Not Found';

/* harmony default export */ __webpack_exports__["default"] = ({

  path: '*',

  action() {
    return {
      title,
      component: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1__components_Layout__["a" /* default */],
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 23
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__NotFound__["a" /* default */], { title: title, __source: {
            fileName: _jsxFileName,
            lineNumber: 23
          },
          __self: this
        })
      ),
      status: 404
    };
  }

});

/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Layout__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Page__ = __webpack_require__(36);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/routes/privacy/index.js';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





/* harmony default export */ __webpack_exports__["default"] = ({

  path: '/privacy',

  action() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const data = yield new Promise(function(resolve) { resolve(); }).then((function (require) {
        return __webpack_require__(177);
      }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);

      return {
        title: data.title,
        chunk: 'privacy',
        component: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_1__components_Layout__["a" /* default */],
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 24
            },
            __self: _this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_Page__["a" /* default */], _extends({}, data, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 24
            },
            __self: _this
          }))
        )
      };
    })();
  }

});

/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Register_css__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Register_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Register_css__);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/routes/register/Register.js';
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */






class Register extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_3__Register_css___default.a.root, __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: __WEBPACK_IMPORTED_MODULE_3__Register_css___default.a.container, __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        },
        __self: this
      })
    );
  }
}

Register.propTypes = {
  title: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Register_css___default.a)(Register));

/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Layout__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Register__ = __webpack_require__(133);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/routes/register/index.js';
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





const title = 'New User Registration';

/* harmony default export */ __webpack_exports__["default"] = ({

  path: '/register',

  action() {
    return {
      title,
      component: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1__components_Layout__["a" /* default */],
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 23
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Register__["a" /* default */], { title: title, __source: {
            fileName: _jsxFileName,
            lineNumber: 23
          },
          __self: this
        })
      )
    };
  }

});

/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = configureStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reducers__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__createHelpers__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logger__ = __webpack_require__(137);






function configureStore(initialState, config) {
  const helpers = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__createHelpers__["a" /* default */])(config);
  const { apolloClient } = config;

  const middleware = [__WEBPACK_IMPORTED_MODULE_1_redux_thunk___default.a.withExtraArgument(helpers), apolloClient.middleware()];

  let enhancer;

  if (true) {
    middleware.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__logger__["a" /* default */])());

    // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
    let devToolsExtension = f => f;
    if (false) {
      devToolsExtension = window.devToolsExtension();
    }

    enhancer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["applyMiddleware"])(...middleware), devToolsExtension);
  } else {
    enhancer = applyMiddleware(...middleware);
  }

  const rootReducer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__reducers__["a" /* default */])({
    apolloClient
  });

  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  const store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"])(rootReducer, initialState, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (false) {
    module.hot.accept('../reducers', () =>
    // eslint-disable-next-line global-require
    store.replaceReducer(require('../reducers').default));
  }

  return store;
}

/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createHelpers;
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const graphqlRequestDeprecatedMessage = `\`graphqlRequest\` has been deprecated.
You should use Apollo: \`client.query({ query, variables...})\` or \`client.mutate()\`
Don't forget to enclose your query to gql\`…\` tag or import *.graphql file.
See docs at http://dev.apollodata.com/core/apollo-client-api.html#ApolloClient\\.query`;

function createGraphqlRequest(apolloClient) {
  return (() => {
    var _ref = _asyncToGenerator(function* (queryOrString, variables, options = {}) {
      if (true) {
        // eslint-disable-next-line no-console
        console.error(graphqlRequestDeprecatedMessage);
      }

      const { skipCache } = options;
      let query = queryOrString;
      if (typeof queryOrString === 'string') {
        const gql = yield new Promise(function(resolve) { resolve(); }).then((function (require) {
          return __webpack_require__(193);
        }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
        query = gql([queryOrString]);
      }

      if (skipCache) {
        return apolloClient.networkInterface.query({ query, variables });
      }

      let isMutation = false;
      if (query.definitions) {
        isMutation = query.definitions.some(function (definition) {
          return definition && definition.operation === 'mutation';
        });
      }
      if (isMutation) {
        return apolloClient.mutate({ mutation: query, variables });
      }
      return apolloClient.query({ query, variables });
    });

    function graphqlRequest(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return graphqlRequest;
  })();
}

function createHelpers({ apolloClient, fetch, history }) {
  return {
    client: apolloClient,
    history,
    fetch,
    // @deprecated('Use `client` instead')
    apolloClient,
    // @deprecated('Use `client.query()` or `client.mutate()` instead')
    graphqlRequest: createGraphqlRequest(fetch)
  };
}

/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createLogger;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_util__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_util__);


function inspectObject(object) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_util__["inspect"])(object, {
    colors: true
  });
}

function singleLine(str) {
  return str.replace(/\s+/g, ' ');
}

const actionFormatters = {
  // This is used at feature/apollo branch, but it can help you when implementing Apollo
  APOLLO_QUERY_INIT: a => `queryId:${a.queryId} variables:${inspectObject(a.variables)}\n   ${singleLine(a.queryString)}`,

  APOLLO_QUERY_RESULT: a => `queryId:${a.queryId}\n   ${singleLine(inspectObject(a.result))}`,

  APOLLO_QUERY_STOP: a => `queryId:${a.queryId}`
};

// Server side redux action logger
function createLogger() {
  // eslint-disable-next-line no-unused-vars
  return store => next => action => {
    let formattedPayload = '';
    const actionFormatter = actionFormatters[action.type];
    if (typeof actionFormatter === 'function') {
      formattedPayload = actionFormatter(action);
    } else if (action.toString !== Object.prototype.toString) {
      formattedPayload = action.toString();
    } else if (typeof action.payload !== 'undefined') {
      formattedPayload = inspectObject(action.payload);
    } else {
      formattedPayload = inspectObject(action);
    }

    console.log(` * ${action.type}: ${formattedPayload}`); // eslint-disable-line no-console
    return next(action);
  };
}

/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Login_css__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Login_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Login_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_material_ui_TextField__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_material_ui_TextField___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_material_ui_TextField__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_material_ui_RaisedButton__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_material_ui_RaisedButton___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_material_ui_RaisedButton__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_material_ui_styles_MuiThemeProvider__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_material_ui_styles_MuiThemeProvider___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_material_ui_styles_MuiThemeProvider__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_redux__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_redux__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__actions_session__ = __webpack_require__(79);
var _jsxFileName = '/Users/homer/Projects/convospot-console/src/frontend/views/login/Login.js';











class Login extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  constructor(props) {
    super(props);
    this.state = { credentials: { email: '', password: '' } };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    return this.setState({ credentials });
  }

  onSave(event) {
    event.preventDefault();
    this.props.actions.loginUser(this.state.credentials);
  }

  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_6_material_ui_styles_MuiThemeProvider___default.a,
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_3__Login_css___default.a.root, __source: {
            fileName: _jsxFileName,
            lineNumber: 39
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: __WEBPACK_IMPORTED_MODULE_3__Login_css___default.a.container, __source: {
              fileName: _jsxFileName,
              lineNumber: 40
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h1',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 41
              },
              __self: this
            },
            this.props.title
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'p',
            { className: __WEBPACK_IMPORTED_MODULE_3__Login_css___default.a.lead, __source: {
                fileName: _jsxFileName,
                lineNumber: 42
              },
              __self: this
            },
            'to continue to convospot'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'form',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 43
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: __WEBPACK_IMPORTED_MODULE_3__Login_css___default.a.formGroup, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 44
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_material_ui_TextField___default.a, {
                hintText: 'Username or email',
                type: 'text',
                name: 'email',
                autoFocus: true,
                value: this.state.credentials.email,
                onChange: this.onChange,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 45
                },
                __self: this
              })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: __WEBPACK_IMPORTED_MODULE_3__Login_css___default.a.formGroup, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 54
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_material_ui_TextField___default.a, {
                hintText: 'Password',
                type: 'password',
                name: 'password',
                value: this.state.credentials.password,
                onChange: this.onChange,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 55
                },
                __self: this
              })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: __WEBPACK_IMPORTED_MODULE_3__Login_css___default.a.formGroup, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 63
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_material_ui_RaisedButton___default.a, { label: 'Login', primary: true, type: 'submit', onClick: this.onSave, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 64
                },
                __self: this
              })
            )
          )
        )
      )
    );
  }
}

Login.propTypes = {
  title: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
};
function mapDispatchToProps(dispatch) {
  return {
    actions: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7_redux__["bindActionCreators"])(__WEBPACK_IMPORTED_MODULE_9__actions_session__, dispatch)
  };
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__Login_css___default.a)(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_react_redux__["connect"])(null, mapDispatchToProps)(Login)));

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n  /*\n   * Sidebar\n   * ======================================================================== */\n}\n\n.Feedback-root-2_u4B {\n  background: #f5f5f5;\n  color: #333;\n}\n\n.Feedback-container-31uWI {\n  margin: 0 auto;\n  padding: 20px 8px;\n  max-width: 1000px;\n  text-align: center;\n  font-size: 1.5em; /* ~24px */\n}\n\n.Feedback-link-19J3Z,\n.Feedback-link-19J3Z:active,\n.Feedback-link-19J3Z:hover,\n.Feedback-link-19J3Z:visited {\n  color: #333;\n  text-decoration: none;\n}\n\n.Feedback-link-19J3Z:hover {\n  text-decoration: underline;\n}\n\n.Feedback-spacer-3JgKt {\n  padding-right: 15px;\n  padding-left: 15px;\n}\n", "", {"version":3,"sources":["/Users/homer/Projects/convospot-console/src/frontend/components/Feedback/Feedback.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAE9E;;gFAE8E;;EAE9E;;gFAE8E,EAAE,gCAAgC,EAAE,2BAA2B,EAAE,6BAA6B,CAAC,iCAAiC;;EAE9M;;gFAE8E;CAC/E;;AAED;EACE,oBAAoB;EACpB,YAAY;CACb;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAAkB;EAClB,mBAAmB;EACnB,iBAAiB,CAAC,WAAW;CAC9B;;AAED;;;;EAIE,YAAY;EACZ,sBAAsB;CACvB;;AAED;EACE,2BAA2B;CAC5B;;AAED;EACE,oBAAoB;EACpB,mBAAmB;CACpB","file":"Feedback.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n  /*\n   * Sidebar\n   * ======================================================================== */\n}\n\n.root {\n  background: #f5f5f5;\n  color: #333;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 20px 8px;\n  max-width: 1000px;\n  text-align: center;\n  font-size: 1.5em; /* ~24px */\n}\n\n.link,\n.link:active,\n.link:hover,\n.link:visited {\n  color: #333;\n  text-decoration: none;\n}\n\n.link:hover {\n  text-decoration: underline;\n}\n\n.spacer {\n  padding-right: 15px;\n  padding-left: 15px;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Feedback-root-2_u4B",
	"container": "Feedback-container-31uWI",
	"link": "Feedback-link-19J3Z",
	"spacer": "Feedback-spacer-3JgKt"
};

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n  /*\n   * Sidebar\n   * ======================================================================== */\n}\n\n.Footer-root-2eHRz {\n  background: #333;\n  color: #fff;\n}\n\n.Footer-container-1mTbK {\n  margin: 0 auto;\n  padding: 20px 15px;\n  max-width: 1000px;\n  text-align: center;\n}\n\n.Footer-text-3UKYf {\n  color: rgba(255, 255, 255, 0.5);\n}\n\n.Footer-spacer-2y5WS {\n  color: rgba(255, 255, 255, 0.3);\n}\n\n.Footer-text-3UKYf,\n.Footer-link-3JlGy {\n  padding: 2px 5px;\n  font-size: 1em;\n}\n\n.Footer-link-3JlGy,\n.Footer-link-3JlGy:active,\n.Footer-link-3JlGy:visited {\n  color: rgba(255, 255, 255, 0.6);\n  text-decoration: none;\n}\n\n.Footer-link-3JlGy:hover {\n  color: rgba(255, 255, 255, 1);\n}\n", "", {"version":3,"sources":["/Users/homer/Projects/convospot-console/src/frontend/components/Footer/Footer.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAE9E;;gFAE8E;;EAE9E;;gFAE8E,EAAE,gCAAgC,EAAE,2BAA2B,EAAE,6BAA6B,CAAC,iCAAiC;;EAE9M;;gFAE8E;CAC/E;;AAED;EACE,iBAAiB;EACjB,YAAY;CACb;;AAED;EACE,eAAe;EACf,mBAAmB;EACnB,kBAAkB;EAClB,mBAAmB;CACpB;;AAED;EACE,gCAAgC;CACjC;;AAED;EACE,gCAAgC;CACjC;;AAED;;EAEE,iBAAiB;EACjB,eAAe;CAChB;;AAED;;;EAGE,gCAAgC;EAChC,sBAAsB;CACvB;;AAED;EACE,8BAA8B;CAC/B","file":"Footer.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n  /*\n   * Sidebar\n   * ======================================================================== */\n}\n\n.root {\n  background: #333;\n  color: #fff;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 20px 15px;\n  max-width: 1000px;\n  text-align: center;\n}\n\n.text {\n  color: rgba(255, 255, 255, 0.5);\n}\n\n.spacer {\n  color: rgba(255, 255, 255, 0.3);\n}\n\n.text,\n.link {\n  padding: 2px 5px;\n  font-size: 1em;\n}\n\n.link,\n.link:active,\n.link:visited {\n  color: rgba(255, 255, 255, 0.6);\n  text-decoration: none;\n}\n\n.link:hover {\n  color: rgba(255, 255, 255, 1);\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Footer-root-2eHRz",
	"container": "Footer-container-1mTbK",
	"text": "Footer-text-3UKYf",
	"spacer": "Footer-spacer-2y5WS",
	"link": "Footer-link-3JlGy"
};

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n  /*\n   * Sidebar\n   * ======================================================================== */\n}\n\n.Header-root-2ulfR {\n  background: #373277;\n  color: #fff;\n}\n\n.Header-container-3Knvw {\n  margin: 0 auto;\n  padding: 20px 0;\n  max-width: 1000px;\n}\n\n.Header-brand-HQhzh {\n  color: rgb(146, 229, 252);\n  text-decoration: none;\n  font-size: 1.75em; /* ~28px */\n}\n\n.Header-brandTxt-Tgp0C {\n  margin-left: 10px;\n}\n\n.Header-banner-32G7P {\n  text-align: center;\n}\n\n.Header-bannerTitle-2e0xy {\n  margin: 0;\n  padding: 10px;\n  font-weight: normal;\n  font-size: 4em;\n  line-height: 1em;\n}\n\n.Header-bannerDesc-3Y-53 {\n  padding: 0;\n  color: rgba(255, 255, 255, 0.5);\n  font-size: 1.25em;\n  margin: 0;\n}\n", "", {"version":3,"sources":["/Users/homer/Projects/convospot-console/src/frontend/components/Header/Header.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAE9E;;gFAE8E;;EAE9E;;gFAE8E,EAAE,gCAAgC,EAAE,2BAA2B,EAAE,6BAA6B,CAAC,iCAAiC;;EAE9M;;gFAE8E;CAC/E;;AAED;EACE,oBAAoB;EACpB,YAAY;CACb;;AAED;EACE,eAAe;EACf,gBAAgB;EAChB,kBAAkB;CACnB;;AAED;EACE,0BAA0B;EAC1B,sBAAsB;EACtB,kBAAkB,CAAC,WAAW;CAC/B;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,mBAAmB;CACpB;;AAED;EACE,UAAU;EACV,cAAc;EACd,oBAAoB;EACpB,eAAe;EACf,iBAAiB;CAClB;;AAED;EACE,WAAW;EACX,gCAAgC;EAChC,kBAAkB;EAClB,UAAU;CACX","file":"Header.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n  /*\n   * Sidebar\n   * ======================================================================== */\n}\n\n.root {\n  background: #373277;\n  color: #fff;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 20px 0;\n  max-width: 1000px;\n}\n\n.brand {\n  color: rgb(146, 229, 252);\n  text-decoration: none;\n  font-size: 1.75em; /* ~28px */\n}\n\n.brandTxt {\n  margin-left: 10px;\n}\n\n.banner {\n  text-align: center;\n}\n\n.bannerTitle {\n  margin: 0;\n  padding: 10px;\n  font-weight: normal;\n  font-size: 4em;\n  line-height: 1em;\n}\n\n.bannerDesc {\n  padding: 0;\n  color: rgba(255, 255, 255, 0.5);\n  font-size: 1.25em;\n  margin: 0;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Header-root-2ulfR",
	"container": "Header-container-3Knvw",
	"brand": "Header-brand-HQhzh",
	"brandTxt": "Header-brandTxt-Tgp0C",
	"banner": "Header-banner-32G7P",
	"bannerTitle": "Header-bannerTitle-2e0xy",
	"bannerDesc": "Header-bannerDesc-3Y-53"
};

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "/*\n* @Author: homer\n* @Date:   2017-11-05 10:52:06\n* @Last Modified by:   homer\n* @Last Modified time: 2017-11-05 10:52:06\n*/\n", "", {"version":3,"sources":["/Users/homer/Projects/convospot-console/src/frontend/components/Layout/GridOneOne.css"],"names":[],"mappings":"AAAA;;;;;EAKE","file":"GridOneOne.css","sourcesContent":["/*\n* @Author: homer\n* @Date:   2017-11-05 10:52:06\n* @Last Modified by:   homer\n* @Last Modified time: 2017-11-05 10:52:06\n*/\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "/*\n* @Author: homer\n* @Date:   2017-11-05 13:46:52\n* @Last Modified by:   homer\n* @Last Modified time: 2017-11-05 13:46:52\n*/\n", "", {"version":3,"sources":["/Users/homer/Projects/convospot-console/src/frontend/components/Layout/GridOneTwo.css"],"names":[],"mappings":"AAAA;;;;;EAKE","file":"GridOneTwo.css","sourcesContent":["/*\n* @Author: homer\n* @Date:   2017-11-05 13:46:52\n* @Last Modified by:   homer\n* @Last Modified time: 2017-11-05 13:46:52\n*/\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n  /*\n   * Sidebar\n   * ======================================================================== */\n}\n\n/*\n * normalize.css is imported in JS file.\n * If you import external CSS file from your internal CSS\n * then it will be inlined and processed with CSS modules.\n */\n\n/*\n * Base styles\n * ========================================================================== */\n\nhtml {\n  color: #222;\n  font-weight: 100;\n  font-size: 1em; /* ~16px; */\n  font-family: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n  line-height: 1.375; /* ~22px */\n}\n\nbody {\n  margin: 0;\n}\n\na {\n  color: #0074c2;\n}\n\n/*\n * Remove text-shadow in selection highlight:\n * https://twitter.com/miketaylr/status/12228805301\n *\n * These selection rule sets have to be separate.\n * Customize the background color to match your design.\n */\n\n::-moz-selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n::selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n/*\n * A better looking default horizontal rule\n */\n\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #ccc;\n  margin: 1em 0;\n  padding: 0;\n}\n\n/*\n * Remove the gap between audio, canvas, iframes,\n * images, videos and the bottom of their containers:\n * https://github.com/h5bp/html5-boilerplate/issues/440\n */\n\naudio,\ncanvas,\niframe,\nimg,\nsvg,\nvideo {\n  vertical-align: middle;\n}\n\n/*\n * Remove default fieldset styles.\n */\n\nfieldset {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n\n/*\n * Allow only vertical resizing of textareas.\n */\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n * Browser upgrade prompt\n * ========================================================================== */\n\n.browserupgrade {\n  margin: 0.2em 0;\n  background: #ccc;\n  color: #000;\n  padding: 0.2em 0;\n}\n\n/*\n * Print styles\n * Inlined to avoid the additional HTTP request:\n * http://www.phpied.com/delay-loading-your-print-css/\n * ========================================================================== */\n\n@media print {\n  *,\n  *::before,\n  *::after {\n    background: transparent !important;\n    color: #000 !important; /* Black prints faster: http://www.sanbeiji.com/archives/953 */\n    -webkit-box-shadow: none !important;\n            box-shadow: none !important;\n    text-shadow: none !important;\n  }\n\n  a,\n  a:visited {\n    text-decoration: underline;\n  }\n\n  a[href]::after {\n    content: ' (' attr(href) ')';\n  }\n\n  abbr[title]::after {\n    content: ' (' attr(title) ')';\n  }\n\n  /*\n   * Don't show links that are fragment identifiers,\n   * or use the `javascript:` pseudo protocol\n   */\n\n  a[href^='#']::after,\n  a[href^='javascript:']::after {\n    content: '';\n  }\n\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid;\n  }\n\n  /*\n   * Printing Tables:\n   * http://css-discuss.incutio.com/wiki/Printing_Tables\n   */\n\n  thead {\n    display: table-header-group;\n  }\n\n  tr,\n  img {\n    page-break-inside: avoid;\n  }\n\n  img {\n    max-width: 100% !important;\n  }\n\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3;\n  }\n\n  h2,\n  h3 {\n    page-break-after: avoid;\n  }\n}\n", "", {"version":3,"sources":["/Users/homer/Projects/convospot-console/src/frontend/components/Layout/Layout.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAE9E;;gFAE8E;;EAE9E;;gFAE8E,EAAE,gCAAgC,EAAE,2BAA2B,EAAE,6BAA6B,CAAC,iCAAiC;;EAE9M;;gFAE8E;CAC/E;;AAED;;;;GAIG;;AAEH;;gFAEgF;;AAEhF;EACE,YAAY;EACZ,iBAAiB;EACjB,eAAe,CAAC,YAAY;EAC5B,2DAA2D;EAC3D,mBAAmB,CAAC,WAAW;CAChC;;AAED;EACE,UAAU;CACX;;AAED;EACE,eAAe;CAChB;;AAED;;;;;;GAMG;;AAEH;EACE,oBAAoB;EACpB,kBAAkB;CACnB;;AAED;EACE,oBAAoB;EACpB,kBAAkB;CACnB;;AAED;;GAEG;;AAEH;EACE,eAAe;EACf,YAAY;EACZ,UAAU;EACV,2BAA2B;EAC3B,cAAc;EACd,WAAW;CACZ;;AAED;;;;GAIG;;AAEH;;;;;;EAME,uBAAuB;CACxB;;AAED;;GAEG;;AAEH;EACE,UAAU;EACV,UAAU;EACV,WAAW;CACZ;;AAED;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;;gFAEgF;;AAEhF;EACE,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;EACZ,iBAAiB;CAClB;;AAED;;;;gFAIgF;;AAEhF;EACE;;;IAGE,mCAAmC;IACnC,uBAAuB,CAAC,+DAA+D;IACvF,oCAAoC;YAC5B,4BAA4B;IACpC,6BAA6B;GAC9B;;EAED;;IAEE,2BAA2B;GAC5B;;EAED;IACE,6BAA6B;GAC9B;;EAED;IACE,8BAA8B;GAC/B;;EAED;;;KAGG;;EAEH;;IAEE,YAAY;GACb;;EAED;;IAEE,uBAAuB;IACvB,yBAAyB;GAC1B;;EAED;;;KAGG;;EAEH;IACE,4BAA4B;GAC7B;;EAED;;IAEE,yBAAyB;GAC1B;;EAED;IACE,2BAA2B;GAC5B;;EAED;;;IAGE,WAAW;IACX,UAAU;GACX;;EAED;;IAEE,wBAAwB;GACzB;CACF","file":"Layout.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n  /*\n   * Sidebar\n   * ======================================================================== */\n}\n\n/*\n * normalize.css is imported in JS file.\n * If you import external CSS file from your internal CSS\n * then it will be inlined and processed with CSS modules.\n */\n\n/*\n * Base styles\n * ========================================================================== */\n\nhtml {\n  color: #222;\n  font-weight: 100;\n  font-size: 1em; /* ~16px; */\n  font-family: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n  line-height: 1.375; /* ~22px */\n}\n\nbody {\n  margin: 0;\n}\n\na {\n  color: #0074c2;\n}\n\n/*\n * Remove text-shadow in selection highlight:\n * https://twitter.com/miketaylr/status/12228805301\n *\n * These selection rule sets have to be separate.\n * Customize the background color to match your design.\n */\n\n::-moz-selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n::selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n/*\n * A better looking default horizontal rule\n */\n\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #ccc;\n  margin: 1em 0;\n  padding: 0;\n}\n\n/*\n * Remove the gap between audio, canvas, iframes,\n * images, videos and the bottom of their containers:\n * https://github.com/h5bp/html5-boilerplate/issues/440\n */\n\naudio,\ncanvas,\niframe,\nimg,\nsvg,\nvideo {\n  vertical-align: middle;\n}\n\n/*\n * Remove default fieldset styles.\n */\n\nfieldset {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n\n/*\n * Allow only vertical resizing of textareas.\n */\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n * Browser upgrade prompt\n * ========================================================================== */\n\n:global(.browserupgrade) {\n  margin: 0.2em 0;\n  background: #ccc;\n  color: #000;\n  padding: 0.2em 0;\n}\n\n/*\n * Print styles\n * Inlined to avoid the additional HTTP request:\n * http://www.phpied.com/delay-loading-your-print-css/\n * ========================================================================== */\n\n@media print {\n  *,\n  *::before,\n  *::after {\n    background: transparent !important;\n    color: #000 !important; /* Black prints faster: http://www.sanbeiji.com/archives/953 */\n    -webkit-box-shadow: none !important;\n            box-shadow: none !important;\n    text-shadow: none !important;\n  }\n\n  a,\n  a:visited {\n    text-decoration: underline;\n  }\n\n  a[href]::after {\n    content: ' (' attr(href) ')';\n  }\n\n  abbr[title]::after {\n    content: ' (' attr(title) ')';\n  }\n\n  /*\n   * Don't show links that are fragment identifiers,\n   * or use the `javascript:` pseudo protocol\n   */\n\n  a[href^='#']::after,\n  a[href^='javascript:']::after {\n    content: '';\n  }\n\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid;\n  }\n\n  /*\n   * Printing Tables:\n   * http://css-discuss.incutio.com/wiki/Printing_Tables\n   */\n\n  thead {\n    display: table-header-group;\n  }\n\n  tr,\n  img {\n    page-break-inside: avoid;\n  }\n\n  img {\n    max-width: 100% !important;\n  }\n\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3;\n  }\n\n  h2,\n  h3 {\n    page-break-after: avoid;\n  }\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n  /*\n   * Sidebar\n   * ======================================================================== */\n}\n\n.Page-root-36CKk {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Page-container-19dYG {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}\n", "", {"version":3,"sources":["/Users/homer/Projects/convospot-console/src/frontend/components/Page/Page.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAE9E;;gFAE8E;;EAE9E;;gFAE8E,EAAE,gCAAgC,EAAE,2BAA2B,EAAE,6BAA6B,CAAC,iCAAiC;;EAE9M;;gFAE8E;CAC/E;;AAED;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAAkB;CACnB","file":"Page.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n  /*\n   * Sidebar\n   * ======================================================================== */\n}\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Page-root-36CKk",
	"container": "Page-container-19dYG"
};

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n  /*\n   * Sidebar\n   * ======================================================================== */\n}\n\n.Sidebar-root-3TrQe {\n}\n\n.Sidebar-leftMenu-35JS2 {\n\tposition: absolute;\n    top: 0;\n    bottom: 0;\n    width: 80px;\n}\n\n.Sidebar-rightMenu-1L6VO {\n\tmargin-left: 80px;\n}\n\n.Sidebar-fixedButton-1Dem- {\n\tmargin-left: 14px;\n\tmargin-top: 6px;\n\tmargin-bottom: 12px;\n}\n\n.Sidebar-logo-2Qtmo {\n\tmargin-left: 10px;\n\tmargin-top: 10px;\n}\n\n.Sidebar-bottomSection-rLkTF {\n\tposition: absolute;\n\tbottom: 2px;\n}", "", {"version":3,"sources":["/Users/homer/Projects/convospot-console/src/frontend/components/Sidebar/Sidebar.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAE9E;;gFAE8E;;EAE9E;;gFAE8E,EAAE,gCAAgC,EAAE,2BAA2B,EAAE,6BAA6B,CAAC,iCAAiC;;EAE9M;;gFAE8E;CAC/E;;AAED;CACC;;AAED;CACC,mBAAmB;IAChB,OAAO;IACP,UAAU;IACV,YAAY;CACf;;AAED;CACC,kBAAkB;CAClB;;AAED;CACC,kBAAkB;CAClB,gBAAgB;CAChB,oBAAoB;CACpB;;AAED;CACC,kBAAkB;CAClB,iBAAiB;CACjB;;AAED;CACC,mBAAmB;CACnB,YAAY;CACZ","file":"Sidebar.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n  /*\n   * Sidebar\n   * ======================================================================== */\n}\n\n.root {\n}\n\n.leftMenu {\n\tposition: absolute;\n    top: 0;\n    bottom: 0;\n    width: 80px;\n}\n\n.rightMenu {\n\tmargin-left: 80px;\n}\n\n.fixedButton {\n\tmargin-left: 14px;\n\tmargin-top: 6px;\n\tmargin-bottom: 12px;\n}\n\n.logo {\n\tmargin-left: 10px;\n\tmargin-top: 10px;\n}\n\n.bottomSection {\n\tposition: absolute;\n\tbottom: 2px;\n}"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Sidebar-root-3TrQe",
	"leftMenu": "Sidebar-leftMenu-35JS2",
	"rightMenu": "Sidebar-rightMenu-1L6VO",
	"fixedButton": "Sidebar-fixedButton-1Dem-",
	"logo": "Sidebar-logo-2Qtmo",
	"bottomSection": "Sidebar-bottomSection-rLkTF"
};

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n  /*\n   * Sidebar\n   * ======================================================================== */\n}\n\n.Admin-root-2rt2Z {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Admin-container-1B8RM {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}\n", "", {"version":3,"sources":["/Users/homer/Projects/convospot-console/src/frontend/routes/admin/Admin.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAE9E;;gFAE8E;;EAE9E;;gFAE8E,EAAE,gCAAgC,EAAE,2BAA2B,EAAE,6BAA6B,CAAC,iCAAiC;;EAE9M;;gFAE8E;CAC/E;;AAED;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAAkB;CACnB","file":"Admin.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n  /*\n   * Sidebar\n   * ======================================================================== */\n}\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Admin-root-2rt2Z",
	"container": "Admin-container-1B8RM"
};

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n  /*\n   * Sidebar\n   * ======================================================================== */\n}\n\n.Contact-root-2tA2p {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Contact-container-2tVyp {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}\n", "", {"version":3,"sources":["/Users/homer/Projects/convospot-console/src/frontend/routes/contact/Contact.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAE9E;;gFAE8E;;EAE9E;;gFAE8E,EAAE,gCAAgC,EAAE,2BAA2B,EAAE,6BAA6B,CAAC,iCAAiC;;EAE9M;;gFAE8E;CAC/E;;AAED;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAAkB;CACnB","file":"Contact.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n  /*\n   * Sidebar\n   * ======================================================================== */\n}\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Contact-root-2tA2p",
	"container": "Contact-container-2tVyp"
};

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n* {\n  line-height: 1.2;\n  margin: 0;\n}\n\nhtml {\n  color: #888;\n  display: table;\n  font-family: sans-serif;\n  height: 100%;\n  text-align: center;\n  width: 100%;\n}\n\nbody {\n  display: table-cell;\n  vertical-align: middle;\n  padding: 2em;\n}\n\nh1 {\n  color: #555;\n  font-size: 2em;\n  font-weight: 400;\n}\n\np {\n  margin: 0 auto;\n  width: 280px;\n}\n\npre {\n  text-align: left;\n  margin-top: 32px;\n  margin-top: 2rem;\n}\n\n@media only screen and (max-width: 280px) {\n  body,\n  p {\n    width: 95%;\n  }\n\n  h1 {\n    font-size: 1.5em;\n    margin: 0 0 0.3em;\n  }\n}\n", "", {"version":3,"sources":["/Users/homer/Projects/convospot-console/src/frontend/routes/error/ErrorPage.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE,iBAAiB;EACjB,UAAU;CACX;;AAED;EACE,YAAY;EACZ,eAAe;EACf,wBAAwB;EACxB,aAAa;EACb,mBAAmB;EACnB,YAAY;CACb;;AAED;EACE,oBAAoB;EACpB,uBAAuB;EACvB,aAAa;CACd;;AAED;EACE,YAAY;EACZ,eAAe;EACf,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,aAAa;CACd;;AAED;EACE,iBAAiB;EACjB,iBAAiB;EACjB,iBAAiB;CAClB;;AAED;EACE;;IAEE,WAAW;GACZ;;EAED;IACE,iBAAiB;IACjB,kBAAkB;GACnB;CACF","file":"ErrorPage.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n* {\n  line-height: 1.2;\n  margin: 0;\n}\n\nhtml {\n  color: #888;\n  display: table;\n  font-family: sans-serif;\n  height: 100%;\n  text-align: center;\n  width: 100%;\n}\n\nbody {\n  display: table-cell;\n  vertical-align: middle;\n  padding: 2em;\n}\n\nh1 {\n  color: #555;\n  font-size: 2em;\n  font-weight: 400;\n}\n\np {\n  margin: 0 auto;\n  width: 280px;\n}\n\npre {\n  text-align: left;\n  margin-top: 32px;\n  margin-top: 2rem;\n}\n\n@media only screen and (max-width: 280px) {\n  body,\n  p {\n    width: 95%;\n  }\n\n  h1 {\n    font-size: 1.5em;\n    margin: 0 0 0.3em;\n  }\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n  /*\n   * Sidebar\n   * ======================================================================== */\n}\n\n.Home-root-207kY {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Home-container-2JkEM {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}\n\n.Home-newsItem-_Jtu- {\n  margin: 0 0 32px;\n  margin: 0 0 2rem;\n}\n\n.Home-newsTitle-zWAei {\n  font-size: 24px;\n  font-size: 1.5rem;\n}\n\n.Home-newsDesc-3vt7p h1,\n  .Home-newsDesc-3vt7p h2,\n  .Home-newsDesc-3vt7p h3,\n  .Home-newsDesc-3vt7p h4,\n  .Home-newsDesc-3vt7p h5,\n  .Home-newsDesc-3vt7p h6 {\n    font-size: 18px;\n    font-size: 1.125rem;\n  }\n\n.Home-newsDesc-3vt7p pre {\n    white-space: pre-wrap;\n    font-size: 14px;\n    font-size: 0.875rem;\n  }\n\n.Home-newsDesc-3vt7p img {\n    max-width: 100%;\n  }\n", "", {"version":3,"sources":["/Users/homer/Projects/convospot-console/src/frontend/routes/home/Home.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAE9E;;gFAE8E;;EAE9E;;gFAE8E,EAAE,gCAAgC,EAAE,2BAA2B,EAAE,6BAA6B,CAAC,iCAAiC;;EAE9M;;gFAE8E;CAC/E;;AAED;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAAkB;CACnB;;AAED;EACE,iBAAiB;EACjB,iBAAiB;CAClB;;AAED;EACE,gBAAgB;EAChB,kBAAkB;CACnB;;AAED;;;;;;IAMI,gBAAgB;IAChB,oBAAoB;GACrB;;AAEH;IACI,sBAAsB;IACtB,gBAAgB;IAChB,oBAAoB;GACrB;;AAEH;IACI,gBAAgB;GACjB","file":"Home.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n  /*\n   * Sidebar\n   * ======================================================================== */\n}\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}\n\n.newsItem {\n  margin: 0 0 32px;\n  margin: 0 0 2rem;\n}\n\n.newsTitle {\n  font-size: 24px;\n  font-size: 1.5rem;\n}\n\n.newsDesc h1,\n  .newsDesc h2,\n  .newsDesc h3,\n  .newsDesc h4,\n  .newsDesc h5,\n  .newsDesc h6 {\n    font-size: 18px;\n    font-size: 1.125rem;\n  }\n\n.newsDesc pre {\n    white-space: pre-wrap;\n    font-size: 14px;\n    font-size: 0.875rem;\n  }\n\n.newsDesc img {\n    max-width: 100%;\n  }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Home-root-207kY",
	"container": "Home-container-2JkEM",
	"newsItem": "Home-newsItem-_Jtu-",
	"newsTitle": "Home-newsTitle-zWAei",
	"newsDesc": "Home-newsDesc-3vt7p"
};

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n  /*\n   * Sidebar\n   * ======================================================================== */\n}\n\ntextarea {\n\twidth:100%;\n\theight: 800px;\n}", "", {"version":3,"sources":["/Users/homer/Projects/convospot-console/src/frontend/routes/knowledge/Knowledge.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAE9E;;gFAE8E;;EAE9E;;gFAE8E,EAAE,gCAAgC,EAAE,2BAA2B,EAAE,6BAA6B,CAAC,iCAAiC;;EAE9M;;gFAE8E;CAC/E;;AAED;CACC,WAAW;CACX,cAAc;CACd","file":"Knowledge.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n  /*\n   * Sidebar\n   * ======================================================================== */\n}\n\ntextarea {\n\twidth:100%;\n\theight: 800px;\n}"],"sourceRoot":""}]);

// exports


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n  /*\n   * Sidebar\n   * ======================================================================== */\n}\n\n.NotFound-root-1l8Iq {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.NotFound-container-3yI1c {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}\n", "", {"version":3,"sources":["/Users/homer/Projects/convospot-console/src/frontend/routes/notFound/NotFound.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAE9E;;gFAE8E;;EAE9E;;gFAE8E,EAAE,gCAAgC,EAAE,2BAA2B,EAAE,6BAA6B,CAAC,iCAAiC;;EAE9M;;gFAE8E;CAC/E;;AAED;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAAkB;CACnB","file":"NotFound.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n  /*\n   * Sidebar\n   * ======================================================================== */\n}\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "NotFound-root-1l8Iq",
	"container": "NotFound-container-3yI1c"
};

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n  /*\n   * Sidebar\n   * ======================================================================== */\n}\n\n.Register-root-avyVg {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Register-container-stKgJ {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}\n", "", {"version":3,"sources":["/Users/homer/Projects/convospot-console/src/frontend/routes/register/Register.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAE9E;;gFAE8E;;EAE9E;;gFAE8E,EAAE,gCAAgC,EAAE,2BAA2B,EAAE,6BAA6B,CAAC,iCAAiC;;EAE9M;;gFAE8E;CAC/E;;AAED;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAAkB;CACnB","file":"Register.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n  /*\n   * Sidebar\n   * ======================================================================== */\n}\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Register-root-avyVg",
	"container": "Register-container-stKgJ"
};

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n  /*\n   * Sidebar\n   * ======================================================================== */\n}\n.Login-root-rnqjK {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n.Login-container-1BhsQ {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n.Login-lead-2t69x {\n  font-size: 1.25em;\n}\n.Login-formGroup-3jg0a {\n  margin-bottom: 15px;\n}\n.Login-label-1c2xi {\n  display: inline-block;\n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n}\n.Login-input-kYFlM {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 46px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 0;\n  background: #fff;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n}\n.Login-input-kYFlM:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n.Login-button-2YGF4 {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n.Login-button-2YGF4:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n.Login-button-2YGF4:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n.Login-facebook-tjGI- {\n  border-color: #3b5998;\n  background: #3b5998;\n}\n.Login-facebook-tjGI-:hover {\n  background: #2d4373;\n}\n.Login-google-3wFQh {\n  border-color: #dd4b39;\n  background: #dd4b39;\n}\n.Login-google-3wFQh:hover {\n  background: #c23321;\n}\n.Login-twitter-1wDQB {\n  border-color: #55acee;\n  background: #55acee;\n}\n.Login-twitter-1wDQB:hover {\n  background: #2795e9;\n}\n.Login-icon-2yiD9 {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n.Login-lineThrough-1wOgU {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n.Login-lineThrough-1wOgU::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n.Login-lineThrough-1wOgU::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n", "", {"version":3,"sources":["/Users/homer/Projects/convospot-console/src/frontend/views/login/Login.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;AACH;;;;;;;GAOG;AACH;EACE;;gFAE8E;;EAE9E;;gFAE8E;;EAE9E;;gFAE8E,EAAE,gCAAgC,EAAE,2BAA2B,EAAE,6BAA6B,CAAC,iCAAiC;;EAE9M;;gFAE8E;CAC/E;AACD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;AACD;EACE,kBAAkB;CACnB;AACD;EACE,oBAAoB;CACrB;AACD;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;CAClB;AACD;EACE,eAAe;EACf,+BAA+B;UACvB,uBAAuB;EAC/B,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,iBAAiB;EACjB,iBAAiB;EACjB,yDAAyD;UACjD,iDAAiD;EACzD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyF;EACzF,iFAAiF;EACjF,4EAA4E;EAC5E,yEAAyE;EACzE,+GAA+G;CAChH;AACD;EACE,sBAAsB;EACtB,yFAAyF;UACjF,iFAAiF;CAC1F;AACD;EACE,eAAe;EACf,+BAA+B;UACvB,uBAAuB;EAC/B,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;AACD;EACE,mCAAmC;CACpC;AACD;EACE,sBAAsB;EACtB,mDAAmD;UAC3C,2CAA2C;CACpD;AACD;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AACD;EACE,oBAAoB;CACrB;AACD;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AACD;EACE,oBAAoB;CACrB;AACD;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AACD;EACE,oBAAoB;CACrB;AACD;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;AACD;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;AACD;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;AACD;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb","file":"Login.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n\n  /*\n   * Sidebar\n   * ======================================================================== */\n}\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n.lead {\n  font-size: 1.25em;\n}\n.formGroup {\n  margin-bottom: 15px;\n}\n.label {\n  display: inline-block;\n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n}\n.input {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 46px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 0;\n  background: #fff;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n}\n.input:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n.button {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n.button:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n.button:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n.facebook {\n  border-color: #3b5998;\n  background: #3b5998;\n  composes: button;\n}\n.facebook:hover {\n  background: #2d4373;\n}\n.google {\n  border-color: #dd4b39;\n  background: #dd4b39;\n  composes: button;\n}\n.google:hover {\n  background: #c23321;\n}\n.twitter {\n  border-color: #55acee;\n  background: #55acee;\n  composes: button;\n}\n.twitter:hover {\n  background: #2795e9;\n}\n.icon {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n.lineThrough {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n.lineThrough::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n.lineThrough::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Login-root-rnqjK",
	"container": "Login-container-1BhsQ",
	"lead": "Login-lead-2t69x",
	"formGroup": "Login-formGroup-3jg0a",
	"label": "Login-label-1c2xi",
	"input": "Login-input-kYFlM",
	"button": "Login-button-2YGF4",
	"facebook": "Login-facebook-tjGI- Login-button-2YGF4",
	"google": "Login-google-3wFQh Login-button-2YGF4",
	"twitter": "Login-twitter-1wDQB Login-button-2YGF4",
	"icon": "Login-icon-2yiD9",
	"lineThrough": "Login-lineThrough-1wOgU"
};

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\nfigcaption,\nfigure,\nmain { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"], /* 1 */\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\ndetails, /* 1 */\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n[hidden] {\n  display: none;\n}\n", "", {"version":3,"sources":["/Users/homer/Projects/convospot-console/node_modules/normalize.css/normalize.css"],"names":[],"mappings":"AAAA,4EAA4E;;AAE5E;gFACgF;;AAEhF;;;;GAIG;;AAEH;EACE,kBAAkB,CAAC,OAAO;EAC1B,2BAA2B,CAAC,OAAO;EACnC,+BAA+B,CAAC,OAAO;CACxC;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,UAAU;CACX;;AAED;;GAEG;;AAEH;;;;;;EAME,eAAe;CAChB;;AAED;;;GAGG;;AAEH;EACE,eAAe;EACf,iBAAiB;CAClB;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;;OAEO,OAAO;EACZ,eAAe;CAChB;;AAED;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;;;GAGG;;AAEH;EACE,wBAAwB,CAAC,OAAO;EAChC,UAAU,CAAC,OAAO;EAClB,kBAAkB,CAAC,OAAO;CAC3B;;AAED;;;GAGG;;AAEH;EACE,kCAAkC,CAAC,OAAO;EAC1C,eAAe,CAAC,OAAO;CACxB;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;EACE,8BAA8B,CAAC,OAAO;EACtC,sCAAsC,CAAC,OAAO;CAC/C;;AAED;;;GAGG;;AAEH;EACE,oBAAoB,CAAC,OAAO;EAC5B,2BAA2B,CAAC,OAAO;EACnC,kCAAkC,CAAC,OAAO;CAC3C;;AAED;;GAEG;;AAEH;;EAEE,qBAAqB;CACtB;;AAED;;GAEG;;AAEH;;EAEE,oBAAoB;CACrB;;AAED;;;GAGG;;AAEH;;;EAGE,kCAAkC,CAAC,OAAO;EAC1C,eAAe,CAAC,OAAO;CACxB;;AAED;;GAEG;;AAEH;EACE,mBAAmB;CACpB;;AAED;;GAEG;;AAEH;EACE,uBAAuB;EACvB,YAAY;CACb;;AAED;;GAEG;;AAEH;EACE,eAAe;CAChB;;AAED;;;GAGG;;AAEH;;EAEE,eAAe;EACf,eAAe;EACf,mBAAmB;EACnB,yBAAyB;CAC1B;;AAED;EACE,gBAAgB;CACjB;;AAED;EACE,YAAY;CACb;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;;EAEE,sBAAsB;CACvB;;AAED;;GAEG;;AAEH;EACE,cAAc;EACd,UAAU;CACX;;AAED;;GAEG;;AAEH;EACE,mBAAmB;CACpB;;AAED;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;;;;;EAKE,wBAAwB,CAAC,OAAO;EAChC,gBAAgB,CAAC,OAAO;EACxB,kBAAkB,CAAC,OAAO;EAC1B,UAAU,CAAC,OAAO;CACnB;;AAED;;;GAGG;;AAEH;QACQ,OAAO;EACb,kBAAkB;CACnB;;AAED;;;GAGG;;AAEH;SACS,OAAO;EACd,qBAAqB;CACtB;;AAED;;;;GAIG;;AAEH;;;;EAIE,2BAA2B,CAAC,OAAO;CACpC;;AAED;;GAEG;;AAEH;;;;EAIE,mBAAmB;EACnB,WAAW;CACZ;;AAED;;GAEG;;AAEH;;;;EAIE,+BAA+B;CAChC;;AAED;;GAEG;;AAEH;EACE,+BAA+B;CAChC;;AAED;;;;;GAKG;;AAEH;EACE,uBAAuB,CAAC,OAAO;EAC/B,eAAe,CAAC,OAAO;EACvB,eAAe,CAAC,OAAO;EACvB,gBAAgB,CAAC,OAAO;EACxB,WAAW,CAAC,OAAO;EACnB,oBAAoB,CAAC,OAAO;CAC7B;;AAED;;;GAGG;;AAEH;EACE,sBAAsB,CAAC,OAAO;EAC9B,yBAAyB,CAAC,OAAO;CAClC;;AAED;;GAEG;;AAEH;EACE,eAAe;CAChB;;AAED;;;GAGG;;AAEH;;EAEE,uBAAuB,CAAC,OAAO;EAC/B,WAAW,CAAC,OAAO;CACpB;;AAED;;GAEG;;AAEH;;EAEE,aAAa;CACd;;AAED;;;GAGG;;AAEH;EACE,8BAA8B,CAAC,OAAO;EACtC,qBAAqB,CAAC,OAAO;CAC9B;;AAED;;GAEG;;AAEH;;EAEE,yBAAyB;CAC1B;;AAED;;;GAGG;;AAEH;EACE,2BAA2B,CAAC,OAAO;EACnC,cAAc,CAAC,OAAO;CACvB;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;;EAEE,eAAe;CAChB;;AAED;;GAEG;;AAEH;EACE,mBAAmB;CACpB;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,sBAAsB;CACvB;;AAED;;GAEG;;AAEH;EACE,cAAc;CACf;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,cAAc;CACf","file":"normalize.css","sourcesContent":["/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\nfigcaption,\nfigure,\nmain { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"], /* 1 */\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\ndetails, /* 1 */\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n[hidden] {\n  display: none;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/frontend/components/Sidebar/logo-min.png?39283941";

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/frontend/components/Sidebar/logo.png?d65bf5de";

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(139);
    var insertCss = __webpack_require__(3);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Feedback.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Feedback.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(140);
    var insertCss = __webpack_require__(3);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Footer.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Footer.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(141);
    var insertCss = __webpack_require__(3);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Header.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Header.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(142);
    var insertCss = __webpack_require__(3);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./GridOneOne.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./GridOneOne.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(143);
    var insertCss = __webpack_require__(3);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./GridOneTwo.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./GridOneTwo.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(144);
    var insertCss = __webpack_require__(3);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Layout.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Layout.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(145);
    var insertCss = __webpack_require__(3);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Page.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Page.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(146);
    var insertCss = __webpack_require__(3);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Sidebar.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Sidebar.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(147);
    var insertCss = __webpack_require__(3);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Admin.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Admin.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(148);
    var insertCss = __webpack_require__(3);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Contact.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Contact.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(150);
    var insertCss = __webpack_require__(3);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Home.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Home.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(151);
    var insertCss = __webpack_require__(3);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Knowledge.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Knowledge.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(152);
    var insertCss = __webpack_require__(3);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./NotFound.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./NotFound.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(153);
    var insertCss = __webpack_require__(3);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Register.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Register.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(154);
    var insertCss = __webpack_require__(3);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Login.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/lib/index.js??ref--1-2!./Login.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(155);
    var insertCss = __webpack_require__(3);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../css-loader/index.js??ref--2-1!./normalize.css", function() {
        content = require("!!../css-loader/index.js??ref--2-1!./normalize.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 174 */
/***/ (function(module, exports) {

module.exports = {"OK":{"code":200,"error":"No error","message":""},"GENERAL":{"code":400,"error":"Something wrong in server","message":""},"NOT_FOUND":{"code":404,"error":"Not found","message":""},"SET_FAILED":{"code":400,"error":"Write error","message":""},"INCORRECT_LOGIN":{"code":400,"error":"Username or Password incorrect","message":""},"EXISTS":{"code":400,"error":"The record already exists","message":""},"MISSING_FIELD":{"code":400,"error":"Filed(s) missing","message":""},"NO_METHOD":{"code":400,"error":"Method Not Allowed","message":""},"CONNECTION":{"code":400,"error":"Connection error","message":""},"UPLOAD_FAILED":{"code":400,"error":"Upload error","message":""},"INVALIDE_DATA":{"code":400,"error":"Invalide data","message":""}}

/***/ }),
/* 175 */
/***/ (function(module, exports) {

module.exports = {"NEW_USER":"new_user","CHANGE_EMAIL":"change_email","SEND_EMAIL":"send_email"}

/***/ }),
/* 176 */
/***/ (function(module, exports) {

module.exports = {"title":"About Us","component":"ContentPage","html":"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consequat\ntortor fermentum mi fermentum dignissim. Nullam vel ipsum ut ligula elementum\nlobortis. Maecenas aliquam, massa laoreet lacinia pretium, nisi urna venenatis\ntortor, nec imperdiet tellus libero efficitur metus. Fusce semper posuere\nligula, et facilisis metus bibendum interdum. Mauris at mauris sit amet sem\npharetra commodo a eu leo. Nam at est non risus cursus maximus. Nam feugiat\naugue libero, id consectetur tortor bibendum non. Quisque nec fringilla lorem.\nNullam efficitur vulputate mauris, nec maximus leo dignissim id.</p>\n<p>In hac habitasse platea dictumst. Duis sagittis dui ac ex suscipit maximus.\nMorbi pellentesque venenatis felis sed convallis. Nulla varius, nibh vitae\nplacerat tempus, mauris sem elementum ipsum, eget sollicitudin nisl est vel\npurus. Fusce malesuada odio velit, non cursus leo fermentum id. Cras pharetra\nsodales fringilla. Etiam quis est a dolor egestas pellentesque. Maecenas non\nscelerisque purus, congue cursus arcu. Donec vel dapibus mi. Mauris maximus\nposuere placerat. Sed et libero eu nibh tristique mollis a eget lectus. Donec\ninterdum augue sollicitudin vehicula hendrerit. Vivamus justo orci, molestie\nac sollicitudin ac, lobortis at tellus. Etiam rhoncus ullamcorper risus eu\ntempor. Sed porttitor, neque ac efficitur gravida, arcu lacus pharetra dui, in\nconsequat elit tellus auctor nulla. Donec placerat elementum diam, vitae\nimperdiet lectus luctus at.</p>\n<p>Nullam eu feugiat mi. Quisque nec tristique nisl, dignissim dictum leo. Nam\nnon quam nisi. Donec rutrum turpis ac diam blandit, id pulvinar mauris\nsuscipit. Pellentesque tincidunt libero ultricies risus iaculis, sit amet\nconsequat velit blandit. Fusce quis varius nulla. Nullam nisi nisi, suscipit\nut magna quis, feugiat porta nibh. Sed id enim lectus. Suspendisse elementum\njusto sapien, sit amet consequat orci accumsan et. Aliquam ornare ullamcorper\nsem sed finibus. Nullam ac lacus pulvinar, egestas felis ut, accumsan est.</p>\n<p>Pellentesque sagittis vehicula sem quis luctus. Proin sodales magna in lorem\nhendrerit aliquam. Integer eu varius orci. Vestibulum ante ipsum primis in\nfaucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum ante ipsum\nprimis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut at mauris\nnibh. Suspendisse maximus ac eros at vestibulum.</p>\n<p>Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque egestas\ntortor et dui consequat faucibus. Nunc vitae odio ornare, venenatis ligula a,\nvulputate nisl. Aenean congue varius ex, sit amet bibendum odio posuere at.\nNulla facilisi. In finibus, nulla vitae tincidunt ornare, sapien nulla\nfermentum mauris, sed consectetur tortor arcu eget arcu. Vestibulum vel quam\nenim.</p>\n"};

/***/ }),
/* 177 */
/***/ (function(module, exports) {

module.exports = {"title":"Privacy Policy","html":"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consequat\ntortor fermentum mi fermentum dignissim. Nullam vel ipsum ut ligula elementum\nlobortis. Maecenas aliquam, massa laoreet lacinia pretium, nisi urna venenatis\ntortor, nec imperdiet tellus libero efficitur metus. Fusce semper posuere\nligula, et facilisis metus bibendum interdum. Mauris at mauris sit amet sem\npharetra commodo a eu leo. Nam at est non risus cursus maximus. Nam feugiat\naugue libero, id consectetur tortor bibendum non. Quisque nec fringilla lorem.\nNullam efficitur vulputate mauris, nec maximus leo dignissim id.</p>\n<p>In hac habitasse platea dictumst. Duis sagittis dui ac ex suscipit maximus.\nMorbi pellentesque venenatis felis sed convallis. Nulla varius, nibh vitae\nplacerat tempus, mauris sem elementum ipsum, eget sollicitudin nisl est vel\npurus. Fusce malesuada odio velit, non cursus leo fermentum id. Cras pharetra\nsodales fringilla. Etiam quis est a dolor egestas pellentesque. Maecenas non\nscelerisque purus, congue cursus arcu. Donec vel dapibus mi. Mauris maximus\nposuere placerat. Sed et libero eu nibh tristique mollis a eget lectus. Donec\ninterdum augue sollicitudin vehicula hendrerit. Vivamus justo orci, molestie\nac sollicitudin ac, lobortis at tellus. Etiam rhoncus ullamcorper risus eu\ntempor. Sed porttitor, neque ac efficitur gravida, arcu lacus pharetra dui, in\nconsequat elit tellus auctor nulla. Donec placerat elementum diam, vitae\nimperdiet lectus luctus at.</p>\n<p>Nullam eu feugiat mi. Quisque nec tristique nisl, dignissim dictum leo. Nam\nnon quam nisi. Donec rutrum turpis ac diam blandit, id pulvinar mauris\nsuscipit. Pellentesque tincidunt libero ultricies risus iaculis, sit amet\nconsequat velit blandit. Fusce quis varius nulla. Nullam nisi nisi, suscipit\nut magna quis, feugiat porta nibh. Sed id enim lectus. Suspendisse elementum\njusto sapien, sit amet consequat orci accumsan et. Aliquam ornare ullamcorper\nsem sed finibus. Nullam ac lacus pulvinar, egestas felis ut, accumsan est.</p>\n<p>Pellentesque sagittis vehicula sem quis luctus. Proin sodales magna in lorem\nhendrerit aliquam. Integer eu varius orci. Vestibulum ante ipsum primis in\nfaucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum ante ipsum\nprimis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut at mauris\nnibh. Suspendisse maximus ac eros at vestibulum.</p>\n<p>Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque egestas\ntortor et dui consequat faucibus. Nunc vitae odio ornare, venenatis ligula a,\nvulputate nisl. Aenean congue varius ex, sit amet bibendum odio posuere at.\nNulla facilisi. In finibus, nulla vitae tincidunt ornare, sapien nulla\nfermentum mauris, sed consectetur tortor arcu eget arcu. Vestibulum vel quam\nenim.</p>\n"};

/***/ }),
/* 178 */
/***/ (function(module, exports) {

module.exports = require("./assets.json");

/***/ }),
/* 179 */
/***/ (function(module, exports) {

module.exports = require("apollo-client");

/***/ }),
/* 180 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 181 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),
/* 182 */
/***/ (function(module, exports) {

module.exports = require("base64url");

/***/ }),
/* 183 */
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),
/* 184 */
/***/ (function(module, exports) {

module.exports = require("composable-middleware");

/***/ }),
/* 185 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 186 */
/***/ (function(module, exports) {

module.exports = require("connect-mongo");

/***/ }),
/* 187 */
/***/ (function(module, exports) {

module.exports = require("ejs");

/***/ }),
/* 188 */
/***/ (function(module, exports) {

module.exports = require("errorhandler");

/***/ }),
/* 189 */
/***/ (function(module, exports) {

module.exports = require("express-graphql");

/***/ }),
/* 190 */
/***/ (function(module, exports) {

module.exports = require("express-http-proxy");

/***/ }),
/* 191 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 192 */
/***/ (function(module, exports) {

module.exports = require("express-validator");

/***/ }),
/* 193 */
/***/ (function(module, exports) {

module.exports = require("graphql-tag");

/***/ }),
/* 194 */
/***/ (function(module, exports) {

module.exports = require("hashids");

/***/ }),
/* 195 */
/***/ (function(module, exports) {

module.exports = require("history/createBrowserHistory");

/***/ }),
/* 196 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 197 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 198 */
/***/ (function(module, exports) {

module.exports = require("lusca");

/***/ }),
/* 199 */
/***/ (function(module, exports) {

module.exports = require("material-ui/AppBar");

/***/ }),
/* 200 */
/***/ (function(module, exports) {

module.exports = require("material-ui/Divider");

/***/ }),
/* 201 */
/***/ (function(module, exports) {

module.exports = require("material-ui/Drawer");

/***/ }),
/* 202 */
/***/ (function(module, exports) {

module.exports = require("material-ui/FlatButton");

/***/ }),
/* 203 */
/***/ (function(module, exports) {

module.exports = require("material-ui/IconButton");

/***/ }),
/* 204 */
/***/ (function(module, exports) {

module.exports = require("material-ui/List");

/***/ }),
/* 205 */
/***/ (function(module, exports) {

module.exports = require("material-ui/MenuItem");

/***/ }),
/* 206 */
/***/ (function(module, exports) {

module.exports = require("material-ui/RaisedButton");

/***/ }),
/* 207 */
/***/ (function(module, exports) {

module.exports = require("material-ui/TextField");

/***/ }),
/* 208 */
/***/ (function(module, exports) {

module.exports = require("material-ui/styles");

/***/ }),
/* 209 */
/***/ (function(module, exports) {

module.exports = require("material-ui/styles/getMuiTheme");

/***/ }),
/* 210 */
/***/ (function(module, exports) {

module.exports = require("material-ui/styles/spacing");

/***/ }),
/* 211 */
/***/ (function(module, exports) {

module.exports = require("material-ui/svg-icons/action/info");

/***/ }),
/* 212 */
/***/ (function(module, exports) {

module.exports = require("material-ui/utils/colorManipulator");

/***/ }),
/* 213 */
/***/ (function(module, exports) {

module.exports = require("method-override");

/***/ }),
/* 214 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 215 */
/***/ (function(module, exports) {

module.exports = require("node-uuid");

/***/ }),
/* 216 */
/***/ (function(module, exports) {

module.exports = require("passport-facebook");

/***/ }),
/* 217 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 218 */
/***/ (function(module, exports) {

module.exports = require("rc");

/***/ }),
/* 219 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 220 */
/***/ (function(module, exports) {

module.exports = require("react-material-icons/icons/action/account-circle");

/***/ }),
/* 221 */
/***/ (function(module, exports) {

module.exports = require("react-material-icons/icons/action/event-seat");

/***/ }),
/* 222 */
/***/ (function(module, exports) {

module.exports = require("react-material-icons/icons/action/help-outline");

/***/ }),
/* 223 */
/***/ (function(module, exports) {

module.exports = require("react-material-icons/icons/action/list");

/***/ }),
/* 224 */
/***/ (function(module, exports) {

module.exports = require("react-material-icons/icons/content/add");

/***/ }),
/* 225 */
/***/ (function(module, exports) {

module.exports = require("react-material-icons/icons/navigation/chevron-left");

/***/ }),
/* 226 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom/Link");

/***/ }),
/* 227 */
/***/ (function(module, exports) {

module.exports = require("react-tap-event-plugin");

/***/ }),
/* 228 */
/***/ (function(module, exports) {

module.exports = require("redis");

/***/ }),
/* 229 */
/***/ (function(module, exports) {

module.exports = require("redux-auth-wrapper");

/***/ }),
/* 230 */
/***/ (function(module, exports) {

module.exports = require("redux-form");

/***/ }),
/* 231 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 232 */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),
/* 233 */
/***/ (function(module, exports) {

module.exports = require("serve-favicon");

/***/ }),
/* 234 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 235 */
/***/ (function(module, exports) {

module.exports = require("socketio-jwt");

/***/ }),
/* 236 */
/***/ (function(module, exports) {

module.exports = require("universal-router");

/***/ }),
/* 237 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 238 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(52);
module.exports = __webpack_require__(51);


/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map