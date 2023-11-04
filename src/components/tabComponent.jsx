import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const TabComponent = ({
  HeadList,
  Element,
  switchIn,
  setSwitchIn = () => {},
}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSwitchIn(null);
    setValue(newValue);
  };
  React.useEffect(() => {
    setValue(switchIn?.id ?? 0);
  }, [switchIn]);
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {HeadList?.map((name, i) => {
            return <Tab label={name} {...a11yProps(i)} />;
          })}
        </Tabs>
      </Box>
      {Element?.map((elm, i) => {
        return (
          <CustomTabPanel value={value} index={i}>
            {elm}
          </CustomTabPanel>
        );
      })}
    </Box>
  );
};
