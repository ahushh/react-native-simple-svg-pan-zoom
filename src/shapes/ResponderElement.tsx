import React, { Component } from 'react';
import { GestureResponderEvent } from 'react-native';
import { G } from 'react-native-svg';

const GView = G as any

export interface Props {
  x:number, 
  y:number,
  onClick?: (evt:any) => void,
  onClickRelease?: (evt:any) => void,
  onClickCanceled?: (evt:any) => void,
  onDrag?: (evt:any) => void
}
export interface State {}

export default class ResponderElement extends Component<Props,State> {

  public static defaultProps: Partial<Props> = {
    onClick: (evt: any) => { },
    onClickRelease: (evt: any) => { },
    onClickCanceled: (evt: any) => { },
    onDrag: (evt: any) => { }
  };

  releasedNaturally = true

  render() {
    return (
      <GView
        x={this.props.x}
        y={this.props.y}
        onStartShouldSetResponder={(evt: GestureResponderEvent) => true}
        onMoveShouldSetResponder={(evt: GestureResponderEvent) => false}
        onResponderGrant={(evt: GestureResponderEvent) => { 
          this.releasedNaturally = true
          if (this.props.onClick) this.props.onClick(evt)
        }}
        onResponderTerminationRequest={(evt: GestureResponderEvent) => {
          if (evt.nativeEvent.touches.length > 1) {
            this.releasedNaturally = false
            return true
          }
          if (this.props.onClickCanceled) this.props.onClickCanceled(evt)
          return false
        }}
        onResponderMove={this.props.onDrag}
        onResponderRelease={(evt: GestureResponderEvent) => {
          if (this.releasedNaturally) {
            if (this.props.onClickRelease) this.props.onClickRelease(evt)
            this.releasedNaturally = true
          }
        }}
      >
        {this.props.children}
      </GView>
    )
  }
}