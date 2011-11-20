// Tag-list highlighting
(function() {
	var blogArchive = dojo.query("#blog-archive");
	var highlighted = false;

	dojo.query("#tag-list a, .tags a").connect("onclick", function(event) {
		event.preventDefault();
		blogArchive.query("a").removeClass("highlight");
	    blogArchive.query("a[data-tags*='" + this.innerHTML + "']").addClass("highlight");
		highlighted = true;
	}).connect("onmouseover", function() {
		blogArchive.query("a").removeClass("highlight");
		blogArchive.query("a[data-tags*='" + this.innerHTML + "']").addClass("highlight");
		highlighted = false;
	}).connect("onmouseout", function() {
		if (!highlighted) {
			blogArchive.query("a").removeClass("highlight");
		}
	});
})();
