import {Mesh4D} from "../objects/Mesh4D.js"
import {Vector4} from "../math/Vector4.js"

var G = new Vector4(0, -9.81, 0, 0);

var _vec = new Vector4();

function PhysicsMesh4D( geometry, material ) {

    Mesh4D.call( this, geometry, material );

    this.type = 'PhysicsMesh4D';
    this.velocity = new Vector4();

    this.isAffectedByGravity = true;
    this.weight = 1;
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

        var colliding = false;
        for (var child of scene.children) {
            if (child.isPhysicsObject === true) {
                colliding = this.isCollidingWith(child);
                if (colliding === true) break;
            }
        }
        if (colliding === false) {
            this.position.add(movement);
        }
        for (var child of this.children) {
            if (child.isPhysicsObject === true) {
                child.update(delta);
            }
        }
    },

    isCollidingWith: function(object) {
        if (object === this) return false;

        var colliding = this.geometry.boundingBox.intersectsBox(object.geometry.boundingBox);

        if (colliding === true) {
            //console.log(this.name + " colliding with " + object.name);
            return true;
        }
        for (var child of object.children) {
            if (child.isPhysicsObject === true) {
                colliding = this.isCollidingWith(child);
            }
            if (colliding === true)  {
                //console.log(this.name + " colliding with " + object.name);
                return true;
            }
        }

        return false;
    }
} );

export { PhysicsMesh4D }