"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function welcomePerson(person) {
    console.log("Hey ".concat(person.firstName, " ").concat(person.lastName));
    return "Hey ".concat(person.firstName, " ").concat(person.lastName);
}
var james = {
    firstName: "James",
    lastName: "Quick"
};
welcomePerson(james);
