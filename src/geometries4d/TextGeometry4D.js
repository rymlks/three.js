/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * @author alteredq / http://alteredqualia.com/
 *
 * Text = 3D Text
 *
 * parameters = {
 *  font: <THREE.Font>, // font
 *
 *  size: <float>, // size of the text
 *  height: <float>, // thickness to extrude text
 *  curveSegments: <int>, // number of points on the curves
 *
 *  bevelEnabled: <bool>, // turn on bevel
 *  bevelThickness: <float>, // how deep into text bevel goes
 *  bevelSize: <float>, // how far from text outline (including bevelOffset) is bevel
 *  bevelOffset: <float> // how far from text outline does bevel start
 * }
 */

 import { Geometry4D } from '../core/Geometry4D.js';
 import { ExtrudeBufferGeometry4D } from './ExtrudeGeometry4D.js';
 
 // TextGeometry4D
 
 function TextGeometry4D( text, parameters ) {

    Geometry4D.call( this );

    this.type = 'TextGeometry4D';

    this.parameters = {
        text: text,
        parameters: parameters
    };

    this.fromBufferGeometry( new TextBufferGeometry4D( text, parameters ) );
    this.mergeVertices();
 
 }
 
 TextGeometry4D.prototype = Object.create( Geometry4D.prototype );
 TextGeometry4D.prototype.constructor = TextGeometry4D;
 
 // TextBufferGeometry4D
 
 function TextBufferGeometry4D( text, parameters ) {
 
     parameters = parameters || {};
 
     var font = parameters.font;
 
     if ( ! ( font && font.isFont ) ) {
 
         console.error( 'THREE.TextGeometry4D: font parameter is not an instance of THREE.Font.' );
         return new Geometry4D();
 
     }
 
     var shapes = font.generateShapes( text, parameters.size );
 
     // translate parameters to ExtrudeGeometry API
 
     parameters.depth = parameters.height !== undefined ? parameters.height : 50;
 
     // defaults
 
     if ( parameters.bevelThickness === undefined ) parameters.bevelThickness = 10;
     if ( parameters.bevelSize === undefined ) parameters.bevelSize = 8;
     if ( parameters.bevelEnabled === undefined ) parameters.bevelEnabled = false;
 
     ExtrudeBufferGeometry4D.call( this, shapes, parameters );
 
     this.type = 'TextBufferGeometry4D';
 
 }
 
 TextBufferGeometry4D.prototype = Object.create( ExtrudeBufferGeometry4D.prototype );
 TextBufferGeometry4D.prototype.constructor = TextBufferGeometry4D;
 
 
 export { TextGeometry4D, TextBufferGeometry4D };
 