'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'

// Component Imports
import CustomTabList from '@core/components/mui/TabList'

const AccountSettings = ({ tabContentList }) => {
  // States
  const [activeTab, setActiveTab] = useState('account')

  const handleChange = (event, value) => {
    setActiveTab(value)
  }

  return (
    <TabContext value={activeTab}>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
            <Tab label='Account' icon={<i className='ri-group-line' />} iconPosition='start' value='account' />
            <Tab label='Security' icon={<i className='ri-lock-2-line' />} iconPosition='start' value='security' />
            <Tab
              label='Billing & Plans'
              icon={<i className='ri-bookmark-line' />}
              iconPosition='start'
              value='billing-plans'
            />
            <Tab
              label='Notifications'
              icon={<i className='ri-notification-4-line' />}
              iconPosition='start'
              value='notifications'
            />
            <Tab label='Connections' icon={<i className='ri-link-m' />} iconPosition='start' value='connections' />
          </CustomTabList>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TabPanel value={activeTab} className='p-0'>
            {tabContentList[activeTab]}
          </TabPanel>
        </Grid>
      </Grid>
    </TabContext>
  )
}

export default AccountSettings
