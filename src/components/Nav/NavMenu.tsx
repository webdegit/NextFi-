import { HamburgerIcon } from '@chakra-ui/icons'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    IconButton,
  } from '@chakra-ui/react'

export const NavMenu = () => {
  return (
    <IconButton aria-label='Nav Menu Drawer Button' icon={<HamburgerIcon/>}></IconButton>
  )
}
