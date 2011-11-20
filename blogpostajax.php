<?php
require_once("php/inc/head.inc.php");

$smarty->assign('page', 'blog');



// DB + table
$smarty->configLoad('db.conf', 'Database');
$host = $smarty->getConfigVars('host');
$user = $smarty->getConfigVars('user');
$password = $smarty->getConfigVars('password');
$db = $smarty->getConfigVars('db');

$tblPosts = "mk_posts";
$dsn = 'mysql:host='.$host.';dbname='.$db.'';


// Fetch data for main-area
if (isset($_GET["limit"]) && strlen($_GET["limit"]) < 4) {
	$limit = mysql_real_escape_string($_GET["limit"]);
	$db = new PDO($dsn, $user, $password, array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true));

	$result = $db->prepare("select * from $tblPosts ORDER BY date DESC LIMIT $limit,1");
	$result->execute();
	$result->setFetchMode(PDO::FETCH_LAZY);

	$smarty->assign('blogResult', $result);
}




// ---------------------
// Print output
$smarty->display('blogpostajax.tpl');
