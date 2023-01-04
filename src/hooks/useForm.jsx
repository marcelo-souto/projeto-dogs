import React from 'react';

const types = {
  email: {
    regex:
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    message: 'Insira um email válido.',
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    message: 'A senha precisa ter 1 caractere maiúsculo, 1 minúsculo e 1 digito. Com no mínimo 8 caracteres'
  },
  number: {
    regex: /^\d+$/,
    message: 'Utilize números apenas'
  }
};

function useForm(type) {
  const [value, setValue] = React.useState('');
  const [erro, setErro] = React.useState(null);

  function validate(value) {
    if (type === false) return true;
    if (value.length === 0) {
      setErro('Campo Vazio.');
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setErro(types[type].message);
      return false;
    } else {
      setErro(null);
      return true;
    }
  }

  function onChange({ target }) {
    if (erro) validate(target.value);
    setValue(target.value);
  }

  return {
    value,
    setValue,
    onChange,
    erro,
    onBlur: () => validate(value),
    validate: () => validate(value),
  };
}

export default useForm;
