import { Light4D } from './Light4D.js';
import { DirectionalLightShadow } from './DirectionalLightShadow.js';
import { Object4D } from '../core/Object4D.js';

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

function DirectionalLight4D( color, intensity ) {

	Light4D.call( this, color, intensity );

	this.type = 'DirectionalLight4D';

	this.position.copy( Object4D.DefaultUp );
	this.updateMatrix();

	this.target = new Object4D();

	this.shadow = new DirectionalLightShadow();

}

DirectionalLight4D.prototype = Object.assign( Object.create( Light4D.prototype ), {

	constructor: DirectionalLight4D,

	isDirectionalLight: true,

	copy: function ( source ) {

		Light.prototype.copy.call( this, source );

		this.target = source.target.clone();

		this.shadow = source.shadow.clone();

		return this;

	}

} );


export { DirectionalLight4D };
