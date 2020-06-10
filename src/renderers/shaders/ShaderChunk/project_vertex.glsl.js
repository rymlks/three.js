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
if (abs(mvPosition3D.z) == mvPosition3D.z) {
	mvPosition3D.z = sqrt(pow2(mvPosition3D.z) + pow2(mvPosition3D.w));
} else {
	mvPosition3D.z = -sqrt(pow2(mvPosition3D.z) + pow2(mvPosition3D.w));
}
//mvPosition3D.z += mvPosition3D.w;
mvPosition3D.w = 1.0;
gl_Position = projectionMatrix * mvPosition3D;
//*/
`;