import React, { Fragment, useLayoutEffect } from "react"
import GlobalStyle from "@theme/GlobalStyle"
import { useLocation } from "react-router-dom"
import Routers from "./router"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "@modules/Auth/authSlice"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const location = useLocation()

  const { token } = useSelector((state) => state.auth);

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <Fragment>
      <GlobalStyle />
      <Routers token={token} />
      <ToastContainer/>
    </Fragment>
  )
}

export default App
