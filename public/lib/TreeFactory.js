//import IcicleTree from './IcicleTree';
//import HorizontalTreeTriangle from './HorizontalTreeTriangle';
//import IcicleTreeModified1 from './IcicleTreeModified1';
//import IcicleTreeModified2 from './IcicleTreeModified2';
import IndentedTree from './IndentedTree';

class TreeFactory {
	/*
	icicle() {
		return new IcicleTree();
	}

	icicleModified1() {
		return new IcicleTreeModified1();
	}

	icicleModified2() {
		return new IcicleTreeModified2();
	}

	horizontalTriangle() {
		return new HorizontalTreeTriangle();
	}
	*/
	indentedTree() {
		return new IndentedTree();
	}
}

export default new TreeFactory();