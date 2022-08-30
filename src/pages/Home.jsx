import React, { useState } from "react";

import { MdDelete } from "react-icons/md";
let arr = [
  { items: "Apple purchage from market", id: 1, check: false },
  { items: "Orange purchage from market", id: 2, check: true },
  { items: "Brinjal purchage from market", id: 3, check: false },
  { items: "Radish purchage from market", id: 4, check: true },
  { items: "Cucumber purchage from market", id: 5, check: false },
  { items: "Gava purchage from market", id: 6, check: true },
];

const Home = () => {
  const [toggle, setToggle] = useState({
    all: true,
    active: false,
    completed: false,
  });

  const [data, setData] = useState(arr);

  console.log(data);

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
      setData(arr);
    } else if (props === "active") {
      setToggle((i) => {
        return {
          ...i,
          all: false,
          active: true,
          completed: false,
        };
      });
      let filterData = data.filter((el) => el.check === false);

      setData(filterData);
    } else if (props === "completed") {
      setToggle((i) => {
        return {
          all: false,
          active: false,
          completed: true,
        };
      });
      let filterData = arr.filter((el) => el.check === true);

      setData(filterData);
    }
  };

  const handleChange = (e) => {
    const { value, checked } = e.target;

    setData(
      data.map((el) => {
        if (el.items === value) {
          return { ...el, check: true };
        }

        return el;
      })
    );
  };


  //  delete single Data
    const handleDeleteSinglData=(index)=>{
          
      let filterData = data.filter((el) => el.id !== index);

      setData(filterData);
     


    }

    // delete all the data
    const handleDeleteAll=()=>{
        
      let filterData = arr.filter((el) => el.check !== true);

      setData(filterData);

     

    }





  return (
    <div className="  h-screen  border border-indigo-600    ">
      <div>
        <h1 className="text-3xl text-center font-[600] mb-10  mt-10">#Todo</h1>

        <div className="   flex justify-center items-center flex-col gap-4  ">
          <div className=" w-[50%] flex text-xl  items-center  font-[600] border-b-2 border-gray-400  cursor-pointer justify-evenly  pb-2    ">
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

          <div className=" w-[50%]  flex justify-evenly  ">
            <input
              className=" w-[90%] placeholder:italic text-xl pl-5 py-2 rounded-md border-2 border-gray-400 outline-none "
              type="text"
              placeholder="Add items"
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
              Add
            </button>
          </div>

          <div className="w-[50%]  boder-2 border-red-200  ">
            {data.map((ele) => (
              <div className=" flex justify-between " key={ele.id}>
                <div className="flex gap-2 mb-5">
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

                {
                  toggle.completed ? <>
                  <div className=" cursor-pointer">
                  <MdDelete onClick={()=> {handleDeleteSinglData(ele.id) }} size={25} />
                </div>
                  </> : <></>
                }
               



              </div>
            ))}
          </div>
          {toggle.completed ? (
            <>
              <div className=" ml-[45%]  ">
                <button onClick={ handleDeleteAll } className=" bg-red-500 hover:bg-red-400  text-white font-bold py-2 px-4  rounded">
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