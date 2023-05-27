import { Route, Routes } from 'react-router-dom';
import MainNav from '../../navigations/MainNav/MainNav';

function MainLayout(props: any) {
  return (
    <>
      <header>
        <MainNav />
      </header>
      <main>{props.children}</main>
    </>
  );
}

export default MainLayout;
