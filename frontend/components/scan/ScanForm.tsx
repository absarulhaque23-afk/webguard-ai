'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Globe, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const scanSchema = z.object({
  url: z.string().url('Please enter a valid URL (e.g., https://example.com)'),
});

type ScanFormValues = z.infer<typeof scanSchema>;

interface ScanFormProps {
  onScan: (url: string) => Promise<void>;
  isLoading: boolean;
}

export function ScanForm({ onScan, isLoading }: ScanFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ScanFormValues>({
    resolver: zodResolver(scanSchema),
  });

  const onSubmit = async (data: ScanFormValues) => {
    await onScan(data.url);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-cyan-500/20 shadow-lg shadow-cyan-500/5">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">Analyze a New URL</h2>
        <p className="text-gray-400 text-sm">Enter any suspicious web address for an instant ML-powered security analysis.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              icon={<Globe className="h-5 w-5" />}
              placeholder="https://example.com"
              className="h-12 text-lg"
              {...register('url')}
              error={errors.url?.message}
              disabled={isLoading}
            />
          </div>
          <Button 
            type="submit" 
            size="lg" 
            className="sm:w-auto w-full h-12 px-8 shrink-0"
            isLoading={isLoading}
          >
            {!isLoading && <Search className="mr-2 h-5 w-5" />}
            Scan Website
          </Button>
        </div>
      </form>
      
      <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm text-amber-200/80">
        <strong>Notice:</strong> We do not execute untrusted code. URL scanning uses static feature analysis and safe resolution techniques.
      </div>
    </Card>
  );
}
