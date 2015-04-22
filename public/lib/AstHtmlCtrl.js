import AST from 'BuildingJarl/HTML-AST';
import EventDispatcher from './EventDispatcher';
import ace from "ajaxorg/ace-builds";
var Range = ace.require('ace/range').Range;

//use three.js event dispatcher

class AstHtmlCtrl {
	constructor() {
		this.ast = [];
		this.count  = 0;

	}

	update( input ) {

		let tempAst = AST.stringToAst(input);
		
		//toDo add diffing algorithm!

		var newCount = this.diff(tempAst);

		//if differnet then redraw tree
		if(this.count != newCount) {
			this.count = newCount;

			this.ast = tempAst;

			EventDispatcher.dispatchEvent({type:'astUpdated', message: this.ast});
		} else {
			this.ast = tempAst;
		}

		EventDispatcher.dispatchEvent({type:'updateLiveViewHTML', message: input});

		
		//if different then redraw tree
		// - different meant that a new node was added or a node was removed
		/*
		if( this.ast.length > 0 ) {
			EventDispatcher.dispatchEvent({type:'astUpdated', message: this.ast});
			EventDispatcher.dispatchEvent({type:'updateLiveViewHTML', message: input});
		} else {
			EventDispatcher.dispatchEvent({type:'astUpdatedDeleteTree', message: null});
			EventDispatcher.dispatchEvent({type:'updateLiveViewHTMLDeleteHTML', message: null});
		}
		*/
	}

	updateSelection( pos ) {

		let path = [];

		traverse(this.ast);

		EventDispatcher.dispatchEvent({type:'astSelectionUpdated', message: path});

		function traverse(nodes) {
	
			for( let [i,node] of nodes.entries() ) {

				let range = new Range(
					node.location.start.row, 
					node.location.start.col,
					node.location.end.row, 
					node.location.end.col
				);

				if( range.contains(pos.row, pos.column) ) {
					
					//let ss = `${pos.row} ${pos.column} - is in ${JSON.stringify(range)}`
					//console.log( ss )

					path.push(i)
					traverse(node.children);
				}
			}
		}
	}

	getTagRange( pos ) {

		var result;

		traverse(this.ast);

		if(!result) {
			result = {
				start: {
					row: -1
				},
				end: {
					row: -1
				}
			};
		}

		return result;
		//make leaf first search of efficiency??? or merge with updateSelection MEthod
		function traverse(nodes) {
	
			for( let [i,node] of nodes.entries() ) {

				let range = new Range(
					node.location.start.row, 
					node.location.start.col,
					node.location.end.row, 
					node.location.end.col
				);

				if( range.contains(pos.row, pos.column) ) {
					
					//let ss = `${pos.row} ${pos.column} - is in ${JSON.stringify(range)}`
					//console.log( ss )

					result = range;
					traverse(node.children);
				}
			}
		}
	}

	diff( newAst ) {

		var count = 0;

		trav(newAst);

		return count;

		function trav(nodes) {

			for( let [i,node] of nodes.entries() ) {
				count ++;
				trav( node.children );
			}
		}
	}
}

export default new AstHtmlCtrl();