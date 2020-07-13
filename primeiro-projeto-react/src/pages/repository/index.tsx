import React, { useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import { Header, RepositoryInfo, Issues } from './styles';
import api from '../../services/api';

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    api.get(`/repos/${params.repository}`).then((res) => {
      console.log(res);
    });

    api.get(`/repos/${params.repository}/issues`).then((res) => {
      console.log(res);
    });
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="GitHub Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      <RepositoryInfo>
        <header>
          <img
            alt="User"
            src="https://avatars1.githubusercontent.com/u/29128672?s=460&u=35713cf65a1aa46523da85dafc78ac42dba8f5d4&v=4"
          />
          <div>
            <strong>repository/user</strong>
            <p>description</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>1000</strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>1000</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>1000</strong>
            <span>Issues abertas</span>
          </li>
        </ul>

        <Issues>
          <Link to="aa">
            <div>
              <strong>aaaa</strong>
              <p>aaaa</p>
            </div>
            <FiChevronRight size={18} />
          </Link>
        </Issues>
      </RepositoryInfo>
    </>
  );
};

export default Repository;
