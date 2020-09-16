import { Vector4 } from './Vector4.js';
import { Glome } from './Glome.js';
import { Plane } from './Plane.js';

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author bhouston / http://clara.io
 */

var _glome = new Glome();
var _vector = new Vector4();

function Frustum4D( p0, p1, p2, p3, p4, p5 ) {

	this.planes = [

		( p0 !== undefined ) ? p0 : new Plane(),
		( p1 !== undefined ) ? p1 : new Plane(),
		( p2 !== undefined ) ? p2 : new Plane(),
		( p3 !== undefined ) ? p3 : new Plane(),
		( p4 !== undefined ) ? p4 : new Plane(),
		( p5 !== undefined ) ? p5 : new Plane()

	];

}

Object.assign( Frustum4D.prototype, {

	set: function ( p0, p1, p2, p3, p4, p5 ) {

		var planes = this.planes;

		planes[ 0 ].copy( p0 );
		planes[ 1 ].copy( p1 );
		planes[ 2 ].copy( p2 );
		planes[ 3 ].copy( p3 );
		planes[ 4 ].copy( p4 );
		planes[ 5 ].copy( p5 );

		return this;

	},

	clone: function () {

		return new this.constructor().copy( this );

	},

	copy: function ( frustum ) {

		var planes = this.planes;

		for ( var i = 0; i < 6; i ++ ) {

			planes[ i ].copy( frustum.planes[ i ] );

		}

		return this;

	},

	setFromProjectionMatrix: function ( m ) {
		//console.error("THREE.Frustum4D: .setFromProjectionMatrix() is pretty fuckin gross");

		var planes = this.planes;
		var me = m.elements;
		var me0 = me[ 0 ], me1 = me[ 1 ], me2 = me[ 2 ], me3 = me[ 3 ];
		var me4 = me[ 5 ], me5 = me[ 6 ], me6 = me[ 7 ], me7 = me[ 8 ];
		var me8 = me[ 10 ], me9 = me[ 11 ], me10 = me[ 12 ], me11 = me[ 13 ];
		var me12 = me[ 15 ], me13 = me[ 16 ], me14 = me[ 17 ], me15 = me[ 18 ];

		planes[ 0 ].setComponents( me3 - me0, me7 - me4, me11 - me8, me15 - me12 ).normalize();
		planes[ 1 ].setComponents( me3 + me0, me7 + me4, me11 + me8, me15 + me12 ).normalize();
		planes[ 2 ].setComponents( me3 + me1, me7 + me5, me11 + me9, me15 + me13 ).normalize();
		planes[ 3 ].setComponents( me3 - me1, me7 - me5, me11 - me9, me15 - me13 ).normalize();
		planes[ 4 ].setComponents( me3 - me2, me7 - me6, me11 - me10, me15 - me14 ).normalize();
		planes[ 5 ].setComponents( me3 + me2, me7 + me6, me11 + me10, me15 + me14 ).normalize();

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

		for ( var i = 0; i < 6; i ++ ) {

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

		for ( var i = 0; i < 6; i ++ ) {

			var plane = planes[ i ];

			// corner at max distance

			_vector.x = plane.normal.x > 0 ? box.max.x : box.min.x;
			_vector.y = plane.normal.y > 0 ? box.max.y : box.min.y;
			_vector.z = plane.normal.z > 0 ? box.max.z : box.min.z;

			if ( plane.distanceToPoint( _vector ) < 0 ) {

				return false;

			}

		}

		return true;

	},

	containsPoint: function ( point ) {

		var planes = this.planes;

		for ( var i = 0; i < 6; i ++ ) {

			if ( planes[ i ].distanceToPoint( point ) < 0 ) {

				return false;

			}

		}

		return true;

	}

} );


export { Frustum4D };
