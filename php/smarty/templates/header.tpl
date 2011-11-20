{strip}
{* navigation array *}
{$navi.blog.key = "blog"}
{$navi.blog.name = "Blog"}
{$navi.blog.file = "/"}
{$navi.blog.accesskey = "b"}
{$navi.work.key = "work"}
{$navi.work.name = "Projekte"}
{$navi.work.file = "/work.php"}
{$navi.work.accesskey = "p"}
{$navi.about.key = "about"}
{$navi.about.name = "&Uuml;ber"}
{$navi.about.file = "/about.php"}
{$navi.about.accesskey = "u"}
{$navi.contact.key = "contact"}
{$navi.contact.name = "Kontakt"}
{$navi.contact.file = "/contact.php"}
{$navi.contact.accesskey = "k"}
{$naviInvisible.iwrite.key = "iwrite"}
{$naviInvisible.iwrite.name = "Post schreiben"}
{$naviInvisible.iwrite.file = "/iwrite.php"}
{$naviInvisible.imprint.key = "imprint"}
{$naviInvisible.imprint.name = "Post schreiben"}
{$naviInvisible.imprint.file = "/imprint.php"}
{$naviInvisible.error404.key = "error404"}
{$naviInvisible.error404.name = "404 - Die Seite wurde nicht gefunden"}
{$naviInvisible.error404.file = "/error404.php"}
{$naviInvisible.html5forms.key = "html5forms"}
{$naviInvisible.html5forms.name = "HTML5 Playground - Formulare und Validation"}
{$naviInvisible.html5forms.file = "/playground/html5/forms.php"}

{config_load file='title.conf'}
{/strip}
<!DOCTYPE html>
<html lang="de">
	<head>
{if isset($title)}
		<title>{$title} - {$smarty.config.title}</title>
{elseif isset($navi[$page])}
		<title>{$navi[$page].name} - {$smarty.config.title}</title>
{elseif isset($naviInvisible[$page])}
		<title>{$naviInvisible[$page].name} - {$smarty.config.title}</title>
{else}
		<title>{$smarty.config.title}</title>
{/if}
		<meta charset="utf-8">
		<link rel="icon" href="/static/img/favicon.ico?mt={$mtimeFavicon}" type="image/x-icon">
		<link rel="shortcut icon" href="/static/img/favicon.ico?mt={$mtimeFavicon}" type="image/x-icon">
		<meta name="robots" content="all,noodp,noydir,index,follow">
		<link rel="image_src" href="/static/img/logo-100x75.gif?mt={$mtimeFacebookLogo}">
		<link href="/static/css/default.css?mt={$mtimeDefaultCss}" rel="stylesheet">
		<!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
	</head>
<!--[if IE]>
	<body class="{$pageKey} ua-ie">
<![endif]-->
<!--[if !IE]> -->
	<body class="{$pageKey}">
<!-- <![endif]-->
		<div id="wrapper">
			<header>
				<a href="/" id="logo" title="zur Homepage/zum Blog" accesskey="b">
					<hgroup>
						<h1>Matthias Krumm</h1>
						<h2>Webentwicklung, Film, Musik, Fotographie</h2>
					</hgroup>
				</a>
			</header>

{include file="navigation.tpl" page=$pageKey navi=$navi}
