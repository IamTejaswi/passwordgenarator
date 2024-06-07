import React from "react";
import { useState,useCallback , useEffect  ,useRef} from "react";
export default function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  
  const passwordRef = useRef(null)

  const generatePassword= useCallback(()=>{
   let pass=''
   let str="ASDFGHJKLPOIUYTREWQZXCVBNMasdfghjklpoiuytrewqzxcvbnm"
   if(numberAllowed) str += "0123456789"
   if(charAllowed) str += "!@#$%^&*()_+"

   for(let i=1; i<length; i++){
    const char = Math.floor(Math.random() * str.length + 1)
    pass += str.charAt(char)
   }
   setPassword(pass)
  },[length,numberAllowed,charAllowed])
  

  const copyPassword =()=>{
  window.navigator.clipboard.writeText(password)
  passwordRef.current?.select()
  }
  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, charAllowed]);
  return (
    <>
      <h1>Password genarator</h1>
      <input placeholder="Password" value={password} type="text" />
      <button onClick={copyPassword}>Copy</button>

      <div>
        <input
          type="range"
          min={6}
          max={100}
          value={length}
          onChange={(e) => setLength(e.target.value)}
          ref={passwordRef}
        />
        <label>Length:{length} </label>
      </div>
      <div>
        <input
          type="checkbox"
          defaultChecked={numberAllowed}
          onChange={() => {
            setNumberAllowed((prev) => !prev);
          }}
        />
        <label>Numbers</label>
        <input
          type="checkbox"
          defaultChecked={charAllowed}
          onChange={() => {
            setCharAllowed((prev) => !prev);
          }}
        />
        <label>Character</label>
      </div>
    </>
  );
}
