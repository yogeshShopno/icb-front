'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Vars
const series = [64]

const RadialBarChart = () => {
  // Hooks
  const theme = useTheme()

  const options = {
    chart: {
      sparkline: { enabled: true }
    },
    stroke: { lineCap: 'round' },
    colors: ['var(--mui-palette-primary-main)'],
    grid: {
      padding: {
        bottom: -10
      }
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '55%' },
        track: {
          background: 'var(--mui-palette-customColors-trackBg)'
        },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 5,
            fontWeight: 500,
            fontSize: '0.9375rem',
            color: 'var(--mui-palette-text-primary)'
          }
        }
      }
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    responsive: [
      {
        breakpoint: 1310,
        options: {
          chart: {
            height: 130
          },
          plotOptions: {
            radialBar: {
              offsetY: 26
            }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          chart: {
            height: 104
          },
          plotOptions: {
            radialBar: {
              offsetY: 10
            }
          }
        }
      }
    ]
  }

  return (
    <Card className='bs-full'>
      <CardContent>
        <div className='flex flex-wrap items-center gap-1'>
          <Typography variant='h5'>$67.1k</Typography>
          <Typography color='success.main'>+49%</Typography>
        </div>
        <Typography variant='subtitle1'>Overview</Typography>

        <AppReactApexCharts type='radialBar' height={104} width='100%' options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default RadialBarChart
