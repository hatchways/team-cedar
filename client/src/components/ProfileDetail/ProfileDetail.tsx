import { Grid, Typography, Button, Stack, Paper } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CreateIcon from '@mui/icons-material/Create';
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.grey[100],
  backgroundColor: theme.palette.primary.main,
}));
type availability = {
  day: string[];
};
interface ProfileDetailProps {
  name?: string;

  descrption?: string;
  location?: string;
  availability?: availability;
  review?: number;
  type?: string;
  photoURL?: string;
}

const ProfileDetail = ({
  name,
  descrption,
  location,
  availability,
  review,
  type,
  photoURL,
}: ProfileDetailProps): JSX.Element => {
  return (
    <Grid container sx={{ p: 2 }}>
      <Grid item xs={12}>
        <ProfilePhoto photoURL={photoURL ? photoURL : `https://robohash.org/${name}.png`} />
      </Grid>
      {name && (
        <Grid item xs={12} sx={{ mt: 1 }}>
          <Typography align="center" variant="h4" fontWeight={700}>
            {name}
          </Typography>
        </Grid>
      )}
      {descrption && (
        <Grid item xs={12} sx={{ mt: 1 }}>
          <Typography align="center" sx={{ fontSize: 16, fontWeight: 500 }} color={'gray'}>
            {descrption}
          </Typography>
        </Grid>
      )}
      {location && (
        <Grid item xs={12} sx={{ mt: 1, pt: 1 }}>
          <Stack direction="row" spacing={1} justifyContent={'center'}>
            <LocationOnIcon sx={{ color: 'red' }} />
            <Typography color={'gray'} sx={{ fontSize: 14, fontWeight: 500 }}>
              {location}
            </Typography>
          </Stack>
        </Grid>
      )}

      {availability && (
        <Grid item xs={12} sx={{ mt: 1, pt: 4 }}>
          <Stack direction="row" spacing={2} justifyContent={'center'}>
            {availability?.day.map((item) => (
              <Item key={item}>{item}</Item>
            ))}
          </Stack>
        </Grid>
      )}
      {type === 'PetSitter' && (
        <>
          <Grid item xs={12} sx={{ mt: 1, pt: 10, maxWidth: 300 }}>
            <Link to={'/reviews'}>
              <Typography color="primary">Rating and Reviews({review ? review : 0})</Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sx={{ mt: 1 }}>
            <Stack direction="row" spacing={1} justifyContent={'flex-end'}>
              <Button variant="contained" startIcon={<CreateIcon />}>
                write a review
              </Button>
            </Stack>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default ProfileDetail;
