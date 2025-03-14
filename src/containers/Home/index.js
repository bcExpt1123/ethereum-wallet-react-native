import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, AsyncStorage, ActivityIndicator } from 'react-native';
import { Card } from '@ant-design/react-native';
import ActionButton from 'react-native-action-button';
import WelcomeScreen from '../Welcome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Web3 from 'web3';
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('https://mainnet.infura.io/v3/5209c849762f40ce866e3b1332596997'));

class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'ETH Wallet',
      headerTintColor: '#fff',
      headerTitleStyle: {
        left: 10,
        width: '100%',
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center'
      },
      headerStyle: {
        backgroundColor: '#0A0F24',
        elevation: 0,
        borderBottomWidth: 0,
      },
      headerRight: (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('Settings')}>
            <Icon name="settings" size={28} color="#fff" />
        </TouchableOpacity>
      )
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      account: null,
      ETHBalance: null,
    }
    this.getETHBalance = this.getETHBalance.bind(this);
    this.checkWallet = this.checkWallet.bind(this);
  }

  componentDidMount() {
    this.checkWallet();
  }

  /**
   * @method to check wallet in localstorage
   */
  async checkWallet() {
    try {
      const value = await AsyncStorage.getItem('account');
      if (value == null) {
      } else {
        this.setState({ account: JSON.parse(value) }, () => {
          this.getETHBalance();
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @method to fetch balance of wallet
   */
  async getETHBalance() {
    let balance = await web3.eth.getBalance(this.state.account.address);
    balance = web3.utils.fromWei(balance, 'ether');
    await this.setState({ ETHBalance: Number(balance).toFixed(3) });
  }

  render() {
    if (this.state.account == null) {
      return ( <WelcomeScreen navigation={this.props.navigation} /> )
    } else {
      return (
        <View style={styles.container}>
          <Text style={{ fontSize: 18, color: '#8A8D97', top: 4, textAlign: 'center', marginBottom: 10 }} > Available Balance </Text>

          { this.state.ETHBalance ? (
            <View style={{ flexDirection: 'row', marginBottom: 20 }} >
              <Text style={{ fontSize: 35, color: '#E5BF30', fontWeight: 'bold', top: 4  }} >
                { this.state.ETHBalance } ETH 
              </Text>
              <Text style={{ fontSize: 18, color: '#8A8D97', position: 'relative', left: '35%', top: 20 }} >
                
              </Text>
            </View>
          ) : ( <ActivityIndicator size="large" color="#fff" /> ) }

          <Card.Body style={styles.accountCard} >
            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
              <TouchableOpacity style={styles.sendButton} onPress={() => this.props.navigation.navigate('SendETH', { account: this.state.account, ETHBalance: this.state.ETHBalance })}>
                <Text style={{ fontSize: 17, color: '#E5BF30', fontWeight: '600', top: 4 }}>     Send  </Text>
                <Icon name="send" size={28} color="#E5BF30" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.receiveButton} onPress={() => this.props.navigation.navigate('ETHWallet', { account: this.state.account })}>
                <Text style={{ fontSize: 17, color: '#fff', fontWeight: '600', top: 4 }}>  Receive  </Text>
                <Icon name="qrcode" size={28} color="#fff" />
              </TouchableOpacity>
            </View>
          </Card.Body>
          <TouchableOpacity style={{ width: '100%', marginBottom: 50 }} onPress={() => this.props.navigation.navigate('ETHWallet', { account: this.state.account, ETHBalance: this.state.ETHBalance })}>
            <Card.Body style={styles.card}>
              <View style={{ padding: 10 }} >
                <Text style={{ marginLeft: 50, color: '#fff', fontSize: 20, alignSelf: 'flex-start', fontWeight: 'bold' }}> ETH </Text>
                <Text style={{ marginLeft: 50, marginTop: 3, color: '#8A8D97', fontSize: 12, alignSelf: 'flex-start' }}> Ethereum </Text>
                <Image 
                  style={{ width: 34, height: 57, position: 'absolute', marginLeft: 12 }}
                  source={require('../../assets/eth.png')} />
                { this.state.ETHBalance ? (
                  <View style={{ position: 'absolute', right: 0 }}>
                    <Text style={{ position: 'absolute', color: '#2ED573', fontSize: 18, alignSelf: 'flex-end', marginTop: 15, right: 10, fontWeight: 'bold' }}>  {this.state.ETHBalance} ETH </Text>
                    <Text style={{ position: 'absolute', color: '#8A8D97', fontSize: 10, alignSelf: 'flex-end', marginTop: 38, right: 12, }}> </Text>
                  </View>
                ) : ( <ActivityIndicator style={{ position: 'absolute', alignSelf: 'flex-end', marginTop: 10, right: 10, }} size="large" color="#2ED573" /> ) }
              </View>
            </Card.Body>
          </TouchableOpacity>
          <ActionButton
            buttonColor="#131634"
            size={70}
            renderIcon={() => <Icon name="qrcode-scan" size={30} color="#4F8EF7" />}
            onPress={() => alert('Still working on this feature :D')}
          />
        </View>
      );
    }

  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#0A0F24'
  },
  card: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    maxHeight: 80,
    backgroundColor: '#13182B',
    borderColor: '#13182B',
    borderWidth: 0,
    borderRadius: 10,
    width: '90%'
  },
  accountCard: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    maxHeight: 120,
    backgroundColor: '#0A0F24',
    borderColor: '#0A0F24',
    borderWidth: 0,
    borderRadius: 10,
    width: '90%',
    flexDirection: 'column'
  },
  instructions: {
    color: '#fff'
  },
  sendButton: {
    borderRadius: 40,
    backgroundColor: '#13182B',
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 15,
    width: '42%',
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    flexDirection: 'row',
    alignContent: 'center'
  },
  receiveButton: {
    borderRadius: 40,
    backgroundColor: '#13182B',
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 15,
    width: '42%',
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    flexDirection: 'row',
    alignContent: 'center'
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
});
