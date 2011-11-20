/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);



// Tag-list highlighting
(function() {
	var $blogArchive = $("#blog-archive");
	var highlighted = false;

	$("#tag-list a, .tags a").live("click mouseenter mouseout", function(event) {
		switch(event.type) {
			case "click":
				event.preventDefault();
				$blogArchive.find("a").removeClass("highlight");
			    $blogArchive.find("a[data-tags*='" + $(this).text() + "']").addClass("highlight");
				highlighted = true;
				$(this).blur();
				break;
			case "mouseenter":
				$blogArchive.find("a").removeClass("highlight");
			    $blogArchive.find("a[data-tags*='" + $(this).text() + "']").addClass("highlight");
				highlighted = false;
				break;
			case "mouseout":
				if (!highlighted) {
					$blogArchive.find("a").removeClass("highlight");
				}
				break;
		}
	});
})();



// Infinite scroll (there is actually only one .content-main)
$(".content-main").each(function() {
	var $contentMain = $(this);
	var startIndex = 4;
	var blogCounter = parseInt($("#blog-counter").html());

	// Scrolling functionality
	if ($(".loadmore").css("display") === "none") {
		$(window).scroll(function() {
			if (startIndex == blogCounter) {
				return false;
			}

			if (($(window).scrollTop() + $(window).height() + 1) >= $(document).height()) {
				window.loadBlogPostAjax();
			}
		});
	}

	window.loadBlogPostAjax = function() {
		$contentMain.addClass("loading-content");
		$.ajax({
			type: "GET",
			url: "/blogpostajax.php?limit=" + startIndex++,
			dataType: "html",
			success: function(data) {
				$contentMain.removeClass("loading-content").append(data);
			}
		});
	};
});
// "Infinite scroll" for mobile devices
if ($(".loadmore").css("display") === "block") {
	$(".loadmore").live("click", function(event) {
		event.preventDefault();
		window.loadBlogPostAjax();
		$(this).remove();
	});
}



// Write comment
$("#write-comment").bind("submit", function(event) {
	event.preventDefault();

	// Init vars
	var $writeCommentName = $("#write-comment-name");
	var $writeCommentEmail = $("#write-comment-email");
	var $writeCommentComment = $("#write-comment-comment");
	var $writeCommentCaptcha = $("#write-comment-captcha");

	// Hint message
	var $hint = $("#hint");
	$hint.slideUp("fast").find("p:first").text("");

	// Disable submit first
	var $inputSubmit = $(this).find("input[type='submit']");
	$inputSubmit.attr("disabled", "disabled").blur();

	// Start request
	if ($writeCommentName.val() !== "" && $writeCommentComment.val() !== "" && $writeCommentCaptcha.val() !== "") {
		$.ajax({
			type: "POST",
			url: $(this).attr("action"),
			data: $(this).serialize(),
			success: function(data) { // param data sends the whole html-page back since we request this page
				$inputSubmit.attr("disabled", "");
				if (data.indexOf("success") == 0) {
					$hint.find("p:first").html("Dein Kommentar wurde erfolgreich ver&ouml;ffentlicht und oben angef&uuml;gt!");

					// Add markup and scroll to comments
					$("#no-comments").remove();
					$("#comments h2").after('<article class="comment comment-new"><p class="comment-new-head">Dein Kommentar:</p>' +
							'<p><span class="bold">Name:</span><br>' + $writeCommentName.val() + '</p>' +
							'<p><span class="bold">Kommentar:</span><br>' + $writeCommentComment.val().replace("<", "&lt;").replace(">", "&gt;").replace("\n", "<br>") + '</p>' +
							'</article>');
					$.scrollTo("#comments");

					// Reset form
					$writeCommentName.val("");
					$writeCommentEmail.val("");
					$writeCommentComment.val("");
					$writeCommentCaptcha.val("");
				} else if (data.indexOf("error") == 0) {
					$hint.find("p:first").text("Ein Fehler ist aufgetreten. Bitte Vorgang wiederholen.");
				} else {
					$hint.find("p:first").text("Ein Fehler ist aufgetreten. Bitte Vorgang wiederholen.");
				}
				$hint.slideDown();
			},
			error: function(data) {
				$inputSubmit.attr("disabled", "");
				$hint.slideDown().find("p:first").text("Ein Fehler ist aufgetreten. Bitte Vorgang wiederholen. (" + data + ")");
			}
		});
	} else {
		$inputSubmit.attr("disabled", "");
		$hint.slideDown().find("p:first").html("Die Felder &quot;Name&quot;, &quot;Kommentar&quot; und &quot;Sicherheitscode&quot; sind Pflichtfelder. Bitte f&uuml;lle diese zuerst.");
		$.scrollTo("#hint");
	}
});



// Contact form
$("#contact-form").bind("submit", function(event) {
	event.preventDefault();

	// Init vars
	var $inputName = $("#contact-name");
	var $inputMessage = $("#contact-message");

	// Hint message
	var $hint = $("#hint");
	$hint.slideUp("fast").find("p:first").text("");

	// Disable submit first
	var $inputSubmit = $(this).find("input[type='submit']");
	$inputSubmit.attr("disabled", "disabled").blur();

	// Name and message are required inputs
	if ($inputName.val() !== "" && $inputMessage.val() !== "") {
		// Start request
		$.ajax({
			type: "POST",
			url: $(this).attr("action"),
			data: $(this).serialize(),
			success: function(data) { // param data sends the whole html-page back since we request this page
				$inputSubmit.attr("disabled", "");
				if (data.indexOf("success") == 0) {
					$hint.find("p:first").html("Deine Nachricht wurde erfolgreich versandt!");
				} else if (data.indexOf("error") == 0) {
					$hint.find("p:first").text("Ein Fehler ist aufgetreten. Bitte Vorgang wiederholen.");
				} else {
					$hint.find("p:first").text("Ein Fehler ist aufgetreten. Bitte Vorgang wiederholen.");
				}
				$hint.slideDown();
			},
			error: function(data) {
				$inputSubmit.attr("disabled", "");
				$hint.slideDown().find("p:first").text("Ein Fehler ist aufgetreten. Bitte Vorgang wiederholen. (" + data + ")");
			}
		});
	} else {
		$inputSubmit.attr("disabled", "");
		$hint.slideDown().find("p:first").html("Die Felder &quot;Name&quot; und &quot;Nachricht&quot; sind Pflichtfelder. Bitte f&uuml;lle diese zuerst.");
	}
});
