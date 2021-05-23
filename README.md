# Lab8_Starter

## Partners: Jialu Sui, Jiachen Ma


## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)
   1.

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.
    No. Since writing a message and sending a message are 2 different feature, and since unit testing could not test how individual components interact with each other on an application/feature level, we should not use unit testing here.
   

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters
   Yes. Since preventing user from typing more than 80 characters is a single component/feature of the entire application, we could use unit testing here.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?
    It will run the tests without a browser UI. It would only test and show the output in your terminal.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?
   
   beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500'); 
    const setting = await page.$('img[alt="settings"]');
    await setting.click();
    await page.waitForTimeout(500);
  });

