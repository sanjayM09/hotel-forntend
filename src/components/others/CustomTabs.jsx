import React from 'react'
import { Tabs } from 'antd'


export const CustomTabs = ({ items, defaultActiveKey, activeKey, onChange, tabPosition }) => {
    // const { TabPane } = Tabs;
    const handleChange = (e) => {
        onChange(e)
    }
    return (
      
        <Tabs tabPosition={tabPosition} items={items} activeKey={activeKey} defaultActiveKey={defaultActiveKey} onChange={handleChange}/>
    )
} 
{/* {tabs.map((tab, index) => (
    <TabPane key={index + 1} tab={tab.label}>
    {tab.content}
    </TabPane>
    ))} 
     </Tabs> */}