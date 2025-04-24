import { useState } from 'react';
import "./login.css"

const Login = ({toggleLogin:()=>void}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checker, setChecker] = useState("");

  const handleLogin = () => {
    if (email.length < 1) {
      setChecker("Put your email address first");
      return;
    }
    if (!email.includes("@gmail.com") && !email.includes("@yahoo.com")) {
      setChecker("Wrong email format, use valid email address");
      return;
    }
    if (email === "onyekabanks@gmail.com" && password === "#feb829") {
      setChecker("You are now logged in");
      setTimeout(() => {
        toggleLogin();
      }, 2000);
    } else {
      setChecker("Wrong credentials");
    }
  };
  const[t,setT]=useState(false);
  const[t2,setT2]=useState(false);

  return (
    <div className="loginScreen">
      <div className="titleAndLogo">
        <div className="logo">
          <img src="./favicon.png" />
        </div>
        <div className="app-name">Bank Web</div>
      </div>





      <div className="formAndFooter">
      <div className="desc"><b style={{color:"#5a3600"}}>Hybrid</b> banking, and <b style={{color:"#ec5300"}}>blockchain.</b></div>

      <div className="form">

        <input
          type="email"
	  onFocus={()=>{setT(true);setChecker("")}}
	  onBlur={()=>setT(false)	}
	  style={{backgroundColor:t?"white":"#ffe0b2"}}
          className="input"
          placeholder="Enter email here..."
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}
        />

	{checker && <div className="checker">{checker}</div>}

        <input
          type="password"
	  onFocus={()=>{setT2(true);setChecker("")}}                                        
	  style={{backgroundColor:t2?"white":"#ffe0b2"}}
	  onBlur={()=>setT2(false)}
          className="input"
          placeholder="Type your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

	


        <div className="button" onClick={handleLogin}>Login</div>
	</div>





        <div className="footer">
          Experience the hybrid nature of modern banking and web3, all at Bank Web
        </div>



	</div>
	<div style={{fontSize:8,color:"grey",position:'absolute',bottom:15}}>Courtesy @<b>BytanceTech</b> © 2025</div>
      
    </div>
  );
};

export default Login;
