import { Grid, Typography } from "@mui/material"

interface Props {
  title: string
  right?: any
}

const Title = ({ title, right }: Props) => {
  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        <Typography variant="subtitle1" color="text.secondary">
          {title}
        </Typography>
      </Grid>
      <Grid item>
        {right}
      </Grid>
    </Grid>
  )
}


export default Title