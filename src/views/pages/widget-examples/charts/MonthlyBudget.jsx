'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// Components Imports
import OptionMenu from '@core/components/option-menu'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const MonthlyBudget = () => {
  // Hooks
  const theme = useTheme()

  const options = {
    chart: {
      offsetY: -8,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    stroke: {
      width: 5,
      lineCap: 'round',
      curve: 'smooth'
    },
    grid: {
      show: false,
      padding: {
        left: 3,
        top: -14,
        right: 8
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityTo: 0.7,
        opacityFrom: 0.5,
        shadeIntensity: 1,
        stops: [0, 90, 100],
        colorStops: [
          [
            {
              offset: 0,
              opacity: 0.6,
              color: 'var(--mui-palette-success-main)'
            },
            {
              offset: 100,
              opacity: 0.1,
              color: 'var(--mui-palette-background-paper)'
            }
          ]
        ]
      }
    },
    theme: {
      monochrome: {
        enabled: true,
        shadeTo: 'light',
        shadeIntensity: 1,
        color: theme.palette.success.main
      }
    },
    xaxis: {
      type: 'numeric',
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: { show: false },
    markers: {
      size: 1,
      offsetY: 1,
      offsetX: -5,
      strokeWidth: 4,
      strokeOpacity: 1,
      colors: ['transparent'],
      strokeColors: 'transparent',
      discrete: [
        {
          size: 7,
          seriesIndex: 0,
          dataPointIndex: 7,
          strokeColor: 'var(--mui-palette-success-main)',
          fillColor: 'var(--mui-palette-background-paper)'
        }
      ]
    },
    responsive: [
      {
        breakpoint: 901,
        options: {
          chart: {
            height: 243
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader title='Monthly Budget' action={<OptionMenu options={['Refresh', 'Update', 'Share']} />} />
      <CardContent className='pbs-2'>
        <AppReactApexCharts
          type='area'
          height={188}
          width='100%'
          options={options}
          series={[{ name: 'Traffic Rate', data: [0, 85, 25, 125, 90, 250, 200, 350] }]}
        />
        <Typography>Last month you had $2.42 expense transactions, 12 savings entries and 4 bills.</Typography>
      </CardContent>
    </Card>
  )
}

export default MonthlyBudget
