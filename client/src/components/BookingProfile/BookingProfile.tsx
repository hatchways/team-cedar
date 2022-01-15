import { Box, Avatar, Stack, Typography, IconButton } from '@mui/material';
interface ProfileProps {
  img?: string;
  username: string;
  fontSize?: number;
}

const BookingProfile = ({ img, username, fontSize }: ProfileProps): JSX.Element => {
  const getFirstLetter = username.charAt(0);

  return (
    <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 2 }}>
      <IconButton>
        {img ? (
          <Avatar alt={username} src={img} />
        ) : (
          <Avatar sx={{ bgcolor: 'primary.main' }} alt={username}>
            {getFirstLetter}
          </Avatar>
        )}
      </IconButton>

      <Box>
        <Typography sx={{ fontWeight: 800, mt: 2, fontSize: fontSize }}>{username}</Typography>
      </Box>
    </Stack>
  );
};

export default BookingProfile;
