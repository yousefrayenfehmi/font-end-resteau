import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ClearIcon from '@mui/icons-material/Clear';
import { creatcontexte } from '../createContext/createcontext';
export default function MediaControlCard({id,type,taille,prix}) {
  const theme = useTheme();
const {supprimeritem}=React.useContext(creatcontexte)
  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <IconButton aria-label="previous" onClick={()=>supprimeritem(id)
          } >
            <ClearIcon  />
          </IconButton>
          <Typography component="div" variant="h5">
            {type}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
           {taille}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        <Typography variant="subtitle1" color="text.secondary" component="div">
           {prix} dt
          </Typography>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="/img/pp.jpg"
        alt="Live from space album cover"
      />
    </Card>
  );
}
