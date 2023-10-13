import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "npm/server/api/trpc";

export const exampleRouter = createTRPCRouter({
    getAllRecipes: publicProcedure.query(async ({ ctx }) => {
        const allRecipes = await ctx.db.recipe.findMany();
        return allRecipes
    }),
    addRecipe: publicProcedure.input(z.object({
        dishName: z.string(),
        servingSize: z.string(),
        prepTime: z.string(),
        cookTime: z.string(),
    })).mutation(async ({ input, ctx }) => {
        const newRecipe = await ctx.db.recipe.create({
            data: {
                dishName: input.dishName,
                servingSize: input.servingSize,
                prepTime: input.prepTime,
                cookTime: input.cookTime
            }
        })
        return newRecipe;
    }),
    deleteRecipe: publicProcedure.input(z.object({
        id: z.number()
    })).mutation(async ({ input, ctx }) => {
        const deleteRecipe = await ctx.db.recipe.delete({
            where: {
                id: input.id
            }
        })
        return deleteRecipe;
    })
});