import React from 'react';
import styles from './LoginCreate.module.css';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../hooks/useForm';
import { USER_POST } from '../../api';
import useFetch from '../../hooks/useFetch';
import { UserContext } from '../../UserContext';
import Error from '../../helper/Error';
import Head from '../../helper/Head';

function LoginCreate() {
  const username = useForm();
  const email = useForm('email');
  const password = useForm();
  const { userLogin } = React.useContext(UserContext);

  const { request, erro, loading } = useFetch();

  async function handleSubmit(e) {
    e.preventDefault();

    if (username.validate() && email.validate() && password.validate()) {
      const { url, options } = USER_POST({
        username: username.value,
        email: email.value,
        password: password.value,
      });

      const { response } = await request(url, options);
      if (response.ok) userLogin(username.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Crie sua conta" />
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" id="username" {...username} />
        <Input label="Email" type="text" id="email" {...email} />
        <Input label="Senha" type="password" id="password" {...password} />
        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Error error={erro} />
      </form>
    </section>
  );
}

export default LoginCreate;
