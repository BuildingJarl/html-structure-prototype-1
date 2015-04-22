import VisCtrl from './VisCtrl';
import EditorHtmlCtrl from './EditorHtmlCtrl';


/* basic settings - start */ 

var elements = {
	menu: document.getElementById('top-menu-container'),
	viewport: document.getElementById('viewport'),
	visualisationContainer: document.getElementById('visualisation-container'),
	htmlEditorContainer: document.getElementById('html-editor-container'),
};


var threeSettings = {
	container: elements.visualisationContainer,
	stats: false,
	rendererSettings: { antialias: true, alpha: true }
};


var settings = { 
	elements: elements,
	three: threeSettings
}

/* basic settings - end */ 


var visCtrl = new VisCtrl( settings );
var editorHtmlCtrl = new EditorHtmlCtrl( settings );