export default /* glsl */`
vec4 objectBasisX = vec4( basisX );
vec4 objectBasisY = vec4( basisY );

#ifdef USE_TANGENT

	vec4 objectTangent = vec4( xyzw( tangent ) );

#endif
`;
