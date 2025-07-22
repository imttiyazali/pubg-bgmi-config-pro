'use server';
import { generateBgmiConfig, GenerateBgmiConfigInput, GenerateBgmiConfigOutput } from '@/ai/flows/generate-bgmi-config';

export async function createConfig(input: GenerateBgmiConfigInput): Promise<GenerateBgmiConfigOutput> {
  try {
    const result = await generateBgmiConfig(input);
    return result;
  } catch (error) {
    console.error("Error generating BGMI config:", error);
    throw new Error("Failed to generate configuration. Please try again.");
  }
}
