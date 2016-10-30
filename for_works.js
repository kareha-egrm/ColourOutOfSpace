var ShowOriginalText = 0;
var WritingMode = 0;
var MarkupStyle = 0;

function LoadUtilityMenu(txt, aozora, genpaku, pub) {

	document.write('<div class="utilitymenu">');
	
	document.write('<a href="../../">はじめに</a> ');
	document.write('<a href="http://kareha-azuretune.blogspot.com/">ブログ</a> :: ');
	txt_r = txt;
	if (txt_r.length > 0) {
		if (txt_r.substring(0,4) == 'txt/') {
			txt_r = txt.substring(4);
		}
		document.write('<a href="../txt/' + txt_r + '">テキスト形式（ZIP圧縮）でダウンロード</a> | ');
		txt_url = document.URL;
		slashpoint = txt_url.lastIndexOf('/html/')+1;
		loc = txt_url.substring(0, slashpoint) + "txt/" + txt_r;
	}
	else {
		txt_url = document.URL;
		loc = document.URL;
	}
	document.write('<span class="toggle_parallel_translation"><a id="toggle_parallel_translation" href="#" onClick="ToggleParallelTranslation(ShowOriginalText)">対訳表示ON</a></span> ｜ ');
	document.write('<span class="airzoshi"><a href="http://www.satokazzz.com/airzoshi/">えあ草紙</a>による<a href="http://www.satokazzz.com/airzoshi/reader.php?url=' + loc + '&amp;title=' + document.title + '&amp;home=' + txt_url + '">縦書表示</a> ｜ </span>');
	document.write('<span class="toggle_writngmode"><a id="toggle_writngmode" href="#" onClick="ToggleWritingMode(WritingMode)">縦書き表示 (CSS)</a> ｜ </span>');
	document.write('<span class="toggle_writngmode"><a id="markup_as_aozoratxt" href="#" onClick="MarkupAsAozoraTxt()">実験的ななにか</a></span>');
	document.write('</div>');
}

function LoadCommonFooter(title) {
	document.write('<div class="footmenu">');
	document.write('<a href="../readme.html">はじめに</a> | ');
	document.write('<a href="../termsofuse.html">利用条件</a> | ');
	document.write('<a href="../privacypolicy.html">個人情報の取り扱い</a> | ');
	if (title.length > 0) {
		document.write('<a href="http://kareha-azuretune.blogspot.jp/search/label/' + title + '">関連ブログ記事</a>');
	} else {
		document.write('<a href="../note.html">メモと謝辞</a> | ');
		document.write('<a href="http://kareha-azuretune.blogspot.jp/">番外的ブログ</a>');
	}
	document.write('</div>');
}

function LoadHeadLine() {
}

function CrMessage(arg1, arg2, arg3) {
}

function LinkToBooklog(BookId) {
	document.write('<div class="header_booklog">');

	document.write('<a href="http://booklog.jp/item/7/' + BookId + '">');
	document.write('<img src="http://booklog.jp/ad/general/booklog_88_31.gif" alt="ブクログ" width="88" height="31" border="0" />');
	document.write('の本棚に登録ができるようになりました！</a>');

	document.write('</div>');

	document.close();
}

function ToggleParallelTranslation(n){

	var AllElements = document.getElementsByTagName('*');
	var NumberOfElements = AllElements.length;
	var i = 0;
	
	if (n == 0) {
		ShowOriginalText = 1;
		document.getElementById('toggle_parallel_translation').innerHTML = "対訳表示OFF";
		for (i=0 ;  i<NumberOfElements ; i = i +1) {
			if (AllElements[i].getAttribute('class') == 'original_text') {
				AllElements[i].setAttribute('class', 'original_text_visible');
			}
		}
	}
	else {
		ShowOriginalText = 0;
		document.getElementById('toggle_parallel_translation').innerHTML = "対訳表示ON";
		for (i=0 ;  i<NumberOfElements ; i = i +1) {
			if (AllElements[i].getAttribute('class') == 'original_text_visible') {
				AllElements[i].setAttribute('class', 'original_text');
			}
		}
	}
}

function ToggleWritingMode(n){

	var i = 0;
	var AlternativeValue = 0;

	if (n == 0) {
	
		WritingMode = 1;
		document.getElementById('toggle_writngmode').innerHTML = "縦書き解除";

		var BodyElements = document.getElementsByTagName('body');
		BodyElements[0].setAttribute('class', 'vertical');
	
		AllElements = document.getElementsByTagName('span');
		NumberOfElements = AllElements.length;
		for (i=0 ;  i<NumberOfElements ; i = i +1) {
			if (AllElements[i].getAttribute('class') == 'alternate_in_vertical') {
				AlternativeValue = AllElements[i].innerHTML;
				AllElements[i].innerHTML = AllElements[i].getAttribute('data-alternative_value');
				AllElements[i].setAttribute('data-alternative_value' , AlternativeValue);
			}
		}

	}

	else {
		WritingMode = 0;
		document.getElementById('toggle_writngmode').innerHTML = "縦書き表示 (CSS)";

		var BodyElements = document.getElementsByTagName('body');
		BodyElements[0].setAttribute('class', 'horizontal');
	
		AllElements = document.getElementsByTagName('span');
		NumberOfElements = AllElements.length;
		for (i=0 ;  i<NumberOfElements ; i = i +1) {
			if (AllElements[i].getAttribute('class') == 'alternate_in_vertical') {
				AlternativeValue = AllElements[i].innerHTML;
				AllElements[i].innerHTML = AllElements[i].getAttribute('data-alternative_value');
				AllElements[i].setAttribute('data-alternative_value' , AlternativeValue);
			}
		}

	}
}

function MarkupAsAozoraTxt(){
    
	var i = 0;
	var AllElements = document.getElementsByTagName('ruby');
	var NumberOfElements = AllElements.length;

	for (i=0 ;  i<NumberOfElements ; i = i +1) {
		if (AllElements[i].getAttribute('data-need_separator') == '1') {
			AllElements[i].innerHTML = "｜" + AllElements[i].innerHTML ;
		}
	}

	AllElements = document.getElementsByTagName('rt');
	NumberOfElements = AllElements.length;
	for (i=0 ;  i<NumberOfElements ; i = i +1) {
		AllElements[i].innerHTML = "《" + AllElements[i].innerHTML + "》";
	}

	AllElements = document.getElementsByTagName('p');
	NumberOfElements = AllElements.length;
	for (i=0 ;  i<NumberOfElements ; i = i +1) {
		AllElements[i].innerHTML = AllElements[i].innerHTML + "■" ;
		if (AllElements[i].getAttribute('class') != 'start_with_punctuations') {
			AllElements[i].innerHTML = "　" + AllElements[i].innerHTML ;
		}
	}

		AllElements = document.getElementsByTagName('span');
		NumberOfElements = AllElements.length;
		for (i=0 ;  i<NumberOfElements ; i = i +1) {
			if (AllElements[i].getAttribute('class') == 'alternate_in_vertical') {
				AlternativeValue = AllElements[i].innerHTML;
				AllElements[i].innerHTML = AllElements[i].getAttribute('data-alternative_value');
				AllElements[i].setAttribute('data-alternative_value' , AlternativeValue);
			}
		}

}

