import { Profile } from '../interface/Profile';

const profiles: Profile[] = [
  {
    userId: '0',
    name: 'Alice',
    description: 'I would absolutely love to take care of your dog',
    occupation: 'Dog sitter',
    rating: 5.0,
    pricePerHour: 22,
    location: 'New York, NY',
    photoURL: 'https://via.placeholder.com/150',
  },
  {
    userId: '1',
    name: 'Bob',
    description: 'I would love to take care of your dog or cat',
    occupation: 'Pet lover',
    rating: 4.5,
    location: 'Boston, MA',
    pricePerHour: 18,
    photoURL: 'https://via.placeholder.com/150',
  },
  {
    userId: '2',
    name: 'Claire',
    description: 'I love taking care of dogs between my busy shifts',
    occupation: 'High powered executive',
    rating: 3.6,
    location: 'Jacksonville, FL',
    pricePerHour: 30,
    photoURL: 'https://via.placeholder.com/150',
  },
  {
    userId: '3',
    name: 'Danny',
    description: "Hi I'm Danny and I kinda like dogs I guess",
    occupation: 'Teenager',
    rating: 1.8,
    location: 'Jacksonville, FL',
    pricePerHour: 10,
    photoURL: 'https://via.placeholder.com/150',
  },
  {
    userId: '4',
    name: 'Emily',
    description: 'Dogs are my passion and I want to meet your dog',
    occupation: 'Artist',
    rating: 4.8,
    location: 'San Francisco, CA',
    pricePerHour: 15,
    photoURL: 'https://via.placeholder.com/150',
  },
];

export { profiles };
