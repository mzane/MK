<?php
$host="db3006.1und1.de";
$user="dbo354298112";
$password="1980mkmaindb0605";
$dbName="db354298112";

$dsn = 'mysql:host='.$host.';dbname='.$dbName.'';
$db = new PDO($dsn, $user, $password, array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true));

// This redundant but needed for mysql_real_escape_string()
mysql_connect($host, $user, $password);
mysql_select_db($dbName);
