import { Vector4 } from '../math/Vector4.js';
import { Basis2 } from '../math/Basis2.js';
import { Basis3 } from '../math/Basis3.js';

function Crust4( vertices, ...faces ) {
    this.vertices = vertices;
    this.faces = faces;
    this.degenerateBasis = undefined;
}

Object.assign( Crust4.prototype, {

    isDegenerate: function () {
        if (this.faces.length === 0)  return true;

        if (this.degenerateBasis === undefined) {
            var basisX = this.vertices[this.faces[0].a].clone().sub(this.vertices[this.faces[0].b]);
            var basisY = this.vertices[this.faces[0].a].clone().sub(this.vertices[this.faces[0].c]);
            this.degenerateBasis = new Basis2().gramSchmidt(basisX, basisY);
            this.degenerateBasis.setProjectionMatrix();
        }

        var offset = this.vertices[this.faces[0].a];

        for (var face of this.faces.slice(1, this.faces.length)) {
            var a = this.vertices[face.a].clone().sub(offset);
            var b = this.vertices[face.b].clone().sub(offset);
            var c = this.vertices[face.c].clone().sub(offset);

            if (this.degenerateBasis.getOrthogonalComponent(a).lengthSq() > 0) {
                return false;
            }

            if (this.degenerateBasis.getOrthogonalComponent(b).lengthSq() > 0) {
                return false;
            }

            if (this.degenerateBasis.getOrthogonalComponent(c).lengthSq() > 0) {
                return false;
            }
        }

        return true;
    },

    isConnected: function ( other ) {
        for (var face of this.faces) {

            var touchA = this.vertices[face.a].equals(this.vertices[other.a]) || this.vertices[face.a].equals(this.vertices[other.b]) || this.vertices[face.a].equals(this.vertices[other.c]);
            var touchB = this.vertices[face.b].equals(this.vertices[other.a]) || this.vertices[face.b].equals(this.vertices[other.b]) || this.vertices[face.b].equals(this.vertices[other.c]);
            var touchC = this.vertices[face.c].equals(this.vertices[other.a]) || this.vertices[face.c].equals(this.vertices[other.b]) || this.vertices[face.c].equals(this.vertices[other.c]);

            var connected = touchA || touchB || touchC;

            if (connected) {
                return true;
            }
        }
        return false;
    },

    addFace: function ( face ) {
        this.faces.push(face);
    },

    computeNormals: function () {
        // Find normals for face1, given face2
        for (var face1 of this.faces) {

            if (face1.basis !== undefined && face1.basis.x.lengthSq() > 0 && face1.basis.y.lengthSq() > 0) {
                return;
            }

            var basisX = this.vertices[face1.a].clone().sub(this.vertices[face1.b]);
            var basisY = this.vertices[face1.a].clone().sub(this.vertices[face1.c]);

            var faceBasis = new Basis2().gramSchmidt(basisX, basisY);
            faceBasis.setProjectionMatrix();
            
            var offset = this.vertices[face1.a];
            for (var face2 of this.faces) {
                if (face1 == face2)  continue;

                // Find non-coplanar point
                var a = this.vertices[face2.a].clone().sub(offset);
                var b = this.vertices[face2.b].clone().sub(offset);
                var c = this.vertices[face2.c].clone().sub(offset);

                var r3z = undefined;

                if (faceBasis.getOrthogonalComponent(a).lengthSq() > 0.0001) {
                    r3z = faceBasis.getOrthogonalComponent(a).normalize().multiplyScalar(-1);
                }
                else if (faceBasis.getOrthogonalComponent(b).lengthSq() > 0.0001) {
                    r3z = faceBasis.getOrthogonalComponent(b).normalize().multiplyScalar(-1);
                    //face1.basis.y = new Vector4(0,0,0,-1);//new Vector4().crossVectors(basisX, basisY, face1.basis.x).normalize();
                }
                else if (faceBasis.getOrthogonalComponent(c).lengthSq() > 0.0001) {
                    r3z = faceBasis.getOrthogonalComponent(c).normalize().multiplyScalar(-1);
                }
                
                if (r3z !== undefined) {
                    var B3 = new Basis3(faceBasis.x, faceBasis.y, r3z);
                    B3.setProjectionMatrix();

                    var face1b = this.vertices[face1.b].clone().sub(offset);
                    var face1c = this.vertices[face1.c].clone().sub(offset);

                    var ab = B3.changeBasis(face1b);
                    if (parseFloat(ab.y.toFixed(4)) !== 0 || parseFloat(ab.z.toFixed(4)) !== 0) {
                        console.error("whack")
                    }
                    var bc = B3.changeBasis(face1c);

                    var normal1 = r3z;//B3.convertToR4(ab.cross(bc)).normalize();
                    var normal2 = new Vector4(0, 0, 0, 1);//new Vector4().crossVectors(faceBasis.x, faceBasis.y, normal1).normalize();

                    face1.basis = new Basis2(normal1, normal2);

                    break;
                }
            }
        }
        
    },

	clone: function () {

		return new this.constructor().copy( this );

	},

	copy: function ( source ) {

		this.faces = []

        for (face of source.faces) {
            this.faces.push(face.copy());
        }

		return this;

	},

} );


export { Crust4 };
