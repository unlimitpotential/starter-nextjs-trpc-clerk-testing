import Head from "next/head";
import { SignedIn, SignedOut, SignOutButton, useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function Home({ data }) {
  // Your component logic here

  return (
    <>
      <Head>
        <title>Admin Portal</title>
        <meta name="description" content="Unlimited Now" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignedIn>
        {/* Your JSX elements for when the user is signed in */}
        {/* Display the fetched data */}
        <pre>{JSON.stringify(data, null, 2)}</pre>
        {/* ... (rest of your JSX elements) */}
      </SignedIn>
      <SignedOut>
        {/* Your JSX elements for when the user is signed out */}
        {/* ... (rest of your JSX elements) */}
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