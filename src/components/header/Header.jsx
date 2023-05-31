import React, { useContext } from 'react';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import './header.scss';
import { DeleteContext } from '../../Context';

const Header = () => {
  const { isActiveDeleteBtn, setActiveDeleteBtn } = useContext(DeleteContext);

  return (
    <nav className='navbar'>
      <div className='logo'>
        <Link to='/'>
          <img src={logo} alt='logo'></img>
          <h2>Каталог книг</h2>
        </Link>
      </div>

      <ul className='links'>
        <li>
          <Link to='/recommendedbook'>Рекомендуемая книга</Link>
        </li>
        <li>
          <Link to='/addbooks'>Добавить книги</Link>
        </li>
        <li className='dlt-books' onClick={() => setActiveDeleteBtn(!isActiveDeleteBtn)}>
          Удалить книги
        </li>
      </ul>
    </nav>
  );
};

export default Header;
