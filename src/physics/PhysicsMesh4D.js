import {Mesh4D} from "../objects/Mesh4D.js"
import {Vector4} from "../math/Vector4.js"
import {Ray4D} from "../math/Ray4D.js"

var G = new Vector4(0, -9.81, 0, 0);

var _vec = new Vector4();

function PhysicsMesh4D( geometry, material ) {
    if ( geometry.isGeometry !== true) {
        throw "PhysicsMesh4D: geometry must be Geometry4D (not BufferGeometry4D)";
    }

    Mesh4D.call( this, geometry, material );

    this.type = 'PhysicsMesh4D';
    this.velocity = new Vector4();

    this.isAffectedByGravity = true;
    this.mass = 1;
}

PhysicsMesh4D.prototype = Object.assign( Object.create( Mesh4D.prototype ), {
    constructor: PhysicsMesh4D,
    isPhysicsObject: true,

    preUpdate() {
        this.geometry.computeBoundingBox();
        this.geometry.boundingBox.applyMatrix5(this.matrixWorld);
        //this.geometry.computeBoundingGlome();

        for (var child of this.children) {
            if (child.isPhysicsObject === true) {
                child.preUpdate();
            }
        }
    },
    
    update: function(delta, scene) {

        //console.log(this.name + " bounding Box: <" + this.geometry.boundingBox.min.toArray() + ">, <" + this.geometry.boundingBox.max.toArray() + ">");
        if (this.isAffectedByGravity === true) {
            this.velocity.add(_vec.copy(G).multiplyScalar(delta));
        }
        var movement = _vec.copy(this.velocity).multiplyScalar(delta);

        var colliding = null;
        for (var child of scene.children) {
            if (child.isPhysicsObject === true) {
                colliding = this.getCollision(child);
                if (colliding !== null) {
                    break;
                }
            }
        }
        if (colliding === null) {
            this.position.add(movement);
        } else {
            var myFace = this.getFaceCollidingWith(colliding);
            //this.position.add(movement.multiplyScalar(-1));
        }
        for (var child of this.children) {
            if (child.isPhysicsObject === true) {
                child.update(delta, scene);
            }
        }
    },

    getCollision: function(object) {
        if (object === this) return null;

        var colliding = this.geometry.boundingBox.intersectsBox(object.geometry.boundingBox) ? object : null;

        if (colliding !== null) {
            //console.log(this.name + " colliding with " + object.name);
            return colliding;
        }
        for (var child of object.children) {
            if (child.isPhysicsObject === true) {
                colliding = this.getCollision(child);
            }
            if (colliding !== null)  {
                //console.log(this.name + " colliding with " + object.name);
                return colliding;
            }
        }

        return null;
    },

    getFaceCollidingWith: function(object) {

        var direction = new Vector4().subVectors(object.position, this.position);
        var ray = new Ray4D(this.position, direction);

        for (var face of this.geometry.faces) {
            //if (ray.intersectTriangle(face, this.geometry, false)) {

            //}
        }
        return null;
    }
} );

export { PhysicsMesh4D }