export type RegistryFormTypes = {
  id: string;
  farmName?: string | undefined;
  landArea: number;
  landUnit: string;
  address?: string | undefined;
  cropProductions: { cropTypeId: number; isIrrigated?: boolean }[];
};

export type CropTypes = {
  id: string;
  name: string;
}
