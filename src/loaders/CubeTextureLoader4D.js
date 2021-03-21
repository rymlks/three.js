/**
 * @author mrdoob / http://mrdoob.com/
 */

import { ImageLoader } from './ImageLoader.js';
import { CubeTexture4D } from '../textures/CubeTexture4D.js';
import { Loader } from './Loader.js';


function CubeTextureLoader4D( manager ) {

	Loader.call( this, manager );

}

CubeTextureLoader4D.prototype = Object.assign( Object.create( Loader.prototype ), {

	constructor: CubeTextureLoader4D,

	load: function ( urls, onLoad, onProgress, onError ) {

		var texture = new CubeTexture4D();

		var loader = new ImageLoader( this.manager );
		loader.setCrossOrigin( this.crossOrigin );
		loader.setPath( this.path );

		var loaded = 0;

		function loadTexture( i ) {

			loader.load( urls[ i ], function ( image ) {

				texture.images[ i ] = image;

				loaded ++;

				if ( loaded === 6 ) {

					texture.needsUpdate = true;

					if ( onLoad ) onLoad( texture );

				}

			}, undefined, onError );

		}

		for ( var i = 0; i < urls.length; ++ i ) {

			loadTexture( i );

		}

		return texture;

	}

} );


export { CubeTextureLoader4D };
