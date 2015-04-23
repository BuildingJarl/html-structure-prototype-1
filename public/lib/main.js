import VisCtrl from './VisCtrl';
import EditorHtmlCtrl from './EditorHtmlCtrl';


/* basic settings - start */ 

var elements = {
	menu: document.getElementById('top-menu-container'),
	viewport: document.getElementById('viewport'),
	visualisationContainer: document.getElementById('visualisation-container'),
	visOptions: document.getElementById('vis-options'),
	vis: document.getElementById('vis'),
	htmlEditorContainer: document.getElementById('html-editor-container'),
	htmlEditorBreadcrumbs: document.getElementById('html-editor-breadcrumbs'),
	htmlEditor: document.getElementById('html-editor'),
};

var threeSettings = {
	container: elements.vis,
	stats: false,
	axis: true,
	rendererSettings: { antialias: true, alpha: true }
};


var settings = { 
	elements: elements,
	three: threeSettings
}

/* basic settings - end */ 


var visCtrl = new VisCtrl( settings );
var editorHtmlCtrl = new EditorHtmlCtrl( settings );