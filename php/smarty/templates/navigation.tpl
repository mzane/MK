{function name=navi}
			<nav>
				<ul>
	{foreach $data as $entry}
		{strip}
			{if $entry.key == $page}
				{$focus = ' class="focus"'}
			{else}
				{$focus = ''}
			{/if}
					<li><a href="{$entry.file}" accesskey="{$entry.accesskey}"{$focus}>{$entry.name}</a></li>
		{/strip}
	{/foreach}
				</ul>
			</nav>
{/function}


{navi data=$navi}
