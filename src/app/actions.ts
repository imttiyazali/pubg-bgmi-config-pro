'use server';
import { generateGameConfig, GenerateGameConfigInput, GenerateGameConfigOutput } from '@/ai/flows/generate-game-config';

export async function createConfig(input: GenerateGameConfigInput): Promise<GenerateGameConfigOutput> {
  try {
    const result = await generateGameConfig(input);
    return result;
  } catch (error) {
    console.error("Error generating game config:", error);
    throw new Error("Failed to generate configuration. Please try again.");
  }
}
