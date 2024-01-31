import React, { Component, Fragment } from 'react';
import { Text } from 'react-native';
import Overlay from 'react-native-modal-overlay';

export default class Modal extends Component {
  state = {
    modalVisible: true,
  };

  onClose = () => this.setState({ modalVisible: false });

  render() {
    return (
      <Overlay
        visible={this.state.modalVisible}
        onClose={this.onClose}
        closeOnTouchOutside
        animationType="zoomIn"
        containerStyle={{ backgroundColor: 'rgba(37, 8, 10, 0.78)' }}
        childrenWrapperStyle={{ backgroundColor: '#eee' }}
        animationDuration={500}
      >
        {(hideModal, overlayState) => (
          <Fragment>
            <Text>Some Modal Content</Text>
            <Text onPress={hideModal}>Close</Text>
          </Fragment>
        )}
      </Overlay>
    );
  }
}
