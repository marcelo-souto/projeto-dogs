import React from 'react';
import styles from './LoginCreate.module.css';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../hooks/useForm';
import { USER_POST } from '../../api';
import useFetch from '../../hooks/useFetch';
import Error from '../../helper/Error';
import Head from '../../helper/Head';
import { useSelector, useDispatch } from 'react-redux';

function LoginCreate() {
	const username = useForm();
	const email = useForm('email');
	const password = useForm();
	const dispatch = useDispatch();
	const { token, user } = useSelector((state) => state);
	const loading = token.loading || user.loading;
	const error = token.error || user.error;

	async function handleSubmit(e) {
		e.preventDefault();

		if (username.validate() && email.validate() && password.validate()) {
			const { url, options } = USER_POST({
				username: username.value,
				email: email.value,
				password: password.value
			});

			const { response } = await request(url, options);
			if (response.ok)
				dispatchEvent(
					userLogin({ username: username.value, password: password.value })
				);
		}
	}

	return (
		<section className='animeLeft'>
			<Head title='Crie sua conta' />
			<h1 className='title'>Cadastre-se</h1>
			<form onSubmit={handleSubmit}>
				<Input label='Usuário' type='text' id='username' {...username} />
				<Input label='Email' type='text' id='email' {...email} />
				<Input label='Senha' type='password' id='password' {...password} />
				{loading ? (
					<Button disabled>Cadastrando...</Button>
				) : (
					<Button>Cadastrar</Button>
				)}
				<Error error={error} />
			</form>
		</section>
	);
}

export default LoginCreate;
