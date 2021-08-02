import Header from "./header"
import Footer from "./footer"
import Navigation from "./navigation"

export default function Layout({ children }) {
  return (
    <>
      <Navigation />
      <Header />
      <div className='content'>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}