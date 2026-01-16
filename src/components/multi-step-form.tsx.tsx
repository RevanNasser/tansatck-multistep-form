"use client"

import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone, ShieldCheck, CheckCircle2, ArrowLeft, Clipboard, Sparkles, Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { otpSchema, OtpValues, phoneSchema, PhoneValues } from "@/lib/schemas"




type Step = "phone" | "otp" | "success"

export default function MultiStepForm() {
  const [step, setStep] = useState<Step>("phone")
  const [submittedPhone, setSubmittedPhone] = useState<string>("")
  const [darkMode, setDarkMode] = useState(false)


  const phoneForm = useForm({
    defaultValues: {
      phoneNumber: "",
    } as PhoneValues,
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubmittedPhone(`+966 ${value.phoneNumber}`)
      setStep("otp")
    },
  })

  const otpForm = useForm({
    defaultValues: {
      otp: "",
    } as OtpValues,
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("OTP verified:", value.otp)
      setStep("success")
    },
  })





  const handleBackToPhone = () => {
    otpForm.reset()
    setStep("phone")
  }

  const handleReset = () => {
    phoneForm.reset()
    otpForm.reset()
    setSubmittedPhone("")
    setStep("phone")
  }

  return (
    <div className={cn(
      "min-h-screen flex items-center justify-center p-4 transition-colors duration-500",
      darkMode 
        ? "bg-linear-to-br from-gray-900 via-gray-800 to-gray-900" 
        : "bg-linear-to-br from-emerald-50 via-white to-emerald-50"
    )}>
      <div className="w-full max-w-md">
        {/* Dark Mode Toggle */}
        <div className="flex justify-end mb-4">
          <Button
            onClick={() => setDarkMode(!darkMode)}
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full transition-all duration-300",
              darkMode 
                ? "bg-gray-800 hover:bg-gray-700 text-yellow-400" 
                : "bg-white hover:bg-gray-100 text-gray-600 shadow-md"
            )}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-500",
                    step === "phone" && num === 1 && (darkMode 
                      ? "bg-emerald-500 text-white ring-4 ring-emerald-500/30" 
                      : "bg-emerald-600 text-white ring-4 ring-emerald-200"),
                    step === "otp" && num === 2 && (darkMode 
                      ? "bg-emerald-500 text-white ring-4 ring-emerald-500/30" 
                      : "bg-emerald-600 text-white ring-4 ring-emerald-200"),
                    step === "success" && num === 3 && (darkMode 
                      ? "bg-emerald-500 text-white ring-4 ring-emerald-500/30" 
                      : "bg-emerald-600 text-white ring-4 ring-emerald-200"),
                    (step === "phone" && num > 1) && (darkMode ? "bg-gray-700 text-gray-400" : "bg-gray-200 text-gray-400"),
                    (step === "otp" && num === 1) && (darkMode ? "bg-emerald-500 text-white" : "bg-emerald-600 text-white"),
                    (step === "otp" && num === 3) && (darkMode ? "bg-gray-700 text-gray-400" : "bg-gray-200 text-gray-400"),
                    (step === "success" && num < 3) && (darkMode ? "bg-emerald-500 text-white" : "bg-emerald-600 text-white")
                  )}
                >
                  {num}
                </div>
                {num < 3 && (
                  <div
                    className={cn(
                      "w-12 h-1 mx-1 transition-all duration-500",
                      (step === "otp" && num === 1) || (step === "success" && num <= 2)
                        ? darkMode ? "bg-emerald-500" : "bg-emerald-600"
                        : darkMode ? "bg-gray-700" : "bg-gray-200"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className={cn(
              "text-sm font-medium",
              darkMode ? "text-gray-300" : "text-gray-600"
            )}>
              {step === "phone" && "Step 1: Enter Phone Number"}
              {step === "otp" && "Step 2: Verify Code"}
              {step === "success" && "Step 3: Complete"}
            </p>
          </div>
        </div>

        {/* Card Container - Fixed Height & Width */}
        <div className="min-h-[420px] w-full">
          {/* Success State */}
          {step === "success" && (
            <Card className={cn(
              "border-0 shadow-2xl overflow-hidden w-full transition-colors duration-500",
              darkMode 
                ? "bg-gray-800/90 backdrop-blur-sm" 
                : "bg-white/80 backdrop-blur-sm"
            )}>
              <div className={cn(
                "absolute inset-0 transition-opacity duration-500",
                darkMode 
                  ? "bg-linear-to-br from-emerald-500/20 to-emerald-600/20" 
                  : "bg-linear-to-br from-emerald-500/10 to-emerald-600/10"
              )} />
              <CardHeader className="text-center relative pb-6 pt-12">
                <div className="mx-auto w-20 h-20 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-lg animate-in zoom-in duration-500">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <CardTitle className={cn(
                  "text-2xl mb-2 transition-colors duration-500",
                  darkMode ? "text-gray-100" : "text-gray-900"
                )}>
                  Verification Complete!
                </CardTitle>
                <CardDescription className={cn(
                  "text-base transition-colors duration-500",
                  darkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  {submittedPhone} has been verified successfully
                </CardDescription>
              </CardHeader>
              <CardContent className="relative pb-8">
                <Button 
                  onClick={handleReset} 
                  className="w-full h-12 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-lg transition-all duration-200"
                >
                  <Sparkles className="w-4 h-4 mr-2 shrink-0" />
                  <span>Verify Another Number</span>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Phone Form */}
          {step === "phone" && (
            <Card className={cn(
              "border-0 shadow-2xl animate-in slide-in-from-bottom  w-full transition-colors duration-500",
              darkMode 
                ? "bg-gray-800/90 backdrop-blur-sm" 
                : "bg-white/80 backdrop-blur-sm"
            )}>
              <CardHeader className="pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <CardTitle className={cn(
                      "text-xl transition-colors duration-500",
                      darkMode ? "text-gray-100" : "text-gray-900"
                    )}>
                      Enter Phone Number
                    </CardTitle>
                    <CardDescription className={cn(
                      "transition-colors duration-500",
                      darkMode ? "text-gray-400" : "text-gray-600"
                    )}>
                      We'll send you a verification code
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <phoneForm.Field 
                    name="phoneNumber"
                    validators={{
                      onChange: phoneSchema.shape.phoneNumber,
                    }}
                  >
                    {(field) => (
                      <div className="space-y-3">
                        <Label htmlFor="phoneNumber" className={cn(
                          "font-medium transition-colors duration-500",
                          darkMode ? "text-gray-300" : "text-gray-700"
                        )}>
                          Saudi Mobile Number
                        </Label>
                        <div className="flex gap-3">
                          <div className={cn(
                            "flex items-center px-4 py-3 rounded-xl border-2 font-semibold transition-colors duration-500",
                            darkMode 
                              ? "bg-gray-700 border-gray-600 text-gray-200" 
                              : "bg-gray-100 border-gray-200 text-gray-700"
                          )}>
                            🇸🇦 +966
                          </div>
                          <div className="flex-1 relative">
                            <Input
                              id="phoneNumber"
                              placeholder="5XXXXXXXX"
                              value={field.state.value}
                              onChange={(e) => {
                                const cleaned = e.target.value.replace(/\D/g, "").slice(0, 9)
                                field.handleChange(cleaned)
                              }}
                              onBlur={field.handleBlur}
                              className={cn(
                                "h-12 text-lg pl-4 pr-14 rounded-xl border-2 transition-all duration-200",
                                darkMode && "bg-gray-700 text-gray-100 placeholder:text-gray-500",
                                field.state.meta.isTouched && field.state.meta.errors.length > 0
                                  ? "border-red-400 focus-visible:ring-red-400"
                                  : darkMode 
                                    ? "border-gray-600 focus-visible:border-emerald-500 focus-visible:ring-emerald-500" 
                                    : "border-gray-200 focus-visible:border-emerald-500 focus-visible:ring-emerald-500"
                              )}
                            />
                  
                          </div>
                        </div>
                        <FieldError field={field} />
                        <p className={cn(
                          "text-xs transition-colors duration-500",
                          darkMode ? "text-gray-500" : "text-gray-500"
                        )}>
                          Example: 512345678
                        </p>
                      </div>
                    )}
                  </phoneForm.Field>

                  <phoneForm.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                    {([canSubmit, isSubmitting]) => (
                      <Button 
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          phoneForm.handleSubmit()
                        }}
                        disabled={!canSubmit} 
                        className="w-full h-12 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-base font-semibold transition-all duration-200"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending Code...
                          </span>
                        ) : (
                          "Send Verification Code"
                        )}
                      </Button>
                    )}
                  </phoneForm.Subscribe>
                </div>
              </CardContent>
            </Card>
          )}

          {/* OTP Form */}
          {step === "otp" && (
            <Card className={cn(
              "border-0 shadow-2xl animate-in slide-in-from-right w-full transition-colors duration-500",
              darkMode 
                ? "bg-gray-800/90 backdrop-blur-sm" 
                : "bg-white/80 backdrop-blur-sm"
            )}>
              <CardHeader className="pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <ShieldCheck className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <CardTitle className={cn(
                      "text-xl transition-colors duration-500",
                      darkMode ? "text-gray-100" : "text-gray-900"
                    )}>
                      Enter Verification Code
                    </CardTitle>
                    <CardDescription className={cn(
                      "transition-colors duration-500",
                      darkMode ? "text-gray-400" : "text-gray-600"
                    )}>
                      Sent to {submittedPhone}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <otpForm.Field 
                    name="otp"
                    validators={{
                      onChange: otpSchema.shape.otp,
                    }}
                  >
                    {(field) => (
                      <div className="space-y-3">
                        <Label htmlFor="otp" className={cn(
                          "font-medium transition-colors duration-500",
                          darkMode ? "text-gray-300" : "text-gray-700"
                        )}>
                          6-Digit Code
                        </Label>
                        <div className="flex gap-3">
                          <div className="flex-1 relative">
                            <Input
                              id="otp"
                              placeholder="000000"
                              value={field.state.value}
                              onChange={(e) => {
                                const cleaned = e.target.value.replace(/\D/g, "").slice(0, 6)
                                field.handleChange(cleaned)
                              }}
                              onBlur={field.handleBlur}
                              maxLength={6}
                              className={cn(
                                "h-16 text-center text-3xl tracking-[0.8em] font-mono font-bold rounded-xl border-2 pr-14 transition-all duration-200",
                                darkMode && "bg-gray-700 text-gray-100 placeholder:text-gray-600",
                                field.state.meta.isTouched && field.state.meta.errors.length > 0
                                  ? "border-red-400 focus-visible:ring-red-400"
                                  : darkMode 
                                    ? "border-gray-600 focus-visible:border-emerald-500 focus-visible:ring-emerald-500" 
                                    : "border-gray-200 focus-visible:border-emerald-500 focus-visible:ring-emerald-500"
                              )}
                            />
                  
                          </div>
                        </div>
                        <FieldError field={field} />
                      </div>
                    )}
                  </otpForm.Field>

                  <otpForm.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                    {([canSubmit, isSubmitting]) => (
                      <Button 
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          otpForm.handleSubmit()
                        }}
                        disabled={!canSubmit} 
                        className="w-full h-12 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-base font-semibold transition-all duration-200"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Verifying...
                          </span>
                        ) : (
                          "Verify Code"
                        )}
                      </Button>
                    )}
                  </otpForm.Subscribe>

                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={handleBackToPhone} 
                    className={cn(
                      "w-full h-11 transition-all duration-200",
                      darkMode 
                        ? "hover:bg-gray-700 text-gray-300" 
                        : "hover:bg-gray-100 text-gray-700"
                    )}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Change Phone Number
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Demo Info Footer */}
        <div className="mt-6 text-center">
          <p className={cn(
            "text-xs rounded-lg px-4 py-2 inline-block shadow-sm transition-colors duration-500",
            darkMode 
              ? "text-gray-400 bg-gray-800/60 backdrop-blur-sm" 
              : "text-gray-500 bg-white/60 backdrop-blur-sm"
          )}>
            TanStack Form Demo • Multi-Step Validation 
          </p>
        </div>
      </div>
    </div>
  )
}

function FieldError({ field }: { field: { state: { meta: { isTouched: boolean; errors: unknown[] } } } }) {
  if (!field.state.meta.isTouched || field.state.meta.errors.length === 0) {
    return null
  }

  // Get only the first error
  const firstError = field.state.meta.errors[0]
  
  return (
    <p className="text-sm text-red-600 font-medium flex items-center gap-1 animate-in slide-in-from-top duration-200">
      <span className="inline-block w-1 h-1 rounded-full bg-red-600" />
      {typeof firstError === "string" ? firstError : firstError?.message || "Invalid input"}
    </p>
  )
}
