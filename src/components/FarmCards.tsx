import {
  Box,
  Card,
  Button,
  Typography,
  CardContent,
  CardActions,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import CropSquareIcon from "@mui/icons-material/CropSquare";

type FarmCardsTypes = {
  farmId: string;
  farmName?: string;
  landArea: number;
  landUnit: string;
  address?: string;
  deleteFarm: (farmId: string) => void;
};

export const FarmCards = ({
  farmId,
  farmName,
  landArea,
  landUnit,
  address,
  deleteFarm,
}: FarmCardsTypes) => {
  return (
    <Card sx={{ minWidth: 220 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {farmName}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AgricultureIcon />
          <Typography variant="body2" color="text.secondary">
            {landArea}
          </Typography>

          <CropSquareIcon />
          <Typography variant="body2" color="text.secondary">
            {landUnit}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <BusinessIcon />
          <Typography variant="body2" color="text.secondary">
            {address}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          aria-label="delete"
          color="error"
          onClick={() => deleteFarm(farmId)}
        >
          Delete Farm
        </Button>
      </CardActions>
    </Card>
  );
};

export default FarmCards;
