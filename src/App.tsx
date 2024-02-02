import { Flex } from '@chakra-ui/react';
import { Nav } from './components/Nav/Nav';
import Footer from './components/Footer';
import { Home } from './pages/home/Home';
import { Outlet } from 'react-router-dom';

export const App = () => (
  <Flex direction="column">
    <Nav></Nav>
    <Outlet />
    <Footer />
  </Flex>
);
