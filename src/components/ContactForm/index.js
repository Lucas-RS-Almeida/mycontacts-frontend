import PropTypes from 'prop-types';

import { useState, useEffect, useContext } from 'react';

import { Context } from '../../contexts/AuthContext';

import { Form } from './styles';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Button from '../Button';

import useErrors from '../../hooks/useErrors';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';

import CategoryService from '../../services/CategoryService';

export default function ContactForm({
  textButton,
  onFunction,
  nameEdit,
  emailEdit,
  phoneEdit,
  categoryIdEdit,
}) {
  const [name, setName] = useState(nameEdit || '');
  const [email, setEmail] = useState(emailEdit || '');
  const [phone, setPhone] = useState(phoneEdit || '');
  const [categoryId, setCategoryId] = useState(categoryIdEdit || '');
  const [categories, setCategories] = useState([]);

  const { token } = useContext(Context);

  const {
    errors,
    setErrors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (name && (errors.length === 0));

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesList = await CategoryService.load(token);

        setCategories(categoriesList);
      } catch (error) {
        console.log(error);
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    setErrors([]);
  }, []);

  function handleChangeName(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório' });
    } else {
      removeError('name');
    }
  }

  function handleChangeEmail(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido' });
    } else {
      removeError('email');
    }
  }

  function handleChangePhone(event) {
    setPhone(formatPhone(event.target.value));
  }

  function handleSubmit(event) {
    event.preventDefault();

    onFunction({
      name, email, phone, categoryId,
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          placeholder="Nome *"
          value={name}
          onChange={handleChangeName}
          error={getErrorMessageByFieldName('name')}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          placeholder="E-mail"
          value={email}
          onChange={handleChangeEmail}
          error={getErrorMessageByFieldName('email')}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={handleChangePhone}
        />
      </FormGroup>
      <FormGroup>
        <select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
        >
          <option value="">Nenhuma categoria selecionada</option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </FormGroup>
      <Button type="submit" disabled={!isFormValid}>{textButton}</Button>
    </Form>
  );
}

ContactForm.propTypes = {
  textButton: PropTypes.string.isRequired,
  onFunction: PropTypes.func.isRequired,
  nameEdit: PropTypes.string,
  emailEdit: PropTypes.string,
  phoneEdit: PropTypes.string,
  categoryIdEdit: PropTypes.string,
};

ContactForm.defaultProps = {
  nameEdit: '',
  emailEdit: '',
  phoneEdit: '',
  categoryIdEdit: '',
};
