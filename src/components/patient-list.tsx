"use client"

import { useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { VideoIcon } from 'lucide-react'
import Link from "next/link"

const patients = [
    { id: 1, name: "John Doe", riskLevel: "high", lastAssessment: "2023-06-01", medication: "Lithium" },
    { id: 2, name: "Jane Smith", riskLevel: "medium", lastAssessment: "2023-05-28", medication: "Valproic acid" },
    { id: 3, name: "Bob Johnson", riskLevel: "low", lastAssessment: "2023-06-03", medication: "Quetiapine" },
]

export function PatientList({ onSelectPatient, onTabChange }) {
    const [filter, setFilter] = useState("")
    const [sortBy, setSortBy] = useState("name")

    const filteredPatients = patients
        .filter((patient) =>
            patient.name.toLowerCase().includes(filter.toLowerCase()) ||
            patient.riskLevel.toLowerCase().includes(filter.toLowerCase()) ||
            patient.medication.toLowerCase().includes(filter.toLowerCase())
        )
        .sort((a, b) => a[sortBy].localeCompare(b[sortBy]))

    const getRiskBadge = (riskLevel) => {
        const colors = {
            low: "bg-green-100 text-green-800",
            medium: "bg-yellow-100 text-yellow-800",
            high: "bg-red-100 text-red-800",
        }
        return <Badge className={colors[riskLevel]}>{riskLevel}</Badge>
    }

    return (
        <div>
            <div className="flex justify-between mb-4">
                <Input
                    placeholder="Filter patients..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="max-w-sm"
                />
                <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="riskLevel">Risk Level</SelectItem>
                        <SelectItem value="lastAssessment">Last Assessment</SelectItem>
                        <SelectItem value="medication">Medication</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Risk Level</TableHead>
                        <TableHead>Last Assessment</TableHead>
                        <TableHead>Medication</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredPatients.map((patient) => (
                        <TableRow key={patient.id}>
                            <TableCell>{patient.name}</TableCell>
                            <TableCell>{getRiskBadge(patient.riskLevel)}</TableCell>
                            <TableCell>{patient.lastAssessment}</TableCell>
                            <TableCell>{patient.medication}</TableCell>
                            <TableCell>
                                <Button
                                    variant="outline"
                                    size="sm" onClick={() => {
                                        onSelectPatient(patient)
                                        onTabChange("profile")
                                    }} className="font-sans text-sm">
                                    View Profile
                                </Button>
                                {patient.riskLevel === "high" && (
                                    <Link href="/meetings">
                                    <Button variant="outline" size="sm" className="font-sans text-sm ml-2 bg-black text-white border-white hover:border-black">
                                        <VideoIcon className="mr-2 h-4 w-4" /> Video Call
                                    </Button>
                                    </Link>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

