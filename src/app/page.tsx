import { Container, Box } from "@mui/material";
import { InputSearch, ListFarms } from "@/components";
import { FarmsProvider } from "@/context";

export default function Home() {
  return (
    <Container maxWidth="xl" sx={{ mt: 4 }} component={"section"}>
      <Container maxWidth="xl" sx={{ mt: 4 }} component={"div"}>
        <FarmsProvider>
          <Box sx={{ my: 4 }} component={"div"}>
            <InputSearch />
          </Box>
          <Box
            component={"div"}
            sx={{
              my: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ListFarms />
          </Box>
        </FarmsProvider>
      </Container>
    </Container>
  );
}
