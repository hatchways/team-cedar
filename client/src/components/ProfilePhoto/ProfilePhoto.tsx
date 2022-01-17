interface ProfilePhotoProps {
  photoURL: string;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ photoURL }) => {
  return (
    <img
      alt="Profile Image"
      style={{ textAlign: 'center', width: '60%', borderRadius: '50%', overflow: 'hidden' }}
      src={photoURL}
    />
  );
};

export default ProfilePhoto;
