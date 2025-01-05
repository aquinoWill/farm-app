"use client";

import { useState, ChangeEvent } from "react";
import {
  Box,
  List,
  Stack,
  Tooltip,
  TextField,
  IconButton,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useFarms } from "@/context/FarmsContext";

export function InputSearch() {
  const [query, setQuery] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { farms, filterFarms, setFilterFarms } = useFarms();

  const handleFilterFarms = (query: string) => {
    const data = farms.filter((item) =>
      item.farmName.toLowerCase().includes(query.toLowerCase())
    );
    setFilterFarms(data);
  };

  const handleSearchChange = async (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const queryValue = event.target.value;
    setSearchTerm(queryValue);
    handleFilterFarms(queryValue);
  };

  const matchText = (text: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(searchTerm, "gi");
    return text.replace(regex, (match) => `${match}`);
  };

  return (
    <Box>
      <form>
        <Stack direction="row">
          <Tooltip title="Search" enterDelay={1000}>
            <div>
              <IconButton
                type="button"
                aria-label="search"
                sx={{
                  display: { xs: "inline", md: "none" },
                }}
              >
                <SearchIcon />
              </IconButton>
            </div>
          </Tooltip>
          <TextField
            fullWidth
            name="q"
            label="Search"
            variant="outlined"
            size="small"
            value={query ? query : ""}
            sx={{ display: { md: "inline-block" }, mr: 1 }}
            onChange={(event) => {
              setQuery(event.target.value);
              handleSearchChange(event);
            }}
          />
        </Stack>
      </form>
      <Box>
        {filterFarms.length > 0 && (
          <List
            sx={{
              width: "99%",
              bgcolor: "#f3efef",
              border: "1px solid #e9e7e7",
              mt: 0.2,
            }}
          >
            {filterFarms.map((item, index) => (
              <ListItemButton
                key={index}
                data-testid="farm-item"
                onClick={() => {
                  setQuery(item.farmName);
                  setSearchTerm(item.farmName);
                  handleFilterFarms(item.farmName);
                }}
              >
                <ListItemText secondary={matchText(item.farmName)} />
              </ListItemButton>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
}

export default InputSearch;
