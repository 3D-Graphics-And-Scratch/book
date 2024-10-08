# Object representation in Scratch
*scratchtomv*  

In Scratch, the basic way of storing data is by using variables, which can contain one information at a time. But how to store multiple pieces of information related to one object?

Let’s take the example of a dog : we need dog objects with multiple information related to it, like his name, his age, his race, his owner, etc.  
Would look like this in C\# : 

<img src="../images/image67.png">

It can also be represented as a table : 

| Data index | Property name |
| :--------- | :------------ |
| 1          | Name (string) |
| 2          | Age (int) |
| 3          | Race (string) |
| 4          | Owner Name (string) |

##

This simple scratch function create a dog (works for any kind of objects) :   

<img src="../images/image42.png" width="400" class="scratch-block">


…And is used like that  

<img src="../images/image12.png">

The object data can be accessed with two methods :   
This is the fastest way, but you need to increment the dog index by 4 when looping through the list of dogs :   

<img src="../images/image54.png" class="scratch-block">

This way is a bit slower and uses one more block, but is more straightforward :   

<img src="../images/image72.png" class="scratch-block">

This example accesses the age of the dog \#0, and returns the second item for this dog, in this case 4 :   

<img src="../images/image46.png" width="400" class="scratch-block">