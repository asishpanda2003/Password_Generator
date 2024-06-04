import React, { useState,useCallback,useEffect,useRef } from "react";

const App = () => {
  const [length, setLength] = useState(4);
  const [numallow, setnumAllow] = useState(false);
  const [charallow, setCharallow] = useState(false);
  const [password, setPass] = useState("");

  const passwordRef=useRef(null)

  const generatePassword=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numallow)str+="1234567890"
    if(charallow)str+=`!@#$%^&*()_+-`

    for(let i=1;i<=length;i++){
      const char= Math.floor(Math.random() * str.length+ 1)
      pass+= str.charAt(char)
    }
    setPass(pass)
  },[length,numallow,charallow])

  useEffect(()=>{
    generatePassword()
  },[length,numallow,charallow])

  const copyPassword=()=>{
    window.navigator.clipboard.writeText(password)
    passwordRef.current?passwordRef.current.select():""
  }

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPassword} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              name=""
              id=""
              min={4}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="length">Length :{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numallow}
              onChange={() => {
                setnumAllow((prev) => !prev);
              }}
            />
            <label htmlFor="number">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charallow}
              onChange={() => {
                setCharallow((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Character</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
