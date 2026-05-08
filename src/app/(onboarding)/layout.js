// src/app/(onboarding)/layout.js

export default function OnboardingLayout({ children }) {
  return (
    <div className="hanji-bg flex min-h-dvh justify-center">
      <div className="hanji-bg w-full min-h-dvh max-w-lg">
        {children}
      </div>
    </div>
  )
}
