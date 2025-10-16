import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center">
      <div className="w-full max-w-md">
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: "bg-neural-gradient hover:opacity-90",
              card: "glass-card-dark border-dark-800",
              headerTitle: "text-neural-400",
              headerSubtitle: "text-dark-300",
              socialButtonsBlockButton: "border-dark-700 hover:bg-glass-white",
              formFieldInput: "bg-dark-900 border-dark-700 text-white",
              footerActionLink: "text-neural-400 hover:text-neural-300",
            },
          }}
        />
      </div>
    </div>
  );
}
