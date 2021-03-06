
import { Vector4 } from '../math/Vector4.js';
import { Matrix4 } from './Matrix4.js';

/**
 * @author rymlks 
 */

function Basis2( x, y ) {

	this.x = ( x && x.isVector4 ) ? x : new Vector4();
	this.y = ( y && y.isVector4 ) ? y : new Vector4();

	this.projectionMatrix = null;
}

Object.assign( Basis2.prototype, {

	clone: function () {

		return new this.constructor().copy( this );

	},

	copy: function ( source ) {

		this.x.copy( source.x );
		this.y.copy( source.y );

		return this;

	},

	setProjectionMatrix: function() {
		this.projectionMatrix = new Matrix4();

		var v1 = this.x;
		var v2 = this.y;

		this.projectionMatrix.elements[0] = v1.x*v1.x + v2.x*v2.x;
		this.projectionMatrix.elements[4] = v1.x*v1.y + v2.x*v2.y;
		this.projectionMatrix.elements[8] = v1.x*v1.z + v2.x*v2.z;
		this.projectionMatrix.elements[12] = v1.x*v1.w + v2.x*v2.w;

		this.projectionMatrix.elements[1] = v1.y*v1.x + v2.y*v2.x;
		this.projectionMatrix.elements[5] = v1.y*v1.y + v2.y*v2.y;
		this.projectionMatrix.elements[9] = v1.y*v1.z + v2.y*v2.z;
		this.projectionMatrix.elements[13] = v1.y*v1.w + v2.y*v2.w;

		this.projectionMatrix.elements[2] = v1.z*v1.x + v2.z*v2.x;
		this.projectionMatrix.elements[6] = v1.z*v1.y + v2.z*v2.y;
		this.projectionMatrix.elements[10] = v1.z*v1.z + v2.z*v2.z;
		this.projectionMatrix.elements[14] = v1.z*v1.w + v2.z*v2.w;

		this.projectionMatrix.elements[3] = v1.w*v1.x + v2.w*v2.x;
		this.projectionMatrix.elements[7] = v1.w*v1.y + v2.w*v2.y;
		this.projectionMatrix.elements[11] = v1.w*v1.z + v2.w*v2.z;
		this.projectionMatrix.elements[15] = v1.w*v1.w + v2.w*v2.w;
	},

    gramSchmidt: function ( v1, v2 ) {
        var u1 = new Vector4().copy(v1).normalize();
		var u2 = new Vector4().subVectors(v2, u1.clone().multiplyScalar(v2.dot(u1))).normalize();

        this.x = u1;
        this.y = u2;

		return this;
    },

	project: function( v ) {
		if (this.projectionMatrix === null) {
			this.setProjectionMatrix();
		}

		return v.clone().applyMatrix4(this.projectionMatrix);
	},

	getOrthogonalComponent: function( v ) {
		var p = this.project(v);
		return v.clone().sub(p);
	},
	
	getOrthogonalCompliment: function( v ) {
		var p = new Vector4().copy(v);
		this.project(p);

		return new Vector4().subVectors(v, p);
	},

} );

export { Basis2 };
