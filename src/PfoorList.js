import React from 'react'
import { ListView, Accordion, Flex, WingBlank, WhiteSpace } from 'antd-mobile'
import proofs from './proofs.json'

function ProofList() {

  let dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
  })
  dataSource = dataSource.cloneWithRows(proofs)

  const row = (rowData, sectionID, rowID) => {
    return (
      <div key={rowID}>
        <Accordion defaultActiveKey="0" style={{ height: 'auto' }} openAnimation={{}}>
          <Accordion.Panel
            style={{ width: '100%', height: 'auto' }}
            key={1}
            header={
              <Flex align='center' style={{ minHeight: '44px' }}>
                <div style={{ fontFamily: 'BebasNueve', fontSize: '18px', height: 'auto', overflow: 'auto', whiteSpace: 'normal', lineHeight: '24px', paddingTop: '4px', paddingBottom: '4px' }}>
                  <b>{(parseInt(rowID) + 1)}</b>. {rowData.title}
                </div>
              </Flex>
            }
          >
            <WingBlank>
              {rowData.steps.map((entry) =>
                <div key={Math.random()}>
                  <WhiteSpace size="xs" />
                  <div className="smallProofSteps"> {entry} </div>
                </div>
              )}
              <WhiteSpace size="sm" />
            </WingBlank>
          </Accordion.Panel>
        </Accordion>
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
        pageSize={20}
      />
    </div>
  )

}

export default ProofList
