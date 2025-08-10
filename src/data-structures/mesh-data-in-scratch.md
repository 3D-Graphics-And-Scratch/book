# Mesh data in scratch
### Storing

*scratchtomv, krypto*

The way of storing triangles is heavily defined by how it is used.  One method is storing all triangles and all the vertices in two lists. The mesh data can be easily accessed by looping through these lists.

This is the easiest way to store your mesh data, new fields can be added according the renderer needs : 

<div style="display: flex; justify-content: space-between; flex-wrap: wrap;">

  <div style="width: 48%; margin-bottom: 20px;">
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="text-align: left;">&nbsp;</th>
          <th style="text-align: left;">Quads</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Vertex 1 index</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Vertex 2 index</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Vertex 3 index</td>
        </tr>
        <tr>
          <td>4</td>
          <td>Vertex 4 index</td>
        </tr>
        <tr>
          <td>5</td>
          <td>Material index</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div style="width: 48%; margin-bottom: 20px;">
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="text-align: left;">&nbsp;</th>
          <th style="text-align: left;">Vertex</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>X</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Y</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Z</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div style="width: 48%; margin-bottom: 20px;">
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="text-align: left;">&nbsp;</th>
          <th style="text-align: left;">Ngons</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Vertex Start Index</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Polygon Vertex Length</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Material index</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div style="width: 48%; margin-bottom: 20px;">
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="text-align: left;">&nbsp;</th>
          <th style="text-align: left;">Triangle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Vertex 1 index</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Vertex 2 index</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Vertex 3 index</td>
        </tr>
        <tr>
          <td>4</td>
          <td>Material index</td>
        </tr>
      </tbody>
    </table>
  </div>

</div>


If you want to create a 3D project you can now jump right in the [Rasterization and Triangles](../rasterization-and-triangles/rasterization-and-triangles.md) chapter.


### 

### Importing

*scratchtomv*  

Importing an [OBJ](https://en.wikipedia.org/wiki/Wavefront_.obj_file) file is the easiest and most efficient way to import a mesh in Scratch.  
Why use OBJ Files?

- They are fairly easy to parse since they are stored in the ASCII layout.  
- OBJ is a file format, also known as wavefront, and is a very easy way to import a model from a 3D modeling program, to Scratch.

There are two main ways of importing an .obj file in Scratch : it can either be imported into a list, or pasted in a variable / input field. There are no “good” ways of doing it, but here we will approach the paste method.  
The first step is to obtain an .obj file : it can be found online, or exported from [Blender](https://www.blender.org/).  
Once done, we can use a simple algorithm to decode the OBJ data, by reading it step-by-step.

* Skips the metadata at the beginning (\#)  
* (Optional) Reads the material name and links the material data to the following object. (mtllib)  
* (Optional)Reads the object name (o)  
* Reads all the vertices position data (v)  
* (Optional)Reads all the uv data (vt)[^1]  
* (Optional)Reads all the vertex normal data (vn)[^2]  
* Reads all the face data (f)

In order to read this data, this function uses another function that reads and stores the characters until it finds a special letter combination such as “v”, and returns this data.

Full OBJ file specifications :   
[http://www.hodge.net.au/sam/blog/wp-content/uploads/obj\_format.txt](http://www.hodge.net.au/sam/blog/wp-content/uploads/obj\_format.txt)

[^1]:  If the .obj file includes UV data.

[^2]:  If the .obj file includes vertex normal data.