import { Typography, Theme } from '@mui/material';
import { Box } from '@mui/system';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  }),
);
interface SettingHeaderProps {
  header: string;
}

const SettingHeader: React.FC<SettingHeaderProps> = ({ header }) => {
  const classes = useStyles();
  return (
    <Box>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: '8px',
        }}
      >
        {header}
      </Typography>
    </Box>
  );
};

export default SettingHeader;
