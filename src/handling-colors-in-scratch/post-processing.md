# Post-processing
*jfs22, badatcode123, 26243AJ*

Post processing algorithms modify screen colors after all other effects, directly before rendering. These algorithms include tonemappers, gamma correction, color grading, and other color processing effects.

### Tonemapping

Tonemappers can change the tone of the image, since it directly affects the colors. Tonemappers are also used to increase the white point/remove it all together (the white point is when a color that is too bright turns white because of clamping). A few popular tonemappers used in scratch can be found below.  
[https://www.desmos.com/calculator/fzixe9wazx](https://www.desmos.com/calculator/fzixe9wazx)

### Gamma correction

Contrary to linear representations of colors, such as RGB, the human eye perceives brightness in a non-linear way. Our eyes are much more sensitive to changes in dark colors, and less sensitive to changes in bright colors. Thus, if we attempt to display a linear spectrum, to our eyes it will appear non-linear.

<img src="../images/image77.png">

With a linear display and only 8 bits per color channel, banding artifacts in the dark images would be more noticeable—without enough dark shades to create a smooth transition, our eyes would pick up on the harsh edges. To combat this, most modern displays apply a gamma function to the input RGB colors to create a more balanced spectrum. This perceptual linearity reduces those color banding artifacts, affording greater color depth to dark parts of images. The specific function to use is defined in a color representation standard called sRGB, which is standard for nearly all imagery on the web (including all colors Scratch can output), and is widely adopted by consumer displays.

<img src="../images/image61.png">

Although this is great news for our eyes, lighting calculations in 3D graphics must be done with linear RGB values to achieve physically accurate results. Thus, in order to produce accurate colors, when sampling an sRGB color/texture, we first need to convert it to linear RGB. This can be done by raising the color values to the power of 2.2. Likewise, when displaying linear RGB values, we need to convert them to sRGB by raising them to the power of 1/2.2. These calculations assume RGB values represented in 0 to 1 range.  
Note that this is technically only an approximation\* of the actual sRGB transfer function, the full conversion can be found below  
[https://www.desmos.com/calculator/5kppnk4gkx](https://www.desmos.com/calculator/5kppnk4gkx) (*by SpinningCube*)  
Using the exponent workaround, we can apply the x^(1/2.2) adjustment on Scratch:

```blocks
define gamma correction (R) (G) (B)
    set [output R v] to ([e ^ v] of (([ln v] of (R)) / (2.2)))
    set [output G v] to ([e ^ v] of (([ln v] of (G)) / (2.2)))
    set [output B v] to ([e ^ v] of (([ln v] of (B)) / (2.2)))
```

If speed is a concern, sqrt(x) can be used instead of x^(1/2.2) for a rougher approximation.

\*x^(1/2.2) is a *very* close approximation, quite common in game development, and even display manufacturers will often cheat by using *x*2.2 instead of the actual sRGB standard EOTF curve.

### Color grading

Like other post processing effects, color grading changes the colors of an image, although it is usually done artistically, and for no physical reasons. One example of color grading is posterization or quantization, this stylization method lowers the range of colors that are displayed. This effect is sometimes used with dithering to trick your eyes into thinking there is more color ranges in the images (there is only pure black, or pure r,g or b in this picture).

<img src="../images/image62.png" width="400">
