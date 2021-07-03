const faker = require("faker");
const selectors = require("../fixtures/selectors.js");
const helpers = require("../helpers/helperFuncs.js");

describe("Postive scenarios", () => {
  beforeEach(async () => {
    // Go to the starting url before each test.
    await page.goto("https://www.myrapname.com/");
  });

  it("Verify how many input text fields with display on the page in UI", async () => {
    const visibleInput = await page.$$(selectors.inputTextFeilds);
    expect(visibleInput).toHaveLength(2);
  });

  it("Verify that input fields accept letters", async () => {
    const name = faker.name.firstName(0);
    await page.type(selectors.firstName, name, { delay: 100 });
    await page.click(selectors.suggestMaleRapNameBtn);
    const value = await page.getAttribute(selectors.firstName, "value");
    expect(name).toBe(value);
  });

  it("Verify input into Last Initial field with First Name field", async () => {
    const name = faker.name.firstName(0);
    await page.fill(selectors.firstName, name);
    const initial = helpers.makeInitial();
    await page.fill(selectors.lastInitial, initial);
    await page.press(selectors.lastInitial, "Enter");
    const value = await page.getAttribute(selectors.lastInitial, "value");
    expect(initial).toBe(value);
  });

  it("Verify that input field name accept 24 characters", async () => {
    const text = helpers.makeString(24);
    await page.type(selectors.firstName, text);
    await page.click(selectors.suggestMaleRapNameBtn);
    const value = await page.getAttribute(selectors.firstName, "value");
    expect(value).toHaveLength(24);
  });

  it("Verify that a name for male with a nickname has been prepended to the list", async () => {
    const name = faker.name.firstName(0);
    await page.check(selectors.useNickName);
    await page.fill(selectors.firstName, name);
    await page.click(selectors.suggestMaleRapNameBtn);
    const listLenght = await page.$$(selectors.rapNamesInTable);
    const isRapNameVisible = await page.isVisible(selectors.rapName);
    expect(listLenght).toHaveLength(1);
    expect(isRapNameVisible).toBeTruthy();
  });

  it("Verify that a female name with a last initial has been prepended to the list twice", async () => {
    for (let i = 1; i <= 2; i++) {
      const name = faker.name.firstName(1);
      await page.uncheck(selectors.useNickName);
      await page.fill(selectors.firstName, name);
      await page.fill(selectors.lastInitial, helpers.makeInitial());
      await page.click(selectors.suggestFemaleRapNameBtn);
      const listLenght = await page.$$(selectors.rapNamesInTable);
      const isRapNameVisible = await page.isVisible(selectors.rapName);
      expect(listLenght).toHaveLength(i);
      expect(isRapNameVisible).toBeTruthy();
    }
  });
});

//* below are some negative testing scenarios for this particular web page, and we can create much more depending of requirements

describe.only("Negative scenarios", () => {
  beforeEach(async () => {
    await page.goto("https://www.myrapname.com/");
  });

  it("Verify that input field name doesn't accept empty string", async () => {
    await page.fill(selectors.firstName, "");
    await page.click(selectors.suggestMaleRapNameBtn);
    const errorText = await page.textContent(selectors.errMsg);
    expect(errorText).toBe("You must enter your first name.");
  });

  it("Verify that input field name doesn't accept string exceeding 24 characters", async () => {
    const text = helpers.makeString(25);
    await page.type(selectors.firstName, text);
    await page.click(selectors.suggestMaleRapNameBtn);
    const errorText = await page.textContent(selectors.errMsg); //? what here
    expect(errorText).toBe("You must enter your first name.");
  });

  it("Verify that error message pops up when we send request only with Last Initial field filled", async () => {
    const initial = helpers.makeInitial();
    await page.fill(selectors.lastInitial, initial);
    await page.press(selectors.lastInitial, "Enter");
    const errorText = await page.textContent(selectors.errMsg); //? what here
    expect(errorText).toBe("You must enter your first name.");
  });

  it("Verify that input field name doesn't accept symbols and special characters", async () => {
    const text = helpers.makeSymbolString(10);
    await page.type(selectors.firstName, text);
    await page.click(selectors.suggestMaleRapNameBtn);
    const errorText = await page.textContent(selectors.errMsg); //? what here
    expect(errorText).toBe("You must enter your first name.");
  });

  it("Verify that input field name doesn't accept name having numerical numbers", async () => {
    const name = faker.name.firstName(0);
    const number = faker.datatype.number(2);
    await page.fill(selectors.firstName, `${name + number}`);
    await page.click(selectors.suggestMaleRapNameBtn);
    const errorText = await page.textContent(selectors.errMsg);
    expect(errorText).toBe("You must enter your first name.");
  });

  it("Verify that input field name doesn't accept name having spaces", async () => {
    const name = faker.name.firstName(0);
    await page.fill(selectors.firstName, ` ${name} `);
    await page.click(selectors.suggestMaleRapNameBtn);
    const errorText = await page.textContent(selectors.errMsg);
    expect(errorText).toBe("You must enter your first name.");
  });

  it("Verify that input field name doesn't accept name having symbols", async () => {
    const name = faker.name.firstName(0);
	const symbol = helpers.makeSymbolString(2)
    await page.fill(selectors.firstName, `${name + symbol}`);
    await page.click(selectors.suggestMaleRapNameBtn);
    const errorText = await page.textContent(selectors.errMsg);
    expect(errorText).toBe("You must enter your first name.");
  });
});
