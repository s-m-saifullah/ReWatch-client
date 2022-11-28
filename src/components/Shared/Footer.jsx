import React from "react";
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import LogoDark from "../../assets/logo-dark.svg";

const Footer = () => {
  return (
    <div className="pt-12">
      <footer id="footer" className="relative z-50 bg-gray-900 pt-24">
        <div className=" border-t border-b border-gray-700 py-16">
          <div className="mx-auto container px-4 xl:px-12 2xl:px-4">
            <div className="lg:flex">
              <div className="w-full lg:w-1/2 mb-16 lg:mb-0 flex">
                <div className="w-full lg:w-1/2 px-6">
                  <ul>
                    <li>
                      <Link className="text-xs lg:text-sm leading-none hover:text-brand text-gray-50">
                        Components
                      </Link>
                    </li>
                    <li className="mt-6">
                      <Link className="text-xs lg:text-sm leading-none hover:text-brand text-gray-50">
                        Templates
                      </Link>
                    </li>
                    <li className="mt-6">
                      <Link className="text-xs lg:text-sm leading-none hover:text-brand text-gray-800 dark:text-gray-50">
                        Pricing
                      </Link>
                    </li>
                    <li className="mt-6">
                      <Link className="text-xs lg:text-sm leading-none hover:text-brand  text-gray-50">
                        FAQ
                      </Link>
                    </li>
                    <li className="mt-6">
                      <a className="text-xs lg:text-sm leading-none hover:text-brand text-gray-50">
                        Documentation
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-1/2 px-6">
                  <ul>
                    <li>
                      <Link className="text-xs lg:text-sm leading-none hover:text-brand text-gray-50">
                        Free components
                      </Link>
                    </li>

                    <li className="mt-6">
                      <Link className="text-xs lg:text-sm leading-none hover:text-brand text-gray-50">
                        Blog
                      </Link>
                    </li>
                    <li className="mt-6">
                      <Link className="text-xs lg:text-sm leading-none hover:text-brand text-gray-50">
                        Changelog
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full lg:w-1/2 flex">
                <div className="w-full lg:w-1/2 px-6">
                  <ul>
                    <li>
                      <a className="text-xs lg:text-sm leading-none hover:text-brandtext-gray-50">
                        Privacy policy
                      </a>
                    </li>
                    <li className="mt-6">
                      <Link className="text-xs lg:text-sm leading-none hover:text-brand text-gray-50">
                        Terms of service
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-1/2 px-6 flex flex-col justify-between">
                  <div className="flex items-center mb-6">
                    <a>
                      <div className="text-gray-800 dark:text-gray-50 cursor-pointer hover:text-brand">
                        <FaTwitter />
                      </div>
                    </a>
                    <a>
                      <div className="ml-3 text-gray-800 dark:text-gray-50 cursor-pointer hover:text-brand">
                        <FaFacebook />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-16 flex flex-col justify-center items-center">
          <img src={LogoDark} className="w-32" alt="footer logo" />
          <p className="mt-6 text-xs lg:text-sm leading-none text-gray-900">
            {new Date().getFullYear()} ReWatch. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
