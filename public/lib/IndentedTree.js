import THREE from 'three.js';
import ColorHelper from './ColorHelper';
import ThreeObjectFactory from './ThreeObjectFactory';
import IndentedTreeLayout from './IndentedTreeLayout';

class IndentedTree extends THREE.Object3D {
	
	constructor() {
		super();
		this.data = { ast: [] };
		this.selectedNode = null;
		this.position.set(0,0,-20);
	}

	updateTree( ast, dim ) {

		this.removeChildren();

		this.data = IndentedTreeLayout( ast, dim );

		traverse( this.data.ast, this );
		
		function traverse( astNodes, parent ) {
			
			for( let [ i, astNode ] of astNodes.entries() ) {

				let mesh = ThreeObjectFactory.createBoxWithBorder(
					astNode.layout.width,
					astNode.layout.height,
					1,
					ColorHelper.getColorAtPos(2)
				);

				mesh.position.set(
					astNode.layout.position.x,
					astNode.layout.position.y,
					0
				);

				astNode.layout.mesh = mesh;

				parent.add( mesh );

				traverse(astNode.children, mesh);
			}
		}
	}

	removeChildren() {
		this.children = [];
	}

	//just ideas - might have to delete
	onNodeSelection( path ) {
		if(path.length > 0) {
			if(this.selectedNode === null || this.selectedNode === undefined) {
				this.selectedNode = this.data.hash[path.join('-')];

				if(this.selectedNode) {
					this.selectedNode = this.selectedNode.layout.mesh;
					this.selectedNode.onSelect();
				}
			} else {
				this.selectedNode.onUnselect();
				this.selectedNode = null;

				this.selectedNode = this.data.hash[path.join('-')];

				if(this.selectedNode) {
					this.selectedNode = this.selectedNode.layout.mesh;
					this.selectedNode.onSelect();
				}
			}
		} else {
			if(this.selectedNode) {
				this.selectedNode.onUnselect();
				this.selectedNode = null;
			}
		}
	}

	update() {

	}
}

export default IndentedTree;