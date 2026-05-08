// src/app/(auth)/layout.js

export default function AuthLayout({ children }) {
  return (
    <div className="hanji-bg flex min-h-dvh justify-center">
      <div className="hanji-bg w-full min-h-dvh max-w-lg">
        {children}
      </div>
    </div>
  )
}
