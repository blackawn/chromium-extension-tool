import { routerConfig } from '@/router'
import { RouterProvider } from 'react-router-dom'

function App() {

  return (
    <RouterProvider
      router={routerConfig}
    />
  )
}

export default App
