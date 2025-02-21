import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import KitchenIcon from '@mui/icons-material/Kitchen';
import ChecklistIcon from '@mui/icons-material/Checklist';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function MyNavBar() {
  const [value, setValue] = React.useState(0);

  return (
    <div className="fixed bottom-0 w-full mx-auto z-20 bg-white">
        <Box sx={{ width: "80%", borderRadius: "10px", marginLeft: "auto", marginRight: "auto" }}>
        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            sx={{ borderRadius: "10px" }}
            >
            <BottomNavigationAction href="/" label="Fridge" icon={<KitchenIcon />} />
            <BottomNavigationAction href='/list' label="List" icon={<ChecklistIcon />} />
            <BottomNavigationAction href='/nearby' label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
        </Box>
    </div>
  );
}