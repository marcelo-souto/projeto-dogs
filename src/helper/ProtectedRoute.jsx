import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children }) {
	const { data } = useSelector((state) => state.user);

	return data ? children : <Navigate to='/login' />;
}

export default ProtectedRoute;
