import { Flex, VStack } from '@chakra-ui/react';
import { Nav } from './components/Nav/Nav';
import Footer from './components/Footer';
import { Home } from './pages/home/Home';
import { Outlet } from 'react-router-dom';
import './global.css';

export const App = () => (
  <VStack>
    <Nav></Nav>
    <Outlet />
    <Footer />
  </VStack>
);
