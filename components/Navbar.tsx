import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

const navitems = [
  { name: "Sign In", href: "/sign-in" },
  { name: "Sign Up", href: "/sign-up" },
];

const Navbar = () => {
  return (
    <nav className="flex px-8 py-2 justify-between bg-white/25 backdrop-blur-lg w-full items-center border-b sticky top-0">
      <Link href={"/"} className="inline-flex items-center gap-4 ">
        <Image src="/Logo.png" width={38} height={38} alt="Dev_Logo" />
        <span className="logo-text">DevBlog</span>
      </Link>
      <ul className="flex gap-4 items-center">
        <li>
          <Link
            href={"/write-story"}
            className="inline-flex gap-2 items-center"
          >
            <PencilSquareIcon className="h-6 w-6 text-neutral-300" />
            <span className="text-neutral-500 text-sm">write</span>
          </Link>
        </li>
        <li>
          <SignedIn>
            <UserButton
              userProfileMode="navigation"
              userProfileUrl="/profile"
            />
          </SignedIn>
          <SignedOut>
            <ProfileDropdown />
          </SignedOut>
        </li>
      </ul>
    </nav>
  );
};

function ProfileDropdown() {
  return (
    <Menu>
      <MenuButton>
        <Image
          className="inline-block h-12 w-12 rounded-full ring-2 ring-white/45 mix-blend-multiply"
          width={50}
          height={50}
          alt="user avatar"
          src={"/icons/avatar.jpg"}
        />
      </MenuButton>
      <MenuItems
        anchor="bottom end"
        className={
          "bg-white/35 px-2 py-3 rounded-md w-32 mt-4 space-y-2 shadow-lg right-8 left-0"
        }
      >
        {navitems.map((nav) => {
          return (
            <MenuItem key={nav.name}>
              <Link className="dropdown-item" href={nav.href}>
                {nav.name}
              </Link>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
}

export default Navbar;
