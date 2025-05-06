'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import useMediaQuery from '@mui/material/useMediaQuery'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import Logo from '@components/layout/shared/Logo'

// Styled Component Imports
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

const EditCard = ({ invoiceData, id, data }) => {
  // States
  const [selectData, setSelectData] = useState(data?.[0] || null)
  const [count, setCount] = useState(1)
  const [issueDate, setIssueDate] = useState(new Date(invoiceData?.issuedDate ?? ''))
  const [dueDate, setDueDate] = useState(new Date(invoiceData?.dueDate ?? ''))

  // Hooks
  const isBelowMdScreen = useMediaQuery(theme => theme.breakpoints.down('md'))

  const deleteForm = e => {
    e.preventDefault()

    // @ts-ignore
    e.target.closest('.repeater-item').remove()
  }

  return (
    <>
      <Card>
        <CardContent className='sm:!p-12'>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12 }}>
              <div className='p-6 rounded bg-actionHover'>
                <div className='flex justify-between gap-4 flex-col sm:flex-row'>
                  <div className='flex flex-col gap-6'>
                    <div className='flex items-center'>
                      <Logo />
                    </div>
                    <div>
                      <Typography color='text.primary'>Office 149, 450 South Brand Brooklyn</Typography>
                      <Typography color='text.primary'>San Diego County, CA 91905, USA</Typography>
                      <Typography color='text.primary'>+1 (123) 456 7891, +44 (876) 543 2198</Typography>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-4'>
                      <Typography variant='h5' className='min-is-[95px]'>
                        Invoice
                      </Typography>
                      <TextField
                        fullWidth
                        size='small'
                        value={id}
                        slotProps={{
                          input: {
                            disabled: true,
                            startAdornment: <InputAdornment position='start'>#</InputAdornment>
                          }
                        }}
                      />
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[95px]' color='text.primary'>
                        Date Issued:
                      </Typography>
                      <AppReactDatepicker
                        boxProps={{ className: 'is-full' }}
                        selected={issueDate}
                        id='payment-date'
                        onChange={date => date !== null && setIssueDate(date)}
                        customInput={<TextField fullWidth size='small' />}
                      />
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[95px]' color='text.primary'>
                        Date Due:
                      </Typography>
                      <AppReactDatepicker
                        boxProps={{ className: 'is-full' }}
                        selected={dueDate}
                        id='payment-date'
                        onChange={date => date !== null && setDueDate(date)}
                        customInput={<TextField fullWidth size='small' />}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <div className='flex justify-between flex-col gap-4 flex-wrap sm:flex-row'>
                <div className='flex flex-col gap-4'>
                  <Typography className='font-medium' color='text.primary'>
                    Invoice To:
                  </Typography>
                  <Select
                    className='is-1/2 min-is-[200px] sm:is-auto'
                    size='small'
                    value={selectData?.id}
                    onChange={e => {
                      setSelectData(data?.slice(0, 5).filter(item => item.id === e.target.value)[0] || null)
                    }}
                  >
                    {data?.slice(0, 5).map((invoice, index) => (
                      <MenuItem key={index} value={invoice.id}>
                        {invoice.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <div>
                    <Typography>{selectData?.name}</Typography>
                    <Typography>{selectData?.company}</Typography>
                    <Typography>{selectData?.address}</Typography>
                    <Typography>{selectData?.contact}</Typography>
                    <Typography>{selectData?.companyEmail}</Typography>
                  </div>
                </div>
                <div className='flex flex-col gap-4'>
                  <Typography className='font-medium' color='text.primary'>
                    Bill To:
                  </Typography>
                  <div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>Total Due:</Typography>
                      <Typography>$12,110.55</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>Bank name:</Typography>
                      <Typography>American Bank</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>Country:</Typography>
                      <Typography>United States</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>IBAN:</Typography>
                      <Typography>ETD95476213874685</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>SWIFT code:</Typography>
                      <Typography>BR91905</Typography>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Divider className='border-dashed' />
            </Grid>
            <Grid size={{ xs: 12 }}>
              {Array.from(Array(count).keys()).map((item, index) => (
                <div
                  key={index}
                  className={classnames('repeater-item flex relative mbe-4 border rounded', {
                    'first:mbs-[38px] mbs-[62px]': !isBelowMdScreen,
                    'gap-5': isBelowMdScreen
                  })}
                >
                  <Grid container spacing={5} className='m-0 p-5'>
                    <Grid size={{ xs: 12, md: 5, lg: 6 }}>
                      <Typography className='font-medium md:absolute md:-top-[38px]' color='text.primary'>
                        Item
                      </Typography>
                      <Select fullWidth size='small' defaultValue='App Design' className='mbe-5'>
                        <MenuItem value='App Design'>App Design</MenuItem>
                        <MenuItem value='App Customization'>App Customization</MenuItem>
                        <MenuItem value='ABC Template'>ABC Template</MenuItem>
                        <MenuItem value='App Development'>App Development</MenuItem>
                      </Select>
                      <TextField rows={2} fullWidth multiline size='small' defaultValue='Customization & Bug Fixes' />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3, lg: 2 }}>
                      <Typography className='font-medium md:absolute md:-top-[38px]' color='text.primary'>
                        Cost
                      </Typography>
                      <TextField
                        {...(isBelowMdScreen && { fullWidth: true })}
                        size='small'
                        type='number'
                        placeholder='24'
                        defaultValue='24'
                        className='mbe-5'
                        slotProps={{
                          input: { inputProps: { min: 0 } }
                        }}
                      />
                      <div className='flex flex-col'>
                        <Typography component='span' color='text.primary'>
                          Discount:
                        </Typography>
                        <div className='flex gap-2'>
                          <Typography component='span' color='text.primary'>
                            0%
                          </Typography>
                          <Tooltip title='Tax 1' placement='top'>
                            <Typography component='span' color='text.primary'>
                              0%
                            </Typography>
                          </Tooltip>
                          <Tooltip title='Tax 2' placement='top'>
                            <Typography component='span' color='text.primary'>
                              0%
                            </Typography>
                          </Tooltip>
                        </div>
                      </div>
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                      <Typography className='font-medium md:absolute md:-top-[38px]' color='text.primary'>
                        Hours
                      </Typography>
                      <TextField
                        {...(isBelowMdScreen && { fullWidth: true })}
                        size='small'
                        type='number'
                        placeholder='1'
                        defaultValue='1'
                        slotProps={{
                          input: {
                            inputProps: { min: 0 }
                          }
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                      <Typography className='font-medium md:absolute md:-top-[38px]' color='text.primary'>
                        Price
                      </Typography>
                      <Typography color='text.primary'>$24.00</Typography>
                    </Grid>
                  </Grid>
                  <div className='flex flex-col justify-start border-is'>
                    <IconButton size='small' onClick={deleteForm}>
                      <i className='ri-close-line text-2xl text-actionActive' />
                    </IconButton>
                  </div>
                </div>
              ))}
              <Grid size={{ xs: 12 }}>
                <Button
                  size='small'
                  variant='contained'
                  onClick={() => setCount(count + 1)}
                  startIcon={<i className='ri-add-line' />}
                >
                  Add Item
                </Button>
              </Grid>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Divider className='border-dashed' />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <div className='flex justify-between flex-col gap-4 sm:flex-row'>
                <div className='flex flex-col gap-4 order-2 sm:order-[unset]'>
                  <div className='flex items-center gap-2'>
                    <Typography className='font-medium' color='text.primary'>
                      Salesperson:
                    </Typography>
                    <TextField size='small' defaultValue='Tommy Shelby' />
                  </div>
                  <TextField size='small' defaultValue='Thanks for your business' />
                </div>
                <div className='min-is-[200px]'>
                  <div className='flex items-center justify-between'>
                    <Typography>Subtotal:</Typography>
                    <Typography className='font-medium' color='text.primary'>
                      $1800
                    </Typography>
                  </div>
                  <div className='flex items-center justify-between'>
                    <Typography>Discount:</Typography>
                    <Typography className='font-medium' color='text.primary'>
                      $28
                    </Typography>
                  </div>
                  <div className='flex items-center justify-between'>
                    <Typography>Tax:</Typography>
                    <Typography className='font-medium' color='text.primary'>
                      21%
                    </Typography>
                  </div>
                  <Divider className='mlb-2' />
                  <div className='flex items-center justify-between'>
                    <Typography>Total:</Typography>
                    <Typography className='font-medium' color='text.primary'>
                      $1690
                    </Typography>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Divider className='border-dashed' />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <InputLabel htmlFor='invoice-note' className='inline-flex mbe-1 text-textPrimary'>
                Note:
              </InputLabel>
              <TextField
                id='invoice-note'
                rows={2}
                fullWidth
                multiline
                defaultValue='It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance
            projects. Thank You!'
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default EditCard
