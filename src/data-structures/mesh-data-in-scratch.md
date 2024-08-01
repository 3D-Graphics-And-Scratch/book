# Mesh data in scratch
### Storing

*(scratchtomv, krypto)*  
The way of storing triangles is heavily defined by how it is used.  One method is storing all triangles and all the vertices in two lists. The mesh data can be easily accessed by looping through these lists.

This is the easiest way to store your mesh data, new fields can be added according the renderer needs : 

|  | Quads |
| :---- | :---- |
| 1 | Vertex 1 index |
| 2 | Vertex 2 index |
| 3 | Vertex 3 index |
| 4 | Vertex 4 index |
| 5 | Material index |

|  | Vertex |
| :---- | :---- |
| 1 | X |
| 2 | Y |
| 3 | Z |

|  | Ngons |
| :---- | :---- |
| 1 | Vertex Start Index |
| 2 | Polygon Vertex Length |
| 3 | Material index |

|  | Triangle |
| :---- | :---- |
| 1 | Vertex 1 index |
| 2 | Vertex 2 index |
| 3 | Vertex 3 index |
| 4 | Material index |

If you want to create a 3D project you can now jump right in the [Rasterization and Triangles](\#rasterization-and-triangles) chapter.

### 

### Importing

*(scratchtomv)*  
Importing an [OBJ](https://en.wikipedia.org/wiki/Wavefront\_.obj\_file) file is the easiest and most efficient way to import a mesh in Scratch.  
Why use OBJ Files?

- They are fairly simple to parse since they are stored in the ASCII layout.  
- OBJ is a file format, also known as wavefront, and is a very easy way to import a model from a 3D modeling program, to Scratch.

There are two main ways of importing an .obj file in Scratch : it can either be imported into a list, or pasted in a variable / input field. There are no “good” ways of doing it, but here we will approach the paste method.  
The first step is to obtain an .obj file : it can be found online, or exported from [Blender](https://www.blender.org/).  
Once done, in the scratch editor is used a function that receives the obj data as an argument, as well as optional import options. This function reads the data step-by-step.

* Skips the metadata at the beginning (\#)  
* (Optional) Reads the material name and links the material data to the following object. (mtllib)  
* (Optional)Reads the object name (o)  
* Reads all the vertices position data (v)  
* (Optional)Reads all the uv data (vt)[^1]  
* (Optional)Reads all the vertex normal data (vn)[^2]  
* Reads all the face data (f)

In order to read this data, this function uses another function that reads and stores the characters until it finds a special letter combination such as “v “, and returns this data.

Full OBJ file specifications :   
[http://www.hodge.net.au/sam/blog/wp-content/uploads/obj\_format.txt](http://www.hodge.net.au/sam/blog/wp-content/uploads/obj\_format.txt)

[^1]:  If the .obj file includes UV data.

[^2]:  If the .obj file includes vertex normal data.