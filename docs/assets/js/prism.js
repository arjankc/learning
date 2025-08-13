// Minimal Prism.js replacement to avoid errors
// This provides basic syntax highlighting for C# code

window.Prism = {
    highlightElement: function(element) {
        // Simple syntax highlighting for C# keywords
        if (element && element.textContent) {
            const code = element.textContent;
            const highlighted = code
                .replace(/\b(using|namespace|class|public|private|static|void|int|string|bool|var|if|else|for|while|foreach|return|new|this)\b/g, '<span class="token keyword">$1</span>')
                .replace(/\/\/.*$/gm, '<span class="token comment">$&</span>')
                .replace(/"([^"\\]|\\.)*"/g, '<span class="token string">$&</span>')
                .replace(/\b\d+\b/g, '<span class="token number">$&</span>');
            
            element.innerHTML = highlighted;
        }
    },
    
    highlightAll: function() {
        const codeElements = document.querySelectorAll('code');
        codeElements.forEach(element => {
            this.highlightElement(element);
        });
    }
};

// Auto-highlight on page load
document.addEventListener('DOMContentLoaded', function() {
    if (window.Prism) {
        window.Prism.highlightAll();
    }
});
<head>
	<title>
		Customize your download ▲ Prism 
	</title>
	<meta name="viewport" content="width=device-width" />
	<meta charset="utf-8" />
	<link rel="icon" href="/assets/logo.svg" />
	<link rel="stylesheet" href="/assets/style.css" />
	<link rel="stylesheet" href="https://dev.prismjs.com/themes/prism.css" />
	<script>var _gaq = [["_setAccount", "UA-33746269-1"], ["_trackPageview"]];</script>
	<script src="https://www.google-analytics.com/ga.js" async></script>

	</head>

<body class="">
	<header>
		<div class="intro">
			<h1><a href="/"><img src="/assets/logo.svg" alt="Prism" /> </a></h1>

			<a class='download-button' href='/download'>Download</a>

			<p>
				Prism is a lightweight, extensible syntax highlighter, built with modern web standards in mind.
				It’s used in millions of websites, including some of those you visit daily.
			</p>
		</div>

		<div id="theme">
			<p>Theme:</p>
			<input type="radio" name="theme" id="theme-prism" value="prism" />
			<label for="theme-prism">Default</label>
			<input type="radio" name="theme" id="theme-prism-dark" value="prism-dark" />
			<label for="theme-prism-dark">Dark</label>
			<input type="radio" name="theme" id="theme-prism-funky" value="prism-funky" />
			<label for="theme-prism-funky">Funky</label>
			<input type="radio" name="theme" id="theme-prism-okaidia" value="prism-okaidia" />
			<label for="theme-prism-okaidia">Okaidia</label>
			<input type="radio" name="theme" id="theme-prism-twilight" value="prism-twilight" />
			<label for="theme-prism-twilight">Twilight</label>
			<input type="radio" name="theme" id="theme-prism-coy" value="prism-coy" />
			<label for="theme-prism-coy">Coy</label>
			<input type="radio" name="theme" id="theme-prism-solarizedlight" value="prism-solarizedlight" />
			<label for="theme-prism-solarizedlight">Solarized Light</label>
			<input type="radio" name="theme" id="theme-prism-tomorrow" value="prism-tomorrow" />
			<label for="theme-prism-tomorrow">Tomorrow Night</label>
		</div>

		<h2>Customize your download</h2>
		<p>Select your compression level, as well as the languages and plugins you need.</p>
	</header>

	

	<main>
		<section>
	<form>
		<p>
			Compression level:
			<label><input type="radio" name="compression" value="0" /> Development version</label>
			<label><input type="radio" name="compression" value="1" checked /> Minified version</label>
		</p>
		<section id="components"><section class="options" id="category-core">
	<h1>Core</h1>
	<label data-id="core">
				<input type="checkbox" name="download-core" value="core" checked disabled /><span class="name">Core</span><strong class="filesize">7.29KB</strong>
			</label>
		
</section>

			<section class="options" id="category-themes">
	<h1>Themes</h1>
	<label data-id="prism">
				<input type="radio" name="download-themes" value="prism"   /><a class='name' href='/?theme=prism'>Default</a><strong class="filesize">1.75KB</strong>
			</label>
		<label data-id="prism-dark">
				<input type="radio" name="download-themes" value="prism-dark"   /><a class='name' href='/?theme=prism-dark'>Dark</a><strong class="filesize">1.5KB</strong>
			</label>
		<label data-id="prism-funky">
				<input type="radio" name="download-themes" value="prism-funky"   /><a class='name' href='/?theme=prism-funky'>Funky</a><strong class="filesize">1.94KB</strong>
			</label>
		<label data-id="prism-okaidia">
				<input type="radio" name="download-themes" value="prism-okaidia"   /><a class='name' href='/?theme=prism-okaidia'>Okaidia</a>
					<a href="https://github.com/ocodia" class="owner" target="_blank">ocodia</a>
				<strong class="filesize">1.35KB</strong>
			</label>
		<label data-id="prism-twilight">
				<input type="radio" name="download-themes" value="prism-twilight"   /><a class='name' href='/?theme=prism-twilight'>Twilight</a>
					<a href="https://github.com/remybach" class="owner" target="_blank">remybach</a>
				<strong class="filesize">2.38KB</strong>
			</label>
		<label data-id="prism-coy">
				<input type="radio" name="download-themes" value="prism-coy"   /><a class='name' href='/?theme=prism-coy'>Coy</a>
					<a href="https://github.com/tshedor" class="owner" target="_blank">tshedor</a>
				<strong class="filesize">2.99KB</strong>
			</label>
		<label data-id="prism-solarizedlight">
				<input type="radio" name="download-themes" value="prism-solarizedlight"   /><a class='name' href='/?theme=prism-solarizedlight'>Solarized Light</a>
					<a href="https://github.com/hectormatos2011 " class="owner" target="_blank">hectormatos2011 </a>
				<strong class="filesize">1.55KB</strong>
			</label>
		<label data-id="prism-tomorrow">
				<input type="radio" name="download-themes" value="prism-tomorrow"   /><a class='name' href='/?theme=prism-tomorrow'>Tomorrow Night</a>
					<a href="https://github.com/Rosey" class="owner" target="_blank">Rosey</a>
				<strong class="filesize">1.28KB</strong>
			</label>
		
</section>

			<section class="options" id="category-languages">
	<h1>Languages</h1>
		<label data-id="check-all-languages">
			<input type="checkbox" name="check-all-languages" />
			Select/unselect all
		</label>
	<label data-id="markup">
				<input type="checkbox" name="download-languages" value="markup"   /><span class="name">Markup + HTML + XML + SVG + MathML + SSML + Atom + RSS</span><strong class="filesize">2.78KB</strong>
			</label>
		<label data-id="css">
				<input type="checkbox" name="download-languages" value="css"   /><span class="name">CSS</span><strong class="filesize">1.2KB</strong>
			</label>
		<label data-id="clike">
				<input type="checkbox" name="download-languages" value="clike"   /><span class="name">C-like</span><strong class="filesize">0.69KB</strong>
			</label>
		<label data-id="javascript">
				<input type="checkbox" name="download-languages" value="javascript"   /><span class="name">JavaScript</span><strong class="filesize">4.5KB</strong>
			</label>
		<label data-id="abap">
				<input type="checkbox" name="download-languages" value="abap"   /><span class="name">ABAP</span>
					<a href="https://github.com/dellagustin" class="owner" target="_blank">dellagustin</a>
				<strong class="filesize">7.74KB</strong>
			</label>
		<label data-id="abnf">
				<input type="checkbox" name="download-languages" value="abnf"   /><span class="name">ABNF</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.87KB</strong>
			</label>
		<label data-id="actionscript">
				<input type="checkbox" name="download-languages" value="actionscript"   /><span class="name">ActionScript</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">0.83KB</strong>
			</label>
		<label data-id="ada">
				<input type="checkbox" name="download-languages" value="ada"   /><span class="name">Ada</span>
					<a href="https://github.com/Lucretia" class="owner" target="_blank">Lucretia</a>
				<strong class="filesize">0.89KB</strong>
			</label>
		<label data-id="agda">
				<input type="checkbox" name="download-languages" value="agda"   /><span class="name">Agda</span>
					<a href="https://github.com/xy-ren" class="owner" target="_blank">xy-ren</a>
				<strong class="filesize">0.72KB</strong>
			</label>
		<label data-id="al">
				<input type="checkbox" name="download-languages" value="al"   /><span class="name">AL</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">2.56KB</strong>
			</label>
		<label data-id="antlr4">
				<input type="checkbox" name="download-languages" value="antlr4"   /><span class="name">ANTLR4</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.18KB</strong>
			</label>
		<label data-id="apacheconf">
				<input type="checkbox" name="download-languages" value="apacheconf"   /><span class="name">Apache Configuration</span>
					<a href="https://github.com/GuiTeK" class="owner" target="_blank">GuiTeK</a>
				<strong class="filesize">7.99KB</strong>
			</label>
		<label data-id="apex">
				<input type="checkbox" name="download-languages" value="apex"   /><span class="name">Apex</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">2.03KB</strong>
			</label>
		<label data-id="apl">
				<input type="checkbox" name="download-languages" value="apl"   /><span class="name">APL</span>
					<a href="https://github.com/ngn" class="owner" target="_blank">ngn</a>
				<strong class="filesize">0.76KB</strong>
			</label>
		<label data-id="applescript">
				<input type="checkbox" name="download-languages" value="applescript"   /><span class="name">AppleScript</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">1.73KB</strong>
			</label>
		<label data-id="aql">
				<input type="checkbox" name="download-languages" value="aql"   /><span class="name">AQL</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.02KB</strong>
			</label>
		<label data-id="arduino">
				<input type="checkbox" name="download-languages" value="arduino"   /><span class="name">Arduino</span>
					<a href="https://github.com/dkern" class="owner" target="_blank">dkern</a>
				<strong class="filesize">3.83KB</strong>
			</label>
		<label data-id="arff">
				<input type="checkbox" name="download-languages" value="arff"   /><span class="name">ARFF</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">0.19KB</strong>
			</label>
		<label data-id="armasm">
				<input type="checkbox" name="download-languages" value="armasm"   /><span class="name">ARM Assembly</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.24KB</strong>
			</label>
		<label data-id="arturo">
				<input type="checkbox" name="download-languages" value="arturo"   /><span class="name">Arturo</span>
					<a href="https://github.com/drkameleon" class="owner" target="_blank">drkameleon</a>
				<strong class="filesize">3.05KB</strong>
			</label>
		<label data-id="asciidoc">
				<input type="checkbox" name="download-languages" value="asciidoc"   /><span class="name">AsciiDoc</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">4.33KB</strong>
			</label>
		<label data-id="aspnet">
				<input type="checkbox" name="download-languages" value="aspnet"   /><span class="name">ASP.NET (C#)</span>
					<a href="https://github.com/nauzilus" class="owner" target="_blank">nauzilus</a>
				<strong class="filesize">1.07KB</strong>
			</label>
		<label data-id="asm6502">
				<input type="checkbox" name="download-languages" value="asm6502"   /><span class="name">6502 Assembly</span>
					<a href="https://github.com/kzurawel" class="owner" target="_blank">kzurawel</a>
				<strong class="filesize">0.84KB</strong>
			</label>
		<label data-id="asmatmel">
				<input type="checkbox" name="download-languages" value="asmatmel"   /><span class="name">Atmel AVR Assembly</span>
					<a href="https://github.com/cerkit" class="owner" target="_blank">cerkit</a>
				<strong class="filesize">1.69KB</strong>
			</label>
		<label data-id="autohotkey">
				<input type="checkbox" name="download-languages" value="autohotkey"   /><span class="name">AutoHotkey</span>
					<a href="https://github.com/aviaryan" class="owner" target="_blank">aviaryan</a>
				<strong class="filesize">8.54KB</strong>
			</label>
		<label data-id="autoit">
				<input type="checkbox" name="download-languages" value="autoit"   /><span class="name">AutoIt</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">0.81KB</strong>
			</label>
		<label data-id="avisynth">
				<input type="checkbox" name="download-languages" value="avisynth"   /><span class="name">AviSynth</span>
					<a href="https://github.com/Zinfidel" class="owner" target="_blank">Zinfidel</a>
				<strong class="filesize">4.96KB</strong>
			</label>
		<label data-id="avro-idl">
				<input type="checkbox" name="download-languages" value="avro-idl"   /><span class="name">Avro IDL</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.98KB</strong>
			</label>
		<label data-id="awk">
				<input type="checkbox" name="download-languages" value="awk"   /><span class="name">AWK + GAWK</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.68KB</strong>
			</label>
		<label data-id="bash">
				<input type="checkbox" name="download-languages" value="bash"   /><span class="name">Bash + Shell + Shell</span>
					<a href="https://github.com/zeitgeist87" class="owner" target="_blank">zeitgeist87</a>
				<strong class="filesize">6KB</strong>
			</label>
		<label data-id="basic">
				<input type="checkbox" name="download-languages" value="basic"   /><span class="name">BASIC</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">1.79KB</strong>
			</label>
		<label data-id="batch">
				<input type="checkbox" name="download-languages" value="batch"   /><span class="name">Batch</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">1.64KB</strong>
			</label>
		<label data-id="bbcode">
				<input type="checkbox" name="download-languages" value="bbcode"   /><span class="name">BBcode + Shortcode</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.44KB</strong>
			</label>
		<label data-id="bbj">
				<input type="checkbox" name="download-languages" value="bbj"   /><span class="name">BBj</span>
					<a href="https://github.com/hyyan" class="owner" target="_blank">hyyan</a>
				<strong class="filesize">0.85KB</strong>
			</label>
		<label data-id="bicep">
				<input type="checkbox" name="download-languages" value="bicep"   /><span class="name">Bicep</span>
					<a href="https://github.com/johnnyreilly" class="owner" target="_blank">johnnyreilly</a>
				<strong class="filesize">1.26KB</strong>
			</label>
		<label data-id="birb">
				<input type="checkbox" name="download-languages" value="birb"   /><span class="name">Birb</span>
					<a href="https://github.com/Calamity210" class="owner" target="_blank">Calamity210</a>
				<strong class="filesize">0.57KB</strong>
			</label>
		<label data-id="bison">
				<input type="checkbox" name="download-languages" value="bison"   /><span class="name">Bison</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">0.58KB</strong>
			</label>
		<label data-id="bnf">
				<input type="checkbox" name="download-languages" value="bnf"   /><span class="name">BNF + RBNF</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.3KB</strong>
			</label>
		<label data-id="bqn">
				<input type="checkbox" name="download-languages" value="bqn"   /><span class="name">BQN</span>
					<a href="https://github.com/yewscion" class="owner" target="_blank">yewscion</a>
				<strong class="filesize">1.3KB</strong>
			</label>
		<label data-id="brainfuck">
				<input type="checkbox" name="download-languages" value="brainfuck"   /><span class="name">Brainfuck</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">0.22KB</strong>
			</label>
		<label data-id="brightscript">
				<input type="checkbox" name="download-languages" value="brightscript"   /><span class="name">BrightScript</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.06KB</strong>
			</label>
		<label data-id="bro">
				<input type="checkbox" name="download-languages" value="bro"   /><span class="name">Bro</span>
					<a href="https://github.com/wayward710" class="owner" target="_blank">wayward710</a>
				<strong class="filesize">1.09KB</strong>
			</label>
		<label data-id="bsl">
				<input type="checkbox" name="download-languages" value="bsl"   /><span class="name">BSL (1C:Enterprise) + OneScript</span>
					<a href="https://github.com/Diversus23" class="owner" target="_blank">Diversus23</a>
				<strong class="filesize">1.64KB</strong>
			</label>
		<label data-id="c">
				<input type="checkbox" name="download-languages" value="c"   /><span class="name">C</span>
					<a href="https://github.com/zeitgeist87" class="owner" target="_blank">zeitgeist87</a>
				<strong class="filesize">1.85KB</strong>
			</label>
		<label data-id="csharp">
				<input type="checkbox" name="download-languages" value="csharp"   /><span class="name">C#</span>
					<a href="https://github.com/mvalipour" class="owner" target="_blank">mvalipour</a>
				<strong class="filesize">6.03KB</strong>
			</label>
		<label data-id="cpp">
				<input type="checkbox" name="download-languages" value="cpp"   /><span class="name">C++</span>
					<a href="https://github.com/zeitgeist87" class="owner" target="_blank">zeitgeist87</a>
				<strong class="filesize">2.54KB</strong>
			</label>
		<label data-id="cfscript">
				<input type="checkbox" name="download-languages" value="cfscript"   /><span class="name">CFScript</span>
					<a href="https://github.com/mjclemente" class="owner" target="_blank">mjclemente</a>
				<strong class="filesize">1.2KB</strong>
			</label>
		<label data-id="chaiscript">
				<input type="checkbox" name="download-languages" value="chaiscript"   /><span class="name">ChaiScript</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.16KB</strong>
			</label>
		<label data-id="cil">
				<input type="checkbox" name="download-languages" value="cil"   /><span class="name">CIL</span>
					<a href="https://github.com/sbrl" class="owner" target="_blank">sbrl</a>
				<strong class="filesize">2.06KB</strong>
			</label>
		<label data-id="cilkc">
				<input type="checkbox" name="download-languages" value="cilkc"   /><span class="name">Cilk/C</span>
					<a href="https://github.com/OpenCilk" class="owner" target="_blank">OpenCilk</a>
				<strong class="filesize">0.2KB</strong>
			</label>
		<label data-id="cilkcpp">
				<input type="checkbox" name="download-languages" value="cilkcpp"   /><span class="name">Cilk/C++</span>
					<a href="https://github.com/OpenCilk" class="owner" target="_blank">OpenCilk</a>
				<strong class="filesize">0.25KB</strong>
			</label>
		<label data-id="clojure">
				<input type="checkbox" name="download-languages" value="clojure"   /><span class="name">Clojure</span>
					<a href="https://github.com/troglotit" class="owner" target="_blank">troglotit</a>
				<strong class="filesize">2.97KB</strong>
			</label>
		<label data-id="cmake">
				<input type="checkbox" name="download-languages" value="cmake"   /><span class="name">CMake</span>
					<a href="https://github.com/mjrogozinski" class="owner" target="_blank">mjrogozinski</a>
				<strong class="filesize">10.23KB</strong>
			</label>
		<label data-id="cobol">
				<input type="checkbox" name="download-languages" value="cobol"   /><span class="name">COBOL</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">4.97KB</strong>
			</label>
		<label data-id="coffeescript">
				<input type="checkbox" name="download-languages" value="coffeescript"   /><span class="name">CoffeeScript</span>
					<a href="https://github.com/R-osey" class="owner" target="_blank">R-osey</a>
				<strong class="filesize">1.39KB</strong>
			</label>
		<label data-id="concurnas">
				<input type="checkbox" name="download-languages" value="concurnas"   /><span class="name">Concurnas</span>
					<a href="https://github.com/jasontatton" class="owner" target="_blank">jasontatton</a>
				<strong class="filesize">1.85KB</strong>
			</label>
		<label data-id="csp">
				<input type="checkbox" name="download-languages" value="csp"   /><span class="name">Content-Security-Policy</span>
					<a href="https://github.com/ScottHelme" class="owner" target="_blank">ScottHelme</a>
				<strong class="filesize">1.11KB</strong>
			</label>
		<label data-id="cooklang">
				<input type="checkbox" name="download-languages" value="cooklang"   /><span class="name">Cooklang</span>
					<a href="https://github.com/ahue" class="owner" target="_blank">ahue</a>
				<strong class="filesize">1.55KB</strong>
			</label>
		<label data-id="coq">
				<input type="checkbox" name="download-languages" value="coq"   /><span class="name">Coq</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">2.97KB</strong>
			</label>
		<label data-id="crystal">
				<input type="checkbox" name="download-languages" value="crystal"   /><span class="name">Crystal</span>
					<a href="https://github.com/MakeNowJust" class="owner" target="_blank">MakeNowJust</a>
				<strong class="filesize">1.28KB</strong>
			</label>
		<label data-id="css-extras">
				<input type="checkbox" name="download-languages" value="css-extras"   /><span class="name">CSS Extras</span>
					<a href="https://github.com/milesj" class="owner" target="_blank">milesj</a>
				<strong class="filesize">3.18KB</strong>
			</label>
		<label data-id="csv">
				<input type="checkbox" name="download-languages" value="csv"   /><span class="name">CSV</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.08KB</strong>
			</label>
		<label data-id="cue">
				<input type="checkbox" name="download-languages" value="cue"   /><span class="name">CUE</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.52KB</strong>
			</label>
		<label data-id="cypher">
				<input type="checkbox" name="download-languages" value="cypher"   /><span class="name">Cypher</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.01KB</strong>
			</label>
		<label data-id="d">
				<input type="checkbox" name="download-languages" value="d"   /><span class="name">D</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">2.12KB</strong>
			</label>
		<label data-id="dart">
				<input type="checkbox" name="download-languages" value="dart"   /><span class="name">Dart</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">1.55KB</strong>
			</label>
		<label data-id="dataweave">
				<input type="checkbox" name="download-languages" value="dataweave"   /><span class="name">DataWeave</span>
					<a href="https://github.com/machaval" class="owner" target="_blank">machaval</a>
				<strong class="filesize">0.83KB</strong>
			</label>
		<label data-id="dax">
				<input type="checkbox" name="download-languages" value="dax"   /><span class="name">DAX</span>
					<a href="https://github.com/peterbud" class="owner" target="_blank">peterbud</a>
				<strong class="filesize">3.35KB</strong>
			</label>
		<label data-id="dhall">
				<input type="checkbox" name="download-languages" value="dhall"   /><span class="name">Dhall</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.22KB</strong>
			</label>
		<label data-id="diff">
				<input type="checkbox" name="download-languages" value="diff"   /><span class="name">Diff</span>
					<a href="https://github.com/uranusjr" class="owner" target="_blank">uranusjr</a>
				<strong class="filesize">0.59KB</strong>
			</label>
		<label data-id="django">
				<input type="checkbox" name="download-languages" value="django"   /><span class="name">Django/Jinja2</span>
					<a href="https://github.com/romanvm" class="owner" target="_blank">romanvm</a>
				<strong class="filesize">1.11KB</strong>
			</label>
		<label data-id="dns-zone-file">
				<input type="checkbox" name="download-languages" value="dns-zone-file"   /><span class="name">DNS zone file</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.81KB</strong>
			</label>
		<label data-id="docker">
				<input type="checkbox" name="download-languages" value="docker"   /><span class="name">Docker</span>
					<a href="https://github.com/JustinBeckwith" class="owner" target="_blank">JustinBeckwith</a>
				<strong class="filesize">1.49KB</strong>
			</label>
		<label data-id="dot">
				<input type="checkbox" name="download-languages" value="dot"   /><span class="name">DOT (Graphviz)</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.16KB</strong>
			</label>
		<label data-id="ebnf">
				<input type="checkbox" name="download-languages" value="ebnf"   /><span class="name">EBNF</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.37KB</strong>
			</label>
		<label data-id="editorconfig">
				<input type="checkbox" name="download-languages" value="editorconfig"   /><span class="name">EditorConfig</span>
					<a href="https://github.com/osipxd" class="owner" target="_blank">osipxd</a>
				<strong class="filesize">0.34KB</strong>
			</label>
		<label data-id="eiffel">
				<input type="checkbox" name="download-languages" value="eiffel"   /><span class="name">Eiffel</span>
					<a href="https://github.com/Conaclos" class="owner" target="_blank">Conaclos</a>
				<strong class="filesize">0.92KB</strong>
			</label>
		<label data-id="ejs">
				<input type="checkbox" name="download-languages" value="ejs"   /><span class="name">EJS + Eta</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.45KB</strong>
			</label>
		<label data-id="elixir">
				<input type="checkbox" name="download-languages" value="elixir"   /><span class="name">Elixir</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">1.8KB</strong>
			</label>
		<label data-id="elm">
				<input type="checkbox" name="download-languages" value="elm"   /><span class="name">Elm</span>
					<a href="https://github.com/zwilias" class="owner" target="_blank">zwilias</a>
				<strong class="filesize">0.99KB</strong>
			</label>
		<label data-id="etlua">
				<input type="checkbox" name="download-languages" value="etlua"   /><span class="name">Embedded Lua templating</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.38KB</strong>
			</label>
		<label data-id="erb">
				<input type="checkbox" name="download-languages" value="erb"   /><span class="name">ERB</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">0.49KB</strong>
			</label>
		<label data-id="erlang">
				<input type="checkbox" name="download-languages" value="erlang"   /><span class="name">Erlang</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">0.75KB</strong>
			</label>
		<label data-id="excel-formula">
				<input type="checkbox" name="download-languages" value="excel-formula"   /><span class="name">Excel Formula</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.96KB</strong>
			</label>
		<label data-id="fsharp">
				<input type="checkbox" name="download-languages" value="fsharp"   /><span class="name">F#</span>
					<a href="https://github.com/simonreynolds7" class="owner" target="_blank">simonreynolds7</a>
				<strong class="filesize">2.07KB</strong>
			</label>
		<label data-id="factor">
				<input type="checkbox" name="download-languages" value="factor"   /><span class="name">Factor</span>
					<a href="https://github.com/catb0t" class="owner" target="_blank">catb0t</a>
				<strong class="filesize">9.82KB</strong>
			</label>
		<label data-id="false">
				<input type="checkbox" name="download-languages" value="false"   /><span class="name">False</span>
					<a href="https://github.com/edukisto" class="owner" target="_blank">edukisto</a>
				<strong class="filesize">0.36KB</strong>
			</label>
		<label data-id="firestore-security-rules">
				<input type="checkbox" name="download-languages" value="firestore-security-rules"   /><span class="name">Firestore security rules</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.76KB</strong>
			</label>
		<label data-id="flow">
				<input type="checkbox" name="download-languages" value="flow"   /><span class="name">Flow</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">0.9KB</strong>
			</label>
		<label data-id="fortran">
				<input type="checkbox" name="download-languages" value="fortran"   /><span class="name">Fortran</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">1.23KB</strong>
			</label>
		<label data-id="ftl">
				<input type="checkbox" name="download-languages" value="ftl"   /><span class="name">FreeMarker Template Language</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.79KB</strong>
			</label>
		<label data-id="gml">
				<input type="checkbox" name="download-languages" value="gml"   /><span class="name">GameMaker Language</span>
					<a href="https://github.com/LiarOnce" class="owner" target="_blank">LiarOnce</a>
				<strong class="filesize">7.98KB</strong>
			</label>
		<label data-id="gap">
				<input type="checkbox" name="download-languages" value="gap"   /><span class="name">GAP (CAS)</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1KB</strong>
			</label>
		<label data-id="gcode">
				<input type="checkbox" name="download-languages" value="gcode"   /><span class="name">G-code</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.22KB</strong>
			</label>
		<label data-id="gdscript">
				<input type="checkbox" name="download-languages" value="gdscript"   /><span class="name">GDScript</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.9KB</strong>
			</label>
		<label data-id="gedcom">
				<input type="checkbox" name="download-languages" value="gedcom"   /><span class="name">GEDCOM</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">0.51KB</strong>
			</label>
		<label data-id="gettext">
				<input type="checkbox" name="download-languages" value="gettext"   /><span class="name">gettext</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.52KB</strong>
			</label>
		<label data-id="gherkin">
				<input type="checkbox" name="download-languages" value="gherkin"   /><span class="name">Gherkin</span>
					<a href="https://github.com/hason" class="owner" target="_blank">hason</a>
				<strong class="filesize">9.59KB</strong>
			</label>
		<label data-id="git">
				<input type="checkbox" name="download-languages" value="git"   /><span class="name">Git</span>
					<a href="https://github.com/lgiraudel" class="owner" target="_blank">lgiraudel</a>
				<strong class="filesize">0.23KB</strong>
			</label>
		<label data-id="glsl">
				<input type="checkbox" name="download-languages" value="glsl"   /><span class="name">GLSL</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">1.07KB</strong>
			</label>
		<label data-id="gn">
				<input type="checkbox" name="download-languages" value="gn"   /><span class="name">GN</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.04KB</strong>
			</label>
		<label data-id="linker-script">
				<input type="checkbox" name="download-languages" value="linker-script"   /><span class="name">GNU Linker Script</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.49KB</strong>
			</label>
		<label data-id="go">
				<input type="checkbox" name="download-languages" value="go"   /><span class="name">Go</span>
					<a href="https://github.com/arnehormann" class="owner" target="_blank">arnehormann</a>
				<strong class="filesize">0.95KB</strong>
			</label>
		<label data-id="go-module">
				<input type="checkbox" name="download-languages" value="go-module"   /><span class="name">Go module</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.41KB</strong>
			</label>
		<label data-id="gradle">
				<input type="checkbox" name="download-languages" value="gradle"   /><span class="name">Gradle</span>
					<a href="https://github.com/zeabdelkhalek-badido18" class="owner" target="_blank">zeabdelkhalek-badido18</a>
				<strong class="filesize">1.34KB</strong>
			</label>
		<label data-id="graphql">
				<input type="checkbox" name="download-languages" value="graphql"   /><span class="name">GraphQL</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">2.46KB</strong>
			</label>
		<label data-id="groovy">
				<input type="checkbox" name="download-languages" value="groovy"   /><span class="name">Groovy</span>
					<a href="https://github.com/robfletcher" class="owner" target="_blank">robfletcher</a>
				<strong class="filesize">1.57KB</strong>
			</label>
		<label data-id="haml">
				<input type="checkbox" name="download-languages" value="haml"   /><span class="name">Haml</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">2.18KB</strong>
			</label>
		<label data-id="handlebars">
				<input type="checkbox" name="download-languages" value="handlebars"   /><span class="name">Handlebars + Mustache</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">0.88KB</strong>
			</label>
		<label data-id="haskell">
				<input type="checkbox" name="download-languages" value="haskell"   /><span class="name">Haskell</span>
					<a href="https://github.com/bholst" class="owner" target="_blank">bholst</a>
				<strong class="filesize">2.91KB</strong>
			</label>
		<label data-id="haxe">
				<input type="checkbox" name="download-languages" value="haxe"   /><span class="name">Haxe</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">1.54KB</strong>
			</label>
		<label data-id="hcl">
				<input type="checkbox" name="download-languages" value="hcl"   /><span class="name">HCL</span>
					<a href="https://github.com/outsideris" class="owner" target="_blank">outsideris</a>
				<strong class="filesize">1.36KB</strong>
			</label>
		<label data-id="hlsl">
				<input type="checkbox" name="download-languages" value="hlsl"   /><span class="name">HLSL</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.62KB</strong>
			</label>
		<label data-id="hoon">
				<input type="checkbox" name="download-languages" value="hoon"   /><span class="name">Hoon</span>
					<a href="https://github.com/matildepark" class="owner" target="_blank">matildepark</a>
				<strong class="filesize">0.48KB</strong>
			</label>
		<label data-id="http">
				<input type="checkbox" name="download-languages" value="http"   /><span class="name">HTTP</span>
					<a href="https://github.com/danielgtaylor" class="owner" target="_blank">danielgtaylor</a>
				<strong class="filesize">1.82KB</strong>
			</label>
		<label data-id="hpkp">
				<input type="checkbox" name="download-languages" value="hpkp"   /><span class="name">HTTP Public-Key-Pins</span>
					<a href="https://github.com/ScottHelme" class="owner" target="_blank">ScottHelme</a>
				<strong class="filesize">0.18KB</strong>
			</label>
		<label data-id="hsts">
				<input type="checkbox" name="download-languages" value="hsts"   /><span class="name">HTTP Strict-Transport-Security</span>
					<a href="https://github.com/ScottHelme" class="owner" target="_blank">ScottHelme</a>
				<strong class="filesize">0.14KB</strong>
			</label>
		<label data-id="ichigojam">
				<input type="checkbox" name="download-languages" value="ichigojam"   /><span class="name">IchigoJam</span>
					<a href="https://github.com/BlueCocoa" class="owner" target="_blank">BlueCocoa</a>
				<strong class="filesize">0.74KB</strong>
			</label>
		<label data-id="icon">
				<input type="checkbox" name="download-languages" value="icon"   /><span class="name">Icon</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">0.91KB</strong>
			</label>
		<label data-id="icu-message-format">
				<input type="checkbox" name="download-languages" value="icu-message-format"   /><span class="name">ICU Message Format</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">2.01KB</strong>
			</label>
		<label data-id="idris">
				<input type="checkbox" name="download-languages" value="idris"   /><span class="name">Idris</span>
					<a href="https://github.com/KeenS" class="owner" target="_blank">KeenS</a>
				<strong class="filesize">0.64KB</strong>
			</label>
		<label data-id="ignore">
				<input type="checkbox" name="download-languages" value="ignore"   /><span class="name">.ignore + .gitignore + .hgignore + .npmignore</span>
					<a href="https://github.com/osipxd" class="owner" target="_blank">osipxd</a>
				<strong class="filesize">0.33KB</strong>
			</label>
		<label data-id="inform7">
				<input type="checkbox" name="download-languages" value="inform7"   /><span class="name">Inform 7</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">3.27KB</strong>
			</label>
		<label data-id="ini">
				<input type="checkbox" name="download-languages" value="ini"   /><span class="name">Ini</span>
					<a href="https://github.com/aviaryan" class="owner" target="_blank">aviaryan</a>
				<strong class="filesize">0.59KB</strong>
			</label>
		<label data-id="io">
				<input type="checkbox" name="download-languages" value="io"   /><span class="name">Io</span>
					<a href="https://github.com/AlesTsurko" class="owner" target="_blank">AlesTsurko</a>
				<strong class="filesize">1.67KB</strong>
			</label>
		<label data-id="j">
				<input type="checkbox" name="download-languages" value="j"   /><span class="name">J</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">0.8KB</strong>
			</label>
		<label data-id="java">
				<input type="checkbox" name="download-languages" value="java"   /><span class="name">Java</span>
					<a href="https://github.com/sherblot" class="owner" target="_blank">sherblot</a>
				<strong class="filesize">2.71KB</strong>
			</label>
		<label data-id="javadoc">
				<input type="checkbox" name="download-languages" value="javadoc"   /><span class="name">JavaDoc</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.37KB</strong>
			</label>
		<label data-id="javadoclike">
				<input type="checkbox" name="download-languages" value="javadoclike"   /><span class="name">JavaDoc-like</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.83KB</strong>
			</label>
		<label data-id="javastacktrace">
				<input type="checkbox" name="download-languages" value="javastacktrace"   /><span class="name">Java stack trace</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.51KB</strong>
			</label>
		<label data-id="jexl">
				<input type="checkbox" name="download-languages" value="jexl"   /><span class="name">Jexl</span>
					<a href="https://github.com/czosel" class="owner" target="_blank">czosel</a>
				<strong class="filesize">0.52KB</strong>
			</label>
		<label data-id="jolie">
				<input type="checkbox" name="download-languages" value="jolie"   /><span class="name">Jolie</span>
					<a href="https://github.com/thesave" class="owner" target="_blank">thesave</a>
				<strong class="filesize">1.43KB</strong>
			</label>
		<label data-id="jq">
				<input type="checkbox" name="download-languages" value="jq"   /><span class="name">JQ</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.14KB</strong>
			</label>
		<label data-id="jsdoc">
				<input type="checkbox" name="download-languages" value="jsdoc"   /><span class="name">JSDoc</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.38KB</strong>
			</label>
		<label data-id="js-extras">
				<input type="checkbox" name="download-languages" value="js-extras"   /><span class="name">JS Extras</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">2.41KB</strong>
			</label>
		<label data-id="json">
				<input type="checkbox" name="download-languages" value="json"   /><span class="name">JSON + Web App Manifest</span>
					<a href="https://github.com/CupOfTea696" class="owner" target="_blank">CupOfTea696</a>
				<strong class="filesize">0.44KB</strong>
			</label>
		<label data-id="json5">
				<input type="checkbox" name="download-languages" value="json5"   /><span class="name">JSON5</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.39KB</strong>
			</label>
		<label data-id="jsonp">
				<input type="checkbox" name="download-languages" value="jsonp"   /><span class="name">JSONP</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.21KB</strong>
			</label>
		<label data-id="jsstacktrace">
				<input type="checkbox" name="download-languages" value="jsstacktrace"   /><span class="name">JS stack trace</span>
					<a href="https://github.com/sbrl" class="owner" target="_blank">sbrl</a>
				<strong class="filesize">0.74KB</strong>
			</label>
		<label data-id="js-templates">
				<input type="checkbox" name="download-languages" value="js-templates"   /><span class="name">JS Templates</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">2.52KB</strong>
			</label>
		<label data-id="julia">
				<input type="checkbox" name="download-languages" value="julia"   /><span class="name">Julia</span>
					<a href="https://github.com/cdagnino" class="owner" target="_blank">cdagnino</a>
				<strong class="filesize">0.99KB</strong>
			</label>
		<label data-id="keepalived">
				<input type="checkbox" name="download-languages" value="keepalived"   /><span class="name">Keepalived Configure</span>
					<a href="https://github.com/dev-itsheng" class="owner" target="_blank">dev-itsheng</a>
				<strong class="filesize">5.54KB</strong>
			</label>
		<label data-id="keyman">
				<input type="checkbox" name="download-languages" value="keyman"   /><span class="name">Keyman</span>
					<a href="https://github.com/mcdurdin" class="owner" target="_blank">mcdurdin</a>
				<strong class="filesize">0.98KB</strong>
			</label>
		<label data-id="kotlin">
				<input type="checkbox" name="download-languages" value="kotlin"   /><span class="name">Kotlin + Kotlin Script</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">1.88KB</strong>
			</label>
		<label data-id="kumir">
				<input type="checkbox" name="download-languages" value="kumir"   /><span class="name">KuMir (КуМир)</span>
					<a href="https://github.com/edukisto" class="owner" target="_blank">edukisto</a>
				<strong class="filesize">1.58KB</strong>
			</label>
		<label data-id="kusto">
				<input type="checkbox" name="download-languages" value="kusto"   /><span class="name">Kusto</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.5KB</strong>
			</label>
		<label data-id="latex">
				<input type="checkbox" name="download-languages" value="latex"   /><span class="name">LaTeX + TeX + ConTeXt</span>
					<a href="https://github.com/japborst" class="owner" target="_blank">japborst</a>
				<strong class="filesize">1KB</strong>
			</label>
		<label data-id="latte">
				<input type="checkbox" name="download-languages" value="latte"   /><span class="name">Latte</span>
					<a href="https://github.com/nette" class="owner" target="_blank">nette</a>
				<strong class="filesize">1.03KB</strong>
			</label>
		<label data-id="less">
				<input type="checkbox" name="download-languages" value="less"   /><span class="name">Less</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">0.67KB</strong>
			</label>
		<label data-id="lilypond">
				<input type="checkbox" name="download-languages" value="lilypond"   /><span class="name">LilyPond</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.19KB</strong>
			</label>
		<label data-id="liquid">
				<input type="checkbox" name="download-languages" value="liquid"   /><span class="name">Liquid</span>
					<a href="https://github.com/cinhtau" class="owner" target="_blank">cinhtau</a>
				<strong class="filesize">2.05KB</strong>
			</label>
		<label data-id="lisp">
				<input type="checkbox" name="download-languages" value="lisp"   /><span class="name">Lisp</span>
					<a href="https://github.com/JuanCaicedo" class="owner" target="_blank">JuanCaicedo</a>
				<strong class="filesize">2.52KB</strong>
			</label>
		<label data-id="livescript">
				<input type="checkbox" name="download-languages" value="livescript"   /><span class="name">LiveScript</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">1.91KB</strong>
			</label>
		<label data-id="llvm">
				<input type="checkbox" name="download-languages" value="llvm"   /><span class="name">LLVM IR</span>
					<a href="https://github.com/porglezomp" class="owner" target="_blank">porglezomp</a>
				<strong class="filesize">0.54KB</strong>
			</label>
		<label data-id="log">
				<input type="checkbox" name="download-languages" value="log"   /><span class="name">Log file</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">2.44KB</strong>
			</label>
		<label data-id="lolcode">
				<input type="checkbox" name="download-languages" value="lolcode"   /><span class="name">LOLCODE</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">1.14KB</strong>
			</label>
		<label data-id="lua">
				<input type="checkbox" name="download-languages" value="lua"   /><span class="name">Lua</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">0.58KB</strong>
			</label>
		<label data-id="magma">
				<input type="checkbox" name="download-languages" value="magma"   /><span class="name">Magma (CAS)</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.1KB</strong>
			</label>
		<label data-id="makefile">
				<input type="checkbox" name="download-languages" value="makefile"   /><span class="name">Makefile</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">0.92KB</strong>
			</label>
		<label data-id="markdown">
				<input type="checkbox" name="download-languages" value="markdown"   /><span class="name">Markdown</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">5.02KB</strong>
			</label>
		<label data-id="markup-templating">
				<input type="checkbox" name="download-languages" value="markup-templating"   /><span class="name">Markup templating</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">1.04KB</strong>
			</label>
		<label data-id="mata">
				<input type="checkbox" name="download-languages" value="mata"   /><span class="name">Mata</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.14KB</strong>
			</label>
		<label data-id="matlab">
				<input type="checkbox" name="download-languages" value="matlab"   /><span class="name">MATLAB</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">0.42KB</strong>
			</label>
		<label data-id="maxscript">
				<input type="checkbox" name="download-languages" value="maxscript"   /><span class="name">MAXScript</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.54KB</strong>
			</label>
		<label data-id="mel">
				<input type="checkbox" name="download-languages" value="mel"   /><span class="name">MEL</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">0.85KB</strong>
			</label>
		<label data-id="mermaid">
				<input type="checkbox" name="download-languages" value="mermaid"   /><span class="name">Mermaid</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">2.03KB</strong>
			</label>
		<label data-id="metafont">
				<input type="checkbox" name="download-languages" value="metafont"   /><span class="name">METAFONT</span>
					<a href="https://github.com/LaeriExNihilo" class="owner" target="_blank">LaeriExNihilo</a>
				<strong class="filesize">4.4KB</strong>
			</label>
		<label data-id="mizar">
				<input type="checkbox" name="download-languages" value="mizar"   /><span class="name">Mizar</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">1.02KB</strong>
			</label>
		<label data-id="mongodb">
				<input type="checkbox" name="download-languages" value="mongodb"   /><span class="name">MongoDB</span>
					<a href="https://github.com/airs0urce" class="owner" target="_blank">airs0urce</a>
				<strong class="filesize">3.34KB</strong>
			</label>
		<label data-id="monkey">
				<input type="checkbox" name="download-languages" value="monkey"   /><span class="name">Monkey</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">0.86KB</strong>
			</label>
		<label data-id="moonscript">
				<input type="checkbox" name="download-languages" value="moonscript"   /><span class="name">MoonScript</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">2KB</strong>
			</label>
		<label data-id="n1ql">
				<input type="checkbox" name="download-languages" value="n1ql"   /><span class="name">N1QL</span>
					<a href="https://github.com/TMWilds" class="owner" target="_blank">TMWilds</a>
				<strong class="filesize">1.76KB</strong>
			</label>
		<label data-id="n4js">
				<input type="checkbox" name="download-languages" value="n4js"   /><span class="name">N4JS</span>
					<a href="https://github.com/bsmith-n4" class="owner" target="_blank">bsmith-n4</a>
				<strong class="filesize">0.56KB</strong>
			</label>
		<label data-id="nand2tetris-hdl">
				<input type="checkbox" name="download-languages" value="nand2tetris-hdl"   /><span class="name">Nand To Tetris HDL</span>
					<a href="https://github.com/stephanmax" class="owner" target="_blank">stephanmax</a>
				<strong class="filesize">0.25KB</strong>
			</label>
		<label data-id="naniscript">
				<input type="checkbox" name="download-languages" value="naniscript"   /><span class="name">Naninovel Script</span>
					<a href="https://github.com/Elringus" class="owner" target="_blank">Elringus</a>
				<strong class="filesize">1.73KB</strong>
			</label>
		<label data-id="nasm">
				<input type="checkbox" name="download-languages" value="nasm"   /><span class="name">NASM</span>
					<a href="https://github.com/rbmj" class="owner" target="_blank">rbmj</a>
				<strong class="filesize">0.68KB</strong>
			</label>
		<label data-id="neon">
				<input type="checkbox" name="download-languages" value="neon"   /><span class="name">NEON</span>
					<a href="https://github.com/nette" class="owner" target="_blank">nette</a>
				<strong class="filesize">0.98KB</strong>
			</label>
		<label data-id="nevod">
				<input type="checkbox" name="download-languages" value="nevod"   /><span class="name">Nevod</span>
					<a href="https://github.com/nezaboodka" class="owner" target="_blank">nezaboodka</a>
				<strong class="filesize">1.92KB</strong>
			</label>
		<label data-id="nginx">
				<input type="checkbox" name="download-languages" value="nginx"   /><span class="name">nginx</span>
					<a href="https://github.com/volado" class="owner" target="_blank">volado</a>
				<strong class="filesize">0.71KB</strong>
			</label>
		<label data-id="nim">
				<input type="checkbox" name="download-languages" value="nim"   /><span class="name">Nim</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">1.11KB</strong>
			</label>
		<label data-id="nix">
				<input type="checkbox" name="download-languages" value="nix"   /><span class="name">Nix</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">1.25KB</strong>
			</label>
		<label data-id="nsis">
				<input type="checkbox" name="download-languages" value="nsis"   /><span class="name">NSIS</span>
					<a href="https://github.com/idleberg" class="owner" target="_blank">idleberg</a>
				<strong class="filesize">3.69KB</strong>
			</label>
		<label data-id="objectivec">
				<input type="checkbox" name="download-languages" value="objectivec"   /><span class="name">Objective-C</span>
					<a href="https://github.com/uranusjr" class="owner" target="_blank">uranusjr</a>
				<strong class="filesize">0.67KB</strong>
			</label>
		<label data-id="ocaml">
				<input type="checkbox" name="download-languages" value="ocaml"   /><span class="name">OCaml</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">1.14KB</strong>
			</label>
		<label data-id="odin">
				<input type="checkbox" name="download-languages" value="odin"   /><span class="name">Odin</span>
					<a href="https://github.com/edukisto" class="owner" target="_blank">edukisto</a>
				<strong class="filesize">1.41KB</strong>
			</label>
		<label data-id="opencl">
				<input type="checkbox" name="download-languages" value="opencl"   /><span class="name">OpenCL</span>
					<a href="https://github.com/Milania1" class="owner" target="_blank">Milania1</a>
				<strong class="filesize">9.68KB</strong>
			</label>
		<label data-id="openqasm">
				<input type="checkbox" name="download-languages" value="openqasm"   /><span class="name">OpenQasm</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.78KB</strong>
			</label>
		<label data-id="oz">
				<input type="checkbox" name="download-languages" value="oz"   /><span class="name">Oz</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">0.8KB</strong>
			</label>
		<label data-id="parigp">
				<input type="checkbox" name="download-languages" value="parigp"   /><span class="name">PARI/GP</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">0.83KB</strong>
			</label>
		<label data-id="parser">
				<input type="checkbox" name="download-languages" value="parser"   /><span class="name">Parser</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">1.4KB</strong>
			</label>
		<label data-id="pascal">
				<input type="checkbox" name="download-languages" value="pascal"   /><span class="name">Pascal + Object Pascal</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">1.87KB</strong>
			</label>
		<label data-id="pascaligo">
				<input type="checkbox" name="download-languages" value="pascaligo"   /><span class="name">Pascaligo</span>
					<a href="https://github.com/DefinitelyNotAGoat" class="owner" target="_blank">DefinitelyNotAGoat</a>
				<strong class="filesize">1.3KB</strong>
			</label>
		<label data-id="psl">
				<input type="checkbox" name="download-languages" value="psl"   /><span class="name">PATROL Scripting Language</span>
					<a href="https://github.com/bertysentry" class="owner" target="_blank">bertysentry</a>
				<strong class="filesize">3.1KB</strong>
			</label>
		<label data-id="pcaxis">
				<input type="checkbox" name="download-languages" value="pcaxis"   /><span class="name">PC-Axis</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.79KB</strong>
			</label>
		<label data-id="peoplecode">
				<input type="checkbox" name="download-languages" value="peoplecode"   /><span class="name">PeopleCode</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.19KB</strong>
			</label>
		<label data-id="perl">
				<input type="checkbox" name="download-languages" value="perl"   /><span class="name">Perl</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">2.12KB</strong>
			</label>
		<label data-id="php">
				<input type="checkbox" name="download-languages" value="php"   /><span class="name">PHP</span>
					<a href="https://github.com/milesj" class="owner" target="_blank">milesj</a>
				<strong class="filesize">6.18KB</strong>
			</label>
		<label data-id="phpdoc">
				<input type="checkbox" name="download-languages" value="phpdoc"   /><span class="name">PHPDoc</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.63KB</strong>
			</label>
		<label data-id="php-extras">
				<input type="checkbox" name="download-languages" value="php-extras"   /><span class="name">PHP Extras</span>
					<a href="https://github.com/milesj" class="owner" target="_blank">milesj</a>
				<strong class="filesize">0.32KB</strong>
			</label>
		<label data-id="plant-uml">
				<input type="checkbox" name="download-languages" value="plant-uml"   /><span class="name">PlantUML</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">2.42KB</strong>
			</label>
		<label data-id="plsql">
				<input type="checkbox" name="download-languages" value="plsql"   /><span class="name">PL/SQL</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">2.67KB</strong>
			</label>
		<label data-id="powerquery">
				<input type="checkbox" name="download-languages" value="powerquery"   /><span class="name">PowerQuery</span>
					<a href="https://github.com/peterbud" class="owner" target="_blank">peterbud</a>
				<strong class="filesize">1.91KB</strong>
			</label>
		<label data-id="powershell">
				<input type="checkbox" name="download-languages" value="powershell"   /><span class="name">PowerShell</span>
					<a href="https://github.com/nauzilus" class="owner" target="_blank">nauzilus</a>
				<strong class="filesize">2.09KB</strong>
			</label>
		<label data-id="processing">
				<input type="checkbox" name="download-languages" value="processing"   /><span class="name">Processing</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">0.49KB</strong>
			</label>
		<label data-id="prolog">
				<input type="checkbox" name="download-languages" value="prolog"   /><span class="name">Prolog</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">0.34KB</strong>
			</label>
		<label data-id="promql">
				<input type="checkbox" name="download-languages" value="promql"   /><span class="name">PromQL</span>
					<a href="https://github.com/arendjr" class="owner" target="_blank">arendjr</a>
				<strong class="filesize">1.2KB</strong>
			</label>
		<label data-id="properties">
				<input type="checkbox" name="download-languages" value="properties"   /><span class="name">.properties</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">0.3KB</strong>
			</label>
		<label data-id="protobuf">
				<input type="checkbox" name="download-languages" value="protobuf"   /><span class="name">Protocol Buffers</span>
					<a href="https://github.com/just-boris" class="owner" target="_blank">just-boris</a>
				<strong class="filesize">0.96KB</strong>
			</label>
		<label data-id="pug">
				<input type="checkbox" name="download-languages" value="pug"   /><span class="name">Pug</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">2.76KB</strong>
			</label>
		<label data-id="puppet">
				<input type="checkbox" name="download-languages" value="puppet"   /><span class="name">Puppet</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">2.48KB</strong>
			</label>
		<label data-id="pure">
				<input type="checkbox" name="download-languages" value="pure"   /><span class="name">Pure</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">3.35KB</strong>
			</label>
		<label data-id="purebasic">
				<input type="checkbox" name="download-languages" value="purebasic"   /><span class="name">PureBasic</span>
					<a href="https://github.com/HeX0R101" class="owner" target="_blank">HeX0R101</a>
				<strong class="filesize">2.41KB</strong>
			</label>
		<label data-id="purescript">
				<input type="checkbox" name="download-languages" value="purescript"   /><span class="name">PureScript</span>
					<a href="https://github.com/sriharshachilakapati" class="owner" target="_blank">sriharshachilakapati</a>
				<strong class="filesize">2.25KB</strong>
			</label>
		<label data-id="python">
				<input type="checkbox" name="download-languages" value="python"   /><span class="name">Python</span>
					<a href="https://github.com/multipetros" class="owner" target="_blank">multipetros</a>
				<strong class="filesize">2.06KB</strong>
			</label>
		<label data-id="qsharp">
				<input type="checkbox" name="download-languages" value="qsharp"   /><span class="name">Q#</span>
					<a href="https://github.com/fedonman" class="owner" target="_blank">fedonman</a>
				<strong class="filesize">1.89KB</strong>
			</label>
		<label data-id="q">
				<input type="checkbox" name="download-languages" value="q"   /><span class="name">Q (kdb+ database)</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">1.67KB</strong>
			</label>
		<label data-id="qml">
				<input type="checkbox" name="download-languages" value="qml"   /><span class="name">QML</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.4KB</strong>
			</label>
		<label data-id="qore">
				<input type="checkbox" name="download-languages" value="qore"   /><span class="name">Qore</span>
					<a href="https://github.com/temnroegg" class="owner" target="_blank">temnroegg</a>
				<strong class="filesize">0.98KB</strong>
			</label>
		<label data-id="r">
				<input type="checkbox" name="download-languages" value="r"   /><span class="name">R</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">0.51KB</strong>
			</label>
		<label data-id="racket">
				<input type="checkbox" name="download-languages" value="racket"   /><span class="name">Racket</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.28KB</strong>
			</label>
		<label data-id="cshtml">
				<input type="checkbox" name="download-languages" value="cshtml"   /><span class="name">Razor C#</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">2.53KB</strong>
			</label>
		<label data-id="jsx">
				<input type="checkbox" name="download-languages" value="jsx"   /><span class="name">React JSX</span>
					<a href="https://github.com/vkbansal" class="owner" target="_blank">vkbansal</a>
				<strong class="filesize">2.33KB</strong>
			</label>
		<label data-id="tsx">
				<input type="checkbox" name="download-languages" value="tsx"   /><span class="name">React TSX</span><strong class="filesize">0.3KB</strong>
			</label>
		<label data-id="reason">
				<input type="checkbox" name="download-languages" value="reason"   /><span class="name">Reason</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">0.8KB</strong>
			</label>
		<label data-id="regex">
				<input type="checkbox" name="download-languages" value="regex"   /><span class="name">Regex</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.26KB</strong>
			</label>
		<label data-id="rego">
				<input type="checkbox" name="download-languages" value="rego"   /><span class="name">Rego</span>
					<a href="https://github.com/JordanSh" class="owner" target="_blank">JordanSh</a>
				<strong class="filesize">0.57KB</strong>
			</label>
		<label data-id="renpy">
				<input type="checkbox" name="download-languages" value="renpy"   /><span class="name">Ren&#39;py</span>
					<a href="https://github.com/HyuchiaDiego" class="owner" target="_blank">HyuchiaDiego</a>
				<strong class="filesize">4.19KB</strong>
			</label>
		<label data-id="rescript">
				<input type="checkbox" name="download-languages" value="rescript"   /><span class="name">ReScript</span>
					<a href="https://github.com/vmarcosp" class="owner" target="_blank">vmarcosp</a>
				<strong class="filesize">1.53KB</strong>
			</label>
		<label data-id="rest">
				<input type="checkbox" name="download-languages" value="rest"   /><span class="name">reST (reStructuredText)</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">3.46KB</strong>
			</label>
		<label data-id="rip">
				<input type="checkbox" name="download-languages" value="rip"   /><span class="name">Rip</span>
					<a href="https://github.com/ravinggenius" class="owner" target="_blank">ravinggenius</a>
				<strong class="filesize">0.75KB</strong>
			</label>
		<label data-id="roboconf">
				<input type="checkbox" name="download-languages" value="roboconf"   /><span class="name">Roboconf</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">0.44KB</strong>
			</label>
		<label data-id="robotframework">
				<input type="checkbox" name="download-languages" value="robotframework"   /><span class="name">Robot Framework</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.45KB</strong>
			</label>
		<label data-id="ruby">
				<input type="checkbox" name="download-languages" value="ruby"   /><span class="name">Ruby</span>
					<a href="https://github.com/samflores" class="owner" target="_blank">samflores</a>
				<strong class="filesize">3.43KB</strong>
			</label>
		<label data-id="rust">
				<input type="checkbox" name="download-languages" value="rust"   /><span class="name">Rust</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">2.41KB</strong>
			</label>
		<label data-id="sas">
				<input type="checkbox" name="download-languages" value="sas"   /><span class="name">SAS</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">7.33KB</strong>
			</label>
		<label data-id="sass">
				<input type="checkbox" name="download-languages" value="sass"   /><span class="name">Sass (Sass)</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">1.06KB</strong>
			</label>
		<label data-id="scss">
				<input type="checkbox" name="download-languages" value="scss"   /><span class="name">Sass (SCSS)</span>
					<a href="https://github.com/MoOx" class="owner" target="_blank">MoOx</a>
				<strong class="filesize">1.3KB</strong>
			</label>
		<label data-id="scala">
				<input type="checkbox" name="download-languages" value="scala"   /><span class="name">Scala</span>
					<a href="https://github.com/jozic" class="owner" target="_blank">jozic</a>
				<strong class="filesize">1.34KB</strong>
			</label>
		<label data-id="scheme">
				<input type="checkbox" name="download-languages" value="scheme"   /><span class="name">Scheme</span>
					<a href="https://github.com/bacchus123" class="owner" target="_blank">bacchus123</a>
				<strong class="filesize">3.87KB</strong>
			</label>
		<label data-id="shell-session">
				<input type="checkbox" name="download-languages" value="shell-session"   /><span class="name">Shell session</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.89KB</strong>
			</label>
		<label data-id="smali">
				<input type="checkbox" name="download-languages" value="smali"   /><span class="name">Smali</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.33KB</strong>
			</label>
		<label data-id="smalltalk">
				<input type="checkbox" name="download-languages" value="smalltalk"   /><span class="name">Smalltalk</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">0.63KB</strong>
			</label>
		<label data-id="smarty">
				<input type="checkbox" name="download-languages" value="smarty"   /><span class="name">Smarty</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">1.92KB</strong>
			</label>
		<label data-id="sml">
				<input type="checkbox" name="download-languages" value="sml"   /><span class="name">SML + SML/NJ</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.49KB</strong>
			</label>
		<label data-id="solidity">
				<input type="checkbox" name="download-languages" value="solidity"   /><span class="name">Solidity (Ethereum)</span>
					<a href="https://github.com/glachaud" class="owner" target="_blank">glachaud</a>
				<strong class="filesize">1.05KB</strong>
			</label>
		<label data-id="solution-file">
				<input type="checkbox" name="download-languages" value="solution-file"   /><span class="name">Solution file</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.67KB</strong>
			</label>
		<label data-id="soy">
				<input type="checkbox" name="download-languages" value="soy"   /><span class="name">Soy (Closure Template)</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">1.56KB</strong>
			</label>
		<label data-id="sparql">
				<input type="checkbox" name="download-languages" value="sparql"   /><span class="name">SPARQL</span>
					<a href="https://github.com/Triply-Dev" class="owner" target="_blank">Triply-Dev</a>
				<strong class="filesize">0.94KB</strong>
			</label>
		<label data-id="splunk-spl">
				<input type="checkbox" name="download-languages" value="splunk-spl"   /><span class="name">Splunk SPL</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.66KB</strong>
			</label>
		<label data-id="sqf">
				<input type="checkbox" name="download-languages" value="sqf"   /><span class="name">SQF: Status Quo Function (Arma 3)</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">32.61KB</strong>
			</label>
		<label data-id="sql">
				<input type="checkbox" name="download-languages" value="sql"   /><span class="name">SQL</span>
					<a href="https://github.com/multipetros" class="owner" target="_blank">multipetros</a>
				<strong class="filesize">3.18KB</strong>
			</label>
		<label data-id="squirrel">
				<input type="checkbox" name="download-languages" value="squirrel"   /><span class="name">Squirrel</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.07KB</strong>
			</label>
		<label data-id="stan">
				<input type="checkbox" name="download-languages" value="stan"   /><span class="name">Stan</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.48KB</strong>
			</label>
		<label data-id="stata">
				<input type="checkbox" name="download-languages" value="stata"   /><span class="name">Stata Ado</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.6KB</strong>
			</label>
		<label data-id="iecst">
				<input type="checkbox" name="download-languages" value="iecst"   /><span class="name">Structured Text (IEC 61131-3)</span>
					<a href="https://github.com/serhioromano" class="owner" target="_blank">serhioromano</a>
				<strong class="filesize">1.29KB</strong>
			</label>
		<label data-id="stylus">
				<input type="checkbox" name="download-languages" value="stylus"   /><span class="name">Stylus</span>
					<a href="https://github.com/vkbansal" class="owner" target="_blank">vkbansal</a>
				<strong class="filesize">3.64KB</strong>
			</label>
		<label data-id="supercollider">
				<input type="checkbox" name="download-languages" value="supercollider"   /><span class="name">SuperCollider</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.83KB</strong>
			</label>
		<label data-id="swift">
				<input type="checkbox" name="download-languages" value="swift"   /><span class="name">Swift</span>
					<a href="https://github.com/chrischares" class="owner" target="_blank">chrischares</a>
				<strong class="filesize">2.87KB</strong>
			</label>
		<label data-id="systemd">
				<input type="checkbox" name="download-languages" value="systemd"   /><span class="name">Systemd configuration file</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.7KB</strong>
			</label>
		<label data-id="t4-templating">
				<input type="checkbox" name="download-languages" value="t4-templating"   /><span class="name">T4 templating</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.61KB</strong>
			</label>
		<label data-id="t4-cs">
				<input type="checkbox" name="download-languages" value="t4-cs"   /><span class="name">T4 Text Templates (C#)</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.09KB</strong>
			</label>
		<label data-id="t4-vb">
				<input type="checkbox" name="download-languages" value="t4-vb"   /><span class="name">T4 Text Templates (VB)</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.07KB</strong>
			</label>
		<label data-id="tap">
				<input type="checkbox" name="download-languages" value="tap"   /><span class="name">TAP</span>
					<a href="https://github.com/isaacs" class="owner" target="_blank">isaacs</a>
				<strong class="filesize">0.37KB</strong>
			</label>
		<label data-id="tcl">
				<input type="checkbox" name="download-languages" value="tcl"   /><span class="name">Tcl</span>
					<a href="https://github.com/PeterChaplin" class="owner" target="_blank">PeterChaplin</a>
				<strong class="filesize">1.47KB</strong>
			</label>
		<label data-id="tt2">
				<input type="checkbox" name="download-languages" value="tt2"   /><span class="name">Template Toolkit 2</span>
					<a href="https://github.com/gflohr" class="owner" target="_blank">gflohr</a>
				<strong class="filesize">1.15KB</strong>
			</label>
		<label data-id="textile">
				<input type="checkbox" name="download-languages" value="textile"   /><span class="name">Textile</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">3.33KB</strong>
			</label>
		<label data-id="toml">
				<input type="checkbox" name="download-languages" value="toml"   /><span class="name">TOML</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.93KB</strong>
			</label>
		<label data-id="tremor">
				<input type="checkbox" name="download-languages" value="tremor"   /><span class="name">Tremor + trickle + troy</span>
					<a href="https://github.com/darach" class="owner" target="_blank">darach</a>
				<strong class="filesize">1.53KB</strong>
			</label>
		<label data-id="turtle">
				<input type="checkbox" name="download-languages" value="turtle"   /><span class="name">Turtle + TriG</span>
					<a href="https://github.com/jakubklimek" class="owner" target="_blank">jakubklimek</a>
				<strong class="filesize">0.89KB</strong>
			</label>
		<label data-id="twig">
				<input type="checkbox" name="download-languages" value="twig"   /><span class="name">Twig</span>
					<a href="https://github.com/brandonkelly" class="owner" target="_blank">brandonkelly</a>
				<strong class="filesize">0.87KB</strong>
			</label>
		<label data-id="typescript">
				<input type="checkbox" name="download-languages" value="typescript"   /><span class="name">TypeScript</span>
					<a href="https://github.com/vkbansal" class="owner" target="_blank">vkbansal</a>
				<strong class="filesize">1.26KB</strong>
			</label>
		<label data-id="typoscript">
				<input type="checkbox" name="download-languages" value="typoscript"   /><span class="name">TypoScript + TSConfig</span>
					<a href="https://github.com/dkern" class="owner" target="_blank">dkern</a>
				<strong class="filesize">1.35KB</strong>
			</label>
		<label data-id="unrealscript">
				<input type="checkbox" name="download-languages" value="unrealscript"   /><span class="name">UnrealScript</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.75KB</strong>
			</label>
		<label data-id="uorazor">
				<input type="checkbox" name="download-languages" value="uorazor"   /><span class="name">UO Razor Script</span>
					<a href="https://github.com/jaseowns" class="owner" target="_blank">jaseowns</a>
				<strong class="filesize">2.33KB</strong>
			</label>
		<label data-id="uri">
				<input type="checkbox" name="download-languages" value="uri"   /><span class="name">URI + URL</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.16KB</strong>
			</label>
		<label data-id="v">
				<input type="checkbox" name="download-languages" value="v"   /><span class="name">V</span>
					<a href="https://github.com/taggon" class="owner" target="_blank">taggon</a>
				<strong class="filesize">1.83KB</strong>
			</label>
		<label data-id="vala">
				<input type="checkbox" name="download-languages" value="vala"   /><span class="name">Vala</span>
					<a href="https://github.com/TemplarVolk" class="owner" target="_blank">TemplarVolk</a>
				<strong class="filesize">1.95KB</strong>
			</label>
		<label data-id="vbnet">
				<input type="checkbox" name="download-languages" value="vbnet"   /><span class="name">VB.Net</span>
					<a href="https://github.com/Bigsby" class="owner" target="_blank">Bigsby</a>
				<strong class="filesize">1.68KB</strong>
			</label>
		<label data-id="velocity">
				<input type="checkbox" name="download-languages" value="velocity"   /><span class="name">Velocity</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">1.2KB</strong>
			</label>
		<label data-id="verilog">
				<input type="checkbox" name="download-languages" value="verilog"   /><span class="name">Verilog</span>
					<a href="https://github.com/a-rey" class="owner" target="_blank">a-rey</a>
				<strong class="filesize">2.05KB</strong>
			</label>
		<label data-id="vhdl">
				<input type="checkbox" name="download-languages" value="vhdl"   /><span class="name">VHDL</span>
					<a href="https://github.com/a-rey" class="owner" target="_blank">a-rey</a>
				<strong class="filesize">1.06KB</strong>
			</label>
		<label data-id="vim">
				<input type="checkbox" name="download-languages" value="vim"   /><span class="name">vim</span>
					<a href="https://github.com/westonganger" class="owner" target="_blank">westonganger</a>
				<strong class="filesize">13.88KB</strong>
			</label>
		<label data-id="visual-basic">
				<input type="checkbox" name="download-languages" value="visual-basic"   /><span class="name">Visual Basic + VBA</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">1.86KB</strong>
			</label>
		<label data-id="warpscript">
				<input type="checkbox" name="download-languages" value="warpscript"   /><span class="name">WarpScript</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.61KB</strong>
			</label>
		<label data-id="wasm">
				<input type="checkbox" name="download-languages" value="wasm"   /><span class="name">WebAssembly</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">1.18KB</strong>
			</label>
		<label data-id="web-idl">
				<input type="checkbox" name="download-languages" value="web-idl"   /><span class="name">Web IDL</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">2.06KB</strong>
			</label>
		<label data-id="wgsl">
				<input type="checkbox" name="download-languages" value="wgsl"   /><span class="name">WGSL</span>
					<a href="https://github.com/Dr4gonthree" class="owner" target="_blank">Dr4gonthree</a>
				<strong class="filesize">3.37KB</strong>
			</label>
		<label data-id="wiki">
				<input type="checkbox" name="download-languages" value="wiki"   /><span class="name">Wiki markup</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">1.14KB</strong>
			</label>
		<label data-id="wolfram">
				<input type="checkbox" name="download-languages" value="wolfram"   /><span class="name">Wolfram language + Mathematica + Mathematica Notebook</span>
					<a href="https://github.com/msollami" class="owner" target="_blank">msollami</a>
				<strong class="filesize">0.84KB</strong>
			</label>
		<label data-id="wren">
				<input type="checkbox" name="download-languages" value="wren"   /><span class="name">Wren</span>
					<a href="https://github.com/clsource" class="owner" target="_blank">clsource</a>
				<strong class="filesize">1.32KB</strong>
			</label>
		<label data-id="xeora">
				<input type="checkbox" name="download-languages" value="xeora"   /><span class="name">Xeora + XeoraCube</span>
					<a href="https://github.com/freakmaxi" class="owner" target="_blank">freakmaxi</a>
				<strong class="filesize">1.85KB</strong>
			</label>
		<label data-id="xml-doc">
				<input type="checkbox" name="download-languages" value="xml-doc"   /><span class="name">XML doc (.net)</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.3KB</strong>
			</label>
		<label data-id="xojo">
				<input type="checkbox" name="download-languages" value="xojo"   /><span class="name">Xojo (REALbasic)</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">1.09KB</strong>
			</label>
		<label data-id="xquery">
				<input type="checkbox" name="download-languages" value="xquery"   /><span class="name">XQuery</span>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">3.82KB</strong>
			</label>
		<label data-id="yaml">
				<input type="checkbox" name="download-languages" value="yaml"   /><span class="name">YAML</span>
					<a href="https://github.com/hason" class="owner" target="_blank">hason</a>
				<strong class="filesize">1.92KB</strong>
			</label>
		<label data-id="yang">
				<input type="checkbox" name="download-languages" value="yang"   /><span class="name">YANG</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">0.3KB</strong>
			</label>
		<label data-id="zig">
				<input type="checkbox" name="download-languages" value="zig"   /><span class="name">Zig</span>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">2.26KB</strong>
			</label>
		
</section>

			<section class="options" id="category-plugins">
	<h1>Plugins</h1>
	<label data-id="line-highlight">
				<input type="checkbox" name="download-plugins" value="line-highlight"   /><a href="/plugins/line-highlight/" class="name">Line Highlight</a><strong class="filesize">4.73KB</strong>
			</label>
		<label data-id="line-numbers">
				<input type="checkbox" name="download-plugins" value="line-numbers"   /><a href="/plugins/line-numbers/" class="name">Line Numbers</a>
					<a href="https://github.com/kuba-kubula" class="owner" target="_blank">kuba-kubula</a>
				<strong class="filesize">3.13KB</strong>
			</label>
		<label data-id="show-invisibles">
				<input type="checkbox" name="download-plugins" value="show-invisibles"   /><a href="/plugins/show-invisibles/" class="name">Show Invisibles</a><strong class="filesize">0.89KB</strong>
			</label>
		<label data-id="autolinker">
				<input type="checkbox" name="download-plugins" value="autolinker"   /><a href="/plugins/autolinker/" class="name">Autolinker</a><strong class="filesize">1.08KB</strong>
			</label>
		<label data-id="wpd">
				<input type="checkbox" name="download-plugins" value="wpd"   /><a href="/plugins/wpd/" class="name">WebPlatform Docs</a><strong class="filesize">3.28KB</strong>
			</label>
		<label data-id="custom-class">
				<input type="checkbox" name="download-plugins" value="custom-class"   /><a href="/plugins/custom-class/" class="name">Custom Class</a>
					<a href="https://github.com/dvkndn" class="owner" target="_blank">dvkndn</a>
				<strong class="filesize">0.49KB</strong>
			</label>
		<label data-id="file-highlight">
				<input type="checkbox" name="download-plugins" value="file-highlight"   /><a href="/plugins/file-highlight/" class="name">File Highlight</a><strong class="filesize">2.14KB</strong>
			</label>
		<label data-id="show-language">
				<input type="checkbox" name="download-plugins" value="show-language"   /><a href="/plugins/show-language/" class="name">Show Language</a>
					<a href="https://github.com/nauzilus" class="owner" target="_blank">nauzilus</a>
				<strong class="filesize">5.62KB</strong>
			</label>
		<label data-id="jsonp-highlight">
				<input type="checkbox" name="download-plugins" value="jsonp-highlight"   /><a href="/plugins/jsonp-highlight/" class="name">JSONP Highlight</a>
					<a href="https://github.com/nauzilus" class="owner" target="_blank">nauzilus</a>
				<strong class="filesize">2.94KB</strong>
			</label>
		<label data-id="highlight-keywords">
				<input type="checkbox" name="download-plugins" value="highlight-keywords"   /><a href="/plugins/highlight-keywords/" class="name">Highlight Keywords</a>
					<a href="https://github.com/vkbansal" class="owner" target="_blank">vkbansal</a>
				<strong class="filesize">0.12KB</strong>
			</label>
		<label data-id="remove-initial-line-feed">
				<input type="checkbox" name="download-plugins" value="remove-initial-line-feed"   /><a href="/plugins/remove-initial-line-feed/" class="name">Remove initial line feed</a>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">0.32KB</strong>
			</label>
		<label data-id="inline-color">
				<input type="checkbox" name="download-plugins" value="inline-color"   /><a href="/plugins/inline-color/" class="name">Inline color</a>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.45KB</strong>
			</label>
		<label data-id="previewers">
				<input type="checkbox" name="download-plugins" value="previewers"   /><a href="/plugins/previewers/" class="name">Previewers</a>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">14.53KB</strong>
			</label>
		<label data-id="autoloader">
				<input type="checkbox" name="download-plugins" value="autoloader"   /><a href="/plugins/autoloader/" class="name">Autoloader</a>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">5.64KB</strong>
			</label>
		<label data-id="keep-markup">
				<input type="checkbox" name="download-plugins" value="keep-markup"   /><a href="/plugins/keep-markup/" class="name">Keep Markup</a>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">1.45KB</strong>
			</label>
		<label data-id="command-line">
				<input type="checkbox" name="download-plugins" value="command-line"   /><a href="/plugins/command-line/" class="name">Command Line</a>
					<a href="https://github.com/chriswells0" class="owner" target="_blank">chriswells0</a>
				<strong class="filesize">3.48KB</strong>
			</label>
		<label data-id="unescaped-markup">
				<input type="checkbox" name="download-plugins" value="unescaped-markup"   /><a href="/plugins/unescaped-markup/" class="name">Unescaped Markup</a><strong class="filesize">1.3KB</strong>
			</label>
		<label data-id="normalize-whitespace">
				<input type="checkbox" name="download-plugins" value="normalize-whitespace"   /><a href="/plugins/normalize-whitespace/" class="name">Normalize Whitespace</a>
					<a href="https://github.com/zeitgeist87" class="owner" target="_blank">zeitgeist87</a>
				<strong class="filesize">2.83KB</strong>
			</label>
		<label data-id="data-uri-highlight">
				<input type="checkbox" name="download-plugins" value="data-uri-highlight"   /><a href="/plugins/data-uri-highlight/" class="name">Data-URI Highlight</a>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">1.38KB</strong>
			</label>
		<label data-id="toolbar">
				<input type="checkbox" name="download-plugins" value="toolbar"   /><a href="/plugins/toolbar/" class="name">Toolbar</a>
					<a href="https://github.com/mAAdhaTTah" class="owner" target="_blank">mAAdhaTTah</a>
				<strong class="filesize">2.88KB</strong>
			</label>
		<label data-id="copy-to-clipboard">
				<input type="checkbox" name="download-plugins" value="copy-to-clipboard"   /><a href="/plugins/copy-to-clipboard/" class="name">Copy to Clipboard Button</a>
					<a href="https://github.com/mAAdhaTTah" class="owner" target="_blank">mAAdhaTTah</a>
				<strong class="filesize">1.52KB</strong>
			</label>
		<label data-id="download-button">
				<input type="checkbox" name="download-plugins" value="download-button"   /><a href="/plugins/download-button/" class="name">Download Button</a>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">0.44KB</strong>
			</label>
		<label data-id="match-braces">
				<input type="checkbox" name="download-plugins" value="match-braces"   /><a href="/plugins/match-braces/" class="name">Match braces</a>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">2.82KB</strong>
			</label>
		<label data-id="diff-highlight">
				<input type="checkbox" name="download-plugins" value="diff-highlight"   /><a href="/plugins/diff-highlight/" class="name">Diff Highlight</a>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.75KB</strong>
			</label>
		<label data-id="filter-highlight-all">
				<input type="checkbox" name="download-plugins" value="filter-highlight-all"   /><a href="/plugins/filter-highlight-all/" class="name">Filter highlightAll</a>
					<a href="https://github.com/RunDevelopment" class="owner" target="_blank">RunDevelopment</a>
				<strong class="filesize">1.05KB</strong>
			</label>
		<label data-id="treeview">
				<input type="checkbox" name="download-plugins" value="treeview"   /><a href="/plugins/treeview/" class="name">Treeview</a>
					<a href="https://github.com/Golmote" class="owner" target="_blank">Golmote</a>
				<strong class="filesize">7.91KB</strong>
			</label>
		
</section>

			
		</section>
		<p>
			Total filesize: <strong id="filesize"></strong> (<strong id="percent-js"></strong> JavaScript + <strong id="percent-css"></strong> CSS)
		</p>
		<p><strong>Note:</strong> The filesizes displayed refer to non-gizipped files and include any CSS code required.</p>
		<section id="download">
			<div class="error"></div>
			<section id="download-js" class="download">
				<pre><code class="language-javascript"></code></pre>
				<button type="button" class="download-button">Download JS</button>
			</section>
			<section id="download-css" class="download">
				<pre><code class="language-css"></code></pre>
				<button type="button" class="download-button">Download CSS</button>
			</section>
		</section>
	</form>
</section>

	</main>

	<footer>
		<img id="logo" src="https://lea.verou.me/logo.svg" />
		<p>Handcrafted with &hearts;, by
			<a href="https://lea.verou.me" target="_blank">Lea Verou</a>,
			<a href="https://github.com/Golmote" target="_blank">Golmote</a>,
			<a href="https://github.com/mAAdhaTTah" target="_blank">James DiGioia</a>,
			<a href="https://github.com/RunDevelopment" target="_blank">Michael Schmidt</a>
			&amp; <a href="https://github.com/PrismJS/prism/graphs/contributors" target="_blank">all these awesome people</a>
		</p>
		<nav>
			<ul>
				<li><a href="/">Home</a></li>
				<li><a href='/download'>Download</a></li>
				<li><a href='/faq'>FAQ</a></li>
				<li><a href='/test'>Test drive</a></li>
				<li><a href='/extending'>API docs</a></li>
				<li><a href="https://github.com/PrismJS/prism/">Fork Prism on GitHub</a></li>
				<li><a href="https://x.com/prismjs">Follow Prism on X</a></li>
			</ul>
		</nav>
	</footer>

	<script src="https://dev.prismjs.com/prism.js"></script>
	<script src="/assets/theme-switcher.js" type="module"></script>
	<script src="dependencies.js" ></script>
	<script src="assets/vendor/FileSaver.min.js" ></script>
	<script src="assets/download.js" type="module"></script>
</body>
</html>
