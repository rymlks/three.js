export default /* glsl */`
///////////////////////////////////////////////////////////////////////////////////
// beginnormal_vertex
vec4 objectNormal = vec4( normal );

#ifdef USE_TANGENT

	vec4 objectTangent = vec4( xyzw( tangent ) );

#endif
`;
