import { Vector4 } from './Vector4.js';

var _points = [
	new Vector4(),
	new Vector4(),
	new Vector4(),
	new Vector4(),
	new Vector4(),
	new Vector4(),
	new Vector4(),
	new Vector4(),
	new Vector4(),
	new Vector4(),
	new Vector4(),
	new Vector4(),
	new Vector4(),
	new Vector4(),
	new Vector4(),
	new Vector4()
];

var _vector = new Vector4();

var _box = new Box4();

// triangle centered vertices

var _v0 = new Vector4();
var _v1 = new Vector4();
var _v2 = new Vector4();

// triangle edge vectors

var _f0 = new Vector4();
var _f1 = new Vector4();
var _f2 = new Vector4();

var _center = new Vector4();
var _extents = new Vector4();
var _triangleNormal = new Vector4();
var _testAxis = new Vector4();

/**
 * @author bhouston / http://clara.io
 * @author WestLangley / http://github.com/WestLangley
 */

function Box4( min, max ) {

	this.min = ( min !== undefined ) ? min : new Vector4( + Infinity, + Infinity, + Infinity, + Infinity );
	this.max = ( max !== undefined ) ? max : new Vector4( - Infinity, - Infinity, - Infinity, - Infinity );

}


Object.assign( Box4.prototype, {

	isBox4: true,

	set: function ( min, max ) {

		this.min.copy( min );
		this.max.copy( max );

		return this;

	},

	setFromArray: function ( array ) {

		var minX = + Infinity;
		var minY = + Infinity;
		var minZ = + Infinity;
		var minW = + Infinity;

		var maxX = - Infinity;
		var maxY = - Infinity;
		var maxZ = - Infinity;
		var maxW = - Infinity;

		for ( var i = 0, l = array.length; i < l; i += 4 ) {

			var x = array[ i ];
			var y = array[ i + 1 ];
			var z = array[ i + 2 ];
			var w = array[ i + 3 ];

			if ( x < minX ) minX = x;
			if ( y < minY ) minY = y;
			if ( z < minZ ) minZ = z;
			if ( w < minW ) minW = w;

			if ( x > maxX ) maxX = x;
			if ( y > maxY ) maxY = y;
			if ( z > maxZ ) maxZ = z;
			if ( w > maxW ) maxW = w;

		}

		this.min.set( minX, minY, minZ, minW );
		this.max.set( maxX, maxY, maxZ, maxW );

		return this;

	},

	setFromBufferAttribute: function ( attribute ) {

		var minX = + Infinity;
		var minY = + Infinity;
		var minZ = + Infinity;
		var minW = + Infinity;

		var maxX = - Infinity;
		var maxY = - Infinity;
		var maxZ = - Infinity;
		var maxW = - Infinity;

		for ( var i = 0, l = attribute.count; i < l; i ++ ) {

			var x = attribute.getX( i );
			var y = attribute.getY( i );
			var z = attribute.getZ( i );
			var w = attribute.getW( i );

			if ( x < minX ) minX = x;
			if ( y < minY ) minY = y;
			if ( z < minZ ) minZ = z;
			if ( w < minW ) minW = w;

			if ( x > maxX ) maxX = x;
			if ( y > maxY ) maxY = y;
			if ( z > maxZ ) maxZ = z;
			if ( w > maxW ) maxW = w;

		}

		this.min.set( minX, minY, minZ, minW );
		this.max.set( maxX, maxY, maxZ, maxW );

		return this;

	},

	setFromPoints: function ( points ) {

		this.makeEmpty();

		for ( var i = 0, il = points.length; i < il; i ++ ) {

			this.expandByPoint( points[ i ] );

		}

		return this;

	},

	setFromCenterAndSize: function ( center, size ) {

		var halfSize = _vector.copy( size ).multiplyScalar( 0.5 );

		this.min.copy( center ).sub( halfSize );
		this.max.copy( center ).add( halfSize );

		return this;

	},

	setFromObject: function ( object ) {

		this.makeEmpty();

		return this.expandByObject( object );

	},

	clone: function () {

		return new this.constructor().copy( this );

	},

	copy: function ( box ) {

		this.min.copy( box.min );
		this.max.copy( box.max );

		return this;

	},

	makeEmpty: function () {

		this.min.x = this.min.y = this.min.z = this.min.w = + Infinity;
		this.max.x = this.max.y = this.max.z = this.max.w = - Infinity;

		return this;

	},

	isEmpty: function () {

		// this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes

		return ( this.max.x < this.min.x ) || ( this.max.y < this.min.y ) || ( this.max.z < this.min.z ) || ( this.max.w < this.min.w );

	},

	getCenter: function ( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Box4: .getCenter() target is now required' );
			target = new Vector4();

		}

		return this.isEmpty() ? target.set( 0, 0, 0, 0 ) : target.addVectors( this.min, this.max ).multiplyScalar( 0.5 );

	},

	getSize: function ( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Box4: .getSize() target is now required' );
			target = new Vector4();

		}

		return this.isEmpty() ? target.set( 0, 0, 0, 0 ) : target.subVectors( this.max, this.min );

	},

	expandByPoint: function ( point ) {

		this.min.min( point );
		this.max.max( point );

		return this;

	},

	expandByVector: function ( vector ) {

		this.min.sub( vector );
		this.max.add( vector );

		return this;

	},

	expandByScalar: function ( scalar ) {

		this.min.addScalar( - scalar );
		this.max.addScalar( scalar );

		return this;

	},

	expandByObject: function ( object ) {

		// Computes the world-axis-aligned bounding box of an object (including its children),
		// accounting for both the object's, and children's, world transforms

		object.updateWorldMatrix( false, false );

		var geometry = object.geometry;

		if ( geometry !== undefined ) {

			if ( geometry.boundingBox === null ) {

				geometry.computeBoundingBox();

			}

			_box.copy( geometry.boundingBox );
			_box.applyMatrix4( object.matrixWorld );

			this.expandByPoint( _box.min );
			this.expandByPoint( _box.max );

		}

		var children = object.children;

		for ( var i = 0, l = children.length; i < l; i ++ ) {

			this.expandByObject( children[ i ] );

		}

		return this;

	},

	containsPoint: function ( point ) {

		return point.x < this.min.x || point.x > this.max.x ||
			point.y < this.min.y || point.y > this.max.y ||
			point.z < this.min.z || point.z > this.max.z ||
			point.w < this.min.w || point.w > this.max.w ? false : true;

	},

	containsBox: function ( box ) {

		return this.min.x <= box.min.x && box.max.x <= this.max.x &&
			this.min.y <= box.min.y && box.max.y <= this.max.y &&
			this.min.z <= box.min.z && box.max.z <= this.max.z &&
			this.min.w <= box.min.w && box.max.w <= this.max.w;

	},

	getParameter: function ( point, target ) {

		// This can potentially have a divide by zero if the box
		// has a size dimension of 0.

		if ( target === undefined ) {

			console.warn( 'THREE.Box4: .getParameter() target is now required' );
			target = new Vector4();

		}

		return target.set(
			( point.x - this.min.x ) / ( this.max.x - this.min.x ),
			( point.y - this.min.y ) / ( this.max.y - this.min.y ),
			( point.z - this.min.z ) / ( this.max.z - this.min.z ),
			( point.w - this.min.w ) / ( this.max.w - this.min.w )
		);

	},

	intersectsBox: function ( box ) {

		// using 8 splitting planes to rule out intersections.
		return box.max.x < this.min.x || box.min.x > this.max.x ||
			box.max.y < this.min.y || box.min.y > this.max.y ||
			box.max.z < this.min.z || box.min.z > this.max.z ||
			box.max.w < this.min.w || box.min.w > this.max.w ? false : true;

	},

	intersectsSphere: function ( sphere ) {

		// Find the point on the AABB closest to the sphere center.
		this.clampPoint( sphere.center, _vector );

		// If that point is inside the sphere, the AABB and sphere intersect.
		return _vector.distanceToSquared( sphere.center ) <= ( sphere.radius * sphere.radius );

	},

	intersectsPlane: function ( plane ) {
		console.error("THREE.Box4: .intersectsPlane() is not done.");

		// We compute the minimum and maximum dot product values. If those values
		// are on the same side (back or front) of the plane, then there is no intersection.

		var min, max;

		if ( plane.normal.x > 0 ) {

			min = plane.normal.x * this.min.x;
			max = plane.normal.x * this.max.x;

		} else {

			min = plane.normal.x * this.max.x;
			max = plane.normal.x * this.min.x;

		}

		if ( plane.normal.y > 0 ) {

			min += plane.normal.y * this.min.y;
			max += plane.normal.y * this.max.y;

		} else {

			min += plane.normal.y * this.max.y;
			max += plane.normal.y * this.min.y;

		}

		if ( plane.normal.z > 0 ) {

			min += plane.normal.z * this.min.z;
			max += plane.normal.z * this.max.z;

		} else {

			min += plane.normal.z * this.max.z;
			max += plane.normal.z * this.min.z;

		}

		return ( min <= - plane.constant && max >= - plane.constant );

	},

	intersectsTriangle: function ( triangle ) {
		console.error("THREE.Box4: .intersectsTriangle() is not done.");

		if ( this.isEmpty() ) {

			return false;

		}

		// compute box center and extents
		this.getCenter( _center );
		_extents.subVectors( this.max, _center );

		// translate triangle to aabb origin
		_v0.subVectors( triangle.a, _center );
		_v1.subVectors( triangle.b, _center );
		_v2.subVectors( triangle.c, _center );

		// compute edge vectors for triangle
		_f0.subVectors( _v1, _v0 );
		_f1.subVectors( _v2, _v1 );
		_f2.subVectors( _v0, _v2 );

		// test against axes that are given by cross product combinations of the edges of the triangle and the edges of the aabb
		// make an axis testing of each of the 3 sides of the aabb against each of the 3 sides of the triangle = 9 axis of separation
		// axis_ij = u_i x f_j (u0, u1, u2 = face normals of aabb = x,y,z axes vectors since aabb is axis aligned)
		var axes = [
			0, - _f0.z, _f0.y, 0, - _f1.z, _f1.y, 0, - _f2.z, _f2.y,
			_f0.z, 0, - _f0.x, _f1.z, 0, - _f1.x, _f2.z, 0, - _f2.x,
			- _f0.y, _f0.x, 0, - _f1.y, _f1.x, 0, - _f2.y, _f2.x, 0
		];
		if ( ! satForAxes( axes, _v0, _v1, _v2, _extents ) ) {

			return false;

		}

		// test 3 face normals from the aabb
		axes = [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ];
		if ( ! satForAxes( axes, _v0, _v1, _v2, _extents ) ) {

			return false;

		}

		// finally testing the face normal of the triangle
		// use already existing triangle edge vectors here
		_triangleNormal.crossVectors( _f0, _f1 );
		axes = [ _triangleNormal.x, _triangleNormal.y, _triangleNormal.z ];

		return satForAxes( axes, _v0, _v1, _v2, _extents );

	},

	clampPoint: function ( point, target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Box4: .clampPoint() target is now required' );
			target = new Vector4();

		}

		return target.copy( point ).clamp( this.min, this.max );

	},

	distanceToPoint: function ( point ) {

		var clampedPoint = _vector.copy( point ).clamp( this.min, this.max );

		return clampedPoint.sub( point ).length();

	},

	getBoundingSphere: function ( target ) {

		if ( target === undefined ) {

			console.error( 'THREE.Box4: .getBoundingSphere() target is now required' );
			//target = new Sphere(); // removed to avoid cyclic dependency

		}

		this.getCenter( target.center );

		target.radius = this.getSize( _vector ).length() * 0.5;

		return target;

	},

	intersect: function ( box ) {

		this.min.max( box.min );
		this.max.min( box.max );

		// ensure that if there is no overlap, the result is fully empty, not slightly empty with non-inf/+inf values that will cause subsequence intersects to erroneously return valid values.
		if ( this.isEmpty() ) this.makeEmpty();

		return this;

	},

	union: function ( box ) {

		this.min.min( box.min );
		this.max.max( box.max );

		return this;

	},

	applyMatrix5: function ( matrix ) {

		// transform of empty box is an empty box.
		if ( this.isEmpty() ) return this;

		// NOTE: I am using a binary pattern to specify all 2^3 combinations below
		_points[ 0 ].set( this.min.x, this.min.y, this.min.z, this.min.w).applyMatrix5( matrix ); // 0000
		_points[ 1 ].set( this.min.x, this.min.y, this.max.z, this.min.w).applyMatrix5( matrix ); // 0010
		_points[ 2 ].set( this.min.x, this.max.y, this.min.z, this.min.w).applyMatrix5( matrix ); // 0100
		_points[ 3 ].set( this.min.x, this.max.y, this.max.z, this.min.w).applyMatrix5( matrix ); // 0110
		_points[ 4 ].set( this.max.x, this.min.y, this.min.z, this.min.w).applyMatrix5( matrix ); // 1000
		_points[ 5 ].set( this.max.x, this.min.y, this.max.z, this.min.w).applyMatrix5( matrix ); // 1010
		_points[ 6 ].set( this.max.x, this.max.y, this.min.z, this.min.w).applyMatrix5( matrix ); // 1100
		_points[ 7 ].set( this.max.x, this.max.y, this.max.z, this.min.w).applyMatrix5( matrix ); // 1110

		_points[ 8 ].set( this.min.x, this.min.y, this.min.z, this.max.w).applyMatrix5( matrix ); // 0001
		_points[ 9 ].set( this.min.x, this.min.y, this.max.z, this.max.w).applyMatrix5( matrix ); // 0011
		_points[ 10 ].set( this.min.x, this.max.y, this.min.z, this.max.w).applyMatrix5( matrix ); // 0101
		_points[ 11 ].set( this.min.x, this.max.y, this.max.z, this.max.w).applyMatrix5( matrix ); // 0111
		_points[ 12 ].set( this.max.x, this.min.y, this.min.z, this.max.w).applyMatrix5( matrix ); // 1001
		_points[ 13 ].set( this.max.x, this.min.y, this.max.z, this.max.w).applyMatrix5( matrix ); // 1011
		_points[ 14 ].set( this.max.x, this.max.y, this.min.z, this.max.w).applyMatrix5( matrix ); // 1101
		_points[ 15 ].set( this.max.x, this.max.y, this.max.z, this.max.w).applyMatrix5( matrix ); // 1111

		this.setFromPoints( _points );

		return this;

	},

	translate: function ( offset ) {

		this.min.add( offset );
		this.max.add( offset );

		return this;

	},

	equals: function ( box ) {

		return box.min.equals( this.min ) && box.max.equals( this.max );

	}

} );

function satForAxes( axes, v0, v1, v2, extents ) {
	console.error( 'THREE.Box4: .satForAxes() is not done.' );

	var i, j;

	for ( i = 0, j = axes.length - 3; i <= j; i += 3 ) {

		_testAxis.fromArray( axes, i );
		// project the aabb onto the seperating axis
		var r = extents.x * Math.abs( _testAxis.x ) + extents.y * Math.abs( _testAxis.y ) + extents.z * Math.abs( _testAxis.z );
		// project all 3 vertices of the triangle onto the seperating axis
		var p0 = v0.dot( _testAxis );
		var p1 = v1.dot( _testAxis );
		var p2 = v2.dot( _testAxis );
		// actual test, basically see if either of the most extreme of the triangle points intersects r
		if ( Math.max( - Math.max( p0, p1, p2 ), Math.min( p0, p1, p2 ) ) > r ) {

			// points of the projected triangle are outside the projected half-length of the aabb
			// the axis is seperating and we can exit
			return false;

		}

	}

	return true;

}

export { Box4 };
