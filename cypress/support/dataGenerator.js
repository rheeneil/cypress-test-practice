import { faker, fakerEN_GB } from '@faker-js/faker';


export function generateData() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    let fullDOB = faker.date.birthdate({min: 18, max: 75, mode: 'age'});
    fullDOB = String(fullDOB);
    let date = fullDOB.split("T")[0];
    let day = date.split("-")[2];
    let month = date.split("-")[1];
    let year = date.split("-")[0];
    const dob = day + '/' + month + '/' + year;
    const emailAddress = faker.internet.email();
    const password = "password" + (Math.floor(Math.random() * 2));
    const address = [fakerEN_GB.location.streetAddress, fakerEN_GB.location.street];
    const telephoneNumber = faker.phone.number('176########');
    const randomPin = Math.floor(Math.random() * 9000 + 1000);
    const postCode = fakerEN_GB.location.zipCode();
    
    const data = {
        'firstName': firstName,
        'lastName': lastName,
        'dateOfBirth': dob,
        'emailAddress': emailAddress,
        'password': password,
        'address': address,
        'telephoneNumber': telephoneNumber,
        'pin': randomPin,
        'zipCode': postCode
    }

    console.log('First Name: ' + firstName + ' ' + typeof firstName);
    console.log('Last Name: ' + lastName + ' ' + typeof lastName);
    console.log('Date of Birth: ' + dob)
    console.log('Email Address: ' + emailAddress + ' ' + typeof emailAddress);
    console.log('password: ' + password + ' ' + typeof password);
    console.log('Address: ' + address)
    console.log('Telephone: ' + telephoneNumber + ' ' + typeof telephoneNumber);
    console.log('Random Pin: ' + randomPin + ' ' + typeof randomPin)
    console.log('Zip Code: ' + postCode + ' ' + typeof zipCode) 

    return data;
}