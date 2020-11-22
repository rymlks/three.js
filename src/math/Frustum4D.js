import { Vector4 } from './Vector4.js';
import { Glome } from './Glome.js';
import { Plane4D } from './Plane4D.js';

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author bhouston / http://clara.io
 */

var _glome = new Glome();
var _vector = new Vector4();

function Frustum4D( p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21, p22, p23 ) {

	this.planes = [

		( p0 !== undefined ) ? p0 : new Plane4D(),
		( p1 !== undefined ) ? p1 : new Plane4D(),
		( p2 !== undefined ) ? p2 : new Plane4D(),
		( p3 !== undefined ) ? p3 : new Plane4D(),
		( p4 !== undefined ) ? p4 : new Plane4D(),
		( p5 !== undefined ) ? p5 : new Plane4D(),
		( p6 !== undefined ) ? p6 : new Plane4D(),
		( p7 !== undefined ) ? p7 : new Plane4D(),
		( p8 !== undefined ) ? p8 : new Plane4D(),
		( p9 !== undefined ) ? p9 : new Plane4D(),
		( p10 !== undefined ) ? p10 : new Plane4D(),
		( p11 !== undefined ) ? p11 : new Plane4D(),
		( p12 !== undefined ) ? p12 : new Plane4D(),
		( p13 !== undefined ) ? p13 : new Plane4D(),
		( p14 !== undefined ) ? p14 : new Plane4D(),
		( p15 !== undefined ) ? p15 : new Plane4D(),
		( p16 !== undefined ) ? p16 : new Plane4D(),
		( p17 !== undefined ) ? p17 : new Plane4D(),
		( p18 !== undefined ) ? p18 : new Plane4D(),
		( p19 !== undefined ) ? p19 : new Plane4D(),
		( p20 !== undefined ) ? p20 : new Plane4D(),
		( p21 !== undefined ) ? p21 : new Plane4D(),
		( p22 !== undefined ) ? p22 : new Plane4D(),
		( p23 !== undefined ) ? p23 : new Plane4D()

	];

}

Object.assign( Frustum4D.prototype, {

	set: function ( p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21, p22, p23 ) {

		var planes = this.planes;

		planes[ 0 ].copy( p0 );
		planes[ 1 ].copy( p1 );
		planes[ 2 ].copy( p2 );
		planes[ 3 ].copy( p3 );
		planes[ 4 ].copy( p4 );
		planes[ 5 ].copy( p5 );
		planes[ 6 ].copy( p6 );
		planes[ 7 ].copy( p7 );
		planes[ 8 ].copy( p8 );
		planes[ 9 ].copy( p9 );
		planes[ 10 ].copy( p10 );
		planes[ 11 ].copy( p11 );
		planes[ 12 ].copy( p12 );
		planes[ 13 ].copy( p13 );
		planes[ 14 ].copy( p14 );
		planes[ 15 ].copy( p15 );
		planes[ 16 ].copy( p16 );
		planes[ 17 ].copy( p17 );
		planes[ 18 ].copy( p18 );
		planes[ 19 ].copy( p19 );
		planes[ 20 ].copy( p20 );
		planes[ 21 ].copy( p21 );
		planes[ 22 ].copy( p22 );
		planes[ 23 ].copy( p23 );

		return this;

	},

	clone: function () {

		return new this.constructor().copy( this );

	},

	copy: function ( frustum ) {

		var planes = this.planes;

		for ( var i = 0; i < 24; i ++ ) {

			planes[ i ].copy( frustum.planes[ i ] );

		}

		return this;

	},

	setFromProjectionMatrix: function ( m ) {
		//console.error("THREE.Frustum4D: .setFromProjectionMatrix() doesn't do anything.");
		return this;

	},

	intersectsObject: function ( object ) {

		var geometry = object.geometry;

		if ( geometry.boundingGlome === null ) geometry.computeBoundingGlome();

		_glome.copy( geometry.boundingGlome ).applyMatrix5( object.matrixWorld );

		return this.intersectsGlome( _glome );

	},

	intersectsSprite: function ( sprite ) {

		_sphere.center.set( 0, 0, 0 );
		_sphere.radius = 0.7071067811865476;
		_sphere.applyMatrix4( sprite.matrixWorld );

		return this.intersectsSphere( _sphere );

	},

	intersectsGlome: function ( glome ) {

		var planes = this.planes;
		var center = glome.center;
		var negRadius = - glome.radius;

		for ( var i = 0; i < 24; i ++ ) {

			var distance = planes[ i ].distanceToPoint( center );

			if ( distance < negRadius ) {

				return false;

			}

		}

		return true;

	},

	intersectsBox: function ( box ) {
		console.error("THREE.Frustum4D: .intersectsBox() is not done");

		var planes = this.planes;

		for ( var i = 0; i < 24; i ++ ) {

			var plane = planes[ i ];

			// corner at max distance

			_vector.x = plane.normal.x > 0 ? box.max.x : box.min.x;
			_vector.y = plane.normal.y > 0 ? box.max.y : box.min.y;
			_vector.z = plane.normal.z > 0 ? box.max.z : box.min.z;
			_vector.w = plane.normal.w > 0 ? box.max.w : box.min.w;

			if ( plane.distanceToPoint( _vector ) < 0 ) {

				return false;

			}

		}

		return true;

	},

	containsPoint: function ( point ) {

		var planes = this.planes;

		for ( var i = 0; i < 24; i ++ ) {

			if ( planes[ i ].distanceToPoint( point ) < 0 ) {

				return false;

			}

		}

		return true;

	}

} );


export { Frustum4D };
