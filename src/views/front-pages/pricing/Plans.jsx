// Next Imports
import Link from 'next/link'

// MUI Imports
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Styles Imports
import tableStyles from '@core/styles/table.module.css'
import styles from './styles.module.css'
import frontCommonStyles from '@views/front-pages/styles.module.css'

// Data
const features = [
  {
    feature: '14-days free trial',
    starter: true,
    pro: true,
    enterprise: true,
    addOnAvailable: {
      starter: false,
      pro: false,
      enterprise: false
    }
  },
  {
    feature: 'No user limit',
    starter: false,
    pro: false,
    enterprise: true,
    addOnAvailable: {
      starter: false,
      pro: false,
      enterprise: false
    }
  },
  {
    feature: 'Product Support',
    starter: false,
    pro: true,
    enterprise: true,
    addOnAvailable: {
      starter: false,
      pro: false,
      enterprise: false
    }
  },
  {
    feature: 'Email Support',
    starter: false,
    pro: false,
    enterprise: true,
    addOnAvailable: {
      starter: false,
      pro: true,
      enterprise: false
    }
  },
  {
    feature: 'Integrations',
    starter: false,
    pro: true,
    enterprise: true,
    addOnAvailable: {
      starter: false,
      pro: false,
      enterprise: false
    }
  },
  {
    feature: 'Removal of Front branding',
    starter: false,
    pro: false,
    enterprise: true,
    addOnAvailable: {
      starter: false,
      pro: true,
      enterprise: false
    }
  },
  {
    feature: 'Active maintenance & support',
    starter: false,
    pro: false,
    enterprise: true,
    addOnAvailable: {
      starter: false,
      pro: false,
      enterprise: false
    }
  },
  {
    feature: 'Data storage for 365 days',
    starter: false,
    pro: false,
    enterprise: true,
    addOnAvailable: {
      starter: false,
      pro: false,
      enterprise: false
    }
  }
]

const plans = [
  { variant: 'outlined', label: 'Choose Plan', plan: 'starter' },
  { variant: 'contained', label: 'Choose Plan', plan: 'pro' },
  { variant: 'outlined', label: 'Choose Plan', plan: 'enterprise' }
]

const Plans = () => {
  return (
    <section className='md:plb-[100px] plb-[50px] bg-backgroundPaper'>
      <div className={frontCommonStyles.layoutSpacing}>
        <div className='flex flex-col text-center gap-2 mbe-6'>
          <Typography variant='h4'>Pick a plan that works best for you</Typography>
          <Typography>Stay cool, we have a 48-hour money back guarantee!</Typography>
        </div>
        <div className='overflow-x-auto border rounded'>
          <table className={tableStyles.table}>
            <thead className={classnames('border-be', styles.tableHead)}>
              <tr>
                <th>Time</th>
                <th>
                  <>STARTER</>
                  <Typography variant='body2' className='capitalize'>
                    Free
                  </Typography>
                </th>
                <th>
                  <div className='flex justify-center gap-x-2'>
                    <>Pro</>
                    <CustomAvatar size={20} color='primary'>
                      <i className='ri-star-line text-[14px]' />
                    </CustomAvatar>
                  </div>
                  <Typography variant='body2' className='capitalize'>
                    $7.5/Month
                  </Typography>
                </th>
                <th>
                  <>ENTERPRISE</>
                  <Typography variant='body2' className='capitalize'>
                    $16/Month
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody className={classnames('border-be', styles.tableBody)}>
              {features.map((feature, index) => (
                <tr key={index}>
                  <td className='text-textPrimary'>{feature.feature}</td>
                  <td>
                    {feature.starter ? (
                      <i className='ri-checkbox-circle-line text-primary' />
                    ) : (
                      <i className='ri-close-circle-line' />
                    )}
                  </td>
                  <td>
                    {feature.pro ? (
                      <i className='ri-checkbox-circle-line text-primary' />
                    ) : feature.addOnAvailable.pro && !feature.pro ? (
                      <Chip variant='tonal' size='small' color='primary' label='Add-on-Available' />
                    ) : (
                      <i className='ri-close-circle-line' />
                    )}
                  </td>
                  <td>
                    {feature.enterprise ? (
                      <i className='ri-checkbox-circle-line text-primary' />
                    ) : (
                      <i className='ri-close-circle-line' />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                {plans.map((plan, index) => (
                  <td key={index} className='text-center plb-[9px]'>
                    <Button component={Link} href='/front-pages/payment' variant={plan.variant}>
                      {plan.label}
                    </Button>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Plans
