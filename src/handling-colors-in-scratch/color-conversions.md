# Color conversions
*scratchtomv, jfs22, badatcode123, 26243AJ*

RGB to decimal:   

```blocks
define RGB to Decimal (R) (G) (B)
    set pen color to ((round (B)) + ((256) * ((round (G)) + ((256) * (round (R))))))
```

RGBA to decimal:   

```blocks
define RGBA to Decimal (R) (G) (B) (A)
    set pen color to ((round (R)) + ((256) * ((round (G)) + ((256) * ((round (R)) + ((256) * (round (A))))))))
```

HEX to decimal: (Scratch/JS will automatically do the conversion)  

```blocks
define HEX to Decimal (HEX)
    set pen color to (join [0x] (HEX))
```
