import { ChevronLeft, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { api } from "npm/utils/api";
import { useEffect, useState } from "react";

interface Ingredient {
  name: string;
  amount: string;
  unit: string;
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

// blank recipe
const blankRecipe: Recipe = {
  dishName: "",
  servingSize: "",
  prepTime: "",
  cookTime: "",
  ingredients: [],
  steps: []
};

export default function AddRecipe() {
  
  // calls api endpoints
  const allRecipes = api.example.getAllRecipes.useQuery();
  const addRecipes = api.example.addRecipe.useMutation();
  const deleteRecipes = api.example.deleteRecipe.useMutation();

  // recipe state
  const [recipe, setRecipe] = useState<Recipe>(blankRecipe);
  const {dishName, servingSize, prepTime, cookTime, ingredients, steps} = recipe;
  
  const updateRecipeField = (field: keyof Recipe, value: string) => setRecipe((prev) => {
    return {
      ...prev,
      [field]: value
    }
  })

  // State variable to track form validity
  const [isFormValid, setIsFormValid] = useState(false);

  // Function to check if the form is complete
  const isRecipeFormComplete = () => {
    return (
      dishName !== "" &&
      servingSize !== "" &&
      prepTime !== "" &&
      cookTime !== "" &&
      ingredients.length > 0 && // At least one ingredient
      steps.length > 0 // At least one step
    );
  };

  // Update form validity whenever recipe fields change
  useEffect(() => {
    setIsFormValid(isRecipeFormComplete());}, 
    [dishName, servingSize, prepTime, cookTime, ingredients, steps]);


  return (
    // body
    <div className="flex w-[100wh] h-[100vh] justify-center items-center bg-img bg-cover bg-center">
      {/* card */}
      <div className="card w-[420px] h-[600px] relative justify-start bg-primary text-primary-content shadow-cardxl shadow-second rounded-60px m-30px overflow-scroll">
        {/* go back button */}
        <Link className="mt-25px ml-25px mb-auto mr-auto h-[48px] w-[48px]" href="/">
          <button className="btn bg-primary btn-square">
            <ChevronLeft />
          </button>
        </Link>
        {/* input container */}
        <div className="justify-start flex flex-col items-center w-full h-full">
          {/* inputs */}
          <input
            className="input m-10px p-10px w-[50%] rounded-10px text-center outline-none font-bold mt-20px"
            type = "text"
            id= "dishName" 
            placeholder="Dish Name" 
            value={dishName} 
            onChange={({currentTarget: {value}}) => {updateRecipeField("dishName", value)}}>
          </input>
          <input
            className="input m-10px p-10px w-[50%] rounded-10px text-center outline-none font-bold "
            type = "text"
            id= "servingSize"  
            placeholder="Serving Size" 
            value={servingSize} 
            onChange={({currentTarget: {value}}) => {updateRecipeField("servingSize", value)}}>
          </input>
          <input
            className="input m-10px p-10px w-[50%] rounded-10px text-center outline-none font-bold "
            type = "text"
            id= "prepTime"  
            placeholder='Prep Time' 
            value={prepTime} 
            onChange={({currentTarget: {value}}) => {updateRecipeField("prepTime", value)}}>
          </input>
          <input
            className="input m-10px p-10px w-[50%] rounded-10px text-center outline-none font-bold "
            type = "text"
            id= "cookTime" 
            placeholder='Cook Time' 
            value={cookTime} 
            onChange={({currentTarget: {value}}) => {updateRecipeField("cookTime", value)}}>
          </input>
          {/* ingredient button */}
          <button 
          className="btn btn-outline btn-accent m-10px" 
          onClick={() => {
            setRecipe((prev) => {
              return {
                ...prev,
                  ingredients: [...prev.ingredients, {
                    name: "",
                    amount: "",
                    unit: ""
                }]}})
          }}>
            Ingredients <Plus />
          </button>
          {/* input boxes for ingredients */}
          {
            ingredients.map((ingredient, idx) => {
              return <div 
                key={idx} 
                className="flex justify-center items-center flex-row">
                <input 
                  className="input m-10px p-5px w-[10%] rounded-10px text-center outline-none font-bold "
                  placeholder="#" 
                  value={ingredients[idx]!.amount} 
                  onChange={({ currentTarget: { value}}) => setRecipe((prev) => {
                    const newIngredients = [...prev.ingredients];
                    newIngredients[idx]!.amount = value;
                    return {
                      ...prev,
                      ingredients: newIngredients
                  }})} />
                <select
                  className="select select-ghost"
                  value={ingredients[idx]!.unit}
                  onChange={({ currentTarget: { value } }) =>
                    setRecipe((prev) => {
                      const newIngredients = [...prev.ingredients];
                      newIngredients[idx]!.unit = value;
                      return {
                        ...prev,
                        ingredients: newIngredients,
                      };
                    })}>
                  <option disabled value="">Unit</option>
                  <option value="Teaspoon">Teaspoon</option>
                  <option value="Tablespoon">Tablespoon</option>
                  <option value="Cups">Cups</option>
                </select>
                <input 
                  className="input m-10px p-5px w-[45%] rounded-10px text-center outline-none font-bold "
                  placeholder="Ingredient Name" 
                  value={ingredients[idx]!.name} 
                  onChange={({ currentTarget: { value}}) => setRecipe((prev) => {
                    const newIngredients = [...prev.ingredients];
                    newIngredients[idx]!.name = value;
                    return {
                      ...prev,
                      ingredients: newIngredients
                  }})} />
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    const newIngredients = [...ingredients];
                    newIngredients.splice(idx, 1); // Remove the ingredient at index idx
                    setRecipe((prev) => ({
                      ...prev,
                      ingredients: newIngredients
                    }));
                  }}>
                  <Trash color="#FB6C6C" strokeWidth={3} absoluteStrokeWidth />
                </button>
            </div>
            })}
          {/* step button */}
          <button 
          className="btn btn-outline btn-accent m-10px" 
          onClick={() => {
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
              return <div 
                key={idx} 
                className="flex justify-center text-center items-center flex-row">
                <div 
                  className="m-10px font-bold text-10px text-textcolor" 
                  key={idx}>
                    {idx+1}. 
                </div>
                <input 
                  className="input m-10px p-5px w-[60%] rounded-10px outline-none font-bold text-center"
                  placeholder="Instruction" 
                  value={steps[idx]!.description} 
                  onChange={({ currentTarget: { value}}) => setRecipe((prev) => {
                    const newSteps = [...prev.steps];
                    steps[idx]!.description = value;
                    return {
                      ...prev,
                      steps: newSteps
                 }
                }
                )} />
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    const newSteps = [...steps];
                    newSteps.splice(idx, 1);
                    setRecipe((prev) => ({
                      ...prev,
                      steps: newSteps,
                    }));
                  }}>
                  <Trash color="#FB6C6C" strokeWidth={3} absoluteStrokeWidth />
                </button>
              </div>
            } )
          }
          {/* add recipe button */}
          <button 
            className="btn bg-accent text-white m-10px" 
            disabled={!isFormValid || addRecipes.isLoading} 
            onClick={async() => {
              await addRecipes.mutateAsync({
              ...recipe
              });
              setRecipe(blankRecipe);
              await allRecipes.refetch();
            }}>Add Recipe</button>
        </div>
      </div>
      {/* recipe list */}
      <div className="card w-[420px] h-[600px] relative justify-start text-center items-center text-primary-content bg-primary shadow-cardxl shadow-second rounded-60px m-30px overflow-scroll">
        <div className="font-bold text-20px mt-20px w-[100%] text-center">
          Recipe:
        </div>
        {
          allRecipes.isLoading ? 
            <div className="loading loading-spinner text-accent">
              loading
            </div> 
          : <ul className="recipeList">
            {allRecipes.data?.map(({ id, dishName, servingSize, prepTime, cookTime, ingredients, steps }) => {
              return <div key={id} className="flex flex-col justify-center text-center items-center">
                <div 
                  className="font-bold text-20px w-[100%]" 
                  key={id}>
                    {dishName}
                </div>
                <div 
                  className="font-bold text-20px w-[100%]" 
                  key={id}>
                    {servingSize} {servingSize == "1" ? "person" : "people"}
                </div>
                <div 
                  className="font-bold text-20px w-[100%]" 
                  key={id}>
                    {prepTime}
                </div>
                <div 
                  className="font-bold text-20px w-[100%]" 
                  key={id}>
                    {cookTime}
                </div>
                <div className="font-bold text-20px w-[100%]">
                  Ingredients:
                </div>
               {ingredients.map((ingredient, idx) => <div 
                  className="font-bold text-20px w-[100%]" 
                  key={idx}>
                    {ingredient.amount} {ingredient.unit} of {ingredient.name}
                </div>)}
                <div className="font-bold text-20px w-[100%]">
                  Steps:
                </div>
                {steps.map((step, idx) => <div 
                  className="font-bold text-20px w-[100%]" 
                  key={idx}>
                    {idx+1}. {step.description}
                </div>)}
                <button 
                  className="btn bg-accent text-white m-10px" 
                  disabled={deleteRecipes.isLoading} 
                  onClick={async() => {
                    await deleteRecipes.mutateAsync({ id })
                    await allRecipes.refetch();
                }}>
                  Delete
                </button>
              </div>
            })}
          </ul>
        }
      </ div>
    </ div>
    );
  }
