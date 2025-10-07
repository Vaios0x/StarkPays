"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FilterState {
  searchTerm: string;
  statusFilter: "all" | "completed" | "pending" | "failed" | "processing";
  typeFilter: "all" | "send" | "receive" | "exchange" | "fee";
  dateRange: "all" | "today" | "week" | "month" | "year";
  amountRange: { min: string; max: string };
  sortBy: "date" | "amount" | "status";
  sortOrder: "asc" | "desc";
}

interface TransactionFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
  showBalances: boolean;
  onToggleBalances: () => void;
}

export function TransactionFilters({
  filters,
  onFiltersChange,
  onReset,
  showBalances,
  onToggleBalances
}: TransactionFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const statusOptions = [
    { value: "all", label: "Todos los estados", icon: Filter },
    { value: "completed", label: "Completado", icon: CheckCircle2 },
    { value: "pending", label: "Pendiente", icon: Clock },
    { value: "failed", label: "Fallido", icon: XCircle },
    { value: "processing", label: "Procesando", icon: RefreshCw },
  ];

  const typeOptions = [
    { value: "all", label: "Todos los tipos", icon: Filter },
    { value: "send", label: "Enviado", icon: TrendingUp },
    { value: "receive", label: "Recibido", icon: TrendingDown },
    { value: "exchange", label: "Intercambio", icon: RefreshCw },
    { value: "fee", label: "Comisión", icon: DollarSign },
  ];

  const dateOptions = [
    { value: "all", label: "Todo el tiempo" },
    { value: "today", label: "Hoy" },
    { value: "week", label: "Esta semana" },
    { value: "month", label: "Este mes" },
    { value: "year", label: "Este año" },
  ];

  const sortOptions = [
    { value: "date-desc", label: "Más reciente" },
    { value: "date-asc", label: "Más antiguo" },
    { value: "amount-desc", label: "Mayor cantidad" },
    { value: "amount-asc", label: "Menor cantidad" },
    { value: "status-asc", label: "Estado A-Z" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-dark rounded-3xl p-6 neural-connection"
    >
      {/* Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-center mb-6">
        <div className="flex-1 w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neural-400 w-5 h-5" />
            <Input
              placeholder="Buscar por hash, destinatario, mensaje..."
              value={filters.searchTerm}
              onChange={(e) => updateFilter("searchTerm", e.target.value)}
              className="glass-button border-neural-500 text-dark-100 placeholder:text-dark-400 pl-10"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => setShowAdvanced(!showAdvanced)}
            variant="outline"
            className="glass-button border-neural-500 text-dark-100 hover:bg-glass-white"
          >
            <Filter className="w-4 h-4 mr-2" />
            {showAdvanced ? "Filtros Básicos" : "Filtros Avanzados"}
          </Button>

          <Button
            onClick={onReset}
            variant="outline"
            className="glass-button border-neural-500 text-dark-100 hover:bg-glass-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Limpiar
          </Button>
        </div>
      </div>

      {/* Basic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Status Filter */}
        <div>
          <label className="text-sm font-medium text-dark-200 mb-2 block">
            Estado
          </label>
          <select
            value={filters.statusFilter}
            onChange={(e) => updateFilter("statusFilter", e.target.value)}
            className="w-full glass-button border-neural-500 text-dark-100 bg-transparent"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div>
          <label className="text-sm font-medium text-dark-200 mb-2 block">
            Tipo
          </label>
          <select
            value={filters.typeFilter}
            onChange={(e) => updateFilter("typeFilter", e.target.value)}
            className="w-full glass-button border-neural-500 text-dark-100 bg-transparent"
          >
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div>
          <label className="text-sm font-medium text-dark-200 mb-2 block">
            Ordenar por
          </label>
          <select
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onChange={(e) => {
              const [sort, order] = e.target.value.split('-');
              updateFilter("sortBy", sort);
              updateFilter("sortOrder", order);
            }}
            className="w-full glass-button border-neural-500 text-dark-100 bg-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced Filters */}
      <motion.div
        initial={false}
        animate={{ height: showAdvanced ? "auto" : 0, opacity: showAdvanced ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="border-t border-dark-800 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date Range */}
            <div>
              <label className="text-sm font-medium text-dark-200 mb-2 block">
                Rango de Fechas
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => updateFilter("dateRange", e.target.value)}
                className="w-full glass-button border-neural-500 text-dark-100 bg-transparent"
              >
                {dateOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount Range */}
            <div>
              <label className="text-sm font-medium text-dark-200 mb-2 block">
                Rango de Cantidad
              </label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Mín"
                  value={filters.amountRange.min}
                  onChange={(e) => updateFilter("amountRange", { ...filters.amountRange, min: e.target.value })}
                  className="glass-button border-neural-500 text-dark-100 placeholder:text-dark-400"
                />
                <Input
                  type="number"
                  placeholder="Máx"
                  value={filters.amountRange.max}
                  onChange={(e) => updateFilter("amountRange", { ...filters.amountRange, max: e.target.value })}
                  className="glass-button border-neural-500 text-dark-100 placeholder:text-dark-400"
                />
              </div>
            </div>
          </div>

          {/* Quick Filter Chips */}
          <div className="mt-6">
            <label className="text-sm font-medium text-dark-200 mb-3 block">
              Filtros Rápidos
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Alta Seguridad", value: "high-security", color: "bg-green-500/20 text-green-400 border-green-500/30" },
                { label: "Bajas Comisiones", value: "low-fees", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
                { label: "Transacciones Grandes", value: "large-amounts", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
                { label: "Red Starknet", value: "starknet", color: "bg-neural-500/20 text-neural-400 border-neural-500/30" },
              ].map((chip) => (
                <Badge
                  key={chip.value}
                  className={`cursor-pointer hover:opacity-80 transition-opacity ${chip.color} border`}
                  onClick={() => {
                    // Implement quick filter logic here
                    console.log(`Applied quick filter: ${chip.value}`);
                  }}
                >
                  {chip.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
