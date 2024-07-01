"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LogInBtn from "./LogInBtn";

export default function Header() {
  const [clickedLink, setClickedLink] = useState<string | null>(null);

  const handleLinkClick = (link: string) => {
    setClickedLink(link);
  };

  return (
    <header>
      <div className="flex items-center justify-between gap-2 bg-zinc-800 px-8 py-4">
        <Link href="/">
          <div className="flex cursor-pointer gap-2">
            <Image src="/icons/logo.png" alt="logo" width={50} height={50} />
            <Image
              src="/imgs/chatfia.png"
              alt="chatfia"
              width={130}
              height={50}
            />
          </div>
        </Link>
        <div className="flex gap-20 text-xl">
          <Link
            href="/rule"
            className={clickedLink === "rule" ? "text-red-400" : ""}
            onClick={() => handleLinkClick("rule")}
          >
            게임설명
          </Link>
          <Link
            href="/lobby"
            className={clickedLink === "lobby" ? "text-red-400" : ""}
            onClick={() => handleLinkClick("lobby")}
          >
            게임로비
          </Link>
          <Link
            href="/donation"
            className={clickedLink === "donation" ? "text-red-400" : ""}
            onClick={() => handleLinkClick("donation")}
          >
            후원하기
          </Link>
        </div>
        <LogInBtn />
      </div>
    </header>
  );
}