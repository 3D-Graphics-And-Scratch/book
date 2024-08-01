# Best practices when writing scratch code
*(scratchtomv)*

* Avoid using scratch comments.  
* Find appropriate variable names.  
* Avoid using temporary variables, it will create conflicts at some points although they can be useful for reducing the amount of variables.  
* Use functions instead of spaghetti code (but don’t overuse).  
* Use functions with “Run without screen refresh” when possible, instead of using turbo mode (except when the function has a very large loop).

![][image11]

* Don’t use clones for resource-intensive computation. In 3D programming we will almost never use them.  
* Try to avoid most built-in scratch functions. You should really be working with variables, lists and operators exclusively.  
* Use local variables when you can instead of global ones.  
* Clean and organize your code.  
* Don’t use one big sprite for all your code, it will slow down your project when in editor \[i’m devastated \- bozzle\] \[same \- jfs22\] \[heartbraking \- spog\] \[died of sad \- derpy\] \[literally crying rn \- spinning\]

[image11]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAAiCAYAAAB8+D0EAAAEBklEQVR4Xu2av2qUQRTF8wb6BvoIPoqdndgqWEVbsUtjZW0hFtYBH8CAliJ22m2MWoiFgmgQkZWzeMLNyZ0v33x7P8Pq+cFAMntn7t85JLBbS2OMKWBLN4wxZgoWE2NMCRYTY0wJFhNjTAkWE2NMCRYTY0wJFhNjTAkWE2NMCRYTY0wJFhNjTAmTxOTp68PlxVvvVmvr2qJr4QzOZ+zce7C8cvV2c93c3tEjG8Gjx0/S2OMebFp2f5Oz9v8/cVazPdesTRKTC9sHJ0SiZ0FQMiAmQwmi6LDB2nQ017ka3IPGZOaDtT6Les81a5PERMVhyso4bZj3nr04UvLF/nv9eKPQXOdqcA8ak5kPi8kfVBiG1u7Lb6szX77/Wq1qMeGegs+xj8+xAG3VB/+9GoJ/EcW/imI8cZ+Nop+scZorG6x38Z5oG/3izJBt5hvwDtSJtdSYWsTaRvQ866W11dhxRmMB9MPaEM0RRNtIZkt/jJ9+s/NKq+cgyzfax3plYtKqA6C/6FN9AdyhccVeg55Z62FWMbm7+3llDxG5dOfDaq0jJllBp4iJNqr1OCKxASQOhA5FfADZg9Zcs/sB449xc2B0aJhHzCXzDdYRE42nhcbSInsAoBVP1tsxtqTXX4S5a/5Z7Ql7Fe+Os0NacWVzQbAfZ42/D9Ezaz2UiMnD51+X52+8PbZ3+f7HI3v8rGcyUEg2JFtZoZm8kg3cGNsWfHSx0Gi+NiDa0C570DpcbLDa6f0AP8cBinBAWavsTqAxA41pCPYkiwG0Hl0GfGb3DN3PM2Mekd6vv5Mx+ce8Inycug9iD0lLTLK4Yj8VChU/5xsayqNn1nooExOw+PTzmB321fY0MdEESatA2iRSLSaEjYNtbHBsqjY+a5zm2tNgPpzW4MWhzO4E64pJBs7yzrnFROmxbfkbk/8UMcmgr+ivFRf2daZ6YGxxJrK5yGathxIxwXp18OOYzd6bwxM264gJk9RHlD2KuF8tJryDgkLYnOyerHGaa0+DOVw6YMwjxsBBUrhfKSaAvrNYWkx5RNrbMbak5W9M/uyF1jTu60PMetsjJkNx8Ux2LhLnJYsHZLPWQ5mY4N8cCAqX/tujK2OoaACfa8M4tFrQOMgcJBZK6REToDGA+HiUrHGaa0+D4+DGnDmc8Q7axjrEWKeIicZDKFCEA6w1YYwc7tYjavU2izPaRjLblr/MVmmJCcjybYlqj5gAnI+CALTeIKuBznfPrPUwSUzOXd8/IQ49C99TMcb8W0wSE3yDFYIw5ctrONP6BqwxZnOZJCbGGKNYTIwxJVhMjDElWEyMMSVYTIwxJVhMjDElWEyMMSVYTIwxJVhMjDElWEyMMSVYTIwxJVhMjDEl/AYjGAnWKC5H3wAAAABJRU5ErkJggg==>