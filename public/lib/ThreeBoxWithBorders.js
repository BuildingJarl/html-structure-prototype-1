import THREE from 'three.js';

class ThreeBoxWithBorders extends THREE.Object3D {

	constructor( x, y, z, color ) {
		super();
		
		var geo = new THREE.BoxGeometry( x, y, z );
		var mat = new THREE.MeshBasicMaterial( { color: color } );
				
		this._color = color;
		this._mesh = new THREE.Mesh( geo, mat );
		this._border = new THREE.EdgesHelper( this._mesh, '0xffffff' );
	  	
	  	//not advised to do this but it seems to fix my problem
	  	//https://github.com/mrdoob/three.js/issues/6023
	  	this._border.matrix = this._mesh.matrixWorld;
		this._border.matrixAutoUpdate = true;

		this.add(this._border);
		this.add(this._mesh);
	}

	onSelect() {
		this._mesh.material.color.setHex(0xff0000);
		//this._border.material.color.setHex(0xffffff);
	}

	onUnselect() {
		this._mesh.material.color.setHex(this._color);
		//this._border.material.color.setHex(0xffffff);
	}
}

export default ThreeBoxWithBorders;