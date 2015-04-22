import THREE from 'three.js';

class ThreeTriangle extends THREE.Object3D {

	constructor( w, h, color ) {
		super();

		this._color = color;

		var triangle = new THREE.Shape([
				new THREE.Vector2( -(w/2), 0 ),
				new THREE.Vector2( w/2, (h/2) ),
				new THREE.Vector2( w/2, -(h/2) )
		]);

		var geo = triangle.makeGeometry();
		geo.computeFaceNormals();

		var mat = new THREE.MeshBasicMaterial({
			wireframe: false,
			color: color
		});

		this._mesh = new THREE.Mesh( geo, mat );

		this.add(this._mesh);
	}

	onSelect() {
		this._mesh.material.color.setHex(0xff0000);

	}

	onUnselect() {
		this._mesh.material.color.setHex(this._color);
	}
}

export default ThreeTriangle;