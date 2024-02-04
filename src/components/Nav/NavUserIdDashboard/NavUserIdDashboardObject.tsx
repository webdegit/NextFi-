import { RxDashboard } from 'react-icons/rx';
import { FaArrowsDownToPeople, FaIdCardClip, FaShop } from 'react-icons/fa6';
import { GiReceiveMoney } from 'react-icons/gi';
import { AiFillHome } from 'react-icons/ai';

export const NavUserIdDashboardObject = [
  {
    heading: 'Home',
    icon: AiFillHome,
    to: '/',
  },
  {
    heading: 'User Ids',
    icon: FaIdCardClip,
    to: '/user',
  },
  {
    heading: 'Dashboard',
    icon: RxDashboard,
    to: '/user',
  },
  {
    heading: 'Business',
    icon: FaShop,
    to: '/user',
  },
  {
    heading: 'Pool',
    icon: FaShop,
    to: '/user',
  },
  {
    heading: 'Team',
    icon: FaArrowsDownToPeople,
    to: '/user',
  },
  {
    heading: 'Rewards',
    icon: GiReceiveMoney,
    to: '/user',
  },
];
