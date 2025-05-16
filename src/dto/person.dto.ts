import { faker } from "@faker-js/faker";

export interface Person {
  username: string;
  password: string;
}

export const PersonDTO: Person = {
  username: process.env.SAUCE_USERNAME!,
  password: process.env.SAUCE_PASSWORD!,
};

export const getPerson = (): Person => {
  return {
    username: faker.internet.username(),
    password: faker.internet.password(),
  };
};

export interface ICheckoutDTO {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export const FakerCheckoutDTO: ICheckoutDTO = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  postalCode: faker.location.zipCode(),
};
