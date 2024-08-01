# Stamp Based Engine
*(bigbrain123321)*  

     To create a stamp based engine all the object data needs to be stored in lists. This data includes the object’s position, its costume (sprite that will be stamped for it), and its size. Additional data can be assigned to an object such as ghost effect, brightness, etc.  To do this the X coordinates can be stored in one list, the Y coordinates can be stored in another list, and the same goes for the Z coordinates, object costumes, etc.

Here is some example code demonstrating how you could go about creating and storing this object data:

![][image59]

It is important to remember to delete all the data stored in these lists when the project is first run before you add new objects.

![][image60]

Once we’ve gotten object creation done, we can now start talking about rendering these objects. First the 3D points that each object belongs to must be transformed around the camera using a rotation matrix. The transformed points will be stored in other lists (transformed x, transformed y, transformed z). Then the transformed points need to be projected into 2D coordinates that can be displayed on the screen. The projected points will also be stored in other lists (projected x and projected y). The contents of the transformed points lists and projected points lists need to be deleted every frame before transformations are applied.

Here is some example code:  
![][image61]

Once the points have been transformed, we need to sort the objects based on distance from the camera. This is to prevent objects that are farther away than being drawn over objects that are closer to the camera. To do this we can cycle through all the transformed point data and add the index of each point to a list (we can call this “sort ID” ) and the transformed z value to another list (this can be called “sort distances”). We use the transformed z value because it also represents the distance from the camera and it is faster to do this than using the distance formula. It is important that we only add this data to the sort ID and sort distances lists if and only if the point has a transformed z value that is greater than 0\. This is so objects behind the camera don’t get drawn and produce weird artifacts. It is important to remember to delete the contents of the sort ID and sort distances lists before looping through the points to add them to these lists.

Here is some example code for what was just discussed:

![][image62]

Once the objects have been prepared to be sorted, we can now sort the lists based on the objects’ transformed z values (distance from camera). Insertion sort or quicksort are fast sorting algorithms that we can use to sort the objects. It is important to note that when an item switches its index ( or place)  in the sort distances list, the corresponding item in the sort ID list also needs to be moved to that same index in the sort ID list. This ensures that each object’s index in the sort ID list matches with its original transformed z value in the sort distances list.

Now we can get to rendering. Since the list with the objects’ distances are sorted from closest to furthest (closest objects are at the start of the list, farther objects are towards the end of the list) we can loop through that list starting from the last item all the way to the first item. 

Here is some example code for a rendering script:  
![][image63]

In the code before going to the projected point that the object belongs to, the costume is switched to a “blank” costume (0 by 0 pixels) and the size is set to 1/0 (or “Infinity”). This is to allow stuff to go offscreen and that is important. The variable “RENDER: temp 3” is used to set the size of the object based off of the distance from the camera. Objects that are further away will be smaller than those closer to the camera (perspective). 

## 