# Glossary
**AABB :** (Axis-Aligned Bounding Box) A Bounding box aligned with the axes of the coordinate system.

**Buffer :** A section of memory used for temporary data storage. 

**BVH :** (Bounding Volume Hierarchy) An acceleration structure made of primitive 3D objects that speeds up ray-casting and various algorithms. 

**Camera Space :** *(also known as; View Space, Eye Space)* 3D information of 3D coordinates projected relative to the camera. Includes relative depth. 

**Depth Buffer :** An additional screen-space buffer that provides depth information.

**DOF :** (Depth of field) The distance between the nearest and the furthest objects that are in acceptably sharp focus in an image captured with a camera.

**Epsilon :** A very small value, mostly used to prevent floating point inaccuracies and to set raymarching limits.

**Focal length :** Camera property that indicates how strongly it converges or diverges light. Inversely proportional to the FOV.

**FOV :** (Field of view) The angular extent of the world that is seen. Inversely proportional to the focal length.

**Magnitude** : The length of a vector.

#### Mesh : {.mesh}
A collection of faces, edges and vertices that define the object's shape.

**Model Space :** *(also known as; Object Space, Local Space)* 3D coordinates relative to another point of reference, typically used to store meshes of individual models/objects.

**Normal :** A vector perpendicular to the surface of an object.

**Pen :** A vanilla Scratch extension used to draw on the screen 

**Procedural :** Defined by code

**Rasterizer :** An algorithm which draws objects to the screen by filling in shapes pixel-by-pixel.

**Ray :** Defined by its origin (a position in 3D space where the ray starts) and its direction (A vector parallel to the direction of the ray).

**Screen Space :** *(also known as; Clip Space)* 2D information of 3D coordinates projected to the screen. Does not include depth information.

**SDF :** Signed distance field; a function defining distance to the surface of an object with interior points being negative, and exterior being positive

**Vector :** An object having direction as well as magnitude, especially as determining the position of one point in space relative to another.

**Vertex :** A point with a coordinate vector.

**Viewing Frustum :** The region of space in the modeled world that may appear on the screen

**World Space :** 3D coordinates relative to the center of the world, typically (0, 0, 0\)
