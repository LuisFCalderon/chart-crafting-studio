
import React, { useState } from 'react';
import ChartSelector, { ChartType } from '@/components/ChartSelector';
import ConfigurationPanel, { ChartConfig } from '@/components/ConfigurationPanel';
import ChartPreview from '@/components/ChartPreview';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Index = () => {
  const [selectedChartType, setSelectedChartType] = useState<ChartType | null>(null);
  const [savedConfigs, setSavedConfigs] = useState<Record<ChartType, ChartConfig>>({} as Record<ChartType, ChartConfig>);

  // Configuración predeterminada para cada tipo de gráfico
  const getDefaultConfig = (chartType: ChartType): ChartConfig => {
    const baseConfig: ChartConfig = {
      title: '',
      showLegend: true,
      bgColor: '#ffffff',
      animate: true,
      labelSize: 12,
      valueSize: 14,
      data: []
    };

    switch (chartType) {
      case 'bar-vertical':
        return {
          ...baseConfig,
          title: 'Gráfico de Barras Vertical',
          data: [
            { label: 'Categoría A', value: 30, color: '#3b82f6' },
            { label: 'Categoría B', value: 45, color: '#10b981' },
            { label: 'Categoría C', value: 15, color: '#f97316' },
            { label: 'Categoría D', value: 25, color: '#8b5cf6' }
          ]
        };
      case 'bar-horizontal':
        return {
          ...baseConfig,
          title: 'Gráfico de Barras Horizontal',
          data: [
            { label: 'Categoría A', value: 30, color: '#10b981' },
            { label: 'Categoría B', value: 45, color: '#3b82f6' },
            { label: 'Categoría C', value: 15, color: '#f97316' },
            { label: 'Categoría D', value: 25, color: '#8b5cf6' }
          ]
        };
      case 'pie':
        return {
          ...baseConfig,
          title: 'Gráfico Circular',
          data: [
            { label: 'Categoría A', value: 30, color: '#3b82f6' },
            { label: 'Categoría B', value: 45, color: '#10b981' },
            { label: 'Categoría C', value: 15, color: '#f97316' },
            { label: 'Categoría D', value: 10, color: '#8b5cf6' }
          ]
        };
      case 'canvas':
        return {
          ...baseConfig,
          title: 'Lienzo Personalizado',
          data: [
            { label: 'Ene', value: 30, color: '#3b82f6' },
            { label: 'Feb', value: 40, color: '#10b981' },
            { label: 'Mar', value: 20, color: '#f97316' },
            { label: 'Abr', value: 35, color: '#8b5cf6' },
            { label: 'May', value: 50, color: '#ec4899' },
            { label: 'Jun', value: 25, color: '#6366f1' }
          ]
        };
      default:
        return baseConfig;
    }
  };

  // Obtener la configuración actual para el tipo de gráfico seleccionado
  const getCurrentConfig = (chartType: ChartType): ChartConfig => {
    return savedConfigs[chartType] || getDefaultConfig(chartType);
  };

  // Manejar la selección de un tipo de gráfico
  const handleChartTypeSelect = (chartType: ChartType) => {
    setSelectedChartType(chartType);
  };

  // Manejar cambios en la configuración
  const handleConfigChange = (config: ChartConfig) => {
    if (selectedChartType) {
      setSavedConfigs({
        ...savedConfigs,
        [selectedChartType]: config
      });
    }
  };

  // Manejar el guardado de la configuración
  const handleSaveConfig = () => {
    console.log('Configuración guardada:', selectedChartType, savedConfigs[selectedChartType!]);
    // Aquí podrías implementar la lógica para guardar en localStorage o en una API
  };

  // Volver a la selección de tipo de gráfico
  const handleBackToSelection = () => {
    setSelectedChartType(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {!selectedChartType ? (
        // Vista de selección de tipo de gráfico
        <ChartSelector onSelect={handleChartTypeSelect} />
      ) : (
        // Vista de configuración y previsualización
        <div className="container py-6">
          <Button 
            variant="ghost" 
            className="mb-6 flex items-center" 
            onClick={handleBackToSelection}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a la selección
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ConfigurationPanel 
              chartType={selectedChartType}
              config={getCurrentConfig(selectedChartType)}
              onConfigChange={handleConfigChange}
              onSave={handleSaveConfig}
            />
            
            <div className="h-[700px]">
              <ChartPreview 
                chartType={selectedChartType}
                config={getCurrentConfig(selectedChartType)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
