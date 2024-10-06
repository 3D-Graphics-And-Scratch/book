# Ray-based 3D rendering
*BamBozzle, badatcode123*  

Ray-based techniques in 3D graphics use rays. Rays are defined by their origin (a position in 3D space where the ray starts) and their direction (A vector parallel to the direction of the ray). There are many uses of rays in general, especially in 3D, but it is also possible to use them to fully view a 3D world by itself. This is done by determining if a ray collides with any objects. Methods for this include raytracing, raymarching and DDA. For each pixel in the screen, a ray is cast into the scene, and the pixel is then set to the appropriate color based on how it collides with the objects in the scene. To convert RGB to pen color, refer to the section about [Handling colors in Scratch](../handling-colors-in-scratch/handling-colors-in-scratch.md). Remember, do NOT turn on “run without screen refresh”.

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
