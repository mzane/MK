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


// Fetch data for main-area
$dsn = 'mysql:host='.$host.';dbname='.$db.'';
$db = new PDO($dsn, $user, $password, array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true));

$result = $db->prepare("select * from $tblPosts ORDER BY date DESC LIMIT 4");
$result->execute();
$result->setFetchMode(PDO::FETCH_LAZY);

$smarty->assign('blogResult', $result);


// Fetch data for archive in aside
$db = new PDO($dsn, $user, $password, array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true));

$resultArchive = $db->prepare("select * from $tblPosts ORDER BY date DESC");
$resultArchive->execute();
$resultArchive->setFetchMode(PDO::FETCH_LAZY);

$smarty->assign('archiveResult', $resultArchive);


// Fetch data for tags
$db = new PDO($dsn, $user, $password, array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true));

$resultTags = $db->prepare("select tags from $tblPosts");
$resultTags->execute();
$resultTags->setFetchMode(PDO::FETCH_LAZY);

$tagList = array();
$tagListInner = array();
foreach ($resultTags as $entryTags) {
	$tagListInner = explode(", ", $entryTags["tags"]);
	foreach ($tagListInner as $entryListInner) {
		if (!in_array($entryListInner, $tagList)) {
			array_push($tagList, $entryListInner);
		}
	}
}

$smarty->assign('tagList', $tagList);



// ---------------------
// Print output
$smarty->display('index.tpl');