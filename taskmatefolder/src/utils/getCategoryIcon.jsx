import React from 'react';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import HandymanIcon from '@mui/icons-material/Handyman';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import BuildIcon from '@mui/icons-material/Build';
import RoofingIcon from '@mui/icons-material/Roofing';
import WaterDamageIcon from '@mui/icons-material/WaterDamage';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import DoorSlidingIcon from '@mui/icons-material/DoorSliding';
import FlooringIcon from '@mui/icons-material/Deck';
import GarageIcon from '@mui/icons-material/Garage';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import WindowIcon from '@mui/icons-material/Window';
import WeekendIcon from '@mui/icons-material/Weekend';
import PestControlIcon from '@mui/icons-material/PestControl';
import GrassIcon from '@mui/icons-material/Grass';
import PoolIcon from '@mui/icons-material/Pool';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import SecurityIcon from '@mui/icons-material/Security';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SpaIcon from '@mui/icons-material/Spa';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import DeleteIcon from '@mui/icons-material/Delete';
import FenceIcon from '@mui/icons-material/Fence';
import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded';

const iconsMap = {
  'Plumbing': <BuildCircleIcon />,
  'Electrical Services': <ElectricalServicesIcon />,
  'Handyman Services': <HandymanIcon />,
  'HVAC Services': <AcUnitIcon />,
  'Appliance Repair': <BuildIcon />,
  'Roof Repair': <RoofingIcon />,
  'Gutter Cleaning & Repair': <WaterDamageIcon />,
  'Waterproofing': <WaterDamageIcon />,
  'Painting & Wallpapering': <FormatPaintIcon />,
  'Window & Door Repair': <DoorSlidingIcon />,
  'Flooring Installation & Repair': <FlooringIcon />,
  'Garage Door Repair': <GarageIcon />,
  'House Cleaning': <CleaningServicesIcon />,
  'Window Cleaning': <WindowIcon />,
  'Carpet Cleaning': <WeekendIcon />,
  'Upholstery Cleaning': <WeekendIcon />,
  'Pest Control': <PestControlIcon />,
  'Gardening & Landscaping': <GrassIcon />,
  'Pool Cleaning & Maintenance': <PoolIcon />,
  'Interior Design': <DesignServicesIcon />,
  'Home Security Installation': <SecurityIcon />,
  'Smart Home Services': <SmartToyIcon />,
  'Moving Services': <LocalShippingIcon />,
  'Massage Therapy': <SpaIcon />,
  'Beauty Services': <FaceRetouchingNaturalIcon />,
  'Home Renovation': <HomeRepairServiceIcon />,
  'Junk Removal': <DeleteIcon />,
  'Fence Installation/Repair': <FenceIcon />,
  'Snow Removal': <AcUnitRoundedIcon />
};

export const getCategoryIcon = (categoryName) => iconsMap[categoryName] || <BuildIcon />;
