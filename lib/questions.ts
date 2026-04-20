import { GeneralPreparednessInput, FoodStorageInput, StapleItem } from "./types";

export type QuestionType = "number" | "select" | "radio";

export interface NumberQuestion {
  id: string;
  label: string;
  type: "number";
  min: number;
  max: number;
  options?: undefined;
  labels?: undefined;
}

export interface SelectQuestion {
  id: string;
  label: string;
  type: "select";
  options: string[];
  min?: undefined;
  max?: undefined;
  labels?: undefined;
}

export interface RadioQuestion {
  id: string;
  label: string;
  type: "radio";
  options: string[];
  labels?: Record<string, string>;
  min?: undefined;
  max?: undefined;
}

export type QuestionItem = NumberQuestion | SelectQuestion | RadioQuestion;

export interface QuestionGroup {
  title: string;
  items: QuestionItem[];
}

export const preparednessQuestionGroups: QuestionGroup[] = [
  {
    title: "Household details",
    items: [
      { id: "householdSize", label: "Household size", type: "number", min: 1, max: 12 },
      { id: "adults", label: "Number of adults", type: "number", min: 0, max: 10 },
      { id: "children", label: "Number of children", type: "number", min: 0, max: 10 },
      { id: "elderly", label: "Number of elderly household members", type: "number", min: 0, max: 6 },
      { id: "pets", label: "Number of pets", type: "number", min: 0, max: 10 },
      {
        id: "housingType",
        label: "Housing type",
        type: "select",
        options: ["Apartment", "Neighborhood home", "Rural property", "Mobile home"],
      },
      {
        id: "tenure",
        label: "Rent or own",
        type: "select",
        options: ["Own", "Rent"],
      },
    ],
  },
  {
    title: "Plans, contacts, and documents",
    items: [
      {
        id: "transportation",
        label: "Transportation availability for emergencies",
        type: "radio",
        options: ["no", "partial", "yes"],
        labels: { no: "None", partial: "Limited", yes: "Reliable" },
      },
      {
        id: "evacuationOptions",
        label: "Know evacuation options or shelter-in-place choices",
        type: "radio",
        options: ["no", "partial", "yes"],
      },
      {
        id: "communicationPlan",
        label: "Household communication plan",
        type: "radio",
        options: ["no", "partial", "yes"],
      },
      {
        id: "emergencyContacts",
        label: "Emergency contact information organized",
        type: "radio",
        options: ["no", "partial", "yes"],
      },
      {
        id: "documentsReady",
        label: "Important documents ready and protected",
        type: "radio",
        options: ["no", "partial", "yes"],
      },
    ],
  },
  {
    title: "Supplies and safety",
    items: [
      {
        id: "backupPower",
        label: "Backup power or reliable lighting",
        type: "radio",
        options: ["no", "partial", "yes"],
      },
      {
        id: "firstAidReady",
        label: "First aid kit and emergency supplies ready",
        type: "radio",
        options: ["no", "partial", "yes"],
      },
      {
        id: "medsReady",
        label: "Prescription and medical needs prepared",
        type: "radio",
        options: ["no", "partial", "yes"],
      },
      {
        id: "waterStorage",
        label: "Water storage for the household",
        type: "select",
        options: ["None", "3 days", "1 week", "2 weeks or more"],
      },
      {
        id: "sanitationSupplies",
        label: "Sanitation and hygiene supplies on hand",
        type: "radio",
        options: ["no", "partial", "yes"],
        labels: { no: "No", partial: "Partial", yes: "Yes" },
      },
      {
        id: "hygieneSupplies",
        label: "Hygiene supplies for the family",
        type: "radio",
        options: ["no", "partial", "yes"],
      },
      {
        id: "goBagReady",
        label: "Go-bag or 72-hour kit ready",
        type: "radio",
        options: ["no", "partial", "yes"],
      },
      {
        id: "homeSafetySupplies",
        label: "Home safety tools and supplies available",
        type: "radio",
        options: ["no", "partial", "yes"],
      },
      {
        id: "smokeFireSafety",
        label: "Smoke, fire, and CO safety measures in place",
        type: "radio",
        options: ["no", "partial", "yes"],
      },
      {
        id: "seasonalPreparedness",
        label: "Seasonal readiness for winter and extreme temperatures",
        type: "radio",
        options: ["no", "partial", "yes"],
      },
      {
        id: "supportNetwork",
        label: "Neighborhood or ward support network readiness",
        type: "radio",
        options: ["no", "partial", "yes"],
      },
    ],
  },
  {
    title: "Local hazard awareness",
    items: [
      {
        id: "wildfireReadiness",
        label: "Wildfire smoke and evacuation readiness",
        type: "radio",
        options: ["no", "partial", "yes"],
      },
      {
        id: "floodAwareness",
        label: "Flood awareness and shelter options",
        type: "radio",
        options: ["no", "partial", "yes"],
      },
      {
        id: "winterStormReadiness",
        label: "Winter driving and outage readiness",
        type: "radio",
        options: ["no", "partial", "yes"],
      },
      {
        id: "earthquakeReadiness",
        label: "Earthquake basics and heavy furniture secured",
        type: "radio",
        options: ["no", "partial", "yes"],
      },
      {
        id: "hazmatReadiness",
        label: "Hazardous materials shelter-in-place readiness",
        type: "radio",
        options: ["no", "partial", "yes"],
      },
      {
        id: "droughtHeatResilience",
        label: "Drought and heat resilience readiness",
        type: "radio",
        options: ["no", "partial", "yes"],
      },
      {
        id: "evacuateShelter",
        label: "Know when to evacuate versus shelter in place",
        type: "radio",
        options: ["no", "partial", "yes"],
      },
    ],
  },
];

export const stapleItems: StapleItem[] = [
  { label: "Wheat", count: 0 },
  { label: "White rice", count: 0 },
  { label: "Dry beans", count: 0 },
  { label: "Oats", count: 0 },
  { label: "Pasta", count: 0 },
  { label: "Potato flakes or shelf-stable potato products", count: 0 },
  { label: "Dry milk", count: 0 },
  { label: "Sugar", count: 0 },
  { label: "Salt", count: 0 },
  { label: "Cooking essentials", count: 0 },
];

export const foodStorageQuestionGroups: QuestionGroup[] = [
  {
    title: "Food supply basics",
    items: [
      { id: "householdSize", label: "Household size", type: "number", min: 1, max: 12 },
      { id: "daysNormalFood", label: "Days of normal food on hand", type: "number", min: 0, max: 90 },
      {
        id: "has1Week",
        label: "Has a 1-week supply of foods normally eaten",
        type: "radio",
        options: ["no", "partial", "yes"],
      },
      {
        id: "has1Month",
        label: "Has a 1-month supply of foods normally eaten",
        type: "radio",
        options: ["no", "partial", "yes"],
      },
      {
        id: "has3Month",
        label: "Has a 3-month supply of foods normally eaten",
        type: "radio",
        options: ["no", "partial", "yes"],
      },
    ],
  },
  {
    title: "Water and practical readiness",
    items: [
      { id: "waterGallonsPerPerson", label: "Gallons of water stored per person", type: "number", min: 0, max: 20 },
      {
        id: "rotatesFood",
        label: "Rotate food storage so older items are used first",
        type: "radio",
        options: ["no", "partial", "yes"],
      },
      {
        id: "storageConditions",
        label: "Storage conditions are cool, dry, and organized",
        type: "radio",
        options: ["no", "partial", "yes"],
      },
      {
        id: "cookingCapability",
        label: "Can cook during outages with stored food",
        type: "radio",
        options: ["no", "partial", "yes"],
      },
      {
        id: "specialDiet",
        label: "Consider infant, medical, allergy, or special diet needs",
        type: "radio",
        options: ["no", "partial", "yes"],
      },
      {
        id: "financialReserve",
        label: "Financial reserve saved for emergency food and supplies",
        type: "radio",
        options: ["no", "partial", "yes"],
      },
    ],
  },
  {
    title: "Longer-term staples",
    items: stapleItems.map((item) => ({
      id: item.label,
      label: item.label,
      type: "number",
      min: 0,
      max: 40,
    })),
  },
];

export const defaultPreparednessInput: GeneralPreparednessInput = {
  householdSize: 4,
  adults: 2,
  children: 2,
  elderly: 0,
  medicalNeeds: "partial",
  pets: 0,
  housingType: "Neighborhood home",
  tenure: "Own",
  transportation: "partial",
  evacuationOptions: "partial",
  communicationPlan: "partial",
  emergencyContacts: "partial",
  documentsReady: "partial",
  backupPower: "partial",
  firstAidReady: "partial",
  medsReady: "partial",
  waterStorage: "3 days",
  sanitationSupplies: "partial",
  hygieneSupplies: "partial",
  goBagReady: "partial",
  homeSafetySupplies: "partial",
  smokeFireSafety: "partial",
  seasonalPreparedness: "partial",
  supportNetwork: "partial",
  wildfireReadiness: "partial",
  floodAwareness: "partial",
  winterStormReadiness: "partial",
  earthquakeReadiness: "partial",
  hazmatReadiness: "partial",
  droughtHeatResilience: "partial",
  evacuateShelter: "partial",
};

export const defaultFoodStorageInput: FoodStorageInput = {
  householdSize: 4,
  daysNormalFood: 7,
  has1Week: "partial",
  has1Month: "no",
  has3Month: "no",
  waterGallonsPerPerson: 2,
  rotatesFood: "partial",
  storageConditions: "partial",
  cookingCapability: "partial",
  specialDiet: "partial",
  financialReserve: "partial",
  longerTermStaples: stapleItems.reduce((carry, item) => ({ ...carry, [item.label]: 0 }), {}),
};
