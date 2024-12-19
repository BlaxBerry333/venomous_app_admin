import { faker } from "@faker-js/faker";

export const _MOCK_USER = {
  displayname: faker.person.fullName(),
  email: faker.internet.email(),
  avatar: faker.image.avatar(),
};
