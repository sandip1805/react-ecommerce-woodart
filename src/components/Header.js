import React from 'react';
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
  Badge,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  PowerIcon,
  Bars2Icon,
  ShoppingBagIcon,
  PhoneIcon,
  LockClosedIcon
} from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";
import { Link } from 'react-router-dom';
import { CartItems } from '../services/CartService';

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    pageUrl: '/profile'
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
    pageUrl: '/edit-profile'
  },
  {
    label: "Register",
    icon: LockClosedIcon,
    pageUrl: '/register'
  },
  {
    label: "Login",
    icon: LockClosedIcon,
    pageUrl: '/login'
  },
  {
    label: "Logout",
    icon: PowerIcon,
    pageUrl: '/logout'
  },
];
 
function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
  const closeMenu = () => setIsMenuOpen(false);
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-4"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-blue-500 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, pageUrl }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >   
                <Link to={pageUrl}>{label}</Link>            
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
 
// nav list component
const navListItems = [
  {
    label: "Products",
    icon: ShoppingBagIcon,
    pageUrl: '/products'
  },
  {
    label: "Contact",
    icon: PhoneIcon,
    pageUrl: '/contact-us'
  },
];
 
function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon, pageUrl }, key) => (
        <Typography
          key={label}
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          <Link to={pageUrl}>
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
              {label}
            </MenuItem>
          </Link>
          
        </Typography>
      ))}
    </ul>
  );
}

const Header = () => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [cartItemsCount, setCartItemsCount] = React.useState(0);
 
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    const cartObservable = CartItems.subscribe((res) => {
      setCartItemsCount(
        res.length > 0
          ? res.reduce((a, c) => a + c.cartQuantity, 0)
          : 0
      );
    });
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
    return () => cartObservable.unsubscribe();
  }, []);
 
  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full mx-auto p-2 lg:pl-6 rounded-none">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-medium" >
          <Link to="/">
            Ecommerce Woodart
          </Link>
        </Typography>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <div className='flex items-center ml-auto'>
          <Link to={'/cart'}>
            <Badge content={cartItemsCount} withBorder className='text-white bg-red'>
              <IconButton>
                <img
                  className="h-25"
                  src="/img/icons/icon-cart-white.svg"
                  alt="cart-icon"
                />
              </IconButton>
            </Badge>
          </Link>
          <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>
          <ProfileMenu />
        </div>
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </Navbar>
  );
};

export default Header;
