import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI({apiKey: "AIzaSyAzOJV20yi-zBOD57WuTNTE4P003OG0Z8c"})]
});
