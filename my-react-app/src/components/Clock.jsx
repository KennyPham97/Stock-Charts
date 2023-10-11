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
      <h2>{ctime}</h2>

    </div>
  )
}

export default Clock