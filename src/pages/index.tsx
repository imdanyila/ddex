import { UserButton, useUser } from "@clerk/nextjs";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";


import { api } from "npm/utils/api";
import { useState } from "react";
import { set } from "zod";

export default function Home() {

  const allRecipes = api.example.getAllRecipes.useQuery();
  const addRecipes = api.example.addRecipe.useMutation();

  const [name, setName] = useState("");

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
          {/*
          <div className="recipes">
            <h1>Recipes:</h1>
            <ul>
              {allRecipes.data?.map((Recipe: { id: string; title: string }) => (
                <li key={Recipe.id}>
                  <Link href={`/recipes/${Recipe.id}`}>
                    <a>{Recipe.title}</a>
                  </Link>
                </li>
              ))}
            </ul>

            <Link href="/recipe/addRecipe">+</Link>

            <input value={name} onChange={({currentTarget: {value}}) => setName(value)}></input>
            <button disabled={addRecipes.isLoading} onClick={async() => {
              await addRecipes.mutateAsync({name: name})
              setName("")
              allRecipes.refetch();
            }}>Add Recipe</button>

          </div>
          */}
          <div className="boxes">
          <div className="box1-content">
            <div className="box1">
              <button className="plusSign"><img className="image" src="/plusSign.png" width={60} height={60} /></button>
              {/*<button className="filterIcon"><img className="image" src="/filterIcon.png" width={30} height={30} /></button>*/}
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

