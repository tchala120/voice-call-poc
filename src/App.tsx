import { FC, useEffect, useState } from 'react'
import dayjs from 'dayjs'

const App: FC = () => {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((seconds) => seconds + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      <p>Call time: {dayjs.duration(seconds * 1000).format('mm:ss')}</p>
    </div>
  )
}

export default App
