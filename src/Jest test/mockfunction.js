export function getFullName(firstname, lastname) {
    return firstname + ' ' + lastname
 }
   
export function greet(firstname, lastname) {
    return "Hello! " + getFullName(firstname,lastname)
 }
