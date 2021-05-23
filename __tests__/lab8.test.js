describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500'); 
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    }); 
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    const entries = await page.$$('journal-entry'); 
    const entry = await entries[0]; 
    await entry.click();
    let url = await page.url(); 
    expect(url).toBe('http://127.0.0.1:5500/#entry1');
    // let flag = false; 
    // if (url.includes('/#entry1')) {
    //   flag = true; 
    // }
    // expect(flag).toBe(true);
  }, 10000);

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    const title = await page.$eval('h1', (header) => {
      return header.innerHTML;
    });
    expect(title).toBe("Entry 1");
  }, 10000);

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
    const entry = await page.$eval('entry-page', (entries) => {
      return entries.entry;
    }); 
    expect(entry.title).toBe("You like jazz?")
    expect(entry.date).toBe("4/25/2021")
    expect(entry.content).toBe("According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.")
    expect(entry.image.src).toBe("https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455") 
    expect(entry.image.alt).toBe("bee with sunglasses")

  }, 10000); 

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’ 
    const name = await page.$eval('body', (body) => {
      return body.className;
    }); 
    expect(name).toBe("single-entry")
  }, 10000);

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings” 
    const setting = await page.$('img[alt="settings"]');
    await setting.click();
    let url = await page.url(); 
    expect(url).toBe('http://127.0.0.1:5500/#settings');
    // let flag = false;
    // if (url.includes('/#settings')) {
    //   flag = true;
    // }
    // expect(flag).toBe(true);
  }, 10000);

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings” 
    const title = await page.$eval('h1', (header) => {
      return header.innerHTML;
    });
    expect(title).toBe("Settings");
  }, 10000);

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’ 
    const name = await page.$eval('body', (body) => {
      return body.className;
    }); 
    expect(name).toBe("settings") 
  }, 10000);

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’ 
    const entry = await page.goBack();
    let url = await page.url(); 
    expect(url).toBe('http://127.0.0.1:5500/#entry1');
    // let flag = false; 
    // if (url.includes('/#entry1')) {
    //   flag = true; 
    // }
    // expect(flag).toBe(true);
  }, 10000);

  // define and implement test11: Clicking the back button once should bring the user back to the home page 
  it('Test11: Clicking the back button, new URL should have no hash tag', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’ 
    const entry = await page.goBack();
    let url = await page.url(); 
    expect(url).toBe('http://127.0.0.1:5500/')
    // let flag = false;
    // if (url.includes('')) {
    //   flag = true; 
    // }
    // expect(flag).toBe(true);
  }, 10000);

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries” 
  it('Test12: On home page - header title should be Journal Entries', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings” 
    const title = await page.$eval('h1', (header) => {
      return header.innerHTML;
    });
    expect(title).toBe("Journal Entries");
  }, 10000);

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On home page - <body> element should not have any class attribute', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’ 
    const name = await page.$eval('body', (body) => {
      return body.className;
    }); 
    expect(name).toBe("") 
  }, 10000);

  // define and implement test14: Verify the url is correct when clicking on the second entry 
  it('Test14: Clicking second <journal-entry>, new URL should contain /#entry2', async () => {
    const entries = await page.$$('journal-entry'); 
    const entry = await entries[1]; 
    await entry.click();
    let url = await page.url(); 
    expect(url).toBe('http://127.0.0.1:5500/#entry2');
    // let flag = false;
    // if (url.includes('/#entry2')) {
    //   flag = true; 
    // }
    // expect(flag).toBe(true);
  }, 10000);

  // define and implement test15: Verify the title is current when clicking on the second entry 
  it('Test15: On second Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    const title = await page.$eval('h1', (header) => {
      return header.innerHTML;
    });
    expect(title).toBe("Entry 2");
  }, 10000);

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry 
  it('Test16: On first Entry page - checking <entry-page> contents', async () => {
    const entry = await page.$eval('entry-page', (entries) => {
      return entries.entry;
    }); 
    expect(entry.title).toBe("Run, Forrest! Run!")
    expect(entry.date).toBe("4/26/2021")
    expect(entry.content).toBe("Mama always said life was like a box of chocolates. You never know what you're gonna get.")
    expect(entry.image.src).toBe("https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg") 
    expect(entry.image.alt).toBe("forrest running")

  }, 10000); 

  // Verify the url is correct when clicking on the third entry
  it('Test17: Clicking third <journal-entry>, new URL should contain /#entry3', async () => {
    await page.goBack();
    const entries = await page.$$('journal-entry'); 
    const entry = await entries[2]; 
    await entry.click(); 
    let url = await page.url(); 
    expect(url).toBe('http://127.0.0.1:5500/#entry3'); 
    // let flag = false;
    // if (url.includes('/#entry3')) {
    //   flag = true; 
    // }
    // expect(flag).toBe(true);
  }, 10000);

  // Verify the title is current when clicking on the second entry
  it('Test18: On third Entry page - checking page header title', async () => {
    const title = await page.$eval('h1', (header) => {
      return header.innerHTML;
    });
    expect(title).toBe("Entry 3");
  }, 10000);

  // Verify the url is correct when clicking on the fourth entry
  it('Test19: Clicking fourth <journal-entry>, new URL should contain /#entry4', async () => {
    await page.goBack();
    const entries = await page.$$('journal-entry'); 
    const entry = await entries[3]; 
    await entry.click(); 
    let url = await page.url(); 
    expect(url).toBe('http://127.0.0.1:5500/#entry4'); 
    // let flag = false;
    // if (url.includes('/#entry4')) {
    //   flag = true; 
    // }
    // expect(flag).toBe(true);
  }, 10000);

  // Verify the title is current when clicking on the fourth entry
  it('Test20: On fourth Entry page - checking page header title', async () => {
    const title = await page.$eval('h1', (header) => {
      return header.innerHTML;
    });
    expect(title).toBe("Entry 4");
  }, 10000);
});
