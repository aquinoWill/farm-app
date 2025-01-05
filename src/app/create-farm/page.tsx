import { Box } from "@mui/material";
import RegistryFarm from "./components/registryFarm";

export default async function CreateFarm() {
  return (
    <Box sx={{ display: "flex" }} component={"section"}>
      <RegistryFarm />
    </Box>
  );
}
