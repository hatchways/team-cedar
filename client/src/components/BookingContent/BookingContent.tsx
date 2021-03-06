import { Box, Typography, Paper } from '@mui/material';
import BookingProfile from '../BookingProfile/BookingProfile';
import SettingsIcon from '@mui/icons-material/Settings';
import { format } from 'date-fns';
interface ContentProps {
  img?: string;
  username: string;
  fontSize?: number;
  date: Date;
  from: Date;
  to: Date;
  accept: boolean;
}

const BookingContent: React.FC<ContentProps> = ({ img, username, fontSize, date, from, to, accept }) => {
  const getDate = new Date(date);
  const getFrom = new Date(from);
  const getTo = new Date(to);

  return (
    <Box
      sx={{ background: '#fff', padding: 1, borderRadius: 1, mb: 1, maxHeight: 120 }}
      component={Paper}
      variant="outlined"
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ color: 'black', fontWeight: 500, mt: 2, ml: 2, fontSize: 14 }}>
          {format(getDate, 'dd MMMM yyyy')},&nbsp;{`${format(getFrom, 'hh')}-${format(getTo, 'hh')}`}&nbsp;
          {format(getTo, 'a')}
        </Typography>
        <SettingsIcon fontSize="small" color={'disabled'} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1, mb: 1 }}>
        <BookingProfile username={username} img={img} fontSize={fontSize} />
        <Typography
          sx={{ color: 'gray', fontWeight: 800, mt: 1, fontSize: 12, pr: 2, pb: 2, textTransform: 'uppercase' }}
        >
          {accept ? 'accepted' : 'declined'}
        </Typography>
      </Box>
    </Box>
  );
};

export default BookingContent;
