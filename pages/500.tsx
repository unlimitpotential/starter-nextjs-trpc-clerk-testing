/* eslint-disable react/no-unescaped-entities */
export default function Custom500() {
    return <><h1>500 - Server-side error occurred</h1><div className="rounded-md bg-purple-50 p-4">
        <div className="flex">
            <div className="flex-shrink-0">
            </div>
            <div className="ml-3">
                <h3 className="text-sm font-medium text-purple-700">Sorry there's been an error</h3>
                <div className="mt-2 text-sm text-purple-700">
                    <a href="http://status.unlimitpotential.com">View our status or</a> 
                </div>
                <div className="mt-4">
                    <div className="-mx-2 -my-1.5 flex">
                        <button
                            type="button"
                            className="bg-purple-50 px-2 py-1.5 rounded-md text-sm font-medium text-purple-800 hover:bg-pruple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-50 focus:ring-blue-600"
                        >
                        for immediate help please contact tech support at support@unlimitpotential.com
                        </button>
                        <button
                            type="button"
                            className="ml-3 bg-purple-50 px-2 py-1.5 rounded-md text-sm font-medium text-purple-800 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-50 focus:ring-blue-600"
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div></>;
  }