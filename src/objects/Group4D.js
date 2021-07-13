import { Object4D } from '../core/Object4D.js';

/**
 * @author mrdoob / http://mrdoob.com/
 */

function Group4D() {

	Object4D.call( this );

	this.type = 'Group4D';

}

Group4D.prototype = Object.assign( Object.create( Object4D.prototype ), {

	constructor: Group4D,

	isGroup: true

} );


export { Group4D };
