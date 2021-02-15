import { Matrix4 } from './Matrix4.js';
import { Vector4 } from './Vector4.js';

/**
 * @author bhouston / http://clara.io
 */

var _vector1 = new Vector4();
var _vector2 = new Vector4();
var _normalMatrix = new Matrix4();
var _projectionMatrix = new Matrix4();

function Plane4D( point, normal, vec1, vec2 ) {

	// normal is assumed to be normalized

	this.point = ( point !== undefined ) ? point : new Vector4( 0, 0, 0, 0 );
	this.normal = ( normal !== undefined ) ? normal : new Plane4D(this.position, this);
	this.vec1 = ( vec1 !== undefined ) ? vec1 : new Vector4( 0, 0, 0, 0 );
	this.vec2 = ( vec2 !== undefined ) ? vec2 : new Vector4( 0, 0, 0, 0 );
}

Object.assign( Plane4D.prototype, {

	isPlane: true,

	set: function ( point, normal, vec1, vec2 ) {

		this.point.copy( point )
		this.normal.copy( normal );
		this.vec1.copy( vec1 );
		this.vec2.copy( vec2 );

		return this;

	},

	setFromPointVector: function ( point, a, b ) {

		var nvec1 = new Vector4();
		var nvec2 = new Vector4();

		for (var m of ['x', 'y', 'z', 'w']) {
			var pivot = a[m];
			if (pivot !== 0) {
				for (var n of ['x', 'y', 'z', 'w']) {
					if (m != n) {
						nvec1[n] = a[m];
						nvec1[m] = -a[n];
						var indices = ['x', 'y', 'z', 'w'];
						indices.splice(indices.indexOf(n), 1);
						indices.splice(indices.indexOf(m), 1);

						var o = indices[0];
						var p = indices[1];

						nvec1[o] = a[p];
						nvec1[p] = -a[o];
					}
				}
			}
		}
		if (i === 4) {
			console.error("Vector4.crossVectors(): Degenerate vector passed in for a")
		}

		nvec2.crossVectors(a, b, nvec1);

		this.point = point;
		this.vec1 = a;
		this.vec2 = b;

		this.normal.point = point;
		this.normal.vec1 = nvec1;
		this.normal.vec2 = nvec2;

		return this;

	},

	setFromCoplanarPoints: function ( a, b, c ) {
		console.error("THREE.Plane4D - setFromCoplanarPoints(): This function is not done.")

		var normal = _vector1.subVectors( c, b ).cross( _vector2.subVectors( a, b ) ).normalize();

		// Q: should an error be thrown if normal is zero (e.g. degenerate plane)?

		this.setFromNormalAndCoplanarPoint( normal, a );

		return this;

	},

	clone: function () {

		return new this.constructor().copy( this );

	},

	copy: function ( plane ) {

		this.point.copy( plane.point )

		this.vec1.copy( plane.vec1 );
		this.vec2.copy( plane.vec2 );

		this.normal.point.copy( plane.normal.point );

		this.normal.vec1.copy( plane.normal.vec1 );
		this.normal.vec2.copy( plane.normal.vec2 );

		return this;

	},

	normalize: function () {
		console.error("THREE.Plane4D - normalize(): This function is not done.")

		// Note: will lead to a divide by zero if the plane is invalid.

		var inverseNormalLength = 1.0 / this.normal.length();
		this.normal.multiplyScalar( inverseNormalLength );
		this.constant *= inverseNormalLength;

		return this;

	},

	negate: function () {
		console.error("THREE.Plane4D - negate(): This function is not done.")

		this.constant *= - 1;
		this.normal.negate();

		return this;

	},

	distanceToPoint: function ( point ) {
		console.error("THREE.Plane4D - distanceToPoint(): This function is not done.")

		return this.normal.dot( point ) + this.constant;

	},

	distanceToSphere: function ( sphere ) {
		console.error("THREE.Plane4D - distanceToSphere(): This function is not done.")

		return this.distanceToPoint( sphere.center ) - sphere.radius;

	},

	projectPoint: function ( point, target ) {
		console.error("THREE.Plane4D - projectPoint(): This function is not done.")

		if ( target === undefined ) {

			console.warn( 'THREE.Plane: .projectPoint() target is now required' );
			target = new Vector3();

		}

		return target.copy( this.normal ).multiplyScalar( - this.distanceToPoint( point ) ).add( point );

	},

	intersectLine: function ( line, target ) {
		console.error("THREE.Plane4D - intersectLine(): This function is not done.")

		if ( target === undefined ) {

			console.warn( 'THREE.Plane: .intersectLine() target is now required' );
			target = new Vector3();

		}

		var direction = line.delta( _vector1 );

		var denominator = this.normal.dot( direction );

		if ( denominator === 0 ) {

			// line is coplanar, return origin
			if ( this.distanceToPoint( line.start ) === 0 ) {

				return target.copy( line.start );

			}

			// Unsure if this is the correct method to handle this case.
			return undefined;

		}

		var t = - ( line.start.dot( this.normal ) + this.constant ) / denominator;

		if ( t < 0 || t > 1 ) {

			return undefined;

		}

		return target.copy( direction ).multiplyScalar( t ).add( line.start );

	},

	intersectsLine: function ( line ) {
		console.error("THREE.Plane4D - intersectsLine(): This function is not done.")

		// Note: this tests if a line intersects the plane, not whether it (or its end-points) are coplanar with it.

		var startSign = this.distanceToPoint( line.start );
		var endSign = this.distanceToPoint( line.end );

		return ( startSign < 0 && endSign > 0 ) || ( endSign < 0 && startSign > 0 );

	},

	intersectsBox: function ( box ) {

		return box.intersectsPlane( this );

	},

	intersectsSphere: function ( sphere ) {

		return sphere.intersectsPlane( this );

	},

	coplanarPoint: function ( target ) {
		console.error("THREE.Plane4D - coplanarPoint(): This function is not done.")

		if ( target === undefined ) {

			console.warn( 'THREE.Plane: .coplanarPoint() target is now required' );
			target = new Vector3();

		}

		return target.copy( this.normal ).multiplyScalar( - this.constant );

	},

	applyMatrix4: function ( matrix, optionalNormalMatrix ) {
		console.error("THREE.Plane4D - applyMatrix4(): This function is not done.")

		var normalMatrix = optionalNormalMatrix || _normalMatrix.getNormalMatrix( matrix );

		var referencePoint = this.coplanarPoint( _vector1 ).applyMatrix4( matrix );

		var normal = this.normal.applyMatrix3( normalMatrix ).normalize();

		this.constant = - referencePoint.dot( normal );

		return this;

	},

	translate: function ( offset ) {
		console.error("THREE.Plane4D - translate(): This function is not done.")

		this.constant -= offset.dot( this.normal );

		return this;

	},

	equals: function ( plane ) {
		console.error("THREE.Plane4D - equals(): This function is not done.")

		return plane.normal.equals( this.normal ) && ( plane.constant === this.constant );

	}

} );


export { Plane4D };
