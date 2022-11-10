import Navbar from './Navbar'
import Footer from './Footer'

interface ILayout {
  children: React.ReactNode
}

export default function Layout({ children }: ILayout) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
