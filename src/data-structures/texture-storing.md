# Texture storing
*(scratchtomv)*

There are two main ways of using textures in 3D projects : 

| Method | Store all the pixel colors in a list used for all textures | Use an STTF (Stamped Textured Triangle Fill) |
| :---- | :---- | :---- |
| \+ | Allows for much more flexibility and color management later on.  Can be projected perfectly. | Easy to import  textures Doesn’t take place in the JSON Fast texture rendering. |
| \- | Takes a lot of space in JSON (Can be bypassed by storing the data in image costumes) Takes a lot of time to render textures. | Texture projection isn’t accurate.  It uses GB of RAM to render. |
| When to use ? | Projects that need :  A lot of different textures  Perfect projection  Perfect sorting Not much FPS Fragment Shaders | Projects that need :  More FPS Few textures |
| Example | ![][image19]The Mast \[3D\] by awesome-llama, which stores textures in a list. | ![][image20]3D Fun House by Chrome\_Cat, which uses a combination of triangle fillers and STTF fillers. |

### 

### Using a list

*(scratchtomv)*  
Using a list to represent a texture is actually representing a 2D texture as an 1D array of colors. These colors need to be in a Scratch-compatible format.  If you’re not aware of color representations in Scratch, see [Handling colors in Scratch](\#handling-colors-in-scratch).

These tools can be used to convert an 2D texture to an array of colors : 

* Hex conversion :   
  [https://xeltalliv.github.io/ScratchTools/Img2list/\#hc1](https://xeltalliv.github.io/ScratchTools/Img2list/\#hc1)  
* Decimal conversion :

[https://xeltalliv.github.io/ScratchTools/Img2list/\#dc1](https://xeltalliv.github.io/ScratchTools/Img2list/\#dc1)

These textures can be rendered in 3D with a Textured Tri Fill, with or without a depth buffer. For more information look into [Drawing Triangles](\#drawing-triangles).  
If the texture list is taking too much place in the project.json file, it can be compressed or stored in a costume. 

One common method is to compress the textures using tools like this one made by awesome-llama : [https://github.com/awesome-llama/TextImage](https://github.com/awesome-llama/TextImage), and use an image scanner to read the sprite’s costume data like this one made by Geotale : [https://scratch.mit.edu/projects/643721525](https://scratch.mit.edu/projects/643721525).

### 

### Using costumes

*(scratchtomv)*  
Since the equations involved in projecting costumes to 3D are complex, Chrome\_Cat’s STTF 2 is often used: [https://scratch.mit.edu/projects/888667870/](https://scratch.mit.edu/projects/888667870/).

How it is used : 

* The texture is converted with this tool made by Chrome\_Cat :  
  [https://joeclinton1.github.io/texture-converter-js/](https://joeclinton1.github.io/texture-converter-js/)  
* The costumes are imported in the renderer sprite.  
* They are rendered using STTF, see [Drawing Triangles \> Stamped](\#stamped)