import React, { useEffect, useState } from 'react';
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
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  PowerIcon,
  Bars2Icon,
  ShoppingBagIcon,
  PhoneIcon,
  LockClosedIcon
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from 'react-router-dom';
import { CartItems } from '../services/CartService';
import { User } from '../services/AuthService';

// profile menu component
 
function ProfileMenu(props) {
  const [profileMenuItems, setProfileMenuItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (props.authorized) {
      const menuItems = [
        {
          label: "My Profile",
          icon: UserCircleIcon,
          pageUrl: '/profile'
        },
        {
          label: "Logout",
          icon: PowerIcon,
          pageUrl: '/logout'
        },
      ]
      setProfileMenuItems(menuItems);
    } else {
      const menuItems = [
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
      ]
      setProfileMenuItems(menuItems);
    }
  }, [props]);

  const handleLogOut = (e) => {
    User.next(null);
    localStorage.setItem('user', null);
    navigate('/');
  }
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
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
          const isLogoutItem = (label === 'Logout');
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLogoutItem ? "text-red font-black" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                variant="small"
                className={`font-normal ${isLogoutItem ? "text-red font-medium" : ""}`}
              >   
                {
                  label !== 'Logout' ? (<Link to={pageUrl}>{label}</Link>) : (<span onClick={() => handleLogOut()}>{label}</span>)
                }        
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
          className="font-normal text-black"
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
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [authorized, setAuthorized] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
 
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  useEffect(() => {
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
    const userObservable = User.subscribe((res) => {
      console.log(res);
      if (res) {
        setAuthorized(true);
      }
      else {
        setAuthorized(false);
      }
    });
    return () => {
      userObservable.unsubscribe();
      cartObservable.unsubscribe();
    };
  }, [authorized]);

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };
 
  return (
    <Navbar className="sticky top-0 z-50 h-max max-w-full mx-auto p-2 lg:pl-6 rounded-none">
      <div className="relative mx-auto flex items-center">
        <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-medium text-black" >
          <Link to="/">
            Ecommerce Woodart
          </Link>
        </Typography>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <div className='flex items-center ml-auto'>
          {
            authorized ? (
              <Link to={'/cart'}>
                <Button className="flex items-center relative header_cart_btn">
                  <span className="absolute -top-2 -right-2 rounded-full bg-red px-2 py-1 text-xs font-bold text-cream z-10">
                    {cartItemsCount}
                  </span>
                  <img
                    className="h-25"
                    src="/img/icons/icon-cart-white.svg"
                    alt="cart-icon"
                  />
                </Button>
              </Link>
            ) : (
              <Popover open={openPopover} handler={setOpenPopover}>
                <PopoverHandler {...triggers}>
                  <Button className="flex items-center relative header_cart_btn">
                    <span className="absolute -top-2 -right-2 rounded-full bg-red px-2 py-1 text-xs font-bold text-cream z-10">
                      {cartItemsCount}
                    </span>
                    <img
                      className="h-25"
                      src="/img/icons/icon-cart-white.svg"
                      alt="cart-icon"
                    />
                  </Button>
                </PopoverHandler>
                <PopoverContent {...triggers} className="z-50 max-w-[26rem]">
                  <Typography variant="h6" color="gray" className="font-normal">
                    Login is required to access cart items.
                  </Typography>
                  <div className="mt-4 flex justify-end">
                    <Link to={'/login'}>
                      <Button>Login</Button>
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>
            )
          }
          <IconButton
            size="sm"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>
          <ProfileMenu authorized={authorized}/>
        </div>
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </Navbar>
  );
};

export default Header;
