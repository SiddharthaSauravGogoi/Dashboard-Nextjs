export default interface UserModel {
  id: number;
  name: string;
  username: string;
  email: string;
  address: address;
  phone: string;
  website: string;
  company: company;
}

interface address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: geo;
}

interface geo {
  lat: string;
  lng: string;
}

interface company {
  name: string;
  catchPhrase: string;
  bs: string;
}
