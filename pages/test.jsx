import { useRouter } from "next/router";
import React, { Fragment } from "react";



const Layout = ({ children, title }) => {
   const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const urlParams = new URLSearchParams(currentUrl);
  const role = urlParams.get('role');
  const blueprint = urlParams.get('blueprint');
  const project = urlParams.get('projects');
  const campaign = urlParams.get('campaign');
  const projectRegex = /projects\?=([^&]+)/;
  const match = currentUrl.match(projectRegex);
  const project2 = match ? match[1] : '';

  console.log('Role:', role);
  console.log('Project:', project);
  console.log('Campaign:', campaign);
  console.log('space-slug:', project2);
  console.log('blueprint:', blueprint);

    return (
      
        <><div className="p-4">
            <a
                href="#"
                onClick={handleGoBack}
                className="a-10"
            >
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-lg font-medium bg-gray-100 text-black">
                    ←
                </span>
            </a>
        </div><main className="w-full md:flex-grow">
                {project ? (
                    <li className="flex items-center space-x-1">
                        <span className="text-black">/</span>
                        <a rel="noopener noreferrer" href="#" className="flex items-center px-1 capitalize hover:underline">
                            {project}
                        </a>
                    </li>
                ) : null}
                {campaign ? (
                    <li className="flex items-center space-x-1">
                        <span className="text-black">/</span>
                        <a href="#" className="flex items-center px-1 capitalize hover:underline">
                            {campaign}
                        </a>
                    </li>
                ) : null}
                {role ? (
                    <li className="flex items-center space-x-1">
                        <span className="text-black">/</span>
                        <a rel="noopener noreferrer" href="/blueprints" className="flex items-center px-1 capitalize hover:underline hover:no-underline cursor-default">
                            {role}
                        </a>
                    </li>
                ) : "No role selected"}
                <a
                    href="https://console.unlimitpotential.com/start"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 absolute top-4 right-4"
                >
                    Console
                </a>
                {title && (
                    <><h1 className="text-black text-2xl font-bold mb-4 mt-10 pr-4 pl-4 pt-4">
                        {title}
                    </h1></>
                )}
             
            </main></>
     
    );
};

export default Layout;