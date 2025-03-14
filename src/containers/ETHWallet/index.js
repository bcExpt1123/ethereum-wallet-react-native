import React, { Component } from 'react';
import { View, SafeAreaView, AsyncStorage } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

/**
 * @class ETH Wallet
 */
class ETHWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet: {
        address: 'loading'
      }
    };
  }

  /**
   * @method to get wallet from localstorage
   */
  async componentDidMount() {
    let wallet = await AsyncStorage.getItem('account');
    wallet = JSON.parse(wallet);
    this.setState({ wallet });
  }

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: '#0A0F24', flex: 1, alignContent: 'center', alignItems: 'center' }}>
        <View style={{ marginTop: 200 }}>
          <QRCode 
            size={200}
            color='#fff'
            backgroundColor='#0A0F24'
            value={this.state.wallet.address} />
        </View>
      </SafeAreaView>
    );
  }
}

export default ETHWallet;
