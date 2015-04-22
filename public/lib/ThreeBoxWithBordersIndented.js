import THREE from 'three.js';


function createLine(start, paths) {
	var geo = new THREE.Geometry();
	
	var start = new THREE.Vector3(start.x, start.y,start.z);

	geo.vertices.push( start );

	for( let [i , pos] of paths.entries()) {

		if(i === 0) {
			
			let one = new THREE.Vector3( start.x, pos.y, pos.z);
			let two = new THREE.Vector3( pos.x, pos.y, pos.z);
			let three = new THREE.Vector3( start.x, pos.y, pos.z);

			geo.vertices.push( one );
			geo.vertices.push( two );
			geo.vertices.push( three );
		} else {

			let prev = geo.vertices[ geo.vertices.length - 1 ];

			let one = new THREE.Vector3( prev.x, pos.y, pos.z);
			let two = new THREE.Vector3( pos.x, pos.y, pos.z);
			let three = new THREE.Vector3( prev.x, pos.y, pos.z);
			
			geo.vertices.push( one );
			geo.vertices.push( two );
			geo.vertices.push( three );
		}
		
	}

	var mat = new THREE.LineBasicMaterial( { color: 0x000000, lineWidth: 50 } );

	var line = new THREE.Line(geo, mat);

	return line;
}

class ThreeBoxWithBordersIndented extends THREE.Object3D {

	constructor( x, y, z, color, paths ) {
		super();
		
		var geo = new THREE.BoxGeometry( x, y, z );
		var mat = new THREE.MeshBasicMaterial( { color: color } );
				
		this._color = color;
		this._mesh = new THREE.Mesh( geo, mat );
		this._border = new THREE.EdgesHelper( this._mesh, '0xffffff' );
		this._edges = createLine( {x: -(x/4), y: -(y/2), z:0 } ,paths);
	  	
	  	//not advised to do this but it seems to fix my problem
	  	//https://github.com/mrdoob/three.js/issues/6023
	  	this._border.matrix = this._mesh.matrixWorld;
		this._border.matrixAutoUpdate = true;

		this.add(this._border);
		this.add(this._mesh);
		this.add(this._edges);
	}

	onSelect() {
		this._mesh.material.color.setHex(0xff0000);
		this._edges.material.color.setHex(0xff0000);
		//this._border.material.color.setHex(0xffffff);
	}

	onUnselect() {
		this._mesh.material.color.setHex(this._color);
		this._edges.material.color.setHex(0x000000);
		//this._border.material.color.setHex(0xffffff);
	}
}

export default ThreeBoxWithBordersIndented;