import { RouterProvider } from 'react-router'
import routes from './routes'
import "./locale/i18n";


function App() {
  return (
    <RouterProvider router={routes} />
  )  
}

export default App
