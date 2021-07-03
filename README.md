## My annotation

- I used option `{delay: 100}` and `slowMo: 100` in some tests just for demonstration of how everything is going
- Also added **faker** dependecy to help generate data and created fixtures folder keep all my selectors and helpers folder which consists some useful functions  
- Some negative test scenarios fail as intended, since the name fields accept symbols, special characters, spaces, numbers on this web-page even though they should not 
- There are some negative testing scenarios for this particular web-page, but we can create much more depending of requirements
- I created your test scenarios and tried to cover the most common because we can create scripts for a very long time, but we need requirements for that

# Running tests

This project uses NodeJS( Node 12+ ) and NPM.

Run `npm install` to install dependencies.

To run the tests, run `npm test` and the they will begin to run in a "headfull" Chromium browser.

# Test Scenarios

Write an automated test to validate each of the following:

- The input fields exist
- A negative scenario using the input fields
- Input data into the fields
- Submit a name for male with a nickname and validate that a new name has been prepended to the list
- Submit twice for a female with a last initial and validate that a new name has been prepended to the list
