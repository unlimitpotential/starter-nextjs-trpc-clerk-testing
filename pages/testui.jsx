import Head from "next/head";
import { SignedIn, SignedOut, SignOutButton, useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function Home({ data }) {
  const [fetchedData, setFetchedData] = useState(data);

  useEffect(() => {
    const intervalId = setInterval(fetchAndUpdateData, 5000); // Fetch data every 5 seconds

    return () => {
      clearInterval(intervalId); // Clean up the interval on component unmount
    };
  }, []);

  async function fetchAndUpdateData() {
    try {
      // No need to fetch data here, use the existing fetchedData
      setFetchedData(fetchedData => ({ ...fetchedData }));
    } catch (error) {
      console.error('Error updating data:', error.message);
      // You can handle the error here as needed
    }
  }

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
        {fetchedData.map((item) => (
          <div key={item.id}>
            <p>Email: {item.email}</p>
            <p>Phone: {item.phone}</p>
            {/* Render other fields here */}
          </div>
        ))}

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