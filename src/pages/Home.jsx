import React, { useEffect, useState } from "react";

import { MdDelete } from "react-icons/md";


// get local storage data 
const getLocalStorageData=()=>{
        const lists=localStorage.getItem('todoData')
       if(lists){
        return  JSON.parse(lists)
       }else{
        return []
       }
}


const Home = () => {

  const [toggle, setToggle] = useState({
    all: true,
    active: false,
    completed: false,
  });

  // const [data, setData] = useState(arr);

   const [input,setInput]=useState('');

   const [allData,setAllData]=useState(getLocalStorageData())

   const [acitved,setActived]=useState(getLocalStorageData())
    const [completedd,setCompletedd]=useState(getLocalStorageData())

   

    console.log("all data",allData)

     console.log("active Data",acitved)
     console.log("completed" , completedd)

    
  

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
        setAllData(allData);
    } else if (props === "active") {
      setToggle((i) => {
        return {
          ...i,
          all: false,
          active: true,
          completed: false,
        };
      });
      let filterData =  acitved.filter((el) => el.check === false);
       setActived(filterData);
    } else if (props === "completed") {
      setToggle((i) => {
        return {
          all: false,
          active: false,
          completed: true,
        };
      });
      let filterData = completedd&& completedd.filter((el) => el.check === true);

      setCompletedd(filterData);
    }
  };

  const handleChange = (e) => {
    const { value, checked } = e.target;

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

    const addData=()=>{

         if(!input){
          alert("Please add items")
         }else{
     
           setAllData( [...allData,{ items:input, id: new Date().getTime().toString(), check: false }])
           setInput('')
         }
 
    }
   

  //  delete single Data
    const handleDeleteSinglData=(index)=>{
          
      let filterData = completedd.filter((el) => el.id !== index);

      setCompletedd(filterData);
     


    }

    // delete all the data
    const handleDeleteAll=()=>{
        
      let filterData = allData.filter((el) => el.check !== true);

      setAllData(filterData);

     

    }
   
    // adding localstorage

    useEffect(() => {
     
        localStorage.setItem("todoData", JSON.stringify(allData))

    }, [allData])
    
  
   

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
               value={input}
              onChange={(e)=> {setInput(e.target.value)}}
            />
            <button onClick={()=> {addData()}   } className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
              Add
            </button>
          </div>

          <div className="w-[50%]  boder-2 border-red-200  ">
            { toggle.all && allData.map((ele) => (
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
            { toggle.active && acitved.map((ele) => (
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
            { toggle.completed && completedd.map((ele) => (
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
