export default /* glsl */`
///////////////////////////////////////////////////////////////////////////////////
// project_vertex
vec5 mvPosition = vec5( transformed.x, transformed.y, transformed.z, transformed.w, 1.0 );

#ifdef USE_INSTANCING

	mvPosition = multiply(instanceMatrix, mvPosition);

#endif

//mvPosition = multiply(modelViewMatrix, mvPosition);


mat5 _projectionMatrix4D = mat5(
	1.0, 0.0, 0.0, 0.0, 0.0,
	0.0, 1.0, 0.0, 0.0, 0.0,
	0.0, 0.0, 1.0, 0.0, 0.0, 
	0.0, 0.0, 0.0, 1.0, 0.0,
	0.0, 0.0, 0.0, 1.0, 0.0
	);
	
//vec4 tmpPosition = perspectiveClampV(multiply(_projectionMatrix4D, mvPosition));

// debug
vec4 tmpPosition = castv4(mvPosition);

//gl_Position = projectionMatrix * tmpPosition;

gl_Position = vec4(tmpPosition.x, tmpPosition.y, tmpPosition.z, 1.0);
//gl_Position = vec4(tmpPosition.x, tmpPosition.y, -1.0, 1.0);
`;
