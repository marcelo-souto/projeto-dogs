import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login/Login';
import User from './components/User/User';
import ProtectedRoute from './helper/ProtectedRoute';
import Photo from './components/Photo/Photo';
import UserProfile from './components/User/UserProfile';
import NotFound from './NotFound';
import { useDispatch } from 'react-redux';
import { autoLogin } from './store/user/user';

function App() {
	const dispatch = useDispatch();
	React.useEffect(() => {
		dispatch(autoLogin());
	}, []);

	return (
		<div className='App'>
			<BrowserRouter>
				
					<Header />
					<main className='AppBody'>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='login/*' element={<Login />} />
							<Route path='foto/:id' element={<Photo />} />
							<Route path='perfil/:user' element={<UserProfile />} />
							<Route path='*' element={<NotFound />} />
							<Route
								path='conta/*'
								element={
									<ProtectedRoute>
										<User />
									</ProtectedRoute>
								}
							/>
						</Routes>
					</main>
					<Footer />
				
			</BrowserRouter>
		</div>
	);
}

export default App;
