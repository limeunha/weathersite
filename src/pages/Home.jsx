//메인화면

import React from 'react'
import '../styles/common.css'
import { Wrap, Main } from '../styles/StyledComponent'
import Menu from '../components/Menu'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import Content from '../components/Content'

function Home() {
   return (
      <Wrap>
         <Menu />
         <Main>
            <Sidebar />
            <div>
               <Banner />
               <Content />
            </div>
         </Main>
         <Footer />
      </Wrap>
   )
}

export default Home
