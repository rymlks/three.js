/**
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 * @author WestLangley / http://github.com/WestLangley
*/

import { Matrix4 } from '../math/Matrix4.js';
import { Matrix5 } from '../math/Matrix5.js';
import { Object3D } from '../core/Object3D.js';
import { Object4D } from '../core/Object4D.js';
import { Vector3 } from '../math/Vector3.js';
import { Vector4 } from '../math/Vector4_.js';

function Camera4D() {

	Object4D.call( this );

	this.type = 'Camera4D';

	this.matrixWorldInverse = new Matrix5();

	this.projectionMatrix = new Matrix4();
	this.projectionMatrixInverse = new Matrix4();

	this.projectionMatrix4D = new Matrix5();
	this.projectionMatrixInverse4D = new Matrix5();

}

Camera4D.prototype = Object.assign( Object.create( Object4D.prototype ), {

	constructor: Camera4D,

	isCamera: true,

	copy: function ( source, recursive ) {

		Object4D.prototype.copy.call( this, source, recursive );

		this.matrixWorldInverse.copy( source.matrixWorldInverse );

		this.projectionMatrix.copy( source.projectionMatrix );
		this.projectionMatrixInverse.copy( source.projectionMatrixInverse );

		return this;

	},

	getWorldDirection: function ( target ) {
		console.warn( 'THREE.Camera4D: .getWorldDirection() is not done' );
		if ( target === undefined ) {

			console.warn( 'THREE.Camera4D: .getWorldDirection() target is now required' );
			target = new Vector3();

		}

		this.updateMatrixWorld( true );

		var e = this.matrixWorld.elements;

		return target.set( - e[ 8 ], - e[ 9 ], - e[ 10 ] ).normalize();

	},

	updateMatrixWorld: function ( force ) {

		Object4D.prototype.updateMatrixWorld.call( this, force );

		this.matrixWorldInverse.getInverse( this.matrixWorld );

	},

	updateWorldMatrix: function ( updateParents, updateChildren ) {

		Object4D.prototype.updateWorldMatrix.call( this, updateParents, updateChildren );

		this.matrixWorldInverse.getInverse( this.matrixWorld );

	},

	clone: function () {

		return new this.constructor().copy( this );

	}

} );

export { Camera4D };
