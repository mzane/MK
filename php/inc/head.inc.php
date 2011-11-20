<?php
require_once("db.inc.php");

// General smarty-config
define("host", "http://matthiaskrumm.name");
define("absoluteHtdocsPath", "/homepages/23/d353316836/htdocs/".$_SERVER["HTTP_HOST"]);

require(absoluteHtdocsPath.'/lib/Smarty/Smarty.class.php');
$smarty = new Smarty();

$smarty->setTemplateDir(absoluteHtdocsPath.'/php/smarty/templates');
$smarty->setCompileDir(absoluteHtdocsPath.'/php/smarty/templates_c');
$smarty->setCacheDir(absoluteHtdocsPath.'/php/smarty/cache');
$smarty->setConfigDir(absoluteHtdocsPath.'/php/smarty/configs');




$smarty->assign('host', host);
$smarty->assign('urlEncoded', urlencode(host.$_SERVER['PHP_SELF']));
$smarty->assign('url', host.$_SERVER['PHP_SELF']);

$smarty->assign('mtimeFavicon', filemtime(absoluteHtdocsPath.'/static/img/favicon.ico'));
$smarty->assign('mtimeFacebookLogo', filemtime(absoluteHtdocsPath.'/static/img/logo-100x75.gif'));
$smarty->assign('mtimeDefaultCss', filemtime(absoluteHtdocsPath.'/static/css/default.css'));
$smarty->assign('mtimeDefaultJs', filemtime(absoluteHtdocsPath.'/static/js/default.js'));
