import { UserButton } from "@clerk/nextjs";
import Head from "next/head";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function Home() {

  return (
    <>
      <Head>
        <title>DishDex</title>
        <link rel="icon" href="/tablogo.ico" />
      </Head>
      <main className="fullPage fullPageBackground">
        <div className="body">
          <div className="user">
            <UserButton />
          </div>
          <div className="boxes">
          <div className="box1-content">
            <div className="flex flex-col h-[494px] w-[335px] m-25px bg-white rounded-60px shadow-cardxl relative">
              <Link className="mt-auto ml-auto mr-10px mb-10px h-[60px] w-[60px]" href="/recipe/addRecipe"><button className="btn btn-circle btn-secondary shadow-button"><Plus/></button></Link>
            </div>
            </div>
            <div className="box2" />
            <div className="box3" />
          </div>
        </div>
      </main>
    </>
  );
}

