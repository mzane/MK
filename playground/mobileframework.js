/**
 * MOBILE FRAMEWORK
 *
 * Functions
 * $m.e('<CSS selectorOrNode or NodeList>'); // get DOM node(s)
 * $m.hasClass('<CSS selectorOrNode or NodeList>', '<ClassName>') // test if DOM node(s) has/ve class
 * $m.addClass('<CSS selectorOrNode or NodeList>', '<ClassName>') // add class to DOM node(s)
 * $m.removeClass('<CSS selectorOrNode or NodeList>', '<ClassName>') // remove class from DOM node(s)
 * $m.addEvent('<CSS selectorOrNode or NodeList>', '<eventTyp>', '<function>') // add eventhandler to DOM node(s) (if "touch*" is used we try to feature detect touch events first)
 * $m.removeEvent('<CSS selectorOrNode or NodeList>', '<eventTyp>', '<function>') // remove eventhandler from DOM node(s)
 **/
(function() {
	var _doc = window.document,
		$m;

	// Internal helper functions
	var _deArray = function(obj) {
		if (obj.length < 2) {
			return obj[0];
		} else {
			return obj;
		}
	};

	var _makeArray = function(elements) {
		if (/msie/i.test(navigator.userAgent)) {
			if (elements instanceof Array) {
				return [elements];
			} else {
				return elements;
			}
		} else {
			if (elements.constructor.toString().indexOf("Array") < 0) {
				return [elements];
			} else {
				return elements;
			}
		}
	};

	// Global functions
	$m = (function() {
		return {
			e: function(selectorOrNode) {
				if (typeof selectorOrNode === 'undefined') {
					return;
				}

				// If there is only one entry just return the single object
				var _ret;

				// by Id
				if (_doc.getElementById && selectorOrNode.indexOf('#') === 0 && selectorOrNode.indexOf(' ') < 0 && selectorOrNode.indexOf(',') < 0) {
					_ret = _doc.getElementById(selectorOrNode.replace('#', ''));
				// by ClassName
				} else if (_doc.getElementsByClassName && selectorOrNode.indexOf('.') === 0 && selectorOrNode.indexOf('#') < 0 && selectorOrNode.indexOf(' ') < 0 && selectorOrNode.indexOf(',') < 0) {
					_ret = _doc.getElementsByClassName(selectorOrNode.replace('.', ''));
					_ret = _deArray(_ret);
				// by TagName
				} else if (_doc.getElementsByTagName && selectorOrNode.indexOf('.') < 0 && selectorOrNode.indexOf('#') < 0 && selectorOrNode.indexOf(' ') < 0 && selectorOrNode.indexOf(',') < 0) {
					_ret = _doc.getElementsByTagName(selectorOrNode);
					_ret = _deArray(_ret);
				// complex css selectors
				} else if (_doc.querySelectorAll) {
					_ret = _doc.querySelectorAll(selectorOrNode);
					_ret = _deArray(_ret);
				// undefined
				} else {
					_ret = this;
				}

				// If no element was found return undefined
				if (!_ret) {
					_ret = undefined;
				}

				return _ret;
			},
			hasClass: function(selectorOrNode, className) {
				if (typeof selectorOrNode === 'undefined' || typeof className === 'undefined') {
					return;
				}

				var _tmpElements = (typeof selectorOrNode === 'string' ? this.e(selectorOrNode) : selectorOrNode),
					_ret;

				// must always be an array, otherwise for-loop doesnt work
				_tmpElements = _makeArray(_tmpElements);

				for (var i = 0,ilen = _tmpElements.length; i < ilen; i++) {
					// following code has been taken from http://dailyjs.com/2011/08/25/framework-77/
					var s = _tmpElements[i].className, k = s.indexOf(className);
					_ret = k != -1 && (s.charCodeAt(k - 1) || 32) == 32 && (s.charCodeAt(k + className.length) || 32) == 32;
				}

				return _ret;
			},
			addClass: function(selectorOrNode, className) {
				if (typeof selectorOrNode === 'undefined' || typeof className === 'undefined') {
					return;
				}

				var _tmpElements = (typeof selectorOrNode === 'string' ? this.e(selectorOrNode) : selectorOrNode),
					_tmpselectorOrNode,
					_tmpClassName;

				// must always be an array, otherwise for-loop doesnt work
				_tmpElements = _makeArray(_tmpElements);

				for (var i = 0,ilen = _tmpElements.length; i < ilen; i++) {
					_tmpselectorOrNode = _tmpElements[i];
					if (_tmpselectorOrNode.className.indexOf(className) < 0) {
						if (_tmpselectorOrNode.className !== '') {
							_tmpClassName = _tmpselectorOrNode.className + ' ' + className;
							_tmpselectorOrNode.className = _tmpClassName;
						} else {
							_tmpselectorOrNode.className = className;
						}
					}
				}

				return _tmpElements;
			},
			removeClass: function(selectorOrNode, className) {
				if (typeof selectorOrNode === 'undefined' || typeof className === 'undefined') {
					return;
				}

				var _tmpElements = (typeof selectorOrNode === 'string' ? this.e(selectorOrNode) : selectorOrNode),
					_tmpselectorOrNode,
					_tmpClassName,
					_tmpClassNames = '';

				// must always be an array, otherwise for-loop doesnt work
				_tmpElements = _makeArray(_tmpElements);

				for (var i = 0,ilen = _tmpElements.length; i < ilen; i++) {
					_tmpselectorOrNode = _tmpElements[i];
					if (_tmpselectorOrNode.className !== '') {
						_tmpClassName = _tmpselectorOrNode.className.split(' ');
						for (var j = 0,jlen = _tmpClassName.length; j < jlen; j++) {
							if (_tmpClassName[j] !== className) {
								_tmpClassNames += _tmpClassName[j] + ' ';
							}
						}
						_tmpselectorOrNode.className = _tmpClassNames;
					}
				}

				return _tmpElements;
			},
			// addEvent and removeEvent taken from http://www.mediaevent.de/javascript/event_listener.html
			addEvent: function(selectorOrNode, eventType, fn) {
				if (typeof selectorOrNode === 'undefined' || typeof eventType === 'undefined' || typeof fn === 'undefined') {
					return;
				}

				var _tmpElements = (typeof selectorOrNode === 'string' ? this.e(selectorOrNode) : selectorOrNode),
					_tmpselectorOrNode;

				// must always be an array, otherwise for-loop doesnt work
				_tmpElements = _makeArray(_tmpElements);

				// If touch event feature detect it first
				if (eventType.indexOf('touch') > -1 && !'createTouch' in document) {
					eventType = 'click';
				}

				for (var i = 0,ilen = _tmpElements.length; i < ilen; i++) {
					_tmpselectorOrNode = _tmpElements[i];
					if (_tmpselectorOrNode.addEventListener) {
						_tmpselectorOrNode.addEventListener(eventType, fn, false);
					} else if (_tmpselectorOrNode.attachEvent) {
						_tmpselectorOrNode["e" + eventType + fn] = fn;
						_tmpselectorOrNode[eventType + fn] = function() {
							_tmpselectorOrNode["e" + eventType + fn](window.event);
						};
						_tmpselectorOrNode.attachEvent("on" + eventType, _tmpselectorOrNode[eventType + fn]);
					}
				}
			},
			removeEvent: function(selectorOrNode, eventType, fn) {
				if (typeof selectorOrNode === 'undefined' || typeof eventType === 'undefined' || typeof fn === 'undefined') {
					return;
				}

				var _tmpElements = (typeof selectorOrNode === 'string' ? this.e(selectorOrNode) : selectorOrNode),
					_tmpselectorOrNode;

				// must always be an array, otherwise for-loop doesnt work
				_tmpElements = _makeArray(_tmpElements);

				for (var i = 0,ilen = _tmpElements.length; i < ilen; i++) {
					_tmpselectorOrNode = _tmpElements[i];
					if (_tmpselectorOrNode.removeEventListener) {
						_tmpselectorOrNode.removeEventListener(eventType, fn, false);
					} else if (_tmpselectorOrNode.detachEvent) {
						_tmpselectorOrNode.detachEvent("on" + eventType, _tmpselectorOrNode[eventType + fn]);
						_tmpselectorOrNode[eventType + fn] = null;
						_tmpselectorOrNode["e" + eventType + fn] = null;
					}
				}
			}
		};
	})();

	// Push object into global scope
	window.$m = $m;
})();