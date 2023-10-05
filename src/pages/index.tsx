import { UserButton, useUser } from "@clerk/nextjs";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";


import { api } from "npm/utils/api";

export default function Home() {
  const user = useUser();

  const {data} = api.example.getAll.useQuery();

  return (
    <>
      <Head>
        <title>DishDex</title>
        <link rel="icon" href="/tablogo.ico" />
      </Head>
      <main>
        <div className="body">
          <div className="user">
            <UserButton />
          </div>
        </div>
      {/*
      <div>
        {data?.map((example) => (
          <div key={example.id}>{example.content}</div>
          ))}
      </div>
        */}
      </main>
    </>
  );
}
