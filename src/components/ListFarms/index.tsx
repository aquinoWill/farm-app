"use client";

import { useEffect, useState } from "react";
import { Box, Pagination } from "@mui/material";
import { FarmCards, Loading } from "@/components";
import { useFarms, useAlerts } from "@/context";
import { useFetchFarms, useFetchDeleteFarms } from "@/hooks";

export function ListFarms() {
  const [page, setPage] = useState(1);
  const { showAlert } = useAlerts();
  const { farms, setFarms, filterFarms } = useFarms();
  const { dataFarms, isLoading } = useFetchFarms();
  const { mutate, isSuccess } = useFetchDeleteFarms();

  useEffect(() => {
    setFarms(dataFarms);
    if (isSuccess) {
      showAlert('Farm deleted successfully', 'success');
    }
  }, [dataFarms, setFarms]);

  const MAX_ITEM = 10;
  const MAX_PAGE = Math.ceil(farms?.length / 10);
  const filterData = filterFarms?.length > 0 ? filterFarms : farms;

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleDeleteFarm = async (farmId: string) => {
    await mutate(farmId);
  };

  return (
    <Box
      sx={{
        my: 4,
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {isLoading && <Loading />}
      <Box sx={{ my: 2, gap: 2, display: "flex", flexWrap: "wrap" }}>
        {filterData
          ?.map((item) => (
            <FarmCards
              key={`${item.id}-${item.farmName}`}
              farmId={item.id}
              farmName={item.farmName}
              landArea={item.landArea}
              landUnit={item.landUnit}
              address={item.address}
              deleteFarm={handleDeleteFarm}
            />
          ))
          .slice((page - 1) * MAX_ITEM, (page - 1) * MAX_ITEM + MAX_ITEM)}
      </Box>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Pagination
          page={page}
          color="primary"
          count={MAX_PAGE}
          defaultPage={farms?.length / MAX_ITEM}
          onChange={handleChangePagination}
        />
      </Box>
    </Box>
  );
}

export default ListFarms;
