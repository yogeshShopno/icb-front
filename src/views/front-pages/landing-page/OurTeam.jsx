// React Imports
import { useEffect, useRef } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import { styled } from '@mui/material/styles'

// Hook Imports
import { useIntersection } from '@/hooks/useIntersection'

// SVG Imports
import ElementOne from '@/assets/svg/front-pages/landing-page/ElementOne'
import Lines from '@assets/svg/front-pages/landing-page/Lines'

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'

// Data
const team = [
  {
    name: 'Sophie Gilbert',
    position: 'Project Manager',
    image: '/images/front-pages/landing-page/sophie.png',
    color: 'var(--mui-palette-primary-mainOpacity)'
  },
  {
    name: 'Chris Watkins',
    position: 'Development Lead',
    image: '/images/front-pages/landing-page/chris.png',
    color: 'var(--mui-palette-error-mainOpacity)'
  },
  {
    name: 'Nannie Ford',
    position: 'Marketing Manager',
    image: '/images/front-pages/landing-page/nannie.png',
    color: 'var(--mui-palette-success-mainOpacity)'
  },
  {
    name: 'Paul Miles',
    position: 'UI Designer',
    image: '/images/front-pages/landing-page/paul.png',
    color: 'var(--mui-palette-info-mainOpacity)'
  }
]

const Card = styled('div')`
  &:hover {
    border-color: ${props => props.color};

    & i:nth-child(1) {
      color: rgb(59, 89, 152) !important;
    }
    & i:nth-child(2) {
      color: rgb(0, 172, 238) !important;
    }
    & i:nth-child(3) {
      color: rgb(0, 119, 181) !important;
    }
  }
`

const OurTeam = () => {
  // Refs
  const skipIntersection = useRef(true)
  const ref = useRef(null)

  // Hooks
  const { updateIntersections } = useIntersection()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (skipIntersection.current) {
          skipIntersection.current = false

          return
        }

        updateIntersections({ [entry.target.id]: entry.isIntersecting })
      },
      { threshold: 0.35 }
    )

    ref.current && observer.observe(ref.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section id='team' className='plb-[100px] bg-backgroundPaper' ref={ref}>
      <div className={frontCommonStyles.layoutSpacing}>
        <div className='flex flex-col items-center justify-center'>
          <div className='flex is-full justify-center relative'>
            <ElementOne className='absolute inline-end-0' />
            <div className='flex items-center justify-center mbe-6 gap-3'>
              <Lines />
              <Typography variant='h6' className='uppercase'>
                Our Great Team
              </Typography>
            </div>
          </div>
          <div className='flex items-baseline flex-wrap gap-2 mbe-3 sm:mbe-2'>
            <Typography variant='h4' className='font-bold'>
              Supported
            </Typography>
            <Typography variant='h5'> by Real People</Typography>
          </div>
          <Typography className='font-medium text-center'>Who is behind these great-looking interfaces?</Typography>
        </div>
        <Grid container rowSpacing={16} columnSpacing={6} className='pbs-[100px]'>
          {team.map((member, index) => (
            <Grid size={{ xs: 12, md: 6, lg: 3 }} key={index}>
              <Card className='border rounded overflow-visible' color={member.color}>
                <div className='flex flex-col items-center justify-center p-0'>
                  <div
                    className='flex justify-center is-full mli-auto text-center bs-[189px] relative overflow-visible rounded-bs'
                    style={{ backgroundColor: member.color }}
                  >
                    <img src={member.image} alt={member.name} className='bs-[240px] absolute block-start-[-50px]' />
                  </div>
                  <div className='flex flex-col gap-3 p-5 is-full'>
                    <div className='text-center'>
                      <Typography variant='h5'>{member.name}</Typography>
                      <Typography>{member.position}</Typography>
                    </div>
                    <div className='flex gap-3 item-center justify-center'>
                      <i className='ri-facebook-circle-line text-[22px] text-textPrimary' />
                      <i className='ri-twitter-line text-[22px] text-textPrimary' />
                      <i className='ri-linkedin-box-line text-[22px] text-textPrimary' />
                    </div>
                  </div>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  )
}

export default OurTeam
