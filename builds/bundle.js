/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "fc06564d5188d00f1b31"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/BigDataPortal/BDPComponent/builds/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(102);
	__webpack_require__(165);
	module.exports = __webpack_require__(60);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(18);

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = vendor;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Utility functions
	 */
	
	function typeOf(obj) {
	  return Object.prototype.toString.call(obj);
	}
	
	function isString(obj) {
	  return typeOf(obj) === '[object String]';
	}
	
	var hasOwn = Object.prototype.hasOwnProperty;
	
	function has(object, key) {
	  return object
	    ? hasOwn.call(object, key)
	    : false;
	}
	
	// Extend objects
	//
	function assign(obj /*from1, from2, from3, ...*/) {
	  var sources = [].slice.call(arguments, 1);
	
	  sources.forEach(function (source) {
	    if (!source) { return; }
	
	    if (typeof source !== 'object') {
	      throw new TypeError(source + 'must be object');
	    }
	
	    Object.keys(source).forEach(function (key) {
	      obj[key] = source[key];
	    });
	  });
	
	  return obj;
	}
	
	////////////////////////////////////////////////////////////////////////////////
	
	var UNESCAPE_MD_RE = /\\([\\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;
	
	function unescapeMd(str) {
	  if (str.indexOf('\\') < 0) { return str; }
	  return str.replace(UNESCAPE_MD_RE, '$1');
	}
	
	////////////////////////////////////////////////////////////////////////////////
	
	function isValidEntityCode(c) {
	  /*eslint no-bitwise:0*/
	  // broken sequence
	  if (c >= 0xD800 && c <= 0xDFFF) { return false; }
	  // never used
	  if (c >= 0xFDD0 && c <= 0xFDEF) { return false; }
	  if ((c & 0xFFFF) === 0xFFFF || (c & 0xFFFF) === 0xFFFE) { return false; }
	  // control codes
	  if (c >= 0x00 && c <= 0x08) { return false; }
	  if (c === 0x0B) { return false; }
	  if (c >= 0x0E && c <= 0x1F) { return false; }
	  if (c >= 0x7F && c <= 0x9F) { return false; }
	  // out of range
	  if (c > 0x10FFFF) { return false; }
	  return true;
	}
	
	function fromCodePoint(c) {
	  /*eslint no-bitwise:0*/
	  if (c > 0xffff) {
	    c -= 0x10000;
	    var surrogate1 = 0xd800 + (c >> 10),
	        surrogate2 = 0xdc00 + (c & 0x3ff);
	
	    return String.fromCharCode(surrogate1, surrogate2);
	  }
	  return String.fromCharCode(c);
	}
	
	var NAMED_ENTITY_RE   = /&([a-z#][a-z0-9]{1,31});/gi;
	var DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i;
	var entities = __webpack_require__(26);
	
	function replaceEntityPattern(match, name) {
	  var code = 0;
	
	  if (has(entities, name)) {
	    return entities[name];
	  } else if (name.charCodeAt(0) === 0x23/* # */ && DIGITAL_ENTITY_TEST_RE.test(name)) {
	    code = name[1].toLowerCase() === 'x' ?
	      parseInt(name.slice(2), 16)
	    :
	      parseInt(name.slice(1), 10);
	    if (isValidEntityCode(code)) {
	      return fromCodePoint(code);
	    }
	  }
	  return match;
	}
	
	function replaceEntities(str) {
	  if (str.indexOf('&') < 0) { return str; }
	
	  return str.replace(NAMED_ENTITY_RE, replaceEntityPattern);
	}
	
	////////////////////////////////////////////////////////////////////////////////
	
	var HTML_ESCAPE_TEST_RE = /[&<>"]/;
	var HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
	var HTML_REPLACEMENTS = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;'
	};
	
	function replaceUnsafeChar(ch) {
	  return HTML_REPLACEMENTS[ch];
	}
	
	function escapeHtml(str) {
	  if (HTML_ESCAPE_TEST_RE.test(str)) {
	    return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
	  }
	  return str;
	}
	
	////////////////////////////////////////////////////////////////////////////////
	
	exports.assign            = assign;
	exports.isString          = isString;
	exports.has               = has;
	exports.unescapeMd        = unescapeMd;
	exports.isValidEntityCode = isValidEntityCode;
	exports.fromCodePoint     = fromCodePoint;
	exports.replaceEntities   = replaceEntities;
	exports.escapeHtml        = escapeHtml;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(111);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.withProps = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed to the Apache Software Foundation (ASF) under one
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * or more contributor license agreements.  See the NOTICE file
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed with this work for additional information
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * regarding copyright ownership.  The ASF licenses this file
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * to you under the Apache License, Version 2.0 (the
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * "License"); you may not use this file except in compliance
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * with the License.  You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var ACTIONS = ['onClick', 'onMouseDown', 'onChange'];
	
	var withProps = function withProps(Component) {
		var PropsComponent = function (_React$Component) {
			_inherits(PropsComponent, _React$Component);
	
			function PropsComponent() {
				_classCallCheck(this, PropsComponent);
	
				var _this = _possibleConstructorReturn(this, (PropsComponent.__proto__ || Object.getPrototypeOf(PropsComponent)).call(this));
	
				ACTIONS.forEach(function (actionName) {
					_this[actionName] = function (proxy) {
						for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
							args[_key - 1] = arguments[_key];
						}
	
						var action = _this.props[actionName];
	
						if (action) {
							action.apply(undefined, [proxy, _this.props].concat(args));
						}
					};
				});
				return _this;
			}
	
			_createClass(PropsComponent, [{
				key: 'render',
				value: function render() {
					var _this2 = this;
	
					var _props = this.props,
					    children = _props.children,
					    props = _objectWithoutProperties(_props, ['children']);
	
					ACTIONS.forEach(function (actionName) {
						props[actionName] = _this2[actionName];
					});
	
					return _react2.default.createElement(
						Component,
						props,
						children
					);
				}
			}]);
	
			return PropsComponent;
		}(_react2.default.Component);
	
		PropsComponent.displayName = Component.displayName || Component.name;
	
		PropsComponent.propTypes = {
			onClick: _react.PropTypes.func,
			onChange: _react.PropTypes.func,
			children: _react.PropTypes.node
		};
	
		return PropsComponent;
	};
	
	exports.withProps = withProps;
	var _default = withProps;
	exports.default = _default;
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(ACTIONS, 'ACTIONS', 'C:/MyGit/BDPComponent/components/PropsComponent.js');
	
		__REACT_HOT_LOADER__.register(withProps, 'withProps', 'C:/MyGit/BDPComponent/components/PropsComponent.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/components/PropsComponent.js');
	}();

	;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var getValue = exports.getValue = function getValue(unit, path, defaultValue) {
		var desList = Array.isArray(path) ? path : [path];
		var current = unit;
		var len = desList.length;
	
		for (var i = 0; i < len; i += 1) {
			var des = desList[i];
			current = current[des];
	
			if (current === undefined) {
				current = defaultValue;
				break;
			}
		}
	
		return current;
	};
	
	var setValue = exports.setValue = function setValue(unit, path, value) {
		var desList = Array.isArray(path) ? path : [path];
		var preLen = desList.length - 1;
		var current = unit;
	
		for (var i = 0; i < preLen; i += 1) {
			var des = desList[i];
			var tmp = current[des];
			if (tmp === null || tmp === undefined) {
				current = current[des] = typeof des === 'number' ? [] : {};
			} else if ((typeof tmp === 'undefined' ? 'undefined' : _typeof(tmp)) === 'object') {
				current = current[des];
			} else {
				throw new Error(des + ' is not an object!');
			}
		}
	
		current[desList[preLen]] = value;
	
		return unit;
	};
	
	var updateValue = exports.updateValue = function updateValue(unit, path, updateFunc) {
		var desList = Array.isArray(path) ? path : [path];
		var preLen = desList.length - 1;
		var instance = _extends({}, unit);
		var current = instance;
		var des = void 0;
	
		for (var i = 0; i < preLen; i += 1) {
			des = desList[i];
			current = current[des] = _extends({}, current[des]);
		}
	
		current[desList[preLen]] = typeof updateFunc === 'function' ? updateFunc(current[desList[preLen]]) : updateFunc;
	
		return instance;
	};
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(getValue, 'getValue', 'C:/MyGit/BDPComponent/components/utils/pathUtil.js');
	
		__REACT_HOT_LOADER__.register(setValue, 'setValue', 'C:/MyGit/BDPComponent/components/utils/pathUtil.js');
	
		__REACT_HOT_LOADER__.register(updateValue, 'updateValue', 'C:/MyGit/BDPComponent/components/utils/pathUtil.js');
	}();

	;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Parse link labels
	 *
	 * This function assumes that first character (`[`) already matches;
	 * returns the end of the label.
	 *
	 * @param  {Object} state
	 * @param  {Number} start
	 * @api private
	 */
	
	module.exports = function parseLinkLabel(state, start) {
	  var level, found, marker,
	      labelEnd = -1,
	      max = state.posMax,
	      oldPos = state.pos,
	      oldFlag = state.isInLabel;
	
	  if (state.isInLabel) { return -1; }
	
	  if (state.labelUnmatchedScopes) {
	    state.labelUnmatchedScopes--;
	    return -1;
	  }
	
	  state.pos = start + 1;
	  state.isInLabel = true;
	  level = 1;
	
	  while (state.pos < max) {
	    marker = state.src.charCodeAt(state.pos);
	    if (marker === 0x5B /* [ */) {
	      level++;
	    } else if (marker === 0x5D /* ] */) {
	      level--;
	      if (level === 0) {
	        found = true;
	        break;
	      }
	    }
	
	    state.parser.skipToken(state);
	  }
	
	  if (found) {
	    labelEnd = state.pos;
	    state.labelUnmatchedScopes = 0;
	  } else {
	    state.labelUnmatchedScopes = level - 1;
	  }
	
	  // restore old state
	  state.pos = oldPos;
	  state.isInLabel = oldFlag;
	
	  return labelEnd;
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Ruler is a helper class for building responsibility chains from
	 * parse rules. It allows:
	 *
	 *   - easy stack rules chains
	 *   - getting main chain and named chains content (as arrays of functions)
	 *
	 * Helper methods, should not be used directly.
	 * @api private
	 */
	
	function Ruler() {
	  // List of added rules. Each element is:
	  //
	  // { name: XXX,
	  //   enabled: Boolean,
	  //   fn: Function(),
	  //   alt: [ name2, name3 ] }
	  //
	  this.__rules__ = [];
	
	  // Cached rule chains.
	  //
	  // First level - chain name, '' for default.
	  // Second level - digital anchor for fast filtering by charcodes.
	  //
	  this.__cache__ = null;
	}
	
	/**
	 * Find the index of a rule by `name`.
	 *
	 * @param  {String} `name`
	 * @return {Number} Index of the given `name`
	 * @api private
	 */
	
	Ruler.prototype.__find__ = function (name) {
	  var len = this.__rules__.length;
	  var i = -1;
	
	  while (len--) {
	    if (this.__rules__[++i].name === name) {
	      return i;
	    }
	  }
	  return -1;
	};
	
	/**
	 * Build the rules lookup cache
	 *
	 * @api private
	 */
	
	Ruler.prototype.__compile__ = function () {
	  var self = this;
	  var chains = [ '' ];
	
	  // collect unique names
	  self.__rules__.forEach(function (rule) {
	    if (!rule.enabled) {
	      return;
	    }
	
	    rule.alt.forEach(function (altName) {
	      if (chains.indexOf(altName) < 0) {
	        chains.push(altName);
	      }
	    });
	  });
	
	  self.__cache__ = {};
	
	  chains.forEach(function (chain) {
	    self.__cache__[chain] = [];
	    self.__rules__.forEach(function (rule) {
	      if (!rule.enabled) {
	        return;
	      }
	
	      if (chain && rule.alt.indexOf(chain) < 0) {
	        return;
	      }
	      self.__cache__[chain].push(rule.fn);
	    });
	  });
	};
	
	/**
	 * Ruler public methods
	 * ------------------------------------------------
	 */
	
	/**
	 * Replace rule function
	 *
	 * @param  {String} `name` Rule name
	 * @param  {Function `fn`
	 * @param  {Object} `options`
	 * @api private
	 */
	
	Ruler.prototype.at = function (name, fn, options) {
	  var idx = this.__find__(name);
	  var opt = options || {};
	
	  if (idx === -1) {
	    throw new Error('Parser rule not found: ' + name);
	  }
	
	  this.__rules__[idx].fn = fn;
	  this.__rules__[idx].alt = opt.alt || [];
	  this.__cache__ = null;
	};
	
	/**
	 * Add a rule to the chain before given the `ruleName`.
	 *
	 * @param  {String}   `beforeName`
	 * @param  {String}   `ruleName`
	 * @param  {Function} `fn`
	 * @param  {Object}   `options`
	 * @api private
	 */
	
	Ruler.prototype.before = function (beforeName, ruleName, fn, options) {
	  var idx = this.__find__(beforeName);
	  var opt = options || {};
	
	  if (idx === -1) {
	    throw new Error('Parser rule not found: ' + beforeName);
	  }
	
	  this.__rules__.splice(idx, 0, {
	    name: ruleName,
	    enabled: true,
	    fn: fn,
	    alt: opt.alt || []
	  });
	
	  this.__cache__ = null;
	};
	
	/**
	 * Add a rule to the chain after the given `ruleName`.
	 *
	 * @param  {String}   `afterName`
	 * @param  {String}   `ruleName`
	 * @param  {Function} `fn`
	 * @param  {Object}   `options`
	 * @api private
	 */
	
	Ruler.prototype.after = function (afterName, ruleName, fn, options) {
	  var idx = this.__find__(afterName);
	  var opt = options || {};
	
	  if (idx === -1) {
	    throw new Error('Parser rule not found: ' + afterName);
	  }
	
	  this.__rules__.splice(idx + 1, 0, {
	    name: ruleName,
	    enabled: true,
	    fn: fn,
	    alt: opt.alt || []
	  });
	
	  this.__cache__ = null;
	};
	
	/**
	 * Add a rule to the end of chain.
	 *
	 * @param  {String}   `ruleName`
	 * @param  {Function} `fn`
	 * @param  {Object}   `options`
	 * @return {String}
	 */
	
	Ruler.prototype.push = function (ruleName, fn, options) {
	  var opt = options || {};
	
	  this.__rules__.push({
	    name: ruleName,
	    enabled: true,
	    fn: fn,
	    alt: opt.alt || []
	  });
	
	  this.__cache__ = null;
	};
	
	/**
	 * Enable a rule or list of rules.
	 *
	 * @param  {String|Array} `list` Name or array of rule names to enable
	 * @param  {Boolean} `strict` If `true`, all non listed rules will be disabled.
	 * @api private
	 */
	
	Ruler.prototype.enable = function (list, strict) {
	  list = !Array.isArray(list)
	    ? [ list ]
	    : list;
	
	  // In strict mode disable all existing rules first
	  if (strict) {
	    this.__rules__.forEach(function (rule) {
	      rule.enabled = false;
	    });
	  }
	
	  // Search by name and enable
	  list.forEach(function (name) {
	    var idx = this.__find__(name);
	    if (idx < 0) {
	      throw new Error('Rules manager: invalid rule name ' + name);
	    }
	    this.__rules__[idx].enabled = true;
	  }, this);
	
	  this.__cache__ = null;
	};
	
	
	/**
	 * Disable a rule or list of rules.
	 *
	 * @param  {String|Array} `list` Name or array of rule names to disable
	 * @api private
	 */
	
	Ruler.prototype.disable = function (list) {
	  list = !Array.isArray(list)
	    ? [ list ]
	    : list;
	
	  // Search by name and disable
	  list.forEach(function (name) {
	    var idx = this.__find__(name);
	    if (idx < 0) {
	      throw new Error('Rules manager: invalid rule name ' + name);
	    }
	    this.__rules__[idx].enabled = false;
	  }, this);
	
	  this.__cache__ = null;
	};
	
	/**
	 * Get a rules list as an array of functions.
	 *
	 * @param  {String} `chainName`
	 * @return {Object}
	 * @api private
	 */
	
	Ruler.prototype.getRules = function (chainName) {
	  if (this.__cache__ === null) {
	    this.__compile__();
	  }
	  return this.__cache__[chainName] || [];
	};
	
	/**
	 * Expose `Ruler`
	 */
	
	module.exports = Ruler;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _PropsComponent = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var A = function A(_ref) {
		var children = _ref.children,
		    props = _objectWithoutProperties(_ref, ['children']);
	
		return _react2.default.createElement(
			'a',
			props,
			children
		);
	};
	
	A.propTypes = {
		children: _react.PropTypes.node
	};
	
	var _default = (0, _PropsComponent.withProps)(A);
	
	exports.default = _default;
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(A, 'A', 'C:/MyGit/BDPComponent/components/A.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/components/A.js');
	}();

	;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Footer = function Footer(_ref) {
		var _ref$className = _ref.className,
		    className = _ref$className === undefined ? 'text-right' : _ref$className,
		    children = _ref.children;
		return _react2.default.createElement(
			'div',
			{ className: (0, _classnames2.default)('box-footer', className) },
			children
		);
	};
	
	Footer._isBoxFooter = true;
	
	Footer.propTypes = {
		className: _react.PropTypes.string,
		children: _react.PropTypes.node
	};
	
	var _default = Footer;
	exports.default = _default;
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(Footer, 'Footer', 'C:/MyGit/BDPComponent/components/Box/Footer.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/components/Box/Footer.js');
	}();

	;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(14);
	
	var _reactCssModules = __webpack_require__(31);
	
	var _reactCssModules2 = _interopRequireDefault(_reactCssModules);
	
	var _Home = __webpack_require__(64);
	
	var _Home2 = _interopRequireDefault(_Home);
	
	var _index = __webpack_require__(73);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import { Match, Link } from 'react-router';
	var Main = function Main() {
		return _react2.default.createElement(
			'div',
			{ className: 'wrapper' },
			_react2.default.createElement(
				'header',
				{ className: 'main-header' },
				_react2.default.createElement(
					'a',
					{ href: '/', className: 'logo' },
					_react2.default.createElement(
						'span',
						{ className: 'logo-mini' },
						'BC'
					),
					_react2.default.createElement(
						'span',
						{ className: 'logo-lg' },
						'BDP Components'
					)
				),
				_react2.default.createElement(
					'nav',
					{ className: 'navbar navbar-static-top' },
					_react2.default.createElement(
						'a',
						{ className: 'sidebar-toggle', 'data-toggle': 'offcanvas', role: 'button' },
						_react2.default.createElement(
							'span',
							{ className: 'sr-only' },
							'Toggle navigation'
						)
					)
				)
			),
			_react2.default.createElement(
				'aside',
				{ className: 'main-sidebar' },
				_react2.default.createElement('section', { className: 'sidebar' })
			),
			_react2.default.createElement(
				'div',
				{ className: 'content-wrapper' },
				_react2.default.createElement(_Home2.default, null)
			),
			_react2.default.createElement(
				'footer',
				{ className: 'main-footer clearfix' },
				_react2.default.createElement(
					'div',
					{ className: 'pull-right hidden-xs' },
					'Component Library'
				)
			)
		);
	}; /**
	    * Created by jiljiang on 2016/10/12.
	    */
	
	Main.propTypes = {
		dispatch: _react.PropTypes.func
	};
	
	var _default = (0, _reactRedux.connect)()((0, _reactCssModules2.default)(Main, _index2.default));
	
	exports.default = _default;
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(Main, 'Main', 'C:/MyGit/BDPComponent/src/views/Main/index.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/src/views/Main/index.js');
	}();

	;

/***/ },
/* 12 */
/***/ function(module, exports) {

	// Inline parser state
	
	'use strict';
	
	function StateInline(src, parserInline, options, env, outTokens) {
	  this.src = src;
	  this.env = env;
	  this.options = options;
	  this.parser = parserInline;
	  this.tokens = outTokens;
	  this.pos = 0;
	  this.posMax = this.src.length;
	  this.level = 0;
	  this.pending = '';
	  this.pendingLevel = 0;
	
	  this.cache = [];        // Stores { start: end } pairs. Useful for backtrack
	                          // optimization of pairs parse (emphasis, strikes).
	
	  // Link parser state vars
	
	  this.isInLabel = false; // Set true when seek link label - we should disable
	                          // "paired" rules (emphasis, strikes) to not skip
	                          // tailing `]`
	
	  this.linkLevel = 0;     // Increment for each nesting link. Used to prevent
	                          // nesting in definitions
	
	  this.linkContent = '';  // Temporary storage for link url
	
	  this.labelUnmatchedScopes = 0; // Track unpaired `[` for link labels
	                                 // (backtrack optimization)
	}
	
	// Flush pending text
	//
	StateInline.prototype.pushPending = function () {
	  this.tokens.push({
	    type: 'text',
	    content: this.pending,
	    level: this.pendingLevel
	  });
	  this.pending = '';
	};
	
	// Push new token to "stream".
	// If pending text exists - flush it as text token
	//
	StateInline.prototype.push = function (token) {
	  if (this.pending) {
	    this.pushPending();
	  }
	
	  this.tokens.push(token);
	  this.pendingLevel = this.level;
	};
	
	// Store value to cache.
	// !!! Implementation has parser-specific optimizations
	// !!! keys MUST be integer, >= 0; values MUST be integer, > 0
	//
	StateInline.prototype.cacheSet = function (key, val) {
	  for (var i = this.cache.length; i <= key; i++) {
	    this.cache.push(0);
	  }
	
	  this.cache[key] = val;
	};
	
	// Get cache value
	//
	StateInline.prototype.cacheGet = function (key) {
	  return key < this.cache.length ? this.cache[key] : 0;
	};
	
	module.exports = StateInline;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(2);

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(415);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _PropsComponent = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var Button = function Button(_ref) {
		var className = _ref.className,
		    _ref$type = _ref.type,
		    type = _ref$type === undefined ? 'primary' : _ref$type,
		    children = _ref.children,
		    props = _objectWithoutProperties(_ref, ['className', 'type', 'children']);
	
		return _react2.default.createElement(
			'button',
			_extends({
				className: className || (0, _classnames2.default)('btn', 'btn-' + type)
			}, props),
			children
		);
	};
	
	Button.propTypes = {
		type: _react.PropTypes.string,
		onClick: _react.PropTypes.func,
		className: _react.PropTypes.string,
		children: _react.PropTypes.node
	};
	
	var _default = (0, _PropsComponent.withProps)(Button);
	
	exports.default = _default;
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(Button, 'Button', 'C:/MyGit/BDPComponent/components/Button.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/components/Button.js');
	}();

	;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _jquery = __webpack_require__(13);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Dialog = function (_React$Component) {
		_inherits(Dialog, _React$Component);
	
		function Dialog() {
			_classCallCheck(this, Dialog);
	
			var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this));
	
			_this.forceClose = false;
			_this.show = _this.show.bind(_this);
			_this.hide = _this.hide.bind(_this);
			_this.onConfirm = _this.onConfirm.bind(_this);
			_this.state = {};
			return _this;
		}
	
		_createClass(Dialog, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var _this2 = this;
	
				this.client = true;
	
				(0, _jquery2.default)(this.dialog).on('show.bs.modal', function () {
					var onShow = _this2.props.onShow;
	
					if (onShow) onShow(_this2);
				});
	
				(0, _jquery2.default)(this.dialog).on('shown.bs.modal', function () {
					var onShown = _this2.props.onShown;
	
					if (onShown) onShown(_this2);
				});
	
				(0, _jquery2.default)(this.dialog).on('hide.bs.modal', function () {
					if (_this2.forceClose) return true;
	
					var result = void 0;
					var onHide = _this2.props.onHide;
	
					if (onHide) {
						result = onHide(_this2, _this2.value);
					}
					_this2.value = undefined;
					if (result && result.then) {
						_this2.setState({ lock: true });
						result.then(function (promiseResult) {
							if (promiseResult !== false) {
								_this2.hide(true);
							} else {
								_this2.setState({ lock: false });
							}
						});
						return false;
					}
					return result;
				});
	
				(0, _jquery2.default)(this.dialog).on('hidden.bs.modal', function () {
					var onHidden = _this2.props.onHidden;
	
					if (onHidden) onHidden(_this2);
				});
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				if (this.client) {
					(0, _jquery2.default)(this.dialog).off('show.bs.modal');
					(0, _jquery2.default)(this.dialog).off('shown.bs.modal');
					(0, _jquery2.default)(this.dialog).off('hide.bs.modal');
					(0, _jquery2.default)(this.dialog).off('hidden.bs.modal');
				}
			}
		}, {
			key: 'onConfirm',
			value: function onConfirm() {
				this.value = true;
				this.hide();
			}
		}, {
			key: 'show',
			value: function show() {
				(0, _jquery2.default)(this.dialog).modal();
			}
		}, {
			key: 'hide',
			value: function hide(force) {
				this.forceClose = force;
				(0, _jquery2.default)(this.dialog).modal('hide');
			}
		}, {
			key: 'render',
			value: function render() {
				var _this3 = this;
	
				var _props = this.props,
				    title = _props.title,
				    content = _props.content,
				    footer = _props.footer,
				    size = _props.size,
				    confirm = _props.confirm;
				var lock = this.state.lock;
	
	
				var $content = typeof content === 'function' ? content() : content;
	
				var $footer = footer || _react2.default.createElement(
					'div',
					{ className: 'modal-footer' },
					_react2.default.createElement(
						'button',
						{ type: 'button', className: 'btn btn-default', 'data-dismiss': 'modal', disabled: lock },
						'Close'
					),
					confirm && _react2.default.createElement(
						'button',
						{ type: 'button', className: 'btn btn-primary', disabled: lock, onClick: this.onConfirm },
						'Confirm'
					)
				);
	
				return _react2.default.createElement(
					'div',
					{ className: 'modal fade', tabIndex: '-1', role: 'dialog', ref: function ref(dialog) {
							_this3.dialog = dialog;
						} },
					_react2.default.createElement(
						'div',
						{
							className: (0, _classnames2.default)('modal-dialog', {
								'modal-lg': size === 'large',
								'modal-sm': size === 'small'
							}),
							role: 'document'
						},
						_react2.default.createElement(
							'div',
							{ className: 'modal-content' },
							_react2.default.createElement(
								'div',
								{ className: 'modal-header' },
								_react2.default.createElement(
									'button',
									{ type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
									_react2.default.createElement(
										'span',
										{ 'aria-hidden': 'true' },
										'\xD7'
									)
								),
								_react2.default.createElement(
									'h4',
									{ className: 'modal-title', id: 'myModalLabel' },
									title
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'modal-body' },
								$content
							),
							$footer
						)
					)
				);
			}
		}]);
	
		return Dialog;
	}(_react2.default.Component);
	
	Dialog.propTypes = {
		title: _react.PropTypes.node,
		content: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.func]),
		footer: _react.PropTypes.node,
		size: _react.PropTypes.string,
		confirm: _react.PropTypes.bool,
	
		onShow: _react.PropTypes.func,
		onShown: _react.PropTypes.func,
		onHide: _react.PropTypes.func,
		onHidden: _react.PropTypes.func
	};
	
	var _default = Dialog;
	exports.default = _default;
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(Dialog, 'Dialog', 'C:/MyGit/BDPComponent/components/Dialog/Dialog.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/components/Dialog/Dialog.js');
	}();

	;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.BDP_FORM_FILED = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BDP_FORM_FILED = exports.BDP_FORM_FILED = 'BDP_FORM_FILED';
	
	function parseValues(values) {
		return values.map(function (value) {
			return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? value : {
				value: value
			};
		});
	}
	
	var getName = function getName(name) {
		if (Array.isArray(name)) return name.join('_');
		return name;
	};
	
	var Field = function (_React$Component) {
		_inherits(Field, _React$Component);
	
		function Field() {
			_classCallCheck(this, Field);
	
			var _this = _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).call(this));
	
			_this.doFilter = function (value) {
				var filter = _this.props.filter;
	
				if (!filter) return value;
				return filter(value);
			};
	
			_this.isChecked = _this.isChecked.bind(_this);
			_this.onChange = _this.onChange.bind(_this);
			_this.onCheckBoxChange = _this.onCheckBoxChange.bind(_this);
			return _this;
		}
	
		_createClass(Field, [{
			key: 'onChange',
			value: function onChange(event) {
				var _props = this.props,
				    name = _props.name,
				    onChange = _props.onChange,
				    onValueChange = _props.onValueChange;
	
				var value = event.target.value;
	
				if (onValueChange) onValueChange(this.doFilter(value), name);
				if (onChange) onChange(event);
			}
		}, {
			key: 'onCheckBoxChange',
			value: function onCheckBoxChange(groupCheckBoxValue) {
				var _props2 = this.props,
				    name = _props2.name,
				    onChange = _props2.onChange,
				    onValueChange = _props2.onValueChange;
	
	
				var value = void 0;
				if (typeof groupCheckBoxValue !== 'string') {
					value = !this.props.value;
				} else if (this.isChecked(groupCheckBoxValue)) {
					value = this.props.value.filter(function (val) {
						return val !== groupCheckBoxValue;
					});
				} else {
					value = this.props.value || [];
					value.push(groupCheckBoxValue);
				}
	
				if (onValueChange) onValueChange(this.doFilter(value), name);
				if (onChange) onChange(groupCheckBoxValue);
			}
		}, {
			key: 'isChecked',
			value: function isChecked(value) {
				return (this.props.value || []).indexOf(value) >= 0;
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;
	
				var _props3 = this.props,
				    name = _props3.name,
				    displayName = _props3.displayName,
				    description = _props3.description,
				    type = _props3.type,
				    inline = _props3.inline,
				    values = _props3.values,
				    value = _props3.value,
				    rows = _props3.rows,
				    Component = _props3.component,
				    props = _objectWithoutProperties(_props3, ['name', 'displayName', 'description', 'type', 'inline', 'values', 'value', 'rows', 'component']);
	
				var $input = null;
				var myName = getName(name);
	
				delete props.onValueChange;
				delete props.onChange;
				delete props.filter;
	
				if (Component) {
					$input = _react2.default.createElement(Component, _extends({}, props, { value: value, onChange: this.onChange }));
				} else {
					switch (type) {
						case 'bool':
						case 'checkbox':
							if (!values) {
								return _react2.default.createElement(
									'div',
									{ className: 'checkbox' },
									_react2.default.createElement(
										'label',
										{ htmlFor: myName },
										_react2.default.createElement('input', _extends({
											id: myName, type: 'checkbox', checked: !!value,
											onChange: this.onCheckBoxChange }, props)),
										' ',
										displayName || myName
									)
								);
							}
							return _react2.default.createElement(
								'div',
								null,
								parseValues(values).map(function (item, index) {
									var $checkbox = _react2.default.createElement(
										'label',
										{
											key: index,
											htmlFor: myName + '_' + index,
											className: inline && 'checkbox-inline'
										},
										_react2.default.createElement('input', _extends({
											id: myName + '_' + index, type: 'checkbox',
											onChange: function onChange() {
												_this2.onCheckBoxChange(item.value);
											}, checked: _this2.isChecked(item.value) }, props)),
										' ',
										item.description || item.value
									);
	
									return inline ? $checkbox : _react2.default.createElement(
										'div',
										{ className: inline ? 'inline' : 'checkbox', key: index },
										$checkbox
									);
								})
							);
	
						case 'radio':
							return _react2.default.createElement(
								'div',
								null,
								parseValues(values).map(function (item, index) {
									var $radio = _react2.default.createElement(
										'label',
										{
											key: index,
											htmlFor: myName + '_' + index,
											className: inline && 'radio-inline'
										},
										_react2.default.createElement('input', _extends({
											type: 'radio', name: myName, id: myName + '_' + index, value: item.value,
											onChange: _this2.onChange }, props)),
										' ',
										item.description || item.value
									);
	
									return inline ? $radio : _react2.default.createElement(
										'div',
										{ className: inline ? 'inline' : 'radio', key: index },
										$radio
									);
								})
							);
	
						case 'email':
						case 'number':
						case 'search':
						case 'password':
						default:
							if (values) {
								var miss = false;
								var parsedValue = value || '';
								var parsedValues = parseValues(values);
								if (!parsedValue && parsedValues.every(function (item) {
									return item.value !== parsedValue;
								})) {
									miss = true;
								}
	
								$input = _react2.default.createElement(
									'select',
									_extends({ className: 'form-control', value: parsedValue, onChange: this.onChange }, props),
									miss && _react2.default.createElement('option', { value: '' }),
									parseValues(values).map(function (item, index) {
										return _react2.default.createElement(
											'option',
											{ key: index, value: item.value },
											item.description || item.value
										);
									})
								);
							} else if (rows || type === 'textarea') {
								$input = _react2.default.createElement('textarea', _extends({
									className: 'form-control', id: myName, placeholder: description,
									value: value || '', onChange: this.onChange, rows: rows || 5 }, props));
							} else {
								$input = _react2.default.createElement('input', _extends({
									type: type || 'text', className: 'form-control', id: myName, placeholder: description,
									value: value || '', onChange: this.onChange }, props));
							}
					}
				}
	
				return _react2.default.createElement(
					'div',
					{ className: 'form-group' },
					displayName !== '' && _react2.default.createElement(
						'label',
						{ htmlFor: myName },
						displayName || myName
					),
					$input
				);
			}
		}]);
	
		return Field;
	}(_react2.default.Component);
	
	Field.propTypes = {
		name: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.array]).isRequired,
		displayName: _react.PropTypes.node,
		description: _react.PropTypes.string,
		type: _react.PropTypes.string,
		inline: _react.PropTypes.bool,
		rows: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
		component: _react.PropTypes.func,
		value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number, _react2.default.PropTypes.bool, _react2.default.PropTypes.array, _react2.default.PropTypes.object, _react2.default.PropTypes.symbol]),
		values: _react.PropTypes.array,
	
		filter: _react.PropTypes.func,
		onChange: _react.PropTypes.func,
		onValueChange: _react.PropTypes.func
	};
	
	Field[BDP_FORM_FILED] = BDP_FORM_FILED;
	
	var _default = Field;
	exports.default = _default;
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(BDP_FORM_FILED, 'BDP_FORM_FILED', 'C:/MyGit/BDPComponent/components/Form/Field.js');
	
		__REACT_HOT_LOADER__.register(parseValues, 'parseValues', 'C:/MyGit/BDPComponent/components/Form/Field.js');
	
		__REACT_HOT_LOADER__.register(getName, 'getName', 'C:/MyGit/BDPComponent/components/Form/Field.js');
	
		__REACT_HOT_LOADER__.register(Field, 'Field', 'C:/MyGit/BDPComponent/components/Form/Field.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/components/Form/Field.js');
	}();

	;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Column = function (_React$Component) {
		_inherits(Column, _React$Component);
	
		function Column() {
			_classCallCheck(this, Column);
	
			return _possibleConstructorReturn(this, (Column.__proto__ || Object.getPrototypeOf(Column)).apply(this, arguments));
		}
	
		_createClass(Column, [{
			key: 'render',
			value: function render() {
				return null;
			}
		}]);
	
		return Column;
	}(_react2.default.Component);
	
	Column.propTypes = {
		field: _react.PropTypes.string,
		th: _react.PropTypes.bool,
		head: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
		cell: _react.PropTypes.func,
		className: _react.PropTypes.string,
		styleName: _react.PropTypes.string,
		render: _react.PropTypes.func,
		width: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
		contentWidth: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
		sortPath: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.string)])
	};
	
	var _default = Column;
	exports.default = _default;
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(Column, 'Column', 'C:/MyGit/BDPComponent/components/SortTable/Column.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/components/SortTable/Column.js');
	}();

	;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _A = __webpack_require__(9);
	
	var _A2 = _interopRequireDefault(_A);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed to the Apache Software Foundation (ASF) under one
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * or more contributor license agreements.  See the NOTICE file
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed with this work for additional information
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * regarding copyright ownership.  The ASF licenses this file
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * to you under the Apache License, Version 2.0 (the
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * "License"); you may not use this file except in compliance
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * with the License.  You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var Pagination = function (_React$Component) {
		_inherits(Pagination, _React$Component);
	
		function Pagination(props) {
			_classCallCheck(this, Pagination);
	
			var _this = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, props));
	
			_this.gotoPage = _this.gotoPage.bind(_this);
			_this.goPrevPage = _this.goPrevPage.bind(_this);
			_this.goNextPage = _this.goNextPage.bind(_this);
			_this.goFirstPage = _this.goFirstPage.bind(_this);
			_this.goLastPage = _this.goLastPage.bind(_this);
			return _this;
		}
	
		_createClass(Pagination, [{
			key: 'gotoPage',
			value: function gotoPage(e, props) {
				var gotoPage = this.props.gotoPage;
	
				if (gotoPage) {
					gotoPage(typeof e === 'number' ? e : props['data-page']);
				}
			}
		}, {
			key: 'goPrevPage',
			value: function goPrevPage(e) {
				var page = this.props.page;
	
				e.preventDefault();
				if (page > 1) this.gotoPage(page - 1);
			}
		}, {
			key: 'goNextPage',
			value: function goNextPage(e) {
				var _props = this.props,
				    page = _props.page,
				    count = _props.count,
				    size = _props.size;
	
				var totalPages = Math.ceil(count / size);
				e.preventDefault();
				if (page < totalPages) this.gotoPage(page + 1);
			}
		}, {
			key: 'goFirstPage',
			value: function goFirstPage(e) {
				e.preventDefault();
				this.gotoPage(1);
			}
		}, {
			key: 'goLastPage',
			value: function goLastPage(e) {
				var _props2 = this.props,
				    count = _props2.count,
				    size = _props2.size;
	
				var totalPages = Math.ceil(count / size);
				e.preventDefault();
				this.gotoPage(totalPages);
			}
		}, {
			key: 'render',
			value: function render() {
				var _props3 = this.props,
				    count = _props3.count,
				    size = _props3.size,
				    _props3$page = _props3.page,
				    page = _props3$page === undefined ? 1 : _props3$page,
				    _props3$range = _props3.range,
				    range = _props3$range === undefined ? 9 : _props3$range,
				    disabled = _props3.disabled;
	
				var totalPages = Math.ceil(count / size);
	
				var lRange = Math.floor((range - 1) / 2);
				var rRange = range - 1 - lRange;
				var minPage = page - lRange;
				var maxPage = page + rRange;
	
				if (minPage < 1) {
					maxPage += -minPage + 1;
					minPage = 1;
				}
				if (maxPage > totalPages) {
					minPage -= maxPage - totalPages;
					maxPage = totalPages;
				}
				if (minPage < 1) minPage = 1;
	
				var navItems = [];
				for (var i = minPage; i <= maxPage; i += 1) {
					navItems.push(_react2.default.createElement(
						'li',
						{ className: (0, _classnames2.default)({ active: page === i, disabled: disabled }), key: i },
						_react2.default.createElement(
							_A2.default,
							{ href: 'javascript:;', 'data-page': i, onClick: this.gotoPage },
							i
						)
					));
				}
	
				return _react2.default.createElement(
					'ul',
					{ className: 'pagination pull-right' },
					_react2.default.createElement(
						'li',
						{ className: (0, _classnames2.default)({ disabled: page <= 1 || disabled }) },
						_react2.default.createElement(
							'a',
							{ href: 'javascript:;', onClick: this.goFirstPage },
							'\xAB'
						)
					),
					_react2.default.createElement(
						'li',
						{ className: (0, _classnames2.default)({ disabled: page <= 1 || disabled }) },
						_react2.default.createElement(
							'a',
							{ href: 'javascript:;', onClick: this.goPrevPage },
							'\u2039'
						)
					),
					navItems,
					_react2.default.createElement(
						'li',
						{ className: (0, _classnames2.default)({ disabled: page >= totalPages || disabled }) },
						_react2.default.createElement(
							'a',
							{ href: 'javascript:;', onClick: this.goNextPage },
							'\u203A'
						)
					),
					_react2.default.createElement(
						'li',
						{ className: (0, _classnames2.default)({ disabled: page >= totalPages || disabled }) },
						_react2.default.createElement(
							'a',
							{ href: 'javascript:;', onClick: this.goLastPage },
							'\xBB'
						)
					)
				);
			}
		}]);
	
		return Pagination;
	}(_react2.default.Component);
	
	Pagination.propTypes = {
		gotoPage: _react.PropTypes.func,
		count: _react.PropTypes.number.isRequired,
		size: _react.PropTypes.number,
		page: _react.PropTypes.number,
		range: _react.PropTypes.number,
		disabled: _react.PropTypes.bool
	};
	
	var _default = Pagination;
	exports.default = _default;
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(Pagination, 'Pagination', 'C:/MyGit/BDPComponent/components/SortTable/Pagination.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/components/SortTable/Pagination.js');
	}();

	;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Column = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _immutable = __webpack_require__(170);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Pagination = __webpack_require__(19);
	
	var _Pagination2 = _interopRequireDefault(_Pagination);
	
	var _Th = __webpack_require__(49);
	
	var _Th2 = _interopRequireDefault(_Th);
	
	var _PropsComponent = __webpack_require__(5);
	
	var _pathUtil = __webpack_require__(6);
	
	var _arrayUtils = __webpack_require__(58);
	
	var _Column2 = __webpack_require__(18);
	
	var _Column3 = _interopRequireDefault(_Column2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	exports.Column = _Column3.default;
	
	
	var TABLE_CLASS_REGEX = /\btable\b/;
	var WIDTH_NUMBER_REGEX = /^\d+(\.\d+)?$/;
	
	var Tr = (0, _PropsComponent.withProps)(function (_ref) {
		var children = _ref.children,
		    props = _objectWithoutProperties(_ref, ['children']);
	
		return _react2.default.createElement(
			'tr',
			props,
			children
		);
	});
	
	Tr.propTypes = {
		children: _react.PropTypes.node
	};
	
	/**
	 * Convert string or array to array
	 * @param path
	 */
	function pathToArray(path) {
		if (path && !Array.isArray(path)) {
			return [path];
		}
		return path;
	}
	
	function arrayLike() {
		var list1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
		var list2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	
		if (list1.length !== list2.length) return false;
	
		for (var i = 0; i < list1.length; i += 1) {
			if (list1[i] !== list2[i]) return false;
		}
		return true;
	}
	
	function getSortConfig(sort) {
		var columnList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	
		var sortConfig = {
			path: null,
			asc: true
		};
		if ((typeof sort === 'undefined' ? 'undefined' : _typeof(sort)) === 'object') {
			sortConfig = Object.assign(sortConfig, sort);
		} else {
			sortConfig.path = sort;
		}
	
		if (sortConfig.path) {
			sortConfig.path = pathToArray(sortConfig.path);
		}
	
		for (var i = 0; i < columnList.length; i += 1) {
			if (arrayLike(sortConfig.path, pathToArray(columnList[i].sortPath))) {
				sortConfig.index = i;
				break;
			}
		}
	
		return sortConfig;
	}
	
	var Table = function (_React$Component) {
		_inherits(Table, _React$Component);
	
		function Table(props) {
			_classCallCheck(this, Table);
	
			var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));
	
			_this.sort = getSortConfig(_this.props.sort, _this.getColumns());
	
			_this.state = {
				page: 1,
				sortList: _this.getSortList()
			};
			_this.getPageCount = _this.getPageCount.bind(_this);
			_this.gotoPage = _this.gotoPage.bind(_this);
			_this.doSort = _this.doSort.bind(_this);
			_this.onRowClick = _this.onRowClick.bind(_this);
			return _this;
		}
	
		_createClass(Table, [{
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				var nextSort = getSortConfig(nextProps.sort, this.getColumns());
				if (this.pathToArray !== nextSort.sortPath || this.props.list !== nextProps.list) {
					this.sort = nextSort;
					this.setState({ sortList: this.getSortList(nextProps) });
				}
			}
		}, {
			key: 'onRowClick',
			value: function onRowClick(event, props) {
				var onRowClick = this.props.onRowClick;
	
				if (onRowClick) {
					onRowClick(event, props['data-item'], props['data-index']);
				}
			}
		}, {
			key: 'getPageCount',
			value: function getPageCount() {
				var _props = this.props,
				    list = _props.list,
				    _props$size = _props.size,
				    size = _props$size === undefined ? 10 : _props$size;
	
				var len = list instanceof _immutable2.default.List ? list.size : list.length;
				return Math.ceil(len / size);
			}
		}, {
			key: 'getSortList',
			value: function getSortList(props) {
				var list = ((props || this.props).list || []).concat();
				return this.sort.path ? (0, _arrayUtils.sort)(list, this.sort.path, this.sort.asc) : list;
			}
		}, {
			key: 'getColumns',
			value: function getColumns() {
				var children = this.props.children;
	
				return children ? _react2.default.Children.map(children, function (cell) {
					return cell.props;
				}) : [];
			}
		}, {
			key: 'gotoPage',
			value: function gotoPage(newPage) {
				var page = newPage === -1 ? this.getPageCount() : newPage;
				this.setState({ page: page });
			}
		}, {
			key: 'doSort',
			value: function doSort(e, props) {
				var sortPath = props['data-col'].sortPath;
				if (!sortPath) return;
	
				var sort = getSortConfig(sortPath, this.getColumns());
				if (arrayLike(sort.path, this.sort.path)) {
					this.sort.asc = !this.sort.asc;
					this.setState({ sortList: this.state.sortList.reverse() });
				} else {
					this.sort = sort;
					this.setState({ sortList: this.getSortList() });
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;
	
				var _props2 = this.props,
				    className = _props2.className,
				    _props2$size = _props2.size,
				    size = _props2$size === undefined ? 10 : _props2$size,
				    range = _props2.range;
				var sortList = this.state.sortList;
				var page = this.state.page;
	
				var columns = this.getColumns();
	
				var len = sortList instanceof _immutable2.default.List ? sortList.size : sortList.length;
				var totalPages = this.getPageCount();
				if (totalPages === 0 && page !== 1 || page < 1) {
					page = 1;
				} else if (page > totalPages) {
					page = totalPages;
				}
	
				// Get current page list
				var start = (page - 1) * size;
				var end = page * size;
				var _list = sortList.slice(start, end);
	
				// Table class
				var tableClass = className || 'table table-bordered';
	
				return _react2.default.createElement(
					'div',
					{ className: 'clearfix sort-table' },
					_react2.default.createElement(
						'div',
						{ className: TABLE_CLASS_REGEX.test(tableClass) && 'table-responsive' },
						_react2.default.createElement(
							'table',
							{ className: tableClass },
							_react2.default.createElement(
								'thead',
								null,
								_react2.default.createElement(
									'tr',
									null,
									columns.map(function (col, j) {
										var style = {};
										if (col.contentWidth) {
											var width = '' + col.contentWidth;
											style.minWidth = WIDTH_NUMBER_REGEX.test(width) ? width + 'px' : width;
										}
	
										return _react2.default.createElement(
											_Th2.default,
											{
												key: j, width: col.width,
												'data-col': col, onClick: _this2.doSort,
												className: (0, _classnames2.default)({
													sortable: col.sortPath,
													up: _this2.sort.index === j && _this2.sort.asc,
													down: _this2.sort.index === j && !_this2.sort.asc
												})
											},
											_react2.default.createElement(
												'div',
												{ style: style },
												col.head || col.field
											)
										);
									})
								)
							),
							_react2.default.createElement(
								'tbody',
								null,
								_list.map(function (item, index) {
									return _react2.default.createElement(
										Tr,
										{ key: index, onClick: _this2.onRowClick, 'data-item': item, 'data-index': index },
										columns.map(function (col, j) {
											var content = void 0;
	
											var colClass = col.className,
											    colStyle = col.styleName,
											    colProps = _objectWithoutProperties(col, ['className', 'styleName']);
	
											var styleProps = {};
											var value = (0, _pathUtil.getValue)(item, col.field);
	
											if (colClass) styleProps.className = colClass;
											if (colStyle) styleProps.styleName = colStyle;
	
											if (col.cell) {
												content = _react2.default.createElement(col.cell, _extends({ item: item, value: value }, colProps));
											} else if (col.render) {
												content = col.render(_extends({
													item: item,
													value: value
												}, colProps));
											} else {
												content = value;
											}
											if (col.th) {
												return _react2.default.createElement(
													'th',
													_extends({ key: j }, styleProps),
													content
												);
											}
											return _react2.default.createElement(
												'td',
												_extends({ key: j }, styleProps),
												content
											);
										})
									);
								})
							)
						)
					),
					_react2.default.createElement(
						'p',
						{ className: 'pull-left' },
						'show ',
						Math.min(len, Math.max(1, start + 1)),
						' to ',
						Math.min(len, end),
						' of ',
						len,
						' items'
					),
					_react2.default.createElement(_Pagination2.default, { count: len, size: size, page: page, range: range, gotoPage: this.gotoPage })
				);
			}
		}]);
	
		return Table;
	}(_react2.default.Component);
	
	Table.propTypes = {
		className: _react.PropTypes.string,
		sort: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.string), _react.PropTypes.object]),
		size: _react.PropTypes.number,
		range: _react.PropTypes.number,
		list: _react.PropTypes.arrayOf(_react.PropTypes.object),
		children: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.arrayOf(_react.PropTypes.element)]),
		onRowClick: _react.PropTypes.func
	};
	
	var _default = Table;
	exports.default = _default;
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(TABLE_CLASS_REGEX, 'TABLE_CLASS_REGEX', 'C:/MyGit/BDPComponent/components/SortTable/index.js');
	
		__REACT_HOT_LOADER__.register(WIDTH_NUMBER_REGEX, 'WIDTH_NUMBER_REGEX', 'C:/MyGit/BDPComponent/components/SortTable/index.js');
	
		__REACT_HOT_LOADER__.register(Tr, 'Tr', 'C:/MyGit/BDPComponent/components/SortTable/index.js');
	
		__REACT_HOT_LOADER__.register(pathToArray, 'pathToArray', 'C:/MyGit/BDPComponent/components/SortTable/index.js');
	
		__REACT_HOT_LOADER__.register(arrayLike, 'arrayLike', 'C:/MyGit/BDPComponent/components/SortTable/index.js');
	
		__REACT_HOT_LOADER__.register(getSortConfig, 'getSortConfig', 'C:/MyGit/BDPComponent/components/SortTable/index.js');
	
		__REACT_HOT_LOADER__.register(Table, 'Table', 'C:/MyGit/BDPComponent/components/SortTable/index.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/components/SortTable/index.js');
	}();

	;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _index = __webpack_require__(22);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var TypeAheadInput = (0, _index2.default)(function (_ref) {
		var props = _objectWithoutProperties(_ref, []);
	
		return _react2.default.createElement('input', _extends({ type: 'text', className: 'form-control' }, props));
	});
	
	TypeAheadInput.propTypes = {
		queryFunc: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.array]).isRequired,
		value: _react.PropTypes.string,
		onChange: _react.PropTypes.func,
		onSelectValue: _react.PropTypes.func
	};
	
	var _default = TypeAheadInput;
	exports.default = _default;
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(TypeAheadInput, 'TypeAheadInput', 'C:/MyGit/BDPComponent/components/Typeahead/TypeAheadInput.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/components/Typeahead/TypeAheadInput.js');
	}();

	;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _PropsComponent = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var Li = (0, _PropsComponent.withProps)(function (_ref) {
		var children = _ref.children,
		    props = _objectWithoutProperties(_ref, ['children']);
	
		return _react2.default.createElement(
			'li',
			props,
			children
		);
	});
	
	Li.propTypes = {
		children: _react.PropTypes.node
	};
	
	var _default = function _default(Component, queryFunction) {
		var TypeAhead = function (_React$Component) {
			_inherits(TypeAhead, _React$Component);
	
			function TypeAhead() {
				_classCallCheck(this, TypeAhead);
	
				var _this = _possibleConstructorReturn(this, (TypeAhead.__proto__ || Object.getPrototypeOf(TypeAhead)).call(this));
	
				_this.state = {
					selected: 0,
					show: false
				};
				_this.prevValue = null;
				_this.cacheList = [];
				_this.latestPromise = null;
	
				_this.onKeyDown = _this.onKeyDown.bind(_this);
				_this.onBlur = _this.onBlur.bind(_this);
				_this.onOptionSelect = _this.onOptionSelect.bind(_this);
				_this.updateValue = _this.updateValue.bind(_this);
				_this.getList = _this.getList.bind(_this);
				return _this;
			}
	
			_createClass(TypeAhead, [{
				key: 'onKeyDown',
				value: function onKeyDown(event) {
					var onKeyDown = this.props.onKeyDown;
	
	
					if (event.keyCode === 38) {
						this.setSelect(-1);
					} else if (event.keyCode === 40) {
						this.setSelect(1);
					} else if (event.keyCode === 13) {
						var selected = this.state.selected;
	
						var list = this.getList();
						var option = list[selected];
						if (option) {
							this.updateValue(typeof option === 'string' ? option : option.value);
						}
					} else {
						this.setState({ show: true });
					}
	
					if (onKeyDown) onKeyDown(event);
				}
			}, {
				key: 'onBlur',
				value: function onBlur() {
					this.setState({ show: false });
				}
			}, {
				key: 'onOptionSelect',
				value: function onOptionSelect(event, props) {
					var value = props['data-value'];
					this.updateValue(value);
				}
			}, {
				key: 'setSelect',
				value: function setSelect(value) {
					var selected = this.state.selected;
	
					var len = this.getList().length;
					this.setState({
						selected: (selected + value + len) % len
					});
				}
			}, {
				key: 'getList',
				value: function getList() {
					var _this2 = this;
	
					var _props = this.props,
					    value = _props.value,
					    queryFunc = _props.queryFunc;
	
					if (this.prevValue !== value) {
						var func = queryFunc || queryFunction;
						if (!func) {
							// No function provided
							this.cacheList = [];
							this.state.selected = 0;
							console.warn('\'queryFunc\' is empty!');
						} else if (Array.isArray(func)) {
							// If is Array, query inline
							var queryStr = String(value).toUpperCase();
	
							this.latestPromise = null;
							this.state.selected = 0;
							this.cacheList = func.filter(function (option) {
								var optionEntity = typeof option === 'string' ? { value: option } : option;
								return String(optionEntity.item || '').toUpperCase().indexOf(queryStr) >= 0 || String(optionEntity.description || '').toUpperCase().indexOf(queryStr) >= 0 || String(optionEntity.value || '').toUpperCase().indexOf(queryStr) >= 0;
							});
						} else if (typeof func === 'function') {
							// Call provided function. Support promise result
							var result = func(value) || [];
							if (result.then) {
								this.latestPromise = result;
								result.then(function (list) {
									if (_this2.latestPromise !== result) return;
	
									_this2.cacheList = list;
									_this2.state.selected = 0;
									_this2.forceUpdate();
								});
							} else {
								this.latestPromise = null;
								this.cacheList = result;
								this.state.selected = 0;
							}
						} else {
							// Type not support
							console.error('`queryFunc` type not support:', typeof queryFunc === 'undefined' ? 'undefined' : _typeof(queryFunc), queryFunc);
						}
						this.prevValue = value;
					}
					return this.cacheList;
				}
			}, {
				key: 'updateValue',
				value: function updateValue(value) {
					var _props2 = this.props,
					    onChange = _props2.onChange,
					    onSelectValue = _props2.onSelectValue;
	
					var mockEvent = {
						type: 'change',
						target: {
							value: value
						}
					};
					if (onChange) onChange(mockEvent);
					if (onSelectValue) onSelectValue(value);
					this.setState({ show: false });
				}
			}, {
				key: 'render',
				value: function render() {
					var _this3 = this;
	
					var list = this.getList();
					var _state = this.state,
					    selected = _state.selected,
					    show = _state.show;
	
					var props = Object.assign({}, this.props);
					delete props.queryFunc;
					delete props.onSelectValue;
	
					return _react2.default.createElement(
						'div',
						{ className: 'typeAhead clearfix' },
						_react2.default.createElement(Component, _extends({}, props, {
							onKeyDown: this.onKeyDown,
							onBlur: this.onBlur
						})),
						show && list.length ? _react2.default.createElement(
							'ul',
							{ className: 'typeAhead-list' },
							list.map(function (option, index) {
								var optionEntity = typeof option === 'string' ? { value: option } : option;
	
								return _react2.default.createElement(
									Li,
									{
										key: index, role: 'button', 'data-value': optionEntity.value,
										className: index === selected && 'active',
										onMouseDown: _this3.onOptionSelect
									},
									optionEntity.item || optionEntity.description || optionEntity.value
								);
							})
						) : null
					);
				}
			}]);
	
			return TypeAhead;
		}(_react2.default.Component);
	
		TypeAhead.propTypes = {
			value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
			queryFunc: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.array]),
			onChange: _react.PropTypes.func,
			onSelectValue: _react.PropTypes.func,
			onKeyDown: _react.PropTypes.func
		};
	
		return TypeAhead;
	};
	
	exports.default = _default;
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(Li, 'Li', 'C:/MyGit/BDPComponent/components/Typeahead/index.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/components/Typeahead/index.js');
	}();

	;

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var APP_UPDATE_FILTER = exports.APP_UPDATE_FILTER = 'APP_UPDATE_FILTER';
	
	var updateFilter = exports.updateFilter = function updateFilter(filter) {
		return {
			type: APP_UPDATE_FILTER,
			filter: filter
		};
	};
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(APP_UPDATE_FILTER, 'APP_UPDATE_FILTER', 'C:/MyGit/BDPComponent/src/actions/app.js');
	
		__REACT_HOT_LOADER__.register(updateFilter, 'updateFilter', 'C:/MyGit/BDPComponent/src/actions/app.js');
	}();

	;

/***/ },
/* 24 */
/***/ function(module, exports) {

	var ENTITIES = [['Aacute', [193]], ['aacute', [225]], ['Abreve', [258]], ['abreve', [259]], ['ac', [8766]], ['acd', [8767]], ['acE', [8766, 819]], ['Acirc', [194]], ['acirc', [226]], ['acute', [180]], ['Acy', [1040]], ['acy', [1072]], ['AElig', [198]], ['aelig', [230]], ['af', [8289]], ['Afr', [120068]], ['afr', [120094]], ['Agrave', [192]], ['agrave', [224]], ['alefsym', [8501]], ['aleph', [8501]], ['Alpha', [913]], ['alpha', [945]], ['Amacr', [256]], ['amacr', [257]], ['amalg', [10815]], ['amp', [38]], ['AMP', [38]], ['andand', [10837]], ['And', [10835]], ['and', [8743]], ['andd', [10844]], ['andslope', [10840]], ['andv', [10842]], ['ang', [8736]], ['ange', [10660]], ['angle', [8736]], ['angmsdaa', [10664]], ['angmsdab', [10665]], ['angmsdac', [10666]], ['angmsdad', [10667]], ['angmsdae', [10668]], ['angmsdaf', [10669]], ['angmsdag', [10670]], ['angmsdah', [10671]], ['angmsd', [8737]], ['angrt', [8735]], ['angrtvb', [8894]], ['angrtvbd', [10653]], ['angsph', [8738]], ['angst', [197]], ['angzarr', [9084]], ['Aogon', [260]], ['aogon', [261]], ['Aopf', [120120]], ['aopf', [120146]], ['apacir', [10863]], ['ap', [8776]], ['apE', [10864]], ['ape', [8778]], ['apid', [8779]], ['apos', [39]], ['ApplyFunction', [8289]], ['approx', [8776]], ['approxeq', [8778]], ['Aring', [197]], ['aring', [229]], ['Ascr', [119964]], ['ascr', [119990]], ['Assign', [8788]], ['ast', [42]], ['asymp', [8776]], ['asympeq', [8781]], ['Atilde', [195]], ['atilde', [227]], ['Auml', [196]], ['auml', [228]], ['awconint', [8755]], ['awint', [10769]], ['backcong', [8780]], ['backepsilon', [1014]], ['backprime', [8245]], ['backsim', [8765]], ['backsimeq', [8909]], ['Backslash', [8726]], ['Barv', [10983]], ['barvee', [8893]], ['barwed', [8965]], ['Barwed', [8966]], ['barwedge', [8965]], ['bbrk', [9141]], ['bbrktbrk', [9142]], ['bcong', [8780]], ['Bcy', [1041]], ['bcy', [1073]], ['bdquo', [8222]], ['becaus', [8757]], ['because', [8757]], ['Because', [8757]], ['bemptyv', [10672]], ['bepsi', [1014]], ['bernou', [8492]], ['Bernoullis', [8492]], ['Beta', [914]], ['beta', [946]], ['beth', [8502]], ['between', [8812]], ['Bfr', [120069]], ['bfr', [120095]], ['bigcap', [8898]], ['bigcirc', [9711]], ['bigcup', [8899]], ['bigodot', [10752]], ['bigoplus', [10753]], ['bigotimes', [10754]], ['bigsqcup', [10758]], ['bigstar', [9733]], ['bigtriangledown', [9661]], ['bigtriangleup', [9651]], ['biguplus', [10756]], ['bigvee', [8897]], ['bigwedge', [8896]], ['bkarow', [10509]], ['blacklozenge', [10731]], ['blacksquare', [9642]], ['blacktriangle', [9652]], ['blacktriangledown', [9662]], ['blacktriangleleft', [9666]], ['blacktriangleright', [9656]], ['blank', [9251]], ['blk12', [9618]], ['blk14', [9617]], ['blk34', [9619]], ['block', [9608]], ['bne', [61, 8421]], ['bnequiv', [8801, 8421]], ['bNot', [10989]], ['bnot', [8976]], ['Bopf', [120121]], ['bopf', [120147]], ['bot', [8869]], ['bottom', [8869]], ['bowtie', [8904]], ['boxbox', [10697]], ['boxdl', [9488]], ['boxdL', [9557]], ['boxDl', [9558]], ['boxDL', [9559]], ['boxdr', [9484]], ['boxdR', [9554]], ['boxDr', [9555]], ['boxDR', [9556]], ['boxh', [9472]], ['boxH', [9552]], ['boxhd', [9516]], ['boxHd', [9572]], ['boxhD', [9573]], ['boxHD', [9574]], ['boxhu', [9524]], ['boxHu', [9575]], ['boxhU', [9576]], ['boxHU', [9577]], ['boxminus', [8863]], ['boxplus', [8862]], ['boxtimes', [8864]], ['boxul', [9496]], ['boxuL', [9563]], ['boxUl', [9564]], ['boxUL', [9565]], ['boxur', [9492]], ['boxuR', [9560]], ['boxUr', [9561]], ['boxUR', [9562]], ['boxv', [9474]], ['boxV', [9553]], ['boxvh', [9532]], ['boxvH', [9578]], ['boxVh', [9579]], ['boxVH', [9580]], ['boxvl', [9508]], ['boxvL', [9569]], ['boxVl', [9570]], ['boxVL', [9571]], ['boxvr', [9500]], ['boxvR', [9566]], ['boxVr', [9567]], ['boxVR', [9568]], ['bprime', [8245]], ['breve', [728]], ['Breve', [728]], ['brvbar', [166]], ['bscr', [119991]], ['Bscr', [8492]], ['bsemi', [8271]], ['bsim', [8765]], ['bsime', [8909]], ['bsolb', [10693]], ['bsol', [92]], ['bsolhsub', [10184]], ['bull', [8226]], ['bullet', [8226]], ['bump', [8782]], ['bumpE', [10926]], ['bumpe', [8783]], ['Bumpeq', [8782]], ['bumpeq', [8783]], ['Cacute', [262]], ['cacute', [263]], ['capand', [10820]], ['capbrcup', [10825]], ['capcap', [10827]], ['cap', [8745]], ['Cap', [8914]], ['capcup', [10823]], ['capdot', [10816]], ['CapitalDifferentialD', [8517]], ['caps', [8745, 65024]], ['caret', [8257]], ['caron', [711]], ['Cayleys', [8493]], ['ccaps', [10829]], ['Ccaron', [268]], ['ccaron', [269]], ['Ccedil', [199]], ['ccedil', [231]], ['Ccirc', [264]], ['ccirc', [265]], ['Cconint', [8752]], ['ccups', [10828]], ['ccupssm', [10832]], ['Cdot', [266]], ['cdot', [267]], ['cedil', [184]], ['Cedilla', [184]], ['cemptyv', [10674]], ['cent', [162]], ['centerdot', [183]], ['CenterDot', [183]], ['cfr', [120096]], ['Cfr', [8493]], ['CHcy', [1063]], ['chcy', [1095]], ['check', [10003]], ['checkmark', [10003]], ['Chi', [935]], ['chi', [967]], ['circ', [710]], ['circeq', [8791]], ['circlearrowleft', [8634]], ['circlearrowright', [8635]], ['circledast', [8859]], ['circledcirc', [8858]], ['circleddash', [8861]], ['CircleDot', [8857]], ['circledR', [174]], ['circledS', [9416]], ['CircleMinus', [8854]], ['CirclePlus', [8853]], ['CircleTimes', [8855]], ['cir', [9675]], ['cirE', [10691]], ['cire', [8791]], ['cirfnint', [10768]], ['cirmid', [10991]], ['cirscir', [10690]], ['ClockwiseContourIntegral', [8754]], ['CloseCurlyDoubleQuote', [8221]], ['CloseCurlyQuote', [8217]], ['clubs', [9827]], ['clubsuit', [9827]], ['colon', [58]], ['Colon', [8759]], ['Colone', [10868]], ['colone', [8788]], ['coloneq', [8788]], ['comma', [44]], ['commat', [64]], ['comp', [8705]], ['compfn', [8728]], ['complement', [8705]], ['complexes', [8450]], ['cong', [8773]], ['congdot', [10861]], ['Congruent', [8801]], ['conint', [8750]], ['Conint', [8751]], ['ContourIntegral', [8750]], ['copf', [120148]], ['Copf', [8450]], ['coprod', [8720]], ['Coproduct', [8720]], ['copy', [169]], ['COPY', [169]], ['copysr', [8471]], ['CounterClockwiseContourIntegral', [8755]], ['crarr', [8629]], ['cross', [10007]], ['Cross', [10799]], ['Cscr', [119966]], ['cscr', [119992]], ['csub', [10959]], ['csube', [10961]], ['csup', [10960]], ['csupe', [10962]], ['ctdot', [8943]], ['cudarrl', [10552]], ['cudarrr', [10549]], ['cuepr', [8926]], ['cuesc', [8927]], ['cularr', [8630]], ['cularrp', [10557]], ['cupbrcap', [10824]], ['cupcap', [10822]], ['CupCap', [8781]], ['cup', [8746]], ['Cup', [8915]], ['cupcup', [10826]], ['cupdot', [8845]], ['cupor', [10821]], ['cups', [8746, 65024]], ['curarr', [8631]], ['curarrm', [10556]], ['curlyeqprec', [8926]], ['curlyeqsucc', [8927]], ['curlyvee', [8910]], ['curlywedge', [8911]], ['curren', [164]], ['curvearrowleft', [8630]], ['curvearrowright', [8631]], ['cuvee', [8910]], ['cuwed', [8911]], ['cwconint', [8754]], ['cwint', [8753]], ['cylcty', [9005]], ['dagger', [8224]], ['Dagger', [8225]], ['daleth', [8504]], ['darr', [8595]], ['Darr', [8609]], ['dArr', [8659]], ['dash', [8208]], ['Dashv', [10980]], ['dashv', [8867]], ['dbkarow', [10511]], ['dblac', [733]], ['Dcaron', [270]], ['dcaron', [271]], ['Dcy', [1044]], ['dcy', [1076]], ['ddagger', [8225]], ['ddarr', [8650]], ['DD', [8517]], ['dd', [8518]], ['DDotrahd', [10513]], ['ddotseq', [10871]], ['deg', [176]], ['Del', [8711]], ['Delta', [916]], ['delta', [948]], ['demptyv', [10673]], ['dfisht', [10623]], ['Dfr', [120071]], ['dfr', [120097]], ['dHar', [10597]], ['dharl', [8643]], ['dharr', [8642]], ['DiacriticalAcute', [180]], ['DiacriticalDot', [729]], ['DiacriticalDoubleAcute', [733]], ['DiacriticalGrave', [96]], ['DiacriticalTilde', [732]], ['diam', [8900]], ['diamond', [8900]], ['Diamond', [8900]], ['diamondsuit', [9830]], ['diams', [9830]], ['die', [168]], ['DifferentialD', [8518]], ['digamma', [989]], ['disin', [8946]], ['div', [247]], ['divide', [247]], ['divideontimes', [8903]], ['divonx', [8903]], ['DJcy', [1026]], ['djcy', [1106]], ['dlcorn', [8990]], ['dlcrop', [8973]], ['dollar', [36]], ['Dopf', [120123]], ['dopf', [120149]], ['Dot', [168]], ['dot', [729]], ['DotDot', [8412]], ['doteq', [8784]], ['doteqdot', [8785]], ['DotEqual', [8784]], ['dotminus', [8760]], ['dotplus', [8724]], ['dotsquare', [8865]], ['doublebarwedge', [8966]], ['DoubleContourIntegral', [8751]], ['DoubleDot', [168]], ['DoubleDownArrow', [8659]], ['DoubleLeftArrow', [8656]], ['DoubleLeftRightArrow', [8660]], ['DoubleLeftTee', [10980]], ['DoubleLongLeftArrow', [10232]], ['DoubleLongLeftRightArrow', [10234]], ['DoubleLongRightArrow', [10233]], ['DoubleRightArrow', [8658]], ['DoubleRightTee', [8872]], ['DoubleUpArrow', [8657]], ['DoubleUpDownArrow', [8661]], ['DoubleVerticalBar', [8741]], ['DownArrowBar', [10515]], ['downarrow', [8595]], ['DownArrow', [8595]], ['Downarrow', [8659]], ['DownArrowUpArrow', [8693]], ['DownBreve', [785]], ['downdownarrows', [8650]], ['downharpoonleft', [8643]], ['downharpoonright', [8642]], ['DownLeftRightVector', [10576]], ['DownLeftTeeVector', [10590]], ['DownLeftVectorBar', [10582]], ['DownLeftVector', [8637]], ['DownRightTeeVector', [10591]], ['DownRightVectorBar', [10583]], ['DownRightVector', [8641]], ['DownTeeArrow', [8615]], ['DownTee', [8868]], ['drbkarow', [10512]], ['drcorn', [8991]], ['drcrop', [8972]], ['Dscr', [119967]], ['dscr', [119993]], ['DScy', [1029]], ['dscy', [1109]], ['dsol', [10742]], ['Dstrok', [272]], ['dstrok', [273]], ['dtdot', [8945]], ['dtri', [9663]], ['dtrif', [9662]], ['duarr', [8693]], ['duhar', [10607]], ['dwangle', [10662]], ['DZcy', [1039]], ['dzcy', [1119]], ['dzigrarr', [10239]], ['Eacute', [201]], ['eacute', [233]], ['easter', [10862]], ['Ecaron', [282]], ['ecaron', [283]], ['Ecirc', [202]], ['ecirc', [234]], ['ecir', [8790]], ['ecolon', [8789]], ['Ecy', [1069]], ['ecy', [1101]], ['eDDot', [10871]], ['Edot', [278]], ['edot', [279]], ['eDot', [8785]], ['ee', [8519]], ['efDot', [8786]], ['Efr', [120072]], ['efr', [120098]], ['eg', [10906]], ['Egrave', [200]], ['egrave', [232]], ['egs', [10902]], ['egsdot', [10904]], ['el', [10905]], ['Element', [8712]], ['elinters', [9191]], ['ell', [8467]], ['els', [10901]], ['elsdot', [10903]], ['Emacr', [274]], ['emacr', [275]], ['empty', [8709]], ['emptyset', [8709]], ['EmptySmallSquare', [9723]], ['emptyv', [8709]], ['EmptyVerySmallSquare', [9643]], ['emsp13', [8196]], ['emsp14', [8197]], ['emsp', [8195]], ['ENG', [330]], ['eng', [331]], ['ensp', [8194]], ['Eogon', [280]], ['eogon', [281]], ['Eopf', [120124]], ['eopf', [120150]], ['epar', [8917]], ['eparsl', [10723]], ['eplus', [10865]], ['epsi', [949]], ['Epsilon', [917]], ['epsilon', [949]], ['epsiv', [1013]], ['eqcirc', [8790]], ['eqcolon', [8789]], ['eqsim', [8770]], ['eqslantgtr', [10902]], ['eqslantless', [10901]], ['Equal', [10869]], ['equals', [61]], ['EqualTilde', [8770]], ['equest', [8799]], ['Equilibrium', [8652]], ['equiv', [8801]], ['equivDD', [10872]], ['eqvparsl', [10725]], ['erarr', [10609]], ['erDot', [8787]], ['escr', [8495]], ['Escr', [8496]], ['esdot', [8784]], ['Esim', [10867]], ['esim', [8770]], ['Eta', [919]], ['eta', [951]], ['ETH', [208]], ['eth', [240]], ['Euml', [203]], ['euml', [235]], ['euro', [8364]], ['excl', [33]], ['exist', [8707]], ['Exists', [8707]], ['expectation', [8496]], ['exponentiale', [8519]], ['ExponentialE', [8519]], ['fallingdotseq', [8786]], ['Fcy', [1060]], ['fcy', [1092]], ['female', [9792]], ['ffilig', [64259]], ['fflig', [64256]], ['ffllig', [64260]], ['Ffr', [120073]], ['ffr', [120099]], ['filig', [64257]], ['FilledSmallSquare', [9724]], ['FilledVerySmallSquare', [9642]], ['fjlig', [102, 106]], ['flat', [9837]], ['fllig', [64258]], ['fltns', [9649]], ['fnof', [402]], ['Fopf', [120125]], ['fopf', [120151]], ['forall', [8704]], ['ForAll', [8704]], ['fork', [8916]], ['forkv', [10969]], ['Fouriertrf', [8497]], ['fpartint', [10765]], ['frac12', [189]], ['frac13', [8531]], ['frac14', [188]], ['frac15', [8533]], ['frac16', [8537]], ['frac18', [8539]], ['frac23', [8532]], ['frac25', [8534]], ['frac34', [190]], ['frac35', [8535]], ['frac38', [8540]], ['frac45', [8536]], ['frac56', [8538]], ['frac58', [8541]], ['frac78', [8542]], ['frasl', [8260]], ['frown', [8994]], ['fscr', [119995]], ['Fscr', [8497]], ['gacute', [501]], ['Gamma', [915]], ['gamma', [947]], ['Gammad', [988]], ['gammad', [989]], ['gap', [10886]], ['Gbreve', [286]], ['gbreve', [287]], ['Gcedil', [290]], ['Gcirc', [284]], ['gcirc', [285]], ['Gcy', [1043]], ['gcy', [1075]], ['Gdot', [288]], ['gdot', [289]], ['ge', [8805]], ['gE', [8807]], ['gEl', [10892]], ['gel', [8923]], ['geq', [8805]], ['geqq', [8807]], ['geqslant', [10878]], ['gescc', [10921]], ['ges', [10878]], ['gesdot', [10880]], ['gesdoto', [10882]], ['gesdotol', [10884]], ['gesl', [8923, 65024]], ['gesles', [10900]], ['Gfr', [120074]], ['gfr', [120100]], ['gg', [8811]], ['Gg', [8921]], ['ggg', [8921]], ['gimel', [8503]], ['GJcy', [1027]], ['gjcy', [1107]], ['gla', [10917]], ['gl', [8823]], ['glE', [10898]], ['glj', [10916]], ['gnap', [10890]], ['gnapprox', [10890]], ['gne', [10888]], ['gnE', [8809]], ['gneq', [10888]], ['gneqq', [8809]], ['gnsim', [8935]], ['Gopf', [120126]], ['gopf', [120152]], ['grave', [96]], ['GreaterEqual', [8805]], ['GreaterEqualLess', [8923]], ['GreaterFullEqual', [8807]], ['GreaterGreater', [10914]], ['GreaterLess', [8823]], ['GreaterSlantEqual', [10878]], ['GreaterTilde', [8819]], ['Gscr', [119970]], ['gscr', [8458]], ['gsim', [8819]], ['gsime', [10894]], ['gsiml', [10896]], ['gtcc', [10919]], ['gtcir', [10874]], ['gt', [62]], ['GT', [62]], ['Gt', [8811]], ['gtdot', [8919]], ['gtlPar', [10645]], ['gtquest', [10876]], ['gtrapprox', [10886]], ['gtrarr', [10616]], ['gtrdot', [8919]], ['gtreqless', [8923]], ['gtreqqless', [10892]], ['gtrless', [8823]], ['gtrsim', [8819]], ['gvertneqq', [8809, 65024]], ['gvnE', [8809, 65024]], ['Hacek', [711]], ['hairsp', [8202]], ['half', [189]], ['hamilt', [8459]], ['HARDcy', [1066]], ['hardcy', [1098]], ['harrcir', [10568]], ['harr', [8596]], ['hArr', [8660]], ['harrw', [8621]], ['Hat', [94]], ['hbar', [8463]], ['Hcirc', [292]], ['hcirc', [293]], ['hearts', [9829]], ['heartsuit', [9829]], ['hellip', [8230]], ['hercon', [8889]], ['hfr', [120101]], ['Hfr', [8460]], ['HilbertSpace', [8459]], ['hksearow', [10533]], ['hkswarow', [10534]], ['hoarr', [8703]], ['homtht', [8763]], ['hookleftarrow', [8617]], ['hookrightarrow', [8618]], ['hopf', [120153]], ['Hopf', [8461]], ['horbar', [8213]], ['HorizontalLine', [9472]], ['hscr', [119997]], ['Hscr', [8459]], ['hslash', [8463]], ['Hstrok', [294]], ['hstrok', [295]], ['HumpDownHump', [8782]], ['HumpEqual', [8783]], ['hybull', [8259]], ['hyphen', [8208]], ['Iacute', [205]], ['iacute', [237]], ['ic', [8291]], ['Icirc', [206]], ['icirc', [238]], ['Icy', [1048]], ['icy', [1080]], ['Idot', [304]], ['IEcy', [1045]], ['iecy', [1077]], ['iexcl', [161]], ['iff', [8660]], ['ifr', [120102]], ['Ifr', [8465]], ['Igrave', [204]], ['igrave', [236]], ['ii', [8520]], ['iiiint', [10764]], ['iiint', [8749]], ['iinfin', [10716]], ['iiota', [8489]], ['IJlig', [306]], ['ijlig', [307]], ['Imacr', [298]], ['imacr', [299]], ['image', [8465]], ['ImaginaryI', [8520]], ['imagline', [8464]], ['imagpart', [8465]], ['imath', [305]], ['Im', [8465]], ['imof', [8887]], ['imped', [437]], ['Implies', [8658]], ['incare', [8453]], ['in', [8712]], ['infin', [8734]], ['infintie', [10717]], ['inodot', [305]], ['intcal', [8890]], ['int', [8747]], ['Int', [8748]], ['integers', [8484]], ['Integral', [8747]], ['intercal', [8890]], ['Intersection', [8898]], ['intlarhk', [10775]], ['intprod', [10812]], ['InvisibleComma', [8291]], ['InvisibleTimes', [8290]], ['IOcy', [1025]], ['iocy', [1105]], ['Iogon', [302]], ['iogon', [303]], ['Iopf', [120128]], ['iopf', [120154]], ['Iota', [921]], ['iota', [953]], ['iprod', [10812]], ['iquest', [191]], ['iscr', [119998]], ['Iscr', [8464]], ['isin', [8712]], ['isindot', [8949]], ['isinE', [8953]], ['isins', [8948]], ['isinsv', [8947]], ['isinv', [8712]], ['it', [8290]], ['Itilde', [296]], ['itilde', [297]], ['Iukcy', [1030]], ['iukcy', [1110]], ['Iuml', [207]], ['iuml', [239]], ['Jcirc', [308]], ['jcirc', [309]], ['Jcy', [1049]], ['jcy', [1081]], ['Jfr', [120077]], ['jfr', [120103]], ['jmath', [567]], ['Jopf', [120129]], ['jopf', [120155]], ['Jscr', [119973]], ['jscr', [119999]], ['Jsercy', [1032]], ['jsercy', [1112]], ['Jukcy', [1028]], ['jukcy', [1108]], ['Kappa', [922]], ['kappa', [954]], ['kappav', [1008]], ['Kcedil', [310]], ['kcedil', [311]], ['Kcy', [1050]], ['kcy', [1082]], ['Kfr', [120078]], ['kfr', [120104]], ['kgreen', [312]], ['KHcy', [1061]], ['khcy', [1093]], ['KJcy', [1036]], ['kjcy', [1116]], ['Kopf', [120130]], ['kopf', [120156]], ['Kscr', [119974]], ['kscr', [120000]], ['lAarr', [8666]], ['Lacute', [313]], ['lacute', [314]], ['laemptyv', [10676]], ['lagran', [8466]], ['Lambda', [923]], ['lambda', [955]], ['lang', [10216]], ['Lang', [10218]], ['langd', [10641]], ['langle', [10216]], ['lap', [10885]], ['Laplacetrf', [8466]], ['laquo', [171]], ['larrb', [8676]], ['larrbfs', [10527]], ['larr', [8592]], ['Larr', [8606]], ['lArr', [8656]], ['larrfs', [10525]], ['larrhk', [8617]], ['larrlp', [8619]], ['larrpl', [10553]], ['larrsim', [10611]], ['larrtl', [8610]], ['latail', [10521]], ['lAtail', [10523]], ['lat', [10923]], ['late', [10925]], ['lates', [10925, 65024]], ['lbarr', [10508]], ['lBarr', [10510]], ['lbbrk', [10098]], ['lbrace', [123]], ['lbrack', [91]], ['lbrke', [10635]], ['lbrksld', [10639]], ['lbrkslu', [10637]], ['Lcaron', [317]], ['lcaron', [318]], ['Lcedil', [315]], ['lcedil', [316]], ['lceil', [8968]], ['lcub', [123]], ['Lcy', [1051]], ['lcy', [1083]], ['ldca', [10550]], ['ldquo', [8220]], ['ldquor', [8222]], ['ldrdhar', [10599]], ['ldrushar', [10571]], ['ldsh', [8626]], ['le', [8804]], ['lE', [8806]], ['LeftAngleBracket', [10216]], ['LeftArrowBar', [8676]], ['leftarrow', [8592]], ['LeftArrow', [8592]], ['Leftarrow', [8656]], ['LeftArrowRightArrow', [8646]], ['leftarrowtail', [8610]], ['LeftCeiling', [8968]], ['LeftDoubleBracket', [10214]], ['LeftDownTeeVector', [10593]], ['LeftDownVectorBar', [10585]], ['LeftDownVector', [8643]], ['LeftFloor', [8970]], ['leftharpoondown', [8637]], ['leftharpoonup', [8636]], ['leftleftarrows', [8647]], ['leftrightarrow', [8596]], ['LeftRightArrow', [8596]], ['Leftrightarrow', [8660]], ['leftrightarrows', [8646]], ['leftrightharpoons', [8651]], ['leftrightsquigarrow', [8621]], ['LeftRightVector', [10574]], ['LeftTeeArrow', [8612]], ['LeftTee', [8867]], ['LeftTeeVector', [10586]], ['leftthreetimes', [8907]], ['LeftTriangleBar', [10703]], ['LeftTriangle', [8882]], ['LeftTriangleEqual', [8884]], ['LeftUpDownVector', [10577]], ['LeftUpTeeVector', [10592]], ['LeftUpVectorBar', [10584]], ['LeftUpVector', [8639]], ['LeftVectorBar', [10578]], ['LeftVector', [8636]], ['lEg', [10891]], ['leg', [8922]], ['leq', [8804]], ['leqq', [8806]], ['leqslant', [10877]], ['lescc', [10920]], ['les', [10877]], ['lesdot', [10879]], ['lesdoto', [10881]], ['lesdotor', [10883]], ['lesg', [8922, 65024]], ['lesges', [10899]], ['lessapprox', [10885]], ['lessdot', [8918]], ['lesseqgtr', [8922]], ['lesseqqgtr', [10891]], ['LessEqualGreater', [8922]], ['LessFullEqual', [8806]], ['LessGreater', [8822]], ['lessgtr', [8822]], ['LessLess', [10913]], ['lesssim', [8818]], ['LessSlantEqual', [10877]], ['LessTilde', [8818]], ['lfisht', [10620]], ['lfloor', [8970]], ['Lfr', [120079]], ['lfr', [120105]], ['lg', [8822]], ['lgE', [10897]], ['lHar', [10594]], ['lhard', [8637]], ['lharu', [8636]], ['lharul', [10602]], ['lhblk', [9604]], ['LJcy', [1033]], ['ljcy', [1113]], ['llarr', [8647]], ['ll', [8810]], ['Ll', [8920]], ['llcorner', [8990]], ['Lleftarrow', [8666]], ['llhard', [10603]], ['lltri', [9722]], ['Lmidot', [319]], ['lmidot', [320]], ['lmoustache', [9136]], ['lmoust', [9136]], ['lnap', [10889]], ['lnapprox', [10889]], ['lne', [10887]], ['lnE', [8808]], ['lneq', [10887]], ['lneqq', [8808]], ['lnsim', [8934]], ['loang', [10220]], ['loarr', [8701]], ['lobrk', [10214]], ['longleftarrow', [10229]], ['LongLeftArrow', [10229]], ['Longleftarrow', [10232]], ['longleftrightarrow', [10231]], ['LongLeftRightArrow', [10231]], ['Longleftrightarrow', [10234]], ['longmapsto', [10236]], ['longrightarrow', [10230]], ['LongRightArrow', [10230]], ['Longrightarrow', [10233]], ['looparrowleft', [8619]], ['looparrowright', [8620]], ['lopar', [10629]], ['Lopf', [120131]], ['lopf', [120157]], ['loplus', [10797]], ['lotimes', [10804]], ['lowast', [8727]], ['lowbar', [95]], ['LowerLeftArrow', [8601]], ['LowerRightArrow', [8600]], ['loz', [9674]], ['lozenge', [9674]], ['lozf', [10731]], ['lpar', [40]], ['lparlt', [10643]], ['lrarr', [8646]], ['lrcorner', [8991]], ['lrhar', [8651]], ['lrhard', [10605]], ['lrm', [8206]], ['lrtri', [8895]], ['lsaquo', [8249]], ['lscr', [120001]], ['Lscr', [8466]], ['lsh', [8624]], ['Lsh', [8624]], ['lsim', [8818]], ['lsime', [10893]], ['lsimg', [10895]], ['lsqb', [91]], ['lsquo', [8216]], ['lsquor', [8218]], ['Lstrok', [321]], ['lstrok', [322]], ['ltcc', [10918]], ['ltcir', [10873]], ['lt', [60]], ['LT', [60]], ['Lt', [8810]], ['ltdot', [8918]], ['lthree', [8907]], ['ltimes', [8905]], ['ltlarr', [10614]], ['ltquest', [10875]], ['ltri', [9667]], ['ltrie', [8884]], ['ltrif', [9666]], ['ltrPar', [10646]], ['lurdshar', [10570]], ['luruhar', [10598]], ['lvertneqq', [8808, 65024]], ['lvnE', [8808, 65024]], ['macr', [175]], ['male', [9794]], ['malt', [10016]], ['maltese', [10016]], ['Map', [10501]], ['map', [8614]], ['mapsto', [8614]], ['mapstodown', [8615]], ['mapstoleft', [8612]], ['mapstoup', [8613]], ['marker', [9646]], ['mcomma', [10793]], ['Mcy', [1052]], ['mcy', [1084]], ['mdash', [8212]], ['mDDot', [8762]], ['measuredangle', [8737]], ['MediumSpace', [8287]], ['Mellintrf', [8499]], ['Mfr', [120080]], ['mfr', [120106]], ['mho', [8487]], ['micro', [181]], ['midast', [42]], ['midcir', [10992]], ['mid', [8739]], ['middot', [183]], ['minusb', [8863]], ['minus', [8722]], ['minusd', [8760]], ['minusdu', [10794]], ['MinusPlus', [8723]], ['mlcp', [10971]], ['mldr', [8230]], ['mnplus', [8723]], ['models', [8871]], ['Mopf', [120132]], ['mopf', [120158]], ['mp', [8723]], ['mscr', [120002]], ['Mscr', [8499]], ['mstpos', [8766]], ['Mu', [924]], ['mu', [956]], ['multimap', [8888]], ['mumap', [8888]], ['nabla', [8711]], ['Nacute', [323]], ['nacute', [324]], ['nang', [8736, 8402]], ['nap', [8777]], ['napE', [10864, 824]], ['napid', [8779, 824]], ['napos', [329]], ['napprox', [8777]], ['natural', [9838]], ['naturals', [8469]], ['natur', [9838]], ['nbsp', [160]], ['nbump', [8782, 824]], ['nbumpe', [8783, 824]], ['ncap', [10819]], ['Ncaron', [327]], ['ncaron', [328]], ['Ncedil', [325]], ['ncedil', [326]], ['ncong', [8775]], ['ncongdot', [10861, 824]], ['ncup', [10818]], ['Ncy', [1053]], ['ncy', [1085]], ['ndash', [8211]], ['nearhk', [10532]], ['nearr', [8599]], ['neArr', [8663]], ['nearrow', [8599]], ['ne', [8800]], ['nedot', [8784, 824]], ['NegativeMediumSpace', [8203]], ['NegativeThickSpace', [8203]], ['NegativeThinSpace', [8203]], ['NegativeVeryThinSpace', [8203]], ['nequiv', [8802]], ['nesear', [10536]], ['nesim', [8770, 824]], ['NestedGreaterGreater', [8811]], ['NestedLessLess', [8810]], ['nexist', [8708]], ['nexists', [8708]], ['Nfr', [120081]], ['nfr', [120107]], ['ngE', [8807, 824]], ['nge', [8817]], ['ngeq', [8817]], ['ngeqq', [8807, 824]], ['ngeqslant', [10878, 824]], ['nges', [10878, 824]], ['nGg', [8921, 824]], ['ngsim', [8821]], ['nGt', [8811, 8402]], ['ngt', [8815]], ['ngtr', [8815]], ['nGtv', [8811, 824]], ['nharr', [8622]], ['nhArr', [8654]], ['nhpar', [10994]], ['ni', [8715]], ['nis', [8956]], ['nisd', [8954]], ['niv', [8715]], ['NJcy', [1034]], ['njcy', [1114]], ['nlarr', [8602]], ['nlArr', [8653]], ['nldr', [8229]], ['nlE', [8806, 824]], ['nle', [8816]], ['nleftarrow', [8602]], ['nLeftarrow', [8653]], ['nleftrightarrow', [8622]], ['nLeftrightarrow', [8654]], ['nleq', [8816]], ['nleqq', [8806, 824]], ['nleqslant', [10877, 824]], ['nles', [10877, 824]], ['nless', [8814]], ['nLl', [8920, 824]], ['nlsim', [8820]], ['nLt', [8810, 8402]], ['nlt', [8814]], ['nltri', [8938]], ['nltrie', [8940]], ['nLtv', [8810, 824]], ['nmid', [8740]], ['NoBreak', [8288]], ['NonBreakingSpace', [160]], ['nopf', [120159]], ['Nopf', [8469]], ['Not', [10988]], ['not', [172]], ['NotCongruent', [8802]], ['NotCupCap', [8813]], ['NotDoubleVerticalBar', [8742]], ['NotElement', [8713]], ['NotEqual', [8800]], ['NotEqualTilde', [8770, 824]], ['NotExists', [8708]], ['NotGreater', [8815]], ['NotGreaterEqual', [8817]], ['NotGreaterFullEqual', [8807, 824]], ['NotGreaterGreater', [8811, 824]], ['NotGreaterLess', [8825]], ['NotGreaterSlantEqual', [10878, 824]], ['NotGreaterTilde', [8821]], ['NotHumpDownHump', [8782, 824]], ['NotHumpEqual', [8783, 824]], ['notin', [8713]], ['notindot', [8949, 824]], ['notinE', [8953, 824]], ['notinva', [8713]], ['notinvb', [8951]], ['notinvc', [8950]], ['NotLeftTriangleBar', [10703, 824]], ['NotLeftTriangle', [8938]], ['NotLeftTriangleEqual', [8940]], ['NotLess', [8814]], ['NotLessEqual', [8816]], ['NotLessGreater', [8824]], ['NotLessLess', [8810, 824]], ['NotLessSlantEqual', [10877, 824]], ['NotLessTilde', [8820]], ['NotNestedGreaterGreater', [10914, 824]], ['NotNestedLessLess', [10913, 824]], ['notni', [8716]], ['notniva', [8716]], ['notnivb', [8958]], ['notnivc', [8957]], ['NotPrecedes', [8832]], ['NotPrecedesEqual', [10927, 824]], ['NotPrecedesSlantEqual', [8928]], ['NotReverseElement', [8716]], ['NotRightTriangleBar', [10704, 824]], ['NotRightTriangle', [8939]], ['NotRightTriangleEqual', [8941]], ['NotSquareSubset', [8847, 824]], ['NotSquareSubsetEqual', [8930]], ['NotSquareSuperset', [8848, 824]], ['NotSquareSupersetEqual', [8931]], ['NotSubset', [8834, 8402]], ['NotSubsetEqual', [8840]], ['NotSucceeds', [8833]], ['NotSucceedsEqual', [10928, 824]], ['NotSucceedsSlantEqual', [8929]], ['NotSucceedsTilde', [8831, 824]], ['NotSuperset', [8835, 8402]], ['NotSupersetEqual', [8841]], ['NotTilde', [8769]], ['NotTildeEqual', [8772]], ['NotTildeFullEqual', [8775]], ['NotTildeTilde', [8777]], ['NotVerticalBar', [8740]], ['nparallel', [8742]], ['npar', [8742]], ['nparsl', [11005, 8421]], ['npart', [8706, 824]], ['npolint', [10772]], ['npr', [8832]], ['nprcue', [8928]], ['nprec', [8832]], ['npreceq', [10927, 824]], ['npre', [10927, 824]], ['nrarrc', [10547, 824]], ['nrarr', [8603]], ['nrArr', [8655]], ['nrarrw', [8605, 824]], ['nrightarrow', [8603]], ['nRightarrow', [8655]], ['nrtri', [8939]], ['nrtrie', [8941]], ['nsc', [8833]], ['nsccue', [8929]], ['nsce', [10928, 824]], ['Nscr', [119977]], ['nscr', [120003]], ['nshortmid', [8740]], ['nshortparallel', [8742]], ['nsim', [8769]], ['nsime', [8772]], ['nsimeq', [8772]], ['nsmid', [8740]], ['nspar', [8742]], ['nsqsube', [8930]], ['nsqsupe', [8931]], ['nsub', [8836]], ['nsubE', [10949, 824]], ['nsube', [8840]], ['nsubset', [8834, 8402]], ['nsubseteq', [8840]], ['nsubseteqq', [10949, 824]], ['nsucc', [8833]], ['nsucceq', [10928, 824]], ['nsup', [8837]], ['nsupE', [10950, 824]], ['nsupe', [8841]], ['nsupset', [8835, 8402]], ['nsupseteq', [8841]], ['nsupseteqq', [10950, 824]], ['ntgl', [8825]], ['Ntilde', [209]], ['ntilde', [241]], ['ntlg', [8824]], ['ntriangleleft', [8938]], ['ntrianglelefteq', [8940]], ['ntriangleright', [8939]], ['ntrianglerighteq', [8941]], ['Nu', [925]], ['nu', [957]], ['num', [35]], ['numero', [8470]], ['numsp', [8199]], ['nvap', [8781, 8402]], ['nvdash', [8876]], ['nvDash', [8877]], ['nVdash', [8878]], ['nVDash', [8879]], ['nvge', [8805, 8402]], ['nvgt', [62, 8402]], ['nvHarr', [10500]], ['nvinfin', [10718]], ['nvlArr', [10498]], ['nvle', [8804, 8402]], ['nvlt', [60, 8402]], ['nvltrie', [8884, 8402]], ['nvrArr', [10499]], ['nvrtrie', [8885, 8402]], ['nvsim', [8764, 8402]], ['nwarhk', [10531]], ['nwarr', [8598]], ['nwArr', [8662]], ['nwarrow', [8598]], ['nwnear', [10535]], ['Oacute', [211]], ['oacute', [243]], ['oast', [8859]], ['Ocirc', [212]], ['ocirc', [244]], ['ocir', [8858]], ['Ocy', [1054]], ['ocy', [1086]], ['odash', [8861]], ['Odblac', [336]], ['odblac', [337]], ['odiv', [10808]], ['odot', [8857]], ['odsold', [10684]], ['OElig', [338]], ['oelig', [339]], ['ofcir', [10687]], ['Ofr', [120082]], ['ofr', [120108]], ['ogon', [731]], ['Ograve', [210]], ['ograve', [242]], ['ogt', [10689]], ['ohbar', [10677]], ['ohm', [937]], ['oint', [8750]], ['olarr', [8634]], ['olcir', [10686]], ['olcross', [10683]], ['oline', [8254]], ['olt', [10688]], ['Omacr', [332]], ['omacr', [333]], ['Omega', [937]], ['omega', [969]], ['Omicron', [927]], ['omicron', [959]], ['omid', [10678]], ['ominus', [8854]], ['Oopf', [120134]], ['oopf', [120160]], ['opar', [10679]], ['OpenCurlyDoubleQuote', [8220]], ['OpenCurlyQuote', [8216]], ['operp', [10681]], ['oplus', [8853]], ['orarr', [8635]], ['Or', [10836]], ['or', [8744]], ['ord', [10845]], ['order', [8500]], ['orderof', [8500]], ['ordf', [170]], ['ordm', [186]], ['origof', [8886]], ['oror', [10838]], ['orslope', [10839]], ['orv', [10843]], ['oS', [9416]], ['Oscr', [119978]], ['oscr', [8500]], ['Oslash', [216]], ['oslash', [248]], ['osol', [8856]], ['Otilde', [213]], ['otilde', [245]], ['otimesas', [10806]], ['Otimes', [10807]], ['otimes', [8855]], ['Ouml', [214]], ['ouml', [246]], ['ovbar', [9021]], ['OverBar', [8254]], ['OverBrace', [9182]], ['OverBracket', [9140]], ['OverParenthesis', [9180]], ['para', [182]], ['parallel', [8741]], ['par', [8741]], ['parsim', [10995]], ['parsl', [11005]], ['part', [8706]], ['PartialD', [8706]], ['Pcy', [1055]], ['pcy', [1087]], ['percnt', [37]], ['period', [46]], ['permil', [8240]], ['perp', [8869]], ['pertenk', [8241]], ['Pfr', [120083]], ['pfr', [120109]], ['Phi', [934]], ['phi', [966]], ['phiv', [981]], ['phmmat', [8499]], ['phone', [9742]], ['Pi', [928]], ['pi', [960]], ['pitchfork', [8916]], ['piv', [982]], ['planck', [8463]], ['planckh', [8462]], ['plankv', [8463]], ['plusacir', [10787]], ['plusb', [8862]], ['pluscir', [10786]], ['plus', [43]], ['plusdo', [8724]], ['plusdu', [10789]], ['pluse', [10866]], ['PlusMinus', [177]], ['plusmn', [177]], ['plussim', [10790]], ['plustwo', [10791]], ['pm', [177]], ['Poincareplane', [8460]], ['pointint', [10773]], ['popf', [120161]], ['Popf', [8473]], ['pound', [163]], ['prap', [10935]], ['Pr', [10939]], ['pr', [8826]], ['prcue', [8828]], ['precapprox', [10935]], ['prec', [8826]], ['preccurlyeq', [8828]], ['Precedes', [8826]], ['PrecedesEqual', [10927]], ['PrecedesSlantEqual', [8828]], ['PrecedesTilde', [8830]], ['preceq', [10927]], ['precnapprox', [10937]], ['precneqq', [10933]], ['precnsim', [8936]], ['pre', [10927]], ['prE', [10931]], ['precsim', [8830]], ['prime', [8242]], ['Prime', [8243]], ['primes', [8473]], ['prnap', [10937]], ['prnE', [10933]], ['prnsim', [8936]], ['prod', [8719]], ['Product', [8719]], ['profalar', [9006]], ['profline', [8978]], ['profsurf', [8979]], ['prop', [8733]], ['Proportional', [8733]], ['Proportion', [8759]], ['propto', [8733]], ['prsim', [8830]], ['prurel', [8880]], ['Pscr', [119979]], ['pscr', [120005]], ['Psi', [936]], ['psi', [968]], ['puncsp', [8200]], ['Qfr', [120084]], ['qfr', [120110]], ['qint', [10764]], ['qopf', [120162]], ['Qopf', [8474]], ['qprime', [8279]], ['Qscr', [119980]], ['qscr', [120006]], ['quaternions', [8461]], ['quatint', [10774]], ['quest', [63]], ['questeq', [8799]], ['quot', [34]], ['QUOT', [34]], ['rAarr', [8667]], ['race', [8765, 817]], ['Racute', [340]], ['racute', [341]], ['radic', [8730]], ['raemptyv', [10675]], ['rang', [10217]], ['Rang', [10219]], ['rangd', [10642]], ['range', [10661]], ['rangle', [10217]], ['raquo', [187]], ['rarrap', [10613]], ['rarrb', [8677]], ['rarrbfs', [10528]], ['rarrc', [10547]], ['rarr', [8594]], ['Rarr', [8608]], ['rArr', [8658]], ['rarrfs', [10526]], ['rarrhk', [8618]], ['rarrlp', [8620]], ['rarrpl', [10565]], ['rarrsim', [10612]], ['Rarrtl', [10518]], ['rarrtl', [8611]], ['rarrw', [8605]], ['ratail', [10522]], ['rAtail', [10524]], ['ratio', [8758]], ['rationals', [8474]], ['rbarr', [10509]], ['rBarr', [10511]], ['RBarr', [10512]], ['rbbrk', [10099]], ['rbrace', [125]], ['rbrack', [93]], ['rbrke', [10636]], ['rbrksld', [10638]], ['rbrkslu', [10640]], ['Rcaron', [344]], ['rcaron', [345]], ['Rcedil', [342]], ['rcedil', [343]], ['rceil', [8969]], ['rcub', [125]], ['Rcy', [1056]], ['rcy', [1088]], ['rdca', [10551]], ['rdldhar', [10601]], ['rdquo', [8221]], ['rdquor', [8221]], ['rdsh', [8627]], ['real', [8476]], ['realine', [8475]], ['realpart', [8476]], ['reals', [8477]], ['Re', [8476]], ['rect', [9645]], ['reg', [174]], ['REG', [174]], ['ReverseElement', [8715]], ['ReverseEquilibrium', [8651]], ['ReverseUpEquilibrium', [10607]], ['rfisht', [10621]], ['rfloor', [8971]], ['rfr', [120111]], ['Rfr', [8476]], ['rHar', [10596]], ['rhard', [8641]], ['rharu', [8640]], ['rharul', [10604]], ['Rho', [929]], ['rho', [961]], ['rhov', [1009]], ['RightAngleBracket', [10217]], ['RightArrowBar', [8677]], ['rightarrow', [8594]], ['RightArrow', [8594]], ['Rightarrow', [8658]], ['RightArrowLeftArrow', [8644]], ['rightarrowtail', [8611]], ['RightCeiling', [8969]], ['RightDoubleBracket', [10215]], ['RightDownTeeVector', [10589]], ['RightDownVectorBar', [10581]], ['RightDownVector', [8642]], ['RightFloor', [8971]], ['rightharpoondown', [8641]], ['rightharpoonup', [8640]], ['rightleftarrows', [8644]], ['rightleftharpoons', [8652]], ['rightrightarrows', [8649]], ['rightsquigarrow', [8605]], ['RightTeeArrow', [8614]], ['RightTee', [8866]], ['RightTeeVector', [10587]], ['rightthreetimes', [8908]], ['RightTriangleBar', [10704]], ['RightTriangle', [8883]], ['RightTriangleEqual', [8885]], ['RightUpDownVector', [10575]], ['RightUpTeeVector', [10588]], ['RightUpVectorBar', [10580]], ['RightUpVector', [8638]], ['RightVectorBar', [10579]], ['RightVector', [8640]], ['ring', [730]], ['risingdotseq', [8787]], ['rlarr', [8644]], ['rlhar', [8652]], ['rlm', [8207]], ['rmoustache', [9137]], ['rmoust', [9137]], ['rnmid', [10990]], ['roang', [10221]], ['roarr', [8702]], ['robrk', [10215]], ['ropar', [10630]], ['ropf', [120163]], ['Ropf', [8477]], ['roplus', [10798]], ['rotimes', [10805]], ['RoundImplies', [10608]], ['rpar', [41]], ['rpargt', [10644]], ['rppolint', [10770]], ['rrarr', [8649]], ['Rrightarrow', [8667]], ['rsaquo', [8250]], ['rscr', [120007]], ['Rscr', [8475]], ['rsh', [8625]], ['Rsh', [8625]], ['rsqb', [93]], ['rsquo', [8217]], ['rsquor', [8217]], ['rthree', [8908]], ['rtimes', [8906]], ['rtri', [9657]], ['rtrie', [8885]], ['rtrif', [9656]], ['rtriltri', [10702]], ['RuleDelayed', [10740]], ['ruluhar', [10600]], ['rx', [8478]], ['Sacute', [346]], ['sacute', [347]], ['sbquo', [8218]], ['scap', [10936]], ['Scaron', [352]], ['scaron', [353]], ['Sc', [10940]], ['sc', [8827]], ['sccue', [8829]], ['sce', [10928]], ['scE', [10932]], ['Scedil', [350]], ['scedil', [351]], ['Scirc', [348]], ['scirc', [349]], ['scnap', [10938]], ['scnE', [10934]], ['scnsim', [8937]], ['scpolint', [10771]], ['scsim', [8831]], ['Scy', [1057]], ['scy', [1089]], ['sdotb', [8865]], ['sdot', [8901]], ['sdote', [10854]], ['searhk', [10533]], ['searr', [8600]], ['seArr', [8664]], ['searrow', [8600]], ['sect', [167]], ['semi', [59]], ['seswar', [10537]], ['setminus', [8726]], ['setmn', [8726]], ['sext', [10038]], ['Sfr', [120086]], ['sfr', [120112]], ['sfrown', [8994]], ['sharp', [9839]], ['SHCHcy', [1065]], ['shchcy', [1097]], ['SHcy', [1064]], ['shcy', [1096]], ['ShortDownArrow', [8595]], ['ShortLeftArrow', [8592]], ['shortmid', [8739]], ['shortparallel', [8741]], ['ShortRightArrow', [8594]], ['ShortUpArrow', [8593]], ['shy', [173]], ['Sigma', [931]], ['sigma', [963]], ['sigmaf', [962]], ['sigmav', [962]], ['sim', [8764]], ['simdot', [10858]], ['sime', [8771]], ['simeq', [8771]], ['simg', [10910]], ['simgE', [10912]], ['siml', [10909]], ['simlE', [10911]], ['simne', [8774]], ['simplus', [10788]], ['simrarr', [10610]], ['slarr', [8592]], ['SmallCircle', [8728]], ['smallsetminus', [8726]], ['smashp', [10803]], ['smeparsl', [10724]], ['smid', [8739]], ['smile', [8995]], ['smt', [10922]], ['smte', [10924]], ['smtes', [10924, 65024]], ['SOFTcy', [1068]], ['softcy', [1100]], ['solbar', [9023]], ['solb', [10692]], ['sol', [47]], ['Sopf', [120138]], ['sopf', [120164]], ['spades', [9824]], ['spadesuit', [9824]], ['spar', [8741]], ['sqcap', [8851]], ['sqcaps', [8851, 65024]], ['sqcup', [8852]], ['sqcups', [8852, 65024]], ['Sqrt', [8730]], ['sqsub', [8847]], ['sqsube', [8849]], ['sqsubset', [8847]], ['sqsubseteq', [8849]], ['sqsup', [8848]], ['sqsupe', [8850]], ['sqsupset', [8848]], ['sqsupseteq', [8850]], ['square', [9633]], ['Square', [9633]], ['SquareIntersection', [8851]], ['SquareSubset', [8847]], ['SquareSubsetEqual', [8849]], ['SquareSuperset', [8848]], ['SquareSupersetEqual', [8850]], ['SquareUnion', [8852]], ['squarf', [9642]], ['squ', [9633]], ['squf', [9642]], ['srarr', [8594]], ['Sscr', [119982]], ['sscr', [120008]], ['ssetmn', [8726]], ['ssmile', [8995]], ['sstarf', [8902]], ['Star', [8902]], ['star', [9734]], ['starf', [9733]], ['straightepsilon', [1013]], ['straightphi', [981]], ['strns', [175]], ['sub', [8834]], ['Sub', [8912]], ['subdot', [10941]], ['subE', [10949]], ['sube', [8838]], ['subedot', [10947]], ['submult', [10945]], ['subnE', [10955]], ['subne', [8842]], ['subplus', [10943]], ['subrarr', [10617]], ['subset', [8834]], ['Subset', [8912]], ['subseteq', [8838]], ['subseteqq', [10949]], ['SubsetEqual', [8838]], ['subsetneq', [8842]], ['subsetneqq', [10955]], ['subsim', [10951]], ['subsub', [10965]], ['subsup', [10963]], ['succapprox', [10936]], ['succ', [8827]], ['succcurlyeq', [8829]], ['Succeeds', [8827]], ['SucceedsEqual', [10928]], ['SucceedsSlantEqual', [8829]], ['SucceedsTilde', [8831]], ['succeq', [10928]], ['succnapprox', [10938]], ['succneqq', [10934]], ['succnsim', [8937]], ['succsim', [8831]], ['SuchThat', [8715]], ['sum', [8721]], ['Sum', [8721]], ['sung', [9834]], ['sup1', [185]], ['sup2', [178]], ['sup3', [179]], ['sup', [8835]], ['Sup', [8913]], ['supdot', [10942]], ['supdsub', [10968]], ['supE', [10950]], ['supe', [8839]], ['supedot', [10948]], ['Superset', [8835]], ['SupersetEqual', [8839]], ['suphsol', [10185]], ['suphsub', [10967]], ['suplarr', [10619]], ['supmult', [10946]], ['supnE', [10956]], ['supne', [8843]], ['supplus', [10944]], ['supset', [8835]], ['Supset', [8913]], ['supseteq', [8839]], ['supseteqq', [10950]], ['supsetneq', [8843]], ['supsetneqq', [10956]], ['supsim', [10952]], ['supsub', [10964]], ['supsup', [10966]], ['swarhk', [10534]], ['swarr', [8601]], ['swArr', [8665]], ['swarrow', [8601]], ['swnwar', [10538]], ['szlig', [223]], ['Tab', [9]], ['target', [8982]], ['Tau', [932]], ['tau', [964]], ['tbrk', [9140]], ['Tcaron', [356]], ['tcaron', [357]], ['Tcedil', [354]], ['tcedil', [355]], ['Tcy', [1058]], ['tcy', [1090]], ['tdot', [8411]], ['telrec', [8981]], ['Tfr', [120087]], ['tfr', [120113]], ['there4', [8756]], ['therefore', [8756]], ['Therefore', [8756]], ['Theta', [920]], ['theta', [952]], ['thetasym', [977]], ['thetav', [977]], ['thickapprox', [8776]], ['thicksim', [8764]], ['ThickSpace', [8287, 8202]], ['ThinSpace', [8201]], ['thinsp', [8201]], ['thkap', [8776]], ['thksim', [8764]], ['THORN', [222]], ['thorn', [254]], ['tilde', [732]], ['Tilde', [8764]], ['TildeEqual', [8771]], ['TildeFullEqual', [8773]], ['TildeTilde', [8776]], ['timesbar', [10801]], ['timesb', [8864]], ['times', [215]], ['timesd', [10800]], ['tint', [8749]], ['toea', [10536]], ['topbot', [9014]], ['topcir', [10993]], ['top', [8868]], ['Topf', [120139]], ['topf', [120165]], ['topfork', [10970]], ['tosa', [10537]], ['tprime', [8244]], ['trade', [8482]], ['TRADE', [8482]], ['triangle', [9653]], ['triangledown', [9663]], ['triangleleft', [9667]], ['trianglelefteq', [8884]], ['triangleq', [8796]], ['triangleright', [9657]], ['trianglerighteq', [8885]], ['tridot', [9708]], ['trie', [8796]], ['triminus', [10810]], ['TripleDot', [8411]], ['triplus', [10809]], ['trisb', [10701]], ['tritime', [10811]], ['trpezium', [9186]], ['Tscr', [119983]], ['tscr', [120009]], ['TScy', [1062]], ['tscy', [1094]], ['TSHcy', [1035]], ['tshcy', [1115]], ['Tstrok', [358]], ['tstrok', [359]], ['twixt', [8812]], ['twoheadleftarrow', [8606]], ['twoheadrightarrow', [8608]], ['Uacute', [218]], ['uacute', [250]], ['uarr', [8593]], ['Uarr', [8607]], ['uArr', [8657]], ['Uarrocir', [10569]], ['Ubrcy', [1038]], ['ubrcy', [1118]], ['Ubreve', [364]], ['ubreve', [365]], ['Ucirc', [219]], ['ucirc', [251]], ['Ucy', [1059]], ['ucy', [1091]], ['udarr', [8645]], ['Udblac', [368]], ['udblac', [369]], ['udhar', [10606]], ['ufisht', [10622]], ['Ufr', [120088]], ['ufr', [120114]], ['Ugrave', [217]], ['ugrave', [249]], ['uHar', [10595]], ['uharl', [8639]], ['uharr', [8638]], ['uhblk', [9600]], ['ulcorn', [8988]], ['ulcorner', [8988]], ['ulcrop', [8975]], ['ultri', [9720]], ['Umacr', [362]], ['umacr', [363]], ['uml', [168]], ['UnderBar', [95]], ['UnderBrace', [9183]], ['UnderBracket', [9141]], ['UnderParenthesis', [9181]], ['Union', [8899]], ['UnionPlus', [8846]], ['Uogon', [370]], ['uogon', [371]], ['Uopf', [120140]], ['uopf', [120166]], ['UpArrowBar', [10514]], ['uparrow', [8593]], ['UpArrow', [8593]], ['Uparrow', [8657]], ['UpArrowDownArrow', [8645]], ['updownarrow', [8597]], ['UpDownArrow', [8597]], ['Updownarrow', [8661]], ['UpEquilibrium', [10606]], ['upharpoonleft', [8639]], ['upharpoonright', [8638]], ['uplus', [8846]], ['UpperLeftArrow', [8598]], ['UpperRightArrow', [8599]], ['upsi', [965]], ['Upsi', [978]], ['upsih', [978]], ['Upsilon', [933]], ['upsilon', [965]], ['UpTeeArrow', [8613]], ['UpTee', [8869]], ['upuparrows', [8648]], ['urcorn', [8989]], ['urcorner', [8989]], ['urcrop', [8974]], ['Uring', [366]], ['uring', [367]], ['urtri', [9721]], ['Uscr', [119984]], ['uscr', [120010]], ['utdot', [8944]], ['Utilde', [360]], ['utilde', [361]], ['utri', [9653]], ['utrif', [9652]], ['uuarr', [8648]], ['Uuml', [220]], ['uuml', [252]], ['uwangle', [10663]], ['vangrt', [10652]], ['varepsilon', [1013]], ['varkappa', [1008]], ['varnothing', [8709]], ['varphi', [981]], ['varpi', [982]], ['varpropto', [8733]], ['varr', [8597]], ['vArr', [8661]], ['varrho', [1009]], ['varsigma', [962]], ['varsubsetneq', [8842, 65024]], ['varsubsetneqq', [10955, 65024]], ['varsupsetneq', [8843, 65024]], ['varsupsetneqq', [10956, 65024]], ['vartheta', [977]], ['vartriangleleft', [8882]], ['vartriangleright', [8883]], ['vBar', [10984]], ['Vbar', [10987]], ['vBarv', [10985]], ['Vcy', [1042]], ['vcy', [1074]], ['vdash', [8866]], ['vDash', [8872]], ['Vdash', [8873]], ['VDash', [8875]], ['Vdashl', [10982]], ['veebar', [8891]], ['vee', [8744]], ['Vee', [8897]], ['veeeq', [8794]], ['vellip', [8942]], ['verbar', [124]], ['Verbar', [8214]], ['vert', [124]], ['Vert', [8214]], ['VerticalBar', [8739]], ['VerticalLine', [124]], ['VerticalSeparator', [10072]], ['VerticalTilde', [8768]], ['VeryThinSpace', [8202]], ['Vfr', [120089]], ['vfr', [120115]], ['vltri', [8882]], ['vnsub', [8834, 8402]], ['vnsup', [8835, 8402]], ['Vopf', [120141]], ['vopf', [120167]], ['vprop', [8733]], ['vrtri', [8883]], ['Vscr', [119985]], ['vscr', [120011]], ['vsubnE', [10955, 65024]], ['vsubne', [8842, 65024]], ['vsupnE', [10956, 65024]], ['vsupne', [8843, 65024]], ['Vvdash', [8874]], ['vzigzag', [10650]], ['Wcirc', [372]], ['wcirc', [373]], ['wedbar', [10847]], ['wedge', [8743]], ['Wedge', [8896]], ['wedgeq', [8793]], ['weierp', [8472]], ['Wfr', [120090]], ['wfr', [120116]], ['Wopf', [120142]], ['wopf', [120168]], ['wp', [8472]], ['wr', [8768]], ['wreath', [8768]], ['Wscr', [119986]], ['wscr', [120012]], ['xcap', [8898]], ['xcirc', [9711]], ['xcup', [8899]], ['xdtri', [9661]], ['Xfr', [120091]], ['xfr', [120117]], ['xharr', [10231]], ['xhArr', [10234]], ['Xi', [926]], ['xi', [958]], ['xlarr', [10229]], ['xlArr', [10232]], ['xmap', [10236]], ['xnis', [8955]], ['xodot', [10752]], ['Xopf', [120143]], ['xopf', [120169]], ['xoplus', [10753]], ['xotime', [10754]], ['xrarr', [10230]], ['xrArr', [10233]], ['Xscr', [119987]], ['xscr', [120013]], ['xsqcup', [10758]], ['xuplus', [10756]], ['xutri', [9651]], ['xvee', [8897]], ['xwedge', [8896]], ['Yacute', [221]], ['yacute', [253]], ['YAcy', [1071]], ['yacy', [1103]], ['Ycirc', [374]], ['ycirc', [375]], ['Ycy', [1067]], ['ycy', [1099]], ['yen', [165]], ['Yfr', [120092]], ['yfr', [120118]], ['YIcy', [1031]], ['yicy', [1111]], ['Yopf', [120144]], ['yopf', [120170]], ['Yscr', [119988]], ['yscr', [120014]], ['YUcy', [1070]], ['yucy', [1102]], ['yuml', [255]], ['Yuml', [376]], ['Zacute', [377]], ['zacute', [378]], ['Zcaron', [381]], ['zcaron', [382]], ['Zcy', [1047]], ['zcy', [1079]], ['Zdot', [379]], ['zdot', [380]], ['zeetrf', [8488]], ['ZeroWidthSpace', [8203]], ['Zeta', [918]], ['zeta', [950]], ['zfr', [120119]], ['Zfr', [8488]], ['ZHcy', [1046]], ['zhcy', [1078]], ['zigrarr', [8669]], ['zopf', [120171]], ['Zopf', [8484]], ['Zscr', [119989]], ['zscr', [120015]], ['zwj', [8205]], ['zwnj', [8204]]];
	
	var alphaIndex = {};
	var charIndex = {};
	
	createIndexes(alphaIndex, charIndex);
	
	/**
	 * @constructor
	 */
	function Html5Entities() {}
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.prototype.decode = function(str) {
	    if (str.length === 0) {
	        return '';
	    }
	    return str.replace(/&(#?[\w\d]+);?/g, function(s, entity) {
	        var chr;
	        if (entity.charAt(0) === "#") {
	            var code = entity.charAt(1) === 'x' ?
	                parseInt(entity.substr(2).toLowerCase(), 16) :
	                parseInt(entity.substr(1));
	
	            if (!(isNaN(code) || code < -32768 || code > 65535)) {
	                chr = String.fromCharCode(code);
	            }
	        } else {
	            chr = alphaIndex[entity];
	        }
	        return chr || s;
	    });
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 Html5Entities.decode = function(str) {
	    return new Html5Entities().decode(str);
	 };
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.prototype.encode = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var charInfo = charIndex[str.charCodeAt(i)];
	        if (charInfo) {
	            var alpha = charInfo[str.charCodeAt(i + 1)];
	            if (alpha) {
	                i++;
	            } else {
	                alpha = charInfo[''];
	            }
	            if (alpha) {
	                result += "&" + alpha + ";";
	                i++;
	                continue;
	            }
	        }
	        result += str.charAt(i);
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 Html5Entities.encode = function(str) {
	    return new Html5Entities().encode(str);
	 };
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.prototype.encodeNonUTF = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var c = str.charCodeAt(i);
	        var charInfo = charIndex[c];
	        if (charInfo) {
	            var alpha = charInfo[str.charCodeAt(i + 1)];
	            if (alpha) {
	                i++;
	            } else {
	                alpha = charInfo[''];
	            }
	            if (alpha) {
	                result += "&" + alpha + ";";
	                i++;
	                continue;
	            }
	        }
	        if (c < 32 || c > 126) {
	            result += '&#' + c + ';';
	        } else {
	            result += str.charAt(i);
	        }
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 Html5Entities.encodeNonUTF = function(str) {
	    return new Html5Entities().encodeNonUTF(str);
	 };
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.prototype.encodeNonASCII = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var c = str.charCodeAt(i);
	        if (c <= 255) {
	            result += str[i++];
	            continue;
	        }
	        result += '&#' + c + ';';
	        i++
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 Html5Entities.encodeNonASCII = function(str) {
	    return new Html5Entities().encodeNonASCII(str);
	 };
	
	/**
	 * @param {Object} alphaIndex Passed by reference.
	 * @param {Object} charIndex Passed by reference.
	 */
	function createIndexes(alphaIndex, charIndex) {
	    var i = ENTITIES.length;
	    var _results = [];
	    while (i--) {
	        var e = ENTITIES[i];
	        var alpha = e[0];
	        var chars = e[1];
	        var chr = chars[0];
	        var addChar = (chr < 32 || chr > 126) || chr === 62 || chr === 60 || chr === 38 || chr === 34 || chr === 39;
	        var charInfo;
	        if (addChar) {
	            charInfo = charIndex[chr] = charIndex[chr] || {};
	        }
	        if (chars[1]) {
	            var chr2 = chars[1];
	            alphaIndex[alpha] = String.fromCharCode(chr) + String.fromCharCode(chr2);
	            _results.push(addChar && (charInfo[chr2] = alpha));
	        } else {
	            alphaIndex[alpha] = String.fromCharCode(chr);
	            _results.push(addChar && (charInfo[''] = alpha));
	        }
	    }
	}
	
	module.exports = Html5Entities;


/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = supportsProtoAssignment;
	var x = {};
	var y = { supports: true };
	try {
	  x.__proto__ = y;
	} catch (err) {}
	
	function supportsProtoAssignment() {
	  return x.supports || false;
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	// List of valid entities
	//
	// Generate with ./support/entities.js script
	//
	'use strict';
	
	/*eslint quotes:0*/
	module.exports = {
	  "Aacute":"\u00C1",
	  "aacute":"\u00E1",
	  "Abreve":"\u0102",
	  "abreve":"\u0103",
	  "ac":"\u223E",
	  "acd":"\u223F",
	  "acE":"\u223E\u0333",
	  "Acirc":"\u00C2",
	  "acirc":"\u00E2",
	  "acute":"\u00B4",
	  "Acy":"\u0410",
	  "acy":"\u0430",
	  "AElig":"\u00C6",
	  "aelig":"\u00E6",
	  "af":"\u2061",
	  "Afr":"\uD835\uDD04",
	  "afr":"\uD835\uDD1E",
	  "Agrave":"\u00C0",
	  "agrave":"\u00E0",
	  "alefsym":"\u2135",
	  "aleph":"\u2135",
	  "Alpha":"\u0391",
	  "alpha":"\u03B1",
	  "Amacr":"\u0100",
	  "amacr":"\u0101",
	  "amalg":"\u2A3F",
	  "AMP":"\u0026",
	  "amp":"\u0026",
	  "And":"\u2A53",
	  "and":"\u2227",
	  "andand":"\u2A55",
	  "andd":"\u2A5C",
	  "andslope":"\u2A58",
	  "andv":"\u2A5A",
	  "ang":"\u2220",
	  "ange":"\u29A4",
	  "angle":"\u2220",
	  "angmsd":"\u2221",
	  "angmsdaa":"\u29A8",
	  "angmsdab":"\u29A9",
	  "angmsdac":"\u29AA",
	  "angmsdad":"\u29AB",
	  "angmsdae":"\u29AC",
	  "angmsdaf":"\u29AD",
	  "angmsdag":"\u29AE",
	  "angmsdah":"\u29AF",
	  "angrt":"\u221F",
	  "angrtvb":"\u22BE",
	  "angrtvbd":"\u299D",
	  "angsph":"\u2222",
	  "angst":"\u00C5",
	  "angzarr":"\u237C",
	  "Aogon":"\u0104",
	  "aogon":"\u0105",
	  "Aopf":"\uD835\uDD38",
	  "aopf":"\uD835\uDD52",
	  "ap":"\u2248",
	  "apacir":"\u2A6F",
	  "apE":"\u2A70",
	  "ape":"\u224A",
	  "apid":"\u224B",
	  "apos":"\u0027",
	  "ApplyFunction":"\u2061",
	  "approx":"\u2248",
	  "approxeq":"\u224A",
	  "Aring":"\u00C5",
	  "aring":"\u00E5",
	  "Ascr":"\uD835\uDC9C",
	  "ascr":"\uD835\uDCB6",
	  "Assign":"\u2254",
	  "ast":"\u002A",
	  "asymp":"\u2248",
	  "asympeq":"\u224D",
	  "Atilde":"\u00C3",
	  "atilde":"\u00E3",
	  "Auml":"\u00C4",
	  "auml":"\u00E4",
	  "awconint":"\u2233",
	  "awint":"\u2A11",
	  "backcong":"\u224C",
	  "backepsilon":"\u03F6",
	  "backprime":"\u2035",
	  "backsim":"\u223D",
	  "backsimeq":"\u22CD",
	  "Backslash":"\u2216",
	  "Barv":"\u2AE7",
	  "barvee":"\u22BD",
	  "Barwed":"\u2306",
	  "barwed":"\u2305",
	  "barwedge":"\u2305",
	  "bbrk":"\u23B5",
	  "bbrktbrk":"\u23B6",
	  "bcong":"\u224C",
	  "Bcy":"\u0411",
	  "bcy":"\u0431",
	  "bdquo":"\u201E",
	  "becaus":"\u2235",
	  "Because":"\u2235",
	  "because":"\u2235",
	  "bemptyv":"\u29B0",
	  "bepsi":"\u03F6",
	  "bernou":"\u212C",
	  "Bernoullis":"\u212C",
	  "Beta":"\u0392",
	  "beta":"\u03B2",
	  "beth":"\u2136",
	  "between":"\u226C",
	  "Bfr":"\uD835\uDD05",
	  "bfr":"\uD835\uDD1F",
	  "bigcap":"\u22C2",
	  "bigcirc":"\u25EF",
	  "bigcup":"\u22C3",
	  "bigodot":"\u2A00",
	  "bigoplus":"\u2A01",
	  "bigotimes":"\u2A02",
	  "bigsqcup":"\u2A06",
	  "bigstar":"\u2605",
	  "bigtriangledown":"\u25BD",
	  "bigtriangleup":"\u25B3",
	  "biguplus":"\u2A04",
	  "bigvee":"\u22C1",
	  "bigwedge":"\u22C0",
	  "bkarow":"\u290D",
	  "blacklozenge":"\u29EB",
	  "blacksquare":"\u25AA",
	  "blacktriangle":"\u25B4",
	  "blacktriangledown":"\u25BE",
	  "blacktriangleleft":"\u25C2",
	  "blacktriangleright":"\u25B8",
	  "blank":"\u2423",
	  "blk12":"\u2592",
	  "blk14":"\u2591",
	  "blk34":"\u2593",
	  "block":"\u2588",
	  "bne":"\u003D\u20E5",
	  "bnequiv":"\u2261\u20E5",
	  "bNot":"\u2AED",
	  "bnot":"\u2310",
	  "Bopf":"\uD835\uDD39",
	  "bopf":"\uD835\uDD53",
	  "bot":"\u22A5",
	  "bottom":"\u22A5",
	  "bowtie":"\u22C8",
	  "boxbox":"\u29C9",
	  "boxDL":"\u2557",
	  "boxDl":"\u2556",
	  "boxdL":"\u2555",
	  "boxdl":"\u2510",
	  "boxDR":"\u2554",
	  "boxDr":"\u2553",
	  "boxdR":"\u2552",
	  "boxdr":"\u250C",
	  "boxH":"\u2550",
	  "boxh":"\u2500",
	  "boxHD":"\u2566",
	  "boxHd":"\u2564",
	  "boxhD":"\u2565",
	  "boxhd":"\u252C",
	  "boxHU":"\u2569",
	  "boxHu":"\u2567",
	  "boxhU":"\u2568",
	  "boxhu":"\u2534",
	  "boxminus":"\u229F",
	  "boxplus":"\u229E",
	  "boxtimes":"\u22A0",
	  "boxUL":"\u255D",
	  "boxUl":"\u255C",
	  "boxuL":"\u255B",
	  "boxul":"\u2518",
	  "boxUR":"\u255A",
	  "boxUr":"\u2559",
	  "boxuR":"\u2558",
	  "boxur":"\u2514",
	  "boxV":"\u2551",
	  "boxv":"\u2502",
	  "boxVH":"\u256C",
	  "boxVh":"\u256B",
	  "boxvH":"\u256A",
	  "boxvh":"\u253C",
	  "boxVL":"\u2563",
	  "boxVl":"\u2562",
	  "boxvL":"\u2561",
	  "boxvl":"\u2524",
	  "boxVR":"\u2560",
	  "boxVr":"\u255F",
	  "boxvR":"\u255E",
	  "boxvr":"\u251C",
	  "bprime":"\u2035",
	  "Breve":"\u02D8",
	  "breve":"\u02D8",
	  "brvbar":"\u00A6",
	  "Bscr":"\u212C",
	  "bscr":"\uD835\uDCB7",
	  "bsemi":"\u204F",
	  "bsim":"\u223D",
	  "bsime":"\u22CD",
	  "bsol":"\u005C",
	  "bsolb":"\u29C5",
	  "bsolhsub":"\u27C8",
	  "bull":"\u2022",
	  "bullet":"\u2022",
	  "bump":"\u224E",
	  "bumpE":"\u2AAE",
	  "bumpe":"\u224F",
	  "Bumpeq":"\u224E",
	  "bumpeq":"\u224F",
	  "Cacute":"\u0106",
	  "cacute":"\u0107",
	  "Cap":"\u22D2",
	  "cap":"\u2229",
	  "capand":"\u2A44",
	  "capbrcup":"\u2A49",
	  "capcap":"\u2A4B",
	  "capcup":"\u2A47",
	  "capdot":"\u2A40",
	  "CapitalDifferentialD":"\u2145",
	  "caps":"\u2229\uFE00",
	  "caret":"\u2041",
	  "caron":"\u02C7",
	  "Cayleys":"\u212D",
	  "ccaps":"\u2A4D",
	  "Ccaron":"\u010C",
	  "ccaron":"\u010D",
	  "Ccedil":"\u00C7",
	  "ccedil":"\u00E7",
	  "Ccirc":"\u0108",
	  "ccirc":"\u0109",
	  "Cconint":"\u2230",
	  "ccups":"\u2A4C",
	  "ccupssm":"\u2A50",
	  "Cdot":"\u010A",
	  "cdot":"\u010B",
	  "cedil":"\u00B8",
	  "Cedilla":"\u00B8",
	  "cemptyv":"\u29B2",
	  "cent":"\u00A2",
	  "CenterDot":"\u00B7",
	  "centerdot":"\u00B7",
	  "Cfr":"\u212D",
	  "cfr":"\uD835\uDD20",
	  "CHcy":"\u0427",
	  "chcy":"\u0447",
	  "check":"\u2713",
	  "checkmark":"\u2713",
	  "Chi":"\u03A7",
	  "chi":"\u03C7",
	  "cir":"\u25CB",
	  "circ":"\u02C6",
	  "circeq":"\u2257",
	  "circlearrowleft":"\u21BA",
	  "circlearrowright":"\u21BB",
	  "circledast":"\u229B",
	  "circledcirc":"\u229A",
	  "circleddash":"\u229D",
	  "CircleDot":"\u2299",
	  "circledR":"\u00AE",
	  "circledS":"\u24C8",
	  "CircleMinus":"\u2296",
	  "CirclePlus":"\u2295",
	  "CircleTimes":"\u2297",
	  "cirE":"\u29C3",
	  "cire":"\u2257",
	  "cirfnint":"\u2A10",
	  "cirmid":"\u2AEF",
	  "cirscir":"\u29C2",
	  "ClockwiseContourIntegral":"\u2232",
	  "CloseCurlyDoubleQuote":"\u201D",
	  "CloseCurlyQuote":"\u2019",
	  "clubs":"\u2663",
	  "clubsuit":"\u2663",
	  "Colon":"\u2237",
	  "colon":"\u003A",
	  "Colone":"\u2A74",
	  "colone":"\u2254",
	  "coloneq":"\u2254",
	  "comma":"\u002C",
	  "commat":"\u0040",
	  "comp":"\u2201",
	  "compfn":"\u2218",
	  "complement":"\u2201",
	  "complexes":"\u2102",
	  "cong":"\u2245",
	  "congdot":"\u2A6D",
	  "Congruent":"\u2261",
	  "Conint":"\u222F",
	  "conint":"\u222E",
	  "ContourIntegral":"\u222E",
	  "Copf":"\u2102",
	  "copf":"\uD835\uDD54",
	  "coprod":"\u2210",
	  "Coproduct":"\u2210",
	  "COPY":"\u00A9",
	  "copy":"\u00A9",
	  "copysr":"\u2117",
	  "CounterClockwiseContourIntegral":"\u2233",
	  "crarr":"\u21B5",
	  "Cross":"\u2A2F",
	  "cross":"\u2717",
	  "Cscr":"\uD835\uDC9E",
	  "cscr":"\uD835\uDCB8",
	  "csub":"\u2ACF",
	  "csube":"\u2AD1",
	  "csup":"\u2AD0",
	  "csupe":"\u2AD2",
	  "ctdot":"\u22EF",
	  "cudarrl":"\u2938",
	  "cudarrr":"\u2935",
	  "cuepr":"\u22DE",
	  "cuesc":"\u22DF",
	  "cularr":"\u21B6",
	  "cularrp":"\u293D",
	  "Cup":"\u22D3",
	  "cup":"\u222A",
	  "cupbrcap":"\u2A48",
	  "CupCap":"\u224D",
	  "cupcap":"\u2A46",
	  "cupcup":"\u2A4A",
	  "cupdot":"\u228D",
	  "cupor":"\u2A45",
	  "cups":"\u222A\uFE00",
	  "curarr":"\u21B7",
	  "curarrm":"\u293C",
	  "curlyeqprec":"\u22DE",
	  "curlyeqsucc":"\u22DF",
	  "curlyvee":"\u22CE",
	  "curlywedge":"\u22CF",
	  "curren":"\u00A4",
	  "curvearrowleft":"\u21B6",
	  "curvearrowright":"\u21B7",
	  "cuvee":"\u22CE",
	  "cuwed":"\u22CF",
	  "cwconint":"\u2232",
	  "cwint":"\u2231",
	  "cylcty":"\u232D",
	  "Dagger":"\u2021",
	  "dagger":"\u2020",
	  "daleth":"\u2138",
	  "Darr":"\u21A1",
	  "dArr":"\u21D3",
	  "darr":"\u2193",
	  "dash":"\u2010",
	  "Dashv":"\u2AE4",
	  "dashv":"\u22A3",
	  "dbkarow":"\u290F",
	  "dblac":"\u02DD",
	  "Dcaron":"\u010E",
	  "dcaron":"\u010F",
	  "Dcy":"\u0414",
	  "dcy":"\u0434",
	  "DD":"\u2145",
	  "dd":"\u2146",
	  "ddagger":"\u2021",
	  "ddarr":"\u21CA",
	  "DDotrahd":"\u2911",
	  "ddotseq":"\u2A77",
	  "deg":"\u00B0",
	  "Del":"\u2207",
	  "Delta":"\u0394",
	  "delta":"\u03B4",
	  "demptyv":"\u29B1",
	  "dfisht":"\u297F",
	  "Dfr":"\uD835\uDD07",
	  "dfr":"\uD835\uDD21",
	  "dHar":"\u2965",
	  "dharl":"\u21C3",
	  "dharr":"\u21C2",
	  "DiacriticalAcute":"\u00B4",
	  "DiacriticalDot":"\u02D9",
	  "DiacriticalDoubleAcute":"\u02DD",
	  "DiacriticalGrave":"\u0060",
	  "DiacriticalTilde":"\u02DC",
	  "diam":"\u22C4",
	  "Diamond":"\u22C4",
	  "diamond":"\u22C4",
	  "diamondsuit":"\u2666",
	  "diams":"\u2666",
	  "die":"\u00A8",
	  "DifferentialD":"\u2146",
	  "digamma":"\u03DD",
	  "disin":"\u22F2",
	  "div":"\u00F7",
	  "divide":"\u00F7",
	  "divideontimes":"\u22C7",
	  "divonx":"\u22C7",
	  "DJcy":"\u0402",
	  "djcy":"\u0452",
	  "dlcorn":"\u231E",
	  "dlcrop":"\u230D",
	  "dollar":"\u0024",
	  "Dopf":"\uD835\uDD3B",
	  "dopf":"\uD835\uDD55",
	  "Dot":"\u00A8",
	  "dot":"\u02D9",
	  "DotDot":"\u20DC",
	  "doteq":"\u2250",
	  "doteqdot":"\u2251",
	  "DotEqual":"\u2250",
	  "dotminus":"\u2238",
	  "dotplus":"\u2214",
	  "dotsquare":"\u22A1",
	  "doublebarwedge":"\u2306",
	  "DoubleContourIntegral":"\u222F",
	  "DoubleDot":"\u00A8",
	  "DoubleDownArrow":"\u21D3",
	  "DoubleLeftArrow":"\u21D0",
	  "DoubleLeftRightArrow":"\u21D4",
	  "DoubleLeftTee":"\u2AE4",
	  "DoubleLongLeftArrow":"\u27F8",
	  "DoubleLongLeftRightArrow":"\u27FA",
	  "DoubleLongRightArrow":"\u27F9",
	  "DoubleRightArrow":"\u21D2",
	  "DoubleRightTee":"\u22A8",
	  "DoubleUpArrow":"\u21D1",
	  "DoubleUpDownArrow":"\u21D5",
	  "DoubleVerticalBar":"\u2225",
	  "DownArrow":"\u2193",
	  "Downarrow":"\u21D3",
	  "downarrow":"\u2193",
	  "DownArrowBar":"\u2913",
	  "DownArrowUpArrow":"\u21F5",
	  "DownBreve":"\u0311",
	  "downdownarrows":"\u21CA",
	  "downharpoonleft":"\u21C3",
	  "downharpoonright":"\u21C2",
	  "DownLeftRightVector":"\u2950",
	  "DownLeftTeeVector":"\u295E",
	  "DownLeftVector":"\u21BD",
	  "DownLeftVectorBar":"\u2956",
	  "DownRightTeeVector":"\u295F",
	  "DownRightVector":"\u21C1",
	  "DownRightVectorBar":"\u2957",
	  "DownTee":"\u22A4",
	  "DownTeeArrow":"\u21A7",
	  "drbkarow":"\u2910",
	  "drcorn":"\u231F",
	  "drcrop":"\u230C",
	  "Dscr":"\uD835\uDC9F",
	  "dscr":"\uD835\uDCB9",
	  "DScy":"\u0405",
	  "dscy":"\u0455",
	  "dsol":"\u29F6",
	  "Dstrok":"\u0110",
	  "dstrok":"\u0111",
	  "dtdot":"\u22F1",
	  "dtri":"\u25BF",
	  "dtrif":"\u25BE",
	  "duarr":"\u21F5",
	  "duhar":"\u296F",
	  "dwangle":"\u29A6",
	  "DZcy":"\u040F",
	  "dzcy":"\u045F",
	  "dzigrarr":"\u27FF",
	  "Eacute":"\u00C9",
	  "eacute":"\u00E9",
	  "easter":"\u2A6E",
	  "Ecaron":"\u011A",
	  "ecaron":"\u011B",
	  "ecir":"\u2256",
	  "Ecirc":"\u00CA",
	  "ecirc":"\u00EA",
	  "ecolon":"\u2255",
	  "Ecy":"\u042D",
	  "ecy":"\u044D",
	  "eDDot":"\u2A77",
	  "Edot":"\u0116",
	  "eDot":"\u2251",
	  "edot":"\u0117",
	  "ee":"\u2147",
	  "efDot":"\u2252",
	  "Efr":"\uD835\uDD08",
	  "efr":"\uD835\uDD22",
	  "eg":"\u2A9A",
	  "Egrave":"\u00C8",
	  "egrave":"\u00E8",
	  "egs":"\u2A96",
	  "egsdot":"\u2A98",
	  "el":"\u2A99",
	  "Element":"\u2208",
	  "elinters":"\u23E7",
	  "ell":"\u2113",
	  "els":"\u2A95",
	  "elsdot":"\u2A97",
	  "Emacr":"\u0112",
	  "emacr":"\u0113",
	  "empty":"\u2205",
	  "emptyset":"\u2205",
	  "EmptySmallSquare":"\u25FB",
	  "emptyv":"\u2205",
	  "EmptyVerySmallSquare":"\u25AB",
	  "emsp":"\u2003",
	  "emsp13":"\u2004",
	  "emsp14":"\u2005",
	  "ENG":"\u014A",
	  "eng":"\u014B",
	  "ensp":"\u2002",
	  "Eogon":"\u0118",
	  "eogon":"\u0119",
	  "Eopf":"\uD835\uDD3C",
	  "eopf":"\uD835\uDD56",
	  "epar":"\u22D5",
	  "eparsl":"\u29E3",
	  "eplus":"\u2A71",
	  "epsi":"\u03B5",
	  "Epsilon":"\u0395",
	  "epsilon":"\u03B5",
	  "epsiv":"\u03F5",
	  "eqcirc":"\u2256",
	  "eqcolon":"\u2255",
	  "eqsim":"\u2242",
	  "eqslantgtr":"\u2A96",
	  "eqslantless":"\u2A95",
	  "Equal":"\u2A75",
	  "equals":"\u003D",
	  "EqualTilde":"\u2242",
	  "equest":"\u225F",
	  "Equilibrium":"\u21CC",
	  "equiv":"\u2261",
	  "equivDD":"\u2A78",
	  "eqvparsl":"\u29E5",
	  "erarr":"\u2971",
	  "erDot":"\u2253",
	  "Escr":"\u2130",
	  "escr":"\u212F",
	  "esdot":"\u2250",
	  "Esim":"\u2A73",
	  "esim":"\u2242",
	  "Eta":"\u0397",
	  "eta":"\u03B7",
	  "ETH":"\u00D0",
	  "eth":"\u00F0",
	  "Euml":"\u00CB",
	  "euml":"\u00EB",
	  "euro":"\u20AC",
	  "excl":"\u0021",
	  "exist":"\u2203",
	  "Exists":"\u2203",
	  "expectation":"\u2130",
	  "ExponentialE":"\u2147",
	  "exponentiale":"\u2147",
	  "fallingdotseq":"\u2252",
	  "Fcy":"\u0424",
	  "fcy":"\u0444",
	  "female":"\u2640",
	  "ffilig":"\uFB03",
	  "fflig":"\uFB00",
	  "ffllig":"\uFB04",
	  "Ffr":"\uD835\uDD09",
	  "ffr":"\uD835\uDD23",
	  "filig":"\uFB01",
	  "FilledSmallSquare":"\u25FC",
	  "FilledVerySmallSquare":"\u25AA",
	  "fjlig":"\u0066\u006A",
	  "flat":"\u266D",
	  "fllig":"\uFB02",
	  "fltns":"\u25B1",
	  "fnof":"\u0192",
	  "Fopf":"\uD835\uDD3D",
	  "fopf":"\uD835\uDD57",
	  "ForAll":"\u2200",
	  "forall":"\u2200",
	  "fork":"\u22D4",
	  "forkv":"\u2AD9",
	  "Fouriertrf":"\u2131",
	  "fpartint":"\u2A0D",
	  "frac12":"\u00BD",
	  "frac13":"\u2153",
	  "frac14":"\u00BC",
	  "frac15":"\u2155",
	  "frac16":"\u2159",
	  "frac18":"\u215B",
	  "frac23":"\u2154",
	  "frac25":"\u2156",
	  "frac34":"\u00BE",
	  "frac35":"\u2157",
	  "frac38":"\u215C",
	  "frac45":"\u2158",
	  "frac56":"\u215A",
	  "frac58":"\u215D",
	  "frac78":"\u215E",
	  "frasl":"\u2044",
	  "frown":"\u2322",
	  "Fscr":"\u2131",
	  "fscr":"\uD835\uDCBB",
	  "gacute":"\u01F5",
	  "Gamma":"\u0393",
	  "gamma":"\u03B3",
	  "Gammad":"\u03DC",
	  "gammad":"\u03DD",
	  "gap":"\u2A86",
	  "Gbreve":"\u011E",
	  "gbreve":"\u011F",
	  "Gcedil":"\u0122",
	  "Gcirc":"\u011C",
	  "gcirc":"\u011D",
	  "Gcy":"\u0413",
	  "gcy":"\u0433",
	  "Gdot":"\u0120",
	  "gdot":"\u0121",
	  "gE":"\u2267",
	  "ge":"\u2265",
	  "gEl":"\u2A8C",
	  "gel":"\u22DB",
	  "geq":"\u2265",
	  "geqq":"\u2267",
	  "geqslant":"\u2A7E",
	  "ges":"\u2A7E",
	  "gescc":"\u2AA9",
	  "gesdot":"\u2A80",
	  "gesdoto":"\u2A82",
	  "gesdotol":"\u2A84",
	  "gesl":"\u22DB\uFE00",
	  "gesles":"\u2A94",
	  "Gfr":"\uD835\uDD0A",
	  "gfr":"\uD835\uDD24",
	  "Gg":"\u22D9",
	  "gg":"\u226B",
	  "ggg":"\u22D9",
	  "gimel":"\u2137",
	  "GJcy":"\u0403",
	  "gjcy":"\u0453",
	  "gl":"\u2277",
	  "gla":"\u2AA5",
	  "glE":"\u2A92",
	  "glj":"\u2AA4",
	  "gnap":"\u2A8A",
	  "gnapprox":"\u2A8A",
	  "gnE":"\u2269",
	  "gne":"\u2A88",
	  "gneq":"\u2A88",
	  "gneqq":"\u2269",
	  "gnsim":"\u22E7",
	  "Gopf":"\uD835\uDD3E",
	  "gopf":"\uD835\uDD58",
	  "grave":"\u0060",
	  "GreaterEqual":"\u2265",
	  "GreaterEqualLess":"\u22DB",
	  "GreaterFullEqual":"\u2267",
	  "GreaterGreater":"\u2AA2",
	  "GreaterLess":"\u2277",
	  "GreaterSlantEqual":"\u2A7E",
	  "GreaterTilde":"\u2273",
	  "Gscr":"\uD835\uDCA2",
	  "gscr":"\u210A",
	  "gsim":"\u2273",
	  "gsime":"\u2A8E",
	  "gsiml":"\u2A90",
	  "GT":"\u003E",
	  "Gt":"\u226B",
	  "gt":"\u003E",
	  "gtcc":"\u2AA7",
	  "gtcir":"\u2A7A",
	  "gtdot":"\u22D7",
	  "gtlPar":"\u2995",
	  "gtquest":"\u2A7C",
	  "gtrapprox":"\u2A86",
	  "gtrarr":"\u2978",
	  "gtrdot":"\u22D7",
	  "gtreqless":"\u22DB",
	  "gtreqqless":"\u2A8C",
	  "gtrless":"\u2277",
	  "gtrsim":"\u2273",
	  "gvertneqq":"\u2269\uFE00",
	  "gvnE":"\u2269\uFE00",
	  "Hacek":"\u02C7",
	  "hairsp":"\u200A",
	  "half":"\u00BD",
	  "hamilt":"\u210B",
	  "HARDcy":"\u042A",
	  "hardcy":"\u044A",
	  "hArr":"\u21D4",
	  "harr":"\u2194",
	  "harrcir":"\u2948",
	  "harrw":"\u21AD",
	  "Hat":"\u005E",
	  "hbar":"\u210F",
	  "Hcirc":"\u0124",
	  "hcirc":"\u0125",
	  "hearts":"\u2665",
	  "heartsuit":"\u2665",
	  "hellip":"\u2026",
	  "hercon":"\u22B9",
	  "Hfr":"\u210C",
	  "hfr":"\uD835\uDD25",
	  "HilbertSpace":"\u210B",
	  "hksearow":"\u2925",
	  "hkswarow":"\u2926",
	  "hoarr":"\u21FF",
	  "homtht":"\u223B",
	  "hookleftarrow":"\u21A9",
	  "hookrightarrow":"\u21AA",
	  "Hopf":"\u210D",
	  "hopf":"\uD835\uDD59",
	  "horbar":"\u2015",
	  "HorizontalLine":"\u2500",
	  "Hscr":"\u210B",
	  "hscr":"\uD835\uDCBD",
	  "hslash":"\u210F",
	  "Hstrok":"\u0126",
	  "hstrok":"\u0127",
	  "HumpDownHump":"\u224E",
	  "HumpEqual":"\u224F",
	  "hybull":"\u2043",
	  "hyphen":"\u2010",
	  "Iacute":"\u00CD",
	  "iacute":"\u00ED",
	  "ic":"\u2063",
	  "Icirc":"\u00CE",
	  "icirc":"\u00EE",
	  "Icy":"\u0418",
	  "icy":"\u0438",
	  "Idot":"\u0130",
	  "IEcy":"\u0415",
	  "iecy":"\u0435",
	  "iexcl":"\u00A1",
	  "iff":"\u21D4",
	  "Ifr":"\u2111",
	  "ifr":"\uD835\uDD26",
	  "Igrave":"\u00CC",
	  "igrave":"\u00EC",
	  "ii":"\u2148",
	  "iiiint":"\u2A0C",
	  "iiint":"\u222D",
	  "iinfin":"\u29DC",
	  "iiota":"\u2129",
	  "IJlig":"\u0132",
	  "ijlig":"\u0133",
	  "Im":"\u2111",
	  "Imacr":"\u012A",
	  "imacr":"\u012B",
	  "image":"\u2111",
	  "ImaginaryI":"\u2148",
	  "imagline":"\u2110",
	  "imagpart":"\u2111",
	  "imath":"\u0131",
	  "imof":"\u22B7",
	  "imped":"\u01B5",
	  "Implies":"\u21D2",
	  "in":"\u2208",
	  "incare":"\u2105",
	  "infin":"\u221E",
	  "infintie":"\u29DD",
	  "inodot":"\u0131",
	  "Int":"\u222C",
	  "int":"\u222B",
	  "intcal":"\u22BA",
	  "integers":"\u2124",
	  "Integral":"\u222B",
	  "intercal":"\u22BA",
	  "Intersection":"\u22C2",
	  "intlarhk":"\u2A17",
	  "intprod":"\u2A3C",
	  "InvisibleComma":"\u2063",
	  "InvisibleTimes":"\u2062",
	  "IOcy":"\u0401",
	  "iocy":"\u0451",
	  "Iogon":"\u012E",
	  "iogon":"\u012F",
	  "Iopf":"\uD835\uDD40",
	  "iopf":"\uD835\uDD5A",
	  "Iota":"\u0399",
	  "iota":"\u03B9",
	  "iprod":"\u2A3C",
	  "iquest":"\u00BF",
	  "Iscr":"\u2110",
	  "iscr":"\uD835\uDCBE",
	  "isin":"\u2208",
	  "isindot":"\u22F5",
	  "isinE":"\u22F9",
	  "isins":"\u22F4",
	  "isinsv":"\u22F3",
	  "isinv":"\u2208",
	  "it":"\u2062",
	  "Itilde":"\u0128",
	  "itilde":"\u0129",
	  "Iukcy":"\u0406",
	  "iukcy":"\u0456",
	  "Iuml":"\u00CF",
	  "iuml":"\u00EF",
	  "Jcirc":"\u0134",
	  "jcirc":"\u0135",
	  "Jcy":"\u0419",
	  "jcy":"\u0439",
	  "Jfr":"\uD835\uDD0D",
	  "jfr":"\uD835\uDD27",
	  "jmath":"\u0237",
	  "Jopf":"\uD835\uDD41",
	  "jopf":"\uD835\uDD5B",
	  "Jscr":"\uD835\uDCA5",
	  "jscr":"\uD835\uDCBF",
	  "Jsercy":"\u0408",
	  "jsercy":"\u0458",
	  "Jukcy":"\u0404",
	  "jukcy":"\u0454",
	  "Kappa":"\u039A",
	  "kappa":"\u03BA",
	  "kappav":"\u03F0",
	  "Kcedil":"\u0136",
	  "kcedil":"\u0137",
	  "Kcy":"\u041A",
	  "kcy":"\u043A",
	  "Kfr":"\uD835\uDD0E",
	  "kfr":"\uD835\uDD28",
	  "kgreen":"\u0138",
	  "KHcy":"\u0425",
	  "khcy":"\u0445",
	  "KJcy":"\u040C",
	  "kjcy":"\u045C",
	  "Kopf":"\uD835\uDD42",
	  "kopf":"\uD835\uDD5C",
	  "Kscr":"\uD835\uDCA6",
	  "kscr":"\uD835\uDCC0",
	  "lAarr":"\u21DA",
	  "Lacute":"\u0139",
	  "lacute":"\u013A",
	  "laemptyv":"\u29B4",
	  "lagran":"\u2112",
	  "Lambda":"\u039B",
	  "lambda":"\u03BB",
	  "Lang":"\u27EA",
	  "lang":"\u27E8",
	  "langd":"\u2991",
	  "langle":"\u27E8",
	  "lap":"\u2A85",
	  "Laplacetrf":"\u2112",
	  "laquo":"\u00AB",
	  "Larr":"\u219E",
	  "lArr":"\u21D0",
	  "larr":"\u2190",
	  "larrb":"\u21E4",
	  "larrbfs":"\u291F",
	  "larrfs":"\u291D",
	  "larrhk":"\u21A9",
	  "larrlp":"\u21AB",
	  "larrpl":"\u2939",
	  "larrsim":"\u2973",
	  "larrtl":"\u21A2",
	  "lat":"\u2AAB",
	  "lAtail":"\u291B",
	  "latail":"\u2919",
	  "late":"\u2AAD",
	  "lates":"\u2AAD\uFE00",
	  "lBarr":"\u290E",
	  "lbarr":"\u290C",
	  "lbbrk":"\u2772",
	  "lbrace":"\u007B",
	  "lbrack":"\u005B",
	  "lbrke":"\u298B",
	  "lbrksld":"\u298F",
	  "lbrkslu":"\u298D",
	  "Lcaron":"\u013D",
	  "lcaron":"\u013E",
	  "Lcedil":"\u013B",
	  "lcedil":"\u013C",
	  "lceil":"\u2308",
	  "lcub":"\u007B",
	  "Lcy":"\u041B",
	  "lcy":"\u043B",
	  "ldca":"\u2936",
	  "ldquo":"\u201C",
	  "ldquor":"\u201E",
	  "ldrdhar":"\u2967",
	  "ldrushar":"\u294B",
	  "ldsh":"\u21B2",
	  "lE":"\u2266",
	  "le":"\u2264",
	  "LeftAngleBracket":"\u27E8",
	  "LeftArrow":"\u2190",
	  "Leftarrow":"\u21D0",
	  "leftarrow":"\u2190",
	  "LeftArrowBar":"\u21E4",
	  "LeftArrowRightArrow":"\u21C6",
	  "leftarrowtail":"\u21A2",
	  "LeftCeiling":"\u2308",
	  "LeftDoubleBracket":"\u27E6",
	  "LeftDownTeeVector":"\u2961",
	  "LeftDownVector":"\u21C3",
	  "LeftDownVectorBar":"\u2959",
	  "LeftFloor":"\u230A",
	  "leftharpoondown":"\u21BD",
	  "leftharpoonup":"\u21BC",
	  "leftleftarrows":"\u21C7",
	  "LeftRightArrow":"\u2194",
	  "Leftrightarrow":"\u21D4",
	  "leftrightarrow":"\u2194",
	  "leftrightarrows":"\u21C6",
	  "leftrightharpoons":"\u21CB",
	  "leftrightsquigarrow":"\u21AD",
	  "LeftRightVector":"\u294E",
	  "LeftTee":"\u22A3",
	  "LeftTeeArrow":"\u21A4",
	  "LeftTeeVector":"\u295A",
	  "leftthreetimes":"\u22CB",
	  "LeftTriangle":"\u22B2",
	  "LeftTriangleBar":"\u29CF",
	  "LeftTriangleEqual":"\u22B4",
	  "LeftUpDownVector":"\u2951",
	  "LeftUpTeeVector":"\u2960",
	  "LeftUpVector":"\u21BF",
	  "LeftUpVectorBar":"\u2958",
	  "LeftVector":"\u21BC",
	  "LeftVectorBar":"\u2952",
	  "lEg":"\u2A8B",
	  "leg":"\u22DA",
	  "leq":"\u2264",
	  "leqq":"\u2266",
	  "leqslant":"\u2A7D",
	  "les":"\u2A7D",
	  "lescc":"\u2AA8",
	  "lesdot":"\u2A7F",
	  "lesdoto":"\u2A81",
	  "lesdotor":"\u2A83",
	  "lesg":"\u22DA\uFE00",
	  "lesges":"\u2A93",
	  "lessapprox":"\u2A85",
	  "lessdot":"\u22D6",
	  "lesseqgtr":"\u22DA",
	  "lesseqqgtr":"\u2A8B",
	  "LessEqualGreater":"\u22DA",
	  "LessFullEqual":"\u2266",
	  "LessGreater":"\u2276",
	  "lessgtr":"\u2276",
	  "LessLess":"\u2AA1",
	  "lesssim":"\u2272",
	  "LessSlantEqual":"\u2A7D",
	  "LessTilde":"\u2272",
	  "lfisht":"\u297C",
	  "lfloor":"\u230A",
	  "Lfr":"\uD835\uDD0F",
	  "lfr":"\uD835\uDD29",
	  "lg":"\u2276",
	  "lgE":"\u2A91",
	  "lHar":"\u2962",
	  "lhard":"\u21BD",
	  "lharu":"\u21BC",
	  "lharul":"\u296A",
	  "lhblk":"\u2584",
	  "LJcy":"\u0409",
	  "ljcy":"\u0459",
	  "Ll":"\u22D8",
	  "ll":"\u226A",
	  "llarr":"\u21C7",
	  "llcorner":"\u231E",
	  "Lleftarrow":"\u21DA",
	  "llhard":"\u296B",
	  "lltri":"\u25FA",
	  "Lmidot":"\u013F",
	  "lmidot":"\u0140",
	  "lmoust":"\u23B0",
	  "lmoustache":"\u23B0",
	  "lnap":"\u2A89",
	  "lnapprox":"\u2A89",
	  "lnE":"\u2268",
	  "lne":"\u2A87",
	  "lneq":"\u2A87",
	  "lneqq":"\u2268",
	  "lnsim":"\u22E6",
	  "loang":"\u27EC",
	  "loarr":"\u21FD",
	  "lobrk":"\u27E6",
	  "LongLeftArrow":"\u27F5",
	  "Longleftarrow":"\u27F8",
	  "longleftarrow":"\u27F5",
	  "LongLeftRightArrow":"\u27F7",
	  "Longleftrightarrow":"\u27FA",
	  "longleftrightarrow":"\u27F7",
	  "longmapsto":"\u27FC",
	  "LongRightArrow":"\u27F6",
	  "Longrightarrow":"\u27F9",
	  "longrightarrow":"\u27F6",
	  "looparrowleft":"\u21AB",
	  "looparrowright":"\u21AC",
	  "lopar":"\u2985",
	  "Lopf":"\uD835\uDD43",
	  "lopf":"\uD835\uDD5D",
	  "loplus":"\u2A2D",
	  "lotimes":"\u2A34",
	  "lowast":"\u2217",
	  "lowbar":"\u005F",
	  "LowerLeftArrow":"\u2199",
	  "LowerRightArrow":"\u2198",
	  "loz":"\u25CA",
	  "lozenge":"\u25CA",
	  "lozf":"\u29EB",
	  "lpar":"\u0028",
	  "lparlt":"\u2993",
	  "lrarr":"\u21C6",
	  "lrcorner":"\u231F",
	  "lrhar":"\u21CB",
	  "lrhard":"\u296D",
	  "lrm":"\u200E",
	  "lrtri":"\u22BF",
	  "lsaquo":"\u2039",
	  "Lscr":"\u2112",
	  "lscr":"\uD835\uDCC1",
	  "Lsh":"\u21B0",
	  "lsh":"\u21B0",
	  "lsim":"\u2272",
	  "lsime":"\u2A8D",
	  "lsimg":"\u2A8F",
	  "lsqb":"\u005B",
	  "lsquo":"\u2018",
	  "lsquor":"\u201A",
	  "Lstrok":"\u0141",
	  "lstrok":"\u0142",
	  "LT":"\u003C",
	  "Lt":"\u226A",
	  "lt":"\u003C",
	  "ltcc":"\u2AA6",
	  "ltcir":"\u2A79",
	  "ltdot":"\u22D6",
	  "lthree":"\u22CB",
	  "ltimes":"\u22C9",
	  "ltlarr":"\u2976",
	  "ltquest":"\u2A7B",
	  "ltri":"\u25C3",
	  "ltrie":"\u22B4",
	  "ltrif":"\u25C2",
	  "ltrPar":"\u2996",
	  "lurdshar":"\u294A",
	  "luruhar":"\u2966",
	  "lvertneqq":"\u2268\uFE00",
	  "lvnE":"\u2268\uFE00",
	  "macr":"\u00AF",
	  "male":"\u2642",
	  "malt":"\u2720",
	  "maltese":"\u2720",
	  "Map":"\u2905",
	  "map":"\u21A6",
	  "mapsto":"\u21A6",
	  "mapstodown":"\u21A7",
	  "mapstoleft":"\u21A4",
	  "mapstoup":"\u21A5",
	  "marker":"\u25AE",
	  "mcomma":"\u2A29",
	  "Mcy":"\u041C",
	  "mcy":"\u043C",
	  "mdash":"\u2014",
	  "mDDot":"\u223A",
	  "measuredangle":"\u2221",
	  "MediumSpace":"\u205F",
	  "Mellintrf":"\u2133",
	  "Mfr":"\uD835\uDD10",
	  "mfr":"\uD835\uDD2A",
	  "mho":"\u2127",
	  "micro":"\u00B5",
	  "mid":"\u2223",
	  "midast":"\u002A",
	  "midcir":"\u2AF0",
	  "middot":"\u00B7",
	  "minus":"\u2212",
	  "minusb":"\u229F",
	  "minusd":"\u2238",
	  "minusdu":"\u2A2A",
	  "MinusPlus":"\u2213",
	  "mlcp":"\u2ADB",
	  "mldr":"\u2026",
	  "mnplus":"\u2213",
	  "models":"\u22A7",
	  "Mopf":"\uD835\uDD44",
	  "mopf":"\uD835\uDD5E",
	  "mp":"\u2213",
	  "Mscr":"\u2133",
	  "mscr":"\uD835\uDCC2",
	  "mstpos":"\u223E",
	  "Mu":"\u039C",
	  "mu":"\u03BC",
	  "multimap":"\u22B8",
	  "mumap":"\u22B8",
	  "nabla":"\u2207",
	  "Nacute":"\u0143",
	  "nacute":"\u0144",
	  "nang":"\u2220\u20D2",
	  "nap":"\u2249",
	  "napE":"\u2A70\u0338",
	  "napid":"\u224B\u0338",
	  "napos":"\u0149",
	  "napprox":"\u2249",
	  "natur":"\u266E",
	  "natural":"\u266E",
	  "naturals":"\u2115",
	  "nbsp":"\u00A0",
	  "nbump":"\u224E\u0338",
	  "nbumpe":"\u224F\u0338",
	  "ncap":"\u2A43",
	  "Ncaron":"\u0147",
	  "ncaron":"\u0148",
	  "Ncedil":"\u0145",
	  "ncedil":"\u0146",
	  "ncong":"\u2247",
	  "ncongdot":"\u2A6D\u0338",
	  "ncup":"\u2A42",
	  "Ncy":"\u041D",
	  "ncy":"\u043D",
	  "ndash":"\u2013",
	  "ne":"\u2260",
	  "nearhk":"\u2924",
	  "neArr":"\u21D7",
	  "nearr":"\u2197",
	  "nearrow":"\u2197",
	  "nedot":"\u2250\u0338",
	  "NegativeMediumSpace":"\u200B",
	  "NegativeThickSpace":"\u200B",
	  "NegativeThinSpace":"\u200B",
	  "NegativeVeryThinSpace":"\u200B",
	  "nequiv":"\u2262",
	  "nesear":"\u2928",
	  "nesim":"\u2242\u0338",
	  "NestedGreaterGreater":"\u226B",
	  "NestedLessLess":"\u226A",
	  "NewLine":"\u000A",
	  "nexist":"\u2204",
	  "nexists":"\u2204",
	  "Nfr":"\uD835\uDD11",
	  "nfr":"\uD835\uDD2B",
	  "ngE":"\u2267\u0338",
	  "nge":"\u2271",
	  "ngeq":"\u2271",
	  "ngeqq":"\u2267\u0338",
	  "ngeqslant":"\u2A7E\u0338",
	  "nges":"\u2A7E\u0338",
	  "nGg":"\u22D9\u0338",
	  "ngsim":"\u2275",
	  "nGt":"\u226B\u20D2",
	  "ngt":"\u226F",
	  "ngtr":"\u226F",
	  "nGtv":"\u226B\u0338",
	  "nhArr":"\u21CE",
	  "nharr":"\u21AE",
	  "nhpar":"\u2AF2",
	  "ni":"\u220B",
	  "nis":"\u22FC",
	  "nisd":"\u22FA",
	  "niv":"\u220B",
	  "NJcy":"\u040A",
	  "njcy":"\u045A",
	  "nlArr":"\u21CD",
	  "nlarr":"\u219A",
	  "nldr":"\u2025",
	  "nlE":"\u2266\u0338",
	  "nle":"\u2270",
	  "nLeftarrow":"\u21CD",
	  "nleftarrow":"\u219A",
	  "nLeftrightarrow":"\u21CE",
	  "nleftrightarrow":"\u21AE",
	  "nleq":"\u2270",
	  "nleqq":"\u2266\u0338",
	  "nleqslant":"\u2A7D\u0338",
	  "nles":"\u2A7D\u0338",
	  "nless":"\u226E",
	  "nLl":"\u22D8\u0338",
	  "nlsim":"\u2274",
	  "nLt":"\u226A\u20D2",
	  "nlt":"\u226E",
	  "nltri":"\u22EA",
	  "nltrie":"\u22EC",
	  "nLtv":"\u226A\u0338",
	  "nmid":"\u2224",
	  "NoBreak":"\u2060",
	  "NonBreakingSpace":"\u00A0",
	  "Nopf":"\u2115",
	  "nopf":"\uD835\uDD5F",
	  "Not":"\u2AEC",
	  "not":"\u00AC",
	  "NotCongruent":"\u2262",
	  "NotCupCap":"\u226D",
	  "NotDoubleVerticalBar":"\u2226",
	  "NotElement":"\u2209",
	  "NotEqual":"\u2260",
	  "NotEqualTilde":"\u2242\u0338",
	  "NotExists":"\u2204",
	  "NotGreater":"\u226F",
	  "NotGreaterEqual":"\u2271",
	  "NotGreaterFullEqual":"\u2267\u0338",
	  "NotGreaterGreater":"\u226B\u0338",
	  "NotGreaterLess":"\u2279",
	  "NotGreaterSlantEqual":"\u2A7E\u0338",
	  "NotGreaterTilde":"\u2275",
	  "NotHumpDownHump":"\u224E\u0338",
	  "NotHumpEqual":"\u224F\u0338",
	  "notin":"\u2209",
	  "notindot":"\u22F5\u0338",
	  "notinE":"\u22F9\u0338",
	  "notinva":"\u2209",
	  "notinvb":"\u22F7",
	  "notinvc":"\u22F6",
	  "NotLeftTriangle":"\u22EA",
	  "NotLeftTriangleBar":"\u29CF\u0338",
	  "NotLeftTriangleEqual":"\u22EC",
	  "NotLess":"\u226E",
	  "NotLessEqual":"\u2270",
	  "NotLessGreater":"\u2278",
	  "NotLessLess":"\u226A\u0338",
	  "NotLessSlantEqual":"\u2A7D\u0338",
	  "NotLessTilde":"\u2274",
	  "NotNestedGreaterGreater":"\u2AA2\u0338",
	  "NotNestedLessLess":"\u2AA1\u0338",
	  "notni":"\u220C",
	  "notniva":"\u220C",
	  "notnivb":"\u22FE",
	  "notnivc":"\u22FD",
	  "NotPrecedes":"\u2280",
	  "NotPrecedesEqual":"\u2AAF\u0338",
	  "NotPrecedesSlantEqual":"\u22E0",
	  "NotReverseElement":"\u220C",
	  "NotRightTriangle":"\u22EB",
	  "NotRightTriangleBar":"\u29D0\u0338",
	  "NotRightTriangleEqual":"\u22ED",
	  "NotSquareSubset":"\u228F\u0338",
	  "NotSquareSubsetEqual":"\u22E2",
	  "NotSquareSuperset":"\u2290\u0338",
	  "NotSquareSupersetEqual":"\u22E3",
	  "NotSubset":"\u2282\u20D2",
	  "NotSubsetEqual":"\u2288",
	  "NotSucceeds":"\u2281",
	  "NotSucceedsEqual":"\u2AB0\u0338",
	  "NotSucceedsSlantEqual":"\u22E1",
	  "NotSucceedsTilde":"\u227F\u0338",
	  "NotSuperset":"\u2283\u20D2",
	  "NotSupersetEqual":"\u2289",
	  "NotTilde":"\u2241",
	  "NotTildeEqual":"\u2244",
	  "NotTildeFullEqual":"\u2247",
	  "NotTildeTilde":"\u2249",
	  "NotVerticalBar":"\u2224",
	  "npar":"\u2226",
	  "nparallel":"\u2226",
	  "nparsl":"\u2AFD\u20E5",
	  "npart":"\u2202\u0338",
	  "npolint":"\u2A14",
	  "npr":"\u2280",
	  "nprcue":"\u22E0",
	  "npre":"\u2AAF\u0338",
	  "nprec":"\u2280",
	  "npreceq":"\u2AAF\u0338",
	  "nrArr":"\u21CF",
	  "nrarr":"\u219B",
	  "nrarrc":"\u2933\u0338",
	  "nrarrw":"\u219D\u0338",
	  "nRightarrow":"\u21CF",
	  "nrightarrow":"\u219B",
	  "nrtri":"\u22EB",
	  "nrtrie":"\u22ED",
	  "nsc":"\u2281",
	  "nsccue":"\u22E1",
	  "nsce":"\u2AB0\u0338",
	  "Nscr":"\uD835\uDCA9",
	  "nscr":"\uD835\uDCC3",
	  "nshortmid":"\u2224",
	  "nshortparallel":"\u2226",
	  "nsim":"\u2241",
	  "nsime":"\u2244",
	  "nsimeq":"\u2244",
	  "nsmid":"\u2224",
	  "nspar":"\u2226",
	  "nsqsube":"\u22E2",
	  "nsqsupe":"\u22E3",
	  "nsub":"\u2284",
	  "nsubE":"\u2AC5\u0338",
	  "nsube":"\u2288",
	  "nsubset":"\u2282\u20D2",
	  "nsubseteq":"\u2288",
	  "nsubseteqq":"\u2AC5\u0338",
	  "nsucc":"\u2281",
	  "nsucceq":"\u2AB0\u0338",
	  "nsup":"\u2285",
	  "nsupE":"\u2AC6\u0338",
	  "nsupe":"\u2289",
	  "nsupset":"\u2283\u20D2",
	  "nsupseteq":"\u2289",
	  "nsupseteqq":"\u2AC6\u0338",
	  "ntgl":"\u2279",
	  "Ntilde":"\u00D1",
	  "ntilde":"\u00F1",
	  "ntlg":"\u2278",
	  "ntriangleleft":"\u22EA",
	  "ntrianglelefteq":"\u22EC",
	  "ntriangleright":"\u22EB",
	  "ntrianglerighteq":"\u22ED",
	  "Nu":"\u039D",
	  "nu":"\u03BD",
	  "num":"\u0023",
	  "numero":"\u2116",
	  "numsp":"\u2007",
	  "nvap":"\u224D\u20D2",
	  "nVDash":"\u22AF",
	  "nVdash":"\u22AE",
	  "nvDash":"\u22AD",
	  "nvdash":"\u22AC",
	  "nvge":"\u2265\u20D2",
	  "nvgt":"\u003E\u20D2",
	  "nvHarr":"\u2904",
	  "nvinfin":"\u29DE",
	  "nvlArr":"\u2902",
	  "nvle":"\u2264\u20D2",
	  "nvlt":"\u003C\u20D2",
	  "nvltrie":"\u22B4\u20D2",
	  "nvrArr":"\u2903",
	  "nvrtrie":"\u22B5\u20D2",
	  "nvsim":"\u223C\u20D2",
	  "nwarhk":"\u2923",
	  "nwArr":"\u21D6",
	  "nwarr":"\u2196",
	  "nwarrow":"\u2196",
	  "nwnear":"\u2927",
	  "Oacute":"\u00D3",
	  "oacute":"\u00F3",
	  "oast":"\u229B",
	  "ocir":"\u229A",
	  "Ocirc":"\u00D4",
	  "ocirc":"\u00F4",
	  "Ocy":"\u041E",
	  "ocy":"\u043E",
	  "odash":"\u229D",
	  "Odblac":"\u0150",
	  "odblac":"\u0151",
	  "odiv":"\u2A38",
	  "odot":"\u2299",
	  "odsold":"\u29BC",
	  "OElig":"\u0152",
	  "oelig":"\u0153",
	  "ofcir":"\u29BF",
	  "Ofr":"\uD835\uDD12",
	  "ofr":"\uD835\uDD2C",
	  "ogon":"\u02DB",
	  "Ograve":"\u00D2",
	  "ograve":"\u00F2",
	  "ogt":"\u29C1",
	  "ohbar":"\u29B5",
	  "ohm":"\u03A9",
	  "oint":"\u222E",
	  "olarr":"\u21BA",
	  "olcir":"\u29BE",
	  "olcross":"\u29BB",
	  "oline":"\u203E",
	  "olt":"\u29C0",
	  "Omacr":"\u014C",
	  "omacr":"\u014D",
	  "Omega":"\u03A9",
	  "omega":"\u03C9",
	  "Omicron":"\u039F",
	  "omicron":"\u03BF",
	  "omid":"\u29B6",
	  "ominus":"\u2296",
	  "Oopf":"\uD835\uDD46",
	  "oopf":"\uD835\uDD60",
	  "opar":"\u29B7",
	  "OpenCurlyDoubleQuote":"\u201C",
	  "OpenCurlyQuote":"\u2018",
	  "operp":"\u29B9",
	  "oplus":"\u2295",
	  "Or":"\u2A54",
	  "or":"\u2228",
	  "orarr":"\u21BB",
	  "ord":"\u2A5D",
	  "order":"\u2134",
	  "orderof":"\u2134",
	  "ordf":"\u00AA",
	  "ordm":"\u00BA",
	  "origof":"\u22B6",
	  "oror":"\u2A56",
	  "orslope":"\u2A57",
	  "orv":"\u2A5B",
	  "oS":"\u24C8",
	  "Oscr":"\uD835\uDCAA",
	  "oscr":"\u2134",
	  "Oslash":"\u00D8",
	  "oslash":"\u00F8",
	  "osol":"\u2298",
	  "Otilde":"\u00D5",
	  "otilde":"\u00F5",
	  "Otimes":"\u2A37",
	  "otimes":"\u2297",
	  "otimesas":"\u2A36",
	  "Ouml":"\u00D6",
	  "ouml":"\u00F6",
	  "ovbar":"\u233D",
	  "OverBar":"\u203E",
	  "OverBrace":"\u23DE",
	  "OverBracket":"\u23B4",
	  "OverParenthesis":"\u23DC",
	  "par":"\u2225",
	  "para":"\u00B6",
	  "parallel":"\u2225",
	  "parsim":"\u2AF3",
	  "parsl":"\u2AFD",
	  "part":"\u2202",
	  "PartialD":"\u2202",
	  "Pcy":"\u041F",
	  "pcy":"\u043F",
	  "percnt":"\u0025",
	  "period":"\u002E",
	  "permil":"\u2030",
	  "perp":"\u22A5",
	  "pertenk":"\u2031",
	  "Pfr":"\uD835\uDD13",
	  "pfr":"\uD835\uDD2D",
	  "Phi":"\u03A6",
	  "phi":"\u03C6",
	  "phiv":"\u03D5",
	  "phmmat":"\u2133",
	  "phone":"\u260E",
	  "Pi":"\u03A0",
	  "pi":"\u03C0",
	  "pitchfork":"\u22D4",
	  "piv":"\u03D6",
	  "planck":"\u210F",
	  "planckh":"\u210E",
	  "plankv":"\u210F",
	  "plus":"\u002B",
	  "plusacir":"\u2A23",
	  "plusb":"\u229E",
	  "pluscir":"\u2A22",
	  "plusdo":"\u2214",
	  "plusdu":"\u2A25",
	  "pluse":"\u2A72",
	  "PlusMinus":"\u00B1",
	  "plusmn":"\u00B1",
	  "plussim":"\u2A26",
	  "plustwo":"\u2A27",
	  "pm":"\u00B1",
	  "Poincareplane":"\u210C",
	  "pointint":"\u2A15",
	  "Popf":"\u2119",
	  "popf":"\uD835\uDD61",
	  "pound":"\u00A3",
	  "Pr":"\u2ABB",
	  "pr":"\u227A",
	  "prap":"\u2AB7",
	  "prcue":"\u227C",
	  "prE":"\u2AB3",
	  "pre":"\u2AAF",
	  "prec":"\u227A",
	  "precapprox":"\u2AB7",
	  "preccurlyeq":"\u227C",
	  "Precedes":"\u227A",
	  "PrecedesEqual":"\u2AAF",
	  "PrecedesSlantEqual":"\u227C",
	  "PrecedesTilde":"\u227E",
	  "preceq":"\u2AAF",
	  "precnapprox":"\u2AB9",
	  "precneqq":"\u2AB5",
	  "precnsim":"\u22E8",
	  "precsim":"\u227E",
	  "Prime":"\u2033",
	  "prime":"\u2032",
	  "primes":"\u2119",
	  "prnap":"\u2AB9",
	  "prnE":"\u2AB5",
	  "prnsim":"\u22E8",
	  "prod":"\u220F",
	  "Product":"\u220F",
	  "profalar":"\u232E",
	  "profline":"\u2312",
	  "profsurf":"\u2313",
	  "prop":"\u221D",
	  "Proportion":"\u2237",
	  "Proportional":"\u221D",
	  "propto":"\u221D",
	  "prsim":"\u227E",
	  "prurel":"\u22B0",
	  "Pscr":"\uD835\uDCAB",
	  "pscr":"\uD835\uDCC5",
	  "Psi":"\u03A8",
	  "psi":"\u03C8",
	  "puncsp":"\u2008",
	  "Qfr":"\uD835\uDD14",
	  "qfr":"\uD835\uDD2E",
	  "qint":"\u2A0C",
	  "Qopf":"\u211A",
	  "qopf":"\uD835\uDD62",
	  "qprime":"\u2057",
	  "Qscr":"\uD835\uDCAC",
	  "qscr":"\uD835\uDCC6",
	  "quaternions":"\u210D",
	  "quatint":"\u2A16",
	  "quest":"\u003F",
	  "questeq":"\u225F",
	  "QUOT":"\u0022",
	  "quot":"\u0022",
	  "rAarr":"\u21DB",
	  "race":"\u223D\u0331",
	  "Racute":"\u0154",
	  "racute":"\u0155",
	  "radic":"\u221A",
	  "raemptyv":"\u29B3",
	  "Rang":"\u27EB",
	  "rang":"\u27E9",
	  "rangd":"\u2992",
	  "range":"\u29A5",
	  "rangle":"\u27E9",
	  "raquo":"\u00BB",
	  "Rarr":"\u21A0",
	  "rArr":"\u21D2",
	  "rarr":"\u2192",
	  "rarrap":"\u2975",
	  "rarrb":"\u21E5",
	  "rarrbfs":"\u2920",
	  "rarrc":"\u2933",
	  "rarrfs":"\u291E",
	  "rarrhk":"\u21AA",
	  "rarrlp":"\u21AC",
	  "rarrpl":"\u2945",
	  "rarrsim":"\u2974",
	  "Rarrtl":"\u2916",
	  "rarrtl":"\u21A3",
	  "rarrw":"\u219D",
	  "rAtail":"\u291C",
	  "ratail":"\u291A",
	  "ratio":"\u2236",
	  "rationals":"\u211A",
	  "RBarr":"\u2910",
	  "rBarr":"\u290F",
	  "rbarr":"\u290D",
	  "rbbrk":"\u2773",
	  "rbrace":"\u007D",
	  "rbrack":"\u005D",
	  "rbrke":"\u298C",
	  "rbrksld":"\u298E",
	  "rbrkslu":"\u2990",
	  "Rcaron":"\u0158",
	  "rcaron":"\u0159",
	  "Rcedil":"\u0156",
	  "rcedil":"\u0157",
	  "rceil":"\u2309",
	  "rcub":"\u007D",
	  "Rcy":"\u0420",
	  "rcy":"\u0440",
	  "rdca":"\u2937",
	  "rdldhar":"\u2969",
	  "rdquo":"\u201D",
	  "rdquor":"\u201D",
	  "rdsh":"\u21B3",
	  "Re":"\u211C",
	  "real":"\u211C",
	  "realine":"\u211B",
	  "realpart":"\u211C",
	  "reals":"\u211D",
	  "rect":"\u25AD",
	  "REG":"\u00AE",
	  "reg":"\u00AE",
	  "ReverseElement":"\u220B",
	  "ReverseEquilibrium":"\u21CB",
	  "ReverseUpEquilibrium":"\u296F",
	  "rfisht":"\u297D",
	  "rfloor":"\u230B",
	  "Rfr":"\u211C",
	  "rfr":"\uD835\uDD2F",
	  "rHar":"\u2964",
	  "rhard":"\u21C1",
	  "rharu":"\u21C0",
	  "rharul":"\u296C",
	  "Rho":"\u03A1",
	  "rho":"\u03C1",
	  "rhov":"\u03F1",
	  "RightAngleBracket":"\u27E9",
	  "RightArrow":"\u2192",
	  "Rightarrow":"\u21D2",
	  "rightarrow":"\u2192",
	  "RightArrowBar":"\u21E5",
	  "RightArrowLeftArrow":"\u21C4",
	  "rightarrowtail":"\u21A3",
	  "RightCeiling":"\u2309",
	  "RightDoubleBracket":"\u27E7",
	  "RightDownTeeVector":"\u295D",
	  "RightDownVector":"\u21C2",
	  "RightDownVectorBar":"\u2955",
	  "RightFloor":"\u230B",
	  "rightharpoondown":"\u21C1",
	  "rightharpoonup":"\u21C0",
	  "rightleftarrows":"\u21C4",
	  "rightleftharpoons":"\u21CC",
	  "rightrightarrows":"\u21C9",
	  "rightsquigarrow":"\u219D",
	  "RightTee":"\u22A2",
	  "RightTeeArrow":"\u21A6",
	  "RightTeeVector":"\u295B",
	  "rightthreetimes":"\u22CC",
	  "RightTriangle":"\u22B3",
	  "RightTriangleBar":"\u29D0",
	  "RightTriangleEqual":"\u22B5",
	  "RightUpDownVector":"\u294F",
	  "RightUpTeeVector":"\u295C",
	  "RightUpVector":"\u21BE",
	  "RightUpVectorBar":"\u2954",
	  "RightVector":"\u21C0",
	  "RightVectorBar":"\u2953",
	  "ring":"\u02DA",
	  "risingdotseq":"\u2253",
	  "rlarr":"\u21C4",
	  "rlhar":"\u21CC",
	  "rlm":"\u200F",
	  "rmoust":"\u23B1",
	  "rmoustache":"\u23B1",
	  "rnmid":"\u2AEE",
	  "roang":"\u27ED",
	  "roarr":"\u21FE",
	  "robrk":"\u27E7",
	  "ropar":"\u2986",
	  "Ropf":"\u211D",
	  "ropf":"\uD835\uDD63",
	  "roplus":"\u2A2E",
	  "rotimes":"\u2A35",
	  "RoundImplies":"\u2970",
	  "rpar":"\u0029",
	  "rpargt":"\u2994",
	  "rppolint":"\u2A12",
	  "rrarr":"\u21C9",
	  "Rrightarrow":"\u21DB",
	  "rsaquo":"\u203A",
	  "Rscr":"\u211B",
	  "rscr":"\uD835\uDCC7",
	  "Rsh":"\u21B1",
	  "rsh":"\u21B1",
	  "rsqb":"\u005D",
	  "rsquo":"\u2019",
	  "rsquor":"\u2019",
	  "rthree":"\u22CC",
	  "rtimes":"\u22CA",
	  "rtri":"\u25B9",
	  "rtrie":"\u22B5",
	  "rtrif":"\u25B8",
	  "rtriltri":"\u29CE",
	  "RuleDelayed":"\u29F4",
	  "ruluhar":"\u2968",
	  "rx":"\u211E",
	  "Sacute":"\u015A",
	  "sacute":"\u015B",
	  "sbquo":"\u201A",
	  "Sc":"\u2ABC",
	  "sc":"\u227B",
	  "scap":"\u2AB8",
	  "Scaron":"\u0160",
	  "scaron":"\u0161",
	  "sccue":"\u227D",
	  "scE":"\u2AB4",
	  "sce":"\u2AB0",
	  "Scedil":"\u015E",
	  "scedil":"\u015F",
	  "Scirc":"\u015C",
	  "scirc":"\u015D",
	  "scnap":"\u2ABA",
	  "scnE":"\u2AB6",
	  "scnsim":"\u22E9",
	  "scpolint":"\u2A13",
	  "scsim":"\u227F",
	  "Scy":"\u0421",
	  "scy":"\u0441",
	  "sdot":"\u22C5",
	  "sdotb":"\u22A1",
	  "sdote":"\u2A66",
	  "searhk":"\u2925",
	  "seArr":"\u21D8",
	  "searr":"\u2198",
	  "searrow":"\u2198",
	  "sect":"\u00A7",
	  "semi":"\u003B",
	  "seswar":"\u2929",
	  "setminus":"\u2216",
	  "setmn":"\u2216",
	  "sext":"\u2736",
	  "Sfr":"\uD835\uDD16",
	  "sfr":"\uD835\uDD30",
	  "sfrown":"\u2322",
	  "sharp":"\u266F",
	  "SHCHcy":"\u0429",
	  "shchcy":"\u0449",
	  "SHcy":"\u0428",
	  "shcy":"\u0448",
	  "ShortDownArrow":"\u2193",
	  "ShortLeftArrow":"\u2190",
	  "shortmid":"\u2223",
	  "shortparallel":"\u2225",
	  "ShortRightArrow":"\u2192",
	  "ShortUpArrow":"\u2191",
	  "shy":"\u00AD",
	  "Sigma":"\u03A3",
	  "sigma":"\u03C3",
	  "sigmaf":"\u03C2",
	  "sigmav":"\u03C2",
	  "sim":"\u223C",
	  "simdot":"\u2A6A",
	  "sime":"\u2243",
	  "simeq":"\u2243",
	  "simg":"\u2A9E",
	  "simgE":"\u2AA0",
	  "siml":"\u2A9D",
	  "simlE":"\u2A9F",
	  "simne":"\u2246",
	  "simplus":"\u2A24",
	  "simrarr":"\u2972",
	  "slarr":"\u2190",
	  "SmallCircle":"\u2218",
	  "smallsetminus":"\u2216",
	  "smashp":"\u2A33",
	  "smeparsl":"\u29E4",
	  "smid":"\u2223",
	  "smile":"\u2323",
	  "smt":"\u2AAA",
	  "smte":"\u2AAC",
	  "smtes":"\u2AAC\uFE00",
	  "SOFTcy":"\u042C",
	  "softcy":"\u044C",
	  "sol":"\u002F",
	  "solb":"\u29C4",
	  "solbar":"\u233F",
	  "Sopf":"\uD835\uDD4A",
	  "sopf":"\uD835\uDD64",
	  "spades":"\u2660",
	  "spadesuit":"\u2660",
	  "spar":"\u2225",
	  "sqcap":"\u2293",
	  "sqcaps":"\u2293\uFE00",
	  "sqcup":"\u2294",
	  "sqcups":"\u2294\uFE00",
	  "Sqrt":"\u221A",
	  "sqsub":"\u228F",
	  "sqsube":"\u2291",
	  "sqsubset":"\u228F",
	  "sqsubseteq":"\u2291",
	  "sqsup":"\u2290",
	  "sqsupe":"\u2292",
	  "sqsupset":"\u2290",
	  "sqsupseteq":"\u2292",
	  "squ":"\u25A1",
	  "Square":"\u25A1",
	  "square":"\u25A1",
	  "SquareIntersection":"\u2293",
	  "SquareSubset":"\u228F",
	  "SquareSubsetEqual":"\u2291",
	  "SquareSuperset":"\u2290",
	  "SquareSupersetEqual":"\u2292",
	  "SquareUnion":"\u2294",
	  "squarf":"\u25AA",
	  "squf":"\u25AA",
	  "srarr":"\u2192",
	  "Sscr":"\uD835\uDCAE",
	  "sscr":"\uD835\uDCC8",
	  "ssetmn":"\u2216",
	  "ssmile":"\u2323",
	  "sstarf":"\u22C6",
	  "Star":"\u22C6",
	  "star":"\u2606",
	  "starf":"\u2605",
	  "straightepsilon":"\u03F5",
	  "straightphi":"\u03D5",
	  "strns":"\u00AF",
	  "Sub":"\u22D0",
	  "sub":"\u2282",
	  "subdot":"\u2ABD",
	  "subE":"\u2AC5",
	  "sube":"\u2286",
	  "subedot":"\u2AC3",
	  "submult":"\u2AC1",
	  "subnE":"\u2ACB",
	  "subne":"\u228A",
	  "subplus":"\u2ABF",
	  "subrarr":"\u2979",
	  "Subset":"\u22D0",
	  "subset":"\u2282",
	  "subseteq":"\u2286",
	  "subseteqq":"\u2AC5",
	  "SubsetEqual":"\u2286",
	  "subsetneq":"\u228A",
	  "subsetneqq":"\u2ACB",
	  "subsim":"\u2AC7",
	  "subsub":"\u2AD5",
	  "subsup":"\u2AD3",
	  "succ":"\u227B",
	  "succapprox":"\u2AB8",
	  "succcurlyeq":"\u227D",
	  "Succeeds":"\u227B",
	  "SucceedsEqual":"\u2AB0",
	  "SucceedsSlantEqual":"\u227D",
	  "SucceedsTilde":"\u227F",
	  "succeq":"\u2AB0",
	  "succnapprox":"\u2ABA",
	  "succneqq":"\u2AB6",
	  "succnsim":"\u22E9",
	  "succsim":"\u227F",
	  "SuchThat":"\u220B",
	  "Sum":"\u2211",
	  "sum":"\u2211",
	  "sung":"\u266A",
	  "Sup":"\u22D1",
	  "sup":"\u2283",
	  "sup1":"\u00B9",
	  "sup2":"\u00B2",
	  "sup3":"\u00B3",
	  "supdot":"\u2ABE",
	  "supdsub":"\u2AD8",
	  "supE":"\u2AC6",
	  "supe":"\u2287",
	  "supedot":"\u2AC4",
	  "Superset":"\u2283",
	  "SupersetEqual":"\u2287",
	  "suphsol":"\u27C9",
	  "suphsub":"\u2AD7",
	  "suplarr":"\u297B",
	  "supmult":"\u2AC2",
	  "supnE":"\u2ACC",
	  "supne":"\u228B",
	  "supplus":"\u2AC0",
	  "Supset":"\u22D1",
	  "supset":"\u2283",
	  "supseteq":"\u2287",
	  "supseteqq":"\u2AC6",
	  "supsetneq":"\u228B",
	  "supsetneqq":"\u2ACC",
	  "supsim":"\u2AC8",
	  "supsub":"\u2AD4",
	  "supsup":"\u2AD6",
	  "swarhk":"\u2926",
	  "swArr":"\u21D9",
	  "swarr":"\u2199",
	  "swarrow":"\u2199",
	  "swnwar":"\u292A",
	  "szlig":"\u00DF",
	  "Tab":"\u0009",
	  "target":"\u2316",
	  "Tau":"\u03A4",
	  "tau":"\u03C4",
	  "tbrk":"\u23B4",
	  "Tcaron":"\u0164",
	  "tcaron":"\u0165",
	  "Tcedil":"\u0162",
	  "tcedil":"\u0163",
	  "Tcy":"\u0422",
	  "tcy":"\u0442",
	  "tdot":"\u20DB",
	  "telrec":"\u2315",
	  "Tfr":"\uD835\uDD17",
	  "tfr":"\uD835\uDD31",
	  "there4":"\u2234",
	  "Therefore":"\u2234",
	  "therefore":"\u2234",
	  "Theta":"\u0398",
	  "theta":"\u03B8",
	  "thetasym":"\u03D1",
	  "thetav":"\u03D1",
	  "thickapprox":"\u2248",
	  "thicksim":"\u223C",
	  "ThickSpace":"\u205F\u200A",
	  "thinsp":"\u2009",
	  "ThinSpace":"\u2009",
	  "thkap":"\u2248",
	  "thksim":"\u223C",
	  "THORN":"\u00DE",
	  "thorn":"\u00FE",
	  "Tilde":"\u223C",
	  "tilde":"\u02DC",
	  "TildeEqual":"\u2243",
	  "TildeFullEqual":"\u2245",
	  "TildeTilde":"\u2248",
	  "times":"\u00D7",
	  "timesb":"\u22A0",
	  "timesbar":"\u2A31",
	  "timesd":"\u2A30",
	  "tint":"\u222D",
	  "toea":"\u2928",
	  "top":"\u22A4",
	  "topbot":"\u2336",
	  "topcir":"\u2AF1",
	  "Topf":"\uD835\uDD4B",
	  "topf":"\uD835\uDD65",
	  "topfork":"\u2ADA",
	  "tosa":"\u2929",
	  "tprime":"\u2034",
	  "TRADE":"\u2122",
	  "trade":"\u2122",
	  "triangle":"\u25B5",
	  "triangledown":"\u25BF",
	  "triangleleft":"\u25C3",
	  "trianglelefteq":"\u22B4",
	  "triangleq":"\u225C",
	  "triangleright":"\u25B9",
	  "trianglerighteq":"\u22B5",
	  "tridot":"\u25EC",
	  "trie":"\u225C",
	  "triminus":"\u2A3A",
	  "TripleDot":"\u20DB",
	  "triplus":"\u2A39",
	  "trisb":"\u29CD",
	  "tritime":"\u2A3B",
	  "trpezium":"\u23E2",
	  "Tscr":"\uD835\uDCAF",
	  "tscr":"\uD835\uDCC9",
	  "TScy":"\u0426",
	  "tscy":"\u0446",
	  "TSHcy":"\u040B",
	  "tshcy":"\u045B",
	  "Tstrok":"\u0166",
	  "tstrok":"\u0167",
	  "twixt":"\u226C",
	  "twoheadleftarrow":"\u219E",
	  "twoheadrightarrow":"\u21A0",
	  "Uacute":"\u00DA",
	  "uacute":"\u00FA",
	  "Uarr":"\u219F",
	  "uArr":"\u21D1",
	  "uarr":"\u2191",
	  "Uarrocir":"\u2949",
	  "Ubrcy":"\u040E",
	  "ubrcy":"\u045E",
	  "Ubreve":"\u016C",
	  "ubreve":"\u016D",
	  "Ucirc":"\u00DB",
	  "ucirc":"\u00FB",
	  "Ucy":"\u0423",
	  "ucy":"\u0443",
	  "udarr":"\u21C5",
	  "Udblac":"\u0170",
	  "udblac":"\u0171",
	  "udhar":"\u296E",
	  "ufisht":"\u297E",
	  "Ufr":"\uD835\uDD18",
	  "ufr":"\uD835\uDD32",
	  "Ugrave":"\u00D9",
	  "ugrave":"\u00F9",
	  "uHar":"\u2963",
	  "uharl":"\u21BF",
	  "uharr":"\u21BE",
	  "uhblk":"\u2580",
	  "ulcorn":"\u231C",
	  "ulcorner":"\u231C",
	  "ulcrop":"\u230F",
	  "ultri":"\u25F8",
	  "Umacr":"\u016A",
	  "umacr":"\u016B",
	  "uml":"\u00A8",
	  "UnderBar":"\u005F",
	  "UnderBrace":"\u23DF",
	  "UnderBracket":"\u23B5",
	  "UnderParenthesis":"\u23DD",
	  "Union":"\u22C3",
	  "UnionPlus":"\u228E",
	  "Uogon":"\u0172",
	  "uogon":"\u0173",
	  "Uopf":"\uD835\uDD4C",
	  "uopf":"\uD835\uDD66",
	  "UpArrow":"\u2191",
	  "Uparrow":"\u21D1",
	  "uparrow":"\u2191",
	  "UpArrowBar":"\u2912",
	  "UpArrowDownArrow":"\u21C5",
	  "UpDownArrow":"\u2195",
	  "Updownarrow":"\u21D5",
	  "updownarrow":"\u2195",
	  "UpEquilibrium":"\u296E",
	  "upharpoonleft":"\u21BF",
	  "upharpoonright":"\u21BE",
	  "uplus":"\u228E",
	  "UpperLeftArrow":"\u2196",
	  "UpperRightArrow":"\u2197",
	  "Upsi":"\u03D2",
	  "upsi":"\u03C5",
	  "upsih":"\u03D2",
	  "Upsilon":"\u03A5",
	  "upsilon":"\u03C5",
	  "UpTee":"\u22A5",
	  "UpTeeArrow":"\u21A5",
	  "upuparrows":"\u21C8",
	  "urcorn":"\u231D",
	  "urcorner":"\u231D",
	  "urcrop":"\u230E",
	  "Uring":"\u016E",
	  "uring":"\u016F",
	  "urtri":"\u25F9",
	  "Uscr":"\uD835\uDCB0",
	  "uscr":"\uD835\uDCCA",
	  "utdot":"\u22F0",
	  "Utilde":"\u0168",
	  "utilde":"\u0169",
	  "utri":"\u25B5",
	  "utrif":"\u25B4",
	  "uuarr":"\u21C8",
	  "Uuml":"\u00DC",
	  "uuml":"\u00FC",
	  "uwangle":"\u29A7",
	  "vangrt":"\u299C",
	  "varepsilon":"\u03F5",
	  "varkappa":"\u03F0",
	  "varnothing":"\u2205",
	  "varphi":"\u03D5",
	  "varpi":"\u03D6",
	  "varpropto":"\u221D",
	  "vArr":"\u21D5",
	  "varr":"\u2195",
	  "varrho":"\u03F1",
	  "varsigma":"\u03C2",
	  "varsubsetneq":"\u228A\uFE00",
	  "varsubsetneqq":"\u2ACB\uFE00",
	  "varsupsetneq":"\u228B\uFE00",
	  "varsupsetneqq":"\u2ACC\uFE00",
	  "vartheta":"\u03D1",
	  "vartriangleleft":"\u22B2",
	  "vartriangleright":"\u22B3",
	  "Vbar":"\u2AEB",
	  "vBar":"\u2AE8",
	  "vBarv":"\u2AE9",
	  "Vcy":"\u0412",
	  "vcy":"\u0432",
	  "VDash":"\u22AB",
	  "Vdash":"\u22A9",
	  "vDash":"\u22A8",
	  "vdash":"\u22A2",
	  "Vdashl":"\u2AE6",
	  "Vee":"\u22C1",
	  "vee":"\u2228",
	  "veebar":"\u22BB",
	  "veeeq":"\u225A",
	  "vellip":"\u22EE",
	  "Verbar":"\u2016",
	  "verbar":"\u007C",
	  "Vert":"\u2016",
	  "vert":"\u007C",
	  "VerticalBar":"\u2223",
	  "VerticalLine":"\u007C",
	  "VerticalSeparator":"\u2758",
	  "VerticalTilde":"\u2240",
	  "VeryThinSpace":"\u200A",
	  "Vfr":"\uD835\uDD19",
	  "vfr":"\uD835\uDD33",
	  "vltri":"\u22B2",
	  "vnsub":"\u2282\u20D2",
	  "vnsup":"\u2283\u20D2",
	  "Vopf":"\uD835\uDD4D",
	  "vopf":"\uD835\uDD67",
	  "vprop":"\u221D",
	  "vrtri":"\u22B3",
	  "Vscr":"\uD835\uDCB1",
	  "vscr":"\uD835\uDCCB",
	  "vsubnE":"\u2ACB\uFE00",
	  "vsubne":"\u228A\uFE00",
	  "vsupnE":"\u2ACC\uFE00",
	  "vsupne":"\u228B\uFE00",
	  "Vvdash":"\u22AA",
	  "vzigzag":"\u299A",
	  "Wcirc":"\u0174",
	  "wcirc":"\u0175",
	  "wedbar":"\u2A5F",
	  "Wedge":"\u22C0",
	  "wedge":"\u2227",
	  "wedgeq":"\u2259",
	  "weierp":"\u2118",
	  "Wfr":"\uD835\uDD1A",
	  "wfr":"\uD835\uDD34",
	  "Wopf":"\uD835\uDD4E",
	  "wopf":"\uD835\uDD68",
	  "wp":"\u2118",
	  "wr":"\u2240",
	  "wreath":"\u2240",
	  "Wscr":"\uD835\uDCB2",
	  "wscr":"\uD835\uDCCC",
	  "xcap":"\u22C2",
	  "xcirc":"\u25EF",
	  "xcup":"\u22C3",
	  "xdtri":"\u25BD",
	  "Xfr":"\uD835\uDD1B",
	  "xfr":"\uD835\uDD35",
	  "xhArr":"\u27FA",
	  "xharr":"\u27F7",
	  "Xi":"\u039E",
	  "xi":"\u03BE",
	  "xlArr":"\u27F8",
	  "xlarr":"\u27F5",
	  "xmap":"\u27FC",
	  "xnis":"\u22FB",
	  "xodot":"\u2A00",
	  "Xopf":"\uD835\uDD4F",
	  "xopf":"\uD835\uDD69",
	  "xoplus":"\u2A01",
	  "xotime":"\u2A02",
	  "xrArr":"\u27F9",
	  "xrarr":"\u27F6",
	  "Xscr":"\uD835\uDCB3",
	  "xscr":"\uD835\uDCCD",
	  "xsqcup":"\u2A06",
	  "xuplus":"\u2A04",
	  "xutri":"\u25B3",
	  "xvee":"\u22C1",
	  "xwedge":"\u22C0",
	  "Yacute":"\u00DD",
	  "yacute":"\u00FD",
	  "YAcy":"\u042F",
	  "yacy":"\u044F",
	  "Ycirc":"\u0176",
	  "ycirc":"\u0177",
	  "Ycy":"\u042B",
	  "ycy":"\u044B",
	  "yen":"\u00A5",
	  "Yfr":"\uD835\uDD1C",
	  "yfr":"\uD835\uDD36",
	  "YIcy":"\u0407",
	  "yicy":"\u0457",
	  "Yopf":"\uD835\uDD50",
	  "yopf":"\uD835\uDD6A",
	  "Yscr":"\uD835\uDCB4",
	  "yscr":"\uD835\uDCCE",
	  "YUcy":"\u042E",
	  "yucy":"\u044E",
	  "Yuml":"\u0178",
	  "yuml":"\u00FF",
	  "Zacute":"\u0179",
	  "zacute":"\u017A",
	  "Zcaron":"\u017D",
	  "zcaron":"\u017E",
	  "Zcy":"\u0417",
	  "zcy":"\u0437",
	  "Zdot":"\u017B",
	  "zdot":"\u017C",
	  "zeetrf":"\u2128",
	  "ZeroWidthSpace":"\u200B",
	  "Zeta":"\u0396",
	  "zeta":"\u03B6",
	  "Zfr":"\u2128",
	  "zfr":"\uD835\uDD37",
	  "ZHcy":"\u0416",
	  "zhcy":"\u0436",
	  "zigrarr":"\u21DD",
	  "Zopf":"\u2124",
	  "zopf":"\uD835\uDD6B",
	  "Zscr":"\uD835\uDCB5",
	  "zscr":"\uD835\uDCCF",
	  "zwj":"\u200D",
	  "zwnj":"\u200C"
	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var replaceEntities = __webpack_require__(3).replaceEntities;
	
	module.exports = function normalizeLink(url) {
	  var normalized = replaceEntities(url);
	  // We shouldn't care about the result of malformed URIs,
	  // and should not throw an exception.
	  try {
	    normalized = decodeURI(normalized);
	  } catch (err) {}
	  return encodeURI(normalized);
	};


/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function normalizeReference(str) {
	  // use .toUpperCase() instead of .toLowerCase()
	  // here to avoid a conflict with Object.prototype
	  // members (most notably, `__proto__`)
	  return str.trim().replace(/\s+/g, ' ').toUpperCase();
	};


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	
	var normalizeLink = __webpack_require__(27);
	var unescapeMd    = __webpack_require__(3).unescapeMd;
	
	/**
	 * Parse link destination
	 *
	 *   - on success it returns a string and updates state.pos;
	 *   - on failure it returns null
	 *
	 * @param  {Object} state
	 * @param  {Number} pos
	 * @api private
	 */
	
	module.exports = function parseLinkDestination(state, pos) {
	  var code, level, link,
	      start = pos,
	      max = state.posMax;
	
	  if (state.src.charCodeAt(pos) === 0x3C /* < */) {
	    pos++;
	    while (pos < max) {
	      code = state.src.charCodeAt(pos);
	      if (code === 0x0A /* \n */) { return false; }
	      if (code === 0x3E /* > */) {
	        link = normalizeLink(unescapeMd(state.src.slice(start + 1, pos)));
	        if (!state.parser.validateLink(link)) { return false; }
	        state.pos = pos + 1;
	        state.linkContent = link;
	        return true;
	      }
	      if (code === 0x5C /* \ */ && pos + 1 < max) {
	        pos += 2;
	        continue;
	      }
	
	      pos++;
	    }
	
	    // no closing '>'
	    return false;
	  }
	
	  // this should be ... } else { ... branch
	
	  level = 0;
	  while (pos < max) {
	    code = state.src.charCodeAt(pos);
	
	    if (code === 0x20) { break; }
	
	    if (code > 0x08 && code < 0x0e) { break; }
	
	    if (code === 0x5C /* \ */ && pos + 1 < max) {
	      pos += 2;
	      continue;
	    }
	
	    if (code === 0x28 /* ( */) {
	      level++;
	      if (level > 1) { break; }
	    }
	
	    if (code === 0x29 /* ) */) {
	      level--;
	      if (level < 0) { break; }
	    }
	
	    pos++;
	  }
	
	  if (start === pos) { return false; }
	
	  link = unescapeMd(state.src.slice(start, pos));
	  if (!state.parser.validateLink(link)) { return false; }
	
	  state.linkContent = link;
	  state.pos = pos;
	  return true;
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	
	var unescapeMd = __webpack_require__(3).unescapeMd;
	
	/**
	 * Parse link title
	 *
	 *   - on success it returns a string and updates state.pos;
	 *   - on failure it returns null
	 *
	 * @param  {Object} state
	 * @param  {Number} pos
	 * @api private
	 */
	
	module.exports = function parseLinkTitle(state, pos) {
	  var code,
	      start = pos,
	      max = state.posMax,
	      marker = state.src.charCodeAt(pos);
	
	  if (marker !== 0x22 /* " */ && marker !== 0x27 /* ' */ && marker !== 0x28 /* ( */) { return false; }
	
	  pos++;
	
	  // if opening marker is "(", switch it to closing marker ")"
	  if (marker === 0x28) { marker = 0x29; }
	
	  while (pos < max) {
	    code = state.src.charCodeAt(pos);
	    if (code === marker) {
	      state.pos = pos + 1;
	      state.linkContent = unescapeMd(state.src.slice(start + 1, pos));
	      return true;
	    }
	    if (code === 0x5C /* \ */ && pos + 1 < max) {
	      pos += 2;
	      continue;
	    }
	
	    pos++;
	  }
	
	  return false;
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(113);

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(139);

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(170);

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(20);

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(269);

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(83);

/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict'
	
	module.exports = ansiHTML
	
	// Reference to https://github.com/sindresorhus/ansi-regex
	var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/
	
	var _defColors = {
	  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
	  black: '000',
	  red: 'ff0000',
	  green: '209805',
	  yellow: 'e8bf03',
	  blue: '0000ff',
	  magenta: 'ff00ff',
	  cyan: '00ffee',
	  lightgrey: 'f0f0f0',
	  darkgrey: '888'
	}
	var _styles = {
	  30: 'black',
	  31: 'red',
	  32: 'green',
	  33: 'yellow',
	  34: 'blue',
	  35: 'magenta',
	  36: 'cyan',
	  37: 'lightgrey'
	}
	var _openTags = {
	  '1': 'font-weight:bold', // bold
	  '2': 'opacity:0.5', // dim
	  '3': '<i>', // italic
	  '4': '<u>', // underscore
	  '8': 'display:none', // hidden
	  '9': '<del>' // delete
	}
	var _closeTags = {
	  '23': '</i>', // reset italic
	  '24': '</u>', // reset underscore
	  '29': '</del>' // reset delete
	}
	
	;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
	  _closeTags[n] = '</span>'
	})
	
	/**
	 * Converts text with ANSI color codes to HTML markup.
	 * @param {String} text
	 * @returns {*}
	 */
	function ansiHTML (text) {
	  // Returns the text if the string has no ANSI escape code.
	  if (!_regANSI.test(text)) {
	    return text
	  }
	
	  // Cache opened sequence.
	  var ansiCodes = []
	  // Replace with markup.
	  var ret = text.replace(/\033\[(\d+)*m/g, function (match, seq) {
	    var ot = _openTags[seq]
	    if (ot) {
	      // If current sequence has been opened, close it.
	      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
	        ansiCodes.pop()
	        return '</span>'
	      }
	      // Open tag.
	      ansiCodes.push(seq)
	      return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
	    }
	
	    var ct = _closeTags[seq]
	    if (ct) {
	      // Pop sequence
	      ansiCodes.pop()
	      return ct
	    }
	    return ''
	  })
	
	  // Make sure tags are closed.
	  var l = ansiCodes.length
	  ;(l > 0) && (ret += Array(l + 1).join('</span>'))
	
	  return ret
	}
	
	/**
	 * Customize colors.
	 * @param {Object} colors reference to _defColors
	 */
	ansiHTML.setColors = function (colors) {
	  if (typeof colors !== 'object') {
	    throw new Error('`colors` parameter must be an Object.')
	  }
	
	  var _finalColors = {}
	  for (var key in _defColors) {
	    var hex = colors.hasOwnProperty(key) ? colors[key] : null
	    if (!hex) {
	      _finalColors[key] = _defColors[key]
	      continue
	    }
	    if ('reset' === key) {
	      if (typeof hex === 'string') {
	        hex = [hex]
	      }
	      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
	        return typeof h !== 'string'
	      })) {
	        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
	      }
	      var defHexColor = _defColors[key]
	      if (!hex[0]) {
	        hex[0] = defHexColor[0]
	      }
	      if (hex.length === 1 || !hex[1]) {
	        hex = [hex[0]]
	        hex.push(defHexColor[1])
	      }
	
	      hex = hex.slice(0, 2)
	    } else if (typeof hex !== 'string') {
	      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
	    }
	    _finalColors[key] = hex
	  }
	  _setTags(_finalColors)
	}
	
	/**
	 * Reset colors.
	 */
	ansiHTML.reset = function () {
	  _setTags(_defColors)
	}
	
	/**
	 * Expose tags, including open and close.
	 * @type {Object}
	 */
	ansiHTML.tags = {}
	
	if (Object.defineProperty) {
	  Object.defineProperty(ansiHTML.tags, 'open', {
	    get: function () { return _openTags }
	  })
	  Object.defineProperty(ansiHTML.tags, 'close', {
	    get: function () { return _closeTags }
	  })
	} else {
	  ansiHTML.tags.open = _openTags
	  ansiHTML.tags.close = _closeTags
	}
	
	function _setTags (colors) {
	  // reset all
	  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
	  // inverse
	  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
	  // dark grey
	  _openTags['90'] = 'color:#' + colors.darkgrey
	
	  for (var code in _styles) {
	    var color = _styles[code]
	    var oriColor = colors[color] || '000'
	    _openTags[code] = 'color:#' + oriColor
	    code = parseInt(code)
	    _openTags[(code + 10).toString()] = 'background:#' + oriColor
	  }
	}
	
	ansiHTML.reset()


/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function () {
		return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;
	};


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	  if (true) {
	    // AMD. Register as an anonymous module unless amdModuleId is set
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return (root['Autolinker'] = factory());
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    // Node. Does not work with strict CommonJS, but
	    // only CommonJS-like environments that support module.exports,
	    // like Node.
	    module.exports = factory();
	  } else {
	    root['Autolinker'] = factory();
	  }
	}(this, function () {
	
	/*!
	 * Autolinker.js
	 * 0.15.3
	 *
	 * Copyright(c) 2015 Gregory Jacobs <greg@greg-jacobs.com>
	 * MIT Licensed. http://www.opensource.org/licenses/mit-license.php
	 *
	 * https://github.com/gregjacobs/Autolinker.js
	 */
	/**
	 * @class Autolinker
	 * @extends Object
	 * 
	 * Utility class used to process a given string of text, and wrap the URLs, email addresses, and Twitter handles in 
	 * the appropriate anchor (&lt;a&gt;) tags to turn them into links.
	 * 
	 * Any of the configuration options may be provided in an Object (map) provided to the Autolinker constructor, which
	 * will configure how the {@link #link link()} method will process the links.
	 * 
	 * For example:
	 * 
	 *     var autolinker = new Autolinker( {
	 *         newWindow : false,
	 *         truncate  : 30
	 *     } );
	 *     
	 *     var html = autolinker.link( "Joe went to www.yahoo.com" );
	 *     // produces: 'Joe went to <a href="http://www.yahoo.com">yahoo.com</a>'
	 * 
	 * 
	 * The {@link #static-link static link()} method may also be used to inline options into a single call, which may
	 * be more convenient for one-off uses. For example:
	 * 
	 *     var html = Autolinker.link( "Joe went to www.yahoo.com", {
	 *         newWindow : false,
	 *         truncate  : 30
	 *     } );
	 *     // produces: 'Joe went to <a href="http://www.yahoo.com">yahoo.com</a>'
	 * 
	 * 
	 * ## Custom Replacements of Links
	 * 
	 * If the configuration options do not provide enough flexibility, a {@link #replaceFn} may be provided to fully customize
	 * the output of Autolinker. This function is called once for each URL/Email/Twitter handle match that is encountered.
	 * 
	 * For example:
	 * 
	 *     var input = "...";  // string with URLs, Email Addresses, and Twitter Handles
	 *     
	 *     var linkedText = Autolinker.link( input, {
	 *         replaceFn : function( autolinker, match ) {
	 *             console.log( "href = ", match.getAnchorHref() );
	 *             console.log( "text = ", match.getAnchorText() );
	 *         
	 *             switch( match.getType() ) {
	 *                 case 'url' : 
	 *                     console.log( "url: ", match.getUrl() );
	 *                     
	 *                     if( match.getUrl().indexOf( 'mysite.com' ) === -1 ) {
	 *                         var tag = autolinker.getTagBuilder().build( match );  // returns an `Autolinker.HtmlTag` instance, which provides mutator methods for easy changes
	 *                         tag.setAttr( 'rel', 'nofollow' );
	 *                         tag.addClass( 'external-link' );
	 *                         
	 *                         return tag;
	 *                         
	 *                     } else {
	 *                         return true;  // let Autolinker perform its normal anchor tag replacement
	 *                     }
	 *                     
	 *                 case 'email' :
	 *                     var email = match.getEmail();
	 *                     console.log( "email: ", email );
	 *                     
	 *                     if( email === "my@own.address" ) {
	 *                         return false;  // don't auto-link this particular email address; leave as-is
	 *                     } else {
	 *                         return;  // no return value will have Autolinker perform its normal anchor tag replacement (same as returning `true`)
	 *                     }
	 *                 
	 *                 case 'twitter' :
	 *                     var twitterHandle = match.getTwitterHandle();
	 *                     console.log( twitterHandle );
	 *                     
	 *                     return '<a href="http://newplace.to.link.twitter.handles.to/">' + twitterHandle + '</a>';
	 *             }
	 *         }
	 *     } );
	 * 
	 * 
	 * The function may return the following values:
	 * 
	 * - `true` (Boolean): Allow Autolinker to replace the match as it normally would.
	 * - `false` (Boolean): Do not replace the current match at all - leave as-is.
	 * - Any String: If a string is returned from the function, the string will be used directly as the replacement HTML for
	 *   the match.
	 * - An {@link Autolinker.HtmlTag} instance, which can be used to build/modify an HTML tag before writing out its HTML text.
	 * 
	 * @constructor
	 * @param {Object} [config] The configuration options for the Autolinker instance, specified in an Object (map).
	 */
	var Autolinker = function( cfg ) {
		Autolinker.Util.assign( this, cfg );  // assign the properties of `cfg` onto the Autolinker instance. Prototype properties will be used for missing configs.
	};
	
	
	Autolinker.prototype = {
		constructor : Autolinker,  // fix constructor property
		
		/**
		 * @cfg {Boolean} urls
		 * 
		 * `true` if miscellaneous URLs should be automatically linked, `false` if they should not be.
		 */
		urls : true,
		
		/**
		 * @cfg {Boolean} email
		 * 
		 * `true` if email addresses should be automatically linked, `false` if they should not be.
		 */
		email : true,
		
		/**
		 * @cfg {Boolean} twitter
		 * 
		 * `true` if Twitter handles ("@example") should be automatically linked, `false` if they should not be.
		 */
		twitter : true,
		
		/**
		 * @cfg {Boolean} newWindow
		 * 
		 * `true` if the links should open in a new window, `false` otherwise.
		 */
		newWindow : true,
		
		/**
		 * @cfg {Boolean} stripPrefix
		 * 
		 * `true` if 'http://' or 'https://' and/or the 'www.' should be stripped from the beginning of URL links' text, 
		 * `false` otherwise.
		 */
		stripPrefix : true,
		
		/**
		 * @cfg {Number} truncate
		 * 
		 * A number for how many characters long URLs/emails/twitter handles should be truncated to inside the text of 
		 * a link. If the URL/email/twitter is over this number of characters, it will be truncated to this length by 
		 * adding a two period ellipsis ('..') to the end of the string.
		 * 
		 * For example: A url like 'http://www.yahoo.com/some/long/path/to/a/file' truncated to 25 characters might look
		 * something like this: 'yahoo.com/some/long/pat..'
		 */
		truncate : undefined,
		
		/**
		 * @cfg {String} className
		 * 
		 * A CSS class name to add to the generated links. This class will be added to all links, as well as this class
		 * plus url/email/twitter suffixes for styling url/email/twitter links differently.
		 * 
		 * For example, if this config is provided as "myLink", then:
		 * 
		 * - URL links will have the CSS classes: "myLink myLink-url"
		 * - Email links will have the CSS classes: "myLink myLink-email", and
		 * - Twitter links will have the CSS classes: "myLink myLink-twitter"
		 */
		className : "",
		
		/**
		 * @cfg {Function} replaceFn
		 * 
		 * A function to individually process each URL/Email/Twitter match found in the input string.
		 * 
		 * See the class's description for usage.
		 * 
		 * This function is called with the following parameters:
		 * 
		 * @cfg {Autolinker} replaceFn.autolinker The Autolinker instance, which may be used to retrieve child objects from (such
		 *   as the instance's {@link #getTagBuilder tag builder}).
		 * @cfg {Autolinker.match.Match} replaceFn.match The Match instance which can be used to retrieve information about the
		 *   {@link Autolinker.match.Url URL}/{@link Autolinker.match.Email email}/{@link Autolinker.match.Twitter Twitter}
		 *   match that the `replaceFn` is currently processing.
		 */
		
		
		/**
		 * @private
		 * @property {Autolinker.htmlParser.HtmlParser} htmlParser
		 * 
		 * The HtmlParser instance used to skip over HTML tags, while finding text nodes to process. This is lazily instantiated
		 * in the {@link #getHtmlParser} method.
		 */
		htmlParser : undefined,
		
		/**
		 * @private
		 * @property {Autolinker.matchParser.MatchParser} matchParser
		 * 
		 * The MatchParser instance used to find URL/email/Twitter matches in the text nodes of an input string passed to
		 * {@link #link}. This is lazily instantiated in the {@link #getMatchParser} method.
		 */
		matchParser : undefined,
		
		/**
		 * @private
		 * @property {Autolinker.AnchorTagBuilder} tagBuilder
		 * 
		 * The AnchorTagBuilder instance used to build the URL/email/Twitter replacement anchor tags. This is lazily instantiated
		 * in the {@link #getTagBuilder} method.
		 */
		tagBuilder : undefined,
		
		
		/**
		 * Automatically links URLs, email addresses, and Twitter handles found in the given chunk of HTML. 
		 * Does not link URLs found within HTML tags.
		 * 
		 * For instance, if given the text: `You should go to http://www.yahoo.com`, then the result
		 * will be `You should go to &lt;a href="http://www.yahoo.com"&gt;http://www.yahoo.com&lt;/a&gt;`
		 * 
		 * This method finds the text around any HTML elements in the input `textOrHtml`, which will be the text that is processed.
		 * Any original HTML elements will be left as-is, as well as the text that is already wrapped in anchor (&lt;a&gt;) tags.
		 * 
		 * @param {String} textOrHtml The HTML or text to link URLs, email addresses, and Twitter handles within (depending on if
		 *   the {@link #urls}, {@link #email}, and {@link #twitter} options are enabled).
		 * @return {String} The HTML, with URLs/emails/Twitter handles automatically linked.
		 */
		link : function( textOrHtml ) {
			var htmlParser = this.getHtmlParser(),
			    htmlNodes = htmlParser.parse( textOrHtml ),
			    anchorTagStackCount = 0,  // used to only process text around anchor tags, and any inner text/html they may have
			    resultHtml = [];
			
			for( var i = 0, len = htmlNodes.length; i < len; i++ ) {
				var node = htmlNodes[ i ],
				    nodeType = node.getType(),
				    nodeText = node.getText();
				
				if( nodeType === 'element' ) {
					// Process HTML nodes in the input `textOrHtml`
					if( node.getTagName() === 'a' ) {
						if( !node.isClosing() ) {  // it's the start <a> tag
							anchorTagStackCount++;
						} else {   // it's the end </a> tag
							anchorTagStackCount = Math.max( anchorTagStackCount - 1, 0 );  // attempt to handle extraneous </a> tags by making sure the stack count never goes below 0
						}
					}
					resultHtml.push( nodeText );  // now add the text of the tag itself verbatim
					
				} else if( nodeType === 'entity' ) {
					resultHtml.push( nodeText );  // append HTML entity nodes (such as '&nbsp;') verbatim
					
				} else {
					// Process text nodes in the input `textOrHtml`
					if( anchorTagStackCount === 0 ) {
						// If we're not within an <a> tag, process the text node to linkify
						var linkifiedStr = this.linkifyStr( nodeText );
						resultHtml.push( linkifiedStr );
						
					} else {
						// `text` is within an <a> tag, simply append the text - we do not want to autolink anything 
						// already within an <a>...</a> tag
						resultHtml.push( nodeText );
					}
				}
			}
			
			return resultHtml.join( "" );
		},
		
		
		/**
		 * Process the text that lies in between HTML tags, performing the anchor tag replacements for matched 
		 * URLs/emails/Twitter handles, and returns the string with the replacements made. 
		 * 
		 * This method does the actual wrapping of URLs/emails/Twitter handles with anchor tags.
		 * 
		 * @private
		 * @param {String} str The string of text to auto-link.
		 * @return {String} The text with anchor tags auto-filled.
		 */
		linkifyStr : function( str ) {
			return this.getMatchParser().replace( str, this.createMatchReturnVal, this );
		},
		
		
		/**
		 * Creates the return string value for a given match in the input string, for the {@link #processTextNode} method.
		 * 
		 * This method handles the {@link #replaceFn}, if one was provided.
		 * 
		 * @private
		 * @param {Autolinker.match.Match} match The Match object that represents the match.
		 * @return {String} The string that the `match` should be replaced with. This is usually the anchor tag string, but
		 *   may be the `matchStr` itself if the match is not to be replaced.
		 */
		createMatchReturnVal : function( match ) {
			// Handle a custom `replaceFn` being provided
			var replaceFnResult;
			if( this.replaceFn ) {
				replaceFnResult = this.replaceFn.call( this, this, match );  // Autolinker instance is the context, and the first arg
			}
			
			if( typeof replaceFnResult === 'string' ) {
				return replaceFnResult;  // `replaceFn` returned a string, use that
				
			} else if( replaceFnResult === false ) {
				return match.getMatchedText();  // no replacement for the match
				
			} else if( replaceFnResult instanceof Autolinker.HtmlTag ) {
				return replaceFnResult.toString();
			
			} else {  // replaceFnResult === true, or no/unknown return value from function
				// Perform Autolinker's default anchor tag generation
				var tagBuilder = this.getTagBuilder(),
				    anchorTag = tagBuilder.build( match );  // returns an Autolinker.HtmlTag instance
				
				return anchorTag.toString();
			}
		},
		
		
		/**
		 * Lazily instantiates and returns the {@link #htmlParser} instance for this Autolinker instance.
		 * 
		 * @protected
		 * @return {Autolinker.htmlParser.HtmlParser}
		 */
		getHtmlParser : function() {
			var htmlParser = this.htmlParser;
			
			if( !htmlParser ) {
				htmlParser = this.htmlParser = new Autolinker.htmlParser.HtmlParser();
			}
			
			return htmlParser;
		},
		
		
		/**
		 * Lazily instantiates and returns the {@link #matchParser} instance for this Autolinker instance.
		 * 
		 * @protected
		 * @return {Autolinker.matchParser.MatchParser}
		 */
		getMatchParser : function() {
			var matchParser = this.matchParser;
			
			if( !matchParser ) {
				matchParser = this.matchParser = new Autolinker.matchParser.MatchParser( {
					urls : this.urls,
					email : this.email,
					twitter : this.twitter,
					stripPrefix : this.stripPrefix
				} );
			}
			
			return matchParser;
		},
		
		
		/**
		 * Returns the {@link #tagBuilder} instance for this Autolinker instance, lazily instantiating it
		 * if it does not yet exist.
		 * 
		 * This method may be used in a {@link #replaceFn} to generate the {@link Autolinker.HtmlTag HtmlTag} instance that 
		 * Autolinker would normally generate, and then allow for modifications before returning it. For example:
		 * 
		 *     var html = Autolinker.link( "Test google.com", {
		 *         replaceFn : function( autolinker, match ) {
		 *             var tag = autolinker.getTagBuilder().build( match );  // returns an {@link Autolinker.HtmlTag} instance
		 *             tag.setAttr( 'rel', 'nofollow' );
		 *             
		 *             return tag;
		 *         }
		 *     } );
		 *     
		 *     // generated html:
		 *     //   Test <a href="http://google.com" target="_blank" rel="nofollow">google.com</a>
		 * 
		 * @return {Autolinker.AnchorTagBuilder}
		 */
		getTagBuilder : function() {
			var tagBuilder = this.tagBuilder;
			
			if( !tagBuilder ) {
				tagBuilder = this.tagBuilder = new Autolinker.AnchorTagBuilder( {
					newWindow   : this.newWindow,
					truncate    : this.truncate,
					className   : this.className
				} );
			}
			
			return tagBuilder;
		}
	
	};
	
	
	/**
	 * Automatically links URLs, email addresses, and Twitter handles found in the given chunk of HTML. 
	 * Does not link URLs found within HTML tags.
	 * 
	 * For instance, if given the text: `You should go to http://www.yahoo.com`, then the result
	 * will be `You should go to &lt;a href="http://www.yahoo.com"&gt;http://www.yahoo.com&lt;/a&gt;`
	 * 
	 * Example:
	 * 
	 *     var linkedText = Autolinker.link( "Go to google.com", { newWindow: false } );
	 *     // Produces: "Go to <a href="http://google.com">google.com</a>"
	 * 
	 * @static
	 * @param {String} textOrHtml The HTML or text to find URLs, email addresses, and Twitter handles within (depending on if
	 *   the {@link #urls}, {@link #email}, and {@link #twitter} options are enabled).
	 * @param {Object} [options] Any of the configuration options for the Autolinker class, specified in an Object (map).
	 *   See the class description for an example call.
	 * @return {String} The HTML text, with URLs automatically linked
	 */
	Autolinker.link = function( textOrHtml, options ) {
		var autolinker = new Autolinker( options );
		return autolinker.link( textOrHtml );
	};
	
	
	// Autolinker Namespaces
	Autolinker.match = {};
	Autolinker.htmlParser = {};
	Autolinker.matchParser = {};
	/*global Autolinker */
	/*jshint eqnull:true, boss:true */
	/**
	 * @class Autolinker.Util
	 * @singleton
	 * 
	 * A few utility methods for Autolinker.
	 */
	Autolinker.Util = {
		
		/**
		 * @property {Function} abstractMethod
		 * 
		 * A function object which represents an abstract method.
		 */
		abstractMethod : function() { throw "abstract"; },
		
		
		/**
		 * Assigns (shallow copies) the properties of `src` onto `dest`.
		 * 
		 * @param {Object} dest The destination object.
		 * @param {Object} src The source object.
		 * @return {Object} The destination object (`dest`)
		 */
		assign : function( dest, src ) {
			for( var prop in src ) {
				if( src.hasOwnProperty( prop ) ) {
					dest[ prop ] = src[ prop ];
				}
			}
			
			return dest;
		},
		
		
		/**
		 * Extends `superclass` to create a new subclass, adding the `protoProps` to the new subclass's prototype.
		 * 
		 * @param {Function} superclass The constructor function for the superclass.
		 * @param {Object} protoProps The methods/properties to add to the subclass's prototype. This may contain the
		 *   special property `constructor`, which will be used as the new subclass's constructor function.
		 * @return {Function} The new subclass function.
		 */
		extend : function( superclass, protoProps ) {
			var superclassProto = superclass.prototype;
			
			var F = function() {};
			F.prototype = superclassProto;
			
			var subclass;
			if( protoProps.hasOwnProperty( 'constructor' ) ) {
				subclass = protoProps.constructor;
			} else {
				subclass = function() { superclassProto.constructor.apply( this, arguments ); };
			}
			
			var subclassProto = subclass.prototype = new F();  // set up prototype chain
			subclassProto.constructor = subclass;  // fix constructor property
			subclassProto.superclass = superclassProto;
			
			delete protoProps.constructor;  // don't re-assign constructor property to the prototype, since a new function may have been created (`subclass`), which is now already there
			Autolinker.Util.assign( subclassProto, protoProps );
			
			return subclass;
		},
		
		
		/**
		 * Truncates the `str` at `len - ellipsisChars.length`, and adds the `ellipsisChars` to the
		 * end of the string (by default, two periods: '..'). If the `str` length does not exceed 
		 * `len`, the string will be returned unchanged.
		 * 
		 * @param {String} str The string to truncate and add an ellipsis to.
		 * @param {Number} truncateLen The length to truncate the string at.
		 * @param {String} [ellipsisChars=..] The ellipsis character(s) to add to the end of `str`
		 *   when truncated. Defaults to '..'
		 */
		ellipsis : function( str, truncateLen, ellipsisChars ) {
			if( str.length > truncateLen ) {
				ellipsisChars = ( ellipsisChars == null ) ? '..' : ellipsisChars;
				str = str.substring( 0, truncateLen - ellipsisChars.length ) + ellipsisChars;
			}
			return str;
		},
		
		
		/**
		 * Supports `Array.prototype.indexOf()` functionality for old IE (IE8 and below).
		 * 
		 * @param {Array} arr The array to find an element of.
		 * @param {*} element The element to find in the array, and return the index of.
		 * @return {Number} The index of the `element`, or -1 if it was not found.
		 */
		indexOf : function( arr, element ) {
			if( Array.prototype.indexOf ) {
				return arr.indexOf( element );
				
			} else {
				for( var i = 0, len = arr.length; i < len; i++ ) {
					if( arr[ i ] === element ) return i;
				}
				return -1;
			}
		},
		
		
		
		/**
		 * Performs the functionality of what modern browsers do when `String.prototype.split()` is called
		 * with a regular expression that contains capturing parenthesis.
		 * 
		 * For example:
		 * 
		 *     // Modern browsers: 
		 *     "a,b,c".split( /(,)/ );  // --> [ 'a', ',', 'b', ',', 'c' ]
		 *     
		 *     // Old IE (including IE8):
		 *     "a,b,c".split( /(,)/ );  // --> [ 'a', 'b', 'c' ]
		 *     
		 * This method emulates the functionality of modern browsers for the old IE case.
		 * 
		 * @param {String} str The string to split.
		 * @param {RegExp} splitRegex The regular expression to split the input `str` on. The splitting
		 *   character(s) will be spliced into the array, as in the "modern browsers" example in the 
		 *   description of this method. 
		 *   Note #1: the supplied regular expression **must** have the 'g' flag specified.
		 *   Note #2: for simplicity's sake, the regular expression does not need 
		 *   to contain capturing parenthesis - it will be assumed that any match has them.
		 * @return {String[]} The split array of strings, with the splitting character(s) included.
		 */
		splitAndCapture : function( str, splitRegex ) {
			if( !splitRegex.global ) throw new Error( "`splitRegex` must have the 'g' flag set" );
			
			var result = [],
			    lastIdx = 0,
			    match;
			
			while( match = splitRegex.exec( str ) ) {
				result.push( str.substring( lastIdx, match.index ) );
				result.push( match[ 0 ] );  // push the splitting char(s)
				
				lastIdx = match.index + match[ 0 ].length;
			}
			result.push( str.substring( lastIdx ) );
			
			return result;
		}
		
	};
	/*global Autolinker */
	/*jshint boss:true */
	/**
	 * @class Autolinker.HtmlTag
	 * @extends Object
	 * 
	 * Represents an HTML tag, which can be used to easily build/modify HTML tags programmatically.
	 * 
	 * Autolinker uses this abstraction to create HTML tags, and then write them out as strings. You may also use
	 * this class in your code, especially within a {@link Autolinker#replaceFn replaceFn}.
	 * 
	 * ## Examples
	 * 
	 * Example instantiation:
	 * 
	 *     var tag = new Autolinker.HtmlTag( {
	 *         tagName : 'a',
	 *         attrs   : { 'href': 'http://google.com', 'class': 'external-link' },
	 *         innerHtml : 'Google'
	 *     } );
	 *     
	 *     tag.toString();  // <a href="http://google.com" class="external-link">Google</a>
	 *     
	 *     // Individual accessor methods
	 *     tag.getTagName();                 // 'a'
	 *     tag.getAttr( 'href' );            // 'http://google.com'
	 *     tag.hasClass( 'external-link' );  // true
	 * 
	 * 
	 * Using mutator methods (which may be used in combination with instantiation config properties):
	 * 
	 *     var tag = new Autolinker.HtmlTag();
	 *     tag.setTagName( 'a' );
	 *     tag.setAttr( 'href', 'http://google.com' );
	 *     tag.addClass( 'external-link' );
	 *     tag.setInnerHtml( 'Google' );
	 *     
	 *     tag.getTagName();                 // 'a'
	 *     tag.getAttr( 'href' );            // 'http://google.com'
	 *     tag.hasClass( 'external-link' );  // true
	 *     
	 *     tag.toString();  // <a href="http://google.com" class="external-link">Google</a>
	 *     
	 * 
	 * ## Example use within a {@link Autolinker#replaceFn replaceFn}
	 * 
	 *     var html = Autolinker.link( "Test google.com", {
	 *         replaceFn : function( autolinker, match ) {
	 *             var tag = autolinker.getTagBuilder().build( match );  // returns an {@link Autolinker.HtmlTag} instance, configured with the Match's href and anchor text
	 *             tag.setAttr( 'rel', 'nofollow' );
	 *             
	 *             return tag;
	 *         }
	 *     } );
	 *     
	 *     // generated html:
	 *     //   Test <a href="http://google.com" target="_blank" rel="nofollow">google.com</a>
	 *     
	 *     
	 * ## Example use with a new tag for the replacement
	 * 
	 *     var html = Autolinker.link( "Test google.com", {
	 *         replaceFn : function( autolinker, match ) {
	 *             var tag = new Autolinker.HtmlTag( {
	 *                 tagName : 'button',
	 *                 attrs   : { 'title': 'Load URL: ' + match.getAnchorHref() },
	 *                 innerHtml : 'Load URL: ' + match.getAnchorText()
	 *             } );
	 *             
	 *             return tag;
	 *         }
	 *     } );
	 *     
	 *     // generated html:
	 *     //   Test <button title="Load URL: http://google.com">Load URL: google.com</button>
	 */
	Autolinker.HtmlTag = Autolinker.Util.extend( Object, {
		
		/**
		 * @cfg {String} tagName
		 * 
		 * The tag name. Ex: 'a', 'button', etc.
		 * 
		 * Not required at instantiation time, but should be set using {@link #setTagName} before {@link #toString}
		 * is executed.
		 */
		
		/**
		 * @cfg {Object.<String, String>} attrs
		 * 
		 * An key/value Object (map) of attributes to create the tag with. The keys are the attribute names, and the
		 * values are the attribute values.
		 */
		
		/**
		 * @cfg {String} innerHtml
		 * 
		 * The inner HTML for the tag. 
		 * 
		 * Note the camel case name on `innerHtml`. Acronyms are camelCased in this utility (such as not to run into the acronym 
		 * naming inconsistency that the DOM developers created with `XMLHttpRequest`). You may alternatively use {@link #innerHTML}
		 * if you prefer, but this one is recommended.
		 */
		
		/**
		 * @cfg {String} innerHTML
		 * 
		 * Alias of {@link #innerHtml}, accepted for consistency with the browser DOM api, but prefer the camelCased version
		 * for acronym names.
		 */
		
		
		/**
		 * @protected
		 * @property {RegExp} whitespaceRegex
		 * 
		 * Regular expression used to match whitespace in a string of CSS classes.
		 */
		whitespaceRegex : /\s+/,
		
		
		/**
		 * @constructor
		 * @param {Object} [cfg] The configuration properties for this class, in an Object (map)
		 */
		constructor : function( cfg ) {
			Autolinker.Util.assign( this, cfg );
			
			this.innerHtml = this.innerHtml || this.innerHTML;  // accept either the camelCased form or the fully capitalized acronym
		},
		
		
		/**
		 * Sets the tag name that will be used to generate the tag with.
		 * 
		 * @param {String} tagName
		 * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
		 */
		setTagName : function( tagName ) {
			this.tagName = tagName;
			return this;
		},
		
		
		/**
		 * Retrieves the tag name.
		 * 
		 * @return {String}
		 */
		getTagName : function() {
			return this.tagName || "";
		},
		
		
		/**
		 * Sets an attribute on the HtmlTag.
		 * 
		 * @param {String} attrName The attribute name to set.
		 * @param {String} attrValue The attribute value to set.
		 * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
		 */
		setAttr : function( attrName, attrValue ) {
			var tagAttrs = this.getAttrs();
			tagAttrs[ attrName ] = attrValue;
			
			return this;
		},
		
		
		/**
		 * Retrieves an attribute from the HtmlTag. If the attribute does not exist, returns `undefined`.
		 * 
		 * @param {String} name The attribute name to retrieve.
		 * @return {String} The attribute's value, or `undefined` if it does not exist on the HtmlTag.
		 */
		getAttr : function( attrName ) {
			return this.getAttrs()[ attrName ];
		},
		
		
		/**
		 * Sets one or more attributes on the HtmlTag.
		 * 
		 * @param {Object.<String, String>} attrs A key/value Object (map) of the attributes to set.
		 * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
		 */
		setAttrs : function( attrs ) {
			var tagAttrs = this.getAttrs();
			Autolinker.Util.assign( tagAttrs, attrs );
			
			return this;
		},
		
		
		/**
		 * Retrieves the attributes Object (map) for the HtmlTag.
		 * 
		 * @return {Object.<String, String>} A key/value object of the attributes for the HtmlTag.
		 */
		getAttrs : function() {
			return this.attrs || ( this.attrs = {} );
		},
		
		
		/**
		 * Sets the provided `cssClass`, overwriting any current CSS classes on the HtmlTag.
		 * 
		 * @param {String} cssClass One or more space-separated CSS classes to set (overwrite).
		 * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
		 */
		setClass : function( cssClass ) {
			return this.setAttr( 'class', cssClass );
		},
		
		
		/**
		 * Convenience method to add one or more CSS classes to the HtmlTag. Will not add duplicate CSS classes.
		 * 
		 * @param {String} cssClass One or more space-separated CSS classes to add.
		 * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
		 */
		addClass : function( cssClass ) {
			var classAttr = this.getClass(),
			    whitespaceRegex = this.whitespaceRegex,
			    indexOf = Autolinker.Util.indexOf,  // to support IE8 and below
			    classes = ( !classAttr ) ? [] : classAttr.split( whitespaceRegex ),
			    newClasses = cssClass.split( whitespaceRegex ),
			    newClass;
			
			while( newClass = newClasses.shift() ) {
				if( indexOf( classes, newClass ) === -1 ) {
					classes.push( newClass );
				}
			}
			
			this.getAttrs()[ 'class' ] = classes.join( " " );
			return this;
		},
		
		
		/**
		 * Convenience method to remove one or more CSS classes from the HtmlTag.
		 * 
		 * @param {String} cssClass One or more space-separated CSS classes to remove.
		 * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
		 */
		removeClass : function( cssClass ) {
			var classAttr = this.getClass(),
			    whitespaceRegex = this.whitespaceRegex,
			    indexOf = Autolinker.Util.indexOf,  // to support IE8 and below
			    classes = ( !classAttr ) ? [] : classAttr.split( whitespaceRegex ),
			    removeClasses = cssClass.split( whitespaceRegex ),
			    removeClass;
			
			while( classes.length && ( removeClass = removeClasses.shift() ) ) {
				var idx = indexOf( classes, removeClass );
				if( idx !== -1 ) {
					classes.splice( idx, 1 );
				}
			}
			
			this.getAttrs()[ 'class' ] = classes.join( " " );
			return this;
		},
		
		
		/**
		 * Convenience method to retrieve the CSS class(es) for the HtmlTag, which will each be separated by spaces when
		 * there are multiple.
		 * 
		 * @return {String}
		 */
		getClass : function() {
			return this.getAttrs()[ 'class' ] || "";
		},
		
		
		/**
		 * Convenience method to check if the tag has a CSS class or not.
		 * 
		 * @param {String} cssClass The CSS class to check for.
		 * @return {Boolean} `true` if the HtmlTag has the CSS class, `false` otherwise.
		 */
		hasClass : function( cssClass ) {
			return ( ' ' + this.getClass() + ' ' ).indexOf( ' ' + cssClass + ' ' ) !== -1;
		},
		
		
		/**
		 * Sets the inner HTML for the tag.
		 * 
		 * @param {String} html The inner HTML to set.
		 * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
		 */
		setInnerHtml : function( html ) {
			this.innerHtml = html;
			
			return this;
		},
		
		
		/**
		 * Retrieves the inner HTML for the tag.
		 * 
		 * @return {String}
		 */
		getInnerHtml : function() {
			return this.innerHtml || "";
		},
		
		
		/**
		 * Override of superclass method used to generate the HTML string for the tag.
		 * 
		 * @return {String}
		 */
		toString : function() {
			var tagName = this.getTagName(),
			    attrsStr = this.buildAttrsStr();
			
			attrsStr = ( attrsStr ) ? ' ' + attrsStr : '';  // prepend a space if there are actually attributes
			
			return [ '<', tagName, attrsStr, '>', this.getInnerHtml(), '</', tagName, '>' ].join( "" );
		},
		
		
		/**
		 * Support method for {@link #toString}, returns the string space-separated key="value" pairs, used to populate 
		 * the stringified HtmlTag.
		 * 
		 * @protected
		 * @return {String} Example return: `attr1="value1" attr2="value2"`
		 */
		buildAttrsStr : function() {
			if( !this.attrs ) return "";  // no `attrs` Object (map) has been set, return empty string
			
			var attrs = this.getAttrs(),
			    attrsArr = [];
			
			for( var prop in attrs ) {
				if( attrs.hasOwnProperty( prop ) ) {
					attrsArr.push( prop + '="' + attrs[ prop ] + '"' );
				}
			}
			return attrsArr.join( " " );
		}
		
	} );
	/*global Autolinker */
	/*jshint sub:true */
	/**
	 * @protected
	 * @class Autolinker.AnchorTagBuilder
	 * @extends Object
	 * 
	 * Builds anchor (&lt;a&gt;) tags for the Autolinker utility when a match is found.
	 * 
	 * Normally this class is instantiated, configured, and used internally by an {@link Autolinker} instance, but may 
	 * actually be retrieved in a {@link Autolinker#replaceFn replaceFn} to create {@link Autolinker.HtmlTag HtmlTag} instances
	 * which may be modified before returning from the {@link Autolinker#replaceFn replaceFn}. For example:
	 * 
	 *     var html = Autolinker.link( "Test google.com", {
	 *         replaceFn : function( autolinker, match ) {
	 *             var tag = autolinker.getTagBuilder().build( match );  // returns an {@link Autolinker.HtmlTag} instance
	 *             tag.setAttr( 'rel', 'nofollow' );
	 *             
	 *             return tag;
	 *         }
	 *     } );
	 *     
	 *     // generated html:
	 *     //   Test <a href="http://google.com" target="_blank" rel="nofollow">google.com</a>
	 */
	Autolinker.AnchorTagBuilder = Autolinker.Util.extend( Object, {
		
		/**
		 * @cfg {Boolean} newWindow
		 * @inheritdoc Autolinker#newWindow
		 */
		
		/**
		 * @cfg {Number} truncate
		 * @inheritdoc Autolinker#truncate
		 */
		
		/**
		 * @cfg {String} className
		 * @inheritdoc Autolinker#className
		 */
		
		
		/**
		 * @constructor
		 * @param {Object} [cfg] The configuration options for the AnchorTagBuilder instance, specified in an Object (map).
		 */
		constructor : function( cfg ) {
			Autolinker.Util.assign( this, cfg );
		},
		
		
		/**
		 * Generates the actual anchor (&lt;a&gt;) tag to use in place of the matched URL/email/Twitter text,
		 * via its `match` object.
		 * 
		 * @param {Autolinker.match.Match} match The Match instance to generate an anchor tag from.
		 * @return {Autolinker.HtmlTag} The HtmlTag instance for the anchor tag.
		 */
		build : function( match ) {
			var tag = new Autolinker.HtmlTag( {
				tagName   : 'a',
				attrs     : this.createAttrs( match.getType(), match.getAnchorHref() ),
				innerHtml : this.processAnchorText( match.getAnchorText() )
			} );
			
			return tag;
		},
		
		
		/**
		 * Creates the Object (map) of the HTML attributes for the anchor (&lt;a&gt;) tag being generated.
		 * 
		 * @protected
		 * @param {"url"/"email"/"twitter"} matchType The type of match that an anchor tag is being generated for.
		 * @param {String} href The href for the anchor tag.
		 * @return {Object} A key/value Object (map) of the anchor tag's attributes. 
		 */
		createAttrs : function( matchType, anchorHref ) {
			var attrs = {
				'href' : anchorHref  // we'll always have the `href` attribute
			};
			
			var cssClass = this.createCssClass( matchType );
			if( cssClass ) {
				attrs[ 'class' ] = cssClass;
			}
			if( this.newWindow ) {
				attrs[ 'target' ] = "_blank";
			}
			
			return attrs;
		},
		
		
		/**
		 * Creates the CSS class that will be used for a given anchor tag, based on the `matchType` and the {@link #className}
		 * config.
		 * 
		 * @private
		 * @param {"url"/"email"/"twitter"} matchType The type of match that an anchor tag is being generated for.
		 * @return {String} The CSS class string for the link. Example return: "myLink myLink-url". If no {@link #className}
		 *   was configured, returns an empty string.
		 */
		createCssClass : function( matchType ) {
			var className = this.className;
			
			if( !className ) 
				return "";
			else
				return className + " " + className + "-" + matchType;  // ex: "myLink myLink-url", "myLink myLink-email", or "myLink myLink-twitter"
		},
		
		
		/**
		 * Processes the `anchorText` by truncating the text according to the {@link #truncate} config.
		 * 
		 * @private
		 * @param {String} anchorText The anchor tag's text (i.e. what will be displayed).
		 * @return {String} The processed `anchorText`.
		 */
		processAnchorText : function( anchorText ) {
			anchorText = this.doTruncate( anchorText );
			
			return anchorText;
		},
		
		
		/**
		 * Performs the truncation of the `anchorText`, if the `anchorText` is longer than the {@link #truncate} option.
		 * Truncates the text to 2 characters fewer than the {@link #truncate} option, and adds ".." to the end.
		 * 
		 * @private
		 * @param {String} text The anchor tag's text (i.e. what will be displayed).
		 * @return {String} The truncated anchor text.
		 */
		doTruncate : function( anchorText ) {
			return Autolinker.Util.ellipsis( anchorText, this.truncate || Number.POSITIVE_INFINITY );
		}
		
	} );
	/*global Autolinker */
	/**
	 * @private
	 * @class Autolinker.htmlParser.HtmlParser
	 * @extends Object
	 * 
	 * An HTML parser implementation which simply walks an HTML string and returns an array of 
	 * {@link Autolinker.htmlParser.HtmlNode HtmlNodes} that represent the basic HTML structure of the input string.
	 * 
	 * Autolinker uses this to only link URLs/emails/Twitter handles within text nodes, effectively ignoring / "walking
	 * around" HTML tags.
	 */
	Autolinker.htmlParser.HtmlParser = Autolinker.Util.extend( Object, {
		
		/**
		 * @private
		 * @property {RegExp} htmlRegex
		 * 
		 * The regular expression used to pull out HTML tags from a string. Handles namespaced HTML tags and
		 * attribute names, as specified by http://www.w3.org/TR/html-markup/syntax.html.
		 * 
		 * Capturing groups:
		 * 
		 * 1. The "!DOCTYPE" tag name, if a tag is a &lt;!DOCTYPE&gt; tag.
		 * 2. If it is an end tag, this group will have the '/'.
		 * 3. The tag name for all tags (other than the &lt;!DOCTYPE&gt; tag)
		 */
		htmlRegex : (function() {
			var tagNameRegex = /[0-9a-zA-Z][0-9a-zA-Z:]*/,
			    attrNameRegex = /[^\s\0"'>\/=\x01-\x1F\x7F]+/,   // the unicode range accounts for excluding control chars, and the delete char
			    attrValueRegex = /(?:"[^"]*?"|'[^']*?'|[^'"=<>`\s]+)/, // double quoted, single quoted, or unquoted attribute values
			    nameEqualsValueRegex = attrNameRegex.source + '(?:\\s*=\\s*' + attrValueRegex.source + ')?';  // optional '=[value]'
			
			return new RegExp( [
				// for <!DOCTYPE> tag. Ex: <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">) 
				'(?:',
					'<(!DOCTYPE)',  // *** Capturing Group 1 - If it's a doctype tag
						
						// Zero or more attributes following the tag name
						'(?:',
							'\\s+',  // one or more whitespace chars before an attribute
							
							// Either:
							// A. attr="value", or 
							// B. "value" alone (To cover example doctype tag: <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">) 
							'(?:', nameEqualsValueRegex, '|', attrValueRegex.source + ')',
						')*',
					'>',
				')',
				
				'|',
				
				// All other HTML tags (i.e. tags that are not <!DOCTYPE>)
				'(?:',
					'<(/)?',  // Beginning of a tag. Either '<' for a start tag, or '</' for an end tag. 
					          // *** Capturing Group 2: The slash or an empty string. Slash ('/') for end tag, empty string for start or self-closing tag.
				
						// *** Capturing Group 3 - The tag name
						'(' + tagNameRegex.source + ')',
						
						// Zero or more attributes following the tag name
						'(?:',
							'\\s+',                // one or more whitespace chars before an attribute
							nameEqualsValueRegex,  // attr="value" (with optional ="value" part)
						')*',
						
						'\\s*/?',  // any trailing spaces and optional '/' before the closing '>'
					'>',
				')'
			].join( "" ), 'gi' );
		} )(),
		
		/**
		 * @private
		 * @property {RegExp} htmlCharacterEntitiesRegex
		 *
		 * The regular expression that matches common HTML character entities.
		 * 
		 * Ignoring &amp; as it could be part of a query string -- handling it separately.
		 */
		htmlCharacterEntitiesRegex: /(&nbsp;|&#160;|&lt;|&#60;|&gt;|&#62;|&quot;|&#34;|&#39;)/gi,
		
		
		/**
		 * Parses an HTML string and returns a simple array of {@link Autolinker.htmlParser.HtmlNode HtmlNodes} to represent
		 * the HTML structure of the input string. 
		 * 
		 * @param {String} html The HTML to parse.
		 * @return {Autolinker.htmlParser.HtmlNode[]}
		 */
		parse : function( html ) {
			var htmlRegex = this.htmlRegex,
			    currentResult,
			    lastIndex = 0,
			    textAndEntityNodes,
			    nodes = [];  // will be the result of the method
			
			while( ( currentResult = htmlRegex.exec( html ) ) !== null ) {
				var tagText = currentResult[ 0 ],
				    tagName = currentResult[ 1 ] || currentResult[ 3 ],  // The <!DOCTYPE> tag (ex: "!DOCTYPE"), or another tag (ex: "a" or "img") 
				    isClosingTag = !!currentResult[ 2 ],
				    inBetweenTagsText = html.substring( lastIndex, currentResult.index );
				
				// Push TextNodes and EntityNodes for any text found between tags
				if( inBetweenTagsText ) {
					textAndEntityNodes = this.parseTextAndEntityNodes( inBetweenTagsText );
					nodes.push.apply( nodes, textAndEntityNodes );
				}
				
				// Push the ElementNode
				nodes.push( this.createElementNode( tagText, tagName, isClosingTag ) );
				
				lastIndex = currentResult.index + tagText.length;
			}
			
			// Process any remaining text after the last HTML element. Will process all of the text if there were no HTML elements.
			if( lastIndex < html.length ) {
				var text = html.substring( lastIndex );
				
				// Push TextNodes and EntityNodes for any text found between tags
				if( text ) {
					textAndEntityNodes = this.parseTextAndEntityNodes( text );
					nodes.push.apply( nodes, textAndEntityNodes );
				}
			}
			
			return nodes;
		},
		
		
		/**
		 * Parses text and HTML entity nodes from a given string. The input string should not have any HTML tags (elements)
		 * within it.
		 * 
		 * @private
		 * @param {String} text The text to parse.
		 * @return {Autolinker.htmlParser.HtmlNode[]} An array of HtmlNodes to represent the 
		 *   {@link Autolinker.htmlParser.TextNode TextNodes} and {@link Autolinker.htmlParser.EntityNode EntityNodes} found.
		 */
		parseTextAndEntityNodes : function( text ) {
			var nodes = [],
			    textAndEntityTokens = Autolinker.Util.splitAndCapture( text, this.htmlCharacterEntitiesRegex );  // split at HTML entities, but include the HTML entities in the results array
			
			// Every even numbered token is a TextNode, and every odd numbered token is an EntityNode
			// For example: an input `text` of "Test &quot;this&quot; today" would turn into the 
			//   `textAndEntityTokens`: [ 'Test ', '&quot;', 'this', '&quot;', ' today' ]
			for( var i = 0, len = textAndEntityTokens.length; i < len; i += 2 ) {
				var textToken = textAndEntityTokens[ i ],
				    entityToken = textAndEntityTokens[ i + 1 ];
				
				if( textToken ) nodes.push( this.createTextNode( textToken ) );
				if( entityToken ) nodes.push( this.createEntityNode( entityToken ) );
			}
			return nodes;
		},
		
		
		/**
		 * Factory method to create an {@link Autolinker.htmlParser.ElementNode ElementNode}.
		 * 
		 * @private
		 * @param {String} tagText The full text of the tag (element) that was matched, including its attributes.
		 * @param {String} tagName The name of the tag. Ex: An &lt;img&gt; tag would be passed to this method as "img".
		 * @param {Boolean} isClosingTag `true` if it's a closing tag, false otherwise.
		 * @return {Autolinker.htmlParser.ElementNode}
		 */
		createElementNode : function( tagText, tagName, isClosingTag ) {
			return new Autolinker.htmlParser.ElementNode( {
				text    : tagText,
				tagName : tagName.toLowerCase(),
				closing : isClosingTag
			} );
		},
		
		
		/**
		 * Factory method to create a {@link Autolinker.htmlParser.EntityNode EntityNode}.
		 * 
		 * @private
		 * @param {String} text The text that was matched for the HTML entity (such as '&amp;nbsp;').
		 * @return {Autolinker.htmlParser.EntityNode}
		 */
		createEntityNode : function( text ) {
			return new Autolinker.htmlParser.EntityNode( { text: text } );
		},
		
		
		/**
		 * Factory method to create a {@link Autolinker.htmlParser.TextNode TextNode}.
		 * 
		 * @private
		 * @param {String} text The text that was matched.
		 * @return {Autolinker.htmlParser.TextNode}
		 */
		createTextNode : function( text ) {
			return new Autolinker.htmlParser.TextNode( { text: text } );
		}
		
	} );
	/*global Autolinker */
	/**
	 * @abstract
	 * @class Autolinker.htmlParser.HtmlNode
	 * 
	 * Represents an HTML node found in an input string. An HTML node is one of the following:
	 * 
	 * 1. An {@link Autolinker.htmlParser.ElementNode ElementNode}, which represents HTML tags.
	 * 2. A {@link Autolinker.htmlParser.TextNode TextNode}, which represents text outside or within HTML tags.
	 * 3. A {@link Autolinker.htmlParser.EntityNode EntityNode}, which represents one of the known HTML
	 *    entities that Autolinker looks for. This includes common ones such as &amp;quot; and &amp;nbsp;
	 */
	Autolinker.htmlParser.HtmlNode = Autolinker.Util.extend( Object, {
		
		/**
		 * @cfg {String} text (required)
		 * 
		 * The original text that was matched for the HtmlNode. 
		 * 
		 * - In the case of an {@link Autolinker.htmlParser.ElementNode ElementNode}, this will be the tag's
		 *   text.
		 * - In the case of a {@link Autolinker.htmlParser.TextNode TextNode}, this will be the text itself.
		 * - In the case of a {@link Autolinker.htmlParser.EntityNode EntityNode}, this will be the text of
		 *   the HTML entity.
		 */
		text : "",
		
		
		/**
		 * @constructor
		 * @param {Object} cfg The configuration properties for the Match instance, specified in an Object (map).
		 */
		constructor : function( cfg ) {
			Autolinker.Util.assign( this, cfg );
		},
	
		
		/**
		 * Returns a string name for the type of node that this class represents.
		 * 
		 * @abstract
		 * @return {String}
		 */
		getType : Autolinker.Util.abstractMethod,
		
		
		/**
		 * Retrieves the {@link #text} for the HtmlNode.
		 * 
		 * @return {String}
		 */
		getText : function() {
			return this.text;
		}
	
	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.htmlParser.ElementNode
	 * @extends Autolinker.htmlParser.HtmlNode
	 * 
	 * Represents an HTML element node that has been parsed by the {@link Autolinker.htmlParser.HtmlParser}.
	 * 
	 * See this class's superclass ({@link Autolinker.htmlParser.HtmlNode}) for more details.
	 */
	Autolinker.htmlParser.ElementNode = Autolinker.Util.extend( Autolinker.htmlParser.HtmlNode, {
		
		/**
		 * @cfg {String} tagName (required)
		 * 
		 * The name of the tag that was matched.
		 */
		tagName : '',
		
		/**
		 * @cfg {Boolean} closing (required)
		 * 
		 * `true` if the element (tag) is a closing tag, `false` if its an opening tag.
		 */
		closing : false,
	
		
		/**
		 * Returns a string name for the type of node that this class represents.
		 * 
		 * @return {String}
		 */
		getType : function() {
			return 'element';
		},
		
	
		/**
		 * Returns the HTML element's (tag's) name. Ex: for an &lt;img&gt; tag, returns "img".
		 * 
		 * @return {String}
		 */
		getTagName : function() {
			return this.tagName;
		},
		
		
		/**
		 * Determines if the HTML element (tag) is a closing tag. Ex: &lt;div&gt; returns
		 * `false`, while &lt;/div&gt; returns `true`.
		 * 
		 * @return {Boolean}
		 */
		isClosing : function() {
			return this.closing;
		}
		
	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.htmlParser.EntityNode
	 * @extends Autolinker.htmlParser.HtmlNode
	 * 
	 * Represents a known HTML entity node that has been parsed by the {@link Autolinker.htmlParser.HtmlParser}.
	 * Ex: '&amp;nbsp;', or '&amp#160;' (which will be retrievable from the {@link #getText} method.
	 * 
	 * Note that this class will only be returned from the HtmlParser for the set of checked HTML entity nodes 
	 * defined by the {@link Autolinker.htmlParser.HtmlParser#htmlCharacterEntitiesRegex}.
	 * 
	 * See this class's superclass ({@link Autolinker.htmlParser.HtmlNode}) for more details.
	 */
	Autolinker.htmlParser.EntityNode = Autolinker.Util.extend( Autolinker.htmlParser.HtmlNode, {
		
		/**
		 * Returns a string name for the type of node that this class represents.
		 * 
		 * @return {String}
		 */
		getType : function() {
			return 'entity';
		}
		
	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.htmlParser.TextNode
	 * @extends Autolinker.htmlParser.HtmlNode
	 * 
	 * Represents a text node that has been parsed by the {@link Autolinker.htmlParser.HtmlParser}.
	 * 
	 * See this class's superclass ({@link Autolinker.htmlParser.HtmlNode}) for more details.
	 */
	Autolinker.htmlParser.TextNode = Autolinker.Util.extend( Autolinker.htmlParser.HtmlNode, {
		
		/**
		 * Returns a string name for the type of node that this class represents.
		 * 
		 * @return {String}
		 */
		getType : function() {
			return 'text';
		}
		
	} );
	/*global Autolinker */
	/**
	 * @private
	 * @class Autolinker.matchParser.MatchParser
	 * @extends Object
	 * 
	 * Used by Autolinker to parse {@link #urls URLs}, {@link #emails email addresses}, and {@link #twitter Twitter handles}, 
	 * given an input string of text.
	 * 
	 * The MatchParser is fed a non-HTML string in order to search out URLs, email addresses and Twitter handles. Autolinker
	 * first uses the {@link HtmlParser} to "walk around" HTML tags, and then the text around the HTML tags is passed into
	 * the MatchParser in order to find the actual matches.
	 */
	Autolinker.matchParser.MatchParser = Autolinker.Util.extend( Object, {
		
		/**
		 * @cfg {Boolean} urls
		 * 
		 * `true` if miscellaneous URLs should be automatically linked, `false` if they should not be.
		 */
		urls : true,
		
		/**
		 * @cfg {Boolean} email
		 * 
		 * `true` if email addresses should be automatically linked, `false` if they should not be.
		 */
		email : true,
		
		/**
		 * @cfg {Boolean} twitter
		 * 
		 * `true` if Twitter handles ("@example") should be automatically linked, `false` if they should not be.
		 */
		twitter : true,
		
		/**
		 * @cfg {Boolean} stripPrefix
		 * 
		 * `true` if 'http://' or 'https://' and/or the 'www.' should be stripped from the beginning of URL links' text
		 * in {@link Autolinker.match.Url URL matches}, `false` otherwise.
		 * 
		 * TODO: Handle this before a URL Match object is instantiated.
		 */
		stripPrefix : true,
		
		
		/**
		 * @private
		 * @property {RegExp} matcherRegex
		 * 
		 * The regular expression that matches URLs, email addresses, and Twitter handles.
		 * 
		 * This regular expression has the following capturing groups:
		 * 
		 * 1. Group that is used to determine if there is a Twitter handle match (i.e. \@someTwitterUser). Simply check for its 
		 *    existence to determine if there is a Twitter handle match. The next couple of capturing groups give information 
		 *    about the Twitter handle match.
		 * 2. The whitespace character before the \@sign in a Twitter handle. This is needed because there are no lookbehinds in
		 *    JS regular expressions, and can be used to reconstruct the original string in a replace().
		 * 3. The Twitter handle itself in a Twitter match. If the match is '@someTwitterUser', the handle is 'someTwitterUser'.
		 * 4. Group that matches an email address. Used to determine if the match is an email address, as well as holding the full 
		 *    address. Ex: 'me@my.com'
		 * 5. Group that matches a URL in the input text. Ex: 'http://google.com', 'www.google.com', or just 'google.com'.
		 *    This also includes a path, url parameters, or hash anchors. Ex: google.com/path/to/file?q1=1&q2=2#myAnchor
		 * 6. Group that matches a protocol URL (i.e. 'http://google.com'). This is used to match protocol URLs with just a single
		 *    word, like 'http://localhost', where we won't double check that the domain name has at least one '.' in it.
		 * 7. A protocol-relative ('//') match for the case of a 'www.' prefixed URL. Will be an empty string if it is not a 
		 *    protocol-relative match. We need to know the character before the '//' in order to determine if it is a valid match
		 *    or the // was in a string we don't want to auto-link.
		 * 8. A protocol-relative ('//') match for the case of a known TLD prefixed URL. Will be an empty string if it is not a 
		 *    protocol-relative match. See #6 for more info. 
		 */
		matcherRegex : (function() {
			var twitterRegex = /(^|[^\w])@(\w{1,15})/,              // For matching a twitter handle. Ex: @gregory_jacobs
			    
			    emailRegex = /(?:[\-;:&=\+\$,\w\.]+@)/,             // something@ for email addresses (a.k.a. local-part)
			    
			    protocolRegex = /(?:[A-Za-z][-.+A-Za-z0-9]+:(?![A-Za-z][-.+A-Za-z0-9]+:\/\/)(?!\d+\/?)(?:\/\/)?)/,  // match protocol, allow in format "http://" or "mailto:". However, do not match the first part of something like 'link:http://www.google.com' (i.e. don't match "link:"). Also, make sure we don't interpret 'google.com:8000' as if 'google.com' was a protocol here (i.e. ignore a trailing port number in this regex)
			    wwwRegex = /(?:www\.)/,                             // starting with 'www.'
			    domainNameRegex = /[A-Za-z0-9\.\-]*[A-Za-z0-9\-]/,  // anything looking at all like a domain, non-unicode domains, not ending in a period
			    tldRegex = /\.(?:international|construction|contractors|enterprises|photography|productions|foundation|immobilien|industries|management|properties|technology|christmas|community|directory|education|equipment|institute|marketing|solutions|vacations|bargains|boutique|builders|catering|cleaning|clothing|computer|democrat|diamonds|graphics|holdings|lighting|partners|plumbing|supplies|training|ventures|academy|careers|company|cruises|domains|exposed|flights|florist|gallery|guitars|holiday|kitchen|neustar|okinawa|recipes|rentals|reviews|shiksha|singles|support|systems|agency|berlin|camera|center|coffee|condos|dating|estate|events|expert|futbol|kaufen|luxury|maison|monash|museum|nagoya|photos|repair|report|social|supply|tattoo|tienda|travel|viajes|villas|vision|voting|voyage|actor|build|cards|cheap|codes|dance|email|glass|house|mango|ninja|parts|photo|shoes|solar|today|tokyo|tools|watch|works|aero|arpa|asia|best|bike|blue|buzz|camp|club|cool|coop|farm|fish|gift|guru|info|jobs|kiwi|kred|land|limo|link|menu|mobi|moda|name|pics|pink|post|qpon|rich|ruhr|sexy|tips|vote|voto|wang|wien|wiki|zone|bar|bid|biz|cab|cat|ceo|com|edu|gov|int|kim|mil|net|onl|org|pro|pub|red|tel|uno|wed|xxx|xyz|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw)\b/,   // match our known top level domains (TLDs)
			    
			    // Allow optional path, query string, and hash anchor, not ending in the following characters: "?!:,.;"
			    // http://blog.codinghorror.com/the-problem-with-urls/
			    urlSuffixRegex = /[\-A-Za-z0-9+&@#\/%=~_()|'$*\[\]?!:,.;]*[\-A-Za-z0-9+&@#\/%=~_()|'$*\[\]]/;
			
			return new RegExp( [
				'(',  // *** Capturing group $1, which can be used to check for a twitter handle match. Use group $3 for the actual twitter handle though. $2 may be used to reconstruct the original string in a replace() 
					// *** Capturing group $2, which matches the whitespace character before the '@' sign (needed because of no lookbehinds), and 
					// *** Capturing group $3, which matches the actual twitter handle
					twitterRegex.source,
				')',
				
				'|',
				
				'(',  // *** Capturing group $4, which is used to determine an email match
					emailRegex.source,
					domainNameRegex.source,
					tldRegex.source,
				')',
				
				'|',
				
				'(',  // *** Capturing group $5, which is used to match a URL
					'(?:', // parens to cover match for protocol (optional), and domain
						'(',  // *** Capturing group $6, for a protocol-prefixed url (ex: http://google.com)
							protocolRegex.source,
							domainNameRegex.source,
						')',
						
						'|',
						
						'(?:',  // non-capturing paren for a 'www.' prefixed url (ex: www.google.com)
							'(.?//)?',  // *** Capturing group $7 for an optional protocol-relative URL. Must be at the beginning of the string or start with a non-word character
							wwwRegex.source,
							domainNameRegex.source,
						')',
						
						'|',
						
						'(?:',  // non-capturing paren for known a TLD url (ex: google.com)
							'(.?//)?',  // *** Capturing group $8 for an optional protocol-relative URL. Must be at the beginning of the string or start with a non-word character
							domainNameRegex.source,
							tldRegex.source,
						')',
					')',
					
					'(?:' + urlSuffixRegex.source + ')?',  // match for path, query string, and/or hash anchor - optional
				')'
			].join( "" ), 'gi' );
		} )(),
		
		/**
		 * @private
		 * @property {RegExp} charBeforeProtocolRelMatchRegex
		 * 
		 * The regular expression used to retrieve the character before a protocol-relative URL match.
		 * 
		 * This is used in conjunction with the {@link #matcherRegex}, which needs to grab the character before a protocol-relative
		 * '//' due to the lack of a negative look-behind in JavaScript regular expressions. The character before the match is stripped
		 * from the URL.
		 */
		charBeforeProtocolRelMatchRegex : /^(.)?\/\//,
		
		/**
		 * @private
		 * @property {Autolinker.MatchValidator} matchValidator
		 * 
		 * The MatchValidator object, used to filter out any false positives from the {@link #matcherRegex}. See
		 * {@link Autolinker.MatchValidator} for details.
		 */
		
		
		/**
		 * @constructor
		 * @param {Object} [cfg] The configuration options for the AnchorTagBuilder instance, specified in an Object (map).
		 */
		constructor : function( cfg ) {
			Autolinker.Util.assign( this, cfg );
		
			this.matchValidator = new Autolinker.MatchValidator();
		},
		
		
		/**
		 * Parses the input `text` to search for URLs/emails/Twitter handles, and calls the `replaceFn`
		 * to allow replacements of the matches. Returns the `text` with matches replaced.
		 * 
		 * @param {String} text The text to search and repace matches in.
		 * @param {Function} replaceFn The iterator function to handle the replacements. The function takes a
		 *   single argument, a {@link Autolinker.match.Match} object, and should return the text that should
		 *   make the replacement.
		 * @param {Object} [contextObj=window] The context object ("scope") to run the `replaceFn` in.
		 * @return {String}
		 */
		replace : function( text, replaceFn, contextObj ) {
			var me = this;  // for closure
			
			return text.replace( this.matcherRegex, function( matchStr, $1, $2, $3, $4, $5, $6, $7, $8 ) {
				var matchDescObj = me.processCandidateMatch( matchStr, $1, $2, $3, $4, $5, $6, $7, $8 );  // "match description" object
				
				// Return out with no changes for match types that are disabled (url, email, twitter), or for matches that are 
				// invalid (false positives from the matcherRegex, which can't use look-behinds since they are unavailable in JS).
				if( !matchDescObj ) {
					return matchStr;
					
				} else {
					// Generate replacement text for the match from the `replaceFn`
					var replaceStr = replaceFn.call( contextObj, matchDescObj.match );
					return matchDescObj.prefixStr + replaceStr + matchDescObj.suffixStr;
				}
			} );
		},
		
		
		/**
		 * Processes a candidate match from the {@link #matcherRegex}. 
		 * 
		 * Not all matches found by the regex are actual URL/email/Twitter matches, as determined by the {@link #matchValidator}. In
		 * this case, the method returns `null`. Otherwise, a valid Object with `prefixStr`, `match`, and `suffixStr` is returned.
		 * 
		 * @private
		 * @param {String} matchStr The full match that was found by the {@link #matcherRegex}.
		 * @param {String} twitterMatch The matched text of a Twitter handle, if the match is a Twitter match.
		 * @param {String} twitterHandlePrefixWhitespaceChar The whitespace char before the @ sign in a Twitter handle match. This 
		 *   is needed because of no lookbehinds in JS regexes, and is need to re-include the character for the anchor tag replacement.
		 * @param {String} twitterHandle The actual Twitter user (i.e the word after the @ sign in a Twitter match).
		 * @param {String} emailAddressMatch The matched email address for an email address match.
		 * @param {String} urlMatch The matched URL string for a URL match.
		 * @param {String} protocolUrlMatch The match URL string for a protocol match. Ex: 'http://yahoo.com'. This is used to match
		 *   something like 'http://localhost', where we won't double check that the domain name has at least one '.' in it.
		 * @param {String} wwwProtocolRelativeMatch The '//' for a protocol-relative match from a 'www' url, with the character that 
		 *   comes before the '//'.
		 * @param {String} tldProtocolRelativeMatch The '//' for a protocol-relative match from a TLD (top level domain) match, with 
		 *   the character that comes before the '//'.
		 *   
		 * @return {Object} A "match description object". This will be `null` if the match was invalid, or if a match type is disabled.
		 *   Otherwise, this will be an Object (map) with the following properties:
		 * @return {String} return.prefixStr The char(s) that should be prepended to the replacement string. These are char(s) that
		 *   were needed to be included from the regex match that were ignored by processing code, and should be re-inserted into 
		 *   the replacement stream.
		 * @return {String} return.suffixStr The char(s) that should be appended to the replacement string. These are char(s) that
		 *   were needed to be included from the regex match that were ignored by processing code, and should be re-inserted into 
		 *   the replacement stream.
		 * @return {Autolinker.match.Match} return.match The Match object that represents the match that was found.
		 */
		processCandidateMatch : function( 
			matchStr, twitterMatch, twitterHandlePrefixWhitespaceChar, twitterHandle, 
			emailAddressMatch, urlMatch, protocolUrlMatch, wwwProtocolRelativeMatch, tldProtocolRelativeMatch
		) {
			// Note: The `matchStr` variable wil be fixed up to remove characters that are no longer needed (which will 
			// be added to `prefixStr` and `suffixStr`).
			
			var protocolRelativeMatch = wwwProtocolRelativeMatch || tldProtocolRelativeMatch,
			    match,  // Will be an Autolinker.match.Match object
			    
			    prefixStr = "",       // A string to use to prefix the anchor tag that is created. This is needed for the Twitter handle match
			    suffixStr = "";       // A string to suffix the anchor tag that is created. This is used if there is a trailing parenthesis that should not be auto-linked.
			    
			
			// Return out with `null` for match types that are disabled (url, email, twitter), or for matches that are 
			// invalid (false positives from the matcherRegex, which can't use look-behinds since they are unavailable in JS).
			if(
				( twitterMatch && !this.twitter ) || ( emailAddressMatch && !this.email ) || ( urlMatch && !this.urls ) ||
				!this.matchValidator.isValidMatch( urlMatch, protocolUrlMatch, protocolRelativeMatch ) 
			) {
				return null;
			}
			
			// Handle a closing parenthesis at the end of the match, and exclude it if there is not a matching open parenthesis
			// in the match itself. 
			if( this.matchHasUnbalancedClosingParen( matchStr ) ) {
				matchStr = matchStr.substr( 0, matchStr.length - 1 );  // remove the trailing ")"
				suffixStr = ")";  // this will be added after the generated <a> tag
			}
			
			
			if( emailAddressMatch ) {
				match = new Autolinker.match.Email( { matchedText: matchStr, email: emailAddressMatch } );
				
			} else if( twitterMatch ) {
				// fix up the `matchStr` if there was a preceding whitespace char, which was needed to determine the match 
				// itself (since there are no look-behinds in JS regexes)
				if( twitterHandlePrefixWhitespaceChar ) {
					prefixStr = twitterHandlePrefixWhitespaceChar;
					matchStr = matchStr.slice( 1 );  // remove the prefixed whitespace char from the match
				}
				match = new Autolinker.match.Twitter( { matchedText: matchStr, twitterHandle: twitterHandle } );
				
			} else {  // url match
				// If it's a protocol-relative '//' match, remove the character before the '//' (which the matcherRegex needed
				// to match due to the lack of a negative look-behind in JavaScript regular expressions)
				if( protocolRelativeMatch ) {
					var charBeforeMatch = protocolRelativeMatch.match( this.charBeforeProtocolRelMatchRegex )[ 1 ] || "";
					
					if( charBeforeMatch ) {  // fix up the `matchStr` if there was a preceding char before a protocol-relative match, which was needed to determine the match itself (since there are no look-behinds in JS regexes)
						prefixStr = charBeforeMatch;
						matchStr = matchStr.slice( 1 );  // remove the prefixed char from the match
					}
				}
				
				match = new Autolinker.match.Url( {
					matchedText : matchStr,
					url : matchStr,
					protocolUrlMatch : !!protocolUrlMatch,
					protocolRelativeMatch : !!protocolRelativeMatch,
					stripPrefix : this.stripPrefix
				} );
			}
			
			return {
				prefixStr : prefixStr,
				suffixStr : suffixStr,
				match     : match
			};
		},
		
		
		/**
		 * Determines if a match found has an unmatched closing parenthesis. If so, this parenthesis will be removed
		 * from the match itself, and appended after the generated anchor tag in {@link #processTextNode}.
		 * 
		 * A match may have an extra closing parenthesis at the end of the match because the regular expression must include parenthesis
		 * for URLs such as "wikipedia.com/something_(disambiguation)", which should be auto-linked. 
		 * 
		 * However, an extra parenthesis *will* be included when the URL itself is wrapped in parenthesis, such as in the case of
		 * "(wikipedia.com/something_(disambiguation))". In this case, the last closing parenthesis should *not* be part of the URL 
		 * itself, and this method will return `true`.
		 * 
		 * @private
		 * @param {String} matchStr The full match string from the {@link #matcherRegex}.
		 * @return {Boolean} `true` if there is an unbalanced closing parenthesis at the end of the `matchStr`, `false` otherwise.
		 */
		matchHasUnbalancedClosingParen : function( matchStr ) {
			var lastChar = matchStr.charAt( matchStr.length - 1 );
			
			if( lastChar === ')' ) {
				var openParensMatch = matchStr.match( /\(/g ),
				    closeParensMatch = matchStr.match( /\)/g ),
				    numOpenParens = ( openParensMatch && openParensMatch.length ) || 0,
				    numCloseParens = ( closeParensMatch && closeParensMatch.length ) || 0;
				
				if( numOpenParens < numCloseParens ) {
					return true;
				}
			}
			
			return false;
		}
		
	} );
	/*global Autolinker */
	/*jshint scripturl:true */
	/**
	 * @private
	 * @class Autolinker.MatchValidator
	 * @extends Object
	 * 
	 * Used by Autolinker to filter out false positives from the {@link Autolinker#matcherRegex}.
	 * 
	 * Due to the limitations of regular expressions (including the missing feature of look-behinds in JS regular expressions),
	 * we cannot always determine the validity of a given match. This class applies a bit of additional logic to filter out any
	 * false positives that have been matched by the {@link Autolinker#matcherRegex}.
	 */
	Autolinker.MatchValidator = Autolinker.Util.extend( Object, {
		
		/**
		 * @private
		 * @property {RegExp} invalidProtocolRelMatchRegex
		 * 
		 * The regular expression used to check a potential protocol-relative URL match, coming from the 
		 * {@link Autolinker#matcherRegex}. A protocol-relative URL is, for example, "//yahoo.com"
		 * 
		 * This regular expression checks to see if there is a word character before the '//' match in order to determine if 
		 * we should actually autolink a protocol-relative URL. This is needed because there is no negative look-behind in 
		 * JavaScript regular expressions. 
		 * 
		 * For instance, we want to autolink something like "Go to: //google.com", but we don't want to autolink something 
		 * like "abc//google.com"
		 */
		invalidProtocolRelMatchRegex : /^[\w]\/\//,
		
		/**
		 * Regex to test for a full protocol, with the two trailing slashes. Ex: 'http://'
		 * 
		 * @private
		 * @property {RegExp} hasFullProtocolRegex
		 */
		hasFullProtocolRegex : /^[A-Za-z][-.+A-Za-z0-9]+:\/\//,
		
		/**
		 * Regex to find the URI scheme, such as 'mailto:'.
		 * 
		 * This is used to filter out 'javascript:' and 'vbscript:' schemes.
		 * 
		 * @private
		 * @property {RegExp} uriSchemeRegex
		 */
		uriSchemeRegex : /^[A-Za-z][-.+A-Za-z0-9]+:/,
		
		/**
		 * Regex to determine if at least one word char exists after the protocol (i.e. after the ':')
		 * 
		 * @private
		 * @property {RegExp} hasWordCharAfterProtocolRegex
		 */
		hasWordCharAfterProtocolRegex : /:[^\s]*?[A-Za-z]/,
		
		
		/**
		 * Determines if a given match found by {@link Autolinker#processTextNode} is valid. Will return `false` for:
		 * 
		 * 1) URL matches which do not have at least have one period ('.') in the domain name (effectively skipping over 
		 *    matches like "abc:def"). However, URL matches with a protocol will be allowed (ex: 'http://localhost')
		 * 2) URL matches which do not have at least one word character in the domain name (effectively skipping over
		 *    matches like "git:1.0").
		 * 3) A protocol-relative url match (a URL beginning with '//') whose previous character is a word character 
		 *    (effectively skipping over strings like "abc//google.com")
		 * 
		 * Otherwise, returns `true`.
		 * 
		 * @param {String} urlMatch The matched URL, if there was one. Will be an empty string if the match is not a URL match.
		 * @param {String} protocolUrlMatch The match URL string for a protocol match. Ex: 'http://yahoo.com'. This is used to match
		 *   something like 'http://localhost', where we won't double check that the domain name has at least one '.' in it.
		 * @param {String} protocolRelativeMatch The protocol-relative string for a URL match (i.e. '//'), possibly with a preceding
		 *   character (ex, a space, such as: ' //', or a letter, such as: 'a//'). The match is invalid if there is a word character
		 *   preceding the '//'.
		 * @return {Boolean} `true` if the match given is valid and should be processed, or `false` if the match is invalid and/or 
		 *   should just not be processed.
		 */
		isValidMatch : function( urlMatch, protocolUrlMatch, protocolRelativeMatch ) {
			if(
				( protocolUrlMatch && !this.isValidUriScheme( protocolUrlMatch ) ) ||
				this.urlMatchDoesNotHaveProtocolOrDot( urlMatch, protocolUrlMatch ) ||       // At least one period ('.') must exist in the URL match for us to consider it an actual URL, *unless* it was a full protocol match (like 'http://localhost')
				this.urlMatchDoesNotHaveAtLeastOneWordChar( urlMatch, protocolUrlMatch ) ||  // At least one letter character must exist in the domain name after a protocol match. Ex: skip over something like "git:1.0"
				this.isInvalidProtocolRelativeMatch( protocolRelativeMatch )                 // A protocol-relative match which has a word character in front of it (so we can skip something like "abc//google.com")
			) {
				return false;
			}
			
			return true;
		},
		
		
		/**
		 * Determines if the URI scheme is a valid scheme to be autolinked. Returns `false` if the scheme is 
		 * 'javascript:' or 'vbscript:'
		 * 
		 * @private
		 * @param {String} uriSchemeMatch The match URL string for a full URI scheme match. Ex: 'http://yahoo.com' 
		 *   or 'mailto:a@a.com'.
		 * @return {Boolean} `true` if the scheme is a valid one, `false` otherwise.
		 */
		isValidUriScheme : function( uriSchemeMatch ) {
			var uriScheme = uriSchemeMatch.match( this.uriSchemeRegex )[ 0 ].toLowerCase();
			
			return ( uriScheme !== 'javascript:' && uriScheme !== 'vbscript:' );
		},
		
		
		/**
		 * Determines if a URL match does not have either:
		 * 
		 * a) a full protocol (i.e. 'http://'), or
		 * b) at least one dot ('.') in the domain name (for a non-full-protocol match).
		 * 
		 * Either situation is considered an invalid URL (ex: 'git:d' does not have either the '://' part, or at least one dot
		 * in the domain name. If the match was 'git:abc.com', we would consider this valid.)
		 * 
		 * @private
		 * @param {String} urlMatch The matched URL, if there was one. Will be an empty string if the match is not a URL match.
		 * @param {String} protocolUrlMatch The match URL string for a protocol match. Ex: 'http://yahoo.com'. This is used to match
		 *   something like 'http://localhost', where we won't double check that the domain name has at least one '.' in it.
		 * @return {Boolean} `true` if the URL match does not have a full protocol, or at least one dot ('.') in a non-full-protocol
		 *   match.
		 */
		urlMatchDoesNotHaveProtocolOrDot : function( urlMatch, protocolUrlMatch ) {
			return ( !!urlMatch && ( !protocolUrlMatch || !this.hasFullProtocolRegex.test( protocolUrlMatch ) ) && urlMatch.indexOf( '.' ) === -1 );
		},
		
		
		/**
		 * Determines if a URL match does not have at least one word character after the protocol (i.e. in the domain name).
		 * 
		 * At least one letter character must exist in the domain name after a protocol match. Ex: skip over something 
		 * like "git:1.0"
		 * 
		 * @private
		 * @param {String} urlMatch The matched URL, if there was one. Will be an empty string if the match is not a URL match.
		 * @param {String} protocolUrlMatch The match URL string for a protocol match. Ex: 'http://yahoo.com'. This is used to
		 *   know whether or not we have a protocol in the URL string, in order to check for a word character after the protocol
		 *   separator (':').
		 * @return {Boolean} `true` if the URL match does not have at least one word character in it after the protocol, `false`
		 *   otherwise.
		 */
		urlMatchDoesNotHaveAtLeastOneWordChar : function( urlMatch, protocolUrlMatch ) {
			if( urlMatch && protocolUrlMatch ) {
				return !this.hasWordCharAfterProtocolRegex.test( urlMatch );
			} else {
				return false;
			}
		},
		
		
		/**
		 * Determines if a protocol-relative match is an invalid one. This method returns `true` if there is a `protocolRelativeMatch`,
		 * and that match contains a word character before the '//' (i.e. it must contain whitespace or nothing before the '//' in
		 * order to be considered valid).
		 * 
		 * @private
		 * @param {String} protocolRelativeMatch The protocol-relative string for a URL match (i.e. '//'), possibly with a preceding
		 *   character (ex, a space, such as: ' //', or a letter, such as: 'a//'). The match is invalid if there is a word character
		 *   preceding the '//'.
		 * @return {Boolean} `true` if it is an invalid protocol-relative match, `false` otherwise.
		 */
		isInvalidProtocolRelativeMatch : function( protocolRelativeMatch ) {
			return ( !!protocolRelativeMatch && this.invalidProtocolRelMatchRegex.test( protocolRelativeMatch ) );
		}
	
	} );
	/*global Autolinker */
	/**
	 * @abstract
	 * @class Autolinker.match.Match
	 * 
	 * Represents a match found in an input string which should be Autolinked. A Match object is what is provided in a 
	 * {@link Autolinker#replaceFn replaceFn}, and may be used to query for details about the match.
	 * 
	 * For example:
	 * 
	 *     var input = "...";  // string with URLs, Email Addresses, and Twitter Handles
	 *     
	 *     var linkedText = Autolinker.link( input, {
	 *         replaceFn : function( autolinker, match ) {
	 *             console.log( "href = ", match.getAnchorHref() );
	 *             console.log( "text = ", match.getAnchorText() );
	 *         
	 *             switch( match.getType() ) {
	 *                 case 'url' : 
	 *                     console.log( "url: ", match.getUrl() );
	 *                     
	 *                 case 'email' :
	 *                     console.log( "email: ", match.getEmail() );
	 *                     
	 *                 case 'twitter' :
	 *                     console.log( "twitter: ", match.getTwitterHandle() );
	 *             }
	 *         }
	 *     } );
	 *     
	 * See the {@link Autolinker} class for more details on using the {@link Autolinker#replaceFn replaceFn}.
	 */
	Autolinker.match.Match = Autolinker.Util.extend( Object, {
		
		/**
		 * @cfg {String} matchedText (required)
		 * 
		 * The original text that was matched.
		 */
		
		
		/**
		 * @constructor
		 * @param {Object} cfg The configuration properties for the Match instance, specified in an Object (map).
		 */
		constructor : function( cfg ) {
			Autolinker.Util.assign( this, cfg );
		},
	
		
		/**
		 * Returns a string name for the type of match that this class represents.
		 * 
		 * @abstract
		 * @return {String}
		 */
		getType : Autolinker.Util.abstractMethod,
		
		
		/**
		 * Returns the original text that was matched.
		 * 
		 * @return {String}
		 */
		getMatchedText : function() {
			return this.matchedText;
		},
		
	
		/**
		 * Returns the anchor href that should be generated for the match.
		 * 
		 * @abstract
		 * @return {String}
		 */
		getAnchorHref : Autolinker.Util.abstractMethod,
		
		
		/**
		 * Returns the anchor text that should be generated for the match.
		 * 
		 * @abstract
		 * @return {String}
		 */
		getAnchorText : Autolinker.Util.abstractMethod
	
	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.match.Email
	 * @extends Autolinker.match.Match
	 * 
	 * Represents a Email match found in an input string which should be Autolinked.
	 * 
	 * See this class's superclass ({@link Autolinker.match.Match}) for more details.
	 */
	Autolinker.match.Email = Autolinker.Util.extend( Autolinker.match.Match, {
		
		/**
		 * @cfg {String} email (required)
		 * 
		 * The email address that was matched.
		 */
		
	
		/**
		 * Returns a string name for the type of match that this class represents.
		 * 
		 * @return {String}
		 */
		getType : function() {
			return 'email';
		},
		
		
		/**
		 * Returns the email address that was matched.
		 * 
		 * @return {String}
		 */
		getEmail : function() {
			return this.email;
		},
		
	
		/**
		 * Returns the anchor href that should be generated for the match.
		 * 
		 * @return {String}
		 */
		getAnchorHref : function() {
			return 'mailto:' + this.email;
		},
		
		
		/**
		 * Returns the anchor text that should be generated for the match.
		 * 
		 * @return {String}
		 */
		getAnchorText : function() {
			return this.email;
		}
		
	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.match.Twitter
	 * @extends Autolinker.match.Match
	 * 
	 * Represents a Twitter match found in an input string which should be Autolinked.
	 * 
	 * See this class's superclass ({@link Autolinker.match.Match}) for more details.
	 */
	Autolinker.match.Twitter = Autolinker.Util.extend( Autolinker.match.Match, {
		
		/**
		 * @cfg {String} twitterHandle (required)
		 * 
		 * The Twitter handle that was matched.
		 */
		
	
		/**
		 * Returns the type of match that this class represents.
		 * 
		 * @return {String}
		 */
		getType : function() {
			return 'twitter';
		},
		
		
		/**
		 * Returns a string name for the type of match that this class represents.
		 * 
		 * @return {String}
		 */
		getTwitterHandle : function() {
			return this.twitterHandle;
		},
		
	
		/**
		 * Returns the anchor href that should be generated for the match.
		 * 
		 * @return {String}
		 */
		getAnchorHref : function() {
			return 'https://twitter.com/' + this.twitterHandle;
		},
		
		
		/**
		 * Returns the anchor text that should be generated for the match.
		 * 
		 * @return {String}
		 */
		getAnchorText : function() {
			return '@' + this.twitterHandle;
		}
		
	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.match.Url
	 * @extends Autolinker.match.Match
	 * 
	 * Represents a Url match found in an input string which should be Autolinked.
	 * 
	 * See this class's superclass ({@link Autolinker.match.Match}) for more details.
	 */
	Autolinker.match.Url = Autolinker.Util.extend( Autolinker.match.Match, {
		
		/**
		 * @cfg {String} url (required)
		 * 
		 * The url that was matched.
		 */
		
		/**
		 * @cfg {Boolean} protocolUrlMatch (required)
		 * 
		 * `true` if the URL is a match which already has a protocol (i.e. 'http://'), `false` if the match was from a 'www' or
		 * known TLD match.
		 */
		
		/**
		 * @cfg {Boolean} protocolRelativeMatch (required)
		 * 
		 * `true` if the URL is a protocol-relative match. A protocol-relative match is a URL that starts with '//',
		 * and will be either http:// or https:// based on the protocol that the site is loaded under.
		 */
		
		/**
		 * @cfg {Boolean} stripPrefix (required)
		 * @inheritdoc Autolinker#stripPrefix
		 */
		
	
		/**
		 * @private
		 * @property {RegExp} urlPrefixRegex
		 * 
		 * A regular expression used to remove the 'http://' or 'https://' and/or the 'www.' from URLs.
		 */
		urlPrefixRegex: /^(https?:\/\/)?(www\.)?/i,
		
		/**
		 * @private
		 * @property {RegExp} protocolRelativeRegex
		 * 
		 * The regular expression used to remove the protocol-relative '//' from the {@link #url} string, for purposes
		 * of {@link #getAnchorText}. A protocol-relative URL is, for example, "//yahoo.com"
		 */
		protocolRelativeRegex : /^\/\//,
		
		/**
		 * @private
		 * @property {Boolean} protocolPrepended
		 * 
		 * Will be set to `true` if the 'http://' protocol has been prepended to the {@link #url} (because the
		 * {@link #url} did not have a protocol)
		 */
		protocolPrepended : false,
		
	
		/**
		 * Returns a string name for the type of match that this class represents.
		 * 
		 * @return {String}
		 */
		getType : function() {
			return 'url';
		},
		
		
		/**
		 * Returns the url that was matched, assuming the protocol to be 'http://' if the original
		 * match was missing a protocol.
		 * 
		 * @return {String}
		 */
		getUrl : function() {
			var url = this.url;
			
			// if the url string doesn't begin with a protocol, assume 'http://'
			if( !this.protocolRelativeMatch && !this.protocolUrlMatch && !this.protocolPrepended ) {
				url = this.url = 'http://' + url;
				
				this.protocolPrepended = true;
			}
			
			return url;
		},
		
	
		/**
		 * Returns the anchor href that should be generated for the match.
		 * 
		 * @return {String}
		 */
		getAnchorHref : function() {
			var url = this.getUrl();
			
			return url.replace( /&amp;/g, '&' );  // any &amp;'s in the URL should be converted back to '&' if they were displayed as &amp; in the source html 
		},
		
		
		/**
		 * Returns the anchor text that should be generated for the match.
		 * 
		 * @return {String}
		 */
		getAnchorText : function() {
			var anchorText = this.getUrl();
			
			if( this.protocolRelativeMatch ) {
				// Strip off any protocol-relative '//' from the anchor text
				anchorText = this.stripProtocolRelativePrefix( anchorText );
			}
			if( this.stripPrefix ) {
				anchorText = this.stripUrlPrefix( anchorText );
			}
			anchorText = this.removeTrailingSlash( anchorText );  // remove trailing slash, if there is one
			
			return anchorText;
		},
		
		
		// ---------------------------------------
		
		// Utility Functionality
		
		/**
		 * Strips the URL prefix (such as "http://" or "https://") from the given text.
		 * 
		 * @private
		 * @param {String} text The text of the anchor that is being generated, for which to strip off the
		 *   url prefix (such as stripping off "http://")
		 * @return {String} The `anchorText`, with the prefix stripped.
		 */
		stripUrlPrefix : function( text ) {
			return text.replace( this.urlPrefixRegex, '' );
		},
		
		
		/**
		 * Strips any protocol-relative '//' from the anchor text.
		 * 
		 * @private
		 * @param {String} text The text of the anchor that is being generated, for which to strip off the
		 *   protocol-relative prefix (such as stripping off "//")
		 * @return {String} The `anchorText`, with the protocol-relative prefix stripped.
		 */
		stripProtocolRelativePrefix : function( text ) {
			return text.replace( this.protocolRelativeRegex, '' );
		},
		
		
		/**
		 * Removes any trailing slash from the given `anchorText`, in preparation for the text to be displayed.
		 * 
		 * @private
		 * @param {String} anchorText The text of the anchor that is being generated, for which to remove any trailing
		 *   slash ('/') that may exist.
		 * @return {String} The `anchorText`, with the trailing slash removed.
		 */
		removeTrailingSlash : function( anchorText ) {
			if( anchorText.charAt( anchorText.length - 1 ) === '/' ) {
				anchorText = anchorText.slice( 0, -1 );
			}
			return anchorText;
		}
		
	} );
	return Autolinker;
	
	}));


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Footer = undefined;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Footer = __webpack_require__(10);
	
	var _Footer2 = _interopRequireDefault(_Footer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Box = function Box(_ref) {
		var _ref$type = _ref.type,
		    type = _ref$type === undefined ? 'primary' : _ref$type,
		    title = _ref.title,
		    children = _ref.children,
		    footer = _ref.footer,
		    loading = _ref.loading,
		    toolBar = _ref.toolBar;
	
		var $footer = void 0;
		if (footer) {
			$footer = (footer.type || {})._isBoxFooter ? footer : _react2.default.createElement(
				_Footer2.default,
				null,
				footer
			);
		}
	
		var $loading = loading ? _react2.default.createElement(
			'div',
			{ className: 'overlay' },
			_react2.default.createElement('span', { className: 'fa fa-refresh fa-spin' })
		) : null;
	
		return _react2.default.createElement(
			'div',
			{ className: (0, _classnames2.default)('box', 'bdp-box', 'box-' + type) },
			_react2.default.createElement(
				'div',
				{ className: 'box-header with-border' },
				_react2.default.createElement(
					'h3',
					{ className: 'box-title' },
					title
				),
				toolBar && _react2.default.createElement(
					'div',
					{ className: 'box-header-tools' },
					toolBar
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'box-body' },
				children
			),
			$footer,
			$loading
		);
	};
	
	Box.propTypes = {
		type: _react.PropTypes.string,
		title: _react.PropTypes.node,
		children: _react.PropTypes.node,
		footer: _react.PropTypes.node,
		loading: _react.PropTypes.bool,
		toolBar: _react.PropTypes.node
	};
	
	exports.Footer = _Footer2.default;
	var _default = Box;
	exports.default = _default;
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(Box, 'Box', 'C:/MyGit/BDPComponent/components/Box/index.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/components/Box/index.js');
	}();

	;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _PropsComponent = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /*
	                                                                                                                                                                                                                              * Licensed to the Apache Software Foundation (ASF) under one
	                                                                                                                                                                                                                              * or more contributor license agreements.  See the NOTICE file
	                                                                                                                                                                                                                              * distributed with this work for additional information
	                                                                                                                                                                                                                              * regarding copyright ownership.  The ASF licenses this file
	                                                                                                                                                                                                                              * to you under the Apache License, Version 2.0 (the
	                                                                                                                                                                                                                              * "License"); you may not use this file except in compliance
	                                                                                                                                                                                                                              * with the License.  You may obtain a copy of the License at
	                                                                                                                                                                                                                              *
	                                                                                                                                                                                                                              *     http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                              *
	                                                                                                                                                                                                                              * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                              * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                              * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                              * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                              * limitations under the License.
	                                                                                                                                                                                                                              */
	
	var Checkbox = function Checkbox(_ref) {
	  var checked = _ref.checked,
	      props = _objectWithoutProperties(_ref, ['checked']);
	
	  return _react2.default.createElement('input', _extends({ type: 'checkbox', checked: checked || false }, props));
	};
	
	Checkbox.propTypes = {
	  checked: _react.PropTypes.bool
	};
	
	var _default = (0, _PropsComponent.withProps)(Checkbox);
	
	exports.default = _default;
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(Checkbox, 'Checkbox', 'C:/MyGit/BDPComponent/components/Checkbox/index.js');
	
	  __REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/components/Checkbox/index.js');
	}();

	;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Collapse = function (_React$Component) {
		_inherits(Collapse, _React$Component);
	
		function Collapse() {
			_classCallCheck(this, Collapse);
	
			var _this = _possibleConstructorReturn(this, (Collapse.__proto__ || Object.getPrototypeOf(Collapse)).call(this));
	
			_this.onCollapse = function () {
				_this.setState({ collapse: !_this.state.collapse });
			};
	
			_this.state = {
				collapse: false
			};
			return _this;
		}
	
		_createClass(Collapse, [{
			key: "componentWillMount",
			value: function componentWillMount() {
				var _props$collapse = this.props.collapse,
				    collapse = _props$collapse === undefined ? false : _props$collapse;
	
				this.setState({ collapse: collapse });
			}
		}, {
			key: "render",
			value: function render() {
				var collapse = this.state.collapse;
				var _props = this.props,
				    className = _props.className,
				    title = _props.title,
				    children = _props.children,
				    passState = _props.passState,
				    collapseContent = _props.collapseContent;
	
	
				var $title = passState ? _react2.default.cloneElement(title, { collapse: collapse }) : title;
	
				return _react2.default.createElement(
					"div",
					{ className: className },
					_react2.default.createElement(
						"div",
						{ role: "button", onClick: this.onCollapse },
						$title
					),
					collapse && collapseContent,
					!collapse && children
				);
			}
		}]);
	
		return Collapse;
	}(_react2.default.Component);
	
	Collapse.propTypes = {
		className: _react.PropTypes.string,
		collapse: _react.PropTypes.bool,
		title: _react.PropTypes.node,
		passState: _react.PropTypes.bool,
		children: _react.PropTypes.node,
		collapseContent: _react.PropTypes.node
	};
	
	var _default = Collapse;
	exports.default = _default;
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(Collapse, "Collapse", "C:/MyGit/BDPComponent/components/Collapse.js");
	
		__REACT_HOT_LOADER__.register(_default, "default", "C:/MyGit/BDPComponent/components/Collapse.js");
	}();

	;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Else = exports.ElseIf = exports.If = exports.Default = exports.Case = exports.BDP_SWITCH_ELSE = exports.BDP_SWITCH_IF = exports.BDP_SWITCH_DEFAULT = exports.BDP_SWITCH_CASE = undefined;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _pathUtil = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var BDP_SWITCH_CASE = exports.BDP_SWITCH_CASE = 'BDP_SWITCH_CASE';
	var BDP_SWITCH_DEFAULT = exports.BDP_SWITCH_DEFAULT = 'BDP_SWITCH_DEFAULT';
	var BDP_SWITCH_IF = exports.BDP_SWITCH_IF = 'BDP_SWITCH_IF';
	var BDP_SWITCH_ELSE = exports.BDP_SWITCH_ELSE = 'BDP_SWITCH_ELSE';
	
	var Case = exports.Case = function Case() {
		return null;
	};
	Case[BDP_SWITCH_CASE] = BDP_SWITCH_CASE;
	
	var Default = exports.Default = function Default() {
		return null;
	};
	Default[BDP_SWITCH_DEFAULT] = BDP_SWITCH_DEFAULT;
	
	var If = exports.If = function If() {
		return null;
	};
	If[BDP_SWITCH_IF] = BDP_SWITCH_IF;
	
	var ElseIf = exports.ElseIf = If;
	
	var Else = exports.Else = function Else() {
		return null;
	};
	Else[BDP_SWITCH_ELSE] = BDP_SWITCH_ELSE;
	
	var Condition = function Condition(_ref) {
		var value = _ref.value,
		    is = _ref.is,
		    children = _ref.children;
	
		var subMatch = false;
		var $content = null;
	
		var nodeList = _react2.default.Children.toArray(children);
		nodeList.some(function () {
			var cell = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
			var isCase = !!(0, _pathUtil.getValue)(cell, ['type', BDP_SWITCH_CASE]);
			var isDefault = !!(0, _pathUtil.getValue)(cell, ['type', BDP_SWITCH_DEFAULT]);
			var isIf = !!(0, _pathUtil.getValue)(cell, ['type', BDP_SWITCH_IF]);
			var isElse = !!(0, _pathUtil.getValue)(cell, ['type', BDP_SWITCH_ELSE]);
	
			if (isCase) {
				if (value === cell.props.value) {
					$content = cell.props.children;
					return true;
				}
			} else if (isIf) {
				if (cell.props.value) {
					$content = cell.props.children;
					return true;
				}
			} else if (isDefault) {
				$content = cell.props.children;
				return true;
			} else if (isElse) {
				$content = cell.props.children;
				return true;
			}
	
			if (isCase || isIf || isDefault || isElse) {
				subMatch = true;
			}
	
			return false;
		});
	
		if (subMatch) {
			return $content;
		}
		return is ? children : null;
	};
	
	var valueType = _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.bool, _react.PropTypes.object, _react.PropTypes.array, _react.PropTypes.func]);
	
	Case.propTypes = If.propTypes = ElseIf.propTypes = {
		value: valueType,
		children: _react.PropTypes.node
	};
	
	Default.propTypes = Else.propTypes = {
		children: _react.PropTypes.node
	};
	
	Condition.propTypes = {
		value: valueType,
		is: valueType,
		children: _react.PropTypes.node
	};
	
	var _default = Condition;
	exports.default = _default;
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(BDP_SWITCH_CASE, 'BDP_SWITCH_CASE', 'C:/MyGit/BDPComponent/components/Condition.js');
	
		__REACT_HOT_LOADER__.register(BDP_SWITCH_DEFAULT, 'BDP_SWITCH_DEFAULT', 'C:/MyGit/BDPComponent/components/Condition.js');
	
		__REACT_HOT_LOADER__.register(BDP_SWITCH_IF, 'BDP_SWITCH_IF', 'C:/MyGit/BDPComponent/components/Condition.js');
	
		__REACT_HOT_LOADER__.register(BDP_SWITCH_ELSE, 'BDP_SWITCH_ELSE', 'C:/MyGit/BDPComponent/components/Condition.js');
	
		__REACT_HOT_LOADER__.register(Case, 'Case', 'C:/MyGit/BDPComponent/components/Condition.js');
	
		__REACT_HOT_LOADER__.register(Default, 'Default', 'C:/MyGit/BDPComponent/components/Condition.js');
	
		__REACT_HOT_LOADER__.register(If, 'If', 'C:/MyGit/BDPComponent/components/Condition.js');
	
		__REACT_HOT_LOADER__.register(ElseIf, 'ElseIf', 'C:/MyGit/BDPComponent/components/Condition.js');
	
		__REACT_HOT_LOADER__.register(Else, 'Else', 'C:/MyGit/BDPComponent/components/Condition.js');
	
		__REACT_HOT_LOADER__.register(Condition, 'Condition', 'C:/MyGit/BDPComponent/components/Condition.js');
	
		__REACT_HOT_LOADER__.register(valueType, 'valueType', 'C:/MyGit/BDPComponent/components/Condition.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/components/Condition.js');
	}();

	;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DialogInstance = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _jquery = __webpack_require__(13);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _Dialog = __webpack_require__(16);
	
	var _Dialog2 = _interopRequireDefault(_Dialog);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Dialog = function (_React$Component) {
		_inherits(Dialog, _React$Component);
	
		function Dialog() {
			_classCallCheck(this, Dialog);
	
			var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this));
	
			_this.updateBodyState = function () {
				var $body = (0, _jquery2.default)('body');
				var hasModal = (0, _jquery2.default)('.modal.fade.in').length > 0;
	
				if (hasModal) {
					$body.addClass('modal-open');
					$body.css('padding-right', (0, _jquery2.default)(window).height() < $body.height() ? '17px' : 0);
				} else {
					$body.css('padding-right', 0);
				}
			};
	
			_this.state = {
				list: []
			};
	
			_this.show = _this.show.bind(_this);
			_this.onHidden = _this.onHidden.bind(_this);
			return _this;
		}
	
		_createClass(Dialog, [{
			key: 'onHidden',
			value: function onHidden(dialog) {
				var index = dialog.props.index;
				var list = this.state.list;
	
	
				list.splice(index, 1);
				this.setState({ list: list });
	
				this.updateBodyState();
	
				if (dialog.props.dlgOnHidden) {
					dialog.props.dlgOnHidden(dialog);
				}
			}
		}, {
			key: 'show',
			value: function show(dialog) {
				var _this2 = this;
	
				var list = this.state.list;
	
				var entity = {
					id: +new Date(),
					dialog: dialog
				};
				list.push(entity);
				this.setState({ list: list });
	
				setTimeout(function () {
					entity.ref.show();
	
					// Repeat for process the padding style of bootstrap modal
					var $dlg = (0, _jquery2.default)(entity.ref.dialog);
					setTimeout(function () {
						_this2.updateBodyState();
						if (list.length > 1) {
							$dlg.css('padding-right', (0, _jquery2.default)('body').css('padding-right'));
						}
					}, 150);
					$dlg.one('bsTransitionEnd', function () {
						_this2.updateBodyState();
						if (list.length > 1) {
							$dlg.css('padding-right', (0, _jquery2.default)('body').css('padding-right'));
						}
					});
				}, 1);
	
				// TODO: Dialog scrollbar logic
	
				return {
					entity: entity,
					refresh: function refresh() {
						_this2.forceUpdate();
					}
				};
			}
		}, {
			key: 'render',
			value: function render() {
				var _this3 = this;
	
				var list = this.state.list;
	
	
				return _react2.default.createElement(
					'div',
					null,
					list.map(function (item, index) {
						var entity = item;
						var dlgOnHidden = entity.dialog.onHidden;
						return _react2.default.createElement(_Dialog2.default, _extends({
							key: entity.id,
							index: index,
							ref: function ref(element) {
								entity.ref = element;
							}
						}, entity.dialog, {
							dlgOnHidden: dlgOnHidden,
							onHidden: _this3.onHidden
						}));
					})
				);
			}
		}]);
	
		return Dialog;
	}(_react2.default.Component);
	
	exports.DialogInstance = Dialog;
	var _default = Dialog;
	exports.default = _default;
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(Dialog, 'Dialog', 'C:/MyGit/BDPComponent/components/Dialog/index.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/components/Dialog/index.js');
	}();

	;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Field = __webpack_require__(17);
	
	var _pathUtil = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var isBaseType = function isBaseType(type) {
		return type === 'string' || type === 'number' || type === 'boolean';
	};
	
	var linkElement = function linkElement(children, instance, option, fields) {
		var mergedFields = fields || {};
		var childrenType = typeof children === 'undefined' ? 'undefined' : _typeof(children);
	
		if (isBaseType(childrenType)) {
			return {
				element: children,
				fields: fields
			};
		}if (!children) {
			return {
				element: [],
				fields: fields
			};
		}
	
		var element = _react2.default.Children.map(children, function (component) {
			// Loop for children elements
			if (!component) {
				return null;
			} else if (isBaseType(typeof component === 'undefined' ? 'undefined' : _typeof(component))) {
				return component;
			} else if (!component.type || component.type[_Field.BDP_FORM_FILED] !== _Field.BDP_FORM_FILED) {
				var entity = component.props ? linkElement(component.props.children, instance, option, mergedFields) : { element: [] };
	
				return _react2.default.cloneElement(component, entity.element.length && {
					children: entity.element
				});
			}
	
			// Parse Field component
			return _react2.default.cloneElement(component, {
				disabled: option.disabled,
				onValueChange: option.onFieldChange,
				value: component.props.value || (0, _pathUtil.getValue)(instance, component.props.name),
				ref: function ref(field) {
					mergedFields[component.props.name] = field;
				}
			});
		});
		return {
			element: element,
			fields: mergedFields
		};
	};
	
	var Form = function (_React$Component) {
		_inherits(Form, _React$Component);
	
		function Form() {
			var _ref;
	
			var _temp, _this, _ret;
	
			_classCallCheck(this, Form);
	
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}
	
			return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Form.__proto__ || Object.getPrototypeOf(Form)).call.apply(_ref, [this].concat(args))), _this), _this.onFieldChange = function (value, name) {
				var _this$props = _this.props,
				    instance = _this$props.instance,
				    onChange = _this$props.onChange,
				    forceRefresh = _this$props.forceRefresh;
	
				(0, _pathUtil.setValue)(instance, name, value);
	
				if (onChange !== false) {
					if (typeof onChange === 'function') {
						onChange({
							target: {
								value: instance
							}
						});
					} else if (onChange === undefined) {
						var parent = (0, _pathUtil.getValue)(_this, ['_reactInternalInstance', '_currentElement', '_owner', '_instance']);
						if (!parent) {
							if (forceRefresh) {
								_this.setState({});
							} else {
								console.warn('BDP Component - Form injection failed. Can\'t find parent component.');
							}
						} else {
							parent.setState({});
						}
					}
				}
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}
	
		_createClass(Form, [{
			key: 'render',
			value: function render() {
				var _props = this.props,
				    children = _props.children,
				    instance = _props.instance,
				    disabled = _props.disabled;
	
				var entity = linkElement(children, instance, {
					disabled: disabled,
					onFieldChange: this.onFieldChange
				});
				this.fields = entity.fields;
	
				return _react2.default.createElement(
					'div',
					{ className: 'bdp-form' },
					entity.element
				);
			}
		}]);
	
		return Form;
	}(_react2.default.Component);
	
	Form.propTypes = {
		forceRefresh: _react.PropTypes.bool,
		instance: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.array]).isRequired,
		children: _react.PropTypes.node.isRequired,
		onChange: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.bool]),
		disabled: _react.PropTypes.bool
	};
	
	var _default = Form;
	exports.default = _default;
	;
	
	var _temp2 = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(isBaseType, 'isBaseType', 'C:/MyGit/BDPComponent/components/Form/index.js');
	
		__REACT_HOT_LOADER__.register(linkElement, 'linkElement', 'C:/MyGit/BDPComponent/components/Form/index.js');
	
		__REACT_HOT_LOADER__.register(Form, 'Form', 'C:/MyGit/BDPComponent/components/Form/index.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/components/Form/index.js');
	}();

	;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Button = __webpack_require__(15);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _PropsComponent = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function parseValues() {
		var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	
		return values.map(function (value) {
			return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? value : { value: value };
		});
	}
	
	var Li = (0, _PropsComponent.withProps)(function (_ref) {
		var entity = _ref.entity,
		    rest = _objectWithoutProperties(_ref, ['entity']);
	
		return (// eslint-disable-line no-unused-vars
			_react2.default.createElement('li', rest)
		);
	});
	Li.propTypes = {
		entity: _react.PropTypes.object
	};
	
	var InlineList = function (_React$Component) {
		_inherits(InlineList, _React$Component);
	
		function InlineList() {
			_classCallCheck(this, InlineList);
	
			var _this = _possibleConstructorReturn(this, (InlineList.__proto__ || Object.getPrototypeOf(InlineList)).call(this));
	
			_this.onRemoveItem = function (event, props) {
				var _this$props = _this.props,
				    value = _this$props.value,
				    onRemoveItem = _this$props.onRemoveItem,
				    onChange = _this$props.onChange;
	
				var index = props['data-index'];
				var item = value[index];
				var newValue = value.concat();
				newValue.splice(index, 1);
	
				if (onRemoveItem) onRemoveItem(item);
				if (onChange) {
					onChange({
						target: {
							value: newValue
						}
					});
				}
			};
	
			_this.onItemClick = function (event, _ref2) {
				var entity = _ref2.entity;
				var onItemClick = _this.props.onItemClick;
	
				if (onItemClick) onItemClick(entity);
			};
	
			_this.state = {};
			return _this;
		}
	
		_createClass(InlineList, [{
			key: 'render',
			value: function render() {
				var _this2 = this;
	
				var _props = this.props,
				    values = _props.value,
				    disabled = _props.disabled,
				    readOnly = _props.readOnly,
				    className = _props.className,
				    _props$icon = _props.icon,
				    icon = _props$icon === undefined ? 'times' : _props$icon,
				    type = _props.type;
	
				var parsedValues = parseValues(values);
	
				return _react2.default.createElement(
					'ul',
					{ className: (0, _classnames2.default)('list-inline InlineList', className) },
					parsedValues.map(function (entity, index) {
						var value = entity.value,
						    description = entity.description,
						    itemReadOnly = entity.readOnly,
						    itemType = entity.type;
	
						var mergedType = itemType || type;
	
						return _react2.default.createElement(
							Li,
							{
								key: index, onClick: _this2.onItemClick, entity: entity,
								className: (0, _classnames2.default)('label', 'clearfix', {
									'label-primary': !mergedType && !readOnly && !disabled,
									'label-default': !mergedType && (readOnly || disabled)
								}, mergedType && 'label-' + mergedType)
							},
							description || value,
							!disabled && !readOnly && !itemReadOnly && _react2.default.createElement(_Button2.default, { className: (0, _classnames2.default)('fa', 'fa-' + icon), 'data-index': index, onClick: _this2.onRemoveItem }),
							disabled && !readOnly && !itemReadOnly && _react2.default.createElement('button', { className: 'fa fa-ban', disabled: true })
						);
					}),
					parsedValues.length === 0 && _react2.default.createElement(
						'li',
						{ className: 'text-muted' },
						'(Empty List)'
					)
				);
			}
		}]);
	
		return InlineList;
	}(_react2.default.Component);
	
	InlineList.propTypes = {
		className: _react.PropTypes.string,
		type: _react.PropTypes.string,
		icon: _react.PropTypes.string,
		value: _react.PropTypes.array.isRequired,
		disabled: _react.PropTypes.bool,
		readOnly: _react.PropTypes.bool,
		onRemoveItem: _react.PropTypes.func,
		onChange: _react.PropTypes.func,
		onItemClick: _react.PropTypes.func
	};
	
	var _default = InlineList;
	exports.default = _default;
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(parseValues, 'parseValues', 'C:/MyGit/BDPComponent/components/InlineList/index.js');
	
		__REACT_HOT_LOADER__.register(Li, 'Li', 'C:/MyGit/BDPComponent/components/InlineList/index.js');
	
		__REACT_HOT_LOADER__.register(InlineList, 'InlineList', 'C:/MyGit/BDPComponent/components/InlineList/index.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/components/InlineList/index.js');
	}();

	;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LoadingIcon = function LoadingIcon(_ref) {
		var _ref$type = _ref.type,
		    type = _ref$type === undefined ? 'primary' : _ref$type,
		    hide = _ref.hide;
	
		if (hide) {
			return null;
		}
		return _react2.default.createElement(
			'div',
			{ className: 'progress active' },
			_react2.default.createElement('div', { className: (0, _classnames2.default)('progress-bar progress-bar-' + type + ' progress-bar-striped'), style: { width: '100%' } })
		);
	};
	
	LoadingIcon.propTypes = {
		type: _react.PropTypes.string,
		hide: _react.PropTypes.bool
	};
	
	var _default = LoadingIcon;
	exports.default = _default;
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(LoadingIcon, 'LoadingIcon', 'C:/MyGit/BDPComponent/components/LoadingBar.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/components/LoadingBar.js');
	}();

	;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LoadingIcon = function LoadingIcon(_ref) {
		var _ref$icon = _ref.icon,
		    icon = _ref$icon === undefined ? 'refresh' : _ref$icon,
		    hide = _ref.hide;
	
		if (hide) {
			return null;
		}
		return _react2.default.createElement('span', { className: (0, _classnames2.default)('fa fa-' + icon + ' fa-spin') });
	};
	
	LoadingIcon.propTypes = {
		icon: _react.PropTypes.string,
		hide: _react.PropTypes.bool
	};
	
	var _default = LoadingIcon;
	exports.default = _default;
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(LoadingIcon, 'LoadingIcon', 'C:/MyGit/BDPComponent/components/LoadingIcon.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/components/LoadingIcon.js');
	}();

	;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _PropsComponent = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /*
	                                                                                                                                                                                                                              * Licensed to the Apache Software Foundation (ASF) under one
	                                                                                                                                                                                                                              * or more contributor license agreements.  See the NOTICE file
	                                                                                                                                                                                                                              * distributed with this work for additional information
	                                                                                                                                                                                                                              * regarding copyright ownership.  The ASF licenses this file
	                                                                                                                                                                                                                              * to you under the Apache License, Version 2.0 (the
	                                                                                                                                                                                                                              * "License"); you may not use this file except in compliance
	                                                                                                                                                                                                                              * with the License.  You may obtain a copy of the License at
	                                                                                                                                                                                                                              *
	                                                                                                                                                                                                                              *     http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                              *
	                                                                                                                                                                                                                              * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                              * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                              * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                              * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                              * limitations under the License.
	                                                                                                                                                                                                                              */
	
	var Th = function Th(_ref) {
	  var children = _ref.children,
	      props = _objectWithoutProperties(_ref, ['children']);
	
	  var domProps = Object.assign({}, props);
	  delete domProps.styles;
	
	  return _react2.default.createElement(
	    'th',
	    domProps,
	    children
	  );
	};
	
	Th.propTypes = {
	  children: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.string, _react.PropTypes.number])
	};
	
	var _default = (0, _PropsComponent.withProps)(Th);
	
	exports.default = _default;
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(Th, 'Th', 'C:/MyGit/BDPComponent/components/SortTable/Th.js');
	
	  __REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/components/SortTable/Th.js');
	}();

	;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _stringUtils = __webpack_require__(59);
	
	var _PropsComponent = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function parseValues(values) {
		return values.map(function (value) {
			return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? value : {
				value: value
			};
		});
	}
	
	var getName = function getName(name) {
		if (Array.isArray(name)) return name.join('_');
		return name;
	};
	
	var wrapEvent = function wrapEvent(value) {
		var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { target: {} };
		return _extends({}, event, {
			target: _extends({}, event.target, {
				value: value
			})
		});
	};
	
	var Input = (0, _PropsComponent.withProps)(function (props) {
		return _react2.default.createElement('input', props);
	});
	
	var StateFormField = function (_React$Component) {
		_inherits(StateFormField, _React$Component);
	
		function StateFormField() {
			_classCallCheck(this, StateFormField);
	
			var _this = _possibleConstructorReturn(this, (StateFormField.__proto__ || Object.getPrototypeOf(StateFormField)).call(this));
	
			_this.onChange = function (event) {
				var _this$props = _this.props,
				    name = _this$props.name,
				    onChange = _this$props.onChange;
				var onFieldChange = _this.context.onFieldChange;
	
				var value = event.target.value;
	
				onFieldChange(_this.doFilter(value), name);
				if (onChange) onChange(event);
			};
	
			_this.onSingleCheckBoxChange = function (event) {
				var value = !_this.getValue();
				_this.onChange(wrapEvent(value, event));
			};
	
			_this.onGroupCheckBoxChange = function (event, checkProps) {
				var value = checkProps['data-value'];
				var values = _this.getValue() || [];
				if (values.indexOf(value) === -1) {
					_this.onChange(wrapEvent([].concat(_toConsumableArray(values), [value]), event));
				} else {
					_this.onChange(wrapEvent(values.filter(function (val) {
						return val !== value;
					}), event));
				}
			};
	
			_this.getValue = function () {
				var getFieldValue = _this.context.getFieldValue;
	
				if (_this.props.value) return _this.props.value;
	
				return getFieldValue(_this.props.name);
			};
	
			_this.doFilter = function (value) {
				var filter = _this.props.filter;
	
				if (!filter) return value;
				return filter(value);
			};
	
			_this.isChecked = function (value) {
				return (_this.getValue() || []).indexOf(value) >= 0;
			};
	
			_this.state = {};
			return _this;
		}
	
		_createClass(StateFormField, [{
			key: 'render',
			value: function render() {
				var _this2 = this;
	
				var _props = this.props,
				    name = _props.name,
				    displayName = _props.displayName,
				    description = _props.description,
				    type = _props.type,
				    inline = _props.inline,
				    values = _props.values,
				    rows = _props.rows,
				    Component = _props.component,
				    props = _objectWithoutProperties(_props, ['name', 'displayName', 'description', 'type', 'inline', 'values', 'rows', 'component']);
	
				var getFormDisabled = this.context.getFormDisabled;
	
	
				var $input = null;
				var myName = getName(name);
				var myFormatName = (0, _stringUtils.capitalize)(myName);
				var value = this.getValue();
				var disabled = getFormDisabled();
	
				delete props.onChange;
				delete props.filter;
				delete props.value;
	
				if (Component) {
					$input = _react2.default.createElement(Component, _extends({}, props, { type: type, value: value, disabled: disabled, onChange: this.onChange
					}));
				} else {
					switch (type) {
						case 'bool':
						case 'checkbox':
							if (!values) {
								return _react2.default.createElement(
									'div',
									{ className: 'checkbox' },
									_react2.default.createElement(
										'label',
										{ htmlFor: myName },
										_react2.default.createElement('input', _extends({
											id: myName, type: 'checkbox', checked: !!value,
											disabled: disabled,
											onChange: this.onSingleCheckBoxChange }, props)),
										' ',
										displayName || myFormatName
									)
								);
							}
							return _react2.default.createElement(
								'div',
								{ className: inline && 'form-group' },
								parseValues(values).map(function (item, index) {
									var $checkbox = _react2.default.createElement(
										'label',
										{
											key: index,
											htmlFor: myName + '_' + index,
											className: inline && 'checkbox-inline'
										},
										_react2.default.createElement(Input, _extends({
											id: myName + '_' + index, type: 'checkbox',
											disabled: disabled,
											onChange: _this2.onGroupCheckBoxChange,
											'data-value': item.value,
											checked: _this2.isChecked(item.value) }, props)),
										' ',
										item.description || item.value
									);
	
									return inline ? $checkbox : _react2.default.createElement(
										'div',
										{ className: 'checkbox', key: index },
										$checkbox
									);
								})
							);
	
						case 'radio':
							return _react2.default.createElement(
								'div',
								{ className: inline && 'form-group' },
								parseValues(values).map(function (item, index) {
									var $radio = _react2.default.createElement(
										'label',
										{
											key: index,
											htmlFor: myName + '_' + index,
											className: inline && 'radio-inline'
										},
										_react2.default.createElement('input', _extends({
											type: 'radio', name: myName, id: myName + '_' + index, value: item.value,
											disabled: disabled,
											onChange: _this2.onChange }, props)),
										' ',
										item.description || item.value
									);
	
									return inline ? $radio : _react2.default.createElement(
										'div',
										{ className: 'radio', key: index },
										$radio
									);
								})
							);
	
						case 'email':
						case 'number':
						case 'search':
						case 'password':
						default:
							if (values) {
								var miss = false;
								var parsedValue = value || '';
								var parsedValues = parseValues(values);
								if (!parsedValue && parsedValues.every(function (item) {
									return item.value !== parsedValue;
								})) {
									miss = true;
								}
	
								$input = _react2.default.createElement(
									'select',
									_extends({
										className: 'form-control', value: parsedValue,
										disabled: disabled,
										onChange: this.onChange }, props),
									miss && _react2.default.createElement('option', { value: '' }),
									parseValues(values).map(function (item, index) {
										return _react2.default.createElement(
											'option',
											{ key: index, value: item.value },
											item.description || item.value
										);
									})
								);
							} else if (rows || type === 'textarea' || type === 'blob') {
								$input = _react2.default.createElement('textarea', _extends({
									className: 'form-control', id: myName, placeholder: description,
									disabled: disabled,
									value: value || '', onChange: this.onChange, rows: rows || 5 }, props));
							} else {
								$input = _react2.default.createElement('input', _extends({
									type: type || 'text', className: 'form-control', id: myName, placeholder: description,
									disabled: disabled,
									value: value || '', onChange: this.onChange }, props));
							}
					}
				}
	
				return _react2.default.createElement(
					'div',
					{ className: 'form-group' },
					displayName !== '' && _react2.default.createElement(
						'label',
						{ htmlFor: myName },
						displayName || myFormatName
					),
					$input
				);
			}
		}]);
	
		return StateFormField;
	}(_react2.default.Component);
	
	StateFormField.propTypes = {
		name: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.array]).isRequired,
		displayName: _react.PropTypes.node,
		description: _react.PropTypes.string,
		type: _react.PropTypes.string,
		inline: _react.PropTypes.bool,
		rows: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
		component: _react.PropTypes.func,
		value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number, _react2.default.PropTypes.bool, _react2.default.PropTypes.array, _react2.default.PropTypes.object, _react2.default.PropTypes.symbol]),
		values: _react.PropTypes.array,
	
		filter: _react.PropTypes.func,
		onChange: _react.PropTypes.func,
		onValueChange: _react.PropTypes.func
	};
	
	StateFormField.contextTypes = {
		onFieldChange: _react.PropTypes.func,
		getFieldValue: _react.PropTypes.func,
		getFormDisabled: _react.PropTypes.func
	};
	
	var _default = StateFormField;
	exports.default = _default;
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(parseValues, 'parseValues', 'C:/MyGit/BDPComponent/components/StateForm/StateFormField.js');
	
		__REACT_HOT_LOADER__.register(getName, 'getName', 'C:/MyGit/BDPComponent/components/StateForm/StateFormField.js');
	
		__REACT_HOT_LOADER__.register(wrapEvent, 'wrapEvent', 'C:/MyGit/BDPComponent/components/StateForm/StateFormField.js');
	
		__REACT_HOT_LOADER__.register(Input, 'Input', 'C:/MyGit/BDPComponent/components/StateForm/StateFormField.js');
	
		__REACT_HOT_LOADER__.register(StateFormField, 'StateFormField', 'C:/MyGit/BDPComponent/components/StateForm/StateFormField.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/components/StateForm/StateFormField.js');
	}();

	;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.withStateForm = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _pathUtil = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var withStateForm = exports.withStateForm = function withStateForm(Component) {
		var WrapComponent = function WrapComponent(props, context) {
			return _react2.default.createElement(Component, _extends({}, context, props));
		};
	
		WrapComponent.contextTypes = {
			instance: _react.PropTypes.object,
			path: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.array])
		};
	
		return WrapComponent;
	};
	
	var StateForm = function (_React$Component) {
		_inherits(StateForm, _React$Component);
	
		function StateForm() {
			_classCallCheck(this, StateForm);
	
			var _this = _possibleConstructorReturn(this, (StateForm.__proto__ || Object.getPrototypeOf(StateForm)).call(this));
	
			_this.onFieldChange = function (value, name) {
				var _this$props = _this.props,
				    instance = _this$props.instance,
				    onChange = _this$props.onChange,
				    forceRefresh = _this$props.forceRefresh;
	
				var myPath = _this.getPath();
				instance.setState(function (preState) {
					var state = (0, _pathUtil.updateValue)(preState, myPath.concat(name), function () {
						return value;
					});
					if (onChange) {
						onChange({
							target: { value: (0, _pathUtil.getValue)(state, myPath) }
						});
					}
					return state;
				});
				if (forceRefresh) {
					_this.setState({});
				}
			};
	
			_this.getFieldValue = function (name) {
				var instance = _this.props.instance;
	
				var entity = (0, _pathUtil.getValue)(instance.state, _this.getPath());
				if (!name || !name.length || !entity) return entity;
	
				return (0, _pathUtil.getValue)(entity, name);
			};
	
			_this.getFormDisabled = function () {
				return _this.props.disabled;
			};
	
			_this.getPath = function () {
				var path = _this.props.path;
	
				if (Array.isArray(path)) {
					return path;
				} else if (!path && typeof path !== 'number') {
					return [];
				}
				return [path];
			};
	
			_this.state = {};
			return _this;
		}
	
		_createClass(StateForm, [{
			key: 'getChildContext',
			value: function getChildContext() {
				return {
					onFieldChange: this.onFieldChange,
					getFieldValue: this.getFieldValue,
					getFormDisabled: this.getFormDisabled,
					instance: this.props.instance,
					path: this.props.path
				};
			}
		}, {
			key: 'render',
			value: function render() {
				var _props = this.props,
				    className = _props.className,
				    children = _props.children;
	
	
				return _react2.default.createElement(
					'div',
					{ className: className },
					children
				);
			}
		}]);
	
		return StateForm;
	}(_react2.default.Component);
	
	StateForm.propTypes = {
		className: _react.PropTypes.string,
		children: _react.PropTypes.node,
		instance: _react.PropTypes.object.isRequired,
		path: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.array]),
		onChange: _react.PropTypes.func,
		disabled: _react.PropTypes.bool,
		forceRefresh: _react.PropTypes.bool
	};
	
	StateForm.childContextTypes = {
		instance: _react.PropTypes.object,
		path: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.array]),
		onFieldChange: _react.PropTypes.func,
		getFieldValue: _react.PropTypes.func,
		getFormDisabled: _react.PropTypes.func
	};
	
	var _default = StateForm;
	exports.default = _default;
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(withStateForm, 'withStateForm', 'C:/MyGit/BDPComponent/components/StateForm/index.js');
	
		__REACT_HOT_LOADER__.register(StateForm, 'StateForm', 'C:/MyGit/BDPComponent/components/StateForm/index.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/components/StateForm/index.js');
	}();

	;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(1);
	
	var TabContent = function TabContent() {
		return null;
	};
	
	TabContent.propTypes = {
		name: _react.PropTypes.node,
		content: _react.PropTypes.node,
		children: _react.PropTypes.node
	};
	
	var _default = TabContent;
	exports.default = _default;
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(TabContent, 'TabContent', 'C:/MyGit/BDPComponent/components/Tabs/TabContent.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/components/Tabs/TabContent.js');
	}();

	;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _A = __webpack_require__(9);
	
	var _A2 = _interopRequireDefault(_A);
	
	var _Footer = __webpack_require__(10);
	
	var _Footer2 = _interopRequireDefault(_Footer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Tabs = function (_React$Component) {
		_inherits(Tabs, _React$Component);
	
		function Tabs() {
			_classCallCheck(this, Tabs);
	
			var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this));
	
			_this.getList = function () {
				var _this$props = _this.props,
				    children = _this$props.children,
				    list = _this$props.list;
	
				if (list) return list;
	
				return children ? _react2.default.Children.map(children, function () {
					var cell = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
					var _ref = cell.props || {},
					    content = _ref.content,
					    cellChildren = _ref.children,
					    props = _objectWithoutProperties(_ref, ['content', 'children']);
	
					return _extends({
						content: content || cellChildren
					}, props);
				}) : [];
			};
	
			_this.state = {
				current: 0
			};
	
			_this.onTabClick = _this.onTabClick.bind(_this);
			return _this;
		}
	
		_createClass(Tabs, [{
			key: 'onTabClick',
			value: function onTabClick(event, props) {
				var current = props['data-index'];
				if (this.state.current !== current) {
					this.setState({ current: current });
				}
			}
		}, {
			key: 'getCurrentTab',
			value: function getCurrentTab() {
				var current = this.state.current;
	
				var list = this.getList();
				return list[current];
			}
		}, {
			key: 'setCurrentTab',
			value: function setCurrentTab(index) {
				this.setState({ current: index });
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;
	
				var _props = this.props,
				    className = _props.className,
				    isPill = _props.isPill,
				    isBox = _props.isBox,
				    hasContent = _props.hasContent,
				    toolBar = _props.toolBar,
				    footer = _props.footer,
				    loading = _props.loading,
				    onlyOne = _props.onlyOne;
				var current = this.state.current;
	
				var list = this.getList();
				var $content = void 0;
	
				if (hasContent !== false) {
					$content = _react2.default.createElement(
						'div',
						{ className: 'tab-content' },
						list.map(function (tab, index) {
							var content = tab.content;
	
							if (content && (!onlyOne || current === index)) {
								return _react2.default.createElement(
									'div',
									{ className: (0, _classnames2.default)('tab-pane', { active: current === index }), key: index },
									content
								);
							}
							return null;
						})
					);
				}
	
				var $footer = void 0;
				if (footer) {
					$footer = (footer.type || {})._isBoxFooter ? footer : _react2.default.createElement(
						_Footer2.default,
						null,
						footer
					);
				}
	
				var $loading = loading ? _react2.default.createElement(
					'div',
					{ className: 'overlay' },
					_react2.default.createElement('span', { className: 'fa fa-refresh fa-spin' })
				) : null;
	
				return _react2.default.createElement(
					'div',
					{ className: (0, _classnames2.default)(className, 'bdp-tabs', isBox && 'nav-tabs-custom overlay-wrapper') },
					_react2.default.createElement(
						'ul',
						{ className: (0, _classnames2.default)('nav', isPill ? 'nav-pills' : 'nav-tabs') },
						list.map(function (_ref2, index) {
							var name = _ref2.name;
							return _react2.default.createElement(
								'li',
								{ className: (0, _classnames2.default)({ active: current === index }), key: index },
								_react2.default.createElement(
									_A2.default,
									{ href: 'javascript:;', onClick: _this2.onTabClick, 'data-index': index },
									name
								)
							);
						}),
						toolBar && _react2.default.createElement(
							'li',
							{ className: 'pull-right' },
							toolBar
						)
					),
					$content,
					$footer,
					$loading
				);
			}
		}]);
	
		return Tabs;
	}(_react2.default.Component);
	
	Tabs.propTypes = {
		className: _react.PropTypes.string,
		isPill: _react.PropTypes.bool,
		isBox: _react.PropTypes.bool,
		hasContent: _react.PropTypes.bool,
		list: _react.PropTypes.arrayOf(_react.PropTypes.shape({
			name: _react.PropTypes.node
		})),
		toolBar: _react.PropTypes.node,
		footer: _react.PropTypes.node,
		loading: _react.PropTypes.bool,
		children: _react.PropTypes.node,
		onlyOne: _react.PropTypes.bool
	};
	
	var _default = Tabs;
	exports.default = _default;
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(Tabs, 'Tabs', 'C:/MyGit/BDPComponent/components/Tabs/index.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/components/Tabs/index.js');
	}();

	;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Tooltip = function (_React$Component) {
		_inherits(Tooltip, _React$Component);
	
		function Tooltip() {
			_classCallCheck(this, Tooltip);
	
			var _this = _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this));
	
			_this.state = {};
			return _this;
		}
	
		_createClass(Tooltip, [{
			key: 'render',
			value: function render() {
				var _props = this.props,
				    className = _props.className,
				    inline = _props.inline,
				    title = _props.title,
				    _props$placement = _props.placement,
				    placement = _props$placement === undefined ? 'top' : _props$placement,
				    children = _props.children;
	
	
				return _react2.default.createElement(
					'div',
					{
						className: (0, _classnames2.default)('bdp-tooltip clearfix', className),
						style: { display: inline !== false ? 'inline-block' : 'block' }
					},
					children,
					title ? _react2.default.createElement(
						'div',
						{ className: (0, _classnames2.default)('bdp-tooltip-container', placement) },
						_react2.default.createElement('div', { className: 'bdp-tooltip-arrow' }),
						_react2.default.createElement(
							'div',
							{ className: 'bdp-tooltip-content' },
							_react2.default.createElement(
								'div',
								{ className: 'bdp-tooltip-inner' },
								title
							)
						)
					) : null
				);
			}
		}]);
	
		return Tooltip;
	}(_react2.default.Component);
	
	Tooltip.propTypes = {
		className: _react.PropTypes.string,
		inline: _react.PropTypes.bool,
		title: _react.PropTypes.node,
		placement: _react.PropTypes.string,
		children: _react.PropTypes.node
	};
	
	var _default = Tooltip;
	exports.default = _default;
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(Tooltip, 'Tooltip', 'C:/MyGit/BDPComponent/components/Tooltip/index.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/components/Tooltip/index.js');
	}();

	;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.withTree = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed to the Apache Software Foundation (ASF) under one
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * or more contributor license agreements.  See the NOTICE file
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed with this work for additional information
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * regarding copyright ownership.  The ASF licenses this file
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * to you under the Apache License, Version 2.0 (the
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * "License"); you may not use this file except in compliance
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * with the License.  You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	/**
	 * Component need provide { children } container to hold the children list.
	 * @param Component
	 * @param getList
	 */
	var withTree = exports.withTree = function withTree(Component, getList) {
	  var TreeItem = function (_React$Component) {
	    _inherits(TreeItem, _React$Component);
	
	    function TreeItem() {
	      _classCallCheck(this, TreeItem);
	
	      var _this = _possibleConstructorReturn(this, (TreeItem.__proto__ || Object.getPrototypeOf(TreeItem)).call(this));
	
	      _this.onClick = _this.onClick.bind(_this);
	      return _this;
	    }
	
	    _createClass(TreeItem, [{
	      key: 'onClick',
	      value: function onClick() {
	        console.log('TODO: Click', this);
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        var list = getList(this.props) || [];
	
	        return _react2.default.createElement(
	          Component,
	          this.props,
	          list.map(function (item, index) {
	            return _react2.default.createElement(TreeItem, _extends({ key: index }, item));
	          })
	        );
	      }
	    }]);
	
	    return TreeItem;
	  }(_react2.default.Component);
	
	  return TreeItem;
	};
	
	var _default = {};
	exports.default = _default;
	;
	
	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }
	
	  __REACT_HOT_LOADER__.register(withTree, 'withTree', 'C:/MyGit/BDPComponent/components/Tree/index.js');
	
	  __REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/components/Tree/index.js');
	}();

	;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _TypeAheadInput = __webpack_require__(21);
	
	var _TypeAheadInput2 = _interopRequireDefault(_TypeAheadInput);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TypeAheadInputGroup = function (_React$Component) {
		_inherits(TypeAheadInputGroup, _React$Component);
	
		function TypeAheadInputGroup() {
			_classCallCheck(this, TypeAheadInputGroup);
	
			var _this = _possibleConstructorReturn(this, (TypeAheadInputGroup.__proto__ || Object.getPrototypeOf(TypeAheadInputGroup)).call(this));
	
			_this.onClick = _this.onClick.bind(_this);
			return _this;
		}
	
		_createClass(TypeAheadInputGroup, [{
			key: 'onClick',
			value: function onClick() {
				var _props = this.props,
				    onSelectValue = _props.onSelectValue,
				    value = _props.value;
	
				if (onSelectValue) {
					onSelectValue(value);
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _props2 = this.props,
				    _props2$type = _props2.type,
				    type = _props2$type === undefined ? 'primary' : _props2$type,
				    _props2$text = _props2.text,
				    text = _props2$text === undefined ? 'Confirm' : _props2$text,
				    queryFunc = _props2.queryFunc,
				    onChange = _props2.onChange,
				    props = _objectWithoutProperties(_props2, ['type', 'text', 'queryFunc', 'onChange']);
	
				return _react2.default.createElement(
					'div',
					{ className: 'input-group' },
					_react2.default.createElement(_TypeAheadInput2.default, _extends({ queryFunc: queryFunc, onChange: onChange }, props)),
					_react2.default.createElement(
						'span',
						{ className: 'input-group-btn' },
						_react2.default.createElement(
							'button',
							{ className: (0, _classnames2.default)('btn', 'btn-' + type), onClick: this.onClick },
							text
						)
					)
				);
			}
		}]);
	
		return TypeAheadInputGroup;
	}(_react2.default.Component);
	
	TypeAheadInputGroup.propTypes = {
		queryFunc: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.array]).isRequired,
		value: _react.PropTypes.string,
		onChange: _react.PropTypes.func,
		onSelectValue: _react.PropTypes.func,
		type: _react.PropTypes.string,
		text: _react.PropTypes.string
	};
	
	var _default = TypeAheadInputGroup;
	exports.default = _default;
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(TypeAheadInputGroup, 'TypeAheadInputGroup', 'C:/MyGit/BDPComponent/components/Typeahead/TypeAheadInputGroup.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/components/Typeahead/TypeAheadInputGroup.js');
	}();

	;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.withProps = exports.withTypeAhead = exports.withTree = exports.Else = exports.ElseIf = exports.If = exports.Default = exports.Case = exports.Condition = exports.TypeAheadInputGroup = exports.TypeAheadInput = exports.InlineList = exports.withStateForm = exports.StateFormField = exports.StateForm = exports.Field = exports.Form = exports.LoadingIcon = exports.LoadingBar = exports.DialogInstance = exports.Dialog = exports.BoxFooter = exports.Box = exports.Checkbox = exports.Tooltip = exports.Pagination = exports.Column = exports.SortTable = exports.Collapse = exports.TabContent = exports.Tabs = exports.A = exports.Button = undefined;
	
	var _StateForm2 = __webpack_require__(51);
	
	Object.defineProperty(exports, 'withStateForm', {
	  enumerable: true,
	  get: function get() {
	    return _StateForm2.withStateForm;
	  }
	});
	
	var _Condition2 = __webpack_require__(43);
	
	Object.defineProperty(exports, 'Case', {
	  enumerable: true,
	  get: function get() {
	    return _Condition2.Case;
	  }
	});
	Object.defineProperty(exports, 'Default', {
	  enumerable: true,
	  get: function get() {
	    return _Condition2.Default;
	  }
	});
	Object.defineProperty(exports, 'If', {
	  enumerable: true,
	  get: function get() {
	    return _Condition2.If;
	  }
	});
	Object.defineProperty(exports, 'ElseIf', {
	  enumerable: true,
	  get: function get() {
	    return _Condition2.ElseIf;
	  }
	});
	Object.defineProperty(exports, 'Else', {
	  enumerable: true,
	  get: function get() {
	    return _Condition2.Else;
	  }
	});
	
	var _Tree = __webpack_require__(55);
	
	Object.defineProperty(exports, 'withTree', {
	  enumerable: true,
	  get: function get() {
	    return _Tree.withTree;
	  }
	});
	
	var _PropsComponent = __webpack_require__(5);
	
	Object.defineProperty(exports, 'withProps', {
	  enumerable: true,
	  get: function get() {
	    return _PropsComponent.withProps;
	  }
	});
	
	var _Button2 = __webpack_require__(15);
	
	var _Button3 = _interopRequireDefault(_Button2);
	
	var _A2 = __webpack_require__(9);
	
	var _A3 = _interopRequireDefault(_A2);
	
	var _Tabs2 = __webpack_require__(53);
	
	var _Tabs3 = _interopRequireDefault(_Tabs2);
	
	var _TabContent2 = __webpack_require__(52);
	
	var _TabContent3 = _interopRequireDefault(_TabContent2);
	
	var _Collapse2 = __webpack_require__(42);
	
	var _Collapse3 = _interopRequireDefault(_Collapse2);
	
	var _SortTable2 = __webpack_require__(20);
	
	var _SortTable3 = _interopRequireDefault(_SortTable2);
	
	var _Column2 = __webpack_require__(18);
	
	var _Column3 = _interopRequireDefault(_Column2);
	
	var _Pagination2 = __webpack_require__(19);
	
	var _Pagination3 = _interopRequireDefault(_Pagination2);
	
	var _Tooltip2 = __webpack_require__(54);
	
	var _Tooltip3 = _interopRequireDefault(_Tooltip2);
	
	var _Checkbox2 = __webpack_require__(41);
	
	var _Checkbox3 = _interopRequireDefault(_Checkbox2);
	
	var _Box2 = __webpack_require__(40);
	
	var _Box3 = _interopRequireDefault(_Box2);
	
	var _Footer = __webpack_require__(10);
	
	var _Footer2 = _interopRequireDefault(_Footer);
	
	var _Dialog2 = __webpack_require__(44);
	
	var _Dialog3 = _interopRequireDefault(_Dialog2);
	
	var _Dialog4 = __webpack_require__(16);
	
	var _Dialog5 = _interopRequireDefault(_Dialog4);
	
	var _LoadingBar2 = __webpack_require__(47);
	
	var _LoadingBar3 = _interopRequireDefault(_LoadingBar2);
	
	var _LoadingIcon2 = __webpack_require__(48);
	
	var _LoadingIcon3 = _interopRequireDefault(_LoadingIcon2);
	
	var _Form2 = __webpack_require__(45);
	
	var _Form3 = _interopRequireDefault(_Form2);
	
	var _Field2 = __webpack_require__(17);
	
	var _Field3 = _interopRequireDefault(_Field2);
	
	var _StateForm3 = _interopRequireDefault(_StateForm2);
	
	var _StateFormField2 = __webpack_require__(50);
	
	var _StateFormField3 = _interopRequireDefault(_StateFormField2);
	
	var _InlineList2 = __webpack_require__(46);
	
	var _InlineList3 = _interopRequireDefault(_InlineList2);
	
	var _TypeAheadInput2 = __webpack_require__(21);
	
	var _TypeAheadInput3 = _interopRequireDefault(_TypeAheadInput2);
	
	var _TypeAheadInputGroup2 = __webpack_require__(56);
	
	var _TypeAheadInputGroup3 = _interopRequireDefault(_TypeAheadInputGroup2);
	
	var _Condition3 = _interopRequireDefault(_Condition2);
	
	var _Typeahead = __webpack_require__(22);
	
	var _Typeahead2 = _interopRequireDefault(_Typeahead);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Button = _Button3.default; /*
	                                    * Licensed to the Apache Software Foundation (ASF) under one
	                                    * or more contributor license agreements.  See the NOTICE file
	                                    * distributed with this work for additional information
	                                    * regarding copyright ownership.  The ASF licenses this file
	                                    * to you under the Apache License, Version 2.0 (the
	                                    * "License"); you may not use this file except in compliance
	                                    * with the License.  You may obtain a copy of the License at
	                                    *
	                                    *     http://www.apache.org/licenses/LICENSE-2.0
	                                    *
	                                    * Unless required by applicable law or agreed to in writing, software
	                                    * distributed under the License is distributed on an "AS IS" BASIS,
	                                    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                    * See the License for the specific language governing permissions and
	                                    * limitations under the License.
	                                    */
	
	exports.A = _A3.default;
	exports.Tabs = _Tabs3.default;
	exports.TabContent = _TabContent3.default;
	exports.Collapse = _Collapse3.default;
	exports.SortTable = _SortTable3.default;
	exports.Column = _Column3.default;
	exports.Pagination = _Pagination3.default;
	exports.Tooltip = _Tooltip3.default;
	exports.Checkbox = _Checkbox3.default;
	exports.Box = _Box3.default;
	exports.BoxFooter = _Footer2.default;
	exports.Dialog = _Dialog3.default;
	exports.DialogInstance = _Dialog5.default;
	exports.LoadingBar = _LoadingBar3.default;
	exports.LoadingIcon = _LoadingIcon3.default;
	exports.Form = _Form3.default;
	exports.Field = _Field3.default;
	exports.StateForm = _StateForm3.default;
	exports.StateFormField = _StateFormField3.default;
	exports.InlineList = _InlineList3.default;
	exports.TypeAheadInput = _TypeAheadInput3.default;
	exports.TypeAheadInputGroup = _TypeAheadInputGroup3.default;
	exports.Condition = _Condition3.default;
	exports.withTypeAhead = _Typeahead2.default;
	var _default = {};
	exports.default = _default;
	;

	var _temp = function () {
	  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	    return;
	  }

	  __REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/components/index.js');
	}();

	;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _pathUtil = __webpack_require__(6);
	
	function findIndex(val, list, path, findAll, caseSensitive) {
		var _list = [];
		var match = caseSensitive === false ? ('' + val).toUpperCase() : val;
	
		for (var i = 0; i < list.length; i += 1) {
			var unit = list[i];
			var _val = (0, _pathUtil.getValue)(unit, path);
			_val = caseSensitive === false ? ('' + _val).toUpperCase() : _val;
	
			if (_val === match) {
				if (!findAll) return i;
				_list.push(i);
			}
		}
	
		return findAll ? _list : -1;
	}
	
	function sort(list, path, asc, customizeOrderList) {
		var sortFunc = void 0;
		var sortList = customizeOrderList || [];
	
		if (asc !== false) {
			sortFunc = function sortFunc(obj1, obj2) {
				var val1 = (0, _pathUtil.getValue)(obj1, path);
				var val2 = (0, _pathUtil.getValue)(obj2, path);
	
				var index1 = findIndex(val1, sortList);
				var index2 = findIndex(val2, sortList);
	
				if (index1 !== -1 && index2 === -1) {
					return -1;
				} else if (index1 === -1 && index2 !== -1) {
					return 1;
				} else if (index1 !== -1 && index2 !== -1) {
					return index1 - index2;
				}
	
				if (val1 === val2) {
					return 0;
				} else if (val1 === null || val1 === undefined || val1 < val2) {
					return -1;
				}
				return 1;
			};
		} else {
			sortFunc = function sortFunc(obj1, obj2) {
				var val1 = (0, _pathUtil.getValue)(obj1, path);
				var val2 = (0, _pathUtil.getValue)(obj2, path);
	
				var index1 = findIndex(val1, sortList);
				var index2 = findIndex(val2, sortList);
	
				if (index1 !== -1 && index2 === -1) {
					return -1;
				} else if (index1 === -1 && index2 !== -1) {
					return 1;
				} else if (index1 !== -1 && index2 !== -1) {
					return index1 - index2;
				}
	
				if (val1 === val2) {
					return 0;
				} else if (val1 === null || val1 === undefined || val1 < val2) {
					return 1;
				}
				return -1;
			};
		}
	
		return list.sort(sortFunc);
	}
	
	module.exports = {
		findIndex: findIndex,
		sort: sort
	};
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(findIndex, 'findIndex', 'C:/MyGit/BDPComponent/components/utils/arrayUtils.js');
	
		__REACT_HOT_LOADER__.register(sort, 'sort', 'C:/MyGit/BDPComponent/components/utils/arrayUtils.js');
	}();

	;

/***/ },
/* 59 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.capitalize = capitalize;
	function capitalize() {
		var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
		var split = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	
		var words = split ? string.split(/(?=[A-Z])/) : [string];
	
		return words.map(function (str) {
			if (!str) return str;
			return str.charAt(0).toUpperCase() + str.slice(1);
		}).join(' ');
	}
	
	var _default = {};
	exports.default = _default;
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(capitalize, 'capitalize', 'C:/MyGit/BDPComponent/components/utils/stringUtils.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/components/utils/stringUtils.js');
	}();

	;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(35);
	
	var _reactHotLoader = __webpack_require__(94);
	
	var _reactRedux = __webpack_require__(14);
	
	var _reactRouterDom = __webpack_require__(178);
	
	var _redux = __webpack_require__(36);
	
	var _reduxThunk = __webpack_require__(169);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	var _reduxLogger = __webpack_require__(168);
	
	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);
	
	var _jquery = __webpack_require__(13);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _reactAddonsPerf = __webpack_require__(91);
	
	var _reactAddonsPerf2 = _interopRequireDefault(_reactAddonsPerf);
	
	var _reducers = __webpack_require__(63);
	
	var _reducers2 = _interopRequireDefault(_reducers);
	
	var _Main = __webpack_require__(11);
	
	var _Main2 = _interopRequireDefault(_Main);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Created by jiljiang on 2016/10/12.
	 */
	
	var loggerMiddleware = (0, _reduxLogger2.default)({
		collapsed: true
	});
	var store = (0, _redux.createStore)(_reducers2.default, {}, (0, _redux.applyMiddleware)(_reduxThunk2.default, loggerMiddleware));
	window.store = store;
	window.$ = _jquery2.default;
	window.Perf = _reactAddonsPerf2.default;
	
	__webpack_require__(66);
	__webpack_require__(67);
	__webpack_require__(68);
	__webpack_require__(69);
	__webpack_require__(71);
	
	__webpack_require__(70);
	
	__webpack_require__(187);
	
	// Render & Hot Update
	delete _reactHotLoader.AppContainer.prototype.unstable_handleError;
	(0, _reactDom.render)(_react2.default.createElement(
		_reactHotLoader.AppContainer,
		null,
		_react2.default.createElement(
			_reactRouterDom.HashRouter,
			null,
			_react2.default.createElement(
				_reactRedux.Provider,
				{ store: store },
				_react2.default.createElement(_Main2.default, null)
			)
		)
	), document.getElementById('root'));
	
	// Hot Module Replacement API
	if (true) {
		module.hot.accept(11, function () {
			var NextMain = __webpack_require__(11).default;
			(0, _reactDom.render)(_react2.default.createElement(
				_reactHotLoader.AppContainer,
				null,
				_react2.default.createElement(
					_reactRouterDom.HashRouter,
					null,
					_react2.default.createElement(
						_reactRedux.Provider,
						{ store: store },
						_react2.default.createElement(NextMain, null)
					)
				)
			), document.getElementById('root'));
		});
	}
	
	__webpack_require__(167);
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(loggerMiddleware, 'loggerMiddleware', 'C:/MyGit/BDPComponent/src/index.js');
	
		__REACT_HOT_LOADER__.register(store, 'store', 'C:/MyGit/BDPComponent/src/index.js');
	}();

	;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _components = __webpack_require__(57);
	
	var components = _interopRequireWildcard(_components);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var list = [];
	
	// ==================================================================
	// =                             Button                             =
	// ==================================================================
	list.push({
		name: 'Button',
		class: components.Button,
		preview: [{
			children: 'Button'
		}, {
			type: 'danger',
			disabled: true,
			children: 'Button'
		}],
		props: {
			type: '[string] Set display type: primary, info, warning, danger'
		},
		description: 'Same as `<button>`. But will pass props with `onClick` (event, props).'
	});
	
	// ==================================================================
	// =                                A                               =
	// ==================================================================
	list.push({
		name: 'A',
		class: components.A,
		preview: {
			children: 'Link'
		},
		description: 'Same as `<a>`. But will pass props with `onClick` (event, props).'
	});
	
	// ==================================================================
	// =                              Tabs                              =
	// ==================================================================
	list.push({
		name: 'Tabs',
		class: components.Tabs,
		preview: [{
			onlyOne: true,
			children: [_react2.default.createElement(components.TabContent, { key: '1', name: 'Tab1', content: 'Test Tab1!' }), _react2.default.createElement(
				components.TabContent,
				{ key: '2', name: 'Tab2' },
				'Test Tab2!'
			)]
		}, {
			isPill: true,
			list: [{
				name: 'Tab1'
			}, {
				name: 'Tab2'
			}],
			hasContent: false
		}, {
			isBox: true,
			list: [{
				name: 'Tab1',
				content: 'test Tab1'
			}, {
				name: _react2.default.createElement(
					'strong',
					null,
					'Tab2'
				),
				content: 'test Tab2'
			}],
			toolBar: _react2.default.createElement(
				'a',
				null,
				_react2.default.createElement('span', { className: 'fa fa-cog' })
			),
			footer: _react2.default.createElement(
				'p',
				null,
				'This is footer!'
			),
			loading: true
		}],
		previewStyle: {
			background: '#ecf0f5'
		},
		props: {
			className: '[string] Set tab outer class',
			isPill: '[bool] Set pill style',
			isBox: '[bool] Set box style',
			hasContent: '[bool] Default: true. Set false will hide tab content',
			toolBar: '[node] Set top-right tool bar content',
			loading: '[bool] Display loading icon',
			onlyOne: '[bool] Set true will only keep one tab content in the page at a time',
			list: '[Array] Set tab list',
			'list.name': '[string] tab name',
			'list.content': '[string] tab content',
			'ref->getCurrentTab()': 'Call to get current tab props',
			'ref->setCurrentTab(index)': 'Call to set current tab',
			children: '[TabContent[]] Same as `list` prop. Wrapped with `TabContent` component.'
		}
	});
	
	// ==================================================================
	// =                              Table                             =
	// ==================================================================
	{
		var Column = __webpack_require__(20).Column;
	
		var englishHead = _react2.default.createElement(
			'span',
			{ className: 'label label-primary' },
			'English'
		);
		var Cell = function Cell(_ref) {
			var value = _ref.value;
			return _react2.default.createElement(
				'span',
				{ className: 'text-danger' },
				value
			);
		};
	
		Cell.propTypes = {
			value: _react.PropTypes.node
		};
	
		var sampleList = [];
		for (var i = 0; i < 99; i += 1) {
			sampleList.push({
				name: 'Sample_' + i,
				math: Math.floor(Math.random() * 100),
				english: Math.floor(Math.random() * 100)
			});
		}
	
		list.push({
			name: 'SortTable',
			class: components.SortTable,
			preview: {
				sort: 'name',
				size: 5,
				range: 5,
				onRowClick: function onRowClick(event, item, index) {
					console.log('Row click:', event, item, index);
				},
				className: 'table table-bordered',
				children: [_react2.default.createElement(Column, { key: 0, field: 'name', sortPath: 'name', cell: Cell }), _react2.default.createElement(Column, {
					key: 1, field: 'math', sortPath: 'math',
					render: function render(_ref2) {
						var value = _ref2.value;
						return _react2.default.createElement(
							'span',
							{ className: 'text-warning' },
							value
						);
					}
				}), _react2.default.createElement(Column, { key: 2, field: 'english', head: englishHead, contentWidth: '80' })],
				list: sampleList
			},
			props: {
				list: '[array] Set table list',
				size: '[number] Set row count in one page',
				range: '[number] Set max display page count in page navigation',
				onRowClick: '[function] Row click handler. args(event, item)',
				sort: '[string | array | object] Default sort',
				'sort.path': '[string | array] Sort path',
				'sort.asc': '[bool] Sort order ascending',
				children: '[SortTable.Column[]] Set the column data',
				'children.*.field': '[string | array] Set display field',
				'children.*.head': '[*] Set head content',
				'children.*.th': '[bool] Display as <th>',
				'children.*.sortPath': '[string | array] Set column sort path',
				'children.*.className': '[string] th/td class name',
				'children.*.styleName': '[string] th/td style name (css modules)',
				'children.*.cell': '[string | Component] Set cell content',
				'children.*.render': '[function] Render function',
				'children.*.width': '[string | number] Set column width',
				'children.*.contentWidth': '[string | number] Set column content width. It will prevent table auto collapse'
			}
		});
	}
	
	// ==================================================================
	// =                           Pagination                           =
	// ==================================================================
	list.push({
		name: 'Pagination',
		class: components.Pagination,
		preview: {
			count: 233,
			size: 5,
			range: 5,
			disabled: true
		},
		props: {
			gotoPage: '[function] Handle page switch. args: (page)',
			count: '[number] Total item count',
			size: '[number] Set row count in one page',
			range: '[number] Set max display page count in page navigation',
			page: '[number] Current page number',
			disabled: '[bool] Disable interactive'
		}
	});
	
	// ==================================================================
	// =                             Tooltip                            =
	// ==================================================================
	list.push({
		name: 'Tooltip',
		class: components.Tooltip,
		preview: [{
			title: 'Top Tooltip!',
			// container: 'body',
			children: _react2.default.createElement(
				'span',
				{ id: 'tooltipSam' },
				'Hover Me!'
			)
		}, {
			inline: false,
			title: 'Right Tooltip!',
			placement: 'right',
			children: _react2.default.createElement('input', { type: 'text', className: 'form-control', readOnly: true, value: 'Some Text' })
		}, {
			title: 'Bottom Tooltip!',
			placement: 'bottom',
			children: _react2.default.createElement(
				'span',
				{ id: 'tooltipSam' },
				'Bottom'
			)
		}, {
			title: 'Left Tooltip!',
			placement: 'left',
			children: _react2.default.createElement(
				'span',
				{ id: 'tooltipSam' },
				'Left'
			)
		}],
		props: {
			title: '[string] Tooltip content',
			placement: '[string] Set tooltip display position: top | bottom | left | right | auto',
			inline: '[bool] Set `false` will display tooltip container as block element',
			children: '[element] (Only one) Set tooltip element'
		},
		description: 'Pure react tooltip component. Wrap element for display tooltip.' + ' (Pure css render)'
	});
	
	// ==================================================================
	// =                              Tree                              =
	// ==================================================================
	{
		var Item = function Item(_ref3) {
			var title = _ref3.title,
			    children = _ref3.children;
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'p',
					null,
					title
				),
				_react2.default.createElement(
					'div',
					{ style: { marginLeft: 10 } },
					children
				)
			);
		};
	
		Item.propTypes = {
			title: _react.PropTypes.string,
			children: _react.PropTypes.node
		};
	
		var TreeItem = components.withTree(Item, function (props) {
			return props.list;
		});
	
		list.push({
			name: 'Tree',
			class: TreeItem,
			preview: {
				title: 'Root',
				list: [{
					title: 'Lv2-1'
				}, {
					title: 'Lv2-2',
					list: [{
						title: 'Lv3-2',
						list: [{
							title: 'Lv4-1'
						}, {
							title: 'Lv4-2'
						}]
					}, {
						title: 'Lv3-3'
					}]
				}]
			},
			props: {
				withTree: '(Component, getList)',
				Component: '[Component] Set tree item component. Render should contain { children } for sub item display.',
				getList: '[function] Provide tree to get sub-list. It will pass current component props as argument.'
			},
			description: 'Link `Component` with tree structure. By call `withTree` function.'
		});
	}
	
	// ==================================================================
	// =                            CheckBox                            =
	// ==================================================================
	{
		var previewProps = {
			checked: true,
			onClick: function onClick() {
				previewProps.checked = !previewProps.checked;
			}
		};
	
		list.push({
			name: 'Checkbox',
			class: components.Checkbox,
			preview: previewProps,
			props: {
				checked: '[bool] Set check status.'
			},
			description: 'Same as `<input type="checkbox">`. But will pass props with `onClick` (event, props).'
		});
	}
	
	// ==================================================================
	// =                              Box                               =
	// ==================================================================
	list.push({
		name: 'Box',
		class: components.Box,
		preview: {
			title: 'Box',
			children: 'Box Content...',
			footer: 'Box Footer',
			type: 'success',
			toolBar: _react2.default.createElement(
				'div',
				{ className: 'form-group' },
				_react2.default.createElement('button', { className: 'fa fa-times' })
			)
		},
		previewStyle: {
			background: '#ecf0f5'
		},
		props: {
			type: '[string] Set box type: primary | success | danger | warning | default',
			title: '[node] Set title',
			children: '[node] Set box content',
			footer: '[node | Box.Footer] Set box footer content',
			loading: '[bool] Display loading tip',
			toolBar: '[node] Set top-right tool bar content'
		}
	});
	
	// ==================================================================
	// =                             Dialog                             =
	// ==================================================================
	{
		var Dialog = components.Dialog;
	
		var DialogContainer = function (_React$Component) {
			_inherits(DialogContainer, _React$Component);
	
			function DialogContainer() {
				var _ref4;
	
				var _temp, _this, _ret;
	
				_classCallCheck(this, DialogContainer);
	
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref4 = DialogContainer.__proto__ || Object.getPrototypeOf(DialogContainer)).call.apply(_ref4, [this].concat(args))), _this), _this.showDialog = function () {
					_this.dialog.show({
						title: 'title',
						content: _react2.default.createElement(
							'h2',
							null,
							'Hi, Content!'
						),
						size: 'large',
						confirm: true,
						onHide: function onHide(dialog, result) {
							if (result) {
								_this.dialog.show({
									content: function content() {
										return 'Will close 1 second delay.';
									},
									onHide: function onHide() {
										var promise = new Promise(function (resolve) {
											setTimeout(resolve, 1000);
										});
										return promise;
									},
									onHidden: function onHidden(dlg) {
										console.log('Hidden:', dlg);
									}
								});
								return false;
							}
							return true;
						}
					});
				}, _this.showDialog2 = function () {
					_this.dialog2.show({
						title: 'Normal Size',
						content: 'Will popup another dialog when this dialog close',
						onHide: function onHide() {
							return new Promise(function (resolve) {
								setTimeout(resolve, 200);
							}).then(function () {
								_this.dialog2.show({
									title: 'Yo!'
								});
							});
						}
					});
				}, _temp), _possibleConstructorReturn(_this, _ret);
			}
	
			_createClass(DialogContainer, [{
				key: 'render',
				value: function render() {
					var _this2 = this;
	
					return _react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'p',
							null,
							_react2.default.createElement(
								'a',
								{ href: 'javascript:;', onClick: this.showDialog },
								'Show Dialog'
							)
						),
						_react2.default.createElement(
							'p',
							null,
							_react2.default.createElement(
								'a',
								{ href: 'javascript:;', onClick: this.showDialog2 },
								'Show Dialog2'
							)
						),
						_react2.default.createElement(Dialog, {
							ref: function ref(dialog) {
								_this2.dialog = dialog;
							}
						}),
						_react2.default.createElement(Dialog, {
							ref: function ref(dialog) {
								_this2.dialog2 = dialog;
							}
						})
					);
				}
			}]);
	
			return DialogContainer;
		}(_react2.default.Component);
	
		list.push({
			name: 'Dialog',
			class: DialogContainer,
			preview: {},
			props: {
				title: '[node] Dialog title',
				content: '[node] Dialog content',
				footer: '[node] Dialog content',
				size: '[string] Set dialog size: `small`, `middle`(default), `large`',
				confirm: '[confirm] Display with confirm button',
	
				onShow: '[func] This event fires immediately when the show instance method is called',
				onShown: '[func] This event is fired when the modal has been made visible to the user (will wait for CSS transitions to complete)',
				onHide: '[func] Check the hide event. Return false will prevent dialog close. Return `Promise` will wait for promise finished',
				onHidden: '[func] Trigger after dialog close',
	
				show: '[func] Dialog instance function. Display dialog.',
				hide: '[func] Dialog instance function. Close dialog. Pass argument `true` will force close without trigger `onHide` event'
			},
			description: 'Dialog container. Use `ref` of this component call `show` to create dialog.'
		});
	}
	
	// ==================================================================
	// =                            Loading                             =
	// ==================================================================
	list.push({
		name: 'LoadingBar',
		class: components.LoadingBar,
		preview: {
			type: 'success'
		},
		props: {
			type: '[string] Set box type: primary (default) | success | danger | warning',
			hide: '[bool] true will hide the loading bar'
		}
	});
	
	list.push({
		name: 'LoadingIcon',
		class: components.LoadingIcon,
		preview: {
			icon: 'cog'
		},
		props: {
			icon: '[string] Set the loading icon by FontAwesome. Default: refresh',
			hide: '[bool] true will hide the loading icon'
		}
	});
	
	// ==================================================================
	// =                            TypeAhead                           =
	// ==================================================================
	{
		var queryList = [{ item: 'ABC(123)', value: '123' }, { item: 'DEF(456)', value: '456' }, { item: 'GHI(789)', value: '789' }];
		var TypeAhead = components.withTypeAhead(function (props) {
			return _react2.default.createElement('input', _extends({ type: 'text' }, props));
		}, function (query) {
			return new Promise(function (resolve) {
				var qry = (query || '').toUpperCase().trim();
				if (!qry) resolve([]);
				setTimeout(function () {
					resolve(queryList.filter(function (obj) {
						return obj.item.toUpperCase().indexOf(qry) >= 0;
					}));
				}, 500);
			});
		});
	
		var Container = function (_React$Component2) {
			_inherits(Container, _React$Component2);
	
			_createClass(Container, null, [{
				key: 'onSelectValue',
				value: function onSelectValue(value) {
					console.log('Select value:', value);
				}
			}]);
	
			function Container() {
				_classCallCheck(this, Container);
	
				var _this3 = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this));
	
				_this3.state = {
					value: ''
				};
				_this3.onChange = _this3.onChange.bind(_this3);
				return _this3;
			}
	
			_createClass(Container, [{
				key: 'onChange',
				value: function onChange(event) {
					this.setState({ value: event.target.value });
				}
			}, {
				key: 'render',
				value: function render() {
					var value = this.state.value;
	
	
					return _react2.default.createElement(
						'div',
						{ className: 'input-group' },
						_react2.default.createElement(TypeAhead, {
							className: 'form-control', placeholder: 'User NT login...', value: value,
							onChange: this.onChange, onSelectValue: Container.onSelectValue
						}),
						_react2.default.createElement(
							'span',
							{ className: 'input-group-btn' },
							_react2.default.createElement(
								'button',
								{ className: 'btn btn-default' },
								'Add'
							)
						)
					);
				}
			}]);
	
			return Container;
		}(_react2.default.Component);
	
		list.push({
			name: 'TypeAhead',
			class: Container,
			preview: {},
			props: {
				withTypeAhead: '(Component, queryFunc)',
				'- Component': '[Component] Set need type ahead component.',
				'- queryFunc': '[function | array] Accept the `value` of Component. Return `Promise` or array list. Or you can pass as `props`',
				'queryFunc[result]': '[String | Object] accept display content. Format: { value[string], description[string]: display in list, item[node]: display component in list }',
				onSelectValue: '[function] When select value, will call this function. With argument: `value`'
			},
			description: 'Link `Component` with type ahead. By call `withTypeAhead` function.'
		});
	}
	
	// ==================================================================
	// =                         TypeAheadInput                         =
	// ==================================================================
	{
		var _queryList = ['12345', '67890', 'abcde', 'fghij', 'klmno', 'pqrst', { description: 'uvw(xyz)', value: '233' }];
	
		var _Container = function (_React$Component3) {
			_inherits(_Container, _React$Component3);
	
			function _Container() {
				_classCallCheck(this, _Container);
	
				var _this4 = _possibleConstructorReturn(this, (_Container.__proto__ || Object.getPrototypeOf(_Container)).call(this));
	
				_this4.onChange = function (event) {
					_this4.setState({ value: event.target.value });
				};
	
				_this4.state = {
					value: ''
				};
				return _this4;
			}
	
			_createClass(_Container, [{
				key: 'render',
				value: function render() {
					var value = this.state.value;
	
	
					return _react2.default.createElement(components.TypeAheadInput, {
						value: value, queryFunc: _queryList, onChange: this.onChange
					});
				}
			}]);
	
			return _Container;
		}(_react2.default.Component);
	
		list.push({
			name: 'TypeAheadInput',
			class: _Container,
			preview: {},
			props: {
				queryFunc: '[function | array] Accept the `value` of Component. Return `Promise` or array list. Or you can pass as `props`',
				'queryFunc[result]': '[String | Object] accept display content. Format: { value[string], description[string]: display in list, item[node]: display component in list }',
				onSelectValue: '[function] When select value, will call this function. With argument: `value`'
			},
			description: 'Text input with type ahead:\n``` javascript\n<TypeAheadInput value={value} queryFunc={queryList} onChange={this.onChange} />\n```\n'
		});
	}
	
	// ==================================================================
	// =                       TypeAheadInputGroup                      =
	// ==================================================================
	{
		var _queryList2 = ['12345', '67890', 'abcde', 'fghij', 'klmno', 'pqrst', { description: 'uvw(xyz)', value: '233' }];
	
		var _Container2 = function (_React$Component4) {
			_inherits(_Container2, _React$Component4);
	
			function _Container2() {
				_classCallCheck(this, _Container2);
	
				var _this5 = _possibleConstructorReturn(this, (_Container2.__proto__ || Object.getPrototypeOf(_Container2)).call(this));
	
				_this5.onChange = function (event) {
					console.log('=>', event);
					_this5.setState({ value: event.target.value });
				};
	
				_this5.state = {
					value: '',
					selectedValue: ''
				};
				return _this5;
			}
	
			_createClass(_Container2, [{
				key: 'render',
				value: function render() {
					var _this6 = this;
	
					var _state = this.state,
					    value = _state.value,
					    selectedValue = _state.selectedValue;
	
	
					return _react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'p',
							null,
							'Select Value: ',
							selectedValue
						),
						_react2.default.createElement(components.TypeAheadInputGroup, {
							value: value, queryFunc: _queryList2, onChange: this.onChange,
							onSelectValue: function onSelectValue(val) {
								_this6.setState({ selectedValue: val });
							}
						})
					);
				}
			}]);
	
			return _Container2;
		}(_react2.default.Component);
	
		list.push({
			name: 'TypeAheadInputGroup',
			class: _Container2,
			preview: {},
			props: {
				type: '[string] Set button type: primary, warning, danger, info, default',
				text: '[string] Set button text.'
			},
			description: 'Like `TypeAheadInput` but provide additional confirm button. See follow other props'
		});
	}
	
	// ==================================================================
	// =                            StateForm                           =
	// ==================================================================
	{
		var groupValueList = ['group value1', { description: 'group value2: { description, value }', value: 'group check2' }];
	
		var FormContainer = function (_React$Component5) {
			_inherits(FormContainer, _React$Component5);
	
			function FormContainer() {
				_classCallCheck(this, FormContainer);
	
				var _this7 = _possibleConstructorReturn(this, (FormContainer.__proto__ || Object.getPrototypeOf(FormContainer)).call(this));
	
				_this7.onChange = function (event) {
					console.log('Form Change:', event.target.value);
				};
	
				_this7.triggerLock = function () {
					_this7.setState(function (preState) {
						return { lock: !preState.lock };
					});
				};
	
				_this7.triggerInline = function () {
					_this7.setState(function (preState) {
						return { inline: !preState.inline };
					});
				};
	
				_this7.state = {
					form: {
						name: '',
						pass: '',
						singleCheck: false,
						groupCheck: [],
						radio: '',
						customize2: ['with init value'],
						select: '',
						textarea: ''
					},
					lock: false,
					inline: false
				};
				return _this7;
			}
	
			_createClass(FormContainer, [{
				key: 'render',
				value: function render() {
					var _this8 = this;
	
					var _state2 = this.state,
					    lock = _state2.lock,
					    inline = _state2.inline,
					    pass = _state2.form.pass;
	
	
					return _react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							components.StateForm,
							{
								instance: this, path: 'form', onChange: this.onChange,
								disabled: lock
							},
							_react2.default.createElement(
								'div',
								{ className: 'row' },
								_react2.default.createElement(
									'div',
									{ className: 'col-md-6' },
									_react2.default.createElement(components.StateFormField, { name: 'name', description: 'Type your name here...' })
								),
								_react2.default.createElement(
									'div',
									{ className: 'col-md-6' },
									_react2.default.createElement(components.StateFormField, { name: 'pass', type: 'password', displayName: 'Password' })
								)
							),
							_react2.default.createElement(components.StateFormField, { name: ['number', 'only'], type: 'text', filter: function filter(value) {
									return value.replace(/[^0-9]*/g, '');
								} }),
							_react2.default.createElement(components.StateFormField, { name: 'singleCheck', type: 'bool' }),
							_react2.default.createElement(components.StateFormField, { name: 'groupCheck', type: 'bool', inline: inline, values: groupValueList }),
							_react2.default.createElement(components.StateFormField, { name: 'radio', type: 'radio', inline: inline, values: groupValueList }),
							_react2.default.createElement(components.StateFormField, { name: 'customize2', component: components.InlineList, displayName: '' }),
							_react2.default.createElement(components.StateFormField, { name: 'select', type: 'select', values: groupValueList }),
							_react2.default.createElement(components.StateFormField, { name: 'textarea', rows: '3' })
						),
						_react2.default.createElement(
							'div',
							null,
							_react2.default.createElement(
								components.Button,
								{ onClick: this.triggerLock },
								'Lock or not'
							),
							' ',
							_react2.default.createElement(
								components.Button,
								{ onClick: this.triggerInline },
								'Inline or not'
							),
							' ',
							_react2.default.createElement(
								components.Button,
								{
									onClick: function onClick() {
										_this8.setState({
											form: {
												name: 'my name',
												customize2: ['111', '222', '333']
											}
										});
									}
								},
								'Set Form Value'
							),
							' ',
							pass || '-'
						)
					);
				}
			}]);
	
			return FormContainer;
		}(_react2.default.Component);
	
		list.push({
			name: 'StateForm',
			class: FormContainer,
			preview: {},
			props: {
				instance: '[object] Set component instance. Normally: this',
				path: '[string|array] path of instance state',
				onChange: '[function] Form change function',
				disabled: '[bool] True will pass disabled props to all the `Field`',
				forceRefresh: '[bool] Force form refresh whatever parent element exist or not.',
				className: '[string] Set container class',
				children: '[Form.Field[]] Set the field data',
				'children.*.name': '[string|array] Bind key name / path',
				'children.*.displayName': '[string] Field display name. None will follow the `name`. Set to "" will hide label.',
				'children.*.description': '[string] Description. Some component like `Text Input` will display in placeholder',
				'children.*.type': '[string] Field type: (default)text, textarea | blob, password, bool | checkbox, radio, select',
				'children.*.inline': '[bool] Let element display inline. Only support `checkbox` & `radio`',
				'children.*.component': '[Component] Set customize component. Will ignore `type` prop',
				'children.*.values': '[array] Provide the value list. Support string or object({ description, value }). Used for: radio, checkbox, select',
				'children.*.rows': '[number|string] When set rows, will display as textarea',
				'children.*.filter': '[function] Value update filter. Will not modify value with `onChange` event'
			},
			description: 'An easy way for two-way binding. This form will help for data bind with `state`.\nFor example, bind the data in the `this.state.form`:\n```javascript\n<StateForm instance={this} path="form">\n\t<div className="row">\n\t\t<div className="col-md-6">\n\t\t\t<StateFormField name="name" description="Type your name here..." />\n\t\t</div>\n\t\t<div className="col-md-6">\n\t\t\t<StateFormField name="pass" type="password" displayName="Password" />\n\t\t</div>\n\t</div>\n</StateForm>\n```\n'
		});
	}
	
	// ==================================================================
	// =                              Form                              =
	// ==================================================================
	{
		var sampleValues = ['type1', 'type2', {
			value: 'type3',
			description: 'Object value: [value, description]'
		}];
	
		var CustomComponent = function CustomComponent(_ref5) {
			var value = _ref5.value,
			    onChange = _ref5.onChange;
	
			var desc = value ? 'Yes' : 'No';
			return _react2.default.createElement(
				components.Button,
				{
					className: 'btn btn-success btn-sm', style: { display: 'block' },
					onClick: function onClick() {
						if (onChange) {
							onChange({
								target: {
									value: !value
								}
							});
						}
					}
				},
				desc
			);
		};
		CustomComponent.propTypes = {
			value: _react.PropTypes.bool,
			onChange: _react.PropTypes.func
		};
	
		var _FormContainer = function (_React$Component6) {
			_inherits(_FormContainer, _React$Component6);
	
			function _FormContainer() {
				_classCallCheck(this, _FormContainer);
	
				var _this9 = _possibleConstructorReturn(this, (_FormContainer.__proto__ || Object.getPrototypeOf(_FormContainer)).call(this));
	
				_this9.state = {
					disabled: false,
					form: {
						username: 'default Value',
						customize2: ['with init value']
					}
				};
				return _this9;
			}
	
			_createClass(_FormContainer, [{
				key: 'render',
				value: function render() {
					var _this10 = this;
	
					var _state3 = this.state,
					    disabled = _state3.disabled,
					    password = _state3.form.password;
	
	
					return _react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							components.Form,
							{ instance: this.state.form, disabled: disabled },
							_react2.default.createElement(
								'h1',
								null,
								'Demo of Form'
							),
							_react2.default.createElement(
								'div',
								{ className: 'row' },
								_react2.default.createElement(
									'div',
									{ className: 'col-sm-6' },
									_react2.default.createElement(components.Field, { name: 'username' })
								),
								_react2.default.createElement(
									'div',
									{ className: 'col-sm-6' },
									_react2.default.createElement(components.Field, { name: 'password', type: 'password' })
								)
							),
							_react2.default.createElement(components.Field, {
								name: ['deep', 'test'], displayName: 'Number only',
								filter: function filter(value) {
									return value.replace(/[^0-9]*/g, '');
								}
							}),
							_react2.default.createElement(components.Field, { name: 'remember', displayName: 'Remember Me', type: 'bool' }),
							_react2.default.createElement(components.Field, { name: 'radioType', type: 'radio', values: sampleValues, inline: true }),
							_react2.default.createElement(components.Field, { name: 'checkType', type: 'checkbox', values: sampleValues }),
							_react2.default.createElement(components.Field, { name: 'select', values: sampleValues }),
							_react2.default.createElement(components.Field, { name: 'textarea', rows: '3' }),
							_react2.default.createElement(components.Field, { name: 'customize1', component: CustomComponent }),
							_react2.default.createElement(components.Field, { name: 'customize2', component: components.InlineList, displayName: '' }),
							_react2.default.createElement(
								components.Button,
								{ className: 'hide' },
								'Test'
							),
							_react2.default.createElement('hr', null)
						),
						_react2.default.createElement(
							components.Button,
							{
								onClick: function onClick() {
									console.log(_this10.state.form);
								}
							},
							'Print Form in console'
						),
						' ',
						_react2.default.createElement(
							components.Button,
							{
								onClick: function onClick() {
									_this10.setState({
										form: {
											username: 'my name',
											customize2: ['111', '222', '333']
										}
									});
								}
							},
							'Set Form Value'
						),
						' ',
						_react2.default.createElement(
							components.Button,
							{
								onClick: function onClick() {
									_this10.setState({ disabled: !_this10.state.disabled });
								}
							},
							'Lock/Unlock'
						),
						_react2.default.createElement(
							'span',
							null,
							'Password: ',
							password || '-'
						)
					);
				}
			}]);
	
			return _FormContainer;
		}(_react2.default.Component);
	
		list.push({
			name: 'Form',
			deprecated: true,
			class: _FormContainer,
			preview: {},
			props: {
				instance: '[object] Set form auto fill data object. When input update, the `instance` will be auto updated.',
				onChange: '[function | false] Form change function. `false` will prevent form auto update.',
				disabled: '[bool] True will pass disabled props to all the `Field`',
				forceRefresh: '[bool] Force form refresh whatever parent element exist or not.',
				children: '[Form.Field[]] Set the field data',
				'children.*.name': '[string|array] Bind key name / path',
				'children.*.displayName': '[string] Field display name. None will follow the `name`. Set to "" will hide label.',
				'children.*.description': '[string] Description. Some component like `Text Input` will display in placeholder',
				'children.*.type': '[string] Field type: (default)text, textarea, password, bool | checkbox, radio, select',
				'children.*.inline': '[bool] Let element display inline. Only support `checkbox` & `radio`',
				'children.*.component': '[Component] Set customize component. Will ignore `type` prop',
				'children.*.values': '[array] Provide the value list. Support string or object({ description, value }). Used for: radio, checkbox, select',
				'children.*.rows': '[number|string] When set rows, will display as textarea',
				'children.*.filter': '[function] Value update filter. Will not modify value with `onChange` event'
			},
			description: 'Deprecated! Use `StateForm` instead.  \nForm group. This component help inner form state management. Support nest structure like:\n``` javascript\n<Form instance={this.state.form}>\n\t<div className="row">\n\t\t<div className="col-sm-6">\n\t\t\t<Field name="username" />\n\t\t</div>\n\t\t<div className="col-sm-6">\n\t\t\t<Field name="password" type="password" />\n\t\t</div>\n\t</div>\n</Form>\n```\n'
		});
	}
	
	// ==================================================================
	// =                           InlineList                           =
	// ==================================================================
	{
		var defaultValue = ['User1', 'User2', { value: 'User3', description: 'Object value: [value, readOnly, description, type]' }, { value: 'Read Only', readOnly: true }, { value: 'type: danger', type: 'danger' }];
	
		var InlineListContainer = function (_React$Component7) {
			_inherits(InlineListContainer, _React$Component7);
	
			function InlineListContainer() {
				_classCallCheck(this, InlineListContainer);
	
				var _this11 = _possibleConstructorReturn(this, (InlineListContainer.__proto__ || Object.getPrototypeOf(InlineListContainer)).call(this));
	
				_this11.triggerReadOnly = function () {
					_this11.setState({
						readOnly: !_this11.state.readOnly
					});
					console.log('trigger', _this11.state);
				};
	
				_this11.state = {
					values: defaultValue,
					lock: false,
					readOnly: false
				};
				_this11.onChange = _this11.onChange.bind(_this11);
				_this11.reset = _this11.reset.bind(_this11);
				_this11.triggerLock = _this11.triggerLock.bind(_this11);
				_this11.clearAll = _this11.clearAll.bind(_this11);
				return _this11;
			}
	
			_createClass(InlineListContainer, [{
				key: 'onChange',
				value: function onChange(event) {
					this.setState({ values: event.target.value });
				}
			}, {
				key: 'reset',
				value: function reset() {
					this.setState({
						values: defaultValue
					});
				}
			}, {
				key: 'clearAll',
				value: function clearAll() {
					this.setState({
						values: []
					});
				}
			}, {
				key: 'triggerLock',
				value: function triggerLock() {
					this.setState({
						lock: !this.state.lock
					});
					console.log('trigger', this.state);
				}
			}, {
				key: 'render',
				value: function render() {
					var _state4 = this.state,
					    values = _state4.values,
					    lock = _state4.lock,
					    readOnly = _state4.readOnly;
	
	
					return _react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(components.InlineList, {
							value: values, onChange: this.onChange,
							disabled: lock, readOnly: readOnly
						}),
						_react2.default.createElement(
							'a',
							{ href: 'javascript:;', onClick: this.triggerLock },
							'Lock or not'
						),
						' | ',
						_react2.default.createElement(
							'a',
							{ href: 'javascript:;', onClick: this.triggerReadOnly },
							'ReadOnly or not'
						),
						' | ',
						_react2.default.createElement(
							'a',
							{ href: 'javascript:;', onClick: this.reset },
							'Reset Value'
						),
						' | ',
						_react2.default.createElement(
							'a',
							{ href: 'javascript:;', onClick: this.clearAll },
							'Clear All'
						)
					);
				}
			}]);
	
			return InlineListContainer;
		}(_react2.default.Component);
	
		list.push({
			name: 'InlineList',
			class: InlineListContainer,
			preview: {},
			props: {
				className: '[string] Set container class',
				onChange: '[func] Return change event object',
				onRemoveItem: '[func] Return removed item when remove triggered',
				onItemClick: '[func] Return click item',
				type: '[string] Set display type: primary, info, warning, danger',
				icon: '[string] Set button icon with `font awesome` class. Default: times',
				disabled: '[bool] True will prevent interactive',
				readOnly: '[bool] True will hide operation icon',
				value: '[(string|object)[]] Item value list',
				'value.*.value': '[string] value of item',
				'value.*.description': '[string] Display of item',
				'value.*.readOnly': '[bool] True will prevent interactive',
				'value.*.type': '[string] Set display type: primary, info, warning, danger'
			},
			description: 'Inline item list. Can used in `Form` as `Field` Component'
		});
	}
	
	// ==================================================================
	// =                            Collapse                            =
	// ==================================================================
	list.push({
		name: 'Collapse',
		class: components.Collapse,
		preview: {
			title: _react2.default.createElement(
				'a',
				null,
				'click me!'
			),
			children: _react2.default.createElement(
				'pre',
				null,
				'This is children content'
			),
			collapseContent: 'this is collapseContent'
		},
		props: {
			className: '[string] Set container class',
			passState: '[bool] true will pass collapse state to `title`',
			collapse: '[bool] Set default collapse state',
			title: '[node] Set title. Support element title',
			children: '[node] Set collapse content',
			collapseContent: '[node] Set collapse content when is collapsed'
		},
		description: 'Inline item list. Can used in `Form` as `Field` Component'
	});
	
	// ==================================================================
	// =                             Switch                             =
	// ==================================================================
	list.push({
		name: 'Switch',
		class: components.Condition,
		preview: [{
			is: true,
			children: _react2.default.createElement(
				'span',
				null,
				'Is!'
			)
		}, {
			children: [_react2.default.createElement(
				components.If,
				{ value: false },
				_react2.default.createElement(
					'span',
					null,
					'If'
				)
			), _react2.default.createElement(
				components.ElseIf,
				{ value: null },
				_react2.default.createElement(
					'span',
					null,
					'Else If'
				)
			), _react2.default.createElement(
				components.Else,
				null,
				_react2.default.createElement(
					'span',
					null,
					'Else'
				)
			)]
		}, {
			value: 'case3',
			children: [_react2.default.createElement(
				components.Case,
				{ value: 'case1' },
				_react2.default.createElement(
					'span',
					null,
					'case 1'
				)
			), _react2.default.createElement(
				components.Case,
				{ value: 'case2' },
				_react2.default.createElement(
					'span',
					null,
					'case 2'
				)
			), _react2.default.createElement(
				components.Default,
				null,
				_react2.default.createElement(
					'span',
					null,
					'case default'
				)
			)]
		}],
		description: 'Shortcut for component render wrapper. e.g.\n```javasctipt\n<Condition is={TrueOrFalse}>\n\t// Only support Element or Component. String, number, bool is not allowed\n</Condition>\nor\n<Condition>\n\t<If value={TrueOrFalse}>{Element / Component}</If>\n\t<ElseIf value={TrueOrFalse}>{Element / Component}</ElseIf>\n\t<Else>{Element / Component}</ElseIf>\n</Condition>\nor\n<Condition value="case1">\n\t<Case value="case1">{Element / Component}</Case>\n\t<Case value="case2">{Element / Component}</Case>\n\t<Default>{Element / Component}</Default>\n</Condition>\n```\n'
	});
	
	var _default = list;
	exports.default = _default;
	;
	
	var _temp2 = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(list, 'list', 'C:/MyGit/BDPComponent/src/list.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/src/list.js');
	}();

	;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.defaultState = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _app = __webpack_require__(23);
	
	var defaultState = exports.defaultState = {
		filter: ''
	};
	
	var _default = function _default() {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
		var action = arguments[1];
	
		switch (action.type) {
			case _app.APP_UPDATE_FILTER:
				return _extends({}, state, { filter: action.filter });
		}
		return state;
	};
	
	exports.default = _default;
	;
	
	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(defaultState, 'defaultState', 'C:/MyGit/BDPComponent/src/reducers/app.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/src/reducers/app.js');
	}();

	;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _redux = __webpack_require__(36);
	
	var _app = __webpack_require__(62);
	
	var _app2 = _interopRequireDefault(_app);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _default = (0, _redux.combineReducers)({
		app: _app2.default
	});
	
	exports.default = _default;
	;

	var _temp = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}

		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/src/reducers/index.js');
	}();

	;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _class, _temp2, _initialiseProps;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(14);
	
	var _reactCssModules = __webpack_require__(31);
	
	var _reactCssModules2 = _interopRequireDefault(_reactCssModules);
	
	var _list = __webpack_require__(61);
	
	var _list2 = _interopRequireDefault(_list);
	
	var _app = __webpack_require__(23);
	
	var _index = __webpack_require__(72);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Remarkable = __webpack_require__(111);
	
	var md = new Remarkable();
	
	function getDescription(text) {
		return md.render(text || '`N/A`');
	}
	
	var Home = (_temp2 = _class = function (_React$Component) {
		_inherits(Home, _React$Component);
	
		function Home() {
			var _ref;
	
			var _temp, _this, _ret;
	
			_classCallCheck(this, Home);
	
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}
	
			return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Home.__proto__ || Object.getPrototypeOf(Home)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
		}
	
		_createClass(Home, [{
			key: 'render',
			value: function render() {
				var _this2 = this;
	
				var filter = this.props.filter;
	
				var componentList = this.getList();
	
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'section',
						{ className: 'content-header' },
						_react2.default.createElement(
							'h1',
							null,
							'Components'
						)
					),
					_react2.default.createElement(
						'section',
						{ className: 'content' },
						_react2.default.createElement(
							'div',
							{ className: 'box box-primary' },
							_react2.default.createElement(
								'div',
								{ className: 'box-header with-border' },
								_react2.default.createElement(
									'h3',
									{ className: 'box-title' },
									'Component'
								),
								_react2.default.createElement(
									'div',
									{ className: 'box-tools pull-right' },
									_react2.default.createElement('input', {
										type: 'text', className: 'form-control', placeholder: 'filter...',
										onChange: this.onFilter, value: filter
									})
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'box-body' },
								componentList.map(function (component, index) {
									var Component = component.class;
									var name = component.name,
									    description = component.description,
									    preview = component.preview,
									    previewStyle = component.previewStyle,
									    props = component.props,
									    deprecated = component.deprecated;
	
									var propsList = Array.isArray(preview) ? preview : [preview];
									var $description = void 0;
									var $props = void 0;
	
									if (description) {
										$description = _react2.default.createElement(
											'div',
											null,
											_react2.default.createElement(
												'h5',
												null,
												'Description'
											),
											_react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: getDescription(description) } })
										);
									}
	
									if (props) {
										$props = _react2.default.createElement(
											'div',
											null,
											_react2.default.createElement(
												'h5',
												null,
												'Properties'
											),
											_react2.default.createElement(
												'ul',
												null,
												Object.keys(props).map(function (key) {
													return _react2.default.createElement(
														'li',
														{ key: key },
														_react2.default.createElement(
															'strong',
															{ className: 'text-primary' },
															key,
															': '
														),
														props[key]
													);
												})
											)
										);
									}
	
									return _react2.default.createElement(
										'div',
										{ styleName: 'component', key: name || index },
										_react2.default.createElement(
											'div',
											{ className: 'row' },
											_react2.default.createElement(
												'div',
												{ className: 'col-md-4' },
												_react2.default.createElement(
													'h5',
													null,
													'Preview'
												),
												_react2.default.createElement(
													'div',
													{ styleName: 'preview', style: previewStyle },
													propsList.map(function (_ref2, itemIndex) {
														var _onClick = _ref2.onClick,
														    _onChange = _ref2.onChange,
														    itemProps = _objectWithoutProperties(_ref2, ['onClick', 'onChange']);
	
														return _react2.default.createElement(
															'div',
															{ styleName: 'preview-item', className: 'clearfix', key: itemIndex },
															_react2.default.createElement(Component, _extends({
																onClick: function onClick() {
																	for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
																		args[_key2] = arguments[_key2];
																	}
	
																	if (_onClick) _this2.refresh.apply(_this2, [_onClick].concat(args));
																},
																onChange: function onChange() {
																	for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
																		args[_key3] = arguments[_key3];
																	}
	
																	if (_onChange) _this2.refresh.apply(_this2, [_onChange].concat(args));
																}
															}, itemProps))
														);
													})
												)
											),
											_react2.default.createElement(
												'div',
												{ className: 'col-md-8' },
												_react2.default.createElement(
													'h1',
													null,
													_react2.default.createElement('span', { className: 'fa fa-cubes' }),
													name,
													deprecated && _react2.default.createElement(
														'span',
														{ className: 'label label-default' },
														'Deprecated'
													)
												),
												$description,
												$props
											)
										)
									);
								})
							)
						)
					)
				);
			}
		}]);
	
		return Home;
	}(_react2.default.Component), _initialiseProps = function _initialiseProps() {
		var _this3 = this;
	
		this.onFilter = function (e) {
			var dispatch = _this3.props.dispatch;
	
			var filter = (e.target.value || '').trim();
			dispatch((0, _app.updateFilter)(filter));
		};
	
		this.getList = function () {
			var filter = _this3.props.filter;
	
			var UFilter = filter.toUpperCase();
			return UFilter ? _list2.default.filter(function (_ref3) {
				var name = _ref3.name;
				return (name || '').toUpperCase().indexOf(UFilter) >= 0;
			}) : _list2.default;
		};
	
		this.refresh = function (func) {
			for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
				args[_key4 - 1] = arguments[_key4];
			}
	
			_this3.forceUpdate();
			if (func) func.apply(undefined, args);
		};
	}, _temp2);
	
	
	Home.propTypes = {
		filter: _react.PropTypes.string,
		dispatch: _react.PropTypes.func
	};
	
	var mapState = function mapState(_ref4) {
		var filter = _ref4.app.filter;
		return {
			filter: filter
		};
	};
	
	var _default = (0, _reactRedux.connect)(mapState)((0, _reactCssModules2.default)(Home, _index2.default));
	
	exports.default = _default;
	;
	
	var _temp3 = function () {
		if (typeof __REACT_HOT_LOADER__ === 'undefined') {
			return;
		}
	
		__REACT_HOT_LOADER__.register(md, 'md', 'C:/MyGit/BDPComponent/src/views/Home/index.js');
	
		__REACT_HOT_LOADER__.register(getDescription, 'getDescription', 'C:/MyGit/BDPComponent/src/views/Home/index.js');
	
		__REACT_HOT_LOADER__.register(Home, 'Home', 'C:/MyGit/BDPComponent/src/views/Home/index.js');
	
		__REACT_HOT_LOADER__.register(mapState, 'mapState', 'C:/MyGit/BDPComponent/src/views/Home/index.js');
	
		__REACT_HOT_LOADER__.register(_default, 'default', 'C:/MyGit/BDPComponent/src/views/Home/index.js');
	}();

	;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
	    'use strict';
	    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.
	
	    /* istanbul ignore next */
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(162)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        module.exports = factory(require('stackframe'));
	    } else {
	        root.ErrorStackParser = factory(root.StackFrame);
	    }
	}(this, function ErrorStackParser(StackFrame) {
	    'use strict';
	
	    var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+\:\d+/;
	    var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+\:\d+|\(native\))/m;
	    var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code\])?$/;
	
	    function _map(array, fn, thisArg) {
	        if (typeof Array.prototype.map === 'function') {
	            return array.map(fn, thisArg);
	        } else {
	            var output = new Array(array.length);
	            for (var i = 0; i < array.length; i++) {
	                output[i] = fn.call(thisArg, array[i]);
	            }
	            return output;
	        }
	    }
	
	    function _filter(array, fn, thisArg) {
	        if (typeof Array.prototype.filter === 'function') {
	            return array.filter(fn, thisArg);
	        } else {
	            var output = [];
	            for (var i = 0; i < array.length; i++) {
	                if (fn.call(thisArg, array[i])) {
	                    output.push(array[i]);
	                }
	            }
	            return output;
	        }
	    }
	
	    function _indexOf(array, target) {
	        if (typeof Array.prototype.indexOf === 'function') {
	            return array.indexOf(target);
	        } else {
	            for (var i = 0; i < array.length; i++) {
	                if (array[i] === target) {
	                    return i;
	                }
	            }
	            return -1;
	        }
	    }
	
	    return {
	        /**
	         * Given an Error object, extract the most information from it.
	         *
	         * @param {Error} error object
	         * @return {Array} of StackFrames
	         */
	        parse: function ErrorStackParser$$parse(error) {
	            if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined') {
	                return this.parseOpera(error);
	            } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
	                return this.parseV8OrIE(error);
	            } else if (error.stack) {
	                return this.parseFFOrSafari(error);
	            } else {
	                throw new Error('Cannot parse given Error object');
	            }
	        },
	
	        // Separate line and column numbers from a string of the form: (URI:Line:Column)
	        extractLocation: function ErrorStackParser$$extractLocation(urlLike) {
	            // Fail-fast but return locations like "(native)"
	            if (urlLike.indexOf(':') === -1) {
	                return [urlLike];
	            }
	
	            var regExp = /(.+?)(?:\:(\d+))?(?:\:(\d+))?$/;
	            var parts = regExp.exec(urlLike.replace(/[\(\)]/g, ''));
	            return [parts[1], parts[2] || undefined, parts[3] || undefined];
	        },
	
	        parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
	            var filtered = _filter(error.stack.split('\n'), function(line) {
	                return !!line.match(CHROME_IE_STACK_REGEXP);
	            }, this);
	
	            return _map(filtered, function(line) {
	                if (line.indexOf('(eval ') > -1) {
	                    // Throw away eval information until we implement stacktrace.js/stackframe#8
	                    line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^\()]*)|(\)\,.*$)/g, '');
	                }
	                var tokens = line.replace(/^\s+/, '').replace(/\(eval code/g, '(').split(/\s+/).slice(1);
	                var locationParts = this.extractLocation(tokens.pop());
	                var functionName = tokens.join(' ') || undefined;
	                var fileName = _indexOf(['eval', '<anonymous>'], locationParts[0]) > -1 ? undefined : locationParts[0];
	
	                return new StackFrame(functionName, undefined, fileName, locationParts[1], locationParts[2], line);
	            }, this);
	        },
	
	        parseFFOrSafari: function ErrorStackParser$$parseFFOrSafari(error) {
	            var filtered = _filter(error.stack.split('\n'), function(line) {
	                return !line.match(SAFARI_NATIVE_CODE_REGEXP);
	            }, this);
	
	            return _map(filtered, function(line) {
	                // Throw away eval information until we implement stacktrace.js/stackframe#8
	                if (line.indexOf(' > eval') > -1) {
	                    line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g, ':$1');
	                }
	
	                if (line.indexOf('@') === -1 && line.indexOf(':') === -1) {
	                    // Safari eval frames only have function names and nothing else
	                    return new StackFrame(line);
	                } else {
	                    var tokens = line.split('@');
	                    var locationParts = this.extractLocation(tokens.pop());
	                    var functionName = tokens.join('@') || undefined;
	                    return new StackFrame(functionName,
	                        undefined,
	                        locationParts[0],
	                        locationParts[1],
	                        locationParts[2],
	                        line);
	                }
	            }, this);
	        },
	
	        parseOpera: function ErrorStackParser$$parseOpera(e) {
	            if (!e.stacktrace || (e.message.indexOf('\n') > -1 &&
	                e.message.split('\n').length > e.stacktrace.split('\n').length)) {
	                return this.parseOpera9(e);
	            } else if (!e.stack) {
	                return this.parseOpera10(e);
	            } else {
	                return this.parseOpera11(e);
	            }
	        },
	
	        parseOpera9: function ErrorStackParser$$parseOpera9(e) {
	            var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
	            var lines = e.message.split('\n');
	            var result = [];
	
	            for (var i = 2, len = lines.length; i < len; i += 2) {
	                var match = lineRE.exec(lines[i]);
	                if (match) {
	                    result.push(new StackFrame(undefined, undefined, match[2], match[1], undefined, lines[i]));
	                }
	            }
	
	            return result;
	        },
	
	        parseOpera10: function ErrorStackParser$$parseOpera10(e) {
	            var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
	            var lines = e.stacktrace.split('\n');
	            var result = [];
	
	            for (var i = 0, len = lines.length; i < len; i += 2) {
	                var match = lineRE.exec(lines[i]);
	                if (match) {
	                    result.push(
	                        new StackFrame(
	                            match[3] || undefined,
	                            undefined,
	                            match[2],
	                            match[1],
	                            undefined,
	                            lines[i]
	                        )
	                    );
	                }
	            }
	
	            return result;
	        },
	
	        // Opera 10.65+ Error.stack very similar to FF/Safari
	        parseOpera11: function ErrorStackParser$$parseOpera11(error) {
	            var filtered = _filter(error.stack.split('\n'), function(line) {
	                return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
	            }, this);
	
	            return _map(filtered, function(line) {
	                var tokens = line.split('@');
	                var locationParts = this.extractLocation(tokens.pop());
	                var functionCall = (tokens.shift() || '');
	                var functionName = functionCall
	                        .replace(/<anonymous function(: (\w+))?>/, '$2')
	                        .replace(/\([^\)]*\)/g, '') || undefined;
	                var argsRaw;
	                if (functionCall.match(/\(([^\)]*)\)/)) {
	                    argsRaw = functionCall.replace(/^[^\(]+\(([^\)]*)\)$/, '$1');
	                }
	                var args = (argsRaw === undefined || argsRaw === '[arguments not available]') ?
	                    undefined : argsRaw.split(',');
	                return new StackFrame(
	                    functionName,
	                    args,
	                    locationParts[0],
	                    locationParts[1],
	                    locationParts[2],
	                    line);
	            }, this);
	        }
	    };
	}));
	


/***/ },
/* 66 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 67 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 68 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 69 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 70 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 71 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"no-padding":"bdp_no-padding_BjM3E","box":"bdp_box_2WkfD","box-header":"bdp_box-header_265bu","box-tools":"bdp_box-tools_F2_zh"};

/***/ },
/* 72 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"component":"bdp_component_1_Krc","preview":"bdp_preview_vVc6O","preview-item":"bdp_preview-item_24hps"};

/***/ },
/* 73 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 74 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {if (typeof window !== "undefined") {
	    module.exports = window;
	} else if (typeof global !== "undefined") {
	    module.exports = global;
	} else if (typeof self !== "undefined"){
	    module.exports = self;
	} else {
	    module.exports = {};
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  XmlEntities: __webpack_require__(77),
	  Html4Entities: __webpack_require__(76),
	  Html5Entities: __webpack_require__(24),
	  AllHtmlEntities: __webpack_require__(24)
	};


/***/ },
/* 76 */
/***/ function(module, exports) {

	var HTML_ALPHA = ['apos', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'Aelig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'Oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'quot', 'amp', 'lt', 'gt', 'oelig', 'oelig', 'scaron', 'scaron', 'yuml', 'circ', 'tilde', 'ensp', 'emsp', 'thinsp', 'zwnj', 'zwj', 'lrm', 'rlm', 'ndash', 'mdash', 'lsquo', 'rsquo', 'sbquo', 'ldquo', 'rdquo', 'bdquo', 'dagger', 'dagger', 'permil', 'lsaquo', 'rsaquo', 'euro', 'fnof', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigmaf', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'thetasym', 'upsih', 'piv', 'bull', 'hellip', 'prime', 'prime', 'oline', 'frasl', 'weierp', 'image', 'real', 'trade', 'alefsym', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'crarr', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'forall', 'part', 'exist', 'empty', 'nabla', 'isin', 'notin', 'ni', 'prod', 'sum', 'minus', 'lowast', 'radic', 'prop', 'infin', 'ang', 'and', 'or', 'cap', 'cup', 'int', 'there4', 'sim', 'cong', 'asymp', 'ne', 'equiv', 'le', 'ge', 'sub', 'sup', 'nsub', 'sube', 'supe', 'oplus', 'otimes', 'perp', 'sdot', 'lceil', 'rceil', 'lfloor', 'rfloor', 'lang', 'rang', 'loz', 'spades', 'clubs', 'hearts', 'diams'];
	var HTML_CODES = [39, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 34, 38, 60, 62, 338, 339, 352, 353, 376, 710, 732, 8194, 8195, 8201, 8204, 8205, 8206, 8207, 8211, 8212, 8216, 8217, 8218, 8220, 8221, 8222, 8224, 8225, 8240, 8249, 8250, 8364, 402, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 977, 978, 982, 8226, 8230, 8242, 8243, 8254, 8260, 8472, 8465, 8476, 8482, 8501, 8592, 8593, 8594, 8595, 8596, 8629, 8656, 8657, 8658, 8659, 8660, 8704, 8706, 8707, 8709, 8711, 8712, 8713, 8715, 8719, 8721, 8722, 8727, 8730, 8733, 8734, 8736, 8743, 8744, 8745, 8746, 8747, 8756, 8764, 8773, 8776, 8800, 8801, 8804, 8805, 8834, 8835, 8836, 8838, 8839, 8853, 8855, 8869, 8901, 8968, 8969, 8970, 8971, 9001, 9002, 9674, 9824, 9827, 9829, 9830];
	
	var alphaIndex = {};
	var numIndex = {};
	
	var i = 0;
	var length = HTML_ALPHA.length;
	while (i < length) {
	    var a = HTML_ALPHA[i];
	    var c = HTML_CODES[i];
	    alphaIndex[a] = String.fromCharCode(c);
	    numIndex[c] = a;
	    i++;
	}
	
	/**
	 * @constructor
	 */
	function Html4Entities() {}
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.prototype.decode = function(str) {
	    if (str.length === 0) {
	        return '';
	    }
	    return str.replace(/&(#?[\w\d]+);?/g, function(s, entity) {
	        var chr;
	        if (entity.charAt(0) === "#") {
	            var code = entity.charAt(1).toLowerCase() === 'x' ?
	                parseInt(entity.substr(2), 16) :
	                parseInt(entity.substr(1));
	
	            if (!(isNaN(code) || code < -32768 || code > 65535)) {
	                chr = String.fromCharCode(code);
	            }
	        } else {
	            chr = alphaIndex[entity];
	        }
	        return chr || s;
	    });
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.decode = function(str) {
	    return new Html4Entities().decode(str);
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.prototype.encode = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var alpha = numIndex[str.charCodeAt(i)];
	        result += alpha ? "&" + alpha + ";" : str.charAt(i);
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.encode = function(str) {
	    return new Html4Entities().encode(str);
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.prototype.encodeNonUTF = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var cc = str.charCodeAt(i);
	        var alpha = numIndex[cc];
	        if (alpha) {
	            result += "&" + alpha + ";";
	        } else if (cc < 32 || cc > 126) {
	            result += "&#" + cc + ";";
	        } else {
	            result += str.charAt(i);
	        }
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.encodeNonUTF = function(str) {
	    return new Html4Entities().encodeNonUTF(str);
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.prototype.encodeNonASCII = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var c = str.charCodeAt(i);
	        if (c <= 255) {
	            result += str[i++];
	            continue;
	        }
	        result += '&#' + c + ';';
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.encodeNonASCII = function(str) {
	    return new Html4Entities().encodeNonASCII(str);
	};
	
	module.exports = Html4Entities;


/***/ },
/* 77 */
/***/ function(module, exports) {

	var ALPHA_INDEX = {
	    '&lt': '<',
	    '&gt': '>',
	    '&quot': '"',
	    '&apos': '\'',
	    '&amp': '&',
	    '&lt;': '<',
	    '&gt;': '>',
	    '&quot;': '"',
	    '&apos;': '\'',
	    '&amp;': '&'
	};
	
	var CHAR_INDEX = {
	    60: 'lt',
	    62: 'gt',
	    34: 'quot',
	    39: 'apos',
	    38: 'amp'
	};
	
	var CHAR_S_INDEX = {
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    '\'': '&apos;',
	    '&': '&amp;'
	};
	
	/**
	 * @constructor
	 */
	function XmlEntities() {}
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.prototype.encode = function(str) {
	    if (str.length === 0) {
	        return '';
	    }
	    return str.replace(/<|>|"|'|&/g, function(s) {
	        return CHAR_S_INDEX[s];
	    });
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 XmlEntities.encode = function(str) {
	    return new XmlEntities().encode(str);
	 };
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.prototype.decode = function(str) {
	    if (str.length === 0) {
	        return '';
	    }
	    return str.replace(/&#?[0-9a-zA-Z]+;?/g, function(s) {
	        if (s.charAt(1) === '#') {
	            var code = s.charAt(2).toLowerCase() === 'x' ?
	                parseInt(s.substr(3), 16) :
	                parseInt(s.substr(2));
	
	            if (isNaN(code) || code < -32768 || code > 65535) {
	                return '';
	            }
	            return String.fromCharCode(code);
	        }
	        return ALPHA_INDEX[s] || s;
	    });
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 XmlEntities.decode = function(str) {
	    return new XmlEntities().decode(str);
	 };
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.prototype.encodeNonUTF = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var c = str.charCodeAt(i);
	        var alpha = CHAR_INDEX[c];
	        if (alpha) {
	            result += "&" + alpha + ";";
	            i++;
	            continue;
	        }
	        if (c < 32 || c > 126) {
	            result += '&#' + c + ';';
	        } else {
	            result += str.charAt(i);
	        }
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 XmlEntities.encodeNonUTF = function(str) {
	    return new XmlEntities().encodeNonUTF(str);
	 };
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.prototype.encodeNonASCII = function(str) {
	    var strLenght = str.length;
	    if (strLenght === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLenght) {
	        var c = str.charCodeAt(i);
	        if (c <= 255) {
	            result += str[i++];
	            continue;
	        }
	        result += '&#' + c + ';';
	        i++;
	    }
	    return result;
	};
	
	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 XmlEntities.encodeNonASCII = function(str) {
	    return new XmlEntities().encodeNonASCII(str);
	 };
	
	module.exports = XmlEntities;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(184);
	
	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  var length = array == null ? 0 : array.length;
	  return !!length && baseIndexOf(array, value, 0) > -1;
	}
	
	module.exports = arrayIncludes;


/***/ },
/* 79 */
/***/ function(module, exports) {

	/**
	 * This function is like `arrayIncludes` except that it accepts a comparator.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @param {Function} comparator The comparator invoked per element.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludesWith(array, value, comparator) {
	  var index = -1,
	      length = array == null ? 0 : array.length;
	
	  while (++index < length) {
	    if (comparator(value, array[index])) {
	      return true;
	    }
	  }
	  return false;
	}
	
	module.exports = arrayIncludesWith;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(179),
	    arrayIncludes = __webpack_require__(78),
	    arrayIncludesWith = __webpack_require__(79),
	    arrayMap = __webpack_require__(183),
	    baseUnary = __webpack_require__(177),
	    cacheHas = __webpack_require__(180);
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
	/**
	 * The base implementation of methods like `_.difference` without support
	 * for excluding multiple arrays or iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Array} values The values to exclude.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new array of filtered values.
	 */
	function baseDifference(array, values, iteratee, comparator) {
	  var index = -1,
	      includes = arrayIncludes,
	      isCommon = true,
	      length = array.length,
	      result = [],
	      valuesLength = values.length;
	
	  if (!length) {
	    return result;
	  }
	  if (iteratee) {
	    values = arrayMap(values, baseUnary(iteratee));
	  }
	  if (comparator) {
	    includes = arrayIncludesWith;
	    isCommon = false;
	  }
	  else if (values.length >= LARGE_ARRAY_SIZE) {
	    includes = cacheHas;
	    isCommon = false;
	    values = new SetCache(values);
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee == null ? value : iteratee(value);
	
	    value = (comparator || value !== 0) ? value : 0;
	    if (isCommon && computed === computed) {
	      var valuesIndex = valuesLength;
	      while (valuesIndex--) {
	        if (values[valuesIndex] === computed) {
	          continue outer;
	        }
	      }
	      result.push(value);
	    }
	    else if (!includes(values, computed, comparator)) {
	      result.push(value);
	    }
	  }
	  return result;
	}
	
	module.exports = baseDifference;


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(181),
	    isFlattenable = __webpack_require__(83);
	
	/**
	 * The base implementation of `_.flatten` with support for restricting flattening.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {number} depth The maximum recursion depth.
	 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
	 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, depth, predicate, isStrict, result) {
	  var index = -1,
	      length = array.length;
	
	  predicate || (predicate = isFlattenable);
	  result || (result = []);
	
	  while (++index < length) {
	    var value = array[index];
	    if (depth > 0 && predicate(value)) {
	      if (depth > 1) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, depth - 1, predicate, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}
	
	module.exports = baseFlatten;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var baseIteratee = __webpack_require__(33),
	    isArrayLike = __webpack_require__(32),
	    keys = __webpack_require__(174);
	
	/**
	 * Creates a `_.find` or `_.findLast` function.
	 *
	 * @private
	 * @param {Function} findIndexFunc The function to find the collection index.
	 * @returns {Function} Returns the new find function.
	 */
	function createFind(findIndexFunc) {
	  return function(collection, predicate, fromIndex) {
	    var iterable = Object(collection);
	    if (!isArrayLike(collection)) {
	      var iteratee = baseIteratee(predicate, 3);
	      collection = keys(collection);
	      predicate = function(key) { return iteratee(iterable[key], key, iterable); };
	    }
	    var index = findIndexFunc(collection, predicate, fromIndex);
	    return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
	  };
	}
	
	module.exports = createFind;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(189),
	    isArguments = __webpack_require__(175),
	    isArray = __webpack_require__(176);
	
	/** Built-in value references. */
	var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;
	
	/**
	 * Checks if `value` is a flattenable `arguments` object or array.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	 */
	function isFlattenable(value) {
	  return isArray(value) || isArguments(value) ||
	    !!(spreadableSymbol && value && value[spreadableSymbol]);
	}
	
	module.exports = isFlattenable;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var baseDifference = __webpack_require__(80),
	    baseFlatten = __webpack_require__(81),
	    baseRest = __webpack_require__(173),
	    isArrayLikeObject = __webpack_require__(87);
	
	/**
	 * Creates an array of `array` values not included in the other given arrays
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons. The order and references of result values are
	 * determined by the first array.
	 *
	 * **Note:** Unlike `_.pullAll`, this method returns a new array.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {...Array} [values] The values to exclude.
	 * @returns {Array} Returns the new array of filtered values.
	 * @see _.without, _.xor
	 * @example
	 *
	 * _.difference([2, 1], [2, 3]);
	 * // => [1]
	 */
	var difference = baseRest(function(array, values) {
	  return isArrayLikeObject(array)
	    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
	    : [];
	});
	
	module.exports = difference;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var createFind = __webpack_require__(82),
	    findIndex = __webpack_require__(86);
	
	/**
	 * Iterates over elements of `collection`, returning the first element
	 * `predicate` returns truthy for. The predicate is invoked with three
	 * arguments: (value, index|key, collection).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to inspect.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @returns {*} Returns the matched element, else `undefined`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'age': 36, 'active': true },
	 *   { 'user': 'fred',    'age': 40, 'active': false },
	 *   { 'user': 'pebbles', 'age': 1,  'active': true }
	 * ];
	 *
	 * _.find(users, function(o) { return o.age < 40; });
	 * // => object for 'barney'
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.find(users, { 'age': 1, 'active': true });
	 * // => object for 'pebbles'
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.find(users, ['active', false]);
	 * // => object for 'fred'
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.find(users, 'active');
	 * // => object for 'barney'
	 */
	var find = createFind(findIndex);
	
	module.exports = find;


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var baseFindIndex = __webpack_require__(185),
	    baseIteratee = __webpack_require__(33),
	    toInteger = __webpack_require__(89);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * This method is like `_.find` except that it returns the index of the first
	 * element `predicate` returns truthy for instead of the element itself.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.1.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @returns {number} Returns the index of the found element, else `-1`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'active': false },
	 *   { 'user': 'fred',    'active': false },
	 *   { 'user': 'pebbles', 'active': true }
	 * ];
	 *
	 * _.findIndex(users, function(o) { return o.user == 'barney'; });
	 * // => 0
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.findIndex(users, { 'user': 'fred', 'active': false });
	 * // => 1
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.findIndex(users, ['active', false]);
	 * // => 0
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.findIndex(users, 'active');
	 * // => 2
	 */
	function findIndex(array, predicate, fromIndex) {
	  var length = array == null ? 0 : array.length;
	  if (!length) {
	    return -1;
	  }
	  var index = fromIndex == null ? 0 : toInteger(fromIndex);
	  if (index < 0) {
	    index = nativeMax(length + index, 0);
	  }
	  return baseFindIndex(array, baseIteratee(predicate, 3), index);
	}
	
	module.exports = findIndex;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(32),
	    isObjectLike = __webpack_require__(190);
	
	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}
	
	module.exports = isArrayLikeObject;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var toNumber = __webpack_require__(90);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;
	
	/**
	 * Converts `value` to a finite number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.12.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted number.
	 * @example
	 *
	 * _.toFinite(3.2);
	 * // => 3.2
	 *
	 * _.toFinite(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toFinite(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toFinite('3.2');
	 * // => 3.2
	 */
	function toFinite(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  return value === value ? value : 0;
	}
	
	module.exports = toFinite;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var toFinite = __webpack_require__(88);
	
	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3.2);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3.2');
	 * // => 3
	 */
	function toInteger(value) {
	  var result = toFinite(value),
	      remainder = result % 1;
	
	  return result === result ? (remainder ? result - remainder : result) : 0;
	}
	
	module.exports = toInteger;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(171),
	    isSymbol = __webpack_require__(182);
	
	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;
	
	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;
	
	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	
	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;
	
	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;
	
	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;
	
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}
	
	module.exports = toNumber;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(93);

/***/ },
/* 92 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = deepForceUpdate;
	function traverseRenderedChildren(internalInstance, callback, argument) {
	  callback(internalInstance, argument);
	
	  if (internalInstance._renderedComponent) {
	    traverseRenderedChildren(internalInstance._renderedComponent, callback, argument);
	  } else {
	    for (var key in internalInstance._renderedChildren) {
	      if (internalInstance._renderedChildren.hasOwnProperty(key)) {
	        traverseRenderedChildren(internalInstance._renderedChildren[key], callback, argument);
	      }
	    }
	  }
	}
	
	function setPendingForceUpdate(internalInstance) {
	  if (internalInstance._pendingForceUpdate === false) {
	    internalInstance._pendingForceUpdate = true;
	  }
	}
	
	function forceUpdateIfPending(internalInstance) {
	  if (internalInstance._pendingForceUpdate === true) {
	    var publicInstance = internalInstance._instance;
	    var updater = publicInstance.updater;
	
	    if (typeof publicInstance.forceUpdate === 'function') {
	      publicInstance.forceUpdate();
	    } else if (updater && typeof updater.enqueueForceUpdate === 'function') {
	      updater.enqueueForceUpdate(publicInstance);
	    }
	  }
	}
	
	function deepForceUpdate(instance) {
	  var internalInstance = instance._reactInternalInstance;
	  traverseRenderedChildren(internalInstance, setPendingForceUpdate);
	  traverseRenderedChildren(internalInstance, forceUpdateIfPending);
	}
	
	module.exports = exports['default'];

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	
	'use strict';
	
	var _assign = __webpack_require__(34);
	
	var _extends = _assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var ReactDebugTool = __webpack_require__(188);
	var warning = __webpack_require__(186);
	var alreadyWarned = false;
	
	function roundFloat(val) {
	  var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
	
	  var n = Math.pow(10, base);
	  return Math.floor(val * n) / n;
	}
	
	// Flow type definition of console.table is too strict right now, see
	// https://github.com/facebook/flow/pull/2353 for updates
	function consoleTable(table) {
	  console.table(table);
	}
	
	function warnInProduction() {
	  if (alreadyWarned) {
	    return;
	  }
	  alreadyWarned = true;
	  if (typeof console !== 'undefined') {
	    console.error('ReactPerf is not supported in the production builds of React. ' + 'To collect measurements, please use the development build of React instead.');
	  }
	}
	
	function getLastMeasurements() {
	  if (!(("development").NODE_ENV !== 'production')) {
	    warnInProduction();
	    return [];
	  }
	
	  return ReactDebugTool.getFlushHistory();
	}
	
	function getExclusive() {
	  var flushHistory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getLastMeasurements();
	
	  if (!(("development").NODE_ENV !== 'production')) {
	    warnInProduction();
	    return [];
	  }
	
	  var aggregatedStats = {};
	  var affectedIDs = {};
	
	  function updateAggregatedStats(treeSnapshot, instanceID, timerType, applyUpdate) {
	    var displayName = treeSnapshot[instanceID].displayName;
	
	    var key = displayName;
	    var stats = aggregatedStats[key];
	    if (!stats) {
	      affectedIDs[key] = {};
	      stats = aggregatedStats[key] = {
	        key: key,
	        instanceCount: 0,
	        counts: {},
	        durations: {},
	        totalDuration: 0
	      };
	    }
	    if (!stats.durations[timerType]) {
	      stats.durations[timerType] = 0;
	    }
	    if (!stats.counts[timerType]) {
	      stats.counts[timerType] = 0;
	    }
	    affectedIDs[key][instanceID] = true;
	    applyUpdate(stats);
	  }
	
	  flushHistory.forEach(function (flush) {
	    var measurements = flush.measurements,
	        treeSnapshot = flush.treeSnapshot;
	
	    measurements.forEach(function (measurement) {
	      var duration = measurement.duration,
	          instanceID = measurement.instanceID,
	          timerType = measurement.timerType;
	
	      updateAggregatedStats(treeSnapshot, instanceID, timerType, function (stats) {
	        stats.totalDuration += duration;
	        stats.durations[timerType] += duration;
	        stats.counts[timerType]++;
	      });
	    });
	  });
	
	  return Object.keys(aggregatedStats).map(function (key) {
	    return _extends({}, aggregatedStats[key], {
	      instanceCount: Object.keys(affectedIDs[key]).length
	    });
	  }).sort(function (a, b) {
	    return b.totalDuration - a.totalDuration;
	  });
	}
	
	function getInclusive() {
	  var flushHistory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getLastMeasurements();
	
	  if (!(("development").NODE_ENV !== 'production')) {
	    warnInProduction();
	    return [];
	  }
	
	  var aggregatedStats = {};
	  var affectedIDs = {};
	
	  function updateAggregatedStats(treeSnapshot, instanceID, applyUpdate) {
	    var _treeSnapshot$instanc = treeSnapshot[instanceID],
	        displayName = _treeSnapshot$instanc.displayName,
	        ownerID = _treeSnapshot$instanc.ownerID;
	
	    var owner = treeSnapshot[ownerID];
	    var key = (owner ? owner.displayName + ' > ' : '') + displayName;
	    var stats = aggregatedStats[key];
	    if (!stats) {
	      affectedIDs[key] = {};
	      stats = aggregatedStats[key] = {
	        key: key,
	        instanceCount: 0,
	        inclusiveRenderDuration: 0,
	        renderCount: 0
	      };
	    }
	    affectedIDs[key][instanceID] = true;
	    applyUpdate(stats);
	  }
	
	  var isCompositeByID = {};
	  flushHistory.forEach(function (flush) {
	    var measurements = flush.measurements;
	
	    measurements.forEach(function (measurement) {
	      var instanceID = measurement.instanceID,
	          timerType = measurement.timerType;
	
	      if (timerType !== 'render') {
	        return;
	      }
	      isCompositeByID[instanceID] = true;
	    });
	  });
	
	  flushHistory.forEach(function (flush) {
	    var measurements = flush.measurements,
	        treeSnapshot = flush.treeSnapshot;
	
	    measurements.forEach(function (measurement) {
	      var duration = measurement.duration,
	          instanceID = measurement.instanceID,
	          timerType = measurement.timerType;
	
	      if (timerType !== 'render') {
	        return;
	      }
	      updateAggregatedStats(treeSnapshot, instanceID, function (stats) {
	        stats.renderCount++;
	      });
	      var nextParentID = instanceID;
	      while (nextParentID) {
	        // As we traverse parents, only count inclusive time towards composites.
	        // We know something is a composite if its render() was called.
	        if (isCompositeByID[nextParentID]) {
	          updateAggregatedStats(treeSnapshot, nextParentID, function (stats) {
	            stats.inclusiveRenderDuration += duration;
	          });
	        }
	        nextParentID = treeSnapshot[nextParentID].parentID;
	      }
	    });
	  });
	
	  return Object.keys(aggregatedStats).map(function (key) {
	    return _extends({}, aggregatedStats[key], {
	      instanceCount: Object.keys(affectedIDs[key]).length
	    });
	  }).sort(function (a, b) {
	    return b.inclusiveRenderDuration - a.inclusiveRenderDuration;
	  });
	}
	
	function getWasted() {
	  var flushHistory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getLastMeasurements();
	
	  if (!(("development").NODE_ENV !== 'production')) {
	    warnInProduction();
	    return [];
	  }
	
	  var aggregatedStats = {};
	  var affectedIDs = {};
	
	  function updateAggregatedStats(treeSnapshot, instanceID, applyUpdate) {
	    var _treeSnapshot$instanc2 = treeSnapshot[instanceID],
	        displayName = _treeSnapshot$instanc2.displayName,
	        ownerID = _treeSnapshot$instanc2.ownerID;
	
	    var owner = treeSnapshot[ownerID];
	    var key = (owner ? owner.displayName + ' > ' : '') + displayName;
	    var stats = aggregatedStats[key];
	    if (!stats) {
	      affectedIDs[key] = {};
	      stats = aggregatedStats[key] = {
	        key: key,
	        instanceCount: 0,
	        inclusiveRenderDuration: 0,
	        renderCount: 0
	      };
	    }
	    affectedIDs[key][instanceID] = true;
	    applyUpdate(stats);
	  }
	
	  flushHistory.forEach(function (flush) {
	    var measurements = flush.measurements,
	        treeSnapshot = flush.treeSnapshot,
	        operations = flush.operations;
	
	    var isDefinitelyNotWastedByID = {};
	
	    // Find host components associated with an operation in this batch.
	    // Mark all components in their parent tree as definitely not wasted.
	    operations.forEach(function (operation) {
	      var instanceID = operation.instanceID;
	
	      var nextParentID = instanceID;
	      while (nextParentID) {
	        isDefinitelyNotWastedByID[nextParentID] = true;
	        nextParentID = treeSnapshot[nextParentID].parentID;
	      }
	    });
	
	    // Find composite components that rendered in this batch.
	    // These are potential candidates for being wasted renders.
	    var renderedCompositeIDs = {};
	    measurements.forEach(function (measurement) {
	      var instanceID = measurement.instanceID,
	          timerType = measurement.timerType;
	
	      if (timerType !== 'render') {
	        return;
	      }
	      renderedCompositeIDs[instanceID] = true;
	    });
	
	    measurements.forEach(function (measurement) {
	      var duration = measurement.duration,
	          instanceID = measurement.instanceID,
	          timerType = measurement.timerType;
	
	      if (timerType !== 'render') {
	        return;
	      }
	
	      // If there was a DOM update below this component, or it has just been
	      // mounted, its render() is not considered wasted.
	      var updateCount = treeSnapshot[instanceID].updateCount;
	
	      if (isDefinitelyNotWastedByID[instanceID] || updateCount === 0) {
	        return;
	      }
	
	      // We consider this render() wasted.
	      updateAggregatedStats(treeSnapshot, instanceID, function (stats) {
	        stats.renderCount++;
	      });
	
	      var nextParentID = instanceID;
	      while (nextParentID) {
	        // Any parents rendered during this batch are considered wasted
	        // unless we previously marked them as dirty.
	        var isWasted = renderedCompositeIDs[nextParentID] && !isDefinitelyNotWastedByID[nextParentID];
	        if (isWasted) {
	          updateAggregatedStats(treeSnapshot, nextParentID, function (stats) {
	            stats.inclusiveRenderDuration += duration;
	          });
	        }
	        nextParentID = treeSnapshot[nextParentID].parentID;
	      }
	    });
	  });
	
	  return Object.keys(aggregatedStats).map(function (key) {
	    return _extends({}, aggregatedStats[key], {
	      instanceCount: Object.keys(affectedIDs[key]).length
	    });
	  }).sort(function (a, b) {
	    return b.inclusiveRenderDuration - a.inclusiveRenderDuration;
	  });
	}
	
	function getOperations() {
	  var flushHistory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getLastMeasurements();
	
	  if (!(("development").NODE_ENV !== 'production')) {
	    warnInProduction();
	    return [];
	  }
	
	  var stats = [];
	  flushHistory.forEach(function (flush, flushIndex) {
	    var operations = flush.operations,
	        treeSnapshot = flush.treeSnapshot;
	
	    operations.forEach(function (operation) {
	      var instanceID = operation.instanceID,
	          type = operation.type,
	          payload = operation.payload;
	      var _treeSnapshot$instanc3 = treeSnapshot[instanceID],
	          displayName = _treeSnapshot$instanc3.displayName,
	          ownerID = _treeSnapshot$instanc3.ownerID;
	
	      var owner = treeSnapshot[ownerID];
	      var key = (owner ? owner.displayName + ' > ' : '') + displayName;
	
	      stats.push({
	        flushIndex: flushIndex,
	        instanceID: instanceID,
	        key: key,
	        type: type,
	        ownerID: ownerID,
	        payload: payload
	      });
	    });
	  });
	  return stats;
	}
	
	function printExclusive(flushHistory) {
	  if (!(("development").NODE_ENV !== 'production')) {
	    warnInProduction();
	    return;
	  }
	
	  var stats = getExclusive(flushHistory);
	  var table = stats.map(function (item) {
	    var key = item.key,
	        instanceCount = item.instanceCount,
	        totalDuration = item.totalDuration;
	
	    var renderCount = item.counts.render || 0;
	    var renderDuration = item.durations.render || 0;
	    return {
	      'Component': key,
	      'Total time (ms)': roundFloat(totalDuration),
	      'Instance count': instanceCount,
	      'Total render time (ms)': roundFloat(renderDuration),
	      'Average render time (ms)': renderCount ? roundFloat(renderDuration / renderCount) : undefined,
	      'Render count': renderCount,
	      'Total lifecycle time (ms)': roundFloat(totalDuration - renderDuration)
	    };
	  });
	  consoleTable(table);
	}
	
	function printInclusive(flushHistory) {
	  if (!(("development").NODE_ENV !== 'production')) {
	    warnInProduction();
	    return;
	  }
	
	  var stats = getInclusive(flushHistory);
	  var table = stats.map(function (item) {
	    var key = item.key,
	        instanceCount = item.instanceCount,
	        inclusiveRenderDuration = item.inclusiveRenderDuration,
	        renderCount = item.renderCount;
	
	    return {
	      'Owner > Component': key,
	      'Inclusive render time (ms)': roundFloat(inclusiveRenderDuration),
	      'Instance count': instanceCount,
	      'Render count': renderCount
	    };
	  });
	  consoleTable(table);
	}
	
	function printWasted(flushHistory) {
	  if (!(("development").NODE_ENV !== 'production')) {
	    warnInProduction();
	    return;
	  }
	
	  var stats = getWasted(flushHistory);
	  var table = stats.map(function (item) {
	    var key = item.key,
	        instanceCount = item.instanceCount,
	        inclusiveRenderDuration = item.inclusiveRenderDuration,
	        renderCount = item.renderCount;
	
	    return {
	      'Owner > Component': key,
	      'Inclusive wasted time (ms)': roundFloat(inclusiveRenderDuration),
	      'Instance count': instanceCount,
	      'Render count': renderCount
	    };
	  });
	  consoleTable(table);
	}
	
	function printOperations(flushHistory) {
	  if (!(("development").NODE_ENV !== 'production')) {
	    warnInProduction();
	    return;
	  }
	
	  var stats = getOperations(flushHistory);
	  var table = stats.map(function (stat) {
	    return {
	      'Owner > Node': stat.key,
	      'Operation': stat.type,
	      'Payload': typeof stat.payload === 'object' ? JSON.stringify(stat.payload) : stat.payload,
	      'Flush index': stat.flushIndex,
	      'Owner Component ID': stat.ownerID,
	      'DOM Component ID': stat.instanceID
	    };
	  });
	  consoleTable(table);
	}
	
	var warnedAboutPrintDOM = false;
	function printDOM(measurements) {
	  ("development").NODE_ENV !== 'production' ? warning(warnedAboutPrintDOM, '`ReactPerf.printDOM(...)` is deprecated. Use ' + '`ReactPerf.printOperations(...)` instead.') : void 0;
	  warnedAboutPrintDOM = true;
	  return printOperations(measurements);
	}
	
	var warnedAboutGetMeasurementsSummaryMap = false;
	function getMeasurementsSummaryMap(measurements) {
	  ("development").NODE_ENV !== 'production' ? warning(warnedAboutGetMeasurementsSummaryMap, '`ReactPerf.getMeasurementsSummaryMap(...)` is deprecated. Use ' + '`ReactPerf.getWasted(...)` instead.') : void 0;
	  warnedAboutGetMeasurementsSummaryMap = true;
	  return getWasted(measurements);
	}
	
	function start() {
	  if (!(("development").NODE_ENV !== 'production')) {
	    warnInProduction();
	    return;
	  }
	
	  ReactDebugTool.beginProfiling();
	}
	
	function stop() {
	  if (!(("development").NODE_ENV !== 'production')) {
	    warnInProduction();
	    return;
	  }
	
	  ReactDebugTool.endProfiling();
	}
	
	function isRunning() {
	  if (!(("development").NODE_ENV !== 'production')) {
	    warnInProduction();
	    return false;
	  }
	
	  return ReactDebugTool.isProfiling();
	}
	
	var ReactPerfAnalysis = {
	  getLastMeasurements: getLastMeasurements,
	  getExclusive: getExclusive,
	  getInclusive: getInclusive,
	  getWasted: getWasted,
	  getOperations: getOperations,
	  printExclusive: printExclusive,
	  printInclusive: printInclusive,
	  printWasted: printWasted,
	  printOperations: printOperations,
	  start: start,
	  stop: stop,
	  isRunning: isRunning,
	  // Deprecated:
	  printDOM: printDOM,
	  getMeasurementsSummaryMap: getMeasurementsSummaryMap
	};
	
	module.exports = ReactPerfAnalysis;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(98);


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(1);
	var deepForceUpdate = __webpack_require__(92);
	var Redbox = __webpack_require__(108).default;
	var Component = React.Component;
	
	var AppContainer = function (_Component) {
	  _inherits(AppContainer, _Component);
	
	  function AppContainer(props) {
	    _classCallCheck(this, AppContainer);
	
	    var _this = _possibleConstructorReturn(this, (AppContainer.__proto__ || Object.getPrototypeOf(AppContainer)).call(this, props));
	
	    _this.state = { error: null };
	    return _this;
	  }
	
	  _createClass(AppContainer, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      if (typeof __REACT_HOT_LOADER__ === 'undefined') {
	        console.error('React Hot Loader: It appears that "react-hot-loader/patch" ' + 'did not run immediately before the app started. Make sure that it ' + 'runs before any other code. For example, if you use Webpack, ' + 'you can add "react-hot-loader/patch" as the very first item to the ' + '"entry" array in its config. Alternatively, you can add ' + 'require("react-hot-loader/patch") as the very first line ' + 'in the application code, before any other imports.');
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps() {
	      // Hot reload is happening.
	      // Retry rendering!
	      this.setState({
	        error: null
	      });
	      // Force-update the whole tree, including
	      // components that refuse to update.
	      deepForceUpdate(this);
	    }
	
	    // This hook is going to become official in React 15.x.
	    // In 15.0, it only catches errors on initial mount.
	    // Later it will work for updates as well:
	    // https://github.com/facebook/react/pull/6020
	
	  }, {
	    key: 'unstable_handleError',
	    value: function unstable_handleError(error) {
	      // eslint-disable-line camelcase
	      this.setState({
	        error: error
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var error = this.state.error;
	
	      if (error) {
	        return React.createElement(this.props.errorReporter, { error: error });
	      }
	
	      if (this.props.component) {
	        return React.createElement(this.props.component, this.props.props);
	      }
	
	      return React.Children.only(this.props.children);
	    }
	  }]);
	
	  return AppContainer;
	}(Component);
	
	AppContainer.propTypes = {
	  component: function component(props) {
	    if (props.component) {
	      return new Error('Passing "component" prop to <AppContainer /> is deprecated. ' + 'Replace <AppContainer component={App} /> with <AppContainer><App /></AppContainer>.');
	    }
	
	    return undefined;
	  },
	  props: function props(_props) {
	    if (_props.props) {
	      return new Error('Passing "props" prop to <AppContainer /> is deprecated. ' + 'Replace <AppContainer component={App} props={{ myProp: myValue }} /> ' + 'with <AppContainer><App myProp={myValue} /></AppContainer>.');
	    }
	
	    return undefined;
	  },
	  children: function children(props) {
	    if (React.Children.count(props.children) !== 1) {
	      return new Error('Invalid prop "children" supplied to AppContainer. ' + 'Expected a single React element with your app’s root component, e.g. <App />.');
	    }
	
	    return undefined;
	  }
	};
	
	AppContainer.defaultProps = {
	  errorReporter: Redbox
	};
	
	module.exports = AppContainer;

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	/* eslint-disable global-require */
	
	'use strict';
	
	if (!module.hot || ("development").NODE_ENV === 'production') {
	  module.exports = __webpack_require__(97);
	} else {
	  module.exports = __webpack_require__(95);
	}

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	/* eslint-disable react/prop-types */
	
	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(1);
	var Component = React.Component;
	
	var AppContainer = function (_Component) {
	  _inherits(AppContainer, _Component);
	
	  function AppContainer() {
	    _classCallCheck(this, AppContainer);
	
	    return _possibleConstructorReturn(this, (AppContainer.__proto__ || Object.getPrototypeOf(AppContainer)).apply(this, arguments));
	  }
	
	  _createClass(AppContainer, [{
	    key: 'render',
	    value: function render() {
	      if (this.props.component) {
	        return React.createElement(this.props.component, this.props.props);
	      }
	
	      return React.Children.only(this.props.children);
	    }
	  }]);
	
	  return AppContainer;
	}(Component);
	
	module.exports = AppContainer;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var AppContainer = __webpack_require__(96);
	
	module.exports = function warnAboutIncorrectUsage(arg) {
	  if (this && this.callback) {
	    throw new Error('React Hot Loader: The Webpack loader is now exported separately. ' + 'If you use Babel, we recommend that you remove "react-hot-loader" ' + 'from the "loaders" section of your Webpack configuration altogether, ' + 'and instead add "react-hot-loader/babel" to the "plugins" section ' + 'of your .babelrc file. ' + 'If you prefer not to use Babel, replace "react-hot-loader" or ' + '"react-hot" with "react-hot-loader/webpack" in the "loaders" section ' + 'of your Webpack configuration.');
	  } else if (arg && arg.types && arg.types.IfStatement) {
	    throw new Error('React Hot Loader: The Babel plugin is exported separately. ' + 'Replace "react-hot-loader" with "react-hot-loader/babel" ' + 'in the "plugins" section of your .babelrc file. ' + 'While we recommend the above, if you prefer not to use Babel, ' + 'you may remove "react-hot-loader" from the "plugins" section of ' + 'your .babelrc file altogether, and instead add ' + '"react-hot-loader/webpack" to the "loaders" section of your Webpack ' + 'configuration.');
	  } else {
	    throw new Error('React Hot Loader does not have a default export. ' + 'If you use the import statement, make sure to include the ' + 'curly braces: import { AppContainer } from "react-hot-loader". ' + 'If you use CommonJS, make sure to read the named export: ' + 'require("react-hot-loader").AppContainer.');
	  }
	};
	
	module.exports.AppContainer = AppContainer;

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var React = __webpack_require__(1);
	var createProxy = __webpack_require__(107).default;
	var global = __webpack_require__(74);
	
	var ComponentMap = function () {
	  function ComponentMap(useWeakMap) {
	    _classCallCheck(this, ComponentMap);
	
	    if (useWeakMap) {
	      this.wm = new WeakMap();
	    } else {
	      this.slots = {};
	    }
	  }
	
	  _createClass(ComponentMap, [{
	    key: 'getSlot',
	    value: function getSlot(type) {
	      var key = type.displayName || type.name || 'Unknown';
	      if (!this.slots[key]) {
	        this.slots[key] = [];
	      }
	      return this.slots[key];
	    }
	  }, {
	    key: 'get',
	    value: function get(type) {
	      if (this.wm) {
	        return this.wm.get(type);
	      }
	
	      var slot = this.getSlot(type);
	      for (var i = 0; i < slot.length; i++) {
	        if (slot[i].key === type) {
	          return slot[i].value;
	        }
	      }
	
	      return undefined;
	    }
	  }, {
	    key: 'set',
	    value: function set(type, value) {
	      if (this.wm) {
	        this.wm.set(type, value);
	      } else {
	        var slot = this.getSlot(type);
	        for (var i = 0; i < slot.length; i++) {
	          if (slot[i].key === type) {
	            slot[i].value = value;
	            return;
	          }
	        }
	        slot.push({ key: type, value: value });
	      }
	    }
	  }, {
	    key: 'has',
	    value: function has(type) {
	      if (this.wm) {
	        return this.wm.has(type);
	      }
	
	      var slot = this.getSlot(type);
	      for (var i = 0; i < slot.length; i++) {
	        if (slot[i].key === type) {
	          return true;
	        }
	      }
	      return false;
	    }
	  }]);
	
	  return ComponentMap;
	}();
	
	var proxiesByID = void 0;
	var didWarnAboutID = void 0;
	var hasCreatedElementsByType = void 0;
	var idsByType = void 0;
	
	var hooks = {
	  register: function register(type, uniqueLocalName, fileName) {
	    if (typeof type !== 'function') {
	      return;
	    }
	    if (!uniqueLocalName || !fileName) {
	      return;
	    }
	    if (typeof uniqueLocalName !== 'string' || typeof fileName !== 'string') {
	      return;
	    }
	    var id = fileName + '#' + uniqueLocalName; // eslint-disable-line prefer-template
	    if (!idsByType.has(type) && hasCreatedElementsByType.has(type)) {
	      if (!didWarnAboutID[id]) {
	        didWarnAboutID[id] = true;
	        var baseName = fileName.replace(/^.*[\\\/]/, '');
	        console.error('React Hot Loader: ' + uniqueLocalName + ' in ' + fileName + ' will not hot reload ' + ('correctly because ' + baseName + ' uses <' + uniqueLocalName + ' /> during ') + ('module definition. For hot reloading to work, move ' + uniqueLocalName + ' ') + ('into a separate file and import it from ' + baseName + '.'));
	      }
	      return;
	    }
	
	    // Remember the ID.
	    idsByType.set(type, id);
	
	    // We use React Proxy to generate classes that behave almost
	    // the same way as the original classes but are updatable with
	    // new versions without destroying original instances.
	    if (!proxiesByID[id]) {
	      proxiesByID[id] = createProxy(type);
	    } else {
	      proxiesByID[id].update(type);
	    }
	  },
	  reset: function reset(useWeakMap) {
	    proxiesByID = {};
	    didWarnAboutID = {};
	    hasCreatedElementsByType = new ComponentMap(useWeakMap);
	    idsByType = new ComponentMap(useWeakMap);
	  }
	};
	
	hooks.reset(typeof WeakMap === 'function');
	
	function resolveType(type) {
	  // We only care about composite components
	  if (typeof type !== 'function') {
	    return type;
	  }
	
	  hasCreatedElementsByType.set(type, true);
	
	  // When available, give proxy class to React instead of the real class.
	  var id = idsByType.get(type);
	  if (!id) {
	    return type;
	  }
	
	  var proxy = proxiesByID[id];
	  if (!proxy) {
	    return type;
	  }
	
	  return proxy.get();
	}
	
	var createElement = React.createElement;
	function patchedCreateElement(type) {
	  // Trick React into rendering a proxy so that
	  // its state is preserved when the class changes.
	  // This will update the proxy if it's for a known type.
	  var resolvedType = resolveType(type);
	
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }
	
	  return createElement.apply(undefined, [resolvedType].concat(args));
	}
	patchedCreateElement.isPatchedByReactHotLoader = true;
	
	function patchedCreateFactory(type) {
	  // Patch React.createFactory to use patched createElement
	  // because the original implementation uses the internal,
	  // unpatched ReactElement.createElement
	  var factory = patchedCreateElement.bind(null, type);
	  factory.type = type;
	  return factory;
	}
	patchedCreateFactory.isPatchedByReactHotLoader = true;
	
	if (typeof global.__REACT_HOT_LOADER__ === 'undefined') {
	  React.createElement = patchedCreateElement;
	  React.createFactory = patchedCreateFactory;
	  global.__REACT_HOT_LOADER__ = hooks;
	}

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	/* eslint-disable global-require */
	
	'use strict';
	
	if (!module.hot || ("development").NODE_ENV === 'production') {
	  module.exports = __webpack_require__(101);
	} else {
	  module.exports = __webpack_require__(99);
	}

/***/ },
/* 101 */
/***/ function(module, exports) {

	/* noop */
	"use strict";

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(100);


/***/ },
/* 103 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = bindAutoBindMethods;
	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of React source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * Original:
	 * https://github.com/facebook/react/blob/6508b1ad273a6f371e8d90ae676e5390199461b4/src/isomorphic/classic/class/ReactClass.js#L650-L713
	 */
	
	function bindAutoBindMethod(component, method) {
	  var boundMethod = method.bind(component);
	
	  boundMethod.__reactBoundContext = component;
	  boundMethod.__reactBoundMethod = method;
	  boundMethod.__reactBoundArguments = null;
	
	  var componentName = component.constructor.displayName,
	      _bind = boundMethod.bind;
	
	  boundMethod.bind = function (newThis) {
	    var args = Array.prototype.slice.call(arguments, 1);
	    if (newThis !== component && newThis !== null) {
	      console.warn('bind(): React component methods may only be bound to the ' + 'component instance. See ' + componentName);
	    } else if (!args.length) {
	      console.warn('bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See ' + componentName);
	      return boundMethod;
	    }
	
	    var reboundMethod = _bind.apply(boundMethod, arguments);
	    reboundMethod.__reactBoundContext = component;
	    reboundMethod.__reactBoundMethod = method;
	    reboundMethod.__reactBoundArguments = args;
	
	    return reboundMethod;
	  };
	
	  return boundMethod;
	}
	
	function bindAutoBindMethodsFromMap(component) {
	  for (var autoBindKey in component.__reactAutoBindMap) {
	    if (!component.__reactAutoBindMap.hasOwnProperty(autoBindKey)) {
	      return;
	    }
	
	    // Tweak: skip methods that are already bound.
	    // This is to preserve method reference in case it is used
	    // as a subscription handler that needs to be detached later.
	    if (component.hasOwnProperty(autoBindKey) && component[autoBindKey].__reactBoundContext === component) {
	      continue;
	    }
	
	    var method = component.__reactAutoBindMap[autoBindKey];
	    component[autoBindKey] = bindAutoBindMethod(component, method);
	  }
	}
	
	function bindAutoBindMethods(component) {
	  if (component.__reactAutoBindPairs) {
	    bindAutoBindMethodsFromArray(component);
	  } else if (component.__reactAutoBindMap) {
	    bindAutoBindMethodsFromMap(component);
	  }
	}
	
	function bindAutoBindMethodsFromArray(component) {
	  var pairs = component.__reactAutoBindPairs;
	
	  if (!pairs) {
	    return;
	  }
	
	  for (var i = 0; i < pairs.length; i += 2) {
	    var autoBindKey = pairs[i];
	
	    if (component.hasOwnProperty(autoBindKey) && component[autoBindKey].__reactBoundContext === component) {
	      continue;
	    }
	
	    var method = pairs[i + 1];
	
	    component[autoBindKey] = bindAutoBindMethod(component, method);
	  }
	}

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	exports.default = createClassProxy;
	
	var _find = __webpack_require__(85);
	
	var _find2 = _interopRequireDefault(_find);
	
	var _createPrototypeProxy = __webpack_require__(105);
	
	var _createPrototypeProxy2 = _interopRequireDefault(_createPrototypeProxy);
	
	var _bindAutoBindMethods = __webpack_require__(103);
	
	var _bindAutoBindMethods2 = _interopRequireDefault(_bindAutoBindMethods);
	
	var _deleteUnknownAutoBindMethods = __webpack_require__(106);
	
	var _deleteUnknownAutoBindMethods2 = _interopRequireDefault(_deleteUnknownAutoBindMethods);
	
	var _supportsProtoAssignment = __webpack_require__(25);
	
	var _supportsProtoAssignment2 = _interopRequireDefault(_supportsProtoAssignment);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var RESERVED_STATICS = ['length', 'displayName', 'name', 'arguments', 'caller', 'prototype', 'toString'];
	
	function isEqualDescriptor(a, b) {
	  if (!a && !b) {
	    return true;
	  }
	  if (!a || !b) {
	    return false;
	  }
	  for (var key in a) {
	    if (a[key] !== b[key]) {
	      return false;
	    }
	  }
	  return true;
	}
	
	function getDisplayName(Component) {
	  var displayName = Component.displayName || Component.name;
	  return displayName && displayName !== 'ReactComponent' ? displayName : 'Unknown';
	}
	
	// This was originally a WeakMap but we had issues with React Native:
	// https://github.com/gaearon/react-proxy/issues/50#issuecomment-192928066
	var allProxies = [];
	function findProxy(Component) {
	  var pair = (0, _find2.default)(allProxies, function (_ref) {
	    var _ref2 = _slicedToArray(_ref, 1);
	
	    var key = _ref2[0];
	    return key === Component;
	  });
	  return pair ? pair[1] : null;
	}
	function addProxy(Component, proxy) {
	  allProxies.push([Component, proxy]);
	}
	
	function proxyClass(InitialComponent) {
	  // Prevent double wrapping.
	  // Given a proxy class, return the existing proxy managing it.
	  var existingProxy = findProxy(InitialComponent);
	  if (existingProxy) {
	    return existingProxy;
	  }
	
	  var CurrentComponent = undefined;
	  var ProxyComponent = undefined;
	  var savedDescriptors = {};
	
	  function instantiate(factory, context, params) {
	    var component = factory();
	
	    try {
	      return component.apply(context, params);
	    } catch (err) {
	      (function () {
	        // Native ES6 class instantiation
	        var instance = new (Function.prototype.bind.apply(component, [null].concat(_toConsumableArray(params))))();
	
	        Object.keys(instance).forEach(function (key) {
	          if (RESERVED_STATICS.indexOf(key) > -1) {
	            return;
	          }
	          context[key] = instance[key];
	        });
	      })();
	    }
	  }
	
	  var displayName = getDisplayName(InitialComponent);
	  try {
	    // Create a proxy constructor with matching name
	    ProxyComponent = new Function('factory', 'instantiate', 'return function ' + displayName + '() {\n         return instantiate(factory, this, arguments);\n      }')(function () {
	      return CurrentComponent;
	    }, instantiate);
	  } catch (err) {
	    // Some environments may forbid dynamic evaluation
	    ProxyComponent = function ProxyComponent() {
	      return instantiate(function () {
	        return CurrentComponent;
	      }, this, arguments);
	    };
	  }
	  try {
	    Object.defineProperty(ProxyComponent, 'name', {
	      value: displayName
	    });
	  } catch (err) {}
	
	  // Proxy toString() to the current constructor
	  ProxyComponent.toString = function toString() {
	    return CurrentComponent.toString();
	  };
	
	  var prototypeProxy = undefined;
	  if (InitialComponent.prototype && InitialComponent.prototype.isReactComponent) {
	    // Point proxy constructor to the proxy prototype
	    prototypeProxy = (0, _createPrototypeProxy2.default)();
	    ProxyComponent.prototype = prototypeProxy.get();
	  }
	
	  function update(NextComponent) {
	    if (typeof NextComponent !== 'function') {
	      throw new Error('Expected a constructor.');
	    }
	    if (NextComponent === CurrentComponent) {
	      return;
	    }
	
	    // Prevent proxy cycles
	    var existingProxy = findProxy(NextComponent);
	    if (existingProxy) {
	      return update(existingProxy.__getCurrent());
	    }
	
	    // Save the next constructor so we call it
	    var PreviousComponent = CurrentComponent;
	    CurrentComponent = NextComponent;
	
	    // Try to infer displayName
	    displayName = getDisplayName(NextComponent);
	    ProxyComponent.displayName = displayName;
	    try {
	      Object.defineProperty(ProxyComponent, 'name', {
	        value: displayName
	      });
	    } catch (err) {}
	
	    // Set up the same prototype for inherited statics
	    ProxyComponent.__proto__ = NextComponent.__proto__;
	
	    // Copy over static methods and properties added at runtime
	    if (PreviousComponent) {
	      Object.getOwnPropertyNames(PreviousComponent).forEach(function (key) {
	        if (RESERVED_STATICS.indexOf(key) > -1) {
	          return;
	        }
	
	        var prevDescriptor = Object.getOwnPropertyDescriptor(PreviousComponent, key);
	        var savedDescriptor = savedDescriptors[key];
	
	        if (!isEqualDescriptor(prevDescriptor, savedDescriptor)) {
	          Object.defineProperty(NextComponent, key, prevDescriptor);
	        }
	      });
	    }
	
	    // Copy newly defined static methods and properties
	    Object.getOwnPropertyNames(NextComponent).forEach(function (key) {
	      if (RESERVED_STATICS.indexOf(key) > -1) {
	        return;
	      }
	
	      var prevDescriptor = PreviousComponent && Object.getOwnPropertyDescriptor(PreviousComponent, key);
	      var savedDescriptor = savedDescriptors[key];
	
	      // Skip redefined descriptors
	      if (prevDescriptor && savedDescriptor && !isEqualDescriptor(savedDescriptor, prevDescriptor)) {
	        Object.defineProperty(NextComponent, key, prevDescriptor);
	        Object.defineProperty(ProxyComponent, key, prevDescriptor);
	        return;
	      }
	
	      if (prevDescriptor && !savedDescriptor) {
	        Object.defineProperty(ProxyComponent, key, prevDescriptor);
	        return;
	      }
	
	      var nextDescriptor = _extends({}, Object.getOwnPropertyDescriptor(NextComponent, key), {
	        configurable: true
	      });
	      savedDescriptors[key] = nextDescriptor;
	      Object.defineProperty(ProxyComponent, key, nextDescriptor);
	    });
	
	    // Remove static methods and properties that are no longer defined
	    Object.getOwnPropertyNames(ProxyComponent).forEach(function (key) {
	      if (RESERVED_STATICS.indexOf(key) > -1) {
	        return;
	      }
	      // Skip statics that exist on the next class
	      if (NextComponent.hasOwnProperty(key)) {
	        return;
	      }
	      // Skip non-configurable statics
	      var proxyDescriptor = Object.getOwnPropertyDescriptor(ProxyComponent, key);
	      if (proxyDescriptor && !proxyDescriptor.configurable) {
	        return;
	      }
	
	      var prevDescriptor = PreviousComponent && Object.getOwnPropertyDescriptor(PreviousComponent, key);
	      var savedDescriptor = savedDescriptors[key];
	
	      // Skip redefined descriptors
	      if (prevDescriptor && savedDescriptor && !isEqualDescriptor(savedDescriptor, prevDescriptor)) {
	        return;
	      }
	
	      delete ProxyComponent[key];
	    });
	
	    if (prototypeProxy) {
	      // Update the prototype proxy with new methods
	      var mountedInstances = prototypeProxy.update(NextComponent.prototype);
	
	      // Set up the constructor property so accessing the statics work
	      ProxyComponent.prototype.constructor = NextComponent;
	
	      // We might have added new methods that need to be auto-bound
	      mountedInstances.forEach(_bindAutoBindMethods2.default);
	      mountedInstances.forEach(_deleteUnknownAutoBindMethods2.default);
	    }
	  };
	
	  function get() {
	    return ProxyComponent;
	  }
	
	  function getCurrent() {
	    return CurrentComponent;
	  }
	
	  update(InitialComponent);
	
	  var proxy = { get: get, update: update };
	  addProxy(ProxyComponent, proxy);
	
	  Object.defineProperty(proxy, '__getCurrent', {
	    configurable: false,
	    writable: false,
	    enumerable: false,
	    value: getCurrent
	  });
	
	  return proxy;
	}
	
	function createFallback(Component) {
	  var CurrentComponent = Component;
	
	  return {
	    get: function get() {
	      return CurrentComponent;
	    },
	    update: function update(NextComponent) {
	      CurrentComponent = NextComponent;
	    }
	  };
	}
	
	function createClassProxy(Component) {
	  return Component.__proto__ && (0, _supportsProtoAssignment2.default)() ? proxyClass(Component) : createFallback(Component);
	}

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createPrototypeProxy;
	
	var _assign = __webpack_require__(172);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _difference = __webpack_require__(84);
	
	var _difference2 = _interopRequireDefault(_difference);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createPrototypeProxy() {
	  var proxy = {};
	  var current = null;
	  var mountedInstances = [];
	
	  /**
	   * Creates a proxied toString() method pointing to the current version's toString().
	   */
	  function proxyToString(name) {
	    // Wrap to always call the current version
	    return function toString() {
	      if (typeof current[name] === 'function') {
	        return current[name].toString();
	      } else {
	        return '<method was deleted>';
	      }
	    };
	  }
	
	  /**
	   * Creates a proxied method that calls the current version, whenever available.
	   */
	  function proxyMethod(name) {
	    // Wrap to always call the current version
	    var proxiedMethod = function proxiedMethod() {
	      if (typeof current[name] === 'function') {
	        return current[name].apply(this, arguments);
	      }
	    };
	
	    // Copy properties of the original function, if any
	    (0, _assign2.default)(proxiedMethod, current[name]);
	    proxiedMethod.toString = proxyToString(name);
	    try {
	      Object.defineProperty(proxiedMethod, 'name', {
	        value: name
	      });
	    } catch (err) {}
	
	    return proxiedMethod;
	  }
	
	  /**
	   * Augments the original componentDidMount with instance tracking.
	   */
	  function proxiedComponentDidMount() {
	    mountedInstances.push(this);
	    if (typeof current.componentDidMount === 'function') {
	      return current.componentDidMount.apply(this, arguments);
	    }
	  }
	  proxiedComponentDidMount.toString = proxyToString('componentDidMount');
	
	  /**
	   * Augments the original componentWillUnmount with instance tracking.
	   */
	  function proxiedComponentWillUnmount() {
	    var index = mountedInstances.indexOf(this);
	    // Unless we're in a weird environment without componentDidMount
	    if (index !== -1) {
	      mountedInstances.splice(index, 1);
	    }
	    if (typeof current.componentWillUnmount === 'function') {
	      return current.componentWillUnmount.apply(this, arguments);
	    }
	  }
	  proxiedComponentWillUnmount.toString = proxyToString('componentWillUnmount');
	
	  /**
	   * Defines a property on the proxy.
	   */
	  function defineProxyProperty(name, descriptor) {
	    Object.defineProperty(proxy, name, descriptor);
	  }
	
	  /**
	   * Defines a property, attempting to keep the original descriptor configuration.
	   */
	  function defineProxyPropertyWithValue(name, value) {
	    var _ref = Object.getOwnPropertyDescriptor(current, name) || {};
	
	    var _ref$enumerable = _ref.enumerable;
	    var enumerable = _ref$enumerable === undefined ? false : _ref$enumerable;
	    var _ref$writable = _ref.writable;
	    var writable = _ref$writable === undefined ? true : _ref$writable;
	
	
	    defineProxyProperty(name, {
	      configurable: true,
	      enumerable: enumerable,
	      writable: writable,
	      value: value
	    });
	  }
	
	  /**
	   * Creates an auto-bind map mimicking the original map, but directed at proxy.
	   */
	  function createAutoBindMap() {
	    if (!current.__reactAutoBindMap) {
	      return;
	    }
	
	    var __reactAutoBindMap = {};
	    for (var name in current.__reactAutoBindMap) {
	      if (typeof proxy[name] === 'function' && current.__reactAutoBindMap.hasOwnProperty(name)) {
	        __reactAutoBindMap[name] = proxy[name];
	      }
	    }
	
	    return __reactAutoBindMap;
	  }
	
	  /**
	   * Creates an auto-bind map mimicking the original map, but directed at proxy.
	   */
	  function createAutoBindPairs() {
	    var __reactAutoBindPairs = [];
	
	    for (var i = 0; i < current.__reactAutoBindPairs.length; i += 2) {
	      var name = current.__reactAutoBindPairs[i];
	      var method = proxy[name];
	
	      if (typeof method === 'function') {
	        __reactAutoBindPairs.push(name, method);
	      }
	    }
	
	    return __reactAutoBindPairs;
	  }
	
	  /**
	   * Applies the updated prototype.
	   */
	  function update(next) {
	    // Save current source of truth
	    current = next;
	
	    // Find changed property names
	    var currentNames = Object.getOwnPropertyNames(current);
	    var previousName = Object.getOwnPropertyNames(proxy);
	    var removedNames = (0, _difference2.default)(previousName, currentNames);
	
	    // Remove properties and methods that are no longer there
	    removedNames.forEach(function (name) {
	      delete proxy[name];
	    });
	
	    // Copy every descriptor
	    currentNames.forEach(function (name) {
	      var descriptor = Object.getOwnPropertyDescriptor(current, name);
	      if (typeof descriptor.value === 'function') {
	        // Functions require additional wrapping so they can be bound later
	        defineProxyPropertyWithValue(name, proxyMethod(name));
	      } else {
	        // Other values can be copied directly
	        defineProxyProperty(name, descriptor);
	      }
	    });
	
	    // Track mounting and unmounting
	    defineProxyPropertyWithValue('componentDidMount', proxiedComponentDidMount);
	    defineProxyPropertyWithValue('componentWillUnmount', proxiedComponentWillUnmount);
	
	    if (current.hasOwnProperty('__reactAutoBindMap')) {
	      defineProxyPropertyWithValue('__reactAutoBindMap', createAutoBindMap());
	    }
	
	    if (current.hasOwnProperty('__reactAutoBindPairs')) {
	      defineProxyPropertyWithValue('__reactAutoBindPairs', createAutoBindPairs());
	    }
	
	    // Set up the prototype chain
	    proxy.__proto__ = next;
	
	    return mountedInstances;
	  }
	
	  /**
	   * Returns the up-to-date proxy prototype.
	   */
	  function get() {
	    return proxy;
	  }
	
	  return {
	    update: update,
	    get: get
	  };
	};

/***/ },
/* 106 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = deleteUnknownAutoBindMethods;
	function shouldDeleteClassicInstanceMethod(component, name) {
	  if (component.__reactAutoBindMap && component.__reactAutoBindMap.hasOwnProperty(name)) {
	    // It's a known autobound function, keep it
	    return false;
	  }
	
	  if (component.__reactAutoBindPairs && component.__reactAutoBindPairs.indexOf(name) >= 0) {
	    // It's a known autobound function, keep it
	    return false;
	  }
	
	  if (component[name].__reactBoundArguments !== null) {
	    // It's a function bound to specific args, keep it
	    return false;
	  }
	
	  // It's a cached bound method for a function
	  // that was deleted by user, so we delete it from component.
	  return true;
	}
	
	function shouldDeleteModernInstanceMethod(component, name) {
	  var prototype = component.constructor.prototype;
	
	  var prototypeDescriptor = Object.getOwnPropertyDescriptor(prototype, name);
	
	  if (!prototypeDescriptor || !prototypeDescriptor.get) {
	    // This is definitely not an autobinding getter
	    return false;
	  }
	
	  if (prototypeDescriptor.get().length !== component[name].length) {
	    // The length doesn't match, bail out
	    return false;
	  }
	
	  // This seems like a method bound using an autobinding getter on the prototype
	  // Hopefully we won't run into too many false positives.
	  return true;
	}
	
	function shouldDeleteInstanceMethod(component, name) {
	  var descriptor = Object.getOwnPropertyDescriptor(component, name);
	  if (typeof descriptor.value !== 'function') {
	    // Not a function, or something fancy: bail out
	    return;
	  }
	
	  if (component.__reactAutoBindMap || component.__reactAutoBindPairs) {
	    // Classic
	    return shouldDeleteClassicInstanceMethod(component, name);
	  } else {
	    // Modern
	    return shouldDeleteModernInstanceMethod(component, name);
	  }
	}
	
	/**
	 * Deletes autobound methods from the instance.
	 *
	 * For classic React classes, we only delete the methods that no longer exist in map.
	 * This means the user actually deleted them in code.
	 *
	 * For modern classes, we delete methods that exist on prototype with the same length,
	 * and which have getters on prototype, but are normal values on the instance.
	 * This is usually an indication that an autobinding decorator is being used,
	 * and the getter will re-generate the memoized handler on next access.
	 */
	function deleteUnknownAutoBindMethods(component) {
	  var names = Object.getOwnPropertyNames(component);
	
	  names.forEach(function (name) {
	    if (shouldDeleteInstanceMethod(component, name)) {
	      delete component[name];
	    }
	  });
	}

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _supportsProtoAssignment = __webpack_require__(25);
	
	var _supportsProtoAssignment2 = _interopRequireDefault(_supportsProtoAssignment);
	
	var _createClassProxy = __webpack_require__(104);
	
	var _createClassProxy2 = _interopRequireDefault(_createClassProxy);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	if (!(0, _supportsProtoAssignment2.default)()) {
	  console.warn('This JavaScript environment does not support __proto__. ' + 'This means that react-proxy is unable to proxy React components. ' + 'Features that rely on react-proxy, such as react-transform-hmr, ' + 'will not function as expected.');
	}
	
	exports.default = _createClassProxy2.default;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = exports.RedBoxError = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(35);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _style = __webpack_require__(110);
	
	var _style2 = _interopRequireDefault(_style);
	
	var _errorStackParser = __webpack_require__(65);
	
	var _errorStackParser2 = _interopRequireDefault(_errorStackParser);
	
	var _objectAssign = __webpack_require__(34);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _lib = __webpack_require__(109);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RedBoxError = exports.RedBoxError = function (_get__2) {
	  _inherits(RedBoxError, _get__2);
	
	  function RedBoxError() {
	    _classCallCheck(this, RedBoxError);
	
	    return _possibleConstructorReturn(this, (RedBoxError.__proto__ || Object.getPrototypeOf(RedBoxError)).apply(this, arguments));
	  }
	
	  _createClass(RedBoxError, [{
	    key: 'renderFrames',
	    value: function renderFrames(frames) {
	      var _props = this.props,
	          filename = _props.filename,
	          editorScheme = _props.editorScheme,
	          useLines = _props.useLines,
	          useColumns = _props.useColumns;
	
	      var _get__3 = _get__('assign')({}, _get__('style'), this.props.style),
	          frame = _get__3.frame,
	          file = _get__3.file,
	          linkToFile = _get__3.linkToFile;
	
	      return frames.map(function (f, index) {
	        var text = void 0;
	        var url = void 0;
	
	        if (index === 0 && filename && !_get__('isFilenameAbsolute')(f.fileName)) {
	          url = _get__('makeUrl')(filename, editorScheme);
	          text = _get__('makeLinkText')(filename);
	        } else {
	          var lines = useLines ? f.lineNumber : null;
	          var columns = useColumns ? f.columnNumber : null;
	          url = _get__('makeUrl')(f.fileName, editorScheme, lines, columns);
	          text = _get__('makeLinkText')(f.fileName, lines, columns);
	        }
	
	        return _get__('React').createElement(
	          'div',
	          { style: frame, key: index },
	          _get__('React').createElement(
	            'div',
	            null,
	            f.functionName
	          ),
	          _get__('React').createElement(
	            'div',
	            { style: file },
	            _get__('React').createElement(
	              'a',
	              { href: url, style: linkToFile },
	              text
	            )
	          )
	        );
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props2 = this.props,
	          error = _props2.error,
	          className = _props2.className;
	
	      var _get__4 = _get__('assign')({}, _get__('style'), this.props.style),
	          redbox = _get__4.redbox,
	          message = _get__4.message,
	          stack = _get__4.stack,
	          frame = _get__4.frame;
	
	      var frames = void 0;
	      var parseError = void 0;
	      try {
	        frames = _get__('ErrorStackParser').parse(error);
	      } catch (e) {
	        parseError = new Error('Failed to parse stack trace. Stack trace information unavailable.');
	      }
	
	      if (parseError) {
	        frames = _get__('React').createElement(
	          'div',
	          { style: frame, key: 0 },
	          _get__('React').createElement(
	            'div',
	            null,
	            parseError.message
	          )
	        );
	      } else {
	        frames = this.renderFrames(frames);
	      }
	
	      return _get__('React').createElement(
	        'div',
	        { style: redbox, className: className },
	        _get__('React').createElement(
	          'div',
	          { style: message },
	          error.name,
	          ': ',
	          error.message
	        ),
	        _get__('React').createElement(
	          'div',
	          { style: stack },
	          frames
	        )
	      );
	    }
	  }]);
	
	  return RedBoxError;
	}(_get__('Component'));
	
	// "Portal" component for actual RedBoxError component to
	// render to (directly under body). Prevents bugs as in #27.
	
	
	RedBoxError.propTypes = {
	  error: _get__('PropTypes').instanceOf(Error).isRequired,
	  filename: _get__('PropTypes').string,
	  editorScheme: _get__('PropTypes').string,
	  useLines: _get__('PropTypes').bool,
	  useColumns: _get__('PropTypes').bool,
	  style: _get__('PropTypes').object,
	  className: _get__('PropTypes').string
	};
	RedBoxError.displayName = 'RedBoxError';
	RedBoxError.defaultProps = {
	  useLines: true,
	  useColumns: true
	};
	
	var RedBox = function (_get__5) {
	  _inherits(RedBox, _get__5);
	
	  function RedBox() {
	    _classCallCheck(this, RedBox);
	
	    return _possibleConstructorReturn(this, (RedBox.__proto__ || Object.getPrototypeOf(RedBox)).apply(this, arguments));
	  }
	
	  _createClass(RedBox, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.el = document.createElement('div');
	      document.body.appendChild(this.el);
	      this.renderRedBoxError();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      this.renderRedBoxError();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      _get__('ReactDOM').unmountComponentAtNode(this.el);
	      document.body.removeChild(this.el);
	      this.el = null;
	    }
	  }, {
	    key: 'renderRedBoxError',
	    value: function renderRedBoxError() {
	      _get__('ReactDOM').render(_get__('React').createElement(_get__('RedBoxError'), this.props), this.el);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return null;
	    }
	  }]);
	
	  return RedBox;
	}(_get__('Component'));
	
	RedBox.propTypes = {
	  error: _get__('PropTypes').instanceOf(Error).isRequired
	};
	RedBox.displayName = 'RedBox';
	exports.default = RedBox;
	
	var _RewiredData__ = Object.create(null);
	
	var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
	var _RewireAPI__ = {};
	
	(function () {
	  function addPropertyToAPIObject(name, value) {
	    Object.defineProperty(_RewireAPI__, name, {
	      value: value,
	      enumerable: false,
	      configurable: true
	    });
	  }
	
	  addPropertyToAPIObject('__get__', _get__);
	  addPropertyToAPIObject('__GetDependency__', _get__);
	  addPropertyToAPIObject('__Rewire__', _set__);
	  addPropertyToAPIObject('__set__', _set__);
	  addPropertyToAPIObject('__reset__', _reset__);
	  addPropertyToAPIObject('__ResetDependency__', _reset__);
	  addPropertyToAPIObject('__with__', _with__);
	})();
	
	function _get__(variableName) {
	  if (_RewiredData__ === undefined || _RewiredData__[variableName] === undefined) {
	    return _get_original__(variableName);
	  } else {
	    var value = _RewiredData__[variableName];
	
	    if (value === INTENTIONAL_UNDEFINED) {
	      return undefined;
	    } else {
	      return value;
	    }
	  }
	}
	
	function _get_original__(variableName) {
	  switch (variableName) {
	    case 'PropTypes':
	      return _react.PropTypes;
	
	    case 'assign':
	      return _objectAssign2.default;
	
	    case 'style':
	      return _style2.default;
	
	    case 'isFilenameAbsolute':
	      return _lib.isFilenameAbsolute;
	
	    case 'makeUrl':
	      return _lib.makeUrl;
	
	    case 'makeLinkText':
	      return _lib.makeLinkText;
	
	    case 'ErrorStackParser':
	      return _errorStackParser2.default;
	
	    case 'Component':
	      return _react.Component;
	
	    case 'ReactDOM':
	      return _reactDom2.default;
	
	    case 'React':
	      return _react2.default;
	
	    case 'RedBoxError':
	      return RedBoxError;
	  }
	
	  return undefined;
	}
	
	function _assign__(variableName, value) {
	  if (_RewiredData__ === undefined || _RewiredData__[variableName] === undefined) {
	    return _set_original__(variableName, value);
	  } else {
	    return _RewiredData__[variableName] = value;
	  }
	}
	
	function _set_original__(variableName, _value) {
	  switch (variableName) {}
	
	  return undefined;
	}
	
	function _update_operation__(operation, variableName, prefix) {
	  var oldValue = _get__(variableName);
	
	  var newValue = operation === '++' ? oldValue + 1 : oldValue - 1;
	
	  _assign__(variableName, newValue);
	
	  return prefix ? newValue : oldValue;
	}
	
	function _set__(variableName, value) {
	  if ((typeof variableName === 'undefined' ? 'undefined' : _typeof(variableName)) === 'object') {
	    Object.keys(variableName).forEach(function (name) {
	      _RewiredData__[name] = variableName[name];
	    });
	  } else {
	    if (value === undefined) {
	      _RewiredData__[variableName] = INTENTIONAL_UNDEFINED;
	    } else {
	      _RewiredData__[variableName] = value;
	    }
	
	    return function () {
	      _reset__(variableName);
	    };
	  }
	}
	
	function _reset__(variableName) {
	  delete _RewiredData__[variableName];
	}
	
	function _with__(object) {
	  var rewiredVariableNames = Object.keys(object);
	  var previousValues = {};
	
	  function reset() {
	    rewiredVariableNames.forEach(function (variableName) {
	      _RewiredData__[variableName] = previousValues[variableName];
	    });
	  }
	
	  return function (callback) {
	    rewiredVariableNames.forEach(function (variableName) {
	      previousValues[variableName] = _RewiredData__[variableName];
	      _RewiredData__[variableName] = object[variableName];
	    });
	    var result = callback();
	
	    if (!!result && typeof result.then == 'function') {
	      result.then(reset).catch(reset);
	    } else {
	      reset();
	    }
	
	    return result;
	  };
	}
	
	var _typeOfOriginalExport = typeof RedBox === 'undefined' ? 'undefined' : _typeof(RedBox);
	
	function addNonEnumerableProperty(name, value) {
	  Object.defineProperty(RedBox, name, {
	    value: value,
	    enumerable: false,
	    configurable: true
	  });
	}
	
	if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(RedBox)) {
	  addNonEnumerableProperty('__get__', _get__);
	  addNonEnumerableProperty('__GetDependency__', _get__);
	  addNonEnumerableProperty('__Rewire__', _set__);
	  addNonEnumerableProperty('__set__', _set__);
	  addNonEnumerableProperty('__reset__', _reset__);
	  addNonEnumerableProperty('__ResetDependency__', _reset__);
	  addNonEnumerableProperty('__with__', _with__);
	  addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
	}
	
	exports.__get__ = _get__;
	exports.__GetDependency__ = _get__;
	exports.__Rewire__ = _set__;
	exports.__set__ = _set__;
	exports.__ResetDependency__ = _reset__;
	exports.__RewireAPI__ = _RewireAPI__;

/***/ },
/* 109 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var filenameWithoutLoaders = exports.filenameWithoutLoaders = function filenameWithoutLoaders() {
	  var filename = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	  var index = filename.lastIndexOf('!');
	
	  return index < 0 ? filename : filename.substr(index + 1);
	};
	
	var filenameHasLoaders = exports.filenameHasLoaders = function filenameHasLoaders(filename) {
	  var actualFilename = _get__('filenameWithoutLoaders')(filename);
	
	  return actualFilename !== filename;
	};
	
	var filenameHasSchema = exports.filenameHasSchema = function filenameHasSchema(filename) {
	  return (/^[\w]+\:/.test(filename)
	  );
	};
	
	var isFilenameAbsolute = exports.isFilenameAbsolute = function isFilenameAbsolute(filename) {
	  var actualFilename = _get__('filenameWithoutLoaders')(filename);
	
	  if (actualFilename.indexOf('/') === 0) {
	    return true;
	  }
	
	  return false;
	};
	
	var makeUrl = exports.makeUrl = function makeUrl(filename, scheme, line, column) {
	  var actualFilename = _get__('filenameWithoutLoaders')(filename);
	
	  if (_get__('filenameHasSchema')(filename)) {
	    return actualFilename;
	  }
	
	  var url = 'file://' + actualFilename;
	
	  if (scheme) {
	    url = scheme + '://open?url=' + url;
	
	    if (line && actualFilename === filename) {
	      url = url + '&line=' + line;
	
	      if (column) {
	        url = url + '&column=' + column;
	      }
	    }
	  }
	
	  return url;
	};
	
	var makeLinkText = exports.makeLinkText = function makeLinkText(filename, line, column) {
	  var text = _get__('filenameWithoutLoaders')(filename);
	
	  if (line && text === filename) {
	    text = text + ':' + line;
	
	    if (column) {
	      text = text + ':' + column;
	    }
	  }
	
	  return text;
	};
	
	var _RewiredData__ = Object.create(null);
	
	var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
	var _RewireAPI__ = {};
	
	(function () {
	  function addPropertyToAPIObject(name, value) {
	    Object.defineProperty(_RewireAPI__, name, {
	      value: value,
	      enumerable: false,
	      configurable: true
	    });
	  }
	
	  addPropertyToAPIObject('__get__', _get__);
	  addPropertyToAPIObject('__GetDependency__', _get__);
	  addPropertyToAPIObject('__Rewire__', _set__);
	  addPropertyToAPIObject('__set__', _set__);
	  addPropertyToAPIObject('__reset__', _reset__);
	  addPropertyToAPIObject('__ResetDependency__', _reset__);
	  addPropertyToAPIObject('__with__', _with__);
	})();
	
	function _get__(variableName) {
	  if (_RewiredData__ === undefined || _RewiredData__[variableName] === undefined) {
	    return _get_original__(variableName);
	  } else {
	    var value = _RewiredData__[variableName];
	
	    if (value === INTENTIONAL_UNDEFINED) {
	      return undefined;
	    } else {
	      return value;
	    }
	  }
	}
	
	function _get_original__(variableName) {
	  switch (variableName) {
	    case 'filenameWithoutLoaders':
	      return filenameWithoutLoaders;
	
	    case 'filenameHasSchema':
	      return filenameHasSchema;
	  }
	
	  return undefined;
	}
	
	function _assign__(variableName, value) {
	  if (_RewiredData__ === undefined || _RewiredData__[variableName] === undefined) {
	    return _set_original__(variableName, value);
	  } else {
	    return _RewiredData__[variableName] = value;
	  }
	}
	
	function _set_original__(variableName, _value) {
	  switch (variableName) {}
	
	  return undefined;
	}
	
	function _update_operation__(operation, variableName, prefix) {
	  var oldValue = _get__(variableName);
	
	  var newValue = operation === '++' ? oldValue + 1 : oldValue - 1;
	
	  _assign__(variableName, newValue);
	
	  return prefix ? newValue : oldValue;
	}
	
	function _set__(variableName, value) {
	  if ((typeof variableName === 'undefined' ? 'undefined' : _typeof(variableName)) === 'object') {
	    Object.keys(variableName).forEach(function (name) {
	      _RewiredData__[name] = variableName[name];
	    });
	  } else {
	    if (value === undefined) {
	      _RewiredData__[variableName] = INTENTIONAL_UNDEFINED;
	    } else {
	      _RewiredData__[variableName] = value;
	    }
	
	    return function () {
	      _reset__(variableName);
	    };
	  }
	}
	
	function _reset__(variableName) {
	  delete _RewiredData__[variableName];
	}
	
	function _with__(object) {
	  var rewiredVariableNames = Object.keys(object);
	  var previousValues = {};
	
	  function reset() {
	    rewiredVariableNames.forEach(function (variableName) {
	      _RewiredData__[variableName] = previousValues[variableName];
	    });
	  }
	
	  return function (callback) {
	    rewiredVariableNames.forEach(function (variableName) {
	      previousValues[variableName] = _RewiredData__[variableName];
	      _RewiredData__[variableName] = object[variableName];
	    });
	    var result = callback();
	
	    if (!!result && typeof result.then == 'function') {
	      result.then(reset).catch(reset);
	    } else {
	      reset();
	    }
	
	    return result;
	  };
	}
	
	exports.__get__ = _get__;
	exports.__GetDependency__ = _get__;
	exports.__Rewire__ = _set__;
	exports.__set__ = _set__;
	exports.__ResetDependency__ = _reset__;
	exports.__RewireAPI__ = _RewireAPI__;
	exports.default = _RewireAPI__;

/***/ },
/* 110 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var _DefaultExportValue = {
	  redbox: {
	    boxSizing: 'border-box',
	    fontFamily: 'sans-serif',
	    position: 'fixed',
	    padding: 10,
	    top: '0px',
	    left: '0px',
	    bottom: '0px',
	    right: '0px',
	    width: '100%',
	    background: 'rgb(204, 0, 0)',
	    color: 'white',
	    zIndex: 2147483647,
	    textAlign: 'left',
	    fontSize: '16px',
	    lineHeight: 1.2,
	    overflow: 'auto'
	  },
	  message: {
	    fontWeight: 'bold'
	  },
	  stack: {
	    fontFamily: 'monospace',
	    marginTop: '2em'
	  },
	  frame: {
	    marginTop: '1em'
	  },
	  file: {
	    fontSize: '0.8em',
	    color: 'rgba(255, 255, 255, 0.7)'
	  },
	  linkToFile: {
	    textDecoration: 'none',
	    color: 'rgba(255, 255, 255, 0.7)'
	  }
	};
	exports.default = _DefaultExportValue;

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(118);


/***/ },
/* 112 */
/***/ function(module, exports) {

	// List of valid html blocks names, accorting to commonmark spec
	// http://jgm.github.io/CommonMark/spec.html#html-blocks
	
	'use strict';
	
	var html_blocks = {};
	
	[
	  'article',
	  'aside',
	  'button',
	  'blockquote',
	  'body',
	  'canvas',
	  'caption',
	  'col',
	  'colgroup',
	  'dd',
	  'div',
	  'dl',
	  'dt',
	  'embed',
	  'fieldset',
	  'figcaption',
	  'figure',
	  'footer',
	  'form',
	  'h1',
	  'h2',
	  'h3',
	  'h4',
	  'h5',
	  'h6',
	  'header',
	  'hgroup',
	  'hr',
	  'iframe',
	  'li',
	  'map',
	  'object',
	  'ol',
	  'output',
	  'p',
	  'pre',
	  'progress',
	  'script',
	  'section',
	  'style',
	  'table',
	  'tbody',
	  'td',
	  'textarea',
	  'tfoot',
	  'th',
	  'tr',
	  'thead',
	  'ul',
	  'video'
	].forEach(function (name) { html_blocks[name] = true; });
	
	
	module.exports = html_blocks;


/***/ },
/* 113 */
/***/ function(module, exports) {

	// Regexps to match html elements
	
	'use strict';
	
	
	function replace(regex, options) {
	  regex = regex.source;
	  options = options || '';
	
	  return function self(name, val) {
	    if (!name) {
	      return new RegExp(regex, options);
	    }
	    val = val.source || val;
	    regex = regex.replace(name, val);
	    return self;
	  };
	}
	
	
	var attr_name     = /[a-zA-Z_:][a-zA-Z0-9:._-]*/;
	
	var unquoted      = /[^"'=<>`\x00-\x20]+/;
	var single_quoted = /'[^']*'/;
	var double_quoted = /"[^"]*"/;
	
	/*eslint no-spaced-func:0*/
	var attr_value  = replace(/(?:unquoted|single_quoted|double_quoted)/)
	                    ('unquoted', unquoted)
	                    ('single_quoted', single_quoted)
	                    ('double_quoted', double_quoted)
	                    ();
	
	var attribute   = replace(/(?:\s+attr_name(?:\s*=\s*attr_value)?)/)
	                    ('attr_name', attr_name)
	                    ('attr_value', attr_value)
	                    ();
	
	var open_tag    = replace(/<[A-Za-z][A-Za-z0-9]*attribute*\s*\/?>/)
	                    ('attribute', attribute)
	                    ();
	
	var close_tag   = /<\/[A-Za-z][A-Za-z0-9]*\s*>/;
	var comment     = /<!--([^-]+|[-][^-]+)*-->/;
	var processing  = /<[?].*?[?]>/;
	var declaration = /<![A-Z]+\s+[^>]*>/;
	var cdata       = /<!\[CDATA\[([^\]]+|\][^\]]|\]\][^>])*\]\]>/;
	
	var HTML_TAG_RE = replace(/^(?:open_tag|close_tag|comment|processing|declaration|cdata)/)
	  ('open_tag', open_tag)
	  ('close_tag', close_tag)
	  ('comment', comment)
	  ('processing', processing)
	  ('declaration', declaration)
	  ('cdata', cdata)
	  ();
	
	
	module.exports.HTML_TAG_RE = HTML_TAG_RE;


/***/ },
/* 114 */
/***/ function(module, exports) {

	// List of valid url schemas, accorting to commonmark spec
	// http://jgm.github.io/CommonMark/spec.html#autolinks
	
	'use strict';
	
	
	module.exports = [
	  'coap',
	  'doi',
	  'javascript',
	  'aaa',
	  'aaas',
	  'about',
	  'acap',
	  'cap',
	  'cid',
	  'crid',
	  'data',
	  'dav',
	  'dict',
	  'dns',
	  'file',
	  'ftp',
	  'geo',
	  'go',
	  'gopher',
	  'h323',
	  'http',
	  'https',
	  'iax',
	  'icap',
	  'im',
	  'imap',
	  'info',
	  'ipp',
	  'iris',
	  'iris.beep',
	  'iris.xpc',
	  'iris.xpcs',
	  'iris.lwz',
	  'ldap',
	  'mailto',
	  'mid',
	  'msrp',
	  'msrps',
	  'mtqp',
	  'mupdate',
	  'news',
	  'nfs',
	  'ni',
	  'nih',
	  'nntp',
	  'opaquelocktoken',
	  'pop',
	  'pres',
	  'rtsp',
	  'service',
	  'session',
	  'shttp',
	  'sieve',
	  'sip',
	  'sips',
	  'sms',
	  'snmp',
	  'soap.beep',
	  'soap.beeps',
	  'tag',
	  'tel',
	  'telnet',
	  'tftp',
	  'thismessage',
	  'tn3270',
	  'tip',
	  'tv',
	  'urn',
	  'vemmi',
	  'ws',
	  'wss',
	  'xcon',
	  'xcon-userid',
	  'xmlrpc.beep',
	  'xmlrpc.beeps',
	  'xmpp',
	  'z39.50r',
	  'z39.50s',
	  'adiumxtra',
	  'afp',
	  'afs',
	  'aim',
	  'apt',
	  'attachment',
	  'aw',
	  'beshare',
	  'bitcoin',
	  'bolo',
	  'callto',
	  'chrome',
	  'chrome-extension',
	  'com-eventbrite-attendee',
	  'content',
	  'cvs',
	  'dlna-playsingle',
	  'dlna-playcontainer',
	  'dtn',
	  'dvb',
	  'ed2k',
	  'facetime',
	  'feed',
	  'finger',
	  'fish',
	  'gg',
	  'git',
	  'gizmoproject',
	  'gtalk',
	  'hcp',
	  'icon',
	  'ipn',
	  'irc',
	  'irc6',
	  'ircs',
	  'itms',
	  'jar',
	  'jms',
	  'keyparc',
	  'lastfm',
	  'ldaps',
	  'magnet',
	  'maps',
	  'market',
	  'message',
	  'mms',
	  'ms-help',
	  'msnim',
	  'mumble',
	  'mvn',
	  'notes',
	  'oid',
	  'palm',
	  'paparazzi',
	  'platform',
	  'proxy',
	  'psyc',
	  'query',
	  'res',
	  'resource',
	  'rmi',
	  'rsync',
	  'rtmp',
	  'secondlife',
	  'sftp',
	  'sgn',
	  'skype',
	  'smb',
	  'soldat',
	  'spotify',
	  'ssh',
	  'steam',
	  'svn',
	  'teamspeak',
	  'things',
	  'udp',
	  'unreal',
	  'ut2004',
	  'ventrilo',
	  'view-source',
	  'webcal',
	  'wtai',
	  'wyciwyg',
	  'xfire',
	  'xri',
	  'ymsgr'
	];


/***/ },
/* 115 */
/***/ function(module, exports) {

	// Commonmark default options
	
	'use strict';
	
	
	module.exports = {
	  options: {
	    html:         true,         // Enable HTML tags in source
	    xhtmlOut:     true,         // Use '/' to close single tags (<br />)
	    breaks:       false,        // Convert '\n' in paragraphs into <br>
	    langPrefix:   'language-',  // CSS language prefix for fenced blocks
	    linkify:      false,        // autoconvert URL-like texts to links
	    linkTarget:   '',           // set target to open link in
	
	    // Enable some language-neutral replacements + quotes beautification
	    typographer:  false,
	
	    // Double + single quotes replacement pairs, when typographer enabled,
	    // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
	    quotes: '“”‘’',
	
	    // Highlighter function. Should return escaped HTML,
	    // or '' if input not changed
	    //
	    // function (/*str, lang*/) { return ''; }
	    //
	    highlight: null,
	
	    maxNesting:   20            // Internal protection, recursion limit
	  },
	
	  components: {
	
	    core: {
	      rules: [
	        'block',
	        'inline',
	        'references',
	        'abbr2'
	      ]
	    },
	
	    block: {
	      rules: [
	        'blockquote',
	        'code',
	        'fences',
	        'heading',
	        'hr',
	        'htmlblock',
	        'lheading',
	        'list',
	        'paragraph'
	      ]
	    },
	
	    inline: {
	      rules: [
	        'autolink',
	        'backticks',
	        'emphasis',
	        'entity',
	        'escape',
	        'htmltag',
	        'links',
	        'newline',
	        'text'
	      ]
	    }
	  }
	};


/***/ },
/* 116 */
/***/ function(module, exports) {

	// Remarkable default options
	
	'use strict';
	
	
	module.exports = {
	  options: {
	    html:         false,        // Enable HTML tags in source
	    xhtmlOut:     false,        // Use '/' to close single tags (<br />)
	    breaks:       false,        // Convert '\n' in paragraphs into <br>
	    langPrefix:   'language-',  // CSS language prefix for fenced blocks
	    linkify:      false,        // autoconvert URL-like texts to links
	    linkTarget:   '',           // set target to open link in
	
	    // Enable some language-neutral replacements + quotes beautification
	    typographer:  false,
	
	    // Double + single quotes replacement pairs, when typographer enabled,
	    // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
	    quotes: '“”‘’',
	
	    // Highlighter function. Should return escaped HTML,
	    // or '' if input not changed
	    //
	    // function (/*str, lang*/) { return ''; }
	    //
	    highlight: null,
	
	    maxNesting:   20            // Internal protection, recursion limit
	  },
	
	  components: {
	
	    core: {
	      rules: [
	        'block',
	        'inline',
	        'references',
	        'replacements',
	        'linkify',
	        'smartquotes',
	        'references',
	        'abbr2',
	        'footnote_tail'
	      ]
	    },
	
	    block: {
	      rules: [
	        'blockquote',
	        'code',
	        'fences',
	        'footnote',
	        'heading',
	        'hr',
	        'htmlblock',
	        'lheading',
	        'list',
	        'paragraph',
	        'table'
	      ]
	    },
	
	    inline: {
	      rules: [
	        'autolink',
	        'backticks',
	        'del',
	        'emphasis',
	        'entity',
	        'escape',
	        'footnote_ref',
	        'htmltag',
	        'links',
	        'newline',
	        'text'
	      ]
	    }
	  }
	};


/***/ },
/* 117 */
/***/ function(module, exports) {

	// Remarkable default options
	
	'use strict';
	
	
	module.exports = {
	  options: {
	    html:         false,        // Enable HTML tags in source
	    xhtmlOut:     false,        // Use '/' to close single tags (<br />)
	    breaks:       false,        // Convert '\n' in paragraphs into <br>
	    langPrefix:   'language-',  // CSS language prefix for fenced blocks
	    linkify:      false,        // autoconvert URL-like texts to links
	    linkTarget:   '',           // set target to open link in
	
	    // Enable some language-neutral replacements + quotes beautification
	    typographer:  false,
	
	    // Double + single quotes replacement pairs, when typographer enabled,
	    // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
	    quotes:       '“”‘’',
	
	    // Highlighter function. Should return escaped HTML,
	    // or '' if input not changed
	    //
	    // function (/*str, lang*/) { return ''; }
	    //
	    highlight:     null,
	
	    maxNesting:    20            // Internal protection, recursion limit
	  },
	
	  components: {
	    // Don't restrict core/block/inline rules
	    core: {},
	    block: {},
	    inline: {}
	  }
	};


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Local dependencies
	 */
	
	var assign       = __webpack_require__(3).assign;
	var Renderer     = __webpack_require__(122);
	var ParserCore   = __webpack_require__(120);
	var ParserBlock  = __webpack_require__(119);
	var ParserInline = __webpack_require__(121);
	var Ruler        = __webpack_require__(8);
	
	/**
	 * Preset configs
	 */
	
	var config = {
	  'default':    __webpack_require__(116),
	  'full':       __webpack_require__(117),
	  'commonmark': __webpack_require__(115)
	};
	
	/**
	 * The `StateCore` class manages state.
	 *
	 * @param {Object} `instance` Remarkable instance
	 * @param {String} `str` Markdown string
	 * @param {Object} `env`
	 */
	
	function StateCore(instance, str, env) {
	  this.src = str;
	  this.env = env;
	  this.options = instance.options;
	  this.tokens = [];
	  this.inlineMode = false;
	
	  this.inline = instance.inline;
	  this.block = instance.block;
	  this.renderer = instance.renderer;
	  this.typographer = instance.typographer;
	}
	
	/**
	 * The main `Remarkable` class. Create an instance of
	 * `Remarkable` with a `preset` and/or `options`.
	 *
	 * @param {String} `preset` If no preset is given, `default` is used.
	 * @param {Object} `options`
	 */
	
	function Remarkable(preset, options) {
	  if (typeof preset !== 'string') {
	    options = preset;
	    preset = 'default';
	  }
	
	  this.inline   = new ParserInline();
	  this.block    = new ParserBlock();
	  this.core     = new ParserCore();
	  this.renderer = new Renderer();
	  this.ruler    = new Ruler();
	
	  this.options  = {};
	  this.configure(config[preset]);
	  this.set(options || {});
	}
	
	/**
	 * Set options as an alternative to passing them
	 * to the constructor.
	 *
	 * ```js
	 * md.set({typographer: true});
	 * ```
	 * @param {Object} `options`
	 * @api public
	 */
	
	Remarkable.prototype.set = function (options) {
	  assign(this.options, options);
	};
	
	/**
	 * Batch loader for components rules states, and options
	 *
	 * @param  {Object} `presets`
	 */
	
	Remarkable.prototype.configure = function (presets) {
	  var self = this;
	
	  if (!presets) { throw new Error('Wrong `remarkable` preset, check name/content'); }
	  if (presets.options) { self.set(presets.options); }
	  if (presets.components) {
	    Object.keys(presets.components).forEach(function (name) {
	      if (presets.components[name].rules) {
	        self[name].ruler.enable(presets.components[name].rules, true);
	      }
	    });
	  }
	};
	
	/**
	 * Use a plugin.
	 *
	 * ```js
	 * var md = new Remarkable();
	 *
	 * md.use(plugin1)
	 *   .use(plugin2, opts)
	 *   .use(plugin3);
	 * ```
	 *
	 * @param  {Function} `plugin`
	 * @param  {Object} `options`
	 * @return {Object} `Remarkable` for chaining
	 */
	
	Remarkable.prototype.use = function (plugin, options) {
	  plugin(this, options);
	  return this;
	};
	
	
	/**
	 * Parse the input `string` and return a tokens array.
	 * Modifies `env` with definitions data.
	 *
	 * @param  {String} `string`
	 * @param  {Object} `env`
	 * @return {Array} Array of tokens
	 */
	
	Remarkable.prototype.parse = function (str, env) {
	  var state = new StateCore(this, str, env);
	  this.core.process(state);
	  return state.tokens;
	};
	
	/**
	 * The main `.render()` method that does all the magic :)
	 *
	 * @param  {String} `string`
	 * @param  {Object} `env`
	 * @return {String} Rendered HTML.
	 */
	
	Remarkable.prototype.render = function (str, env) {
	  env = env || {};
	  return this.renderer.render(this.parse(str, env), this.options, env);
	};
	
	/**
	 * Parse the given content `string` as a single string.
	 *
	 * @param  {String} `string`
	 * @param  {Object} `env`
	 * @return {Array} Array of tokens
	 */
	
	Remarkable.prototype.parseInline = function (str, env) {
	  var state = new StateCore(this, str, env);
	  state.inlineMode = true;
	  this.core.process(state);
	  return state.tokens;
	};
	
	/**
	 * Render a single content `string`, without wrapping it
	 * to paragraphs
	 *
	 * @param  {String} `str`
	 * @param  {Object} `env`
	 * @return {String}
	 */
	
	Remarkable.prototype.renderInline = function (str, env) {
	  env = env || {};
	  return this.renderer.render(this.parseInline(str, env), this.options, env);
	};
	
	/**
	 * Expose `Remarkable`
	 */
	
	module.exports = Remarkable;
	
	/**
	 * Expose `utils`, Useful helper functions for custom
	 * rendering.
	 */
	
	module.exports.utils = __webpack_require__(3);


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Local dependencies
	 */
	
	var Ruler      = __webpack_require__(8);
	var StateBlock = __webpack_require__(135);
	
	/**
	 * Parser rules
	 */
	
	var _rules = [
	  [ 'code',       __webpack_require__(125) ],
	  [ 'fences',     __webpack_require__(127),     [ 'paragraph', 'blockquote', 'list' ] ],
	  [ 'blockquote', __webpack_require__(124), [ 'paragraph', 'blockquote', 'list' ] ],
	  [ 'hr',         __webpack_require__(130),         [ 'paragraph', 'blockquote', 'list' ] ],
	  [ 'list',       __webpack_require__(133),       [ 'paragraph', 'blockquote' ] ],
	  [ 'footnote',   __webpack_require__(128),   [ 'paragraph' ] ],
	  [ 'heading',    __webpack_require__(129),    [ 'paragraph', 'blockquote' ] ],
	  [ 'lheading',   __webpack_require__(132) ],
	  [ 'htmlblock',  __webpack_require__(131),  [ 'paragraph', 'blockquote' ] ],
	  [ 'table',      __webpack_require__(136),      [ 'paragraph' ] ],
	  [ 'deflist',    __webpack_require__(126),    [ 'paragraph' ] ],
	  [ 'paragraph',  __webpack_require__(134) ]
	];
	
	/**
	 * Block Parser class
	 *
	 * @api private
	 */
	
	function ParserBlock() {
	  this.ruler = new Ruler();
	  for (var i = 0; i < _rules.length; i++) {
	    this.ruler.push(_rules[i][0], _rules[i][1], {
	      alt: (_rules[i][2] || []).slice()
	    });
	  }
	}
	
	/**
	 * Generate tokens for the given input range.
	 *
	 * @param  {Object} `state` Has properties like `src`, `parser`, `options` etc
	 * @param  {Number} `startLine`
	 * @param  {Number} `endLine`
	 * @api private
	 */
	
	ParserBlock.prototype.tokenize = function (state, startLine, endLine) {
	  var rules = this.ruler.getRules('');
	  var len = rules.length;
	  var line = startLine;
	  var hasEmptyLines = false;
	  var ok, i;
	
	  while (line < endLine) {
	    state.line = line = state.skipEmptyLines(line);
	    if (line >= endLine) {
	      break;
	    }
	
	    // Termination condition for nested calls.
	    // Nested calls currently used for blockquotes & lists
	    if (state.tShift[line] < state.blkIndent) {
	      break;
	    }
	
	    // Try all possible rules.
	    // On success, rule should:
	    //
	    // - update `state.line`
	    // - update `state.tokens`
	    // - return true
	
	    for (i = 0; i < len; i++) {
	      ok = rules[i](state, line, endLine, false);
	      if (ok) {
	        break;
	      }
	    }
	
	    // set state.tight iff we had an empty line before current tag
	    // i.e. latest empty line should not count
	    state.tight = !hasEmptyLines;
	
	    // paragraph might "eat" one newline after it in nested lists
	    if (state.isEmpty(state.line - 1)) {
	      hasEmptyLines = true;
	    }
	
	    line = state.line;
	
	    if (line < endLine && state.isEmpty(line)) {
	      hasEmptyLines = true;
	      line++;
	
	      // two empty lines should stop the parser in list mode
	      if (line < endLine && state.parentType === 'list' && state.isEmpty(line)) { break; }
	      state.line = line;
	    }
	  }
	};
	
	var TABS_SCAN_RE = /[\n\t]/g;
	var NEWLINES_RE  = /\r[\n\u0085]|[\u2424\u2028\u0085]/g;
	var SPACES_RE    = /\u00a0/g;
	
	/**
	 * Tokenize the given `str`.
	 *
	 * @param  {String} `str` Source string
	 * @param  {Object} `options`
	 * @param  {Object} `env`
	 * @param  {Array} `outTokens`
	 * @api private
	 */
	
	ParserBlock.prototype.parse = function (str, options, env, outTokens) {
	  var state, lineStart = 0, lastTabPos = 0;
	  if (!str) { return []; }
	
	  // Normalize spaces
	  str = str.replace(SPACES_RE, ' ');
	
	  // Normalize newlines
	  str = str.replace(NEWLINES_RE, '\n');
	
	  // Replace tabs with proper number of spaces (1..4)
	  if (str.indexOf('\t') >= 0) {
	    str = str.replace(TABS_SCAN_RE, function (match, offset) {
	      var result;
	      if (str.charCodeAt(offset) === 0x0A) {
	        lineStart = offset + 1;
	        lastTabPos = 0;
	        return match;
	      }
	      result = '    '.slice((offset - lineStart - lastTabPos) % 4);
	      lastTabPos = offset - lineStart + 1;
	      return result;
	    });
	  }
	
	  state = new StateBlock(str, this, options, env, outTokens);
	  this.tokenize(state, state.line, state.lineMax);
	};
	
	/**
	 * Expose `ParserBlock`
	 */
	
	module.exports = ParserBlock;


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Local dependencies
	 */
	
	var Ruler = __webpack_require__(8);
	
	/**
	 * Core parser `rules`
	 */
	
	var _rules = [
	  [ 'block',          __webpack_require__(139)          ],
	  [ 'abbr',           __webpack_require__(137)           ],
	  [ 'references',     __webpack_require__(143)     ],
	  [ 'inline',         __webpack_require__(141)         ],
	  [ 'footnote_tail',  __webpack_require__(140)  ],
	  [ 'abbr2',          __webpack_require__(138)          ],
	  [ 'replacements',   __webpack_require__(144)   ],
	  [ 'smartquotes',    __webpack_require__(145)    ],
	  [ 'linkify',        __webpack_require__(142)        ]
	];
	
	/**
	 * Class for top level (`core`) parser rules
	 *
	 * @api private
	 */
	
	function Core() {
	  this.options = {};
	  this.ruler = new Ruler();
	  for (var i = 0; i < _rules.length; i++) {
	    this.ruler.push(_rules[i][0], _rules[i][1]);
	  }
	}
	
	/**
	 * Process rules with the given `state`
	 *
	 * @param  {Object} `state`
	 * @api private
	 */
	
	Core.prototype.process = function (state) {
	  var i, l, rules;
	  rules = this.ruler.getRules('');
	  for (i = 0, l = rules.length; i < l; i++) {
	    rules[i](state);
	  }
	};
	
	/**
	 * Expose `Core`
	 */
	
	module.exports = Core;


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Local dependencies
	 */
	
	var Ruler       = __webpack_require__(8);
	var StateInline = __webpack_require__(12);
	var utils       = __webpack_require__(3);
	
	/**
	 * Inline Parser `rules`
	 */
	
	var _rules = [
	  [ 'text',            __webpack_require__(161) ],
	  [ 'newline',         __webpack_require__(158) ],
	  [ 'escape',          __webpack_require__(151) ],
	  [ 'backticks',       __webpack_require__(147) ],
	  [ 'del',             __webpack_require__(148) ],
	  [ 'ins',             __webpack_require__(155) ],
	  [ 'mark',            __webpack_require__(157) ],
	  [ 'emphasis',        __webpack_require__(149) ],
	  [ 'sub',             __webpack_require__(159) ],
	  [ 'sup',             __webpack_require__(160) ],
	  [ 'links',           __webpack_require__(156) ],
	  [ 'footnote_inline', __webpack_require__(152) ],
	  [ 'footnote_ref',    __webpack_require__(153) ],
	  [ 'autolink',        __webpack_require__(146) ],
	  [ 'htmltag',         __webpack_require__(154) ],
	  [ 'entity',          __webpack_require__(150) ]
	];
	
	/**
	 * Inline Parser class. Note that link validation is stricter
	 * in Remarkable than what is specified by CommonMark. If you
	 * want to change this you can use a custom validator.
	 *
	 * @api private
	 */
	
	function ParserInline() {
	  this.ruler = new Ruler();
	  for (var i = 0; i < _rules.length; i++) {
	    this.ruler.push(_rules[i][0], _rules[i][1]);
	  }
	
	  // Can be overridden with a custom validator
	  this.validateLink = validateLink;
	}
	
	/**
	 * Skip a single token by running all rules in validation mode.
	 * Returns `true` if any rule reports success.
	 *
	 * @param  {Object} `state`
	 * @api privage
	 */
	
	ParserInline.prototype.skipToken = function (state) {
	  var rules = this.ruler.getRules('');
	  var len = rules.length;
	  var pos = state.pos;
	  var i, cached_pos;
	
	  if ((cached_pos = state.cacheGet(pos)) > 0) {
	    state.pos = cached_pos;
	    return;
	  }
	
	  for (i = 0; i < len; i++) {
	    if (rules[i](state, true)) {
	      state.cacheSet(pos, state.pos);
	      return;
	    }
	  }
	
	  state.pos++;
	  state.cacheSet(pos, state.pos);
	};
	
	/**
	 * Generate tokens for the given input range.
	 *
	 * @param  {Object} `state`
	 * @api private
	 */
	
	ParserInline.prototype.tokenize = function (state) {
	  var rules = this.ruler.getRules('');
	  var len = rules.length;
	  var end = state.posMax;
	  var ok, i;
	
	  while (state.pos < end) {
	
	    // Try all possible rules.
	    // On success, the rule should:
	    //
	    // - update `state.pos`
	    // - update `state.tokens`
	    // - return true
	    for (i = 0; i < len; i++) {
	      ok = rules[i](state, false);
	
	      if (ok) {
	        break;
	      }
	    }
	
	    if (ok) {
	      if (state.pos >= end) { break; }
	      continue;
	    }
	
	    state.pending += state.src[state.pos++];
	  }
	
	  if (state.pending) {
	    state.pushPending();
	  }
	};
	
	/**
	 * Parse the given input string.
	 *
	 * @param  {String} `str`
	 * @param  {Object} `options`
	 * @param  {Object} `env`
	 * @param  {Array} `outTokens`
	 * @api private
	 */
	
	ParserInline.prototype.parse = function (str, options, env, outTokens) {
	  var state = new StateInline(str, this, options, env, outTokens);
	  this.tokenize(state);
	};
	
	/**
	 * Validate the given `url` by checking for bad protocols.
	 *
	 * @param  {String} `url`
	 * @return {Boolean}
	 */
	
	function validateLink(url) {
	  var BAD_PROTOCOLS = [ 'vbscript', 'javascript', 'file', 'data' ];
	  var str = url.trim().toLowerCase();
	  // Care about digital entities "javascript&#x3A;alert(1)"
	  str = utils.replaceEntities(str);
	  if (str.indexOf(':') !== -1 && BAD_PROTOCOLS.indexOf(str.split(':')[0]) !== -1) {
	    return false;
	  }
	  return true;
	}
	
	/**
	 * Expose `ParserInline`
	 */
	
	module.exports = ParserInline;


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Local dependencies
	 */
	
	var utils = __webpack_require__(3);
	var rules = __webpack_require__(123);
	
	/**
	 * Expose `Renderer`
	 */
	
	module.exports = Renderer;
	
	/**
	 * Renderer class. Renders HTML and exposes `rules` to allow
	 * local modifications.
	 */
	
	function Renderer() {
	  this.rules = utils.assign({}, rules);
	
	  // exported helper, for custom rules only
	  this.getBreak = rules.getBreak;
	}
	
	/**
	 * Render a string of inline HTML with the given `tokens` and
	 * `options`.
	 *
	 * @param  {Array} `tokens`
	 * @param  {Object} `options`
	 * @param  {Object} `env`
	 * @return {String}
	 * @api public
	 */
	
	Renderer.prototype.renderInline = function (tokens, options, env) {
	  var _rules = this.rules;
	  var len = tokens.length, i = 0;
	  var result = '';
	
	  while (len--) {
	    result += _rules[tokens[i].type](tokens, i++, options, env, this);
	  }
	
	  return result;
	};
	
	/**
	 * Render a string of HTML with the given `tokens` and
	 * `options`.
	 *
	 * @param  {Array} `tokens`
	 * @param  {Object} `options`
	 * @param  {Object} `env`
	 * @return {String}
	 * @api public
	 */
	
	Renderer.prototype.render = function (tokens, options, env) {
	  var _rules = this.rules;
	  var len = tokens.length, i = -1;
	  var result = '';
	
	  while (++i < len) {
	    if (tokens[i].type === 'inline') {
	      result += this.renderInline(tokens[i].children, options, env);
	    } else {
	      result += _rules[tokens[i].type](tokens, i, options, env, this);
	    }
	  }
	  return result;
	};


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Local dependencies
	 */
	
	var has             = __webpack_require__(3).has;
	var unescapeMd      = __webpack_require__(3).unescapeMd;
	var replaceEntities = __webpack_require__(3).replaceEntities;
	var escapeHtml      = __webpack_require__(3).escapeHtml;
	
	/**
	 * Renderer rules cache
	 */
	
	var rules = {};
	
	/**
	 * Blockquotes
	 */
	
	rules.blockquote_open = function(/* tokens, idx, options, env */) {
	  return '<blockquote>\n';
	};
	
	rules.blockquote_close = function(tokens, idx /*, options, env */) {
	  return '</blockquote>' + getBreak(tokens, idx);
	};
	
	/**
	 * Code
	 */
	
	rules.code = function(tokens, idx /*, options, env */) {
	  if (tokens[idx].block) {
	    return '<pre><code>' + escapeHtml(tokens[idx].content) + '</code></pre>' + getBreak(tokens, idx);
	  }
	  return '<code>' + escapeHtml(tokens[idx].content) + '</code>';
	};
	
	/**
	 * Fenced code blocks
	 */
	
	rules.fence = function(tokens, idx, options, env, instance) {
	  var token = tokens[idx];
	  var langClass = '';
	  var langPrefix = options.langPrefix;
	  var langName = '', fences, fenceName;
	  var highlighted;
	
	  if (token.params) {
	
	    //
	    // ```foo bar
	    //
	    // Try custom renderer "foo" first. That will simplify overwrite
	    // for diagrams, latex, and any other fenced block with custom look
	    //
	
	    fences = token.params.split(/\s+/g);
	    fenceName = fences.join(' ');
	
	    if (has(instance.rules.fence_custom, fences[0])) {
	      return instance.rules.fence_custom[fences[0]](tokens, idx, options, env, instance);
	    }
	
	    langName = escapeHtml(replaceEntities(unescapeMd(fenceName)));
	    langClass = ' class="' + langPrefix + langName + '"';
	  }
	
	  if (options.highlight) {
	    highlighted = options.highlight.apply(options.highlight, [ token.content ].concat(fences))
	      || escapeHtml(token.content);
	  } else {
	    highlighted = escapeHtml(token.content);
	  }
	
	  return '<pre><code' + langClass + '>'
	        + highlighted
	        + '</code></pre>'
	        + getBreak(tokens, idx);
	};
	
	rules.fence_custom = {};
	
	/**
	 * Headings
	 */
	
	rules.heading_open = function(tokens, idx /*, options, env */) {
	  return '<h' + tokens[idx].hLevel + '>';
	};
	rules.heading_close = function(tokens, idx /*, options, env */) {
	  return '</h' + tokens[idx].hLevel + '>\n';
	};
	
	/**
	 * Horizontal rules
	 */
	
	rules.hr = function(tokens, idx, options /*, env */) {
	  return (options.xhtmlOut ? '<hr />' : '<hr>') + getBreak(tokens, idx);
	};
	
	/**
	 * Bullets
	 */
	
	rules.bullet_list_open = function(/* tokens, idx, options, env */) {
	  return '<ul>\n';
	};
	rules.bullet_list_close = function(tokens, idx /*, options, env */) {
	  return '</ul>' + getBreak(tokens, idx);
	};
	
	/**
	 * List items
	 */
	
	rules.list_item_open = function(/* tokens, idx, options, env */) {
	  return '<li>';
	};
	rules.list_item_close = function(/* tokens, idx, options, env */) {
	  return '</li>\n';
	};
	
	/**
	 * Ordered list items
	 */
	
	rules.ordered_list_open = function(tokens, idx /*, options, env */) {
	  var token = tokens[idx];
	  var order = token.order > 1 ? ' start="' + token.order + '"' : '';
	  return '<ol' + order + '>\n';
	};
	rules.ordered_list_close = function(tokens, idx /*, options, env */) {
	  return '</ol>' + getBreak(tokens, idx);
	};
	
	/**
	 * Paragraphs
	 */
	
	rules.paragraph_open = function(tokens, idx /*, options, env */) {
	  return tokens[idx].tight ? '' : '<p>';
	};
	rules.paragraph_close = function(tokens, idx /*, options, env */) {
	  var addBreak = !(tokens[idx].tight && idx && tokens[idx - 1].type === 'inline' && !tokens[idx - 1].content);
	  return (tokens[idx].tight ? '' : '</p>') + (addBreak ? getBreak(tokens, idx) : '');
	};
	
	/**
	 * Links
	 */
	
	rules.link_open = function(tokens, idx, options /* env */) {
	  var title = tokens[idx].title ? (' title="' + escapeHtml(replaceEntities(tokens[idx].title)) + '"') : '';
	  var target = options.linkTarget ? (' target="' + options.linkTarget + '"') : '';
	  return '<a href="' + escapeHtml(tokens[idx].href) + '"' + title + target + '>';
	};
	rules.link_close = function(/* tokens, idx, options, env */) {
	  return '</a>';
	};
	
	/**
	 * Images
	 */
	
	rules.image = function(tokens, idx, options /*, env */) {
	  var src = ' src="' + escapeHtml(tokens[idx].src) + '"';
	  var title = tokens[idx].title ? (' title="' + escapeHtml(replaceEntities(tokens[idx].title)) + '"') : '';
	  var alt = ' alt="' + (tokens[idx].alt ? escapeHtml(replaceEntities(unescapeMd(tokens[idx].alt))) : '') + '"';
	  var suffix = options.xhtmlOut ? ' /' : '';
	  return '<img' + src + alt + title + suffix + '>';
	};
	
	/**
	 * Tables
	 */
	
	rules.table_open = function(/* tokens, idx, options, env */) {
	  return '<table>\n';
	};
	rules.table_close = function(/* tokens, idx, options, env */) {
	  return '</table>\n';
	};
	rules.thead_open = function(/* tokens, idx, options, env */) {
	  return '<thead>\n';
	};
	rules.thead_close = function(/* tokens, idx, options, env */) {
	  return '</thead>\n';
	};
	rules.tbody_open = function(/* tokens, idx, options, env */) {
	  return '<tbody>\n';
	};
	rules.tbody_close = function(/* tokens, idx, options, env */) {
	  return '</tbody>\n';
	};
	rules.tr_open = function(/* tokens, idx, options, env */) {
	  return '<tr>';
	};
	rules.tr_close = function(/* tokens, idx, options, env */) {
	  return '</tr>\n';
	};
	rules.th_open = function(tokens, idx /*, options, env */) {
	  var token = tokens[idx];
	  return '<th'
	    + (token.align ? ' style="text-align:' + token.align + '"' : '')
	    + '>';
	};
	rules.th_close = function(/* tokens, idx, options, env */) {
	  return '</th>';
	};
	rules.td_open = function(tokens, idx /*, options, env */) {
	  var token = tokens[idx];
	  return '<td'
	    + (token.align ? ' style="text-align:' + token.align + '"' : '')
	    + '>';
	};
	rules.td_close = function(/* tokens, idx, options, env */) {
	  return '</td>';
	};
	
	/**
	 * Bold
	 */
	
	rules.strong_open = function(/* tokens, idx, options, env */) {
	  return '<strong>';
	};
	rules.strong_close = function(/* tokens, idx, options, env */) {
	  return '</strong>';
	};
	
	/**
	 * Italicize
	 */
	
	rules.em_open = function(/* tokens, idx, options, env */) {
	  return '<em>';
	};
	rules.em_close = function(/* tokens, idx, options, env */) {
	  return '</em>';
	};
	
	/**
	 * Strikethrough
	 */
	
	rules.del_open = function(/* tokens, idx, options, env */) {
	  return '<del>';
	};
	rules.del_close = function(/* tokens, idx, options, env */) {
	  return '</del>';
	};
	
	/**
	 * Insert
	 */
	
	rules.ins_open = function(/* tokens, idx, options, env */) {
	  return '<ins>';
	};
	rules.ins_close = function(/* tokens, idx, options, env */) {
	  return '</ins>';
	};
	
	/**
	 * Highlight
	 */
	
	rules.mark_open = function(/* tokens, idx, options, env */) {
	  return '<mark>';
	};
	rules.mark_close = function(/* tokens, idx, options, env */) {
	  return '</mark>';
	};
	
	/**
	 * Super- and sub-script
	 */
	
	rules.sub = function(tokens, idx /*, options, env */) {
	  return '<sub>' + escapeHtml(tokens[idx].content) + '</sub>';
	};
	rules.sup = function(tokens, idx /*, options, env */) {
	  return '<sup>' + escapeHtml(tokens[idx].content) + '</sup>';
	};
	
	/**
	 * Breaks
	 */
	
	rules.hardbreak = function(tokens, idx, options /*, env */) {
	  return options.xhtmlOut ? '<br />\n' : '<br>\n';
	};
	rules.softbreak = function(tokens, idx, options /*, env */) {
	  return options.breaks ? (options.xhtmlOut ? '<br />\n' : '<br>\n') : '\n';
	};
	
	/**
	 * Text
	 */
	
	rules.text = function(tokens, idx /*, options, env */) {
	  return escapeHtml(tokens[idx].content);
	};
	
	/**
	 * Content
	 */
	
	rules.htmlblock = function(tokens, idx /*, options, env */) {
	  return tokens[idx].content;
	};
	rules.htmltag = function(tokens, idx /*, options, env */) {
	  return tokens[idx].content;
	};
	
	/**
	 * Abbreviations, initialism
	 */
	
	rules.abbr_open = function(tokens, idx /*, options, env */) {
	  return '<abbr title="' + escapeHtml(replaceEntities(tokens[idx].title)) + '">';
	};
	rules.abbr_close = function(/* tokens, idx, options, env */) {
	  return '</abbr>';
	};
	
	/**
	 * Footnotes
	 */
	
	rules.footnote_ref = function(tokens, idx) {
	  var n = Number(tokens[idx].id + 1).toString();
	  var id = 'fnref' + n;
	  if (tokens[idx].subId > 0) {
	    id += ':' + tokens[idx].subId;
	  }
	  return '<sup class="footnote-ref"><a href="#fn' + n + '" id="' + id + '">[' + n + ']</a></sup>';
	};
	rules.footnote_block_open = function(tokens, idx, options) {
	  var hr = options.xhtmlOut
	    ? '<hr class="footnotes-sep" />\n'
	    : '<hr class="footnotes-sep">\n';
	  return hr + '<section class="footnotes">\n<ol class="footnotes-list">\n';
	};
	rules.footnote_block_close = function() {
	  return '</ol>\n</section>\n';
	};
	rules.footnote_open = function(tokens, idx) {
	  var id = Number(tokens[idx].id + 1).toString();
	  return '<li id="fn' + id + '"  class="footnote-item">';
	};
	rules.footnote_close = function() {
	  return '</li>\n';
	};
	rules.footnote_anchor = function(tokens, idx) {
	  var n = Number(tokens[idx].id + 1).toString();
	  var id = 'fnref' + n;
	  if (tokens[idx].subId > 0) {
	    id += ':' + tokens[idx].subId;
	  }
	  return ' <a href="#' + id + '" class="footnote-backref">↩</a>';
	};
	
	/**
	 * Definition lists
	 */
	
	rules.dl_open = function() {
	  return '<dl>\n';
	};
	rules.dt_open = function() {
	  return '<dt>';
	};
	rules.dd_open = function() {
	  return '<dd>';
	};
	rules.dl_close = function() {
	  return '</dl>\n';
	};
	rules.dt_close = function() {
	  return '</dt>\n';
	};
	rules.dd_close = function() {
	  return '</dd>\n';
	};
	
	/**
	 * Helper functions
	 */
	
	function nextToken(tokens, idx) {
	  if (++idx >= tokens.length - 2) {
	    return idx;
	  }
	  if ((tokens[idx].type === 'paragraph_open' && tokens[idx].tight) &&
	      (tokens[idx + 1].type === 'inline' && tokens[idx + 1].content.length === 0) &&
	      (tokens[idx + 2].type === 'paragraph_close' && tokens[idx + 2].tight)) {
	    return nextToken(tokens, idx + 2);
	  }
	  return idx;
	}
	
	/**
	 * Check to see if `\n` is needed before the next token.
	 *
	 * @param  {Array} `tokens`
	 * @param  {Number} `idx`
	 * @return {String} Empty string or newline
	 * @api private
	 */
	
	var getBreak = rules.getBreak = function getBreak(tokens, idx) {
	  idx = nextToken(tokens, idx);
	  if (idx < tokens.length && tokens[idx].type === 'list_item_close') {
	    return '';
	  }
	  return '\n';
	};
	
	/**
	 * Expose `rules`
	 */
	
	module.exports = rules;


/***/ },
/* 124 */
/***/ function(module, exports) {

	// Block quotes
	
	'use strict';
	
	
	module.exports = function blockquote(state, startLine, endLine, silent) {
	  var nextLine, lastLineEmpty, oldTShift, oldBMarks, oldIndent, oldParentType, lines,
	      terminatorRules,
	      i, l, terminate,
	      pos = state.bMarks[startLine] + state.tShift[startLine],
	      max = state.eMarks[startLine];
	
	  if (pos > max) { return false; }
	
	  // check the block quote marker
	  if (state.src.charCodeAt(pos++) !== 0x3E/* > */) { return false; }
	
	  if (state.level >= state.options.maxNesting) { return false; }
	
	  // we know that it's going to be a valid blockquote,
	  // so no point trying to find the end of it in silent mode
	  if (silent) { return true; }
	
	  // skip one optional space after '>'
	  if (state.src.charCodeAt(pos) === 0x20) { pos++; }
	
	  oldIndent = state.blkIndent;
	  state.blkIndent = 0;
	
	  oldBMarks = [ state.bMarks[startLine] ];
	  state.bMarks[startLine] = pos;
	
	  // check if we have an empty blockquote
	  pos = pos < max ? state.skipSpaces(pos) : pos;
	  lastLineEmpty = pos >= max;
	
	  oldTShift = [ state.tShift[startLine] ];
	  state.tShift[startLine] = pos - state.bMarks[startLine];
	
	  terminatorRules = state.parser.ruler.getRules('blockquote');
	
	  // Search the end of the block
	  //
	  // Block ends with either:
	  //  1. an empty line outside:
	  //     ```
	  //     > test
	  //
	  //     ```
	  //  2. an empty line inside:
	  //     ```
	  //     >
	  //     test
	  //     ```
	  //  3. another tag
	  //     ```
	  //     > test
	  //      - - -
	  //     ```
	  for (nextLine = startLine + 1; nextLine < endLine; nextLine++) {
	    pos = state.bMarks[nextLine] + state.tShift[nextLine];
	    max = state.eMarks[nextLine];
	
	    if (pos >= max) {
	      // Case 1: line is not inside the blockquote, and this line is empty.
	      break;
	    }
	
	    if (state.src.charCodeAt(pos++) === 0x3E/* > */) {
	      // This line is inside the blockquote.
	
	      // skip one optional space after '>'
	      if (state.src.charCodeAt(pos) === 0x20) { pos++; }
	
	      oldBMarks.push(state.bMarks[nextLine]);
	      state.bMarks[nextLine] = pos;
	
	      pos = pos < max ? state.skipSpaces(pos) : pos;
	      lastLineEmpty = pos >= max;
	
	      oldTShift.push(state.tShift[nextLine]);
	      state.tShift[nextLine] = pos - state.bMarks[nextLine];
	      continue;
	    }
	
	    // Case 2: line is not inside the blockquote, and the last line was empty.
	    if (lastLineEmpty) { break; }
	
	    // Case 3: another tag found.
	    terminate = false;
	    for (i = 0, l = terminatorRules.length; i < l; i++) {
	      if (terminatorRules[i](state, nextLine, endLine, true)) {
	        terminate = true;
	        break;
	      }
	    }
	    if (terminate) { break; }
	
	    oldBMarks.push(state.bMarks[nextLine]);
	    oldTShift.push(state.tShift[nextLine]);
	
	    // A negative number means that this is a paragraph continuation;
	    //
	    // Any negative number will do the job here, but it's better for it
	    // to be large enough to make any bugs obvious.
	    state.tShift[nextLine] = -1337;
	  }
	
	  oldParentType = state.parentType;
	  state.parentType = 'blockquote';
	  state.tokens.push({
	    type: 'blockquote_open',
	    lines: lines = [ startLine, 0 ],
	    level: state.level++
	  });
	  state.parser.tokenize(state, startLine, nextLine);
	  state.tokens.push({
	    type: 'blockquote_close',
	    level: --state.level
	  });
	  state.parentType = oldParentType;
	  lines[1] = state.line;
	
	  // Restore original tShift; this might not be necessary since the parser
	  // has already been here, but just to make sure we can do that.
	  for (i = 0; i < oldTShift.length; i++) {
	    state.bMarks[i + startLine] = oldBMarks[i];
	    state.tShift[i + startLine] = oldTShift[i];
	  }
	  state.blkIndent = oldIndent;
	
	  return true;
	};


/***/ },
/* 125 */
/***/ function(module, exports) {

	// Code block (4 spaces padded)
	
	'use strict';
	
	
	module.exports = function code(state, startLine, endLine/*, silent*/) {
	  var nextLine, last;
	
	  if (state.tShift[startLine] - state.blkIndent < 4) { return false; }
	
	  last = nextLine = startLine + 1;
	
	  while (nextLine < endLine) {
	    if (state.isEmpty(nextLine)) {
	      nextLine++;
	      continue;
	    }
	    if (state.tShift[nextLine] - state.blkIndent >= 4) {
	      nextLine++;
	      last = nextLine;
	      continue;
	    }
	    break;
	  }
	
	  state.line = nextLine;
	  state.tokens.push({
	    type: 'code',
	    content: state.getLines(startLine, last, 4 + state.blkIndent, true),
	    block: true,
	    lines: [ startLine, state.line ],
	    level: state.level
	  });
	
	  return true;
	};


/***/ },
/* 126 */
/***/ function(module, exports) {

	// Definition lists
	
	'use strict';
	
	
	// Search `[:~][\n ]`, returns next pos after marker on success
	// or -1 on fail.
	function skipMarker(state, line) {
	  var pos, marker,
	      start = state.bMarks[line] + state.tShift[line],
	      max = state.eMarks[line];
	
	  if (start >= max) { return -1; }
	
	  // Check bullet
	  marker = state.src.charCodeAt(start++);
	  if (marker !== 0x7E/* ~ */ && marker !== 0x3A/* : */) { return -1; }
	
	  pos = state.skipSpaces(start);
	
	  // require space after ":"
	  if (start === pos) { return -1; }
	
	  // no empty definitions, e.g. "  : "
	  if (pos >= max) { return -1; }
	
	  return pos;
	}
	
	function markTightParagraphs(state, idx) {
	  var i, l,
	      level = state.level + 2;
	
	  for (i = idx + 2, l = state.tokens.length - 2; i < l; i++) {
	    if (state.tokens[i].level === level && state.tokens[i].type === 'paragraph_open') {
	      state.tokens[i + 2].tight = true;
	      state.tokens[i].tight = true;
	      i += 2;
	    }
	  }
	}
	
	module.exports = function deflist(state, startLine, endLine, silent) {
	  var contentStart,
	      ddLine,
	      dtLine,
	      itemLines,
	      listLines,
	      listTokIdx,
	      nextLine,
	      oldIndent,
	      oldDDIndent,
	      oldParentType,
	      oldTShift,
	      oldTight,
	      prevEmptyEnd,
	      tight;
	
	  if (silent) {
	    // quirk: validation mode validates a dd block only, not a whole deflist
	    if (state.ddIndent < 0) { return false; }
	    return skipMarker(state, startLine) >= 0;
	  }
	
	  nextLine = startLine + 1;
	  if (state.isEmpty(nextLine)) {
	    if (++nextLine > endLine) { return false; }
	  }
	
	  if (state.tShift[nextLine] < state.blkIndent) { return false; }
	  contentStart = skipMarker(state, nextLine);
	  if (contentStart < 0) { return false; }
	
	  if (state.level >= state.options.maxNesting) { return false; }
	
	  // Start list
	  listTokIdx = state.tokens.length;
	
	  state.tokens.push({
	    type: 'dl_open',
	    lines: listLines = [ startLine, 0 ],
	    level: state.level++
	  });
	
	  //
	  // Iterate list items
	  //
	
	  dtLine = startLine;
	  ddLine = nextLine;
	
	  // One definition list can contain multiple DTs,
	  // and one DT can be followed by multiple DDs.
	  //
	  // Thus, there is two loops here, and label is
	  // needed to break out of the second one
	  //
	  /*eslint no-labels:0,block-scoped-var:0*/
	  OUTER:
	  for (;;) {
	    tight = true;
	    prevEmptyEnd = false;
	
	    state.tokens.push({
	      type: 'dt_open',
	      lines: [ dtLine, dtLine ],
	      level: state.level++
	    });
	    state.tokens.push({
	      type: 'inline',
	      content: state.getLines(dtLine, dtLine + 1, state.blkIndent, false).trim(),
	      level: state.level + 1,
	      lines: [ dtLine, dtLine ],
	      children: []
	    });
	    state.tokens.push({
	      type: 'dt_close',
	      level: --state.level
	    });
	
	    for (;;) {
	      state.tokens.push({
	        type: 'dd_open',
	        lines: itemLines = [ nextLine, 0 ],
	        level: state.level++
	      });
	
	      oldTight = state.tight;
	      oldDDIndent = state.ddIndent;
	      oldIndent = state.blkIndent;
	      oldTShift = state.tShift[ddLine];
	      oldParentType = state.parentType;
	      state.blkIndent = state.ddIndent = state.tShift[ddLine] + 2;
	      state.tShift[ddLine] = contentStart - state.bMarks[ddLine];
	      state.tight = true;
	      state.parentType = 'deflist';
	
	      state.parser.tokenize(state, ddLine, endLine, true);
	
	      // If any of list item is tight, mark list as tight
	      if (!state.tight || prevEmptyEnd) {
	        tight = false;
	      }
	      // Item become loose if finish with empty line,
	      // but we should filter last element, because it means list finish
	      prevEmptyEnd = (state.line - ddLine) > 1 && state.isEmpty(state.line - 1);
	
	      state.tShift[ddLine] = oldTShift;
	      state.tight = oldTight;
	      state.parentType = oldParentType;
	      state.blkIndent = oldIndent;
	      state.ddIndent = oldDDIndent;
	
	      state.tokens.push({
	        type: 'dd_close',
	        level: --state.level
	      });
	
	      itemLines[1] = nextLine = state.line;
	
	      if (nextLine >= endLine) { break OUTER; }
	
	      if (state.tShift[nextLine] < state.blkIndent) { break OUTER; }
	      contentStart = skipMarker(state, nextLine);
	      if (contentStart < 0) { break; }
	
	      ddLine = nextLine;
	
	      // go to the next loop iteration:
	      // insert DD tag and repeat checking
	    }
	
	    if (nextLine >= endLine) { break; }
	    dtLine = nextLine;
	
	    if (state.isEmpty(dtLine)) { break; }
	    if (state.tShift[dtLine] < state.blkIndent) { break; }
	
	    ddLine = dtLine + 1;
	    if (ddLine >= endLine) { break; }
	    if (state.isEmpty(ddLine)) { ddLine++; }
	    if (ddLine >= endLine) { break; }
	
	    if (state.tShift[ddLine] < state.blkIndent) { break; }
	    contentStart = skipMarker(state, ddLine);
	    if (contentStart < 0) { break; }
	
	    // go to the next loop iteration:
	    // insert DT and DD tags and repeat checking
	  }
	
	  // Finilize list
	  state.tokens.push({
	    type: 'dl_close',
	    level: --state.level
	  });
	  listLines[1] = nextLine;
	
	  state.line = nextLine;
	
	  // mark paragraphs tight if needed
	  if (tight) {
	    markTightParagraphs(state, listTokIdx);
	  }
	
	  return true;
	};


/***/ },
/* 127 */
/***/ function(module, exports) {

	// fences (``` lang, ~~~ lang)
	
	'use strict';
	
	
	module.exports = function fences(state, startLine, endLine, silent) {
	  var marker, len, params, nextLine, mem,
	      haveEndMarker = false,
	      pos = state.bMarks[startLine] + state.tShift[startLine],
	      max = state.eMarks[startLine];
	
	  if (pos + 3 > max) { return false; }
	
	  marker = state.src.charCodeAt(pos);
	
	  if (marker !== 0x7E/* ~ */ && marker !== 0x60 /* ` */) {
	    return false;
	  }
	
	  // scan marker length
	  mem = pos;
	  pos = state.skipChars(pos, marker);
	
	  len = pos - mem;
	
	  if (len < 3) { return false; }
	
	  params = state.src.slice(pos, max).trim();
	
	  if (params.indexOf('`') >= 0) { return false; }
	
	  // Since start is found, we can report success here in validation mode
	  if (silent) { return true; }
	
	  // search end of block
	  nextLine = startLine;
	
	  for (;;) {
	    nextLine++;
	    if (nextLine >= endLine) {
	      // unclosed block should be autoclosed by end of document.
	      // also block seems to be autoclosed by end of parent
	      break;
	    }
	
	    pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
	    max = state.eMarks[nextLine];
	
	    if (pos < max && state.tShift[nextLine] < state.blkIndent) {
	      // non-empty line with negative indent should stop the list:
	      // - ```
	      //  test
	      break;
	    }
	
	    if (state.src.charCodeAt(pos) !== marker) { continue; }
	
	    if (state.tShift[nextLine] - state.blkIndent >= 4) {
	      // closing fence should be indented less than 4 spaces
	      continue;
	    }
	
	    pos = state.skipChars(pos, marker);
	
	    // closing code fence must be at least as long as the opening one
	    if (pos - mem < len) { continue; }
	
	    // make sure tail has spaces only
	    pos = state.skipSpaces(pos);
	
	    if (pos < max) { continue; }
	
	    haveEndMarker = true;
	    // found!
	    break;
	  }
	
	  // If a fence has heading spaces, they should be removed from its inner block
	  len = state.tShift[startLine];
	
	  state.line = nextLine + (haveEndMarker ? 1 : 0);
	  state.tokens.push({
	    type: 'fence',
	    params: params,
	    content: state.getLines(startLine + 1, nextLine, len, true),
	    lines: [ startLine, state.line ],
	    level: state.level
	  });
	
	  return true;
	};


/***/ },
/* 128 */
/***/ function(module, exports) {

	// Process footnote reference list
	
	'use strict';
	
	
	module.exports = function footnote(state, startLine, endLine, silent) {
	  var oldBMark, oldTShift, oldParentType, pos, label,
	      start = state.bMarks[startLine] + state.tShift[startLine],
	      max = state.eMarks[startLine];
	
	  // line should be at least 5 chars - "[^x]:"
	  if (start + 4 > max) { return false; }
	
	  if (state.src.charCodeAt(start) !== 0x5B/* [ */) { return false; }
	  if (state.src.charCodeAt(start + 1) !== 0x5E/* ^ */) { return false; }
	  if (state.level >= state.options.maxNesting) { return false; }
	
	  for (pos = start + 2; pos < max; pos++) {
	    if (state.src.charCodeAt(pos) === 0x20) { return false; }
	    if (state.src.charCodeAt(pos) === 0x5D /* ] */) {
	      break;
	    }
	  }
	
	  if (pos === start + 2) { return false; } // no empty footnote labels
	  if (pos + 1 >= max || state.src.charCodeAt(++pos) !== 0x3A /* : */) { return false; }
	  if (silent) { return true; }
	  pos++;
	
	  if (!state.env.footnotes) { state.env.footnotes = {}; }
	  if (!state.env.footnotes.refs) { state.env.footnotes.refs = {}; }
	  label = state.src.slice(start + 2, pos - 2);
	  state.env.footnotes.refs[':' + label] = -1;
	
	  state.tokens.push({
	    type: 'footnote_reference_open',
	    label: label,
	    level: state.level++
	  });
	
	  oldBMark = state.bMarks[startLine];
	  oldTShift = state.tShift[startLine];
	  oldParentType = state.parentType;
	  state.tShift[startLine] = state.skipSpaces(pos) - pos;
	  state.bMarks[startLine] = pos;
	  state.blkIndent += 4;
	  state.parentType = 'footnote';
	
	  if (state.tShift[startLine] < state.blkIndent) {
	    state.tShift[startLine] += state.blkIndent;
	    state.bMarks[startLine] -= state.blkIndent;
	  }
	
	  state.parser.tokenize(state, startLine, endLine, true);
	
	  state.parentType = oldParentType;
	  state.blkIndent -= 4;
	  state.tShift[startLine] = oldTShift;
	  state.bMarks[startLine] = oldBMark;
	
	  state.tokens.push({
	    type: 'footnote_reference_close',
	    level: --state.level
	  });
	
	  return true;
	};


/***/ },
/* 129 */
/***/ function(module, exports) {

	// heading (#, ##, ...)
	
	'use strict';
	
	
	module.exports = function heading(state, startLine, endLine, silent) {
	  var ch, level, tmp,
	      pos = state.bMarks[startLine] + state.tShift[startLine],
	      max = state.eMarks[startLine];
	
	  if (pos >= max) { return false; }
	
	  ch  = state.src.charCodeAt(pos);
	
	  if (ch !== 0x23/* # */ || pos >= max) { return false; }
	
	  // count heading level
	  level = 1;
	  ch = state.src.charCodeAt(++pos);
	  while (ch === 0x23/* # */ && pos < max && level <= 6) {
	    level++;
	    ch = state.src.charCodeAt(++pos);
	  }
	
	  if (level > 6 || (pos < max && ch !== 0x20/* space */)) { return false; }
	
	  if (silent) { return true; }
	
	  // Let's cut tails like '    ###  ' from the end of string
	
	  max = state.skipCharsBack(max, 0x20, pos); // space
	  tmp = state.skipCharsBack(max, 0x23, pos); // #
	  if (tmp > pos && state.src.charCodeAt(tmp - 1) === 0x20/* space */) {
	    max = tmp;
	  }
	
	  state.line = startLine + 1;
	
	  state.tokens.push({ type: 'heading_open',
	    hLevel: level,
	    lines: [ startLine, state.line ],
	    level: state.level
	  });
	
	  // only if header is not empty
	  if (pos < max) {
	    state.tokens.push({
	      type: 'inline',
	      content: state.src.slice(pos, max).trim(),
	      level: state.level + 1,
	      lines: [ startLine, state.line ],
	      children: []
	    });
	  }
	  state.tokens.push({ type: 'heading_close', hLevel: level, level: state.level });
	
	  return true;
	};


/***/ },
/* 130 */
/***/ function(module, exports) {

	// Horizontal rule
	
	'use strict';
	
	
	module.exports = function hr(state, startLine, endLine, silent) {
	  var marker, cnt, ch,
	      pos = state.bMarks[startLine],
	      max = state.eMarks[startLine];
	
	  pos += state.tShift[startLine];
	
	  if (pos > max) { return false; }
	
	  marker = state.src.charCodeAt(pos++);
	
	  // Check hr marker
	  if (marker !== 0x2A/* * */ &&
	      marker !== 0x2D/* - */ &&
	      marker !== 0x5F/* _ */) {
	    return false;
	  }
	
	  // markers can be mixed with spaces, but there should be at least 3 one
	
	  cnt = 1;
	  while (pos < max) {
	    ch = state.src.charCodeAt(pos++);
	    if (ch !== marker && ch !== 0x20/* space */) { return false; }
	    if (ch === marker) { cnt++; }
	  }
	
	  if (cnt < 3) { return false; }
	
	  if (silent) { return true; }
	
	  state.line = startLine + 1;
	  state.tokens.push({
	    type: 'hr',
	    lines: [ startLine, state.line ],
	    level: state.level
	  });
	
	  return true;
	};


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	// HTML block
	
	'use strict';
	
	
	var block_names = __webpack_require__(112);
	
	
	var HTML_TAG_OPEN_RE = /^<([a-zA-Z]{1,15})[\s\/>]/;
	var HTML_TAG_CLOSE_RE = /^<\/([a-zA-Z]{1,15})[\s>]/;
	
	function isLetter(ch) {
	  /*eslint no-bitwise:0*/
	  var lc = ch | 0x20; // to lower case
	  return (lc >= 0x61/* a */) && (lc <= 0x7a/* z */);
	}
	
	module.exports = function htmlblock(state, startLine, endLine, silent) {
	  var ch, match, nextLine,
	      pos = state.bMarks[startLine],
	      max = state.eMarks[startLine],
	      shift = state.tShift[startLine];
	
	  pos += shift;
	
	  if (!state.options.html) { return false; }
	
	  if (shift > 3 || pos + 2 >= max) { return false; }
	
	  if (state.src.charCodeAt(pos) !== 0x3C/* < */) { return false; }
	
	  ch = state.src.charCodeAt(pos + 1);
	
	  if (ch === 0x21/* ! */ || ch === 0x3F/* ? */) {
	    // Directive start / comment start / processing instruction start
	    if (silent) { return true; }
	
	  } else if (ch === 0x2F/* / */ || isLetter(ch)) {
	
	    // Probably start or end of tag
	    if (ch === 0x2F/* \ */) {
	      // closing tag
	      match = state.src.slice(pos, max).match(HTML_TAG_CLOSE_RE);
	      if (!match) { return false; }
	    } else {
	      // opening tag
	      match = state.src.slice(pos, max).match(HTML_TAG_OPEN_RE);
	      if (!match) { return false; }
	    }
	    // Make sure tag name is valid
	    if (block_names[match[1].toLowerCase()] !== true) { return false; }
	    if (silent) { return true; }
	
	  } else {
	    return false;
	  }
	
	  // If we are here - we detected HTML block.
	  // Let's roll down till empty line (block end).
	  nextLine = startLine + 1;
	  while (nextLine < state.lineMax && !state.isEmpty(nextLine)) {
	    nextLine++;
	  }
	
	  state.line = nextLine;
	  state.tokens.push({
	    type: 'htmlblock',
	    level: state.level,
	    lines: [ startLine, state.line ],
	    content: state.getLines(startLine, nextLine, 0, true)
	  });
	
	  return true;
	};


/***/ },
/* 132 */
/***/ function(module, exports) {

	// lheading (---, ===)
	
	'use strict';
	
	
	module.exports = function lheading(state, startLine, endLine/*, silent*/) {
	  var marker, pos, max,
	      next = startLine + 1;
	
	  if (next >= endLine) { return false; }
	  if (state.tShift[next] < state.blkIndent) { return false; }
	
	  // Scan next line
	
	  if (state.tShift[next] - state.blkIndent > 3) { return false; }
	
	  pos = state.bMarks[next] + state.tShift[next];
	  max = state.eMarks[next];
	
	  if (pos >= max) { return false; }
	
	  marker = state.src.charCodeAt(pos);
	
	  if (marker !== 0x2D/* - */ && marker !== 0x3D/* = */) { return false; }
	
	  pos = state.skipChars(pos, marker);
	
	  pos = state.skipSpaces(pos);
	
	  if (pos < max) { return false; }
	
	  pos = state.bMarks[startLine] + state.tShift[startLine];
	
	  state.line = next + 1;
	  state.tokens.push({
	    type: 'heading_open',
	    hLevel: marker === 0x3D/* = */ ? 1 : 2,
	    lines: [ startLine, state.line ],
	    level: state.level
	  });
	  state.tokens.push({
	    type: 'inline',
	    content: state.src.slice(pos, state.eMarks[startLine]).trim(),
	    level: state.level + 1,
	    lines: [ startLine, state.line - 1 ],
	    children: []
	  });
	  state.tokens.push({
	    type: 'heading_close',
	    hLevel: marker === 0x3D/* = */ ? 1 : 2,
	    level: state.level
	  });
	
	  return true;
	};


/***/ },
/* 133 */
/***/ function(module, exports) {

	// Lists
	
	'use strict';
	
	
	// Search `[-+*][\n ]`, returns next pos arter marker on success
	// or -1 on fail.
	function skipBulletListMarker(state, startLine) {
	  var marker, pos, max;
	
	  pos = state.bMarks[startLine] + state.tShift[startLine];
	  max = state.eMarks[startLine];
	
	  if (pos >= max) { return -1; }
	
	  marker = state.src.charCodeAt(pos++);
	  // Check bullet
	  if (marker !== 0x2A/* * */ &&
	      marker !== 0x2D/* - */ &&
	      marker !== 0x2B/* + */) {
	    return -1;
	  }
	
	  if (pos < max && state.src.charCodeAt(pos) !== 0x20) {
	    // " 1.test " - is not a list item
	    return -1;
	  }
	
	  return pos;
	}
	
	// Search `\d+[.)][\n ]`, returns next pos arter marker on success
	// or -1 on fail.
	function skipOrderedListMarker(state, startLine) {
	  var ch,
	      pos = state.bMarks[startLine] + state.tShift[startLine],
	      max = state.eMarks[startLine];
	
	  if (pos + 1 >= max) { return -1; }
	
	  ch = state.src.charCodeAt(pos++);
	
	  if (ch < 0x30/* 0 */ || ch > 0x39/* 9 */) { return -1; }
	
	  for (;;) {
	    // EOL -> fail
	    if (pos >= max) { return -1; }
	
	    ch = state.src.charCodeAt(pos++);
	
	    if (ch >= 0x30/* 0 */ && ch <= 0x39/* 9 */) {
	      continue;
	    }
	
	    // found valid marker
	    if (ch === 0x29/* ) */ || ch === 0x2e/* . */) {
	      break;
	    }
	
	    return -1;
	  }
	
	
	  if (pos < max && state.src.charCodeAt(pos) !== 0x20/* space */) {
	    // " 1.test " - is not a list item
	    return -1;
	  }
	  return pos;
	}
	
	function markTightParagraphs(state, idx) {
	  var i, l,
	      level = state.level + 2;
	
	  for (i = idx + 2, l = state.tokens.length - 2; i < l; i++) {
	    if (state.tokens[i].level === level && state.tokens[i].type === 'paragraph_open') {
	      state.tokens[i + 2].tight = true;
	      state.tokens[i].tight = true;
	      i += 2;
	    }
	  }
	}
	
	
	module.exports = function list(state, startLine, endLine, silent) {
	  var nextLine,
	      indent,
	      oldTShift,
	      oldIndent,
	      oldTight,
	      oldParentType,
	      start,
	      posAfterMarker,
	      max,
	      indentAfterMarker,
	      markerValue,
	      markerCharCode,
	      isOrdered,
	      contentStart,
	      listTokIdx,
	      prevEmptyEnd,
	      listLines,
	      itemLines,
	      tight = true,
	      terminatorRules,
	      i, l, terminate;
	
	  // Detect list type and position after marker
	  if ((posAfterMarker = skipOrderedListMarker(state, startLine)) >= 0) {
	    isOrdered = true;
	  } else if ((posAfterMarker = skipBulletListMarker(state, startLine)) >= 0) {
	    isOrdered = false;
	  } else {
	    return false;
	  }
	
	  if (state.level >= state.options.maxNesting) { return false; }
	
	  // We should terminate list on style change. Remember first one to compare.
	  markerCharCode = state.src.charCodeAt(posAfterMarker - 1);
	
	  // For validation mode we can terminate immediately
	  if (silent) { return true; }
	
	  // Start list
	  listTokIdx = state.tokens.length;
	
	  if (isOrdered) {
	    start = state.bMarks[startLine] + state.tShift[startLine];
	    markerValue = Number(state.src.substr(start, posAfterMarker - start - 1));
	
	    state.tokens.push({
	      type: 'ordered_list_open',
	      order: markerValue,
	      lines: listLines = [ startLine, 0 ],
	      level: state.level++
	    });
	
	  } else {
	    state.tokens.push({
	      type: 'bullet_list_open',
	      lines: listLines = [ startLine, 0 ],
	      level: state.level++
	    });
	  }
	
	  //
	  // Iterate list items
	  //
	
	  nextLine = startLine;
	  prevEmptyEnd = false;
	  terminatorRules = state.parser.ruler.getRules('list');
	
	  while (nextLine < endLine) {
	    contentStart = state.skipSpaces(posAfterMarker);
	    max = state.eMarks[nextLine];
	
	    if (contentStart >= max) {
	      // trimming space in "-    \n  3" case, indent is 1 here
	      indentAfterMarker = 1;
	    } else {
	      indentAfterMarker = contentStart - posAfterMarker;
	    }
	
	    // If we have more than 4 spaces, the indent is 1
	    // (the rest is just indented code block)
	    if (indentAfterMarker > 4) { indentAfterMarker = 1; }
	
	    // If indent is less than 1, assume that it's one, example:
	    //  "-\n  test"
	    if (indentAfterMarker < 1) { indentAfterMarker = 1; }
	
	    // "  -  test"
	    //  ^^^^^ - calculating total length of this thing
	    indent = (posAfterMarker - state.bMarks[nextLine]) + indentAfterMarker;
	
	    // Run subparser & write tokens
	    state.tokens.push({
	      type: 'list_item_open',
	      lines: itemLines = [ startLine, 0 ],
	      level: state.level++
	    });
	
	    oldIndent = state.blkIndent;
	    oldTight = state.tight;
	    oldTShift = state.tShift[startLine];
	    oldParentType = state.parentType;
	    state.tShift[startLine] = contentStart - state.bMarks[startLine];
	    state.blkIndent = indent;
	    state.tight = true;
	    state.parentType = 'list';
	
	    state.parser.tokenize(state, startLine, endLine, true);
	
	    // If any of list item is tight, mark list as tight
	    if (!state.tight || prevEmptyEnd) {
	      tight = false;
	    }
	    // Item become loose if finish with empty line,
	    // but we should filter last element, because it means list finish
	    prevEmptyEnd = (state.line - startLine) > 1 && state.isEmpty(state.line - 1);
	
	    state.blkIndent = oldIndent;
	    state.tShift[startLine] = oldTShift;
	    state.tight = oldTight;
	    state.parentType = oldParentType;
	
	    state.tokens.push({
	      type: 'list_item_close',
	      level: --state.level
	    });
	
	    nextLine = startLine = state.line;
	    itemLines[1] = nextLine;
	    contentStart = state.bMarks[startLine];
	
	    if (nextLine >= endLine) { break; }
	
	    if (state.isEmpty(nextLine)) {
	      break;
	    }
	
	    //
	    // Try to check if list is terminated or continued.
	    //
	    if (state.tShift[nextLine] < state.blkIndent) { break; }
	
	    // fail if terminating block found
	    terminate = false;
	    for (i = 0, l = terminatorRules.length; i < l; i++) {
	      if (terminatorRules[i](state, nextLine, endLine, true)) {
	        terminate = true;
	        break;
	      }
	    }
	    if (terminate) { break; }
	
	    // fail if list has another type
	    if (isOrdered) {
	      posAfterMarker = skipOrderedListMarker(state, nextLine);
	      if (posAfterMarker < 0) { break; }
	    } else {
	      posAfterMarker = skipBulletListMarker(state, nextLine);
	      if (posAfterMarker < 0) { break; }
	    }
	
	    if (markerCharCode !== state.src.charCodeAt(posAfterMarker - 1)) { break; }
	  }
	
	  // Finilize list
	  state.tokens.push({
	    type: isOrdered ? 'ordered_list_close' : 'bullet_list_close',
	    level: --state.level
	  });
	  listLines[1] = nextLine;
	
	  state.line = nextLine;
	
	  // mark paragraphs tight if needed
	  if (tight) {
	    markTightParagraphs(state, listTokIdx);
	  }
	
	  return true;
	};


/***/ },
/* 134 */
/***/ function(module, exports) {

	// Paragraph
	
	'use strict';
	
	
	module.exports = function paragraph(state, startLine/*, endLine*/) {
	  var endLine, content, terminate, i, l,
	      nextLine = startLine + 1,
	      terminatorRules;
	
	  endLine = state.lineMax;
	
	  // jump line-by-line until empty one or EOF
	  if (nextLine < endLine && !state.isEmpty(nextLine)) {
	    terminatorRules = state.parser.ruler.getRules('paragraph');
	
	    for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
	      // this would be a code block normally, but after paragraph
	      // it's considered a lazy continuation regardless of what's there
	      if (state.tShift[nextLine] - state.blkIndent > 3) { continue; }
	
	      // Some tags can terminate paragraph without empty line.
	      terminate = false;
	      for (i = 0, l = terminatorRules.length; i < l; i++) {
	        if (terminatorRules[i](state, nextLine, endLine, true)) {
	          terminate = true;
	          break;
	        }
	      }
	      if (terminate) { break; }
	    }
	  }
	
	  content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
	
	  state.line = nextLine;
	  if (content.length) {
	    state.tokens.push({
	      type: 'paragraph_open',
	      tight: false,
	      lines: [ startLine, state.line ],
	      level: state.level
	    });
	    state.tokens.push({
	      type: 'inline',
	      content: content,
	      level: state.level + 1,
	      lines: [ startLine, state.line ],
	      children: []
	    });
	    state.tokens.push({
	      type: 'paragraph_close',
	      tight: false,
	      level: state.level
	    });
	  }
	
	  return true;
	};


/***/ },
/* 135 */
/***/ function(module, exports) {

	// Parser state class
	
	'use strict';
	
	
	function StateBlock(src, parser, options, env, tokens) {
	  var ch, s, start, pos, len, indent, indent_found;
	
	  this.src = src;
	
	  // Shortcuts to simplify nested calls
	  this.parser = parser;
	
	  this.options = options;
	
	  this.env = env;
	
	  //
	  // Internal state vartiables
	  //
	
	  this.tokens = tokens;
	
	  this.bMarks = [];  // line begin offsets for fast jumps
	  this.eMarks = [];  // line end offsets for fast jumps
	  this.tShift = [];  // indent for each line
	
	  // block parser variables
	  this.blkIndent  = 0; // required block content indent
	                       // (for example, if we are in list)
	  this.line       = 0; // line index in src
	  this.lineMax    = 0; // lines count
	  this.tight      = false;  // loose/tight mode for lists
	  this.parentType = 'root'; // if `list`, block parser stops on two newlines
	  this.ddIndent   = -1; // indent of the current dd block (-1 if there isn't any)
	
	  this.level = 0;
	
	  // renderer
	  this.result = '';
	
	  // Create caches
	  // Generate markers.
	  s = this.src;
	  indent = 0;
	  indent_found = false;
	
	  for (start = pos = indent = 0, len = s.length; pos < len; pos++) {
	    ch = s.charCodeAt(pos);
	
	    if (!indent_found) {
	      if (ch === 0x20/* space */) {
	        indent++;
	        continue;
	      } else {
	        indent_found = true;
	      }
	    }
	
	    if (ch === 0x0A || pos === len - 1) {
	      if (ch !== 0x0A) { pos++; }
	      this.bMarks.push(start);
	      this.eMarks.push(pos);
	      this.tShift.push(indent);
	
	      indent_found = false;
	      indent = 0;
	      start = pos + 1;
	    }
	  }
	
	  // Push fake entry to simplify cache bounds checks
	  this.bMarks.push(s.length);
	  this.eMarks.push(s.length);
	  this.tShift.push(0);
	
	  this.lineMax = this.bMarks.length - 1; // don't count last fake line
	}
	
	StateBlock.prototype.isEmpty = function isEmpty(line) {
	  return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
	};
	
	StateBlock.prototype.skipEmptyLines = function skipEmptyLines(from) {
	  for (var max = this.lineMax; from < max; from++) {
	    if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) {
	      break;
	    }
	  }
	  return from;
	};
	
	// Skip spaces from given position.
	StateBlock.prototype.skipSpaces = function skipSpaces(pos) {
	  for (var max = this.src.length; pos < max; pos++) {
	    if (this.src.charCodeAt(pos) !== 0x20/* space */) { break; }
	  }
	  return pos;
	};
	
	// Skip char codes from given position
	StateBlock.prototype.skipChars = function skipChars(pos, code) {
	  for (var max = this.src.length; pos < max; pos++) {
	    if (this.src.charCodeAt(pos) !== code) { break; }
	  }
	  return pos;
	};
	
	// Skip char codes reverse from given position - 1
	StateBlock.prototype.skipCharsBack = function skipCharsBack(pos, code, min) {
	  if (pos <= min) { return pos; }
	
	  while (pos > min) {
	    if (code !== this.src.charCodeAt(--pos)) { return pos + 1; }
	  }
	  return pos;
	};
	
	// cut lines range from source.
	StateBlock.prototype.getLines = function getLines(begin, end, indent, keepLastLF) {
	  var i, first, last, queue, shift,
	      line = begin;
	
	  if (begin >= end) {
	    return '';
	  }
	
	  // Opt: don't use push queue for single line;
	  if (line + 1 === end) {
	    first = this.bMarks[line] + Math.min(this.tShift[line], indent);
	    last = keepLastLF ? this.eMarks[line] + 1 : this.eMarks[line];
	    return this.src.slice(first, last);
	  }
	
	  queue = new Array(end - begin);
	
	  for (i = 0; line < end; line++, i++) {
	    shift = this.tShift[line];
	    if (shift > indent) { shift = indent; }
	    if (shift < 0) { shift = 0; }
	
	    first = this.bMarks[line] + shift;
	
	    if (line + 1 < end || keepLastLF) {
	      // No need for bounds check because we have fake entry on tail.
	      last = this.eMarks[line] + 1;
	    } else {
	      last = this.eMarks[line];
	    }
	
	    queue[i] = this.src.slice(first, last);
	  }
	
	  return queue.join('');
	};
	
	
	module.exports = StateBlock;


/***/ },
/* 136 */
/***/ function(module, exports) {

	// GFM table, non-standard
	
	'use strict';
	
	
	function getLine(state, line) {
	  var pos = state.bMarks[line] + state.blkIndent,
	      max = state.eMarks[line];
	
	  return state.src.substr(pos, max - pos);
	}
	
	module.exports = function table(state, startLine, endLine, silent) {
	  var ch, lineText, pos, i, nextLine, rows, cell,
	      aligns, t, tableLines, tbodyLines;
	
	  // should have at least three lines
	  if (startLine + 2 > endLine) { return false; }
	
	  nextLine = startLine + 1;
	
	  if (state.tShift[nextLine] < state.blkIndent) { return false; }
	
	  // first character of the second line should be '|' or '-'
	
	  pos = state.bMarks[nextLine] + state.tShift[nextLine];
	  if (pos >= state.eMarks[nextLine]) { return false; }
	
	  ch = state.src.charCodeAt(pos);
	  if (ch !== 0x7C/* | */ && ch !== 0x2D/* - */ && ch !== 0x3A/* : */) { return false; }
	
	  lineText = getLine(state, startLine + 1);
	  if (!/^[-:| ]+$/.test(lineText)) { return false; }
	
	  rows = lineText.split('|');
	  if (rows <= 2) { return false; }
	  aligns = [];
	  for (i = 0; i < rows.length; i++) {
	    t = rows[i].trim();
	    if (!t) {
	      // allow empty columns before and after table, but not in between columns;
	      // e.g. allow ` |---| `, disallow ` ---||--- `
	      if (i === 0 || i === rows.length - 1) {
	        continue;
	      } else {
	        return false;
	      }
	    }
	
	    if (!/^:?-+:?$/.test(t)) { return false; }
	    if (t.charCodeAt(t.length - 1) === 0x3A/* : */) {
	      aligns.push(t.charCodeAt(0) === 0x3A/* : */ ? 'center' : 'right');
	    } else if (t.charCodeAt(0) === 0x3A/* : */) {
	      aligns.push('left');
	    } else {
	      aligns.push('');
	    }
	  }
	
	  lineText = getLine(state, startLine).trim();
	  if (lineText.indexOf('|') === -1) { return false; }
	  rows = lineText.replace(/^\||\|$/g, '').split('|');
	  if (aligns.length !== rows.length) { return false; }
	  if (silent) { return true; }
	
	  state.tokens.push({
	    type: 'table_open',
	    lines: tableLines = [ startLine, 0 ],
	    level: state.level++
	  });
	  state.tokens.push({
	    type: 'thead_open',
	    lines: [ startLine, startLine + 1 ],
	    level: state.level++
	  });
	
	  state.tokens.push({
	    type: 'tr_open',
	    lines: [ startLine, startLine + 1 ],
	    level: state.level++
	  });
	  for (i = 0; i < rows.length; i++) {
	    state.tokens.push({
	      type: 'th_open',
	      align: aligns[i],
	      lines: [ startLine, startLine + 1 ],
	      level: state.level++
	    });
	    state.tokens.push({
	      type: 'inline',
	      content: rows[i].trim(),
	      lines: [ startLine, startLine + 1 ],
	      level: state.level,
	      children: []
	    });
	    state.tokens.push({ type: 'th_close', level: --state.level });
	  }
	  state.tokens.push({ type: 'tr_close', level: --state.level });
	  state.tokens.push({ type: 'thead_close', level: --state.level });
	
	  state.tokens.push({
	    type: 'tbody_open',
	    lines: tbodyLines = [ startLine + 2, 0 ],
	    level: state.level++
	  });
	
	  for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
	    if (state.tShift[nextLine] < state.blkIndent) { break; }
	
	    lineText = getLine(state, nextLine).trim();
	    if (lineText.indexOf('|') === -1) { break; }
	    rows = lineText.replace(/^\||\|$/g, '').split('|');
	
	    state.tokens.push({ type: 'tr_open', level: state.level++ });
	    for (i = 0; i < rows.length; i++) {
	      state.tokens.push({ type: 'td_open', align: aligns[i], level: state.level++ });
	      // 0x7c === '|'
	      cell = rows[i].substring(
	          rows[i].charCodeAt(0) === 0x7c ? 1 : 0,
	          rows[i].charCodeAt(rows[i].length - 1) === 0x7c ? rows[i].length - 1 : rows[i].length
	      ).trim();
	      state.tokens.push({
	        type: 'inline',
	        content: cell,
	        level: state.level,
	        children: []
	      });
	      state.tokens.push({ type: 'td_close', level: --state.level });
	    }
	    state.tokens.push({ type: 'tr_close', level: --state.level });
	  }
	  state.tokens.push({ type: 'tbody_close', level: --state.level });
	  state.tokens.push({ type: 'table_close', level: --state.level });
	
	  tableLines[1] = tbodyLines[1] = nextLine;
	  state.line = nextLine;
	  return true;
	};


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	// Parse abbreviation definitions, i.e. `*[abbr]: description`
	//
	
	'use strict';
	
	
	var StateInline    = __webpack_require__(12);
	var parseLinkLabel = __webpack_require__(7);
	
	
	function parseAbbr(str, parserInline, options, env) {
	  var state, labelEnd, pos, max, label, title;
	
	  if (str.charCodeAt(0) !== 0x2A/* * */) { return -1; }
	  if (str.charCodeAt(1) !== 0x5B/* [ */) { return -1; }
	
	  if (str.indexOf(']:') === -1) { return -1; }
	
	  state = new StateInline(str, parserInline, options, env, []);
	  labelEnd = parseLinkLabel(state, 1);
	
	  if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 0x3A/* : */) { return -1; }
	
	  max = state.posMax;
	
	  // abbr title is always one line, so looking for ending "\n" here
	  for (pos = labelEnd + 2; pos < max; pos++) {
	    if (state.src.charCodeAt(pos) === 0x0A) { break; }
	  }
	
	  label = str.slice(2, labelEnd);
	  title = str.slice(labelEnd + 2, pos).trim();
	  if (title.length === 0) { return -1; }
	  if (!env.abbreviations) { env.abbreviations = {}; }
	  // prepend ':' to avoid conflict with Object.prototype members
	  if (typeof env.abbreviations[':' + label] === 'undefined') {
	    env.abbreviations[':' + label] = title;
	  }
	
	  return pos;
	}
	
	module.exports = function abbr(state) {
	  var tokens = state.tokens, i, l, content, pos;
	
	  if (state.inlineMode) {
	    return;
	  }
	
	  // Parse inlines
	  for (i = 1, l = tokens.length - 1; i < l; i++) {
	    if (tokens[i - 1].type === 'paragraph_open' &&
	        tokens[i].type === 'inline' &&
	        tokens[i + 1].type === 'paragraph_close') {
	
	      content = tokens[i].content;
	      while (content.length) {
	        pos = parseAbbr(content, state.inline, state.options, state.env);
	        if (pos < 0) { break; }
	        content = content.slice(pos).trim();
	      }
	
	      tokens[i].content = content;
	      if (!content.length) {
	        tokens[i - 1].tight = true;
	        tokens[i + 1].tight = true;
	      }
	    }
	  }
	};


/***/ },
/* 138 */
/***/ function(module, exports) {

	// Enclose abbreviations in <abbr> tags
	//
	'use strict';
	
	
	var PUNCT_CHARS = ' \n()[]\'".,!?-';
	
	
	// from Google closure library
	// http://closure-library.googlecode.com/git-history/docs/local_closure_goog_string_string.js.source.html#line1021
	function regEscape(s) {
	  return s.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1');
	}
	
	
	module.exports = function abbr2(state) {
	  var i, j, l, tokens, token, text, nodes, pos, level, reg, m, regText,
	      blockTokens = state.tokens;
	
	  if (!state.env.abbreviations) { return; }
	  if (!state.env.abbrRegExp) {
	    regText = '(^|[' + PUNCT_CHARS.split('').map(regEscape).join('') + '])'
	            + '(' + Object.keys(state.env.abbreviations).map(function (x) {
	                      return x.substr(1);
	                    }).sort(function (a, b) {
	                      return b.length - a.length;
	                    }).map(regEscape).join('|') + ')'
	            + '($|[' + PUNCT_CHARS.split('').map(regEscape).join('') + '])';
	    state.env.abbrRegExp = new RegExp(regText, 'g');
	  }
	  reg = state.env.abbrRegExp;
	
	  for (j = 0, l = blockTokens.length; j < l; j++) {
	    if (blockTokens[j].type !== 'inline') { continue; }
	    tokens = blockTokens[j].children;
	
	    // We scan from the end, to keep position when new tags added.
	    for (i = tokens.length - 1; i >= 0; i--) {
	      token = tokens[i];
	      if (token.type !== 'text') { continue; }
	
	      pos = 0;
	      text = token.content;
	      reg.lastIndex = 0;
	      level = token.level;
	      nodes = [];
	
	      while ((m = reg.exec(text))) {
	        if (reg.lastIndex > pos) {
	          nodes.push({
	            type: 'text',
	            content: text.slice(pos, m.index + m[1].length),
	            level: level
	          });
	        }
	
	        nodes.push({
	          type: 'abbr_open',
	          title: state.env.abbreviations[':' + m[2]],
	          level: level++
	        });
	        nodes.push({
	          type: 'text',
	          content: m[2],
	          level: level
	        });
	        nodes.push({
	          type: 'abbr_close',
	          level: --level
	        });
	        pos = reg.lastIndex - m[3].length;
	      }
	
	      if (!nodes.length) { continue; }
	
	      if (pos < text.length) {
	        nodes.push({
	          type: 'text',
	          content: text.slice(pos),
	          level: level
	        });
	      }
	
	      // replace current node
	      blockTokens[j].children = tokens = [].concat(tokens.slice(0, i), nodes, tokens.slice(i + 1));
	    }
	  }
	};


/***/ },
/* 139 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function block(state) {
	
	  if (state.inlineMode) {
	    state.tokens.push({
	      type: 'inline',
	      content: state.src.replace(/\n/g, ' ').trim(),
	      level: 0,
	      lines: [ 0, 1 ],
	      children: []
	    });
	
	  } else {
	    state.block.parse(state.src, state.options, state.env, state.tokens);
	  }
	};


/***/ },
/* 140 */
/***/ function(module, exports) {

	'use strict';
	
	
	module.exports = function footnote_block(state) {
	  var i, l, j, t, lastParagraph, list, tokens, current, currentLabel,
	      level = 0,
	      insideRef = false,
	      refTokens = {};
	
	  if (!state.env.footnotes) { return; }
	
	  state.tokens = state.tokens.filter(function(tok) {
	    if (tok.type === 'footnote_reference_open') {
	      insideRef = true;
	      current = [];
	      currentLabel = tok.label;
	      return false;
	    }
	    if (tok.type === 'footnote_reference_close') {
	      insideRef = false;
	      // prepend ':' to avoid conflict with Object.prototype members
	      refTokens[':' + currentLabel] = current;
	      return false;
	    }
	    if (insideRef) { current.push(tok); }
	    return !insideRef;
	  });
	
	  if (!state.env.footnotes.list) { return; }
	  list = state.env.footnotes.list;
	
	  state.tokens.push({
	    type: 'footnote_block_open',
	    level: level++
	  });
	  for (i = 0, l = list.length; i < l; i++) {
	    state.tokens.push({
	      type: 'footnote_open',
	      id: i,
	      level: level++
	    });
	
	    if (list[i].tokens) {
	      tokens = [];
	      tokens.push({
	        type: 'paragraph_open',
	        tight: false,
	        level: level++
	      });
	      tokens.push({
	        type: 'inline',
	        content: '',
	        level: level,
	        children: list[i].tokens
	      });
	      tokens.push({
	        type: 'paragraph_close',
	        tight: false,
	        level: --level
	      });
	    } else if (list[i].label) {
	      tokens = refTokens[':' + list[i].label];
	    }
	
	    state.tokens = state.tokens.concat(tokens);
	    if (state.tokens[state.tokens.length - 1].type === 'paragraph_close') {
	      lastParagraph = state.tokens.pop();
	    } else {
	      lastParagraph = null;
	    }
	
	    t = list[i].count > 0 ? list[i].count : 1;
	    for (j = 0; j < t; j++) {
	      state.tokens.push({
	        type: 'footnote_anchor',
	        id: i,
	        subId: j,
	        level: level
	      });
	    }
	
	    if (lastParagraph) {
	      state.tokens.push(lastParagraph);
	    }
	
	    state.tokens.push({
	      type: 'footnote_close',
	      level: --level
	    });
	  }
	  state.tokens.push({
	    type: 'footnote_block_close',
	    level: --level
	  });
	};


/***/ },
/* 141 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function inline(state) {
	  var tokens = state.tokens, tok, i, l;
	
	  // Parse inlines
	  for (i = 0, l = tokens.length; i < l; i++) {
	    tok = tokens[i];
	    if (tok.type === 'inline') {
	      state.inline.parse(tok.content, state.options, state.env, tok.children);
	    }
	  }
	};


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	// Replace link-like texts with link nodes.
	//
	// Currently restricted by `inline.validateLink()` to http/https/ftp
	//
	'use strict';
	
	
	var Autolinker = __webpack_require__(39);
	
	
	var LINK_SCAN_RE = /www|@|\:\/\//;
	
	
	function isLinkOpen(str) {
	  return /^<a[>\s]/i.test(str);
	}
	function isLinkClose(str) {
	  return /^<\/a\s*>/i.test(str);
	}
	
	// Stupid fabric to avoid singletons, for thread safety.
	// Required for engines like Nashorn.
	//
	function createLinkifier() {
	  var links = [];
	  var autolinker = new Autolinker({
	    stripPrefix: false,
	    url: true,
	    email: true,
	    twitter: false,
	    replaceFn: function (linker, match) {
	      // Only collect matched strings but don't change anything.
	      switch (match.getType()) {
	        /*eslint default-case:0*/
	        case 'url':
	          links.push({
	            text: match.matchedText,
	            url: match.getUrl()
	          });
	          break;
	        case 'email':
	          links.push({
	            text: match.matchedText,
	            // normalize email protocol
	            url: 'mailto:' + match.getEmail().replace(/^mailto:/i, '')
	          });
	          break;
	      }
	      return false;
	    }
	  });
	
	  return {
	    links: links,
	    autolinker: autolinker
	  };
	}
	
	
	module.exports = function linkify(state) {
	  var i, j, l, tokens, token, text, nodes, ln, pos, level, htmlLinkLevel,
	      blockTokens = state.tokens,
	      linkifier = null, links, autolinker;
	
	  if (!state.options.linkify) { return; }
	
	  for (j = 0, l = blockTokens.length; j < l; j++) {
	    if (blockTokens[j].type !== 'inline') { continue; }
	    tokens = blockTokens[j].children;
	
	    htmlLinkLevel = 0;
	
	    // We scan from the end, to keep position when new tags added.
	    // Use reversed logic in links start/end match
	    for (i = tokens.length - 1; i >= 0; i--) {
	      token = tokens[i];
	
	      // Skip content of markdown links
	      if (token.type === 'link_close') {
	        i--;
	        while (tokens[i].level !== token.level && tokens[i].type !== 'link_open') {
	          i--;
	        }
	        continue;
	      }
	
	      // Skip content of html tag links
	      if (token.type === 'htmltag') {
	        if (isLinkOpen(token.content) && htmlLinkLevel > 0) {
	          htmlLinkLevel--;
	        }
	        if (isLinkClose(token.content)) {
	          htmlLinkLevel++;
	        }
	      }
	      if (htmlLinkLevel > 0) { continue; }
	
	      if (token.type === 'text' && LINK_SCAN_RE.test(token.content)) {
	
	        // Init linkifier in lazy manner, only if required.
	        if (!linkifier) {
	          linkifier = createLinkifier();
	          links = linkifier.links;
	          autolinker = linkifier.autolinker;
	        }
	
	        text = token.content;
	        links.length = 0;
	        autolinker.link(text);
	
	        if (!links.length) { continue; }
	
	        // Now split string to nodes
	        nodes = [];
	        level = token.level;
	
	        for (ln = 0; ln < links.length; ln++) {
	
	          if (!state.inline.validateLink(links[ln].url)) { continue; }
	
	          pos = text.indexOf(links[ln].text);
	
	          if (pos) {
	            level = level;
	            nodes.push({
	              type: 'text',
	              content: text.slice(0, pos),
	              level: level
	            });
	          }
	          nodes.push({
	            type: 'link_open',
	            href: links[ln].url,
	            title: '',
	            level: level++
	          });
	          nodes.push({
	            type: 'text',
	            content: links[ln].text,
	            level: level
	          });
	          nodes.push({
	            type: 'link_close',
	            level: --level
	          });
	          text = text.slice(pos + links[ln].text.length);
	        }
	        if (text.length) {
	          nodes.push({
	            type: 'text',
	            content: text,
	            level: level
	          });
	        }
	
	        // replace current node
	        blockTokens[j].children = tokens = [].concat(tokens.slice(0, i), nodes, tokens.slice(i + 1));
	      }
	    }
	  }
	};


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	
	var StateInline          = __webpack_require__(12);
	var parseLinkLabel       = __webpack_require__(7);
	var parseLinkDestination = __webpack_require__(29);
	var parseLinkTitle       = __webpack_require__(30);
	var normalizeReference   = __webpack_require__(28);
	
	
	function parseReference(str, parser, options, env) {
	  var state, labelEnd, pos, max, code, start, href, title, label;
	
	  if (str.charCodeAt(0) !== 0x5B/* [ */) { return -1; }
	
	  if (str.indexOf(']:') === -1) { return -1; }
	
	  state = new StateInline(str, parser, options, env, []);
	  labelEnd = parseLinkLabel(state, 0);
	
	  if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 0x3A/* : */) { return -1; }
	
	  max = state.posMax;
	
	  // [label]:   destination   'title'
	  //         ^^^ skip optional whitespace here
	  for (pos = labelEnd + 2; pos < max; pos++) {
	    code = state.src.charCodeAt(pos);
	    if (code !== 0x20 && code !== 0x0A) { break; }
	  }
	
	  // [label]:   destination   'title'
	  //            ^^^^^^^^^^^ parse this
	  if (!parseLinkDestination(state, pos)) { return -1; }
	  href = state.linkContent;
	  pos = state.pos;
	
	  // [label]:   destination   'title'
	  //                       ^^^ skipping those spaces
	  start = pos;
	  for (pos = pos + 1; pos < max; pos++) {
	    code = state.src.charCodeAt(pos);
	    if (code !== 0x20 && code !== 0x0A) { break; }
	  }
	
	  // [label]:   destination   'title'
	  //                          ^^^^^^^ parse this
	  if (pos < max && start !== pos && parseLinkTitle(state, pos)) {
	    title = state.linkContent;
	    pos = state.pos;
	  } else {
	    title = '';
	    pos = start;
	  }
	
	  // ensure that the end of the line is empty
	  while (pos < max && state.src.charCodeAt(pos) === 0x20/* space */) { pos++; }
	  if (pos < max && state.src.charCodeAt(pos) !== 0x0A) { return -1; }
	
	  label = normalizeReference(str.slice(1, labelEnd));
	  if (typeof env.references[label] === 'undefined') {
	    env.references[label] = { title: title, href: href };
	  }
	
	  return pos;
	}
	
	
	module.exports = function references(state) {
	  var tokens = state.tokens, i, l, content, pos;
	
	  state.env.references = state.env.references || {};
	
	  if (state.inlineMode) {
	    return;
	  }
	
	  // Scan definitions in paragraph inlines
	  for (i = 1, l = tokens.length - 1; i < l; i++) {
	    if (tokens[i].type === 'inline' &&
	        tokens[i - 1].type === 'paragraph_open' &&
	        tokens[i + 1].type === 'paragraph_close') {
	
	      content = tokens[i].content;
	      while (content.length) {
	        pos = parseReference(content, state.inline, state.options, state.env);
	        if (pos < 0) { break; }
	        content = content.slice(pos).trim();
	      }
	
	      tokens[i].content = content;
	      if (!content.length) {
	        tokens[i - 1].tight = true;
	        tokens[i + 1].tight = true;
	      }
	    }
	  }
	};


/***/ },
/* 144 */
/***/ function(module, exports) {

	// Simple typographical replacements
	//
	'use strict';
	
	// TODO:
	// - fractionals 1/2, 1/4, 3/4 -> ½, ¼, ¾
	// - miltiplication 2 x 4 -> 2 × 4
	
	var RARE_RE = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/;
	
	var SCOPED_ABBR_RE = /\((c|tm|r|p)\)/ig;
	var SCOPED_ABBR = {
	  'c': '©',
	  'r': '®',
	  'p': '§',
	  'tm': '™'
	};
	
	function replaceScopedAbbr(str) {
	  if (str.indexOf('(') < 0) { return str; }
	
	  return str.replace(SCOPED_ABBR_RE, function(match, name) {
	    return SCOPED_ABBR[name.toLowerCase()];
	  });
	}
	
	
	module.exports = function replace(state) {
	  var i, token, text, inlineTokens, blkIdx;
	
	  if (!state.options.typographer) { return; }
	
	  for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
	
	    if (state.tokens[blkIdx].type !== 'inline') { continue; }
	
	    inlineTokens = state.tokens[blkIdx].children;
	
	    for (i = inlineTokens.length - 1; i >= 0; i--) {
	      token = inlineTokens[i];
	      if (token.type === 'text') {
	        text = token.content;
	
	        text = replaceScopedAbbr(text);
	
	        if (RARE_RE.test(text)) {
	          text = text
	            .replace(/\+-/g, '±')
	            // .., ..., ....... -> …
	            // but ?..... & !..... -> ?.. & !..
	            .replace(/\.{2,}/g, '…').replace(/([?!])…/g, '$1..')
	            .replace(/([?!]){4,}/g, '$1$1$1').replace(/,{2,}/g, ',')
	            // em-dash
	            .replace(/(^|[^-])---([^-]|$)/mg, '$1\u2014$2')
	            // en-dash
	            .replace(/(^|\s)--(\s|$)/mg, '$1\u2013$2')
	            .replace(/(^|[^-\s])--([^-\s]|$)/mg, '$1\u2013$2');
	        }
	
	        token.content = text;
	      }
	    }
	  }
	};


/***/ },
/* 145 */
/***/ function(module, exports) {

	// Convert straight quotation marks to typographic ones
	//
	'use strict';
	
	
	var QUOTE_TEST_RE = /['"]/;
	var QUOTE_RE = /['"]/g;
	var PUNCT_RE = /[-\s()\[\]]/;
	var APOSTROPHE = '’';
	
	// This function returns true if the character at `pos`
	// could be inside a word.
	function isLetter(str, pos) {
	  if (pos < 0 || pos >= str.length) { return false; }
	  return !PUNCT_RE.test(str[pos]);
	}
	
	
	function replaceAt(str, index, ch) {
	  return str.substr(0, index) + ch + str.substr(index + 1);
	}
	
	
	module.exports = function smartquotes(state) {
	  /*eslint max-depth:0*/
	  var i, token, text, t, pos, max, thisLevel, lastSpace, nextSpace, item,
	      canOpen, canClose, j, isSingle, blkIdx, tokens,
	      stack;
	
	  if (!state.options.typographer) { return; }
	
	  stack = [];
	
	  for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
	
	    if (state.tokens[blkIdx].type !== 'inline') { continue; }
	
	    tokens = state.tokens[blkIdx].children;
	    stack.length = 0;
	
	    for (i = 0; i < tokens.length; i++) {
	      token = tokens[i];
	
	      if (token.type !== 'text' || QUOTE_TEST_RE.test(token.text)) { continue; }
	
	      thisLevel = tokens[i].level;
	
	      for (j = stack.length - 1; j >= 0; j--) {
	        if (stack[j].level <= thisLevel) { break; }
	      }
	      stack.length = j + 1;
	
	      text = token.content;
	      pos = 0;
	      max = text.length;
	
	      /*eslint no-labels:0,block-scoped-var:0*/
	      OUTER:
	      while (pos < max) {
	        QUOTE_RE.lastIndex = pos;
	        t = QUOTE_RE.exec(text);
	        if (!t) { break; }
	
	        lastSpace = !isLetter(text, t.index - 1);
	        pos = t.index + 1;
	        isSingle = (t[0] === "'");
	        nextSpace = !isLetter(text, pos);
	
	        if (!nextSpace && !lastSpace) {
	          // middle of word
	          if (isSingle) {
	            token.content = replaceAt(token.content, t.index, APOSTROPHE);
	          }
	          continue;
	        }
	
	        canOpen = !nextSpace;
	        canClose = !lastSpace;
	
	        if (canClose) {
	          // this could be a closing quote, rewind the stack to get a match
	          for (j = stack.length - 1; j >= 0; j--) {
	            item = stack[j];
	            if (stack[j].level < thisLevel) { break; }
	            if (item.single === isSingle && stack[j].level === thisLevel) {
	              item = stack[j];
	              if (isSingle) {
	                tokens[item.token].content = replaceAt(tokens[item.token].content, item.pos, state.options.quotes[2]);
	                token.content = replaceAt(token.content, t.index, state.options.quotes[3]);
	              } else {
	                tokens[item.token].content = replaceAt(tokens[item.token].content, item.pos, state.options.quotes[0]);
	                token.content = replaceAt(token.content, t.index, state.options.quotes[1]);
	              }
	              stack.length = j;
	              continue OUTER;
	            }
	          }
	        }
	
	        if (canOpen) {
	          stack.push({
	            token: i,
	            pos: t.index,
	            single: isSingle,
	            level: thisLevel
	          });
	        } else if (canClose && isSingle) {
	          token.content = replaceAt(token.content, t.index, APOSTROPHE);
	        }
	      }
	    }
	  }
	};


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	// Process autolinks '<protocol:...>'
	
	'use strict';
	
	var url_schemas   = __webpack_require__(114);
	var normalizeLink = __webpack_require__(27);
	
	
	/*eslint max-len:0*/
	var EMAIL_RE    = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/;
	var AUTOLINK_RE = /^<([a-zA-Z.\-]{1,25}):([^<>\x00-\x20]*)>/;
	
	
	module.exports = function autolink(state, silent) {
	  var tail, linkMatch, emailMatch, url, fullUrl, pos = state.pos;
	
	  if (state.src.charCodeAt(pos) !== 0x3C/* < */) { return false; }
	
	  tail = state.src.slice(pos);
	
	  if (tail.indexOf('>') < 0) { return false; }
	
	  linkMatch = tail.match(AUTOLINK_RE);
	
	  if (linkMatch) {
	    if (url_schemas.indexOf(linkMatch[1].toLowerCase()) < 0) { return false; }
	
	    url = linkMatch[0].slice(1, -1);
	    fullUrl = normalizeLink(url);
	    if (!state.parser.validateLink(url)) { return false; }
	
	    if (!silent) {
	      state.push({
	        type: 'link_open',
	        href: fullUrl,
	        level: state.level
	      });
	      state.push({
	        type: 'text',
	        content: url,
	        level: state.level + 1
	      });
	      state.push({ type: 'link_close', level: state.level });
	    }
	
	    state.pos += linkMatch[0].length;
	    return true;
	  }
	
	  emailMatch = tail.match(EMAIL_RE);
	
	  if (emailMatch) {
	
	    url = emailMatch[0].slice(1, -1);
	
	    fullUrl = normalizeLink('mailto:' + url);
	    if (!state.parser.validateLink(fullUrl)) { return false; }
	
	    if (!silent) {
	      state.push({
	        type: 'link_open',
	        href: fullUrl,
	        level: state.level
	      });
	      state.push({
	        type: 'text',
	        content: url,
	        level: state.level + 1
	      });
	      state.push({ type: 'link_close', level: state.level });
	    }
	
	    state.pos += emailMatch[0].length;
	    return true;
	  }
	
	  return false;
	};


/***/ },
/* 147 */
/***/ function(module, exports) {

	// Parse backticks
	
	'use strict';
	
	module.exports = function backticks(state, silent) {
	  var start, max, marker, matchStart, matchEnd,
	      pos = state.pos,
	      ch = state.src.charCodeAt(pos);
	
	  if (ch !== 0x60/* ` */) { return false; }
	
	  start = pos;
	  pos++;
	  max = state.posMax;
	
	  while (pos < max && state.src.charCodeAt(pos) === 0x60/* ` */) { pos++; }
	
	  marker = state.src.slice(start, pos);
	
	  matchStart = matchEnd = pos;
	
	  while ((matchStart = state.src.indexOf('`', matchEnd)) !== -1) {
	    matchEnd = matchStart + 1;
	
	    while (matchEnd < max && state.src.charCodeAt(matchEnd) === 0x60/* ` */) { matchEnd++; }
	
	    if (matchEnd - matchStart === marker.length) {
	      if (!silent) {
	        state.push({
	          type: 'code',
	          content: state.src.slice(pos, matchStart)
	                              .replace(/[ \n]+/g, ' ')
	                              .trim(),
	          block: false,
	          level: state.level
	        });
	      }
	      state.pos = matchEnd;
	      return true;
	    }
	  }
	
	  if (!silent) { state.pending += marker; }
	  state.pos += marker.length;
	  return true;
	};


/***/ },
/* 148 */
/***/ function(module, exports) {

	// Process ~~deleted text~~
	
	'use strict';
	
	module.exports = function del(state, silent) {
	  var found,
	      pos,
	      stack,
	      max = state.posMax,
	      start = state.pos,
	      lastChar,
	      nextChar;
	
	  if (state.src.charCodeAt(start) !== 0x7E/* ~ */) { return false; }
	  if (silent) { return false; } // don't run any pairs in validation mode
	  if (start + 4 >= max) { return false; }
	  if (state.src.charCodeAt(start + 1) !== 0x7E/* ~ */) { return false; }
	  if (state.level >= state.options.maxNesting) { return false; }
	
	  lastChar = start > 0 ? state.src.charCodeAt(start - 1) : -1;
	  nextChar = state.src.charCodeAt(start + 2);
	
	  if (lastChar === 0x7E/* ~ */) { return false; }
	  if (nextChar === 0x7E/* ~ */) { return false; }
	  if (nextChar === 0x20 || nextChar === 0x0A) { return false; }
	
	  pos = start + 2;
	  while (pos < max && state.src.charCodeAt(pos) === 0x7E/* ~ */) { pos++; }
	  if (pos > start + 3) {
	    // sequence of 4+ markers taking as literal, same as in a emphasis
	    state.pos += pos - start;
	    if (!silent) { state.pending += state.src.slice(start, pos); }
	    return true;
	  }
	
	  state.pos = start + 2;
	  stack = 1;
	
	  while (state.pos + 1 < max) {
	    if (state.src.charCodeAt(state.pos) === 0x7E/* ~ */) {
	      if (state.src.charCodeAt(state.pos + 1) === 0x7E/* ~ */) {
	        lastChar = state.src.charCodeAt(state.pos - 1);
	        nextChar = state.pos + 2 < max ? state.src.charCodeAt(state.pos + 2) : -1;
	        if (nextChar !== 0x7E/* ~ */ && lastChar !== 0x7E/* ~ */) {
	          if (lastChar !== 0x20 && lastChar !== 0x0A) {
	            // closing '~~'
	            stack--;
	          } else if (nextChar !== 0x20 && nextChar !== 0x0A) {
	            // opening '~~'
	            stack++;
	          } // else {
	            //  // standalone ' ~~ ' indented with spaces
	            // }
	          if (stack <= 0) {
	            found = true;
	            break;
	          }
	        }
	      }
	    }
	
	    state.parser.skipToken(state);
	  }
	
	  if (!found) {
	    // parser failed to find ending tag, so it's not valid emphasis
	    state.pos = start;
	    return false;
	  }
	
	  // found!
	  state.posMax = state.pos;
	  state.pos = start + 2;
	
	  if (!silent) {
	    state.push({ type: 'del_open', level: state.level++ });
	    state.parser.tokenize(state);
	    state.push({ type: 'del_close', level: --state.level });
	  }
	
	  state.pos = state.posMax + 2;
	  state.posMax = max;
	  return true;
	};


/***/ },
/* 149 */
/***/ function(module, exports) {

	// Process *this* and _that_
	
	'use strict';
	
	
	function isAlphaNum(code) {
	  return (code >= 0x30 /* 0 */ && code <= 0x39 /* 9 */) ||
	         (code >= 0x41 /* A */ && code <= 0x5A /* Z */) ||
	         (code >= 0x61 /* a */ && code <= 0x7A /* z */);
	}
	
	// parse sequence of emphasis markers,
	// "start" should point at a valid marker
	function scanDelims(state, start) {
	  var pos = start, lastChar, nextChar, count,
	      can_open = true,
	      can_close = true,
	      max = state.posMax,
	      marker = state.src.charCodeAt(start);
	
	  lastChar = start > 0 ? state.src.charCodeAt(start - 1) : -1;
	
	  while (pos < max && state.src.charCodeAt(pos) === marker) { pos++; }
	  if (pos >= max) { can_open = false; }
	  count = pos - start;
	
	  if (count >= 4) {
	    // sequence of four or more unescaped markers can't start/end an emphasis
	    can_open = can_close = false;
	  } else {
	    nextChar = pos < max ? state.src.charCodeAt(pos) : -1;
	
	    // check whitespace conditions
	    if (nextChar === 0x20 || nextChar === 0x0A) { can_open = false; }
	    if (lastChar === 0x20 || lastChar === 0x0A) { can_close = false; }
	
	    if (marker === 0x5F /* _ */) {
	      // check if we aren't inside the word
	      if (isAlphaNum(lastChar)) { can_open = false; }
	      if (isAlphaNum(nextChar)) { can_close = false; }
	    }
	  }
	
	  return {
	    can_open: can_open,
	    can_close: can_close,
	    delims: count
	  };
	}
	
	module.exports = function emphasis(state, silent) {
	  var startCount,
	      count,
	      found,
	      oldCount,
	      newCount,
	      stack,
	      res,
	      max = state.posMax,
	      start = state.pos,
	      marker = state.src.charCodeAt(start);
	
	  if (marker !== 0x5F/* _ */ && marker !== 0x2A /* * */) { return false; }
	  if (silent) { return false; } // don't run any pairs in validation mode
	
	  res = scanDelims(state, start);
	  startCount = res.delims;
	  if (!res.can_open) {
	    state.pos += startCount;
	    if (!silent) { state.pending += state.src.slice(start, state.pos); }
	    return true;
	  }
	
	  if (state.level >= state.options.maxNesting) { return false; }
	
	  state.pos = start + startCount;
	  stack = [ startCount ];
	
	  while (state.pos < max) {
	    if (state.src.charCodeAt(state.pos) === marker) {
	      res = scanDelims(state, state.pos);
	      count = res.delims;
	      if (res.can_close) {
	        oldCount = stack.pop();
	        newCount = count;
	
	        while (oldCount !== newCount) {
	          if (newCount < oldCount) {
	            stack.push(oldCount - newCount);
	            break;
	          }
	
	          // assert(newCount > oldCount)
	          newCount -= oldCount;
	
	          if (stack.length === 0) { break; }
	          state.pos += oldCount;
	          oldCount = stack.pop();
	        }
	
	        if (stack.length === 0) {
	          startCount = oldCount;
	          found = true;
	          break;
	        }
	        state.pos += count;
	        continue;
	      }
	
	      if (res.can_open) { stack.push(count); }
	      state.pos += count;
	      continue;
	    }
	
	    state.parser.skipToken(state);
	  }
	
	  if (!found) {
	    // parser failed to find ending tag, so it's not valid emphasis
	    state.pos = start;
	    return false;
	  }
	
	  // found!
	  state.posMax = state.pos;
	  state.pos = start + startCount;
	
	  if (!silent) {
	    if (startCount === 2 || startCount === 3) {
	      state.push({ type: 'strong_open', level: state.level++ });
	    }
	    if (startCount === 1 || startCount === 3) {
	      state.push({ type: 'em_open', level: state.level++ });
	    }
	
	    state.parser.tokenize(state);
	
	    if (startCount === 1 || startCount === 3) {
	      state.push({ type: 'em_close', level: --state.level });
	    }
	    if (startCount === 2 || startCount === 3) {
	      state.push({ type: 'strong_close', level: --state.level });
	    }
	  }
	
	  state.pos = state.posMax + startCount;
	  state.posMax = max;
	  return true;
	};


/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	// Process html entity - &#123;, &#xAF;, &quot;, ...
	
	'use strict';
	
	var entities          = __webpack_require__(26);
	var has               = __webpack_require__(3).has;
	var isValidEntityCode = __webpack_require__(3).isValidEntityCode;
	var fromCodePoint     = __webpack_require__(3).fromCodePoint;
	
	
	var DIGITAL_RE = /^&#((?:x[a-f0-9]{1,8}|[0-9]{1,8}));/i;
	var NAMED_RE   = /^&([a-z][a-z0-9]{1,31});/i;
	
	
	module.exports = function entity(state, silent) {
	  var ch, code, match, pos = state.pos, max = state.posMax;
	
	  if (state.src.charCodeAt(pos) !== 0x26/* & */) { return false; }
	
	  if (pos + 1 < max) {
	    ch = state.src.charCodeAt(pos + 1);
	
	    if (ch === 0x23 /* # */) {
	      match = state.src.slice(pos).match(DIGITAL_RE);
	      if (match) {
	        if (!silent) {
	          code = match[1][0].toLowerCase() === 'x' ? parseInt(match[1].slice(1), 16) : parseInt(match[1], 10);
	          state.pending += isValidEntityCode(code) ? fromCodePoint(code) : fromCodePoint(0xFFFD);
	        }
	        state.pos += match[0].length;
	        return true;
	      }
	    } else {
	      match = state.src.slice(pos).match(NAMED_RE);
	      if (match) {
	        if (has(entities, match[1])) {
	          if (!silent) { state.pending += entities[match[1]]; }
	          state.pos += match[0].length;
	          return true;
	        }
	      }
	    }
	  }
	
	  if (!silent) { state.pending += '&'; }
	  state.pos++;
	  return true;
	};


/***/ },
/* 151 */
/***/ function(module, exports) {

	// Proceess escaped chars and hardbreaks
	
	'use strict';
	
	var ESCAPED = [];
	
	for (var i = 0; i < 256; i++) { ESCAPED.push(0); }
	
	'\\!"#$%&\'()*+,./:;<=>?@[]^_`{|}~-'
	  .split('').forEach(function(ch) { ESCAPED[ch.charCodeAt(0)] = 1; });
	
	
	module.exports = function escape(state, silent) {
	  var ch, pos = state.pos, max = state.posMax;
	
	  if (state.src.charCodeAt(pos) !== 0x5C/* \ */) { return false; }
	
	  pos++;
	
	  if (pos < max) {
	    ch = state.src.charCodeAt(pos);
	
	    if (ch < 256 && ESCAPED[ch] !== 0) {
	      if (!silent) { state.pending += state.src[pos]; }
	      state.pos += 2;
	      return true;
	    }
	
	    if (ch === 0x0A) {
	      if (!silent) {
	        state.push({
	          type: 'hardbreak',
	          level: state.level
	        });
	      }
	
	      pos++;
	      // skip leading whitespaces from next line
	      while (pos < max && state.src.charCodeAt(pos) === 0x20) { pos++; }
	
	      state.pos = pos;
	      return true;
	    }
	  }
	
	  if (!silent) { state.pending += '\\'; }
	  state.pos++;
	  return true;
	};


/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	// Process inline footnotes (^[...])
	
	'use strict';
	
	var parseLinkLabel = __webpack_require__(7);
	
	
	module.exports = function footnote_inline(state, silent) {
	  var labelStart,
	      labelEnd,
	      footnoteId,
	      oldLength,
	      max = state.posMax,
	      start = state.pos;
	
	  if (start + 2 >= max) { return false; }
	  if (state.src.charCodeAt(start) !== 0x5E/* ^ */) { return false; }
	  if (state.src.charCodeAt(start + 1) !== 0x5B/* [ */) { return false; }
	  if (state.level >= state.options.maxNesting) { return false; }
	
	  labelStart = start + 2;
	  labelEnd = parseLinkLabel(state, start + 1);
	
	  // parser failed to find ']', so it's not a valid note
	  if (labelEnd < 0) { return false; }
	
	  // We found the end of the link, and know for a fact it's a valid link;
	  // so all that's left to do is to call tokenizer.
	  //
	  if (!silent) {
	    if (!state.env.footnotes) { state.env.footnotes = {}; }
	    if (!state.env.footnotes.list) { state.env.footnotes.list = []; }
	    footnoteId = state.env.footnotes.list.length;
	
	    state.pos = labelStart;
	    state.posMax = labelEnd;
	
	    state.push({
	      type: 'footnote_ref',
	      id: footnoteId,
	      level: state.level
	    });
	    state.linkLevel++;
	    oldLength = state.tokens.length;
	    state.parser.tokenize(state);
	    state.env.footnotes.list[footnoteId] = { tokens: state.tokens.splice(oldLength) };
	    state.linkLevel--;
	  }
	
	  state.pos = labelEnd + 1;
	  state.posMax = max;
	  return true;
	};


/***/ },
/* 153 */
/***/ function(module, exports) {

	// Process footnote references ([^...])
	
	'use strict';
	
	
	module.exports = function footnote_ref(state, silent) {
	  var label,
	      pos,
	      footnoteId,
	      footnoteSubId,
	      max = state.posMax,
	      start = state.pos;
	
	  // should be at least 4 chars - "[^x]"
	  if (start + 3 > max) { return false; }
	
	  if (!state.env.footnotes || !state.env.footnotes.refs) { return false; }
	  if (state.src.charCodeAt(start) !== 0x5B/* [ */) { return false; }
	  if (state.src.charCodeAt(start + 1) !== 0x5E/* ^ */) { return false; }
	  if (state.level >= state.options.maxNesting) { return false; }
	
	  for (pos = start + 2; pos < max; pos++) {
	    if (state.src.charCodeAt(pos) === 0x20) { return false; }
	    if (state.src.charCodeAt(pos) === 0x0A) { return false; }
	    if (state.src.charCodeAt(pos) === 0x5D /* ] */) {
	      break;
	    }
	  }
	
	  if (pos === start + 2) { return false; } // no empty footnote labels
	  if (pos >= max) { return false; }
	  pos++;
	
	  label = state.src.slice(start + 2, pos - 1);
	  if (typeof state.env.footnotes.refs[':' + label] === 'undefined') { return false; }
	
	  if (!silent) {
	    if (!state.env.footnotes.list) { state.env.footnotes.list = []; }
	
	    if (state.env.footnotes.refs[':' + label] < 0) {
	      footnoteId = state.env.footnotes.list.length;
	      state.env.footnotes.list[footnoteId] = { label: label, count: 0 };
	      state.env.footnotes.refs[':' + label] = footnoteId;
	    } else {
	      footnoteId = state.env.footnotes.refs[':' + label];
	    }
	
	    footnoteSubId = state.env.footnotes.list[footnoteId].count;
	    state.env.footnotes.list[footnoteId].count++;
	
	    state.push({
	      type: 'footnote_ref',
	      id: footnoteId,
	      subId: footnoteSubId,
	      level: state.level
	    });
	  }
	
	  state.pos = pos;
	  state.posMax = max;
	  return true;
	};


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	// Process html tags
	
	'use strict';
	
	
	var HTML_TAG_RE = __webpack_require__(113).HTML_TAG_RE;
	
	
	function isLetter(ch) {
	  /*eslint no-bitwise:0*/
	  var lc = ch | 0x20; // to lower case
	  return (lc >= 0x61/* a */) && (lc <= 0x7a/* z */);
	}
	
	
	module.exports = function htmltag(state, silent) {
	  var ch, match, max, pos = state.pos;
	
	  if (!state.options.html) { return false; }
	
	  // Check start
	  max = state.posMax;
	  if (state.src.charCodeAt(pos) !== 0x3C/* < */ ||
	      pos + 2 >= max) {
	    return false;
	  }
	
	  // Quick fail on second char
	  ch = state.src.charCodeAt(pos + 1);
	  if (ch !== 0x21/* ! */ &&
	      ch !== 0x3F/* ? */ &&
	      ch !== 0x2F/* / */ &&
	      !isLetter(ch)) {
	    return false;
	  }
	
	  match = state.src.slice(pos).match(HTML_TAG_RE);
	  if (!match) { return false; }
	
	  if (!silent) {
	    state.push({
	      type: 'htmltag',
	      content: state.src.slice(pos, pos + match[0].length),
	      level: state.level
	    });
	  }
	  state.pos += match[0].length;
	  return true;
	};


/***/ },
/* 155 */
/***/ function(module, exports) {

	// Process ++inserted text++
	
	'use strict';
	
	module.exports = function ins(state, silent) {
	  var found,
	      pos,
	      stack,
	      max = state.posMax,
	      start = state.pos,
	      lastChar,
	      nextChar;
	
	  if (state.src.charCodeAt(start) !== 0x2B/* + */) { return false; }
	  if (silent) { return false; } // don't run any pairs in validation mode
	  if (start + 4 >= max) { return false; }
	  if (state.src.charCodeAt(start + 1) !== 0x2B/* + */) { return false; }
	  if (state.level >= state.options.maxNesting) { return false; }
	
	  lastChar = start > 0 ? state.src.charCodeAt(start - 1) : -1;
	  nextChar = state.src.charCodeAt(start + 2);
	
	  if (lastChar === 0x2B/* + */) { return false; }
	  if (nextChar === 0x2B/* + */) { return false; }
	  if (nextChar === 0x20 || nextChar === 0x0A) { return false; }
	
	  pos = start + 2;
	  while (pos < max && state.src.charCodeAt(pos) === 0x2B/* + */) { pos++; }
	  if (pos !== start + 2) {
	    // sequence of 3+ markers taking as literal, same as in a emphasis
	    state.pos += pos - start;
	    if (!silent) { state.pending += state.src.slice(start, pos); }
	    return true;
	  }
	
	  state.pos = start + 2;
	  stack = 1;
	
	  while (state.pos + 1 < max) {
	    if (state.src.charCodeAt(state.pos) === 0x2B/* + */) {
	      if (state.src.charCodeAt(state.pos + 1) === 0x2B/* + */) {
	        lastChar = state.src.charCodeAt(state.pos - 1);
	        nextChar = state.pos + 2 < max ? state.src.charCodeAt(state.pos + 2) : -1;
	        if (nextChar !== 0x2B/* + */ && lastChar !== 0x2B/* + */) {
	          if (lastChar !== 0x20 && lastChar !== 0x0A) {
	            // closing '++'
	            stack--;
	          } else if (nextChar !== 0x20 && nextChar !== 0x0A) {
	            // opening '++'
	            stack++;
	          } // else {
	            //  // standalone ' ++ ' indented with spaces
	            // }
	          if (stack <= 0) {
	            found = true;
	            break;
	          }
	        }
	      }
	    }
	
	    state.parser.skipToken(state);
	  }
	
	  if (!found) {
	    // parser failed to find ending tag, so it's not valid emphasis
	    state.pos = start;
	    return false;
	  }
	
	  // found!
	  state.posMax = state.pos;
	  state.pos = start + 2;
	
	  if (!silent) {
	    state.push({ type: 'ins_open', level: state.level++ });
	    state.parser.tokenize(state);
	    state.push({ type: 'ins_close', level: --state.level });
	  }
	
	  state.pos = state.posMax + 2;
	  state.posMax = max;
	  return true;
	};


/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	// Process [links](<to> "stuff")
	
	'use strict';
	
	var parseLinkLabel       = __webpack_require__(7);
	var parseLinkDestination = __webpack_require__(29);
	var parseLinkTitle       = __webpack_require__(30);
	var normalizeReference   = __webpack_require__(28);
	
	
	module.exports = function links(state, silent) {
	  var labelStart,
	      labelEnd,
	      label,
	      href,
	      title,
	      pos,
	      ref,
	      code,
	      isImage = false,
	      oldPos = state.pos,
	      max = state.posMax,
	      start = state.pos,
	      marker = state.src.charCodeAt(start);
	
	  if (marker === 0x21/* ! */) {
	    isImage = true;
	    marker = state.src.charCodeAt(++start);
	  }
	
	  if (marker !== 0x5B/* [ */) { return false; }
	  if (state.level >= state.options.maxNesting) { return false; }
	
	  labelStart = start + 1;
	  labelEnd = parseLinkLabel(state, start);
	
	  // parser failed to find ']', so it's not a valid link
	  if (labelEnd < 0) { return false; }
	
	  pos = labelEnd + 1;
	  if (pos < max && state.src.charCodeAt(pos) === 0x28/* ( */) {
	    //
	    // Inline link
	    //
	
	    // [link](  <href>  "title"  )
	    //        ^^ skipping these spaces
	    pos++;
	    for (; pos < max; pos++) {
	      code = state.src.charCodeAt(pos);
	      if (code !== 0x20 && code !== 0x0A) { break; }
	    }
	    if (pos >= max) { return false; }
	
	    // [link](  <href>  "title"  )
	    //          ^^^^^^ parsing link destination
	    start = pos;
	    if (parseLinkDestination(state, pos)) {
	      href = state.linkContent;
	      pos = state.pos;
	    } else {
	      href = '';
	    }
	
	    // [link](  <href>  "title"  )
	    //                ^^ skipping these spaces
	    start = pos;
	    for (; pos < max; pos++) {
	      code = state.src.charCodeAt(pos);
	      if (code !== 0x20 && code !== 0x0A) { break; }
	    }
	
	    // [link](  <href>  "title"  )
	    //                  ^^^^^^^ parsing link title
	    if (pos < max && start !== pos && parseLinkTitle(state, pos)) {
	      title = state.linkContent;
	      pos = state.pos;
	
	      // [link](  <href>  "title"  )
	      //                         ^^ skipping these spaces
	      for (; pos < max; pos++) {
	        code = state.src.charCodeAt(pos);
	        if (code !== 0x20 && code !== 0x0A) { break; }
	      }
	    } else {
	      title = '';
	    }
	
	    if (pos >= max || state.src.charCodeAt(pos) !== 0x29/* ) */) {
	      state.pos = oldPos;
	      return false;
	    }
	    pos++;
	  } else {
	    //
	    // Link reference
	    //
	
	    // do not allow nested reference links
	    if (state.linkLevel > 0) { return false; }
	
	    // [foo]  [bar]
	    //      ^^ optional whitespace (can include newlines)
	    for (; pos < max; pos++) {
	      code = state.src.charCodeAt(pos);
	      if (code !== 0x20 && code !== 0x0A) { break; }
	    }
	
	    if (pos < max && state.src.charCodeAt(pos) === 0x5B/* [ */) {
	      start = pos + 1;
	      pos = parseLinkLabel(state, pos);
	      if (pos >= 0) {
	        label = state.src.slice(start, pos++);
	      } else {
	        pos = start - 1;
	      }
	    }
	
	    // covers label === '' and label === undefined
	    // (collapsed reference link and shortcut reference link respectively)
	    if (!label) {
	      if (typeof label === 'undefined') {
	        pos = labelEnd + 1;
	      }
	      label = state.src.slice(labelStart, labelEnd);
	    }
	
	    ref = state.env.references[normalizeReference(label)];
	    if (!ref) {
	      state.pos = oldPos;
	      return false;
	    }
	    href = ref.href;
	    title = ref.title;
	  }
	
	  //
	  // We found the end of the link, and know for a fact it's a valid link;
	  // so all that's left to do is to call tokenizer.
	  //
	  if (!silent) {
	    state.pos = labelStart;
	    state.posMax = labelEnd;
	
	    if (isImage) {
	      state.push({
	        type: 'image',
	        src: href,
	        title: title,
	        alt: state.src.substr(labelStart, labelEnd - labelStart),
	        level: state.level
	      });
	    } else {
	      state.push({
	        type: 'link_open',
	        href: href,
	        title: title,
	        level: state.level++
	      });
	      state.linkLevel++;
	      state.parser.tokenize(state);
	      state.linkLevel--;
	      state.push({ type: 'link_close', level: --state.level });
	    }
	  }
	
	  state.pos = pos;
	  state.posMax = max;
	  return true;
	};


/***/ },
/* 157 */
/***/ function(module, exports) {

	// Process ==highlighted text==
	
	'use strict';
	
	module.exports = function del(state, silent) {
	  var found,
	      pos,
	      stack,
	      max = state.posMax,
	      start = state.pos,
	      lastChar,
	      nextChar;
	
	  if (state.src.charCodeAt(start) !== 0x3D/* = */) { return false; }
	  if (silent) { return false; } // don't run any pairs in validation mode
	  if (start + 4 >= max) { return false; }
	  if (state.src.charCodeAt(start + 1) !== 0x3D/* = */) { return false; }
	  if (state.level >= state.options.maxNesting) { return false; }
	
	  lastChar = start > 0 ? state.src.charCodeAt(start - 1) : -1;
	  nextChar = state.src.charCodeAt(start + 2);
	
	  if (lastChar === 0x3D/* = */) { return false; }
	  if (nextChar === 0x3D/* = */) { return false; }
	  if (nextChar === 0x20 || nextChar === 0x0A) { return false; }
	
	  pos = start + 2;
	  while (pos < max && state.src.charCodeAt(pos) === 0x3D/* = */) { pos++; }
	  if (pos !== start + 2) {
	    // sequence of 3+ markers taking as literal, same as in a emphasis
	    state.pos += pos - start;
	    if (!silent) { state.pending += state.src.slice(start, pos); }
	    return true;
	  }
	
	  state.pos = start + 2;
	  stack = 1;
	
	  while (state.pos + 1 < max) {
	    if (state.src.charCodeAt(state.pos) === 0x3D/* = */) {
	      if (state.src.charCodeAt(state.pos + 1) === 0x3D/* = */) {
	        lastChar = state.src.charCodeAt(state.pos - 1);
	        nextChar = state.pos + 2 < max ? state.src.charCodeAt(state.pos + 2) : -1;
	        if (nextChar !== 0x3D/* = */ && lastChar !== 0x3D/* = */) {
	          if (lastChar !== 0x20 && lastChar !== 0x0A) {
	            // closing '=='
	            stack--;
	          } else if (nextChar !== 0x20 && nextChar !== 0x0A) {
	            // opening '=='
	            stack++;
	          } // else {
	            //  // standalone ' == ' indented with spaces
	            // }
	          if (stack <= 0) {
	            found = true;
	            break;
	          }
	        }
	      }
	    }
	
	    state.parser.skipToken(state);
	  }
	
	  if (!found) {
	    // parser failed to find ending tag, so it's not valid emphasis
	    state.pos = start;
	    return false;
	  }
	
	  // found!
	  state.posMax = state.pos;
	  state.pos = start + 2;
	
	  if (!silent) {
	    state.push({ type: 'mark_open', level: state.level++ });
	    state.parser.tokenize(state);
	    state.push({ type: 'mark_close', level: --state.level });
	  }
	
	  state.pos = state.posMax + 2;
	  state.posMax = max;
	  return true;
	};


/***/ },
/* 158 */
/***/ function(module, exports) {

	// Proceess '\n'
	
	'use strict';
	
	module.exports = function newline(state, silent) {
	  var pmax, max, pos = state.pos;
	
	  if (state.src.charCodeAt(pos) !== 0x0A/* \n */) { return false; }
	
	  pmax = state.pending.length - 1;
	  max = state.posMax;
	
	  // '  \n' -> hardbreak
	  // Lookup in pending chars is bad practice! Don't copy to other rules!
	  // Pending string is stored in concat mode, indexed lookups will cause
	  // convertion to flat mode.
	  if (!silent) {
	    if (pmax >= 0 && state.pending.charCodeAt(pmax) === 0x20) {
	      if (pmax >= 1 && state.pending.charCodeAt(pmax - 1) === 0x20) {
	        // Strip out all trailing spaces on this line.
	        for (var i = pmax - 2; i >= 0; i--) {
	          if (state.pending.charCodeAt(i) !== 0x20) {
	            state.pending = state.pending.substring(0, i + 1);
	            break;
	          }
	        }
	        state.push({
	          type: 'hardbreak',
	          level: state.level
	        });
	      } else {
	        state.pending = state.pending.slice(0, -1);
	        state.push({
	          type: 'softbreak',
	          level: state.level
	        });
	      }
	
	    } else {
	      state.push({
	        type: 'softbreak',
	        level: state.level
	      });
	    }
	  }
	
	  pos++;
	
	  // skip heading spaces for next line
	  while (pos < max && state.src.charCodeAt(pos) === 0x20) { pos++; }
	
	  state.pos = pos;
	  return true;
	};


/***/ },
/* 159 */
/***/ function(module, exports) {

	// Process ~subscript~
	
	'use strict';
	
	// same as UNESCAPE_MD_RE plus a space
	var UNESCAPE_RE = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;
	
	module.exports = function sub(state, silent) {
	  var found,
	      content,
	      max = state.posMax,
	      start = state.pos;
	
	  if (state.src.charCodeAt(start) !== 0x7E/* ~ */) { return false; }
	  if (silent) { return false; } // don't run any pairs in validation mode
	  if (start + 2 >= max) { return false; }
	  if (state.level >= state.options.maxNesting) { return false; }
	
	  state.pos = start + 1;
	
	  while (state.pos < max) {
	    if (state.src.charCodeAt(state.pos) === 0x7E/* ~ */) {
	      found = true;
	      break;
	    }
	
	    state.parser.skipToken(state);
	  }
	
	  if (!found || start + 1 === state.pos) {
	    state.pos = start;
	    return false;
	  }
	
	  content = state.src.slice(start + 1, state.pos);
	
	  // don't allow unescaped spaces/newlines inside
	  if (content.match(/(^|[^\\])(\\\\)*\s/)) {
	    state.pos = start;
	    return false;
	  }
	
	  // found!
	  state.posMax = state.pos;
	  state.pos = start + 1;
	
	  if (!silent) {
	    state.push({
	      type: 'sub',
	      level: state.level,
	      content: content.replace(UNESCAPE_RE, '$1')
	    });
	  }
	
	  state.pos = state.posMax + 1;
	  state.posMax = max;
	  return true;
	};


/***/ },
/* 160 */
/***/ function(module, exports) {

	// Process ^superscript^
	
	'use strict';
	
	// same as UNESCAPE_MD_RE plus a space
	var UNESCAPE_RE = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;
	
	module.exports = function sup(state, silent) {
	  var found,
	      content,
	      max = state.posMax,
	      start = state.pos;
	
	  if (state.src.charCodeAt(start) !== 0x5E/* ^ */) { return false; }
	  if (silent) { return false; } // don't run any pairs in validation mode
	  if (start + 2 >= max) { return false; }
	  if (state.level >= state.options.maxNesting) { return false; }
	
	  state.pos = start + 1;
	
	  while (state.pos < max) {
	    if (state.src.charCodeAt(state.pos) === 0x5E/* ^ */) {
	      found = true;
	      break;
	    }
	
	    state.parser.skipToken(state);
	  }
	
	  if (!found || start + 1 === state.pos) {
	    state.pos = start;
	    return false;
	  }
	
	  content = state.src.slice(start + 1, state.pos);
	
	  // don't allow unescaped spaces/newlines inside
	  if (content.match(/(^|[^\\])(\\\\)*\s/)) {
	    state.pos = start;
	    return false;
	  }
	
	  // found!
	  state.posMax = state.pos;
	  state.pos = start + 1;
	
	  if (!silent) {
	    state.push({
	      type: 'sup',
	      level: state.level,
	      content: content.replace(UNESCAPE_RE, '$1')
	    });
	  }
	
	  state.pos = state.posMax + 1;
	  state.posMax = max;
	  return true;
	};


/***/ },
/* 161 */
/***/ function(module, exports) {

	// Skip text characters for text token, place those to pending buffer
	// and increment current pos
	
	'use strict';
	
	// Rule to skip pure text
	// '{}$%@~+=:' reserved for extentions
	
	function isTerminatorChar(ch) {
	  switch (ch) {
	    case 0x0A/* \n */:
	    case 0x5C/* \ */:
	    case 0x60/* ` */:
	    case 0x2A/* * */:
	    case 0x5F/* _ */:
	    case 0x5E/* ^ */:
	    case 0x5B/* [ */:
	    case 0x5D/* ] */:
	    case 0x21/* ! */:
	    case 0x26/* & */:
	    case 0x3C/* < */:
	    case 0x3E/* > */:
	    case 0x7B/* { */:
	    case 0x7D/* } */:
	    case 0x24/* $ */:
	    case 0x25/* % */:
	    case 0x40/* @ */:
	    case 0x7E/* ~ */:
	    case 0x2B/* + */:
	    case 0x3D/* = */:
	    case 0x3A/* : */:
	      return true;
	    default:
	      return false;
	  }
	}
	
	module.exports = function text(state, silent) {
	  var pos = state.pos;
	
	  while (pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))) {
	    pos++;
	  }
	
	  if (pos === state.pos) { return false; }
	
	  if (!silent) { state.pending += state.src.slice(state.pos, pos); }
	
	  state.pos = pos;
	
	  return true;
	};


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	    'use strict';
	    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.
	
	    /* istanbul ignore next */
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        module.exports = factory();
	    } else {
	        root.StackFrame = factory();
	    }
	}(this, function () {
	    'use strict';
	    function _isNumber(n) {
	        return !isNaN(parseFloat(n)) && isFinite(n);
	    }
	
	    function StackFrame(functionName, args, fileName, lineNumber, columnNumber, source) {
	        if (functionName !== undefined) {
	            this.setFunctionName(functionName);
	        }
	        if (args !== undefined) {
	            this.setArgs(args);
	        }
	        if (fileName !== undefined) {
	            this.setFileName(fileName);
	        }
	        if (lineNumber !== undefined) {
	            this.setLineNumber(lineNumber);
	        }
	        if (columnNumber !== undefined) {
	            this.setColumnNumber(columnNumber);
	        }
	        if (source !== undefined) {
	            this.setSource(source);
	        }
	    }
	
	    StackFrame.prototype = {
	        getFunctionName: function () {
	            return this.functionName;
	        },
	        setFunctionName: function (v) {
	            this.functionName = String(v);
	        },
	
	        getArgs: function () {
	            return this.args;
	        },
	        setArgs: function (v) {
	            if (Object.prototype.toString.call(v) !== '[object Array]') {
	                throw new TypeError('Args must be an Array');
	            }
	            this.args = v;
	        },
	
	        // NOTE: Property name may be misleading as it includes the path,
	        // but it somewhat mirrors V8's JavaScriptStackTraceApi
	        // https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi and Gecko's
	        // http://mxr.mozilla.org/mozilla-central/source/xpcom/base/nsIException.idl#14
	        getFileName: function () {
	            return this.fileName;
	        },
	        setFileName: function (v) {
	            this.fileName = String(v);
	        },
	
	        getLineNumber: function () {
	            return this.lineNumber;
	        },
	        setLineNumber: function (v) {
	            if (!_isNumber(v)) {
	                throw new TypeError('Line Number must be a Number');
	            }
	            this.lineNumber = Number(v);
	        },
	
	        getColumnNumber: function () {
	            return this.columnNumber;
	        },
	        setColumnNumber: function (v) {
	            if (!_isNumber(v)) {
	                throw new TypeError('Column Number must be a Number');
	            }
	            this.columnNumber = Number(v);
	        },
	
	        getSource: function () {
	            return this.source;
	        },
	        setSource: function (v) {
	            this.source = String(v);
	        },
	
	        toString: function() {
	            var functionName = this.getFunctionName() || '{anonymous}';
	            var args = '(' + (this.getArgs() || []).join(',') + ')';
	            var fileName = this.getFileName() ? ('@' + this.getFileName()) : '';
	            var lineNumber = _isNumber(this.getLineNumber()) ? (':' + this.getLineNumber()) : '';
	            var columnNumber = _isNumber(this.getColumnNumber()) ? (':' + this.getColumnNumber()) : '';
	            return functionName + args + fileName + lineNumber + columnNumber;
	        }
	    };
	
	    return StackFrame;
	}));


/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ansiRegex = __webpack_require__(38)();
	
	module.exports = function (str) {
		return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
	};


/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	/*eslint-env browser*/
	
	var clientOverlay = document.createElement('div');
	clientOverlay.id = 'webpack-hot-middleware-clientOverlay';
	var styles = {
	  background: 'rgba(0,0,0,0.85)',
	  color: '#E8E8E8',
	  lineHeight: '1.2',
	  whiteSpace: 'pre',
	  fontFamily: 'Menlo, Consolas, monospace',
	  fontSize: '13px',
	  position: 'fixed',
	  zIndex: 9999,
	  padding: '10px',
	  left: 0,
	  right: 0,
	  top: 0,
	  bottom: 0,
	  overflow: 'auto',
	  dir: 'ltr',
	  textAlign: 'left'
	};
	for (var key in styles) {
	  clientOverlay.style[key] = styles[key];
	}
	
	var ansiHTML = __webpack_require__(37);
	var colors = {
	  reset: ['transparent', 'transparent'],
	  black: '181818',
	  red: 'E36049',
	  green: 'B3CB74',
	  yellow: 'FFD080',
	  blue: '7CAFC2',
	  magenta: '7FACCA',
	  cyan: 'C3C2EF',
	  lightgrey: 'EBE7E3',
	  darkgrey: '6D7891'
	};
	ansiHTML.setColors(colors);
	
	var Entities = __webpack_require__(75).AllHtmlEntities;
	var entities = new Entities();
	
	exports.showProblems =
	function showProblems(type, lines) {
	  clientOverlay.innerHTML = '';
	  lines.forEach(function(msg) {
	    msg = ansiHTML(entities.encode(msg));
	    var div = document.createElement('div');
	    div.style.marginBottom = '26px';
	    div.innerHTML = problemType(type) + ' in ' + msg;
	    clientOverlay.appendChild(div);
	  });
	  if (document.body) {
	    document.body.appendChild(clientOverlay);
	  }
	};
	
	exports.clear =
	function clear() {
	  if (document.body && clientOverlay.parentNode) {
	    document.body.removeChild(clientOverlay);
	  }
	};
	
	var problemColors = {
	  errors: colors.red,
	  warnings: colors.yellow
	};
	
	function problemType (type) {
	  var color = problemColors[type] || colors.red;
	  return (
	    '<span style="background-color:#' + color + '; color:#fff; padding:2px 4px; border-radius: 2px">' +
	      type.slice(0, -1).toUpperCase() +
	    '</span>'
	  );
	}


/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/*eslint-env browser*/
	/*global __resourceQuery __webpack_public_path__*/
	
	var options = {
	  path: "/__webpack_hmr",
	  timeout: 20 * 1000,
	  overlay: true,
	  reload: false,
	  log: true,
	  warn: true,
	  name: ''
	};
	if (false) {
	  var querystring = require('querystring');
	  var overrides = querystring.parse(__resourceQuery.slice(1));
	  if (overrides.path) options.path = overrides.path;
	  if (overrides.timeout) options.timeout = overrides.timeout;
	  if (overrides.overlay) options.overlay = overrides.overlay !== 'false';
	  if (overrides.reload) options.reload = overrides.reload !== 'false';
	  if (overrides.noInfo && overrides.noInfo !== 'false') {
	    options.log = false;
	  }
	  if (overrides.name) {
	    options.name = overrides.name;
	  }
	  if (overrides.quiet && overrides.quiet !== 'false') {
	    options.log = false;
	    options.warn = false;
	  }
	  if (overrides.dynamicPublicPath) {
	    options.path = __webpack_public_path__ + options.path;
	  }
	}
	
	if (typeof window === 'undefined') {
	  // do nothing
	} else if (typeof window.EventSource === 'undefined') {
	  console.warn(
	    "webpack-hot-middleware's client requires EventSource to work. " +
	    "You should include a polyfill if you want to support this browser: " +
	    "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools"
	  );
	} else {
	  connect();
	}
	
	function EventSourceWrapper() {
	  var source;
	  var lastActivity = new Date();
	  var listeners = [];
	
	  init();
	  var timer = setInterval(function() {
	    if ((new Date() - lastActivity) > options.timeout) {
	      handleDisconnect();
	    }
	  }, options.timeout / 2);
	
	  function init() {
	    source = new window.EventSource(options.path);
	    source.onopen = handleOnline;
	    source.onerror = handleDisconnect;
	    source.onmessage = handleMessage;
	  }
	
	  function handleOnline() {
	    if (options.log) console.log("[HMR] connected");
	    lastActivity = new Date();
	  }
	
	  function handleMessage(event) {
	    lastActivity = new Date();
	    for (var i = 0; i < listeners.length; i++) {
	      listeners[i](event);
	    }
	  }
	
	  function handleDisconnect() {
	    clearInterval(timer);
	    source.close();
	    setTimeout(init, options.timeout);
	  }
	
	  return {
	    addMessageListener: function(fn) {
	      listeners.push(fn);
	    }
	  };
	}
	
	function getEventSourceWrapper() {
	  if (!window.__whmEventSourceWrapper) {
	    window.__whmEventSourceWrapper = {};
	  }
	  if (!window.__whmEventSourceWrapper[options.path]) {
	    // cache the wrapper for other entries loaded on
	    // the same page with the same options.path
	    window.__whmEventSourceWrapper[options.path] = EventSourceWrapper();
	  }
	  return window.__whmEventSourceWrapper[options.path];
	}
	
	function connect() {
	  getEventSourceWrapper().addMessageListener(handleMessage);
	
	  function handleMessage(event) {
	    if (event.data == "\uD83D\uDC93") {
	      return;
	    }
	    try {
	      processMessage(JSON.parse(event.data));
	    } catch (ex) {
	      if (options.warn) {
	        console.warn("Invalid HMR message: " + event.data + "\n" + ex);
	      }
	    }
	  }
	}
	
	// the reporter needs to be a singleton on the page
	// in case the client is being used by multiple bundles
	// we only want to report once.
	// all the errors will go to all clients
	var singletonKey = '__webpack_hot_middleware_reporter__';
	var reporter;
	if (typeof window !== 'undefined') {
	  if (!window[singletonKey]) {
	    window[singletonKey] = createReporter();
	  }
	  reporter = window[singletonKey];
	}
	
	function createReporter() {
	  var strip = __webpack_require__(163);
	
	  var overlay;
	  if (typeof document !== 'undefined' && options.overlay) {
	    overlay = __webpack_require__(164);
	  }
	
	  var styles = {
	    errors: "color: #ff0000;",
	    warnings: "color: #999933;"
	  };
	  var previousProblems = null;
	  function log(type, obj) {
	    var newProblems = obj[type].map(function(msg) { return strip(msg); }).join('\n');
	    if (previousProblems == newProblems) {
	      return;
	    } else {
	      previousProblems = newProblems;
	    }
	
	    var style = styles[type];
	    var name = obj.name ? "'" + obj.name + "' " : "";
	    var title = "[HMR] bundle " + name + "has " + obj[type].length + " " + type;
	    // NOTE: console.warn or console.error will print the stack trace
	    // which isn't helpful here, so using console.log to escape it.
	    if (console.group && console.groupEnd) {
	      console.group("%c" + title, style);
	      console.log("%c" + newProblems, style);
	      console.groupEnd();
	    } else {
	      console.log(
	        "%c" + title + "\n\t%c" + newProblems.replace(/\n/g, "\n\t"),
	        style + "font-weight: bold;",
	        style + "font-weight: normal;"
	      );
	    }
	  }
	
	  return {
	    cleanProblemsCache: function () {
	      previousProblems = null;
	    },
	    problems: function(type, obj) {
	      if (options.warn) {
	        log(type, obj);
	      }
	      if (overlay && type !== 'warnings') overlay.showProblems(type, obj[type]);
	    },
	    success: function() {
	      if (overlay) overlay.clear();
	    },
	    useCustomOverlay: function(customOverlay) {
	      overlay = customOverlay;
	    }
	  };
	}
	
	var processUpdate = __webpack_require__(166);
	
	var customHandler;
	var subscribeAllHandler;
	function processMessage(obj) {
	  switch(obj.action) {
	    case "building":
	      if (options.log) {
	        console.log(
	          "[HMR] bundle " + (obj.name ? "'" + obj.name + "' " : "") +
	          "rebuilding"
	        );
	      }
	      break;
	    case "built":
	      if (options.log) {
	        console.log(
	          "[HMR] bundle " + (obj.name ? "'" + obj.name + "' " : "") +
	          "rebuilt in " + obj.time + "ms"
	        );
	      }
	      // fall through
	    case "sync":
	      if (obj.name && options.name && obj.name !== options.name) {
	        return;
	      }
	      if (obj.errors.length > 0) {
	        if (reporter) reporter.problems('errors', obj);
	      } else {
	        if (reporter) {
	          if (obj.warnings.length > 0) {
	            reporter.problems('warnings', obj);
	          } else {
	            reporter.cleanProblemsCache();
	          }
	          reporter.success();
	        }
	        processUpdate(obj.hash, obj.modules, options);
	      }
	      break;
	    default:
	      if (customHandler) {
	        customHandler(obj);
	      }
	  }
	
	  if (subscribeAllHandler) {
	    subscribeAllHandler(obj);
	  }
	}
	
	if (module) {
	  module.exports = {
	    subscribeAll: function subscribeAll(handler) {
	      subscribeAllHandler = handler;
	    },
	    subscribe: function subscribe(handler) {
	      customHandler = handler;
	    },
	    useCustomOverlay: function useCustomOverlay(customOverlay) {
	      if (reporter) reporter.useCustomOverlay(customOverlay);
	    }
	  };
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(191)(module)))

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Based heavily on https://github.com/webpack/webpack/blob/
	 *  c0afdf9c6abc1dd70707c594e473802a566f7b6e/hot/only-dev-server.js
	 * Original copyright Tobias Koppers @sokra (MIT license)
	 */
	
	/* global window __webpack_hash__ */
	
	if (false) {
	  throw new Error("[HMR] Hot Module Replacement is disabled.");
	}
	
	var hmrDocsUrl = "http://webpack.github.io/docs/hot-module-replacement-with-webpack.html"; // eslint-disable-line max-len
	
	var lastHash;
	var failureStatuses = { abort: 1, fail: 1 };
	var applyOptions = { ignoreUnaccepted: true };
	
	function upToDate(hash) {
	  if (hash) lastHash = hash;
	  return lastHash == __webpack_require__.h();
	}
	
	module.exports = function(hash, moduleMap, options) {
	  var reload = options.reload;
	  if (!upToDate(hash) && module.hot.status() == "idle") {
	    if (options.log) console.log("[HMR] Checking for updates on the server...");
	    check();
	  }
	
	  function check() {
	    var cb = function(err, updatedModules) {
	      if (err) return handleError(err);
	
	      if(!updatedModules) {
	        if (options.warn) {
	          console.warn("[HMR] Cannot find update (Full reload needed)");
	          console.warn("[HMR] (Probably because of restarting the server)");
	        }
	        performReload();
	        return null;
	      }
	
	      var applyCallback = function(applyErr, renewedModules) {
	        if (applyErr) return handleError(applyErr);
	
	        if (!upToDate()) check();
	
	        logUpdates(updatedModules, renewedModules);
	      };
	
	      var applyResult = module.hot.apply(applyOptions, applyCallback);
	      // webpack 2 promise
	      if (applyResult && applyResult.then) {
	        // HotModuleReplacement.runtime.js refers to the result as `outdatedModules`
	        applyResult.then(function(outdatedModules) {
	          applyCallback(null, outdatedModules);
	        });
	        applyResult.catch(applyCallback);
	      }
	
	    };
	
	    var result = module.hot.check(false, cb);
	    // webpack 2 promise
	    if (result && result.then) {
	        result.then(function(updatedModules) {
	            cb(null, updatedModules);
	        });
	        result.catch(cb);
	    }
	  }
	
	  function logUpdates(updatedModules, renewedModules) {
	    var unacceptedModules = updatedModules.filter(function(moduleId) {
	      return renewedModules && renewedModules.indexOf(moduleId) < 0;
	    });
	
	    if(unacceptedModules.length > 0) {
	      if (options.warn) {
	        console.warn(
	          "[HMR] The following modules couldn't be hot updated: " +
	          "(Full reload needed)\n" +
	          "This is usually because the modules which have changed " +
	          "(and their parents) do not know how to hot reload themselves. " +
	          "See " + hmrDocsUrl + " for more details."
	        );
	        unacceptedModules.forEach(function(moduleId) {
	          console.warn("[HMR]  - " + moduleMap[moduleId]);
	        });
	      }
	      performReload();
	      return;
	    }
	
	    if (options.log) {
	      if(!renewedModules || renewedModules.length === 0) {
	        console.log("[HMR] Nothing hot updated.");
	      } else {
	        console.log("[HMR] Updated modules:");
	        renewedModules.forEach(function(moduleId) {
	          console.log("[HMR]  - " + moduleMap[moduleId]);
	        });
	      }
	
	      if (upToDate()) {
	        console.log("[HMR] App is up to date.");
	      }
	    }
	  }
	
	  function handleError(err) {
	    if (module.hot.status() in failureStatuses) {
	      if (options.warn) {
	        console.warn("[HMR] Cannot check for update (Full reload needed)");
	        console.warn("[HMR] " + err.stack || err.message);
	      }
	      performReload();
	      return;
	    }
	    if (options.warn) {
	      console.warn("[HMR] Update check failed: " + err.stack || err.message);
	    }
	  }
	
	  function performReload() {
	    if (reload) {
	      if (options.warn) console.warn("[HMR] Reloading page");
	      window.location.reload();
	    }
	  }
	};


/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(1);

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(104);

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(110);

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(112);

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(115);

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(117);

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(130);

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(143);

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(146);

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(148);

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(153);

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(16);

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(205);

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(209);

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(217);

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(233);

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(239);

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(251);

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(252);

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(27);

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(3);

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(300);

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(87);

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(94);

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(97);

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map