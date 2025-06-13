import { useRoutes } from 'react-router-dom'
import { Suspense } from 'react'
import Loading from './Loading'
import routes from './routes'
import { Toaster } from 'react-hot-toast'

function App() {

  let element = useRoutes(routes);

  return (
    <>
    <Toaster />
      <Suspense fallback={ <Loading/> } >
        {element}
      </Suspense>
    </>
  )
}

export default App
