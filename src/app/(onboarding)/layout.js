// src/app/(onboarding)/layout.js

export default function OnboardingLayout({ children }) {
  return (
    <div className="flex min-h-dvh justify-center bg-stone-200">
      <div className="hanji-texture relative w-full max-w-lg min-h-dvh">
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  )
}
