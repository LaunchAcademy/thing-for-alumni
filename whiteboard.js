// define a function called factorial and returns the factorial of that number

const factorial = (num) => {
  let result = 1
  for (let i = num; i>1; i--) { 
    result *= i
  }
  return result 
}

// the function is invoked inside of the function declaration 
// boundary condition 
// probably going to invoke `factorial` with a NEW argument
// treat the function declaration as an already computed expression

const factorialize = (num) => {
  if (num === 1) {
    return 1
  }
  return num * factorial(num - 1)
}