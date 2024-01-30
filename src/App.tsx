import {
  Flex
} from "@chakra-ui/react"
import { Nav } from "./components/Nav/Nav"
import Footer from "./components/Footer"
import { Home } from "./pages/home/Home"

export const App = () => (
  <Flex direction="column">
    <Nav></Nav>
    <Home/>
    <Flex minH="100vh"  flex={1} direction="column"></Flex>
    <Footer/>
  </Flex>
)
