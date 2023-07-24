import Head from "next/head";
import { SignedIn, SignedOut, SignOutButton, useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import { RouterOutputs, trpc } from "../utils/trpc";
import { AddTodo } from "../components/AddTodo/AddTodo";
import { TodoItem } from "../components/TodoItem/TodoItem";
import { Card } from "../components/Card/Card";
import { Welcome } from "../components/Welcome/Welcome";

const authorizationKey = process.env.NOW_PUBLIC_API_KEY || '22-22-22';
const UserId = process.env.NOW_PUBLIC_USER_ID || '';
const SpaceId = process.env.NOW_SPACE_ID || '';
const BlueprintId = process.env.NOW_BLUEPRINT_ID || '';
console.log(UserId);
console.log(SpaceId);
console.log(BlueprintId);

export default function Home({ uuidValidationResult = { isValid: true } }) {
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
  const [data, setData] = useState(null);

  async function fetchData() {
    try {
      const response = await fetch('https://nestjs-nextjs-trpc-monorepo-production.up.railway.app/actions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authorizationKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData); // Handle the received data accordingly
    } catch (error) {
      console.error('Error fetching data:', error);
      setData(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


const [githubSites, setGithubSites] = useState([]);
const { userId} = useAuth();

useEffect(() => {
  const fetchGithubSites = async () => {
    try {
      const response = await fetch(`/api/uuid-1?userId=${UserId}`);
      const data = await response.json();
      setGithubSites(data);
    } catch (error) {
      console.error("Failed to fetch githubSites:", error);
    }
  };

  fetchGithubSites();
}, []);


return (
  <>
    <Head>
      <title>Admin Portal</title>
      <meta name="description" content="Unlimited Now" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <SignedIn>
    {uuidValidationResult.isValid && data ? (
        <>
          {/* Your JSX elements for displaying valid data */}
          <p>{data.message}</p>
        {/* Display webhook response data */}
        {data.webhookResponseData && (
          <p>{JSON.stringify(data.webhookResponseData)}</p>
        )}
             {/* ... (other JSX elements for displaying data) */}
          {githubSites.length > 0 ? (
            githubSites.map((site) => (
              <tr key={site.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <time>{site.createdAt}</time>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {site.siteName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {site.customCss}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a
                    href={site.subdomain}
                    className="text-orange-600 hover:text-orange-900"
                  >
                    View receipt
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>Loading...</td>
            </tr>
          )}
          <Card>
            <header>
              <a
                href={`blueprint-roles?blueprint&role=${BlueprintId}&projects=${SpaceId}&campaign=${unixTimestamp} `}
              >
                Create
              </a>
            </header>
            <section>
              <ul>
                {todos?.map((todo) => (
                  <TodoItem
                    id={todo.id}
                    key={todo.id}
                    title={todo.title}
                    isCompleted={todo.isCompleted}
                    onDelete={deleteTodo}
                    onEdit={updateTodo}
                  />
                ))}
              </ul>
            </section>
            <section>
              <AddTodo onAdd={fetchData} />
            </section>
            <footer>
              <p>
                Double-click to edit a todo - Press Enter to validate
              </p>
              <SignOutButton />
            </footer>
          </Card>
        </>
      ) : (
        <div>UUID is not valid</div>
      )}
    </SignedIn>
    <SignedOut>
      <Card>
        <header>
          <a
            href={`test?blueprint&role=${BlueprintId}&projects=${SpaceId}&campaign=${unixTimestamp} `}
          >
            Create
          </a>
        </header>
        <Welcome />
      </Card>
    </SignedOut>
  </>
);
}



