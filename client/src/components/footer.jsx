import React from "react";
import { BsIncognito } from "react-icons/bs";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
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
        <Link href="https://github.com/yash-raj10">
          <FaGithub size={33} />
        </Link>
        <Link href="https://x.com/yashrajstwt">
          <FaSquareXTwitter size={33} />
        </Link>
        <Link href="https://www.youtube.com/@yashraj.10">
          <FaYoutube size={35} />
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
