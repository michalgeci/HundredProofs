import React, { useState } from 'react'
import { ListView, Modal, Button, WhiteSpace, Flex } from 'antd-mobile'
import proofs from './proofs.json'

function ProofList() {

  const [modalVisible, setModalVisible] = useState(false)
  const [modalContent, setModalContent] = useState()

  let emptyFooter = [{
    text: 'OK',
    onPress: () => {
      setModalVisible(false)
    }
  }]

  let footerWithLink = (link) => [
    {
      text: 'More info',
      onPress: () => {
        window.open(link, "_blank")
      }
    },{
      text: 'OK',
      onPress: () => {
        setModalVisible(false)
      }
    }
  ]

  const [footer, setFooter] = useState(emptyFooter)

  let dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
  })
  dataSource = dataSource.cloneWithRows(proofs)

  const onSelect = (rowID) => {
    const row = proofs[rowID]
    setModalContent(
      <div>
        <div className="modalTitle">{row.title}</div>
        <WhiteSpace size='sm' />
        {row.steps.map((entry) =>
          <div className="modalEntry">
            {entry}
          </div>
        )}
      </div>
    )
    if (row.bonus !== "") {
      setFooter(footerWithLink(row.bonus))
    }
    setModalVisible(true)
  }

  const row = (rowData, sectionID, rowID) => {
    return (
      <div key={rowID}>
        <Button className='centerLeft listButton' onClick={() => { onSelect(rowID) }}>
          <div><b>{(parseInt(rowID) + 1)}</b>. {rowData.title}</div>
        </Button>
      </div>
    )
  }

  return (
    <div style={{ height: 'inherit' }}>
      <ListView
        dataSource={dataSource}
        renderRow={row}
        initialListSize={25}
        style={{
          height: 'inherit',
          overflow: 'auto'
        }}
        pageSize={4}
      />

      <Modal
        visible={modalVisible}
        transparent
        maskClosable={true}
        onClose={() => {
          setModalVisible(false)
        }}
        footer={ footer }
      >
        {modalContent}
      </Modal>
    </div>
  )

}

export default ProofList
