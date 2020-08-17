const tester = require('../tester');
const pre_req = require('../pre_req');
jest.setTimeout(36000000);
//This is test file where all three phase is completed
describe('Automate weather section of ndtv', () => {
    beforeAll(async () => {
        await pre_req.ui_setup();
    });
    afterAll(async () => {
        await global.driver.quit();
    });
    //phase 1
    test('Check the weather of delhi from UI', async () =>{
        await tester.Assignment.navigateToNdtv((val)=>{
            expect(val).toBe(true)
        })
    });
    //phase 2
    test('Check the value from openweathermap', async () => {
        await tester.Assignment.api_openweathermap((val) =>{
            expect(val).toBe(true)
        })
    })
    //phase 3
    test('Compare both results', async () => {
        await tester.Assignment.compareBoth((val) =>{
            expect(val).toBe(true)
        })
    })
});
