export default /* glsl */`
vec5 mvPosition = vec5( transformed.x, transformed.y, transformed.z, transformed.w, 1.0 );

#ifdef USE_INSTANCING

	mvPosition = multiply(instanceMatrix, mvPosition);

#endif

mvPosition = multiply(modelViewMatrix, mvPosition);


mat5 _projectionMatrix4D = mat5(
	1.0, 0.0, 0.0, 0.0, 0.0,
	0.0, 1.0, 0.0, 0.0, 0.0,
	0.0, 0.0, 1.0, 0.0, 0.0, 
	0.0, 0.0, 0.0, 1.0, 0.0001,
	0.0, 0.0, 0.0, 1.0, 0.0
	);
	
vec4 mvPosition3D = xyzw(multiply(projectionMatrix4D, mvPosition));
float preProjW = mvPosition3D.w;
mvPosition3D.w = 1.0;
mvPosition3D = projectionMatrix * mvPosition3D;

gl_Position = vec4(mvPosition3D.x, mvPosition3D.y, mvPosition3D.z, mvPosition3D.z);
`;
