import { useState } from "react";
import { Calculator, TrendingUp, RefreshCw, Copy, CheckCircle } from "lucide-react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";

interface IndicatorData {
  name: string;
  label: string;
  previousYear: string;
  currentYear: string;
  growthRate: number | null;
}

export function GrowthCalculator() {
  const [indicators, setIndicators] = useState<IndicatorData[]>([
    {
      name: "population",
      label: "Population",
      previousYear: "",
      currentYear: "",
      growthRate: null,
    },
    {
      name: "exports",
      label: "Exports of Goods and Services",
      previousYear: "",
      currentYear: "",
      growthRate: null,
    },
    {
      name: "imports",
      label: "Imports of Goods and Services",
      previousYear: "",
      currentYear: "",
      growthRate: null,
    },
    {
      name: "capitalFormation",
      label: "Gross Capital Formation",
      previousYear: "",
      currentYear: "",
      growthRate: null,
    },
    {
      name: "consumption",
      label: "Final Consumption Expenditure",
      previousYear: "",
      currentYear: "",
      growthRate: null,
    },
    {
      name: "government",
      label: "Government Expenditure",
      previousYear: "",
      currentYear: "",
      growthRate: null,
    },
  ]);

  const [copied, setCopied] = useState(false);

  const handleInputChange = (index: number, field: "previousYear" | "currentYear", value: string) => {
    const newIndicators = [...indicators];
    newIndicators[index][field] = value;
    setIndicators(newIndicators);
  };

  const calculateGrowthRate = (previous: string, current: string): number | null => {
    const prev = parseFloat(previous);
    const curr = parseFloat(current);

    if (isNaN(prev) || isNaN(curr) || prev === 0) {
      return null;
    }

    return parseFloat((((curr - prev) / prev) * 100).toFixed(2));
  };

  const handleCalculate = () => {
    const newIndicators = indicators.map((indicator) => ({
      ...indicator,
      growthRate: calculateGrowthRate(indicator.previousYear, indicator.currentYear),
    }));
    setIndicators(newIndicators);
  };

  const handleReset = () => {
    setIndicators(
      indicators.map((indicator) => ({
        ...indicator,
        previousYear: "",
        currentYear: "",
        growthRate: null,
      }))
    );
  };

  const hasAnyInput = indicators.some((ind) => ind.previousYear || ind.currentYear);
  const hasAllInputs = indicators.every((ind) => ind.previousYear && ind.currentYear);

  const copyGrowthRates = () => {
    const rates = indicators
      .filter((ind) => ind.growthRate !== null)
      .map((ind) => `${ind.label}: ${ind.growthRate}%`)
      .join("\n");

    navigator.clipboard.writeText(rates);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getGrowthColor = (rate: number | null) => {
    if (rate === null) return "text-gray-400";
    if (rate > 0) return "text-[#10b981]";
    if (rate < 0) return "text-red-500";
    return "text-gray-600";
  };

  return (
    <div id="calculator" className="max-w-6xl mx-auto mb-24 scroll-mt-24">
      <div className="text-center mb-12">
        <div className="inline-block mb-4">
          <div className="w-16 h-16 bg-[#10b981]/20 rounded-2xl flex items-center justify-center mx-auto">
            <Calculator className="w-8 h-8 text-[#10b981]" />
          </div>
        </div>
        <h2 className="text-4xl text-white mb-4">Growth Rate Calculator</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Calculate economic indicator growth rates by entering previous year and current year values
        </p>
      </div>

      <Card className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
        <div className="space-y-6">
          {/* Header Row */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-6 pb-4 border-b border-white/20">
            <div className="text-white font-medium">Economic Indicator</div>
            <div className="text-white font-medium text-center">Previous Year</div>
            <div className="text-white font-medium text-center">Current Year</div>
            <div className="text-white font-medium text-center">Growth Rate (%)</div>
          </div>

          {/* Indicator Rows */}
          {indicators.map((indicator, index) => (
            <motion.div
              key={indicator.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-6 items-center"
            >
              <div>
                <Label className="text-white text-sm">{indicator.label}</Label>
              </div>
              
              <div>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={indicator.previousYear}
                  onChange={(e) => handleInputChange(index, "previousYear", e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 h-11 text-center hover:bg-white/15 transition-colors"
                />
              </div>

              <div>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={indicator.currentYear}
                  onChange={(e) => handleInputChange(index, "currentYear", e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 h-11 text-center hover:bg-white/15 transition-colors"
                />
              </div>

              <div className="text-center">
                <AnimatePresence mode="wait">
                  {indicator.growthRate !== null ? (
                    <motion.div
                      key="result"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className={`text-xl font-semibold flex items-center justify-center gap-2 ${getGrowthColor(indicator.growthRate)}`}
                    >
                      {indicator.growthRate > 0 && <TrendingUp className="w-5 h-5" />}
                      {indicator.growthRate}%
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-gray-500 text-sm"
                    >
                      —
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}

          {/* Action Buttons */}
          <div className="pt-6 border-t border-white/20 flex items-center gap-4">
            <Button
              onClick={handleCalculate}
              disabled={!hasAllInputs}
              className="flex-1 bg-[#10b981] hover:bg-[#059669] text-white h-12 rounded-xl shadow-lg shadow-[#10b981]/30 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Calculate Growth Rates
            </Button>

            {hasAnyInput && (
              <Button
                onClick={handleReset}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-12 rounded-xl"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Reset
              </Button>
            )}

            {indicators.some((ind) => ind.growthRate !== null) && (
              <Button
                onClick={copyGrowthRates}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-12 rounded-xl"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 mr-2" />
                    Copy Results
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Formula Info */}
          <div className="pt-4 border-t border-white/20">
            <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Calculator className="w-4 h-4 text-blue-300" />
                </div>
                <div className="flex-1">
                  <p className="text-blue-200 text-sm font-medium mb-2">Growth Rate Formula</p>
                  <p className="text-blue-300 text-sm font-mono bg-blue-500/20 px-3 py-2 rounded">
                    Growth Rate = ((Current Year - Previous Year) / Previous Year) × 100
                  </p>
                  <p className="text-blue-300/80 text-xs mt-2">
                    Example: If Population was 100M (previous) and is now 105M (current), growth rate = ((105-100)/100) × 100 = 5%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="text-[#10b981] text-sm font-medium mb-1">💡 Tip 1</div>
          <p className="text-gray-400 text-sm">Enter values in the same units (e.g., millions, billions) for accurate calculations</p>
        </div>
        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="text-[#10b981] text-sm font-medium mb-1">💡 Tip 2</div>
          <p className="text-gray-400 text-sm">Positive growth rates indicate expansion, negative rates show contraction</p>
        </div>
        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="text-[#10b981] text-sm font-medium mb-1">💡 Tip 3</div>
          <p className="text-gray-400 text-sm">Use calculated rates directly in the GDP prediction dashboard above</p>
        </div>
      </div>
    </div>
  );
}
