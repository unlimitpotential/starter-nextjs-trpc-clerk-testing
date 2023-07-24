// pages/index.js
import Head from "next/head";
import { SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const authorizationKey = process.env.NOW_PUBLIC_API_KEY || "22-22-22";
const apiEndpoint = "https://nestjs-nextjs-trpc-monorepo-production.up.railway.app/actions";

export default function Home() {
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
    }
  }

  useEffect(() => {
    if (isSignedIn) {
      fetchData();
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
            {/* Your JSX elements for displaying valid data */}
            <p>UUID is valid!</p>
          </>
        ) : (
          <div>UUID is not valid</div>
        )}
        <SignOutButton />
      </SignedIn>
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