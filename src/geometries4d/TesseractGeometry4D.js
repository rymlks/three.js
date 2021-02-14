/**
 * @author mrdoob / http://mrdoob.com/
 * @author Mugen87 / https://github.com/Mugen87
 */

import { Geometry4D } from '../core/Geometry4D.js';
import { BufferGeometry4D } from '../core/BufferGeometry4D.js';
import { Float32BufferAttribute } from '../core/BufferAttribute.js';
import { Vector4 } from '../math/Vector4_.js';

// BoxGeometry

class TesseractGeometry4D extends Geometry4D {

	constructor( width, height, depth, widthSegments, heightSegments, depthSegments ) {

		super();

		this.type = 'TesseractGeometry4D';

		this.parameters = {
			width: width,
			height: height,
			depth: depth,
			widthSegments: widthSegments,
			heightSegments: heightSegments,
			depthSegments: depthSegments
		};

		this.fromBufferGeometry( new TesseractBufferGeometry4D( width, height, depth, widthSegments, heightSegments, depthSegments ) );
		this.mergeVertices();

	}

}

// BoxBufferGeometry

class TesseractBufferGeometry4D extends BufferGeometry4D {

	constructor( width, height, depth, spiss, widthSegments, heightSegments, depthSegments, spissSegments ) {

		super();

		this.type = 'TesseractBufferGeometry4D';

		this.parameters = {
			width: width,
			height: height,
			depth: depth,
			spiss: spiss,
			widthSegments: widthSegments,
			heightSegments: heightSegments,
			depthSegments: depthSegments,
			spissSegments: spissSegments
		};

		var scope = this;

		width = width || 1;
		height = height || 1;
		depth = depth || 1;
		spiss = spiss || 1;

		// segments

		widthSegments = Math.floor( widthSegments ) || 1;
		heightSegments = Math.floor( heightSegments ) || 1;
		depthSegments = Math.floor( depthSegments ) || 1;
		spissSegments = Math.floor( spissSegments ) || 1;

		// buffers

		var indices = [];
		var vertices = [];
		var basesX = [];
		var basesY = [];
		var uvs = [];

		// helper variables

		var numberOfVertices = 0;
		var groupStart = 0;

		// build each side of the box geometry

		buildPlane( 'w', 'z', 'y', 'x', - 1, - 1, spiss, depth, height, width, spissSegments, depthSegments, 0 ); // pxpy
		buildPlane( 'w', 'z', 'y', 'x', 1, - 1, spiss, depth, height, - width, spissSegments, depthSegments, 1 ); // nxpy
		buildPlane( 'w', 'z', 'y', 'x', - 1, 1, spiss, depth, - height, width, spissSegments, depthSegments, 2 ); // pxny
		buildPlane( 'w', 'z', 'y', 'x', 1, 1, spiss, depth, - height, - width, spissSegments, depthSegments, 3 ); // nxny

		buildPlane( 'w', 'y', 'z', 'x', - 1, - 1, spiss, height, depth, width, spissSegments, heightSegments, 4 ); // pxpz
		buildPlane( 'w', 'y', 'z', 'x', 1, - 1, spiss, height, depth, - width, spissSegments, heightSegments, 5 ); // nxpz
		buildPlane( 'w', 'y', 'z', 'x', - 1, 1, spiss, height, - depth, width, spissSegments, heightSegments, 6 ); // pxnz
		buildPlane( 'w', 'y', 'z', 'x', 1, 1, spiss, height, - depth, - width, spissSegments, heightSegments, 7 ); // nxnz

		buildPlane( 'y', 'z', 'w', 'x', - 1, - 1, height, depth, spiss, width, heightSegments, depthSegments, 8  ); // pxpz
		buildPlane( 'y', 'z', 'w', 'x', 1, - 1, height, depth, spiss, - width, heightSegments, depthSegments, 9  ); // nxpz
		buildPlane( 'y', 'z', 'w', 'x', - 1, 1, height, depth, - spiss, width, heightSegments, depthSegments, 10 ); // pxnz
		buildPlane( 'y', 'z', 'w', 'x', 1, 1, height, depth, - spiss, - width, heightSegments, depthSegments, 11 ); // nxnz

		buildPlane( 'y', 'x', 'w', 'z', - 1, - 1, height, width, spiss, depth, heightSegments, widthSegments, 12 ); // pzpw
		buildPlane( 'y', 'x', 'w', 'z', 1, - 1, height, width, spiss, - depth, heightSegments, widthSegments, 13 ); // nzpw
		buildPlane( 'y', 'x', 'w', 'z', - 1, 1, height, width, - spiss, depth, heightSegments, widthSegments, 14 ); // pznw
		buildPlane( 'y', 'x', 'w', 'z', 1, 1, height, width, - spiss, - depth, heightSegments, widthSegments, 15 ); // nznw

		buildPlane( 'w', 'x', 'y', 'z', - 1, - 1, spiss, width, height, depth, spissSegments, widthSegments, 16 ); // pzpy
		buildPlane( 'w', 'x', 'y', 'z', 1, - 1, spiss, width, height, - depth, spissSegments, widthSegments, 17 ); // nzpy
		buildPlane( 'w', 'x', 'y', 'z', - 1, 1, spiss, width, - height, depth, spissSegments, widthSegments, 18 ); // pzny
		buildPlane( 'w', 'x', 'y', 'z', 1, 1, spiss, width, - height, - depth, spissSegments, widthSegments, 19 ); // nzny

		buildPlane( 'z', 'x', 'y', 'w', - 1, - 1, depth, width, height, spiss, depthSegments, widthSegments, 20 ); // pzpy
		buildPlane( 'z', 'x', 'y', 'w', 1, - 1, depth, width, height, - spiss, depthSegments, widthSegments, 21 ); // nzpy
		buildPlane( 'z', 'x', 'y', 'w', - 1, 1, depth, width, - height, spiss, depthSegments, widthSegments, 22 ); // pzny
		buildPlane( 'z', 'x', 'y', 'w', 1, 1, depth, width, - height, - spiss, depthSegments, widthSegments, 23 ); // nzny

		// build geometry

		this.setIndex( indices );
		this.setAttribute( 'position', new Float32BufferAttribute( vertices, 4 ) );
		this.setAttribute( 'basisX', new Float32BufferAttribute( basesX, 4 ) );
		this.setAttribute( 'basisY', new Float32BufferAttribute( basesY, 4 ) );
		this.setAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

		function buildPlane( u, v, w, t, udir, vdir, width, height, depth, spiss, gridX, gridY, materialIndex ) {

			var segmentWidth = width / gridX;
			var segmentHeight = height / gridY;

			var widthHalf = width / 2;
			var heightHalf = height / 2;
			var depthHalf = depth / 2;
			var spissHalf = spiss / 2;

			var gridX1 = gridX + 1;
			var gridY1 = gridY + 1;

			var vertexCounter = 0;
			var groupCount = 0;

			var ix, iy;

			var vector = new Vector4();

			// generate vertices, normals and uvs

			for ( iy = 0; iy < gridY1; iy ++ ) {

				var y = iy * segmentHeight - heightHalf;

				for ( ix = 0; ix < gridX1; ix ++ ) {

					var x = ix * segmentWidth - widthHalf;

					// set values to correct vector component

					vector[ u ] = x * udir;
					vector[ v ] = y * vdir;
					vector[ w ] = depthHalf;
					vector[ t ] = spissHalf;

					// now apply vector to vertex buffer

					vertices.push( vector.x, vector.y, vector.z, vector.w );

					// set values to correct vector component
					vector[ u ] = 0;
					vector[ v ] = 0;
					vector[ w ] = depth > 0 ? 1 : - 1;
					vector[ t ] = 0;
					// now apply vector to basis
					basesX.push( vector.x, vector.y, vector.z, vector.w );
					vector[ u ] = 0;
					vector[ v ] = 0;
					vector[ w ] = 0;
					vector[ t ] = spiss < 0 ? 1 : - 1;
					basesY.push( vector.x, vector.y, vector.z, vector.w );
					// uvs

					uvs.push( ix / gridX );
					uvs.push( 1 - ( iy / gridY ) );

					// counters

					vertexCounter += 1;

				}

			}

			// indices

			// 1. you need three indices to draw a single face
			// 2. a single segment consists of two faces
			// 3. so we need to generate six (2*3) indices per segment

			for ( iy = 0; iy < gridY; iy ++ ) {

				for ( ix = 0; ix < gridX; ix ++ ) {

					var a = numberOfVertices + ix + gridX1 * iy;
					var b = numberOfVertices + ix + gridX1 * ( iy + 1 );
					var c = numberOfVertices + ( ix + 1 ) + gridX1 * ( iy + 1 );
					var d = numberOfVertices + ( ix + 1 ) + gridX1 * iy;

					// faces

					indices.push( a, b, d );
					indices.push( b, c, d );

					// increase counter

					groupCount += 6;

				}

			}

			// add a group to the geometry. this will ensure multi material support

			scope.addGroup( groupStart, groupCount, materialIndex );

			// calculate new start value for groups

			groupStart += groupCount;

			// update total number of vertices

			numberOfVertices += vertexCounter;

		}

	}

}

export { TesseractGeometry4D, TesseractBufferGeometry4D };
