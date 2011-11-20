<?php
require_once("/homepages/23/d353316836/htdocs/matthiaskrumm.name/php/inc/db.inc.php");


if (isset($_POST["elementAttribute"]) && isset($_POST["support"]) && isset($_POST["userAgent"]) && isset($_POST["date"])) {
	$elementattribute = mysql_real_escape_string($_POST["elementAttribute"]);
	$support = mysql_real_escape_string($_POST["support"]);
	$useragent = mysql_real_escape_string($_POST["userAgent"]);
	$date = mysql_real_escape_string($_POST["date"]);

	$tbl_html5Results = "playground_html5_form_input";

	$result = $db->prepare("INSERT INTO $tbl_html5Results (elementattribute,support,useragent,date) VALUES ('$elementattribute','$support','$useragent','$date')");
	$result->execute();
	$result->setFetchMode(PDO::FETCH_LAZY);
} else {
	echo '<meta http-equiv="refresh" content="0; URL=http://matthiaskrumm.name/playground/html5/html5forms.php">';
}
