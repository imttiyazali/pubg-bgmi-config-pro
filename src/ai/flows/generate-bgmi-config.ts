'use server';

/**
 * @fileOverview A BGMI configuration generator AI agent.
 *
 * - generateBgmiConfig - A function that generates a BGMI configuration.
 * - GenerateBgmiConfigInput - The input type for the generateBgmiConfig function.
 * - GenerateBgmiConfigOutput - The return type for the generateBgmiConfig function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBgmiConfigInputSchema = z.object({
  deviceSpecifications: z
    .string()
    .describe('The device specifications, including CPU, GPU, and RAM.'),
  gameSettingsPreferences: z
    .string()
    .describe(
      'The preferred game settings, including graphics quality, frame rate, and resolution.'
    ),
  desiredFeatures: z
    .array(z.string())
    .describe(
      'The desired features, such as aim assist, aimbot, no recoil, FPS unlock, enemy location, bullet tracker, auto aim.'
    ),
});

export type GenerateBgmiConfigInput = z.infer<typeof GenerateBgmiConfigInputSchema>;

const GenerateBgmiConfigOutputSchema = z.object({
  configurationFileContent: z
    .string()
    .describe('The content of the generated BGMI configuration file.'),
  installationInstructions: z
    .string()
    .describe('Instructions on how to install the generated configuration file.'),
});

export type GenerateBgmiConfigOutput = z.infer<typeof GenerateBgmiConfigOutputSchema>;

export async function generateBgmiConfig(
  input: GenerateBgmiConfigInput
): Promise<GenerateBgmiConfigOutput> {
  return generateBgmiConfigFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBgmiConfigPrompt',
  input: {schema: GenerateBgmiConfigInputSchema},
  output: {schema: GenerateBgmiConfigOutputSchema},
  prompt: `You are an expert BGMI (Battlegrounds Mobile India) configuration file generator. You optimize the game's performance based on the user's device specifications, game settings preferences and desired features.

Device Specifications: {{{deviceSpecifications}}}
Game Settings Preferences: {{{gameSettingsPreferences}}}
Desired Features: {{#each desiredFeatures}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Based on the information above, generate an optimized BGMI configuration file. Also, provide clear and concise instructions on how to install the generated configuration file into the BGMI folder.

Ensure the configuration is tailored to the device specifications and game settings preferences, while incorporating the desired features to enhance the user's gaming experience.
`,
});

const generateBgmiConfigFlow = ai.defineFlow(
  {
    name: 'generateBgmiConfigFlow',
    inputSchema: GenerateBgmiConfigInputSchema,
    outputSchema: GenerateBgmiConfigOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
