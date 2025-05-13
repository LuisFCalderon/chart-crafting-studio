
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartType } from './ChartSelector';
import { useToast } from "@/components/ui/use-toast";

interface DataItem {
  label: string;
  value: number;
  color?: string;
}

export interface ChartConfig {
  title: string;
  showLegend: boolean;
  data: DataItem[];
  bgColor: string;
  animate: boolean;
  labelSize: number;
  valueSize: number;
}

interface ConfigurationPanelProps {
  chartType: ChartType;
  config: ChartConfig;
  onConfigChange: (config: ChartConfig) => void;
  onSave: () => void;
}

const defaultColors = [
  "#3b82f6", // chartBlue
  "#10b981", // chartGreen
  "#f97316", // chartOrange
  "#8b5cf6", // chartPurple
  "#ec4899", // chartPink
  "#6366f1", // indigo
  "#14b8a6", // teal
  "#f59e0b", // amber
];

const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({ 
  chartType, 
  config, 
  onConfigChange, 
  onSave 
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");

  const updateConfig = (updates: Partial<ChartConfig>) => {
    onConfigChange({ ...config, ...updates });
  };

  const updateDataItem = (index: number, updates: Partial<DataItem>) => {
    const newData = [...config.data];
    newData[index] = { ...newData[index], ...updates };
    updateConfig({ data: newData });
  };

  const addDataItem = () => {
    const newData = [...config.data];
    const nextIndex = newData.length;
    const colorIndex = nextIndex % defaultColors.length;
    
    newData.push({
      label: `Elemento ${nextIndex + 1}`,
      value: 10,
      color: defaultColors[colorIndex]
    });
    
    updateConfig({ data: newData });
  };

  const removeDataItem = (index: number) => {
    if (config.data.length <= 1) {
      toast({
        title: "Error",
        description: "Debe haber al menos un elemento de datos",
        variant: "destructive"
      });
      return;
    }
    
    const newData = [...config.data];
    newData.splice(index, 1);
    updateConfig({ data: newData });
  };

  const handleSave = () => {
    toast({
      title: "Configuración guardada",
      description: "La configuración del gráfico ha sido guardada exitosamente."
    });
    onSave();
  };

  return (
    <Card className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        Configuración de {chartType === 'bar-vertical' ? 'Gráfico de Barras Vertical' : 
                         chartType === 'bar-horizontal' ? 'Gráfico de Barras Horizontal' : 
                         chartType === 'pie' ? 'Gráfico Circular' : 
                         'Lienzo Personalizado'}
      </h2>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="data">Datos</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={config.title}
              onChange={(e) => updateConfig({ title: e.target.value })}
              placeholder="Título del gráfico"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="showLegend"
              checked={config.showLegend}
              onCheckedChange={(checked) => updateConfig({ showLegend: checked })}
            />
            <Label htmlFor="showLegend">Mostrar leyenda</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bgColor">Color de fondo</Label>
            <div className="flex items-center gap-2">
              <Input
                id="bgColor"
                type="text"
                value={config.bgColor}
                onChange={(e) => updateConfig({ bgColor: e.target.value })}
              />
              <Input
                type="color"
                value={config.bgColor}
                onChange={(e) => updateConfig({ bgColor: e.target.value })}
                className="w-12 h-10 p-1"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="animate"
              checked={config.animate}
              onCheckedChange={(checked) => updateConfig({ animate: checked })}
            />
            <Label htmlFor="animate">Animación</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="labelSize">Tamaño de etiquetas ({config.labelSize}px)</Label>
            <Slider
              id="labelSize"
              min={8}
              max={24}
              step={1}
              value={[config.labelSize]}
              onValueChange={(value) => updateConfig({ labelSize: value[0] })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="valueSize">Tamaño de valores ({config.valueSize}px)</Label>
            <Slider
              id="valueSize"
              min={8}
              max={24}
              step={1}
              value={[config.valueSize]}
              onValueChange={(value) => updateConfig({ valueSize: value[0] })}
            />
          </div>
        </TabsContent>

        <TabsContent value="data">
          <div className="space-y-4">
            {config.data.map((item, index) => (
              <div key={index} className="p-4 border rounded-md space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Elemento #{index + 1}</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => removeDataItem(index)}
                  >
                    Eliminar
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor={`label-${index}`}>Etiqueta</Label>
                    <Input
                      id={`label-${index}`}
                      value={item.label}
                      onChange={(e) => updateDataItem(index, { label: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`value-${index}`}>Valor</Label>
                    <Input
                      id={`value-${index}`}
                      type="number"
                      value={item.value}
                      onChange={(e) => updateDataItem(index, { value: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`color-${index}`}>Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id={`color-${index}`}
                      value={item.color}
                      onChange={(e) => updateDataItem(index, { color: e.target.value })}
                    />
                    <Input
                      type="color"
                      value={item.color}
                      onChange={(e) => updateDataItem(index, { color: e.target.value })}
                      className="w-12 h-10 p-1"
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button 
              variant="outline" 
              className="w-full mt-2" 
              onClick={addDataItem}
            >
              Agregar elemento
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <Button 
        className="w-full mt-8" 
        onClick={handleSave}
      >
        Guardar configuración
      </Button>
    </Card>
  );
};

export default ConfigurationPanel;
