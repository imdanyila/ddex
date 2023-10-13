import Link from "next/link";
import { api } from "npm/utils/api";
import { useState } from "react";
import styled from "styled-components";

export default function AddRecipe() {
  // calls api endpoints
  const allRecipes = api.example.getAllRecipes.useQuery();
  const addRecipes = api.example.addRecipe.useMutation();
  const deleteRecipes = api.example.deleteRecipe.useMutation();

  // use state for each user input
  const [dishName, setName] = useState("");
  const [servingSize, setSize] = useState("");
  const [prepTime, setPrep] = useState("");
  const [cookTime, setCook] = useState("");

  return (
    <Body>
      <Container>
        <InputContainer>
          <Link href="/">Go Back</Link>
          <Input placeholder="Dish Name" value={dishName} onChange={({currentTarget: {value}}) => {setName(value)}}></Input>
          <Input placeholder="Serving Size" value={servingSize} onChange={({currentTarget: {value}}) => {setSize(value)}}></Input>
          <Input placeholder="Prep Time" value={prepTime} onChange={({currentTarget: {value}}) => {setPrep(value)}}></Input>
          <Input placeholder="Cook Time" value={cookTime} onChange={({currentTarget: {value}}) => {setCook(value)}}></Input>
          <AddButton disabled={addRecipes.isLoading} onClick={async() => {
            await addRecipes.mutateAsync({
              dishName: dishName,
              servingSize: servingSize,
              prepTime: prepTime,
              cookTime: cookTime
            })
            setName("");
            setSize("");
            setPrep("");
            setCook("");
            allRecipes.refetch();
          }}>Add Recipe</AddButton>
        </InputContainer>
        {
          allRecipes.isLoading ? <div>Loading...</div> : <ul className="recipeList">
            {allRecipes.data?.map(({ id, dishName, servingSize, prepTime, cookTime }) => {
              return <List>
                <Item key={id}>{dishName}</Item>
                <Item key={id}>{servingSize}</Item>
                <Item key={id}>{prepTime}</Item>
                <Item key={id}>{cookTime}</Item>
                <button disabled={deleteRecipes.isLoading} onClick={async() => {
                  await deleteRecipes.mutateAsync({ id })
                    allRecipes.refetch();
                }}>Delete</button>
              </List>
            })}
          </ul>
        }
      </Container>
    </Body>
    );
  }
  
const Body = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;
const Container = styled.div`

`;
const InputContainer = styled.div`

`;
const Input = styled.input`

`;
const AddButton = styled.button`

`;
const List = styled.div`

`;
const Item = styled.li`

`;