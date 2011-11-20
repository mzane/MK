				<h2>Blog-Archiv</h2>
				<ul id="blog-archive">
{foreach $archiveResult as $archiveEntry}
	{if $archiveEntry.date|date_format:"%Y" != $date}
					<li class="archive-header">{$archiveEntry.date|date_format:"%Y"}</li>
	{/if}
					<li><a href="/blogpost/{$archiveEntry.id}_{$archiveEntry.headline|replace:" ":"-"|replace:":":""|replace:"&quot;":""|replace:".":""|replace:"!":""|replace:"?":""|replace:"/":""|replace:"'":""|lower}.php" data-tags="{$archiveEntry.tags}">{$archiveEntry.headline}</a></li>
	{$date = $archiveEntry.date|date_format:"%Y"}
	{$counter = $counter + 1}
{/foreach}
				</ul>
				{* This is a really silly trick, because I need the overall blog-count in the JS. *}
				<span id="blog-counter" class="off">{$counter}</span>
