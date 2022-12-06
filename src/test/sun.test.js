import {ageCalculate} from '../common/ageCalculate'
import renderer from 'react-test-renderer';
import TestPage from 'src/Jest test/testPage';

test('my first test', () => {
    let expected = 10;
    expect(10).toBe(expected);
})

describe('second test', () => {

test('my age calculate test', () => {
        expect(ageCalculate("1998-10-03")).toEqual(24);
        expect(ageCalculate("1998-10-03")).not.toBe(23);
    })

})

describe('Snapshot test', () => {
it('renders correctly', () => {
 const tree = renderer
   .create(<TestPage page="www.softwaretestinghelp.com" hello='#'/>)
   .toJSON(); 
   console.log(tree,"-------")  
   expect(tree).toMatchSnapshot();
});
})


