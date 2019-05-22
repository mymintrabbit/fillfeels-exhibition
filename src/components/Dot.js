import styled from 'styled-components'
import { getGradient, mapHueToColor } from '../color-picker/utils'

const Dot = styled.div`
  display: block;
  border-radius: 50%;
  z-index: 99;

  width: ${props => props.width};
  height: ${props => props.height};
  margin: ${props => props.margin};

  background: ${props => props.background || '#efefef'};

  ${props =>
    props.hue
      ? props.hue && props.isGradient
        ? `
        background: ${mapHueToColor(props.hue)};
        background-image: ${getGradient(props.hue, props.hue2)};
       `
        : `background: ${mapHueToColor(props.hue)};`
      : ''};
`

export default Dot
