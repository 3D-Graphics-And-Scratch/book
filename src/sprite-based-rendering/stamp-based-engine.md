# Stamp Based Engine
*bigbrain123321*  

To create a stamp based engine all the object data needs to be stored in lists. This data includes the object’s position, its costume (sprite that will be stamped for it), and its size. Additional data can be assigned to an object such as ghost effect, brightness, etc.  To do this the X coordinates can be stored in one list, the Y coordinates can be stored in another list, and the same goes for the Z coordinates, object costumes, etc.

Here is some example code demonstrating how you could go about creating and storing this object data:

```blocks
define OBJECTS | add 2.5D sprite | x: (x) y: (y) z: (z) costume: (costume) size: (size) ghost effect: (ghost)
    add (x) to [OBJ: x v]
    add (y) to [OBJ: y v]
    add (z) to [OBJ: z v]
    add (costume) to [OBJ: costume v]
    add (size) to [OBJ: size v]
    add (ghost) to [OBJ: ghost effect v]
```

It is important to remember to delete all the data stored in these lists when the project is first run before you add new objects.

```blocks
delete all of [OBJ: x v]
delete all of [OBJ: y v]
delete all of [OBJ: z v]
delete all of [OBJ: costume v]
delete all of [OBJ: size v]
delete all of [OBJ: ghost effect v]
```

Once we’ve gotten object creation done, we can now start talking about rendering these objects. First the 3D points that each object belongs to must be transformed around the camera using a rotation matrix. The transformed points will be stored in other lists (transformed x, transformed y, transformed z). Then the transformed points need to be projected into 2D coordinates that can be displayed on the screen. The projected points will also be stored in other lists (projected x and projected y). The contents of the transformed points lists and projected points lists need to be deleted every frame before transformations are applied.

Here is some example code:  

```blocks
delete all of [RENDER: tx v]
delete all of [RENDER: ty v]
delete all of [RENDER: tz v]
delete all of [RENDER: px v]
delete all of [RENDER: py v]
set [RENDER: index v] to (1)
repeat (length of [OBJ: x v])
    set [RENDER: temp 1 v] to ((item (RENDER: indx) of [OBJ: x v]) - (CAMERA: X))
    set [RENDER: temp 2 v] to ((item (RENDER: indx) of [OBJ: y v]) - (CAMERA: Y))
    set [RENDER: temp 3 v] to ((item (RENDER: indx) of [OBJ: z v]) - (CAMERA: Z))
    set [RENDER: x v] to ((((RENDER: temp 1) * (item (1) of [matrix v])) + ((RENDER: temp 2) * (item (2) of [matrix v]))) + ((RENDER: temp 3) * (item (3) of [matrix v])))
    set [RENDER: y v] to ((((RENDER: temp 1) * (item (4) of [matrix v])) + ((RENDER: temp 2) * (item (5) of [matrix v]))) + ((RENDER: temp 3) * (item (6) of [matrix v])))
    set [RENDER: z v] to ((((RENDER: temp 1) * (item (7) of [matrix v])) + ((RENDER: temp 2) * (item (8) of [matrix v]))) + ((RENDER: temp 3) * (item (9) of [matrix v])))
    add (RENDER: x) to [RENDER: tx v]
    add (RENDER: y) to [RENDER: ty v]
    add (RENDER: z) to [RENDER: tz v]
    add ((CAMERA: FOV) * ((RENDER: x) / (RENDER: z))) to [RENDER: px v]
    add ((CAMERA: FOV) * ((RENDER: y) / (RENDER: z))) to [RENDER: py v]
    change [RENDER: index v] by (1)
end
```

Once the points have been transformed, we need to sort the objects based on distance from the camera. This is to prevent objects that are farther away than being drawn over objects that are closer to the camera. To do this we can cycle through all the transformed point data and add the index of each point to a list (we can call this “sort ID” ) and the transformed z value to another list (this can be called “sort distances”). We use the transformed z value because it also represents the distance from the camera and it is faster to do this than using the distance formula. It is important that we only add this data to the sort ID and sort distances lists if and only if the point has a transformed z value that is greater than 0\. This is so objects behind the camera don’t get drawn and produce weird artifacts. It is important to remember to delete the contents of the sort ID and sort distances lists before looping through the points to add them to these lists.

Here is some example code for what was just discussed:

```blocks
delete all of [SORT: ID v]
delete all of [SORT: distance v]
set [RENDER: index v] to (1)
repeat (length of [RENDER: tx v])
    set [RENDER: z v] to (item (RENDER: index) of [RENDER: tz v])
    if <(RENDER: z) > (0)> then
        add (RENDER: index) to [SORT: ID v]
        add (RENDER: z) to [SORT: distance v]
    end
    change [RENDER: index v] by (1)
end
```

Once the objects have been prepared to be sorted, we can now sort the lists based on the objects’ transformed z values (distance from camera). Insertion sort or quicksort are fast sorting algorithms that we can use to sort the objects. It is important to note that when an item switches its index ( or place)  in the sort distances list, the corresponding item in the sort ID list also needs to be moved to that same index in the sort ID list. This ensures that each object’s index in the sort ID list matches with its original transformed z value in the sort distances list.

Now we can get to rendering. Since the list with the objects’ distances are sorted from closest to furthest (closest objects are at the start of the list, farther objects are towards the end of the list) we can loop through that list starting from the last item all the way to the first item. 

Here is some example code for a rendering script:  

```blocks
set [RENDER: temp 1 v] to (length of [SORT: ID v])
repeat (length of [SORT: ID v])
    set [RENDER: temp 2 v] to (item (RENDER: temp 1) of [SORT: ID v])
    set [RENDER: z v] to (item (RENDER: temp 2) of [RENDER: tz v])
    set [RENDER: temp 3 v] to (((1) / ((RENDER: z) / (CAMERA: FOV))) * (item (RENDER: temp 2) of [OBJ: size v]))
    switch costume to (BLANK v)
    set size to ((1) / (0)) %
    go to x: (item (RENDER: temp 2) of [RENDER: px v]) y: (item (RENDER: temp 2) of [RENDER: py v])
    if <(RENDER: temp 3) < (100)> then
        switch costume to (item (RENDER: temp 2) of [OBJ: costume v])
        set size to (RENDER: temp 3) %
    else
        set size to (RENDER: temp 3) %
        switch costume to (item (RENDER: temp 2) of [OBJ: costume v])
    end
    set [ghost v] effect to (item (RENDER: temp 2) of [OBJ: ghost effect v])
    point in direction (90)
    stamp
    change [RENDER: temp 1 v] by (-1)
end
```

In the code before going to the projected point that the object belongs to, the costume is switched to a “blank” costume (0 by 0 pixels) and the size is set to 1/0 (or “Infinity”). This is to allow stuff to go offscreen and that is important. The variable “RENDER: temp 3” is used to set the size of the object based off of the distance from the camera. Objects that are further away will be smaller than those closer to the camera (perspective). 

## 
