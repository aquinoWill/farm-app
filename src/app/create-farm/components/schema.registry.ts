import { string, number, boolean, array, object } from "yup";

export const SchemaRegistryFarm = object().shape({
  id: string().required('The farm id is required'),
  farmName: string(),
  landArea: number().required('The land area is required'),
  landUnit: string().required('The land unit is required'),
  address: string(),
  cropProductions: array().of(
    object().shape({
      cropTypeId: number().min(1, 'The crop type is required').required(),
      isIrrigated: boolean(),
      isInsured: boolean(),
    })
  ).required(),
});
