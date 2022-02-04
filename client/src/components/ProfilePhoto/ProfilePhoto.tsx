import { Avatar } from '@mui/material';

interface ProfilePhotoProps {
  photoURL: string;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ photoURL }) => {
  return (
    <img
      alt="Profile Image"
      src={photoURL ? photoURL : ' https://via.placeholder.com/150'}
      style={{
        textAlign: 'center',
        maxHeight: '100%',
        maxWidth: '100%',
        borderRadius: '50%',
        overflow: 'hidden',
      }}
    />
  );
};

export default ProfilePhoto;
