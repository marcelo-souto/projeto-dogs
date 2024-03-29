import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../hooks/useForm';
import { userLogin } from '../../store/user/user';
import Error from '../../helper/Error';
import styles from './LoginForm.module.css';
import stylesBtn from '../Forms/Button.module.css';
import Head from '../../helper/Head';
import { useDispatch, useSelector } from 'react-redux';

function LoginForm() {
	const username = useForm();
	const password = useForm();

	const dispatch = useDispatch();
	const { token, user } = useSelector((state) => state);
	const loading = token.loading || user.loading;
	const error = token.error || user.error;

	function handleSubmit(e) {
		e.preventDefault();

		if (username.validate() && password.validate()) {
			dispatch(
				userLogin({ username: username.value, password: password.value })
			);
		}
	}

	return (
		<section className='animeLeft'>
			<Head title='Login' />
			<h1 className='title'>Login</h1>

			<form className={styles.form} onSubmit={handleSubmit}>
				<Input label='Usuário' type='text' id='username' {...username} />
				<Input label='Senha' type='password' id='password' {...password} />
				{loading ? (
					<Button disabled>Carregando...</Button>
				) : (
					<Button>Entrar</Button>
				)}
				<Error error={error && 'Dados incorretos.'} />
			</form>
			<Link className={styles.perdeu} to='/login/perdeu'>
				Perdeu a Senha?
			</Link>
			<div className={styles.cadastro}>
				<h2 className={styles.subtitle}>Cadastre-se</h2>
				<p>Ainda não possui conta? Cadastre-se agora</p>
			</div>
			<Link className={stylesBtn.button} to='/login/criar'>
				Cadastro
			</Link>
		</section>
	);
}

export default LoginForm;
