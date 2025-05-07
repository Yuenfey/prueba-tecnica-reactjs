import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";
import ShoppingCart from "../ShoppingCart";

const Navbar = () => {
  const context = useContext(ShoppingCartContext);
  const activeStyle = "underline underline-offset-4";

  //Sign Out
  const signOut = localStorage.getItem("sign-out");
  const parsedSignOut = JSON.parse(signOut);
  const isUserSignOut = context.signOut || parsedSignOut;

  // Account
  const account = localStorage.getItem("account");
  const parsedAccount = JSON.parse(account);
  // has an account
  const noAccountInLocalStorage = parsedAccount
    ? Object.keys(parsedAccount).length === 0
    : true;
  const noAccountInLocalState = context.account
    ? Object.keys(context.account).length === 0
    : true;
  const hasUserAccount = !noAccountInLocalStorage || !noAccountInLocalState;

  const handleSignOut = () => {
    const stringifySignOut = JSON.stringify(true);
    localStorage.setItem("sign-out", stringifySignOut);
    context.setSignOut(true);
  };

  const renderView = () => {
    if (hasUserAccount && !isUserSignOut) {
      return (
        <>
          <li className="text-black/60">{parsedAccount?.email}</li>
          <li>
            <NavLink
              to="/my-orders"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-account"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              My Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sign-in"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={() => handleSignOut()}
            >
              Sign Out
            </NavLink>
          </li>          
        </>
      );
    } else {
      return (
        <li>
          <NavLink
            to="/sign-in"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
            onClick={() => handleSignOut()}
          >
            Sign In
          </NavLink>
        </li>
      );
    }
  };
  return (
    <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-white">
      <ul className="flex items-center gap-3">
        <li className="font-semibold text-lg">
          <NavLink to={`${isUserSignOut ? "/sign-in" : "/"}`}>SHOPI</NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            onClick={() => context.setSearchByCategory()}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/clothing"
            onClick={() => context.setSearchByCategory("clothing")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Clothing
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/electronics"
            onClick={() => context.setSearchByCategory("electronics")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/men"
            onClick={() => context.setSearchByCategory("men")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Men
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/women"
            onClick={() => context.setSearchByCategory("women")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Women
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/jewelery"
            onClick={() => context.setSearchByCategory("jewelery")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Jewelery
          </NavLink>
        </li>
      </ul>
      <ul className="flex items-center gap-3">
        {renderView()}
        <li className="flex items-center">
          <ShoppingCart />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
