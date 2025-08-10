# Ray-based 3D rendering
*26243AJ, BamBozzle, badatcode123*  

Ray-based rendering algorithms use rays to render scenes. They work by shooting a ray(s) into the scene for each pixel, these algorithms are able to calculate the color and depth of these pixels. Many techniques for this exist, such as raytracing, raymarching, DDA, etc. The main difference between these methods is how they determine a ray intersects an object in the scene.

Ray-based rendering has the advantage of making it trivial to implement features such as shadows, reflection and refractions, which are usually much harder to do in other methods of rendering, such as rasterization. The drawback being that ray-based rendering is almost always slower than traditional rasterized rendering.

## Basics
*26243AJ, badatcode123*

Mathematically, a ray is defined by an origin (a position in space) and a direction at which it travels. It extends infinitely from its origin in its direction, as seen above. 

Although there are various methods to render a scene using these rays, the majority of them require each pixel of the screen rendered separately in a grid-like fashion. This can be done by iterating through the screen with 2 simple loops;

[Insert blocks here]

*\*In this format, resolution is defined by the size of each individual pixel. A resolution of 1 would produce an image with the same resolution as the vanilla scratch canvas.*   
*\*\*The pen size is scaled by 1.4, or the square root of 2, as circular pen dots with the same diameter as the height/width of the pixels would not fully fill each pixel.*   
*\*\*\*It is not recommended for these main render scene blocks to “run without screen refresh,” as these renderings can take up to several seconds to finish, which can cause the page to freeze or even crash if “run without screen refresh” is turned on.*

For each pixel, a ray is created based on the position of the pixel and the position and rotation of the camera. The position of the pixel on the screen can simply be treated as the ray’s x and y direction, and the z direction is defined by the focal length.   
\[insert generic diagram of ray tracing here to elaborate on this\]  
Then the ray’s direction is normalized, as further calculations may require a normalized direction, and is then rotated relative to the camera. 

[Insert blocks here]

The cast ray function shoots the ray into the scene, the specifics of how it does this is dependent on the method you are using, but it always finds the closest intersection point to the ray, as seen below.

[Insert diagram here]

As has been said already, the main difference between the methods are in how they find the intersection points.

```blocks
define render screen (res)
    pen up
    set pen size to ((2) * (res))
    go to x: (-240) y: (-180)
    repeat ((360) / (res))
        set x to (-240)
        pen down
        repeat ((480) / (res))
            get pixel color (x position) (y position) :: custom
            change x by (res)
        end
        pen up
        change y by (res)
    end
```

For each pixel we need to perform a function to do ray collisions, but first we need to define the ray origin and ray direction. The ray origin for this case is the camera position, and the ray direction is defined as   

```blocks
define get pixel color (x) (y)
    set [ray origin x v] to (0)
    set [ray origin y v] to (0)
    set [ray origin z v] to (0)
    set [length v] to ([sqrt v] of ((((x) * (x)) + ((x) * (x))) + ((focal length) * (focal length)))
    set [ray dir x v] to ((x) / (length))
    set [ray dir y v] to ((y) / (length))
    set [ray dir z v] to ((focal length) / (length))
```

The focal length is how far the lens of the camera is from the aperture, this is inversely proportional to FOV and should be around 300\. With the ray origin and direction defined, we can now use the ray algorithms to move the rays.

## 
