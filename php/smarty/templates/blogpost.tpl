{strip}
{foreach $blogResultHeadline as $blogEntryHeadline}
	{$headline = $blogEntryHeadline.headline}
{foreachelse}
	{$headline = $page}
{/foreach}
{/strip}
{include file="header.tpl" title=$headline pageKey=$page}

			<div id="content">
				<p class="back-to-main-top"><a href="/" rel="nofollow">&laquo; zur&uuml;ck zur Blogseite</a></p>
{foreach $blogResult as $blogEntry}
				<article id="blogentry-{$blogEntry.id}">
					<p class="index">{$blogEntry.date|date_format:"%A, %d.%m.%Y"}</p>
					<h1>{$blogEntry.headline}</h1>
					<p class="text">{$blogEntry.text|replace:"\n\n":"</p><p class=\"text\">"|replace:"[":"<"|replace:"]":">"|nl2br}</p>
					<p class="tags">Tags: <a href="#">{$blogEntry.tags|replace:', ':'</a>, <a href="#">'|default:'keine'}</a></p>
					{* todo: add comment-functionality *}
				</article>

				<hr>
				<section id="comments">
					<h2>Kommentare zu &quot;{$blogEntry.headline}&quot;</h2>
	{foreach $resultComments as $entryComments}
					{* Take care of this piece of markup, since it is also in default.js! *}
					<article class="comment">
						<p><span class="bold">Name:</span> <span class="float-r">geschrieben am {$entryComments.date|date_format:"%d.%m.%Y, %R"}</span><br>{$entryComments.name}</p>
						<p><span class="bold">Kommentar:</span><br>{$entryComments.comment|nl2br}</p>
					</article>
	{foreachelse}
					<p id="no-comments">Noch keine Kommentare vorhanden. Sei Du der Erste!</p>
	{/foreach}
				</section>

				<hr>
				<div id="hint"><p></p></div>
				<form action="{$url}" method="post" id="write-comment">
					<input type="hidden" name="write-comment-id" value="{$blogEntry.id}">
					<fieldset>
						<legend>Kommentar schreiben</legend>
	                    {* Honeypot: *}
						<p class="off">
							<label for="write-comment-hp">HP:</label>
							<input type="text" id="write-comment-hp" name="write-comment-hp">
						</p>
						<p>
							<label for="write-comment-name">Name:</label>
							<input type="text" id="write-comment-name" name="write-comment-name" required>
						</p>
						<p>
							<label for="write-comment-email">E-Mail (optional, wird nicht ver&ouml;ffentlicht):</label>
							<input type="email" id="write-comment-email" name="write-comment-email">
						</p>
						<p>
							<label for="write-comment-comment">Text:</label>
							<textarea id="write-comment-comment" name="write-comment-comment" rows="10" cols="50" required></textarea>
						</p>
						<p>
							<label for="write-comment-captcha">Bitte untenstehenden Sicherheitscode eingeben:</label>
							<input type="text" id="write-comment-captcha" name="write-comment-captcha" required>
							<input type="hidden" name="write-comment-captcha-img" id="write-comment-captcha-img" value="{$captchaImg}">
							<a href="http://www.opencaptcha.com" target="_blank" title="Bitte Sicherheitscode in obenstehendes Feld eingeben"><img src="http://www.opencaptcha.com/img/{$captchaImg}" width="{$captchaWidth}" height="{$captchaHeight}" alt="Sicherheitscode von www.opencaptcha.com" id="write-comment-img" /></a>
						</p>
						<p class="btn-submit">
							<input type="submit" value="Kommentar ver&ouml;ffentlichen">
						</p>
					</fieldset>
				</form>
{foreachelse}
				<p class="no-blogpost">Der Post konnte leider nicht gefunden werden.</p>
{/foreach}
				<p class="back-to-main-bottom"><a href="/" rel="nofollow">&laquo; zur&uuml;ck zur Blogseite</a></p>
			</div>

			<aside>
{include file="about-aside.tpl"}

				<hr>
				{include file="socialmedia.tpl" width="300" url=$urlBlogpost}

				<hr>
{include file="taglist.tpl"}

				<hr>
{include file="blogarchive.tpl" archiveResult=$archiveResult}
			</aside>

{include file="footer.tpl"}
