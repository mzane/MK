{include file="header.tpl" pageKey=$page}

			<div id="content" class="content-main">
{foreach $blogResult as $blogEntry}
				{* Always update blogpostajax.tpl too! *}
				<article id="blogentry-{$blogEntry.id}">
					<p class="index">{$blogEntry.date|date_format:"%A, %d.%m.%Y"}</p>
					<h2><a href="/blogpost/{$blogEntry.id}_{$blogEntry.headline|replace:" ":"-"|replace:":":""|replace:"&quot;":""|replace:".":""|replace:"!":""|replace:"?":""|replace:"/":""|replace:"'":""|lower}.php">{$blogEntry.headline}</a></h2>
					<p class="text">{$blogEntry.text|replace:"\n\n":"</p><p class=\"text\">"|replace:"[":"<"|replace:"]":">"|nl2br}</p>
					<p class="tags">Tags: <a href="#">{$blogEntry.tags|replace:', ':'</a>, <a href="#">'|default:'keine'}</a></p>
				</article>
{/foreach}
				<p class="loadmore"><a href="#">mehr Artikel laden &hellip;</a></p>
			</div>

			<aside>
{include file="about-aside.tpl"}

				<hr>
				{include file="socialmedia.tpl" width="300" url=$host|urlencode}

                <hr>
{include file="taglist.tpl"}

                <hr>
{include file="blogarchive.tpl" archiveResult=$archiveResult}
			</aside>

{include file="footer.tpl"}
