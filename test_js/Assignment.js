const superagent = require('superagent');
const sel = require('../selector');
const ui = require('../utils/ui_util');
const {Builder, By, Key, Options, Capabilities, until}  = require('selenium-webdriver');
let UI_Result, API_Result, threshold;

//phase 1, UI test of ndtv weather section
exports.navigateToNdtv = async(fn) => {
  try {
    let driver = global.driver;
    await driver.get("https://www.ndtv.com/");
    await ui.wait_for(sel.ndtv_onboard.moreOptions);//have created
    await ui.click(sel.ndtv_onboard.moreOptions);
    await ui.wait_for(sel.ndtv_onboard.weatherBtn);
    await ui.click(sel.ndtv_onboard.weatherBtn);
    await ui.wait_for(sel.ndtv_onboard.searchCity);
    await ui.type(sel.ndtv_onboard.searchCity,'delhi');
    await ui.wait_for(sel.ndtv_onboard.cityName);
    await ui.click(sel.ndtv_onboard.cityName);
    await ui.wait_for(sel.ndtv_onboard.cityInfo);
    let cityInfo = await ui.get_attribute(sel.ndtv_onboard.cityInfo,'text');
    UI_Result =cityInfo.split('\n');
    // compare the city info with searched city
    if (cityInfo.includes("New Delhi, Delhi")){
      console.log("phase 1 is passed")
      return(fn(true))
    }
    return (fn(false))
  } catch (err) {
    console.log(err.toString());
    return(fn(false));
  }
}

//phase 2, to automate
exports.api_openweathermap = async (fn) => {
  try {
    const res = await superagent
        .get("http://api.openweathermap.org/data/2.5/weather" +
            "?q=delhi&appid=7fe67bf08c80ded756e598d6f8fedaea");
    let value = res.text;
    if(res.status === 200){
      API_Result = value.split(',');
      console.log("phase 2 is passed")
      return(fn(true));
    }
    return (fn(false));
  }catch (err) {
    console.log(err.toString());
    return (fn(false));
  }
};

//phase 3, the comparator and variance
exports.compareBoth = async (fn) =>{
  try{
    let minTemp_api =API_Result[9];
    let Temp_Api = parseInt(minTemp_api.substr(11,15));
    let UI_temp = UI_Result[4];
    let UI_tempCel =UI_temp.substr(17, 19);
    let UI_tempKalvin = parseInt(UI_tempCel)+ 273.15;
    let threshold = 5;
    //As both the values are not equal I'm making a threshold function and calling it to compare
    let res = almost_equal(threshold,UI_tempKalvin,Temp_Api);
    if (res === true) {
      console.log("phase 3 passed")
      return (fn(true));
    }
  }catch (err) {
    console.log(err.toString());
    return (fn(false));
  }
}

function almost_equal(threshold,UI_tempKalvin, Temp_Api) {
  let diff = UI_tempKalvin - Temp_Api;
  if(diff <0){
    diff = diff*(-1);
  }if (diff<= threshold){
    return true
  }
  return false
}
