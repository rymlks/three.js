export default /* glsl */`
vec5 mvPosition = vec5( transformed.x, transformed.y, transformed.z, transformed.w, 1.0 );

#ifdef USE_INSTANCING

	mvPosition = multiply(instanceMatrix, mvPosition);

#endif

mvPosition = multiply(modelViewMatrix, mvPosition);

/*
vec4 mvPosition3D = xyzw(multiply(projectionMatrix4D, mvPosition));
float preProjW = mvPosition3D.w;
mvPosition3D.w = 1.0;
mvPosition3D = projectionMatrix * mvPosition3D;
float foo = sqrt(pow2(mvPosition3D.w) + pow2(preProjW));

gl_Position = vec4(mvPosition3D.x, mvPosition3D.y, mvPosition3D.z, foo);
//*/

vec4 mvPosition3D = xyzw(mvPosition);

/*
if (abs(mvPosition3D.z) == mvPosition3D.z) {
	if (abs(mvPosition3D.w) == mvPosition3D.w) {
		mvPosition3D.z = sqrt(pow2(mvPosition3D.z) + pow2(mvPosition3D.w));
	} else {
		mvPosition3D.z = -sqrt(pow2(mvPosition3D.z) + pow2(mvPosition3D.w));
	}
} else {
	if (abs(mvPosition3D.w) == mvPosition3D.w) {
		mvPosition3D.z = -sqrt(pow2(mvPosition3D.z) + pow2(mvPosition3D.w));
	} else {
		mvPosition3D.z = sqrt(pow2(mvPosition3D.z) + pow2(mvPosition3D.w));
	}
}
*/


float zmult = 1.0;
float wmult = 1.0;
if (mvPosition3D.z < 0.0) {
	zmult = -1.0;
}
if (mvPosition3D.w < 0.0) {
	wmult = -1.0;
}

float sqrdist = pow2(mvPosition3D.z) * zmult + pow2(mvPosition3D.w) * wmult;

if (sqrdist < 0.0) {
	mvPosition3D.z = -sqrt(abs(sqrdist));
} else {
	mvPosition3D.z = sqrt(sqrdist);
}


//mvPosition3D.z = mvPosition3D.z * mvPosition3D.w;
//mvPosition3D.z += -abs(mvPosition3D.w);

//float wcap = mvPosition3D.w;


// dont mess with this.
mvPosition3D.w = 1.0;
gl_Position = projectionMatrix * mvPosition3D;
`;