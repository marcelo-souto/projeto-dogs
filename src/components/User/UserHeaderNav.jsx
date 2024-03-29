import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './UserHeaderNav.module.css';
import { ReactComponent as MinhasFotos } from '../../Assets/feed.svg';
import { ReactComponent as Estatisticas } from '../../Assets/estatisticas.svg';
import { ReactComponent as AdicionarFoto } from '../../Assets/adicionar.svg';
import { ReactComponent as Sair } from '../../Assets/sair.svg';
import useMedia from '../../hooks/useMedia';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../store/user/user';

function UserHeaderNav() {
	const mobile = useMedia('40rem');
	const dispatch = useDispatch();
	const [mobileMenu, setMobileMenu] = React.useState(false);
	const { pathname } = useLocation();

	React.useEffect(() => {
		setMobileMenu(false);
	}, [pathname]);

	return (
		<>
			{mobile && (
				<button
					aria-label='Menu'
					className={`${styles.mobileButton} ${
						mobileMenu && styles.mobileButtonActive
					}`}
					onClick={() => setMobileMenu(!mobileMenu)}
				></button>
			)}
			<nav
				className={`${mobile ? styles.navMobile : styles.nav} ${
					mobileMenu && styles.navMobileActive
				}`}
			>
				<NavLink to='/conta' end>
					<MinhasFotos />
					{mobile && 'Minhas Fotos'}
				</NavLink>
				<NavLink to='/conta/estatisticas'>
					<Estatisticas />
					{mobile && 'Estatistícas'}
				</NavLink>
				<NavLink to='/conta/postar'>
					<AdicionarFoto />
					{mobile && 'Adicionar Foto'}
				</NavLink>
				<button onClick={() => dispatch(userLogout())}>
					<Sair />
					{mobile && 'Sair'}
				</button>
			</nav>
		</>
	);
}

export default UserHeaderNav;
