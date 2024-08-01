# Storing large amount of data in Scratch
*scratchtomv*  

Lists are one of the only ways of storing large amounts of data in Scratch. They are pretty basic and only have a restricted set of operations that can be applied on them, some of them being very slow like “index of”. In large projects like 3D ones, they will often be thousands long, with the maximum being 200,000 items at runtime on Scratch.   
Scratch stores lists in the project.json file contained in the .sb3 file. This project.json file has a 5MB size limit, which limits list size too.