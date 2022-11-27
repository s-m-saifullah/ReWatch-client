import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import blog_large from "../../assets/blog_large.jpg";
import blog_small from "../../assets/blog_small.jpg";

const Blog = () => {
  const [questionOneShow, setQuestionOneShow] = useState(false);
  const [questionTwoShow, setQuestionTwoShow] = useState(false);
  const [questionThreeShow, setQuestionThreeShow] = useState(false);
  const [questionFourShow, setQuestionFourShow] = useState(false);

  return (
    <div className=" 2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4">
      <h2 className=" font-semibold lg:text-4xl text-3xl lg:leading-9 md:leading-7 leading-9 text-gray-800">
        Frequently Asked Questions
      </h2>
      <div className="mt-4 flex md:justify-between md:items-start md:flex-row flex-col justify-start items-start">
        <div>
          <p className=" font-normal text-base leading-6 text-gray-600 lg:w-8/12 md:w-9/12 ">
            Here are few of the most frequently asked questions by our valuable
            customers.
          </p>
        </div>
      </div>
      <div className=" flex md:flex-row flex-col md:space-x-8 md:mt-16 mt-8">
        <div className=" md:w-5/12 lg:w-4/12 w-full ">
          <img
            src={blog_large}
            alt="Image of Watch"
            className="w-full md:block hidden"
          />
          <img
            src={blog_small}
            alt="Image of Watch"
            className="w-full md:hidden block "
          />
        </div>
        <div className=" md:w-7/12 lg:w-8/12 w-full md:mt-0 sm:mt-14 mt-10">
          {/* <!-- Question 1 --> */}
          <div onClick={() => setQuestionOneShow(!questionOneShow)}>
            <div className=" flex justify-between items-center cursor-pointer">
              <h3 className=" font-semibold text-xl leading-5 text-gray-800">
                What are the different ways of managing state in a React
                application?
              </h3>
              <button
                aria-label="too"
                className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
              >
                <FaPlus className={questionOneShow ? "hidden" : "block"} />
                <FaMinus className={questionOneShow ? "block" : "hidden"} />
              </button>
            </div>
            <div
              className={
                "font-normal text-lg leading-6 text-gray-600 mt-4 w-11/12 " +
                (questionOneShow ? "block" : "hidden")
              }
            >
              <p className="mb-2">
                There are four main types of state you need to properly manage
                in your React apps:
              </p>
              <ol className="list-decimal ml-5 mb-2">
                <li>Local State</li>
                <li>Global State</li>
                <li>Server State</li>
                <li>URL State</li>
              </ol>
              <p className="mb-2">
                <strong>Local State</strong> can be managed by
                <code className="p-1 bg-gray-200 mx-1">useState</code>and
                <code className="p-1 bg-gray-200 mx-1">useReducer</code>hook.
              </p>
              <p className="mb-2">
                <strong>Global State</strong> can be managed by
                <code className="p-1 bg-gray-200 mx-1">useReducer</code>and
                <code className="p-1 bg-gray-200 mx-1">useContext</code>hook.
                Third-party libraries like <strong>Redux</strong>,
                <strong>Zustand</strong> can also be used in this case.
              </p>
              <p className="mb-2">
                <strong>Server State</strong> can be managed by
                <code className="p-1 bg-gray-200 mx-1">useState</code>and
                <code className="p-1 bg-gray-200 mx-1">useEffect</code>hook.
                Third-party libraries like
                <strong>tanStack Query</strong> (Formerly React Query),
                <strong>SWR</strong> can also be used in fetching data.
              </p>
              <p className="mb-2">
                <strong>URL State</strong> can be managed by
                <code className="p-1 bg-gray-200 mx-1">useLocation</code>and
                <code className="p-1 bg-gray-200 mx-1">useHistory</code>hook.
              </p>
            </div>
          </div>

          <hr className=" my-7 bg-gray-200" />

          {/* <!-- Question 2 --> */}

          <div onClick={() => setQuestionTwoShow(!questionTwoShow)}>
            <div className=" flex justify-between items-center cursor-pointer">
              <h3 className=" font-semibold text-xl leading-5 text-gray-800">
                How does prototypical inheritance work?
              </h3>
              <button
                aria-label="too"
                className=" cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
              >
                <FaPlus className={questionOneShow ? "hidden" : "block"} />
                <FaMinus className={questionOneShow ? "block" : "hidden"} />
              </button>
            </div>
            <div
              className={
                "font-normal text-lg leading-6 text-gray-600 mt-4 w-11/12 " +
                (questionTwoShow ? "block" : "hidden")
              }
            >
              <p className="mb-2">
                All the objects in the JavaScript like{" "}
                <code className="p-1 bg-gray-200 mx-1">Array</code>,{" "}
                <code className="p-1 bg-gray-200 mx-1">Boolean</code>,{" "}
                <code className="p-1 bg-gray-200 mx-1">Date</code>etc. all
                inherit properties and methods from their prototype.
              </p>
              <p className="mb-2">
                <code className="p-1 bg-gray-200 mr-1">Object</code>
                is the at top of Prototype chain means all the other objects
                inherit their properties and methods from Object.prototype
              </p>
              <p className="mb-2">
                The main idea of Prototypal Inheritance is that an object can
                point to another object and inherit all its properties. The main
                purpose is to allow multiple instances of an object to share
                common properties, hence, the Singleton Pattern.
              </p>
            </div>
          </div>

          <hr className=" my-7 bg-gray-200" />

          {/* <!-- Question 3 --> */}

          <div
            onClick={() => {
              setQuestionThreeShow(!questionThreeShow);
            }}
          >
            <div className=" flex justify-between items-center cursor-pointer">
              <h3 className=" font-semibold text-xl leading-5 text-gray-800">
                What is unit test? Why should we write unit test?
              </h3>
              <button
                aria-label="too"
                className=" cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
              >
                <FaPlus className={questionOneShow ? "hidden" : "block"} />
                <FaMinus className={questionOneShow ? "block" : "hidden"} />
              </button>
            </div>
            <div
              className={
                "font-normal text-lg leading-6 text-gray-600 mt-4 w-11/12 " +
                (questionThreeShow ? "block" : "hidden")
              }
            >
              <p className="mb-2">
                Unit testing involves the testing of each unit or an individual
                component of the software application. It is the first level of
                functional testing. The aim behind unit testing is to validate
                unit components with its performance.
              </p>
              <p className="mb-2">
                A unit is a single testable part of a software system and tested
                during the development phase of the application software.
              </p>
              <p className="mb-2">
                The purpose of unit testing is to test the correctness of
                isolated code. A unit component is an individual function or
                code of the application. White box testing approach used for
                unit testing and usually done by the developers.
              </p>
              <p className="mb-2">
                <strong>
                  Some crucial reasons of unit testing is given below:
                </strong>
              </p>
              <ul className="list-disc ml-5 mb-2">
                <li>
                  Unit testing helps tester and developers to understand the
                  base of code that makes them able to change defect causing
                  code quickly.
                </li>
                <li>Unit testing helps in the documentation.</li>
                <li>
                  Unit testing fixes defects very early in the development phase
                  that's why there is a possibility to occur a smaller number of
                  defects in upcoming testing levels.
                </li>
                <li>
                  It helps with code reusability by migrating code and test
                  cases.
                </li>
              </ul>
            </div>
          </div>

          <hr className=" my-7 bg-gray-200" />

          {/* Question 4 */}

          <div onClick={() => setQuestionFourShow(!questionFourShow)}>
            <div className=" flex justify-between items-center cursor-pointer">
              <h3 className=" font-semibold text-xl leading-5 text-gray-800">
                React vs Angular vs Vue
              </h3>
              <button
                aria-label="too"
                className=" cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
              >
                <FaPlus className={questionOneShow ? "hidden" : "block"} />
                <FaMinus className={questionOneShow ? "block" : "hidden"} />
              </button>
            </div>
            <div
              className={
                "font-normal text-base leading-6 text-gray-600 mt-4 w-11/12 " +
                (questionFourShow ? "block" : "hidden")
              }
            >
              <div className="overflow-x-auto">
                <table className="table w-full">
                  {/* <!-- head --> */}
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>React</th>
                      <th>Angular</th>
                      <th>Vue Color</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <!-- row 1 --> */}
                    <tr>
                      <th>Type</th>
                      <td>Rich Library to build UI</td>
                      <td>A Framework</td>
                      <td>A library</td>
                    </tr>
                    {/* <!-- row 2 --> */}
                    <tr className="hover">
                      <th>
                        Development <br /> Approach
                      </th>
                      <td>Everything is on JavaScript</td>
                      <td>Based on Typescript</td>
                      <td>Based on JavaScript and HTML</td>
                    </tr>
                    {/* <!-- row 3 --> */}
                    <tr>
                      <th>
                        Maintained and <br /> Supported By
                      </th>
                      <td>Facebook</td>
                      <td>Google</td>
                      <td>Former Google Employee</td>
                    </tr>
                    {/* <!-- row 4 --> */}
                    <tr>
                      <th>Initial Release</th>
                      <td>March 2013</td>
                      <td>September 2016</td>
                      <td>February 2014</td>
                    </tr>
                    {/* <!-- row 5 --> */}
                    <tr>
                      <th>February 2014</th>
                      <td>
                        React provides you with modern widgets and in-built
                        features that help you develop SPA and mobile apps for
                        different platforms using a single codebase.
                      </td>
                      <td>
                        Undoubtedly, Angular is a mature framework,so if you
                        want to develop native apps, hybrid apps, and web
                        apps,Angular is good to go
                      </td>
                      <td>
                        Offering a wide choice of widgets that enables you to
                        build advanced SPA and start supporting Native apps.
                      </td>
                    </tr>
                    {/* <!-- row 6 --> */}
                    <tr>
                      <th>Model</th>
                      <td>Based on Virtual DOM (Document Object Model)</td>
                      <td>
                        Based on MVC (Model-View -Controller) architecture
                      </td>
                      <td>Based on Virtual DOM (Document Object Model)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <hr className=" my-7 bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default Blog;
