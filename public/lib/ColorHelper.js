

class ColorHelper {

	constructor() {
		this._colors = [
			0x70AF4C,
			0x00348e,
			0xBBAAEE,
			0xE9EB4B,
			0x4be9eb,
			0xeb4be9,
			0xEE6C3A,
			0x6BD2DB,
			0xFF80FF,
			0x808000,
			0x800000,
			0x7FFFD4,
			0xEF6C3A,
			0x7BD2DB,
			0xf42506,
			0xB5B2BE
		];

		this._index = 0;


		this._colors2 = [];

		for(var i = 0 ; i < 1000; i++) {

			this._colors2.push(this.getRandomColor());
		}
	}

	getColor() {

		var val = this._colors[_index];
		this._index++;

		if(this._index >= this._colors.length) {
			this._index = 0;
		}

		return val;
	}

	getColorAtPos(pos) {

		return this._colors[pos];
	}

	getColorAtPos2(pos) {

		return this._colors2[pos];
	}

	getRandomColor() {
	    var letters = '0123456789ABCDEF'.split('');
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	}

}

export default new ColorHelper();