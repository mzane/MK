{include file="header.tpl" pageKey=$page}

			<div id="content">
                <h1>Kontakt aufnehmen</h1>
                <p>M&ouml;chten Sie mit mir Kontakt aufnehmen? M&ouml;chten Sie mir etwas mitteilen? Haben Sie vielleicht einen Fehler auf der Seite gefunden oder wollen Sie mir einfach nur Ihre Zuneigung kundtun?</p>
                <p>Dann immer her damit!</p>
				<div id="hint"><p></p></div>
                <form action="{$url}" method="post" id="contact-form">
                    {* Honeypot: *}
                    <p class="off">
						<label for="hp">Hp:</label>
						<input type="text" name="hp" id="hp">
                    </p>
                    <p>
                        <label for="contact-name">Name:</label>
                        <input type="text" name="contact-name" id="contact-name" required>
                    </p>
                    <p>
                        <label for="contact-email">E-Mail (optional):</label>
                        <input type="email" name="contact-email" id="contact-email">
                    </p>
					<p>
						<label for="contact-message">Nachricht:</label>
						<textarea id="contact-message" name="contact-message" rows="10" cols="50" required></textarea>
					</p>
					<p class="btn-submit">
						<input type="submit" value="Nachricht senden">
					</p>
                </form>
			</div>

			<aside>
				<h2>Meine hCard:</h2>
                <div id="hcard-Matthias-Krumm" class="vcard">
					<a class="url fn" href="http://matthiaskrumm.name/">Matthias Krumm</a><br>
                    {mailto address="matthias@matthiaskrumm.name" encode='javascript' class="email"}					
					<div class="adr">
						<div class="street-address">Amalienburgstr. 14</div>
						<span class="postal-code">81247</span> <span class="locality">M&uuml;nchen</span><br>
						<span class="country-name">Germany</span>
					</div>
				</div>
			</aside>

{include file="footer.tpl"}
