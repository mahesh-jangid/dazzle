import React from 'react';
import Router from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import { useAtom } from 'jotai';
import { NextPage } from 'next';
import useSetFormErrors from '../hooks/useSetFormErrors';
import atoms from '../util/atoms';
import useHandleSignIn from '../hooks/useHandleSignIn';
import handleSignIn from '../util/handleSignIn';
import InstagramSVG from '../components/svgComps/InstagramSVG';

const Login: NextPage = () => {
  const [listeners] = useAtom(atoms.listeners);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailFormErrors, setEmailFormErrors] = React.useState('');
  const [passwordFormErrors, setPasswordFormErrors] = React.useState('');
  const [, setUsernameFormErrors] = React.useState('');
  const [isSubmit, setIsSubmit] = React.useState(false);

  useSetFormErrors({
    email,
    password,
    setEmailFormErrors,
    setPasswordFormErrors,
    setUsernameFormErrors,
  });

  useHandleSignIn({ isSubmit });

  return (
    <div>
      <Head>
        <title>Dazzlone • Login</title>
        <meta name="description" content="Instagram Clone" />
        <link rel="icon" href="https://imagizer.imageshack.com/img922/3706/Q1vJOp.png" />
      </Head>
      <div className="loginone flex min-h-[100vh] w-full items-center justify-center bg-[#fafafa]">
        <div>
          <div className=" relative hidden h-[590px] overflow-hidden lg:block">
            <Image
              priority
              src="/loginFrame.png"
              alt="instagram"
              height={635}
              width={465}
            />
            <picture>
              <img src="/loginFrame.png" alt="instagram" />
            </picture>
            <div className="absolute top-[26px] right-14 h-full w-full">
              <div className="relative ">
                <div className="absolute top-0 right-0 h-[541px] w-[250px] animate-loginImage1 opacity-0">


               {/* login page image mobile */}

                  <Image
                    priority
                    src="/loginImg1.png"
                    alt="instagram"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div className="absolute top-0 right-0 h-[541px] w-[250px] animate-loginImage2 opacity-0">
                  <Image
                    src="/loginImg2.png\"
                    alt="instagram"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div className="absolute top-0 right-0 h-[541px] w-[250px] animate-loginImage3 opacity-0">
                  <Image
                    src="/loginImg3.png"
                    alt="instagram"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>

                <div className="absolute top-0 right-0 h-[541px] w-[250px] animate-loginImage4 opacity-0">
                  <Image
                    src="/loginImg4.png"
                    alt="instagram"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className=" flex max-w-[800px] flex-col items-center gap-9 justify-center border border-stone-300 bg-white">
            <div className="h-auto w-[175px] py-10">
              <InstagramSVG />
            </div>
            <div className="loginthree w-full px-5 sm:px-10">
              <form
                action=""
                className="signInPageFormContainer"
                onSubmit={(e: any) =>
                  handleSignIn({
                    e,
                    listeners,
                    passwordFormErrors,
                    emailFormErrors,
                    email,
                    password,
                    guest: false,
                    setIsSubmit,
                    setPasswordFormErrors,
                  })
                }
              >
                <label htmlFor="signInPageEmail">
                  {' '}
                  <input
                    className="  loginfour      w-full border border-stone-300 bg-[#fafafa] px-2 py-[22px] text-[44px] focus:outline-none"
                    type="email"
                    id="signInPageEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                  />
                </label>
                <p className=" h-[66px] max-w-[700px] pb-1 text-[22px] text-red-600">
                  {emailFormErrors}
                </p>
                <label htmlFor="signInPagePassword">
                  {' '}
                  <input
                    className="loginfive w-full border border-stone-300 bg-[#fafafa] px-2 py-[22px] text-[44px] focus:outline-none"
                    type="password"
                    id="signInPagePassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </label>
                <p className="h-[100px] max-w-[600px] text-[22px] text-red-600">
                  {passwordFormErrors}
                </p>
                <button
                  className={`${
                    emailFormErrors === '' && passwordFormErrors === ''
                      ? 'bg-[#02e0ce]'
                      : 'pointer-events-none cursor-default bg-[#7df5eb]'
                  } my-9 w-full rounded-[4px]  px-2 py-1 text-[44px] font-semibold text-white`}
                  type="submit"
                >
                  Log In
                </button>
                <div className="mb-5 flex h-25 items-center justify-center">
                  <div className="w-full border-b border-stone-300" />
                  <p className="mx-2 text-[40px] font-semibold text-[#6d6d6d]">
                    OR
                  </p>
                  <div className="w-full border-b border-stone-300" />
                </div>
                <button
                  className="mb-10 w-full rounded-[4px] bg-[#02e0ce] px-2 py-1 text-[44px] font-semibold text-white"
                  type="button"
                  onClick={(e: any) =>
                    handleSignIn({
                      e,
                      listeners,
                      passwordFormErrors,
                      emailFormErrors,
                      email,
                      password,
                      guest: true,
                      setIsSubmit,
                      setPasswordFormErrors,
                    })
                  }
                >
                  Guest Account
                </button>
              </form>
            </div>
          </div>
          <div className="mt-2 flex max-w-[3000px] justify-center border border-stone-300 bg-white py-5 text-[44px]">
            <p>Do not have an account?</p>
            <button
              className="ml-1 font-semibold text-[#faa70c]"
              type="button"
              onClick={() => Router.push('/SignUp')}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
