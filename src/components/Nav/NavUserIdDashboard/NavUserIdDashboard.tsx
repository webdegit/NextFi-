import { VStack } from '@chakra-ui/react';
import { MenuIconsComponent } from '../../MenuIconsComponent';
import { NavUserIdDashboardObject } from './NavUserIdDashboardObject';

export const NavUserIdDashboard = ({ userId }: { userId: number }) => {
  return (
    <VStack
      minW={200}
      borderRadius="3xl"
      borderWidth="thin"
      //   bgColor={useColorModeValue('white', 'gray.900')}
      py={10}
      
    >
      {NavUserIdDashboardObject?.map((menuObject, key) => {
        return (
          <MenuIconsComponent
            key={key}
            icon={menuObject?.icon}
            heading={menuObject?.heading}
            route={menuObject?.to}
            onClick={() => {}}
          ></MenuIconsComponent>
        );
      })}
    </VStack>
  );
};
