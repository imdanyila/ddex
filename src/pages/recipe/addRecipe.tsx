import { ChevronLeft, Plus } from "lucide-react";
import Link from "next/link";
import { api } from "npm/utils/api";
import { useState } from "react";

interface Ingredient {
  name: string;
  amount: string;
}
interface Step {
  stepNumber: number;
  description: string;

}
interface Recipe{
  dishName: string;
  servingSize: string;
  prepTime: string;
  cookTime: string;
  ingredients: Ingredient[];
  steps: Step[];
}

export default function addRecipe() {
  // calls api endpoints
  const allRecipes = api.example.getAllRecipes.useQuery();
  const addRecipes = api.example.addRecipe.useMutation();
  const deleteRecipes = api.example.deleteRecipe.useMutation();

  // blank recipe
  const blankRecipe: Recipe = {
    dishName: "",
    servingSize: "",
    prepTime: "",
    cookTime: "",
    ingredients: [],
    steps: []
  };

  // recipe state
  const [recipe, setRecipe] = useState<Recipe>(blankRecipe);
  const {dishName, servingSize, prepTime, cookTime, ingredients, steps} = recipe;
  
  const updateRecipeField = (field: keyof Recipe, value: string) => setRecipe((prev) => {
    return {
      ...prev,
      [field]: value
    }
  })

  return (
    // body
    <div className="flex w-[100wh] h-[100vh] justify-center items-center bg-img bg-cover bg-center">
      {/* card */}
      <div className="card w-[400px] h-[600px] relative justify-start bg-primary text-primary-content shadow-cardxl shadow-second rounded-60px m-30px overflow-scroll">
        {/* go back button */}
        <Link className="mt-25px ml-25px mb-auto mr-auto h-[48px] w-[48px]" href="/"><button className="btn bg-primary btn-square"><ChevronLeft /></button></Link>
        {/* input container */}
        <div className="justify-start flex flex-col items-center w-full h-full">
          {/* inputs */}
          <input
          className="input m-30px p-10px w-[50%] rounded-10px text-center outline-none font-bold mt-20px"
            type = "text"
            id= "dishName" 
            placeholder="Dish Name" 
            value={dishName} 
            onChange={({currentTarget: {value}}) => {updateRecipeField("dishName", value)}}>
          </input>
          <input
            className="input m-30px p-10px w-[50%] rounded-10px text-center outline-none font-bold "
            type = "text"
            id= "servingSize"  
            placeholder="Serving Size" 
            value={servingSize} 
            onChange={({currentTarget: {value}}) => {updateRecipeField("servingSize", value)}}>
          </input>
          <input
            className="input m-30px p-10px w-[50%] rounded-10px text-center outline-none font-bold "
            type = "text"
            id= "prepTime"  
            placeholder='Prep Time' 
            value={prepTime} 
            onChange={({currentTarget: {value}}) => {updateRecipeField("prepTime", value)}}>
          </input>
          <input
            className="input m-30px p-10px w-[50%] rounded-10px text-center outline-none font-bold "
            type = "text"
            id= "cookTime" 
            placeholder='Cook Time' 
            value={cookTime} 
            onChange={({currentTarget: {value}}) => {updateRecipeField("cookTime", value)}}>
          </input>
          {/* ingredient button */}
          <button className="btn btn-outline btn-accent" onClick={() => {
            setRecipe((prev) => {
              return {
                ...prev,
                ingredients: [...prev.ingredients, {
                  name: "",
                  amount: ""
                }]}})
          }}>
            Ingredients <Plus />
          </button>
          {/* input boxes for ingredients */}
          {
            ingredients.map((ingredient, idx) => {
              return <div className="flex justify-center flex-row">
                 <input 
                  className="input m-10px p-5px w-[45%] rounded-10px text-center outline-none font-bold "
                 placeholder="Ingredient amount" value={ingredients[idx]!.amount} onChange={({ currentTarget: { value}}) => setRecipe((prev) => 
                {
                  const newIngredients = [...prev.ingredients];
                  newIngredients[idx]!.amount = value;
                 return {
                  ...prev,
                  ingredients: newIngredients
                 }
                }
                )} />
                <input 
                className="input m-10px p-5px w-[45%] rounded-10px text-center outline-none font-bold "
                placeholder="Ingredient Name" value={ingredients[idx]!.name} onChange={({ currentTarget: { value}}) => setRecipe((prev) => 
                {
                  const newIngredients = [...prev.ingredients];
                  newIngredients[idx]!.name = value;
                 return {
                  ...prev,
                  ingredients: newIngredients
                 }
                }
                )} />
              </div>
            } )
          }
          {/* step button */}
           <button className="btn btn-outline btn-accent" onClick={() => {
            setRecipe((prev) => {
              return {
                ...prev,
                steps: [...prev.steps, {
                                    stepNumber: prev.steps.length + 1,
                  description: ""
                }]
              }
            })
          }}>
            Instructions <Plus />
          </button>
          {/* input boxes for steps */}
           {
            steps.map((step, idx) => {
              return <div className="flex justify-center text-center items-center flex-row">
                <div className="m-10px font-bold text-10px text-textcolor" key={idx}>{idx+1}. </div>
                <input 
                className="input m-10px p-5px w-[60%] rounded-10px outline-none font-bold text-center"
                placeholder="Instruction" value={steps[idx]!.description} onChange={({ currentTarget: { value}}) => setRecipe((prev) => 
                {
                  const newSteps = [...prev.steps];
                  steps[idx]!.description = value;
                 return {
                  ...prev,
                  steps: newSteps
                 }
                }
                )} />
              </div>
            } )
          }
          {/* add recipe button */}
          <button className="btn bg-accent text-white" disabled={addRecipes.isLoading} onClick={async() => {
            await addRecipes.mutateAsync({
             ...recipe
            });
           setRecipe(blankRecipe);
            allRecipes.refetch();
            }}>Add Recipe</button>
        </div>
      </div>
      {/* recipe list */}
      <div className="card w-[400px] h-[600px] relative justify-start bg-primary text-primary-content shadow-cardxl shadow-second rounded-60px m-30px overflow-scroll">
        <div className="font-bold text-20px mt-20px w-[100%] text-center">Recipe:</div>
        {
          allRecipes.isLoading ? <div className="loading loading-spinner">loading</div> : <ul className="recipeList">
            {allRecipes.data?.map(({ id, dishName, servingSize, prepTime, cookTime, ingredients, steps }) => {
              return <div className="flex flex-col justify-center text-center items-center">
                <div className="font-bold text-20px w-[100%]" key={id}>{dishName}</div>
                <div className="font-bold text-20px w-[100%]" key={id}>{servingSize} people</div>
                <div className="font-bold text-20px w-[100%]" key={id}>{prepTime}</div>
                <div className="font-bold text-20px w-[100%]" key={id}>{cookTime}</div>
                <div className="font-bold text-20px w-[100%]">Ingredients:</div>
               {ingredients.map((ingredient, idx) => <div className="font-bold text-20px w-[100%]" key={idx}>{ingredient.name}</div>)}
                <div className="font-bold text-20px w-[100%]">Steps:</div>
                {steps.map((step, idx) => <div className="font-bold text-20px w-[100%]" key={idx}>{idx+1}. {step.description}</div>)}
                <button className="btn bg-accent text-white" disabled={deleteRecipes.isLoading} onClick={async() => {
                  await deleteRecipes.mutateAsync({ id })
                  allRecipes.refetch();
                }}>Delete</button>
              </div>
            })}
          </ul>
        }
      </ div>
    </ div>
    );
  }
