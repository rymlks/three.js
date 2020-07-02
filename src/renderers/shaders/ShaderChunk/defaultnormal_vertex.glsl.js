export default /* glsl */`
vec4 transformedNormal = objectNormal;

#ifdef USE_INSTANCING

	transformedNormal = mat4( instanceMatrix ) * transformedNormal;

#endif

transformedNormal = normalMatrix * transformedNormal;

#ifdef FLIP_SIDED

	transformedNormal = - transformedNormal;

#endif

#ifdef USE_TANGENT

	vec4 transformedTangent = xyzw( multiply(modelViewMatrix, vec5( objectTangent.x, objectTangent.y, objectTangent.z, objectTangent.w, 0.0 ) );

	#ifdef FLIP_SIDED

		transformedTangent = - transformedTangent;

	#endif

#endif
`;
