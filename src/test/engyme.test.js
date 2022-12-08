import { render, fireEvent } from '@testing-library/react';
import { shallow } from 'enzyme';
import TestPage from '../Jest test/testPage';
 
describe('The Counter component', () => {
  describe('if the button is not clicked', () => {
    it('should display 0', () => {
      const counter = render(<TestPage />);
      const paragraph = counter.getByText('This is a test page', {
        selector: 'p',
      });
 
      expect(paragraph).toBeDefined();
    });
  });

  
  
  it('object check', () => {
      const wrapper = shallow(<TestPage />);
      console.log(wrapper.debug());
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.exists('.row')).toEqual(true);
    })
});