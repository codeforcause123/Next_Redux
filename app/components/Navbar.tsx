import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-neutral-300">
      <Link className="btn btn-ghost text-xl" href="/">
        NextTs
      </Link>
    </div>
  );
};

export default Navbar;
