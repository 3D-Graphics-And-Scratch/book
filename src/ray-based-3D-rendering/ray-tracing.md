# Ray-tracing
*badatcode123*  

Raytracing is a method of 3D rendering that uses ray-surface intersection functions to find the nearest intersection distance to an object, “t”, if the ray hits the object. A simple ray-surface intersection is the ray-sphere intersection, shown below.  

<img src="../images/image23.png" class="scratch-block">

##
<img src="../images/image8.png" width="400" class="scratch-block">

Now we can test intersections with every object in the scene and then color that pixel the color of the object (reminder that the color of the object is from 0-1 not 0-255) that has the smallest t value or the background color if there are no intersections. Do the ray-sphere intersection right after defining the ray origin and direction.  

<img src="../images/image87.png">

*Expected output (circle radius of 25 and positioned at 0,0,100)*