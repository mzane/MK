<?php
require_once("php/inc/head.inc.php");

$smarty->assign('page', 'error404');



// ---------------------
// Print output
$smarty->display('error404.tpl');
