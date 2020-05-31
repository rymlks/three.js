import { Vector3 } from './Vector3.js';
import { Vector4 } from './Vector4_.js';
import { Matrix4 } from './Matrix4.js';

var _v1 = new Vector4();
var _m1 = new Matrix5();
var _zero = new Vector4( 0, 0, 0, 0 );
var _one = new Vector4( 1, 1, 1, 1 );
var _x = new Vector4();
var _y = new Vector4();
var _z = new Vector4();
var _w = new Vector4();

/**
 * @author mrdoob / http://mrdoob.com/
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 * @author jordi_ros / http://plattsoft.com
 * @author D1plo1d / http://github.com/D1plo1d
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 * @author timknip / http://www.floorplanner.com/
 * @author bhouston / http://clara.io
 * @author WestLangley / http://github.com/WestLangley
 */

function Matrix5() {

	this.elements = [

		1, 0, 0, 0, 0,
		0, 1, 0, 0, 0,
		0, 0, 1, 0, 0,
		0, 0, 0, 1, 0,
		0, 0, 0, 0, 1

	];

	var m11, m21, m31, m41, m51,
		m12, m22, m32, m42, m52,
		m13, m23, m33, m43, m53,
		m14, m24, m34, m44, m54,
		m15, m25, m35, m45, m55;

	if ( arguments.length > 0 ) {

		console.error( 'THREE.Matrix5: the constructor no longer reads arguments. use .set() instead.' );

	}

}

Object.assign( Matrix5.prototype, {

	isMatrix5: true,

	set: function ( n11, n12, n13, n14, n15, n21, n22, n23, n24, n25, n31, n32, n33, n34, n35, n41, n42, n43, n44, n45, n51, n52, n53, n54, n55 ) {

		var te = this.elements;

		te[ 0 ] = n11; te[ 5 ] = n12; te[ 10 ] = n13; te[ 15 ] = n14; te[ 20 ] = n15;
		te[ 1 ] = n21; te[ 6 ] = n22; te[ 11 ] = n23; te[ 16 ] = n24; te[ 21 ] = n25;
		te[ 2 ] = n31; te[ 7 ] = n32; te[ 12 ] = n33; te[ 17 ] = n34; te[ 22 ] = n35;
		te[ 3 ] = n41; te[ 8 ] = n42; te[ 13 ] = n43; te[ 18 ] = n44; te[ 23 ] = n45;
		te[ 4 ] = n51; te[ 9 ] = n52; te[ 14 ] = n53; te[ 19 ] = n54; te[ 24 ] = n55;

		
		return this;

	},

	identity: function () {

		this.set(

			1, 0, 0, 0, 0,
			0, 1, 0, 0, 0,
			0, 0, 1, 0, 0,
			0, 0, 0, 1, 0,
			0, 0, 0, 0, 1

		);

		
		return this;

	},

	clone: function () {

		return new Matrix5().fromArray( this.elements );

	},

	copy: function ( m ) {

		var te = this.elements;
		var me = m.elements;

		te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ]; te[ 2 ] = me[ 2 ]; te[ 3 ] = me[ 3 ]; te[ 4 ] = me[ 4 ]; 
		te[ 5 ] = me[ 5 ]; te[ 6 ] = me[ 6 ]; te[ 7 ] = me[ 7 ]; te[ 8 ] = me[ 8 ]; te[ 9 ] = me[ 9 ]; 
		te[ 10 ] = me[ 10 ]; te[ 11 ] = me[ 11 ]; te[ 12 ] = me[ 12 ]; te[ 13 ] = me[ 13 ]; te[ 14 ] = me[ 14 ]; 
		te[ 15 ] = me[ 15 ]; te[ 16 ] = me[ 16 ];  te[ 17 ] = me[ 17 ];  te[ 18 ] = me[ 18 ];  te[ 19 ] = me[ 19 ]; 
		te[ 20 ] = me[ 20 ]; te[ 21 ] = me[ 21 ];  te[ 22 ] = me[ 22 ];  te[ 23 ] = me[ 23 ];  te[ 24 ] = me[ 24 ]; 

		
		return this;

	},

	copyPosition: function ( m ) {

		var te = this.elements, me = m.elements;

		te[ 20 ] = me[ 20 ];
		te[ 21 ] = me[ 21 ];
		te[ 22 ] = me[ 22 ];
		te[ 23 ] = me[ 23 ];

		
		return this;

	},

	extractBasis: function ( xAxis, yAxis, zAxis, wAxis ) {

		xAxis.setFromMatrixColumn( this, 0 );
		yAxis.setFromMatrixColumn( this, 1 );
		zAxis.setFromMatrixColumn( this, 2 );
		wAxis.setFromMatrixColumn( this, 3 );

		
		return this;

	},

	makeBasis: function ( xAxis, yAxis, zAxis, wAxis ) {

		this.set(
			xAxis.x, yAxis.x, zAxis.x, wAxis.x, 0,
			xAxis.y, yAxis.y, zAxis.y, wAxis.y, 0,
			xAxis.z, yAxis.z, zAxis.z, wAxis.z, 0,
			xAxis.w, yAxis.w, zAxis.w, wAxis.w, 0,
			0, 0, 0, 0, 1
		);

		
		return this;

	},

	extractRotation: function ( m ) {

		// this method does not support reflection matrices

		var te = this.elements;
		var me = m.elements;

		var scaleX = 1 / _v1.setFromMatrixColumn( m, 0 ).length();
		var scaleY = 1 / _v1.setFromMatrixColumn( m, 1 ).length();
		var scaleZ = 1 / _v1.setFromMatrixColumn( m, 2 ).length();
		var scaleW = 1 / _v1.setFromMatrixColumn( m, 3 ).length();

		te[ 0 ] = me[ 0 ] * scaleX;
		te[ 1 ] = me[ 1 ] * scaleX;
		te[ 2 ] = me[ 2 ] * scaleX;
		te[ 3 ] = me[ 3 ] * scaleX;
		te[ 4 ] = 0;

		te[ 5 ] = me[ 5 ] * scaleY;
		te[ 6 ] = me[ 6 ] * scaleY;
		te[ 7 ] = me[ 7 ] * scaleY;
		te[ 8 ] = me[ 8 ] * scaleY;
		te[ 9 ] = 0;

		te[ 10 ] = me[ 10 ] * scaleZ;
		te[ 11 ] = me[ 11 ] * scaleZ;
		te[ 12 ] = me[ 12 ] * scaleZ;
		te[ 13 ] = me[ 13 ] * scaleZ;
		te[ 14 ] = 0;

		te[ 15 ] = me[ 15 ] * scaleW;
		te[ 16 ] = me[ 16 ] * scaleW;
		te[ 17 ] = me[ 17 ] * scaleW;
		te[ 18 ] = me[ 18 ] * scaleW;
		te[ 19 ] = 0;

		te[ 20 ] = 0;
		te[ 21 ] = 0;
		te[ 22 ] = 0;
		te[ 23 ] = 0;
		te[ 24 ] = 1;

		
		return this;

	},

	makeRotationFromEuler: function ( euler ) {
		console.error( 'THREE.Matrix5: .makeRotationFromEuler() is not done.' );

		if ( ! ( euler && euler.isEuler ) ) {

			console.error( 'THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.' );

		}

		var te = this.elements;

		var x = euler.x, y = euler.y, z = euler.z;
		var a = Math.cos( x ), b = Math.sin( x );
		var c = Math.cos( y ), d = Math.sin( y );
		var e = Math.cos( z ), f = Math.sin( z );

		if ( euler.order === 'XYZ' ) {

			var ae = a * e, af = a * f, be = b * e, bf = b * f;

			te[ 0 ] = c * e;
			te[ 4 ] = - c * f;
			te[ 8 ] = d;

			te[ 1 ] = af + be * d;
			te[ 5 ] = ae - bf * d;
			te[ 9 ] = - b * c;

			te[ 2 ] = bf - ae * d;
			te[ 6 ] = be + af * d;
			te[ 10 ] = a * c;

		} else if ( euler.order === 'YXZ' ) {

			var ce = c * e, cf = c * f, de = d * e, df = d * f;

			te[ 0 ] = ce + df * b;
			te[ 4 ] = de * b - cf;
			te[ 8 ] = a * d;

			te[ 1 ] = a * f;
			te[ 5 ] = a * e;
			te[ 9 ] = - b;

			te[ 2 ] = cf * b - de;
			te[ 6 ] = df + ce * b;
			te[ 10 ] = a * c;

		} else if ( euler.order === 'ZXY' ) {

			var ce = c * e, cf = c * f, de = d * e, df = d * f;

			te[ 0 ] = ce - df * b;
			te[ 4 ] = - a * f;
			te[ 8 ] = de + cf * b;

			te[ 1 ] = cf + de * b;
			te[ 5 ] = a * e;
			te[ 9 ] = df - ce * b;

			te[ 2 ] = - a * d;
			te[ 6 ] = b;
			te[ 10 ] = a * c;

		} else if ( euler.order === 'ZYX' ) {

			var ae = a * e, af = a * f, be = b * e, bf = b * f;

			te[ 0 ] = c * e;
			te[ 4 ] = be * d - af;
			te[ 8 ] = ae * d + bf;

			te[ 1 ] = c * f;
			te[ 5 ] = bf * d + ae;
			te[ 9 ] = af * d - be;

			te[ 2 ] = - d;
			te[ 6 ] = b * c;
			te[ 10 ] = a * c;

		} else if ( euler.order === 'YZX' ) {

			var ac = a * c, ad = a * d, bc = b * c, bd = b * d;

			te[ 0 ] = c * e;
			te[ 4 ] = bd - ac * f;
			te[ 8 ] = bc * f + ad;

			te[ 1 ] = f;
			te[ 5 ] = a * e;
			te[ 9 ] = - b * e;

			te[ 2 ] = - d * e;
			te[ 6 ] = ad * f + bc;
			te[ 10 ] = ac - bd * f;

		} else if ( euler.order === 'XZY' ) {

			var ac = a * c, ad = a * d, bc = b * c, bd = b * d;

			te[ 0 ] = c * e;
			te[ 4 ] = - f;
			te[ 8 ] = d * e;

			te[ 1 ] = ac * f + bd;
			te[ 5 ] = a * e;
			te[ 9 ] = ad * f - bc;

			te[ 2 ] = bc * f - ad;
			te[ 6 ] = b * e;
			te[ 10 ] = bd * f + ac;

		}

		// bottom row
		te[ 3 ] = 0;
		te[ 7 ] = 0;
		te[ 11 ] = 0;

		// last column
		te[ 12 ] = 0;
		te[ 13 ] = 0;
		te[ 14 ] = 0;
		te[ 15 ] = 1;

		
		return this;

	},

	makeRotationFromQuaternion: function ( q ) {
		console.error( 'THREE.Matrix5: .makeRotationFromQuaternion() is not done.' );

		return this.compose( _zero, q, _one );

	},

	lookAt: function ( eye, target, up ) {
		console.error( 'THREE.Matrix5: .lookAt() is not done.' );

		var te = this.elements;

		_z.subVectors( eye, target );

		if ( _z.lengthSq() === 0 ) {

			// eye and target are in the same position

			_z.z = 1;

		}

		_z.normalize();
		_x.crossVectors( up, _z );

		if ( _x.lengthSq() === 0 ) {

			// up and z are parallel

			if ( Math.abs( up.z ) === 1 ) {

				_z.x += 0.0001;

			} else {

				_z.z += 0.0001;

			}

			_z.normalize();
			_x.crossVectors( up, _z );

		}

		_x.normalize();
		_y.crossVectors( _z, _x );

		te[ 0 ] = _x.x; te[ 4 ] = _y.x; te[ 8 ] = _z.x;
		te[ 1 ] = _x.y; te[ 5 ] = _y.y; te[ 9 ] = _z.y;
		te[ 2 ] = _x.z; te[ 6 ] = _y.z; te[ 10 ] = _z.z;

		
		return this;

	},

	multiply: function ( m, n ) {

		if ( n !== undefined ) {

			console.warn( 'THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.' );
			return this.multiplyMatrices( m, n );

		}

		return this.multiplyMatrices( this, m );

	},

	premultiply: function ( m ) {

		return this.multiplyMatrices( m, this );

	},

	multiplyMatrices: function ( a, b ) {

		var ae = a.elements;
		var be = b.elements;
		var te = this.elements;

		var a11 = ae[ 0 ], a12 = ae[ 5 ], a13 = ae[ 10 ], a14 = ae[ 15 ], a15 = ae[ 20 ];
		var a21 = ae[ 1 ], a22 = ae[ 6 ], a23 = ae[ 11 ], a24 = ae[ 16 ], a25 = ae[ 21 ];
		var a31 = ae[ 2 ], a32 = ae[ 7 ], a33 = ae[ 12 ], a34 = ae[ 17 ], a35 = ae[ 22 ];
		var a41 = ae[ 3 ], a42 = ae[ 8 ], a43 = ae[ 13 ], a44 = ae[ 18 ], a45 = ae[ 23 ];
		var a51 = ae[ 4 ], a52 = ae[ 9 ], a53 = ae[ 14 ], a54 = ae[ 19 ], a55 = ae[ 24 ];

		var b11 = be[ 0 ], b12 = be[ 5 ], b13 = be[ 10 ], b14 = be[ 15 ], b15 = be[ 20 ];
		var b21 = be[ 1 ], b22 = be[ 6 ], b23 = be[ 11 ], b24 = be[ 16 ], b25 = be[ 21 ];
		var b31 = be[ 2 ], b32 = be[ 7 ], b33 = be[ 12 ], b34 = be[ 17 ], b35 = be[ 22 ];
		var b41 = be[ 3 ], b42 = be[ 8 ], b43 = be[ 13 ], b44 = be[ 18 ], b45 = be[ 23 ];
		var b51 = be[ 4 ], b52 = be[ 9 ], b53 = be[ 14 ], b54 = be[ 19 ], b55 = be[ 24 ];

		te[ 0 ]  = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41 + a15 * b51;
		te[ 5 ]  = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42 + a15 * b52;
		te[ 10 ] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43 + a15 * b53;
		te[ 15 ] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44 + a15 * b54;
		te[ 20 ] = a11 * b15 + a12 * b25 + a13 * b35 + a14 * b45 + a15 * b55;

		te[ 1 ]  = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41 + a25 * b51;
		te[ 6 ]  = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42 + a25 * b52;
		te[ 11 ] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43 + a25 * b53;
		te[ 16 ] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44 + a25 * b54;
		te[ 21 ] = a21 * b15 + a22 * b25 + a23 * b35 + a24 * b45 + a25 * b55;

		te[ 2 ]  = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41 + a35 * b51;
		te[ 7 ]  = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42 + a35 * b52;
		te[ 12 ] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43 + a35 * b53;
		te[ 17 ] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44 + a35 * b54;
		te[ 22 ] = a31 * b15 + a32 * b25 + a33 * b35 + a34 * b45 + a35 * b55;

		te[ 3 ]  = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41 + a45 * b51;
		te[ 8 ]  = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42 + a45 * b52;
		te[ 13 ] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43 + a45 * b53;
		te[ 18 ] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44 + a45 * b54;
		te[ 23 ] = a41 * b15 + a42 * b25 + a43 * b35 + a44 * b45 + a45 * b55;

		te[ 4 ]  = a51 * b11 + a52 * b21 + a53 * b31 + a54 * b41 + a55 * b51;
		te[ 9 ]  = a51 * b12 + a52 * b22 + a53 * b32 + a54 * b42 + a55 * b52;
		te[ 14 ] = a51 * b13 + a52 * b23 + a53 * b33 + a54 * b43 + a55 * b53;
		te[ 19 ] = a51 * b14 + a52 * b24 + a53 * b34 + a54 * b44 + a55 * b54;
		te[ 24 ] = a51 * b15 + a52 * b25 + a53 * b35 + a54 * b45 + a55 * b55;

		
		return this;

	},

	multiplyScalar: function ( s ) {

		var te = this.elements;

		te[ 0 ] *= s; te[ 5 ] *= s; te[ 10 ] *= s; te[ 15 ] *= s; te[ 20 ] *= s;
		te[ 1 ] *= s; te[ 6 ] *= s; te[ 11 ] *= s; te[ 16 ] *= s; te[ 21 ] *= s;
		te[ 2 ] *= s; te[ 7 ] *= s; te[ 12 ] *= s; te[ 17 ] *= s; te[ 22 ] *= s;
		te[ 3 ] *= s; te[ 8 ] *= s; te[ 13 ] *= s; te[ 18 ] *= s; te[ 23 ] *= s;
		te[ 4 ] *= s; te[ 9 ] *= s; te[ 14 ] *= s; te[ 19 ] *= s; te[ 24 ] *= s;

		
		return this;

	},

	determinant: function () {
		//console.warn( 'THREE.Matrix5: .determinant() is super inefficient.' );

		var te = this.elements;

		var n11 = te[ 0 ], n12 = te[ 5 ], n13 = te[ 10 ], n14 = te[ 15 ], n15 = te[ 20 ];
		var n21 = te[ 1 ], n22 = te[ 6 ], n23 = te[ 11 ], n24 = te[ 16 ], n25 = te[ 21 ];
		var n31 = te[ 2 ], n32 = te[ 7 ], n33 = te[ 12 ], n34 = te[ 17 ], n35 = te[ 22 ];
		var n41 = te[ 3 ], n42 = te[ 8 ], n43 = te[ 13 ], n44 = te[ 18 ], n45 = te[ 23 ];
		var n51 = te[ 4 ], n52 = te[ 9 ], n53 = te[ 14 ], n54 = te[ 19 ], n55 = te[ 24 ];

		//TODO: make this more efficient
		//( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )

		return (
			  n51 * new Matrix4().set(n12, n22, n32, n42, n13, n23, n33, n43, n14, n24, n34, n44, n15, n25, n35, n45).determinant()
			- n52 * new Matrix4().set(n11, n21, n31, n41, n13, n23, n33, n43, n14, n24, n34, n44, n15, n25, n35, n45).determinant()
			+ n53 * new Matrix4().set(n11, n21, n31, n41, n12, n22, n32, n42, n14, n24, n34, n44, n15, n25, n35, n45).determinant()
			- n54 * new Matrix4().set(n11, n21, n31, n41, n12, n22, n32, n42, n13, n23, n33, n43, n15, n25, n35, n45).determinant()
			+ n55 * new Matrix4().set(n11, n21, n31, n41, n12, n22, n32, n42, n13, n23, n33, n43, n14, n24, n34, n44).determinant()
		);

	},

	transpose: function () {
		console.error( 'THREE.Matrix5: .transpose() is not done.' );

		var te = this.elements;
		var tmp;

		tmp = te[ 1 ]; te[ 1 ] = te[ 4 ]; te[ 4 ] = tmp;
		tmp = te[ 2 ]; te[ 2 ] = te[ 8 ]; te[ 8 ] = tmp;
		tmp = te[ 6 ]; te[ 6 ] = te[ 9 ]; te[ 9 ] = tmp;

		tmp = te[ 3 ]; te[ 3 ] = te[ 12 ]; te[ 12 ] = tmp;
		tmp = te[ 7 ]; te[ 7 ] = te[ 13 ]; te[ 13 ] = tmp;
		tmp = te[ 11 ]; te[ 11 ] = te[ 14 ]; te[ 14 ] = tmp;

		
		return this;

	},

	setPosition: function ( x, y, z, w ) {

		var te = this.elements;

		if ( x.isVector4 ) {

			te[ 20 ] = x.x;
			te[ 21 ] = x.y;
			te[ 22 ] = x.z;
			te[ 23 ] = x.w;

		} else {

			te[ 20 ] = x;
			te[ 21 ] = y;
			te[ 22 ] = z;
			te[ 23 ] = w;

		}

		
		return this;

	},

	getInverse: function ( m, throwOnDegenerate ) {
		// based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
		var te = this.elements,
			me = m.elements;

		var det = this.determinant();

		if ( det === 0 ) {

			var msg = "THREE.Matrix5: .getInverse() can't invert matrix, determinant is 0";

			if ( throwOnDegenerate === true ) {

				throw new Error( msg );

			} else {

				console.warn( msg );

			}

			return this.identity();

		}

		var detInv = 1 / det;


			// transpose
		var	t11 = me[ 0 ],  t12 = me[ 1 ],  t13 = me[ 2 ],  t14 = me[ 3 ],  t15 = me[ 4 ],
			t21 = me[ 5 ],  t22 = me[ 6 ],  t23 = me[ 7 ],  t24 = me[ 8 ],  t25 = me[ 9 ],
			t31 = me[ 10 ], t32 = me[ 11 ], t33 = me[ 12 ], t34 = me[ 13 ], t35 = me[ 14 ],
			t41 = me[ 15 ], t42 = me[ 16 ], t43 = me[ 17 ], t44 = me[ 18 ], t45 = me[ 19 ],
			t51 = me[ 20 ], t52 = me[ 21 ], t53 = me[ 22 ], t54 = me[ 23 ], t55 = me[ 24 ],

			// transpose minors
			tm11 = new Matrix4().set(t22, t32, t42, t52, t23, t33, t43, t53, t24, t34, t44, t54, t25, t35, t45, t55).determinant(),
			tm12 = new Matrix4().set(t21, t31, t41, t51, t23, t33, t43, t53, t24, t34, t44, t54, t25, t35, t45, t55).determinant(),
			tm13 = new Matrix4().set(t21, t31, t41, t51, t22, t32, t42, t52, t24, t34, t44, t54, t25, t35, t45, t55).determinant(),
			tm14 = new Matrix4().set(t21, t31, t41, t51, t22, t32, t42, t52, t23, t33, t43, t53, t25, t35, t45, t55).determinant(),
			tm15 = new Matrix4().set(t21, t31, t41, t51, t22, t32, t42, t52, t23, t33, t43, t53, t24, t34, t44, t54).determinant(),

			tm21 = new Matrix4().set(t12, t32, t42, t52, t13, t33, t43, t53, t14, t34, t44, t54, t15, t35, t45, t55).determinant(),
			tm22 = new Matrix4().set(t11, t31, t41, t51, t13, t33, t43, t53, t14, t34, t44, t54, t15, t35, t45, t55).determinant(),
			tm23 = new Matrix4().set(t11, t31, t41, t51, t12, t32, t42, t52, t14, t34, t44, t54, t15, t35, t45, t55).determinant(),
			tm24 = new Matrix4().set(t11, t31, t41, t51, t12, t32, t42, t52, t13, t33, t43, t53, t15, t35, t45, t55).determinant(),
			tm25 = new Matrix4().set(t11, t31, t41, t51, t12, t32, t42, t52, t13, t33, t43, t53, t14, t34, t44, t54).determinant(),

			tm31 = new Matrix4().set(t12, t22, t42, t52, t13, t23, t43, t53, t14, t24, t44, t54, t15, t25, t45, t55).determinant(),
			tm32 = new Matrix4().set(t11, t21, t41, t51, t13, t23, t43, t53, t14, t24, t44, t54, t15, t25, t45, t55).determinant(),
			tm33 = new Matrix4().set(t11, t21, t41, t51, t12, t22, t42, t52, t14, t24, t44, t54, t15, t25, t45, t55).determinant(),
			tm34 = new Matrix4().set(t11, t21, t41, t51, t12, t22, t42, t52, t13, t23, t43, t53, t15, t25, t45, t55).determinant(),
			tm35 = new Matrix4().set(t11, t21, t41, t51, t12, t22, t42, t52, t13, t23, t43, t53, t14, t24, t44, t54).determinant(),

			tm41 = new Matrix4().set(t12, t22, t32, t52, t13, t23, t33, t53, t14, t24, t34, t54, t15, t25, t35, t55).determinant(),
			tm42 = new Matrix4().set(t11, t21, t31, t51, t13, t23, t33, t53, t14, t24, t34, t54, t15, t25, t35, t55).determinant(),
			tm43 = new Matrix4().set(t11, t21, t31, t51, t12, t22, t32, t52, t14, t24, t34, t54, t15, t25, t35, t55).determinant(),
			tm44 = new Matrix4().set(t11, t21, t31, t51, t12, t22, t32, t52, t13, t23, t33, t53, t15, t25, t35, t55).determinant(),
			tm45 = new Matrix4().set(t11, t21, t31, t51, t12, t22, t32, t52, t13, t23, t33, t53, t14, t24, t34, t54).determinant(),

			tm51 = new Matrix4().set(t12, t22, t32, t42, t13, t23, t33, t43, t14, t24, t34, t44, t15, t25, t35, t45).determinant(),
			tm52 = new Matrix4().set(t11, t21, t31, t41, t13, t23, t33, t43, t14, t24, t34, t44, t15, t25, t35, t45).determinant(),
			tm53 = new Matrix4().set(t11, t21, t31, t41, t12, t22, t32, t42, t14, t24, t34, t44, t15, t25, t35, t45).determinant(),
			tm54 = new Matrix4().set(t11, t21, t31, t41, t12, t22, t32, t42, t13, t23, t33, t43, t15, t25, t35, t45).determinant(),
			tm55 = new Matrix4().set(t11, t21, t31, t41, t12, t22, t32, t42, t13, t23, t33, t43, t14, t24, t34, t44).determinant();

		var transpose_minors = new Matrix5().set( tm11, -tm12,  tm13, -tm14,  tm15,
										-tm21,  tm22, -tm23,  tm24, -tm25,
 										 tm31, -tm32,  tm33, -tm34,  tm35,
										-tm41,  tm42, -tm43,  tm44, -tm45,
										 tm51, -tm52,  tm53, -tm54,  tm55,)
		
		for (var i=0; i<transpose_minors.elements.length; i++) {
			te[i] = transpose_minors.elements[i] * detInv;
		}

		return this;

	},

	scale: function ( v ) {

		var te = this.elements;
		var x = v.x, y = v.y, z = v.z, w = v.w;

		te[ 0 ] *= x; te[ 5 ] *= y; te[ 10 ] *= z; te[ 15 ] *= w;
		te[ 1 ] *= x; te[ 6 ] *= y; te[ 11 ] *= z; te[ 16 ] *= w;
		te[ 2 ] *= x; te[ 7 ] *= y; te[ 12 ] *= z; te[ 17 ] *= w;
		te[ 3 ] *= x; te[ 8 ] *= y; te[ 13 ] *= z; te[ 18 ] *= w;
		te[ 4 ] *= x; te[ 9 ] *= y; te[ 14 ] *= z; te[ 19 ] *= w;

		return this;

	},

	getMaxScaleOnAxis: function () {

		var te = this.elements;

		var scaleXSq = te[ 0 ]  * te[ 0 ]  + te[ 1 ]  * te[ 1 ]  + te[ 2 ]  * te[ 2 ]  + te[ 3 ]  * te[ 3 ];
		var scaleYSq = te[ 5 ]  * te[ 5 ]  + te[ 6 ]  * te[ 6 ]  + te[ 7 ]  * te[ 7 ]  + te[ 8 ]  * te[ 8 ];
		var scaleZSq = te[ 10 ] * te[ 10 ] + te[ 11 ] * te[ 11 ] + te[ 12 ] * te[ 12 ] + te[ 13 ] * te[ 13 ];
		var scaleWSq = te[ 15 ] * te[ 15 ] + te[ 16 ] * te[ 16 ] + te[ 17 ] * te[ 17 ] + te[ 18 ] * te[ 18 ];

		return Math.sqrt( Math.max( scaleXSq, scaleYSq, scaleZSq, scaleWSq ) );

	},

	makeTranslation: function ( x, y, z ) {
		console.error( 'THREE.Matrix5: .makeTranslation() is not done.' );

		this.set(

			1, 0, 0, x,
			0, 1, 0, y,
			0, 0, 1, z,
			0, 0, 0, 1

		);

		
		return this;

	},

	makeRotationX: function ( theta ) {
		console.error( 'THREE.Matrix5: .makeRotationX() is not done.' );

		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			1, 0, 0, 0,
			0, c, - s, 0,
			0, s, c, 0,
			0, 0, 0, 1

		);

		
		return this;

	},

	makeRotationY: function ( theta ) {
		console.error( 'THREE.Matrix5: .makeRotationY() is not done.' );

		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			 c, 0, s, 0,
			 0, 1, 0, 0,
			- s, 0, c, 0,
			 0, 0, 0, 1

		);

		
		return this;

	},

	makeRotationZ: function ( theta ) {
		console.error( 'THREE.Matrix5: .makeRotationZ() is not done.' );

		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			c, - s, 0, 0,
			s, c, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1

		);

		
		return this;

	},

	makeRotationAxis: function ( axis, angle ) {
		console.error( 'THREE.Matrix5: .makeRotationAxis() is not done.' );

		// Based on http://www.gamedev.net/reference/articles/article1199.asp

		var c = Math.cos( angle );
		var s = Math.sin( angle );
		var t = 1 - c;
		var x = axis.x, y = axis.y, z = axis.z;
		var tx = t * x, ty = t * y;

		this.set(

			tx * x + c, tx * y - s * z, tx * z + s * y, 0,
			tx * y + s * z, ty * y + c, ty * z - s * x, 0,
			tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
			0, 0, 0, 1

		);

		
		return this;

	},

	makeScale: function ( x, y, z ) {
		console.error( 'THREE.Matrix5: .makeScale() is not done.' );

		this.set(

			x, 0, 0, 0,
			0, y, 0, 0,
			0, 0, z, 0,
			0, 0, 0, 1

		);

		
		return this;

	},

	makeShear: function ( x, y, z ) {
		console.error( 'THREE.Matrix5: .makeShear() is not done.' );

		this.set(

			1, y, z, 0,
			x, 1, z, 0,
			x, y, 1, 0,
			0, 0, 0, 1

		);

		
		return this;

	},

	compose: function ( position, quaternion, scale ) {
		//console.warn( 'THREE.Matrix5: .compose() is partially unfinished.' );

		var te = this.elements;

		var x = quaternion._x, y = quaternion._y, z = quaternion._z, w = quaternion._w;
		var x2 = x + x,	y2 = y + y, z2 = z + z;
		var xx = x * x2, xy = x * y2, xz = x * z2;
		var yy = y * y2, yz = y * z2, zz = z * z2;
		var wx = w * x2, wy = w * y2, wz = w * z2;

		var sx = scale.x, sy = scale.y, sz = scale.z;

		te[ 0 ] = ( 1 - ( yy + zz ) ) * sx;
		te[ 1 ] = ( xy + wz ) * sx;
		te[ 2 ] = ( xz - wy ) * sx;
		te[ 3 ] = 0;
		te[ 4 ] = 0;

		te[ 5 ] = ( xy - wz ) * sy;
		te[ 6 ] = ( 1 - ( xx + zz ) ) * sy;
		te[ 7 ] = ( yz + wx ) * sy;
		te[ 8 ] = 0;
		te[ 9 ] = 0;

		te[ 10 ] = ( xz + wy ) * sz;
		te[ 11 ] = ( yz - wx ) * sz;
		te[ 12 ] = ( 1 - ( xx + yy ) ) * sz;
		te[ 13 ] = 0;
		te[ 14 ] = 0;

		te[ 15 ] = 0;
		te[ 16 ] = 0;
		te[ 17 ] = 0;
		te[ 18 ] = 1;
		te[ 19 ] = 0;

		te[ 20 ] = position.x;
		te[ 21 ] = position.y;
		te[ 22 ] = position.z;
		te[ 23 ] = position.w;
		te[ 24 ] = 1;

		
		return this;

	},

	decompose: function ( position, quaternion, scale ) {
		console.error( 'THREE.Matrix5: .decompose() is not done.' );

		var te = this.elements;

		var sx = _v1.set( te[ 0 ], te[ 1 ], te[ 2 ] ).length();
		var sy = _v1.set( te[ 4 ], te[ 5 ], te[ 6 ] ).length();
		var sz = _v1.set( te[ 8 ], te[ 9 ], te[ 10 ] ).length();

		// if determine is negative, we need to invert one scale
		var det = this.determinant();
		if ( det < 0 ) sx = - sx;

		position.x = te[ 12 ];
		position.y = te[ 13 ];
		position.z = te[ 14 ];

		// scale the rotation part
		_m1.copy( this );

		var invSX = 1 / sx;
		var invSY = 1 / sy;
		var invSZ = 1 / sz;

		_m1.elements[ 0 ] *= invSX;
		_m1.elements[ 1 ] *= invSX;
		_m1.elements[ 2 ] *= invSX;

		_m1.elements[ 4 ] *= invSY;
		_m1.elements[ 5 ] *= invSY;
		_m1.elements[ 6 ] *= invSY;

		_m1.elements[ 8 ] *= invSZ;
		_m1.elements[ 9 ] *= invSZ;
		_m1.elements[ 10 ] *= invSZ;

		quaternion.setFromRotationMatrix( _m1 );

		scale.x = sx;
		scale.y = sy;
		scale.z = sz;

		
		return this;

	},

	makePerspective: function ( left, right, top, bottom, near, far, nearw, farw ) {
		console.error( 'THREE.Matrix5: .makePerspective() is not done.' );

		if ( far === undefined ) {

			console.warn( 'THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.' );

		}

		var te = this.elements;
		var x = 2 * nearw / ( right - left );
		var y = 2 * nearw / ( top - bottom );
		var z = 2 * nearw / ( far - near );

		te[ 0 ] = 1;	te[ 5 ] = 0;	te[ 10 ] = 0;	te[ 15 ] = 0;	te[ 20 ] = 0;
		te[ 1 ] = 0;	te[ 6 ] = 1;	te[ 11 ] = 0;	te[ 16 ] = 0;	te[ 21 ] = 0;
		te[ 2 ] = 0;	te[ 7 ] = 0;	te[ 12 ] = 1;	te[ 17 ] = 0;	te[ 22 ] = 0;
		te[ 3 ] = 0;	te[ 8 ] = 0;	te[ 13 ] = 0;	te[ 18 ] = 1;	te[ 23 ] = 0;
		te[ 4 ] = 0;	te[ 9 ] = 0;	te[ 14 ] = 0;	te[ 19 ] = 0;	te[ 24 ] = 1;

		
		return this;

	},

	makeOrthographic: function ( left, right, top, bottom, near, far ) {
		console.error( 'THREE.Matrix5: .makeOrthographic() is not done.' );

		var te = this.elements;
		var w = 1.0 / ( right - left );
		var h = 1.0 / ( top - bottom );
		var p = 1.0 / ( far - near );

		var x = ( right + left ) * w;
		var y = ( top + bottom ) * h;
		var z = ( far + near ) * p;

		te[ 0 ] = 2 * w;	te[ 4 ] = 0;	te[ 8 ] = 0;	te[ 12 ] = - x;
		te[ 1 ] = 0;	te[ 5 ] = 2 * h;	te[ 9 ] = 0;	te[ 13 ] = - y;
		te[ 2 ] = 0;	te[ 6 ] = 0;	te[ 10 ] = - 2 * p;	te[ 14 ] = - z;
		te[ 3 ] = 0;	te[ 7 ] = 0;	te[ 11 ] = 0;	te[ 15 ] = 1;

		

		return this;

	},

	equals: function ( matrix ) {
		console.error( 'THREE.Matrix5: .equals() is not done.' );

		var te = this.elements;
		var me = matrix.elements;

		for ( var i = 0; i < 16; i ++ ) {

			if ( te[ i ] !== me[ i ] ) return false;

		}

		

		return true;

	},

	fromArray: function ( array, offset ) {
		console.error( 'THREE.Matrix5: .fromArray() is not done.' );

		if ( offset === undefined ) offset = 0;

		for ( var i = 0; i < 16; i ++ ) {

			this.elements[ i ] = array[ i + offset ];

		}

		

		return this;

	},

	toArray: function ( array, offset ) {
		console.error( 'THREE.Matrix5: .toArray() is not done.' );

		if ( array === undefined ) array = [];
		if ( offset === undefined ) offset = 0;

		var te = this.elements;

		array[ offset ] = te[ 0 ];
		array[ offset + 1 ] = te[ 1 ];
		array[ offset + 2 ] = te[ 2 ];
		array[ offset + 3 ] = te[ 3 ];

		array[ offset + 4 ] = te[ 4 ];
		array[ offset + 5 ] = te[ 5 ];
		array[ offset + 6 ] = te[ 6 ];
		array[ offset + 7 ] = te[ 7 ];

		array[ offset + 8 ] = te[ 8 ];
		array[ offset + 9 ] = te[ 9 ];
		array[ offset + 10 ] = te[ 10 ];
		array[ offset + 11 ] = te[ 11 ];

		array[ offset + 12 ] = te[ 12 ];
		array[ offset + 13 ] = te[ 13 ];
		array[ offset + 14 ] = te[ 14 ];
		array[ offset + 15 ] = te[ 15 ];

		return array;

	},

	updateProperties: function () {
		var te = this.elements;

		this.m11 = te[ 0 ];  this.m21 = te[ 1 ];  this.m31 = te[ 2 ];  this.m41 = te[ 3 ];  this.m51 = te[ 4 ];
		this.m12 = te[ 5 ];  this.m22 = te[ 6 ];  this.m32 = te[ 7 ];  this.m42 = te[ 8 ];  this.m52 = te[ 9 ];
		this.m13 = te[ 10 ]; this.m23 = te[ 11 ]; this.m33 = te[ 12 ]; this.m43 = te[ 13 ]; this.m53 = te[ 14 ];
		this.m14 = te[ 15 ]; this.m24 = te[ 16 ]; this.m34 = te[ 17 ]; this.m44 = te[ 18 ]; this.m54 = te[ 19 ];
		this.m15 = te[ 20 ]; this.m25 = te[ 21 ]; this.m35 = te[ 22 ]; this.m45 = te[ 23 ]; this.m55 = te[ 24 ];
	}

} );


export { Matrix5 };
