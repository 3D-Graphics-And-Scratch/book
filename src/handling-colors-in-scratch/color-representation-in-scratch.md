# Color representation in Scratch
*scratchtomv*  

Scratch supports the following color formats : 

* Hexadecimal (ex: \#FF2D55, 0xFF2D55)  
* Decimal (ex: 16711680\)

In scratch we’ll mainly use the decimal version as it’s faster to compute and takes fewer bytes in Scratch memory. 

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
