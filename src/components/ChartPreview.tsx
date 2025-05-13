
import React from 'react';
import { Card } from "@/components/ui/card";
import { ChartType } from './ChartSelector';
import { ChartConfig } from './ConfigurationPanel';
import { 
  BarChart, Bar, PieChart, Pie, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  Cell, ResponsiveContainer, Area, AreaChart 
} from 'recharts';

interface ChartPreviewProps {
  chartType: ChartType;
  config: ChartConfig;
}

const ChartPreview: React.FC<ChartPreviewProps> = ({ chartType, config }) => {
  // Transformar datos para Recharts
  const chartData = config.data.map(item => ({
    name: item.label,
    value: item.value,
    color: item.color
  }));

  // Propiedades comunes de gráficos
  const commonProps = {
    animate: config.animate,
    labelSize: config.labelSize,
    valueSize: config.valueSize
  };

  // Renderizar el gráfico apropiado
  const renderChart = () => {
    switch (chartType) {
      case 'bar-vertical':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end"
                height={70} 
                tick={{ fontSize: config.labelSize }} 
              />
              <YAxis tick={{ fontSize: config.labelSize }} />
              {config.showLegend && <Legend wrapperStyle={{ fontSize: config.labelSize }} />}
              <Tooltip />
              <Bar dataKey="value" isAnimationActive={config.animate}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );

      case 'bar-horizontal':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              layout="vertical" 
              data={chartData} 
              margin={{ top: 20, right: 30, left: 60, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <YAxis 
                dataKey="name" 
                type="category"
                width={100} 
                tick={{ fontSize: config.labelSize }}
              />
              <XAxis type="number" tick={{ fontSize: config.labelSize }} />
              {config.showLegend && <Legend wrapperStyle={{ fontSize: config.labelSize }} />}
              <Tooltip />
              <Bar dataKey="value" isAnimationActive={config.animate}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                isAnimationActive={config.animate}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              {config.showLegend && <Legend wrapperStyle={{ fontSize: config.labelSize }} />}
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'canvas':
        // Para Canvas, mostramos una combinación de gráficos para demostración
        return (
          <ResponsiveContainer width="100%" height="100%">
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: config.labelSize - 2 }} />
                    <YAxis tick={{ fontSize: config.labelSize - 2 }} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#8884d8" 
                      isAnimationActive={config.animate}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: config.labelSize - 2 }} />
                    <YAxis tick={{ fontSize: config.labelSize - 2 }} />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      fill="#8884d8" 
                      stroke="#8884d8"
                      isAnimationActive={config.animate}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </ResponsiveContainer>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p>Tipo de gráfico no soportado</p>
          </div>
        );
    }
  };

  return (
    <Card className="p-4 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-2">{config.title || 'Vista previa'}</h2>
      <div 
        className="chart-preview flex-1" 
        style={{ backgroundColor: config.bgColor }}
      >
        {renderChart()}
      </div>
    </Card>
  );
};

export default ChartPreview;
