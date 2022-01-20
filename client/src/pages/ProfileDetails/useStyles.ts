import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '&.MuiContainer-root': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      margin: '100px',
    },
  },
  profileContainer: {
    alignItems: 'center',
    paddingTop: '180px',
    paddingBottom: '80px',
    paddingLeft: '10px',
    paddingRight: '60px',
    margin: '80px',
  },
  profilePic: {
    '&.MuiAvatar-root': {
      width: 100,
      height: 100,
      marginBottom: '30px',
    },
  },
  name: {
    '&.MuiTypography-root': {
      fontWeight: '500',
      marginBottom: '-10px',
    },
  },
  description: {
    color: 'grey',
    textTransform: 'capitalize',
  },
  locationContainer: {
    display: 'flex',
    flexDirection: 'row',
    '&.MuiGrid-root': {
      marginTop: '-16px',
      marginLeft: '-34px',
      paddingLeft: 0,
    },
  },
  location: {
    color: 'grey',
    textTransform: 'capitalize',
    '&.MuiTypography-root': {
      margin: '7px',
    },
  },
  aboutContainer: {
    width: '100%',
  },
  about: {
    '&.MuiTypography-root': {
      fontWeight: '400',
      color: 'black',
    },
  },
  reviewCountainer: {
    align: 'left',
    width: '100%',
    '&.MuiGrid-root': {
      margin: '25px',
    },
  },
  reviews: {
    textDecoration: 'underline',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'right',
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '3px',
  },
  button: {
    '&.MuiButton-root': {
      color: 'white',
      backgroundColor: '#f14140',
      width: '140px',
      margin: '11px',
      padding: '10px',
    },
  },
  submitFormContainer: {
    paddingTop: '37px',
    height: '425px',
    alignItems: 'center',
    '&.MuiPaper-root': {
      marginTop: '-15px',
      paddingLeft: '20px',
    },
  },
  alignment: {
    alignItems: 'center',
  },
  titles: {
    '&.MuiTypography-root': {
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginBottom: '-24px',
    },
  },
  rate: {
    '&.MuiTypography-root': {
      fontWeight: 'bold',
    },
  },
}));

export default useStyles;
