import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";


// get local storage data
const getLocalStorageData = () => {
  const lists = localStorage.getItem("todoData");
  console.log(lists);
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Home = () => {
  const [toggle, setToggle] = useState({
    all: true,
    active: false,
    completed: false,
  });

  // const [data, setData] = useState(arr);

  const [input, setInput] = useState("");

  //  getting userInput from Child component 
  
   

  const [allData, setAllData] = useState(getLocalStorageData());

  const [showData, setShowData] = useState(getLocalStorageData());

  console.log("all data", allData);

  const handleClick = (props) => {
    if (props === "all") {
      setToggle((i) => {
        return {
          ...i,
          all: true,
          active: false,
          completed: false,
        };
      });
      setShowData(getLocalStorageData());
    } else if (props === "active") {
      setToggle((i) => {
        return {
          ...i,
          all: false,
          active: true,
          completed: false,
        };
      });

      let filterData = allData.filter((ele) => ele.check === false);

      setShowData(filterData);
    } else if (props === "completed") {
      setToggle((i) => {
        return {
          all: false,
          active: false,
          completed: true,
        };
      });
      let filterData = allData.filter((ele) => ele.check === true);

      setShowData(filterData);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;

    setShowData(
      showData.map((el) => {
        if (el.items === value) {
          return { ...el, check: true };
        }

        return el;
      })
    );
    setAllData(
      allData.map((el) => {
        if (el.items === value) {
          return { ...el, check: true };
        }
        return el;
      })
    );
  };

  // add data

  const addData = () => {
    if (!input) {
      alert("Please add items");
    } else {
      setAllData([
        ...allData,
        { items: input, id: new Date().getTime().toString(), check: false },
      ]);
      localStorage.setItem("todoData", JSON.stringify(allData));

      if (!toggle.completed)
        setShowData([
          ...showData,
          { items: input, id: new Date().getTime().toString(), check: false },
        ]);

      setInput("");
    }
  };

  //  delete single Data
  const handleDeleteSinglData = (index) => {
       let filterData=showData.filter((currI)=> currI.id!==index)
       let filterData2=allData.filter((currI)=> currI.id!==index)
        setShowData(filterData)
        setAllData(filterData2)

  };

  // delete all the data
  const handleDeleteAll = () => {

    let filterData=showData.filter((currI)=> currI.check===false)
    let filterData2=allData.filter((currI)=> currI.check===false)
    setShowData(filterData)
    setAllData(filterData2)
  };

  // adding localstorage

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(allData));
  }, [allData]);

  return (
    <div className="  h-screen  border    ">
      <div>
        <h1 className="text-3xl text-center font-[600] mb-10  mt-10">#Todo</h1>

        <div className="   flex justify-center items-center flex-col gap-4  ">
          <div className="  gap-12 md:w-[50%] flex text-xl  items-center  font-[600] border-b-2 border-gray-400  cursor-pointer md:justify-evenly  pb-2    ">
            <span
              className={toggle.all ? "border-b-4 border-blue-400   " : ""}
              onClick={() => {
                handleClick("all");
              }}
            >
              All
            </span>
            <span
              className={toggle.active ? "border-b-4 border-blue-400" : ""}
              onClick={() => {
                handleClick("active");
              }}
            >
              Active
            </span>
            <span
              className={toggle.completed ? "border-b-4 border-blue-400" : ""}
              onClick={() => {
                handleClick("completed");
              }}
            >
              Completed
            </span>

          </div>
            {/*  user from input */}
          <div className="   gap-2  md:w-[50%]  flex md:justify-evenly  justify-center  ">
            <input
              className=" w-[60%]  md:w-[90%]  placeholder:italic text-xl pl-5 py-2 rounded-md border-2 border-gray-400 outline-none "
              type="text"
              placeholder="Add items"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
           
            <button
              onClick={() => {
                addData();
              }}
              
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Add
            </button>
          </div>

          <div className=" w-[100%]  pl-12 md:pl-0 md:pr-0 pr-12 md:w-[50%]  boder-2 border-red-200  ">
            {showData.map((ele) => (
              <div className=" flex justify-between  " key={ele.id}>
                <div className="flex  gap-2 mb-5">
                  <input
                    type="checkbox"
                    value={ele.items}
                    onChange={handleChange}
                    className=" w-4  cursor-pointer "
                    checked={ele.check}
                  />
                  <label className={ele.check ? "line-through" : ""}>
                    {ele.items}
                  </label>
                </div>

                {toggle.completed ? (
                  <>
                    <div className=" cursor-pointer">
                      <MdDelete
                        onClick={() => {
                          handleDeleteSinglData(ele.id);
                        }}
                        size={25}
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
          {toggle.completed ? (
            <>
              <div className=" ml-[45%]  ">
                <button
                  onClick={handleDeleteAll}
                  className=" bg-red-500 hover:bg-red-400  text-white font-bold py-2 px-4  rounded"
                >
                  Delete All{" "}
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
