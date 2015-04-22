import ThreeJsCtrl from './ThreeJsCtrl';
import EventDispatcher from './EventDispatcher';

import TreeFactory from './TreeFactory';



class VisCtrl {
	
	constructor( settings ) {

		this._settings = settings;
		
		//setup threeJS Renderer, Camera, Scene, ...
		this._threeJsCtrl = new ThreeJsCtrl( settings.three );
		this._tree = TreeFactory.indentedTree();

		//add the tree to the scene
		this._threeJsCtrl.addToScene( this._tree );

		EventDispatcher.addEventListener( 'astUpdated', (event) => {
			this.updateVis(event.message);
		});


		EventDispatcher.addEventListener( 'astSelectionUpdated', (event) => {
			this.updateVisSelection(event.message);
		});

		EventDispatcher.addEventListener( 'astUpdatedDeleteTree', (event) => {
			this.deleteTree();
		});

		EventDispatcher.addEventListener( 'changeVis', (event) => {
			this.changeTreeVisType( event.message )
		});


	}

	changeTreeVisType( type ) {

		var ast = this._tree.data.ast;
		this._threeJsCtrl.removeFromScene( this._tree );

		switch(type) {
			/*
			case 'Icicle': 
				this._tree = TreeFactory.icicle();
				break;
			case 'IcicleModified1':
				this._tree = TreeFactory.icicleModified1();
				break;
			case 'IcicleModified2':
				this._tree = TreeFactory.icicleModified2();
				break;
			case 'Triangle':
				this._tree = TreeFactory.horizontalTriangle();
				break;
				*/
			case 'Indented':
				this._tree = TreeFactory.indentedTree();
				break;
		}
		this._threeJsCtrl.addToScene( this._tree );
		this.updateVis(ast)
	}

	updateVis( ast ) {
		
		let dim = {};
		dim.width = this._settings.three.container.clientWidth;
		dim.height = this._settings.three.container.clientHeight;

		this._tree.updateTree( ast, dim );
		this._threeJsCtrl.reDraw();
	}

	deleteTree( ) {
		let dim = {};
		dim.width = this._settings.threejs.container.clientWidth;
		dim.height = this._settings.threejs.container.clientHeight;
		
		this._tree.updateTree( [], dim );
		this._threeJsCtrl.reDraw();
	}

	updateVisSelection( path ) {

		this._tree.onNodeSelection( path );
		this._threeJsCtrl.reDraw();
	}
}

export default VisCtrl;