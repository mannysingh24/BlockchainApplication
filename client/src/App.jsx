import { Applications, Footer, Home, NavigationBar, Transactions } from "./website-sections"

const App = () => 
{
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <NavigationBar></NavigationBar>
        <Home></Home>
      </div>
      <Applications></Applications>
      <Transactions></Transactions>
      <Footer></Footer>
    </div>
  )
}

export default App
