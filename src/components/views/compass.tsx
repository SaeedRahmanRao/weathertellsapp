import React from 'react';
import { CurrentWeatherResponse } from '@/types/weather';
import { Compass as CompassIcon, Wind } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import WindPressureGraph from './wind-pressure-graph';

interface CompassProps {
  currentWeather: CurrentWeatherResponse;
  unit: 'metric' | 'imperial';
}

const Compass: React.FC<CompassProps> = ({ currentWeather, unit }) => {
  const getWindDirection = (deg: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(deg / 45) % 8];
  };

  return (
    <Card className="w-full h-full lg:col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CompassIcon className="h-4 w-4" /> Wind Details
        </CardTitle>
        <CardDescription>
          Current wind direction, speed, and gusts
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row items-center justify-between gap-4 w-full">
        <div className="flex flex-col items-center w-1/3">
          <div className="relative">
            <CompassIcon
              className="h-24 w-24 text-blue-500"
              style={{ transform: `rotate(${currentWeather.wind.deg}deg)` }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-2 w-2 bg-red-500 rounded-full"></div>
            </div>
          </div>
          <p className="mt-2 text-lg font-semibold">
            {getWindDirection(currentWeather.wind.deg)} ({currentWeather.wind.deg}°)
          </p>
        </div>
        <div className="flex flex-col items-center w-1/3">
          <p className="text-sm text-muted-foreground">
            {Math.round(currentWeather.wind.speed)} {unit === 'metric' ? 'km/h' : 'mph'}
          </p>
          {currentWeather.wind.gust && (
            <p className="text-sm text-muted-foreground">
              Gusts: {Math.round(currentWeather.wind.gust)} {unit === 'metric' ? 'km/h' : 'mph'}
            </p>
          )}
          <div className="flex items-center mt-4">
            <Wind className="h-6 w-6 mr-2 text-blue-500" />
            <div className="flex flex-col items-center">
              <p className="text-sm">Wind Speed</p>
              <div className="relative w-24 h-2 bg-gray-200 rounded-full">
                <div
                  className="absolute top-0 left-0 h-2 bg-blue-500 rounded-full"
                  style={{ width: `${(currentWeather.wind.speed / 100) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <WindPressureGraph windData={currentWeather.wind} /> {/* Place the WindPressureGraph on the right side */}
        </div>
      </CardContent>
    </Card>
  );
};

export default Compass;
