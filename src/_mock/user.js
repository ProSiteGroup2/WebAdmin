import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;
  return {
  id: faker.datatype.uuid(),
  avatarUrl: `/static/mock-images/products/product_${setIndex}.jpg`,
  name: faker.name.findName(),
  company: faker.company.companyName(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  role: sample([
    'Contractor',
    'Hardware Owner',
    'Mason',
    'Transporter',
    'Painter',
    'Architecturer',
    'Plumber',
    'Electritian',
    'Carpenter',
    
  ]),
}});

export default users;
