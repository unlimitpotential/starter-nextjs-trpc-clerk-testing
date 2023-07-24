import Head from "next/head";
import { SignedIn, SignedOut, SignOutButton, useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Loading } from "@nextui-org/react";
import { Card } from "../components/Card/Card";
import { Welcome } from "../components/Welcome/Welcome";
import { Toaster, toast } from "sonner";

const authorizationKey = process.env.NOW_PUBLIC_API_KEY || "22-22-22";
const apiEndpoint = "https://nestjs-nextjs-trpc-monorepo-production.up.railway.app/actions";

const UserId = process.env.NOW_PUBLIC_USER_ID || "";
const SpaceId = process.env.NOW_SPACE_ID || "";
const BlueprintId = process.env.NOW_BLUEPRINT_ID || "";

const unixTimestamp = Math.floor(Date.now() / 1000);

export default function Home({ data }) {
  const [isValid, setIsValid] = useState(false);
  const { isSignedIn } = useAuth();
  const [setData] = useState(null);

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
      setData(jsonData);
      console.log(jsonData); // Handle the received data accordingly
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsValid(false);
      setData(null);
      toast.error("Error fetching data. Please try again later."); // Show error toast here
    }
  }

  useEffect(() => {
    if (isSignedIn) {
      fetchData()
        .then(() => {
          setIsValid(true);
          toast.success("Data fetched successfully!"); // Show success toast here
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setIsValid(false);
          toast.error("Error fetching data. Please try again later."); // Show error toast here
        });
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
          <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
              <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {data.map((item) => (
                    <Card
                      key={item.id}
                      title={item.email} // Display 'email' as the title in the card
                      description={`Phone: ${item.phone}`} // Display 'phone' in the description of the card
                    />
                  ))}
                </div>
              </div>
            </div>
            <SignOutButton />
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <Loading size="lg" color="secondary" type="points-opacity" />
          </div>
        )}

        {/* Add the Toaster component here */}
        <Toaster />

        <button onClick={() => toast("My first toast")}>
          Trigger Toast
        </button>
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
    const response = await fetch(
      "https://main-bvxea6i-wgvcdjzemdvhw.uk-1.platformsh.site/items/juaso"
    );
    const data = await response.json();

    // Pass the fetched data as props to the page
    return {
      props: { data },
    };
  } catch (error) {
    console.error("Error fetching data from Directus:", error.message);

    // You can return an empty data object or handle the error as needed
    return {
      props: { data: [] },
    };
  }
}
