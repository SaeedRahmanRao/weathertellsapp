'use client';

import React from 'react';
import { AirPollutionResponse } from '@/types/weather';
import { Cloud } from 'lucide-react';
import { Label, Pie, PieChart, ResponsiveContainer, Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/chart';

interface AirPollutionChartProps {
  data: AirPollutionResponse;
}

const chartConfig = {
  co: {
    label: 'CO',
    color: 'hsl(var(--chart-1))',
  },
  no2: {
    label: 'NO₂',
    color: 'hsl(var(--chart-2))',
  },
  o3: {
    label: 'O₃',
    color: 'hsl(var(--chart-3))',
  },
  pm25: {
    label: 'PM2.5',
    color: 'hsl(var(--chart-4))',
  },
  pm10: {
    label: 'PM10',
    color: 'hsl(var(--chart-5))',
  },
  so2: {
    label: 'SO₂',
    color: 'hsl(var(--chart-6))',
  },
} satisfies ChartConfig;

const getAQIDescription = (aqi: number) => {
  switch (aqi) {
    case 1:
      return 'Good';
    case 2:
      return 'Fair';
    case 3:
      return 'Moderate';
    case 4:
      return 'Poor';
    case 5:
      return 'Very Poor';
    default:
      return 'Unknown';
  }
};

const AirPollutionChart: React.FC<AirPollutionChartProps> = ({ data }) => {
  const latestData = data.list[0];
  const { components } = latestData;

  const chartData = [
    { name: 'CO', value: components.co, fill: 'var(--color-co)' },
    { name: 'NO₂', value: components.no2, fill: 'var(--color-no2)' },
    { name: 'O₃', value: components.o3, fill: 'var(--color-o3)' },
    { name: 'PM2.5', value: components.pm2_5, fill: 'var(--color-pm25)' },
    { name: 'PM10', value: components.pm10, fill: 'var(--color-pm10)' },
    { name: 'SO₂', value: components.so2, fill: 'var(--color-so2)' },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-4 w-4" />
          Air Pollution
        </CardTitle>
        <CardDescription>
          Air Quality Index (AQI): {getAQIDescription(latestData.main.aqi)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="mx-auto h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center gap-y-2 gap-x-4">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-muted-foreground">
                {item.name}: {item.value.toFixed(2)} μg/m³
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AirPollutionChart;
