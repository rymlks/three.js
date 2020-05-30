export default /* glsl */`
///////////////////////////////////////////////////////////////////////////////////
// alphamap_fragment
#ifdef USE_ALPHAMAP

	diffuseColor.a *= texture2D( alphaMap, vUv ).g;

#endif
`;
