// @flow

import React, { type Node } from 'react';

import Label from '../../models/label';
import { RGB, HSL } from '../../lib/color';

import '../../styles/lib/label.css';

type Props = {|
  label: Label,
|};

export default class LabelItem extends React.Component<Props> {
  rgb: RGB;
  hsl: HSL

  constructor(props: Props) {
    super(props);

    this.rgb = new RGB(props.label.color);
    this.hsl = new HSL(props.label.color);
  }

  render(): Node {
    const backgroundColor: string = `rgba(${this.rgb.red}, ${this.rgb.green}, ${this.rgb.blue}, 0.18)`;
    const color: string = `hsl(${this.hsl.hue}, ${this.hsl.saturation}%, ${this.hsl.lightness-30%100}%)`;

    return (
      <div
        aria-label='github-label'
        className='github-label'
        style={{
          backgroundColor: backgroundColor,
          color: color,
          borderColor: color,
        }}
      >
        {this.props.label.name}
      </div>
    );
  }
}
