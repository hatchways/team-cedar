import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import useStyles from '../LoginForm/useStyles';

export default function Login({ handleSubmit }: any): JSX.Element {
  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit} className={classes.form} noValidate>
      <Box textAlign="center" marginTop={5}>
        <Button
          type="submit"
          size="small"
          variant="contained"
          color="primary"
          className={classes.submit}
          disableElevation
        >
          Login as Demo User
        </Button>
      </Box>
    </form>
  );
}
