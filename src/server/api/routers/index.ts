import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "npm/server/api/trpc";

export const recipeRouter = createTRPCRouter({
    getAllRecipes: publicProcedure.query(async ({ctx}) => {
        const allRecipes = await ctx.db.recipe.findMany();
        return allRecipes;
    }),
    addRecipe: publicProcedure.input(z.object({ 
        dishname: z.string(),
        prepTime: z.number(),
        cookTime: z.number(),
        servings: z.number(),
        Instructions: z.array(z.string()),  
        ingredientsForRecipe: z.array(
            z.object({
                ingredient: z.string(),
                quantity: z.number(),
                unit: z.string()
            })),
    })).query(async ({ input, ctx }) => {
        const newRecipe = await ctx.db.recipe.create({
            data: {
                dishName: input.dishname,
                prepTime: input.prepTime,
                cookTime: input.cookTime,
                servings: input.servings,
                instructions: {
                     create: input.Instructions.map((instruction) => ({
                        instruction: instruction,
                        recipe: ''
                    }))
                },
                ingredients: {
                    create: input.ingredientsForRecipe.map((ingredient) => ({
                        name: ingredient.ingredient,
                        quantity: ingredient.quantity,
                        unit: ingredient.unit,
                        ingredient: ''
                    }))
                }
            }
        })
        return newRecipe;
    })
});