
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChartBarIcon, ChartPieIcon, SquareCode } from 'lucide-react';

export type ChartType = 'bar-vertical' | 'bar-horizontal' | 'pie' | 'canvas';

interface ChartSelectorProps {
  onSelect: (chartType: ChartType) => void;
}

interface ChartOption {
  type: ChartType;
  title: string;
  icon: React.ReactNode;
  description: string;
}

const ChartSelector: React.FC<ChartSelectorProps> = ({ onSelect }) => {
  const chartOptions: ChartOption[] = [
    {
      type: 'bar-vertical',
      title: 'Gráfico de Barras Vertical',
      icon: <ChartBarIcon className="h-12 w-12 text-chartBlue" />,
      description: 'Ideal para comparar valores entre categorías'
    },
    {
      type: 'bar-horizontal',
      title: 'Gráfico de Barras Horizontal',
      icon: <ChartBarIcon className="h-12 w-12 rotate-90 text-chartGreen" />,
      description: 'Perfecto para etiquetas largas y comparaciones'
    },
    {
      type: 'pie',
      title: 'Gráfico Circular',
      icon: <ChartPieIcon className="h-12 w-12 text-chartOrange" />,
      description: 'Muestra proporciones y porcentajes de un total'
    },
    {
      type: 'canvas',
      title: 'Lienzo Personalizado',
      icon: <SquareCode className="h-12 w-12 text-chartPurple" />,
      description: 'Crea visualizaciones personalizadas'
    }
  ];

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Selecciona un Tipo de Gráfico</h1>
      <div className="chart-grid">
        {chartOptions.map((option) => (
          <Card 
            key={option.type} 
            className="chart-card flex flex-col"
            onClick={() => onSelect(option.type)}
          >
            <CardContent className="flex-1 flex flex-col items-center justify-center pt-6 pb-4">
              {option.icon}
              <h2 className="text-xl font-semibold mt-4">{option.title}</h2>
            </CardContent>
            <CardFooter className="text-center text-muted-foreground">
              {option.description}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChartSelector;
