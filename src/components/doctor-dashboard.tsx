"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PatientList } from "@/components/patient-list"
import { PatientProfile } from "@/components/patient-profile"
import { DataEntry } from "@/components/data-entry"

export default function DoctorDashboard() {
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [activeTab, setActiveTab] = useState("overview")

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Bipolar Disorder Management Dashboard</h1>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="overview">Patient Overview</TabsTrigger>
                    <TabsTrigger value="profile" disabled={!selectedPatient}>
                        Patient Profile
                    </TabsTrigger>
                    <TabsTrigger value="data-entry">Data Entry</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <PatientList onSelectPatient={setSelectedPatient} onTabChange={setActiveTab} />
                </TabsContent>
                <TabsContent value="profile">
                    {selectedPatient && <PatientProfile patient={selectedPatient} />}
                </TabsContent>
                <TabsContent value="data-entry">
                    <DataEntry />
                </TabsContent>
            </Tabs>
        </div>
    )
}

