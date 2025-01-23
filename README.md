# Calculator

A Simple Scientific Calculator.

# Functionality

## Operators

The calculator implements the following operations/functions :-

- Binary operators
  - Addition
  - Subtration
  - Multiplication
  - Division
  - Exponentiation
  - Modular Division
- Unary Operators
  - sin
  - cos
  - tan
  - sin^-1
  - cos^-1
  - tan^-1
  - log
  - ln
  - Unary Minus
  - Factorial
  - Square Root

## Error Handling

The calculator throws and error when it encounters an incorrect expression or if the user divides by zero. The display shows the error message along with an alert showing the same error message.

### Calculatons After Error

1. After an error if the user enters a number a new calculation is created in a new node, the previous error calculation is stored in history.
2. After an error if the user clicks on an operator the calculator starts a new calculation with the starting value of 0 and the operator,the previous error calculation is stored in history.

## History

Calculation history can be viewed in the display of the calculator, each calculation is also stored in the localHistory Object to prevent it from being lost after reloads.

This persistent history can be accessed by clicking the see full history button.

## Additional functionality

The calculator provides an AC(All Clear) as well as a C(Clear) button, both are integrated into the same button which changes functionality based on certain conditions.

It also provides a backspace button that deletes the latest character and deletes multiple characters together if they belong to the same function.

# A guide to comments in the code.

Throughout the code you may find comments spanning multiple lines having the syntax

```
Display
===============
Something here
```

The `Display` represents the calculator display.

Everything below the display represents the effect the code has on the display.

# Styling

A light theme as well as a dark theme is provided to the user.

**Light Theme**

![alt text](/screenshots/light-mode.png)

**Dark Theme**

![alt text](/screenshots/dark-mode.png)
