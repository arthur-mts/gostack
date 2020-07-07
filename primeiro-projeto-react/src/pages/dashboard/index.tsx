import React, { useState, useEffect, FormEvent } from 'react';

import { FiChevronsRight } from 'react-icons/fi';

import { Title, Form, Repositories, Error } from './styles';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import {Link} from 'react-router-dom';

// Nota
// Você **NÃO** precisa colocar todos os atributos de um objeto
// na sua interface, somente aqueles que serão necessarios.
interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storage = localStorage.getItem('@GithubExplorer:repositories');
    if (storage) {
      return JSON.parse(storage);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories)
    );
  }, [repositories]);

  async function handleAddRepo(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    try {
      if (!newRepo) {
        setInputError('Digite o nome/autor do repositorio');
      } else {
        const response = await api.get<Repository>(`repos/${newRepo}`);
        setRepositories([...repositories, response.data]);
        setInputError('');
        setNewRepo('');
      }
    } catch (err) {
      setInputError('Erro na busca pelo repositório');
    }
  }

  return (
    <>
      <img src={logoImg} alt="GitHub Explorer" />
      <Title>Explore repositorios do GitHub</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepo}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit"> Pesquisar </button>
      </Form>
      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map((repository) => {
          return (
            <Link key={repository.full_name} to={`/repositories/${repository.full_name}`}>
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
              />
              <div>
                <strong>{repository.full_name}</strong>
                <p>{repository.description}</p>
              </div>
              <FiChevronsRight size={20} />
            </Link>
          );
        })}
      </Repositories>
    </>
  );
};

export default Dashboard;
