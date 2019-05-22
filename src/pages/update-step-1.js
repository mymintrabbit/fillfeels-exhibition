import React, { Component } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { pathRoutes } from '../routes'
import CircularColorPicker from '../color-picker/CircularColorPicker'
import Dot from '../components/Dot'
import { COLOR_MAPPING } from '../config'
import { getGradient } from '../color-picker/utils'

const Wrapper = styled.div``

const LayoutWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
`

const MoodHeader = styled.div`
  background: black;
  width: 100%;
  box-sizing: border-box;
  margin-top: 45px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  padding: 1.25em;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
`

const MoodHeaderItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`

const ColorPickerWrapper = styled.div`
  max-width: 375px;
`

const ColorBackground = styled.div`
  top: 0px;
  position: absolute;
  width: 100%;
  height: 10%;
  background: ${props => props.background || `${COLOR_MAPPING.GREEN}`};
`

const CircleBackground = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  left: 0;
  right: 0;
  margin: auto;
  top: 0;
  bottom: 0;
  display: block;
  background: white;
  border-radius: 50%;
`

class UpdateStep1 extends Component {
  state = {
    hue: 226,
    hue2: 215,
    isGradient: true,
  }

  componentDidMount() {
    if (this.props.location.state) {
      this.setState({
        ...this.props.location.state,
      })
    }
  }

  onChange = hue => {
    console.log(hue)
    this.setState({ hue })
  }

  onChange2 = hue => {
    console.log(hue)
    this.setState({ hue2: hue })
  }

  onNext = () => {
    console.log(this.state)
    localStorage.setItem('state', JSON.stringify(this.state))
    this.props.history.push(pathRoutes.UpdateStepTwo.path, {
      ...this.state,
    })
  }

  render() {
    const { hue, hue2 } = this.state

    return (
      <React.Fragment>
        <Navbar rightContent={<div onClick={() => this.onNext()}>Next</div>}>
          How do you feel?
        </Navbar>
         <LayoutWrapper>
          {/* <MoodHeader>
            <MoodHeaderItem>
              <Dot width="25px" height="25px" background={COLOR_MAPPING.GREEN} />
              <Wrapper>Neutral</Wrapper>
            </MoodHeaderItem>
            <MoodHeaderItem>
              <Dot width="25px" height="25px" background={COLOR_MAPPING.YELLOW} />
              <Wrapper>Happy</Wrapper>
            </MoodHeaderItem>
            <MoodHeaderItem>
              <Dot width="25px" height="25px" background={COLOR_MAPPING.PINK} />
              <Wrapper>Love</Wrapper>
            </MoodHeaderItem>
            <MoodHeaderItem>
              <Dot width="25px" height="25px" background={COLOR_MAPPING.RED} />
              <Wrapper>Angry</Wrapper>
            </MoodHeaderItem>
            <MoodHeaderItem>
              <Dot width="25px" height="25px" background={COLOR_MAPPING.BLUE} />
              <Wrapper>Sad</Wrapper>
            </MoodHeaderItem>
            <MoodHeaderItem>
              <Dot width="25px" height="25px" background={COLOR_MAPPING.BLUE_DARK} />
              <Wrapper>Stress</Wrapper>
            </MoodHeaderItem>
          </MoodHeader> */}
          <ColorPickerWrapper>
            <CircularColorPicker onChange={this.onChange} onChange2={this.onChange2} />
          </ColorPickerWrapper>
          {/* {<ColorBackground background={getGradient(hue, hue2)} />} */}
          <CircleBackground />
        </LayoutWrapper>
      </React.Fragment>
    )
  }
}

export default UpdateStep1
