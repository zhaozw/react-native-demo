import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ListView, Image } from 'react-native';

import friendsData from '../../mocks/friendsData';
import msgsData from '../../mocks/msgsData'

export default class ChatSence extends Component {
  constructor(props) {
    super(props);

    if (!window.abigale) {
      window.abigale = {
        friendsData: friendsData,
        msgsData: msgsData
      }
    }


    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      inputing: {
        type: 'self',
        msg: ''
      },
      dataSource: ds.cloneWithRows(msgsData[this.props.name]),
      userInfo: friendsData.filter(it => (it.name == this.props.name))[0]
    };
  }
  goBack() {
    const { navigator } = this.props;

    if (navigator) {
      navigator.jumpBack()
    }
  }

  sendMsg() {
    if (this.state.inputing.msg == '') {
      alert("不能不打字就发送的")
    }
    else {
      window.abigale.msgsData = this.state.dataSource._dataBlob.s1;
      window.abigale.msgList = this.state.dataSource._dataBlob.s1;
      window.abigale.msgList.push(this.state.inputing);
      console.log(window.abigale.msgList)
      this.setState({ dataSource: this.state.dataSource.cloneWithRows([...this.state.dataSource._dataBlob.s1, ...this.state.inputing]) })
      this.setState({ inputing: { type: 'self', msg: '' } })
    }
  }
  render() {
    return (
      <View style={styles.contains}>
        <View
          style={styles.header}>
          <TouchableOpacity
            onPress={this.goBack.bind(this)}
            style={styles.backButton}>
            <Text style={styles.headerText}>返回</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>与{this.props.name}聊天</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <TouchableOpacity
              style={styles.listItem}>
              {
                (rowData.type == 'self') ?
                  <View style={[styles.msg, styles.self]}>
                    <Text style={[styles.selfMsgText, styles.msgText]}>
                      {rowData.msg}
                      {rowData.self}
                    </Text>

                    <Image
                      style={[styles.selfAvatar,styles.avatar]}
                      source={require('../../assets/self.jpeg')}
                    />
                  </View> :
                  <View style={[styles.msg, styles.friend]}>
                    {
                      (() => {
                        switch (this.state.userInfo.id) {
                          case 1:
                            return <Image
                              source={require('../../assets/avatar1.jpeg')}
                              style={styles.avatar} />
                          case 2:
                            return <Image
                              source={require('../../assets/avatar2.jpeg')}
                              style={styles.avatar} />
                          case 3:
                            return <Image
                              source={require('../../assets/avatar3.jpeg')}
                              style={styles.avatar} />
                          case 4:
                            return <Image
                              source={require('../../assets/avatar4.jpeg')}
                              style={styles.avatar} />
                          case 5:
                            return <Image
                              source={require('../../assets/avatar5.jpeg')}
                              style={styles.avatar} />
                          case 6:
                            return <Image
                              source={require('../../assets/avatar6.jpeg')}
                              style={styles.avatar} />
                          case 7:
                            return <Image
                              source={require('../../assets/avatar7.jpeg')}
                              style={styles.avatar} />
                          case 8:
                            return <Image
                              source={require('../../assets/avatar8.jpeg')}
                              style={styles.avatar} />
                        }

                      })()
                    }
                    <Text style={[styles.friendMsgText, styles.msgText]}>
                      {rowData.msg}
                    </Text>
                  </View>
              }
            </TouchableOpacity>
          }
        />
        <View style={styles.footer}>
          <TextInput
            style={styles.input}
            onChangeText={
              (msg) => {
                this.setState({ inputing: { type: 'self', msg: msg } });
              }
            }
            value={this.state.inputing.msg}
          />
          <TouchableOpacity
            style={styles.sendBtn}
            onPress={() => { this.sendMsg() }}
          >
            <Text style={styles.sendText}>发送</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contains: {
    flex: 1,
    backgroundColor: '#eee'
  },
  header: {
    height: 50,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 16,

  },
  headerText: {
    fontSize: 20,
    color: '#fff'
  },
  msg: {
    marginTop: 10,
  },
  friend: {
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  self: {
    alignSelf: 'stretch',
    alignItems: 'flex-end',
    paddingRight: 10,
    height: 40
  },
  msgText: {
    lineHeight: 40,
    backgroundColor: '#fff',
    paddingLeft: 5,
    paddingRight: 5
  },
  selfMsgText: {
    // flexDirection: 'row',
    position:'absolute',
    right: 50
  },
  friendMsgText: {
  },
  avatar: {
    width: 40,
    height: 40,
  },
  selfAvatar: {
    position:'absolute',
    right: 10

  },
  footer: {
    flex: 1,
    position: 'absolute',
    width:375,
    bottom: 20,
    flexDirection: 'row',
    padding: 10,
    height: 40
  },
  input: {
    flex: 6,
    flexDirection: 'row',
    height: 40,
    borderColor: 'gray',
    borderWidth: .8,
    borderRadius: 3,
    padding: 10,
  },
  sendBtn: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    width: 30,
    height: 40,
    borderRadius: 3,
    borderWidth: 3,
    borderColor: '#333',
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendText: {
    fontSize: 18,
    color: '#fff'

  }
})
