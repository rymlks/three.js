export default /* glsl */`

#include <envmap_common_pars_fragment>
uniform float opacity;

varying vec4 vWorldDirection;

#include <cube_uv_reflection_fragment>

void main() {

	vec4 vReflect = vWorldDirection;
	#include <envmap_fragment>

	gl_FragColor = envColor;
	gl_FragColor.a *= opacity;

	#include <tonemapping_fragment>
	#include <encodings_fragment>

}
`;
