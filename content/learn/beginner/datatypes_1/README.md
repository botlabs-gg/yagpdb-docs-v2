---
description: >-
  In this page, you'll learn about the basic data types available in YAGPDB
  templating system
---

# Data Types 1

## Literals and Basic data types

### String

A string is a sequence of characters. It simply stores textual data. String literals can be created in two ways:

1. **Using Double Quotes:** String literals can be created by enclosing a sequence of characters within double quotation marks `"` . It cannot contain newlines and allows usage of special escape sequences to represent certain characters. Some of them are :\
   \
   &#x20;This produces a newline character (similar to pressing the enter key)\
   `\"` This produces a double quotation mark `"` . This allows us to use double quotes inside quoted string literals.\
   `\\` This creates a backslash character. (only using a single backslash character denotes an escape sequence hence this is necessary)\
   \
   A more detailed list of other escape sequences can be found [here](http://xahlee.info/golang/golang\_string\_backslash\_escape.html).\
   **Example :** `"Yagpdb is a nice bot.\nI like it very much."`\\
2. **Using Backticks:** String literals can also be created in form of a \_raw string literal \_by enclosing it in backticks `` ` ``. It can contain all characters including newlines except for the backtick character. It does not support any escape sequences and is usually used to conveniently produce string literals which span multiple lines.\
   \
   **Example :**\
   `` `Yagpdb is a nice bot. ``\
   `` I like it very much` ``

The _`string`_ datatype is the most common Data Type for storing string literals.

### Integer

Integers – like their mathematical counterpart – are numbers without a decimal component. In Yagpdb templating code, the maximum range of _int_ data type is from : -9223372036854775808 to 9223372036854775807. There are [different ways](https://golang.org/ref/spec#Integer\_literals) in which an integer literal can be created/specified but irrespective of how they are specified, they represent an unique number.The _`int`_ datatype is the most common Data Type for storing integer literals. Some common ways to specify integer literals are :

1. **As base 10 number:** As intimidating as it sounds, these are our normal plain numbers. So normal digits can be used to create number literals (remember that the first digit should be non zero for syntax reasons).\
   `{{$x := 105}}`\
   Above statement assigns a [variable](https://yagpdb.gitbook.io/learnyagpdb/beginner/datatypes\_1#variables) named x with value 105 (base-10)\\
2. **As a hexadecimal number:** You might have come across [hexadecimal numbers](https://simple.wikipedia.org/wiki/Hexadecimal) while reading about memory locations or hexadecimal codes for colors etc. While specifying a hexadecimal number, we have to precede the number with `0x` to denote that the following number represents a hexadecimal number. You can use digits from `0` to `9` and letters `a` to `e` to specify a hexadecimal number. Capitalization of the letters do not matter.\
   `{{$hex := 0xA1}}`\
   Above statement assigns a [variable](https://yagpdb.gitbook.io/learnyagpdb/beginner/datatypes\_1#variables) named hex with value : 161(base-10) using an integer literal specified in hexadecimal format.

{% hint style="info" %}
Preceding an integer literal with 0 makes it interpreted as a number specified in [octal](https://simple.wikipedia.org/wiki/Octal) notation (base-8).\
Example : `{{$x := 011}}`\
stores 9 (base-10) in [variable](https://yagpdb.gitbook.io/learnyagpdb/beginner/datatypes\_1#variables) named x and not 11. In fact, `9` is written as `11` in octal notation.
{% endhint %}

{% hint style="info" %}
_int64_ is another data type which is very similar to _int_ but is always 64 bits size irrespective of compiler. int64 can be converted to int using the `toInt` function. Reverse can be achieved using `toInt64` function. Type conversion functions are listed [here](https://docs.yagpdb.xyz/reference/templates#type-conversion).

Example : `{{$num := toInt64 105}}`\
Stores 105 (base-10) in [variable](https://yagpdb.gitbook.io/learnyagpdb/beginner/datatypes\_1#variables) called num but as _int64_ data type and not _int_.\
By default however (without explicit `toInt64` conversion) Integer literals are stored as _int_ data type.
{% endhint %}

### Float

Floating point numbers are numbers that contain a decimal component (real numbers). They are specified with a number with a decimal point.\
Example : `9.5` `12.3` `0.008`

Floating point literals also support some other formats such as scientific notation etc. elaborated [here](https://golang.org/ref/spec#Floating-point\_literals).

The _`float64`_ is the most common datatype you will encounter in Yagpdb for storing floating point literals.

{% hint style="info" %}
Note `10` represents an integer literal while `10.0` represents a floating point literal.\
Example : `{{$num := 20.0}}`\
Stores 20.0 (base-10) in a [variable](https://yagpdb.gitbook.io/learnyagpdb/beginner/datatypes\_1#variables) called num with data type _float64_ and not _int_.
{% endhint %}

{% hint style="info" %}
function `toFloat` can be used to convert int to _float64_. reverse can be achieved via `toInt` function. However when a float is converted to integer, the decimal part is stripped in place of rounding it to nearest integer.\
Example : `{{$x := toInt 12.98}}`\
In the above statement, 12 (base-10) is stored in the [variable](https://yagpdb.gitbook.io/learnyagpdb/beginner/datatypes\_1#variables) named x and not 13.
{% endhint %}

{% hint style="warning" %}
Unless otherwise specified, all numbers (integers/float) will be base-10 by default in the remaining sections of this website.
{% endhint %}

### Boolean

A boolean value (named after George Boole) is a special 1 bit integer type used to represent true and false (or on and off). There are two predefined boolean constants (both lowercase only) : `true` and `false` .\
Boolean values are very critical to control flow and are discussed in further detail there. A logical comparison function ( checking if two numbers are equal, checking if one number is greater than another etc.) and logical operation based functions ( and , or and not operations) will produce boolean values as output.\
\
**Example:** `{{$x := true}} {{$y := not $x}}`\
Above snippet will store `true` in [variable](https://yagpdb.gitbook.io/learnyagpdb/beginner/datatypes\_1#variables) x and `false` in [variable](https://yagpdb.gitbook.io/learnyagpdb/beginner/datatypes\_1#variables) y.

## Variables

A variable is a storage location, with a specific type and an associated name. It can be used to store the output of an action or literal values( string , int , float etc). Variable names may contain letters, numbers or the `_` (underscore) symbol. A good programming habit is to start a variable name with a letter. In Custom Command codes, all variable names should be preceded by the dollar sign `$` to identify it as a variable. A action containing just the variable name simply outputs it's contents (for complex data types it follows certain predefined formats). [Further reading in context of GO](https://golang.org/ref/spec#Letters\_and\_digits).

**Example :**

```go
{{$name1 := "Satty"}} {{$favourite_number1 := 1}}
{{$name2 := "Yagpdb"}} {{$favourite_number2 := -1}}
{{$fun := "1\n2\n3\nDone printing code."}} 
{{$name1}} : {{$favourite_number1}}
{{$name2}} : {{$favourite_number2}}
{{$fun}}
```

**Output :**

`Satty : 1`\
`Yagpdb : -1`\
`1`\
`2`\
`3`\
`Done printing code`

**Short Notes :**

In the above code snippet you can notice the `:=` operator. This operator is used to define a new variable and assigns it the value of the action's output or literal to its right. Every variable **must** be defined at least once before using it. Another operator `=` called assignment operator is used to assign a value a previously define variable. This will be covered in further detail later on. [Further reading in context of GO.](https://www.godesignpatterns.com/2014/04/assignment-vs-short-variable-declaration.html)

{% hint style="info" %}
Note: All preceding and trailing white spaces (eg: space, newlines ) are always trimmed away in final output matching discord behavior.
{% endhint %}

{% hint style="info" %}
Note : Empty variable name is also allowed, that is`{{$ := "a"}}`is valid.
{% endhint %}

## Example Codes

### Example 1

````go
{{$user_string := .User.String}}
{{$quote_of_the_day := "No one is perfect - that’s why pencils have erasers."}}
{{$smiley := `                          _ (o\-~-/o) _
                        (o\ ( ಠ ಠ ) /o)
                         \ \( (Y) )/ /
                          \ )     ( /
                            /       \

                     _____ /   )_(   \ ____
                     =_==(   (===)   )=_=
                         |   \   ) (   /  |
                    \|vVv(__/,v#\__)V/|/|..`}}
Hello {{$user_string}}
Remember that : {{$quote_of_the_day}}
```{{$smiley}}```   
````

#### Output :

![](<../../.gitbook/assets/image (6).png>)

###

### Example 2

```go
{{$x := 5}}

{{$x}} X 1  = {{mult $x 1}}
{{$x}} X 2  = {{mult $x 2}}
{{$x}} X 3  = {{mult $x 3}}
{{$x}} X 4  = {{mult $x 4}}
{{$x}} X 5  = {{mult $x 5}}
{{$x}} X 6  = {{mult $x 6}}
{{$x}} X 7  = {{mult $x 7}}
{{$x}} X 8  = {{mult $x 8}}
{{$x}} X 9  = {{mult $x 9}}
{{$x}} X 10 = {{mult $x 10}}
```

#### Explanation :

Above is an example of how variables can be extremely useful. Notice that by simply changing the value of the number stored in variable x, you can generate it's multiplication table.

#### **Mathematical Functions :**

`mult` here is a function type action which we have seen before. It multiplies the numbers provided to it (written after it) and gives the value of their product. The values that some function based actions similar to `mult` accept (or do their computation on) are called **arguments**. The data type of the value returned by the `mult` function is the data type of it's first argument.\
For example : `{{$x := mult 1 2.5}}` stores `2` in variable x.\
`{{$y := mult 1.0 2.5}}` stores `2.5` in variable y.\
\
The `mult` function can also accept more than 2 arguments and works exactly the same way.\
For example : `{{$z := mult 2.2 2 4}}` stores `17.6` in variable z.\
There are other mathematical function for addition, subtraction, division, exponentiation etc. which work very similar to the `mult` function elaborated in the [docs](https://docs.yagpdb.xyz/reference/templates#math-functions).\
Further Example : `{{$z := div 12 5}}` stores `2` in variable z.\
`{{$z := div (toFloat 12) 5}}` stores `2.4` in variable z.

#### Output :

![](<../../.gitbook/assets/image (7).png>)

{% hint style="success" %}
**Pro Tip :** You can use the printf function to check the value( with %v) contained by a variable and it's datatype(with %T).\
\
**Example :** `{{$x := 1.5}} Type : {{printf "%T" $x}} Value : {{printf "%v" $x}}`\
The above code snippet will output :\
`Type : float64 Value : 1.5`\
Notice how printf can accept arguments as well. More on printf can be found [here](https://golang.org/pkg/fmt/).
{% endhint %}
