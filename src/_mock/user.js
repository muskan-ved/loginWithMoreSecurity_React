import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  age:faker.datatype.uuid(),
  contact: faker.company.name(),
  address: faker.name.fullName(),
  status: sample(['active', 'banned']),
  purposeToVisit:faker.company.name(),
  email: sample([
    'Leader@gmailcom',
    'Hr@gmailcom',
    'UI@gmailcom',
    'UX@gmailcom',
    'UI/UX@gmailcom',
    'Project@gmailcom',
    'Backend@gmailcom',
    'Full@gmailcom',
    'Front@gmailcom',
    'Full@gmailcom',
  ]),

}));

export default users;
