import Head from "next/head";
import { SignedIn, SignedOut, SignOutButton, useAuth } from "@clerk/nextjs";

import { RouterOutputs, trpc } from "../utils/trpc";
import { AddTodo } from "../components/AddTodo/AddTodo";
import { TodoItem } from "../components/TodoItem/TodoItem";
import { Card } from "../components/Card/Card";
import { Welcome } from "../components/Welcome/Welcome";

const UserId = process.env.NOW_PUBLIC_USER_ID || 'user_2LSoovL0oXdM3kxYgjRnhDOuFrA';
const SpaceId = process.env.NOW_SPACE_ID || 'MeG79L4E';
const BlueprintId = process.env.NOW_BLUEPRINT_ID || '2a1a5415-69c2-466c-b516-303cac16d3ec';
console.log(UserId);
console.log(SpaceId);
console.log(BlueprintId);

export default function Home() {
  const unixTimestamp = Math.floor(Date.now() / 1000);
  console.log(unixTimestamp);
  


  const utils = trpc.useContext();
  const { isSignedIn } = useAuth();

  const { data: todos } = trpc.todo.list.useQuery(undefined, {
    enabled: isSignedIn,
  });

  const { mutate: addTodo } = trpc.todo.add.useMutation({
    onMutate: async (newTodo) => {
      await utils.todo.list.cancel();

      const previousTodos = utils.todo.list.getData();

      const optimisticTodo = {
        title: newTodo.title,
        createdAt: new Date().toISOString(),
        userId: "me",
        id: "optimistic_" + self.crypto.randomUUID(),
        isCompleted: false,
      };
      utils.todo.list.setData(undefined, (old) =>
        old ? [...old, optimisticTodo] : [optimisticTodo]
      );

      return { previousTodos };
    },
    onError: (_err, _newTodo, context) => {
      utils.todo.list.setData(undefined, context?.previousTodos);
    },
    onSettled: () => {
      utils.todo.list.invalidate();
    },
  });

  const { mutate: deleteTodo } = trpc.todo.delete.useMutation({
    onMutate: async (deletedTodo) => {
      await utils.todo.list.cancel();

      const previousTodos = utils.todo.list.getData();

      utils.todo.list.setData(undefined, (old) =>
        old ? old.filter((i) => i.id !== deletedTodo.id) : []
      );

      return { previousTodos };
    },
    onError: (_err, _newTodo, context) => {
      utils.todo.list.setData(undefined, context?.previousTodos);
    },
    onSettled: () => {
      utils.todo.list.invalidate();
    },
  });

  const { mutate: updateTodo } = trpc.todo.update.useMutation({
    onMutate: async (updatedTodo) => {
      await utils.todo.list.cancel();

      const previousTodos = await utils.todo.list.getData();
      utils.todo.list.setData(undefined, (old) =>
        old
          ? old.map((i) =>
              i.id === updatedTodo.id ? { ...i, ...updatedTodo } : i
            )
          : []
      );

      return { previousTodos };
    },
    onError: (_err, _newTodo, context) => {
      utils.todo.list.setData(undefined, context?.previousTodos);
    },
    onSettled: () => {
      utils.todo.list.invalidate();
    },
  });
async function fetchData() {
  try {
    const allowedUUID = '22-22-22'; // Replace with your actual authorized UUID
    const response = await fetch('https://nestjs-nextjs-trpc-monorepo-production.up.railway.app/actions', {
      method: 'GET', // Use 'POST' for a POST request
      // Additional headers and body can be included if needed
      Authorization: `Bearer ${allowedUUID}`,

    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data); // Handle the received data accordingly
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

  return (
    <>
      <Head>
        <title>Admin Portal</title>
        <meta name="description" content="Unlimited Now"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignedIn>
      <Card>
        <iframe
        src="https://app.pipefy.com/public/form/GQFpnawT"
        className="w-full h-full"
      ></iframe></Card>
      </SignedIn>
      <SignedOut>
        <Card>
          <header>
          <a href={ `test?blueprint&role=${BlueprintId}&projects=${SpaceId}&campaign=${unixTimestamp} `}>Create</a>
          </header>
          <Welcome />
        </Card>
      </SignedOut>

    </>
  );
}
