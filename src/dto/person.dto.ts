import { faker } from "@faker-js/faker";

export interface Person {
  username: string;
  password: string;
}

export const PersonDTO: Person = {
  username: process.env.SAUCE_USERNAME,
  password: process.env.SAUCE_PASSWORD,
};

export const FakerDTO: Person = {
  username: faker.internet.username(),
  password: faker.internet.password(),
};
