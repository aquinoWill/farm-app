export type RegistryFormTypes = {
  id: string;
  farmName?: string;
  landArea: number;
  landUnit: string;
  address?: string;
  cropProductions: { cropTypeId: number; isIrrigated?: boolean }[];
};

export type CropTypes = {
  id: string;
  name: string;
}
