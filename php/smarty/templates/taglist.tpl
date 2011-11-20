                <h2>Tags</h2>
                <p id="tag-list">
{foreach $tagList as $tagListEntry}
                    <a href="#{$tagListEntry|lower}">{$tagListEntry}</a>
{/foreach}
                </p>
