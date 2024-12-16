"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { CalendarIcon, ClipboardList, Moon, Pill } from 'lucide-react'

export function DataEntry() {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        patientId: "",
        observationDate: "",
        moodScore: "",
        sleepHours: "",
        medication: "",
        notes: "",
    })

    const handleInputChange = (e:any) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name:any) => (value:any) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e:any) => {
        e.preventDefault()
        console.log("Submitting data:", formData)
        toast({
            title: "Data Submitted",
            description: "The patient data has been successfully recorded.",
        })
        setFormData({
            patientId: "",
            observationDate: "",
            moodScore: "",
            sleepHours: "",
            medication: "",
            notes: "",
        })
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Manual Data Entry</CardTitle>
                <CardDescription>Enter patient observations and data not captured by automated systems</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="patientId" className="text-sm font-medium">
                                Patient ID
                            </Label>
                            <Input
                                id="patientId"
                                name="patientId"
                                value={formData.patientId}
                                onChange={handleInputChange}
                                placeholder="Enter patient ID"
                                className="w-full"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="observationDate" className="text-sm font-medium">
                                Observation Date
                            </Label>
                            <div className="relative">
                                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                <Input
                                    id="observationDate"
                                    name="observationDate"
                                    type="date"
                                    value={formData.observationDate}
                                    onChange={handleInputChange}
                                    className="w-full pl-10"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="moodScore" className="text-sm font-medium">
                                Mood Score (1-10)
                            </Label>
                            <div className="relative">
                                <ClipboardList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                <Input
                                    id="moodScore"
                                    name="moodScore"
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={formData.moodScore}
                                    onChange={handleInputChange}
                                    className="w-full pl-10"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="sleepHours" className="text-sm font-medium">
                                Sleep Hours
                            </Label>
                            <div className="relative">
                                <Moon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                <Input
                                    id="sleepHours"
                                    name="sleepHours"
                                    type="number"
                                    step="0.5"
                                    value={formData.sleepHours}
                                    onChange={handleInputChange}
                                    className="w-full pl-10"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="medication" className="text-sm font-medium">
                            Current Medication
                        </Label>
                        <div className="relative">
                            <Pill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                            <Select name="medication" value={formData.medication} onValueChange={handleSelectChange("medication")}>
                                <SelectTrigger id="medication" className="w-full pl-10">
                                    <SelectValue placeholder="Select medication" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="lithium">Lithium</SelectItem>
                                    <SelectItem value="valproic_acid">Valproic Acid</SelectItem>
                                    <SelectItem value="quetiapine">Quetiapine</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="notes" className="text-sm font-medium">
                            Clinical Notes
                        </Label>
                        <Textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            placeholder="Enter any additional observations or notes"
                            className="min-h-[100px]"
                        />
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <Button type="submit" onClick={handleSubmit} className="w-full">
                    Submit Data
                </Button>
            </CardFooter>
        </Card>
    )
}

