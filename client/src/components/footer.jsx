import React from "react";
import { BsIncognito } from "react-icons/bs";
import { FaGithub } from "react-icons/fa6";

import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer bg-neutral text-neutral-content items-center p-4">
      <aside className="grid-flow-col items-center">
        <BsIncognito size={40} />

        <p>Copyright © 2024 Anon - All right reserved</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a>
          <FaGithub size={33} />
        </a>
        <a>
          <FaSquareXTwitter size={33} />
        </a>
        <a>
          <FaYoutube size={35} />
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
