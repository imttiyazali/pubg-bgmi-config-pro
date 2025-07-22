'use server';

/**
 * @fileOverview A BGMI/PUBG configuration generator AI agent.
 *
 * - generateGameConfig - A function that generates a game configuration.
 * - GenerateGameConfigInput - The input type for the generateGameConfig function.
 * - GenerateGameConfigOutput - The return type for the generateGameConfig function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateGameConfigInputSchema = z.object({
  game: z.enum(['BGMI', 'PUBG']).describe('The game to generate the config for.'),
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

export type GenerateGameConfigInput = z.infer<typeof GenerateGameConfigInputSchema>;

const GenerateGameConfigOutputSchema = z.object({
  configurationFileContent: z
    .string()
    .describe('The content of the generated BGMI configuration file.'),
  installationInstructions: z
    .string()
    .describe('Instructions on how to install the generated configuration file.'),
});

export type GenerateGameConfigOutput = z.infer<typeof GenerateGameConfigOutputSchema>;

export async function generateGameConfig(
  input: GenerateGameConfigInput
): Promise<GenerateGameConfigOutput> {
  return generateGameConfigFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateGameConfigPrompt',
  input: {schema: GenerateGameConfigInputSchema},
  output: {schema: GenerateGameConfigOutputSchema},
  prompt: `You are an expert game configuration file generator. You optimize game performance based on the user's selected game, device specifications, game settings preferences and desired features.

Game: {{{game}}}
Device Specifications: {{{deviceSpecifications}}}
Game Settings Preferences: {{{gameSettingsPreferences}}}
Desired Features: {{#each desiredFeatures}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Based on the information above, generate an optimized configuration file for the selected game ({{game}}). Also, provide clear and concise instructions on how to install the generated configuration file into the game's folder.

Ensure the configuration is tailored to the device specifications and game settings preferences, while incorporating the desired features to enhance the user's gaming experience.
`,
});

const generateGameConfigFlow = ai.defineFlow(
  {
    name: 'generateGameConfigFlow',
    inputSchema: GenerateGameConfigInputSchema,
    outputSchema: GenerateGameConfigOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
