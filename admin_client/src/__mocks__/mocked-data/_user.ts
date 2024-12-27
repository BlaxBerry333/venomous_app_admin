import { faker } from "@faker-js/faker";

export const _MOCK_USER = {
  displayname: faker.person.fullName(),
  email: faker.internet.email(),
  avatar: "https://avatars.githubusercontent.com/u/166675080?v=4",
};
