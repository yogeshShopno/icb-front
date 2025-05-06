'use client'

// Next Imports
import dynamic from 'next/dynamic'

//  MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'

// Components Imports
import OptionMenu from '@core/components/option-menu'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const series = [
  {
    name: 'Income',
    data: [70, 90, 80, 95, 75, 90]
  },
  {
    name: 'Net Worth',
    data: [110, 72, 62, 65, 100, 75]
  }
]

const Performance = () => {
  // Hooks
  const theme = useTheme()

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    legend: {
      itemMargin: { horizontal: 10 },
      fontSize: '15px',
      labels: { colors: 'var(--mui-palette-text-secondary)' },
      offsetY: 5,
      markers: {
        offsetX: theme.direction === 'rtl' ? 8 : -4,
        width: 10,
        height: 10
      }
    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: 'var(--mui-palette-divider)',
          connectorColors: 'var(--mui-palette-divider)'
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: ['var(--mui-palette-warning-main)', 'var(--mui-palette-primary-main)'],
        shadeIntensity: 1,
        type: 'vertical',
        opacityFrom: 1,
        opacityTo: 0.9,
        stops: [0, 100]
      }
    },
    colors: ['var(--mui-palette-warning-main)', 'var(--mui-palette-primary-main)'],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    markers: { size: 0 },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontSize: '0.8125rem',
          colors: [
            'var(--mui-palette-text-disabled)',
            'var(--mui-palette-text-disabled)',
            'var(--mui-palette-text-disabled)',
            'var(--mui-palette-text-disabled)',
            'var(--mui-palette-text-disabled)',
            'var(--mui-palette-text-disabled)'
          ]
        }
      }
    },
    yaxis: { show: false },
    grid: {
      show: false,
      padding: {
        top: 10,
        bottom: -10
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          chart: {
            height: 369
          },
          plotOptions: {
            radar: {
              offsetX: 5
            }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          chart: {
            height: 318
          },
          plotOptions: {
            radar: {
              offsetY: -15
            }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader title='Performance' action={<OptionMenu options={['Last 28 Days', 'Last Month', 'Last Year']} />} />
      <CardContent>
        <AppReactApexCharts type='radar' height={285} width='100%' series={series} options={options} />
      </CardContent>
    </Card>
  )
}

export default Performance
