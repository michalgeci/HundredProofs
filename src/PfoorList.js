import React, { useState } from 'react'
import { Modal, Button, WhiteSpace } from 'antd-mobile'
import { List, CellMeasurer, CellMeasurerCache, AutoSizer } from 'react-virtualized'
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
    }, {
      text: 'OK',
      onPress: () => {
        setModalVisible(false)
      }
    }
  ]

  const [footer, setFooter] = useState(emptyFooter)


  const onSelect = (rowID) => {
    const row = proofs[rowID]
    setModalContent(
      <div style={{maxHeight: '400px'}}>
        <div className="modalTitle">{row.title}</div>
        <WhiteSpace size='sm' />
        {row.steps.map((entry) =>
          <div key={Math.random()} className="modalEntry">
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

  const Row = (index) => (
    <div key={index}>
      <Button className='centerLeft listButton' onClick={() => { onSelect(index) }}>
          <div><b>{(parseInt(index) + 1)}</b>. {proofs[index].title}</div>
        </Button>  
    </div>
  );


  let cache = new CellMeasurerCache({
    defaultHeight: 44,
    fixedWidth: true,
  });

  let rowRenderer = ({ index, style, key, parent }) => {
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        <div style={style} key={key}>
          { Row(index) }
        </div>
      </CellMeasurer>
    );
  }

  return (
    <div style={{ height: 'inherit' }}>

      <AutoSizer>
        {({ height, width }) => 
          <List
            width={width}
            height={height}
            rowHeight={cache.rowHeight}
            rowCount={proofs.length}
            rowRenderer={rowRenderer}
            scrollToIndex={parseInt( localStorage.getItem('lastItemIndex')) || 0}
            onRowsRendered={({overscanStartIndex, overscanStopIndex, startIndex, stopIndex})=>{
              localStorage.setItem('lastItemIndex', stopIndex)
            }}
          />
        }
      </AutoSizer>

      <Modal
        style={{maxHeight: '80%', minWidth: '85%'}}
        visible={modalVisible}
        transparent
        maskClosable={true}
        onClose={() => {
          setModalVisible(false)
        }}
        footer={footer}
      >
        {modalContent}
      </Modal>
    </div>
  )

}

export default ProofList
