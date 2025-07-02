import React from 'react';
import { SignIn } from '@clerk/clerk-react';

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="shadow-2xl rounded-2xl bg-white p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6 text-indigo-700">Bienvenido al Sistema de Exámenes</h1>
        <SignIn path="/login" routing="path" />
        <p className="mt-6 text-gray-400 text-xs">Powered by Clerk</p>
      </div>
    </div>
  );
}