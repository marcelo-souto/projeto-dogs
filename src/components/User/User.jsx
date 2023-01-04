import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserHeader from './UserHeader';
import Feed from '../../components/Feed/Feed';
import UserPhotoPost from './UserPhotoPost';
import UserStats from './UserStats';

function User() {
  return (
    <section className="container">
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="postar" element={<UserPhotoPost />} />
        <Route path="estatisticas" element={<UserStats />} />
      </Routes>
    </section>
  );
}

export default User;