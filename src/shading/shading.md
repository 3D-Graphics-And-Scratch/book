# Shading
## Material {#material}

Diffuse objects are objects that reflect light completely randomly, meaning the outgoing and incoming directions have no relationship. This is often called lambertian reflectance.

Metals are objects that reflect light almost always in a specular way, meaning they often absorb transmissions.

Glasses usually refract light, but can also reflect light (more noticeable at steep angles, due to the fresnel effect).

## Diffuse models {#diffuse-models}

Many models, or BRDFs, exist for diffuse calculations, the most easiest and basic one is the lambertian diffuse model, it is defined simply as albedo/pi, with albedo being the reflectivity of the object. Other, more advanced models such as oren-nayar can represent diffuse objects more realistically at the cost of being more expensive to calculate and also needing many samples to converge because they use the microfact model.

## Specular models

\=\> about specular lighting

In graphics, it is common to combine both the specular and diffuse models, alongside the ambient value, for more realistic shading than just using one model, as seen below  

<img src="../images/image53.png">

## Shadows

### Ray-based

Hard shadows can be achieved by shooting rays directly at the light sources from an object’s surface. If the ray is blocked by some object before reaching the light source, that point on the surface is in shadow.

### Rasterizer

\=\> talk about how to do shadows with rasterizers.

## Baked lighting

\=\> about baked lighting methods in Scratch (texture based like The Mast by awesome-llama, polygon-based like Sub 1k Block Challenge by littlebunny06)