import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "npm/server/api/trpc";

export const exampleRouter = createTRPCRouter({
    getAllRecipes: publicProcedure.query(async ({ ctx }) => {
        const allRecipes = await ctx.db.recipe.findMany({
            include: {
                ingredients: true,
                steps: true,
            }
        });
        return allRecipes
    }),
    addRecipe: publicProcedure.input(z.object({
        dishName: z.string(),
        servingSize: z.string(),
        prepTime: z.string(),
        cookTime: z.string(),
        steps: z.array(z.object({
            stepNumber: z.number(), 
    description: z.string()       })),
    ingredients: z.array(z.object({
        name: z.string(),
        amount: z.string(),
    }))
    })).mutation(async ({ input:{ steps, ingredients, ...other}, ctx }) => {
        return await ctx.db.recipe.create({
            data: {
                ...other,
                steps: {
                    createMany: {
                        data: steps
                    }
                },
                ingredients: {
                    createMany: {
                        data: ingredients
                    }
                }
            }
        })
    }),
    deleteRecipe: publicProcedure.input(z.object({
        id: z.number()
    })).mutation(async ({ input, ctx }) => {
        await ctx.db.step.deleteMany({
            where: {
                recipeId: input.id
            }
        })
        await ctx.db.ingredient.deleteMany({
            where: {
                recipeId: input.id
            }
        })
        const deleteRecipe = await ctx.db.recipe.delete({
            where: {
                id: input.id
            },
            include: {
                ingredients: true,
                steps: true,
            }
        })
        return deleteRecipe;
    })
});