{include file="header.tpl" pageKey=$page}

			<div id="content">
				<div id="hint"><p></p><p><a href="/">zur &Uuml;bersicht</a> &ndash; <a href="{$url}">neuer Post</a></p></div>
				<form action="{$url}" method="post" id="select-post">
					<p>
						<label for="select-post-id">Post zum Editieren ausw&auml;hlen:</label>
						<select name="select-post-id" id="select-post-id">
							<option>-bitte w&auml;hlen-</option>
{foreach $resultSelect as $entrySelect}
							<option value="{$entrySelect.id}">{$entrySelect.id} - {$entrySelect.headline} [{$entrySelect.date|date_format:"%d.%m.%Y"}]</option>
{/foreach}
						</select>
					</p>
				</form>
				<hr>
{foreach $resultSelectPost as $entrySelectPost}
				<form action="{$url}" method="post" id="write-post">
					<input type="hidden" name="edit-post-id" value="{$entrySelectPost.id}">
					<fieldset>
						<legend>Post editieren</legend>
						<p>
							<label for="edit-post-headline">&Uuml;berschrift:</label>
							<input type="text" id="edit-post-headline" name="edit-post-headline" value="{$entrySelectPost.headline}">
						</p>
						<p>
							<label for="edit-post-text">Text:</label>
							<textarea id="edit-post-text" name="edit-post-text" rows="10" cols="50">{$entrySelectPost.text}</textarea>
						</p>
						<p>
							<label for="edit-post-tags">Tags (optional):</label>
							<input type="text" id="edit-post-tags" name="edit-post-tags" value="{$entrySelectPost.tags}">
						</p>
						<p>
							<label for="edit-post-timestamp">Timestamp:</label>
							<input type="text" id="edit-post-timestamp" name="edit-post-timestamp" value="{$entrySelectPost.date}">
						</p>
						<p class="note">Hinweis: HTML-Elemente mit &quot;[&quot; und &quot;]&quot; notieren, HTML-Attribute mit einfachen Anf&uuml;hrungszeichen.</p>
						<p class="btn-submit">
							<input type="submit" value="Post speichern &amp; ver&ouml;ffentlichen">
						</p>
					</fieldset>
				</form>
{foreachelse}
				<form action="{$url}" method="post" id="write-post">
					<fieldset>
						<legend>Neuen Post schreiben</legend>
						<p>
							<label for="new-post-headline">&Uuml;berschrift:</label>
							<input type="text" id="new-post-headline" name="new-post-headline">
						</p>
						<p>
							<label for="new-post-text">Text:</label>
							<textarea id="new-post-text" name="new-post-text" rows="10" cols="50"></textarea>
						</p>
						<p class="note">Hinweis: HTML-Elemente mit &quot;[&quot; und &quot;]&quot; notieren, HTML-Attribute mit einfachen Anf&uuml;hrungszeichen.</p>
						<p>
							<label for="new-post-tags">Tags (optional):</label>
							<input type="text" id="new-post-tags" name="new-post-tags">
						</p>
						<p>
							<label for="new-post-timestamp">Timestamp (optional, Default: jetzt):</label>
							<input type="text" id="new-post-timestamp" name="new-post-timestamp" value="{$smarty.now}">
						</p>
						<p class="btn-submit">
							<input type="submit" value="Post speichern &amp; ver&ouml;ffentlichen">
						</p>
					</fieldset>
				</form>
{/foreach}
			</div>

			<aside>
{include file="taglist.tpl"}
			</aside>

{include file="footer.tpl"}

<script src="/static/js/iwrite.js"></script>