import styles from './home.module.css'
import { Header } from '../../components/header'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';
import { deleteAddress, fetchUserById, fetchUsers } from '../../redux/user/slice';

export function Home() {
  const dispatch = useDispatch();
  const { user, users, userById, loading } = useSelector((rootReducer) => rootReducer.user);

  console.log(user);

  function handleDeleteAddress() {
    dispatch(deleteAddress());
    alert("Endereço deletado com sucesso!")
  }

  function handleFetchUsers() {
    dispatch(fetchUsers());
  }

  function handleFetchUserById() {
    const userId = 5;
    dispatch(fetchUserById(userId));
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>
            Login
          </Link>
          <Link to="/painel" className={styles.link}>
            Painel
          </Link>
          <Link to="/address" className={styles.link}>
            Meus endereços
          </Link>
        </nav>

        <main className={styles.content}>
          <div className={styles.message}>
            <h1 className={styles.title}>
              Olá {user ? user.name : 'Visitante'}, bem vindo!
            </h1>

            {user && (
              <span>Email: {user.email}</span>
            )}


            {user && user.address && (
              <>
                <strong className={styles.addressLabel}>Endereço atual:</strong>
                <div className={styles.address}>
                  <p>{user.address.location}, nº {user.address.number}</p>

                  <button onClick={handleDeleteAddress}>Deletar endereço</button>
                </div>
              </>
            )}

            {/* <hr /> <br /> */}

            <h2 className={styles.h2}>Lista de Usuários</h2>
            <button onClick={handleFetchUsers} className={styles.buttonSearch} >Buscar usuários</button>

            <br />

            {loading && <strong style={{ marginTop: '8px' }}>Carregando usuários...</strong>}

            {!loading && users.map((currUser) => (
              <div key={currUser.id} style={{ marginTop: '8px' }}>
                <p>ID: {currUser.id} | {currUser.name}</p>
              </div>
            ))}

            <button onClick={handleFetchUserById} className={styles.buttonSearchId}>Buscar usuário com ID</button>

            {loading && <strong style={{ marginTop: '8px' }}>Carregando usuário pelo ID {users.id}...</strong>}

            {!loading && userById && (
              <div style={{ marginTop: '12px' }}>
                <strong>Usuário encontrado:</strong>
                <p>ID: {userById.id}</p>
                <p>Nome: {userById.name}</p>
              </div>
            )}
          </div>

        </main>
      </div>
    </>
  )
}
