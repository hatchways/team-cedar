import Box from '@mui/material/Box';

interface TabPanelProps {
  children: JSX.Element | JSX.Element[];
  index: number;
  value: number;
}

const TabPanel = ({ children, index, value }: TabPanelProps): JSX.Element => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`booking-tabpanel-${index}`}
      aria-labelledby={`booking-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
};

export default TabPanel;
