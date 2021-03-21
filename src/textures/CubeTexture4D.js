/**
 * @author mrdoob / http://mrdoob.com/
 */

import { Texture } from './Texture.js';
import { CubeReflectionMapping, RGBFormat } from '../constants.js';

function CubeTexture4D( images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding ) {

	images = images !== undefined ? images : [];
	mapping = mapping !== undefined ? mapping : CubeReflectionMapping;
	format = format !== undefined ? format : RGBFormat;

	Texture.call( this, images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding );

	this.flipY = false;

}

CubeTexture4D.prototype = Object.create( Texture.prototype );
CubeTexture4D.prototype.constructor = CubeTexture4D;

CubeTexture4D.prototype.isCubeTexture = true;

Object.defineProperty( CubeTexture4D.prototype, 'images', {

	get: function () {

		return this.image;

	},

	set: function ( value ) {

		this.image = value;

	}

} );


export { CubeTexture4D };
