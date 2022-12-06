import '@testing-library/jest-dom/extend-expect';
import {render, container} from '@testing-library/react';
import TestPage1 from 'src/Jest test/testPage1';
import {getFullName,greet} from '../Jest test/mockfunction';


// arrange - mock setup components
jest.mock('../Jest test/testPage', () => () => <div className="container1">Hello Mock Component testpage1</div>) //change classname to testPage

describe("mock component tests", () => {
   test("mocked components in react", () => {
       // act
       const {container} = render(<TestPage1 />)
  
       // assert
       console.log(container.innerHTML)
       const mockComponent1 = container.querySelector('div.container1')
       expect(mockComponent1).toBeInTheDocument();

   })
})

//  arrange - mocking function
test("illustrate mocks", () => {
 
    
 
    // act
    const result = greet("aman", "kumar")
    console.log(result)
 
    // assert
    // expect(result).toBe("Hello! aman kumar")
    // expect(mock).toHaveBeenCalled()
    // expect(mock).toHaveBeenCalledTimes(1)
    // expect(mock).toHaveBeenCalledWith("aman","kumar")
})


// test("illustrate spy", () => {

//     const getFullNameSpy = jest.spyOn(greeter, 'getFullName')
    
//     // act
//     const result = greeter.greet("aman", "kumar")

//     // assert
//     expect(getFullNameSpy).toHaveBeenCalled()
//     expect(result).toBe("Hello! aman kumar")
//     expect(getFullNameSpy).toHaveBeenCalledWith("aman","kumar")

// })
