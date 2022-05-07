import React from 'react';
import UserModel from '../../models/UserModel';
import cardStyles from '../../styles/Home.module.css';

type Props = {
  userSelection?: UserModel;
  clearUserDisplay: React.MouseEventHandler<HTMLButtonElement>;
};

const UserDisplay = (props: Props) => {
  const { userSelection } = props;
  return (
    <>
      {userSelection && (
        <div className={cardStyles.card}>
          <h2 className={cardStyles.cardTitle}>
            User Details
            <button onClick={props.clearUserDisplay}>&#10060;</button>
          </h2>
          <p>Id: {userSelection.id}</p>
          <p>Name: {userSelection.name}</p>
          <p>Phone: {userSelection.phone}</p>
          <p>Username: {userSelection.username}</p>
          <p>Website: {userSelection.website}</p>
          <br />
          <p>
            <u> Address </u>
          </p>
          <p>City: {userSelection.address.city}</p>
          <p>Street: {userSelection.address.street}</p>
          <p>Suite: {userSelection.address.suite}</p>
          <p>Zipcode: {userSelection.address.zipcode}</p>
          <p>Latitude: {userSelection.address.geo.lat}</p>
          <p>Longitude: {userSelection.address.geo.lng}</p>
          <br />
          <p>
            <u> Company </u>
          </p>
          <p>City: {userSelection.company.bs}</p>
          <p>Street: {userSelection.company.catchPhrase}</p>
          <p>Suite: {userSelection.company.name}</p>
        </div>
      )}
    </>
  );
};

export default UserDisplay;
