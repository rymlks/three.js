import { Color } from '../math/Color.js';
import { Basis2 } from '../math/Basis2.js';

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

function Face4( a, b, c, basis, color, materialIndex ) {

	this.a = a;
	this.b = b;
	this.c = c;

	this.basis = ( basis && basis.isBasis2 ) ? basis : new Basis2();

	this.vertexBases = Array.isArray( basis ) ? basis : [];

	this.color = ( color && color.isColor ) ? color : new Color();
	this.vertexColors = Array.isArray( color ) ? color : [];

	this.materialIndex = materialIndex !== undefined ? materialIndex : 0;

}

Object.assign( Face4.prototype, {

	clone: function () {

		return new this.constructor().copy( this );

	},

	copy: function ( source ) {

		this.a = source.a;
		this.b = source.b;
		this.c = source.c;

		this.basis.copy( source.basis );
		this.color.copy( source.color );

		this.materialIndex = source.materialIndex;

		for ( var i = 0, il = source.vertexBases.length; i < il; i ++ ) {

			this.vertexBases[ i ] = source.vertexBases[ i ].clone();

		}
		for ( var i = 0, il = source.vertexColors.length; i < il; i ++ ) {

			this.vertexColors[ i ] = source.vertexColors[ i ].clone();

		}

		return this;

	}

} );


export { Face4 };
