# Drawing Triangles
*BamBozzle*  

Every form of rendering discussed in this chapter exclusively[^3] uses triangles to construct the objects drawn on screen. This is for a few reasons. The first is that in order to fill an area in space, 3 or more points are necessary. A point or a line cannot fill an area in space, and so are not useful for representing surfaces.   
The second is that triangles are necessarily coplanar, which means that for any 3D triangle, there always exists a flat plane that all the vertices can lie on. Due to how projection works, this means that a 3D triangle will always still look like a triangle when drawn to the screen, a property not held by any other 3D shape with more than 3 points. This greatly simplifies the process of rendering, as it is not necessary to determine what type of shape is being drawn, as it will always be a triangle.   
The third reason is that there is one true way to draw a triangle. For 4 or more points drawn to the screen, there is not one “correct” way to fill the space between them, unless the points have a specific order, which creates its own problems.

\[INSERT DIAGRAM OF TWISTED VS UNTWISTED QUAD MAYBE\]

Since shapes with fewer than 3 points are unsuitable, and shapes with more than 3 points come with a lot of inconvenience and vagueness attached, triangles are left as the most useful shape for representing 3D objects. As such, many triangle filling algorithms have been created on Scratch. The predominant methods are Incircle Filling, Stamped and Scanline.

### Incircle Filling

*BamBozzle*  

Incircle Filling is the most commonly used technique on Scratch as it is fast and flexible. It works by finding the incircle of the triangle, which is a circle which is tangent to all 3 of the triangles edges. This is the largest circle you can fit inside the triangle, and therefore drawing it with a single pen dot fills in the largest possible area. After this, lines are drawn along the edges to fill in the remaining area.   
Since this method uses pen, it can fill in any triangle without visual bugs, and can also be set to fill in any color. Since it is a popular technique there exist many highly refined versions of it on Scratch. \[LIST THEM\]  
There are some downsides to this technique. Since there is overlap of the lines used to fill the area, transparency is quite ineffective with this filler. At lower resolutions, depending on the filler used, some areas in the corners of triangles may not be filled, or the triangle may “spill over” into the surrounding area. \[IMAGES HERE\]

### Scanline

*BamBozzle*  

Another technique is to fill successive rows of pixels inside the triangle, known as “scanlines”. These rows do not overlap, and so transparency is quite a bit more effective using this method[^4]. A high number of scanlines are needed to avoid jagged or imprecise edges. This has a large performance impact, so it is recommended to only use this technique for transparent triangles, or other necessary contexts, and not for general triangle filling. Modifying this technique allows for texture support, as well as Z-Buffer support.

### 

### Stamped {#stamped}

*BamBozzle*  

It is possible to fill triangles using a stamped sprite. This technique can be very fast, as it prints the triangle all in one go. This technique also allows for free affine texture mapping by making the stamping costume textured.   
Rudimentary versions of this technique split the triangle to be filled into two right angled triangles, and then select a costume of a similar right angled triangle for each. After correctly scaling and rotating, these two triangles are stamped to fill the specified region. This method leaves a visible seam in the triangle, has precision issues due to the discrete number of triangle costumes available, and has issues with texture mapping due to the split in the filled triangle.   
Scratcher Chrome\_Cat realized \[YADA YADA STTF DO THIS LATER\]

[^3]:  Some advanced Scratch 3D engines have limited quad support, on top of triangle support. This is done for small performance gains and in most cases is not worth the extra complication. The quads that these engines can render are also typically limited to being near-coplanar and convex, for the reasons discussed. 

[^4]:  Due to Scratch anti-aliasing there may be very thin lines still visible using this technique at some resolutions. 