import Footer from "../_component/Footer";
import Header from "../_component/Header";
import head from "next/head";
 
export default function Layout({ children }) {
  return (
    <>
    <head>
        <title>DeliveyApp</title>
      </head>
      <Header/>
      <main>{children}</main>
      <Footer />
    </>
  )
}