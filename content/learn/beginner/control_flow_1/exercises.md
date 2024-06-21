# Exercises

1. Write a CC to determine if the number stored in a variable `$a` is even or odd and print : `Number is Even` or `Number is Odd` depending on case. Verify the output for the following values of `$a` : 1 , 9 , 0, 10021 , -5\

2.  Predict the output of the following code snippets. If there is an error in the snippet what is the cause of the error and how can it be fixed ?\


    * \
      `{{$num1 := 10}}`\
      `{{if $num1}}`\
      `    {{num1 := 6}} {{$num1}}`\
      `{{end}}`\
      `{{if not (mod $num1 3)}}`\
      `    {{$num1}}`\
      `{{end}}`\
      `{{$num1}}`\

    * \
      `{{$name := "John"}}`\
      `{{if eq $name "John"}}`\
      `    {{$family_name := "Walters"}}`\
      `{{end}}`\
      `My name is: {{$name}} {{$family_name}}`
    * \
      `{{$string := "happy"}}`\
      `{{if gt $string "Sad"}}`\
      `    Be {{$string}}!`\
      `{{else}}`\
      `    Dont be {{$string}}!`\
      `{{end}}`


3. Write a CC to check if the member triggering the command has a nickname. If true, print `Hello` followed by his nickname. Otherwise print `Hello` followed by their username + discriminator.\

4. Let us assume tax is calculated is follows:\
   &#x20;   For income between $1 to $1000 : No tax.\
   &#x20;   For income between $1001 to $2000 : 10% on the amount above $1000\
   &#x20;   For income between $2001 to $5000 : Previous taxes + 30% tax on amount above $2000\
   &#x20;   For income over $5000 : Previous taxes + 40% tax on amount above $5000\
   Write a CC to calculate total tax assuming income is stored in a variable called $income. If tax is more than 0, print the exact tax as well as the tax rounded off to the nearest integer.&#x20;
