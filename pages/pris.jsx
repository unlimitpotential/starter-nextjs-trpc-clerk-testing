import { currentUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { SignedIn, SignedOut, SignOutButton, useAuth } from "@clerk/nextjs";

const UserId = process.env.NOW_PUBLIC_USER_ID || '';

const Dashboard = () => {
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
    <SignedIn>
      <tbody className="bg-white divide-y divide-gray-200">
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
      </tbody>
      <style jsx>{`
        #showcase-websites::-webkit-scrollbar {
          display: none;
        }
        #showcase-websites {
          -ms-overflow-style: none;
        }
        #websites::-webkit-scrollbar {
          display: none;
        }
        #websites {
          -ms-overflow-style: none;
        }
      `}</style>
    </SignedIn>
  );
};

export default Dashboard;
