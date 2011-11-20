<?php
require_once("php/inc/head.inc.php");

$smarty->assign('page', 'contact');



// DB
$smarty->configLoad('db.conf', 'Database');
$host = $smarty->getConfigVars('host');
$user = $smarty->getConfigVars('user');
$password = $smarty->getConfigVars('password');
$db = $smarty->getConfigVars('db');


// Insert message
if (isset($_POST["contact-name"]) && isset($_POST["contact-message"]) && $_POST["hp"] == "") {
	$contactName = htmlspecialchars(mysql_real_escape_string($_POST["contact-name"]));
	$contactEmail = htmlspecialchars(mysql_real_escape_string($_POST["contact-email"]));
	$contactMessage = htmlspecialchars(mysql_real_escape_string($_POST["contact-message"]));
	$date = mktime();

	$tblMessages = "mk_messages";

	// DB
	$dsn = 'mysql:host='.$host.';dbname='.$db.'';
	$db = new PDO($dsn, $user, $password, array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true));

	// Insert message
	$result = $db->prepare("INSERT INTO $tblMessages (name,email,message,date) VALUES ('$contactName','$contactEmail','$contactMessage','$date')");
	$result->execute();
	$result->setFetchMode(PDO::FETCH_LAZY);

	if ($result) {
		$mailContent = "Name: ".$contactName."\nE-Mail: ".$contactEmail."\nNachricht:\n".$contactMessage."\n\nDatum: ".$date;
		$recipient = "matthias@matthiaskrumm.name";
		$subject = "matthiaskrumm.name: Neue Nachricht ueber das Kontaktformular";
		$header = "From: ". $contactName . " <" . $contactEmail . ">\r\n";
		mail($recipient, $subject, $mailContent, $header);

		echo "success";
	} else {
		echo "error";
	}
}



// ---------------------
// Print output
$smarty->display('contact.tpl');
