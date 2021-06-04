
import { Vector3 } from '../math/Vector3.js';
import { Vector4 } from '../math/Vector4.js';
import { Matrix4 } from './Matrix4.js';

/**
 * @author rymlks 
 */

function Basis3( x, y, z ) {

    if (parseFloat(x.dot(y).toFixed(4)) !== 0 || parseFloat(y.dot(z).toFixed(4)) !== 0 || parseFloat(z.dot(x).toFixed(4)) !== 0) {
        console.error(`Non-orthonormal basis vectors given: ${x}, ${y}, ${z}`);
    }

	this.x = ( x && x.isVector4 ) ? x : new Vector4();
	this.y = ( y && y.isVector4 ) ? y : new Vector4();
	this.z = ( z && z.isVector4 ) ? z : new Vector4();

	this.projectionMatrix = null;
}

Object.assign( Basis3.prototype, {

	clone: function () {

		return new this.constructor().copy( this );

	},

	copy: function ( source ) {

		this.x.copy( source.x );
		this.y.copy( source.y );
		this.z.copy( source.z );

		return this;

	},

	setProjectionMatrix: function() {

		this.projectionMatrix = new Matrix4();

		var v1 = this.x;
		var v2 = this.y;
		var v3 = this.z;
        /*
        A = |v1.x, v2.x, v3.x| AT = |v1.x, v1.y, v1.z, v1.w|
            |v1.y, v2.y, v3.y|      |v2.x, v2.y, v2.z, v2.w|
            |v1.z, v2.z, v3.y|      |v3.x, v3.y, v3.z, v3.w|
            |v1.w, v2.w, v3.w|      
        P = A*AT
        */

		this.projectionMatrix.elements[0] = v1.x*v1.x + v2.x*v2.x + v3.x*v3.x;
		this.projectionMatrix.elements[4] = v1.x*v1.y + v2.x*v2.y + v3.x*v3.y;
		this.projectionMatrix.elements[8] = v1.x*v1.z + v2.x*v2.z + v3.x*v3.z;
		this.projectionMatrix.elements[12] = v1.x*v1.w + v2.x*v2.w + v3.x*v3.w;

		this.projectionMatrix.elements[1] = v1.y*v1.x + v2.y*v2.x + v3.y*v3.x;
		this.projectionMatrix.elements[5] = v1.y*v1.y + v2.y*v2.y + v3.y*v3.y;
		this.projectionMatrix.elements[9] = v1.y*v1.z + v2.y*v2.z + v3.y*v3.z;
		this.projectionMatrix.elements[13] = v1.y*v1.w + v2.y*v2.w + v3.y*v3.w;

		this.projectionMatrix.elements[2] = v1.z*v1.x + v2.z*v2.x + v3.z*v3.x;
		this.projectionMatrix.elements[6] = v1.z*v1.y + v2.z*v2.y + v3.z*v3.y;
		this.projectionMatrix.elements[10] = v1.z*v1.z + v2.z*v2.z + v3.z*v3.z;
		this.projectionMatrix.elements[14] = v1.z*v1.w + v2.z*v2.w + v3.z*v3.w;

		this.projectionMatrix.elements[3] = v1.w*v1.x + v2.w*v2.x + v3.w*v3.x;
		this.projectionMatrix.elements[7] = v1.w*v1.y + v2.w*v2.y + v3.w*v3.y;
		this.projectionMatrix.elements[11] = v1.w*v1.z + v2.w*v2.z + v3.w*v3.z;
		this.projectionMatrix.elements[15] = v1.w*v1.w + v2.w*v2.w + v3.w*v3.w;
	},

    gramSchmidt: function ( v1, v2 ) {
        console.error("Basis3.gramSchmidt is not done.");
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

    changeBasis: function( v ) {
        var x = this.x.dot(v);
        var y = this.y.dot(v);
        var z = this.z.dot(v);

        return new Vector3(x, y, z);
    },

    convertToR4: function( v ) {
        var x = this.x.clone().multiplyScalar(v.x);
        var y = this.y.clone().multiplyScalar(v.y);
        var z = this.z.clone().multiplyScalar(v.z);

        return x.add(y).add(z);
    }

} );

export { Basis3 };
