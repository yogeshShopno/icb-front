'use client'

// MUI Imports
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { useColorScheme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Components Imports
import OptionMenu from '@core/components/option-menu'

// Vars
const data = [
  {
    title: '3D Illustration',
    subtitle: 'Blender Illustration',
    budget: '$6,500',
    transaction: 'debit',
    avatarSrc: '/images/icons/3d-illustration.png',
    alt: '3d-illustration'
  },
  {
    title: 'Finance App Design',
    subtitle: 'Figma UI Kit',
    budget: '$4,290',
    transaction: 'credit',
    avatarSrc: '/images/icons/finance-app-design.png',
    alt: 'finance-app-design'
  },
  {
    title: '4 Square',
    subtitle: 'Android Application',
    budget: '$44,500',
    transaction: 'debit',
    avatarSrc: '/images/icons/4-square.png',
    alt: '4-square'
  },
  {
    title: 'Delta Web App',
    subtitle: 'React Dashboard',
    budget: '$12,690',
    transaction: 'debit',
    avatarSrc: '/images/icons/delta-web-app.png',
    alt: 'delta-web-app'
  }
]

const ProjectStatistics = ({ serverMode }) => {
  // Hooks
  const { mode } = useColorScheme()

  // Vars
  const _mode = (mode === 'system' ? serverMode : mode) || serverMode

  return (
    <Card>
      <CardHeader title='Project Statistics' action={<OptionMenu options={['Refresh', 'Edit', 'Share']} />} />
      <CardContent className='flex justify-between plb-4 border-b'>
        <Typography variant='overline' color='text.secondary' className='uppercase'>
          Name
        </Typography>
        <Typography variant='overline' color='text.secondary' className='uppercase'>
          Budget
        </Typography>
      </CardContent>
      <CardContent className='flex flex-col gap-[1.4063rem] max-[1310px]:gap-[2.4375rem] pbs-5'>
        {data.map((item, index) => (
          <div key={index} className='flex items-center gap-4'>
            <Avatar
              variant='rounded'
              className={classnames('bg-actionHover is-[50px] bs-[38px]', {
                'bg-white': _mode === 'dark',
                'bg-actionHover': _mode === 'light'
              })}
            >
              <img src={item.avatarSrc} alt={item.alt} height='22px' />
            </Avatar>
            <div className='flex flex-wrap justify-between items-center gap-2 is-full'>
              <div className='flex flex-col gap-1'>
                <Typography className='font-medium' color='text.primary'>
                  {item.title}
                </Typography>
                <Typography variant='body2'>{item.subtitle}</Typography>
              </div>
              <Chip label={item.budget} color='primary' size='small' variant='tonal' />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default ProjectStatistics
