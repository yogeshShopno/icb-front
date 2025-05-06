// MUI Imports
import Grid from '@mui/material/Grid2'

// Components Imports
import CardStatWithImage from '@components/card-statistics/Character'

const Characters = ({ data }) => {
  if (data) {
    return (
      <Grid container spacing={6}>
        {data.map((item, index) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
            <CardStatWithImage {...item} />
          </Grid>
        ))}
      </Grid>
    )
  }
}

export default Characters
