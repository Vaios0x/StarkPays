"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Users, AlertTriangle, CheckCircle2, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const familyMembers = [
  {
    id: 1,
    name: "María González",
    relationship: "Madre",
    address: "0x1234...5678",
    status: "active",
    lastActivity: "Hace 2 horas",
  },
  {
    id: 2,
    name: "Carlos González",
    relationship: "Hermano",
    address: "0x8765...4321",
    status: "pending",
    lastActivity: "Ayer",
  },
];

const vaultSettings = {
  emergencyCode: "FAMILY2024",
  autoBlock: true,
  suspiciousThreshold: 80,
  notifications: true,
};

export default function FamilyVaultPage() {
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    address: "",
    relationship: "",
  });
  const [emergencyCode, setEmergencyCode] = useState(vaultSettings.emergencyCode);

  const handleAddMember = () => {
    if (!newMember.name || !newMember.address) {
      toast.error("Completa todos los campos");
      return;
    }
    
    toast.success("Familiar agregado a la bóveda");
    setShowAddMember(false);
    setNewMember({ name: "", address: "", relationship: "" });
  };

  const handleUpdateEmergencyCode = () => {
    if (emergencyCode.length < 6) {
      toast.error("El código debe tener al menos 6 caracteres");
      return;
    }
    
    toast.success("Código de emergencia actualizado");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Bóveda Familiar
            </h1>
            <p className="text-gray-600">
              Protege a tu familia con controles avanzados
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            Protección Activa
          </Badge>
          <Badge variant="outline">
            <Shield className="w-4 h-4 mr-1" />
            ZK-Proofs Habilitados
          </Badge>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Family Members */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span>Miembros de la Familia</span>
                </CardTitle>
                <Button
                  onClick={() => setShowAddMember(true)}
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {familyMembers.map((member) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.relationship}</p>
                        <p className="text-xs text-gray-500 font-mono">{member.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant={member.status === 'active' ? 'default' : 'secondary'}
                        className={member.status === 'active' ? 'bg-green-100 text-green-700' : ''}
                      >
                        {member.status === 'active' ? 'Activo' : 'Pendiente'}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="w-5 h-5 text-red-600" />
                <span>Configuración de Seguridad</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="emergency-code">Código de Emergencia</Label>
                <div className="flex space-x-2 mt-2">
                  <Input
                    id="emergency-code"
                    value={emergencyCode}
                    onChange={(e) => setEmergencyCode(e.target.value)}
                    placeholder="FAMILY2024"
                    className="font-mono"
                  />
                  <Button onClick={handleUpdateEmergencyCode}>
                    Actualizar
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Este código permite bloquear retiros en caso de emergencia
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Auto-bloqueo</p>
                    <p className="text-sm text-gray-600">Bloquear transacciones sospechosas</p>
                  </div>
                  <div className="w-12 h-6 bg-green-500 rounded-full flex items-center justify-end pr-1">
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Notificaciones</p>
                    <p className="text-sm text-gray-600">Alertas de seguridad</p>
                  </div>
                  <div className="w-12 h-6 bg-green-500 rounded-full flex items-center justify-end pr-1">
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Protection Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span>Estado de Protección</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="font-semibold text-gray-900">Protección Activa</p>
                  <p className="text-sm text-gray-600">Tu familia está segura</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Fraudes bloqueados</span>
                    <span className="font-semibold text-green-600">0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Última verificación</span>
                    <span className="font-semibold">Hace 2 min</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Score de seguridad</span>
                    <span className="font-semibold text-green-600">98/100</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <span>Alertas Recientes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-800">
                    ✅ Transacción segura
                  </p>
                  <p className="text-xs text-green-600">
                    Envío a María González verificado
                  </p>
                </div>
                
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">
                    ℹ️ Patrón normal detectado
                  </p>
                  <p className="text-xs text-blue-600">
                    Horario habitual de envío
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddMember && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Agregar Familiar
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  placeholder="María González"
                />
              </div>
              
              <div>
                <Label htmlFor="address">Dirección de wallet</Label>
                <Input
                  id="address"
                  value={newMember.address}
                  onChange={(e) => setNewMember({ ...newMember, address: e.target.value })}
                  placeholder="0x..."
                />
              </div>
              
              <div>
                <Label htmlFor="relationship">Relación</Label>
                <Input
                  id="relationship"
                  value={newMember.relationship}
                  onChange={(e) => setNewMember({ ...newMember, relationship: e.target.value })}
                  placeholder="Madre, Hermano, etc."
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowAddMember(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleAddMember}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                Agregar
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
