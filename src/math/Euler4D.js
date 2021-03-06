import { Quaternion4D } from './Quaternion4D.js';
import { Vector3 } from './Vector3.js';
import { Matrix5 } from './Matrix5.js';
import { MathUtils } from './MathUtils.js';

/**
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://clara.io
 */

var _matrix = new Matrix5();
var _quaternion = new Quaternion4D();

function Euler4D( yz, zx, xy, xw, yw, zw, order ) {

	this._yz = yz || 0;
	this._zx = zx || 0;
	this._xy = xy || 0;
	this._xw = xw || 0;
	this._yw = yw || 0;
	this._zw = zw || 0;
	this._order = order || Euler4D.DefaultOrder;

}

Euler4D.RotationOrders = [ 'XYZW', 'YZXW', 'ZXYW', 'XZYW', 'YXZW', 'ZYXW',
						   'XYWZ', 'YZWX', 'ZXWY', 'XZWY', 'YXWZ', 'ZYWX',
						   'XWYZ', 'YWZX', 'ZWXY', 'XWZY', 'YWXZ', 'ZWYX',
						   'WXYZ', 'WYZX', 'WZXY', 'WXZY', 'WYXZ', 'WZYX' ];

Euler4D.DefaultOrder = 'XYZW';

Object.defineProperties( Euler4D.prototype, {

	yz: {

		get: function () {

			return this._yz;

		},

		set: function ( value ) {

			this._yz = value;
			this._onChangeCallback();

		}

	},

	zx: {

		get: function () {

			return this._zx;

		},

		set: function ( value ) {

			this._zx = value;
			this._onChangeCallback();

		}

	},

	xy: {

		get: function () {

			return this._xy;

		},

		set: function ( value ) {

			this._xy = value;
			this._onChangeCallback();

		}

	},

	xw: {

		get: function () {

			return this._xw;

		},

		set: function ( value ) {

			this._xw = value;
			this._onChangeCallback();

		}

	},

	yw: {

		get: function () {

			return this._yw;

		},

		set: function ( value ) {

			this._yw = value;
			this._onChangeCallback();

		}

	},

	zw: {

		get: function () {

			return this._zw;

		},

		set: function ( value ) {

			this._zw = value;
			this._onChangeCallback();

		}

	},

	order: {

		get: function () {

			return this._order;

		},

		set: function ( value ) {

			this._order = value;
			this._onChangeCallback();

		}

	}

} );

Object.assign( Euler4D.prototype, {

	isEuler: true,

	set: function ( yz, zx, xy, xw, yw, zw, order ) {

		this._yz = yz || 0;
		this._zx = zx || 0;
		this._xy = xy || 0;
		this._xw = xw || 0;
		this._yw = yw || 0;
		this._zw = zw || 0;
		this._order = order || Euler4D.DefaultOrder;

		this._onChangeCallback();

		return this;

	},

	clone: function () {

		return new this.constructor( this._yz, this._zx, this._xy, this._xw, this._yw, this._zw, this._order );

	},

	copy: function ( euler ) {


		this._yz = euler._yz;
		this._zx = euler._zx;
		this._xy = euler._xy;
		this._xw = euler._xw;
		this._yw = euler._yw;
		this._zw = euler._zw;
		this._order = euler._order;

		this._onChangeCallback();

		return this;

	},

	setFromRotationMatrix: function ( m, order, update ) {
		console.warn("THREE.Euler4D: .setFromRotationMatrix() is not done.");

		var clamp = MathUtils.clamp;

		// assumes the upper 4x4 of m is a pure rotation matrix (i.e, unscaled)

		var te = m.elements;
		var m11 = te[ 0 ], m12 = te[ 5 ], m13 = te[ 10 ], m14 = te[ 15 ],
		    m21 = te[ 1 ], m22 = te[ 6 ], m23 = te[ 11 ], m24 = te[ 16 ],
		    m31 = te[ 2 ], m32 = te[ 7 ], m33 = te[ 12 ], m34 = te[ 17 ],
		    m41 = te[ 3 ], m42 = te[ 8 ], m43 = te[ 13 ], m44 = te[ 18 ];

		order = order || this._order;

		if ( order === 'XYZW' ) {
			console.error("THREE.Euler4D: .setFromRotationMatrix() order XYZW is broken.");

			this._y = Math.asin( clamp( m13, - 1, 1 ) );

			if ( Math.abs( m13 ) < 0.9999999 ) {

				this._x = Math.atan2( - m23, m33 );
				this._z = Math.atan2( - m12, m11 );

			} else {

				this._x = Math.atan2( m32, m22 );
				this._z = 0;

			}

		} else {

			console.warn( 'THREE.Euler: .setFromRotationMatrix() given unsupported order: ' + order );

		}

		this._order = order;

		if ( update !== false ) this._onChangeCallback();

		return this;

	},

	setFromQuaternion: function ( q, order, update ) {
		console.warn("THREE.Euler4D: .setFromQuaternion() is not done.");

		_matrix.makeRotationFromQuaternion( q );

		return this.setFromRotationMatrix( _matrix, order, update );

	},

	reorder: function ( newOrder ) {
		console.warn("THREE.Euler4D: .reorder() is not done.");

		// WARNING: this discards revolution information -bhouston

		_quaternion.setFromEuler( this );

		return this.setFromQuaternion( _quaternion, newOrder );

	},

	equals: function ( euler ) {

		return ( euler._yz === this._yz ) && 
			   ( euler._zx === this._zx ) && 
			   ( euler._xy === this._xy ) && 
			   ( euler._xw === this._xw ) && 
			   ( euler._yw === this._yw ) && 
			   ( euler._zw === this._zw ) && 
			   ( euler._order === this._order );

	},

	lerp: function ( e, alpha ) {

		this._yz += ( e._yz - this._yz ) * alpha;
		this._zx += ( e._zx - this._zx ) * alpha;
		this._xy += ( e._xy - this._xy ) * alpha;
		this._xw += ( e._xw - this._xw ) * alpha;
		this._yw += ( e._yw - this._yw ) * alpha;
		this._zw += ( e._zw - this._zw ) * alpha;

		return this;

	},

	fromArray: function ( array ) {

		this._yz = array[ 0 ];
		this._zx = array[ 1 ];
		this._xy = array[ 2 ];
		this._xw = array[ 3 ];
		this._yw = array[ 4 ];
		this._zw = array[ 5 ];
		if ( array[ 6 ] !== undefined ) this._order = array[ 6 ];

		this._onChangeCallback();

		return this;

	},

	toArray: function ( array, offset ) {

		if ( array === undefined ) array = [];
		if ( offset === undefined ) offset = 0;

		array[ offset ]     = this._yz;
		array[ offset + 1 ] = this._zx;
		array[ offset + 2 ] = this._xy;
		array[ offset + 3 ] = this._xw;
		array[ offset + 4 ] = this._yw;
		array[ offset + 5 ] = this._zw;
		array[ offset + 6 ] = this._order;

		return array;

	},

	_onChange: function ( callback ) {

		this._onChangeCallback = callback;

		return this;

	},

	_onChangeCallback: function () {}

} );


export { Euler4D };
