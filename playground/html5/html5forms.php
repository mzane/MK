<?php
// Arrays used for HTML5-stuff
$inputTypes = array("Hidden", "Search", "Telephone", "URL", "E-mail", "Password", "Date Time", "Date", "Month", "Week", "Time", "Local Date Time", "Number", "Range", "Color", "Checkbox", "Radio", "File", "Submit", "Image", "Reset", "Button");
$inputAttributes = array("autocomplete", "dirname", "list", "readonly", "disabled", "size", "required", "multiple", "maxlength", "pattern", "min", "max", "step", "placeholder", "autofocus", "checked", "maxlength", "novalidate", "formnovalidate");
$formElements = array("fieldset", "legend", "label", "input", "button", "select", "datalist", "optgroup", "option", "textarea", "keygen", "output", "progress", "meter");

$date = mktime();
?>
<!DOCTYPE html>
<html lang="de">
	<head>
		<title>HTML5 Forms - Playground - matthiaskrumm.name</title>
		<meta charset="utf-8">
        <link rel="icon" href="/static/img/favicon.ico" type="image/x-icon">
        <link rel="shortcut icon" href="/static/img/favicon.ico" type="image/x-icon">
		<meta name="robots" content="all,noodp,noydir,noindex,nofollow">
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
		<script>
			var date = "<?php echo $date; ?>";

			function postHTML5Result(elementAttribute, support, userAgent, date) {
				// Add track=off to the url (as a GET-parameter) to switch off tracking
				if (window.location.href.indexOf("track=off") > -1) {
					return false;
				}

				$.ajax({
					type: "POST",
					url: "html5formsPost.php",
					data: "elementAttribute=" + elementAttribute + "&support=" + support + "&userAgent=" + userAgent + "&date=" + date
				});
			}
		</script>
	</head>
	<body>
		<h1>HTML5 Forms-Unterst&uuml;tzung</h1>


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
			echo '<p><label>'.$inputType.': <input type="'.str_replace(" ", "-", strtolower($inputType)).'" data-inputtype="'.str_replace(" ", "-", strtolower($inputType)).'"></label></p>';
		}
		?>
		</form>
		<script>
			$("#input-types input").each(function() {
				if ($(this).attr("type") === "text") {
					$(this).after(' <span style="color: #F00;">nicht unterst&uuml;tzt</span>');
					postHTML5Result("input-type:" + $(this).attr("data-inputtype"), "0", userAgent, date);
				} else {
					$(this).after(' <span style="color: #1E1; font-weight: bold;">unterst&uuml;tzt</span>');
					postHTML5Result("input-type:" + $(this).attr("data-inputtype"), "1", userAgent, date);
				}
			});
		</script>


		<!-- FORM-ATTRIBUTES -->
		<hr>
		<h2>Form-attributes</h2>
		<form action="#" id="input-attributes">
		<?php
		foreach ($inputAttributes as $inputAttribute) {
			echo '<p><label>'.$inputAttribute.': <input type="text" '.str_replace(" ", "-", strtolower($inputAttribute)).' data-attr="'.str_replace(" ", "-", strtolower($inputAttribute)).'"></label></p>';
		}
		?>
		</form>
		<script>
			$("#input-attributes input").each(function() {
				if ($(this).attr($(this).attr("data-attr")) == "") {
					$(this).after(' <span style="color: #F00;">nicht unterst&uuml;tzt</span>');
					postHTML5Result("input-attribute:" + $(this).attr("data-attr"), "0", userAgent, date);
				} else {
					$(this).after(' <span style="color: #1E1; font-weight: bold;">unterst&uuml;tzt</span>');
					postHTML5Result("input-attribute:" + $(this).attr("data-attr"), "1", userAgent, date);
				}
			});
		</script>


		<!-- FORM-ELEMENTS -->
		<hr>
		<h2>Form-elements</h2>
		<form action="#" id="form-elements">
		<?php
		foreach ($formElements as $formElement) {
			echo '<p><label>'.$formElement.': <'.str_replace(" ", "-", strtolower($formElement)).' class="form-inputs">'.str_replace(" ", "-", strtolower($formElement)).'</'.str_replace(" ", "-", strtolower($formElement)).'></label></p>';
		}
		?>
		</form>
		<!--<script>
			// todo: check for support!
			$("#form-elements .form-inputs").each(function() {

			});
		</script>-->

	</body>
</html>
