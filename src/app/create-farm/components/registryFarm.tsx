"use client";

import { useState, useEffect } from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  useFieldArray,
} from "react-hook-form";
import { SchemaRegistryFarm } from "./schema.registry";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAlerts } from "@/context";
import { useFetchCreateFarms, useFetchCrops, type CropTypes } from "@/hooks";

import {
  Box,
  Button,
  Select,
  Checkbox,
  MenuItem,
  FormLabel,
  TextField,
  InputLabel,
  FormControl,
  FormHelperText,
  FormControlLabel,
} from "@mui/material";
import Grid from '@mui/material/Grid2';

type FormTypes = {
  id: string;
  farmName?: string | undefined;
  landArea: number;
  landUnit: string;
  address?: string | undefined;
  cropProductions: {
    cropTypeId: number;
    isIrrigated?: boolean
    isInsured?: boolean;
  }[];
};

export const RegistryFarm = () => {
  const { showAlert } = useAlerts();
  const [dataCrops, setDataCrops] = useState<CropTypes[]>([]);
  const { crops } = useFetchCrops();
  const { mutate, isSuccess } = useFetchCreateFarms();

  useEffect(() => {
    setDataCrops(crops);
    if (isSuccess) {
      showAlert('Farm registered successfully', 'success');
      reset();
    }
  }, [crops, isSuccess]);

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      farmName: "",
      landArea: 0,
      landUnit: "",
      address: "",
      cropProductions: [
        { cropTypeId: 0, isIrrigated: false, isInsured: false },
      ],
    },
    resolver: yupResolver(SchemaRegistryFarm),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "cropProductions",
  });

  const onSubmit: SubmitHandler<FormTypes> = (data) => {
    mutate(data);
  };

  return (
    <Box sx={{ mb: 4 }} component={"section"}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid size={6}>
            <Controller
              name="id"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Farm Id"
                  helperText={errors.id?.message}
                  error={Boolean(errors.id)}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid size={6}>
            <Controller
              name="farmName"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Farm Name"
                  helperText={errors.farmName?.message}
                  error={Boolean(errors.farmName)}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid size={6}>
          <Controller
            name="landArea"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Land Area"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                helperText={errors.landArea?.message}
                error={Boolean(errors.landArea)}
                {...field}
              />
            )}
          />
          </Grid>
          <Grid size={6}>
            <Controller
              name="landUnit"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Land Unit"
                  helperText={errors.landUnit?.message}
                  error={Boolean(errors.landUnit)}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid size={6}>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Address"
                  helperText={errors.address?.message}
                  error={Boolean(errors.address)}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid size={12}>
            {fields.map((field, index) => (
              <Box key={index} sx={{ maxWidth: 345 }}>
                <FormControl fullWidth>
                  <InputLabel id={`cropProductions.${index}.cropTypeId`}>
                    Crops
                  </InputLabel>
                  <Controller
                    control={control}
                    name={`cropProductions.${index}.cropTypeId`}
                    render={({ field }) => (
                      <Select
                        label="Crops"
                        labelId={`cropProductions.${index}.cropTypeId`}
                        id={`cropProductions.${index}.cropTypeId`}
                        sx={{ width: "100%" }}
                        {...field}
                        {...register(`cropProductions.${index}.cropTypeId`)}
                      >
                        {dataCrops?.map((crop: CropTypes) => (
                          <MenuItem key={crop.id} value={crop.id}>
                            {crop.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {
                  errors.cropProductions && errors.cropProductions[index] && (
                    <FormHelperText error>
                      {errors.cropProductions[index].cropTypeId?.message}
                    </FormHelperText>
                  )}
                </FormControl>
                <Box sx={{ display: "flex", gap: 2, flexDirection: "row" }}>
                  <FormControl fullWidth>
                    <FormControlLabel
                      label="Irriagated"
                      control={
                        <Controller
                          name={`cropProductions.${index}.isIrrigated`}
                          control={control}
                          render={({ field }) => (
                            <Checkbox {...field} checked={field.value} />
                          )}
                        />
                      }
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <FormControlLabel
                      label="Insured"
                      control={
                        <Controller
                          name={`cropProductions.${index}.isInsured`}
                          control={control}
                          render={({ field }) => (
                            <Checkbox {...field} checked={field.value} />
                          )}
                        />
                      }
                    />
                  </FormControl>
                </Box>

                <Button
                  size="small"
                  onClick={() =>
                    append({
                      cropTypeId: index,
                      isIrrigated: false,
                      isInsured: false,
                    })
                  }
                >
                  ADD
                </Button>
                {index !== 0 && (
                  <Button size="small" onClick={() => remove(index)}>
                    Remover
                  </Button>
                )}
              </Box>
            ))}
          </Grid>
        </Grid>
        <Button type="submit">Submit</Button>
        </form>
      </FormControl>
    </Box>
  );
};

export default RegistryFarm;
