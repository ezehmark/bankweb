import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  const[clickedItem,setClickedItem]=useState(null);

  return (
    <><div className="outer">
    <div className="top">
    <div className="profile">
    <div className="dp"></div>
    <div className="name">Onyekachi Banks</div>
    </div>
    </div>
    <div className="cover">
    <div className="text">This site is under construction <b style={{color:"black"}}>by Mark Ezeh,</b> cheif Engineer <b style={{color:"#00d4d4"}}>@BytanceTech</b></div>
    <div className="box1">
    <div className="box2"></div>
    </div>
    </div>

    <div className="transactions">
    {[{id:1,amount:"$4000",tId:"2504D56A",type:"In"},{id:2,amount:"$20,000",tId:"2504G5A",type:"In"},{id:3,amount:"$10,000",tId:"2504D76B",type:"Out"}].map((item,index)=>{
	    const isClicked = clickedItem == item.id;
	    return(<>
		   <div key={index} onClick={()=>{setClickedItem(item.id)}}className="tbox">
		   <div className="success">Success:{item.type}</div>
		   <div className="amount">{item.amount}</div>
		   <div className="tId">{item.tId}</div>
		   </div>
		   </>)
    })}
    </div>
    </div>
    </>
  )
}

export default App
