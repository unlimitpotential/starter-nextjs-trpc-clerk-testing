/* eslint-disable react/jsx-key */
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

const unixTimestamp = Math.floor(Date.now() / 1000);
const DirectusCard = ({ data }) => {
  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <h2>{item.email}</h2>
          <p>{item.phone}</p>
          {/* Render other data fields as needed */}
        </div>
      ))}
    </div>
  );
};

export default function Home({ data }) {
  const [isValid, setIsValid] = useState(false);
  const [fetchedData, setFetchedData] = useState(null); // Define the state for fetched data
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
      setFetchedData(jsonData); // Update the state with the fetched data
      console.log(jsonData); // Handle the received data accordingly
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsValid(false);
      setFetchedData(null); // Set the fetched data to null in case of an error

      // Show an error toast when there's an error during data fetch
      toast.error('Error fetching data. Please try again later.');
    }
  }

  useEffect(() => {
    if (isSignedIn) {
      fetchData()
        .then(() => {
          // Show a success toast when data fetch is successful
          toast.success('Data fetched successfully!');
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setIsValid(false);

          // Show an error toast when there's an error during data fetch
          toast.error('Error fetching data. Please try again later.');
        });
    }
  }, [isSignedIn]);


  useEffect(() => {
    if (fetchedData && fetchedData.webhookResponseData && fetchedData.webhookResponseData.length > 0) {
      // Show each item's content in the webhookResponseData as a toast
      fetchedData.webhookResponseData.forEach((item, index) => {
        toast(item.content, {
          // You can customize the toast options here if needed
          position: 'top-right',
          duration: 6000, // Duration for showing the toast (in milliseconds)
        });
      });
    }
  }, [fetchedData]);

  return (
    <>
      <Head>
        <title>Admin Portal</title>
        <meta name="description" content="Unlimited Now" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignedIn>
                    {/* Your JSX elements for displaying valid data */}

        {isValid && fetchedData ? (
          <>
        <Toaster expand={true} />

            {/* Conditionally render the components for each item in webhookResponseData */}
           
          
            {fetchedData.webhookResponseData && fetchedData.webhookResponseData.content && (
  <SignOutButton />                )}
   {fetchedData.webhookResponseData && fetchedData.webhookResponseData.content2 && (
  <SignOutButton />                )}
            {/* ... (other JSX elements for displaying data) */}
            <button onClick={() => toast(`${fetchedData.message}`)}>
              <p>UUID is valid!</p>
            </button>

                    {/* Check if data is defined before rendering DirectusCard */}

                    <pre>{JSON.stringify(data, null, 2)}</pre>
          

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
      // Next.js will re-generate this page 
      // when a request comes in, at most once
      // every 10 seconds
    };
  } catch (error) {
    console.error('Error fetching data from Directus:', error.message);

    // You can return an empty data object or handle the error as needed
    return {
      props: { data: [] },
    };
  }
}
