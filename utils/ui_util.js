const {Builder, By, Key, Options, Capabilities, until}  = require('selenium-webdriver');

get_locator_info = (str_raw) => {
    return (str_raw.indexOf('//')>-1) ? ['x', str_raw] : ['css', str_raw];
}
get_driver = () => {
    return global.driver
};
exports.wait_for = async (str_loc) => {
    try {
        const driver = await get_driver();
        await (arr_loc = get_locator_info(str_loc));
        switch (arr_loc[0].toLowerCase()) {
            case 'x':
                    await(res = driver.wait(until.elementLocated(By.xpath(arr_loc[1])),10000));
                break;
            case 'css':
                await(res = driver.wait(until.elementLocated(By.css(arr_loc[1])),10000));
                break;
        }
        return res;
    } catch (ex) {
        console.log('Wait_For EXCEPTION OCCURED \n', ex.toString());
        return(res(false));
    }
}
exports.type = async (str_loc, str_text) => {
    try {
        const driver = await get_driver();
        await (arr_loc = get_locator_info(str_loc));
        switch (arr_loc[0].toLowerCase()) {
            case 'x':
                await(res = driver.findElement(By.xpath(arr_loc[1])).sendKeys(str_text));
                break;
            case 'css':
                await(res = driver.findElement(By.css(arr_loc[1])).sendKeys(str_text));
                break;
        }return res;
    } catch (ex) {
        console.log('Type text EXCEPTION OCCURED \n', ex.toString());
        return(res(false));
    }
}
exports.click = async (str_loc) => {
    try {
        const driver = await get_driver();
        await (arr_loc = get_locator_info(str_loc));
        switch (arr_loc[0].toLowerCase()) {
            case 'x':
                await(res = driver.findElement(By.xpath(arr_loc[1])).click());
                break;
            case 'css':
                await(res = driver.findElement(By.css(arr_loc[1])).click());
                break;

        }return res;
    } catch (ex) {
        console.log('Click text EXCEPTION OCCURED \n', ex.toString());
        return(res(false));
    }
}
exports.get_attribute = async (str_loc, str_text) => {
    try {
        const driver = await get_driver();
        await (arr_loc = get_locator_info(str_loc));
        switch (arr_loc[0].toLowerCase()) {
            case 'x':
                await (obj = driver.findElement(By.xpath(arr_loc[1])));
                break;
            case 'css':
                await (obj = driver.findElement(By.css(arr_loc[1])));
                break;

        }
        return (str_text.toLowerCase().indexOf("text", "innertext")>-1) ? obj.getText() : obj.getAttribute(str_text)
    } catch (ex) {
        console.log('Type text EXCEPTION OCCURED \n', ex.toString());
        return(obj(false));
    }
}
exports.wait_for_page = async () => {
    try {
        const driver = await get_driver();
        await driver.wait(until.executeScript("return document.readyState").equals("complete"));
    } catch (ex) {
        console.log('Type text EXCEPTION OCCURED \n', ex.toString());
        return null;
    }
}

