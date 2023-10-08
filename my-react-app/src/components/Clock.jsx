import React, {useState} from 'react'

const Clock = () => {
  let time  = new Date().toLocaleTimeString()

  const [ctime,setTime] = useState(time)
  const UpdateTime=()=>{
    time =  new Date().toLocaleTimeString()
    setTime(time)
  }
  setInterval(UpdateTime)
  return (
    <div>
      <h3>{ctime}</h3>

    </div>
  )
}

export default Clock