/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-one-expression-per-line */
import {
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

import { Link } from 'react-router-dom';

import { Context } from '../../contexts/AuthContext';

import * as C from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import sad from '../../assets/images/sad.svg';

import Card from '../../components/Card';
import Loader from '../../components/Loader';
import Input from '../../components/Input';
import Button from '../../components/Button';

import ContactService from '../../services/ContactService';

export default function Home() {
  const { token } = useContext(Context);

  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoadingContacts, setIsLoadingContacts] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isReloadContacts, setIsReloadContacts] = useState(false);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [searchTerm, contacts]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoadingContacts(true);

      const contactsList = await ContactService.load(token, orderBy);

      setContacts(contactsList);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoadingContacts(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts, isReloadContacts]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (
      prevState === 'asc' ? 'desc' : 'asc'
    ));
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  return (
    <C.Container>
      <Loader isLoading={isLoadingContacts} />

      {contacts.length > 0 && (
        <C.InputSearch>
          <Input
            placeholder="Buscar pelo nome..."
            value={searchTerm}
            onChange={handleChangeSearchTerm}
          />
        </C.InputSearch>
      )}

      <C.Header
        justify={
          hasError
            ? 'flex-end'
            : (
              contacts.length > 0
                ? 'space-between'
                : 'center'
            )
        }
      >
        {(contacts.length > 0 && !hasError) && (
          <strong>
            {filteredContacts.length}
            {(filteredContacts.length === 1) ? ' contato' : ' contatos'}
          </strong>
        )}

        <Link to="/newcontact">Novo contato</Link>
      </C.Header>

      {(hasError && !isLoadingContacts) && (
        <C.ErrorContainer>
          <img src={sad} alt="Empty Box" />

          <div className="details">
            <strong>Ocorreu um erro ao obter os seus contatos!</strong>

            <Button type="button" onClick={handleTryAgain}>
              Tentar novamente
            </Button>
          </div>
        </C.ErrorContainer>
      )}

      {!hasError && (
        <>
          {(filteredContacts.length > 0 && contacts.length > 0) && (
            <C.ListHeader orderBy={orderBy}>
              <button
                type="button"
                onClick={handleToggleOrderBy}
              >
                <strong>Nome</strong>
                <img src={arrow} alt="Arrow" />
              </button>
            </C.ListHeader>
          )}

          {(contacts.length < 1 && !isLoadingContacts) && (
            <C.EmptyListContainer>
              <img src={emptyBox} alt="Empty box" />

              <p>
                Você ainda não tem nenhum contato cadastrado!
                Clique no botão <strong>"Novo contato"</strong> à cima
                para cadastrar o seu primeiro!
              </p>
            </C.EmptyListContainer>
          )}

          {(contacts.length > 0 && filteredContacts.length < 1) && (
            <C.SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="Magnifier Question" />
              <span>Você não tem nenhum contato chamado <strong>"{searchTerm}"</strong>.</span>
            </C.SearchNotFoundContainer>
          )}

          <C.ListContacts>
            {filteredContacts.map((contact) => (
              <Card
                key={contact.id}
                contact={contact}
                isReloadContacts={isReloadContacts}
                setIsReloadContacts={setIsReloadContacts}
              />
            ))}
          </C.ListContacts>
        </>
      )}
    </C.Container>
  );
}
