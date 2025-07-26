import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return<>
    <div className='bg-zinc-900 min-h-screen flex items-center justify-center'>
      <SignUp 
  appearance={{
    elements: {
      // Main card styling
      card: {
        backgroundColor: '#27272a', // zinc-800
        border: '1px solid #3f3f46', // zinc-600
        borderRadius: '0.75rem', // rounded-xl
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)', // subtle shadow
      },
      
      // Header styling
      headerTitle: {
        color: '#fafafa', // zinc-50
        fontSize: '1.5rem',
        fontWeight: '600',
      },
      headerSubtitle: {
        color: '#a1a1aa', // zinc-400
      },
      
      // Form field styling
      formFieldLabel: {
        color: '#e4e4e7', // zinc-200
        fontSize: '0.875rem',
        fontWeight: '500',
      },
      formFieldInput: {
        backgroundColor: '#18181b', // zinc-900 (matches app bg)
        borderColor: '#52525b', // zinc-500
        color: '#fafafa', // zinc-50
        borderRadius: '0.5rem',
        '&:focus': {
          borderColor: '#71717a', // zinc-400
          boxShadow: '0 0 0 2px rgba(113, 113, 122, 0.2)',
        },
        '&::placeholder': {
          color: '#71717a', // zinc-500
        },
      },
      
      // Primary button (Continue button)
      formButtonPrimary: {
        backgroundColor: '#52525b', // zinc-500
        color: '#fafafa', // zinc-50
        borderRadius: '0.5rem',
        fontWeight: '500',
        '&:hover': {
          backgroundColor: '#71717a', // zinc-400
        },
        '&:active': {
          backgroundColor: '#3f3f46', // zinc-600
        },
      },
      
      // Social button (Google button)
      socialButtonsBlockButton: {
        backgroundColor: '#18181b', // zinc-900
        borderColor: '#52525b', // zinc-500
        color: '#e4e4e7', // zinc-200
        borderRadius: '0.5rem',
        '&:hover': {
          backgroundColor: '#3f3f46', // zinc-800
          borderColor: '#71717a', // zinc-400
        },
      },
      
      // Divider styling
      dividerLine: {
        backgroundColor: '#3f3f46', // zinc-600
        height: '1px',
      },
      dividerText: {
        color: '#71717a', // zinc-500
        fontSize: '0.875rem',
      },
      
      // Footer styling (the "Secured by Clerk" part)
      footer: {
        backgroundColor: '#f4f4f5', // zinc-100 (keep light for contrast)
        borderTop: '1px solid #e4e4e7',
        borderRadius: '0 0 0.75rem 0.75rem',
      },
      footerActionText: {
        color: '#71717a', // zinc-500
        fontSize: '0.75rem',
      },
      footerActionLink: {
        color: '#ef4444', // red-500 for "Development mode"
        fontSize: '0.75rem',
        '&:hover': {
          color: '#dc2626', // red-600
        },
      },
      
      // Links and interactive text
      identityPreviewText: {
        color: '#a1a1aa', // zinc-400
      },
      identityPreviewEditButton: {
        color: '#d4d4d8', // zinc-300
        '&:hover': {
          color: '#f4f4f5', // zinc-100
        },
      },
    },
  }}
/>
    </div>
  </>
}