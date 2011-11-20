<?php
require_once("php/inc/head.inc.php");

$smarty->assign('page', 'iwrite');



// DB
$smarty->configLoad('db.conf', 'Database');
$host = $smarty->getConfigVars('host');
$user = $smarty->getConfigVars('user');
$password = $smarty->getConfigVars('password');
$db = $smarty->getConfigVars('db');

$dsn = 'mysql:host='.$host.';dbname='.$db.'';
$db = new PDO($dsn, $user, $password, array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true));

$tblPosts = "mk_posts";


// Fetch data for tags
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


// New post
if (isset($_POST["new-post-headline"]) && isset($_POST["new-post-text"])) {
	$newPostHeadline = mysql_real_escape_string($_POST["new-post-headline"]);
	$newPostText = htmlspecialchars($_POST["new-post-text"]);
	$newPostTags = mysql_real_escape_string($_POST["new-post-tags"]);
	if (isset($_POST["new-post-timestamp"])) {
		$newPostTimestamp = mysql_real_escape_string($_POST["new-post-timestamp"]);
		$date = $newPostTimestamp;
	} else {
		$date = mktime();
	}

	// Insert new post
	$result = $db->prepare("INSERT INTO $tblPosts (headline,text,tags,date) VALUES ('$newPostHeadline','$newPostText','$newPostTags','$date')");
	$result->execute();
	$result->setFetchMode(PDO::FETCH_LAZY);

	if ($result) {
		echo "success";
	} else {
		echo "error";
	}
}


// Edit post
if (isset($_POST["edit-post-headline"]) && isset($_POST["edit-post-text"]) && isset($_POST["edit-post-id"])) {
	$editPostId = mysql_real_escape_string($_POST["edit-post-id"]);
	$editPostHeadline = mysql_real_escape_string($_POST["edit-post-headline"]);
	$editPostText = htmlspecialchars($_POST["edit-post-text"]);
	$editPostTags = mysql_real_escape_string($_POST["edit-post-tags"]);
	$editPostTimestamp = mysql_real_escape_string($_POST["edit-post-timestamp"]);
	$date = $editPostTimestamp;

	// Insert new post
	$result = $db->prepare("UPDATE $tblPosts SET headline='$editPostHeadline',text='$editPostText',tags='$editPostTags',date='$date' WHERE id='$editPostId' LIMIT 1");
	$result->execute();
	$result->setFetchMode(PDO::FETCH_LAZY);

	if ($result) {
		echo "success";
	} else {
		echo "error";
	}
}


// Fetch posts for select-form
$resultSelect = $db->prepare("SELECT * FROM $tblPosts ORDER BY date DESC");
$resultSelect->execute();
$resultSelect->setFetchMode(PDO::FETCH_LAZY);

$smarty->assign('resultSelect', $resultSelect);


// Select post
if (isset($_POST["select-post-id"])) {
	$selectPostId = mysql_real_escape_string($_POST["select-post-id"]);

	$resultSelectPost = $db->prepare("SELECT * FROM $tblPosts WHERE id='$selectPostId' LIMIT 1");
	$resultSelectPost->execute();
	$resultSelectPost->setFetchMode(PDO::FETCH_LAZY);

	if ($resultSelectPost) {
		$smarty->assign('resultSelectPost', $resultSelectPost);
	} else {
		echo "error";
	}
}



// ---------------------
// Print output
$smarty->display('iwrite.tpl');