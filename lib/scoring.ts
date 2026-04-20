import {
  ActionPlan,
  PreparednessLevel,
  FoodStorageLevel,
  PreparednessResult,
  FoodStorageResult,
  GeneralPreparednessInput,
  FoodStorageInput,
} from "./types";

const valueFromYesNoPartial = (value: string) => {
  if (value === "yes") return 1;
  if (value === "partial") return 0.66;
  return 0;
};

const waterValue = (selection: string) => {
  if (selection === "2 weeks or more") return 1;
  if (selection === "1 week") return 0.75;
  if (selection === "3 days") return 0.45;
  return 0;
};

const stapleValue = (count: number) => {
  if (count >= 12) return 1;
  if (count >= 5) return 0.7;
  if (count >= 2) return 0.35;
  return 0;
};

const clampScore = (value: number) => Math.min(100, Math.max(0, Math.round(value)));

const readinessLabel = (score: number): PreparednessLevel => {
  if (score >= 80) return "Strong";
  if (score >= 60) return "Ready";
  if (score >= 35) return "Building";
  return "Starting Out";
};

const foodLabel = (score: number): FoodStorageLevel => {
  if (score >= 80) return "Well Prepared";
  if (score >= 55) return "Stable";
  if (score >= 30) return "Basic";
  return "Minimal";
};

const makeActionPlan = (
  score: number,
  gaps: string[],
  defaultPriorities: string[],
  type: "preparedness" | "food",
): ActionPlan => {
  const topPriorities = defaultPriorities.slice(0, 3);
  const next30Days = gaps.slice(0, 3);
  const next3Months = gaps.slice(3, 6);
  const longerTerm = gaps.slice(6, 9);

  if (!next30Days.length) {
    next30Days.push(type === "preparedness" ? "Review and refresh your emergency plan with your household." : "Continue rotating and organizing your food storage." );
  }

  return {
    topPriorities,
    next30Days,
    next3Months,
    longerTerm,
  };
};

export function computePreparednessScore(input: GeneralPreparednessInput): PreparednessResult {
  const values = {
    transportation: valueFromYesNoPartial(input.transportation),
    evacuationOptions: valueFromYesNoPartial(input.evacuationOptions),
    communicationPlan: valueFromYesNoPartial(input.communicationPlan),
    emergencyContacts: valueFromYesNoPartial(input.emergencyContacts),
    documentsReady: valueFromYesNoPartial(input.documentsReady),
    backupPower: valueFromYesNoPartial(input.backupPower),
    firstAidReady: valueFromYesNoPartial(input.firstAidReady),
    medsReady: valueFromYesNoPartial(input.medsReady),
    waterStorage: waterValue(input.waterStorage),
    sanitationSupplies: valueFromYesNoPartial(input.sanitationSupplies),
    hygieneSupplies: valueFromYesNoPartial(input.hygieneSupplies),
    goBagReady: valueFromYesNoPartial(input.goBagReady),
    homeSafetySupplies: valueFromYesNoPartial(input.homeSafetySupplies),
    smokeFireSafety: valueFromYesNoPartial(input.smokeFireSafety),
    seasonalPreparedness: valueFromYesNoPartial(input.seasonalPreparedness),
    supportNetwork: valueFromYesNoPartial(input.supportNetwork),
    wildfireReadiness: valueFromYesNoPartial(input.wildfireReadiness),
    floodAwareness: valueFromYesNoPartial(input.floodAwareness),
    winterStormReadiness: valueFromYesNoPartial(input.winterStormReadiness),
    earthquakeReadiness: valueFromYesNoPartial(input.earthquakeReadiness),
    hazmatReadiness: valueFromYesNoPartial(input.hazmatReadiness),
    droughtHeatResilience: valueFromYesNoPartial(input.droughtHeatResilience),
    evacuateShelter: valueFromYesNoPartial(input.evacuateShelter),
    medicalNeeds: valueFromYesNoPartial(input.medicalNeeds),
  };

  const weights: Record<string, number> = {
    waterStorage: 14,
    communicationPlan: 10,
    emergencyContacts: 6,
    documentsReady: 4,
    medsReady: 12,
    firstAidReady: 9,
    smokeFireSafety: 10,
    evacuationOptions: 9,
    wildfireReadiness: 7,
    floodAwareness: 5,
    winterStormReadiness: 6,
    earthquakeReadiness: 6,
    hazmatReadiness: 5,
    droughtHeatResilience: 4,
    evacuateShelter: 6,
    transportation: 4,
    backupPower: 5,
    sanitationSupplies: 3,
    hygieneSupplies: 3,
    goBagReady: 5,
    homeSafetySupplies: 4,
    seasonalPreparedness: 5,
    supportNetwork: 4,
    medicalNeeds: 4,
  };

  const rawScore = Object.entries(weights).reduce((sum, [key, weight]) => {
    const value = values[key as keyof typeof values] ?? 0;
    return sum + value * weight;
  }, 0);

  const score = clampScore(rawScore);
  const level = readinessLabel(score);

  const strengths: string[] = [];
  const gaps: string[] = [];

  if (values.waterStorage >= 0.75) strengths.push("Water storage is in a strong range.");
  else gaps.push("Increase clean water storage for your household.");

  if (values.communicationPlan >= 1) strengths.push("Communication plans are well defined.");
  else gaps.push("Work on a household communication plan and emergency contact list.");

  if (values.medsReady >= 0.66) strengths.push("Medical and prescription readiness is supported.");
  else gaps.push("Keep extra critical medication and medical supplies ready.");

  if (values.smokeFireSafety >= 0.66) strengths.push("Fire/smoke safety measures are in place.");
  else gaps.push("Check smoke alarms, carbon monoxide detectors, and fire extinguishers.");

  if (values.evacuateShelter >= 0.66) strengths.push("You understand when to evacuate versus shelter in place.");
  else gaps.push("Clarify evacuation and shelter-in-place plans for local hazards.");

  if (values.earthquakeReadiness >= 0.66) strengths.push("Earthquake basics are part of your household awareness.");
  else gaps.push("Secure heavy furniture and practice drop-cover-hold.");

  if (values.wildfireReadiness >= 0.66) strengths.push("Wildfire evacuation and smoke awareness are being considered.");
  else gaps.push("Prepare a wildfire smoke and evacuation plan for your area.");

  if (values.floodAwareness >= 0.66) strengths.push("Flood awareness is included in your local hazard preparation.");
  else gaps.push("Review local flood routes and shelter choices.");

  const defaultPriorities = [
    "Confirm water, first aid, and communication plans for your household.",
    "Prepare a simple go-bag and review evacuation options.",
    "Keep medical needs and medication plans accessible.",
    "Check smoke, CO detectors, and fire readiness in your home.",
    "Review local wildfire, flood, winter, and earthquake hazards.",
  ];

  const actionPlan = makeActionPlan(score, gaps, defaultPriorities, "preparedness");

  return {
    score,
    level,
    strengths: strengths.slice(0, 5),
    gaps: gaps.slice(0, 6),
    actionPlan,
  };
}

export function computeFoodStorageScore(input: FoodStorageInput): FoodStorageResult {
  const values = {
    has1Week: valueFromYesNoPartial(input.has1Week),
    has1Month: valueFromYesNoPartial(input.has1Month),
    has3Month: valueFromYesNoPartial(input.has3Month),
    daysNormalFood: Math.min(input.daysNormalFood, 60) / 60,
    water: Math.min(1, input.waterGallonsPerPerson / 2),
    rotatesFood: valueFromYesNoPartial(input.rotatesFood),
    storageConditions: valueFromYesNoPartial(input.storageConditions),
    cookingCapability: valueFromYesNoPartial(input.cookingCapability),
    specialDiet: valueFromYesNoPartial(input.specialDiet),
    financialReserve: valueFromYesNoPartial(input.financialReserve),
  };

  const staplePoints = Object.values(input.longerTermStaples).reduce((sum, quantity) => sum + stapleValue(quantity), 0);
  const maxStaplePoints = Object.keys(input.longerTermStaples).length;
  const stapleScore = maxStaplePoints > 0 ? (staplePoints / maxStaplePoints) : 0;

  const rawScore =
    Math.round(
      values.has1Week * 24 +
      values.has1Month * 20 +
      values.has3Month * 12 +
      values.daysNormalFood * 8 +
      values.water * 15 +
      values.rotatesFood * 8 +
      values.storageConditions * 6 +
      values.cookingCapability * 4 +
      values.specialDiet * 3 +
      values.financialReserve * 5 +
      stapleScore * 15,
    );

  const score = clampScore(rawScore);
  const level = foodLabel(score);

  const strengths: string[] = [];
  const gaps: string[] = [];

  if (values.has1Week >= 0.66) strengths.push("Your 1-week food supply is developing well.");
  else gaps.push("Start building a one-week supply of foods you and your family normally eat.");

  if (values.has1Month >= 0.66) strengths.push("A one-month supply is part of your plan.");
  else gaps.push("Work toward a one-month pantry of normal meal items.");

  if (values.water >= 0.75) strengths.push("Water storage is strong for the household.");
  else gaps.push("Store more water so each person has at least one gallon per day.");

  if (values.rotatesFood >= 0.66) strengths.push("You rotate food storage regularly.");
  else gaps.push("Rotate older food into meals and record dates.");

  if (values.storageConditions >= 0.66) strengths.push("Your storage conditions are organized and protective.");
  else gaps.push("Keep food in a cool, dry, organized area.");

  if (stapleScore >= 0.5) strengths.push("Longer-term staples are beginning to support your storage plan.");
  else gaps.push("Add small, practical amounts of wheat, rice, beans, or dry milk over time.");

  if (values.cookingCapability >= 0.66) strengths.push("You have cooking options for outages.");
  else gaps.push("Keep a simple cook kit and shelf-stable meals you can prepare without power.");

  const defaultPriorities = [
    "Build toward a one-week food supply of foods your family eats.",
    "Store clean drinking water for every person in your home.",
    "Rotate older food into normal meals to keep supplies fresh.",
    "Develop a practical longer-term staple inventory of wheat, rice, beans, and dry milk.",
    "Keep emergency cooking and financial reserve habits simple and sustainable.",
  ];

  const actionPlan = makeActionPlan(score, gaps, defaultPriorities, "food");

  return {
    score,
    level,
    strengths: strengths.slice(0, 5),
    gaps: gaps.slice(0, 6),
    actionPlan,
  };
}
