export default /* glsl */`
vec5 mvPosition = vec5( transformed.x, transformed.y, transformed.z, transformed.w, 1.0 );

#ifdef USE_INSTANCING

	mvPosition = multiply(instanceMatrix, mvPosition);

#endif

mvPosition = multiply(modelViewMatrix, mvPosition);
vec4 mvPosition3D = xyzw(mvPosition);
modelW = mvPosition.w;

if (modelW < -0.001 || modelW > 0.001) {
	// stealing some stuff from https://hollasch.github.io/ray4/Four-Space_Visualization_of_4D_Objects.html#s4.3
	float Vangle = 3.14159 * 0.5;
	float T = 1.0 / tan(Vangle * 0.5);
	float invw = T / abs(mvPosition3D.w);
	mvPosition3D.x *= invw;
	mvPosition3D.y *= invw;
	mvPosition3D.z *= invw;
}



// dont mess with this.
//mvPosition3D.z *= abs(mvPosition3D.w);
mvPosition3D.w = 1.0;
gl_Position = projectionMatrix * mvPosition3D;
`;