import styled from 'styled-components'

export const Wrap = styled.div`
   display: flex;
   flex-direction: column;
   min-height: 100vh;
`

export const Main = styled.main`
   display: flex;
   flex: 1;
   padding: 20px;
`

export const SidebarWrapper = styled.div`
   flex: 0 0 250px; /* 사이드바 크기 */
   background-color: #f4f4f4;
   padding: 20px;
`

export const ContentContainer = styled.div`
   display: flex;
   flex: 1;
   flex-direction: column;
   margin-left: 20px; //사이드바와 콘텐츠 사이 간격
`

export const BannerWrapper = styled.div`
   margin-bottom: 20px; /* 배너와 콘텐츠 사이 간격 */
   background-color: #e0e0e0;
   padding: 20px;
`

export const Content = styled.div`
   flex: 1;
   background-color: #fff;
   padding: 20px;
`
