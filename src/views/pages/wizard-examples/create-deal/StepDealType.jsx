// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Button from '@mui/material/Button'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import CustomInputVertical from '@core/components/custom-inputs/Vertical'
import DirectionalIcon from '@components/DirectionalIcon'

// Vars
const data = [
  {
    title: 'Percentage',
    value: 'percentage',
    content: 'Create a deal which offer uses some % off (i.e 5% OFF) on total.',
    asset: 'ri-percent-line',
    isSelected: true
  },
  {
    title: 'Flat Amount',
    value: 'flat-amount',
    content: 'Create a deal which offer uses flat $ off (i.e $5 OFF) on the total.',
    asset: 'ri-money-dollar-circle-line'
  },
  {
    title: 'Prime Member',
    value: 'prime member',
    content: 'Create prime member only deal to encourage the prime members.',
    asset: 'ri-user-3-line'
  }
]

const regionArray = ['Asia', 'Europe', 'Africa', 'Australia', 'North America', 'South America']

const StepDealType = ({ activeStep, handleNext, handlePrev, steps }) => {
  // Vars
  const initialSelectedOption = data.filter(item => item.isSelected)[data.filter(item => item.isSelected).length - 1]
    .value

  // States
  const [selectedOption, setSelectedOption] = useState(initialSelectedOption)
  const [region, setRegion] = useState('')

  const handleOptionChange = prop => {
    if (typeof prop === 'string') {
      setSelectedOption(prop)
    } else {
      setSelectedOption(prop.target.value)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <div className='flex border rounded'>
          <img
            alt='illustration'
            src='/images/illustrations/characters-with-objects/1.png'
            className='is-full max-is-full bs-auto'
          />
        </div>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Grid container spacing={5}>
          {data.map((item, index) => {
            let asset

            if (item.asset && typeof item.asset === 'string') {
              asset = <i className={classnames(item.asset, 'text-[28px]')} />
            }

            return (
              <CustomInputVertical
                type='radio'
                key={index}
                gridProps={{ size: { xs: 12, sm: 4 } }}
                selected={selectedOption}
                name='custom-radios-basic'
                handleChange={handleOptionChange}
                data={typeof item.asset === 'string' ? { ...item, asset } : item}
              />
            )
          })}
        </Grid>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Grid container spacing={5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type='number'
              label='Discount'
              placeholder='25'
              helperText='Enter the discount percentage. 10 = 10%'
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel id='select-region'>Region</InputLabel>
              <Select
                value={region}
                labelId='select-region'
                onChange={e => setRegion(e.target.value)}
                input={<OutlinedInput label='Region' />}
              >
                {regionArray.map(item => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select applicable regions for the deal.</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <div className='flex items-center justify-between'>
          <Button
            variant='outlined'
            color='secondary'
            disabled={activeStep === 0}
            onClick={handlePrev}
            startIcon={<DirectionalIcon ltrIconClass='ri-arrow-left-line' rtlIconClass='ri-arrow-right-line' />}
          >
            Previous
          </Button>
          <Button
            variant='contained'
            color={activeStep === steps.length - 1 ? 'success' : 'primary'}
            onClick={handleNext}
            endIcon={
              activeStep === steps.length - 1 ? (
                <i className='ri-check-line' />
              ) : (
                <DirectionalIcon ltrIconClass='ri-arrow-right-line' rtlIconClass='ri-arrow-left-line' />
              )
            }
          >
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default StepDealType
