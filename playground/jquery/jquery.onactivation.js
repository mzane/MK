/**
 * jQuery.onActivation
 * Copyright (c) 2009-2011 Matthias Krumm -  matthias(at)matthiaskrumm(dot)name | http://matthiaskrumm.name
 * Licensed under GNU General Public License v2
 * Date: 2/5/2010
 *
 * @projectDescription onActivation binds a click- and a keyup-event to a defined element, and the developer makes sure that also keyboard users are ready to go.
 * Additionally the plugin also prevents double clicks where double clicks shouldn't be valid.
 * http://matthiaskrumm.name/blogpost/13_jquery-plugin-onactivation.php
 * Works with jQuery +1.3.0. Tested on FF 3, IE 8 on WinXP.
 *
 * @author Matthias Krumm
 * @version 0.1.4
 *
 * @id jQuery.onActivation
 * @id jQuery.fn.onActivation
 * @param {function} function that should be triggered.
 * @return {object} Returns the same jQuery object, for chaining.
 *
 * @desc Trigger function doSomething() when user activated an anchor
 * @example $("a").onActivation(function() { doSomething(); });
 *
 * @desc Trigger function doSomething() when user activated a submit button
 * @example $("input[type='submit']").onActivation(function() { doSomething(); });
 */
(function($){
	$.fn.onActivation = function(func) {
		var working = false;
		return this.each(function() {
			$(this).bind("click keyup", function(event) {
				event.preventDefault();
				if (!working) {
					func();
					working = true;
				}
				window.setTimeout(function() {
					working = false;
				}, 500);
			});
		});
	};
})(jQuery);
