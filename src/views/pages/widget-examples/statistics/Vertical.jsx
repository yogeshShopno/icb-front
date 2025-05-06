// MUI Imports
import Grid from '@mui/material/Grid2'

// Components Imports
import CardStatVertical from '@components/card-statistics/Vertical'

const Vertical = ({ data }) => {
  if (data) {
    return (
      <Grid container spacing={6}>
        {data.map((item, index) => (
          <Grid size={{ xs: 12, sm: 4, lg: 2 }} key={index}>
            <CardStatVertical {...item} avatarSkin='light' chipColor='secondary' />
          </Grid>
        ))}
      </Grid>
    )
  }
}

export default Vertical
