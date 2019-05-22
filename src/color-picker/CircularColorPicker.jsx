import React, { Component } from "react";
import styles from "./CircularColorPicker.module.scss";
import ColorSelector from "./ColorSelector";
import ColorRenderer from "./ColorRenderer";
import color_wheel from "../assets/images/colorwheel.png";

const INITIAL_HUE1 = 226;
const INITIAL_HUE2 = 215;

export default class CircularColorPicker extends Component {
  state = {
    hue1: INITIAL_HUE1,
    hue2: INITIAL_HUE2,
    // hue3: 150
  };
  colorSelector1Ref;
  colorSelector2Ref;
  colorSelector3Ref;
  constructor(props) {
    super(props);
    this.colorSelector1Ref = React.createRef();
    this.colorSelector2Ref = React.createRef();
    this.colorSelector3Ref = React.createRef();
  }
  render() {
    const { hue1, hue2 } = this.state;
    const { onChange = () => {}, onChange2 = () => {}} = this.props
    return (
      <div className={styles.container}>
        <div
          className={styles.color_bar}
          style={{ backgroundImage: `url(${color_wheel})` }}
        >
          <div className={styles.selector_stack}>
            <ColorSelector
              ref={this.colorSelector2Ref}
              initialRotation={INITIAL_HUE2}
              onChange={hue => {
                this.setState({ hue2: hue })
                onChange2(hue)
              }}
            />
            <ColorSelector
              base
              ref={this.colorSelector1Ref}
              initialRotation={INITIAL_HUE1}
              onChange={hue => {
                this.setState({ hue1: hue })
                onChange(hue)
              }}
            />
            {/* <ColorSelector
              ref={this.colorSelector3Ref}
              initialRotation={150}
              onChange={hue => this.setState({ hue3: hue })}
            /> */}
            <ColorRenderer
              hue1={hue1}
              hue2={hue2}
              // hue3={hue3}
              startLimit={135}
              stopLimit={225}
            />
          </div>
        </div>
      </div>
    );
  }
}
