# jquery-multilingual-loader
jQuery Based Multilingual Loader from JSON

## How to use MultiLingual


First you will need jQuery be loaded
```HTML
<script type="text/javascript" src="js/jquery.min.js"></script>
```

then 
```HTML
<script type="text/javascript" src="js/jquery.multilingual.min.js"></script>
```
now the code
```HTML
<script type="text/javascript">
	jQuery(document).ready(function($) {
		$(document).multilingual({"AjaxURL" : jsonFileURL, "DataStructure" : jsonFILEDataStructure});
	});
</script>
```

Full Code
```HTML
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery.multilingual.min.js"></script>
<script type="text/javascript">
	jQuery(document).ready(function($) {
		$(document).multilingual({"AjaxURL" : jsonFileURL, "DataStructure" : jsonFILEDataStructure});
	});
</script>
```


## Features of MultiLingual Loader

###### JSON File
```JSON
{ 
	"en" : [{
	  "title" : "Title",
	  "SubTitle" : "Sub Title",
	  "First_Menu_Title" : "Home",
	  ResponsiveDiv" : "<ul><li><img....</li></ul>"
  }], 
	"de" : [{
	  "title" : Titel",
	  "SubTitle" : "Untertitel",
	  "First_Menu_Title" : "Home",
	  "ResponsiveDiv" : "<ul><li><img...</li></ul>"
	}]
}
```
###### Data Structure File
```JavaScript
var pageAjax = {
  title : "title",
  SubTitle : ".subtitle",
  First_Menu_Title : ".menu > first",
  ResponsiveDiv : "#slider"
};
```
