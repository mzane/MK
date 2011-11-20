{include file="header.tpl" pageKey=$page}

			<div id="content">
                <h1>Projekte</h1>
                <p>Ein &Uuml;bersicht &uuml;ber meine Projekte, Arbeiten, Ideen.</p>
                <h2>Web</h2>
                <p>Bei allen nachfolgenden Punkten habe ich HTML, CSS, JS, PHP und das Design (jeweils soweit vorhanden) erstellt.</p>
				<ul>
					<li><a href="http://mindrecorder.net" target="_blank">MIND recorder &ndash; Zeichnen Sie Ihre Gedanken auf!</a></li>
					<li><a href="http://www.drumnbass-munich.net" target="_blank">DRUMNBASS-MUNICH.NET</a> - die Seite ist schon etwas betagt, der Relaunch kommt aber noch dieses Jahr</li>
					{*<li>onlinetracklist.net</li>*}
					<li>
						HTML5
						<ul>
							<li><a href="http://matthiaskrumm.name/playground/html5/html5forms.php" target="_blank">HTML5 Forms-Unterst&uuml;tzung</a> - Welche HTML5-Form-Element und -Attribute werden von Ihrem Browser unterst&uuml;tzt?</li>
						</ul>
					</li>
					<li>jQuery
						<ul>
							<li><a href="http://matthiaskrumm.name/blogpost/13_jquery-plugin-onactivation.php">jQuery-Plugin &quot;onActivation&quot;</a></li>
							<li><a href="/playground/jquery/jquery.debug.html" target="_blank">jQuery-Plugin &quot;debug&quot;</a>, f&uuml;r alle Browser die window.console nicht kennen (bspw. IE)</li>
							<li><a href="/playground/jquery/jquery.searchforelements.html" target="_blank">jQuery-Plugin &quot;searchForElements&quot;</a>, das mittels eines CSS-Selektors nach Elementen auf einer Seite sucht</li>
						</ul>
					</li>
					<li>jsperf-Messungen (einige wurden von <a href="http://slansky.net" target="_blank">Alexander Slansky</a> erstellt)
						<ul>
							<li><a href="http://jsperf.com/new-image-vs-createelement-img" target="_blank">new Image vs. createElement('img') - jsPerf</a></li>
							<li><a href="http://jsperf.com/jquery-css-display-none-vs-hide" target="_blank">jQuery: css-display:none vs. hide - jsPerf</a></li>
							<li><a href="http://jsperf.com/jquery-search-dom-elements" target="_blank">jQuery: search dom elements - jsPerf</a></li>
							<li><a href="http://jsperf.com/variable-vs-multiple-jquery-objects" target="_blank">jQuery: variable vs. multiple jquery objects - jsPerf</a></li>
							<li><a href="http://jsperf.com/bind-vs-bind-wrapper/3" target="_blank">jQuery: bind vs bind-wrapper vs. json - jsPerf</a></li>
							<li><a href="http://jsperf.com/chained-call-vs-seperated-vs-json-combined/2" target="_blank">jQuery: chained call vs. seperated vs. json-combined - jsPerf</a></li>
							<li><a href="http://jsperf.com/css-height-vs-height/2" target="_blank">jQuery: css("height") vs. .height() - jsPerf</a></li>
							<li><a href="http://jsperf.com/jquery-length-gt-vs-neq" target="_blank">jQuery: length gt vs neq - jsPerf</a></li>
						</ul>
					</li>
					<li><a href="http://jsbin.com/areqo3" target="_blank">&quot;Horizontal-Scroll&quot; bei jsbin.com</a> (nur ein Test, nicht ausgereift!)</li>
					<li><a href="https://github.com/mzane" target="_blank">MZane bei Github</a></li>
				</ul>
                <h2>Foto</h2>
				<ul>
					<li><a href="http://picasaweb.google.com/matthiaskrumm642" target="_blank">MZane bei Picasa</a></li>
					<li><a href="http://www.flickr.com/photos/29530986@N06/sets/72157606971031569/" target="_blank">MZane bei Flickr</a></li>
				</ul>
                <h2>Film</h2>
				<ul>
					<li><a href="http://www.youtube.com/user/TheMZane" target="_blank">MZane bei Youtube</a></li>
				</ul>
                <h2>Musik</h2>
				<ul>
					<li><a href="http://soundcloud.com/mzane" target="_blank">MZane bei Soundcloud</a></li>
				</ul>
			</div>

			<aside>
{include file="about-aside.tpl"}

				<hr>
            	{include file="socialmedia.tpl" width="300" url=$urlEncoded}
			</aside>

{include file="footer.tpl"}
