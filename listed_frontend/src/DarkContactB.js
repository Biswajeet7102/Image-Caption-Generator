import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./App.css"


function DarkContactB(props) {
  const [loading,setLoading]=useState(false);
  const [present, setPresent] = useState("");
  const [background, setBackground] = useState("#0093E9");
  const [data, setData] = useState({
    img_url: "",
  });

  const handleChange = (event) => {
    
    setData({ ...data, img_url: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    axios
      .post("http://127.0.0.1:5000/", data, config)
      .then((response) => {
       setLoading(true);
        

        const res = response.data;
        console.log(res);
        setPresent(res);
        setData(res);
        setLoading(false);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false); // set the loading state to false in the finally block
      });
  };
  return (
    
    <section className="text-gray-400 bg-gray-900 body-font relative h-[100vh]">
      
      <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap h-[100vh]">
        <div
          style={{ justifyContent: "center" }}
          className="lg:w-2/3 md:w-1/2 bg-gray-900 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative"
        >
          <div className="bg-gray-700 h-full relative flex flex-wrap py-6 rounded shadow-md">
            <div className="lg:w-[100%] px-6">
              <h2 className="title-font font-semibold text-white tracking-widest text-lg mb-5">
                GENERATED CAPTIONS {loading ? "Loading..." : null}

              </h2>
              <ul style={{ listStyleType: "circle" }} className="liItems">
                <li >
                
                  {present[0]}

                   
                  
                </li>
                <li>
                  
                  {present[1]}
                  
                </li>
                <li>
                  
                  {present[2]}
                  
                </li>
                <li>
                  
                  {present[3]}
                  
                </li>
                <li>
                  
                  {present[4]}
                  
                </li>
                <li>
                  
                  {present[5]}
                  
                </li>
                <li>
                  
                  {present[6]}
                  
                </li>
                <li>
                  
                  {present[7]}
                  
                </li>
                <li>
                  
                  {present[8]}
                  
                </li>
                <li>
                  
                  {present[9]}
                  
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
          <h2 className="text-white text-lg mb-1 font-medium title-font">Enter Your Image Link</h2>
          <p className="leading-relaxed mb-5">
            Enter the link of the image that you want to generate caption.
          </p>
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-400">
              Image Link
            </label>
            <input
              type="text"
              id="name"
              name="link"
              value={data.link}
              onChange={handleChange}
              className={`w-full bg-gray-800 rounded border border-gray-700 focus:ring-2 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
            />
          </div>

          <button
          onClick={handleSubmit}
          style={{ background: background, "!important": true }}
            onMouseEnter={() => {
              setBackground("#0093E9");
            }}
            onMouseLeave={() => {
              setBackground("#0480C6");
            }}
            className={`text-white border-0 py-2 px-6 focus:outline-none rounded text-lg`}
            
          >
            Button
          </button>
          <p className="text-xs text-gray-400 text-opacity-90 mt-3">
            Made with Love by Biswajeet Mohanty, an aspiring AI/ML Engineer
          </p>
        </div>
      </div>
    </section>
  );
}

DarkContactB.defaultProps = {
  theme: "indigo",
};

DarkContactB.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default DarkContactB;
