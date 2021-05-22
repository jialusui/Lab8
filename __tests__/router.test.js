/**
 * @jest-environment jsdom
 */
import { pushToHistory } from '../scripts/router.js';
 
describe('test history.length and current state', () => {
    test('default length', () => {
        var hist = pushToHistory()
        expect(hist.length).toBe(2); 
        expect(hist.state).toStrictEqual({}); 
    }); 

    test('settings length', () => {
        var hist = pushToHistory('settings')
        expect(hist.length).toBe(3); 
        expect(hist.state.page).toBe("settings")
    }); 

    test('entry length', () => {
        var hist = pushToHistory('entry', 1)
        expect(hist.length).toBe(4); 
        expect(hist.state.page).toBe("entry1")
    }); 
})
