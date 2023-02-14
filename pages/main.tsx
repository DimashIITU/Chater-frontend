import React from 'react';
import { NextPage } from 'next';

import instance from '../core/axios';
import { userResponse } from '../utils/types';

import { ContactsCard } from '../components/ContactsCard';
import { Chat } from '../components/Chat';

interface RoomsPageProps extends userResponse {}

const RoomsPage: NextPage<RoomsPageProps> = ({ subscriptions }) => {
  const [modalState, setModalState] = React.useState<boolean>(false);

  return (
    <>
      <div className="container">
        <div className=" mt-40 d-flex align-items-center justify-content-between">
          <h1>All contacts</h1>
        </div>
        <div className="grid mt-30">
          {JSON.parse(subscriptions)?.map((obj) => (
            <ContactsCard
              onClick={() => setModalState(true)}
              name={obj.userName}
              avatarUrl={obj.avatarUrl}
              isOnline={false}
            />
          ))}
        </div>
        {modalState ? <Chat onClose={() => setModalState(false)} isOnline={true} /> : null}
      </div>
    </>
  );
};

export default RoomsPage;
