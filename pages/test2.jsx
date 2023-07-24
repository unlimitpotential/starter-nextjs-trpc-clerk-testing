// pages/index.js
import Head from "next/head";
import { SignedIn, SignedOut, SignOutButton, useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Loading } from '@nextui-org/react';
import { Card } from "../components/Card/Card";
import { Welcome } from "../components/Welcome/Welcome";
import { Toaster, toast } from 'sonner';

const authorizationKey = process.env.NOW_PUBLIC_API_KEY || "22-22-22";
const apiEndpoint = "https://nestjs-nextjs-trpc-monorepo-production.up.railway.app/actions";

const UserId = process.env.NOW_PUBLIC_USER_ID || '';
const SpaceId = process.env.NOW_SPACE_ID || '';
const BlueprintId = process.env.NOW_BLUEPRINT_ID || '';



console.log(UserId);
console.log(SpaceId);
console.log(BlueprintId);

const unixTimestamp = Math.floor(Date.now() / 1000);
console.log(unixTimestamp);


export default function Home({ data }) {
  const [isValid, setIsValid] = useState(false);
  const { isSignedIn } = useAuth();

  async function fetchData() {
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authorizationKey}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      setIsValid(jsonData.isValid);
      console.log(jsonData); // Handle the received data accordingly
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsValid(false);
      setData(null);

    }
  }

  useEffect(() => {
    if (isSignedIn) {
      setIsValid(data.isValid); // Use the `isValid` value from the `data` prop
    }
  }, [isSignedIn]);

  

  return (
    <>
      <Head>
        <title>Admin Portal</title>
        <meta name="description" content="Unlimited Now" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignedIn>
      {isValid ? (
          <>
            <Toaster />
            {/* Your JSX elements for displaying valid data */}
            <p>{data.message}</p>
            {/* Display webhook response data */}
            {data.webhookResponseData && (
              <p>{JSON.stringify(data.webhookResponseData)}</p>
            )}
            {/* ... (other JSX elements for displaying data) */}
            <p>UUID is valid!</p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <SignOutButton />
          </>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <Loading size="lg" color="secondary" type="points-opacity" />
          </div>
        )}
       
      </SignedIn>
      <SignedOut>
      <Card>
        <Welcome />
      </Card>
    </SignedOut>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    // Fetch data from Directus
    const response = await fetch('https://main-bvxea6i-wgvcdjzemdvhw.uk-1.platformsh.site/items/juaso');
    const data = await response.json();

    // Pass the fetched data as props to the page
    return {
      props: { data },
    };
  } catch (error) {
    console.error('Error fetching data from Directus:', error.message);

    // You can return an empty data object or handle the error as needed
    return {
      props: { data: [] },
    };
  }
}