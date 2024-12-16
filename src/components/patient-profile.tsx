"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Bell } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const moodData = [
    { date: '2023-05-01', mood: 5 },
    { date: '2023-05-08', mood: 6 },
    { date: '2023-05-15', mood: 4 },
    { date: '2023-05-22', mood: 7 },
    { date: '2023-05-29', mood: 3 },
    { date: '2023-06-05', mood: 5 },
]

const sleepData = [
    { date: '2023-05-01', hours: 7 },
    { date: '2023-05-08', hours: 6 },
    { date: '2023-05-15', hours: 8 },
    { date: '2023-05-22', hours: 5 },
    { date: '2023-05-29', hours: 7 },
    { date: '2023-06-05', hours: 6 },
]

export function PatientProfile({ patient }) {
    const [activeTab, setActiveTab] = useState("overview")

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">{patient.name}'s Profile</h2>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="mood">Mood Tracking</TabsTrigger>
                    <TabsTrigger value="sleep">Sleep Data</TabsTrigger>
                    <TabsTrigger value="treatment">Treatment History</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <Card>
                        <CardHeader>
                            <CardTitle>Patient Overview</CardTitle>
                            <CardDescription>Quick summary of patient's current status</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="font-semibold">Risk Level:</p>
                                    <Badge className={patient.riskLevel === "high" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}>
                                        {patient.riskLevel}
                                    </Badge>
                                </div>
                                <div>
                                    <p className="font-semibold">Last Assessment:</p>
                                    <p>{patient.lastAssessment}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Current Medication:</p>
                                    <p>{patient.medication}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    {patient.riskLevel === "high" && (
                        <Alert className="mt-4">
                            <Bell className="h-4 w-4" />
                            <AlertTitle>High Risk Alert</AlertTitle>
                            <AlertDescription>
                                This patient is currently at high risk. Consider scheduling a video call or in-person assessment.
                            </AlertDescription>
                        </Alert>
                    )}
                </TabsContent>
                <TabsContent value="mood">
                    <Card>
                        <CardHeader>
                            <CardTitle>Mood Tracking</CardTitle>
                            <CardDescription>Patient's mood over time</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={moodData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="mood" stroke="#8884d8" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="sleep">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sleep Data</CardTitle>
                            <CardDescription>Patient's sleep patterns</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={sleepData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="hours" stroke="#82ca9d" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="treatment">
                    <Card>
                        <CardHeader>
                            <CardTitle>Treatment History</CardTitle>
                            <CardDescription>Record of medications and therapies</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5">
                                <li>Lithium (300mg, twice daily) - Started 2023-01-15</li>
                                <li>Cognitive Behavioral Therapy - Weekly sessions since 2023-02-01</li>
                                <li>Quetiapine (50mg, nightly) - Started 2023-03-10, discontinued 2023-05-01 due to side effects</li>
                            </ul>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

