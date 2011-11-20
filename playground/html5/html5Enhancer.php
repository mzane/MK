<?php
// Arrays used for HTML5-stuff
//$inputTypesComplete = array("Hidden", "search", "telephone", "url", "e-mail", "password", "date-time", "date", "month", "week", "time", "local-date-time", "number", "range", "color", "checkbox", "radio", "file", "submit", "image", "reset", "button");
//$inputAttributesComplete = array("autocomplete", "dirname", "list", "readonly", "disabled", "size", "required", "multiple", "maxlength", "pattern", "min", "max", "step", "placeholder", "autofocus", "checked", "novalidate", "formnovalidate");
//$formElementsComplete = array("fieldset", "legend", "label", "input", "button", "select", "datalist", "optgroup", "option", "textarea", "keygen", "output", "progress", "meter");

// HTML5Enhancer-stuff
$inputTypes = array("search", "telephone", "url", "e-mail", "date-time", "date", "month", "week", "time", "local-date-time", "number", "range", "color");
$inputAttributes = array("dirname", "list", "size", "required", "pattern", "min", "max", "step", "placeholder", "autofocus", "onforminput", "novalidate", "formnovalidate");
$formElements = array("datalist", "output", "progress", "meter");

// todo: Enhance also some other HTML5-stuff (things that Remy Sharp's html5shiv does: http://html5shim.googlecode.com/svn/trunk/html5.js)
$html5Elements = array("abbr", "article", "aside", "audio", "canvas", "details", "figcaption", "figure", "footer", "header", "hgroup", "mark", "nav", "section", "summary", "time", "video");

// todo: Build HTML5Enhancer (jQuery-plugin) http://ericleads.com/h5validate/
// load APIs from: http://code.google.com/intl/de-DE/apis/libraries/devguide.html
// http://jqueryui.com/demos/
?>
<!DOCTYPE html>
<html lang="de">
	<head>
		<title>HTML5FormEnhancer - Playground - matthiaskrumm.name</title>
		<meta charset="utf-8">
        <link rel="icon" href="/static/img/favicon.ico" type="image/x-icon">
        <link rel="shortcut icon" href="/static/img/favicon.ico" type="image/x-icon">
		<meta name="robots" content="all,noodp,noydir,noindex,nofollow">
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js"></script>
	</head>
	<body>
		<h1>HTML5 Form</h1>


		<p>Dein Browser (<span id="user-agent"><?php echo $_SERVER['HTTP_USER_AGENT']; ?></span>) unterst&uuml;tzt folgende HTML5 form-/input-Elemente/-Attribute:</p>
		<script>
			/*$.each($.browser, function(i, val) {
				$("<span>" + i + ": <span>" + val + "</span>, </span>").appendTo("#user-agent");
			});*/
			var userAgent = $("#user-agent").text();
		</script>


		<!-- INPUT-TYPES -->
		<h2>Input-types</h2>
		<form action="#" id="input-types">
		<?php
		foreach ($inputTypes as $inputType) {
			echo '<p><label>'.$inputType.': <input type="'.str_replace(" ", "-", strtolower($inputType)).'" data-html5enhanceinputtype="'.str_replace(" ", "-", strtolower($inputType)).'"></label></p>'."\n";
		}
		?>
		</form>



		<!-- FORM-ATTRIBUTES -->
		<hr>
		<h2>Form-attributes</h2>
		<form action="#" id="input-attributes">
		<?php
		foreach ($inputAttributes as $inputAttribute) {
			echo '<p><label>'.$inputAttribute.': <input type="text" '.str_replace(" ", "-", strtolower($inputAttribute)).' data-html5enhanceinputattributes="'.str_replace(" ", "-", strtolower($inputAttribute)).'"></label></p>'."\n";
		}
		?>
		</form>



		<!-- FORM-ELEMENTS -->
		<hr>
		<h2>Form-elements</h2>
		<form action="#" id="form-elements">
		<?php
		foreach ($formElements as $formElement) {
			echo '<p><label>'.$formElement.': <'.str_replace(" ", "-", strtolower($formElement)).' class="form-inputs">'.str_replace(" ", "-", strtolower($formElement)).'</'.str_replace(" ", "-", strtolower($formElement)).'></label></p>'."\n";
		}
		?>
		</form>


		<script>
//			var inputTypes = ["search", "telephone", "url", "e-mail", "date-time", "date", "month", "week", "time", "local-date-time", "number", "range", "color"];
			var inputAttributes = ["dirname", "list", "size", "required", "pattern", "min", "max", "step", "placeholder", "autofocus", "onforminput", "novalidate", "formnovalidate"];
			var formElements = ["datalist", "output", "progress", "meter"];

			// todo: Enhance also some other HTML5-stuff (things that Remy Sharp's html5shiv does: http://html5shim.googlecode.com/svn/trunk/html5.js)
//			var html5Elements = ["abbr", "article", "aside", "audio", "canvas", "details", "figcaption", "figure", "footer", "header", "hgroup", "mark", "nav", "section", "summary", "time", "video"];

			// todo: Build HTML5Enhancer (jQuery-plugin) http://ericleads.com/h5validate/
			// load APIs from: http://code.google.com/intl/de-DE/apis/libraries/devguide.html
			// http://jqueryui.com/demos/

			// HTML5Enhancer
			(function($){
				$.html5Enhancer = function() {
					// Enhance basic HTML5-elements for IE <= 8
					(function() {
						if ($.browser.ie && $.browser.version <= 8) {
							var html5Elements = ["abbr", "article", "aside", "audio", "canvas", "details", "figcaption", "figure", "footer", "header", "hgroup", "mark", "nav", "section", "summary", "time", "video"];

							for (var i = 0, len = html5Elements.length; i < len; i++) {
								document.createElement(html5Elements[i]);
							}
						}
					})();

					// Show enhancement
					var showEnhancement = function($obj) {
						$obj.css("background-color", "#EEE");
					};

					// Loader-function
					var loadJS = function(url, callback) {
						var loadedJS=document.createElement('SCRIPT');
						loadedJS.type = 'text/javascript';
						loadedJS.src = url;
						document.getElementsByTagName('head')[0].appendChild(loadedJS);

						window.setTimeout(function() {
							callback();
						}, 800);
					};

					// Enhance input-types
					(function() {
						var inputTypes = ["search", "telephone", "url", "e-mail", "date-time", "date", "month", "week", "time", "local-date-time", "number", "range", "color"],
							inputType = "",
							$currentElement = {};

						for (var i = 0, len = inputTypes.length; i < len; i++) {
							inputType = inputTypes[i].toLowerCase();
							$("*[data-html5enhanceinputtype='" + inputType + "']").each(function() {
								$currentElement = $(this);

								// Enhance it with nice JS
								if ($currentElement.attr("type") === "text") {
									showEnhancement($currentElement);

							        switch(inputType) {
								        case "search":
											loadJS("https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/jquery-ui.min.js", function() {
												var availableTags = [
													"ActionScript",
													"AppleScript",
													"Asp",
													"BASIC",
													"C",
													"C++",
													"Scheme"
												];

												$currentElement.autocomplete({
													source: availableTags
												});
											});
								        break;
								        case "telephone":

								        break;
								        case "url":

								        break;
								        case "e-mail":

								        break;
								        case "date-time":

								        break;
								        case "date":

								        break;
								        case "month":

								        break;
								        case "week":

								        break;
								        case "time":

								        break;
								        case "local-date-time":

								        break;
								        case "number":

								        break;
								        case "range":

								        break;
								        case "color":

								        break;
							        }
								}
							});
						}
					})();


					return this;
				};
			})(jQuery);
			
			$.html5Enhancer();
		</script>


	</body>
</html>
