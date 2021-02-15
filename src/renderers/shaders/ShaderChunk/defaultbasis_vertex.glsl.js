export default /* glsl */`
vec4 transformedBasisX = objectBasisX;
vec4 transformedBasisY = objectBasisY;

#ifdef USE_INSTANCING

    transformedBasisX = mat4( instanceMatrix ) * transformedBasisX;
    transformedBasisY = mat4( instanceMatriY ) * transformedBasisY;

#endif

transformedBasisX = normalMatrix * transformedBasisX;
transformedBasisY = normalMatrix * transformedBasisY;

//transformedBasisX = xyzw(multiply(modelViewMatrix, vec5(transformedBasisX.x, transformedBasisX.y, transformedBasisX.z, transformedBasisX.w, 0.0)));
//transformedBasisY = xyzw(multiply(modelViewMatrix, vec5(transformedBasisY.x, transformedBasisY.y, transformedBasisY.z, transformedBasisY.w, 0.0)));

#ifdef FLIP_SIDED

    transformedBasisX = - transformedBasisX;
    transformedBasisY = - transformedBasisY;

#endif

#ifdef USE_TANGENT
    // TODO: What is this
    /*
	vec4 transformedTangent = xyzw( multiply(modelViewMatrix, vec5( objectTangent.x, objectTangent.y, objectTangent.z, objectTangent.w, 0.0 ) );

	#ifdef FLIP_SIDED

		transformedTangent = - transformedTangent;

	#endif
    */

#endif
`;
