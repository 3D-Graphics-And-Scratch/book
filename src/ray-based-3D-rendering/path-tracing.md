# Path-tracing
*badatcode123,bambozzle*  

Path-tracing, a subset of raytracing, is a way to make highly realistic images. Path-tracing emulates how rays of light behave in the real world, to give more realistic results than other rendering techniques at the cost of performance.

In the real world, rays of light are emitted from light sources, and bounce around the world until they hit your eyes. As the light ray bounces off objects, some of the frequencies of light in it get absorbed, tinting the light. However, in path-tracing, the rays are shot from the *camera* and bounce around the scene until it hits a light source (or some maximum bounce limit is reached, for performance reasons). This is because simulating rays from the light is wasteful, as most of these rays will not end up at the camera, and so will not affect the final image, but when the rays are shot from the camera, all rays are relevant to the final image. This is still accurate as light behaves the same whether it is moving forwards or backwards in time[^1]. 

<img src="../images/path tracing.png">

But before implementing pathtracing, let’s look at the rendering equation.

## The rendering equation  

The rendering equation is the equation all pathtracers try to approximate/solve. And it looks like this:  

![][image1]  

While this might look scary, it is actually incredibly simple. The equation pretty much tells us how much light a point on some object receives, it does this by shooting an infinite amount of rays in a hemisphere around the point, this is what the integral symbol and dwo represent, so we can ignore those. The following equation, then, gives how much light comes from some specific direction (radiance).  

![][image2]  

Now, we can look at the individual functions inside the rendering equation. Li represents the raw amount of light coming from some direction wo at point **x** (this function itself calls the rendering equation), the BRDF represents the percent of light that

For each object we need to know its color, emissive color (the color of the light it emits, set to 0 if it’s a light source) and whether or not it is a light source, alongside other properties related to its shape. We also need to know its surface normal so that we can shoot the ray from the intersection position correctly. 

Now to implement pathtracing, we first need to get the surface normal. The surface normal of an object can be outputted by the intersection function itself. Then we need an emissive color for the lights. We need 6 new variables, named ray throughput r,g,b and ray emissive r,g,b. The ray emissive variables will be the final color of the pixels, while the ray throughput variables will be to store the colors of the objects the ray has encountered so far (for indirect illumination). So, for each object, define its emissive color, and make 6 new variables to store these properties (including the surface normal). Now, after each intersection we do this

1. Change the ray emissive color by throughput\*object emissive color  
1. Set the throughput to throughput\*object color

<img src="../images/image40.png">

Make sure to set all the color channels in the throughput to 1 and the emissive’s to 0 before shooting the ray from the camera. We should also add a `is light?` boolean to the intersections to determine when objects are light sources and we can stop tracing the ray. We should also multiply the throughput by the dot product between the outgoing direction and the normal vector (see the math section), this is because light is more spread out at steep angles so there is less light hitting a particular point overall, this effect can be shown with the below image, we do the dot product with the outgoing direction rather than the incoming direction because we are doing the light calculations in reverse. 
Here’s the code for the normal of a sphere and how to use it.  

```blocks
set [normal x v] to (((nx) + ((t) * (ray dir x))) / (rad::custom))
set [normal y v] to (((ny) + ((t) * (ray dir y))) / (rad::custom))
set [normal z v] to (((nz) + ((t) * (ray dir z))) / (rad::custom))
check if intersecting (t) object color (r::custom) (g::custom) (b::custom) object emissive color (er::custom) (eg::custom) (eb::custom) surface normal (normal x) (normal y) (normal z) light? <is light?::custom> :: custom
```

```blocks
define check if intersecting (t) object color (r) (g) (b) object emissive color (er) (eg) (eb) surface normal (nx) (ny) (nz) light? <is light?>
    if <<(t) > (0)> and <(t) < (ray t)>> then
        set [ray t v] to (t)
        set [object color R v] to (r)
        set [object color G v] to (g)
        set [object color B v] to (b)
        set [object emissive r v] to (er)
        set [object emissive g v] to (eg)
        set [object emissive b v] to (eb)
        set [object normal x v] to (nx)
        set [object normal y v] to (ny)
        set [object normal z v] to (nz)
        set [is light v] to <is light?>
    end
```

With the surface normal we can make a simple diffuse sphere.  Diffuse means that the outgoing ray direction is completely random, so we need to be able to generate a random unit vector, then check that this random vector is in the correct orientation (facing the same side as the normal), to do this, take the dot product between the normal and the random vector, if it is less than 0, we invert the random vector. We can then set it as the ray direction. We then shoot the ray again, but from the intersection point and the new ray direction. Make sure to move the ray to the intersection point *before* generating the new outgoing direction.  

```blocks
set [ray origin x v] to ((ray origin x) + ((ray t) * (ray dir x)))
set [ray origin y v] to ((ray origin y) + ((ray t) * (ray dir y)))
set [ray origin z v] to ((ray origin z) + ((ray t) * (ray dir z)))
```

```blocks
define random on sphere
    set [t1 v] to (pick random (0.0) to (360.0))
    set [y v] to (pick random (-1.0) to (1.0))
    set [t2 v] to ([sqrt v] of ((1) - ((y) * (y))))
    set [x v] to ((t2) * ([cos v] of (t1)))
    set [z v] to ((t2) * ([sin v] of (t1)))
```

*From SpinningCube*

Now we can make a loop that represents the ray bounces, how many times it repeats is the amount of bounces around the scene the ray does. Defining a scene custom block can make it easier to edit and make the scene.  
The ray bounces loop then looks like this:  

```blocks
repeat (5)
    set [ray t v] to (1000)
    scene :: custom
    if <not <(ray t) = (1000)>> then
        change [ray emissive r v] by ((throughput r) * (object emissive r))
        change [ray emissive g v] by ((throughput g) * (object emissive g))
        change [ray emissive b v] by ((throughput b) * (object emissive b))
        set [throughput r v] to ((throughput r) * (object color r))
        set [throughput g v] to ((throughput g) * (object color g))
        set [throughput b v] to ((throughput b) * (object color b))
        if <(is light) = [true]> then
            stop [this script v]
        end
        generate new outgoing direction :: custom
        set [dot v] to ((((ray dir x) * (object normal x)) + ((ray dir y) * (object normal y))) + ((ray dir z) * (object normal z)))
        set [throughput r v] to ((throughput r) * (dot))
        set [throughput g v] to ((throughput g) * (dot))
        set [throughput b v] to ((throughput b) * (dot))
    else
        stop [this script v]
    end
end
```

Now when rendering, it should look like this  

<img src="../images/image17.png">

However, this image is very noisy. This is because we are only sending one ray per pixel (1 sample), when we really should be trying to send as many as possible. There are 2 ways to do more samples, store the render in a buffer and keep rendering the scene and averaging the colors in the buffer and the colors in the render, or do all the samples at once using a repeat block, adding up the colors of the different samples and dividing by the amount of samples we took. We will be doing the second method since it is easier.  

```blocks
define get pixel color (x) (y)
    repeat (samples)
        set [ray origin x v] to (0)
        set [ray origin y v] to (0)
        set [ray origin z v] to (0)
        set [length v] to ([sqrt v] of ((((x) * (x)) + ((y) * (y))) + ((focal length) * (focal length))))
        set [ray dir x v] to ((x) / (length))
        set [ray dir y v] to ((y) / (length))
        set [ray dir z v] to ((focal length) / (length))
        shoot ray :: custom
        change [avg r v] by (ray emissive r)
        change [avg g v] by (ray emissive g)
        change [avg b v] by (ray emissive b)
    end
    RGB to decimal ((avg r) / (samples)) ((avg g) / (samples)) ((avg b) / (samples)) :: custom
```

Now we can easily decrease the noisiness of the image by increasing the sample count, at the cost of speed. Here is the same scene from before but with 20 samples  

<img src="../images/image21.png">

As you can see, the noise has decreased significantly and will decrease even more as the sample count is increased. But it takes quite a long time for the output to converge to an image that doesn’t have visible noise, to fix this we need to improve the way we are shooting out rays from the objects. In order to do this, we should first look at the rendering equation.

### The rendering equation

The rendering equation is the equation all pathtracers try to approximate. And it looks like this:  

<img src="../images/image16.png">

While this might look intimidating, it is actually surprisingly easy. The integral with the Ω symbol is telling us to integrate over a hemisphere of all possible outgoing ray directions, so we can ignore the integral symbol and the dωo. Now let’s define the variables, the **x** variable represents a position in space, ωo represents the outgoing direction of a ray while ωi represents the incoming direction. The Li() function tells you the amount of light from **x** in some direction ωo, this function itself uses the rendering integral, which is why the rendering equation is recursive. The BRDF() stands for bidirectional reflectance distribution function, it essentially tells you the amount of rays going out in some direction based on the incoming direction. Here is a representation of the lambertian/diffuse BRDF  

<img src="../images/image58.png">

It is just a hemisphere because every direction has an equal chance to be picked. This is the specular BRDF  

<img src="../images/image93.png">

As you can see, it more light reflects specularly

The BRDF of diffuse materials is simply albedo/π, albedo means the amount of light reflected off of a surface. An albedo of 1 means the surface reflects all light that hits it and an albedo of 0.5 means the surface will absorb half the light and reflect the other half. Since we are always reflecting the light, we should be diving the throughput by π, but since we aren’t, we are implicitly saying that the albedo is π, which is wrong because no surface should reflect more light than the light it hits, to correct for this we must divide the throughput by π. The final term, (ωo\***n**) is just the dot product between the outgoing ray direction and the surface normal, and we are already multiplying the throughput by this. 

  Obviously, we cannot sample every direction in a hemisphere since there is an infinite amount of directions to sample, so to solve the rendering equation, a technique called Monte Carlo integration is used. A Monte Carlo algorithm samples a function at random values and averages these samples to approximate the true answer to an integral. Some integrals (such as the rendering equation) require many samples to converge, but given enough samples a Monte Carlo algorithm ALWAYS converges. However, there are ways to help the algorithm converge faster, one such method is called importance sampling.

### Importance sampling

Importance sampling is a method that samples the most important part of an integrand and downsamples (makes it contribute less by multiplying the output by a small number) the samples to correct for the bias. For example take the function below  

<img src="../images/image28.png">

To importance sample this, we would sample more around the peaks and sample less around the valleys. There are many different areas we could importance sample in a pathtracer, however we will be looking at the easiest one for now. The multiplication of the throughput by the dot product between the surface normal and the outgoing ray direction can be worrisome because if the outgoing direction is almost perpendicular to the normal, the throughput will be multiplied by a very small number and the work of the ray will be essentially wasted, meanwhile if the direction is very similar to the normal the throughput will be multiplied by a number close to 1, if we could find a way to sample directions closer to the normal more often and perpendicular to it less often, we wouldn’t waste as much rays. This actually ends up being very simple to do, after generating a random direction, simply add the surface normal to it and then normalize the vector, now we can then remove dot product multiplication. However, this would actually double the brightness of all objects, thus we need to divide the throughput by 2, you could also just divide by tau instead of having to divide by pi then divide by 2\.

  After implementing this, our pathtracer immediately sees a jump in quality  

<img src="../images/image74.png">

*(same scene and sample count as before, but with a brighter light source)*  
We aren’t downsampling by much more because it turns out that biasing the outgoing direction this way *almost* perfectly cancels out the dot product. We won’t be providing a formal proof here, but you can find some online.

[^1]:  Known as the Helmholtz Reciprocity Principle 

[image1]: <data:image/png;base64,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>

[image2]: <data:image/png;base64,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>