// MUI Imports
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import MuiTextField from '@mui/material/TextField'

// Third-party Imports
import classnames from 'classnames'

// Styles imports
import styles from './styles.module.css'

// Styled TextField component
const TextField = styled(MuiTextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'var(--mui-palette-background-paper)'
  }
})

const FaqHeader = ({ searchValue, setSearchValue }) => {
  return (
    <Card className={classnames('shadow-none bg-transparent bg-cover border-0', styles.bgImage)} elevation={0}>
      <CardContent className='flex flex-col items-center is-full text-center !plb-[5.5rem] pli-5'>
        <Typography variant='h4' color='primary.main' className='mbe-2'>
          Hello, how can we help?
        </Typography>
        <Typography className='mbe-7'>or choose a category to quickly find the help you need</Typography>
        <TextField
          className='is-full sm:max-is-[55%] md:max-is-[600px]'
          variant='outlined'
          placeholder='Ask a question...'
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position='start'>
                  <i className='ri-search-line' />
                </InputAdornment>
              )
            }
          }}
        />
      </CardContent>
    </Card>
  )
}

export default FaqHeader
