export default /* glsl */`
vec4 objectNormal = vec4( basisy );

#ifdef USE_TANGENT

	vec4 objectTangent = vec4( xyzw( tangent ) );

#endif
`;
