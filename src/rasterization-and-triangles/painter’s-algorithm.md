# Painter’s algorithm
*(SpinningCube)*  
Painter’s algorithm is used by a large portion of filled-surface 3D renderers on Scratch. The algorithm’s name alludes to the technique a painter would use to capture a scene. The painter paints the objects in the scene from back to front, starting with the most distant object they can see. Since each new brush stroke may cover up brush strokes already applied to the canvas, the objects painted last appear at the very front, not obstructed by anything, while objects further back have been partially covered by objects in front of them. This ensures that surfaces that are behind other surfaces can’t be seen in the painting, as we would expect.

The algorithm involves the following steps:

1. Sort polygons by depth  
1. Using the sorted list, draw each polygon to the screen in back-to-front order

### 

### Limitations

By its very nature, painter’s algorithm can never be fully accurate in all cases—there are always cases where it fails to correctly draw a scene, such as when there is no clear ordering of “back-to-front”:  
![][image22]  
Of these three faces, none can be considered the frontmost or the backmost.  Intersecting faces pose a similar problem.

Thus, painter’s algorithm is prone to visual artifacts. Even with simple objects it can often fail to correctly resolve the scene:  
![][image23]  
There are some ways to mitigate these artifacts. Backface culling can help remove some of the unnecessary triangles from being sorted (This would fix the cube in the above example). How each triangle’s depth is determined can be altered to achieve different effects. Usually, the average of the Z depths of the three vertices is used, but this can be changed to use only the depth of the closest or furthest vertex, or an artistically chosen bias value can be added to the determined depth based on certain expectations. A common problem is for smaller objects to be incorrectly sorted behind the geometry of the ground they rest upon. These objects could be slightly biased towards the camera to reduce the chance of this happening.

These strategies can be used to reduce the prevalence of visual artifacts in scenes, but there is no simple solution that can completely get rid of them.