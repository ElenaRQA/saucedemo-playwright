import { faker } from "@faker-js/faker";

export interface Person {
  username: string;
  password: string;
}

export const FakerDTO: Person = {
  username: faker.internet.username(),
  password: faker.internet.password(),
};
