import Navbar from "./Navbar";
import {Container} from 'semantic-ui-react'

interface LayoutPropsType {
  children: JSX.Element | JSX.Element[],
}

export default function Layout({ children }:LayoutPropsType):JSX.Element{
  return (
    <div>
      <Navbar/>
      <main style={{background: '#212121'}}>
        <Container style={{paddingTop: '2rem', height: '90vh'}}>
          { children }
        </Container>
      </main>
    </div>
  )
}
