import { Light4D } from './Light4D.js';

/**
 * @author mrdoob / http://mrdoob.com/
 */

function AmbientLight4D( color, intensity ) {

	Light4D.call( this, color, intensity );

	this.type = 'AmbientLight4D';

	this.castShadow = undefined;

}

AmbientLight4D.prototype = Object.assign( Object.create( Light4D.prototype ), {

	constructor: AmbientLight4D,

	isAmbientLight: true

} );


export { AmbientLight4D };
