// React Imports
import { useState } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'

// Data
const statData = [
  {
    title: 'Completed Sites',
    value: 137,
    icon: 'ri-layout-line',
    color: 'primary',
    isHover: false
  },
  {
    title: 'Working Hours',
    value: 1100,
    icon: 'ri-time-line',
    color: 'success',
    isHover: false
  },
  {
    title: 'Happy Customers',
    value: 137,
    icon: 'ri-user-smile-line',
    color: 'warning',
    isHover: false
  },
  {
    title: 'Awards Winning',
    value: 23,
    icon: 'ri-award-line',
    color: 'info',
    isHover: false
  }
]

const ProductStat = () => {
  const [hoverIndex, setHoverIndex] = useState(null)

  return (
    <section className='plb-[84px] bg-backgroundPaper'>
      <div className={frontCommonStyles.layoutSpacing}>
        <Grid container spacing={6}>
          {statData.map((stat, index) => (
            <Grid size={{ xs: 6, md: 3 }} key={index}>
              <div className='flex flex-col items-center justify-center gap-6'>
                <CustomAvatar
                  onMouseEnter={() => {
                    setHoverIndex(index)
                  }}
                  onMouseLeave={() => {
                    setHoverIndex(null)
                  }}
                  skin={hoverIndex === index ? 'filled' : 'light'}
                  color={stat.color}
                  size={82}
                  className='cursor-pointer'
                >
                  <i className={classnames(stat.icon, 'text-[2.625rem]')} />
                </CustomAvatar>
                <div className='text-center'>
                  <Typography color='text.primary' className='font-bold text-[34px]'>
                    {stat.value}+
                  </Typography>
                  <Typography className='font-medium'>{stat.title}</Typography>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  )
}

export default ProductStat
