export type YesNoPartial = "no" | "partial" | "yes";

export type PreparednessLevel = "Starting Out" | "Building" | "Ready" | "Strong";
export type FoodStorageLevel = "Minimal" | "Basic" | "Stable" | "Well Prepared";

export interface GeneralPreparednessInput {
  householdSize: number;
  adults: number;
  children: number;
  elderly: number;
  medicalNeeds: YesNoPartial;
  pets: number;
  housingType: string;
  tenure: string;
  transportation: YesNoPartial;
  evacuationOptions: YesNoPartial;
  communicationPlan: YesNoPartial;
  emergencyContacts: YesNoPartial;
  documentsReady: YesNoPartial;
  backupPower: YesNoPartial;
  firstAidReady: YesNoPartial;
  medsReady: YesNoPartial;
  waterStorage: string;
  sanitationSupplies: YesNoPartial;
  hygieneSupplies: YesNoPartial;
  goBagReady: YesNoPartial;
  homeSafetySupplies: YesNoPartial;
  smokeFireSafety: YesNoPartial;
  seasonalPreparedness: YesNoPartial;
  supportNetwork: YesNoPartial;
  wildfireReadiness: YesNoPartial;
  floodAwareness: YesNoPartial;
  winterStormReadiness: YesNoPartial;
  earthquakeReadiness: YesNoPartial;
  hazmatReadiness: YesNoPartial;
  droughtHeatResilience: YesNoPartial;
  evacuateShelter: YesNoPartial;
}

export interface StapleItem {
  label: string;
  count: number;
}

export interface FoodStorageInput {
  householdSize: number;
  daysNormalFood: number;
  has1Week: YesNoPartial;
  has1Month: YesNoPartial;
  has3Month: YesNoPartial;
  waterGallonsPerPerson: number;
  rotatesFood: YesNoPartial;
  storageConditions: YesNoPartial;
  cookingCapability: YesNoPartial;
  specialDiet: YesNoPartial;
  financialReserve: YesNoPartial;
  longerTermStaples: Record<string, number>;
}

export interface ActionPlan {
  topPriorities: string[];
  next30Days: string[];
  next3Months: string[];
  longerTerm: string[];
}

export interface PreparednessResult {
  score: number;
  level: PreparednessLevel;
  strengths: string[];
  gaps: string[];
  actionPlan: ActionPlan;
}

export interface FoodStorageResult {
  score: number;
  level: FoodStorageLevel;
  strengths: string[];
  gaps: string[];
  actionPlan: ActionPlan;
}
