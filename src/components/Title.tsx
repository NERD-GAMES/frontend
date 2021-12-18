import { Grid, Typography } from "@mui/material"

interface Props {
  title: string
  right?: any
}

const Title = ({ title, right }: Props) => {
  return (
    <div style={{padding:"8px 0"}}>
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
    </div>
  )
}


export default Title