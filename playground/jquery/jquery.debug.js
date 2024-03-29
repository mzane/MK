/**
 * jQuery.debug
 * Copyright (c) 2009-2011 Matthias Krumm -  matthias(at)matthiaskrumm(dot)name | http://matthiaskrumm.name
 * Licensed under GNU General Public License v2
 * Date: 2/14/2010
 *
 * @projectDescription Debug plugin sets up an console like Firebug, but only if there is no window.console-object. Adds also a simple CSS-edit-functionality.
 * http://matthiaskrumm.name
 * Works with jQuery +1.3.0. Tested on FF 3, IE 8/7/6 on WinXP.
 * All Opera-version have problems with the positioned edit-in-place input.
 * Safari and Chrome have their own console.
 *
 * @author Matthias Krumm
 * @version 0.1
 *
 * @id jQuery.debug
 * @param {object} object or string or whatever that should be shown in the console
 * @return {object} Returns the jQuery object, for chaining.
 */
(function($) {
	var d, dName = "mk-debug-console", dInspect = "mk-dc-inspect", dClose = "mk-dc-close", dPEntry = "mk-c-entry", dStyles = "mk-dc-styles", dEdit = "mk-debug-edit", dEditForm = "mk-debug-edit-form";
	var a = [], eCount = 0, oInfo = "";

	$.debug = function(msg) {
		if (typeof window.console === "object") {
			window.console.log(msg);
		} else {
			// If debug console doesn't exist already, we need to create and style it
			if ($("#" + dName).length < 1) {
				$("body").append('<div id="' + dName + '"></div>');
				d = $("#" + dName);
				d.css({
					"background-color": "#BBB",
					"border-top": "2px solid #000",
					"bottom": "0px",
					"color": "#000",
					"font-size": "11px",
					"font-family": "Courier New",
					"height": "33%",
					"left": "0px",
					"line-height": "14px",
					"margin": "0",
					"overflow": "auto",
					"padding": "0px",
					"position": "fixed",
					"width": "100%"
				});

				// Close- and inspect-buttons
				d.append('<p style="background-color: #AAA; text-align: right;"><a href="javascript://;" id="' + dInspect + '">inspect[i]</a> | <a href="javascript://;" id="' + dClose + '">close[x]</a></p>');
				d.find("#" + dClose).bind("click", function() {
					d.hide();
					$(this).blur();
					return false;
				});

				// Object-inspector
				d.find("#" + dInspect).bind("click", function() {
					$("body *").each(function() {
						var cssBorderStyle = $(this).css("border-style");
						var cssBorderWidth = $(this).css("border-width");
						var cssBorderColor = $(this).css("border-color");
						$(this).bind("mouseover", function() {
							$(this).css("border", "solid 2px lightblue");
						}).bind("mouseout", function() {
							$(this).css({
								"border-style": cssBorderStyle,
								"border-width": cssBorderWidth,
								"border-color": cssBorderColor
							});
						}).bind("click", function() {
							$("body *").trigger("mouseout");
							eCount++;
							if ($(this).attr("id") != "") {
								oInfo = "#" + $(this).attr("id");
							} else if ($(this).attr("class") != "") {
								oInfo = "." + $(this).attr("class");
							} else {
								oInfo = $(this);
							}
							a[eCount] = setEntry($(this), eCount, oInfo);
							setupConsoleObject(a[eCount]);
							setupStyleContainer(a[eCount]);
							$("body *").unbind("mouseover mouseout click");
							$(this).blur();
							return false;
						});
					});
					$(this).blur();
					return false;
				});
			} else {
				$("#" + dName).show();
			}


			// ---------- The following part of the script runs every time the function is called! ----------

			// Get debug-console object again
			d = $("#" + dName);

			// Append messages
			var txt = "";
			if (typeof msg === "object") {
				// If it isn't a jQuery object, we have to convert it first
				msg = $(msg);
				if (msg.attr("id") != "") {
					oInfo = "#" + msg.attr("id");
					txt = msg + " " + oInfo;
				} else if (msg.attr("class") != "") {
					oInfo = "." + msg.attr("class");
					txt = msg + " " + oInfo;
				} else {
					txt = msg;
				}
			} else if (msg === "") {
				txt = "(empty string)";
			} else if (msg === undefined) {
				txt = "[undefined]";
			} else {
				txt = msg;
			}
			d.append('<p id="' + dPEntry + '-' + eCount + '">' + txt + '</p>');

			// Style paragraphs
			var p = d.find("p");
			p.css({
				"border-bottom": "1px solid #666",
				"margin": "0",
				"padding": "2px"
			});

			// Build array of entries and set up object entries
			a[eCount] = setEntry(msg, eCount, oInfo);
			if (typeof a[eCount] === "object") {
				setupConsoleObject(a[eCount]);
			}
			eCount++;
		}

		// Set up an console-entry
		function setEntry(o, i, oInfo) {
			var ret = new Object();
			if (typeof o === "object") {
				ret = {
					"o": o,
					"id": o.attr("id"),
					"cls": o.attr("class"),
					"bgColor": o.css("background-color"),
					"i": i,
					"oInfo": oInfo
				};
			} else {
				ret = o;
			}
			return ret;
		}

		// Set up a specific object if the console-entry is an object
		function setupConsoleObject(o) {
			$("p#" + dPEntry + "-" + o["i"]).css({
				"color": "blue",
				"cursor": "pointer"
			}).bind("mouseover", function() {
				// "Real" object in document
				$(o["o"]).css({
					"background-color": "lightblue"
				});
				// Object in console
				$(this).css({
					"background-color": "CCC",
					"text-decoration": "underline"
				});
			}).bind("mouseout", function() {
				// "Real" object in document
				$(o["o"]).css({
					"background-color": o["bgColor"]
				});
				// Object in console
				$(this).css({
					"background-color": "transparent",
					"text-decoration": "none"
				});
			}).bind("click", function() {
				// "Real" object in document
				$(o["o"]).css({
					"background-color": o["bgColor"]
				});
				// Get and build styles for "real" object in document
				setupStyleContainer(o);
			});
		}

		// Set up the container for the styles
		function setupStyleContainer(o) {
			// If there was another one appended first we need to remove it
			if ($("#" + dStyles).length > 0) $("#" + dStyles).remove();

			// Append the style-div
			d.append('<div id="' + dStyles + '">CSS properties of ' + o["oInfo"] + ':<br />' + getStyleList(o) + '</div>');
			var ds = $("#" + dStyles);

			// Style the style-div
			ds.css({
				"background-color": "#AAA",
				"border-style": "dotted",
				"border-color": "#000",
				"border-width": "2px 2px 0",
				"bottom": "0px",
				"color": "#000",
				"font-size": "11px",
				"font-family": "Courier New",
				"height": "28%",
				"line-height": "14px",
				"margin": "0",
				"overflow": "auto",
				"padding": "2px",
				"position": "fixed",
				"right": "25px",
				"width": "40%"
			});

			// Bind edit-in-place-function on spans
			$("." + dEdit).each(function() {
				$(this).bind("click", function() {
					editInPlace($(this), o);
				});
			});
		}

		// Get the style list
		function getStyleList(o) {
			var cssList = new Array("accelerator","azimuth","background","background-attachment","background-color","background-image","background-position","background-position-x","background-position-y","background-repeat","behavior","border","border-bottom","border-bottom-color","border-bottom-style","border-bottom-width","border-collapse","border-color","border-left","border-left-color","border-left-style","border-left-width","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-style","border-top","border-top-color","border-top-style","border-top-width","border-width","bottom","caption-side","clear","clip","color","content","counter-increment","counter-reset","cue","cue-after","cue-before","cursor","direction","display","elevation","empty-cells","filter","float","font","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","height","ime-mode","include-source","layer-background-color","layer-background-image","layout-flow","layout-grid","layout-grid-char","layout-grid-char-spacing","layout-grid-line","layout-grid-mode","layout-grid-type","left","letter-spacing","line-break","line-height","list-style","list-style-image","list-style-position","list-style-type","margin","margin-bottom","margin-left","margin-right","margin-top","marker-offset","marks","max-height","max-width","min-height","min-width","-moz-binding-moz-border-radius","-moz-border-radius-topleft","-moz-border-radius-topright","-moz-border-radius-bottomright","-moz-border-radius-bottomleft","-moz-border-top-colors","-moz-border-right-colors","-moz-border-bottom-colors","-moz-border-left-colors","-moz-opacity","-moz-outline","-moz-outline-color","-moz-outline-style","-moz-outline-width","-moz-user-focus","-moz-user-input","-moz-user-modify","-moz-user-select","orphans","outline","outline-color","outline-style","outline-width","overflow","overflow-X","overflow-Y","padding","padding-bottom","padding-left","padding-right","padding-top","page","page-break-after","page-break-before","page-break-inside","pause","pause-after","pause-before","pitch","pitch-range","play-during","position","quotes","-replace","richness","right","ruby-align","ruby-overhang","ruby-position","-set-link-source","size","speak","speak-header","speak-numeral","speak-punctuation","speech-rate","stress","scrollbar-arrow-color","scrollbar-base-color","scrollbar-dark-shadow-color","scrollbar-face-color","scrollbar-highlight-color","scrollbar-shadow-color","scrollbar-3d-light-color","scrollbar-track-color","table-layout","text-align","text-align-last","text-decoration","text-indent","text-justify","text-overflow","text-shadow","text-transform","text-autospace","text-kashida-space","text-underline-position","top","unicode-bidi","-use-link-source","vertical-align","visibility","voice-family","volume","white-space","widows","width","word-break","word-spacing","word-wrap","writing-mode","z-index","zoom");
			var retCssList = "", cssVal = "";

			// Iterate through each item in array
			for (var i = 0; i < cssList.length; i++) {
				cssVal = $(o["o"]).css(cssList[i]);
				retCssList = retCssList + '<br />' + cssList[i] + ': <span class="' + dEdit + ' mk-edit-css-prop_' + cssList[i] + '">' + cssVal + '</span>';
			}

			// Return list
			return retCssList;
		}

		// Edit-in-place function
		function editInPlace(editSpan, o) {
			// Remove an maybe existing form first
			$("#" + dEditForm).remove();

			// Build a new form
			editSpan.css("position", "relative").append('<form action="#" id="' + dEditForm + '"><label for="mk-edit-span">Edit in place</label><input type="text" id="mk-edit-span" size="20" value="' + editSpan.text() + '" /></form>');

			$("#" + dEditForm).css({
				"position": "absolute",
				"left": "0px",
				"top": "-2px"
			}).bind("submit", function() {
				var cssVal = $(this).find("input[type='text']").val();
				if (cssVal == editSpan.text()) return;
				var cssProp = editSpan.attr("class").split(" ")[1];
				cssProp = cssProp.split("_")[1];
				$(o["o"]).css(cssProp, cssVal);
				if (cssProp == "background-color") o["bgColor"] = cssVal;
				editSpan.text(cssVal);
				$("#" + dEditForm).remove();
				return false;
			});

			$("#" + dEditForm + " label").hide();

			$("#" + dEditForm + " input").css({
				"color": "#000",
				"font-size": "11px",
				"font-family": "Courier New",
				"line-height": "14px",
				"margin": "0",
				"padding": "1px"
			}).bind("blur", function() {
				var cssVal = $(this).val();
				if (cssVal == editSpan.text()) return;
				var cssProp = editSpan.attr("class").split(" ")[1];
				cssProp = cssProp.split("_")[1];
				$(o["o"]).css(cssProp, cssVal);
				if (cssProp == "background-color") o["bgColor"] = cssVal;
				editSpan.text(cssVal);
				$("#" + dEditForm).remove();
				return false;
			}).select().focus();
		}
	};

	// Start the console with key "k"
	$(document).ready(function() {
		$(document).bind("keyup", function(event) {
			if (event.which == '75') {
				$.debug("Console initiated by you!");
			}
		});
	});

	// Final return of jQuery object
	return this;
})(jQuery);