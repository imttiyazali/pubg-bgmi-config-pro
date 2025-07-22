'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Wand2, Download, Copy, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { createConfig } from '@/app/actions';
import type { GenerateBgmiConfigOutput } from '@/ai/flows/generate-bgmi-config';
import { VideoInterstitial } from '@/components/video-interstitial';

const features = [
  { id: 'aim_assist', label: 'Aim Assist' },
  { id: 'aimbot', label: 'Aimbot' },
  { id: 'no_recoil', label: 'No Recoil' },
  { id: 'fps_unlock', label: 'FPS Unlock' },
  { id: 'enemy_location', label: 'Enemy Location' },
  { id: 'bullet_tracker', label: 'Bullet Tracker' },
  { id: 'auto_aim', label: 'Auto Aim' },
  { id: 'future_aim_assist_bot', label: 'Future Aim Assist Bot' },
] as const;

const formSchema = z.object({
  deviceSpecifications: z.string().min(10, { message: 'Please provide more details about your device.' }),
  gameSettingsPreferences: z.string().min(10, { message: 'Please describe your preferred settings.' }),
  desiredFeatures: z.array(z.string()).refine((value) => value.length > 0, {
    message: 'You have to select at least one feature.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function ConfigGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateBgmiConfigOutput | null>(null);
  const [generatedData, setGeneratedData] = useState<GenerateBgmiConfigOutput | null>(null);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deviceSpecifications: '',
      gameSettingsPreferences: '',
      desiredFeatures: ['Aim Assist'],
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await createConfig(data);
      setGeneratedData(response);
      setShowInterstitial(true);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'An unknown error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAdClose = () => {
    setShowInterstitial(false);
    if(generatedData) {
      setResult(generatedData);
    }
    setGeneratedData(null);
  }

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Configuration copied to clipboard.',
    });
  };

  const handleDownload = (content: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bgmi_config_pro.ini';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: 'Downloaded!',
      description: 'Configuration file has been downloaded.',
    });
  };
  
  const handleReset = () => {
    form.reset();
    setResult(null);
  }

  return (
    <>
      <VideoInterstitial open={showInterstitial} onClose={handleAdClose} />
      <Card className="w-full max-w-4xl border-primary/20 shadow-lg shadow-primary/10">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Customize Your Config</CardTitle>
          <CardDescription>
            Fill out the details below and our AI will generate the perfect BGMI config for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!result && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="deviceSpecifications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">Device Specifications</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., iPhone 15 Pro, Snapdragon 8 Gen 2, 8GB RAM"
                            className="resize-none h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gameSettingsPreferences"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">Game Settings Preferences</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Smooth graphics, 90 FPS, Colorful style"
                            className="resize-none h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="desiredFeatures"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-lg">Desired Features</FormLabel>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {features.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="desiredFeatures"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 has-[:checked]:bg-primary/10 has-[:checked]:border-primary"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.label)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...(field.value || []), item.label])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.label
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">{item.label}</FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      </div>
                      <FormMessage className="pt-2" />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center pt-4">
                  <Button type="submit" disabled={isLoading} size="lg" className="w-full max-w-xs">
                    {isLoading ? (
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Wand2 className="mr-2 h-4 w-4" />
                    )}
                    Generate Config
                  </Button>
                </div>
              </form>
            </Form>
          )}
          {result && (
            <div className="w-full">
              <Card className="border-accent/20 shadow-lg shadow-accent/10">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="font-headline text-3xl text-accent">Your Generated Config</CardTitle>
                    <Button variant="ghost" onClick={handleReset}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Start Over
                    </Button>
                  </div>
                  <CardDescription>
                    Your personalized configuration is ready. Follow the instructions to apply it.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                      <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-semibold">Configuration File Content</h3>
                          <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleCopyToClipboard(result.configurationFileContent)}>
                                  <Copy className="mr-2 h-4 w-4" />
                                  Copy
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleDownload(result.configurationFileContent)}>
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                              </Button>
                          </div>
                      </div>
                      <pre className="bg-background/50 p-4 rounded-md text-sm overflow-x-auto max-h-60 font-code">
                          <code>{result.configurationFileContent}</code>
                      </pre>
                  </div>
                  <div>
                      <h3 className="text-lg font-semibold mb-2">Installation Instructions</h3>
                      <pre className="bg-background/50 p-4 rounded-md text-sm overflow-x-auto whitespace-pre-wrap font-sans">
                        {result.installationInstructions}
                      </pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
