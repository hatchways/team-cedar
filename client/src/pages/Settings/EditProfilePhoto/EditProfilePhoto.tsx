import SettingHeader from '../../../components/SettingsHeader/SettingsHeader';
import ProfilePhoto from '../../../components/ProfilePhoto/ProfilePhoto';
import { Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Grid, Typography } from '@mui/material/';
import { User } from '../../../interface/User';

interface EditProfilePhotoProps {
  header: string;
  currentUser?: User;
  currentProfile?: { photoURL: string | undefined };
}

const EditProfilePhoto: React.FC<EditProfilePhotoProps> = ({ header, currentUser, currentProfile }) => {
  const deletePhoto = () => {
    currentProfile!.photoURL = undefined;
  };

  const onChange = (e: any) => {
    console.log('Uploaded file:', e ? e.target.files[0] : 'No file');
  };

  return (
    <Grid container>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <SettingHeader header={header} />
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'center', marginBottom: '10px' }}>
        <ProfilePhoto photoURL={currentProfile?.photoURL || `https://robohash.org/${currentUser!.email}.png`} />
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ textAlign: 'center', color: 'rgb(0,0,0,0.4)', marginBottom: '8px' }}>
          Be sure to use a photo that clearly shows your face
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'center', margin: '20px' }}>
        <Button component="label" size="large" variant="outlined" color="primary" onChange={onChange}>
          Upload A Photo From Your Device
          <input type="file" hidden />
        </Button>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Button disabled={!currentProfile?.photoURL} onClick={deletePhoto}>
          <DeleteForeverIcon />
          Delete photo
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditProfilePhoto;
