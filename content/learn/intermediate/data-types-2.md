---
description: >-
  In this page you will learn about some more composite datatypes available in
  YAGPDB templating system.
---

# Data Types 2

This page will mainly deal with _custom data types_ in YAGPDB templating system. A **composite data type** or **compound data type** is any data type which can be constructed in a program using the programming language's primitive data types and other composite types. A **custom datatype** is one which is defined by the programmer and is not originally present in the language. They are usually derived from already available data types.

Now with all the terminology out of our way let us explore a few basic concepts which will help us understand the _custom data types_ in YAGPDB.

## General Composites

### 1) Arrays

An array is a numbered sequence of elements of a single type with a fixed length. Arrays start at index/position 0 and hence for a array of length n, the indices very from 0 to n-1.

Example:

`["one" "two" "another"]`

Consider the above array of strings with 3 elements : `"one"` `"two"` and `"another"`. Since it has 3 elements, the length of the array is 3. The first element `"one"` has the index `0` while the last element `"another"` has index `2`. We will explore the importance of indices shortly.

### 2) Slices

A slice by definition is a segment of an array with flexible length. In more plain words, a slice just like an array is a numbered sequence of elements of a single type which are indexable and has a length. However, unlike an array, this length is flexible. You can increase the length (or size) of a slice by adding elements to it or even decrease its size by removing elements from it. In YAGPDB templating system we will deal mostly with slices and hence we are free to add more elements or remove elements from the collection.

### 3) Maps

A map is an unordered collection of key-value pairs. Also known as an associative array, a hash table or a dictionary, maps are used to look up a value by its associated key. In golang the parent language on which YAGPDB templating system is based, maps keys and values must have a common type just like elements of an array. However this is something we would rarely have to concern ourselves with since the custom composite datatypes in YAGPDB templating system uses the concept of _interface{}_ data type to allow the support of multiple data types in values and in some circumstances even keys.

{% hint style="info" %}
**Extra Information:**  An interface type in Golang is kind of like a _definition_. It defines and describes the exact methods that _some other type_ must have. The interface type that specifies zero methods is known as the empty interface : `interface{}`

An empty interface may hold values of any type. (Every type implements at least zero methods.)

Empty interfaces are used by code that handles values of unknown type. Thus in form of a high level abstraction as far as YAGPDB templating package is concerned, we can treat `interface{}` as a special data type which allow storage of any data-type of our choice thus dealing with the strict single-type limitations of slices and maps.
{% endhint %}

## YAGPDB Custom Datatypes

### Slice or _`templates.Slice`_

This is a **custom composite data type** defined using an underlying data type _\[]interface{}_ or in other words an _interface{}_ slice. An integer slice can only store integers, a string slice can only store integers however due to the special properties of _interface{}_ data type which allows storage of unknown data type, we can store elements of any data type in a variable of datatype _templates.Slice_ . It is important to note that while _templates.Slice_ stores exactly the same data as an _\[]interface{}_ , it is a different datatype and has certain special "help methods" or which only work on _templates.Slice_.

{% hint style="info" %}
**Extra Information :** At this point it is important to make the distinction between a true **function** and a **method**. We will look at it only from the perspective of YAGPDB templating package. As discussed [earlier](https://learn.yagpdb.xyz/beginner/outputs\_1#template-structures-or-actions) a function is a template-structure that performs a specific task and can accept [arguments](https://learn.yagpdb.xyz/beginner/datatypes\_1#mathematical-functions). It may or may not produce an output. A **method** is very similar to a function in terms of accepting arguments , performing a task and optionally (but usually) producing an output. The major difference is that methods can be invoked on only specific datatypes for which those methods are defined and are invoked using the dot notation very similar to the "[property template-structures](https://learn.yagpdb.xyz/beginner/outputs\_1#template-structures-or-actions)". In fact we have already seen some methods earlier disguised as "property template-structures". the `.String` method which can be used on a user datatype viz. `.User.String` is actually a method that extracts the string notation for a user datatype and outputs it.
{% endhint %}

#### Working with Slice :

1. **Creating a Slice** `cslice`\
   Syntax : `cslice <elements> ...`\
   \
   `cslice` is a function used to create/define a new **Slice** (slice of datatype _templates.Slice_). It accepts the elements of slice as argument. As discussed earlier the elements can be of any datatype.\
   \
   Example :\
   `{{$new_slice := cslice 1 2 "new" 4.5 .User}}`\
   The above snippet creates a new slice with 5 elements as specified above and stores in a variable `$new_slice` .\\
2.  **Length of a Slice** `len`\
    Syntax : `len <composite datatype or string>`\
    \
    `len` is a function which can be used to find the length of any composite datatype (and even strings) including _templates.Slice_.\
    \
    Example :\
    `{{$new_slice := cslice 1 2 "new" 4.5 .User}}{{len $new_slice}}`

    Above snippet first creates a new slice as discussed above and then the `len` function finds the length of the `$new_slice` and outputs it producing the output `5` (since it has 5 different elements).\\
3.  **Indexing a Slice** `index`\
    Syntax : `index <composite datatype or string> <index>` \\

    `index` is a function which can be used to index or fetch elements of any composite datatype (and even indexing individual bytes in a String) including _templates.Slice_. As discussed earlier, the starting position of a slice is `0` and goes upto `length - 1`. It accepts the composite datatype to index as first argument and the index to fetch as second and outputs the value of the element.\
    \
    Example :\
    `{{$new_slice := cslice 1 2 "new" 4.5 .User}}{{index $new_slice 2}}`\
    In the above snippet, a new slice `$new_slice` is created as discussed above. Then the `index` function is used to fetch the third element (since `index` starts at 0, 2 corresponds to third element) of `$new_Slice` and outputs it producing `new` as output.\\
4. **Appending to a Slice** `.Append`\
   Syntax : `<Slice>.Append <element>`\
   \
   Appending refers to adding a single element to the end. We often want to grow Slices by adding and new element to the end of a Slice. For this, we use the `.Append` method. It is important to note that `.Append` method is only defined for a \_templates.Slice \_and not any generic slice. Append method outputs/returns a new slice with the added element but does not **modify** the original slice. It accepts one argument which is the element to be added.\
   \
   Example :\
   `{{$new_slice := cslice 1 2}}{{$appended_slice := $new_slice.Append 3.5}}`\
   `{{$new_slice}}`\
   `{{$appended_slice}}`\
   Above code snippet produces the output :\
   `[1 2]`\
   `[1 2 3.5]`\
   Explanation: As discussed above, initially a Slice `$new_slice` is created with `cslice`. Then `.Append` method is used on `$new_slice` with an argument `3.5`. This produces a **new** slice with the additional element `3.5` which is stored in `$appended_slice`. Finally the `$new_slice` and `$appended_slice` are output. Notice how `$new_slice` remains unchanged.\\
5. **Joining a slice element by element to a Slice** `.AppendSlice`\
   Syntax : `<Slice>.AppendSlice <other_slice>`\
   \
   Sometimes we want to join or merge two Slices by adding all elements of one Slice to the end of another Slice. `.AppendSlice` method enables us to do that. Just like `.Append` , `.AppendSlice` method can only be invoked on a _templates.Slice_ and produces a new Slice as output **without modifying** the original Slice or the slice being merged. It is important to note that the second slice to be joined can be in fact any generic slice and need not be a \_templates.Slice. \_It accepts the slice to be merged as an argument.\
   \
   Example :\
   `{{$slice1 := cslice 1 2}}{{$slice2 := cslice "one" "two" "three"}}{{$slice3 := $slice1.AppendSlice $slice2}}`\
   `{{$slice1}}`\
   `{{$slice2}}`\
   `{{$slice3}}`\
   \
   Output :\
   `[1 2]`\
   `["one" "two" "three"]`\
   `[1 2 "one" "two" "three"]`\
   \
   Explanation :\
   Initially 2 slices, `$slice1` and `$slice2` were created using `cslice` function. Then `.AppendSlice` method is invoked on `$slice1` with `$slice2` as argument thus producing a new slice with elements of `$slice2` added to the end of `$slice1` and stored in `$slice3`. Then all 3 of the slices are output. Note how neither the Slice on which the method is invoked nor the Slice being merged are altered rather producing a third slice which is a merge of the two Slices. \\
6. **Taking a sub-slice of a slice** `slice`:\
   Syntax : `slice <slice or string> <start> <stop (optional)>`\
   \
   The [`slice`](https://docs.yagpdb.xyz/reference/templates#string-manipulation) function can be used to produce sub-slices (as well as sub-strings!). What it means is that we can take a portion of a slice (say element number 3 to element number 6) and form a new slice out of it. It can work on any generic slice (and not just _templates.Slice_) and the newly produced slice retains the datatype of the parent slice. It accepts two or three arguments. The first argument is the slice (or string!) to produce a sub-slice from, the second being the start index and optionally a third stop index. If the stop index is not provided, it goes upto the end of the slice/string. Also note the indices specified are `start <= sub-slice/string < stop` . So if we want a sub-slice from index 2 to index 5 (that is element number 3 to element number 6), start should be 2 but stop should be 6.\
   \
   Example :\
   `{{$new_slice := cslice 1 2 3 4 5 6 7 8}}{{slice $new_slice 2 6}}`\
   \
   In the above snippet, initially `$new_slice` containing 8 elements is created using `cslice` function. Say we wanted to make a sub-slice using element number 3(index 2) upto element number 6 (index 5). This is what the above snippet does. Hence, the arguments to `slice` function are `start = 2` and `stop = 6` (since stop must be one greater than the index of last element).\
   \
   _Note:_ Do not confuse between a slice datatype and the `slice` function. Although they are represented by the same word, the slice datatype is an ordered collection of indexable elements while the `slice` function is used to form a sub-slice/string from a given slice/string. As you also might have guessed, this function can be used to remove the first or last elements from a slice as well (as well as middle elements if used with `.AppendSlice` ).\\
7.  **Ranging through a slice :**\
    Range will be covered in more depth in the[ next chapter](control-flow-2.md), but for now let us look at 3 typical scenarios we can come across with range while ranging through a slice. Note that below is valid for any generic slice and not just _templates.Slice_ .\
    \
    **Case 1:**

    ```
    {{range (cslice "one" "two" "three")}}
    {{.}}{{end}}
    ```

    Output :\
    ![](broken-reference) ![](../.gitbook/assets/DT2\_range\_1.JPG)\
    \
    In the above scenario, the `.` is modified and attains the value of successive elements of the slice.\\

    **Case 2:**

    ```
    {{range $value:= (cslice "one" "two" "three")}}
    {{$value}} : {{.}}{{end}}
    ```

    Output :\
    ![](broken-reference)![](../.gitbook/assets/DT2\_range\_2.JPG)\
    \
    In the above scenario, `.` is still given the successive elements of the slice. However, the variable `$value` also attains successive elements of the slice.\
    \
    **Case 3:**

    ```
    {{range $index,$value:= (cslice "one" "two" "three")}}
    {{$index}} : {{$value}} : {{.}}{{end}}
    ```

    Output :\
    ![](broken-reference) ![](../.gitbook/assets/DT2\_range\_3.JPG)\
    \
    In the above scenario, `.` is still given the successive elements of the slice. However, the variable `$value` also attains successive elements of the slice while the variable `$index` is passed the value of the successive indices of the slice (from `0` to `length -1`).\\
8. `.StringSlice`\
   Syntax : `<slice>.StringSlice <strict-flag (optional)>`\
   \
   This is a unique method which can be used to extract and return all string (or string representable) elements of a _template.Slice_ in form of a string slice (type _\[]string_). If none are _string_ an empty _\[]string_ slice is returned. It has an optional strict flag. f strict-flag is set to \_true \_it will return a _\[]string_ only if **all** elements are pure _string_, else `<no value>` is returned. This is also useful in a few cases where certain functions or methods only accept string slices and not a templates.Slice.\
   \
   Example :\
   `{{$slice := cslice "This" 1 "Is" "Fun"}}{{$new := $slice.StringSlice}}`\
   `{{joinStr "-" $new}}`\
   \
   Output :\
   `This-Is-Fun`\
   \
   In the above snippet, initially a Slice is created with `cslice` called `$slice`. Then on invoking `.StringSlice` method on `$slice` , a new slice of type _\[]string_ containing only the _string_ datatype elements of _$slice_ is created and stored in `$new`. Then we using `joinStr` function to join the elements of the _\[]string_ slice into a single string with `-` as separator and the resultant string is output.

{% hint style="info" %}
Up until now we have been hearing about generic slices but it is interesting to note that we have already dealt with other types of slices than _templates.Slice_ datatype. Recall that `.CmdArgs` was defined as a slice of string arguments. Hence it is also a slice but of datatype _\[]String_.
{% endhint %}

{% hint style="info" %}
Note that we have [already seen](https://learn.yagpdb.xyz/intermediate/control-flow-2#lets-go-deeper) the usage of the `seq` function in performing a repeated task a known number of times. However, did you know that seq actually also produces a slice. It is of type _\[]int_ and contains integers greater than equal to the first argument (start) upto one less than the second argument (stop).
{% endhint %}
