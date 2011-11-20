/**
 * jQuery.searchForElements
 * Copyright (c) 2009-2011 Matthias Krumm -  matthias(at)matthiaskrumm(dot)name | http://matthiaskrumm.name
 * Searches for elements in markup
 *
 * @param: fileList: an array of files to search in (due to SOP they need to be on the same domain)
 * @param: searchString: an array of css-selectors to search for - plugin will search for every string in every file
 *
 * @example:
 * var fileList = new Array("page1.html", "page2.html", "page3.html");
 * var searchString = new Array(".foo h1", ".foo #bar");
 * searchForElements(fileList, searchString);
 *
 * @return: Returns the jQuery-object
 */
(function($) {
	$.searchForElements = function(fileList, searchString) {
		var count = 0;

		function getIframeContent(iframeId) {
			var _iframe = document.getElementById(iframeId);
			return (typeof _iframe == "object") ? _iframe.contentWindow.document.body : null;
		}

		for (var i = 0, iLen = fileList.length; i < iLen; i++) {
			$("body").append('<p style="font-weight: bold; margin-top: 20px; margin-bottom: 2px;">&gt;&gt;&gt; ' + fileList[i] + ':</p>' +
							 '<iframe id="element-search-result-' + i + '" src="' + fileList[i] + '" style="border: solid 1px #000; height: 100px; margin-bottom: 2px; overflow: auto;"></iframe>');

			// The ajax-handler is actually just used for making sure the content is properly loaded; so the content is actually loaded twice
			$.ajax({
				url: fileList[count],
				async: false,
				success: function() {
					for (var j = 0, jLen = searchString.length; j < jLen; j++) {
						var resultText = "";
						var content = getIframeContent("element-search-result-" + count);
						var res = $(searchString[j], $(content));
						if (res.length > 0) {
							resultText = searchString[j] + " - Element found!";
							$("body").append('<p style="background-color: lightgreen; font-weight: bold; margin-top: 0; margin-bottom: 2px;">' + resultText + '</p>');
						} else {
							resultText = searchString[j] + " - Element NOT found!";
							$("body").append('<p style="background-color: red; margin-top: 0; margin-bottom: 2px;">' + resultText + '</p>');
						}
					}

					count++;
				},
				error: function() {
					console.log("An error occured!");
				}
			});
		}

		// Final return of jQuery object
		return this;
	};
})(jQuery);