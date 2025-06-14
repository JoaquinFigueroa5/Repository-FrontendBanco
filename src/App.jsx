import { useRoutes } from 'react-router-dom'
import { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import Loading from './Loading'
import routes from './routes'

function App() {

  let element = useRoutes(routes);

  return (
    <>
    <Toaster />
      <Suspense fallback={ <Loading/> } >
        {element}
      </Suspense>
      <Toaster position='top-center' reverseOrder={false}/>
    </>
  )
}

export default App
