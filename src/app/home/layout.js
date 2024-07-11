import Footer from "../_component/Footer";
import Header from "../_component/Header";
import Head from "next/head";
 
export default function Layout({ children }) {
  return (
    <>
    <Head>
        <title>DeliveyApp</title>
      </Head>
      <Header/>
      <main>{children}</main>
      <Footer />
    </>
  )
}