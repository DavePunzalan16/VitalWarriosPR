"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  studentId: string
}

interface HealthRecord {
  id: string
  studentId: string
  temperature: string
  symptoms: string[]
  status: "healthy" | "warning" | "danger"
  timestamp: string
}

interface AppState {
  isAuthenticated: boolean
  currentUser: User | null
  cameraStream: MediaStream | null
  isScanning: boolean
  scanResults: HealthRecord | null
  showCameraModal: boolean
  showAuthModal: boolean
  authModalType: "login" | "register"
  toast: {
    show: boolean
    message: string
    type: "success" | "error" | "warning" | "info"
  }
}

type AppAction =
  | { type: "SET_AUTHENTICATED"; payload: { user: User } }
  | { type: "SET_UNAUTHENTICATED" }
  | { type: "SET_CAMERA_STREAM"; payload: MediaStream | null }
  | { type: "SET_SCANNING"; payload: boolean }
  | { type: "SET_SCAN_RESULTS"; payload: HealthRecord | null }
  | { type: "SHOW_CAMERA_MODAL" }
  | { type: "HIDE_CAMERA_MODAL" }
  | { type: "SHOW_AUTH_MODAL"; payload: "login" | "register" }
  | { type: "HIDE_AUTH_MODAL" }
  | { type: "SHOW_TOAST"; payload: { message: string; type: "success" | "error" | "warning" | "info" } }
  | { type: "HIDE_TOAST" }

const initialState: AppState = {
  isAuthenticated: false,
  currentUser: null,
  cameraStream: null,
  isScanning: false,
  scanResults: null,
  showCameraModal: false,
  showAuthModal: false,
  authModalType: "login",
  toast: {
    show: false,
    message: "",
    type: "info",
  },
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_AUTHENTICATED":
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload.user,
      }
    case "SET_UNAUTHENTICATED":
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null,
      }
    case "SET_CAMERA_STREAM":
      return {
        ...state,
        cameraStream: action.payload,
      }
    case "SET_SCANNING":
      return {
        ...state,
        isScanning: action.payload,
      }
    case "SET_SCAN_RESULTS":
      return {
        ...state,
        scanResults: action.payload,
      }
    case "SHOW_CAMERA_MODAL":
      return {
        ...state,
        showCameraModal: true,
      }
    case "HIDE_CAMERA_MODAL":
      return {
        ...state,
        showCameraModal: false,
        cameraStream: null,
        isScanning: false,
      }
    case "SHOW_AUTH_MODAL":
      return {
        ...state,
        showAuthModal: true,
        authModalType: action.payload,
      }
    case "HIDE_AUTH_MODAL":
      return {
        ...state,
        showAuthModal: false,
      }
    case "SHOW_TOAST":
      return {
        ...state,
        toast: {
          show: true,
          message: action.payload.message,
          type: action.payload.type,
        },
      }
    case "HIDE_TOAST":
      return {
        ...state,
        toast: {
          ...state.toast,
          show: false,
        },
      }
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

export type { User, HealthRecord, AppState, AppAction }
