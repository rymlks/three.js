export default /* glsl */`
vec4 objectNormal = vec4( normal );

#ifdef USE_TANGENT

	vec4 objectTangent = vec4( xyzw( tangent ) );

#endif
`;
