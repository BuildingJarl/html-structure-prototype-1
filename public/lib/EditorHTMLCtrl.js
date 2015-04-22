import ace from "ajaxorg/ace-builds";
import "ajaxorg/ace-builds/theme-monokai";
import "ajaxorg/ace-builds/mode-html";
import "ajaxorg/ace-builds/ext-language_tools";
var Range = ace.require('ace/range').Range;
import EventDispatcher from './EventDispatcher';

import AstHtmlCtrl from './AstHtmlCtrl';


export default class EditorHTMLCtrl {

	constructor(settings) {
		this.settings = settings;

		//Inital Setup
		ace.config.set("basePath", "/jspm_packages/github/ajaxorg/ace-builds@1.1.8/");

		this._editor = ace.edit(settings.elements.htmlEditor.id);
		this._editor.setTheme("ace/theme/monokai");
		this._editor.getSession().setMode("ace/mode/html");

		this._editor.setOptions({
			showPrintMargin: false,
        	enableBasicAutocompletion: true,
        	enableSnippets: true,
        	enableLiveAutocompletion: true,
        	fontSize: "12pt",
        	highlightActiveLine: false, 
        	highlightGutterLine: true
    	});

    	this._editor.setValue('');

		//register/listen for Events
		this._editor.getSession().on('change', (e) => {
			//emmited when document changes
			//console.log(e)
			this.onChange(e);
			
			if(e.data.action === 'removeText') {
				this.onChangeCursor(e);
			}

			if(e.data.action === 'insertText') {
				
			}
		});

		this._editor.selection.on('changeCursor', (e) => {
			this.onChangeCursor(e);
		});

		this._editor.getSession().on('changeFold', (e) => {
		});

		EventDispatcher.addEventListener( 'updateHTMLEditorSelectionLocation', (event) => {
			var location = event.message;

			//editor.scrollToLine(location.start.row, true, true, function () {});
			//console.log(location);


			var range = new Range(location.start.row , location.start.col , location.end.row , location.end.col + 1);
			

			this._editor.gotoLine(range.start.row + 1, range.start.column, true);

			var marker = this._editor.addSelectionMarker(range);

			this._editor.centerSelection();

			//only highlight for a XXX milliseconds
			setTimeout(()=> {
				this._editor.removeSelectionMarker(range);

				this._editor.gotoLine(range.start.row + 1, range.start.column, false);
				this._editor.updateSelectionMarkers();
			}, 500);
		});
	}

	onChange(e) {
		let tempString = this._editor.getSession().getValue();
		AstHtmlCtrl.update(tempString);
	}

	onChangeCursor(e) {
		//get new pos of cursor
		let pos = this._editor.selection.getCursor();
		AstHtmlCtrl.updateSelection(pos);

		let range = AstHtmlCtrl.getTagRange( pos );

		this.highlightCorrispondingGutterLines( range );
	}

	onChangeFold(e) {

	}

	highlightCorrispondingGutterLines( range ) {

		var rows = this._editor.session.getLength();

		for ( let i = 0; i < rows; i++) { 

			if(i >= range.start.row && i <= range.end.row) {
				//this has to be here since it will keep adding the same class
				this._editor.getSession().removeGutterDecoration( i, 'editor-gutter-highlight' );
				this._editor.getSession().addGutterDecoration( i, 'editor-gutter-highlight' );
			} else {
				this._editor.getSession().removeGutterDecoration( i, 'editor-gutter-highlight' );
			}
		}
	}
}