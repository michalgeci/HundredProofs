import React, { useState } from 'react'
import { TabBar, Modal } from 'antd-mobile'
import { FileUnknownOutlined, FileUnknownFilled, ProfileOutlined, ProfileFilled } from '@ant-design/icons'
import { disableBodyScroll } from 'body-scroll-lock'
import RandomProof from './RandomProof'
import ProofList from './PfoorList'
import './App.css';

function App() {

  const [installModalVisible, setInstallModalVisible] = useState(false)
  const [installEvent, setInstallEvent] = useState(undefined)
  

  window.addEventListener('appinstalled', (evt) => {
    setInstallModalVisible(false)
  })

  window.addEventListener('beforeinstallprompt', (e) => {
    setInstallEvent(e)
    setInstallModalVisible(true)
  })

  const [selectedTab, setSelectedTab] = useState('tab1')

  disableBodyScroll(document.querySelector('#appContainer'))

  return (
    <div className="App" id="appContainer">

      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white">

          <TabBar.Item
            title="Random proof"
            key="randomProof"
            icon={<FileUnknownOutlined style={{ fontSize: '22px' }} />}
            selectedIcon={<FileUnknownFilled style={{ fontSize: '22px' }} />}
            selected={selectedTab === 'tab1'}
            onPress={() => {
              setSelectedTab('tab1')
            }}
          >
            <RandomProof />
          </TabBar.Item>

          <TabBar.Item
            title="All proofs"
            key="allProofs"
            icon={<ProfileOutlined style={{ fontSize: '22px' }} />}
            selectedIcon={<ProfileFilled style={{ fontSize: '22px' }} />}
            selected={selectedTab === 'tab2'}
            onPress={() => {
              setSelectedTab('tab2')
            }}
          >
            <ProofList />
          </TabBar.Item>

        </TabBar>

        <Modal
          visible={installModalVisible}
          transparent
          maskClosable={false}
          title={'Install app'}
          footer={[{
            text: "NO",
            onPress: ()=>{
              setInstallModalVisible(false)
            }
          },{
            text: "INSTALL",
            onPress: ()=>{
              installEvent.prompt()
            }
          }]}
        >
          Please install app for better user experience.
        </Modal>
      </div>

    </div>
  );
}

export default App;
