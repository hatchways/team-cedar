import { Avatar } from '@mui/material';

interface ProfilePhotoProps {
  photoURL: string;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ photoURL }) => {
  return (
    <Avatar
      alt="Profile Image"
      src={photoURL}
      sx={(theme) => ({
        height: theme.spacing(40),
        width: theme.spacing(40),
        margin: '0 auto',
        padding: 1,
      })}

    />
  );
};

export default ProfilePhoto;
