import { Box3 } from './Box3.js';
import { Vector4 } from './Vector4.js';

var _box = new Box3();

/**
 * @author bhouston / http://clara.io
 * @author mrdoob / http://mrdoob.com/
 */

function Glome( center, radius ) {

	this.center = ( center !== undefined ) ? center : new Vector4();
	this.radius = ( radius !== undefined ) ? radius : 0;

}

Object.assign( Glome.prototype, {

	set: function ( center, radius ) {

		this.center.copy( center );
		this.radius = radius;

		return this;

	},

	setFromPoints: function ( points, optionalCenter ) {
		console.error("THREE.Glome: setFromPoints() is not done");

		var center = this.center;

		if ( optionalCenter !== undefined ) {

			center.copy( optionalCenter );

		} else {

			_box.setFromPoints( points ).getCenter( center );

		}

		var maxRadiusSq = 0;

		for ( var i = 0, il = points.length; i < il; i ++ ) {

			maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( points[ i ] ) );

		}

		this.radius = Math.sqrt( maxRadiusSq );

		return this;

	},

	clone: function () {

		return new this.constructor().copy( this );

	},

	copy: function ( glome ) {

		this.center.copy( glome.center );
		this.radius = glome.radius;

		return this;

	},

	empty: function () {

		return ( this.radius <= 0 );

	},

	containsPoint: function ( point ) {

		return ( point.distanceToSquared( this.center ) <= ( this.radius * this.radius ) );

	},

	distanceToPoint: function ( point ) {

		return ( point.distanceTo( this.center ) - this.radius );

	},

	intersectsGlome: function ( glome ) {

		var radiusSum = this.radius + glome.radius;

		return glome.center.distanceToSquared( this.center ) <= ( radiusSum * radiusSum );

	},

	intersectsBox: function ( box ) {
		console.error("THREE.Glome: .intersectsBox() is not done");

		return box.intersectsSphere( this );

	},

	intersectsPlane: function ( plane ) {
		console.error("THREE.Glome: .intersectsPlane() is not done");

		return Math.abs( plane.distanceToPoint( this.center ) ) <= this.radius;

	},

	clampPoint: function ( point, target ) {

		var deltaLengthSq = this.center.distanceToSquared( point );

		if ( target === undefined ) {

			console.warn( 'THREE.Sphere: .clampPoint() target is now required' );
			target = new Vector4();

		}

		target.copy( point );

		if ( deltaLengthSq > ( this.radius * this.radius ) ) {

			target.sub( this.center ).normalize();
			target.multiplyScalar( this.radius ).add( this.center );

		}

		return target;

	},

	getBoundingBox: function ( target ) {
		console.error("THREE.Glome: .getBoundingBox() is not done");

		if ( target === undefined ) {

			console.warn( 'THREE.Sphere: .getBoundingBox() target is now required' );
			target = new Box3();

		}

		target.set( this.center, this.center );
		target.expandByScalar( this.radius );

		return target;

	},

	applyMatrix5: function ( matrix ) {

		this.center.applyMatrix5( matrix );
		this.radius = this.radius * matrix.getMaxScaleOnAxis();

		return this;

	},

	translate: function ( offset ) {

		this.center.add( offset );

		return this;

	},

	equals: function ( glome ) {

		return glome.center.equals( this.center ) && ( glome.radius === this.radius );

	}

} );


export { Glome };
