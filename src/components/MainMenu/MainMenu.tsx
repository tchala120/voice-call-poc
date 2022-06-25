import type { FC } from 'react'

import Logo from 'components/Logo'
import styled from '@emotion/styled'

import littleBeanLogo from 'assets/images/little_bean_icon.png'

const MainMenu: FC = () => {
  return (
    <>
      <Logo />

      <LittleBeanLogoContainer>
        <img src={littleBeanLogo} alt="Little Bean Soft" />
      </LittleBeanLogoContainer>
    </>
  )
}

export default MainMenu

const LittleBeanLogoContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;

  > img {
    width: 100%;
    height: auto;
  }
`
