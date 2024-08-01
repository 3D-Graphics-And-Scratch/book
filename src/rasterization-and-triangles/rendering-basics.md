# Rendering Basics
*(BamBozzle)*  
This section will walk through the process of rendering a 3D triangle, given its point in 3D space. This step is broadly the same regardless of the method of rasterization you are using, though there may be slight differences from engine to engine[^5] 

Projection  
Z clipping  
Filling

## Advanced

*(Krypto)*  
One of the more advanced ways to raster a polygon is with the fan triangulation. The way this works is that you “pin” one of the vertices of the polygon and then you go around the polygon creating triangles with the vertices of the pin and the current one you are looping around. As you can see in the image below, this triangulates the polygon. Furthermore, you can use quads in a painters engine to triangulate this polygon, adding a bigger performance boost when rastering polygons  
![][image21]

[^5]:  Some engines choose to perform the projection step before the sorting step when using painter’s algorithm.