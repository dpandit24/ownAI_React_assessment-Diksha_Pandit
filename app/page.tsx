"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, Trash2, Plus, Minus } from "lucide-react"

interface Talent {
  id: string
  name: string
  isSelected: boolean // Added isSelected property to track checkbox state
  contractDuration: string
  billRate: string
  currency: string
  standardTimeBR: string
  standardCurrency: string
  overTimeBR: string
  overCurrency: string
}

interface TalentSection {
  id: string
  jobTitle: string
  jobId: string
  talents: Talent[]
  isExpanded: boolean
}

export default function PurchaseOrderForm() {
  const [isViewMode, setIsViewMode] = useState(false)

  const [formData, setFormData] = useState({
    clientName: "",
    purchaseOrderType: "",
    purchaseOrderNo: "",
    receivedOn: "",
    receivedFromName: "",
    receivedFromEmail: "",
    poStartDate: "",
    poEndDate: "",
    budget: "",
    currency: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const [talentSections, setTalentSections] = useState<TalentSection[]>([
    {
      id: "1",
      jobTitle: "Application Development",
      jobId: "OWNAT_234",
      isExpanded: true,
      talents: [
        {
          id: "t1",
          name: "Monika Goyal Test",
          isSelected: false, // Added default isSelected state
          contractDuration: "",
          billRate: "",
          currency: "USD - Dollars ($)",
          standardTimeBR: "",
          standardCurrency: "USD - Dollars ($)",
          overTimeBR: "",
          overCurrency: "USD - Dollars ($)",
        },
        {
          id: "t2",
          name: "shaili khatri",
          isSelected: false, // Added default isSelected state
          contractDuration: "",
          billRate: "",
          currency: "USD - Dollars ($)",
          standardTimeBR: "",
          standardCurrency: "USD - Dollars ($)",
          overTimeBR: "",
          overCurrency: "USD - Dollars ($)",
        },
      ],
    },
  ])

  const addTalentSection = () => {
    const newSection: TalentSection = {
      id: Date.now().toString(),
      jobTitle: "Application Development",
      jobId: "OWNAT_234",
      talents: [
        {
          id: `t${Date.now()}_1`,
          name: "Monika Goyal Test",
          isSelected: false, // Added default isSelected state for new sections
          contractDuration: "",
          billRate: "",
          currency: "USD - Dollars ($)",
          standardTimeBR: "",
          standardCurrency: "USD - Dollars ($)",
          overTimeBR: "",
          overCurrency: "USD - Dollars ($)",
        },
        {
          id: `t${Date.now()}_2`,
          name: "shaili khatri",
          isSelected: false, // Added default isSelected state for new sections
          contractDuration: "",
          billRate: "",
          currency: "USD - Dollars ($)",
          standardTimeBR: "",
          standardCurrency: "USD - Dollars ($)",
          overTimeBR: "",
          overCurrency: "USD - Dollars ($)",
        },
      ],
      isExpanded: true,
    }
    setTalentSections([...talentSections, newSection])
  }

  const removeTalentSection = (sectionId: string) => {
    setTalentSections(talentSections.filter((section) => section.id !== sectionId))
  }

  const updateTalentSection = (sectionId: string, field: keyof TalentSection, value: string | boolean) => {
    setTalentSections(
      talentSections.map((section) => (section.id === sectionId ? { ...section, [field]: value } : section)),
    )
  }

  const toggleTalentSection = (sectionId: string) => {
    setTalentSections(
      talentSections.map((section) =>
        section.id === sectionId ? { ...section, isExpanded: !section.isExpanded } : section,
      ),
    )
  }

  const updateTalent = (sectionId: string, talentId: string, field: keyof Talent, value: string) => {
    setTalentSections(
      talentSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              talents: section.talents.map((talent) =>
                talent.id === talentId ? { ...talent, [field]: value } : talent,
              ),
            }
          : section,
      ),
    )
  }

  const removeTalentFromSection = (sectionId: string, talentId: string) => {
    setTalentSections(
      talentSections.map((section) =>
        section.id === sectionId
          ? { ...section, talents: section.talents.filter((talent) => talent.id !== talentId) }
          : section,
      ),
    )
  }

  const toggleTalentSelection = (sectionId: string, talentId: string) => {
    if (formData.purchaseOrderType === "individual-po") {
      // For Individual PO, uncheck all other talents first
      setTalentSections(
        talentSections.map((section) => ({
          ...section,
          talents: section.talents.map((talent) => ({
            ...talent,
            isSelected: talent.id === talentId ? !talent.isSelected : false,
          })),
        })),
      )
    } else {
      // For Group PO, allow multiple selections
      setTalentSections(
        talentSections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                talents: section.talents.map((talent) =>
                  talent.id === talentId ? { ...talent, isSelected: !talent.isSelected } : talent,
                ),
              }
            : section,
        ),
      )
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Required field validations
    if (!formData.clientName) newErrors.clientName = "Client Name is required"
    if (!formData.purchaseOrderType) newErrors.purchaseOrderType = "Purchase Order Type is required"
    if (!formData.purchaseOrderNo) newErrors.purchaseOrderNo = "Purchase Order No is required"
    if (!formData.receivedOn) newErrors.receivedOn = "Received On date is required"
    if (!formData.receivedFromName) newErrors.receivedFromName = "Received From Name is required"
    if (!formData.poStartDate) newErrors.poStartDate = "PO Start Date is required"
    if (!formData.poEndDate) newErrors.poEndDate = "PO End Date is required"
    if (!formData.budget) newErrors.budget = "Budget is required"

    // Email validation
    if (formData.receivedFromEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.receivedFromEmail)) {
      newErrors.receivedFromEmail = "Please enter a valid email address"
    }

    // Budget validation (max 5 digits)
    if (formData.budget && (!/^\d+$/.test(formData.budget) || formData.budget.length > 5)) {
      newErrors.budget = "Budget must be numeric with maximum 5 digits"
    }

    // Date validation (PO End Date should not be before PO Start Date)
    if (formData.poStartDate && formData.poEndDate && new Date(formData.poEndDate) < new Date(formData.poStartDate)) {
      newErrors.poEndDate = "PO End Date cannot be before PO Start Date"
    }

    const selectedTalents = talentSections.flatMap((section) => section.talents.filter((talent) => talent.isSelected))

    if (formData.purchaseOrderType === "individual-po" && selectedTalents.length > 1) {
      newErrors.talentSelection = "Individual PO allows selection of only one talent"
    } else if (formData.purchaseOrderType === "group-po" && selectedTalents.length < 2) {
      newErrors.talentSelection = "Group PO requires at least two talents to be selected"
    }

    talentSections.forEach((section) => {
      section.talents.forEach((talent) => {
        if (talent.isSelected) {
          if (!talent.contractDuration) {
            newErrors[`${talent.id}_contractDuration`] = `Contract Duration is required for ${talent.name}`
          }
          if (!talent.billRate) {
            newErrors[`${talent.id}_billRate`] = `Bill Rate is required for ${talent.name}`
          }
          if (!talent.standardTimeBR) {
            newErrors[`${talent.id}_standardTimeBR`] = `Standard Time BR is required for ${talent.name}`
          }
          if (!talent.overTimeBR) {
            newErrors[`${talent.id}_overTimeBR`] = `Over Time BR is required for ${talent.name}`
          }
        }
      })
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const updateFormField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSave = () => {
    if (validateForm()) {
      console.log("Form is valid, saving...")
      setIsViewMode(true) // Switch to view mode after saving
      // Add save logic here
    } else {
      console.log("Form has validation errors")
    }
  }

  const handleReset = () => {
    setFormData({
      clientName: "",
      purchaseOrderType: "",
      purchaseOrderNo: "",
      receivedOn: "",
      receivedFromName: "",
      receivedFromEmail: "",
      poStartDate: "",
      poEndDate: "",
      budget: "",
      currency: "",
    })
    setTalentSections([
      {
        id: "1",
        jobTitle: "Application Development",
        jobId: "OWNAT_234",
        isExpanded: true,
        talents: [
          {
            id: "t1",
            name: "Monika Goyal Test",
            isSelected: false,
            contractDuration: "",
            billRate: "",
            currency: "USD - Dollars ($)",
            standardTimeBR: "",
            standardCurrency: "USD - Dollars ($)",
            overTimeBR: "",
            overCurrency: "USD - Dollars ($)",
          },
          {
            id: "t2",
            name: "shaili khatri",
            isSelected: false,
            contractDuration: "",
            billRate: "",
            currency: "USD - Dollars ($)",
            standardTimeBR: "",
            standardCurrency: "USD - Dollars ($)",
            overTimeBR: "",
            overCurrency: "USD - Dollars ($)",
          },
        ],
      },
    ])
    setErrors({})
    setIsViewMode(false) // Return to edit mode
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-full mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" className="p-1">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-900">Purchase Order | {isViewMode ? "View" : "New"}</h1>
        </div>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            {/* Top Form Section */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="space-y-2">
                <Label htmlFor="clientName" className="text-sm font-medium text-gray-700">
                  Client Name <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.clientName}
                  onValueChange={(value) => updateFormField("clientName", value)}
                  disabled={isViewMode}
                >
                  <SelectTrigger
                    className={`w-full cursor-pointer ${errors.clientName ? "border-red-500" : ""} ${isViewMode ? "bg-gray-50" : ""}`}
                  >
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="collabara">Collabara - Collabara Inc</SelectItem>
                  </SelectContent>
                </Select>
                {errors.clientName && <p className="text-red-500 text-xs">{errors.clientName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="poType" className="text-sm font-medium text-gray-700">
                  Purchase Order Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.purchaseOrderType}
                  onValueChange={(value) => updateFormField("purchaseOrderType", value)}
                  disabled={isViewMode}
                >
                  <SelectTrigger
                    className={`w-full cursor-pointer ${errors.purchaseOrderType ? "border-red-500" : ""} ${isViewMode ? "bg-gray-50" : ""}`}
                  >
                    <SelectValue placeholder="Select PO type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="group-po">Group PO</SelectItem>
                    <SelectItem value="individual-po">Individual PO</SelectItem>
                  </SelectContent>
                </Select>
                {errors.purchaseOrderType && <p className="text-red-500 text-xs">{errors.purchaseOrderType}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="poNumber" className="text-sm font-medium text-gray-700">
                  Purchase Order No <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={formData.purchaseOrderNo}
                  onChange={(e) => updateFormField("purchaseOrderNo", e.target.value)}
                  placeholder="PO Number"
                  className={`w-full ${errors.purchaseOrderNo ? "border-red-500" : ""} ${isViewMode ? "bg-gray-50" : ""}`}
                  disabled={isViewMode}
                />
                {errors.purchaseOrderNo && <p className="text-red-500 text-xs">{errors.purchaseOrderNo}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="receivedOn" className="text-sm font-medium text-gray-700">
                  Received On <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type="date"
                    value={formData.receivedOn}
                    onChange={(e) => updateFormField("receivedOn", e.target.value)}
                    placeholder="Received On"
                    className={`w-full pr-10 ${errors.receivedOn ? "border-red-500" : ""} ${isViewMode ? "bg-gray-50" : ""} [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-2 [&::-webkit-calendar-picker-indicator]:top-1/2 [&::-webkit-calendar-picker-indicator]:-translate-y-1/2`}
                    disabled={isViewMode}
                  />
                </div>
                {errors.receivedOn && <p className="text-red-500 text-xs">{errors.receivedOn}</p>}
              </div>
            </div>

            {/* Received From Section */}
            <div className="grid grid-cols-6 gap-2 mb-8">
              <div className="space-y-2">
                <Label htmlFor="receivedFrom" className="text-sm font-medium text-gray-700">
                  Received From <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={formData.receivedFromName}
                  onChange={(e) => updateFormField("receivedFromName", e.target.value)}
                  placeholder="Received From Name"
                  className={`w-full ${errors.receivedFromName ? "border-red-500" : ""} ${isViewMode ? "bg-gray-50" : ""}`}
                  disabled={isViewMode}
                />
                {errors.receivedFromName && <p className="text-red-500 text-xs">{errors.receivedFromName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="receivedFromEmail" className="text-sm font-medium text-gray-700">
                  Received From Email ID <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="email"
                  value={formData.receivedFromEmail}
                  onChange={(e) => updateFormField("receivedFromEmail", e.target.value)}
                  placeholder="Received From Email ID"
                  className={`w-full ${errors.receivedFromEmail ? "border-red-500" : ""} ${isViewMode ? "bg-gray-50" : ""}`}
                  disabled={isViewMode}
                />
                {errors.receivedFromEmail && <p className="text-red-500 text-xs">{errors.receivedFromEmail}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="poStartDate" className="text-sm font-medium text-gray-700">
                  PO Start Date <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type="date"
                    value={formData.poStartDate}
                    onChange={(e) => updateFormField("poStartDate", e.target.value)}
                    placeholder="Start Date"
                    className={`w-full pr-10 ${errors.poStartDate ? "border-red-500" : ""} ${isViewMode ? "bg-gray-50" : ""} [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-2 [&::-webkit-calendar-picker-indicator]:top-1/2 [&::-webkit-calendar-picker-indicator]:-translate-y-1/2`}
                    disabled={isViewMode}
                  />
                </div>
                {errors.poStartDate && <p className="text-red-500 text-xs">{errors.poStartDate}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="poEndDate" className="text-sm font-medium text-gray-700">
                  PO End Date <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type="date"
                    value={formData.poEndDate}
                    onChange={(e) => updateFormField("poEndDate", e.target.value)}
                    min={formData.poStartDate}
                    placeholder="End Date"
                    className={`w-full pr-10 ${errors.poEndDate ? "border-red-500" : ""} ${isViewMode ? "bg-gray-50" : ""} [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-2 [&::-webkit-calendar-picker-indicator]:top-1/2 [&::-webkit-calendar-picker-indicator]:-translate-y-1/2`}
                    disabled={isViewMode}
                  />
                </div>
                {errors.poEndDate && <p className="text-red-500 text-xs">{errors.poEndDate}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget" className="text-sm font-medium text-gray-700">
                  Budget <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={formData.budget}
                  onChange={(e) => updateFormField("budget", e.target.value)}
                  placeholder="Budget"
                  maxLength={5}
                  pattern="[0-9]*"
                  className={`w-full ${errors.budget ? "border-red-500" : ""} ${isViewMode ? "bg-gray-50" : ""}`}
                  disabled={isViewMode}
                />
                {errors.budget && <p className="text-red-500 text-xs">{errors.budget}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency" className="text-sm font-medium text-gray-700">
                  Currency <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.currency}
                  onValueChange={(value) => updateFormField("currency", value)}
                  disabled={isViewMode}
                >
                  <SelectTrigger className={`w-full cursor-pointer ${isViewMode ? "bg-gray-50" : ""}`}>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD - Dollars ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Talent Detail Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Talent Detail</h2>
                {!isViewMode && (
                  <Button
                    onClick={addTalentSection}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 bg-transparent cursor-pointer hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4" />
                    Add Another
                  </Button>
                )}
              </div>

              {talentSections.map((section, sectionIndex) => (
                <div key={section.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
                  {/* Job Title and ID Row with Action Buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Job Title/REQ Name <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={section.jobTitle}
                        onValueChange={(value) => updateTalentSection(section.id, "jobTitle", value)}
                        disabled={isViewMode}
                      >
                        <SelectTrigger className={`cursor-pointer ${isViewMode ? "bg-gray-50" : ""}`}>
                          <SelectValue placeholder="Select job title" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Application Development">Application Development</SelectItem>
                          <SelectItem value="Business Administrator">Business Administrator</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium text-gray-700">
                          Job ID/REQ ID <span className="text-red-500">*</span>
                        </Label>
                        {!isViewMode && (
                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() => removeTalentSection(section.id)}
                              variant="ghost"
                              size="sm"
                              className="text-gray-400 hover:text-red-500 p-1 cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button
                              onClick={() => toggleTalentSection(section.id)}
                              variant="ghost"
                              size="sm"
                              className="text-gray-400 hover:text-blue-500 p-1 cursor-pointer"
                            >
                              {section.isExpanded ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                            </Button>
                          </div>
                        )}
                      </div>
                      <Input
                        value={section.jobId}
                        onChange={(e) => updateTalentSection(section.id, "jobId", e.target.value)}
                        placeholder="Job ID"
                        className={isViewMode ? "bg-gray-50" : ""}
                        disabled={isViewMode}
                      />
                    </div>
                  </div>

                  {section.isExpanded && (
                    <div className="space-y-6">
                      {section.talents.map((talent) => (
                        <div key={talent.id} className="space-y-4 pl-4 border-l-2 border-gray-100">
                          {/* Talent Name Checkbox */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`talent-${talent.id}`}
                                checked={talent.isSelected}
                                onCheckedChange={() => toggleTalentSelection(section.id, talent.id)}
                                disabled={isViewMode}
                                className="cursor-pointer"
                              />
                              <span className="text-sm font-medium text-gray-700">{talent.name}</span>
                            </div>
                          </div>

                          {/* Contract Details Row */}
                          <div className="grid grid-cols-7 gap-3 items-end">
                            <div className="space-y-2">
                              <Label className="text-sm font-medium text-gray-700">
                                Contract Duration {talent.isSelected && <span className="text-red-500">*</span>}
                              </Label>
                              <div className="flex items-center gap-2">
                                <Input
                                  value={talent.contractDuration}
                                  onChange={(e) =>
                                    updateTalent(section.id, talent.id, "contractDuration", e.target.value)
                                  }
                                  placeholder="Contract Duration"
                                  className={`flex-1 ${!talent.isSelected || isViewMode ? "bg-gray-50 text-gray-400" : ""} ${errors[`${talent.id}_contractDuration`] ? "border-red-500" : ""}`}
                                  disabled={!talent.isSelected || isViewMode}
                                />
                                <span className="text-sm text-gray-500 whitespace-nowrap">Months</span>
                              </div>
                              {errors[`${talent.id}_contractDuration`] && (
                                <p className="text-red-500 text-xs">{errors[`${talent.id}_contractDuration`]}</p>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label className="text-sm font-medium text-gray-700">
                                Bill Rate {talent.isSelected && <span className="text-red-500">*</span>}
                              </Label>
                              <div className="flex items-center gap-2">
                                <Input
                                  value={talent.billRate}
                                  onChange={(e) => updateTalent(section.id, talent.id, "billRate", e.target.value)}
                                  placeholder="Bill Rate"
                                  className={`flex-1 ${!talent.isSelected || isViewMode ? "bg-gray-50 text-gray-400" : ""} ${errors[`${talent.id}_billRate`] ? "border-red-500" : ""}`}
                                  disabled={!talent.isSelected || isViewMode}
                                />
                                <span className="text-sm text-gray-500">/hr</span>
                              </div>
                              {errors[`${talent.id}_billRate`] && (
                                <p className="text-red-500 text-xs">{errors[`${talent.id}_billRate`]}</p>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label className="text-sm font-medium text-gray-700">Currency</Label>
                              <Select
                                value={talent.currency}
                                onValueChange={(value) => updateTalent(section.id, talent.id, "currency", value)}
                                disabled={!talent.isSelected || isViewMode}
                              >
                                <SelectTrigger
                                  className={`cursor-pointer ${!talent.isSelected || isViewMode ? "bg-gray-50 text-gray-400" : ""}`}
                                >
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="USD - Dollars ($)">USD - Dollars ($)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-sm font-medium text-gray-700">
                                Standard Time BR {talent.isSelected && <span className="text-red-500">*</span>}
                              </Label>
                              <div className="flex items-center gap-2">
                                <Input
                                  value={talent.standardTimeBR}
                                  onChange={(e) =>
                                    updateTalent(section.id, talent.id, "standardTimeBR", e.target.value)
                                  }
                                  placeholder="Std Time BR"
                                  className={`flex-1 ${!talent.isSelected || isViewMode ? "bg-gray-50 text-gray-400" : ""} ${errors[`${talent.id}_standardTimeBR`] ? "border-red-500" : ""}`}
                                  disabled={!talent.isSelected || isViewMode}
                                />
                                <span className="text-sm text-gray-500">/hr</span>
                              </div>
                              {errors[`${talent.id}_standardTimeBR`] && (
                                <p className="text-red-500 text-xs">{errors[`${talent.id}_standardTimeBR`]}</p>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label className="text-sm font-medium text-gray-700">Currency</Label>
                              <Select
                                value={talent.standardCurrency}
                                onValueChange={(value) =>
                                  updateTalent(section.id, talent.id, "standardCurrency", value)
                                }
                                disabled={!talent.isSelected || isViewMode}
                              >
                                <SelectTrigger className={`cursor-pointer ${isViewMode ? "bg-gray-50" : ""}`}>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="USD - Dollars ($)">USD - Dollars ($)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-sm font-medium text-gray-700">
                                Over Time BR {talent.isSelected && <span className="text-red-500">*</span>}
                              </Label>
                              <div className="flex items-center gap-2">
                                <Input
                                  value={talent.overTimeBR}
                                  onChange={(e) => updateTalent(section.id, talent.id, "overTimeBR", e.target.value)}
                                  placeholder="Over Time BR"
                                  className={`flex-1 ${!talent.isSelected || isViewMode ? "bg-gray-50 text-gray-400" : ""} ${errors[`${talent.id}_overTimeBR`] ? "border-red-500" : ""}`}
                                  disabled={!talent.isSelected || isViewMode}
                                />
                                <span className="text-sm text-gray-500">/hr</span>
                              </div>
                              {errors[`${talent.id}_overTimeBR`] && (
                                <p className="text-red-500 text-xs">{errors[`${talent.id}_overTimeBR`]}</p>
                              )}
                            </div>

                            {/* Over Time Currency */}
                            <div className="space-y-2">
                              <Label className="text-sm font-medium text-gray-700">Currency</Label>
                              <Select
                                value={talent.overCurrency}
                                onValueChange={(value) => updateTalent(section.id, talent.id, "overCurrency", value)}
                                disabled={!talent.isSelected || isViewMode}
                              >
                                <SelectTrigger className={`cursor-pointer ${isViewMode ? "bg-gray-50" : ""}`}>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="USD - Dollars ($)">USD - Dollars ($)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
              {errors.talentSelection && <p className="text-red-500 text-sm mr-auto">{errors.talentSelection}</p>}
              {isViewMode ? (
                <Button onClick={handleReset} variant="outline" className="cursor-pointer bg-transparent">
                  Edit
                </Button>
              ) : (
                <>
                  <Button onClick={handleReset} variant="outline" className="cursor-pointer bg-transparent">
                    Reset
                  </Button>
                  <Button onClick={handleSave} className="cursor-pointer">
                    Save
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
