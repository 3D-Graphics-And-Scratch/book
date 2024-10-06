# Color representation in Scratch
*scratchtomv*  

Scratch doesn’t natively support RGB colors, you need to convert to a supported color format, such as : 

* Hexadecimal (ex: \#FF2D55)  
* Decimal (ex: 16711680\)

The pen color can be set with this block :   

```blocks
set pen color to (some color)
```

Or with the combination of these blocks (uses the HSVA model, and is slower) :   

```blocks
set pen (color v) to (50)
set pen (saturation v) to (50)
set pen (brightness v) to (50)
set pen (transparency v) to (50)
```
