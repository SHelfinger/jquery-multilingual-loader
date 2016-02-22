/* 
Name : MultiLingual Loader from Secure website
Author : SHelfinger
Author Name : Sascha Sebastian Helfinger
Domain : https://shelfinger.eu
License : DTFUW (Do the Fuck you want) License 
  With the DTFUW License you can do the fuck you want. When you print this source code out, please feel free to clean you ass with it. 
  I would recommend soft paper (1-2mm) think, but of course you can do the fuck you want.
*/

(function($) {
    "use strict";
	
	/* To Do: JSON Request and Fallback Information for Offline Use */
	$.fn.multilingual = function(options) {
		/*
		Possible settings
		loadingbar = the div for the loading html
		loadingbarTimeout = in milliseconds for the fadeout, you can set 0 for disable
		userLang = Get the Navigator Language
		errorText = On not retrieving the JSON file
		language = Retrieving the text inside the multilingual JSON file, example :
		  { 
		  	"en" : {
			  "title" : "Title",
			  "SubTitle" : "Sub Title",
			  "First_Menu_Title" : "Home",
			  ResponsiveDiv" : "<ul><li><img....</li></ul>"
		  }, 
		  	"de" : {
			  "title" : Titel",
			  "SubTitle" : "Untertitel",
			  "First_Menu_Title" : "Home",
			  "ResponsiveDiv" : "<ul><li><img...</li></ul>"
		  	}
		  }
		dataStructure (required) = Json based example :
		  var pageAjax = {
			  title : "title",
			  SubTitle : ".subtitle",
			  First_Menu_Title : ".menu > first",
			  ResponsiveDiv : "#slider"
		  };
		AjaxURL (required) = URL to the JSON file
		AjaxData = Data to submit the JSON file
		AjaxType = POST or GET
		AjaxDataType = JSON, but you can overwrite it
		AjaxTimeout = When it's the request timeout (in milliseconds)
		*/
		var settings = $.extend({
			loadingbar : ".loading",
			loadingbarTimeout : 3000,
			language : "en",
			AjaxType : "POST",
			AjaxDataType : "json",
			AjaxTimeout : 30000,
			userLang : navigator.language || navigator.userLanguage,
			errorText : "Can't get multilingual file.",
		}, options);
		
		if (settings.language !== settings.userLang.split('-')[0]) {
			showError("Your Browser not has the requested language - fall back to English - multilingual()", 1);
			settings.language = "en";
		}
		
		if (settings.AjaxURL === "") {
			showError("Please specify a Ajax URL first - multilingual()", 1);
			return;
		}
		if (settings.DataStructure === "") {
			showError("Please specify a Data Structure first - multilingual()", 1);
			return;
		}
		
		$(settings.loadingbar).show();
				
		return this.each(function() {
							
				var multilingual = $(this);
				multilingual.json = getAjax(multilingual);
				loop(multilingual);
				done(multilingual);
				
		});
		
		// Looping of each JSON field in the dataStructure settings
		function loop(multilingual) {
			
			if (multilingual.json.responseText) {
				var json = JSON.parse(multilingual.json);
				var jsone = Object.keys(json).map(function(en){ return (json[settings.language].en = en) && json[settings.language]; });
				
				$.each(settings.DataStructure, function(i, item) {
					
					$(item).html(jsone[0][0][i]);
					
				});		
				
			} else {
				showError(settings.errorText, true);
			}
        }

		// Trigger after everything else is done
        function done(multilingual) {
			
			if (settings.loadingbarTimeout) { setTimeout(function(){$(settings.loadingbar).fadeOut();},settings.loadingbarTimeout); }
			
        }
		
		// Error Handler
		function showError (message, shown, debug) {
			
			if (debug) {
				$(settings.loadingbar).html(message);
			} else {
				if (console && !shown) { console.log(message); }
				else if (shown) { $(settings.loadingbar).html(message); }
				else if (!console && !shown) { $(settings.loadingbar).html(message); }
			}
			
			$(settings.loadingbar).css("background-color","rgba(255, 2, 2, 0.5)");
			
		}
		
		// Retrieving Ajax JSON file, and save it in the multilingual.json parameter
		function getAjax(multilingual) {
			
			var ajax       = {
				url		:	settings.AjaxURL,
				data	:	settings.AjaxData,
				cache	:	false,
				type	:	settings.AjaxType,
				dataType:	settings.AjaxDataType,
				timeout	:	settings.AjaxTimeout,
				success :	function(response) { multilingual.response = response; }, 
				error 	:	function (data, error, errorThrown) { 
					showError("multilingual(): Problem loading Ajax - error: " + error + " - " + errorThrown);
				}
			};

			return $.ajax(ajax);
		}
		
	};
	
})(jQuery);
