


// Select post
$("#select-post-id").bind("change", function(event) {
	event.preventDefault();

	$("#select-post").submit();
});



// Write post
$("#write-post").bind("submit", function(event) {
	event.preventDefault();

	// Hint message
	var $hint = $("#hint");
	$hint.slideUp("fast").find("p:first").text("");

	// Disable submit first
	var $inputSubmit = $(this).find("input[type='submit']");
	$inputSubmit.attr("disabled", "disabled").blur();

	// Start request
	$.ajax({
		type: "POST",
		url: $(this).attr("action"),
		data: $(this).serialize(),
		success: function(data) { // param data sends the whole html-page back since we request this page
			$inputSubmit.attr("disabled", "");
			if (data.indexOf("success") == 0) {
				$hint.find("p:first").html("Post erfolgreich gespeichert &amp; ver&ouml;ffentlicht!");
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
});
