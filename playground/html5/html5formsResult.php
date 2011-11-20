<?php
require_once("/homepages/23/d353316836/htdocs/matthiaskrumm.name/php/inc/db.inc.php");

$tbl_html5Results = "playground_html5_form_input";

$order = "elementattribute";
if (isset($_GET["order"])) {
	$order = htmlspecialchars(mysql_real_escape_string($_GET["order"]));
}

$da = "DESC";
if (isset($_GET["da"])) {
	$da = htmlspecialchars(mysql_real_escape_string($_GET["da"]));
}

$result = $db->prepare("SELECT * FROM $tbl_html5Results ORDER BY $order $da");
$result->execute();
$result->setFetchMode(PDO::FETCH_LAZY);
?>
<!DOCTYPE html>
<html lang="de">
	<head>
		<title>HTML5 Forms Result - Playground - matthiaskrumm.name</title>
		<meta charset="utf-8">
        <link rel="icon" href="/static/img/favicon.ico" type="image/x-icon">
        <link rel="shortcut icon" href="/static/img/favicon.ico" type="image/x-icon">
		<meta name="robots" content="all,noodp,noydir,noindex,nofollow">
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
		<style>
			table, th, td {
				border: 1px solid #737373;
				border-collapse: collapse;
				padding: 2px 3px;
			}
		</style>
	</head>
	<body>
		<h1>HTML5 Form - Auswertung</h1>

		<table>
			<thead>
				<tr>
					<th><a href="<?php echo $_SERVER['PHP_SELF'] ?>?order=elementattribute">Element/Attribute</a></th>
					<th><a href="<?php echo $_SERVER['PHP_SELF'] ?>?order=support">Support</a></th>
					<th><a href="<?php echo $_SERVER['PHP_SELF'] ?>?order=useragent">UserAgent</a></th>
					<th><a href="<?php echo $_SERVER['PHP_SELF'] ?>?order=date">Date</a></th>
				</tr>
			</thead>
			<tbody>
<?php
$count = 0;
foreach ($result as $entry) {
	echo "<tr>";
		echo "<td>".$entry["elementattribute"]."</td>";
		echo "<td>".$entry["support"]."</td>";
		echo "<td>".$entry["useragent"]."</td>";
		echo "<td>".date("D, d M Y H:i:s", $entry["date"])."</td>";
	echo "</tr>";
	$count++;
}
echo "<p>Anzahl Datens&auml;tze: ".$count."</p>";
?>
			</tbody>
		</table>
	</body>
</html>