/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useDescope, useSession, useUser } from '@descope/react-sdk';
import validator from 'email-validator';



export default function SignUp(props) {
  const { isAuthenticated } = useSession();
  const { user } = useUser();
  const sdk = useDescope();
  const [contact, setContact] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('sms');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');

  const handleContactChange = (event) => {
    const value = event.target.value;
    const phonePattern = /^\d+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    if (phonePattern.test(value)) {
      setContact('+1' + value); // Add back the leading '+' character
      setDeliveryMethod('sms');
    } else if (emailPattern.test(value)) {
      setContact(value);
      setDeliveryMethod('email');
    } else {
      setContact(value);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const signUpOrInFunction = sdk.otp.signUpOrIn[deliveryMethod];
      const resp = await signUpOrInFunction(contact);
      console.log(resp);
      // OTP sent successfully
      setOtpSent(true);
    } catch (err) {
      console.error(err);
      // Handle the error
    }
  };

  const handleOtpChange = (event) => {
    setOtpCode(event.target.value);
  };

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleOtpSubmit = async (event) => {
    event.preventDefault();

    try {
      const verifyFunction = sdk.otp.verify[deliveryMethod];
      const resp = await verifyFunction(contact, otpCode);
      if (!resp.ok) {
        // Handle the error
      } else {
        const webhookResp = await fetch(
          'https://v1.nocodeapi.com/unlimitednow/ep/DAoYNuKCJGhyHIae',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone: contact, currentUrl }), // Use contact instead of phone // Include currentUrl in the request body
          }
        );

        // Handle the webhook response
        const webhookData = await webhookResp.json();
        console.log(webhookData);

        // Redirect to the link returned by the webhook
        if (webhookData.link) {
          window.location.href = webhookData.link;
        }
      }
    } catch (err) {
      console.error(err);
      // Handle the error
    }
  };
    return (
      <><div>
        <body className="min-h-screen flex flex-col justify-center bg-white dark:bg-gray-900">
        <div className="relative sm:py-16">
          <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 transition duration-300 delay-0">
            <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
            <div className="blur-[106px] h-32 bg-gradient-to-r from-pink-400 to-yellow-300"></div>
          </div>
          <div className="relative xl:container m-auto px-6 text-gray-500 md:px-12">
            <div className="m-auto space-y-8 sm:w-4/5 md:w-3/5 xl:w-2/5">
              <div className="p-8 md:py-12">
                <img src="https://res.cloudinary.com/unlimitednow/image/upload/v1683344041/https___res.cloudinary.com_unlimitednow_image_upload_v1675403872_landscape-format_-transparent-background_-shadow-designify_kfxh2w_rvwg4f.png" loading="lazy" alt=" logo" />
                <h2 className="mt-20 mb-8 text-3xl font-bold text-gray-800 dark:text-white">Welcome back to Unlimited Now.</h2>

                <p className="border-t border-gray-100 dark:border-gray-700 pt-6 text-sm text-gray-500 dark:text-gray-400">
 Don't have an account ?
 <a href="#" className="text-primary">Sign up</a>
 </p>
      <h1>Continue as Guest, Sign Up or in</h1>
      {deliveryMethod === 'email' ? (
        <Link href="/signup4">Use phone instead</Link>
      ) : (
        <Link href="/signup4">Use email instead</Link>
      )}
      {!isAuthenticated ? (
        <form className="space-y-8" onSubmit={handleFormSubmit}>
        <label className="text-gray-600 dark:text-gray-300">
          {deliveryMethod === 'email' ? 'Email' : 'Phone'}:
          <div className="relative flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 absolute left-4 inset-y-0 my-auto">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
          <input type="text" value={contact} onChange={handleContactChange}  required   autoComplete="username"
                  placeholder="Phone number or email"
                  className="focus:outline-none block w-full rounded-full placeholder-gray-500 bg-gray-100 dark:bg-gray-800 dark:border-gray-600 pl-12 pr-4 h-12 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-primary"/>
       <div className="absolute right-1">
                  <button type="submit" className="relative flex h-10 w-10 sm:w-max ml-auto items-center justify-center sm:px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95">
                    <span className="hidden relative text-base font-semibold text-black dark:text-white sm:block">Next</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="relative w-5 h-5 text-black dark:text-white sm:hidden">
                      <path fillRule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div> </div>  </label> 
                {otpSent ? (
        <>         <p> Resend Code.   <p className="text-gray-500 text-sm">By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Tailus and its affiliates to the number provided.</p> </p>

 </>
        ) : (
          <>
           <p className="border-t border-gray-100 dark:border-gray-700 pt-6 text-sm text-gray-500 dark:text-gray-400">
 Don't have an account ?
 <a href="#" className="text-primary">Sign up</a>
 </p>
          </>
        )}


   
      </form>
      ) : (
        <div>
          <p>Hello {user?.userId}!</p>
          <button onClick={() => sdk.logout()}>Logout</button>
        </div>
      )}
      {otpSent && (
        <form onSubmit={handleOtpSubmit}>
          <label>
            OTP Code:
            <input type="text"   className="focus:outline-none block w-full rounded-full placeholder-gray-500 bg-gray-100 dark:bg-gray-800 dark:border-gray-600 pl-12 pr-4 h-12 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-primary" placeholder="Enter code" value={otpCode} onChange={handleOtpChange}
            />
          </label>

          <button className="relative flex h-10 w-10 sm:w-max ml-auto items-center justify-center sm:px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95" type="submit">                    <span className="hidden relative text-base font-semibold text-black dark:text-white sm:block">Verify OTP</span>
</button>
        </form>
      )}


              
              </div>
            </div>
          </div>
        </div>
      </body>
         
        </div></>
    )
  }
  