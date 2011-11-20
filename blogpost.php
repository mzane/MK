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
$tblPostComments = "mk_postcomments";
$dsn = 'mysql:host='.$host.';dbname='.$db.'';


// Fetch data for main-area
if (isset($_GET["postId"]) && strlen($_GET["postId"]) < 4) {
	$db = new PDO($dsn, $user, $password, array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true));
	$postId = mysql_real_escape_string($_GET["postId"]);

	// All data
	$result = $db->prepare("select * from $tblPosts WHERE id='$postId' LIMIT 1");
	$result->execute();
	$result->setFetchMode(PDO::FETCH_LAZY);

	$smarty->assign('blogResult', $result);

	// Only headline
	$resultHeadline = $db->prepare("select headline from $tblPosts WHERE id='$postId' LIMIT 1");
	$resultHeadline->execute();
	$resultHeadline->setFetchMode(PDO::FETCH_LAZY);

	$smarty->assign('blogResultHeadline', $resultHeadline);
}
$smarty->assign('urlBlogpost', urlencode(host."/blogpost/".$postId."_".htmlspecialchars($_GET["postHeadline"]).".php"));


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


// Fetch data for comments
$db = new PDO($dsn, $user, $password, array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true));

$postId = mysql_real_escape_string($_GET["postId"]);
$resultComments = $db->prepare("select * from $tblPostComments WHERE postId='$postId' ORDER BY date DESC");
$resultComments->execute();
$resultComments->setFetchMode(PDO::FETCH_LAZY);

$smarty->assign('resultComments', $resultComments);


// Write comment
function curler($url) {
	$ch= curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_TIMEOUT, 60);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);

	// execute Curl and save result
	$response= curl_exec($ch);
	$curl_error= curl_error($ch);

	return $response;
}

if (isset($_POST["write-comment-id"]) && isset($_POST["write-comment-name"]) && isset($_POST["write-comment-comment"]) && $_POST["write-comment-hp"] == "" && curler("http://www.opencaptcha.com/validate.php?ans=".$_POST["write-comment-captcha"]."&img=".$_POST["write-comment-captcha-img"]) == "pass") {
	$writeCommentId = mysql_real_escape_string($_POST["write-comment-id"]);
	$writeCommentName = mysql_real_escape_string($_POST["write-comment-name"]);
	$writeCommentEmail = mysql_real_escape_string($_POST["write-comment-email"]);
	$writeCommentComment = mysql_real_escape_string($_POST["write-comment-comment"]);
	$writeCommentComment = substr($writeCommentComment, 0, 20000);
	$date = mktime();

	// Insert new post
	$result = $db->prepare("INSERT INTO $tblPostComments (postId,name,email,comment,date) VALUES ('$writeCommentId','$writeCommentName','$writeCommentEmail','$writeCommentComment','$date')");
	$result->execute();
	$result->setFetchMode(PDO::FETCH_LAZY);

	if ($result) {
		$mailContent = "Name: ".$writeCommentName."\nE-Mail: ".$writeCommentEmail."\nKommentar:\n".$writeCommentComment."\n\nDatum: ".$date."\n\nPost-Id: ".$writeCommentId;
		$recipient = "matthias@matthiaskrumm.name";
		$subject = "matthiaskrumm.name: Neuer Post-Kommentar";
		$header = "From: ". $writeCommentName . " <" . $writeCommentEmail . ">\r\n";
		mail($recipient, $subject, $mailContent, $header);

		echo "success";
	} else {
		echo "error";
	}
}


// Captcha
$date = date("Ymd");
$rand = rand(0,9999999999999);
$height = "80";
$width  = "533";
$img    = "$date$rand-$height-$width.jpgx";
$smarty->assign('captchaImg', $img);
$smarty->assign('captchaHeight', $height);
$smarty->assign('captchaWidth', $width);




// ---------------------
// Print output
$smarty->display('blogpost.tpl');
